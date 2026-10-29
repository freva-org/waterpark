/**
 * The site's navigation, defined once.
 *
 * Starlight builds the sidebar from this, and the header menus are built
 * from the resolved sidebar at render time (src/components/Header.astro),
 * so there is no second list to keep in step. Pages are referenced by
 * slug alone: the label comes from the page's own title, which is where
 * it was already written.
 *
 * Use `{ label, link }` only for things that are not pages of this site.
 */
export const nav = [
  {
    label: "Find data",
    items: ["databrowser", "stac-browser"],
  },
  {
    label: "Examples",
    // Order and the "Start here" label come from the generated pages.
    items: [{ autogenerate: { directory: "examples" } }],
  },
  {
    label: "Notebook",
    items: [{ label: "Open the notebook", link: "/notebook/lab/index.html" }],
  },
  {
    label: "Tips and tricks",
    items: ["high-level-access"],
  },
  {
    label: "Concepts",
    items: [
      "storage_concepts",
      "storage_concepts/why-healpix",
      "storage_concepts/zarr-and-s3",
      "technical-decisions",
      "appendix-remapping-benchmark",
    ],
  },
  {
    label: "Operation",
    items: ["tools"],
  },
];
