/*
 * Focus toggle for the embedded browsers.
 *
 * The button itself is markup in data/databrowser.md and data/stac-browser.md,
 * so it is visible to anyone reading those pages rather than conjured by a
 * script. This only wires up the click and remembers the choice.
 *
 * Layout lives entirely in assets/waterpark-focus.css. All this does is set
 * one class on <body>.
 */
(function () {
  "use strict";

  var KEY = "waterpark-focus";
  var CLASS = "wp-focus";

  var LABEL = {
    on: "Show navigation",
    off: "Hide navigation",
  };

  function stored() {
    try {
      return localStorage.getItem(KEY) === "1";
    } catch (e) {
      // Private browsing, or storage disabled. Not a reason to break the page.
      return false;
    }
  }

  function remember(on) {
    try {
      localStorage.setItem(KEY, on ? "1" : "0");
    } catch (e) {
      /* noop */
    }
  }

  function paint(button, on) {
    document.body.classList.toggle(CLASS, on);
    button.textContent = on ? LABEL.on : LABEL.off;
    button.setAttribute("aria-pressed", on ? "true" : "false");
  }

  function init() {
    var button = document.querySelector("[data-wp-focus]");
    if (!button) {
      // Not one of the browser pages. Make sure a remembered focus state from
      // one of them does not leak into a documentation page, where hiding the
      // sidebar would hide the whole table of contents.
      document.body.classList.remove(CLASS);
      return;
    }

    paint(button, stored());

    button.addEventListener("click", function () {
      var on = !document.body.classList.contains(CLASS);
      paint(button, on);
      remember(on);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
