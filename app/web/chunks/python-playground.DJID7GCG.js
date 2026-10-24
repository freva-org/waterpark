import{b as ze,d as He,e as Ee,f as We}from"./chunk.6CVCBF6A.js";import{b as Be}from"./chunk.WAKO5HSU.js";import{b as Oe}from"./chunk.SJTHLXAW.js";import"./chunk.WXDLP45E.js";var je=`
.portal-python-window {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
/*
 * \`pointer-events\` is handed back by the window itself rather than by this shell. The shell spans
 * the whole overlay layer so the terminal's container-relative geometry has a viewport-sized box
 * to clamp against; taking pointer events too would swallow every click on the page behind it.
 */
.portal-python-window > .freva-term {
  pointer-events: auto;
}

/* the window body: a column of three */

/*
 * The window body OWNS ITS HEIGHT and hands what is left to one child. The terminal window gives
 * its body \`flex: 1 1 auto; min-height: 0\`, and everything below has to keep that going or the
 * chain breaks and the innermost element sizes to its own content - a short console at the top of
 * a maximized window with the window's background underneath it. So: the body is a column, the
 * status row and the notice are intrinsic, and the session host takes the remainder with
 * \`min-height: 0\` so its contents scroll rather than stretch it.
 */
.portal-python-window > .freva-term .term-body {
  display: flex;
  flex-direction: column;
  /* The body frames the terminal and does not scroll: the transcript inside the console is what
     scrolls, and two nested scrollers is how a prompt ends up unreachable. */
  overflow: hidden;
  padding: 0;
}
.portal-python-body {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* the compact status row */

/*
 * Intrinsic height, the window's own palette, and absent when it has nothing to say. This is where
 * the console's status goes with its own toolbar switched off: one line - "Loading browser Python\u2026
 * \u2014 downloading the Python runtime", "Python is ready", a failure - plus the session count once
 * there is more than one. Always present it would be an empty strip; growing, a second toolbar.
 */
.portal-python-status {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: calc(0.5 * var(--wp-rem, 1rem));
  padding: calc(0.3 * var(--wp-rem, 1rem)) calc(0.75 * var(--wp-rem, 1rem));
  font-size: calc(0.72 * var(--wp-rem, 1rem));
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.portal-python-status[hidden] {
  display: none;
}
.portal-python-status-text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* A dot, so the state is not carried by colour alone for a reader who cannot see the difference. */
.portal-python-status::before {
  content: "";
  flex: 0 0 auto;
  width: calc(0.45 * var(--wp-rem, 1rem));
  height: calc(0.45 * var(--wp-rem, 1rem));
  border-radius: 999px;
  background: currentcolor;
  opacity: 0.55;
}
.portal-python-status[data-state="ready"] {
  color: rgba(179, 236, 179, 0.92);
}
.portal-python-status[data-state="error"] {
  color: rgba(255, 190, 178, 0.95);
  background: rgba(255, 120, 100, 0.12);
}

/* the session, filling the window's body */

.portal-python-session {
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
}
/*
 * \`display: flex\` beats the user agent's \`[hidden] { display: none }\`, so without this an
 * inactive session stays on screen underneath the active one. Every rule in this file that sets
 * \`display\` on something that can be hidden needs its own such rule.
 */
.portal-python-session[hidden] {
  display: none;
}
/*
 * \`max-height: none\` as well as \`min-height: 0\`, because the console carries a 70vh ceiling of
 * its own for the free-standing case. Left in place it caps the terminal at 70% of the viewport
 * inside a maximized window and leaves the rest as dead space.
 */
.portal-python-session > freva-python-console,
.portal-python-session > .portal-python-frame {
  flex: 1 1 auto;
  min-height: 0;
  max-height: none;
  width: 100%;
  border: 0;
}

/* the session tabs, in the window's own title bar */

/*
 * \`inline-flex\` beats the user agent's \`[hidden]\` rule, so the strip needs its own
 * \`[hidden] { display: none }\` below to be hideable at all.
 */
.portal-python-tabbar {
  display: inline-flex;
  align-items: center;
  gap: calc(0.25 * var(--wp-rem, 1rem));
}
.portal-python-tabs {
  display: inline-flex;
  gap: calc(0.25 * var(--wp-rem, 1rem));
}
.portal-python-tabs[hidden] {
  display: none;
}
.portal-python-tab {
  display: inline-flex;
  align-items: center;
  gap: calc(0.3 * var(--wp-rem, 1rem));
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: calc(0.72 * var(--wp-rem, 1rem));
  padding: calc(0.1 * var(--wp-rem, 1rem)) calc(0.35 * var(--wp-rem, 1rem)) calc(0.1 * var(--wp-rem, 1rem)) calc(0.5 * var(--wp-rem, 1rem));
  border-radius: calc(0.3 * var(--wp-rem, 1rem));
  cursor: pointer;
  white-space: nowrap;
}
.portal-python-tab.is-active {
  background: rgba(255, 255, 255, 0.16);
}
.portal-python-tab:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 1px;
}
/*
 * The close control, inside the tab it ends. Quiet at rest and only on the tab it belongs to: a
 * row of tabs each wearing a bright cross reads as a list of things to get rid of. It is a span
 * rather than a nested \`<button>\`, which would be invalid inside the tab's own button - see the
 * note where it is built.
 */
.portal-python-tab-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.05em;
  height: 1.05em;
  border-radius: calc(0.2 * var(--wp-rem, 1rem));
  opacity: 0.5;
  line-height: 1;
  cursor: pointer;
}
.portal-python-tab-close[hidden] {
  display: none;
}
.portal-python-tab-close:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.2);
}
/*
 * The control that opens a session, at the end of the strip - where a reader of any editor with
 * tabs looks for it. Square, so it reads as an affordance rather than as a tab named plus.
 */
.portal-python-tab-add {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: calc(1.35 * var(--wp-rem, 1rem));
  height: calc(1.35 * var(--wp-rem, 1rem));
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: calc(0.85 * var(--wp-rem, 1rem));
  line-height: 1;
  border-radius: calc(0.3 * var(--wp-rem, 1rem));
  cursor: pointer;
}
.portal-python-tab-add:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.16);
}
.portal-python-tab-add:disabled {
  opacity: 0.4;
  cursor: default;
}
.portal-python-tab-add:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 1px;
}

/* the help panel */

/*
 * WHAT THE KEYS ARE, AND HOW TO GET A PACKAGE, as a panel rather than as a status line. Inside the
 * window, over its body, because a terminal's own reference belongs to that terminal; not modal
 * and it does not trap focus, because nothing behind it is unsafe to touch.
 *
 * THEY SCALE WITH THE TEXT SIZE: every size here is \`calc(Npx * var(--term-scale, 1))\`, the same
 * rule the rest of this window's chrome follows, so the reference grows with the transcript.
 *
 * AND THE SCROLLBAR IS NOT OVER THE TEXT. The scroll is on \`.portal-python-sheet-body\` rather than
 * on the panel, so the title and its close button keep their place, and \`scrollbar-gutter: stable\`
 * reserves the track whether or not it is in use - which stops a classic scrollbar taking its
 * width out of the description column and being painted over the words.
 */
.portal-python-sheet {
  position: absolute;
  right: calc(0.75 * var(--wp-rem, 1rem));
  bottom: calc(0.75 * var(--wp-rem, 1rem));
  z-index: 5;
  display: flex;
  flex-direction: column;
  width: min(calc(calc(23 * var(--wp-rem, 1rem)) * var(--term-scale, 1)), calc(100% - calc(1.5 * var(--wp-rem, 1rem))));
  max-height: calc(100% - calc(1.5 * var(--wp-rem, 1rem)));
  padding: calc(9px * var(--term-scale, 1)) calc(12px * var(--term-scale, 1));
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: calc(0.5 * var(--wp-rem, 1rem));
  background: color-mix(in srgb, var(--term-bg, #12131a) 94%, #fff 6%);
  color: var(--term-fg, inherit);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.5);
  font-size: calc(12.5px * var(--term-scale, 1));
  line-height: 1.45;
}
/*
 * The only scrolling box. \`min-height: 0\` because a flex item's default \`min-height: auto\` refuses
 * to shrink below its content, which pushes the panel past \`max-height\` and scrolls the window
 * instead of the panel.
 */
.portal-python-sheet-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-gutter: stable;
  padding-right: calc(2px * var(--term-scale, 1));
}
.portal-python-sheet-head {
  flex: 0 0 auto;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: calc(0.5 * var(--wp-rem, 1rem));
  margin-bottom: calc(7px * var(--term-scale, 1));
}
.portal-python-sheet-title {
  margin: 0;
  font-size: calc(13px * var(--term-scale, 1));
  font-weight: 600;
}
.portal-python-sheet-close {
  appearance: none;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: calc(16px * var(--term-scale, 1));
  line-height: 1;
  padding: calc(0.1 * var(--wp-rem, 1rem)) calc(0.3 * var(--wp-rem, 1rem));
  border-radius: calc(0.25 * var(--wp-rem, 1rem));
  cursor: pointer;
  opacity: 0.7;
}
.portal-python-sheet-close:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.16);
}
.portal-python-sheet-close:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 1px;
}
/*
 * A two-column list, which is what a key and its meaning are. A definition list rather than a
 * table: no header row, no second axis, and pairs are what a screen reader announces it as.
 * \`minmax(0, \u2026)\` on BOTH columns is what lets either give way: a grid track's default minimum is
 * its content's, so \`auto 1fr\` with a \`white-space: nowrap\` key and a long sentence beside it
 * cannot narrow below the sum of the two - the panel overflows sideways and the vertical
 * scrollbar lands on the descriptions. With both tracks able to reach zero the row wraps instead.
 */
.portal-python-sheet-keys {
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(0, 1fr);
  gap: calc(4px * var(--term-scale, 1)) calc(10px * var(--term-scale, 1));
  margin: 0;
}
.portal-python-sheet-keys dt {
  margin: 0;
  min-width: 0;
}
.portal-python-sheet-keys dt code {
  display: inline-block;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: calc(11.5px * var(--term-scale, 1));
  padding: 0.05em 0.35em;
  border-radius: calc(0.25 * var(--wp-rem, 1rem));
  background: rgba(255, 255, 255, 0.12);
  white-space: nowrap;
}
.portal-python-sheet-keys dd {
  margin: 0;
  min-width: 0;
  opacity: 0.85;
  overflow-wrap: anywhere;
}
.portal-python-sheet-note {
  margin: calc(10px * var(--term-scale, 1)) 0 0;
  opacity: 0.85;
  overflow-wrap: anywhere;
}
.portal-python-sheet-link {
  display: inline-block;
  margin-top: calc(7px * var(--term-scale, 1));
  color: inherit;
  overflow-wrap: anywhere;
}

/* the session panel */

/*
 * A \`role="tabpanel"\` is focusable, and a focused panel must show it. The outline is inset because
 * the panel fills the window's body to the edge, where the window's rounding half clips it.
 */
.portal-python-session:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: -2px;
}

/* the notice line */

/*
 * Where a refusal is said: inside the window rather than beside the tree, because the window is
 * what the visitor is now looking at. \`role="status"\`, so a screen reader hears it without the
 * focus being taken away from wherever they were.
 */
.portal-python-notice {
  margin: 0;
  padding: calc(0.4 * var(--wp-rem, 1rem)) calc(0.6 * var(--wp-rem, 1rem));
  font-size: calc(0.78 * var(--wp-rem, 1rem));
  line-height: 1.4;
  color: inherit;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
.portal-python-notice[data-tone="warn"] {
  background: rgba(255, 154, 139, 0.14);
}
.portal-python-notice[hidden] {
  display: none;
}

/* motion */

/*
 * Nothing in this file animates, and this rule is here so that stays true. The window's own
 * transitions belong to \`@freva-org/freva-client-terminal\`, which honours the same preference in
 * its own stylesheet.
 */
@media (prefers-reduced-motion: reduce) {
  .portal-python-window,
  .portal-python-window * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`,De=new WeakSet;function Fe(i=document){if(De.has(i))return;De.add(i);try{if(typeof CSSStyleSheet=="function"&&Array.isArray(i.adoptedStyleSheets)){let p=new CSSStyleSheet;p.replaceSync(je),i.adoptedStyleSheets=[...i.adoptedStyleSheets,p];return}}catch{}let $=i.createElement("style");$.textContent=je,i.head.append($)}var Ke=`
.portal-python-chooser { display: grid; gap: 0.6em; }
.portal-python-chooser p { margin: 0; }
.portal-python-chooser fieldset { margin: 0; padding: 0.4em 0.6em; border: 1px solid color-mix(in srgb, currentColor 25%, transparent); border-radius: calc(0.35 * var(--wp-rem, 1rem)); }
.portal-python-chooser legend { padding: 0 0.3em; font-weight: 600; }
.portal-python-chooser label { display: flex; gap: 0.45em; align-items: baseline; padding: 0.1em 0; }
.portal-python-chooser .portal-python-chooser-actions { display: flex; flex-wrap: wrap; gap: 0.5em; justify-content: flex-end; }
.portal-python-chooser button { font: inherit; color: inherit; cursor: pointer; padding: 0.35em 0.8em; border-radius: calc(0.35 * var(--wp-rem, 1rem)); border: 1px solid color-mix(in srgb, currentColor 35%, transparent); background: color-mix(in srgb, currentColor 8%, transparent); }
.portal-python-chooser button:hover:not(:disabled) { background: color-mix(in srgb, currentColor 16%, transparent); }
.portal-python-chooser button:disabled { cursor: default; opacity: 0.55; }
.portal-python-chooser button:focus-visible { outline: 2px solid currentColor; outline-offset: 1px; }
.portal-python-chooser .portal-python-chooser-option { display: block; width: 100%; text-align: left; }
.portal-python-chooser .portal-python-chooser-option small { display: block; opacity: 0.75; }
.portal-python-chooser dl { display: grid; grid-template-columns: minmax(0, auto) minmax(0, 1fr); gap: 0.25em 0.8em; margin: 0; }
.portal-python-chooser dt { font-weight: 600; }
.portal-python-chooser dd { margin: 0; overflow-wrap: anywhere; }
.portal-python-chooser [role="alert"] { padding: 0.35em 0.5em; border-radius: calc(0.3 * var(--wp-rem, 1rem)); background: rgba(255, 154, 139, 0.18); }
`,_e=new WeakSet;function ht(i=document){if(!_e.has(i)){_e.add(i);try{let $=new CSSStyleSheet;$.replaceSync(Ke),i.adoptedStyleSheets=[...i.adoptedStyleSheets,$]}catch{let $=i.createElement("style");$.textContent=Ke,i.head.append($)}}}function k(i,$,p){let R=i.createElement($);return p!==void 0&&(R.textContent=p),R}function Ve(i,$){let p=i.ownerDocument;ht(p);let{policy:R,session:N}=$,D=Object.keys(R.profiles),f={...$.current??R.defaults,frontend:"console"},E=(...P)=>{let x=k(p,"div");x.className="portal-python-chooser",x.append(...P),i.replaceChildren(x),x.querySelector("button, input")?.focus()},ae=(...P)=>{let x=k(p,"div");return x.className="portal-python-chooser-actions",x.append(...P),x},H=(P,x)=>{let L=k(p,"button",P);return L.type="button",L.addEventListener("click",x),L},W=()=>{let P=$.current,x=P??R.defaults,L=H("",()=>Q({...x,frontend:"console"}));L.className="portal-python-chooser-option",L.append(k(p,"span",P?"Same as current":"Default setup"),k(p,"small",N.describeSetup({...x,frontend:"console"})));let S=H("",()=>ie());S.className="portal-python-chooser-option",S.append(k(p,"span","Custom setup\u2026"),k(p,"small","Choose the profile, add-ons and starter code for this session.")),E(k(p,"p","A new session is an independent Python interpreter with its own CPU and memory. It shares no variables or files with other sessions."),L,S)},ie=()=>{let P=k(p,"fieldset");P.append(k(p,"legend","Profile"));for(let S of D){let v=k(p,"label"),I=k(p,"input");I.type="radio",I.name="portal-python-profile",I.value=S,I.checked=f.profile===S,I.addEventListener("change",()=>{let T=R.profiles[S]?.allowedAddons??[];f={...f,profile:S,addons:f.addons.filter(l=>T.includes(l)),runStarter:N.starterApplies(R,S)},ie()}),v.append(I,k(p,"span",S)),P.append(v)}let x=[P],L=R.profiles[f.profile]?.allowedAddons??[];if(L.length>0){let S=k(p,"fieldset");S.append(k(p,"legend","Add-ons"));for(let v of L){let I=k(p,"label"),T=k(p,"input");T.type="checkbox",T.value=v,T.checked=f.addons.includes(v),T.addEventListener("change",()=>{let l=new Set(f.addons);T.checked?l.add(v):l.delete(v),f={...f,addons:[...l].sort()}}),I.append(T,k(p,"span",v)),S.append(I)}x.push(S)}if(N.starterApplies(R,f.profile)){let S=k(p,"label"),v=k(p,"input");v.type="checkbox",v.checked=f.runStarter,v.disabled=!R.allowSkipStarter,v.addEventListener("change",()=>{f={...f,runStarter:v.checked}}),S.append(v,k(p,"span",R.allowSkipStarter?"Run this site's starter code when Python is ready":"This site's starter code runs when Python is ready")),x.push(S)}x.push(ae(H("Back",W),H("Review",()=>Q(f)))),E(...x)},Q=P=>{f=P;let x=k(p,"dl"),L=(T,l)=>{x.append(k(p,"dt",T),k(p,"dd",l))};L("Profile",P.profile),L("Add-ons",P.addons.length>0?P.addons.join(", "):"none"),R.starter&&L("Starter code",P.runStarter?"runs":"does not run");let S=k(p,"dd","\u2026");x.append(k(p,"dt","Live interpreters"),S),$.liveSummary().then(T=>{S.textContent=T});let v=k(p,"p");v.setAttribute("role","alert"),v.hidden=!0;let I=H("Start session",()=>{let T=N.validateSetup(R,P);if(!T.ok){v.textContent=`This setup is not allowed: ${T.problems.join("; ")}.`,v.hidden=!1;return}I.disabled=!0,$.start(T.setup).then(l=>{l!==null&&(v.textContent=l,v.hidden=!1,I.disabled=!1)},l=>{v.textContent=l instanceof Error?l.message:String(l),v.hidden=!1,I.disabled=!1})});E(x,k(p,"p","The setup is fixed for the life of this session. A restart keeps it; a different setup is a new session."),v,ae(H("Back",W),I))};W()}var Ge="portal-python-terminal";function ut(i){let $=N=>{if(!i)return null;try{return localStorage.getItem(`${Ge}:${N}`)}catch{return null}},p=(N,D)=>{if(i)try{localStorage.setItem(`${Ge}:${N}`,D)}catch{}},R=N=>{let D=$(N);if(D===null)return null;let f=Number(D);return Number.isFinite(f)?f:null};return{getTheme:()=>$("theme"),setTheme:N=>p("theme",N),getAlpha:()=>R("alpha"),setAlpha:N=>p("alpha",String(N)),getTextScale:()=>R("scale"),setTextScale:N=>p("scale",String(N))}}function se(i){return i instanceof Error?i.message:String(i)}function Et(i,$,p,R=new Map){Fe();let N=new Map(i.examples.map(e=>[e.id,e.sha256])),D=new Map(i.examples.flatMap(e=>e.notebook?[[e.id,e.notebook]]:[])),f=Math.max(1,Math.min(2,i.maxSessions)),E=i.sessionChoices??null,ae=Math.max(1,Math.min(f,i.maxLiveSessions??f)),H=null,W=()=>H??=p().then(e=>e.loadSessions()).catch(e=>{throw H=null,e}),ie=null,Q=()=>ie??=W().then(({session:e})=>e.createSlotBroker({capacity:ae})),P=null,x="",L=null,S=new ze,v=i.notebookSameOrigin?window.location.origin:i.notebookOrigin??i.playgroundOrigin,I=i.playgroundBase??"/",T=null,l=null,J=null,ee=!1,Te=new Set,le="",te="idle";function ue(){return{shown:!!l?.isShown(),minimized:!!l?.isMinimized(),sessions:h.length,maxSessions:f,started:h.filter(e=>e.started()).length,status:le}}function C(e){e!==void 0&&(le=e),$e();let t=ue();for(let o of Te)o(t)}function $e(){if(!K||!fe)return;let e=[],t=h[A]?.lifecycle?.status()??"";t?e.push(t):le&&e.push(le),h.length>1&&e.push(`${h.length} sessions`),x&&!t&&e.push(x);let o=e.join(" \xB7 ");fe.textContent=o,K.hidden=o==="",K.dataset.state=te}let h=[],A=0,F=[],j=null,B=null,z=null,q=null,me=null,K=null,fe=null,ne=null,ce=null,ye=null,we=null,oe=`portal-python-${Math.random().toString(36).slice(2,8)}`;function Xe(e){let t=e?.exampleId;if(typeof t!="string"||t.length===0)return{reason:"the request named no example"};let o=N.get(t);if(!o)return{reason:`no example is registered as \u201C${t}\u201D in this page`};if((typeof e.digest=="string"?e.digest.trim().toLowerCase():"")!==o)return{reason:`the request for \u201C${t}\u201D carries a digest this page does not recognise, so something is out of step with the build`};let n=$.get(t);if(!n)return{reason:`\u201C${t}\u201D is registered but its source is not in this page`};let d=R.get(t);if(d){let s=d(e,n);return s?{example:s,bound:s!==n}:{reason:"the parameter this run names is not one this page will accept, so nothing was run"}}return{example:n,bound:!1}}function O(e,t="info"){z&&(z.textContent=e,z.dataset.tone=t,z.hidden=e==="")}function be(){if(!j)return;j.hidden=!1;let e=h.length>1;if(F.forEach((t,o)=>{let r=o===A;t.classList.toggle("is-active",r),t.setAttribute("aria-selected",String(r)),t.tabIndex=r?0:-1;let n=t.querySelector(".portal-python-tab-close");n&&(n.hidden=!e)}),h.forEach((t,o)=>{t.root.hidden=o!==A}),B){let t=h.length>=f;B.disabled=t,B.title=t?`This page allows ${f} interpreter${f===1?"":"s"} at a time`:"New session",B.setAttribute("aria-label",B.title)}}function Ce(){let e=l?.el.getAttribute("data-term-light")==="true";for(let t of ne?.querySelectorAll("freva-python-console")??[])t.setAttribute("theme",e?"light":"dark")}function qe(e){let t=h.length;if(t<2)return;let o=e.key==="ArrowRight"?1:e.key==="ArrowLeft"?-1:e.key==="Home"?-t:e.key==="End"?t:0;if(o===0)return;e.preventDefault();let r=e.key==="Home"?0:e.key==="End"?t-1:(A+o+t)%t;Re(r),F[r]?.focus()}function _(){let e=h[A],t=(e?.transcript()??null)===null,o=e?.artifacts()??[],r=l?.isMinimized()===!0,n="This opens inside the window, and the window is minimized. Restore it first.";return[...r?[{items:[{label:"Restore the window",title:"Open the window back up. The session never stopped - its variables and its transcript are as you left them.",onSelect:()=>l?.setMinimized(!1)}]}]:[],{title:"Session",items:[{label:!r&&h.length>=f?`New session\u2026 (limit of ${f} reached)`:"New session\u2026",title:r?n:E?"Choose a setup for a new, independent interpreter: the same as this one, or a custom one. It costs its own CPU and memory.":"Open a second, independent interpreter. It does not share variables, imports or files with the one you are in, and costs its own CPU and memory.",disabled:r||h.length>=f,onSelect:()=>Ae()},...Qe(e,r,n),{label:"Restart session\u2026",title:r?n:"Throw away this interpreter and start a fresh one in the same tab. Variables, imports and anything installed are lost; the transcript stays on screen.",danger:!0,disabled:r,onSelect:()=>{e&&re({title:`Restart ${e.label}?`,body:"Its variables, imports and in-memory interpreter state will be lost.",confirmLabel:"Restart session",danger:!0}).then(s=>{s&&e.restart()})}},{label:"End session\u2026",title:r?n:"Shut this interpreter down and close its tab. Available only while a second session is open, because a terminal with no interpreter is not one.",danger:!0,disabled:r||h.length<2,onSelect:()=>{if(!e)return;let s=A;re({title:`End ${e.label}?`,body:"Its variables, imports and in-memory interpreter state will be lost, and its interpreter is shut down.",confirmLabel:"End session",danger:!0}).then(c=>{c&&Ie(s)})}}]},{title:"Transcript",items:[{label:"Copy transcript",title:"The whole session as text, on the clipboard - prompts, output and all. The console's own notes are written as Python comments, so it can be pasted back and run.",disabled:t,onSelect:()=>{let s=e?.transcript();s&&navigator.clipboard?.writeText(s)}},{label:"Clear transcript",title:"Empty the screen. The interpreter is untouched - every variable and import survives. Also Ctrl + L, or `clear` at the prompt.",onSelect:()=>e?.clearTranscript()},{label:"Download transcript",title:"The same text, as a file.",disabled:t,onSelect:()=>et(e)},{label:"Clear history",title:"Forget the lines this browser remembers for \u2191 and Ctrl + R. The transcript on screen stays.",onSelect:()=>e?.clearHistory()}]},...o.length>0?[{title:"Files",items:o.map(s=>({label:`Save ${s.name} (${Pe(s.size)})`,disabled:s.state!=="ready",onSelect:()=>{e?.download(s.name).catch(c=>{let a=c instanceof Error?c.message:String(c);/abort/i.test(a)||O(`${s.name} could not be saved: ${a}`,"warn")})}}))}]:[],{title:"Terminal",items:[{label:"Terminal settings",title:r?n:"Colours, background opacity and text size.",disabled:r,appearance:!0}]},{title:"Help",items:[{label:"Keyboard shortcuts",title:r?n:"Every key this console answers to. Also Ctrl + /.",disabled:r,onSelect:()=>ge("shortcuts")},{label:"Python packages",title:r?n:"What this interpreter has loaded, and what it is allowed to fetch.",disabled:r,onSelect:()=>ge("packages")}]}]}function Ye(){if(L||ee)return;let e=async()=>{if(!l?.isShown()||l.isMinimized())return;let t=await h[A]?.lifecycle?.resources?.().catch(()=>null)??null;ee||(t??"")!==x&&(x=t??"",$e())};L=setInterval(()=>{e()},2e3),e()}function Ae(){if(!E||h.length>=f){de({confirm:!0});return}i.playgroundOrigin?de({confirm:!1,choose:!0}).then(e=>e?.start().catch(t=>O(se(t),"warn"))):Je()}function Qe(e,t,o){let r=[],n=e?.lifecycle;return n?.sleep&&n.canSleep&&r.push({label:"Sleep session\u2026",title:t?o:"Stop this interpreter to free its memory. The transcript and the files in /workspace are kept; Python variables and imports are lost.",disabled:t||!n.canSleep(),onSelect:()=>{e&&re({title:`Put ${e.label} to sleep?`,body:"Its Python variables and imports will be lost. The transcript and the files in /workspace are kept, and waking it starts a fresh interpreter with the same setup.",confirmLabel:"Sleep"}).then(d=>{d&&n.sleep?.().catch(s=>O(se(s),"warn"))})}}),n?.wake&&n.canWake&&r.push({label:"Wake session",title:"Start a fresh interpreter with this session's setup and restore its files.",disabled:!n.canWake(),onSelect:()=>{n.wake?.().catch(d=>O(se(d),"warn"))}}),i.notebook&&v&&r.push({label:"Open as notebook",title:S.hasExample?"Open the example you last ran as a notebook, in a new tab.":"Open the notebook, in a new tab.",onSelect:()=>Ze()}),r}function Ze(){let e=v,t=S.url(`${e}${I.replace(/\/$/,"")}`);window.open(t,"_blank","noopener,noreferrer")}async function Je(){if(!E||!l)return;let e;try{e=await W()}catch(o){O(`The session chooser could not be loaded: ${se(o)}`,"warn");return}let t=Le("New session");t&&Ve(t,{session:e.session,policy:E.policy,current:h[A]?.lifecycle?.setup()??null,liveSummary:async()=>{let o=await Q(),r=await o.held();return`${r} of ${o.capacity} in use${r>=o.capacity?" - put a session to sleep first":""}`},start:async o=>{if(h.length>=f)return`This page allows ${f} sessions.`;let r=await Q(),n=await r.reserve(`${oe}-choose`);if(!n)return`${e.session.slotsInUse(r.capacity)} Wait for it to finish or stop it, then start this one.`;V();let d=await de({confirm:!1,setup:o,slot:n});return d?(d.start().catch(s=>O(se(s),"warn")),null):(n.release(),"The session could not be opened.")}})}function re(e){return l?l.confirm(e):Promise.resolve(!1)}function Pe(e){return e<1024?`${e} B`:e<1024*1024?`${Math.round(e/1024)} KB`:`${(e/(1024*1024)).toFixed(1)} MB`}function et(e){let t=e?.transcript();if(!t)return;let o=new Blob([t],{type:"text/plain;charset=utf-8"}),r=URL.createObjectURL(o),n=document.createElement("a");n.href=r,n.download="python-transcript.txt",n.click(),setTimeout(()=>URL.revokeObjectURL(r),0)}let tt={shortcuts:{title:"Keyboard shortcuts",rows:[["Enter","run the line"],["Shift + Enter","continue a block on a new line"],["Tab","complete a name, and open the candidates"],["\u2191 / \u2193","move through the candidates \u2014 or, with no list open, through history"],["\u2192 / Ctrl + E","accept the grey suggestion at the end of the line"],["Ctrl + R","search history"],["Ctrl + L","clear the transcript"],["clear","the same, typed at the prompt"],["Ctrl + C","stop what Python is waiting for, or abandon the line"],["Delete","end the session whose tab has focus"],["Esc","close this panel"]]}};function nt(){let e=h[A]?.ready()??null,t=[];if(t.push(["profile",i.profile]),t.push(["add-ons",i.addons.length>0?i.addons.join(", "):"none enabled for this portal"]),e){let c=Object.entries(e.packages).map(([a,u])=>`${a} ${u}`).join(", ");c&&t.push(["loaded",c]);for(let a of e.addons){let u=Object.entries(a.versions).map(([y,G])=>`${y} ${G}`).join(", ");u&&t.push([a.id,u])}for(let a of e.unavailableAddons??[])t.push([`${a.id} (unavailable)`,`${a.reason} ${a.remedy}${a.retryMayHelp?" A restart may help.":" A restart requests the same file."}`]);t.push(["/workspace",e.workspace.available?`disk-backed, up to ${e.workspace.maxFiles??"a bounded number of"} files, and only for this session`:`not disk-backed here${e.workspace.detail?` (${e.workspace.detail})`:""} - files stay in this tab's memory`])}let o=i.packagePolicy,r=[`the pinned runtime at ${o.sources.runtime}`,...o.sources.wheelhouse?[`wheels from ${o.sources.wheelhouse}`]:[],...o.sources.addons&&o.sources.addons!==o.sources.wheelhouse?[`add-ons from ${o.sources.addons}`]:[]].join(", and ");t.push(["packages come from",r]),t.push(["import micropip","the installer this interpreter carries"]),t.push(["micropip.list()","what this session actually has"]);let n=i.packagePolicy.kind==="open",d=i.packagePolicy.packageIndex;d&&t.push(['await micropip.install("name")',"install a package from the public index, into this session"]);let s=(n?'The profile and any add-ons above are a working STARTING environment, not a limit: packages in the profile load when you import them, and you can install more yourself with `await micropip.install("name")` or from an HTTPS wheel URL. Anything you add is a session experiment - pure-Python wheels usually work, packages with compiled extensions usually do not, and a package that breaks the session is not a mistake you have to undo by hand: `Restart session` gives you the starting environment back. ':d?'This playground\'s profile installs its own dependencies from the public Python index, so that index is reachable from this page - which means you can install other packages from it too, with `await micropip.install("name")`. The profile and any add-ons above are what the site set up for you; anything you add is a session experiment, and `Restart session` gives you the starting environment back. ':"This playground uses a curated Python environment. Packages included in the selected profile load automatically when you import them. Additional packages such as Freva or Dask are installed only when the portal operator has enabled their verified add-on. Installing packages by name from a public index is not enabled by this site. ")+(e?"What is listed above is what this interpreter reported when it started. ":"Start the interpreter to see what it loaded. ")+"Anything you install lives in this interpreter: `Restart session` replaces it, and reloading the page replaces the whole document. Closing this window only hides it - the session keeps running and its variables are still there when you open it again.";return{title:"Python packages",rows:t,note:s,link:{href:"https://micropip.pyodide.org/",label:n?"micropip documentation":"micropip documentation (describes micropip in general; this site is stricter)"}}}function ge(e){let t=e==="packages"?nt():tt[e];if(!t)return;let o=Le(t.title);if(!o)return;let r=document.createElement("dl");r.className="portal-python-sheet-keys";for(let[n,d]of t.rows){let s=document.createElement("dt"),c=document.createElement("code");c.textContent=n,s.append(c);let a=document.createElement("dd");a.textContent=d,r.append(s,a)}if(o.append(r),t.note){let n=document.createElement("p");n.className="portal-python-sheet-note",n.textContent=t.note,o.append(n)}if(t.link){let n=document.createElement("a");n.className="portal-python-sheet-link",n.href=t.link.href,n.target="_blank",n.rel="noopener noreferrer",n.textContent=t.link.label,o.append(n)}}function Le(e){if(!l)return null;V();let t=document.createElement("div");t.className="portal-python-sheet",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","false"),t.setAttribute("aria-label",e);let o=document.createElement("div");o.className="portal-python-sheet-head";let r=document.createElement("h2");r.className="portal-python-sheet-title",r.textContent=e;let n=document.createElement("button");n.type="button",n.className="portal-python-sheet-close",n.setAttribute("aria-label","Close"),n.textContent="\xD7",n.addEventListener("click",()=>V()),o.append(r,n);let d=document.createElement("div");d.className="portal-python-sheet-body",t.append(o,d),q=t,l.el.append(t),n.focus();let s=a=>{q&&(a.composedPath().includes(q)||V())},c=requestAnimationFrame(()=>{document.addEventListener("pointerdown",s,!0)});return me=()=>{cancelAnimationFrame(c),document.removeEventListener("pointerdown",s,!0)},d}function V(){return me?.(),me=null,q?(q.remove(),q=null,!0):!1}let ve=0;async function de(e){if(ee)return null;if(h.length>=f)return O(`This page allows ${f} interpreter${f===1?"":"s"} at a time.`,"warn"),null;if(e.confirm&&h.length>=1){let u=h[0]?.label??"the first session";if(!await re({title:"Start another Python session?",body:`It runs an independent WebAssembly interpreter, consumes additional CPU and memory, and does not share variables with ${u}.`,confirmLabel:"Start session"}))return null}let{defineBrowserPythonConsole:t}=await p();t?.(),ve+=1;let o=i.playgroundOrigin?ct(ve,i,e.choose===!0):it(ve,i,E?{setup:e.setup??E.policy.defaults,slot:e.slot}:void 0);h.push(o),E&&Ye();let r=h.length-1,n=`${oe}-tab-${r}`,d=`${oe}-panel-${r}`;o.root.id=d,o.root.setAttribute("role","tabpanel"),o.root.setAttribute("aria-labelledby",n),o.root.tabIndex=0;let s=document.createElement("button");s.type="button",s.className="portal-python-tab",s.id=n,s.setAttribute("role","tab"),s.setAttribute("aria-controls",d);let c=document.createElement("span");c.className="portal-python-tab-label",c.textContent=o.label;let a=document.createElement("span");return a.className="portal-python-tab-close",a.setAttribute("aria-hidden","true"),a.title=`End ${o.label}`,a.textContent="\xD7",a.hidden=!0,a.addEventListener("click",u=>{u.stopPropagation(),Ne(F.indexOf(s))}),s.append(c,a),s.addEventListener("click",()=>Re(F.indexOf(s))),s.addEventListener("keydown",u=>{u.key!=="Delete"&&u.key!=="Backspace"||(u.preventDefault(),Ne(F.indexOf(s)))}),F.push(s),j?.append(s),ne?.append(o.root),A=h.length-1,be(),Ce(),l?.setMenuSections(_()),C(),o}function Re(e){e<0||e>=h.length||(A=e,be(),l?.setMenuSections(_()),h[A]?.focus())}function Ne(e){let t=h[e];!t||h.length<2||l?.isMinimized()||re({title:`End ${t.label}?`,body:"Its variables, imports and in-memory interpreter state will be lost, and its interpreter is shut down.",confirmLabel:"End session",danger:!0}).then(o=>{o&&Ie(e)})}function Ie(e){let t=h[e];!t||h.length<2||(t.dispose(),t.root.remove(),h.splice(e,1),F[e]?.remove(),F.splice(e,1),A=Math.max(0,Math.min(A,h.length-1)),be(),l?.setMenuSections(_()),C())}async function pe(){if(!l)return J||(J=(async()=>{let{createTerminalWindow:e}=await p();if(ee)return;let t=document.createElement("div");t.className="portal-python-window",T=Oe(t,i.terminal.alwaysOnTop?"always-on-top":"floating");let o=e(t,{os:We(i.terminal.osControls),bounds:()=>t.parentElement,storage:ut(i.terminal.rememberAppearance),dragExclude:".portal-python-tab",closeLabel:"Hide",copyLabel:"transcript",copyTitle:"Copy transcript",copyText:()=>h[A]?.transcript()??"",menuSections:_(),onBodyActivate:()=>h[A]?.focus(),onShow:()=>{T?.raise(),C()},onHide:()=>{C(),ot()},onMinimize:()=>{l?.setMenuSections(_()),V(),C()},onMaximize:()=>{C(),Ue()}});l=o,j=document.createElement("div"),j.className="portal-python-tabs",j.setAttribute("role","tablist"),j.setAttribute("aria-label","Python sessions"),j.addEventListener("keydown",qe),B=document.createElement("button"),B.type="button",B.className="portal-python-tab-add",B.textContent="+",B.addEventListener("click",()=>{l?.isMinimized()||Ae()});let r=document.createElement("div");r.className="portal-python-tabbar",r.append(j,B),o.addBarControl(r,"start"),K=document.createElement("div"),K.className="portal-python-status",K.hidden=!0;let n=document.createElement("span");n.className="portal-python-status-text",n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),K.append(n),fe=n,z=document.createElement("p"),z.className="portal-python-notice",z.setAttribute("role","status"),z.hidden=!0,ne=document.createElement("div"),ne.className="portal-python-body",o.body.append(K,z,ne);let d=window.visualViewport;if(d){let c=()=>{let a=Math.max(0,window.innerHeight-(d.height+d.offsetTop));if(t.style.bottom=`${a}px`,!l?.isShown()||l.isMinimized())return;let u=o.el.getBoundingClientRect(),y=d.offsetTop+d.height;if(u.bottom<=y)return;let G=Math.max(0,u.top-(u.bottom-y));o.el.style.top=`${G}px`};d.addEventListener("resize",c),d.addEventListener("scroll",c),ye=()=>{d.removeEventListener("resize",c),d.removeEventListener("scroll",c)},c()}o.el.addEventListener("keydown",c=>{if(c.key==="Escape"&&q){c.preventDefault(),c.stopPropagation(),V();return}(c.ctrlKey||c.metaKey)&&c.key==="/"&&(c.preventDefault(),V()||ge("shortcuts"))},!0);let s=new MutationObserver(()=>Ce());s.observe(o.el,{attributes:!0,attributeFilter:["data-term-light"]}),we=s,o.applyTooltips(),t.addEventListener("mousedown",()=>T?.raise(),!0),await de({confirm:!1})})().finally(()=>{J=null}),J)}function ke(e=!1){if(l){if(!l.isShown()){let t=document.activeElement;ce=t instanceof HTMLElement&&t!==document.body?t:ce}l.isMinimized()&&l.setMinimized(!1),l.isShown()||l.show(),T?.raise(),e&&Ue()}}function Ue(){let e=()=>{h[A]?.root.focus(),h[A]?.focus()};e(),requestAnimationFrame(e)}function ot(){let e=ce;if(ce=null,!(!e||!e.isConnected))try{e.focus({preventScroll:!0})}catch{}}function rt(e={}){pe().then(()=>(ke(e.focus??!1),h[A]?.start())).catch(t=>Se(t))}function xe(e){return pe().then(()=>{ke(!0),O(`That example was not run: ${e}.`,"warn")}).catch(t=>Se(t)).then(()=>{throw new Error(e)})}function Me(e){return pe().then(async()=>{ke(!0),O("");let t=h[A];if(!t)throw new Error("no Python session is open");return e(t)}).catch(t=>{throw Se(t),t}).then(t=>{if(t?.raised)throw new Error("the program raised an exception")})}function st(e){let t=Xe(e);if("reason"in t)return xe(t.reason);let o=D.get(e.exampleId);return S.ran({digest:N.get(e.exampleId)??null,...o?{notebook:o}:{},bound:t.bound,...t.example.notebookDataset?{dataset:t.example.notebookDataset}:{}}),Me(r=>r.runExample(e,t.example))}function at(e){let t=e?.exampleId,o=typeof t=="string"?$.get(t):void 0;return o?typeof e.source!="string"||e.source.trim()===""?xe("the edited snippet is empty"):(S.ranOther(),Me(r=>{if(!r.runVisitorSource)throw new Error("an edited snippet cannot run in this session: the interpreter is on a separate origin, whose bridge carries registered examples and never source");return r.runVisitorSource(`Edited snippet \xB7 ${o.title}`,e.source)})):xe(`no snippet is registered as \u201C${String(t)}\u201D in this page`)}function Se(e){let t="The Python playground could not be loaded: "+(e instanceof Error?e.message:String(e));if(z){O(t,"warn");return}let o=Be()[0]?.host??null;if(!o)return;let r=document.createElement("p");r.className="portal-note portal-python-failed",r.setAttribute("role","status"),r.textContent=t,o.append(r)}return{run:st,runEdited:at,open:rt,async warm(){await pe(),await h[A]?.start()},state:ue,onState(e){Te.add(e),e(ue())},destroy(){ee=!0,L&&clearInterval(L),L=null,ye?.(),ye=null,we?.disconnect(),we=null,V();for(let e of h)e.dispose();h.length=0,l?.destroy(),l=null,T?.release(),T=null}};function it(e,t,o){let r=document.createElement("div");r.className="portal-python-session";let n=document.createElement("freva-python-console");n.setAttribute("profile",t.profile),t.runtimeIndexUrl&&n.setAttribute("index-url",t.runtimeIndexUrl),t.workerUrl&&(n.workerURL=t.workerUrl),n.setAttribute("autostart","false"),t.wheelhouseUrl&&(n.wheelhouseURL=t.wheelhouseUrl),t.addonBaseUrl&&(n.addonBaseURL=t.addonBaseUrl),t.addons.length>0&&(n.addons=t.addons),t.optionalAddons.length>0&&(n.optionalAddons=t.optionalAddons),t.siteWheels&&t.siteWheels.length>0&&(n.siteWheels=t.siteWheels),t.persistCredentials&&(n.persistCredentials=!0);let d=Ee(t.portalBaseUrl,window.location.href);if(d&&(n.startupSource=d),n.setAttribute("toolbar","none"),n.banner=!1,n.style.setProperty("--bp-console-min-height","0"),n.style.setProperty("--bp-console-max-height","none"),n.style.setProperty("--bp-console-border-width","0"),n.style.setProperty("--bp-console-radius","0"),n.style.setProperty("--bp-console-scale","var(--term-scale, 1)"),n.style.setProperty("--bp-console-background","transparent"),n.style.setProperty("--bp-console-foreground","var(--term-fg, #d8d8d2)"),n.style.setProperty("--bp-console-result","var(--term-fg, #d8d8d2)"),n.style.setProperty("--bp-console-muted","color-mix(in srgb, var(--term-fg, #d8d8d2) 62%, var(--term-bg, #12131a))"),n.style.setProperty("--bp-console-border","color-mix(in srgb, var(--term-fg, #d8d8d2) 22%, var(--term-bg, #12131a))"),n.addEventListener("browser-python-status",u=>{let y=u.detail;y&&(te=y.state,C(y.summary?`${y.label} \u2014 ${y.summary}`:y.label))}),r.append(n),E&&o)return lt(e,r,n,t,o.setup,o.slot);let s=null,c=!1,a=()=>(s||(C("Starting Python\u2026"),s=n.start().then(async()=>{t.initialSource&&await n.execute(t.initialSource),c=!0,C("Python is ready")}).catch(u=>{throw s=null,c=!1,C(u instanceof Error?u.message:String(u)),u})),s);return{id:`local-${e}`,label:`Session ${e}`,root:r,start:a,started:()=>c,async runExample(u,y){return await a(),n.runExample(y)},async runVisitorSource(u,y){return await a(),n.runExample({title:u,source:y,comment:u})},transcript:()=>n.transcript(),artifacts:()=>[],ready:()=>n.readyInfo??null,download:()=>Promise.resolve(),clearTranscript:()=>n.clear(),clearHistory:()=>n.clearHistory(),async restart(){c=!1,s=null,C("Restarting Python\u2026"),await n.restart(),t.initialSource&&await n.execute(t.initialSource),c=!0,s=Promise.resolve(),C("Python is ready")},focus:()=>n.focus(),dispose:()=>n.dispose()}}function lt(e,t,o,r,n,d){let s=E,c=Ee(r.portalBaseUrl,window.location.href);o.removeAttribute("autostart"),o.inert=!0;let a=null,u=d,y=`Session ${e}`,G=()=>{let m=[n.profile,...n.addons].join(" + ");return n.runStarter?m:`${m}, no starter`},U=He({load:()=>Promise.all([W(),Q()]),release:()=>{u?.release(),u=void 0},close:m=>{m.close()},construct:m=>{let[M,w]=m,b=new M.session.SessionController({id:`${oe}-s${e}`,setup:n,policy:s.fingerprint,slots:w,...u?{slot:u}:{},createEngine:g=>M.createBrowserPython({profile:g.profile,addons:g.addons,optionalAddons:r.optionalAddons.filter(X=>g.addons.includes(X)),...r.runtimeIndexUrl?{pyodide:{indexURL:r.runtimeIndexUrl}}:{},...r.wheelhouseUrl?{wheelhouseURL:r.wheelhouseUrl}:{},...r.addonBaseUrl?{addonBaseURL:r.addonBaseUrl}:{},...r.workerUrl?{workerURL:r.workerUrl}:{},...r.siteWheels&&r.siteWheels.length>0?{siteWheels:r.siteWheels}:{},...r.persistCredentials?{persistCredentials:!0}:{},...c?{startupSource:c}:{}}),store:()=>P??=M.session.openCheckpointStore(),...r.initialSource?{starter:()=>o.execute(r.initialSource)}:{},attach:g=>{o.engine=g,o.inert=!1},detach:g=>{o.engine===g&&(o.engine=void 0),o.inert=!0},retainedBytes:()=>new TextEncoder().encode(o.transcript()).length});return u=void 0,b.onChange(g=>{a=g,g.state==="busy"||g.state==="ready"?te=g.state:g.state==="wake-error"||g.state==="crashed"?te="error":te="loading",l?.setMenuSections(_()),C()}),b}}),Y=()=>U.get(),Z=async()=>{let m=await Y();if(m.state==="asleep"||m.state==="wake-error"){await m.wake();return}C("Starting Python\u2026"),await m.start()},he=()=>{if(!a)return"";let m=a.checkpoint?`${a.checkpoint.files} file${a.checkpoint.files===1?"":"s"} kept (${Pe(a.checkpoint.bytes)})`:"";switch(a.state){case"sleeping":return`Saving files and stopping ${y}\u2026`;case"asleep":return`${y} is asleep${m?` \xB7 ${m}`:""} \xB7 Wake it from the \u22EE menu`;case"waking":return`Waking ${y}\u2026`;case"restoring":return`Restoring ${y}'s files\u2026`;case"wake-error":return a.message??`${y} could not wake`;default:return a.message&&a.state!=="ready"&&a.state!=="busy"?a.message:""}};return{id:`local-${e}`,get label(){return y},set label(m){y=m},root:t,start:Z,started:()=>a?.state==="ready"||a?.state==="busy",async runExample(m,M){return await Z(),o.runExample(M)},async runVisitorSource(m,M){return await Z(),o.runExample({title:m,source:M,comment:m})},transcript:()=>o.transcript(),artifacts:()=>[],ready:()=>o.readyInfo??null,download:()=>Promise.resolve(),clearTranscript:()=>o.clear(),clearHistory:()=>o.clearHistory(),async restart(){let m=await Y();C("Restarting Python\u2026"),m.state==="configured"?await m.start():m.state==="asleep"||m.state==="wake-error"?await m.wake():await m.restart(),C("Python is ready")},focus:()=>o.focus(),dispose:()=>{U.dispose(),o.dispose()},lifecycle:{setup:()=>n,status:he,resources:async()=>{let m=U.current();if(!m)return null;let M=await m.resources();if(!M)return null;let w=await W();return`${G()} \xB7 ${w.session.describeResources(M)}`},canSleep:()=>a?.state==="ready",canWake:()=>a?.state==="asleep"||a?.state==="wake-error",sleep:async()=>{await(await Y()).sleep()},wake:async()=>{await(await Y()).wake()}}}}function ct(e,t,o=!1){let r=document.createElement("div");r.className="portal-python-session";let n=document.createElement("iframe");n.className="portal-python-frame",n.title=`Python session ${e}`,n.setAttribute("sandbox","allow-scripts allow-same-origin allow-downloads"),n.setAttribute("referrerpolicy","no-referrer"),r.append(n);let d=null,s=null,c=null,a=[],u=o&&E?h[A]?.lifecycle?.setup()??null:null,y=null,G=w=>{let b=new URL(`${t.playgroundOrigin}${I}`);if(w&&(b.search=w.toString()),E){let g=new URLSearchParams({scope:oe});o&&g.set("choose","1"),b.hash=g.toString()}return b.toString()},U,Y=()=>{let w=()=>{},b=()=>{},g=new Promise((X,dt)=>{w=()=>{U.settled=!0,X()},b=pt=>{U.settled=!0,dt(pt)}});g.catch(()=>{}),U={promise:g,resolve:w,reject:b,settled:!1}};Y();let Z=2e4,he=import("./embed.O7XM25AX.js").then(w=>{d=w.createPlaygroundHost({frame:n,playgroundOrigin:t.playgroundOrigin,onReady:b=>{if(s=b,C("Python is ready"),U.resolve(),u&&E)try{d?.proposeSetup({...u,addons:[...u.addons]},E.fingerprint,b)}catch{}},onSetup:b=>{!E||b.policy!==E.fingerprint||W().then(({session:g})=>{let X=g.validateSetup(E.policy,b.setup);X.ok&&(y=X.setup,l?.setMenuSections(_()),C())})},onInvalidated:b=>{s=null,U.settled||U.reject(new Error(`the playground ${b}`)),Y(),C(`The playground ${b}.`)},onExampleRefused:(b,g)=>O(`The playground refused \u201C${b}\u201D: ${g}.`,"warn"),onTranscript:b=>{c=b},onArtifacts:b=>{a=b,l?.setMenuSections(_())}})}),m=async(w,b)=>{try{await he,await d?.perform(w,s??void 0)}catch(g){throw O(`${b}: ${g instanceof Error?g.message:String(g)}`,"warn"),g}},M=async()=>{if(await he,s)return;let w,b=new Promise((g,X)=>{w=setTimeout(()=>X(new Error(`the playground at ${t.playgroundOrigin} did not answer within ${Z/1e3} seconds. Check that the origin is serving the generated playground artifact.`)),Z)});try{await Promise.race([U.promise,b])}finally{w&&clearTimeout(w)}};return{id:`framed-${e}`,label:`Session ${e}`,root:r,async start(){C("Connecting to the playground\u2026"),n.src||(n.src=E?G():`${t.playgroundOrigin}${I}`),await M()},started:()=>s!==null,async runExample(w){await this.start(),d?.runExample(w.exampleId,w.digest,s??void 0)},transcript:()=>c===null?null:c.truncated?`[earlier output was dropped: the playground's transcript limit was reached]
${c.text}`:c.text,artifacts:()=>a.map(w=>({name:w.name,size:w.size,state:w.state})),ready:()=>null,async download(w){let{saveFilePickerSink:b}=await import("./embed.O7XM25AX.js");if(!d)throw new Error("the playground is not connected");await d.download(w,b)},clearTranscript:()=>{m("clear-transcript","The playground could not clear its transcript")},clearHistory:()=>{m("clear-history","The playground could not clear its history")},restart:async()=>{C("Restarting Python\u2026");try{await m("restart","The playground could not restart"),C("Python is ready");return}catch{}let w=new URL(`${t.playgroundOrigin}${I}`);w.searchParams.set("session",String(Date.now())),s=null,c=null,a=[],n.src=E?G(w.searchParams):w.toString(),await M()},focus:()=>n.focus(),dispose:()=>{U.settled||U.reject(new Error("the session was closed")),d?.stop()},...E?{lifecycle:{setup:()=>y,status:()=>"",resources:()=>Promise.resolve(y?[y.profile,...y.addons].join(" + ")+(y.runStarter?"":", no starter"):null)}}:{}}}}export{Et as createPythonPlayground};
