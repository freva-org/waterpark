function s(l,t,r){let i=document.createElement(l);if(t)for(let[o,m]of Object.entries(t))m==null||m===!1||(o==="class"?i.className=String(m):o==="text"?i.textContent=String(m):i.setAttribute(o,String(m)));if(r)for(let o of r)o==null||o===!1||i.append(typeof o=="string"?document.createTextNode(o):o);return i}function K(l,...t){l.textContent="";for(let r of t)r==null||r===!1||l.append(typeof r=="string"?document.createTextNode(r):r)}var st="http://www.w3.org/2000/svg";function ke(l,t=14){let r=document.createElementNS(st,"svg");return r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("fill","none"),r.setAttribute("aria-hidden","true"),r.innerHTML=l,r}var ce=class{constructor(){this.items=[],this.disposed=!1}get isDisposed(){return this.disposed}get size(){return this.items.length}add(t){return this.disposed?(t(),()=>{}):(this.items.push(t),()=>this.remove(t))}listen(t,r,i,o){t.addEventListener(r,i,o);let m=!0,x=()=>{},p=()=>{m&&(m=!1,t.removeEventListener(r,i,o),x())};return x=this.add(p),p}setTimeout(t,r){let i=window.setTimeout(()=>{this.remove(o),t()},r),o=()=>window.clearTimeout(i);return this.add(o),i}remove(t){let r=this.items.indexOf(t);r>=0&&this.items.splice(r,1)}flush(){if(!this.disposed)for(this.disposed=!0;this.items.length;){let t=this.items.pop();try{t?.()}catch{}}}};function Ue(l){try{let t=l.createElement("span");return t.setAttribute("contenteditable","plaintext-only"),t.contentEditable==="plaintext-only"}catch{return!1}}var lt={prompt:"te-prompt prompt",fixed:"te-fixed fixed",accent:"te-accent term-flav",muted:"te-muted term-scope",key:"te-key k",eq:"te-eq eq",value:"te-value v",bad:"te-bad bad"};function Ie(l){return!l||l==="plain"?null:lt[l]??`te-${l}`}function ct(l){let t=Ie(l.kind);return t?s("span",{class:t,text:l.text}):document.createTextNode(l.text)}function Ae(l,t){K(l);for(let r of t)r.text&&l.append(ct(r))}function Ne(l,t,r){if(!l.contains(t))return-1;let o=l.ownerDocument.createRange();return o.selectNodeContents(l),o.setEnd(t,r),o.toString().length}function dt(l){let r=l.ownerDocument.getSelection?.();if(!r||r.rangeCount===0)return-1;let i=r.getRangeAt(0);return Ne(l,i.startContainer,i.startOffset)}function Re(l){let t=l.ownerDocument.getSelection?.();if(!t||t.rangeCount===0)return null;let r=t.getRangeAt(0),i=Ne(l,r.startContainer,r.startOffset),o=Ne(l,r.endContainer,r.endOffset);return i<0||o<0?null:{start:i,end:o}}function Be(l,t){let r=l.ownerDocument.createTreeWalker(l,4),i=Math.max(0,t);for(;r.nextNode();){let o=r.currentNode;if(i<=o.data.length)return{node:o,at:i};i-=o.data.length}return{node:null,at:0}}function De(l,t,r){let i=l.ownerDocument,o=i.getSelection?.();if(!o)return;let m=Be(l,t),x=Be(l,r),p=i.createRange();m.node?p.setStart(m.node,Math.min(m.at,m.node.data.length)):(p.selectNodeContents(l),p.collapse(!1)),x.node?p.setEnd(x.node,Math.min(x.at,x.node.data.length)):p.collapse(!1);try{o.removeAllRanges(),o.addRange(p)}catch{}}function mt(l,t){De(l,t,t)}var _e=new Set(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","PageUp","PageDown"]),Te=class{constructor(t,r,i){this.mode="plain",this.composing=!1,this.prefixSegments=[],this.cfg=r,this.richCapable=!r.multiline&&Ue(document),this.ghostClass=`te-ghost ${r.cssPrefix}-ghost`,this.richPrefix=s("span",{class:"cli-prefix cli-line","aria-hidden":"true"}),this.cmd=s("span",{class:"te-cmd",role:"textbox","aria-multiline":r.multiline?"true":"false","aria-label":r.ariaLabel,spellcheck:"false",autocapitalize:"off",tabindex:"0"}),this.ghostLayer=s("span",{class:this.ghostClass,"aria-hidden":"true"}),this.richCaret=s("span",{class:"te-caret","aria-hidden":"true"}),this.flow=s("div",{class:"te-flow"},[this.richPrefix,this.cmd,this.ghostLayer,this.richCaret]),this.plainPrefix=s("div",{class:"cli-prefix cli-prefix-block cli-line","aria-hidden":"true"}),this.hl=s("pre",{class:`${r.cssPrefix}-hl`,"aria-hidden":"true"}),this.ta=s("textarea",{class:`${r.cssPrefix}-input`,rows:"1",spellcheck:"false",autocapitalize:"off",autocomplete:"off","aria-label":r.ariaLabel,placeholder:r.placeholder}),this.plain=s("div",{class:"te-plain"},[this.plainPrefix,s("div",{class:"te-plainwrap"},[this.hl,this.ta])]),this.root=s("div",{class:`${r.cssPrefix}-wrap te-editor`},[this.flow,this.plain]);let o=()=>{this.composing||(this.cfg.multiline||this.stripNewlines(),i.onInput())};t.listen(this.ta,"input",o),t.listen(this.cmd,"input",o);for(let m of[this.ta,this.cmd])t.listen(m,"compositionstart",()=>{this.composing=!0,this.clearGhost()}),t.listen(m,"compositionend",()=>{this.composing=!1,o()}),t.listen(m,"keydown",x=>{let p=x;i.onKeyDown(p),!p.defaultPrevented&&_e.has(p.key)&&t.setTimeout(()=>i.onCaretMove(),0)}),t.listen(m,"keyup",x=>{_e.has(x.key)&&i.onCaretMove()}),t.listen(m,"click",()=>i.onCaretMove()),t.listen(m,"focus",()=>i.onFocus()),t.listen(m,"blur",()=>i.onBlur());t.listen(this.cmd,"paste",m=>{let x=m,p=x.clipboardData?.getData("text/plain");p!==void 0&&(x.preventDefault(),this.insertText(p),o())}),this.setMode("plain")}get inputEl(){return this.mode==="rich"?this.cmd:this.ta}get canBeRich(){return this.richCapable}setMode(t){let r=t==="rich"&&this.richCapable?"rich":"plain";if(r!==this.mode){let i=this.mode==="rich"?this.cmdText():this.ta.value;this.mode=r,r==="rich"?this.setCmdText(i):this.ta.value=i}this.root.dataset.mode=r,this.flow.style.display=r==="rich"?"":"none",this.plain.style.display=r==="plain"?"":"none",r==="rich"?this.cmd.setAttribute("contenteditable","plaintext-only"):this.cmd.removeAttribute("contenteditable"),this.clearGhost(),this.setPrefix(this.prefixSegments)}cmdText(){return this.cmd.textContent??""}setCmdText(t){this.cmd.textContent=t}clearGhost(){this.ghostLayer.textContent=""}get isComposing(){return this.composing}setPrefix(t){this.prefixSegments=t,Ae(this.richPrefix,t),Ae(this.plainPrefix,t),this.plainPrefix.hidden=t.length===0,t.length&&this.richPrefix.append(document.createTextNode(" "))}get value(){return this.mode==="rich"?this.cmdText():this.ta.value}set value(t){this.mode==="rich"?this.setCmdText(t):this.ta.value=t}get caret(){if(this.mode==="plain")return this.ta.selectionStart??this.ta.value.length;let t=dt(this.cmd);return t<0?this.cmdText().length:t}get selection(){if(this.mode==="plain"){let i=this.ta.value.length;return{start:this.ta.selectionStart??i,end:this.ta.selectionEnd??i}}let t=Re(this.cmd),r=this.cmdText().length;return t??{start:r,end:r}}setSelection(t,r){this.mode==="plain"?this.ta.setSelectionRange(t,r):De(this.cmd,t,r)}setCaret(t){this.mode==="plain"?this.ta.setSelectionRange(t,t):mt(this.cmd,t)}isFocused(){let t=document.activeElement;return this.mode==="rich"?t===this.cmd:t===this.ta}focus(){this.inputEl.focus()}contains(t){return!!t&&this.root.contains(t)}paint(t,r){if(this.composing)return;let i=this.isFocused();if(this.mode==="rich"){let h=i?Re(this.cmd):null;Ae(this.cmd,t),h&&De(this.cmd,h.start,h.end),this.ghostLayer.textContent=r&&i?r:"",this.cmd.classList.toggle("is-empty",this.cmdText()===""),this.cmd.dataset.placeholder=this.cfg.placeholder,this.placeRichCaret();return}this.ta.placeholder!==this.cfg.placeholder&&(this.ta.placeholder=this.cfg.placeholder);let o=s("span",{class:"te-caret"}),m=i?this.caret:this.value.length;K(this.hl);let x=(h,C)=>{let u=Ie(C);return u?s("span",{class:u,text:h}):document.createTextNode(h)},p=r&&i?s("span",{class:this.ghostClass,text:r}):null,R=this.cfg.multiline,w=0,T=!1;for(let h of t){if(!h.text)continue;let C=w+h.text.length;if(!T&&m>=w&&m<=C){let u=m-w;this.hl.append(x(h.text.slice(0,u),h.kind),o),p&&R&&this.hl.append(p),this.hl.append(x(h.text.slice(u),h.kind)),T=!0}else this.hl.append(x(h.text,h.kind));w=C}T||(this.hl.append(o),p&&R&&this.hl.append(p)),p&&!R&&this.hl.append(p),this.fit()}placeRichCaret(){let t=this.flow.getBoundingClientRect();if(t.width===0&&t.height===0)return;let r=this.isFocused(),i=r?Re(this.cmd):null;if(i&&i.start!==i.end){this.richCaret.classList.add("hide"),this.ghostLayer.classList.remove("after-cursor");return}this.richCaret.classList.remove("hide");let o=this.cmdText(),m=r?Math.min(this.caret,o.length):o.length,p=this.cmd.ownerDocument.createRange(),R=Be(this.cmd,m);R.node?(p.setStart(R.node,Math.min(R.at,R.node.data.length)),p.collapse(!0)):(p.selectNodeContents(this.cmd),p.collapse(!1));let w=p.getBoundingClientRect(),T=w&&!(w.width===0&&w.height===0)?w:null;if(!T){let g=this.cmd.getClientRects(),y=m<=0?g[0]:g[g.length-1];if(y&&y.height>0)T={left:m<=0?y.left:y.right,top:y.top,height:y.height};else{let E=this.cmd.getBoundingClientRect();T=E.height>0?{left:E.left,top:E.top,height:E.height}:null}}if(!T)return;let h=this.cmd.getClientRects(),C=0;for(let g of h)g.height>C&&(C=g.height);let u=C>0?Math.min(T.height,C):T.height;this.richCaret.style.left=`${Math.round((T.left-t.left)*100)/100}px`,this.richCaret.style.top=`${Math.round((T.top-t.top)*100)/100}px`,u>0&&(this.richCaret.style.height=`${Math.round(u*100)/100}px`),this.ghostLayer.classList.toggle("after-cursor",this.ghostLayer.textContent!==""&&m===o.length)}refreshCaret(){this.mode==="rich"&&this.placeRichCaret()}fit(){if(this.mode!=="plain"){this.refreshCaret();return}if(this.ta.offsetParent===null&&this.ta.clientWidth===0)return;this.ta.style.height="auto";let t=this.ta.scrollHeight;t>0&&(this.ta.style.height=`${t}px`)}insertText(t){let r=this.value,{start:i,end:o}=this.selection,m=this.cfg.multiline?t:t.replace(/[\r\n]+/g," ");this.value=r.slice(0,i)+m+r.slice(o),this.setCaret(i+m.length)}stripNewlines(){let t=this.value;if(!/[\n\r]/.test(t))return;let r=this.caret;this.value=t.replace(/[\n\r]+/g," "),this.setCaret(Math.min(r,this.value.length))}};function je(l,t){let r=Ie(l.kind);return r?s("span",{class:r,text:l.text}):t.createTextNode(l.text)}var Ye={kebab:'<circle cx="12" cy="5" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="19" r="1.6" fill="currentColor"/>',terminal:'<rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M7 9l3 3-3 3M12.5 15h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>'};var Ce=`/* styles.css - @freva-org/freva-client-terminal. Scoped under \`.freva-term\`, which IS the window
   root, and injected into the package's own subtree, so a host without the databrowser still gets a
   complete terminal. Host tokens (--shadow, --mono, --ui, --border-2) are inherited inside a themed
   app; the fallbacks below make standalone use work on a bare page. */

.freva-term {
  --font: var(--mono, "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace);
  --shadow: var(--host-shadow, 0 1px 2px rgba(0, 0, 0, 0.5), 0 6px 20px rgba(0, 0, 0, 0.4));
  --border-2: var(--host-border-2, #2c4267);
  font-family: var(--font);
}
.freva-term *,
.freva-term *::before,
.freva-term *::after {
  box-sizing: border-box;
}

/* Keeps its own dark tokens so it stays dark in day theme. Colours are user-chosen and PERSISTED;
   each preset ships its own foreground so text can never be unreadable. Defaults to black. */
.freva-term {
  --term-bg: #0b0f16;
  --term-fg: #d8e2f2;
  --term-alpha: 0.94;
  /* Text size multiplier on CONTENT only: every content size is \`calc(Npx * var(--term-scale))\`,
     no chrome size is - a title bar grown with its text stops fitting its own controls and drifts
     the traffic lights away from the OS conventions they imitate. */
  --term-scale: 1;
  /* token colours; the light presets override these (see [data-term-light]) */
  --term-prompt: #28c840;
  --term-key: #8fb6ff;
  --term-val: #f0b86b;
  --term-dim: #6f7f9c;
  --term-ghost: #4d5d78;
  --term-hint: #7fd7c4;
  --term-ph: #5b6a86;
  display: none;
  border-radius: 10px;
  overflow: visible;
  /* a hint of the page behind the window - tunable in the \u22EE menu, persisted */
  background: color-mix(in srgb, var(--term-bg) calc(var(--term-alpha) * 100%), transparent);
  backdrop-filter: blur(10px) saturate(120%);
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: var(--shadow);
  color: var(--term-fg);
}
/* corners still clip their own content, but the window doesn't clip its popovers (the \u22EE menu) */
.freva-term .term-bar {
  border-radius: 10px 10px 0 0;
}
/* light presets (e.g. Paper): the token palette has to flip too, or the text is unreadable */
.freva-term[data-term-light="true"] {
  --term-prompt: #1f7a33;
  --term-key: #2d5fb8;
  --term-val: #a05a12;
  --term-dim: #6a7383;
  --term-ghost: #a3acbb;
  --term-hint: #1d7d6c;
  --term-ph: #99a2b0;
  border-color: rgba(0, 0, 0, 0.18);
}
.freva-term[data-term-light="true"] .term-bar {
  background: color-mix(in srgb, var(--term-bg) 88%, #000 6%);
  border-bottom-color: rgba(0, 0, 0, 0.12);
}
.freva-term[data-term-light="true"] .term-menu {
  background: color-mix(in srgb, var(--term-bg) 94%, #000 5%);
  border-color: rgba(0, 0, 0, 0.18);
}
.freva-term[data-term-light="true"] .tm-item {
  color: #22262b;
}
.freva-term[data-term-light="true"] .te-menu,
.freva-term[data-term-light="true"] .py-menu {
  border-color: rgba(0, 0, 0, 0.16);
  background: rgba(0, 0, 0, 0.03);
}
.freva-term[data-term-light="true"] .cmd-tab {
  color: #5b6472;
}
.freva-term[data-term-light="true"] .cmd-tab:not(.on):hover {
  background: rgba(0, 0, 0, 0.05);
}
.freva-term[data-term-light="true"] .term-kebab,
.freva-term[data-term-light="true"] .copy-btn {
  color: #5b6472;
}
.freva-term[data-term-light="true"] .term-kebab:hover,
.freva-term[data-term-light="true"] .copy-btn:hover {
  background: rgba(0, 0, 0, 0.06);
  color: #22262b;
}
.freva-term .term-body {
  border-radius: 0 0 10px 10px;
  overflow-y: auto;
  overflow-x: hidden;
}
.freva-term.zoomed {
  left: 20px !important;
  top: 20px !important;
  right: 20px !important;
  bottom: 20px !important;
  width: auto !important;
  height: auto !important;
  transform: none !important;
}
/* Gmail-style dock: minimized collapses to just the title bar, pinned to the bottom. The
   horizontal position is a variable so the dock can be dragged left/right (never up/down). */
.freva-term.minimized {
  height: auto !important;
  /* \`.freva-term.show\` sets \`min-height: 220px\` for an OPEN window and \`height: auto\` cannot shrink
     past a minimum, so the dock needs the minimum reset too, not just the height. */
  min-height: 0 !important;
  width: 300px !important;
  right: var(--dock-right, 20px) !important;
  bottom: 0 !important;
  left: auto !important;
  top: auto !important;
  transform: none !important;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
}
.freva-term.minimized .term-body {
  display: none;
  min-height: 0;
  height: 0;
}
.freva-term .term-bar {
  cursor: move;
  user-select: none;
}
.freva-term.minimized .term-bar {
  cursor: pointer;
}
/* maximized windows don't move (Gmail) - say so with the cursor */
.freva-term.zoomed .term-bar {
  cursor: default;
}
.freva-term .tl,
.freva-term .cmd-tab,
.freva-term .copy-btn,
.freva-term .term-add,
.freva-term .term-info-btn,
.freva-term .term-bg-btn {
  cursor: pointer;
}
.freva-term .term-resize {
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 14px;
  height: 14px;
  cursor: nwse-resize;
  z-index: 2;
  background: linear-gradient(
    135deg,
    transparent 50%,
    var(--border-2) 50%,
    var(--border-2) 60%,
    transparent 60%,
    transparent 72%,
    var(--border-2) 72%,
    var(--border-2) 82%,
    transparent 82%
  );
}
.freva-term.minimized .term-resize,
.freva-term.zoomed .term-resize {
  display: none;
}
.freva-term .term-add {
  font-size: 13px;
  font-weight: 700;
  color: #7b8aa6;
  background: none;
  border: none;
  padding: 2px 7px;
  border-radius: 6px;
  cursor: pointer;
}
.freva-term .term-add:hover {
  color: #8fb6ff;
  background: rgba(79, 141, 247, 0.15);
}
.freva-term .cmd-tab .tab-x {
  margin-left: 6px;
  opacity: 0.6;
  cursor: pointer;
}
.freva-term .cmd-tab .tab-x:hover {
  opacity: 1;
}
.freva-term .term-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  background: #0e1626;
  border-bottom: 1px solid #1b2942;
}
/* Two groups with a gap between them. \`min-width: 0\` on the start group so a long session title
   ellipsises instead of pushing the right group off the edge; \`flex: 0 0 auto\` on the end group so
   its controls never squeeze - \`fitBar\` moves them to the kebab menu instead. */
.freva-term .term-bar-group {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.freva-term .term-bar-start {
  flex: 0 1 auto;
}
.freva-term .term-bar-end {
  flex: 0 0 auto;
}
.freva-term .spacer {
  flex: 1 1 auto;
  min-width: 8px;
}
.freva-term .traffic {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  margin-right: 4px;
}
.freva-term .tl {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  padding: 0;
  display: inline-grid;
  place-items: center;
}
.freva-term .tl.close {
  background: #ff5f56;
}
.freva-term .tl.min {
  background: #febc2e;
}
.freva-term .tl.zoom {
  background: #28c840;
}
.freva-term .tl span {
  font-size: 9px;
  line-height: 1;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.55);
  opacity: 0;
  transition: opacity 0.1s;
}
.freva-term .traffic:hover .tl span {
  opacity: 1;
}

/* OS-specific window controls */
/* Windows: labelled buttons on the RIGHT, order min \xB7 max \xB7 close, red close hover. */
.freva-term[data-os="windows"] .traffic {
  gap: 0;
  margin: 0 0 0 4px;
}
.freva-term[data-os="windows"] .tl {
  width: 34px;
  height: 26px;
  border-radius: 0;
  background: transparent !important;
  color: #aab8d4;
}
.freva-term[data-os="windows"] .tl span {
  opacity: 1;
  color: currentColor;
  font-size: 12px;
}
.freva-term[data-os="windows"] .tl.min {
  order: 1;
}
.freva-term[data-os="windows"] .tl.zoom {
  order: 2;
}
.freva-term[data-os="windows"] .tl.close {
  order: 3;
}
.freva-term[data-os="windows"] .tl:hover {
  background: #1b2942 !important;
  color: #fff;
}
.freva-term[data-os="windows"] .tl.close:hover {
  background: #e81123 !important;
  color: #fff;
}
.freva-term[data-os="windows"] .tl.min span::before {
  content: "\\2013";
} /* \u2013 */
.freva-term[data-os="windows"] .tl.zoom span::before {
  content: "\\25A1";
} /* \u25A1 */
.freva-term[data-os="windows"] .tl.close span::before {
  content: "\\2715";
} /* \u2715 */
.freva-term[data-os="windows"] .tl span {
  font-size: 0;
}
.freva-term[data-os="windows"] .tl span::before {
  font-size: 12px;
}

/* Linux (GNOME-ish): rounded symbolic buttons on the RIGHT. */
.freva-term[data-os="linux"] .traffic {
  gap: 7px;
  margin: 0 0 0 4px;
}
.freva-term[data-os="linux"] .tl {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #26364f !important;
  color: #d3ddf0;
}
.freva-term[data-os="linux"] .tl.min {
  order: 1;
}
.freva-term[data-os="linux"] .tl.zoom {
  order: 2;
}
.freva-term[data-os="linux"] .tl.close {
  order: 3;
}
.freva-term[data-os="linux"] .tl:hover {
  background: #33496b !important;
}
.freva-term[data-os="linux"] .tl.close {
  background: #3a2730 !important;
  color: #ffb4a8;
}
.freva-term[data-os="linux"] .tl.close:hover {
  background: #c0392b !important;
  color: #fff;
}
.freva-term[data-os="linux"] .tl span {
  opacity: 1;
  color: currentColor;
  font-size: 0;
}
.freva-term[data-os="linux"] .tl.min span::before {
  content: "\\2013";
}
.freva-term[data-os="linux"] .tl.zoom span::before {
  content: "\\25A1";
}
.freva-term[data-os="linux"] .tl.close span::before {
  content: "\\2715";
}
.freva-term[data-os="linux"] .tl span::before {
  font-size: 11px;
}
.freva-term .cmd-tab {
  font-size: 12px;
  font-weight: 600;
  color: #7b8aa6;
  padding: 4px 9px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}
.freva-term .cmd-tab.on {
  background: rgba(79, 141, 247, 0.18);
  color: #8fb6ff;
}
.freva-term .copy-ic {
  width: 30px;
  height: 28px;
  border-radius: 7px;
  border: 1px solid #243349;
  background: #121d31;
  color: #aebbd4;
  cursor: pointer;
  display: inline-grid;
  place-items: center;
}
.freva-term .copy-ic:hover {
  color: #fff;
  border-color: #34507c;
}
.freva-term .copy-ic.done {
  color: #28c840;
  border-color: #28c840;
}
.freva-term .term-body {
  padding: 14px;
  font-family: var(--mono);
  font-size: calc(12.5px * var(--term-scale));
  line-height: 1.85;
  color: var(--term-fg);
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  /* Fills the window height and scrolls inside, so the footer stays pinned to the bottom. */
  overflow-y: auto;
  overflow-x: hidden;
}
.freva-term.zoomed .term-body {
  max-height: none;
}
.freva-term .term-body::-webkit-scrollbar {
  width: 10px;
}
.freva-term .term-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.16);
  border-radius: 6px;
}
.freva-term.minimized .term-body {
  display: none;
}
.freva-term.zoomed .term-body {
  min-height: 220px;
}
.freva-term .prompt {
  color: var(--term-prompt);
  font-weight: 700;
}
.freva-term .fixed {
  color: var(--term-fg);
  font-weight: 600;
  opacity: 0.92;
}
.freva-term .fixed.cont {
  color: #44566f;
  font-weight: 400;
}
.freva-term .k {
  color: var(--term-key);
}
.freva-term .v {
  color: var(--term-val);
}
.freva-term .eq {
  color: var(--term-dim);
}
.freva-term .term-flav {
  color: #c79bf0;
}
.freva-term .term-scope {
  color: #6f7f9c;
  opacity: 0.85;
} /* the base scope: shown so a copied command reproduces results, but visibly not typed */
.freva-term .bad {
  color: #f0795f;
  text-decoration: underline wavy #f0795f;
  text-underline-offset: 3px;
}
.freva-term .cli-line {
  white-space: pre-wrap;
  word-break: break-word;
}
.freva-term .term-edit {
  margin-top: 2px;
}
.freva-term .te-wrap {
  position: relative;
  font-family: var(--mono);
  font-size: calc(12.5px * var(--term-scale));
  line-height: 1.85;
}
.freva-term .te-hl,
.freva-term .te-input {
  margin: 0;
  font: inherit;
  line-height: inherit;
  white-space: pre-wrap;
  word-break: break-word;
  padding: 2px 0;
  border: none;
}
.freva-term .te-hl {
  position: absolute;
  inset: 0;
  color: #d7e2f4;
  pointer-events: none;
}
.freva-term .te-input {
  position: relative;
  display: block;
  width: 100%;
  background: transparent;
  color: transparent;
  caret-color: transparent;
  outline: none;
  resize: none;
  overflow: hidden;
}
.freva-term .te-input::placeholder {
  color: #44566f;
}
.freva-term.fallback .te-hl {
  display: none;
}
.freva-term.fallback .te-input {
  color: var(--term-fg);
  caret-color: var(--term-fg);
}
.freva-term .te-warn {
  display: none;
  margin-top: 8px;
  font-family: var(--ui);
  font-size: calc(11.5px * var(--term-scale));
  color: #f0b86b;
  background: rgba(240, 121, 95, 0.12);
  border: 1px solid rgba(240, 121, 95, 0.4);
  border-radius: 6px;
  padding: 5px 9px;
}
.freva-term .te-warn.show {
  display: block;
}
.freva-term .py-view {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: var(--mono);
  font-size: calc(12.5px * var(--term-scale));
  line-height: 1.9;
  padding: 4px 2px;
}
/* The generic multi-line edit row. NO \`gap\`: the gutter is exactly the read-only prompt column's
   width (4 monospace columns for python) and the editable layers match it, so a gap pushes typed
   kwargs 8px right of the \`>>> \` lines. Above the per-tab rules, so a tab's own metrics win. */
.freva-term .term-editrow {
  display: flex;
  align-items: flex-start;
  min-width: 0;
}
.freva-term .term-editrow > .te-editor {
  flex: 1;
  min-width: 0;
}
.freva-term .term-gutter {
  flex-shrink: 0;
  white-space: pre;
  color: var(--term-dim);
  font-family: var(--font);
  font-size: calc(12.5px * var(--term-scale));
  line-height: 1.65;
  user-select: none;
}

.freva-term .py-line {
  display: flex;
  align-items: baseline;
}
/* The prompt (\`>>> \` / \`... \`) and the editable line's gutter MUST be the same width, or the typed
   kwargs won't line up under the read-only ones. Both are exactly 4 monospace columns. */
.freva-term .py-prompt,
.freva-term .py-gutter {
  display: inline-block;
  flex: 0 0 4ch;
  width: 4ch;
  padding-right: 0;
}
.freva-term .py-prompt {
  color: var(--term-prompt);
  font-weight: 700;
}
.freva-term .py-line.cont .py-prompt {
  color: #44566f;
  font-weight: 400;
}
.freva-term .py-code {
  color: var(--term-key);
}
.freva-term .py-ml {
  display: flex;
  align-items: flex-start;
}
.freva-term .py-gutter {
  white-space: pre;
  color: #44566f;
  font-family: var(--mono);
  font-size: calc(12.5px * var(--term-scale));
  line-height: 1.9;
  user-select: none;
}
.freva-term .py-wrap {
  position: relative;
  flex: 1;
  min-width: 40px;
}
/* BOTH text layers carry the 4-space indent of the read-only \`    key=\` lines; padding the WRAPPER
   cannot do it, as absolutely-positioned \`.py-hl\` ignores it and drifts out of alignment. */
.freva-term .py-hl,
.freva-term .py-input {
  font-family: var(--mono);
  font-size: calc(12.5px * var(--term-scale));
  line-height: 1.9;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  padding: 0 0 0 4ch;
}
.freva-term .py-hl {
  position: absolute;
  inset: 0;
  color: var(--term-val);
  pointer-events: none;
}
/* caret-color TRANSPARENT: the block cursor is drawn here, a native caret would be a second one. */
.freva-term .py-input {
  position: relative;
  display: block;
  width: 100%;
  background: transparent;
  color: transparent;
  caret-color: transparent;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
}
.freva-term .py-input::placeholder {
  color: #44566f;
}
.freva-term .py-ghost {
  color: #4d5d78;
}

.freva-term .te-input::selection,
.freva-term .py-input::selection {
  color: transparent;
}
.freva-term :is(.te-hl, .py-hl) > .te-caret {
  margin-right: -7px;
}
.freva-term :is(.te-hl, .py-hl) > .te-caret + .te-ghost {
  padding-left: 7px;
}
.freva-term .py-out {
  color: #aeb9cf;
  margin: 0 0 2px;
  white-space: pre-wrap;
  word-break: break-word;
}
.freva-term .py-list {
  font-family: var(--mono);
  font-size: calc(12.5px * var(--term-scale));
}

.freva-term .term-host {
  color: #6f9cf0;
  word-break: break-all;
}

/* Windows: blue title bar */
.freva-term[data-os="windows"] .term-bar {
  background: linear-gradient(#1257c4, #0e46a0);
  border-bottom-color: #0a3a86;
}
.freva-term[data-os="windows"] .cmd-tab {
  color: #cfe0ff;
}
.freva-term[data-os="windows"] .cmd-tab.on {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}
.freva-term[data-os="windows"] .term-add,
.freva-term[data-os="windows"] .copy-ic {
  color: #dceaff;
}
.freva-term[data-os="windows"] .tl {
  color: #eaf1ff;
}
.freva-term[data-os="windows"] .tl:hover {
  background: rgba(255, 255, 255, 0.16) !important;
  color: #fff;
}
.freva-term[data-os="windows"] .tl.close:hover {
  background: #e81123 !important;
  color: #fff;
}

/* Inline ghost autocomplete */
.freva-term .te-ghost {
  color: #4d5d78;
}
.freva-term .te-hint {
  font-size: 10.5px;
  color: #4d5d78;
  margin-top: 3px;
  font-family: var(--mono);
}
.freva-term.fallback .te-hint {
  display: none;
}

/* In-terminal completion menu (shell-style, not a floating popover) */
.freva-term .te-menu,
.freva-term .py-menu {
  display: none;
  margin: 6px 0 2px;
  border: 1px solid #26364f;
  border-radius: 6px;
  max-height: 168px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.03);
}
.freva-term .te-menu.show,
.freva-term .py-menu.show {
  display: block;
}
.freva-term .tm-item {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 3px 10px;
  font-family: var(--mono);
  font-size: calc(12px * var(--term-scale));
  color: #c7d4ea;
  cursor: pointer;
}
.freva-term .tm-item.hl {
  background: rgba(79, 141, 247, 0.22);
  color: #fff;
}
.freva-term .tm-item:hover {
  background: rgba(79, 141, 247, 0.12);
}
.freva-term .tm-val {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.freva-term .tm-cnt {
  color: #6f7f9c;
  flex-shrink: 0;
}

/* Terminal: real tabs, blinking cursor, read-only prefix, panels */

/* title bar + tabs */
.freva-term .term-bar {
  background: color-mix(in srgb, var(--term-bg) 82%, #fff 6%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.freva-term .cmd-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px 6px;
  border: 1px solid transparent;
  border-bottom: none;
  border-radius: 7px 7px 0 0;
  margin-bottom: -1px;
  color: #93a3bd;
  font-size: 12px;
  line-height: 1.4;
}
.freva-term .cmd-tab .tab-ic {
  display: inline-flex;
  opacity: 0.75;
}
.freva-term .cmd-tab[data-cmd="cli"] .tab-ic {
  color: #7ee0a8;
} /* bash */
.freva-term .cmd-tab[data-cmd="py"] .tab-ic {
  color: #f0c04d;
} /* python */
.freva-term .cmd-tab.on {
  background: var(--term-bg);
  color: var(--term-fg);
  border-color: rgba(255, 255, 255, 0.14);
  border-bottom: 1px solid var(--term-bg);
}
.freva-term .cmd-tab.on .tab-ic {
  opacity: 1;
}
.freva-term .cmd-tab:not(.on):hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--term-fg);
}

/* [copy] / info / colour controls */
.freva-term .copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--mono);
  font-size: 11.5px;
  color: #93a3bd;
  background: none;
  border: none;
  padding: 3px 7px;
  border-radius: 6px;
}
.freva-term .copy-btn .cb-caret {
  color: #7ee0a8;
  opacity: 0.8;
}
.freva-term .copy-btn:hover {
  color: var(--term-fg);
  background: rgba(255, 255, 255, 0.07);
}
.freva-term .copy-btn:hover .cb-caret {
  opacity: 1;
}
.freva-term .copy-btn.done,
.freva-term .copy-btn.done .cb-caret {
  color: #7ee0a8;
  opacity: 1;
}
.freva-term .term-kebab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 22px;
  color: #93a3bd;
  background: none;
  border: none;
  border-radius: 6px;
}
.freva-term .term-kebab:hover {
  color: var(--term-fg);
  background: rgba(255, 255, 255, 0.08);
}

/* blinking block cursor (a real terminal, not a text field) */
.freva-term .te-caret {
  display: inline-block;
  width: 7px;
  height: 1.05em;
  vertical-align: text-bottom;
  background: var(--term-fg);
  animation: te-blink 1.05s step-end infinite;
}
@keyframes te-blink {
  0%,
  45% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .freva-term .te-caret {
    animation: none;
  }
}

/* Blinks focused or not - the "start typing here" cue: solid when focused, hollow when not. */
.freva-term .te-wrap:not(:focus-within) .te-caret,
.freva-term .py-wrap:not(:focus-within) .te-caret {
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--term-fg);
}
.freva-term .py-fixedline .py-code,
.freva-term .py-ro {
  color: #7f8da3;
  font-style: italic;
  opacity: 0.82;
}

/* overflow (\\22ee) menu: terminal settings; the install guide lives in app-level Help */
.freva-term .term-menu {
  display: none;
  position: absolute;
  right: 8px;
  top: 42px;
  z-index: 120;
  min-width: 214px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: color-mix(in srgb, var(--term-bg) 88%, #fff 8%);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.5);
}
.freva-term .term-menu.show {
  display: block;
}
.freva-term .tmn-h {
  font-size: 10.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #7b8aa6;
  font-family: var(--font);
  margin: 2px 2px 7px;
}
.freva-term .tmn-item {
  display: block;
  width: 100%;
  text-align: left;
  margin-top: 4px;
  padding: 6px 8px;
  border: none;
  border-radius: 6px;
  background: none;
  color: var(--term-fg);
  font-family: var(--font);
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
}
.freva-term .tmn-item:hover {
  background: rgba(255, 255, 255, 0.09);
}
.freva-term .tmn-item:disabled {
  opacity: 0.45;
  cursor: default;
}
.freva-term .tmn-item:disabled:hover {
  background: none;
}
/* A row that throws state away is coloured like one, so it cannot be hit by muscle memory. */
.freva-term .tmn-danger {
  color: #ff9a8b;
}
.freva-term[data-term-light="true"] .tmn-danger {
  color: #a3352a;
}

/* The nested appearance group, OPEN by default: the nesting bounds the controls, not hides them. */
.freva-term .tmn-sub {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 6px 8px;
  border: none;
  border-radius: 6px;
  background: none;
  color: var(--term-fg);
  font-family: var(--font);
  font-size: 12px;
  cursor: pointer;
}
.freva-term .tmn-sub:hover {
  background: rgba(255, 255, 255, 0.09);
}
.freva-term .tmn-sub-chev {
  transition: transform 0.12s;
  color: #7b8aa6;
}
.freva-term .tmn-group.open .tmn-sub-chev {
  transform: rotate(90deg);
}
.freva-term .tmn-subpanel {
  display: none;
  padding: 6px 2px 8px;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.freva-term .tmn-group.open .tmn-subpanel {
  display: block;
}

/* THE SAME GROUP, OPENING SIDEWAYS when the host has placed it among its own rows: unrolled inline
   there, the panel pushes everything below it off the bottom of the menu, so it hangs off the row
   instead and the row stays one row tall open or shut. LEFT by default because the menu hangs from
   the right of the title bar; \`--right\` is measured when there is no room that side. Neither is a
   coordinate: the panel anchors to the group's own box, so a dragged window carries it along. */
/* The menu stops clipping while a flyout is out: it is a scroll container, and a scroll container
   clips both axes whatever the other one says. See the note beside the class in \`window.ts\`. */
.freva-term .term-menu.has-flyout {
  overflow: visible;
}
.freva-term .tmn-group--side {
  position: relative;
}
/* The offset and the cap are \`placeFlyout\`'s, measured against the viewport when the panel opens.
   The fallbacks - level with the row, no cap - apply when it has not run. */
.freva-term .tmn-group--side.open .tmn-subpanel {
  display: block;
  position: absolute;
  top: var(--tmn-flyout-top, -8px);
  right: calc(100% + 10px);
  z-index: 1;
  min-width: 196px;
  max-height: var(--tmn-flyout-max, none);
  overflow-y: auto;
  overscroll-behavior: contain;
  margin: 0;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  background: color-mix(in srgb, var(--term-bg) 88%, #fff 8%);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.5);
}
.freva-term .tmn-group--side.tmn-group--right.open .tmn-subpanel {
  right: auto;
  left: calc(100% + 10px);
}
/* Pointing at where the panel appears, rather than down into a list that is not there. */
.freva-term .tmn-group--side .tmn-sub-chev {
  transform: rotate(180deg);
}
.freva-term .tmn-group--side.tmn-group--right .tmn-sub-chev {
  transform: none;
}
.freva-term .tmn-group--side.open .tmn-sub-chev {
  transform: rotate(180deg);
}
.freva-term .tmn-group--side.tmn-group--right.open .tmn-sub-chev {
  transform: none;
}
.freva-term .tmn-group--side.open > .tmn-sub {
  background: rgba(255, 255, 255, 0.09);
}
.freva-term .tmn-sub:disabled {
  opacity: 0.45;
  cursor: default;
}
.freva-term .tmn-block + .tmn-block {
  margin-top: 8px;
  padding-top: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* colour palette (persisted) */
.freva-term .term-bg-panel {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  padding: 0 2px 8px;
  margin-bottom: 4px;
}
.freva-term .bg-sw {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
.freva-term .bg-sw.on {
  outline: 2px solid #8fb6ff;
  outline-offset: 1px;
}

/* completion menu: the empty state says so, instead of showing nothing */
.freva-term .tm-empty {
  color: #6f7f9c;
  font-style: italic;
  cursor: default;
}
.freva-term .tm-empty:hover {
  background: none;
}

/* bash: the prefix and the command share ONE inline text flow - \`.te-flow\` further down, plain
   inline siblings in one pre-wrap container. An absolute prefix layer, a custom indent on the
   input, a width threshold or a "prefix on its own line" mode each break wrapping - an indent
   shifts only the first line - so all four are absent, and a test asserts they stay absent. */

/* no focus ring inside the terminal: the BLINKING CURSOR is the focus cue */
.freva-term .te-input:focus-visible,
.freva-term .py-input:focus-visible {
  outline: none;
}
.freva-term .te-wrap,
.freva-term .py-wrap {
  border: none;
  box-shadow: none;
}

/* Terminal: hint vs suggestion, and a bar that survives a narrow window */

/* The GHOST is the only thing Tab accepts, so nothing else may look like it: it keeps the
   "type-ahead" grey, and the placeholder and hint are italic in a different hue entirely. */
.freva-term .te-ghost,
.freva-term .py-ghost {
  color: var(--term-ghost);
  font-style: normal;
}
.freva-term .te-input::placeholder,
.freva-term .py-input::placeholder {
  color: var(--term-ph);
  font-style: italic;
  opacity: 0.8;
}
.freva-term .te-hint {
  margin-top: 6px;
  font-family: var(--font);
  font-size: 11px;
  font-style: italic;
  color: var(--term-hint);
  opacity: 0.85;
  letter-spacing: 0.01em;
}
.freva-term .te-hint kbd,
.freva-term .tm-empty {
  font-family: var(--mono);
  font-style: normal;
}
/* keycaps: subtle fill, thicker bottom border, hairline shadow; per theme, dark tokens default. */
.freva-term .te-hint kbd {
  display: inline-flex;
  align-items: center;
  padding: 0 5px;
  margin: 0 1px;
  min-width: 16px;
  justify-content: center;
  border-radius: 4px;
  font-size: 10px;
  line-height: 1.7;
  color: var(--term-fg);
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom-width: 2px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
}
.freva-term[data-term-light="true"] .te-hint kbd {
  background: rgba(0, 0, 0, 0.06);
  border-color: rgba(0, 0, 0, 0.22);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.12);
}
/* Terminal footer: the keyboard-hint strip under the body. The window is overflow:visible for the
   \u22EE menu, so the footer rounds its OWN bottom corners. Hidden when docked or in the fallback. */
.freva-term .term-foot {
  padding: 5px 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 0 0 10px 10px;
  background: color-mix(in srgb, var(--term-bg) 96%, #000 5%);
  display: flex;
  align-items: center;
  min-height: 26px;
  flex-shrink: 0;
}
.freva-term .term-foot .te-hint {
  margin: 0;
  opacity: 0.9;
}
.freva-term[data-term-light="true"] .term-foot {
  border-top-color: rgba(0, 0, 0, 0.1);
  background: color-mix(in srgb, var(--term-bg) 92%, #000 4%);
}
.freva-term.minimized .term-foot,
.freva-term.fallback .term-foot {
  display: none;
}
/* the "how to type this" rows in the menu are guidance, not completions */
.freva-term .tm-empty {
  color: var(--term-hint);
  font-style: italic;
  cursor: default;
}
.freva-term .tm-empty:hover {
  background: none;
}

/* narrow window: the window controls must never be pushed out of the bar */
.freva-term.show {
  min-width: 340px;
}
.freva-term .term-bar {
  flex-wrap: nowrap;
}
.freva-term .traffic,
.freva-term .term-add,
.freva-term .copy-btn,
.freva-term .term-kebab {
  flex: 0 0 auto;
}
.freva-term .cmd-tab {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
}
.freva-term .cmd-tab .tab-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* below this WINDOW width (set by a ResizeObserver on the terminal itself - a viewport media
   query can't see the window's own size) the tab labels give way before the controls do */
.freva-term.narrow .cmd-tab .tab-label {
  display: none;
}
.freva-term.narrow .copy-btn .cb-word {
  display: none;
}

/* opacity slider in the \u22EE menu */
.freva-term .term-scale {
  width: 100%;
  accent-color: #8fb6ff;
}
.freva-term .tmn-alpha {
  padding: 2px 2px 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 4px;
}
.freva-term .term-alpha {
  width: 100%;
  accent-color: #8fb6ff;
  cursor: pointer;
}

/* completion menu placement: the window sits bottom-right, so a list under the caret is often below
   the fold. With no room beneath, the menu FLIPS above the prompt, as a shell does; explicit flex
   \`order\` values (not DOM order) move it alone. */
.freva-term .term-view {
  display: flex;
  flex-direction: column;
}
.freva-term .term-view > .term-head {
  order: 10;
}
.freva-term .term-view > .term-edit {
  order: 20;
}
.freva-term .term-view > .tm-menu {
  order: 30;
}
.freva-term .term-view > .te-warn {
  order: 40;
}
.freva-term .term-view > .term-foot-lines {
  order: 50;
}
.freva-term .term-view.menu-above > .tm-menu {
  order: 15; /* between the read-only header and the prompt line */
  margin: 0 0 6px;
}

/* NO blanket dimming of \`.term-head .te-prompt\`: it would sweep up python's real \`>>>\` lines along
   with the \`...\` continuations. Continuations are dimmed by their own kind, \`.te-contprompt\`. */

/* LAYOUT OVERRIDES for this package's markup. These come last on purpose: everything above is the
   shared visual identity, and this block re-states only the geometry that differs. */

/* Container-relative window. \`position: fixed\` sized against \`100vw/58vh\` assumes the window owns
   the top-level page; in a clipped, \`overflow: hidden\`, transformed host container that puts it
   outside its own component and out of reach. It is clamped against its MOUNT, host-supplied. */
.freva-term.show {
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 80;
  right: 20px;
  bottom: 20px;
  width: min(760px, calc(100% - 40px));
  height: min(58%, 440px);
  min-height: 220px;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.06);
}

/* The shared inline flow: the immutable prefix and the editable command are ordinary inline
   content in ONE \`pre-wrap\` flow, so the command starts right after the last prefix token at every
   width and a wrapped line continues at the container's normal left edge, like a shell. */
.freva-term .te-flow {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: normal;
  font-family: var(--font);
  font-size: calc(12.5px * var(--term-scale));
  line-height: 1.65;
  padding: 2px 0;
}
.freva-term .cli-prefix {
  /* explicitly NOT positioned and NOT nowrap - it wraps with the command */
  position: static;
  display: inline;
  white-space: inherit;
  padding: 0;
  pointer-events: none;
  user-select: none;
}
.freva-term .te-cmd {
  display: inline;
  outline: none;
  white-space: inherit;
  min-width: 1px;
  color: var(--term-fg);
  /* TRANSPARENT, like the plain fallback's textarea: the cursor is the blinking BLOCK drawn beside
     it, so a native caret on top would be a second one - \`.py-input\` does the same for that. */
  caret-color: transparent;
}
.freva-term .te-cmd.is-empty::after {
  content: attr(data-placeholder);
  color: var(--term-ph);
  pointer-events: none;
}
/* The block cursor in the rich flow cannot be an inline node: inserting one at the caret would
   split the EDITABLE text, where only the buffer may live. It is an absolutely positioned sibling
   on the caret's client rect from \`paint()\`, already on the right visual line, wrapped or not. */
.freva-term .te-flow {
  position: relative;
}
.freva-term .te-flow > .te-caret {
  position: absolute;
  left: 0;
  top: 0;
  vertical-align: baseline;
}
/* Hidden only while a RANGE is selected: the selection highlight is the cue, not a block cursor. */
.freva-term .te-flow > .te-caret.hide {
  display: none;
}
/* Unfocused: the hollow parked box, the terminal convention and the "start typing here" cue.
   \`.te-flow\` is the focus scope for the rich surface, as \`.te-wrap\` is for the plain one. */
.freva-term .te-flow:not(:focus-within) > .te-caret {
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--term-fg);
}
/* With a suggestion showing and the cursor at the end of the buffer, the ghost starts where the
   cursor is drawn; reserving the cursor's width puts it AFTER the block rather than underneath. */
.freva-term .te-flow > .te-ghost.after-cursor {
  padding-left: 7px;
}
/* Presentation-only siblings of the editable node: they must not take a click, a caret or a
   selection, or the user could put the cursor "inside" a suggestion that is not in the buffer. */
.freva-term .te-flow > .te-ghost,
.freva-term .te-flow > .te-caret {
  pointer-events: none;
  user-select: none;
}

/* The explicit plain-textarea fallback */
.freva-term .te-plain {
  display: none;
}
/* The reveal keys off \`.te-editor\`, which is on EVERY editor root; the per-tab \`\${prefix}-wrap\`
   class is not (python's root is \`.py-wrap\`), so keying off \`.te-wrap\` never reveals python. */
.freva-term .te-editor[data-mode="plain"] .te-plain {
  display: block;
}
.freva-term .te-editor[data-mode="plain"] .te-flow {
  display: none;
}
.freva-term .te-editor[data-mode="rich"] .te-plain {
  display: none;
}
.freva-term .te-plainwrap {
  position: relative;
}
.freva-term .cli-prefix-block {
  display: block;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  position: static;
  padding: 2px 0 0;
}
.freva-term .te-plain .te-hl,
.freva-term .te-plain .te-input {
  text-indent: 0;
}

/* Tabs / views */
.freva-term .term-view {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.freva-term .term-head,
.freva-term .term-foot-lines {
  font-family: var(--font);
  font-size: calc(12.5px * var(--term-scale));
  line-height: 1.65;
  color: var(--term-dim);
}
.freva-term .term-line {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.freva-term .term-edit {
  min-width: 0;
}
.freva-term .tm-menu {
  display: none;
}
.freva-term .tm-menu.show {
  display: block;
}

/* Segment colours. The package emits kind-prefixed classes (\`te-key\`, \`te-value\`, \u2026) rather than
   bare \`.k\`/\`.v\`/\`.eq\`, because an unprefixed class in a shared subtree collides. Same palette. */
.freva-term .te-prompt {
  color: var(--term-prompt);
  font-weight: 700;
}
/* NO generic \`.te-fixed\` colour: one would sit after \`.fixed\` here and repaint BOTH tabs' fixed
   text the same grey. bash's command and flags are foreground-weight; python's \`import\` line and
   \`databrowser(\` / \`)\` are KEY-coloured, being code not a command line. \`.fixed\` carries bash's,
   python states its own below. */
.freva-term .term-view[data-cmd="py"] .te-fixed {
  color: var(--term-key);
  font-weight: 400;
  opacity: 1;
}
/* The \`...\` gutter of a read-only continuation line is quiet; a real \`>>>\` prompt is not. Both are
   painted from segments, so the host says which is which and this styles the answer. */
.freva-term .te-contprompt {
  color: #44566f;
  font-weight: 400;
}
.freva-term .te-key {
  color: var(--term-key);
}
.freva-term .te-value {
  color: var(--term-val);
}
.freva-term .te-eq {
  color: var(--term-dim);
}
.freva-term .te-accent {
  color: var(--term-hint);
}
.freva-term .te-muted {
  color: var(--term-dim);
  font-style: italic;
  opacity: 0.82;
}
.freva-term .te-bad {
  color: #ff6b6b;
  text-decoration: underline wavy currentColor 1px;
  text-underline-offset: 3px;
}
.freva-term .te-ghost {
  color: var(--term-ghost);
  pointer-events: none;
}

/* Settings menu: it must survive being MINIMIZED. A minimized window is pinned to the bottom of
   its container, so a menu anchored under the title bar opens off the bottom edge, out of reach;
   \`.above\` flips it over the bar. Both placements are clamped by the controller's max-height. */
.freva-term .term-menu {
  max-height: none;
  overflow-y: auto;
}
.freva-term .term-menu.above {
  top: auto;
  bottom: calc(100% + 6px);
}
.freva-term.minimized .term-menu.show {
  display: block;
}
/* The minimized dock hides most of the window, but the settings menu is still reachable from it,
   so these three opt back IN to the display each actually uses. \`display: revert\` will not do for
   the colour panel: the UA default (\`block\`) drops the flex row and with it the 7px swatch gaps. */
.freva-term.minimized .term-bg-panel {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
}
.freva-term.minimized .bg-sw {
  flex: 0 0 24px; /* a fixed track, so a wrapped row keeps the same rhythm as an unwrapped one */
}
.freva-term.minimized .tmn-alpha,
.freva-term.minimized .tmn-item {
  display: revert;
}

/* confirmation */

/* The window's own question, in its own colours: inside \`.freva-term\`, absolutely positioned
   against it, so it dims this window and nothing else of the host's. Not \`<dialog showModal()>\`
   either - that paints in the top layer, above anything a host ordered above the window. */
.freva-term .term-confirm-scrim {
  position: absolute;
  inset: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(4, 8, 16, 0.62);
  border-radius: inherit;
}
.freva-term .term-confirm {
  max-width: calc(30 * var(--wp-rem, 1rem));
  padding: 16px 18px;
  border: 1px solid #2a3d5e;
  border-radius: 10px;
  background: #101b2e;
  color: #dbe4f3;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.55);
}
.freva-term .term-confirm-title {
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
}
.freva-term .term-confirm-body {
  margin: 0 0 14px;
  font-size: 12.5px;
  line-height: 1.55;
  color: #aebbd4;
}
.freva-term .term-confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.freva-term .term-confirm-btn {
  padding: 6px 12px;
  border: 1px solid #2a3d5e;
  border-radius: 7px;
  background: #16233a;
  color: #dbe4f3;
  font: inherit;
  font-size: 12.5px;
  cursor: pointer;
}
.freva-term .term-confirm-btn:hover {
  border-color: #34507c;
  color: #fff;
}
.freva-term .term-confirm-btn:focus-visible {
  outline: 2px solid #4f8df7;
  outline-offset: 2px;
}
.freva-term .term-confirm-ok {
  border-color: #34507c;
  background: #1d3050;
}
/* The destructive answer LOOKS destructive and is still not focused: focus is what protects. */
.freva-term .term-confirm-danger {
  border-color: #8a3b34;
  background: #3a1c19;
  color: #ffd5cf;
}
.freva-term .term-confirm-danger:hover {
  border-color: #c1584c;
  color: #fff;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .freva-term .te-caret {
    animation: none;
  }
}
`;var pe=[{id:"black",label:"Black",bg:"#0b0f16",fg:"#d8e2f2"},{id:"ink",label:"Ink",bg:"#131a26",fg:"#d8e2f2"},{id:"graphite",label:"Graphite",bg:"#22262b",fg:"#e4e7ea"},{id:"midnight",label:"Midnight",bg:"#0d1b2a",fg:"#cfe3f7"},{id:"forest",label:"Forest",bg:"#10201a",fg:"#cfe9d9"},{id:"plum",label:"Plum",bg:"#1d1526",fg:"#e6d7f2"},{id:"paper",label:"Paper",bg:"#f4f1ea",fg:"#22262b",light:!0}],qe=360,Ke=220,ft=4,Ve="black",Xe=.85,Je=.55,Ze=1,Qe=.8,et=1.6,tt=new WeakMap;function pt(l,t){try{if(typeof CSSStyleSheet=="function"&&Array.isArray(l.adoptedStyleSheets)){if(!tt.has(l)){let i=new CSSStyleSheet;i.replaceSync(Ce),l.adoptedStyleSheets=[...l.adoptedStyleSheets,i],tt.set(l,!0)}return}}catch{}let r=s("style",{type:"text/css"});r.textContent=Ce,t.append(r)}function rt(l){try{let t=document.createElement("textarea");t.value=l,t.setAttribute("readonly",""),t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let r=document.execCommand("copy");return t.remove(),r}catch{return!1}}function ht(l){let t=r=>!!(r&&r.isCollapsed===!1&&r.toString().trim()!=="");if(t(l?.ownerDocument?.defaultView?.getSelection?.()))return!1;for(let r=l;r;r=r.parentElement){let i=r.shadowRoot;if(t(i?.getSelection?.()))return!1}return!0}var ot=(l,t,r)=>Math.min(r,Math.max(t,Number.isFinite(l)?l:t));function Pe(l,t){if(t!=="title")for(let r of l.querySelectorAll("[title]")){let i=r.getAttribute("title")??"";r.removeAttribute("title"),r.setAttribute(t,i),!r.getAttribute("aria-label")&&!(r.textContent??"").trim()&&r.setAttribute("aria-label",i)}}function Oe(l,t={}){let r=new ce,i=t.storage,o=s("div",{class:"freva-term cmd","data-os":t.os??"mac"});pt(l.ownerDocument??document,o);let m=(a,c,d)=>s("button",{class:`tl ${a}`,type:"button",title:c,"aria-label":c},[s("span",{text:d})]),x=m("close",t.closeLabel??"Close","\u2715"),p=m("min","Minimize","\u2013"),R=m("zoom","Maximize","+"),w=s("button",{class:"copy-btn",type:"button",title:t.copyTitle??"Copy command","aria-label":t.copyTitle??"Copy command"},[s("span",{class:"cb-caret",text:"\u276F"}),s("span",{class:"cb-word",text:t.copyLabel??"copy"})]),T=s("button",{class:"term-kebab",type:"button",title:"Terminal settings","aria-label":"Terminal settings","aria-haspopup":"true","aria-expanded":"false"},[ke(Ye.kebab,14)]),h=s("span",{class:"traffic"},[x,p,R]),C=s("div",{class:"spacer"}),u=s("div",{class:"term-bar-group term-bar-start"}),g=s("div",{class:"term-bar-group term-bar-end"}),y=s("div",{class:"term-bar"},[u,C,g]),E=s("div",{class:"term-body"}),V=t.foot===!0?s("div",{class:"term-foot"}):null,j=s("div",{class:"term-bg-panel",role:"listbox","aria-label":"Terminal colour"}),ae=s("input",{class:"term-alpha",type:"range",min:String(Je),max:"1",step:"0.01","aria-label":"Terminal opacity",title:"Terminal opacity"}),N=s("input",{class:"term-scale",type:"range",min:String(Qe),max:String(et),step:"0.05","aria-label":"Terminal text size",title:"Terminal text size"}),$=s("button",{class:"tmn-item tmn-reset",type:"button",role:"menuitem",text:"Reset appearance"}),L=s("div",{class:"tmn-subpanel",id:"term-appearance"},[s("div",{class:"tmn-h",text:"Colour"}),j,s("div",{class:"tmn-h",text:"Opacity"}),s("div",{class:"tmn-alpha"},[ae]),s("div",{class:"tmn-h",text:"Text size"}),s("div",{class:"tmn-alpha tmn-scale"},[N]),$]),B=s("button",{class:"tmn-sub",type:"button","aria-expanded":"true","aria-controls":"term-appearance"},[s("span",{class:"tmn-sub-label",text:"Terminal settings"}),s("span",{class:"tmn-sub-chev","aria-hidden":"true",text:"\u203A"})]),M=s("div",{class:"tmn-group open"},[B,L]),de=B.querySelector(".tmn-sub-label"),te=s("div",{class:"tmn-sections"}),A=s("div",{class:"term-menu",role:"menu"},[te]);r.listen(B,"click",()=>{let a=M.classList.toggle("open");B.setAttribute("aria-expanded",a?"true":"false");let c=M.classList.contains("tmn-group--side");A.classList.toggle("has-flyout",a&&c),a&&c&&ue()});let X=8;function H(){let a=L.getBoundingClientRect(),c=B.getBoundingClientRect(),d=A.getBoundingClientRect(),b=window.innerHeight||0,S=a.width||220;M.classList.toggle("tmn-group--right",d.left-S<X);let D=Math.max(L.offsetHeight,L.scrollHeight,a.height),q=b-X*2,W=D>q;M.style.setProperty("--tmn-flyout-max",W?`${Math.max(120,q)}px`:"none");let Q=W?q:D,Ee=c.top-X,O=b-X-Q,le=Math.max(X,Math.min(Ee,O));M.style.setProperty("--tmn-flyout-top",`${Math.round(le-c.top)}px`)}function ue(){H(),r.setTimeout(()=>{M.classList.contains("open")&&M.classList.contains("tmn-group--side")&&H()},0)}function me(a){te.textContent="",M.remove();let c=!1;for(let d of a){if(d.items.length===0)continue;let b=s("div",{class:"tmn-block"});d.title&&b.append(s("div",{class:"tmn-h",text:d.title}));for(let S of d.items){if(S.appearance===!0){c=!0,de&&(de.textContent=S.label),M.classList.add("tmn-group--side"),M.classList.remove("open","tmn-group--right"),B.setAttribute("aria-expanded","false"),B.disabled=S.disabled===!0,b.append(M);continue}b.append(be(S))}te.append(b)}c||(M.classList.remove("tmn-group--side","tmn-group--right"),M.classList.add("open"),B.disabled=!1,B.setAttribute("aria-expanded","true"),A.prepend(M)),Pe(te,t.tooltipAttribute??"title")}function be(a){let c=`tmn-item${a.danger?" tmn-danger":""}`;if(a.href)return s("a",{class:c,href:a.href,target:"_blank",rel:"noopener noreferrer",role:"menuitem",text:a.label,...a.title?{title:a.title}:{}});let d=s("button",{class:c,type:"button",role:"menuitem",text:a.label,disabled:a.disabled===!0,...a.title?{title:a.title}:{}});return r.listen(d,"click",()=>{ne=d,P(),a.onSelect?.()}),d}let ge=s("div",{class:"term-resize","aria-hidden":"true"}),re={mac:"start",windows:"end",linux:"end"},ve=t.controlsSide??re[t.os??"mac"]??"start";ve==="start"&&u.append(h),t.copyText&&g.append(w),g.append(T),ve==="end"&&g.append(h),o.append(y,E,...V?[V]:[],A,ge),l.append(o),me([...t.menuSections??[],...t.menuItems&&t.menuItems.length>0?[{items:t.menuItems}]:[]]);let G=()=>t.bounds?.()??l,J=()=>G().getBoundingClientRect(),_=null;function ie(){_={left:o.style.left,top:o.style.top,width:o.style.width,height:o.style.height}}function xe(){o.style.left="",o.style.top="",o.style.right="",o.style.bottom="",o.style.transform="",o.style.width="",o.style.height=""}function oe(){_&&(o.style.left=_.left,o.style.top=_.top,o.style.width=_.width,o.style.height=_.height,_.left&&(o.style.right="auto",o.style.bottom="auto",o.style.transform="none"),_=null)}let F=()=>o.classList.contains("minimized"),Z=()=>o.classList.contains("zoomed");function se(a){if(a===F())return;let c=a&&Z();o.classList.toggle("minimized",a),o.classList.remove("zoomed"),P(),a?(ie(),xe()):oe(),c&&t.onMaximize?.(!1),t.onMinimize?.(a)}function fe(a){if(a===Z())return;let c=a&&F();o.classList.toggle("zoomed",a),o.classList.remove("minimized"),P(),a?(ie(),xe()):oe(),c&&t.onMinimize?.(!1),t.onMaximize?.(a)}r.listen(x,"click",()=>Me()),r.listen(p,"click",()=>se(!F())),r.listen(R,"click",()=>fe(!Z()));let U=null,e=null,n=null,f=!1,v=".tl, .copy-btn, .term-kebab, .term-menu",z=a=>!!a.closest(v)||(t.dragExclude?!!a.closest(t.dragExclude):!1);r.listen(y,"click",a=>{if(F()&&!z(a.target)){if(f){f=!1;return}se(!1)}}),r.listen(y,"mousedown",a=>{let c=a;if(z(c.target)||Z())return;let d=J(),b=o.getBoundingClientRect();if(F()){n={startX:c.clientX,startRight:d.right-b.right,moved:!1},f=!1,c.preventDefault();return}U={dx:c.clientX-b.left,dy:c.clientY-b.top,started:!1},c.preventDefault()}),r.listen(ge,"mousedown",a=>{let c=a,d=o.getBoundingClientRect();e={x:c.clientX,y:c.clientY,w:d.width,h:d.height},c.preventDefault(),c.stopPropagation()}),r.listen(window,"mousemove",a=>{let c=a,d=J();if(U){if(!U.started){let Q=o.getBoundingClientRect();o.classList.remove("zoomed"),o.style.transform="none",o.style.right="auto",o.style.bottom="auto",o.style.left=`${Q.left-d.left}px`,o.style.top=`${Q.top-d.top}px`,U.started=!0}let b=o.getBoundingClientRect(),S=Math.max(0,d.width-b.width),D=Math.max(0,d.height-b.height),q=Math.min(S,Math.max(0,c.clientX-U.dx-d.left)),W=Math.min(D,Math.max(0,c.clientY-U.dy-d.top));o.style.left=`${q}px`,o.style.top=`${W}px`}else if(n){let b=c.clientX-n.startX;if(!n.moved&&Math.abs(b)>ft-1&&(n.moved=!0,f=!0),n.moved){let S=o.getBoundingClientRect().width||300,D=Math.max(0,d.width-S),q=Math.min(D,Math.max(0,n.startRight-b));o.style.setProperty("--dock-right",`${q}px`)}}else if(e){let b=o.getBoundingClientRect(),S=Math.max(qe,d.right-b.left-8),D=Math.max(Ke,d.bottom-b.top-8);o.style.width=`${Math.min(S,Math.max(qe,e.w+(c.clientX-e.x)))}px`,o.style.height=`${Math.min(D,Math.max(Ke,e.h+(c.clientY-e.y)))}px`,t.onResize?.()}}),r.listen(window,"mouseup",()=>{U=null,e=null,n=null});function I(){let a=o.getBoundingClientRect().width;a>0&&o.classList.toggle("narrow",a<460)}if(r.listen(window,"resize",()=>{Le()&&(I(),t.onResize?.())}),typeof ResizeObserver=="function"){let a=new ResizeObserver(()=>{I(),t.onResize?.()});a.observe(o),r.add(()=>a.disconnect())}function P(){A.classList.remove("show","has-flyout"),T.setAttribute("aria-expanded","false"),M.classList.contains("tmn-group--side")&&(M.classList.remove("open"),B.setAttribute("aria-expanded","false"))}let Y=0,k=null,ne=null;function Se(a){if(k)return Promise.resolve(!1);P();let c=a.returnFocus??ne??(o.contains(o.ownerDocument.activeElement)?o.ownerDocument.activeElement:T);ne=null;let d=`term-confirm-title-${Y}`,b=`term-confirm-body-${Y}`;Y+=1;let S=s("button",{class:"term-confirm-btn",type:"button",text:a.cancelLabel??"Cancel"}),D=s("button",{class:`term-confirm-btn term-confirm-ok${a.danger?" term-confirm-danger":""}`,type:"button",text:a.confirmLabel??"Confirm"}),q=s("div",{class:"term-confirm",role:"alertdialog","aria-modal":"true","aria-labelledby":d,"aria-describedby":b},[s("h2",{class:"term-confirm-title",id:d,text:a.title}),s("p",{class:"term-confirm-body",id:b,text:a.body}),s("div",{class:"term-confirm-actions"},[S,D])]),W=s("div",{class:"term-confirm-scrim"},[q]),Q=O=>{if(!k||k.root!==W)return;let{resolve:le,returnFocus:ee}=k;k=null,W.remove(),ee?.isConnected&&ee.focus(),le(O)};W.addEventListener("keydown",O=>{let le=O.key;if(le==="Escape"){O.preventDefault(),O.stopPropagation(),Q(!1);return}if(le!=="Tab")return;let ee=[S,D],Ge=ee.indexOf(o.ownerDocument.activeElement),it=O.shiftKey?Ge-1:Ge+1;O.preventDefault(),ee[(it%ee.length+ee.length)%ee.length]?.focus()}),W.addEventListener("mousedown",O=>{O.target===W&&O.preventDefault()}),S.addEventListener("click",()=>Q(!1)),D.addEventListener("click",()=>Q(!0)),o.append(W);let Ee=new Promise(O=>{k={resolve:O,root:W,returnFocus:c}});return S.focus(),Ee}function at(){let a=F();A.classList.toggle("above",a);let c=J(),d=o.getBoundingClientRect(),b=y.getBoundingClientRect().height||40;a?(A.style.bottom="calc(100% + 6px)",A.style.top="auto",A.style.maxHeight=`${Math.max(120,Math.floor(d.top-c.top-12))}px`):(A.style.top=`${Math.round(b+2)}px`,A.style.bottom="auto",A.style.maxHeight=`${Math.max(120,Math.floor(c.bottom-d.top-b-16))}px`)}r.listen(T,"click",a=>{a.stopPropagation();let c=A.classList.toggle("show");T.setAttribute("aria-expanded",c?"true":"false"),c&&at()}),r.listen(document,"mousedown",a=>{A.classList.contains("show")&&(a.target.closest(".term-menu, .term-kebab")||P())});function we(a,c=!0){let d=pe.find(b=>b.id===a)??pe[0];o.style.setProperty("--term-bg",d.bg),o.style.setProperty("--term-fg",d.fg),o.setAttribute("data-term-light",d.light?"true":"false");for(let b of o.querySelectorAll(".bg-sw")){let S=b.dataset.bg===d.id;b.classList.toggle("on",S),b.setAttribute("aria-selected",S?"true":"false")}c&&i?.setTheme(d.id)}for(let a of pe)j.append(s("button",{class:"bg-sw",type:"button",role:"option","data-bg":a.id,title:a.label,"aria-label":a.label,style:`background:${a.bg}`}));r.listen(j,"click",a=>{let c=a.target.closest(".bg-sw");c?.dataset.bg&&we(c.dataset.bg)});function ye(a,c=!0){let d=ot(a,Je,1);o.style.setProperty("--term-alpha",String(d)),ae.value=String(d),c&&i?.setAlpha(d)}r.listen(ae,"input",()=>ye(Number(ae.value)));function $e(a,c=!0){let d=ot(a,Qe,et);o.style.setProperty("--term-scale",String(d)),N.value=String(d),c&&i?.setTextScale?.(d)}let ze=a=>{$e(a),t.onResize?.()};r.listen(N,"input",()=>ze(Number(N.value)));function He(){we(Ve),ye(Xe),ze(Ze)}r.listen($,"click",()=>{P(),He()}),we(i?.getTheme()??Ve,!1),ye(i?.getAlpha()??Xe,!1),$e(i?.getTextScale?.()??Ze,!1),r.listen(w,"click",()=>{let a=t.copyText?.()??"",c=w.querySelector(".cb-word"),d=w.querySelector(".cb-caret"),b=t.copyLabel??"copy",S=()=>{w.classList.add("done"),d&&(d.textContent="\u2713"),c&&(c.textContent="copied"),r.setTimeout(()=>{w.classList.remove("done"),d&&(d.textContent="\u276F"),c&&(c.textContent=b)},1200)},D=()=>t.onCopyFailed?.("Copy failed - select and copy manually.");navigator.clipboard?.writeText?navigator.clipboard.writeText(a).then(S,()=>{rt(a)?S():D()}):rt(a)?S():D()}),r.listen(E,"mousedown",a=>{a.target===E&&a.preventDefault()}),r.listen(E,"click",a=>{let c=a.target;c.closest(".tm-item, .term-menu, a, button, textarea, input, [contenteditable]")||ht(c)&&t.onBodyActivate?.()});function Le(){return o.classList.contains("show")}function Me(){o.classList.remove("show"),P(),t.onHide?.(),t.onClose?.()}function Fe(){o.classList.add("show"),o.classList.remove("minimized"),t.onShow?.(),I()}let We=t.tooltipAttribute??"title";return Pe(o,We),{el:o,bar:y,barSpacer:C,barStart:u,barEnd:g,addBarControl(a,c="start"){c==="end"?g.insertBefore(a,T):u.append(a),I()},body:E,foot:V,settings:A,show:Fe,hide:Me,toggle(a){a??!Le()?Fe():Me()},isShown:Le,isMinimized:F,setMinimized:se,isMaximized:Z,setMaximized:fe,closeSettings:P,setMenuSections:me,confirm:Se,applyTheme:we,applyAlpha:ye,applyTextScale:ze,resetAppearance:He,fitBar:I,applyTooltips(){Pe(o,We)},destroy(){r.flush(),o.remove()}}}function he(l){return s("kbd",{text:l})}function nt(l){return l?[he("Tab \u21E5")," now leaves the terminal \xB7 type to keep completing"]:[he("Tab \u21E5")," completes \xB7 ",he("\u2193")," lists all options \xB7 ",he("Esc")," then ",he("Tab \u21E5")," to leave"]}function ut(l,t){if(!t.tabs.length)throw new Error("freva-client-terminal: at least one tab is required");let r=new ce,i=Oe(l,{os:t.os,storage:t.storage,tooltipAttribute:t.tooltipAttribute,bounds:t.bounds,foot:!0,dragExclude:".cmd-tab, .term-add",copyText:()=>h.get(u)?.tab.copyText()??"",menuItems:t.menuItems,onClose:t.onClose,onCopyFailed:t.onCopyFailed,onShow:()=>{U(),y()||h.get(u)?.editor.focus()},onHide:()=>H(),onMinimize:e=>{e&&H()},onResize:()=>{se();for(let e of h.values())e.editor.fit()},onBodyActivate:()=>{y()||h.get(u)?.editor.focus()}}),o=l.ownerDocument,m=i.el,x=i.bar,p=i.body,R=i.foot,w=s("button",{class:"term-add",type:"button",title:"Reopen closed tab","aria-label":"Reopen closed tab",text:"+"}),T=s("span",{class:"te-hint"},nt(!1));R.append(T);let h=new Map,C=new Set(t.tabs.map(e=>e.id)),u=t.activeTab&&C.has(t.activeTab)?t.activeTab:t.tabs[0].id,g=!1,y=()=>t.fallback?.()===!0,E=e=>{K(T,...nt(e))},V=()=>{g=!0,E(!0)},j=()=>{g=!1},ae=e=>e.shiftKey?!0:g?(g=!1,!0):!1,N=[],$=0,L=null,B=null,M=()=>L!==null&&N.length>0;function de(){L&&(K(L),N.forEach((e,n)=>{L.append(s("div",{class:`tm-item${n===$?" hl":""}`,role:"option","data-i":String(n)},[s("span",{class:"tm-val",text:e.value}),e.count===null||e.count===void 0?null:s("span",{class:"tm-cnt",text:e.count.toLocaleString("en-US")})]))}))}function te(e){let n=e.parentElement,f=p.getBoundingClientRect();if(!n||f.height===0)return;let v=h.get(u)?.editor.inputEl;if(!v)return;let z=v.getBoundingClientRect(),I=f.bottom-z.bottom-10,P=z.top-f.top-10,Y=96,k=I<Y&&P>I;n.classList.toggle("menu-above",k);let ne=Math.max(Y,Math.floor(k?P:I));e.style.maxHeight=`${Math.min(220,ne)}px`,e.scrollIntoView?.({block:"nearest"})}function A(e,n,f){if(!n.length){H();return}let v=L===e?N[$]?.value??null:null;N=n;let z=v===null?-1:n.findIndex(I=>I.value===v);$=z>=0?z:0,B=f,L=e,de(),e.classList.add("show"),te(e)}function X(e,n){N=[],$=0,B=null,L=e,K(e,s("div",{class:"tm-item tm-empty",text:n})),e.classList.add("show"),te(e)}function H(){L&&(L.parentElement?.classList.remove("menu-above"),L.style.maxHeight="",L.classList.remove("show"),K(L)),N=[],$=0,B=null,L=null}function ue(e){N.length&&($=($+e+N.length)%N.length,de(),L?.children[$]?.scrollIntoView?.({block:"nearest"}))}function me(){let e=N[$],n=B;H(),e&&n&&n(e.value)}function be(e,n){K(e),e.style.display=n.length?"":"none";for(let f of n){let v=s("div",{class:"term-line"});for(let z of f)z.text&&v.append(je(z,o));e.append(v)}}function ge(e){let n=e.cssPrefix??e.id,f=s("span",{class:"cmd-tab","data-cmd":e.id,role:"tab",tabindex:"0","aria-selected":"false"},[e.icon?s("span",{class:"tab-ic","aria-hidden":"true"},[ke(e.icon,13)]):null,s("span",{class:"tab-label",text:e.label}),s("span",{class:"tab-x",role:"button",tabindex:"0","aria-label":`Close ${e.label} tab`,title:`Close ${e.label}`,text:"\xD7"})]),v=s("div",{class:`term-head ${n}-fixed`,"aria-hidden":"true"}),z=s("div",{class:`term-foot-lines ${n}-close`,"aria-hidden":"true"}),I=s("div",{class:`tm-menu te-menu ${n}-menu`,role:"listbox"}),P=s("div",{class:`te-warn ${n}-warn`,role:"alert"}),Y=e.multiline?s("div",{class:`term-gutter ${n}-gutter`,"aria-hidden":"true"}):null,k={tab:e,prefix:n,chip:f,view:s("div",{class:`term-view ${n}-view`,"data-cmd":e.id}),head:v,foot:z,gutter:Y,menu:I,warn:P,editor:null,completion:null,ghost:"",dirty:!1,commitWarn:"",revision:e.revision?.()??0};k.editor=new Te(r,{multiline:e.multiline===!0,get placeholder(){return e.placeholder??""},ariaLabel:e.ariaLabel??e.label,cssPrefix:n},{onInput:()=>{g&&(j(),E(!1)),re(k,!1),J(k),G(k),M()&&ie(k)},onCaretMove:()=>{J(k),G(k)},onFocus:()=>{t.onFocusChange?.(!0),G(k)},onBlur:()=>{t.onFocusChange?.(!1),j(),E(!1),re(k,!0),G(k),r.setTimeout(()=>H(),120)},onKeyDown:Se=>xe(k,Se)});let ne=Y?s("div",{class:`term-editrow ${n}-ml`},[Y,k.editor.root]):k.editor.root;return k.view.append(v,s("div",{class:"term-edit"},[ne]),I,P,z),k}for(let e of t.tabs){let n=ge(e);h.set(e.id,n),x.insertBefore(n.chip,i.barSpacer),p.append(n.view)}x.insertBefore(w,i.barSpacer);function re(e,n){let f=e.tab.commit(e.editor.value,e.editor.caret,n);e.dirty=f.dirty,e.commitWarn=f.warning??"",G(e)}function ve(e,n){n?(e.warn.textContent="\u26A0 "+n,e.warn.classList.add("show")):(e.warn.classList.remove("show"),e.warn.textContent="")}function G(e){let n=e.editor.value,{segments:f,warning:v}=e.tab.highlight(n);if(ve(e,v||e.commitWarn),e.editor.paint(f,e.editor.isFocused()?e.ghost:""),e.gutter){let z=Math.max(1,n.split(`
`).length);e.gutter.textContent=Array.from({length:z},()=>"...").join(`
`)}}function J(e){if(e.completion=null,e.ghost="",y()||!e.editor.isFocused())return;let n=e.tab.complete(e.editor.value,e.editor.caret);n&&(e.completion=n,e.ghost=n.ghost??"")}function _(e){let n=e.completion;if(!n||!e.ghost||!n.ghostValue)return!1;e.ghost="";let f=n.apply(n.ghostValue);return e.editor.value=f.text,e.editor.setCaret(f.caret),re(e,!1),J(e),G(e),e.editor.focus(),!0}function ie(e){if(y())return H();let n=e.tab.complete(e.editor.value,e.editor.caret);if(e.completion=n,!n)return H();if(n.message)return X(e.menu,n.message);if(!n.items.length)return X(e.menu,"(no matching values)");A(e.menu,n.items,f=>{let v=n.apply(f);e.editor.value=v.text,e.editor.setCaret(v.caret),re(e,!1),J(e),G(e),e.editor.focus()})}function xe(e,n){if(M()){if(n.key==="ArrowDown"){n.preventDefault(),ue(1);return}if(n.key==="ArrowUp"){n.preventDefault(),ue(-1);return}if(n.key==="Enter"||n.key==="Tab"){n.preventDefault(),me();return}if(n.key==="Escape"){n.preventDefault(),H();return}return}let f=e.editor.value,v=e.editor.caret,z=v===f.length||f[v]===`
`;if(n.key==="ArrowDown"&&(!e.tab.multiline||f.slice(v).indexOf(`
`)<0)){n.preventDefault(),ie(e);return}if(n.key==="Tab"){if(ae(n)){E(!1);return}n.preventDefault(),e.ghost?_(e):ie(e);return}if(e.ghost&&(n.key==="ArrowRight"||n.key==="End")&&z){n.preventDefault(),_(e);return}if(n.key==="Escape"){n.preventDefault(),V(),e.ghost="",e.completion=null,G(e);return}n.key==="Enter"&&!e.tab.multiline&&(n.preventDefault(),re(e,!0))}for(let e of h.values())r.listen(e.menu,"mousedown",n=>{let f=n.target.closest(".tm-item");!f||f.classList.contains("tm-empty")||(n.preventDefault(),$=Number(f.dataset.i??"0"),me())});function oe(){for(let[e,n]of h){let f=C.has(e);n.chip.style.display=f?"":"none";let v=u===e;n.chip.classList.toggle("on",v),n.chip.setAttribute("aria-selected",v?"true":"false"),n.view.style.display=v?"":"none"}w.style.display=C.size<h.size?"":"none"}function F(e){if(!C.has(e))return;u=e,oe(),H();let n=h.get(e);n&&(fe(n),y()||n.editor.focus()),t.onTabChange?.(e)}function Z(e){if(C.delete(e),C.size===0){for(let n of h.keys())C.add(n);u=t.tabs[0].id,oe(),i.hide();return}u===e&&(u=[...C][0]),oe()}for(let[e,n]of h)r.listen(n.chip,"click",f=>{if(f.target.closest(".tab-x")){Z(e);return}F(e)}),r.listen(n.chip,"keydown",f=>{let v=f.key;v!=="Enter"&&v!==" "||(f.preventDefault(),f.target.closest(".tab-x")?Z(e):F(e))});r.listen(w,"click",()=>{let e=t.tabs.find(n=>!C.has(n.id));e&&(C.add(e.id),F(e.id))});function se(){let e=y();m.classList.toggle("fallback",e);for(let n of h.values())n.editor.setMode(e?"plain":"rich")}function fe(e){e.editor.setPrefix(e.tab.prefix()),be(e.head,e.tab.headerLines?.()??[]),be(e.foot,e.tab.footerLines?.()??[]);let n=e.tab.revision?.()??0;if(n!==e.revision){e.revision=n;let f=e.editor.isFocused(),v=f||e.dirty?e.tab.retain?.(e.editor.value)??"":"",z=e.tab.multiline?`
`:" ";e.editor.value=[e.tab.text(),v].filter(Boolean).join(z),f&&e.editor.setCaret(e.editor.value.length),e.dirty=v!==""}else!e.editor.isFocused()&&!e.dirty&&(e.editor.value=e.tab.text());G(e)}function U(){se();for(let e of h.values())fe(e);i.fitBar()}return i.applyTooltips(),oe(),U(),{el:m,render:U,toggle(e){i.toggle(e)},isShown:()=>i.isShown(),focusEditor(){h.get(u)?.editor.focus()},activeTab:()=>u,setActiveTab:e=>F(e),destroy(){H(),r.flush(),i.destroy()}}}function bt(l,t,r){let i=Math.max(1,Math.floor(r)),o=[""],m=-1,x=-1,p=0,R=u=>{let g=o[o.length-1];for(let y of u)g.length>=i&&(o[o.length-1]=g,o.push(""),g=""),g+=y;o[o.length-1]=g},w=()=>o[o.length-1].length,T=()=>{o.push("")},h=(u,g)=>{let y=(g?1:0)+u.length;w()>0&&w()+y>i&&u.length<=i?T():g&&w()>0&&R(" "),R(u)};return l.forEach((u,g)=>h(u,g>0)),p=o.length,t.length===0?{lines:o,prefixLines:p,commandLine:o.length-1,commandColumn:w()+(l.length?1:0)}:(t.split(" ").forEach((u,g)=>{let y=g>0||l.length>0,E=o.length-1,V=w();if(h(u,y),g===0){let j=o.length-1!==E;m=j?o.length-1:E,x=j?0:V+(y&&V>0?1:0),j&&(x=0)}}),{lines:o,prefixLines:p,commandLine:m,commandColumn:x})}export{Ue as a,Ce as b,pe as c,Oe as d,ut as e,bt as f};
