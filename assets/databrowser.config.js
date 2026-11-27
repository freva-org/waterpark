/*
 * Freva Data Browser embed configuration.
 *
 * This is the single place to tune the embedded Data Browser.
 */
export default {
  // Backend
  apiBase: "https://freva.dkrz.de/api/freva-nextgen/databrowser",

  // Default metadata flavour.
  flavour: "waterpark",

  // Public, read-only demo
  authEnabled: false,
  enableHeavyOps: false,

  // Mirror the active query (flavour + facets + time + bbox) into the page URL
  // so a link reproduces the exact view, and read it back on load. Safe here
  syncUrl: true,

  // Scope: Waterpark-only "hosted filtered instance"
  baseFilters: { project: "waterpark" },

  // the scope value renders locked and survives "Clear all". Set true to let
  // a user take it off and see the wider archive.
  scopeRemovable: false,

  // Land on the metadata overview rather than the file list for the first time
  // user. Always a user's own choice wins on every later visit.
  defaultLayout: "overview",

  // How the overview is laid out before a visitor rearranges it.
  overview: {
    order: [
      "product",
      "variable",
      "time_frequency",
      "healpix_level",
      "experiment",
      "model",
      "realm",
      "ensemble",
      "time_aggregation",
      "__time",
      "__bbox",
    ],
    // Everything not listed here moves under "Show additional facets".
    mainFacets: [
      "product",
      "variable",
      "time_frequency",
      "healpix_level",
      "experiment",
      "model",
      "realm",
      "ensemble",
      "time_aggregation",
      "__time",
      "__bbox",
    ],
  },

  // Brand
  brand: {
    title: "Data Browser",
    showMark: false,
    description: "",
  },


  // Theme: the site accent (src/styles/theme.css). The widget's OWN day/night
  // toggle is disabled; web/site.js keeps it in step with the site's.
  features: {
    themeToggle: false,
    footer: false,
  },
  theme: {
    both: {
      accent: "var(--sl-color-accent, #0e7c7b)",
      "accent-2": "var(--sl-color-accent-high, #0a4f50)",
    },
  },
};
