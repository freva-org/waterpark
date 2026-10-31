"use strict";(self.rspackChunk_freva_org_jupyterlite_freva_data=self.rspackChunk_freva_org_jupyterlite_freva_data||[]).push([[406],{984(e,t,a){var r=a(377),o=a.n(r),n=a(935),i=(a.n(n))()(o());i.push([e.id,`/*
 * @freva-org/dataset-tree
 *
 * Every rule is scoped under \`.dataset-tree\`: no bare \`button\`, \`ul\`, \`svg\` or \`*\` selector, no
 * global font declaration, no \`@font-face\` - a host page gets a styled component and nothing else.
 * Colour and type come from the portal's own tokens when present, the fallbacks below when not, so
 * one file serves a Freva portal, a docs site and the playground. Consumers override the
 * \`--dataset-tree-*\` variables, never the internals: those are the supported surface.
 */

.dataset-tree {
  --dataset-tree-bg: var(--surface, #ffffff);
  --dataset-tree-bg-opaque: #ffffff;
  --dataset-tree-bg-subtle: var(--surface-2, #f4f6f7);
  --dataset-tree-text: var(--ink, #172322);
  --dataset-tree-muted: var(--muted, #526765);
  --dataset-tree-border: var(--line-2, var(--line, #c6d0d0));
  --dataset-tree-accent: var(--accent, #009688);
  --dataset-tree-accent-ink: var(--accent-ink, #ffffff);
  /* The panel's corner: the host's own 12px token, else the tighter 0.55rem it was drawn at - a
     12px radius on a 13px-text panel reads as a card, and this is a list. */
  --dataset-tree-radius: var(--r-12, 0.55rem);
  --dataset-tree-font-mono: var(--font-mono, monospace);

  /* Package-owned additions, same override rules as the ten above. */
  --dataset-tree-faint: color-mix(in srgb, var(--dataset-tree-muted) 72%, transparent);
  --dataset-tree-code-bg: color-mix(in srgb, var(--dataset-tree-text) 5%, var(--dataset-tree-bg));
  --dataset-tree-danger: var(--danger, #8c4a3d);
  --dataset-tree-radius-sm: 0.35rem;
  /* The nesting rail and the row wash under the pointer, derived rather than named so a host that
     sets nothing gets both correct against its own surface; public, so a host that wants them
     stronger or quieter says so once. */
  --dataset-tree-guide: color-mix(in srgb, var(--dataset-tree-border) 55%, transparent);
  --dataset-tree-row-hover: color-mix(in srgb, var(--dataset-tree-text) 7%, transparent);
  /* The size of a row's subject glyph - folder, store, file - and of the chevron beside it. A
     variable because a 16px glyph that is right in a 16rem column is small in a full-width sheet
     where the rows are further apart. The only thing about a row that scales; the type does not,
     because a list of paths is read at the size the host set for text. */
  --dataset-tree-icon-size: 16px;
  --dataset-tree-chev-size: 14px;
  /* Two derived accents, for contrast rather than decoration. The brand teal is 3.67:1 against
     white, below AA for normal text, so small accent TEXT is mixed toward the ink colour and an
     accent-filled control's BACKGROUND is mixed the same way before white sits on it. Mixing toward
     \`--dataset-tree-text\` rather than toward black is what works in both themes: it darkens in
     light mode, lightens in dark, and in both moves away from the surface behind it. */
  --dataset-tree-accent-text: color-mix(
    in srgb,
    var(--dataset-tree-accent) 62%,
    var(--dataset-tree-text)
  );
  --dataset-tree-accent-strong: color-mix(
    in srgb,
    var(--dataset-tree-accent) 80%,
    var(--dataset-tree-text)
  );
  --dataset-tree-hit: color-mix(in srgb, var(--dataset-tree-accent) 26%, transparent);
  /* A scroll ceiling, not a viewport dimension: \`rem\` grows with the visitor's text size, and a
     host that wants the tree to run full length sets it to \`none\`. */
  --dataset-tree-max-height: 32rem;
  /* A scroll floor, so the list shows the room it has before anything is opened. Without one a
     collapsed tree is as tall as its roots and the page reflows by half a screen the first time
     somebody expands a branch. \`0\` by default, because claiming height nobody asked for is the
     wrong neighbour in a sidebar - a host that gives the tree a region of its own sets it. */
  --dataset-tree-min-height: 0;
  /* One step, applied once per level of nesting, and the whole of the depth rule. The first level
     steps too: without it a collection and its first child begin at the same coordinate and read as
     siblings, and the hierarchy only becomes visible at the grandchild. A rail says "these are
     related"; a step says "these are below". A token rather than a literal because the step is the
     one thing a host may reasonably want to change - a 320px sidebar wants less of it - and because
     the guide rail derives from it, so the two can never disagree. */
  --dataset-tree-indent: 1.05rem;
  /* The warm accent, and why it is not the teal one. The primary accent marks what a thing IS - a
     store's icon, its inspect action, the leading edge of its detail panel - and is the same colour
     wherever it appears; this one marks where the READER is: the focus ring, the outline on the row
     whose panel is open. One colour for both makes a focused directory look like a store. It falls
     back to the host's own warm accent, and to a readable amber when there is none, so a tree with
     no token vocabulary still has a visible focus ring. */
  --dataset-tree-focus: var(--accent-warm, var(--warning, #d98324));

  box-sizing: border-box;
  /* Makes the component its own query container, so the narrow-layout rules below react to the
     panel's width rather than the window's - a 320px sidebar on a 27" monitor needs the compact
     layout just as much as a phone does. */
  container-type: inline-size;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--dataset-tree-text);
  background: var(--dataset-tree-bg);
  border: 1px solid var(--dataset-tree-border);
  border-radius: var(--dataset-tree-radius);
  overflow: hidden;
  /* A column, so the panel can fill a host that gives it a height. Stacked as blocks, a host that
     sets \`height\` on this element gets a toolbar, a short body and a footer floating in the middle
     of the space it gave away; as a flex column the body takes the slack and the footer stays at
     the bottom, and nothing changes for a host that sets no height at all. */
  display: flex;
  flex-direction: column;
}

/* Dark fallbacks. These change only what the package falls back TO: a portal that defines
   \`--surface\` still wins in both schemes, because every variable above prefers the host token. This
   is what keeps the component readable where there is no token vocabulary at all. */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .dataset-tree {
    --dataset-tree-bg: var(--surface, #171f28);
    --dataset-tree-bg-opaque: #171f28;
    --dataset-tree-bg-subtle: var(--surface-2, #141b23);
    --dataset-tree-text: var(--ink, #e9eef3);
    --dataset-tree-muted: var(--muted, #8794a1);
    --dataset-tree-border: var(--line-2, var(--line, #2f3b4a));
    --dataset-tree-accent: var(--accent, #4285bd);
    --dataset-tree-accent-ink: var(--accent-ink, #0b1117);
    --dataset-tree-danger: var(--danger, #d9948a);
    --dataset-tree-row-hover: color-mix(in srgb, var(--dataset-tree-text) 13%, transparent);
    --dataset-tree-guide: color-mix(in srgb, var(--dataset-tree-border) 62%, transparent);
  }
}
:root[data-theme="dark"] .dataset-tree {
  --dataset-tree-bg: var(--surface, #171f28);
  --dataset-tree-bg-opaque: #171f28;
  --dataset-tree-bg-subtle: var(--surface-2, #141b23);
  --dataset-tree-text: var(--ink, #e9eef3);
  --dataset-tree-muted: var(--muted, #8794a1);
  --dataset-tree-border: var(--line-2, var(--line, #2f3b4a));
  --dataset-tree-accent: var(--accent, #4285bd);
  --dataset-tree-accent-ink: var(--accent-ink, #0b1117);
  --dataset-tree-danger: var(--danger, #d9948a);
  --dataset-tree-row-hover: color-mix(in srgb, var(--dataset-tree-text) 13%, transparent);
  --dataset-tree-guide: color-mix(in srgb, var(--dataset-tree-border) 62%, transparent);
}

.dataset-tree *,
.dataset-tree *::before,
.dataset-tree *::after {
  box-sizing: inherit;
}

.dataset-tree__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

/* toolbar */

.dataset-tree__bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.5rem 0.6rem;
  border-bottom: 1px solid var(--dataset-tree-border);
  background: var(--dataset-tree-bg-subtle);
}

.dataset-tree__filter {
  flex: 1 1 12rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
}
.dataset-tree__filter-icon {
  flex: 0 0 auto;
  width: 15px;
  height: 15px;
  color: var(--dataset-tree-faint);
}
.dataset-tree__filter-input {
  flex: 1 1 auto;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--dataset-tree-text);
  font: inherit;
}
.dataset-tree__filter-input::placeholder {
  color: var(--dataset-tree-faint);
  opacity: 1;
}
.dataset-tree__filter-input:focus-visible {
  outline: 2px solid var(--dataset-tree-accent);
  outline-offset: 2px;
  border-radius: 0.2rem;
}

.dataset-tree__hint {
  margin: 0;
  padding: 0.35rem 0.65rem;
  font-size: 0.7rem;
  color: var(--dataset-tree-muted);
  background: var(--dataset-tree-bg-subtle);
  border-bottom: 1px solid var(--dataset-tree-border);
}
/* Stated rather than left to the user agent: a host page's reset that sets \`display\` on \`p\` beats
   the built-in \`[hidden]\` rule, and the caveat would then sit there permanently. */
.dataset-tree__hint[hidden] {
  display: none;
}

.dataset-tree__btn {
  flex: 0 0 auto;
  appearance: none;
  border: 1px solid var(--dataset-tree-border);
  background: var(--dataset-tree-bg);
  color: var(--dataset-tree-muted);
  font: inherit;
  font-size: 0.72rem;
  padding: 0.22rem 0.5rem;
  border-radius: var(--dataset-tree-radius-sm);
  cursor: pointer;
  white-space: nowrap;
  transition:
    color 0.12s,
    border-color 0.12s,
    background 0.12s;
}
.dataset-tree__btn:hover {
  color: var(--dataset-tree-accent-text);
  border-color: var(--dataset-tree-accent);
}
.dataset-tree__btn:focus-visible {
  outline: 2px solid var(--dataset-tree-accent);
  outline-offset: 1px;
}
.dataset-tree__btn.is-done {
  color: var(--dataset-tree-accent-text);
  border-color: var(--dataset-tree-accent);
}
.dataset-tree__btn.is-failed {
  color: var(--dataset-tree-danger);
  border-color: var(--dataset-tree-danger);
}
.dataset-tree__btn--primary {
  background: var(--dataset-tree-accent-strong);
  border-color: var(--dataset-tree-accent-strong);
  color: var(--dataset-tree-accent-ink);
  font-weight: 600;
}
.dataset-tree__btn--primary:hover {
  color: var(--dataset-tree-accent-ink);
  background: color-mix(in srgb, var(--dataset-tree-accent-strong) 88%, var(--dataset-tree-text));
  border-color: transparent;
}

/* The run control. It sits at the end of the same row as Copy and has to read as the different KIND
   of thing it is - copy takes a snippet away, this one starts something - so it takes the primary
   treatment and a glyph, the only control here with either. The icon is sized in \`em\` so it tracks
   the button's own 0.72rem rather than the host's root size. */
.dataset-tree__btn--notebook {
  display: inline-flex;
  align-items: center;
}
.dataset-tree__btn--notebook::before {
  content: "";
  flex: 0 0 auto;
  width: var(--dataset-tree-notebook-icon-width, 0px);
  height: 16px;
  margin-inline-end: calc(var(--dataset-tree-notebook-icon-width, 0px) * 0.43);
  background: var(--dataset-tree-notebook-icon, none) center / contain no-repeat;
}
.dataset-tree__btn--run {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
.dataset-tree__run-icon {
  width: 0.85em;
  height: 0.85em;
  flex: 0 0 auto;
}

/* body */

/* The right inset, which is the panel's and not the row's. Row content ending at the panel's inner
   edge puts a size or metric pill's border against the panel's own border, while the open dataset
   panel - carrying a 0.6rem right margin of its own - ends 0.6rem short of the facts on the row
   above it, so the right-hand column has two different edges. The inset lives here, once, and the
   details panel carries no margin of its own, so every right-hand edge lines up. */
/* The scrolling list. It takes whatever room the panel has left over - none when the panel is sized
   by its content, everything between toolbar and footer when a host has given it a height. */
.dataset-tree__body {
  flex: 1 1 auto;
  min-height: var(--dataset-tree-min-height);
  padding: 0.25rem 0.6rem 0.25rem 0;
  max-height: var(--dataset-tree-max-height);
  overflow: auto;
}
.dataset-tree__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.dataset-tree__node {
  margin: 0;
}

/* The result list: flat, visually distinct from the tree it replaced, because it IS a different
   thing - the rows are destinations found in an index rather than nodes in a hierarchy somebody
   opened, and a result list that looked like a tree would invite a reader to expect the branch
   above it. The count is a plain line rather than a heading: a fact about the query, updated as the
   reader types, and promoting it would put a new landmark on the page on every keystroke. */
.dataset-tree__results {
  margin: 0;
  padding: 0.4rem 0.65rem 0.2rem;
  font-size: 0.7rem;
  color: var(--dataset-tree-muted);
}
.dataset-tree__list--results > .dataset-tree__node--result + .dataset-tree__node--result {
  border-top: 1px solid var(--dataset-tree-border-subtle, var(--dataset-tree-border));
}
/* The breadcrumb, under the row and indented past the icon column so it reads as belonging to the
   name above it rather than as another row. Text only - it is built from an index nobody in this
   package has met. */
.dataset-tree__trail {
  margin: -0.15rem 0 0.3rem;
  padding-left: 2.55rem;
  font-size: 0.7rem;
  color: var(--dataset-tree-muted);
  overflow-wrap: anywhere;
}

/*
 * Depth, as one rule that knows nothing about depth. Each level of children is a
 * \`.dataset-tree__children\` box nested inside the previous one, so a single \`padding-left\`
 * compounds: depth 7 is seven steps in, and no rule names a level - a zero first step plus a second
 * rule for nested boxes gives a first child that begins in its parent's own column. The rail lives
 * in the gutter the step opens, at its midpoint, so it runs between the parent's column and the
 * child's rather than through either, and deriving it from the same token keeps that true when a
 * host changes the step. Everything in the subtree moves together, because the box that moves is
 * the one they are all inside: nothing to keep in sync, and a folder, a dataset and a file at the
 * same depth begin at the same coordinate.
 */
.dataset-tree__children {
  position: relative;
  padding-left: var(--dataset-tree-indent);
}
/*
 * The rail is a hint, not a gridline: three corrections, all about weight rather than position. In
 * the panel's full border colour a tree eight levels deep is eight full-strength verticals
 * competing with the names beside them, so it takes a wash of that colour, and the wash is a
 * variable a host can set. Running edge to edge, one branch's rail meets the next and the column
 * reads as one unbroken ruled line; insetting both ends leaves a small gap at each end of every
 * run, which is what makes a rail read as belonging to the rows it spans. Sat exactly on the indent
 * step's midpoint it lands under the chevron column of the rows below, attached to the glyphs
 * rather than to the gutter; a fraction to the right clears them and puts it between the parent's
 * column and the child's, where the eye reads it as a connector.
 */
.dataset-tree__children::before {
  content: "";
  position: absolute;
  left: calc(var(--dataset-tree-indent) / 2 + 0.11rem);
  top: 0.12rem;
  bottom: 0.5rem;
  width: 1px;
  background: var(--dataset-tree-guide);
}

/* a row */

/* The line is the flex container; the row is the button that fills it. Splitting the two lets an
   expandable node carry a details toggle without nesting one button inside another. */
.dataset-tree__rowline {
  display: flex;
  align-items: center;
  border-radius: 0.3rem;
}
/*
 * Hover as a lift off the surface rather than as a second surface. \`--dataset-tree-bg-subtle\`, the
 * panel's own alternate surface, is DARKER than the panel in a dark theme, so hovering a row in the
 * dark makes it recede by about two per cent of luminance and a pointer moving down forty monospace
 * paths gets no feedback. A translucent wash of the TEXT colour instead: the one token guaranteed
 * to contrast with the surface in either theme, so one declaration darkens in light mode and
 * lightens in dark without either naming a colour. The dark step is larger because the eye reads a
 * given luminance difference as smaller against a dark ground.
 */
.dataset-tree__rowline:hover {
  background: var(--dataset-tree-row-hover);
}
/* The row shrinks to its text rather than filling the line. That is what puts the project link
   immediately after the description, where the design has it, instead of stranded beside the byte
   counts - a link cannot be nested inside the row button, so it can only sit next to the text if
   the button ends where the text ends. The cost is that clicking the empty space to the right does
   not toggle the row; the line highlights on hover, and the row is one Tab stop and one Enter. */
.dataset-tree__row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex: 0 1 auto;
  min-width: 0;
  padding: 0.26rem 0.6rem 0.26rem 0.35rem;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  border-radius: 0.3rem;
}
/* The details toggle, which is a glyph and not a box. A 1px border and its own hover frame put a
   second bordered control on the right of every collection row - a row that is already a button -
   and make the tree read as a list of two-control lines. \`font: inherit\` keeps it in the
   component's face rather than the page's default, and belongs on every control here. */
.dataset-tree__infowrap {
  position: relative;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
}
.dataset-tree__info-btn {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.1rem;
  padding: 0.2rem;
  border: 0;
  border-radius: 0.3rem;
  background: transparent;
  color: var(--dataset-tree-faint);
  font: inherit;
  cursor: pointer;
}
.dataset-tree__info-btn:hover,
.dataset-tree__info-btn.is-open {
  color: var(--dataset-tree-accent-text);
}
.dataset-tree__info-btn:focus-visible {
  outline: 2px solid var(--dataset-tree-accent);
  outline-offset: 1px;
}
/* Quiet until the row is under the pointer. Every branch can say where it is - bucket, prefix,
   address - so every branch has an info control, and drawing all of them at rest turns ten nested
   levels into ten two-control lines and stops the column a reader scans being names. Revealed on
   hover, on keyboard focus, and whenever the panel it opens is open, so it costs nothing until
   wanted and is never unreachable. \`visibility\` is deliberately not used: the button must stay
   focusable, so opacity alone changes, and \`:focus-visible\` brings it back for a keyboard. */
.dataset-tree__rowline .dataset-tree__info-btn {
  opacity: 0;
  transition: opacity 0.12s ease;
}
.dataset-tree__rowline:hover .dataset-tree__info-btn,
.dataset-tree__rowline:focus-within .dataset-tree__info-btn,
.dataset-tree__info-btn:focus-visible,
.dataset-tree__info-btn.is-open {
  opacity: 1;
}
/* A pointer that cannot hover never gets the reveal, so on touch the control is simply there: a
   control that appeared on tap would make the first tap do something other than what it looks like
   it does. */
@media (hover: none) {
  .dataset-tree__rowline .dataset-tree__info-btn {
    opacity: 1;
  }
}

/* The card, anchored to the control and leaving the tree where it is. A panel under the row pushes
   every row below it down the screen to say four short things, so reading one costs a reader their
   place in the list. Drawn over the rows instead, from the wrapper the control sits in - \`left: 0\`
   therefore means "under the button" with no measurement - and it flips above the row when the body
   has no room below (\`placeInfoCard\`). \`max-width\` in \`min()\` with a viewport unit, because the
   widest thing in here is an \`s3://\` address and the narrowest screen is a phone. */
.dataset-tree__infocard {
  position: absolute;
  z-index: 6;
  top: calc(100% + 0.3rem);
  left: 0;
  width: max-content;
  min-width: 13rem;
  max-width: min(26rem, 78vw);
  padding: 0.55rem 0.6rem 0.6rem;
  background-color: var(--dataset-tree-bg-opaque);
  background-image: linear-gradient(var(--dataset-tree-bg), var(--dataset-tree-bg));
  border: 1px solid var(--dataset-tree-border);
  border-radius: var(--dataset-tree-radius);
  box-shadow:
    0 0.6rem 1.6rem color-mix(in srgb, var(--dataset-tree-text) 18%, transparent),
    0 0.1rem 0.2rem color-mix(in srgb, var(--dataset-tree-text) 10%, transparent);
  cursor: default;
  text-align: left;
}
.dataset-tree__infocard.is-above {
  top: auto;
  bottom: calc(100% + 0.3rem);
}
.dataset-tree__infohead {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.dataset-tree__infohead > .dataset-tree__dname {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dataset-tree__infoclose {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  padding: 0;
  border: 0;
  border-radius: 0.3rem;
  background: transparent;
  color: var(--dataset-tree-muted);
  cursor: pointer;
}
.dataset-tree__infoclose:hover {
  color: var(--dataset-tree-text);
  background: var(--dataset-tree-row-hover);
}
.dataset-tree__infoclose:focus-visible {
  outline: 2px solid var(--dataset-tree-accent);
  outline-offset: 1px;
}
.dataset-tree__closeicon {
  width: 0.8rem;
  height: 0.8rem;
}
.dataset-tree__infocard .dataset-tree__meta {
  margin-top: 0.45rem;
}
/* The card's own metadata rows are narrower than a details panel's: it is a card, not a page. */
.dataset-tree__infocard .dataset-tree__metakey {
  flex: 0 0 3.4rem;
}
/* Inside the row's box, so a focus ring never reflows the list. Warm, like the open-leaf outline:
   both answer "where am I", which is a different question from "what is this". */
.dataset-tree__row:focus-visible {
  outline: 2px solid var(--dataset-tree-focus);
  outline-offset: -2px;
}
.dataset-tree__row--inert {
  cursor: default;
}

.dataset-tree__chev {
  flex: 0 0 auto;
  width: var(--dataset-tree-chev-size);
  height: var(--dataset-tree-chev-size);
  color: var(--dataset-tree-faint);
  transition: transform 0.15s ease;
}
.dataset-tree__row[aria-expanded="true"] > .dataset-tree__chev {
  transform: rotate(90deg);
}
.dataset-tree__chev--leaf {
  visibility: hidden;
}
/* Expand all / Collapse change every chevron in the tree at once. One rotation is a hint about one
   branch; two hundred simultaneous rotations on a list that has just changed height is a frame
   budget nobody has, and reads as a glitch rather than as motion. */
.dataset-tree.is-bulk .dataset-tree__chev {
  transition: none;
}

.dataset-tree__icon {
  flex: 0 0 auto;
  width: var(--dataset-tree-icon-size);
  height: var(--dataset-tree-icon-size);
  color: var(--dataset-tree-faint);
}
.dataset-tree__icon--dataset {
  color: var(--dataset-tree-accent);
}
.dataset-tree__icon--collection {
  color: var(--dataset-tree-muted);
}

.dataset-tree__name {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* A collection is the heading of its own branch, so it is set heavier and given a little more room
   than the directories under it. The selector goes through \`__rowline\`, because the row is wrapped
   in one so that a details toggle can sit beside it without nesting one button inside another:
   \`.dataset-tree__node--collection > .dataset-tree__row\` matches nothing at all, and the one
   distinction a two-level tree needs most is lost silently. */
.dataset-tree__node--collection
  > .dataset-tree__rowline
  > .dataset-tree__row
  > .dataset-tree__name {
  font-weight: 600;
}
.dataset-tree__node--collection > .dataset-tree__rowline > .dataset-tree__row {
  padding-block: 0.42rem;
}
/* A collection's description is part of its heading, so it carries the heading's weight and only
   its colour and size step down. Set apart as a lighter face it reads as a caption belonging to the
   row below rather than as the rest of the line it is on. */
.dataset-tree__node--collection > .dataset-tree__rowline > .dataset-tree__row > .dataset-tree__sub {
  font-weight: 600;
}
.dataset-tree__name--mono {
  font-family: var(--dataset-tree-font-mono);
  font-size: 0.92em;
}
/* A loose file is shown but de-emphasised: it is not a dataset and nothing opens it. */
.dataset-tree__node--file > .dataset-tree__rowline > .dataset-tree__row .dataset-tree__name {
  color: var(--dataset-tree-muted);
}
/* The matched substring, not the whole label. \`mark\` rather than a span: the element already means
   "relevant to the reader's current activity", which is exactly what a filter hit is, and it
   survives forced-colours mode where a background declaration does not. */
.dataset-tree__mark {
  background: var(--dataset-tree-hit);
  color: inherit;
  border-radius: 0.2rem;
  padding: 0 0.05em;
}

/* The project link beside a collection's description. */
.dataset-tree__doclink {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  margin-left: 0.1rem;
  padding: 0.15rem;
  border-radius: 0.25rem;
  color: var(--dataset-tree-faint);
  text-decoration: none;
}
.dataset-tree__doclink:hover {
  color: var(--dataset-tree-accent-text);
}
.dataset-tree__doclink:focus-visible {
  outline: 2px solid var(--dataset-tree-accent);
  outline-offset: 1px;
}
.dataset-tree__doclink-icon {
  width: 12px;
  height: 12px;
}

.dataset-tree__sub {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--dataset-tree-muted);
  font-size: 0.9em;
}

.dataset-tree__spacer {
  flex: 1 1 auto;
}

/* row meta */

/* The availability note: one pill, one colour, the case the source wrote it in. There is
   deliberately no per-state variant - a colour-coded taxonomy of amber PLANNED and red RESTRICTED
   is a status vocabulary this component invents and imposes on every archive it renders, and it
   shouts on a row that is otherwise quiet text. */
.dataset-tree__badge {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.68rem;
  padding: 0.12rem 0.45rem;
  border-radius: 1rem;
  border: 1px solid var(--dataset-tree-border);
  color: var(--dataset-tree-muted);
  background: color-mix(in srgb, var(--dataset-tree-text) 4%, transparent);
  white-space: nowrap;
}
.dataset-tree__badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid currentColor;
  background: transparent;
  flex: 0 0 auto;
}

/* A source-declared metric, e.g. \`HP 7\`. Bordered and monospace, at the same size as the size
   beside it, in the row's muted colour - a fact, not a status. The label is set a shade lighter
   than the value so the pair reads as one quantity rather than as two words. */
.dataset-tree__lvl {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: baseline;
  gap: 0.28rem;
  font-family: var(--dataset-tree-font-mono);
  font-size: 0.64rem;
  color: var(--dataset-tree-muted);
  border: 1px solid var(--dataset-tree-border);
  border-radius: 0.3rem;
  padding: 0.04rem 0.32rem;
  white-space: nowrap;
}
.dataset-tree__lvl-key {
  color: var(--dataset-tree-faint);
}
/* The muted token, not the faint one. \`--dataset-tree-faint\` is \`muted\` at 72% alpha and exists for
   GLYPHS - chevron, magnifier, placeholder - which are decorative and carry no contrast
   requirement. This is text: a byte count somebody reads, at 0.68rem, exactly the size at which a
   washed-out colour stops being readable. Faint measures 3.24:1 on the light theme and 3.44:1 on
   the dark against a required 4.5:1; the muted token is over 6:1 on both. */
.dataset-tree__size {
  flex: 0 0 auto;
  font-size: 0.68rem;
  color: var(--dataset-tree-muted);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

/* details */

.dataset-tree__details {
  /* The right inset is the body's now, so this ends where the rows above it end. */
  margin: 0.1rem 0 0.5rem 1.7rem;
  padding: 0.6rem 0.7rem;
  border: 1px solid var(--dataset-tree-border);
  border-left: 2px solid var(--dataset-tree-accent);
  border-radius: 0.4rem;
  background: var(--dataset-tree-bg-subtle);
}
.dataset-tree__actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 0.45rem;
}
.dataset-tree__dname {
  flex: 1 1 8rem;
  min-width: 0;
  font-family: var(--dataset-tree-font-mono);
  font-weight: 600;
  font-size: 0.78rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dataset-tree__path {
  display: flex;
  align-items: center;
  font-family: var(--dataset-tree-font-mono);
  font-size: 0.74rem;
  background: var(--dataset-tree-code-bg);
  border-radius: 0.3rem;
  padding: 0.35rem 0.5rem;
  overflow-x: auto;
}
.dataset-tree__path code {
  background: none;
  padding: 0;
  flex: 1 1 auto;
  min-width: 0;
  white-space: normal;
  word-break: break-all;
  font: inherit;
}

/* The copy control lives in the box, at the end of the address. The address wraps rather than
   scrolling sideways, so no part of it can end up behind the glyph and there is nothing for the
   control to stay pinned against: it sits on the first line and the key runs on underneath it. */
.dataset-tree__details .dataset-tree__path,
.dataset-tree__infocard .dataset-tree__path {
  gap: 0.4rem;
  padding-right: 0.25rem;
  align-items: flex-start;
  min-width: 0;
  overflow-x: visible;
}
.dataset-tree__path-copy {
  align-self: flex-start;
  flex: 0 0 auto;
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: 0;
  border-radius: 0.3rem;
  background: var(--dataset-tree-code-bg);
  color: var(--dataset-tree-muted);
  cursor: pointer;
  transition: color 0.12s ease;
}
.dataset-tree__path-copy:hover {
  color: var(--dataset-tree-accent-text);
}
.dataset-tree__path-copy.is-done {
  color: var(--dataset-tree-accent-text);
}
.dataset-tree__path-copy.is-failed {
  color: var(--dataset-tree-danger);
}
.dataset-tree__path-copy:focus-visible {
  outline: 2px solid var(--dataset-tree-accent);
  outline-offset: 1px;
}
.dataset-tree__copy-icon {
  width: 0.85rem;
  height: 0.85rem;
}

.dataset-tree__meta {
  margin-top: 0.5rem;
  display: grid;
  gap: 0.4rem;
}
.dataset-tree__metarow {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  flex-wrap: wrap;
}
.dataset-tree__metakey {
  flex: 0 0 4.2rem;
  color: var(--dataset-tree-muted);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.dataset-tree__chip {
  font-family: var(--dataset-tree-font-mono);
  font-size: 0.68rem;
  background: var(--dataset-tree-code-bg);
  border-radius: 0.3rem;
  padding: 0.08rem 0.38rem;
  overflow-wrap: anywhere;
}
.dataset-tree__chip b {
  color: var(--dataset-tree-accent-text);
  font-weight: 600;
}
.dataset-tree__prose {
  flex: 1 1 12rem;
  min-width: 0;
  color: var(--dataset-tree-muted);
  overflow-wrap: anywhere;
}
.dataset-tree__link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--dataset-tree-accent-text);
  text-decoration: none;
  font-size: 0.72rem;
  border-bottom: 1px solid transparent;
}
.dataset-tree__link:hover {
  border-bottom-color: currentColor;
}
.dataset-tree__link:focus-visible {
  outline: 2px solid var(--dataset-tree-accent);
  outline-offset: 2px;
  border-radius: 0.2rem;
}
.dataset-tree__link-icon {
  width: 12px;
  height: 12px;
}

/* access */

.dataset-tree__access {
  margin-top: 0.55rem;
}
.dataset-tree__disclose {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  appearance: none;
  border: 1px solid color-mix(in srgb, var(--dataset-tree-accent) 35%, var(--dataset-tree-border));
  background: color-mix(in srgb, var(--dataset-tree-accent) 7%, var(--dataset-tree-bg));
  border-radius: var(--dataset-tree-radius-sm);
  padding: 0.34rem 0.55rem;
  cursor: pointer;
  color: var(--dataset-tree-accent-text);
  font: inherit;
  font-size: 0.74rem;
  font-weight: 600;
  transition:
    background 0.12s,
    border-color 0.12s;
}
.dataset-tree__disclose:hover {
  background: color-mix(in srgb, var(--dataset-tree-accent) 13%, var(--dataset-tree-bg));
}
.dataset-tree__disclose:focus-visible {
  outline: 2px solid var(--dataset-tree-accent);
  outline-offset: 1px;
}
.dataset-tree__info {
  width: 0.95rem;
  height: 0.95rem;
  flex: 0 0 auto;
}
.dataset-tree__disclose > .dataset-tree__chev {
  width: 0.85rem;
  height: 0.85rem;
  margin-left: auto;
  color: inherit;
}
.dataset-tree__disclose.is-open > .dataset-tree__chev {
  transform: rotate(90deg);
}
.dataset-tree__access-body {
  margin-top: 0.4rem;
}
.dataset-tree__access-body[hidden] {
  display: none;
}
.dataset-tree__tabbar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 0.35rem;
}
.dataset-tree__tabs {
  display: inline-flex;
  gap: 0.2rem;
  flex-wrap: wrap;
}
.dataset-tree__tab {
  appearance: none;
  border: 1px solid var(--dataset-tree-border);
  background: var(--dataset-tree-bg);
  color: var(--dataset-tree-muted);
  border-radius: 0.3rem;
  padding: 0.16rem 0.55rem;
  font: inherit;
  font-size: 0.68rem;
  cursor: pointer;
  transition:
    color 0.12s,
    border-color 0.12s,
    background 0.12s;
}
.dataset-tree__tab:hover {
  color: var(--dataset-tree-accent-text);
  border-color: var(--dataset-tree-accent);
}
.dataset-tree__tab:focus-visible {
  outline: 2px solid var(--dataset-tree-accent);
  outline-offset: 1px;
}
.dataset-tree__tab.is-active {
  color: var(--dataset-tree-accent-ink);
  background: var(--dataset-tree-accent-strong);
  border-color: var(--dataset-tree-accent-strong);
}

.dataset-tree__codecard {
  border: 1px solid var(--dataset-tree-border);
  border-radius: var(--dataset-tree-radius-sm);
  overflow: hidden;
}
/* The card's title bar, which carries the two controls that act on the code under it. \`min-height\`
   keeps a runnable snippet and a copy-only one the same shape: the run control is taller than the
   copy control, so without it a card has a visibly shallower header than the card in the other tab,
   and switching tabs moves the code. */
.dataset-tree__codehead {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 1.9rem;
  padding: 0.2rem 0.3rem 0.2rem 0.5rem;
  background: color-mix(in srgb, var(--dataset-tree-text) 5%, var(--dataset-tree-code-bg));
  border-bottom: 1px solid var(--dataset-tree-border);
}
/* Quieter than the same controls are in the tab strip, because they are inside a card rather than
   on the panel. A copy control in a code header is a thing readers find by looking at the header,
   not a thing that has to catch the eye from across the panel. */
.dataset-tree__codehead > .dataset-tree__btn {
  padding: 0.12rem 0.45rem;
  font-size: 0.66rem;
}
/* Full-strength text, not the muted colour the same button takes in the toolbar - an accessibility
   fix rather than a preference. The card's header sits on a tint of the ink over the code
   background, so it is a darker ground in a light theme than the panel is, and
   \`--dataset-tree-muted\` on it measures below 4.5:1 at this size, which axe caught. Dropping the
   border and the fill is what makes this control quiet enough for a header; the letters themselves
   have to stay readable. */
.dataset-tree__codehead > .dataset-tree__btn:not(.dataset-tree__btn--primary) {
  border-color: transparent;
  background: transparent;
  color: var(--dataset-tree-text);
}
.dataset-tree__codehead > .dataset-tree__btn:not(.dataset-tree__btn--primary):hover {
  border-color: var(--dataset-tree-border);
  color: var(--dataset-tree-accent-text);
}
.dataset-tree__dots {
  display: inline-flex;
  gap: 0.26rem;
}
.dataset-tree__dots i {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--dataset-tree-border);
}
/* Beside the window dots it belongs with. \`margin-left: auto\` is gone: the spacer after it is what
   pushes the controls to the right edge, so the caption stays with the card's identity. */
.dataset-tree__lang {
  font-family: var(--dataset-tree-font-mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--dataset-tree-faint);
}
.dataset-tree__code {
  margin: 0;
  font-family: var(--dataset-tree-font-mono);
  font-size: 0.72rem;
  line-height: 1.5;
  background: var(--dataset-tree-code-bg);
  padding: 0.5rem 0.6rem;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.dataset-tree__code code {
  background: none;
  padding: 0;
  font: inherit;
  white-space: inherit;
}

/* states */

.dataset-tree__msg {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.6rem 0.8rem;
  color: var(--dataset-tree-muted);
  font-size: 0.78rem;
}
.dataset-tree__msg--error {
  color: var(--dataset-tree-danger);
}
.dataset-tree__msg-text {
  overflow-wrap: anywhere;
}
.dataset-tree__spin {
  flex: 0 0 auto;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--dataset-tree-border);
  border-top-color: var(--dataset-tree-accent);
  animation: dataset-tree-spin 0.7s linear infinite;
}
@keyframes dataset-tree-spin {
  to {
    transform: rotate(360deg);
  }
}

/* footer */

/* The footer: where you are, then what this catalogue is. The path is the part that changes while
   you browse, so it leads and takes the room; the status pill is fixed for the life of the mount
   and sits at the end. */
.dataset-tree__foot {
  display: flex;
  align-items: center;
  /* Wraps rather than overflows. The endpoint does not truncate, so on a panel too narrow for even
     a fully collapsed path plus the status pill plus the endpoint, the alternative to a second line
     is a footer wider than the panel it is in. */
  flex-wrap: wrap;
  gap: 0.35rem 0.75rem;
  padding: 0.4rem 0.6rem;
  border-top: 1px solid var(--dataset-tree-border);
  background: var(--dataset-tree-bg-subtle);
  color: var(--dataset-tree-faint);
  font-size: 0.68rem;
}
/* The status end of the footer, and what gives way when there is not enough room. \`flex: 0 1 auto\`
   rather than \`0 0 auto\`: the footer carries the selected path as well, and a status block that
   refuses to shrink pushes the whole bar past the component's own edge in a narrow container - a
   320px sidebar with an endpoint URL in it overflows by 124px. The status PILL keeps its size; the
   two facts beside it truncate worst-first (the endpoint before the timestamp), which is why each
   is its own flex item with \`min-width: 0\`. */
.dataset-tree__foot-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 0 1 auto;
  min-width: 0;
  margin-left: auto;
}
.dataset-tree__foot-status > .dataset-tree__mode {
  flex: 0 0 auto;
}

/* --- the selected path ------------------------------------------------- */

.dataset-tree__path {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  flex: 1 1 auto;
  /* A floor, not zero. This is the footer's flexible item, so it is what gives way when the row is
     tight - and with \`min-width: 0\` it gives way completely: flex squeezes it to a few pixels, the
     fitter hides every segment it can, and what is left is an ellipsis and a clipped fragment of
     the store name. Below this width the FOOTER wraps, which costs a line and keeps both facts
     whole. */
  min-width: 8rem;
  margin: 0;
  /* Anything past the fitter's reach still scrolls rather than wrapping the path itself: the footer
     sits under a fixed-height body, and a path that changed height as you browsed would make the
     tree jump. */
  overflow-x: auto;
  scrollbar-width: none;
}
.dataset-tree__path::-webkit-scrollbar {
  display: none;
}
/* The empty-selection placeholder, in \`muted\` and not \`faint\`. \`faint\` is a 72% wash of muted, fine
   behind a separator or a unit but 3.1:1 against the footer's own background at 11.8px - below the
   4.5:1 that body text this size has to clear. The italic is what marks it as a placeholder rather
   than a path; the colour does not have to. */
.dataset-tree__path--empty {
  color: var(--dataset-tree-muted);
  font-style: italic;
}
.dataset-tree__path-step {
  flex: 0 0 auto;
  padding: 0.1rem 0.3rem;
  border: 0;
  border-radius: var(--dataset-tree-radius-sm);
  background: transparent;
  color: var(--dataset-tree-muted);
  font: inherit;
  font-family: var(--dataset-tree-font-mono);
  white-space: nowrap;
  cursor: pointer;
}
.dataset-tree__path-step:hover {
  background: var(--dataset-tree-bg-subtle);
  color: var(--dataset-tree-accent-text);
}
.dataset-tree__path-step[aria-current="true"] {
  color: var(--dataset-tree-text);
  font-weight: 600;
}
.dataset-tree__path-sep {
  flex: 0 0 auto;
  color: var(--dataset-tree-faint);
}
.dataset-tree__path-sep[hidden],
.dataset-tree__path-step[hidden],
.dataset-tree__path-more[hidden] {
  display: none;
}
/* The middle, when it did not fit: one control, the width of an ellipsis, that gives it back.
   Styled as a step rather than as a button - it stands in a row of path segments, where a bordered
   control would read as a segment named \`…\`. What marks it pressable is the segments' own hover. */
.dataset-tree__path-more {
  flex: 0 0 auto;
  padding: 0.1rem 0.25rem;
  border: 0;
  border-radius: var(--dataset-tree-radius-sm);
  background: transparent;
  color: var(--dataset-tree-muted);
  font: inherit;
  line-height: 1;
  cursor: pointer;
}
.dataset-tree__path-more:hover {
  background: var(--dataset-tree-row-hover);
  color: var(--dataset-tree-text);
}
.dataset-tree__path-more:focus-visible {
  outline: 2px solid var(--dataset-tree-focus);
  outline-offset: 1px;
}
/* Expanded, the path is allowed to wrap rather than to scroll: the reader has just said they want
   the whole thing, and scrolling it sideways would answer them with the same problem. It is the one
   state where the footer may take a second line, and it lasts until they choose something else. */
.dataset-tree__path.is-expanded {
  flex-wrap: wrap;
  overflow-x: visible;
}

/*
 * The open leaf, outlined - and nothing at all for an open branch. An accent-tinted capsule with a
 * marker down its left edge, on every selectable row, puts the treatment that means "this is the
 * thing you opened" on an ordinary directory, above a panel only a store should have. So it belongs
 * to LEAVES: a leaf's row is the control that opens its panel and the outline says the panel below
 * belongs to it, while a directory opening is already reported by its chevron and by the children
 * that appear underneath. An OUTLINE, drawn inside the row's own box, so becoming current changes
 * no dimension and moves no neighbour by a pixel, which a filled capsule with a left marker does
 * not; and the WARM accent, so it cannot be confused with the teal that marks what a store is.
 */
.dataset-tree__node--dataset > .dataset-tree__rowline > .dataset-tree__row[aria-current="true"],
.dataset-tree__node--file > .dataset-tree__rowline > .dataset-tree__row[aria-current="true"] {
  outline: 1.5px solid var(--dataset-tree-focus);
  outline-offset: -1.5px;
}
.dataset-tree__mode {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.12rem 0.5rem;
  border: 1px solid var(--dataset-tree-border);
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--dataset-tree-muted);
}
.dataset-tree__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  flex: 0 0 auto;
}
.dataset-tree__mode--live {
  color: var(--dataset-tree-accent-text);
  border-color: color-mix(in srgb, var(--dataset-tree-accent) 40%, transparent);
  background: color-mix(in srgb, var(--dataset-tree-accent) 10%, transparent);
}
/*
 * The live dot is static, and there is no pulse. An expanding, fading \`box-shadow\` ring is not
 * compositable: every step repaints the dot and, because the shadow grows outside the element's own
 * box, the repaint is charged to its ancestors. Measured on an M3 with Chrome, a static dot costs
 * 290.23 ms/s of Chrome process CPU on a stationary sky view against 562.55 animated, and 266.84 at
 * the coast against 453.08, with recorded Paint events in those views at zero rather than roughly
 * 120/s - the single largest cost on an idle page. Kept: the dot, its accent colour, the LIVE
 * label, the status meaning, the accessible name and every data behaviour - a live source still
 * reads as live, it just does not blink. There are no keyframes and no \`prefers-reduced-motion\`
 * rule here, because there is nothing to turn off.
 */
.dataset-tree__mode--live .dataset-tree__dot {
  box-shadow: none;
}
.dataset-tree__mode--snapshot {
  color: var(--dataset-tree-accent-text);
}
.dataset-tree__foot-detail {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--dataset-tree-muted);
}
/* The footer's two facts are separated, not merely spaced: a timestamp and an endpoint side by side
   in the same muted colour read as one run of text. The separator is drawn by the stylesheet, not
   concatenated into either string, so neither a catalogue's \`generatedAt\` nor its \`source\` has
   punctuation a consumer did not write, and a footer carrying only one gets no dangling mark. */
.dataset-tree__foot-detail + .dataset-tree__foot-code::before {
  content: "\xb7";
  margin-right: 0.35rem;
  color: var(--dataset-tree-faint);
}
.dataset-tree__foot-code {
  /* Never truncated. The endpoint is WHICH ARCHIVE THIS IS - the one fact in the footer a reader
     may need to copy, quote in a bug report, or check before trusting a listing - and a truncated
     "https://s3.example.org/..." answers none of those questions, so shrinking it at twice the
     timestamp's rate, on the reasoning that "2026-01-06 10:00 UTC" is worth more, is the wrong way
     round. It can afford not to shrink because something else can: the selected path is a flexible
     item that collapses through its own middle (see \`fitPath\`). */
  flex: 0 0 auto;
  white-space: nowrap;
  font-family: var(--dataset-tree-font-mono);
  color: var(--dataset-tree-muted);
}

/* narrow */

/* Container-relative, not viewport-relative: this component is as likely to sit in a 320px sidebar
   on a desktop as on a phone, and a viewport media query gets that case exactly backwards. */
/* A smaller step, never a cancelled one. Seven levels at the desktop step is 118px of a 320px
   panel, which is most of the room the names need. Two thirds of it still separates every pair of
   adjacent levels by more than the rail's own width, which is the property that has to survive: a
   narrow tree that gave up its steps would be the defect this rule exists to fix. */
@container (max-width: 30rem) {
  .dataset-tree {
    --dataset-tree-indent: 0.7rem;
  }
  .dataset-tree__sub {
    display: none;
  }
  .dataset-tree__details {
    margin-left: 0.6rem;
  }
}
@media (max-width: 30rem) {
  .dataset-tree {
    --dataset-tree-indent: 0.7rem;
  }
  .dataset-tree__details {
    margin-left: 0.6rem;
  }
  .dataset-tree__metakey {
    flex-basis: 100%;
  }
}

/* motion */

@media (prefers-reduced-motion: reduce) {
  .dataset-tree__chev,
  .dataset-tree__btn,
  .dataset-tree__tab,
  .dataset-tree__disclose,
  .dataset-tree__info-btn,
  .dataset-tree__path-copy {
    transition: none;
  }
  /* The LIVE dot is not named here: it has no animation to turn off. The spinner keeps its
     exemption because it is a functional loading indicator, not decoration. */
  .dataset-tree__spin {
    animation: none;
  }
  .dataset-tree__spin {
    border-top-color: var(--dataset-tree-accent);
  }
}
`,""]),a.d(t,{},{A:i})},411(e,t,a){var r=a(377),o=a.n(r),n=a(935),i=(a.n(n))()(o());i.push([e.id,`/* The data panel. The dataset tree takes its colours from the --surface/--ink/... tokens it
   reads from its host; they are mapped onto JupyterLab's theme variables here. */
.jp-FrevaData {
  --surface: var(--jp-layout-color1);
  --surface-2: var(--jp-layout-color2);
  --ink: var(--jp-ui-font-color1);
  --muted: var(--jp-ui-font-color2);
  --line: var(--jp-border-color2);
  --line-2: var(--jp-border-color1);
  --accent: var(--jp-brand-color1);
  --accent-ink: var(--jp-ui-inverse-font-color0);
  --font-mono: var(--jp-code-font-family);
  display: flex;
  flex-direction: column;
  min-width: 260px;
  background: var(--jp-layout-color1);
  color: var(--jp-ui-font-color1);
}
/* The selected node, and its actions, in a card above the tree. */
.jp-FrevaData-selection {
  flex: 0 0 auto;
  margin: 8px 8px 4px;
  padding: 8px 10px;
  border: 1px solid var(--jp-border-color2);
  border-radius: 10px;
  background: var(--jp-layout-color2);
  container-type: inline-size;
}
.jp-FrevaData-selection.jp-mod-empty {
  border-style: dashed;
  background: transparent;
}
.jp-FrevaData-hint {
  color: var(--jp-ui-font-color2);
  font-size: var(--jp-ui-font-size1);
  line-height: 1.4;
}
/* One height in every state: a name line, then two detail lines. */
.jp-FrevaData-selectedHead {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  height: 20px;
}
.jp-FrevaData-selectedName.jp-mod-placeholder {
  color: var(--jp-ui-font-color2);
  font-weight: 400;
}
.jp-FrevaData-detail {
  height: calc(2 * 1.4 * var(--jp-ui-font-size1));
  margin-top: 2px;
  overflow: hidden;
}
.jp-FrevaData-detail > * {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
.jp-FrevaData-selectedName {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  font-size: var(--jp-ui-font-size2);
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.jp-FrevaData-kind {
  flex: 0 0 auto;
  padding: 0 7px;
  border-radius: 5px;
  background: color-mix(in srgb, var(--jp-ui-font-color2) 14%, transparent);
  color: var(--jp-ui-font-color2);
  font-size: var(--jp-ui-font-size0);
  line-height: 18px;
}
.jp-FrevaData-kind.jp-mod-dataset,
.jp-FrevaData-kind.jp-mod-file {
  background: color-mix(in srgb, var(--jp-brand-color1) 16%, transparent);
  color: var(--jp-brand-color1);
}
.jp-FrevaData-selectedPath {
  color: var(--jp-ui-font-color2);
  font-family: var(--jp-code-font-family);
  font-size: var(--jp-ui-font-size0);
  line-height: 1.4;
  overflow-wrap: anywhere;
}
/* The primary action across the card, then the others as tiles sharing one row: an icon over a
   short label. */
.jp-FrevaData-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
}
.jp-FrevaData-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--jp-ui-font-color1);
  font-family: var(--jp-ui-font-family);
  letter-spacing: normal;
  text-transform: none;
  cursor: pointer;
  transition:
    background 120ms ease,
    color 120ms ease;
}
.jp-FrevaData-action[hidden] {
  display: none;
}
.jp-FrevaData-action:focus-visible {
  outline: 2px solid var(--jp-brand-color1);
  outline-offset: 1px;
}
.jp-FrevaData-action[aria-disabled="true"] {
  cursor: default;
  opacity: 0.4;
}
.jp-FrevaData-action.jp-mod-primary {
  flex: 1 0 100%;
  gap: 8px;
  height: 32px;
  padding: 0 12px;
  background: var(--jp-brand-color1);
  color: var(--jp-ui-inverse-font-color1);
  font-size: var(--jp-ui-font-size1);
  font-weight: 600;
}
.jp-FrevaData-action.jp-mod-primary:hover:not([aria-disabled="true"]) {
  background: color-mix(in srgb, var(--jp-brand-color1) 85%, var(--jp-ui-font-color0));
}
.jp-FrevaData-action.jp-mod-primary[aria-disabled="true"] {
  border-color: var(--jp-border-color1);
  background: transparent;
  color: var(--jp-ui-font-color1);
}
.jp-FrevaData-action.jp-mod-tile {
  flex: 1 1 0;
  flex-direction: column;
  gap: 3px;
  height: 48px;
  padding: 4px 2px;
  border-color: var(--jp-border-color2);
  background: var(--jp-layout-color1);
  font-size: var(--jp-ui-font-size0);
}
.jp-FrevaData-action.jp-mod-tile:hover:not([aria-disabled="true"]) {
  border-color: color-mix(in srgb, var(--jp-brand-color1) 45%, var(--jp-border-color2));
  color: var(--jp-brand-color1);
}
/* "More actions": only in a narrow panel, where it stands in for the tiles. */
.jp-FrevaData-action.jp-mod-more {
  display: none;
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  border-color: var(--jp-border-color1);
}
.jp-FrevaData-action.jp-mod-more:hover {
  color: var(--jp-brand-color1);
}
@container (max-width: 300px) {
  .jp-FrevaData-actions {
    flex-wrap: nowrap;
  }
  .jp-FrevaData-action.jp-mod-primary {
    flex: 1 1 auto;
  }
  .jp-FrevaData-action.jp-mod-tile {
    display: none;
  }
  .jp-FrevaData-action.jp-mod-more {
    display: inline-flex;
  }
}
/* Just ran: says so ("Copied", "Opened") for a moment. */
.jp-FrevaData-action.jp-mod-done.jp-mod-tile {
  border-color: color-mix(in srgb, var(--jp-success-color1) 55%, transparent);
  color: var(--jp-success-color1);
}
.jp-FrevaData-actionLabel {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.jp-FrevaData-actionIcon {
  display: inline-flex;
  flex: 0 0 auto;
}
.jp-FrevaData-actionIcon svg,
.jp-FrevaData-actionIcon img {
  width: 16px;
  height: 16px;
}
/* Where else the actions are: the context menu, dragging onto a notebook. */
.jp-FrevaData-tip {
  display: flex;
  gap: 6px;
  align-items: flex-start;
  margin-top: 8px;
  color: var(--jp-ui-font-color2);
  font-size: var(--jp-ui-font-size0);
  line-height: 1.4;
}
.jp-FrevaData-tip::before {
  content: "";
  flex: 0 0 auto;
  width: 9px;
  height: 13px;
  margin-top: 1px;
  border: 1.5px solid currentcolor;
  border-radius: 5px;
  background: linear-gradient(to right, transparent 50%, currentcolor 50%) top / 100% 45% no-repeat;
}
.jp-FrevaData-tree {
  flex: 1 1 auto;
  overflow: auto;
  padding: 4px;
}
.jp-FrevaData-error {
  padding: 8px;
  color: var(--jp-error-color1);
}
.jp-FrevaData-dragImage {
  padding: 4px 8px;
  border-radius: 4px;
  background: var(--jp-layout-color2);
  color: var(--jp-ui-font-color1);
  border: 1px solid var(--jp-border-color1);
  font-size: var(--jp-ui-font-size1);
}
/* The example gallery: a dialog of cards, each with its notebook's own figure. */
.jp-FrevaData-galleryDialog .jp-Dialog-content {
  width: min(980px, 94vw);
  max-width: none;
  max-height: 88vh;
}
.jp-FrevaData-galleryDialog .jp-Dialog-body {
  overflow: auto;
}
.jp-FrevaData-gallery {
  display: flex;
  flex-direction: column;
  gap: 12px;
  container-type: inline-size;
}
.jp-FrevaData-galleryIntro {
  margin: 0;
  color: var(--jp-ui-font-color2);
}
.jp-FrevaData-gallerySearch {
  box-sizing: border-box;
  width: 100%;
  padding: 7px 10px;
  border: 1px solid var(--jp-border-color1);
  border-radius: 8px;
  background: var(--jp-layout-color0);
  color: var(--jp-ui-font-color1);
  font: inherit;
}
.jp-FrevaData-gallerySearch:focus-visible {
  outline: 2px solid var(--jp-brand-color1);
  outline-offset: 1px;
}
.jp-FrevaData-galleryGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}
.jp-FrevaData-galleryCard {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--jp-border-color2);
  border-radius: 12px;
  background: var(--jp-layout-color1);
  color: var(--jp-ui-font-color1);
  text-align: left;
  font: inherit;
  cursor: pointer;
  transition:
    transform 140ms ease,
    box-shadow 140ms ease,
    border-color 140ms ease;
}
/* The dialog styles every button in it as one of its own (\`jp-mod-styled\`: 32px high,
   centred, spaced letters): a card is not one of those. */
.jp-FrevaData-gallery button.jp-FrevaData-galleryCard {
  height: auto;
  padding: 0;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  font-size: var(--jp-ui-font-size1);
  border: 1px solid var(--jp-border-color2);
  appearance: none;
}
.jp-FrevaData-gallery input.jp-FrevaData-gallerySearch {
  height: auto;
  padding: 7px 10px;
  border: 1px solid var(--jp-border-color1);
  border-radius: 8px;
}
.jp-FrevaData-galleryCard[hidden] {
  display: none;
}
.jp-FrevaData-galleryCard:hover,
.jp-FrevaData-galleryCard:focus-visible {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--jp-brand-color1) 55%, var(--jp-border-color2));
  box-shadow: 0 8px 22px color-mix(in srgb, #000 18%, transparent);
  outline: none;
}
.jp-FrevaData-galleryCard:focus-visible {
  outline: 2px solid var(--jp-brand-color1);
  outline-offset: 2px;
}
/* The figure: on white, as the figures were drawn; a shimmer while the notebook is read. */
.jp-FrevaData-galleryFigure {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid var(--jp-border-color2);
}
.jp-FrevaData-galleryImage {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 300ms ease;
}
.jp-FrevaData-galleryCard:hover .jp-FrevaData-galleryImage {
  transform: scale(1.04);
}
.jp-FrevaData-galleryCard.jp-mod-loading .jp-FrevaData-galleryFigure {
  background: linear-gradient(
    100deg,
    var(--jp-layout-color2) 30%,
    var(--jp-layout-color3) 50%,
    var(--jp-layout-color2) 70%
  );
  background-size: 300% 100%;
  animation: jp-FrevaData-shimmer 1.4s linear infinite;
}
.jp-FrevaData-galleryFigure.jp-mod-noImage {
  background: var(--jp-layout-color2);
}
@keyframes jp-FrevaData-shimmer {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: 0 0;
  }
}
.jp-FrevaData-galleryNumber {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 1px 7px;
  border-radius: 6px;
  background: color-mix(in srgb, #0b1117 72%, transparent);
  color: #fff;
  font-size: var(--jp-ui-font-size0);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.jp-FrevaData-galleryRibbon {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 1px 8px;
  border-radius: 6px;
  background: var(--jp-brand-color1);
  color: var(--jp-ui-inverse-font-color1);
  font-size: var(--jp-ui-font-size0);
  font-weight: 600;
}
.jp-FrevaData-galleryBody {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 5px;
  padding: 10px 12px 11px;
}
.jp-FrevaData-galleryTitle {
  font-size: var(--jp-ui-font-size2);
  font-weight: 600;
  line-height: 1.3;
}
.jp-FrevaData-galleryText {
  display: -webkit-box;
  min-height: 2.8em;
  overflow: hidden;
  color: var(--jp-ui-font-color2);
  font-size: var(--jp-ui-font-size1);
  line-height: 1.4;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.jp-FrevaData-galleryMeta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 4px;
  color: var(--jp-ui-font-color3);
  font-size: var(--jp-ui-font-size0);
}
.jp-FrevaData-galleryMine {
  padding: 0 6px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--jp-success-color1) 16%, transparent);
  color: var(--jp-success-color1);
  font-weight: 600;
}
.jp-FrevaData-galleryOpen {
  margin-left: auto;
  color: var(--jp-brand-color1);
  font-weight: 600;
  opacity: 0;
  transition: opacity 140ms ease;
}
.jp-FrevaData-galleryCard:hover .jp-FrevaData-galleryOpen,
.jp-FrevaData-galleryCard:focus-visible .jp-FrevaData-galleryOpen {
  opacity: 1;
}
.jp-FrevaData-galleryEmpty {
  margin: 8px 0;
  color: var(--jp-ui-font-color2);
  text-align: center;
}
@media (prefers-reduced-motion: reduce) {
  .jp-FrevaData-galleryCard,
  .jp-FrevaData-galleryImage {
    transition: none;
  }
  .jp-FrevaData-galleryCard:hover,
  .jp-FrevaData-galleryCard:hover .jp-FrevaData-galleryImage {
    transform: none;
  }
  .jp-FrevaData-galleryCard.jp-mod-loading .jp-FrevaData-galleryFigure {
    animation: none;
  }
}
/* <data-inspector>, embedded: it fills the tab; its colours are the theme's. */
.jp-FrevaData-inspector {
  position: relative;
  overflow: hidden;
  --di-bg: var(--jp-layout-color1);
  --di-fg: var(--jp-ui-font-color1);
  --di-muted: var(--jp-ui-font-color2);
  --di-border: var(--jp-border-color1);
  --di-surface: var(--jp-layout-color2);
  --di-accent: var(--jp-brand-color1);
}
.jp-FrevaData-inspector data-inspector .xr-wrap {
  max-width: none;
}
`,""]),a.d(t,{},{A:i})},935(e){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var a="",r=void 0!==t[5];return t[4]&&(a+="@supports (".concat(t[4],") {")),t[2]&&(a+="@media ".concat(t[2]," {")),r&&(a+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),a+=e(t),r&&(a+="}"),t[2]&&(a+="}"),t[4]&&(a+="}"),a}).join("")},t.i=function(e,a,r,o,n){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var d=this[s][0];null!=d&&(i[d]=!0)}for(var l=0;l<e.length;l++){var h=[].concat(e[l]);r&&i[h[0]]||(void 0!==n&&(void 0===h[5]||(h[1]="@layer".concat(h[5].length>0?" ".concat(h[5]):""," {").concat(h[1],"}")),h[5]=n),a&&(h[2]&&(h[1]="@media ".concat(h[2]," {").concat(h[1],"}")),h[2]=a),o&&(h[4]?(h[1]="@supports (".concat(h[4],") {").concat(h[1],"}"),h[4]=o):h[4]="".concat(o)),t.push(h))}},t}},377(e){e.exports=function(e){return e[1]}},591(e){var t=[];function a(e){for(var a=-1,r=0;r<t.length;r++)if(t[r].identifier===e){a=r;break}return a}function r(e,r){for(var o={},n=[],i=0;i<e.length;i++){var s=e[i],d=r.base?s[0]+r.base:s[0],l=o[d]||0,h="".concat(d," ").concat(l);o[d]=l+1;var c=a(h),p={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==c)t[c].references++,t[c].updater(p);else{var u=function(e,t){var a=t.domAPI(t);return a.update(e),function(t){t?(t.css!==e.css||t.media!==e.media||t.sourceMap!==e.sourceMap||t.supports!==e.supports||t.layer!==e.layer)&&a.update(e=t):a.remove()}}(p,r);r.byIndex=i,t.splice(i,0,{identifier:h,updater:u,references:1})}n.push(h)}return n}e.exports=function(e,o){var n=r(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<n.length;i++){var s=a(n[i]);t[s].references--}for(var d=r(e,o),l=0;l<n.length;l++){var h=a(n[l]);0===t[h].references&&(t[h].updater(),t.splice(h,1))}n=d}}},128(e){var t={};e.exports=function(e,a){var r=function(e){if(void 0===t[e]){var a=document.querySelector(e);if(window.HTMLIFrameElement&&a instanceof window.HTMLIFrameElement)try{a=a.contentDocument.head}catch(e){a=null}t[e]=a}return t[e]}(e);if(!r)throw Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(a)}},51(e){e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},855(e,t,a){e.exports=function(e){var t=a.nc;t&&e.setAttribute("nonce",t)}},740(e){e.exports=function(e){if("u"<typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(a){var r,o,n;r="",a.supports&&(r+="@supports (".concat(a.supports,") {")),a.media&&(r+="@media ".concat(a.media," {")),(o=void 0!==a.layer)&&(r+="@layer".concat(a.layer.length>0?" ".concat(a.layer):""," {")),r+=a.css,o&&(r+="}"),a.media&&(r+="}"),a.supports&&(r+="}"),(n=a.sourceMap)&&"u">typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(n))))," */")),e.styleTagTransform(r,t,e.options)},remove:function(){var e;null===(e=t).parentNode||e.parentNode.removeChild(e)}}}},656(e){e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},821(e,t,a){var r=a(591),o=a.n(r),n=a(740),i=a.n(n),s=a(128),d=a.n(s),l=a(855),h=a.n(l),c=a(51),p=a.n(c),u=a(656),m=a.n(u),f=a(984),g={};g.styleTagTransform=m(),g.setAttributes=h(),g.insert=d().bind(null,"head"),g.domAPI=i(),g.insertStyleElement=p(),o()(f.A,g),f.A&&f.A.locals&&f.A.locals;var b=a(411),v={};v.styleTagTransform=m(),v.setAttributes=h(),v.insert=d().bind(null,"head"),v.domAPI=i(),v.insertStyleElement=p(),o()(b.A,v),b.A&&b.A.locals&&b.A.locals}}]);