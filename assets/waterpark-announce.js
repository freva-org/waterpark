/* Waterpark announcement banner.
 *
 * Fills mkdocs-material's announce bar from /api/announcements at page
 * load, which nginx serves straight off disk. Nothing about the current
 * state of the machine is baked into the built site, so clearing a notice
 * never needs a rebuild or a workflow run -- just an edit to one file.
 *
 * Because there is no application behind it, the window filtering happens
 * here. That keeps the file the only thing to edit and keeps the property
 * that mattered: an entry with a past `expires` disappears on its own,
 * rather than sitting there until somebody remembers to remove it.
 *
 * If the API is unreachable the bar simply stays hidden. A docs site that
 * still works when the backend is down is worth more than a banner saying
 * the backend is down.
 */
(() => {
  "use strict";

  const DISMISS_KEY = "wp-announce-dismissed";
  const ICONS = {
    info: '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.1v3.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="5" r=".95" fill="currentColor"/></svg>',
    warning: '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.9l6.1 11.2H1.9L8 1.9z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M8 6.3v3.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="11.3" r=".9" fill="currentColor"/></svg>',
    outage: '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.4"/><path d="M5.6 5.6l4.8 4.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  };

  const apiBase = () => window.WP_API_BASE || "";

  /* An entry is shown between `starts` (optional) and `expires`
     (required). A missing or unparsable `expires` drops the entry: the
     alternative is a banner nothing can clear, which is the failure this
     whole arrangement exists to avoid. */
  const isLive = (item, now) => {
    const expires = Date.parse(item.expires);
    if (!Number.isFinite(expires) || expires <= now) return false;
    if (!item.starts) return true;
    const starts = Date.parse(item.starts);
    return Number.isFinite(starts) && starts <= now;
  };

  const live = (items) => {
    const now = Date.now();
    return items
      .filter((item) => item && item.id && item.text && isLive(item, now))
      .sort((a, b) => Date.parse(a.expires) - Date.parse(b.expires));
  };

  /* Dismissals are per-announcement-id and expire with the announcement, so
     the store cannot grow without bound and an id used again later
     cannot resurrect an old dismissal. */
  const readDismissed = () => {
    try {
      const raw = window.localStorage.getItem(DISMISS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  };

  const writeDismissed = (map) => {
    try {
      window.localStorage.setItem(DISMISS_KEY, JSON.stringify(map));
    } catch (e) {
      /* private mode, storage full: dismissal just will not stick */
    }
  };

  const prune = (map) => {
    const now = Date.now();
    const kept = {};
    for (const [id, expiry] of Object.entries(map)) {
      if (Number(expiry) > now) kept[id] = expiry;
    }
    return kept;
  };

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  function render(host, items) {
    const banner = host.closest(".md-banner");
    host.textContent = "";

    let dismissed = prune(readDismissed());
    writeDismissed(dismissed);

    const visible = items.filter((item) => !dismissed[item.id]);
    if (!visible.length) {
      host.hidden = true;
      if (banner) banner.classList.remove("wp-announce--visible");
      return;
    }

    for (const item of visible) {
      const level = ICONS[item.level] ? item.level : "info";
      const row = el("div", "wp-announce__item wp-announce__item--" + level);

      const icon = el("span", "wp-announce__icon");
      icon.innerHTML = ICONS[level];

      const body = el("span", "wp-announce__text", item.text);

      row.append(icon, body);

      if (item.link) {
        const link = el("a", "wp-announce__link", item.link_text || "More");
        link.href = item.link;
        link.rel = "noopener";
        row.append(link);
      }

      if (item.dismissible !== false) {
        const close = el("button", "wp-announce__close");
        close.type = "button";
        close.setAttribute("aria-label", "Dismiss this notice");
        close.innerHTML =
          '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
        close.addEventListener("click", () => {
          dismissed = prune(readDismissed());
          dismissed[item.id] = Date.parse(item.expires) || Date.now() + 864e5;
          writeDismissed(dismissed);
          render(host, items);
        });
        row.append(close);
      }

      host.append(row);
    }

    host.hidden = false;
    if (banner) banner.classList.add("wp-announce--visible");
  }

  async function boot() {
    const host = document.querySelector("[data-wp-announce]");
    if (!host) return;

    try {
      const res = await fetch(apiBase() + "/api/announcements", {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.announcements;
      render(host, live(Array.isArray(items) ? items : []));
    } catch (e) {
      host.hidden = true;
      const banner = host.closest(".md-banner");
      if (banner) banner.classList.remove("wp-announce--visible");
    }
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(boot);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
