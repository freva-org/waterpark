/* Waterpark newsletter signup (double opt-in).
 *
 * Mounts on any element carrying `data-wp-newsletter`:
 *
 *   <div data-wp-newsletter data-variant="footer"></div>
 *   <div data-wp-newsletter data-privacy="https://.../datenschutz"></div>
 *
 * API base resolution order:
 *   1. data-api="..." on the mount element
 *   2. window.WP_API_BASE  (set in a small inline script for local dev)
 *   3. "" -> same origin, which is what production uses behind nginx
 */
(() => {
  "use strict";

  const DEFAULTS = {
    title: "Get notified when new datasets land",
    sub: "A few emails a year about new datasets and changes to the hub.",
    placeholder: "you@example.org",
    cta: "Send confirmation link",
    pending: "Sending...",
    ok: "Check your inbox. Click the link in the email to confirm; the link is valid for 48 hours.",
    badEmail: "That address does not look right. Check it and try again.",
    failed: "Could not reach the server. Try again in a moment.",
  };

  const apiBase = (host) =>
    host.getAttribute("data-api") || window.WP_API_BASE || "";

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  /* Deliberately permissive: the server is the authority on validity, this
     only catches obvious typos before we spend a round trip. */
  const looksLikeEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

  let seq = 0;

  function mount(host) {
    if (host.dataset.wpMounted) return;
    host.dataset.wpMounted = "1";

    const variant = host.getAttribute("data-variant") || "block";
    const privacy = host.getAttribute("data-privacy") || "";
    const id = "wp-nl-" + ++seq;

    host.classList.add("wp-nl", "wp-nl--" + variant);

    const copy = el("div", "wp-nl__copy");
    copy.append(
      el("p", "wp-nl__title", host.getAttribute("data-title") || DEFAULTS.title),
      el("p", "wp-nl__sub", host.getAttribute("data-sub") || DEFAULTS.sub)
    );

    const label = el("label", "wp-nl__label", "Email address");
    label.setAttribute("for", id);

    const input = el("input", "wp-nl__input");
    Object.assign(input, {
      id,
      type: "email",
      name: "email",
      autocomplete: "email",
      spellcheck: false,
      placeholder: host.getAttribute("data-placeholder") || DEFAULTS.placeholder,
    });

    /* Honeypot. Real users never fill this; bots that parse the DOM do.
       The server must reject any request where it is non-empty. */
    const trap = el("input", "wp-nl__trap");
    Object.assign(trap, { type: "text", name: "website", tabIndex: -1, autocomplete: "off" });
    trap.setAttribute("aria-hidden", "true");

    const btn = el("button", "wp-nl__btn", DEFAULTS.cta);
    btn.type = "button";

    const row = el("div", "wp-nl__row");
    row.append(label, input, trap, btn);

    const note = el("p", "wp-nl__note");
    note.setAttribute("aria-live", "polite");

    const consent = el("p", "wp-nl__consent");
    consent.append(
      document.createTextNode(
        "We store your address only to send this newsletter. " +
          "Every email carries an unsubscribe link. "
      )
    );
    if (privacy) {
      const a = el("a", null, "Privacy notice");
      a.href = privacy;
      a.rel = "noopener";
      consent.append(a);
    }

    host.append(copy, row, note, consent);

    const say = (msg, kind) => {
      note.textContent = msg;
      note.className = "wp-nl__note" + (kind ? " wp-nl__note--" + kind : "");
    };

    async function submit() {
      const email = input.value.trim();
      if (!looksLikeEmail(email)) {
        say(DEFAULTS.badEmail, "err");
        input.focus();
        return;
      }
      if (trap.value) return; // silently drop bots

      btn.disabled = true;
      input.disabled = true;
      const restore = btn.textContent;
      btn.textContent = DEFAULTS.pending;

      const body = new URLSearchParams({
        email,
        website: "",
        language: (document.documentElement.lang || "en").slice(0, 2),
      });

      try {
        const res = await fetch(apiBase(host) + "/api/newsletter/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          row.hidden = true;
          say(DEFAULTS.ok, "ok");
          return;
        }
        say(data.message || DEFAULTS.badEmail, "err");
      } catch (e) {
        say(DEFAULTS.failed, "err");
      } finally {
        // Restore unconditionally. Tying this to `row.hidden` meant that if
        // the row failed to hide for any reason, the button was left
        // reading "Sending..." for good.
        btn.disabled = false;
        input.disabled = false;
        btn.textContent = restore;
      }
    }

    btn.addEventListener("click", submit);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
      }
    });
  }

  /* ---- confirmation / unsubscribe landing page ---------------------- */

  const STATUS = {
    success: {
      kind: "ok",
      title: "Subscription confirmed",
      body: "You are on the list. Every email we send carries an unsubscribe link.",
    },
    expired: {
      kind: "err",
      title: "That link has expired",
      body: "Confirmation links are valid for 48 hours. Sign up again to get a fresh one.",
    },
    invalid: {
      kind: "err",
      title: "That link is not valid",
      body: "It may already have been used. Sign up again to get a fresh link.",
    },
  };

  function mountStatus(host) {
    const q = new URLSearchParams(window.location.search);
    const status = q.get("status");
    const token = q.get("token");
    const action = q.get("action");

    host.classList.add("wp-nl-panel");

    if (status && STATUS[status]) {
      const s = STATUS[status];
      host.classList.add("wp-nl-panel--" + s.kind);
      host.append(el("p", "wp-nl-panel__title", s.title), el("p", null, s.body));
      return;
    }

    if (action === "unsubscribe" || token) {
      host.append(
        el("p", "wp-nl-panel__title", "Unsubscribe"),
        el("p", null, "Confirm below and we will stop sending you the newsletter.")
      );
      const btn = el("button", "wp-nl__btn", "Unsubscribe");
      btn.type = "button";
      const note = el("p", "wp-nl__note");
      note.setAttribute("aria-live", "polite");
      host.append(btn, note);

      btn.addEventListener("click", async () => {
        btn.disabled = true;
        btn.textContent = "Working...";
        try {
          const res = await fetch(apiBase(host) + "/api/newsletter/unsubscribe", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ token: token || "" }),
          });
          if (res.ok) {
            btn.hidden = true;
            note.textContent = "Done. You will not receive further emails.";
            note.className = "wp-nl__note wp-nl__note--ok";
          } else {
            note.textContent = "That did not work. Write to the support address below.";
            note.className = "wp-nl__note wp-nl__note--err";
            btn.disabled = false;
            btn.textContent = "Unsubscribe";
          }
        } catch (e) {
          note.textContent = "Could not reach the server. Try again in a moment.";
          note.className = "wp-nl__note wp-nl__note--err";
          btn.disabled = false;
          btn.textContent = "Unsubscribe";
        }
      });
      return;
    }

    host.append(
      el("p", "wp-nl-panel__title", "Nothing to confirm here"),
      el("p", null, "Open this page from a link in one of our emails.")
    );
  }

  function boot() {
    document.querySelectorAll("[data-wp-newsletter]").forEach(mount);
    document.querySelectorAll("[data-wp-newsletter-status]").forEach(mountStatus);
  }

  /* mkdocs-material swaps the DOM on navigation when instant loading is on,
     so re-run on every document change as well as first paint. */
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(boot);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
