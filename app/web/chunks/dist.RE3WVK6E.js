import"./chunk.WXDLP45E.js";var Rt=`<svg viewBox="0 0 448 512" width="10" height="10" style="vertical-align:middle;">
  <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667
    c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335
    24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941
    L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" fill="currentColor"/>
</svg>`,Ft=`<svg viewBox="0 0 256 512" width="6" height="10" style="vertical-align:middle;">
  <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6
    0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4
    24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" fill="currentColor"/>
</svg>`,lt={aggregate:"auto",join:null,compat:null,data_vars:null,coords:null,dim:"",group_by:"",reload:!1,access_pattern:"map",chunk_size:16,map_primary_chunksize:1,timeout:120};function tt(e){return String(e??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var $t=class extends HTMLElement{constructor(){super(...arguments),this._config={...lt},this._showAdvanced=!1,this._handleChange=t=>{let i=t.target,r=i.dataset.field;if(!r)return;let n;if(i.type==="checkbox")n=i.checked;else if(i.type==="number"){let a=parseFloat(i.value);n=Number.isFinite(a)?a:parseInt(i.value,10)}else n=i.value===""?null:i.value;this._config={...this._config,[r]:n},this._emitChange(),this._updateConditionals()},this._handleClick=t=>{if(t.target.closest("#nc-advanced-toggle")){this._showAdvanced=!this._showAdvanced;let i=this.querySelector(".nc-advanced"),r=this.querySelector(".nc-chevron");i&&(i.style.display=this._showAdvanced?"block":"none"),r&&(r.innerHTML=this._showAdvanced?Rt:Ft)}}}connectedCallback(){try{let t=JSON.parse(this.getAttribute("initial-config")??"{}");this._config={...lt,...t}}catch{this._config={...lt}}this._render(),this.addEventListener("change",this._handleChange),this.addEventListener("click",this._handleClick)}get config(){return{...this._config}}set config(t){if(this._config={...lt,...t??{}},!this.isConnected)return;this._render();let i=this._config;this.querySelectorAll("[data-field]").forEach(r=>{let n=i[r.dataset.field??""];r instanceof HTMLInputElement&&r.type==="checkbox"?r.checked=!!n:r.value=n==null?"":String(n)})}disconnectedCallback(){this.removeEventListener("change",this._handleChange),this.removeEventListener("click",this._handleClick)}_emitChange(){this.dispatchEvent(new CustomEvent("config-change",{bubbles:!0,composed:!0,detail:this._config}))}_updateConditionals(){let t=this.querySelector(".nc-dim-field"),i=this.querySelector(".nc-map-chunksize");t&&(t.style.display=this._config.aggregate==="concat"?"block":"none"),i&&(i.style.display=this._config.access_pattern==="map"?"block":"none")}_render(){let t=this._config;this.innerHTML=`
      <div class="aggregation-config">

        <!-- Aggregation Method -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Aggregation Method</label>
          <select class="form-select form-select-sm" data-field="aggregate">
            <option value="auto"   ${t.aggregate==="auto"?"selected":""}>Auto (Detect automatically)</option>
            <option value="merge"  ${t.aggregate==="merge"?"selected":""}>Merge (Combine variables)</option>
            <option value="concat" ${t.aggregate==="concat"?"selected":""}>Concat (Join along dimension)</option>
          </select>
          <div class="form-text text-muted">Auto mode will automatically detect the best aggregation method</div>
        </div>

        <!-- Timeout -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Timeout (seconds)</label>
          <input type="number" class="form-control form-control-sm"
            data-field="timeout" min="10" max="3600" value="${tt(t.timeout??120)}">
          <div class="form-text text-muted">
            Max wait time for the aggregation to complete (default: 120 s). Increase for large datasets.
          </div>
        </div>

        <!-- Advanced Toggle -->
        <button type="button" id="nc-advanced-toggle"
          class="btn btn-link btn-sm p-0 mb-3 text-decoration-none">
          <span class="nc-chevron">${this._showAdvanced?Rt:Ft}</span>
          <span class="ms-2">Advanced Options</span>
        </button>

        <!-- Advanced Options -->
        <div class="nc-advanced" style="display:${this._showAdvanced?"block":"none"};">

          <!-- Dimension (concat only) -->
          <div class="mb-3 nc-dim-field" style="display:${t.aggregate==="concat"?"block":"none"};">
            <label class="form-label">Dimension to Concatenate Along</label>
            <input type="text" class="form-control form-control-sm"
              data-field="dim" placeholder="e.g., time, ensemble" value="${tt(t.dim)}">
            <div class="form-text text-muted">Leave empty to create a new dimension</div>
          </div>

          <!-- Join Mode -->
          <div class="mb-3">
            <label class="form-label">Join Mode</label>
            <select class="form-select form-select-sm" data-field="join">
              <option value=""      ${t.join?"":"selected"}>Default</option>
              <option value="outer" ${t.join==="outer"?"selected":""}>Outer (Union)</option>
              <option value="inner" ${t.join==="inner"?"selected":""}>Inner (Intersection)</option>
              <option value="left"  ${t.join==="left"?"selected":""}>Left</option>
              <option value="right" ${t.join==="right"?"selected":""}>Right</option>
              <option value="exact" ${t.join==="exact"?"selected":""}>Exact (Must match)</option>
            </select>
          </div>

          <!-- Compatibility Mode -->
          <div class="mb-3">
            <label class="form-label">Compatibility Mode</label>
            <select class="form-select form-select-sm" data-field="compat">
              <option value=""              ${t.compat?"":"selected"}>Default</option>
              <option value="no_conflicts"  ${t.compat==="no_conflicts"?"selected":""}>No Conflicts</option>
              <option value="equals"        ${t.compat==="equals"?"selected":""}>Equals</option>
              <option value="override"      ${t.compat==="override"?"selected":""}>Override</option>
            </select>
          </div>

          <!-- Data Variables -->
          <div class="mb-3">
            <label class="form-label">Data Variables Handling</label>
            <select class="form-select form-select-sm" data-field="data_vars">
              <option value=""          ${t.data_vars?"":"selected"}>Default</option>
              <option value="minimal"   ${t.data_vars==="minimal"?"selected":""}>Minimal</option>
              <option value="different" ${t.data_vars==="different"?"selected":""}>Different</option>
              <option value="all"       ${t.data_vars==="all"?"selected":""}>All</option>
            </select>
          </div>

          <!-- Coordinates -->
          <div class="mb-3">
            <label class="form-label">Coordinates Handling</label>
            <select class="form-select form-select-sm" data-field="coords">
              <option value=""          ${t.coords?"":"selected"}>Default</option>
              <option value="minimal"   ${t.coords==="minimal"?"selected":""}>Minimal</option>
              <option value="different" ${t.coords==="different"?"selected":""}>Different</option>
              <option value="all"       ${t.coords==="all"?"selected":""}>All</option>
            </select>
          </div>

          <!-- Group By -->
          <div class="mb-3">
            <label class="form-label">Group By (Optional)</label>
            <input type="text" class="form-control form-control-sm"
              data-field="group_by" placeholder="e.g., ensemble, variable" value="${tt(t.group_by)}">
            <div class="form-text text-muted">Group files by a specific attribute</div>
          </div>

          <!-- Reload Cache -->
          <div class="mb-3">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="aggregation-reload"
                data-field="reload" ${t.reload?"checked":""}>
              <label class="form-check-label" for="aggregation-reload">Force Reload (bypass cache)</label>
            </div>
            <div class="form-text text-muted">
              Force server to fetch fresh data instead of using cached version
            </div>
          </div>

          <!-- Access Pattern -->
          <div class="mb-3">
            <label class="form-label">Access Pattern Optimization</label>
            <select class="form-select form-select-sm" data-field="access_pattern">
              <option value="map"         ${t.access_pattern==="map"?"selected":""}>Map (spatial slices)</option>
              <option value="time_series" ${t.access_pattern==="time_series"?"selected":""}>Time Series (temporal slices)</option>
            </select>
            <div class="form-text text-muted">Optimize chunk layout for your typical data access pattern</div>
          </div>

          <!-- Chunk Size -->
          <div class="mb-3">
            <label class="form-label">Target Chunk Size (MB)</label>
            <input type="number" class="form-control form-control-sm"
              data-field="chunk_size" step="0.1" min="1" max="1000" value="${tt(t.chunk_size??16)}">
            <div class="form-text text-muted">Target size for data chunks (default: 16 MB)</div>
          </div>

          <!-- Map Primary Chunksize (map pattern only) -->
          <div class="mb-3 nc-map-chunksize" style="display:${t.access_pattern==="map"?"block":"none"};">
            <label class="form-label">Primary Dimension Chunk Size</label>
            <input type="number" class="form-control form-control-sm"
              data-field="map_primary_chunksize" min="1" value="${tt(t.map_primary_chunksize??1)}">
            <div class="form-text text-muted">Number of time steps per chunk (for map access pattern)</div>
          </div>

        </div>
      </div>`}},P={ERROR:"error",READY:"ready",LOADING:"loading"},Ht={aggregate:"auto",join:null,compat:null,data_vars:null,coords:null,dim:"",group_by:"",reload:!1,access_pattern:"map",chunk_size:16,map_primary_chunksize:1,timeout:120},Se="https://gridlook.pages.dev/";function bt(e){return`${Se}#${e}`}function Te(e){var t;let i=navigator;return(t=i.clipboard)!=null&&t.writeText?i.clipboard.writeText(e):new Promise((r,n)=>{try{let a=document.createElement("textarea");a.value=e,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.focus(),a.select(),document.execCommand("copy"),document.body.removeChild(a),r()}catch(a){n(a instanceof Error?a:new Error(String(a)))}})}function I(e,t=!1){return`<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" style="vertical-align:-0.14em;flex-shrink:0${t?";margin-right:.5em":""}">${e}</svg>`}var T={info:'<circle cx="12" cy="12" r="9"/><path d="M12 11.5v5"/><circle cx="12" cy="7.8" r="0.6" fill="currentColor" stroke="none"/>',layers:'<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="m3 13 9 5 9-5"/>',load:'<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 4v4h-4"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',ban:'<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',link:'<path d="M9.5 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 1 0-5.7-5.7l-1 1"/><path d="M14.5 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 1 0 5.7 5.7l1-1"/>',copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',check:'<path d="M20 6 9 17l-5-5"/>',database:'<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',cube:'<path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3Z"/><path d="m3 7.5 9 4.5 9-4.5"/><path d="M12 12v9"/>',external:'<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"/>',refresh:'<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 4v4h-4"/>',compress:'<path d="M9 5v4H5"/><path d="m4 4 5 5"/><path d="M15 5v4h4"/><path d="m20 4-5 5"/><path d="M9 19v-4H5"/><path d="m4 20 5-5"/><path d="M15 19v-4h4"/><path d="m20 20-5-5"/>',alert:'<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5"/><circle cx="12" cy="16.3" r="0.6" fill="currentColor" stroke="none"/>'},Pt=`
data-inspector{
  --_di-bg:var(--di-bg,#fff);
  --_di-fg:var(--di-fg,#1f2937);
  --_di-muted:var(--di-muted,#6b7280);
  --_di-border:var(--di-border,#e5e7eb);
  --_di-surface:var(--di-surface,#f3f4f6);
  --_di-accent:var(--di-accent,#3b82f6);
}
@media (prefers-color-scheme:dark){
  data-inspector{
    --_di-bg:var(--di-bg,#1e293b);
    --_di-fg:var(--di-fg,#e5e7eb);
    --_di-muted:var(--di-muted,#94a3b8);
    --_di-border:var(--di-border,#475569);
    --_di-surface:var(--di-surface,#334155);
    --_di-accent:var(--di-accent,#3b82f6);
  }
}
.di-backdrop{position:fixed;inset:0;z-index:1050;display:flex;align-items:center;justify-content:center;padding:12px;background:rgba(15,23,42,.55);}
.di-modal{display:flex;flex-direction:column;width:min(1100px,96vw);max-height:95vh;overflow:hidden;background:var(--_di-bg);color:var(--_di-fg);border-radius:12px;box-shadow:0 20px 50px rgba(0,0,0,.25);font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:14px;line-height:1.5;}
.di-header{flex-shrink:0;border-bottom:1px solid var(--_di-border);padding:16px 16px 12px;}
.di-header-row{position:relative;}
.di-header-main{min-width:0;}
.di-title{margin:0 0 12px;padding-right:40px;font-size:clamp(16px,4vw,20px);font-weight:600;display:flex;align-items:center;gap:8px;}
.di-title-ico{color:var(--_di-accent);display:inline-flex;align-items:center;font-size:16px;}
.di-close{position:absolute;top:-4px;right:-4px;width:32px;height:32px;font-size:28px;line-height:1;background:transparent;border:none;border-radius:6px;color:var(--_di-muted);cursor:pointer;}
.di-close:hover{background:var(--_di-surface);color:var(--_di-fg);}
.di-muted{color:var(--_di-muted);}
.di-center{text-align:center;padding:24px 12px;}
.di-file-list{margin-bottom:12px;padding:10px;background:var(--_di-surface);border-radius:6px;max-height:120px;overflow-y:auto;}
.di-file-list-label{font-size:12px;color:var(--_di-muted);margin-bottom:6px;font-weight:500;}
.di-file-list ul{font-size:11px;margin:0;padding-left:20px;}
.di-file-list li{color:var(--_di-fg);word-break:break-all;}
.di-pathbar{margin-bottom:8px;}
.di-pathbar-label{display:block;font-size:12px;color:var(--_di-muted);margin-bottom:4px;font-weight:500;}
.di-pathbar-row{display:flex;gap:6px;flex-wrap:wrap;}
.di-input{flex:1 1 200px;min-width:0;font-size:13px;padding:6px 10px;border:1px solid var(--_di-border);border-radius:6px;color:var(--_di-fg);background:var(--_di-bg);}
.di-input:focus{outline:2px solid var(--_di-accent);outline-offset:0;border-color:var(--_di-accent);}
.di-dropdown-wrap{position:relative;flex-shrink:0;display:inline-flex;}
.di-btn{display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:500;border-radius:6px;border:1px solid transparent;padding:6px 12px;cursor:pointer;white-space:nowrap;background:var(--_di-bg);color:var(--_di-fg);}
.di-btn:disabled{opacity:.5;cursor:not-allowed;}
.di-btn-primary{background:var(--_di-accent);border-color:var(--_di-accent);color:#fff;}
.di-btn-primary:hover:not(:disabled){filter:brightness(.93);}
.di-btn-secondary{background:var(--_di-surface);border-color:var(--_di-surface);color:var(--_di-fg);}
.di-btn-outline{background:var(--_di-bg);border-color:var(--_di-border);color:var(--_di-fg);}
.di-btn-split{padding:6px 9px;border-top-left-radius:0;border-bottom-left-radius:0;border-left-color:rgba(255,255,255,.4);}
.di-btn-group{display:inline-flex;}
.di-btn-group>.di-btn:first-child{border-top-right-radius:0;border-bottom-right-radius:0;}
.di-menu{position:absolute;top:100%;right:0;z-index:1060;min-width:210px;margin-top:2px;padding:6px 0;background:var(--_di-bg);border:1px solid var(--_di-border);border-radius:8px;box-shadow:0 10px 25px rgba(0,0,0,.12);list-style:none;}
.di-menu-item{display:flex;align-items:center;width:100%;padding:8px 14px;font-size:13px;background:none;border:none;color:var(--_di-fg);cursor:pointer;text-align:left;}
.di-menu-item:hover{background:var(--_di-surface);}
.di-zarr-row{display:flex;align-items:center;flex-wrap:wrap;gap:6px;padding:8px 10px;background:var(--_di-surface);border-radius:6px;font-size:11px;margin-bottom:8px;}
.di-zarr-inner{display:flex;align-items:center;gap:6px;flex:1 1 100%;min-width:0;}
.di-code{flex:1;min-width:0;background:var(--_di-bg);padding:4px 8px;border-radius:4px;font-size:10px;color:var(--_di-fg);border:1px solid var(--_di-border);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;}
.di-tabs{display:flex;gap:2px;border-bottom:2px solid var(--_di-border);}
.di-tab{padding:12px 16px;font-size:14px;font-weight:500;background:transparent;border:none;border-bottom:3px solid transparent;color:var(--_di-muted);cursor:pointer;transition:all .15s ease;display:inline-flex;align-items:center;}
.di-tab:disabled{opacity:.5;cursor:not-allowed;}
.di-tab-active{font-weight:600;background:var(--_di-surface);border-bottom-color:var(--_di-accent);color:var(--_di-fg);}
.di-body{flex:1;overflow-y:auto;overflow-x:hidden;padding:16px 12px;max-height:calc(95vh - 200px);}
.di-error{border-radius:8px;background:#fee2e2;border:1px solid #fecaca;color:#991b1b;font-size:13px;padding:12px;margin-bottom:16px;}
.di-error-row{display:flex;align-items:flex-start;gap:10px;}
.di-error-ico{font-size:18px;margin-top:1px;flex-shrink:0;}
.di-error-body{flex:1;min-width:0;}
.di-error-title{display:block;margin-bottom:6px;}
.di-error-msg{word-wrap:break-word;overflow-wrap:anywhere;white-space:pre-wrap;}
.di-btn-danger{background:#dc2626;border-color:#dc2626;color:#fff;font-size:12px;padding:6px 12px;margin-top:8px;}
.di-error-actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center;}
.di-error-actions .di-btn-primary{font-size:12px;padding:6px 12px;margin-top:8px;}
.di-metadata{display:flex;justify-content:flex-start;width:100%;overflow-x:auto;}
.di-metadata>*{width:100%;min-width:0;}
.di-metadata dd,.di-metadata .xr-attrs td,.di-metadata .xr-var-attrs td{overflow-wrap:anywhere;word-break:break-word;}
.di-gridlook-bar{display:flex;align-items:center;flex-wrap:wrap;gap:8px;padding:12px;background:var(--_di-surface);border-radius:8px;font-size:12px;margin-bottom:16px;border:1px solid var(--_di-border);}
.di-gridlook-inner{display:flex;align-items:center;gap:6px;flex:1 1 100%;min-width:0;}
.di-gridlook-ico{color:var(--_di-accent);flex-shrink:0;display:inline-flex;}
.di-gridlook-label{color:var(--_di-accent);font-weight:600;flex-shrink:0;}
.di-gridlook-code{flex:1;min-width:0;background:var(--_di-bg);padding:6px 10px;border-radius:4px;font-size:11px;color:var(--_di-fg);border:1px solid var(--_di-border);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;}
.di-gridlook-btn{background:var(--_di-bg);border:1px solid var(--_di-accent);color:var(--_di-accent);font-size:12px;padding:6px 12px;flex-shrink:0;}
.di-gridlook-btn-primary{background:var(--_di-accent);border-color:var(--_di-accent);color:#fff;}
.di-gridlook-frame{width:100%;height:calc(95vh - 280px);min-height:500px;background:var(--_di-surface);border-radius:8px;overflow:hidden;border:1px solid var(--_di-border);}
.di-gridlook-frame iframe{width:100%;height:100%;border:none;display:block;}
.di-agg-form{padding:16px;overflow-y:auto;}
data-inspector[embedded]{display:block;height:100%;}
.di-embedded{display:flex;flex-direction:column;height:100%;min-height:0;overflow:hidden;background:var(--_di-bg);color:var(--_di-fg);font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:14px;line-height:1.5;}
.di-embedded>#nc-tabs-wrap{display:flex;flex-direction:column;flex:1;min-height:0;}
.di-embedded>#nc-tabs-wrap[hidden]{display:none;}
.di-embedded .di-zarr-row{margin:8px 12px 0;}
.di-embedded .di-tabs{padding:0 8px;}
.di-embedded .di-tab{padding:8px 14px;font-size:13px;}
.di-embedded .di-body{flex:1;min-height:0;max-height:none;padding:12px;}
.di-embedded #nc-gridlook:not([hidden]){display:flex;flex-direction:column;height:100%;}
.di-embedded .di-gridlook-bar{padding:0;margin:0 0 8px;background:none;border:0;}
.di-embedded .di-gridlook-inner{justify-content:flex-end;}
.di-embedded .di-gridlook-ico,.di-embedded .di-gridlook-label,.di-embedded .di-gridlook-code{display:none;}
.di-embedded .di-gridlook-frame{flex:1;height:auto;min-height:320px;}
.di-agg-form h5{margin:0 0 12px;font-size:calc(1.05 * var(--wp-rem, 1rem));font-weight:600;}
.di-agg-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:12px;}
.di-empty-ico{font-size:40px;color:var(--_di-border);margin-bottom:12px;display:block;}
.di-empty-text{color:var(--_di-muted);font-size:13px;padding:0 12px;}
[hidden]{display:none!important;}
`,Vt=!1;function Ie(){if(Vt||typeof document>"u")return;Vt=!0;try{if(typeof CSSStyleSheet=="function"&&Array.isArray(document.adoptedStyleSheets)){let t=new CSSStyleSheet;t.replaceSync(Pt),document.adoptedStyleSheets=[...document.adoptedStyleSheets,t];return}}catch{}let e=document.createElement("style");e.setAttribute("data-data-inspector","1"),e.textContent=Pt,document.head.appendChild(e)}var zt=class extends HTMLElement{constructor(){super(...arguments),this._pathInput="",this._loadOptions=null,this._copied=!1,this._gridlookCopied=!1,this._activeTab="metadata",this._dropdownOpen=!1,this._aggregationConfig={...Ht},this._output=null,this._built=!1,this._builtMode=!1,this._domOutput=void 0,this._domIframeUrl=void 0,this._domFileKey=void 0,this._copyTimer=null,this._gridlookTimer=null,this._restoreFocusTo=null,this._onOutsideClick=t=>{let i=this.querySelector("#nc-dropdown-wrap");i&&!i.contains(t.target)&&this._dropdownOpen&&(this._dropdownOpen=!1,this._syncDropdown())}}static get observedAttributes(){return["open","file","status","error","zarr-url","zarr-status-code","is-aggregation","error-action","viewer-disabled","viewer-off","embedded","view"]}get embedded(){return this.hasAttribute("embedded")}set embedded(t){t?this.setAttribute("embedded",""):this.removeAttribute("embedded")}get view(){return this.getAttribute("view")==="viewer"?"viewer":"metadata"}set view(t){this.setAttribute("view",t)}get activeView(){return this._activeTab==="gridlook"&&this._viewerAvailable()?"viewer":"metadata"}_viewerAvailable(){return this.open&&this.status===P.READY&&this._output!=null&&this._output!==""&&!!this.zarrUrl&&this._viewerBlocked()===null}_viewerBlocked(){return this.hasAttribute("viewer-off")?this.getAttribute("viewer-off")||"The 3D viewer is not available here.":this.getAttribute("viewer-disabled")}_requestedTab(){return this.view==="viewer"?"gridlook":"metadata"}get open(){return this.hasAttribute("open")}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}get file(){let t=this.getAttribute("file");if(!t)return null;try{return JSON.parse(t)}catch{return t}}set file(t){t===null?this.removeAttribute("file"):this.setAttribute("file",Array.isArray(t)?JSON.stringify(t):t)}get status(){return this.getAttribute("status")??P.READY}set status(t){this.setAttribute("status",t)}get output(){return this._output}set output(t){this._output=t,this.isConnected&&this._render()}get error(){return this.getAttribute("error")}set error(t){t===null?this.removeAttribute("error"):this.setAttribute("error",t)}get zarrUrl(){return this.getAttribute("zarr-url")}set zarrUrl(t){t===null?this.removeAttribute("zarr-url"):this.setAttribute("zarr-url",t)}get zarrStatusCode(){let t=this.getAttribute("zarr-status-code");return t===null?null:parseInt(t,10)}set zarrStatusCode(t){t===null?this.removeAttribute("zarr-status-code"):this.setAttribute("zarr-status-code",String(t))}get loadOptions(){return this._loadOptions?{...this._loadOptions}:null}set loadOptions(t){this._loadOptions=t&&Object.keys(t).length?{...t}:null}get aggregationConfig(){return{...this._aggregationConfig}}set aggregationConfig(t){let i=t?{...t}:{...Ht};if(JSON.stringify(i)===JSON.stringify(this._aggregationConfig))return;this._aggregationConfig=i;let r=this._q("#nc-agg-config");r&&(r.setAttribute("initial-config",JSON.stringify(i)),"config"in r&&(r.config=i))}get isAggregation(){return this.hasAttribute("is-aggregation")}set isAggregation(t){t?this.setAttribute("is-aggregation",""):this.removeAttribute("is-aggregation")}connectedCallback(){let t=this.file;t&&!Array.isArray(t)&&(this._pathInput=t),this.open&&(this._restoreFocusTo=document.activeElement),this._render(),document.addEventListener("mousedown",this._onOutsideClick)}disconnectedCallback(){document.removeEventListener("mousedown",this._onOutsideClick),this._clearTimers()}attributeChangedCallback(t,i,r){var n,a;if(t==="open"&&r!==null){this._restoreFocusTo===null&&(this._restoreFocusTo=document.activeElement),this._activeTab=this._requestedTab(),this._copied=!1,this._gridlookCopied=!1;let o=this.file;o&&this._output===null&&this.status===P.READY&&!this.isAggregation&&this._emit("inspector-submit",{file:o,aggregationConfig:null})}if(t==="file"){if(r&&!r.startsWith("[")){this._pathInput=r;let o=this._q("#nc-path-input");o&&o.value!==r&&(o.value=r)}i!==null&&i!==r&&(this._loadOptions=null,this._output=null,this._domOutput=void 0,this._activeTab=this._requestedTab(),this._copied=!1,this._gridlookCopied=!1,this.hasAttribute("error")&&this.removeAttribute("error"),this.hasAttribute("zarr-url")&&this.removeAttribute("zarr-url"))}if(t==="view"&&(this._activeTab=this._requestedTab()),t==="embedded"&&this._built&&(this._built=!1),t==="status"&&r===P.ERROR&&(this._activeTab="metadata"),t==="zarr-status-code"&&this.isConnected&&this._built){let o=r??"3";(n=this.querySelector("#nc-pre-steps"))==null||n.setAttribute("status-code",o),(a=this.querySelector("#nc-body-steps"))==null||a.setAttribute("status-code",o);return}this.isConnected&&this._render()}_emit(t,i){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:i}))}_clearTimers(){this._copyTimer!==null&&(clearTimeout(this._copyTimer),this._copyTimer=null),this._gridlookTimer!==null&&(clearTimeout(this._gridlookTimer),this._gridlookTimer=null)}_handleInspect(){this.isAggregation?this._emit("inspector-submit",{file:this.file,aggregationConfig:{...this._aggregationConfig}}):this._pathInput.trim()&&this._emit("inspector-submit",{file:this._pathInput.trim(),aggregationConfig:null})}_handleRetry(){let t=this._pathInput.trim();if(this.isAggregation||!t){this._handleInspect();return}let i=t===this.getAttribute("file");this._emit("inspector-submit",{file:t,aggregationConfig:i&&this._loadOptions?{...this._loadOptions}:null})}_handleInspectReload(){this._dropdownOpen=!1,this._syncDropdown(),this._pathInput.trim()&&this._emit("inspector-submit",{file:this._pathInput.trim(),aggregationConfig:{reload:!0}})}_copy(t,i){Te(t).then(()=>{i==="zarr"?this._copied=!0:this._gridlookCopied=!0,this.open&&this._update();let r=setTimeout(()=>{i==="zarr"?this._copied=!1:this._gridlookCopied=!1,this.isConnected&&this.open&&this._update()},2e3);i==="zarr"?this._copyTimer=r:this._gridlookTimer=r}).catch(()=>{})}_render(){if(!this.open){this._teardown();return}(!this._built||this._builtMode!==this.isAggregation)&&(this._domOutput=void 0,this._domIframeUrl=void 0,this._build()),this._update()}_teardown(){this._clearTimers(),this.innerHTML="",this._built=!1,this._domOutput=void 0,this._domIframeUrl=void 0,this._domFileKey=void 0;let t=this._restoreFocusTo;this._restoreFocusTo=null,t&&t.isConnected&&typeof t.focus=="function"&&t.focus()}_q(t){return this.querySelector(t)}_toggle(t,i){t&&(t.hidden=!i)}_setCopyBtn(t,i,r){let n=this._q(t);n&&(n.setAttribute("title",i?"Copied!":r),n.innerHTML=I(i?T.check:T.copy))}_build(){Ie();let t=this.isAggregation;this._builtMode=t,this._domOutput=void 0,this._domIframeUrl=void 0,this._domFileKey=void 0;let i=`
      <div class="di-header">
        <div class="di-header-row">
          <div class="di-header-main">
            <h1 class="di-title">
              <span class="di-title-ico">${I(t?T.layers:T.info)}</span>
              <span id="nc-title">${t?"Aggregate Files":"File Inspector"}</span>
            </h1>
            ${t?`<div id="nc-file-list-wrap" class="di-file-list" hidden>
                     <div id="nc-file-list-label" class="di-file-list-label"></div>
                     <ul id="nc-file-list"></ul>
                   </div>`:this._pathBarHtml()}
            <div id="nc-zarr-row" class="di-zarr-row" hidden>
              <div class="di-zarr-inner">
                <span class="di-muted" style="display:inline-flex;flex-shrink:0">${I(T.link)}</span>
                <span class="di-muted" style="font-weight:500;flex-shrink:0">Zarr:</span>
                <code id="nc-zarr-url" class="di-code"></code>
                <button id="nc-copy-zarr" class="di-btn di-btn-outline" title="Copy Zarr URL">${I(T.copy)}</button>
              </div>
            </div>
          </div>
          <button id="nc-close-btn" class="di-close" aria-label="Close">&times;</button>
        </div>
      </div>`,r=t?`<div id="nc-agg-form" class="di-agg-form" hidden>
           <h5>Aggregation Configuration</h5>
           <aggregation-config id="nc-agg-config"></aggregation-config>
           <div class="di-agg-actions">
             <button id="nc-cancel-btn" class="di-btn di-btn-secondary">Cancel</button>
             <button id="nc-aggregate-btn" class="di-btn di-btn-primary">${I(T.compress,!0)}Aggregate Files</button>
           </div>
         </div>`:"",n=`
      <div id="nc-pre-loading" class="di-center" hidden>
        <zarr-loading-steps id="nc-pre-steps" status-code="3"${t?" is-aggregation":""}></zarr-loading-steps>
        <p id="nc-pre-loading-text" class="di-muted" style="margin-top:12px;font-size:13px;"></p>
      </div>`,a=`
      <div id="nc-tabs-wrap" hidden>
        <div class="di-tabs" role="tablist" aria-label="Inspector views">
          <button id="nc-tab-metadata" data-tab="metadata" class="nc-tab-btn di-tab" role="tab" aria-controls="nc-metadata" aria-selected="true">${I(T.database,!0)}Metadata</button>
          <button id="nc-tab-gridlook" data-tab="gridlook" class="nc-tab-btn di-tab" role="tab" aria-controls="nc-gridlook" aria-selected="false">${I(T.cube,!0)}3D Viewer</button>
        </div>
        <div id="nc-body" class="di-body">
          <div id="nc-error" class="di-error" hidden>
            <div class="di-error-row">
              <span class="di-error-ico">${I(T.alert)}</span>
              <div class="di-error-body">
                <strong class="di-error-title">Error loading metadata</strong>
                <div id="nc-error-msg" class="di-error-msg"></div>
                <div class="di-error-actions">
                  <button id="nc-retry-btn" class="di-btn di-btn-danger">${I(T.refresh,!0)}Retry</button>
                  <button id="nc-error-action" class="di-btn di-btn-primary" hidden></button>
                </div>
              </div>
            </div>
          </div>

          <div id="nc-loading" class="di-center" hidden>
            <zarr-loading-steps id="nc-body-steps" status-code="3"${t?" is-aggregation":""}></zarr-loading-steps>
            <p id="nc-loading-text" class="di-muted" style="margin-top:12px;font-size:13px;"></p>
          </div>

          <div id="nc-metadata" class="di-metadata" role="tabpanel" aria-labelledby="nc-tab-metadata" tabindex="0" hidden>
            <div id="nc-metadata-inner"></div>
          </div>

          <div id="nc-gridlook" role="tabpanel" aria-labelledby="nc-tab-gridlook" tabindex="0" hidden>
            <div class="di-gridlook-bar">
              <div class="di-gridlook-inner">
                <span class="di-gridlook-ico">${I(T.external)}</span>
                <span class="di-gridlook-label">GridLook URL:</span>
                <code id="nc-gridlook-url" class="di-gridlook-code"></code>
                <button id="nc-copy-gridlook" class="di-btn di-gridlook-btn" title="Copy link">${I(T.copy)}</button>
                <button id="nc-refresh-gridlook" class="di-btn di-gridlook-btn" title="Refresh GridLook viewer">${I(T.refresh)}</button>
                <button id="nc-open-gridlook" class="di-btn di-gridlook-btn-primary" title="Open in new tab">${I(T.external,!0)}Open in New Tab</button>
              </div>
            </div>
            <div id="nc-gridlook-frame" class="di-gridlook-frame"></div>
          </div>

          <div id="nc-empty-body" class="di-center" hidden>
            <span class="di-empty-ico">${I(T.database)}</span>
            <p id="nc-empty-body-text" class="di-empty-text"></p>
          </div>
        </div>
      </div>`,o=`
      <div id="nc-empty-main" class="di-center" hidden>
        <span class="di-empty-ico">${I(T.database)}</span>
        <p id="nc-empty-main-text" class="di-empty-text"></p>
      </div>`;this.innerHTML=this.embedded?`
      <div class="di-embedded">
        <div id="nc-zarr-row" class="di-zarr-row" hidden>
          <div class="di-zarr-inner">
            <span class="di-muted" style="display:inline-flex;flex-shrink:0">${I(T.link)}</span>
            <span class="di-muted" style="font-weight:500;flex-shrink:0">Zarr:</span>
            <code id="nc-zarr-url" class="di-code"></code>
            <button id="nc-copy-zarr" class="di-btn di-btn-outline" title="Copy Zarr URL">${I(T.copy)}</button>
          </div>
        </div>
        ${r}
        ${n}
        ${a}
        ${o}
      </div>`:`
      <div id="nc-backdrop" class="di-backdrop">
        <div class="di-modal" role="dialog" aria-modal="true" aria-labelledby="nc-title" tabindex="-1">
          ${i}
          ${r}
          ${n}
          ${a}
          ${o}
        </div>
      </div>`;let s=this._q("#nc-agg-config");s&&(s.setAttribute("initial-config",JSON.stringify(this._aggregationConfig)),"config"in s&&(s.config=this._aggregationConfig)),this._built=!0,this._attach(),this.embedded||this._initialFocus()}_ensureIframe(){let t=this._q("#nc-gridlook-iframe");if(t)return t;let i=this._q("#nc-gridlook-frame");if(!i)return null;let r=document.createElement("iframe");r.id="nc-gridlook-iframe",r.title="GridLook 3D Viewer",r.setAttribute("sandbox","allow-scripts allow-same-origin allow-popups allow-downloads"),r.setAttribute("referrerpolicy","no-referrer"),r.setAttribute("loading","lazy");try{i.appendChild(r)}catch{}return r}_setIframeSrc(t,i){try{t.src=i}catch{}}_pathBarHtml(){return`
      <div class="di-pathbar">
        <label class="di-pathbar-label" for="nc-path-input">File path:</label>
        <div class="di-pathbar-row">
          <input id="nc-path-input" type="text" class="di-input" placeholder="/path/to/data.nc" />
          <div id="nc-dropdown-wrap" class="di-dropdown-wrap di-btn-group">
            <button id="nc-load-btn" class="di-btn di-btn-primary">${I(T.load,!0)}Load</button>
            <button id="nc-load-toggle" class="di-btn di-btn-primary di-btn-split" title="More load options">${I(T.chevronDown)}</button>
            <ul id="nc-dropdown-menu" class="di-menu" hidden>
              <li>
                <button id="nc-reload-btn" class="di-menu-item">${I(T.ban,!0)}Force Reload (bypass cache)</button>
              </li>
            </ul>
          </div>
        </div>
      </div>`}_attach(){var t,i,r,n,a,o,s,d,c,u,l,g,f,m,w;(t=this._q("#nc-backdrop"))==null||t.addEventListener("click",h=>{h.target===h.currentTarget&&this._emit("inspector-close",null)}),(i=this._q("#nc-backdrop"))==null||i.addEventListener("keydown",h=>this._onKeydown(h)),(r=this._q("#nc-close-btn"))==null||r.addEventListener("click",()=>this._emit("inspector-close",null)),(n=this._q("#nc-cancel-btn"))==null||n.addEventListener("click",()=>this._emit("inspector-close",null)),(a=this._q("#nc-load-btn"))==null||a.addEventListener("click",()=>this._handleInspect()),(o=this._q("#nc-aggregate-btn"))==null||o.addEventListener("click",()=>this._handleInspect()),(s=this._q("#nc-retry-btn"))==null||s.addEventListener("click",()=>this._handleRetry()),(d=this._q("#nc-error-action"))==null||d.addEventListener("click",()=>this._emit("inspector-error-action",null));let y=this._q("#nc-path-input");y&&(y.value=this._pathInput,y.addEventListener("input",h=>{this._pathInput=h.target.value}),y.addEventListener("keypress",h=>{h.key==="Enter"&&this._handleInspect()})),(c=this._q("#nc-load-toggle"))==null||c.addEventListener("click",()=>{this._dropdownOpen=!this._dropdownOpen,this._syncDropdown()}),(u=this._q("#nc-reload-btn"))==null||u.addEventListener("click",()=>this._handleInspectReload()),(l=this._q("#nc-copy-zarr"))==null||l.addEventListener("click",()=>{let h=this.zarrUrl;h&&this._copy(h,"zarr")}),(g=this._q("#nc-copy-gridlook"))==null||g.addEventListener("click",()=>{let h=this.zarrUrl;h&&this._copy(bt(h),"gridlook")}),(f=this._q("#nc-refresh-gridlook"))==null||f.addEventListener("click",()=>{var h;this.zarrUrl&&((h=this._q("#nc-gridlook-iframe"))==null||h.remove(),this._domIframeUrl=void 0,this._update())}),(m=this._q("#nc-open-gridlook"))==null||m.addEventListener("click",()=>{let h=this.zarrUrl;h&&window.open(bt(h),"_blank","noopener,noreferrer")}),this.querySelectorAll(".nc-tab-btn").forEach(h=>{h.addEventListener("click",()=>{let p=h.dataset.tab;p&&!h.disabled&&(this._activeTab=p,this._update())})}),(w=this._q("#nc-agg-config"))==null||w.addEventListener("config-change",h=>{this._aggregationConfig=h.detail})}_update(){var t,i;let r=this.isAggregation,n=this.status,a=n===P.LOADING,o=n===P.READY,s=n===P.ERROR,d=this.zarrUrl,c=this.file,u=Array.isArray(c)?c:[],l=this._output!=null&&this._output!=="",g=String(this.zarrStatusCode??3),f=r?"Aggregating files and loading metadata...":"Loading metadata...",m=r?"Configure aggregation settings and click 'Aggregate Files' to begin":"Enter a file path and click Load to inspect metadata";if(r){let k=this._q("#nc-file-list-wrap"),D=u.length>0;if(this._toggle(k,D),D){let N=this._q("#nc-file-list-label");N&&(N.textContent=`Selected files (${u.length}):`);let B=this._q("#nc-file-list"),R=u.join("\0");B&&this._domFileKey!==R&&(B.replaceChildren(...u.map(ft=>{let st=document.createElement("li");return st.textContent=ft,st})),this._domFileKey=R)}}if(!r){let k=this._q("#nc-load-btn"),D=this._q("#nc-load-toggle");k&&(k.disabled=a),D&&(D.disabled=a),this._syncDropdown()}let w=!!d&&d!==(typeof c=="string"?c:null);if(this._toggle(this._q("#nc-zarr-row"),w),w&&d){let k=this._q("#nc-zarr-url");k&&(k.textContent=d)}this._setCopyBtn("#nc-copy-zarr",this._copied,"Copy Zarr URL"),r&&this._toggle(this._q("#nc-agg-form"),o&&!l),this._toggle(this._q("#nc-pre-loading"),!d&&a),this._toggle(this._q("#nc-tabs-wrap"),!!d&&(l||a)||s),this._toggle(this._q("#nc-empty-main"),!d&&!a&&o&&!l);let y=this._q("#nc-pre-loading-text");y&&(y.textContent=f),(t=this._q("#nc-pre-steps"))==null||t.setAttribute("status-code",g);let h=this._viewerBlocked();h!==null&&this._activeTab==="gridlook"&&(this._activeTab="metadata");let p=this._activeTab==="gridlook"&&!(l&&d)?"metadata":this._activeTab,v=this._q('[data-tab="metadata"]'),x=this._q('[data-tab="gridlook"]');if(v){let k=p==="metadata";v.classList.toggle("di-tab-active",k),v.setAttribute("aria-selected",String(k))}if(x){let k=p==="gridlook";x.disabled=n!==P.READY||!l||h!==null,h?x.setAttribute("title",h):x.removeAttribute("title"),x.classList.toggle("di-tab-active",k),x.setAttribute("aria-selected",String(k))}this._toggle(this._q("#nc-error"),s&&p==="metadata");let _=this._q("#nc-error-msg");_&&(_.textContent=this.error??"");let b=this._q("#nc-error-action");if(b){let k=this.getAttribute("error-action");b.hidden=!k,b.textContent=k??""}this._toggle(this._q("#nc-loading"),a);let M=this._q("#nc-loading-text");M&&(M.textContent=f),(i=this._q("#nc-body-steps"))==null||i.setAttribute("status-code",g),this._toggle(this._q("#nc-metadata"),p==="metadata"&&l&&!a&&!s);let $=this._q("#nc-metadata-inner");$&&this._domOutput!==this._output&&($.innerHTML=this._output??"",this._domOutput=this._output);let S=p==="gridlook"&&!!d;if(this._toggle(this._q("#nc-gridlook"),S),d){let k=bt(d),D=this._q("#nc-gridlook-url");if(D&&(D.textContent=k),S){let N=this._ensureIframe();N&&this._domIframeUrl!==k&&(this._setIframeSrc(N,k),this._domIframeUrl=k)}}this._setCopyBtn("#nc-copy-gridlook",this._gridlookCopied,"Copy link"),this._toggle(this._q("#nc-empty-body"),!l&&!a&&!s);let A=this._q("#nc-empty-body-text");A&&(A.textContent=m);let U=this._q("#nc-empty-main-text");U&&(U.textContent=m)}_syncDropdown(){let t=this._q("#nc-dropdown-menu");t&&(t.hidden=!this._dropdownOpen)}_focusables(){let t=this._q(".di-modal");return t?Array.from(t.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(i=>!i.closest("[hidden]")):[]}_initialFocus(){var t;let i=this._q("#nc-path-input")??this._focusables()[0]??this._q(".di-modal");(t=i?.focus)==null||t.call(i)}_onKeydown(t){if(t.key==="Escape"){t.stopPropagation(),this._emit("inspector-close",null);return}if(t.key!=="Tab")return;let i=this._focusables();if(i.length===0){t.preventDefault();return}let r=i[0],n=i[i.length-1],a=document.activeElement;t.shiftKey&&(a===r||!this.contains(a))?(t.preventDefault(),n.focus()):!t.shiftKey&&a===n&&(t.preventDefault(),r.focus())}},Ee=`
  @keyframes zarrPulseRing {
    0%   { transform: scale(0.9); opacity: 0.7; }
    60%  { transform: scale(1.6); opacity: 0;   }
    100% { transform: scale(0.9); opacity: 0;   }
  }
  @keyframes zarrSpinArc {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
  @keyframes zarrMsgIn {
    0%   { opacity: 0; transform: translateY(5px);  }
    18%  { opacity: 1; transform: translateY(0);     }
    82%  { opacity: 1; transform: translateY(0);     }
    100% { opacity: 0; transform: translateY(-5px);  }
  }
  @keyframes zarrTrackFill {
    from { width: 0%; }
    to   { width: 100%; }
  }
  .zarr-spin { animation: zarrSpinArc 1.3s linear infinite; transform-origin: center; }
  .zarr-msg  { animation: zarrMsgIn 2.8s ease-in-out forwards; }
`,Yt=[{id:"submitted",label:"Submitted"},{id:"queued",label:"Queued"},{id:"converting",label:"Converting"},{id:"ready",label:"Ready"}],j={done:"#0d9488",active:"#14b8a6",pending:"#d1d5db",track:"#e5e7eb",textOn:"#0f766e",textOff:"#9ca3af",msg:"#6b7280",timer:"#d1d5db"},dt=["Reading file structure\u2026","Analysing coordinate metadata\u2026","Optimising chunk layout\u2026","Building Zarr metadata store\u2026","Assembling data variables\u2026","Applying access-pattern optimisation\u2026","Finalising dataset\u2026"],ct=["Aligning coordinate indexes\u2026","Resolving variable conflicts\u2026","Concatenating along dimension\u2026","Merging datasets\u2026","Validating compatibility\u2026","Assembling aggregated store\u2026","Almost there\u2026"];function ut(e){return e===0?3:e===4?2:e===3?1:0}function Oe(){if(!document.getElementById("zarr-loading-keyframes")){let e=document.createElement("style");e.id="zarr-loading-keyframes",e.textContent=Ee,document.head.appendChild(e)}}function Zt(e,t,i){let r=e<t,n=e===t,a=r?`<svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M1 4L3.8 7L9 1" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>`:n?`<svg width="16" height="16" viewBox="0 0 16 16" class="zarr-spin" style="position:absolute;">
        <circle cx="8" cy="8" r="5.5" fill="none" stroke="${j.active}" stroke-width="2"
          stroke-dasharray="18 17" stroke-linecap="round"/>
       </svg>`:`<div style="width:5px;height:5px;border-radius:50%;background:${j.pending};"></div>`,o=n?`<div style="position:absolute;width:30px;height:30px;border-radius:50%;
         border:2px solid ${j.active};animation:zarrPulseRing 2s ease-out infinite;pointer-events:none;"></div>`:"";return`
    ${e>0?`
    <div style="flex:1;height:2px;background:${r?`linear-gradient(90deg,${j.done},${j.active})`:j.track};
      transition:background 0.5s ease;position:relative;overflow:hidden;">
      ${n?`<div style="position:absolute;top:0;left:0;height:100%;
        background:linear-gradient(90deg,${j.done},${j.active});
        animation:zarrTrackFill 0.6s ease forwards;"></div>`:""}
    </div>`:""}
    <div style="position:relative;display:flex;flex-direction:column;align-items:center;">
      ${o}
      <div style="width:22px;height:22px;border-radius:50%;
        background:${r?j.done:n?"#fff":"#f9fafb"};
        border:2px solid ${r?j.done:n?j.active:j.pending};
        display:flex;align-items:center;justify-content:center;
        position:relative;z-index:1;
        box-shadow:${n?"0 0 0 4px rgba(20,184,166,0.12)":"none"};
        transition:all 0.4s ease;">
        ${a}
      </div>
      <span style="position:absolute;top:28px;font-size:10.5px;
        font-weight:${n?600:400};
        color:${r?j.done:n?j.textOn:j.textOff};
        white-space:nowrap;letter-spacing:0.03em;text-transform:uppercase;
        transition:color 0.4s ease;">
        ${i}
      </span>
    </div>`}var At=class extends HTMLElement{constructor(){super(...arguments),this._msgIdx=0,this._msgKey=0,this._elapsed=0,this._startTime=Date.now(),this._msgTimer=null,this._elapsedTimer=null}static get observedAttributes(){return["status-code","is-aggregation"]}get statusCode(){return parseInt(this.getAttribute("status-code")??"3",10)}get isAggregation(){return this.hasAttribute("is-aggregation")}connectedCallback(){Oe(),this._render(),this._startTimers()}disconnectedCallback(){this._stopTimers()}attributeChangedCallback(){this.isConnected&&this._updateStages()}_startTimers(){this._startTime=Date.now(),this._elapsedTimer=setInterval(()=>{this._elapsed=Math.floor((Date.now()-this._startTime)/1e3);let t=this.querySelector(".zarr-elapsed");t&&(t.textContent=this._formatElapsed(this._elapsed))},1e3),this._startMsgCycle()}_startMsgCycle(){if(this._msgTimer&&clearInterval(this._msgTimer),ut(this.statusCode)!==2)return;let t=this.isAggregation?ct:dt;this._msgTimer=setInterval(()=>{this._msgIdx=(this._msgIdx+1)%t.length,this._msgKey+=1,this._updateMessage()},2800)}_stopTimers(){this._msgTimer&&(clearInterval(this._msgTimer),this._msgTimer=null),this._elapsedTimer&&(clearInterval(this._elapsedTimer),this._elapsedTimer=null)}_formatElapsed(t){return t<60?`${t}s`:`${Math.floor(t/60)}m ${t%60}s`}_render(){let t=ut(this.statusCode),i=this.isAggregation?ct:dt;this.innerHTML=`
      <div style="padding:28px 12px 20px;display:flex;flex-direction:column;align-items:center;gap:0;">
        <div class="zarr-stages" style="display:flex;align-items:center;width:100%;max-width:360px;margin-bottom:28px;">
          ${Yt.map((r,n)=>Zt(n,t,r.label)).join("")}
        </div>

        <div style="height:20px;"></div>

        <div class="zarr-msg-container" style="min-height:22px;text-align:center;">
          ${this._renderMessage(t,i)}
        </div>

        <div style="margin-top:10px;">
          <span class="zarr-elapsed" style="font-size:11px;color:${j.timer};
            font-variant-numeric:tabular-nums;letter-spacing:0.05em;">
            ${this._formatElapsed(this._elapsed)}
          </span>
        </div>
      </div>`}_renderMessage(t,i){return t===2?`<span key="${this._msgKey}" class="zarr-msg" style="font-size:13px;color:${j.msg};">
                ${i[this._msgIdx]}
              </span>`:t===1?`<span style="font-size:13px;color:${j.msg};">Waiting for a worker to pick up the task\u2026</span>`:""}_updateStages(){let t=ut(this.statusCode),i=this.querySelector(".zarr-stages");i&&(i.innerHTML=Yt.map((n,a)=>Zt(a,t,n.label)).join(""));let r=this.querySelector(".zarr-msg-container");if(r){let n=this.isAggregation?ct:dt;r.innerHTML=this._renderMessage(t,n)}this._startMsgCycle()}_updateMessage(){let t=ut(this.statusCode),i=this.querySelector(".zarr-msg-container");if(i){let r=this.isAggregation?ct:dt;i.innerHTML=this._renderMessage(t,r)}}};for(let[e,t]of[["data-inspector",zt],["aggregation-config",$t],["zarr-loading-steps",At]])customElements.get(e)||customElements.define(e,t);var je="freva_auth_token=";function fe(){return typeof document<"u"&&document.baseURI?document.baseURI:typeof location<"u"&&location.href?location.href:null}function Ue(e){try{let t=fe();return t?new URL(e,t).href:new URL(e).href}catch{return e}}function Ct(e){try{let t=fe(),i=t?new URL(e,t):new URL(e);return i.origin==="null"?null:i.origin}catch{return null}}function Le(e){return typeof location>"u"?!1:Ct(e)===location.origin}function Be(e){if(typeof document>"u")return{};if(e!==void 0&&!Le(e))return{};let t=document.cookie.split(";").find(i=>i.trim().startsWith(je));if(!t)return{};try{let i=t.substring(t.indexOf("=")+1).trim();return i.startsWith('"')&&i.endsWith('"')&&(i=i.slice(1,-1)),i?{Authorization:`Bearer ${i}`}:{}}catch{return{}}}async function ot(e,t){try{let i=await(e??Be)(Ue(t));return i&&typeof i=="object"?{...i}:{}}catch{return{}}}function Ri(e){var t;let i=(t=e.origins)==null?void 0:t.map(r=>Ct(r)).filter(r=>!!r);return async r=>{let n=Ct(r);if(!n)return{};if(!(i??(typeof location<"u"?[location.origin]:[])).includes(n))return{};let a=await e.getToken();return a?{Authorization:`Bearer ${a}`}:{}}}function Ut(e){if(typeof e!="string")return e;let t=e.trim();for(;/^https?%(25)*3a/i.test(t);)try{let i=decodeURIComponent(t);if(i===t)break;t=i}catch{break}return t}function qe(e){return`/api/freva-nextgen/data-portal/zarr-utils/status?url=${e}&timeout=1`}var Gt=class{constructor(t,i={}){this.timer=null,this.cancelled=!1,this.zarrUrl=t,this.intervalMs=i.intervalMs??2e3,this.getAuthHeaders=i.getAuthHeaders,this.getStatusUrl=i.getStatusUrl??qe,this.onStatus=i.onStatus??(()=>{}),this.onError=i.onError??(()=>{})}start(){this.cancelled=!1,this.poll(),this.timer=setInterval(()=>{this.poll()},this.intervalMs)}stop(){this.cancelled=!0,this.timer!==null&&(clearInterval(this.timer),this.timer=null)}async poll(){try{let t=this.getStatusUrl(encodeURIComponent(this.zarrUrl)),i=await fetch(t,{credentials:"same-origin",headers:await ot(this.getAuthHeaders,t)});if(!i.ok){this.cancelled||this.onStatus(5,null);return}let r=await i.json(),n=r.status??5,a=r.reason??null;this.cancelled||(this.onStatus(n,a),n<=2&&this.stop())}catch(t){this.cancelled||this.onError(t instanceof Error?t.message:String(t))}}},Kt={isZarr:!1,version:null,consolidated:!1};async function Fi(e,t={}){if(!e)return{...Kt};let i=Ut(e).replace(/\/$/,""),r=async n=>({credentials:"same-origin",headers:await ot(t.getAuthHeaders,n),signal:AbortSignal.timeout(t.timeoutMs??5e3)});try{if((await fetch(`${i}/.zmetadata`,await r(`${i}/.zmetadata`))).ok)return{isZarr:!0,version:2,consolidated:!0}}catch{}try{let n=await fetch(`${i}/zarr.json`,await r(`${i}/zarr.json`));if(n.ok){let a=await n.json(),o=a.zarr_format;if(o===2||o===3){let s=o===3?"consolidated_metadata"in a:!1;return{isZarr:!0,version:o,consolidated:s}}}}catch{}return{...Kt}}function z(){return new Error("zstd: the compressed data is corrupt")}var Mt=128*1024;function rt(e){return 31-Math.clz32(e)}var St=class{constructor(t,i,r){this.src=t,this.start=i,this.end=r,this.bit=0}read(t){let i=0;for(let r=0;r<t;r+=1,this.bit+=1){let n=this.start+(this.bit>>3);if(n>=this.end)throw z();i+=(this.src[n]>>(this.bit&7)&1)*2**r}return i}rewind(t){this.bit-=t}bytesUsed(){return Math.ceil(this.bit/8)}},nt=class{constructor(t,i,r){if(this.src=t,this.start=i,r<=i)throw z();let n=t[r-1];if(n===0)throw z();this.remaining=(r-i-1)*8+rt(n)}read(t){let i=0;for(let r=0;r<t;r+=1){let n=this.remaining-1-r,a=n>=0?this.src[this.start+(n>>3)]>>(n&7)&1:0;i=i*2+a}return this.remaining-=t,i}};function gt(e,t){let i=1<<t,r=new Uint8Array(i),n=new Uint8Array(i),a=new Uint16Array(i),o=new Array(e.length).fill(0),s=i;e.forEach((u,l)=>{u===-1&&(r[--s]=l,o[l]=1)});let d=(i>>1)+(i>>3)+3,c=0;if(e.forEach((u,l)=>{if(!(u<=0)){o[l]=u;for(let g=0;g<u;g+=1){r[c]=l;do c=c+d&i-1;while(c>=s)}}}),c!==0)throw z();for(let u=0;u<i;u+=1){let l=o[r[u]]++;n[u]=t-rt(l),a[u]=(l<<n[u])-i}return{log:t,symbols:r,bits:n,base:a}}function Ne(e){return{log:0,symbols:Uint8Array.of(e),bits:Uint8Array.of(0),base:Uint16Array.of(0)}}function me(e,t,i,r,n){let a=new St(e,t,i),o=a.read(4)+5;if(o>r)throw z();let s=1<<o,d=[];for(;s>0&&d.length<n;){let c=rt(s+1)+1,u=a.read(c),l=(1<<c-1)-1,g=(1<<c)-1-(s+1);(u&l)<g?(a.rewind(1),u&=l):u>l&&(u-=g);let f=u-1;if(s-=Math.abs(f),d.push(f),f===0)for(let m=a.read(2);;m=a.read(2)){for(let w=0;w<m&&d.length<n;w+=1)d.push(0);if(m!==3)break}}if(s!==0)throw z();return[gt(d,o),a.bytesUsed()]}var Z=class{constructor(t,i){this.table=t,this.state=i.read(t.log)}symbol(){return this.table.symbols[this.state]}update(t){this.state=this.table.base[this.state]+t.read(this.table.bits[this.state])}};function Jt(e){let t=0;for(let l of e)l>0&&(t+=1<<l-1);if(t===0)throw z();let i=rt(t)+1,r=(1<<i)-t;if(r&r-1)throw z();let n=[...e,rt(r)+1],a=1<<i,o=new Uint8Array(a),s=new Uint8Array(a),d=n.map(l=>l>0?i+1-l:0),c=new Array(i+2).fill(0);for(let l of d)c[l]+=1;let u=new Array(i+2).fill(0);u[i]=0;for(let l=i;l>=1;l-=1)u[l-1]=u[l]+c[l]*(1<<i-l),s.fill(l,u[l],u[l-1]);return d.forEach((l,g)=>{if(l===0)return;let f=1<<i-l;o.fill(g,u[l],u[l]+f),u[l]+=f}),{maxBits:i,symbols:o,bits:s}}function De(e,t,i){if(t>=i)throw z();let r=e[t],n=[];if(r>=128){let l=r-127;if(t+1+Math.ceil(l/2)>i)throw z();for(let g=0;g<l;g+=1){let f=e[t+1+(g>>1)];n.push(g&1?f&15:f>>4)}return[Jt(n),1+Math.ceil(l/2)]}let a=t+1+r;if(a>i)throw z();let[o,s]=me(e,t+1,a,6,256),d=new nt(e,t+1+s,a),c=new Z(o,d),u=new Z(o,d);for(;;){if(n.push(c.symbol()),c.update(d),d.remaining<0){n.push(u.symbol());break}if(n.push(u.symbol()),u.update(d),d.remaining<0){n.push(c.symbol());break}if(n.length>255)throw z()}return[Jt(n),1+r]}function Wt(e,t,i,r,n,a,o){let s=new nt(t,i,r),d=(1<<e.maxBits)-1,c=s.read(e.maxBits);for(let u=0;u<o;u+=1){n[a+u]=e.symbols[c];let l=e.bits[c];c=(c<<l)+s.read(l)&d}if(s.remaining!==-e.maxBits)throw z()}var Xt=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,20,22,24,28,32,40,48,64,128,256,512,1024,2048,4096,8192,16384,32768,65536],Re=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,3,3,4,6,7,8,9,10,11,12,13,14,15,16],Qt=[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,37,39,41,43,47,51,59,67,83,99,131,259,515,1027,2051,4099,8195,16387,32771,65539],Fe=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,3,3,4,4,5,7,8,9,10,11,12,13,14,15,16],He=gt([4,3,2,2,2,2,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,2,2,3,2,1,1,1,1,1,-1,-1,-1,-1],6),Pe=gt([1,4,3,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1],6),Ve=gt([1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1],5),Tt=class{constructor(t,i){this.limit=i,this.length=0,this.data=new Uint8Array(Math.min(Math.max(t,1024),i))}reserve(t){if(this.length+t>this.limit)throw new Error("zstd: the data decodes to more than allowed");if(this.length+t<=this.data.length)return;let i=new Uint8Array(Math.min(Math.max(this.length+t,this.data.length*2),this.limit));i.set(this.data.subarray(0,this.length)),this.data=i}push(t){this.reserve(t.length),this.data.set(t,this.length),this.length+=t.length}fill(t,i){this.reserve(i),this.data.fill(t,this.length,this.length+i),this.length+=i}match(t,i,r){if(t<=0||t>this.length-r)throw z();this.reserve(i);for(let n=0;n<i;n+=1,this.length+=1)this.data[this.length]=this.data[this.length-t]}};function Ye(e,t,i,r){let n=h=>{if(t+h>=i)throw z();return e[t+h]},a=n(0),o=a&3,s=a>>2&3;if(o<2){let h,p;if(s===1?(h=(a>>4)+(n(1)<<4),p=2):s===3?(h=(a>>4)+(n(1)<<4)+(n(2)<<12),p=3):(h=a>>3,p=1),h>Mt)throw z();if(o===0){if(t+p+h>i)throw z();return[e.slice(t+p,t+p+h),p+h]}return[new Uint8Array(h).fill(n(p)),p+1]}let d,c,u,l=n(1),g=n(2);if(s<2)d=a>>4|(l&63)<<4,c=l>>6|g<<2,u=3;else if(s===2){let h=n(3);d=a>>4|l<<4|(g&3)<<12,c=g>>2|h<<6,u=4}else{let h=n(3),p=n(4);d=a>>4|l<<4|(g&63)<<12,c=g>>6|h<<2|p<<10,u=5}let f=t+u,m=f+c;if(m>i)throw z();if(o===2){let[h,p]=De(e,f,m);r.huffman=h,f+=p}let w=r.huffman;if(!w||d>Mt)throw z();let y=new Uint8Array(d);if(s===0)Wt(w,e,f,m,y,0,d);else{if(f+6>m)throw z();let h=new DataView(e.buffer,e.byteOffset,e.byteLength),p=[h.getUint16(f,!0),h.getUint16(f+2,!0),h.getUint16(f+4,!0)];f+=6;let v=Math.ceil(d/4),x=[v,v,v,d-3*v],_=f;for(let b=0;b<4;b+=1){let M=b<3?_+p[b]:m;if(M>m||x[b]<0)throw z();Wt(w,e,_,M,y,b*v,x[b]),_=M}}return[y,u+c]}function vt(e,t,i,r,n,a,o,s){if(e===0)return[n,0];if(e===1){if(i>=r)throw z();return[Ne(t[i]),1]}if(e===2)return me(t,i,r,o,s);if(!a)throw z();return[a,0]}function Ze(e,t,i,r,n,a){let[o,s]=Ye(e,t,i,n),d=t+s,c=()=>{if(d>=i)throw z();return e[d++]},u=c();if(u>=128&&(u===255?u=c()+(c()<<8)+32512:u=(u-128<<8)+c()),u===0){if(d!==i)throw z();r.push(o);return}let l=c();if(l&3)throw z();let[g,f]=vt(l>>6,e,d,i,He,n.ll,9,36);d+=f;let[m,w]=vt(l>>4&3,e,d,i,Ve,n.of,8,32);d+=w;let[y,h]=vt(l>>2&3,e,d,i,Pe,n.ml,9,53);d+=h,n.ll=g,n.of=m,n.ml=y;let p=new nt(e,d,i),v=new Z(g,p),x=new Z(m,p),_=new Z(y,p),b=n.rep,M=0;for(let $=0;$<u;$+=1){let S=x.symbol(),A=v.symbol(),U=_.symbol();if(A>=Xt.length||U>=Qt.length||S>31)throw z();let k=2**S+p.read(S),D=Qt[U]+p.read(Fe[U]),N=Xt[A]+p.read(Re[A]);$<u-1&&(v.update(p),_.update(p),x.update(p));let B;if(k>3)B=k-3,b[2]=b[1],b[1]=b[0],b[0]=B;else{let R=k-1;N===0&&(R+=1),R===0?B=b[0]:(B=R<3?b[R]:b[0]-1,R>1&&(b[2]=b[1]),b[1]=b[0],b[0]=B)}if(M+N>o.length)throw z();r.push(o.subarray(M,M+N)),M+=N,r.match(B,D,a)}if(p.remaining!==0)throw z();r.push(o.subarray(M))}var xt=null;function Lt(){return xt??(xt={p1:BigInt("11400714785074694791"),p2:BigInt("14029467366897019727"),p3:BigInt("1609587929392839161"),p4:BigInt("9650029242287828579"),p5:BigInt("2870177450012600261")}),xt}function E(e){return BigInt.asUintN(64,e)}function Y(e,t){return E(e<<BigInt(t)|e>>BigInt(64-t))}function K(e,t){let i=Lt();return E(Y(E(e+E(t*i.p2)),31)*i.p1)}function ht(e,t){let i=Lt();return E(E((e^K(BigInt(0),t))*i.p1)+i.p4)}function Ge(e){let t=Lt(),i=new DataView(e.buffer,e.byteOffset,e.byteLength),r=e.length,n=0,a;if(r>=32){let o=E(t.p1+t.p2),s=t.p2,d=BigInt(0),c=E(-t.p1);for(;n+32<=r;n+=32)o=K(o,i.getBigUint64(n,!0)),s=K(s,i.getBigUint64(n+8,!0)),d=K(d,i.getBigUint64(n+16,!0)),c=K(c,i.getBigUint64(n+24,!0));a=E(Y(o,1)+Y(s,7)+Y(d,12)+Y(c,18)),a=ht(a,o),a=ht(a,s),a=ht(a,d),a=ht(a,c)}else a=t.p5;for(a=E(a+BigInt(r));n+8<=r;n+=8)a^=K(BigInt(0),i.getBigUint64(n,!0)),a=E(E(Y(a,27)*t.p1)+t.p4);for(n+4<=r&&(a^=E(BigInt(i.getUint32(n,!0))*t.p1),a=E(E(Y(a,23)*t.p2)+t.p3),n+=4);n<r;n+=1)a^=E(BigInt(e[n])*t.p5),a=E(Y(a,11)*t.p1);return a^=a>>BigInt(33),a=E(a*t.p2),a^=a>>BigInt(29),a=E(a*t.p3),a^=a>>BigInt(32),a}function be(e,t){let i=new DataView(e.buffer,e.byteOffset,e.byteLength),r=new Tt(e.length*4,t),n=0,a=o=>{if(n+o>e.length)throw z()};for(;n<e.length;){a(4);let o=i.getUint32(n,!0);if(n+=4,(o&4294967280)===407710288){a(4);let p=i.getUint32(n,!0);n+=4,a(p),n+=p;continue}if(o!==4247762216)throw z();a(1);let s=e[n++],d=s>>6,c=s>>5&1,u=s>>2&1,l=s&3;if(s&8)throw z();c||(a(1),n+=1);let g=[0,1,2,4][l];a(g);let f=0;for(let p=0;p<g;p+=1)f+=e[n+p]*256**p;if(f!==0)throw z();n+=g;let m=[c?1:0,2,4,8][d];a(m);let w=null;if(m>0){w=0;for(let p=0;p<m;p+=1)w+=e[n+p]*256**p;if(m===2&&(w+=256),w>t)throw z()}n+=m;let y=r.length,h={huffman:null,ll:null,of:null,ml:null,rep:[1,4,8]};for(let p=0;!p;){a(3);let v=e[n]|e[n+1]<<8|e[n+2]<<16;n+=3,p=v&1;let x=v>>1&3,_=v>>3;if(x===0)a(_),r.push(e.subarray(n,n+_)),n+=_;else if(x===1)a(1),r.fill(e[n],_),n+=1;else if(x===2){if(_>Mt)throw z();a(_),Ze(e,n,n+_,r,h,y),n+=_}else throw z()}if(w!==null&&r.length-y!==w)throw z();if(u){a(4);let p=i.getUint32(n,!0),v=Number(Ge(r.data.subarray(y,r.length))&BigInt(4294967295));if(p!==v)throw new Error("zstd: the content checksum does not match");n+=4}}return r.data.slice(0,r.length)}var W=class extends Error{constructor(t){super(t),this.name="UnsupportedCodecError"}};function O(e){return new Error(`${e}: the compressed data is corrupt`)}function Bt(){return new Error("the chunk decodes to more than its shape holds")}var Ke=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t+=1){let i=t;for(let r=0;r<8;r+=1)i=i&1?2197175160^i>>>1:i>>>1;e[t]=i>>>0}return e})();function Je(e){let t=4294967295;for(let i=0;i<e.length;i+=1)t=Ke[(t^e[i])&255]^t>>>8;return(t^4294967295)>>>0}function ve(e,t){let i=new Uint8Array(t),r=0,n=0,a=()=>{if(r>=e.length)throw O("lz4");return e[r++]},o=s=>{let d=s;if(s!==15)return d;for(let c=255;c===255;)c=a(),d+=c;return d};for(;r<e.length;){let s=a(),d=o(s>>4);if(r+d>e.length||n+d>t)throw O("lz4");if(i.set(e.subarray(r,r+d),n),r+=d,n+=d,r>=e.length)break;let c=a()|a()<<8,u=o(s&15)+4;if(c===0||c>n||n+u>t)throw O("lz4");for(let l=0;l<u;l+=1,n+=1)i[n]=i[n-c]}if(n!==t)throw O("lz4");return i}var We=8191;function Xe(e,t){let i=new Uint8Array(t),r=0,n=0,a=()=>{if(r>=e.length)throw O("blosclz");return e[r++]},o=a()&31;for(;;){if(o>=32){let s=(o>>5)-1,d=(o&31)<<8;if(s===6)for(let l=255;l===255;)l=a(),s+=l;let c=a();s+=3;let u=n-d-c;if(c===255&&d===7936&&(d=a()<<8,d+=a(),u=n-d-We),u-=1,u<0||n+s>t)throw O("blosclz");for(let l=0;l<s;l+=1,n+=1)i[n]=i[u+l]}else{let s=o+1;if(r+s>e.length||n+s>t)throw O("blosclz");i.set(e.subarray(r,r+s),n),r+=s,n+=s}if(r>=e.length)break;o=a()}if(n!==t)throw O("blosclz");return i}async function It(e,t,i){if(typeof DecompressionStream!="function")throw new W("this browser cannot decompress zlib or gzip");let r=new DecompressionStream(t),n=r.writable.getWriter();n.write(new Uint8Array(e)).catch(()=>{}),n.close().catch(()=>{});let a=r.readable.getReader(),o=[],s=0;for(;;){let{done:u,value:l}=await a.read();if(u)break;if(s+=l.length,s>i)throw a.cancel().catch(()=>{}),Bt();o.push(l)}let d=new Uint8Array(s),c=0;for(let u of o)d.set(u,c),c+=u.length;return d}function Qe(e,t){let i=new Uint8Array(e.length),r=Math.floor(e.length/t);for(let a=0;a<r;a+=1)for(let o=0;o<t;o+=1)i[a*t+o]=e[o*r+a];let n=r*t;return i.set(e.subarray(n),n),i}async function ti(e,t,i){if(e===0)return Xe(t,i);if(e===1)return ve(t,i);if(e===3||e===4){let r=e===3?await It(t,"deflate",i):be(t,i);if(r.length!==i)throw O(`blosc ${e===3?"zlib":"zstd"}`);return r}throw new W(`blosc's ${["blosclz","lz4","snappy","zlib","zstd"][e]??`codec ${e}`} is not supported`)}var ei=256*1024;async function xe(e){if(await new Promise(t=>setTimeout(t,0)),e!=null&&e.aborted)throw new DOMException("The read was aborted.","AbortError")}var ii=16,ri=128;async function ni(e,t,i,r,n,a){let o=new DataView(e.buffer,e.byteOffset,e.byteLength),s=Math.floor(r/n),d=new Uint8Array(r),c=t;for(let u=0;u<n;u+=1){if(c+4>i)throw O("blosc");let l=o.getInt32(c,!0);if(c+=4,l<0||c+l>i)throw O("blosc");let g=e.subarray(c,c+l);d.set(l===s?g:await ti(a,g,s),u*s),c+=l}return d}async function ai(e,t,i){if(e.length<16)throw O("blosc");let r=new DataView(e.buffer,e.byteOffset,e.byteLength),n=e[2],a=e[3],o=r.getUint32(4,!0),s=r.getUint32(8,!0),d=r.getUint32(12,!0);if(d>e.length||d<16)throw O("blosc");if(o>t)throw Bt();if(n&2){if(16+o>d)throw O("blosc");return e.slice(16,16+o)}if(o===0)return new Uint8Array(0);if(s===0||a===0)throw O("blosc");let c=n>>5&7,u=o%s,l=Math.floor(o/s)+(u>0?1:0),g=16+l*4;if(g>d)throw O("blosc");let f=Array.from({length:l},(v,x)=>r.getUint32(16+x*4,!0)),m=[...new Set(f)].sort((v,x)=>v-x),w=new Map;m.forEach((v,x)=>w.set(v,m[x+1]??d));let y=0,h=(n&16)!==0,p=new Uint8Array(o);for(let v=0;v<l;v+=1){let x=v===l-1&&u>0,_=x?u:s,b=f[v];if(b<g||b>=d)throw O("blosc");let M=w.get(b),$=(n&1)!==0&&a>1;if(n&4&&_>=a)throw new W("blosc's bit shuffle is not supported");let S=!h&&a<=ii&&Math.floor(_/a)>=ri&&!x?a:1,A=await ni(e,b,M,_,S,c);p.set($?Qe(A,a):A,v*s),y+=_,y>=ei&&(y=0,await xe(i))}return p}async function oi(e,t,i,r){switch(await xe(r),t.id){case"blosc":return ai(e,i,r);case"zlib":return It(e,"deflate",i);case"gzip":return It(e,"gzip",i);case"zstd":return be(e,i);case"lz4":{if(e.length<4)throw O("lz4");let n=new DataView(e.buffer,e.byteOffset,e.byteLength).getUint32(0,!0);if(n>i)throw Bt();return ve(e.subarray(4),n)}case"crc32c":{if(e.length<4)throw O("crc32c");let n=e.subarray(0,e.length-4),a=new DataView(e.buffer,e.byteOffset,e.byteLength).getUint32(e.length-4,!0);if(Je(n)!==a)throw new Error("crc32c: the checksum does not match");return n}default:throw new W(`the ${t.id} codec is not supported`)}}var qt={D:864e11,h:36e11,m:6e10,s:1e9,ms:1e6,us:1e3,ns:1},si=[[/^days?$/i,"D"],[/^(hours?|hrs?|h)$/i,"h"],[/^(minutes?|mins?)$/i,"m"],[/^(seconds?|secs?|s)$/i,"s"],[/^(milliseconds?|msecs?|ms)$/i,"ms"],[/^(microseconds?|usecs?|us)$/i,"us"],[/^(nanoseconds?|nsecs?|ns)$/i,"ns"]],li=new Set(["standard","gregorian","proleptic_gregorian"]),ye=1024*1024,yt=null;function H(){return yt??(yt={zero:BigInt(0),billion:BigInt(1e9),nat:-(BigInt(2)**BigInt(63)),max:BigInt(2)**BigInt(63)-BigInt(1),gregorianStart:BigInt(Date.UTC(1582,9,15))*BigInt(1e6)}),yt}function we(){return typeof BigInt=="function"&&typeof DataView.prototype.getBigInt64=="function"}var te=2*ye+65536,di=3e3,ee=75,X=class extends Error{};function ci(e){let t={int8:{kind:"i",size:1},int16:{kind:"i",size:2},int32:{kind:"i",size:4},int64:{kind:"i",size:8},uint8:{kind:"u",size:1},uint16:{kind:"u",size:2},uint32:{kind:"u",size:4},uint64:{kind:"u",size:8},float32:{kind:"f",size:4},float64:{kind:"f",size:8}};if(t[e])return t[e];let i=/^[<>|=]?([iufM])(\d)(?:\[(\w+)\])?$/.exec(e);if(!i)return null;let r=i[1],n=Number(i[2]);return r==="M"?n===8&&i[3]&&qt[i[3]]?{kind:r,size:n,unit:i[3]}:null:r==="f"&&n!==4&&n!==8?null:[1,2,4,8].includes(n)?{kind:r,size:n}:null}function ie(e){if(e<=H().nat||e>H().max)throw new X("outside datetime64[ns]");return e}function Et(e,t){return e*BigInt(t)}function re(e,t){if(Number.isInteger(e)&&Math.abs(e)<=Number.MAX_SAFE_INTEGER)return Et(BigInt(e),t);let i=e*t;if(!Number.isFinite(i)||Math.abs(i)>=2**80)throw new X("outside datetime64[ns]");return BigInt(Math.trunc(i))}function ui(e){var t;let i=/^\s*(\w+)\s+since\s+(.+?)\s*$/i.exec(e);if(!i)return null;let r=(t=si.find(([v])=>v.test(i[1])))==null?void 0:t[1];if(!r)return null;let n=/^(-?\d{1,4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2})(\.\d{1,9})?)?)?\s*(?:Z|UTC|GMT|([+-])(\d{1,2}):?(\d{2})?)?$/i.exec(i[2]);if(!n)return null;let[,a,o,s,d="0",c="0",u="0",l="",g,f="0",m="0"]=n,w=new Date(Date.UTC(2e3,0,1));w.setUTCFullYear(Number(a),Number(o)-1,Number(s)),w.setUTCHours(Number(d),Number(c),Number(u),0);let y=g?(g==="-"?-1:1)*(Number(f)*3600+Number(m)*60):0,h=BigInt(l?l.slice(1).padEnd(9,"0"):0),p=BigInt(w.getTime())*BigInt(1e6)-BigInt(y)*H().billion+h;return{unitNs:qt[r],origin:p}}function V(e,t){return String(e).padStart(t,"0")}function _e(e){let{billion:t,zero:i}=H(),r=e/t,n=e-r*t;n<i&&(r-=BigInt(1),n+=t);let a=new Date(Number(r)*1e3),o=a.getUTCFullYear();return{date:`${o<0?`-${V(-o,4)}`:V(o,4)}-${V(a.getUTCMonth()+1,2)}-${V(a.getUTCDate(),2)}`,time:`${V(a.getUTCHours(),2)}:${V(a.getUTCMinutes(),2)}:${V(a.getUTCSeconds(),2)}`,nanos:n,fraction:V(n.toString(),9)}}function et(e){if(e===null)return"NaT";let{date:t,time:i,nanos:r,fraction:n}=_e(e),a=r===BigInt(0)?"":r%BigInt(1e3)===BigInt(0)?`.${n.slice(0,6)}`:`.${n}`;return i==="00:00:00"&&!a?t:`${t}T${i}${a}`}function ne(e){if(e===null)return"'NaT'";let{date:t,time:i,fraction:r}=_e(e);return`'${t}T${i}.${r}'`}function hi(e,t,i){let r=" ".repeat(7),n=[],a=r;e.forEach((d,c)=>{let u=c===e.length-1,l=ee-1;a.length>r.length&&a.length+d.length>l&&(n.push(a.replace(/\s+$/,"")),a=r),a+=d,u||(a+=", ")}),n.push(a);let o=`array([${n.join(`
`).slice(r.length)}]`,s=`${i?`shape=(${t},), `:""}dtype='datetime64[ns]')`;return o.length-(o.lastIndexOf(`
`)+1)+1+1+s.length>ee?`${o},
${" ".repeat(6)}${s}`:`${o}, ${s}`}function pi(e,t,i){let r=i?e.slice(0,3):e,n=i?e.slice(-3):[],a=[...r.map(ne),...i?["...",...n.map(ne)]:[]],o=e[0]??null,s=e[e.length-1]??null;return{dtype:"datetime64[ns]",preview:e.length===1?et(o):t===2?`${et(o)} ${et(s)}`:`${et(o)} ... ${et(s)}`,repr:hi(a,t,i)}}function gi(e,t,i,r){let n=t*i.size;if(i.kind==="f")return{kind:"float",value:i.size===4?e.getFloat32(n,r):e.getFloat64(n,r)};if(i.size===8)return{kind:"int",value:i.kind==="u"?e.getBigUint64(n,r):e.getBigInt64(n,r)};let a={i1:()=>e.getInt8(n),u1:()=>e.getUint8(n),i2:()=>e.getInt16(n,r),u2:()=>e.getUint16(n,r),i4:()=>e.getInt32(n,r),u4:()=>e.getUint32(n,r)}[`${i.kind}${i.size}`];if(!a)throw new X("unsupported integer type");return{kind:"int",value:BigInt(a())}}function Ot(e){return typeof e=="number"?e:e==="NaN"?Number.NaN:e==="Infinity"?Number.POSITIVE_INFINITY:e==="-Infinity"?Number.NEGATIVE_INFINITY:null}function fi(e,t){return[].concat(e._FillValue,e.missing_value,t).map(Ot).filter(i=>i!==null)}function mi(e,t,i){return t.some(r=>{if(e.kind==="int")return Number.isInteger(r)&&BigInt(r)===e.value;let n=i.size===4?Math.fround(r):r;return n===e.value||Number.isNaN(n)&&Number.isNaN(e.value)})}async function bi(e,t,i){let r=await ot(t.getAuthHeaders,e),n=await fetch(e,{credentials:"same-origin",headers:r,...t.signal?{signal:t.signal}:{}});if(!n.ok)throw new Error(`the chunk answered ${n.status}`);let a=n.body;if(a&&typeof a.getReader=="function"){let s=a.getReader(),d=[],c=0;for(;;){let{done:g,value:f}=await s.read();if(g)break;if(c+=f.length,c>i)throw s.cancel().catch(()=>{}),new Error("the chunk is larger than its shape allows");d.push(f)}let u=new Uint8Array(c),l=0;for(let g of d)u.set(g,l),l+=g.length;return u}let o=await n.arrayBuffer();if(o.byteLength>i)throw new Error("the chunk is larger than its shape allows");return new Uint8Array(o)}function vi(e,t){let i=[],r=e;for(let n of t)i.push(r),r=n.id==="crc32c"?r+4:Math.min(te,r+Math.ceil(r/8)+4096);return{limits:i,cap:Math.min(te,r)}}async function xi(e,t,i,r={}){let n=String(t.attrs.units??""),a=String(t.attrs.calendar??"standard").toLowerCase();if(!li.has(a))return null;let o=ci(i.dtype);if(!o||t.shape.length!==1||!we())return null;let s,d=H().zero;if(o.kind==="M")s=qt[o.unit];else{let $=ui(n);if(!$||({unitNs:s,origin:d}=$,a!=="proleptic_gregorian"&&d<H().gregorianStart))return null}let c=Ot(t.attrs.scale_factor),u=Ot(t.attrs.add_offset),l=o.kind!=="M"&&(c!==null||u!==null),g=t.shape[0],f=t.chunks[0]||g,m=f*o.size;if(g===0||m>ye)return null;let{limits:w,cap:y}=vi(m,i.codecs),h=g<=6,p=h?Array.from({length:g},($,S)=>S):[0,1,2,g-3,g-2,g-1],v=Ut(e).replace(/\/$/,""),x=new Map,_=$=>{let S=x.get($);return S||(S=(async()=>{let A=await bi(`${v}/${i.path}/${i.chunkPrefix}${$}`,r,y);for(let k=i.codecs.length-1;k>=0;k-=1)A=await oi(A,i.codecs[k],w[k],r.signal);let U=Math.min(f,g-$*f)*o.size;if(A.length<U||A.length>m)throw new Error("the chunk does not match its shape");return new DataView(A.buffer,A.byteOffset,A.byteLength)})(),x.set($,S)),S},b=o.kind==="M"?[]:fi(t.attrs,i.fill);if(o.kind!=="f"&&b.some($=>Number.isInteger($)&&!Number.isSafeInteger($)&&Math.abs($)<2**64))return null;let M;try{M=await Promise.all(p.map(async $=>{let S=await _(Math.floor($/f)),A=gi(S,$%f,o,i.littleEndian);if(o.kind==="M")return A.value===H().nat?null:ie(Et(A.value,s));if(o.kind==="i"&&o.size===8&&A.value===H().nat||mi(A,b,o)||A.kind==="float"&&Number.isNaN(A.value))return null;let U;return l?U=re(Number(A.value)*(c??1)+(u??0),s):A.kind==="int"?U=Et(A.value,s):U=re(A.value,s),ie(U+d)}))}catch($){if($ instanceof X)return null;throw $}return a!=="proleptic_gregorian"&&M.some($=>$!==null&&$<H().gregorianStart)?null:pi(M,g,!h)}async function yi(e,t,i={}){if(!we())return;let r=i.signal,n=new AbortController,a=new Promise(c=>{n.signal.aborted?c():n.signal.addEventListener("abort",()=>c(),{once:!0})}),o=()=>n.abort();r?.addEventListener("abort",o,{once:!0}),r!=null&&r.aborted&&o();let s=setTimeout(o,i.budgetMs??di),d=[];try{if(!n.signal.aborted){let c=t.groups?Object.values(t.groups):[t];for(let u of c)for(let l of Object.values(u.coords)){let g=l._chunks;!l._isTimeCoord||!g||d.push(Promise.resolve().then(()=>xi(e,l,g,{...i,signal:n.signal})).then(f=>{f&&!n.signal.aborted&&(l._values=f)},()=>{}))}}await Promise.race([Promise.all(d),a])}finally{clearTimeout(s),r?.removeEventListener("abort",o),n.abort()}if(r!=null&&r.aborted)throw r.reason instanceof Error?r.reason:new DOMException("The metadata read was aborted.","AbortError")}var at=class extends Error{constructor(t,i){super(t),this.name="ZarrMetadataError",this.status=i}};function wi(e){return{f2:"float16",f4:"float32",f8:"float64",i1:"int8",i2:"int16",i4:"int32",i8:"int64",u1:"uint8",u2:"uint16",u4:"uint32",u8:"uint64",b1:"bool"}[e.slice(1)]??e}function _i(e){let t={...e};return delete t._ARRAY_DIMENSIONS,t}function ke(e,t,i){let r={},n={};for(let[c,u]of Object.entries(e)){let{shape:l,chunks:g,dtype:f,dims:m,attrs:w,source:y}=i(u,c);m.forEach((v,x)=>{v in r||(r[v]=l[x]??0)});let h=w.units,p=m.length===1&&m[0]===c&&(String(h??"").includes("since")||c==="time");n[c]={shape:l,chunks:g,dtype:f,dims:m,attrs:w,_isTimeCoord:p,...y?{_chunks:y}:{}}}let a=new Set,o=c=>String(c??"").split(/[\s,]+/).filter(Boolean);for(let[c,u]of Object.entries(n))u.dims.length===1&&u.dims[0]===c&&a.add(c);o(t.coordinates).forEach(c=>a.add(c));for(let c of Object.values(n))o(c.attrs.coordinates).forEach(u=>a.add(u));let s={},d={};for(let[c,u]of Object.entries(n))(a.has(c)?s:d)[c]=u;return{dims:r,coords:s,data_vars:d,attrs:t}}function J(e){return Object.keys(e.coords).length+Object.keys(e.data_vars).length>0}function wt(e,t){let i=e[`${t}.zattrs`]??{},r={};for(let[n,a]of Object.entries(e)){if(!n.startsWith(t))continue;let o=n.slice(t.length);if(o.endsWith("/.zarray")){let s=o.slice(0,-8);if(s.includes("/"))continue;r[s]??(r[s]={}),r[s].zarray=a}else if(o.endsWith("/.zattrs")){let s=o.slice(0,-8);if(!s||s.includes("/"))continue;r[s]??(r[s]={}),r[s].zattrs=a}}for(let n of Object.keys(r))r[n].zarray||delete r[n];return ke(r,i,(n,a)=>{var o,s,d,c,u,l,g;let f=n.zattrs??{},m=((o=n.zarray)==null?void 0:o.dtype)??"|u1",w=[...((s=n.zarray)==null?void 0:s.filters)??[],...(d=n.zarray)!=null&&d.compressor?[n.zarray.compressor]:[]];return{shape:((c=n.zarray)==null?void 0:c.shape)??[],chunks:((u=n.zarray)==null?void 0:u.chunks)??((l=n.zarray)==null?void 0:l.shape)??[],dtype:wi(m),dims:f._ARRAY_DIMENSIONS??[],attrs:_i(f),source:{path:`${t}${a}`,chunkPrefix:"",dtype:m,littleEndian:!m.startsWith(">"),codecs:w,fill:((g=n.zarray)==null?void 0:g.fill_value)??null}}})}function ki(e){let t=e.metadata??{},i=new Set;for(let a of Object.keys(t))a===".zgroup"||a===".zattrs"||a.endsWith("/.zgroup")&&i.add(a.slice(0,-8));if(i.size===0){let a=wt(t,"");if(!J(a))throw new Error("No arrays found in .zmetadata");return{groups:null,...a}}let r={},n=wt(t,"");J(n)&&(r["/"]=n);for(let a of[...i].sort()){let o=wt(t,`${a}/`);J(o)&&(r[a]=o)}if(!Object.keys(r).length)throw new Error("No arrays found in .zmetadata");return{groups:r}}function $i(e,t){var i,r;let n=e.chunk_key_encoding,a=((i=n?.configuration)==null?void 0:i.separator)??"/",o=n?.name==="v2"?"":`c${a}`,s=!0,d=[],c=!0;for(let u of e.codecs??[]){let l=u.name??"";if(!(c&&l==="transpose")){if(c&&l==="bytes"){s=((r=u.configuration)==null?void 0:r.endian)!=="big",c=!1;continue}if(c)return;d.push({...u.configuration??{},id:l})}}return{path:t,chunkPrefix:o,dtype:e.data_type??"",littleEndian:s,codecs:d}}function _t(e,t){let i=(e[t||""]??{}).attributes??{},r={};for(let[n,a]of Object.entries(e))if(a.node_type==="array")if(t){if(!n.startsWith(`${t}/`))continue;let o=n.slice(t.length+1);if(o.includes("/"))continue;r[o]={zarray:a}}else{if(!n||n.includes("/"))continue;r[n]={zarray:a}}return ke(r,i,(n,a)=>{var o,s;let d=n.zarray,c=$i(d,t?`${t}/${a}`:a);return{...c?{source:c}:{},shape:d.shape??[],chunks:((s=(o=d.chunk_grid)==null?void 0:o.configuration)==null?void 0:s.chunk_shape)??d.shape??[],dtype:d.data_type??"float32",dims:d.dimension_names??[],attrs:d.attributes??{}}})}function zi(e){var t;let i=((t=e.consolidated_metadata)==null?void 0:t.metadata)??{};if(!Object.keys(i).length)throw new Error("zarr.json has no consolidated_metadata");let r=new Set;for(let[o,s]of Object.entries(i))!o||s.node_type!=="group"||r.add(o);if(r.size===0){let o=_t(i,"");if(!J(o))throw new Error("No arrays found in zarr.json");return{groups:null,...o}}let n={},a=_t(i,"");J(a)&&(n["/"]=a);for(let o of[...r].sort()){let s=_t(i,o);J(s)&&(n[o]=s)}if(!Object.keys(n).length)throw new Error("No arrays found in zarr.json");return{groups:n}}async function Ai(e,t={}){let i=Ut(e).replace(/\/$/,""),{signal:r}=t,n=()=>{if(r!=null&&r.aborted)throw r.reason instanceof Error?r.reason:new DOMException("The metadata read was aborted.","AbortError")},a=null,o=u=>u===401?2:u===403?1:0,s=async u=>{n();let l=`${i}/${u}`,g=await ot(t.getAuthHeaders,l);n();try{let f=await fetch(l,{credentials:"same-origin",headers:g,...r?{signal:r}:{}});if(!f.ok){let m=typeof f.status=="number"?f.status:null;return m!==null&&(a===null||o(m)>o(a))&&(a=m),null}return await f.json()}catch{return n(),null}},d=2,c=await s(".zmetadata");if(c||(d=3,c=await s("zarr.json")),!c){let u=a===null?"":` - the store answered ${a}`;throw new at(`Could not read zarr metadata (.zmetadata or zarr.json)${u}`,a)}return d===2?ki(c):zi(c)}function F(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Ci=0;function jt(){return`xr${++Ci}`}function ae(e){return`<svg class="icon xr-${e}"><use xlink:href="#${e}"></use></svg>`}function Mi(e,t){return Object.keys(e).length?`<ul class='xr-dim-list'>${Object.entries(e).map(([i,r])=>`<li><span${t.has(i)?" class='xr-has-index'":""}>${F(i)}</span>: ${r}</li>`).join("")}</ul>`:""}function $e(e){let t=Object.entries(e);return t.length?`<dl class='xr-attrs'>${t.map(([i,r])=>`<dt><span>${F(i)} :</span></dt><dd>${F(String(r))}</dd>`).join("")}</dl>`:"<em>No attributes</em>"}function Si(e){let t=e.shape.reduce((i,r)=>i*r,1);return t===0?"[]":`${e.dtype} (${e.shape.join(" \xD7 ")} = ${t.toLocaleString()})`}function oe(e){return e<1024?e+" B":e<1024**2?(e/1024).toFixed(2)+" KiB":e<1024**3?(e/1024**2).toFixed(2)+" MiB":(e/1024**3).toFixed(2)+" GiB"}function Ti(e){if(!e.length)return"";let t=Math.min(e.length,3),i=e.slice(-t),r=p=>Math.max(20,Math.min(110,20+Math.log10(Math.max(1,p))*30)),n=p=>p.toLocaleString(),a="font-size:11px;fill:var(--xr-font-color2);font-family:monospace";if(t<3){let p=r(i[t-1]),v=t===2?r(i[0]):12,x=t===2?42:2,_=16,b=x+p+4,M=v+_;return`<svg width="${Math.ceil(b)}" height="${Math.ceil(M)}"
        viewBox="0 0 ${Math.ceil(b)} ${Math.ceil(M)}"
        style="overflow:visible;display:block;flex-shrink:0">
      <rect x="${x}" y="0" width="${p}" height="${v}"
            style="fill:var(--xr-chunk-face);stroke:var(--xr-chunk-edge);stroke-width:0.8"/>
      ${t===2?`<text x="${x-5}" y="${v/2+4}"
            text-anchor="end" style="${a}">${n(i[0])}</text>`:""}
      <text x="${x+p/2}" y="${v+_-3}"
            text-anchor="middle" style="${a}">${n(i[t-1])}</text>
    </svg>`}let o=r(i[2]),s=r(i[1]),d=r(i[0]),c=.5,u=d*c,l=d*c*.45,g=16,f=16,m=o+u+52,w=g+s+l+f,y=2,h=g+s+l;return`<svg width="${Math.ceil(m)}" height="${Math.ceil(w)}"
      viewBox="0 0 ${Math.ceil(m)} ${Math.ceil(w)}"
      style="overflow:visible;display:block;flex-shrink:0">
    <polygon points="${y},${h} ${y+o},${h} ${y+o},${h-s} ${y},${h-s}"
             style="fill:var(--xr-chunk-face);stroke:var(--xr-chunk-edge);stroke-width:0.8"/>
    <polygon points="${y},${h-s} ${y+o},${h-s} ${y+o+u},${h-s-l} ${y+u},${h-s-l}"
             style="fill:var(--xr-chunk-top);stroke:var(--xr-chunk-edge);stroke-width:0.8"/>
    <polygon points="${y+o},${h} ${y+o+u},${h-l} ${y+o+u},${h-s-l} ${y+o},${h-s}"
             style="fill:var(--xr-chunk-side);stroke:var(--xr-chunk-edge);stroke-width:0.8"/>
    <text x="${y+o/2}" y="${h+f-3}"
          text-anchor="middle" style="${a}">${n(i[2])}</text>
    <text x="${y+o/2+u/2}" y="${g-3}"
          text-anchor="middle" style="${a}">${n(i[1])}</text>
    <text x="${y+o+u+5}" y="${h-s/2-l/2+4}"
          text-anchor="start" style="${a}">${n(i[0])}</text>
  </svg>`}function Ii(e){var t;let{shape:i,chunks:r,dtype:n}=e,a={int8:1,uint8:1,bool:1,int16:2,uint16:2,int32:4,uint32:4,float32:4,int64:8,uint64:8,float64:8}[n]??4,o=i.reduce((f,m)=>f*m,1)*a,s=null,d=null;r&&r.length===i.length&&(s=r.reduce((f,m)=>f*m,1)*a,d=i.reduce((f,m,w)=>f*Math.ceil(m/r[w]),1));let c='style="color:var(--xr-font-color3);padding:2px 16px 2px 0;white-space:nowrap;vertical-align:top"',u='style="padding:2px 16px 2px 0;white-space:nowrap;vertical-align:top"',l='style="padding:2px 0;white-space:nowrap;color:var(--xr-font-color2);vertical-align:top"',g=(f,m,w="")=>`<tr><td ${c}>${f}</td><td ${u}>${m}</td><td ${l}>${w}</td></tr>`;return`<table style="border-collapse:collapse;padding:6px 0 12px"><tr>
    <td style="vertical-align:top;padding:0">
      <table style="font-size:12px;font-family:monospace;border-collapse:collapse;line-height:1.75">
        <thead><tr>
          <th style="font-weight:400;padding:0 16px 5px 0;text-align:left"></th>
          <th style="font-weight:600;padding:0 16px 5px 0;text-align:left">Array</th>
          <th style="font-weight:600;padding:0 0 5px 0;text-align:left">Chunk</th>
        </tr></thead><tbody>
          ${g("Bytes",oe(o),s!==null?oe(s):"\u2014")}
          ${g("Shape","("+i.join(", ")+")",r?"("+r.join(", ")+")":"\u2014")}
          ${d!==null?g("Chunks",d.toLocaleString()+" chunks"):""}
          ${g("dtype",F(((t=e._values)==null?void 0:t.dtype)??n))}
          ${g("dims","("+e.dims.join(", ")+")")}
        </tbody>
      </table>
    </td>
    <td style="vertical-align:middle;padding:0 0 0 32px">${Ti(i)}</td>
  </tr></table>`}function Ei(e,t,i){var r,n;let a=jt(),o=jt(),s=Object.keys(t.attrs).length>0;return`
    <div class='xr-var-name'><span${i?" class='xr-has-index'":""}>${F(e)}</span></div>
    <div class='xr-var-dims'>(${t.dims.map(F).join(", ")})</div>
    <div class='xr-var-dtype'>${F(((r=t._values)==null?void 0:r.dtype)??t.dtype)}</div>
    <div class='xr-var-preview xr-preview'>${F(((n=t._values)==null?void 0:n.preview)??Si(t))}</div>
    <input id='${a}' class='xr-var-attrs-in' type='checkbox'${s?"":" disabled"}>
    <label for='${a}' title='Show/Hide attributes'>${ae("icon-file-text2")}</label>
    <input id='${o}' class='xr-var-data-in' type='checkbox'>
    <label for='${o}' title='Show/Hide data repr'>${ae("icon-database")}</label>
    <div class='xr-var-attrs'>${$e(t.attrs)}</div>
    <div class='xr-var-data'>${t._values?`<pre>${F(t._values.repr)}</pre>`:""}${Ii(t)}</div>
  `}function se(e,t){return`<ul class='xr-var-list'>${Object.entries(e).map(([i,r])=>`<li class='xr-var-item'>${Ei(i,r,t.has(i))}</li>`).join("")}</ul>`}function pt(e,t,i,r,n,a){let o=jt(),s=(r??0)>0,d=r!==null?` <span>(${r})</span>`:"",c=n&&s?"":" disabled";return`
    <input id='${o}' class='xr-section-summary-in' type='checkbox'${c}${a||!s?"":" checked"} />
    <label for='${o}' class='xr-section-summary'${c===""?" title='Expand/collapse section'":""}>${e}${d}</label>
    <div class='xr-section-inline-details'>${t}</div>
    ${i?`<div class='xr-section-details'>${i}</div>`:""}
  `}var le=`<svg class="xr-icons" aria-hidden="true"><defs>
<symbol id="icon-database" viewBox="0 0 32 32">
  <path d="M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5z"/>
  <path d="M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"/>
  <path d="M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"/>
</symbol>
<symbol id="icon-file-text2" viewBox="0 0 32 32">
  <path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"/>
</symbol>
</defs></svg>`;function de(e){let t=new Set(Object.keys(e.coords)),i=[];return i.push(pt("Dimensions:",Mi(e.dims,t),"",Object.keys(e.dims).length,!1,!0)),Object.keys(e.coords).length&&i.push(pt("Coordinates:","",se(e.coords,t),Object.keys(e.coords).length,!0,!1)),i.push(pt("Data variables:","",se(e.data_vars,new Set),Object.keys(e.data_vars).length,!0,!1)),Object.keys(e.attrs).length&&i.push(pt("Attributes:","",$e(e.attrs),Object.keys(e.attrs).length,!0,!0)),`<div class='xr-root'>
    <div class='xr-wrap'>
      <div class='xr-header'><div class='xr-obj-type'>xarray.Dataset</div></div>
      <ul class='xr-sections'>${i.map(r=>`<li class='xr-section-item'>${r}</li>`).join("")}</ul>
    </div>
  </div>`}function Oi(e){if(!e.groups)return`${le}${de(e)}`;let t=Object.entries(e.groups).map(([i,r])=>`
    <details open style="margin-bottom:10px;border:1px solid var(--xr-border-color);border-radius:4px;overflow:hidden">
      <summary class="xr-group-summary">
        <span class="xr-group-marker" aria-hidden="true"></span>
        <span>Group: ${F(i)}</span>
      </summary>
      <div style="padding:0 12px 8px">${de(r)}</div>
    </details>
  `).join("");return`${le}<div style="font-family:monospace">${t}</div>`}var ji=`
:root {
  --xr-font-color0: var(--jp-content-font-color0, rgba(0,0,0,1));
  --xr-font-color2: var(--jp-content-font-color2, rgba(0,0,0,.54));
  --xr-font-color3: var(--jp-content-font-color3, rgba(0,0,0,.38));
  --xr-border-color: var(--jp-border-color2, #e0e0e0);
  --xr-disabled-color: var(--jp-layout-color3, #bdbdbd);
  --xr-background-color: var(--jp-layout-color0, white);
  --xr-background-color-row-even: var(--jp-layout-color1, white);
  --xr-background-color-row-odd: var(--jp-layout-color2, #eeeeee);
}

/* The group card's own disclosure, drawn with the same marker and rotated the same way. */
.xr-group-summary{padding:8px 12px;font-weight:600;cursor:pointer;background:var(--xr-background-color-row-odd);list-style:none;display:flex;align-items:center;gap:8px}
.xr-group-summary::-webkit-details-marker{display:none}
.xr-group-marker{flex:0 0 auto;width:0;height:0;border-style:solid;border-width:4px 0 4px 7px;border-color:transparent transparent transparent var(--xr-font-color2);transition:transform .15s ease}
details[open] .xr-group-marker{transform:rotate(90deg)}
@media (prefers-reduced-motion:reduce){
  .xr-section-summary-in+label:before,.xr-group-marker{transition:none}
}
.xr-wrap{display:block!important;min-width:300px;max-width:700px;line-height:1.6;padding-bottom:4px}
.xr-header{padding-top:6px;padding-bottom:6px;border-bottom:solid 1px var(--xr-border-color);margin-bottom:4px}
.xr-header>div,.xr-header>ul{display:inline;margin-top:0;margin-bottom:0}
.xr-obj-type,.xr-obj-name{margin-left:2px;margin-right:10px}
.xr-obj-type{color:var(--xr-font-color2)}
.xr-sections{padding-left:0!important;display:grid;grid-template-columns:150px auto auto 1fr 0 20px 0 20px;margin-block-start:0;margin-block-end:0}
.xr-section-item{display:contents}
.xr-section-item>input,.xr-var-item>input{display:block;opacity:0;height:0;margin:0}
.xr-section-item>input+label,.xr-var-item>input+label{color:var(--xr-disabled-color)}
.xr-section-item>input:enabled+label,.xr-var-item>input:enabled+label{cursor:pointer;color:var(--xr-font-color2)}
.xr-section-item>input:enabled+label:hover,.xr-var-item>input:enabled+label:hover{color:var(--xr-font-color0)}
.xr-section-summary{grid-column:1;color:var(--xr-font-color2);font-weight:500;white-space:nowrap}
.xr-section-summary>span{display:inline-block;padding-left:.3em}
.xr-section-summary-in:disabled+label{color:var(--xr-font-color2)}
/* The marker is drawn, not a triangle codepoint: a glyph is whatever the reader's font makes of
   it - filled, hollow, resized, or a replacement box. It rotates when open, so there is one shape. */
.xr-section-summary-in+label:before{display:inline-block;content:"";width:0;height:0;margin:0 4px;border-style:solid;border-width:4px 0 4px 7px;border-color:transparent transparent transparent currentColor;vertical-align:-1px;transition:transform .15s ease}
.xr-section-summary-in:disabled+label:before{color:var(--xr-disabled-color)}
.xr-section-summary-in:checked+label:before{transform:rotate(90deg)}
.xr-section-summary-in:checked+label>span{display:none}
.xr-section-summary,.xr-section-inline-details{padding-top:4px}
.xr-section-inline-details{grid-column:2/-1}
.xr-section-details{grid-column:1/-1;margin-top:4px;margin-bottom:5px}
.xr-section-summary-in~.xr-section-details{display:none}
.xr-section-summary-in:checked~.xr-section-details{display:contents}
.xr-array-wrap{grid-column:1/-1;display:grid;grid-template-columns:20px auto}
.xr-array-wrap>label{grid-column:1;vertical-align:top}
.xr-preview{color:var(--xr-font-color3)}
.xr-array-preview,.xr-array-data{padding:0 5px!important;grid-column:2}
.xr-array-data,.xr-array-in:checked~.xr-array-preview{display:none}
.xr-array-in:checked~.xr-array-data,.xr-array-preview{display:inline-block}
.xr-dim-list{display:inline-block!important;list-style:none;padding:0!important;margin:0}
.xr-dim-list li{display:inline-block;padding:0;margin:0}
.xr-dim-list:before{content:"("}
.xr-dim-list:after{content:")"}
.xr-dim-list li:not(:last-child):after{content:",";padding-right:5px}
.xr-has-index{font-weight:bold}
.xr-var-list,.xr-var-item{display:contents}
.xr-var-item>div,.xr-var-item label,.xr-var-item>.xr-var-name span{background-color:var(--xr-background-color-row-even);border-color:var(--xr-background-color-row-odd);margin-bottom:0;padding-top:2px}
.xr-var-list>li:nth-child(odd)>div,.xr-var-list>li:nth-child(odd)>label,.xr-var-list>li:nth-child(odd)>.xr-var-name span{background-color:var(--xr-background-color-row-odd);border-color:var(--xr-background-color-row-even)}
.xr-var-name{grid-column:1}
.xr-var-dims{grid-column:2}
.xr-var-dtype{grid-column:3;text-align:right;color:var(--xr-font-color2)}
.xr-var-preview{grid-column:4}
.xr-index-preview{grid-column:2/5;color:var(--xr-font-color2)}
.xr-var-name,.xr-var-dims,.xr-var-dtype,.xr-preview,.xr-attrs dt{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:10px}
.xr-var-name:hover,.xr-var-dims:hover,.xr-var-dtype:hover,.xr-attrs dt:hover{overflow:visible;width:auto;z-index:1}
.xr-var-attrs,.xr-var-data,.xr-index-data{display:none;border-top:2px dotted var(--xr-background-color);padding-bottom:20px!important;padding-top:10px!important}
.xr-var-attrs-in:checked~.xr-var-attrs,.xr-var-data-in:checked~.xr-var-data{display:block}
.xr-var-data>table{float:right}
.xr-var-data>pre,.xr-var-data>table>tbody>tr{background-color:transparent!important}
.xr-var-name span,.xr-var-data,.xr-attrs{padding-left:25px!important}
.xr-attrs,.xr-var-attrs,.xr-var-data,.xr-index-data{grid-column:1/-1}
dl.xr-attrs{padding:0;margin:0;display:grid;grid-template-columns:125px auto}
.xr-attrs dt,.xr-attrs dd{padding:0;margin:0;float:left;padding-right:10px;width:auto}
.xr-attrs dt{font-weight:normal;grid-column:1}
.xr-attrs dd{grid-column:2;white-space:pre-wrap;word-break:break-all}
.xr-icons{position:absolute;width:0;height:0;overflow:hidden}
.xr-icon-database,.xr-icon-file-text2{display:inline-block;vertical-align:middle;width:1em;height:1.5em!important;stroke-width:0;stroke:currentColor;fill:currentColor}
.xr-var-attrs-in:checked+label>.xr-icon-file-text2,.xr-var-data-in:checked+label>.xr-icon-database{color:var(--xr-font-color0);filter:drop-shadow(1px 1px 5px var(--xr-font-color2));stroke-width:.8px}
.xr-var-item>input+label{cursor:pointer;color:var(--xr-font-color2);padding:0 1px}
`,ce=!1;function Ui(e={}){if(ce||typeof document>"u")return;ce=!0;let t=typeof window<"u"?window.MAIN_COLOR:void 0,i=(e.mainColor??t??"#9b7a52").replace(/^#/,""),r=parseInt(i.slice(0,2),16),n=parseInt(i.slice(2,4),16),a=parseInt(i.slice(4,6),16),o=l=>`rgb(${Math.min(255,r*l|0)},${Math.min(255,n*l|0)},${Math.min(255,a*l|0)})`,s=(l,g)=>`rgba(${Math.min(255,r*l|0)},${Math.min(255,n*l|0)},${Math.min(255,a*l|0)},${g})`,d=`rgb(${255-r},${255-n},${255-a})`,c=`
    :root{--xr-chunk-face:${o(.85)};--xr-chunk-top:${o(1.25)};--xr-chunk-side:${o(.55)};--xr-chunk-edge:${d}}
    html[data-theme="dark"],body[data-theme="dark"],body.vscode-dark{
      --xr-chunk-face:${s(.85,.65)};--xr-chunk-top:${s(1.25,.65)};--xr-chunk-side:${s(.55,.65)};--xr-chunk-edge:${d}
    }
  `+ji;try{if(typeof CSSStyleSheet=="function"&&Array.isArray(document.adoptedStyleSheets)){let l=new CSSStyleSheet;l.replaceSync(c),document.adoptedStyleSheets=[...document.adoptedStyleSheets,l];return}}catch{}let u=document.createElement("style");u.setAttribute("data-xarray-repr","1"),u.textContent=c,document.head.appendChild(u)}async function ue(e,t={}){t.injectCss!==!1&&Ui({mainColor:t.mainColor});let i=await Ai(e,{getAuthHeaders:t.getAuthHeaders,signal:t.signal});return await yi(e,i,{getAuthHeaders:t.getAuthHeaders,signal:t.signal}),Oi(i)}function Li(e){let t=e.trim();return/^https?:\/\//i.test(t)||/\.zarr\/?$/i.test(t)}function kt(e){return Object.keys(e).some(t=>t.toLowerCase()==="authorization")}function he(e){return/\/data-portal\/share\//.test(e)}var Bi=0,pe=5,ge={1:"The data-loader could not convert this data",2:"The data-loader could not find this file",5:"The conversion is gone - it expired, or the data-loader never picked it up",6:"You are not allowed to read this file"};function qi(e,t=300){let i={},r=t;for(let[n,a]of Object.entries(e??{}))if(!(a==null||a===""||a===!1)){if(n==="timeout"){typeof a=="number"&&a>0&&(r=a);continue}i[n]=a}return{options:i,timeoutS:r}}var it=class extends Error{constructor(t,i){super(i),this.name="PortalError",this.status=t}};function Ni(e){return e===401?"Sign in again to continue.":e===403?"Access denied.":e===404?"Not found.":e===429?"Rate-limited - wait a moment and try again.":e>=500?"Service error - try again.":`Request failed (${e}).`}function Di(e,t){return new Promise(i=>{let r=setTimeout(i,e);t.addEventListener("abort",()=>{clearTimeout(r),i()},{once:!0})})}function Hi(e,t={}){let i=t.dataPortalBase?t.dataPortalBase.replace(/\/+$/,""):null,r=i!==null&&t.dataLoader!==!1,n=t.isStore??Li,a=t.shareTtlSeconds??3600,o=t.pollMs??1500,s=t.startupGraceMs??3e4,d=typeof t.signIn=="function"?t.signIn:null,c=h=>ot(t.getAuthHeaders,h),u=0,l=null,g=!1;async function f(h,p,v){let x=`${i}${h}`,_={...await c(x)};p.body!==void 0&&(_["Content-Type"]="application/json");let b=await fetch(x,{method:p.method??"GET",credentials:"same-origin",headers:_,...p.body!==void 0?{body:JSON.stringify(p.body)}:{},signal:v});if(!b.ok){let M="";try{let S=await b.clone().json();typeof S.detail=="string"&&(M=S.detail)}catch{}let $=Ni(b.status);throw new it(b.status,M&&!$.includes(M)?`${$} ${M}`:$)}return await b.json()}async function m(h,p){if(g)return;let v=++u;l?.abort();let x=new AbortController;l=x;let _=()=>g||v!==u,b=(Array.isArray(h)?h:[h]).map(C=>String(C).trim()).filter(Boolean);if(!b.length)return;let{options:M,timeoutS:$}=qi(p,t.timeoutSeconds??300),S=Array.isArray(h);S&&"aggregationConfig"in e&&(e.aggregationConfig=p??null);let A=S?JSON.stringify(b):b[0];e.getAttribute("file")!==A&&e.setAttribute("file",A),e.hasAttribute("is-aggregation")!==S&&(S?e.setAttribute("is-aggregation",""):e.removeAttribute("is-aggregation")),!S&&"loadOptions"in e&&(e.loadOptions=p??null),e.error=null;for(let C of["error-action","zarr-status-code","viewer-disabled"])e.removeAttribute(C);e.setAttribute("status","loading");let U=b.length>1?"Aggregating these files":"This file isn\u2019t a zarr store - inspecting it",k=(C,L=!1)=>{_()||(e.error=C,L&&d&&e.setAttribute("error-action","Sign in"),e.setAttribute("status","error"))},D=async C=>{let L="the server did not return one";if(i)try{let q=await f("/share-zarr",{method:"POST",body:{path:C,ttl_seconds:a}},x.signal);if(typeof q?.url=="string"&&q.url)return q.url}catch(q){q instanceof it&&(L=`the server answered ${q.status}`)}else L="no data-portal is configured to make one";return _()||e.setAttribute("viewer-disabled",`The 3D viewer needs a share link for this protected store, and none could be made (${L}). Load it again to retry.`),C},N="",B=null,R=!1,ft=async C=>{let L=await c(C);return kt(L)&&(R=!0),L};if(b.length===1&&!Object.keys(M).length&&n(b[0])){e.setAttribute("zarr-url",b[0]);try{let C=await ue(b[0],{getAuthHeaders:ft,signal:x.signal});if(_())return;if(R&&!he(b[0])){let L=await D(b[0]);if(_())return;e.setAttribute("zarr-url",L)}e.output=C,e.setAttribute("status","ready");return}catch(C){if(_())return;N=C instanceof Error?C.message:String(C),B=C instanceof at?C.status:null,e.removeAttribute("zarr-url")}}if(B===401||B===403){let C=r&&kt(await c(`${i}/zarr/convert`));if(_())return;if(!C){R?B===401?k("This store did not accept your sign-in (401) - sign in again to continue.",!0):k("You are not allowed to read this store (403)."):k(`This store needs sign-in (it answered ${B}).`,!0);return}}if(!r){let C=N?` (${N})`:"",L=i?"the data-portal's conversion is not enabled here":"no data-portal is configured";k(b.length>1?`Aggregating these files needs the data-portal's conversion, and ${L}.`:`This could not be read as a zarr store${C}, and ${L} to convert it.`);return}let st=kt(await c(`${i}/zarr/convert`));if(!_()){if(!st){k(`${U} needs sign-in`,!0);return}e.setAttribute("zarr-status-code","3");try{let C={...M,path:b.length===1?b[0]:b,...b.length>1&&!M.aggregate?{aggregate:"auto"}:{}},{urls:L}=await f("/zarr/convert",{method:"POST",body:C},x.signal);if(_())return;let q=Array.isArray(L)?L[0]:void 0;if(typeof q!="string"||!q)throw new Error("The data-loader returned no store URL.");let ze=he(q)?q:await D(q);if(_())return;e.setAttribute("zarr-url",ze);let Nt=Date.now(),Ae=Nt+$*1e3,Dt=!1;for(;;){let Q=await f(`/zarr-utils/status?url=${encodeURIComponent(q)}&timeout=1`,{},x.signal);if(_())return;let G=typeof Q.status=="number"?Q.status:pe;if(G===Bi){e.setAttribute("zarr-status-code","0");break}let mt=G===pe&&!Dt&&Date.now()-Nt<s;if(!mt&&G in ge){e.setAttribute("zarr-status-code",String(G));let Me=typeof Q.reason=="string"&&Q.reason?`: ${Q.reason}`:".";throw new Error(`${ge[G]}${Me}`)}if(mt||(Dt=!0),e.setAttribute("zarr-status-code",String(mt?3:G)),Date.now()>Ae)throw new Error(`The conversion did not finish within ${$} s - try again, or raise the timeout.`);if(await Di(o,x.signal),_())return}let Ce=await ue(q,{getAuthHeaders:c,signal:x.signal});if(_())return;e.output=Ce,e.setAttribute("status","ready")}catch(C){if(_()||x.signal.aborted)return;if((C instanceof it||C instanceof at)&&C.status===401){k(`${U} needs sign-in - your session has ended`,!0);return}k(C instanceof Error?C.message:String(C))}}}let w=h=>{let p=h.detail,v=p?.file,x=p!=null&&p.aggregationConfig&&typeof p.aggregationConfig=="object"?p.aggregationConfig:null;(typeof v=="string"||Array.isArray(v))&&m(v,x)},y=()=>{d?.()};return e.addEventListener("inspector-submit",w),e.addEventListener("inspector-error-action",y),{load:m,detach(){g||(g=!0,l?.abort(),e.removeEventListener("inspector-submit",w),e.removeEventListener("inspector-error-action",y))}}}export{$t as AggregationConfigElement,zt as DataInspectorElement,P as NcDumpDialogState,At as ZarrLoadingStepsElement,at as ZarrMetadataError,Gt as ZarrPoller,Hi as attachInspector,Oi as buildXarrayRepr,qi as convertOptions,Fi as detectZarrStore,Ui as injectXarrayCss,ue as loadZarrMetadataHtml,Li as looksLikeStore,Ai as openDatasetMeta,Ri as scopedBearerAuth};
