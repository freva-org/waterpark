function configureHeaderNavigation() {
  document.querySelectorAll(".md-header__dropdown").forEach((dropdown) => {
    if (dropdown.dataset.wpNavigationReady === "true") {
      return;
    }

    const button = dropdown.querySelector(":scope > button");
    const firstLink = dropdown.querySelector(
      ":scope > .md-header__dropdown-content a[href]"
    );

    if (
      !(button instanceof HTMLButtonElement) ||
      !(firstLink instanceof HTMLAnchorElement)
    ) {
      return;
    }

    const title = button.textContent.trim();
    const heading = document.createElement("div");
    heading.className = "wp-header-menu-heading";

    const link = document.createElement("a");
    link.className = button.className;
    link.style.cssText = button.style.cssText;
    link.href = firstLink.href;

    // Preserve the existing title and any icon.
    while (button.firstChild) {
      link.appendChild(button.firstChild);
    }

    // Keep the plugin's existing click handler on the arrow button.
    button.type = "button";
    button.textContent = "▾";
    button.setAttribute("aria-label", `Open ${title} menu`);

    button.before(heading);
    heading.append(link, button);

    dropdown.dataset.wpNavigationReady = "true";
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", configureHeaderNavigation);
} else {
  configureHeaderNavigation();
}

// Also supports Material's instant navigation if enabled later.
if (typeof document$ !== "undefined") {
  document$.subscribe(configureHeaderNavigation);
}
