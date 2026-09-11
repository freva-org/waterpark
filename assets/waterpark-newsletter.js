/* Waterpark newsletter signup (double opt-in).
 *
 * Posts to /api/newsletter/subscribe, which nginx rewrites to listmonk's
 * /api/public/subscription. The rewrite keeps listmonk's URL shape out of
 * the built site and keeps the request same-origin, so no CORS.
 *
 * listmonk needs the list UUID with every request. It is set once in
 * mkdocs.yml under `extra.list_uuid` and emitted by data/overrides/
 * main.html as window.WP_LIST_UUID. The UUID is public by design -- it is
 * what public subscription forms are built from -- so it is fine in the
 * page source.
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
    ok: "Check your inbox and click the link in the email to confirm.",
    added: "You are on the list.",
    badEmail: "That address does not look right. Check it and try again.",
    failed: "Could not reach the server. Try again in a moment.",
    unconfigured:
      "Signup is not configured on this page. Please write to " +
      "waterpark@support.dkrz.de instead.",
  };

  const apiBase = (host) =>
    host.getAttribute("data-api") || window.WP_API_BASE || "";

  const listUuid = (host) =>
    host.getAttribute("data-list") || window.WP_LIST_UUID || "";

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

      const uuid = listUuid(host);
      if (!uuid) {
        // Better than posting and getting listmonk's "no lists selected"
        // back: that reads like the address was wrong.
        say(DEFAULTS.unconfigured, "err");
        btn.disabled = false;
        input.disabled = false;
        btn.textContent = restore;
        return;
      }

      try {
        const res = await fetch(apiBase(host) + "/api/newsletter/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // listmonk fills the name from the local part when it is absent,
          // so we do not ask for one.
          body: JSON.stringify({ email, list_uuids: [uuid] }),
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok) {
          row.hidden = true;
          // has_optin is false when the list is single opt-in, in which
          // case nothing is sent and telling people to check their inbox
          // would be a lie.
          const optin = !data.data || data.data.has_optin !== false;
          say(optin ? DEFAULTS.ok : DEFAULTS.added, "ok");
          return;
        }
        // Echo puts the reason in `message`. It is already a sentence.
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

  /* The confirmation and unsubscribe pages are listmonk's, at
     /subscription/... . Its links never route back here, so the panel
     that used to render those outcomes has been removed along with the
     [data-wp-newsletter-status] mount in data/newsletter.md. */

  function boot() {
    document.querySelectorAll("[data-wp-newsletter]").forEach(mount);
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
