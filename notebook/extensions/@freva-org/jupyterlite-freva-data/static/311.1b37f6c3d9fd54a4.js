"use strict";(self.rspackChunk_freva_org_jupyterlite_freva_data=self.rspackChunk_freva_org_jupyterlite_freva_data||[]).push([[311],{778(t,e,i){i.r(e);let r=`<svg viewBox="0 0 448 512" width="10" height="10" style="vertical-align:middle;">
  <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667
    c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335
    24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941
    L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" fill="currentColor"/>
</svg>`,a=`<svg viewBox="0 0 256 512" width="6" height="10" style="vertical-align:middle;">
  <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6
    0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4
    24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" fill="currentColor"/>
</svg>`,n={aggregate:"auto",join:null,compat:null,data_vars:null,coords:null,dim:"",group_by:"",reload:!1,access_pattern:"map",chunk_size:16,map_primary_chunksize:1,timeout:120};function o(t){return String(t??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}class s extends HTMLElement{constructor(){super(...arguments),this._config={...n},this._showAdvanced=!1,this._handleChange=t=>{let e,i=t.target,r=i.dataset.field;if(r){if("checkbox"===i.type)e=i.checked;else if("number"===i.type){let t=parseFloat(i.value);e=Number.isFinite(t)?t:parseInt(i.value,10)}else e=""===i.value?null:i.value;this._config={...this._config,[r]:e},this._emitChange(),this._updateConditionals()}},this._handleClick=t=>{if(t.target.closest("#nc-advanced-toggle")){this._showAdvanced=!this._showAdvanced;let t=this.querySelector(".nc-advanced"),e=this.querySelector(".nc-chevron");t&&(t.style.display=this._showAdvanced?"block":"none"),e&&(e.innerHTML=this._showAdvanced?r:a)}}}connectedCallback(){try{let t=JSON.parse(this.getAttribute("initial-config")??"{}");this._config={...n,...t}}catch{this._config={...n}}this._render(),this.addEventListener("change",this._handleChange),this.addEventListener("click",this._handleClick)}get config(){return{...this._config}}set config(t){if(this._config={...n,...t??{}},!this.isConnected)return;this._render();let e=this._config;this.querySelectorAll("[data-field]").forEach(t=>{let i=e[t.dataset.field??""];t instanceof HTMLInputElement&&"checkbox"===t.type?t.checked=!!i:t.value=null==i?"":String(i)})}disconnectedCallback(){this.removeEventListener("change",this._handleChange),this.removeEventListener("click",this._handleClick)}_emitChange(){this.dispatchEvent(new CustomEvent("config-change",{bubbles:!0,composed:!0,detail:this._config}))}_updateConditionals(){let t=this.querySelector(".nc-dim-field"),e=this.querySelector(".nc-map-chunksize");t&&(t.style.display="concat"===this._config.aggregate?"block":"none"),e&&(e.style.display="map"===this._config.access_pattern?"block":"none")}_render(){let t=this._config;this.innerHTML=`
      <div class="aggregation-config">

        \x3c!-- Aggregation Method --\x3e
        <div class="mb-3">
          <label class="form-label fw-semibold">Aggregation Method</label>
          <select class="form-select form-select-sm" data-field="aggregate">
            <option value="auto"   ${"auto"===t.aggregate?"selected":""}>Auto (Detect automatically)</option>
            <option value="merge"  ${"merge"===t.aggregate?"selected":""}>Merge (Combine variables)</option>
            <option value="concat" ${"concat"===t.aggregate?"selected":""}>Concat (Join along dimension)</option>
          </select>
          <div class="form-text text-muted">Auto mode will automatically detect the best aggregation method</div>
        </div>

        \x3c!-- Timeout --\x3e
        <div class="mb-3">
          <label class="form-label fw-semibold">Timeout (seconds)</label>
          <input type="number" class="form-control form-control-sm"
            data-field="timeout" min="10" max="3600" value="${o(t.timeout??120)}">
          <div class="form-text text-muted">
            Max wait time for the aggregation to complete (default: 120 s). Increase for large datasets.
          </div>
        </div>

        \x3c!-- Advanced Toggle --\x3e
        <button type="button" id="nc-advanced-toggle"
          class="btn btn-link btn-sm p-0 mb-3 text-decoration-none">
          <span class="nc-chevron">${this._showAdvanced?r:a}</span>
          <span class="ms-2">Advanced Options</span>
        </button>

        \x3c!-- Advanced Options --\x3e
        <div class="nc-advanced" style="display:${this._showAdvanced?"block":"none"};">

          \x3c!-- Dimension (concat only) --\x3e
          <div class="mb-3 nc-dim-field" style="display:${"concat"===t.aggregate?"block":"none"};">
            <label class="form-label">Dimension to Concatenate Along</label>
            <input type="text" class="form-control form-control-sm"
              data-field="dim" placeholder="e.g., time, ensemble" value="${o(t.dim)}">
            <div class="form-text text-muted">Leave empty to create a new dimension</div>
          </div>

          \x3c!-- Join Mode --\x3e
          <div class="mb-3">
            <label class="form-label">Join Mode</label>
            <select class="form-select form-select-sm" data-field="join">
              <option value=""      ${t.join?"":"selected"}>Default</option>
              <option value="outer" ${"outer"===t.join?"selected":""}>Outer (Union)</option>
              <option value="inner" ${"inner"===t.join?"selected":""}>Inner (Intersection)</option>
              <option value="left"  ${"left"===t.join?"selected":""}>Left</option>
              <option value="right" ${"right"===t.join?"selected":""}>Right</option>
              <option value="exact" ${"exact"===t.join?"selected":""}>Exact (Must match)</option>
            </select>
          </div>

          \x3c!-- Compatibility Mode --\x3e
          <div class="mb-3">
            <label class="form-label">Compatibility Mode</label>
            <select class="form-select form-select-sm" data-field="compat">
              <option value=""              ${t.compat?"":"selected"}>Default</option>
              <option value="no_conflicts"  ${"no_conflicts"===t.compat?"selected":""}>No Conflicts</option>
              <option value="equals"        ${"equals"===t.compat?"selected":""}>Equals</option>
              <option value="override"      ${"override"===t.compat?"selected":""}>Override</option>
            </select>
          </div>

          \x3c!-- Data Variables --\x3e
          <div class="mb-3">
            <label class="form-label">Data Variables Handling</label>
            <select class="form-select form-select-sm" data-field="data_vars">
              <option value=""          ${t.data_vars?"":"selected"}>Default</option>
              <option value="minimal"   ${"minimal"===t.data_vars?"selected":""}>Minimal</option>
              <option value="different" ${"different"===t.data_vars?"selected":""}>Different</option>
              <option value="all"       ${"all"===t.data_vars?"selected":""}>All</option>
            </select>
          </div>

          \x3c!-- Coordinates --\x3e
          <div class="mb-3">
            <label class="form-label">Coordinates Handling</label>
            <select class="form-select form-select-sm" data-field="coords">
              <option value=""          ${t.coords?"":"selected"}>Default</option>
              <option value="minimal"   ${"minimal"===t.coords?"selected":""}>Minimal</option>
              <option value="different" ${"different"===t.coords?"selected":""}>Different</option>
              <option value="all"       ${"all"===t.coords?"selected":""}>All</option>
            </select>
          </div>

          \x3c!-- Group By --\x3e
          <div class="mb-3">
            <label class="form-label">Group By (Optional)</label>
            <input type="text" class="form-control form-control-sm"
              data-field="group_by" placeholder="e.g., ensemble, variable" value="${o(t.group_by)}">
            <div class="form-text text-muted">Group files by a specific attribute</div>
          </div>

          \x3c!-- Reload Cache --\x3e
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

          \x3c!-- Access Pattern --\x3e
          <div class="mb-3">
            <label class="form-label">Access Pattern Optimization</label>
            <select class="form-select form-select-sm" data-field="access_pattern">
              <option value="map"         ${"map"===t.access_pattern?"selected":""}>Map (spatial slices)</option>
              <option value="time_series" ${"time_series"===t.access_pattern?"selected":""}>Time Series (temporal slices)</option>
            </select>
            <div class="form-text text-muted">Optimize chunk layout for your typical data access pattern</div>
          </div>

          \x3c!-- Chunk Size --\x3e
          <div class="mb-3">
            <label class="form-label">Target Chunk Size (MB)</label>
            <input type="number" class="form-control form-control-sm"
              data-field="chunk_size" step="0.1" min="1" max="1000" value="${o(t.chunk_size??16)}">
            <div class="form-text text-muted">Target size for data chunks (default: 16 MB)</div>
          </div>

          \x3c!-- Map Primary Chunksize (map pattern only) --\x3e
          <div class="mb-3 nc-map-chunksize" style="display:${"map"===t.access_pattern?"block":"none"};">
            <label class="form-label">Primary Dimension Chunk Size</label>
            <input type="number" class="form-control form-control-sm"
              data-field="map_primary_chunksize" min="1" value="${o(t.map_primary_chunksize??1)}">
            <div class="form-text text-muted">Number of time steps per chunk (for map access pattern)</div>
          </div>

        </div>
      </div>`}}let l={ERROR:"error",READY:"ready",LOADING:"loading"},d={aggregate:"auto",join:null,compat:null,data_vars:null,coords:null,dim:"",group_by:"",reload:!1,access_pattern:"map",chunk_size:16,map_primary_chunksize:1,timeout:120};function c(t){return`https://gridlook.pages.dev/#${t}`}function u(t,e=!1){return`<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" style="vertical-align:-0.14em;flex-shrink:0${e?";margin-right:.5em":""}">${t}</svg>`}let h='<path d="M9.5 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 1 0-5.7-5.7l-1 1"/><path d="M14.5 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 1 0 5.7 5.7l1-1"/>',p='<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',g='<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',f='<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"/>',m='<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 4v4h-4"/>',b=`
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
.di-agg-form h5{margin:0 0 12px;font-size:1.05rem;font-weight:600;}
.di-agg-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:12px;}
.di-empty-ico{font-size:40px;color:var(--_di-border);margin-bottom:12px;display:block;}
.di-empty-text{color:var(--_di-muted);font-size:13px;padding:0 12px;}
[hidden]{display:none!important;}
`,v=!1;class x extends HTMLElement{constructor(){super(...arguments),this._pathInput="",this._loadOptions=null,this._copied=!1,this._gridlookCopied=!1,this._activeTab="metadata",this._dropdownOpen=!1,this._aggregationConfig={...d},this._output=null,this._built=!1,this._builtMode=!1,this._domOutput=void 0,this._domIframeUrl=void 0,this._domFileKey=void 0,this._copyTimer=null,this._gridlookTimer=null,this._restoreFocusTo=null,this._onOutsideClick=t=>{let e=this.querySelector("#nc-dropdown-wrap");e&&!e.contains(t.target)&&this._dropdownOpen&&(this._dropdownOpen=!1,this._syncDropdown())}}static get observedAttributes(){return["open","file","status","error","zarr-url","zarr-status-code","is-aggregation","error-action","viewer-disabled","viewer-off","embedded","view"]}get embedded(){return this.hasAttribute("embedded")}set embedded(t){t?this.setAttribute("embedded",""):this.removeAttribute("embedded")}get view(){return"viewer"===this.getAttribute("view")?"viewer":"metadata"}set view(t){this.setAttribute("view",t)}get activeView(){return"gridlook"===this._activeTab&&this._viewerAvailable()?"viewer":"metadata"}_viewerAvailable(){return this.open&&this.status===l.READY&&null!=this._output&&""!==this._output&&!!this.zarrUrl&&null===this._viewerBlocked()}_viewerBlocked(){return this.hasAttribute("viewer-off")?this.getAttribute("viewer-off")||"The 3D viewer is not available here.":this.getAttribute("viewer-disabled")}_requestedTab(){return"viewer"===this.view?"gridlook":"metadata"}get open(){return this.hasAttribute("open")}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}get file(){let t=this.getAttribute("file");if(!t)return null;try{return JSON.parse(t)}catch{return t}}set file(t){null===t?this.removeAttribute("file"):this.setAttribute("file",Array.isArray(t)?JSON.stringify(t):t)}get status(){return this.getAttribute("status")??l.READY}set status(t){this.setAttribute("status",t)}get output(){return this._output}set output(t){this._output=t,this.isConnected&&this._render()}get error(){return this.getAttribute("error")}set error(t){null===t?this.removeAttribute("error"):this.setAttribute("error",t)}get zarrUrl(){return this.getAttribute("zarr-url")}set zarrUrl(t){null===t?this.removeAttribute("zarr-url"):this.setAttribute("zarr-url",t)}get zarrStatusCode(){let t=this.getAttribute("zarr-status-code");return null===t?null:parseInt(t,10)}set zarrStatusCode(t){null===t?this.removeAttribute("zarr-status-code"):this.setAttribute("zarr-status-code",String(t))}get loadOptions(){return this._loadOptions?{...this._loadOptions}:null}set loadOptions(t){this._loadOptions=t&&Object.keys(t).length?{...t}:null}get aggregationConfig(){return{...this._aggregationConfig}}set aggregationConfig(t){let e=t?{...t}:{...d};if(JSON.stringify(e)===JSON.stringify(this._aggregationConfig))return;this._aggregationConfig=e;let i=this._q("#nc-agg-config");i&&(i.setAttribute("initial-config",JSON.stringify(e)),"config"in i&&(i.config=e))}get isAggregation(){return this.hasAttribute("is-aggregation")}set isAggregation(t){t?this.setAttribute("is-aggregation",""):this.removeAttribute("is-aggregation")}connectedCallback(){let t=this.file;t&&!Array.isArray(t)&&(this._pathInput=t),this.open&&(this._restoreFocusTo=document.activeElement),this._render(),document.addEventListener("mousedown",this._onOutsideClick)}disconnectedCallback(){document.removeEventListener("mousedown",this._onOutsideClick),this._clearTimers()}attributeChangedCallback(t,e,i){var r,a;if("open"===t&&null!==i){null===this._restoreFocusTo&&(this._restoreFocusTo=document.activeElement),this._activeTab=this._requestedTab(),this._copied=!1,this._gridlookCopied=!1;let t=this.file;t&&null===this._output&&this.status===l.READY&&!this.isAggregation&&this._emit("inspector-submit",{file:t,aggregationConfig:null})}if("file"===t){if(i&&!i.startsWith("[")){this._pathInput=i;let t=this._q("#nc-path-input");t&&t.value!==i&&(t.value=i)}null!==e&&e!==i&&(this._loadOptions=null,this._output=null,this._domOutput=void 0,this._activeTab=this._requestedTab(),this._copied=!1,this._gridlookCopied=!1,this.hasAttribute("error")&&this.removeAttribute("error"),this.hasAttribute("zarr-url")&&this.removeAttribute("zarr-url"))}if("view"===t&&(this._activeTab=this._requestedTab()),"embedded"===t&&this._built&&(this._built=!1),"status"===t&&i===l.ERROR&&(this._activeTab="metadata"),"zarr-status-code"===t&&this.isConnected&&this._built){let t=i??"3";null==(r=this.querySelector("#nc-pre-steps"))||r.setAttribute("status-code",t),null==(a=this.querySelector("#nc-body-steps"))||a.setAttribute("status-code",t);return}this.isConnected&&this._render()}_emit(t,e){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:e}))}_clearTimers(){null!==this._copyTimer&&(clearTimeout(this._copyTimer),this._copyTimer=null),null!==this._gridlookTimer&&(clearTimeout(this._gridlookTimer),this._gridlookTimer=null)}_handleInspect(){this.isAggregation?this._emit("inspector-submit",{file:this.file,aggregationConfig:{...this._aggregationConfig}}):this._pathInput.trim()&&this._emit("inspector-submit",{file:this._pathInput.trim(),aggregationConfig:null})}_handleRetry(){let t=this._pathInput.trim();if(this.isAggregation||!t)return void this._handleInspect();let e=t===this.getAttribute("file");this._emit("inspector-submit",{file:t,aggregationConfig:e&&this._loadOptions?{...this._loadOptions}:null})}_handleInspectReload(){this._dropdownOpen=!1,this._syncDropdown(),this._pathInput.trim()&&this._emit("inspector-submit",{file:this._pathInput.trim(),aggregationConfig:{reload:!0}})}_copy(t,e){var i;let r;(null!=(i=(r=navigator).clipboard)&&i.writeText?r.clipboard.writeText(t):new Promise((e,i)=>{try{let i=document.createElement("textarea");i.value=t,i.style.position="fixed",i.style.opacity="0",document.body.appendChild(i),i.focus(),i.select(),document.execCommand("copy"),document.body.removeChild(i),e()}catch(t){i(t instanceof Error?t:Error(String(t)))}})).then(()=>{"zarr"===e?this._copied=!0:this._gridlookCopied=!0,this.open&&this._update();let t=setTimeout(()=>{"zarr"===e?this._copied=!1:this._gridlookCopied=!1,this.isConnected&&this.open&&this._update()},2e3);"zarr"===e?this._copyTimer=t:this._gridlookTimer=t}).catch(()=>{})}_render(){this.open?(this._built&&this._builtMode===this.isAggregation||(this._domOutput=void 0,this._domIframeUrl=void 0,this._build()),this._update()):this._teardown()}_teardown(){this._clearTimers(),this.innerHTML="",this._built=!1,this._domOutput=void 0,this._domIframeUrl=void 0,this._domFileKey=void 0;let t=this._restoreFocusTo;this._restoreFocusTo=null,t&&t.isConnected&&"function"==typeof t.focus&&t.focus()}_q(t){return this.querySelector(t)}_toggle(t,e){t&&(t.hidden=!e)}_setCopyBtn(t,e,i){let r=this._q(t);r&&(r.setAttribute("title",e?"Copied!":i),r.innerHTML=u(e?'<path d="M20 6 9 17l-5-5"/>':p))}_build(){!function(){if(v||typeof document>"u")return;v=!0;try{if("function"==typeof CSSStyleSheet&&Array.isArray(document.adoptedStyleSheets)){let t=new CSSStyleSheet;t.replaceSync(b),document.adoptedStyleSheets=[...document.adoptedStyleSheets,t];return}}catch{}let t=document.createElement("style");t.setAttribute("data-data-inspector","1"),t.textContent=b,document.head.appendChild(t)}();let t=this.isAggregation;this._builtMode=t,this._domOutput=void 0,this._domIframeUrl=void 0,this._domFileKey=void 0;let e=`
      <div class="di-header">
        <div class="di-header-row">
          <div class="di-header-main">
            <h1 class="di-title">
              <span class="di-title-ico">${u(t?'<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="m3 13 9 5 9-5"/>':'<circle cx="12" cy="12" r="9"/><path d="M12 11.5v5"/><circle cx="12" cy="7.8" r="0.6" fill="currentColor" stroke="none"/>')}</span>
              <span id="nc-title">${t?"Aggregate Files":"File Inspector"}</span>
            </h1>
            ${t?`<div id="nc-file-list-wrap" class="di-file-list" hidden>
                     <div id="nc-file-list-label" class="di-file-list-label"></div>
                     <ul id="nc-file-list"></ul>
                   </div>`:this._pathBarHtml()}
            <div id="nc-zarr-row" class="di-zarr-row" hidden>
              <div class="di-zarr-inner">
                <span class="di-muted" style="display:inline-flex;flex-shrink:0">${u(h)}</span>
                <span class="di-muted" style="font-weight:500;flex-shrink:0">Zarr:</span>
                <code id="nc-zarr-url" class="di-code"></code>
                <button id="nc-copy-zarr" class="di-btn di-btn-outline" title="Copy Zarr URL">${u(p)}</button>
              </div>
            </div>
          </div>
          <button id="nc-close-btn" class="di-close" aria-label="Close">&times;</button>
        </div>
      </div>`,i=t?`<div id="nc-agg-form" class="di-agg-form" hidden>
           <h5>Aggregation Configuration</h5>
           <aggregation-config id="nc-agg-config"></aggregation-config>
           <div class="di-agg-actions">
             <button id="nc-cancel-btn" class="di-btn di-btn-secondary">Cancel</button>
             <button id="nc-aggregate-btn" class="di-btn di-btn-primary">${u('<path d="M9 5v4H5"/><path d="m4 4 5 5"/><path d="M15 5v4h4"/><path d="m20 4-5 5"/><path d="M9 19v-4H5"/><path d="m4 20 5-5"/><path d="M15 19v-4h4"/><path d="m20 20-5-5"/>',!0)}Aggregate Files</button>
           </div>
         </div>`:"",r=`
      <div id="nc-pre-loading" class="di-center" hidden>
        <zarr-loading-steps id="nc-pre-steps" status-code="3"${t?" is-aggregation":""}></zarr-loading-steps>
        <p id="nc-pre-loading-text" class="di-muted" style="margin-top:12px;font-size:13px;"></p>
      </div>`,a=`
      <div id="nc-tabs-wrap" hidden>
        <div class="di-tabs" role="tablist" aria-label="Inspector views">
          <button id="nc-tab-metadata" data-tab="metadata" class="nc-tab-btn di-tab" role="tab" aria-controls="nc-metadata" aria-selected="true">${u(g,!0)}Metadata</button>
          <button id="nc-tab-gridlook" data-tab="gridlook" class="nc-tab-btn di-tab" role="tab" aria-controls="nc-gridlook" aria-selected="false">${u('<path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3Z"/><path d="m3 7.5 9 4.5 9-4.5"/><path d="M12 12v9"/>',!0)}3D Viewer</button>
        </div>
        <div id="nc-body" class="di-body">
          <div id="nc-error" class="di-error" hidden>
            <div class="di-error-row">
              <span class="di-error-ico">${u('<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5"/><circle cx="12" cy="16.3" r="0.6" fill="currentColor" stroke="none"/>')}</span>
              <div class="di-error-body">
                <strong class="di-error-title">Error loading metadata</strong>
                <div id="nc-error-msg" class="di-error-msg"></div>
                <div class="di-error-actions">
                  <button id="nc-retry-btn" class="di-btn di-btn-danger">${u(m,!0)}Retry</button>
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
                <span class="di-gridlook-ico">${u(f)}</span>
                <span class="di-gridlook-label">GridLook URL:</span>
                <code id="nc-gridlook-url" class="di-gridlook-code"></code>
                <button id="nc-copy-gridlook" class="di-btn di-gridlook-btn" title="Copy link">${u(p)}</button>
                <button id="nc-refresh-gridlook" class="di-btn di-gridlook-btn" title="Refresh GridLook viewer">${u(m)}</button>
                <button id="nc-open-gridlook" class="di-btn di-gridlook-btn-primary" title="Open in new tab">${u(f,!0)}Open in New Tab</button>
              </div>
            </div>
            <div id="nc-gridlook-frame" class="di-gridlook-frame"></div>
          </div>

          <div id="nc-empty-body" class="di-center" hidden>
            <span class="di-empty-ico">${u(g)}</span>
            <p id="nc-empty-body-text" class="di-empty-text"></p>
          </div>
        </div>
      </div>`,n=`
      <div id="nc-empty-main" class="di-center" hidden>
        <span class="di-empty-ico">${u(g)}</span>
        <p id="nc-empty-main-text" class="di-empty-text"></p>
      </div>`;this.innerHTML=this.embedded?`
      <div class="di-embedded">
        <div id="nc-zarr-row" class="di-zarr-row" hidden>
          <div class="di-zarr-inner">
            <span class="di-muted" style="display:inline-flex;flex-shrink:0">${u(h)}</span>
            <span class="di-muted" style="font-weight:500;flex-shrink:0">Zarr:</span>
            <code id="nc-zarr-url" class="di-code"></code>
            <button id="nc-copy-zarr" class="di-btn di-btn-outline" title="Copy Zarr URL">${u(p)}</button>
          </div>
        </div>
        ${i}
        ${r}
        ${a}
        ${n}
      </div>`:`
      <div id="nc-backdrop" class="di-backdrop">
        <div class="di-modal" role="dialog" aria-modal="true" aria-labelledby="nc-title" tabindex="-1">
          ${e}
          ${i}
          ${r}
          ${a}
          ${n}
        </div>
      </div>`;let o=this._q("#nc-agg-config");o&&(o.setAttribute("initial-config",JSON.stringify(this._aggregationConfig)),"config"in o&&(o.config=this._aggregationConfig)),this._built=!0,this._attach(),this.embedded||this._initialFocus()}_ensureIframe(){let t=this._q("#nc-gridlook-iframe");if(t)return t;let e=this._q("#nc-gridlook-frame");if(!e)return null;let i=document.createElement("iframe");i.id="nc-gridlook-iframe",i.title="GridLook 3D Viewer",i.setAttribute("sandbox","allow-scripts allow-same-origin allow-popups allow-downloads"),i.setAttribute("referrerpolicy","no-referrer"),i.setAttribute("loading","lazy");try{e.appendChild(i)}catch{}return i}_setIframeSrc(t,e){try{t.src=e}catch{}}_pathBarHtml(){return`
      <div class="di-pathbar">
        <label class="di-pathbar-label" for="nc-path-input">File path:</label>
        <div class="di-pathbar-row">
          <input id="nc-path-input" type="text" class="di-input" placeholder="/path/to/data.nc" />
          <div id="nc-dropdown-wrap" class="di-dropdown-wrap di-btn-group">
            <button id="nc-load-btn" class="di-btn di-btn-primary">${u('<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 4v4h-4"/>',!0)}Load</button>
            <button id="nc-load-toggle" class="di-btn di-btn-primary di-btn-split" title="More load options">${u('<path d="m6 9 6 6 6-6"/>')}</button>
            <ul id="nc-dropdown-menu" class="di-menu" hidden>
              <li>
                <button id="nc-reload-btn" class="di-menu-item">${u('<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',!0)}Force Reload (bypass cache)</button>
              </li>
            </ul>
          </div>
        </div>
      </div>`}_attach(){var t,e,i,r,a,n,o,s,l,d,u,h,p,g,f;null==(t=this._q("#nc-backdrop"))||t.addEventListener("click",t=>{t.target===t.currentTarget&&this._emit("inspector-close",null)}),null==(e=this._q("#nc-backdrop"))||e.addEventListener("keydown",t=>this._onKeydown(t)),null==(i=this._q("#nc-close-btn"))||i.addEventListener("click",()=>this._emit("inspector-close",null)),null==(r=this._q("#nc-cancel-btn"))||r.addEventListener("click",()=>this._emit("inspector-close",null)),null==(a=this._q("#nc-load-btn"))||a.addEventListener("click",()=>this._handleInspect()),null==(n=this._q("#nc-aggregate-btn"))||n.addEventListener("click",()=>this._handleInspect()),null==(o=this._q("#nc-retry-btn"))||o.addEventListener("click",()=>this._handleRetry()),null==(s=this._q("#nc-error-action"))||s.addEventListener("click",()=>this._emit("inspector-error-action",null));let m=this._q("#nc-path-input");m&&(m.value=this._pathInput,m.addEventListener("input",t=>{this._pathInput=t.target.value}),m.addEventListener("keypress",t=>{"Enter"===t.key&&this._handleInspect()})),null==(l=this._q("#nc-load-toggle"))||l.addEventListener("click",()=>{this._dropdownOpen=!this._dropdownOpen,this._syncDropdown()}),null==(d=this._q("#nc-reload-btn"))||d.addEventListener("click",()=>this._handleInspectReload()),null==(u=this._q("#nc-copy-zarr"))||u.addEventListener("click",()=>{let t=this.zarrUrl;t&&this._copy(t,"zarr")}),null==(h=this._q("#nc-copy-gridlook"))||h.addEventListener("click",()=>{let t=this.zarrUrl;t&&this._copy(c(t),"gridlook")}),null==(p=this._q("#nc-refresh-gridlook"))||p.addEventListener("click",()=>{var t;this.zarrUrl&&(null==(t=this._q("#nc-gridlook-iframe"))||t.remove(),this._domIframeUrl=void 0,this._update())}),null==(g=this._q("#nc-open-gridlook"))||g.addEventListener("click",()=>{let t=this.zarrUrl;t&&window.open(c(t),"_blank","noopener,noreferrer")}),this.querySelectorAll(".nc-tab-btn").forEach(t=>{t.addEventListener("click",()=>{let e=t.dataset.tab;e&&!t.disabled&&(this._activeTab=e,this._update())})}),null==(f=this._q("#nc-agg-config"))||f.addEventListener("config-change",t=>{this._aggregationConfig=t.detail})}_update(){var t,e;let i=this.isAggregation,r=this.status,a=r===l.LOADING,n=r===l.READY,o=r===l.ERROR,s=this.zarrUrl,d=this.file,u=Array.isArray(d)?d:[],h=null!=this._output&&""!==this._output,p=String(this.zarrStatusCode??3),g=i?"Aggregating files and loading metadata...":"Loading metadata...",f=i?"Configure aggregation settings and click 'Aggregate Files' to begin":"Enter a file path and click Load to inspect metadata";if(i){let t=this._q("#nc-file-list-wrap"),e=u.length>0;if(this._toggle(t,e),e){let t=this._q("#nc-file-list-label");t&&(t.textContent=`Selected files (${u.length}):`);let e=this._q("#nc-file-list"),i=u.join("\0");e&&this._domFileKey!==i&&(e.replaceChildren(...u.map(t=>{let e=document.createElement("li");return e.textContent=t,e})),this._domFileKey=i)}}if(!i){let t=this._q("#nc-load-btn"),e=this._q("#nc-load-toggle");t&&(t.disabled=a),e&&(e.disabled=a),this._syncDropdown()}let m=!!s&&s!==("string"==typeof d?d:null);if(this._toggle(this._q("#nc-zarr-row"),m),m&&s){let t=this._q("#nc-zarr-url");t&&(t.textContent=s)}this._setCopyBtn("#nc-copy-zarr",this._copied,"Copy Zarr URL"),i&&this._toggle(this._q("#nc-agg-form"),n&&!h),this._toggle(this._q("#nc-pre-loading"),!s&&a),this._toggle(this._q("#nc-tabs-wrap"),!!s&&(h||a)||o),this._toggle(this._q("#nc-empty-main"),!s&&!a&&n&&!h);let b=this._q("#nc-pre-loading-text");b&&(b.textContent=g),null==(t=this._q("#nc-pre-steps"))||t.setAttribute("status-code",p);let v=this._viewerBlocked();null!==v&&"gridlook"===this._activeTab&&(this._activeTab="metadata");let x="gridlook"!==this._activeTab||h&&s?this._activeTab:"metadata",y=this._q('[data-tab="metadata"]'),w=this._q('[data-tab="gridlook"]');if(y){let t="metadata"===x;y.classList.toggle("di-tab-active",t),y.setAttribute("aria-selected",String(t))}if(w){let t="gridlook"===x;w.disabled=r!==l.READY||!h||null!==v,v?w.setAttribute("title",v):w.removeAttribute("title"),w.classList.toggle("di-tab-active",t),w.setAttribute("aria-selected",String(t))}this._toggle(this._q("#nc-error"),o&&"metadata"===x);let _=this._q("#nc-error-msg");_&&(_.textContent=this.error??"");let k=this._q("#nc-error-action");if(k){let t=this.getAttribute("error-action");k.hidden=!t,k.textContent=t??""}this._toggle(this._q("#nc-loading"),a);let $=this._q("#nc-loading-text");$&&($.textContent=g),null==(e=this._q("#nc-body-steps"))||e.setAttribute("status-code",p),this._toggle(this._q("#nc-metadata"),"metadata"===x&&h&&!a&&!o);let z=this._q("#nc-metadata-inner");z&&this._domOutput!==this._output&&(z.innerHTML=this._output??"",this._domOutput=this._output);let A="gridlook"===x&&!!s;if(this._toggle(this._q("#nc-gridlook"),A),s){let t=c(s),e=this._q("#nc-gridlook-url");if(e&&(e.textContent=t),A){let e=this._ensureIframe();e&&this._domIframeUrl!==t&&(this._setIframeSrc(e,t),this._domIframeUrl=t)}}this._setCopyBtn("#nc-copy-gridlook",this._gridlookCopied,"Copy link"),this._toggle(this._q("#nc-empty-body"),!h&&!a&&!o);let C=this._q("#nc-empty-body-text");C&&(C.textContent=f);let M=this._q("#nc-empty-main-text");M&&(M.textContent=f)}_syncDropdown(){let t=this._q("#nc-dropdown-menu");t&&(t.hidden=!this._dropdownOpen)}_focusables(){let t=this._q(".di-modal");return t?Array.from(t.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(t=>!t.closest("[hidden]")):[]}_initialFocus(){var t;let e=this._q("#nc-path-input")??this._focusables()[0]??this._q(".di-modal");null==(t=null==e?void 0:e.focus)||t.call(e)}_onKeydown(t){if("Escape"===t.key){t.stopPropagation(),this._emit("inspector-close",null);return}if("Tab"!==t.key)return;let e=this._focusables();if(0===e.length)return void t.preventDefault();let i=e[0],r=e[e.length-1],a=document.activeElement;t.shiftKey&&(a===i||!this.contains(a))?(t.preventDefault(),r.focus()):t.shiftKey||a!==r||(t.preventDefault(),i.focus())}}let y=`
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
`,w=[{id:"submitted",label:"Submitted"},{id:"queued",label:"Queued"},{id:"converting",label:"Converting"},{id:"ready",label:"Ready"}],_="#0d9488",k="#14b8a6",$="#d1d5db",z="#6b7280",A=["Reading file structure…","Analysing coordinate metadata…","Optimising chunk layout…","Building Zarr metadata store…","Assembling data variables…","Applying access-pattern optimisation…","Finalising dataset…"],C=["Aligning coordinate indexes…","Resolving variable conflicts…","Concatenating along dimension…","Merging datasets…","Validating compatibility…","Assembling aggregated store…","Almost there…"];function M(t){return 0===t?3:4===t?2:+(3===t)}function S(t,e,i){let r=t<e,a=t===e,n=r?`<svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M1 4L3.8 7L9 1" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>`:a?`<svg width="16" height="16" viewBox="0 0 16 16" class="zarr-spin" style="position:absolute;">
        <circle cx="8" cy="8" r="5.5" fill="none" stroke="${k}" stroke-width="2"
          stroke-dasharray="18 17" stroke-linecap="round"/>
       </svg>`:`<div style="width:5px;height:5px;border-radius:50%;background:${$};"></div>`,o=a?`<div style="position:absolute;width:30px;height:30px;border-radius:50%;
         border:2px solid ${k};animation:zarrPulseRing 2s ease-out infinite;pointer-events:none;"></div>`:"";return`
    ${t>0?`
    <div style="flex:1;height:2px;background:${r?`linear-gradient(90deg,${_},${k})`:"#e5e7eb"};
      transition:background 0.5s ease;position:relative;overflow:hidden;">
      ${a?`<div style="position:absolute;top:0;left:0;height:100%;
        background:linear-gradient(90deg,${_},${k});
        animation:zarrTrackFill 0.6s ease forwards;"></div>`:""}
    </div>`:""}
    <div style="position:relative;display:flex;flex-direction:column;align-items:center;">
      ${o}
      <div style="width:22px;height:22px;border-radius:50%;
        background:${r?_:a?"#fff":"#f9fafb"};
        border:2px solid ${r?_:a?k:$};
        display:flex;align-items:center;justify-content:center;
        position:relative;z-index:1;
        box-shadow:${a?"0 0 0 4px rgba(20,184,166,0.12)":"none"};
        transition:all 0.4s ease;">
        ${n}
      </div>
      <span style="position:absolute;top:28px;font-size:10.5px;
        font-weight:${a?600:400};
        color:${r?_:a?"#0f766e":"#9ca3af"};
        white-space:nowrap;letter-spacing:0.03em;text-transform:uppercase;
        transition:color 0.4s ease;">
        ${i}
      </span>
    </div>`}class E extends HTMLElement{constructor(){super(...arguments),this._msgIdx=0,this._msgKey=0,this._elapsed=0,this._startTime=Date.now(),this._msgTimer=null,this._elapsedTimer=null}static get observedAttributes(){return["status-code","is-aggregation"]}get statusCode(){return parseInt(this.getAttribute("status-code")??"3",10)}get isAggregation(){return this.hasAttribute("is-aggregation")}connectedCallback(){(function(){if(!document.getElementById("zarr-loading-keyframes")){let t=document.createElement("style");t.id="zarr-loading-keyframes",t.textContent=y,document.head.appendChild(t)}})(),this._render(),this._startTimers()}disconnectedCallback(){this._stopTimers()}attributeChangedCallback(){this.isConnected&&this._updateStages()}_startTimers(){this._startTime=Date.now(),this._elapsedTimer=setInterval(()=>{this._elapsed=Math.floor((Date.now()-this._startTime)/1e3);let t=this.querySelector(".zarr-elapsed");t&&(t.textContent=this._formatElapsed(this._elapsed))},1e3),this._startMsgCycle()}_startMsgCycle(){if(this._msgTimer&&clearInterval(this._msgTimer),2!==M(this.statusCode))return;let t=this.isAggregation?C:A;this._msgTimer=setInterval(()=>{this._msgIdx=(this._msgIdx+1)%t.length,this._msgKey+=1,this._updateMessage()},2800)}_stopTimers(){this._msgTimer&&(clearInterval(this._msgTimer),this._msgTimer=null),this._elapsedTimer&&(clearInterval(this._elapsedTimer),this._elapsedTimer=null)}_formatElapsed(t){return t<60?`${t}s`:`${Math.floor(t/60)}m ${t%60}s`}_render(){let t=M(this.statusCode),e=this.isAggregation?C:A;this.innerHTML=`
      <div style="padding:28px 12px 20px;display:flex;flex-direction:column;align-items:center;gap:0;">
        <div class="zarr-stages" style="display:flex;align-items:center;width:100%;max-width:360px;margin-bottom:28px;">
          ${w.map((e,i)=>S(i,t,e.label)).join("")}
        </div>

        <div style="height:20px;"></div>

        <div class="zarr-msg-container" style="min-height:22px;text-align:center;">
          ${this._renderMessage(t,e)}
        </div>

        <div style="margin-top:10px;">
          <span class="zarr-elapsed" style="font-size:11px;color:#d1d5db;
            font-variant-numeric:tabular-nums;letter-spacing:0.05em;">
            ${this._formatElapsed(this._elapsed)}
          </span>
        </div>
      </div>`}_renderMessage(t,e){return 2===t?`<span key="${this._msgKey}" class="zarr-msg" style="font-size:13px;color:${z};">
                ${e[this._msgIdx]}
              </span>`:1===t?`<span style="font-size:13px;color:${z};">Waiting for a worker to pick up the task…</span>`:""}_updateStages(){let t=M(this.statusCode),e=this.querySelector(".zarr-stages");e&&(e.innerHTML=w.map((e,i)=>S(i,t,e.label)).join(""));let i=this.querySelector(".zarr-msg-container");if(i){let e=this.isAggregation?C:A;i.innerHTML=this._renderMessage(t,e)}this._startMsgCycle()}_updateMessage(){let t=M(this.statusCode),e=this.querySelector(".zarr-msg-container");if(e){let i=this.isAggregation?C:A;e.innerHTML=this._renderMessage(t,i)}}}for(let[t,e]of[["data-inspector",x],["aggregation-config",s],["zarr-loading-steps",E]])customElements.get(t)||customElements.define(t,e);function T(){return"u">typeof document&&document.baseURI?document.baseURI:"u">typeof location&&location.href?location.href:null}function I(t){try{let e=T(),i=e?new URL(t,e):new URL(t);return"null"===i.origin?null:i.origin}catch{return null}}async function O(t,e){try{let i=await (t??function(t){if(typeof document>"u"||void 0!==t&&(typeof location>"u"||I(t)!==location.origin))return{};let e=document.cookie.split(";").find(t=>t.trim().startsWith("freva_auth_token="));if(!e)return{};try{let t=e.substring(e.indexOf("=")+1).trim();return t.startsWith('"')&&t.endsWith('"')&&(t=t.slice(1,-1)),t?{Authorization:`Bearer ${t}`}:{}}catch{return{}}})(function(t){try{let e=T();return e?new URL(t,e).href:new URL(t).href}catch{return t}}(e));return i&&"object"==typeof i?{...i}:{}}catch{return{}}}function L(t){var e;let i=null==(e=t.origins)?void 0:e.map(t=>I(t)).filter(t=>!!t);return async e=>{let r=I(e);if(!r||!(i??("u">typeof location?[location.origin]:[])).includes(r))return{};let a=await t.getToken();return a?{Authorization:`Bearer ${a}`}:{}}}function U(t){if("string"!=typeof t)return t;let e=t.trim();for(;/^https?%(25)*3a/i.test(e);)try{let t=decodeURIComponent(e);if(t===e)break;e=t}catch{break}return e}function j(t){return`/api/freva-nextgen/data-portal/zarr-utils/status?url=${t}&timeout=1`}class B{constructor(t,e={}){this.timer=null,this.cancelled=!1,this.zarrUrl=t,this.intervalMs=e.intervalMs??2e3,this.getAuthHeaders=e.getAuthHeaders,this.getStatusUrl=e.getStatusUrl??j,this.onStatus=e.onStatus??(()=>{}),this.onError=e.onError??(()=>{})}start(){this.cancelled=!1,this.poll(),this.timer=setInterval(()=>{this.poll()},this.intervalMs)}stop(){this.cancelled=!0,null!==this.timer&&(clearInterval(this.timer),this.timer=null)}async poll(){try{let t=this.getStatusUrl(encodeURIComponent(this.zarrUrl)),e=await fetch(t,{credentials:"same-origin",headers:await O(this.getAuthHeaders,t)});if(!e.ok){this.cancelled||this.onStatus(5,null);return}let i=await e.json(),r=i.status??5,a=i.reason??null;this.cancelled||(this.onStatus(r,a),r<=2&&this.stop())}catch(t){this.cancelled||this.onError(t instanceof Error?t.message:String(t))}}}let q={isZarr:!1,version:null,consolidated:!1};async function D(t,e={}){if(!t)return{...q};let i=U(t).replace(/\/$/,""),r=async t=>({credentials:"same-origin",headers:await O(e.getAuthHeaders,t),signal:AbortSignal.timeout(e.timeoutMs??5e3)});try{if((await fetch(`${i}/.zmetadata`,await r(`${i}/.zmetadata`))).ok)return{isZarr:!0,version:2,consolidated:!0}}catch{}try{let t=await fetch(`${i}/zarr.json`,await r(`${i}/zarr.json`));if(t.ok){let e=await t.json(),i=e.zarr_format;if(2===i||3===i){let t=3===i&&"consolidated_metadata"in e;return{isZarr:!0,version:i,consolidated:t}}}}catch{}return{...q}}function N(){return Error("zstd: the compressed data is corrupt")}function R(t){return 31-Math.clz32(t)}class H{constructor(t,e,i){this.src=t,this.start=e,this.end=i,this.bit=0}read(t){let e=0;for(let i=0;i<t;i+=1,this.bit+=1){let t=this.start+(this.bit>>3);if(t>=this.end)throw N();e+=(this.src[t]>>(7&this.bit)&1)*2**i}return e}rewind(t){this.bit-=t}bytesUsed(){return Math.ceil(this.bit/8)}}class F{constructor(t,e,i){if(this.src=t,this.start=e,i<=e)throw N();let r=t[i-1];if(0===r)throw N();this.remaining=(i-e-1)*8+R(r)}read(t){let e=0;for(let i=0;i<t;i+=1){let t=this.remaining-1-i;e=2*e+(t>=0?this.src[this.start+(t>>3)]>>(7&t)&1:0)}return this.remaining-=t,e}}function P(t,e){let i=1<<e,r=new Uint8Array(i),a=new Uint8Array(i),n=new Uint16Array(i),o=Array(t.length).fill(0),s=i;t.forEach((t,e)=>{-1===t&&(r[--s]=e,o[e]=1)});let l=(i>>1)+(i>>3)+3,d=0;if(t.forEach((t,e)=>{if(!(t<=0)){o[e]=t;for(let a=0;a<t;a+=1){r[d]=e;do d=d+l&i-1;while(d>=s)}}}),0!==d)throw N();for(let t=0;t<i;t+=1){let s=o[r[t]]++;a[t]=e-R(s),n[t]=(s<<a[t])-i}return{log:e,symbols:r,bits:a,base:n}}function V(t,e,i,r,a){let n=new H(t,e,i),o=n.read(4)+5;if(o>r)throw N();let s=1<<o,l=[];for(;s>0&&l.length<a;){let t=R(s+1)+1,e=n.read(t),i=(1<<t-1)-1,r=(1<<t)-1-(s+1);(e&i)<r?(n.rewind(1),e&=i):e>i&&(e-=r);let o=e-1;if(s-=Math.abs(o),l.push(o),0===o)for(let t=n.read(2);;t=n.read(2)){for(let e=0;e<t&&l.length<a;e+=1)l.push(0);if(3!==t)break}}if(0!==s)throw N();return[P(l,o),n.bytesUsed()]}class Z{constructor(t,e){this.table=t,this.state=e.read(t.log)}symbol(){return this.table.symbols[this.state]}update(t){this.state=this.table.base[this.state]+t.read(this.table.bits[this.state])}}function Y(t){let e=0;for(let i of t)i>0&&(e+=1<<i-1);if(0===e)throw N();let i=R(e)+1,r=(1<<i)-e;if(r&r-1)throw N();let a=[...t,R(r)+1],n=1<<i,o=new Uint8Array(n),s=new Uint8Array(n),l=a.map(t=>t>0?i+1-t:0),d=Array(i+2).fill(0);for(let t of l)d[t]+=1;let c=Array(i+2).fill(0);c[i]=0;for(let t=i;t>=1;t-=1)c[t-1]=c[t]+d[t]*(1<<i-t),s.fill(t,c[t],c[t-1]);return l.forEach((t,e)=>{if(0===t)return;let r=1<<i-t;o.fill(e,c[t],c[t]+r),c[t]+=r}),{maxBits:i,symbols:o,bits:s}}function G(t,e,i,r,a,n,o){let s=new F(e,i,r),l=(1<<t.maxBits)-1,d=s.read(t.maxBits);for(let e=0;e<o;e+=1){a[n+e]=t.symbols[d];let i=t.bits[d];d=(d<<i)+s.read(i)&l}if(s.remaining!==-t.maxBits)throw N()}let K=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,20,22,24,28,32,40,48,64,128,256,512,1024,2048,4096,8192,16384,32768,65536],J=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,3,3,4,6,7,8,9,10,11,12,13,14,15,16],W=[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,37,39,41,43,47,51,59,67,83,99,131,259,515,1027,2051,4099,8195,16387,32771,65539],X=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,3,3,4,4,5,7,8,9,10,11,12,13,14,15,16],Q=P([4,3,2,2,2,2,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,2,2,3,2,1,1,1,1,1,-1,-1,-1,-1],6),tt=P([1,4,3,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1],6),te=P([1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1],5);class ti{constructor(t,e){this.limit=e,this.length=0,this.data=new Uint8Array(Math.min(Math.max(t,1024),e))}reserve(t){if(this.length+t>this.limit)throw Error("zstd: the data decodes to more than allowed");if(this.length+t<=this.data.length)return;let e=new Uint8Array(Math.min(Math.max(this.length+t,2*this.data.length),this.limit));e.set(this.data.subarray(0,this.length)),this.data=e}push(t){this.reserve(t.length),this.data.set(t,this.length),this.length+=t.length}fill(t,e){this.reserve(e),this.data.fill(t,this.length,this.length+e),this.length+=e}match(t,e,i){if(t<=0||t>this.length-i)throw N();this.reserve(e);for(let i=0;i<e;i+=1,this.length+=1)this.data[this.length]=this.data[this.length-t]}}function tr(t,e,i,r,a,n,o,s){if(0===t)return[a,0];if(1===t){var l;if(i>=r)throw N();return[(l=e[i],{log:0,symbols:Uint8Array.of(l),bits:Uint8Array.of(0),base:Uint16Array.of(0)}),1]}if(2===t)return V(e,i,r,o,s);if(!n)throw N();return[n,0]}let ta=null;function tn(){return ta??(ta={p1:BigInt("11400714785074694791"),p2:BigInt("14029467366897019727"),p3:BigInt("1609587929392839161"),p4:BigInt("9650029242287828579"),p5:BigInt("2870177450012600261")}),ta}function to(t){return BigInt.asUintN(64,t)}function ts(t,e){return to(t<<BigInt(e)|t>>BigInt(64-e))}function tl(t,e){let i=tn();return to(ts(to(t+to(e*i.p2)),31)*i.p1)}function td(t,e){let i=tn();return to(to((t^tl(BigInt(0),e))*i.p1)+i.p4)}function tc(t,e){let i=new DataView(t.buffer,t.byteOffset,t.byteLength),r=new ti(4*t.length,e),a=0,n=e=>{if(a+e>t.length)throw N()};for(;a<t.length;){n(4);let o=i.getUint32(a,!0);if(a+=4,(0xfffffff0&o)==0x184d2a50){n(4);let t=i.getUint32(a,!0);a+=4,n(t),a+=t;continue}if(0xfd2fb528!==o)throw N();n(1);let s=t[a++],l=s>>6,d=s>>5&1,c=s>>2&1,u=3&s;if(8&s)throw N();d||(n(1),a+=1);let h=[0,1,2,4][u];n(h);let p=0;for(let e=0;e<h;e+=1)p+=t[a+e]*256**e;if(0!==p)throw N();a+=h;let g=[+!!d,2,4,8][l];n(g);let f=null;if(g>0){f=0;for(let e=0;e<g;e+=1)f+=t[a+e]*256**e;if(2===g&&(f+=256),f>e)throw N()}a+=g;let m=r.length,b={huffman:null,ll:null,of:null,ml:null,rep:[1,4,8]};for(let e=0;!e;){n(3);let i=t[a]|t[a+1]<<8|t[a+2]<<16;a+=3,e=1&i;let o=i>>1&3,s=i>>3;if(0===o)n(s),r.push(t.subarray(a,a+s)),a+=s;else if(1===o)n(1),r.fill(t[a],s),a+=1;else if(2===o){if(s>131072)throw N();n(s),function(t,e,i,r,a,n){let[o,s]=function(t,e,i,r){let a,n,o,s=r=>{if(e+r>=i)throw N();return t[e+r]},l=s(0),d=3&l,c=l>>2&3;if(d<2){let r,a;if(1===c?(r=(l>>4)+(s(1)<<4),a=2):3===c?(r=(l>>4)+(s(1)<<4)+(s(2)<<12),a=3):(r=l>>3,a=1),r>131072)throw N();if(0===d){if(e+a+r>i)throw N();return[t.slice(e+a,e+a+r),a+r]}return[new Uint8Array(r).fill(s(a)),a+1]}let u=s(1),h=s(2);if(c<2)a=l>>4|(63&u)<<4,n=u>>6|h<<2,o=3;else if(2===c){let t=s(3);a=l>>4|u<<4|(3&h)<<12,n=h>>2|t<<6,o=4}else{let t=s(3),e=s(4);a=l>>4|u<<4|(63&h)<<12,n=h>>6|t<<2|e<<10,o=5}let p=e+o,g=p+n;if(g>i)throw N();if(2===d){let[e,i]=function(t,e,i){if(e>=i)throw N();let r=t[e],a=[];if(r>=128){let n=r-127;if(e+1+Math.ceil(n/2)>i)throw N();for(let i=0;i<n;i+=1){let r=t[e+1+(i>>1)];a.push(1&i?15&r:r>>4)}return[Y(a),1+Math.ceil(n/2)]}let n=e+1+r;if(n>i)throw N();let[o,s]=V(t,e+1,n,6,256),l=new F(t,e+1+s,n),d=new Z(o,l),c=new Z(o,l);for(;;){if(a.push(d.symbol()),d.update(l),l.remaining<0){a.push(c.symbol());break}if(a.push(c.symbol()),c.update(l),l.remaining<0){a.push(d.symbol());break}if(a.length>255)throw N()}return[Y(a),1+r]}(t,p,g);r.huffman=e,p+=i}let f=r.huffman;if(!f||a>131072)throw N();let m=new Uint8Array(a);if(0===c)G(f,t,p,g,m,0,a);else{if(p+6>g)throw N();let e=new DataView(t.buffer,t.byteOffset,t.byteLength),i=[e.getUint16(p,!0),e.getUint16(p+2,!0),e.getUint16(p+4,!0)],r=Math.ceil(a/4),n=[r,r,r,a-3*r],o=p+=6;for(let e=0;e<4;e+=1){let a=e<3?o+i[e]:g;if(a>g||n[e]<0)throw N();G(f,t,o,a,m,e*r,n[e]),o=a}}return[m,o+n]}(t,e,i,a),l=e+s,d=()=>{if(l>=i)throw N();return t[l++]},c=d();if(c>=128&&(c=255===c?d()+(d()<<8)+32512:(c-128<<8)+d()),0===c){if(l!==i)throw N();r.push(o);return}let u=d();if(3&u)throw N();let[h,p]=tr(u>>6,t,l,i,Q,a.ll,9,36),[g,f]=tr(u>>4&3,t,l+=p,i,te,a.of,8,32),[m,b]=tr(u>>2&3,t,l+=f,i,tt,a.ml,9,53);l+=b,a.ll=h,a.of=g,a.ml=m;let v=new F(t,l,i),x=new Z(h,v),y=new Z(g,v),w=new Z(m,v),_=a.rep,k=0;for(let t=0;t<c;t+=1){let e,i=y.symbol(),a=x.symbol(),s=w.symbol();if(a>=K.length||s>=W.length||i>31)throw N();let l=2**i+v.read(i),d=W[s]+v.read(X[s]),u=K[a]+v.read(J[a]);if(t<c-1&&(x.update(v),w.update(v),y.update(v)),l>3)e=l-3,_[2]=_[1],_[1]=_[0],_[0]=e;else{let t=l-1;0===u&&(t+=1),0===t?e=_[0]:(e=t<3?_[t]:_[0]-1,t>1&&(_[2]=_[1]),_[1]=_[0],_[0]=e)}if(k+u>o.length)throw N();r.push(o.subarray(k,k+u)),k+=u,r.match(e,d,n)}if(0!==v.remaining)throw N();r.push(o.subarray(k))}(t,a,a+s,r,b,m),a+=s}else throw N()}if(null!==f&&r.length-m!==f)throw N();if(c){if(n(4),i.getUint32(a,!0)!==Number(function(t){let e=tn(),i=new DataView(t.buffer,t.byteOffset,t.byteLength),r=t.length,a=0,n;if(r>=32){let t=to(e.p1+e.p2),o=e.p2,s=BigInt(0),l=to(-e.p1);for(;a+32<=r;a+=32)t=tl(t,i.getBigUint64(a,!0)),o=tl(o,i.getBigUint64(a+8,!0)),s=tl(s,i.getBigUint64(a+16,!0)),l=tl(l,i.getBigUint64(a+24,!0));n=td(n=to(ts(t,1)+ts(o,7)+ts(s,12)+ts(l,18)),t),n=td(n,o),n=td(n,s),n=td(n,l)}else n=e.p5;for(n=to(n+BigInt(r));a+8<=r;a+=8)n^=tl(BigInt(0),i.getBigUint64(a,!0)),n=to(to(ts(n,27)*e.p1)+e.p4);for(a+4<=r&&(n^=to(BigInt(i.getUint32(a,!0))*e.p1),n=to(to(ts(n,23)*e.p2)+e.p3),a+=4);a<r;a+=1)n^=to(BigInt(t[a])*e.p5),n=to(ts(n,11)*e.p1);return n^=n>>BigInt(33),n=to(n*e.p2),n^=n>>BigInt(29),n=to(n*e.p3),n^=n>>BigInt(32)}(r.data.subarray(m,r.length))&BigInt(0xffffffff)))throw Error("zstd: the content checksum does not match");a+=4}}return r.data.slice(0,r.length)}class tu extends Error{constructor(t){super(t),this.name="UnsupportedCodecError"}}function th(t){return Error(`${t}: the compressed data is corrupt`)}function tp(){return Error("the chunk decodes to more than its shape holds")}let tg=(()=>{let t=new Uint32Array(256);for(let e=0;e<256;e+=1){let i=e;for(let t=0;t<8;t+=1)i=1&i?0x82f63b78^i>>>1:i>>>1;t[e]=i>>>0}return t})();function tf(t,e){let i=new Uint8Array(e),r=0,a=0,n=()=>{if(r>=t.length)throw th("lz4");return t[r++]},o=t=>{let e=t;if(15!==t)return e;for(let t=255;255===t;)e+=t=n();return e};for(;r<t.length;){let s=n(),l=o(s>>4);if(r+l>t.length||a+l>e)throw th("lz4");if(i.set(t.subarray(r,r+l),a),r+=l,a+=l,r>=t.length)break;let d=n()|n()<<8,c=o(15&s)+4;if(0===d||d>a||a+c>e)throw th("lz4");for(let t=0;t<c;t+=1,a+=1)i[a]=i[a-d]}if(a!==e)throw th("lz4");return i}async function tm(t,e,i){if("function"!=typeof DecompressionStream)throw new tu("this browser cannot decompress zlib or gzip");let r=new DecompressionStream(e),a=r.writable.getWriter();a.write(new Uint8Array(t)).catch(()=>{}),a.close().catch(()=>{});let n=r.readable.getReader(),o=[],s=0;for(;;){let{done:t,value:e}=await n.read();if(t)break;if((s+=e.length)>i)throw n.cancel().catch(()=>{}),tp();o.push(e)}let l=new Uint8Array(s),d=0;for(let t of o)l.set(t,d),d+=t.length;return l}async function tb(t,e,i){if(0===t)return function(t,e){let i=new Uint8Array(e),r=0,a=0,n=()=>{if(r>=t.length)throw th("blosclz");return t[r++]},o=31&n();for(;;){if(o>=32){let t=(o>>5)-1,r=(31&o)<<8;if(6===t)for(let e=255;255===e;)t+=e=n();let s=n();t+=3;let l=a-r-s;if(255===s&&7936===r&&(l=a-(r=(n()<<8)+n())-8191),(l-=1)<0||a+t>e)throw th("blosclz");for(let e=0;e<t;e+=1,a+=1)i[a]=i[l+e]}else{let n=o+1;if(r+n>t.length||a+n>e)throw th("blosclz");i.set(t.subarray(r,r+n),a),r+=n,a+=n}if(r>=t.length)break;o=n()}if(a!==e)throw th("blosclz");return i}(e,i);if(1===t)return tf(e,i);if(3===t||4===t){let r=3===t?await tm(e,"deflate",i):tc(e,i);if(r.length!==i)throw th(`blosc ${3===t?"zlib":"zstd"}`);return r}throw new tu(`blosc's ${["blosclz","lz4","snappy","zlib","zstd"][t]??`codec ${t}`} is not supported`)}async function tv(t){if(await new Promise(t=>setTimeout(t,0)),null!=t&&t.aborted)throw new DOMException("The read was aborted.","AbortError")}async function tx(t,e,i,r,a,n){let o=new DataView(t.buffer,t.byteOffset,t.byteLength),s=Math.floor(r/a),l=new Uint8Array(r),d=e;for(let e=0;e<a;e+=1){if(d+4>i)throw th("blosc");let r=o.getInt32(d,!0);if(d+=4,r<0||d+r>i)throw th("blosc");let a=t.subarray(d,d+r);l.set(r===s?a:await tb(n,a,s),e*s),d+=r}return l}async function ty(t,e,i){if(t.length<16)throw th("blosc");let r=new DataView(t.buffer,t.byteOffset,t.byteLength),a=t[2],n=t[3],o=r.getUint32(4,!0),s=r.getUint32(8,!0),l=r.getUint32(12,!0);if(l>t.length||l<16)throw th("blosc");if(o>e)throw tp();if(2&a){if(16+o>l)throw th("blosc");return t.slice(16,16+o)}if(0===o)return new Uint8Array(0);if(0===s||0===n)throw th("blosc");let d=a>>5&7,c=o%s,u=Math.floor(o/s)+ +(c>0),h=16+4*u;if(h>l)throw th("blosc");let p=Array.from({length:u},(t,e)=>r.getUint32(16+4*e,!0)),g=[...new Set(p)].sort((t,e)=>t-e),f=new Map;g.forEach((t,e)=>f.set(t,g[e+1]??l));let m=0,b=(16&a)!=0,v=new Uint8Array(o);for(let e=0;e<u;e+=1){let r=e===u-1&&c>0,o=r?c:s,g=p[e];if(g<h||g>=l)throw th("blosc");let x=f.get(g),y=(1&a)!=0&&n>1;if(4&a&&o>=n)throw new tu("blosc's bit shuffle is not supported");let w=!b&&n<=16&&Math.floor(o/n)>=128&&!r?n:1,_=await tx(t,g,x,o,w,d);v.set(y?function(t,e){let i=new Uint8Array(t.length),r=Math.floor(t.length/e);for(let a=0;a<r;a+=1)for(let n=0;n<e;n+=1)i[a*e+n]=t[n*r+a];let a=r*e;return i.set(t.subarray(a),a),i}(_,n):_,e*s),(m+=o)>=262144&&(m=0,await tv(i))}return v}async function tw(t,e,i,r){switch(await tv(r),e.id){case"blosc":return ty(t,i,r);case"zlib":return tm(t,"deflate",i);case"gzip":return tm(t,"gzip",i);case"zstd":return tc(t,i);case"lz4":{if(t.length<4)throw th("lz4");let e=new DataView(t.buffer,t.byteOffset,t.byteLength).getUint32(0,!0);if(e>i)throw tp();return tf(t.subarray(4),e)}case"crc32c":{if(t.length<4)throw th("crc32c");let e=t.subarray(0,t.length-4),i=new DataView(t.buffer,t.byteOffset,t.byteLength).getUint32(t.length-4,!0);if(function(t){let e=0xffffffff;for(let i=0;i<t.length;i+=1)e=tg[(e^t[i])&255]^e>>>8;return(0xffffffff^e)>>>0}(e)!==i)throw Error("crc32c: the checksum does not match");return e}default:throw new tu(`the ${e.id} codec is not supported`)}}let t_={D:864e11,h:36e11,m:6e10,s:1e9,ms:1e6,us:1e3,ns:1},tk=[[/^days?$/i,"D"],[/^(hours?|hrs?|h)$/i,"h"],[/^(minutes?|mins?)$/i,"m"],[/^(seconds?|secs?|s)$/i,"s"],[/^(milliseconds?|msecs?|ms)$/i,"ms"],[/^(microseconds?|usecs?|us)$/i,"us"],[/^(nanoseconds?|nsecs?|ns)$/i,"ns"]],t$=new Set(["standard","gregorian","proleptic_gregorian"]),tz=null;function tA(){return tz??(tz={zero:BigInt(0),billion:BigInt(1e9),nat:-(BigInt(2)**BigInt(63)),max:BigInt(2)**BigInt(63)-BigInt(1),gregorianStart:BigInt(Date.UTC(1582,9,15))*BigInt(1e6)}),tz}function tC(){return"function"==typeof BigInt&&"function"==typeof DataView.prototype.getBigInt64}class tM extends Error{}function tS(t){if(t<=tA().nat||t>tA().max)throw new tM("outside datetime64[ns]");return t}function tE(t,e){return t*BigInt(e)}function tT(t,e){if(Number.isInteger(t)&&Math.abs(t)<=Number.MAX_SAFE_INTEGER)return tE(BigInt(t),e);let i=t*e;if(!Number.isFinite(i)||Math.abs(i)>=12089258196146292e8)throw new tM("outside datetime64[ns]");return BigInt(Math.trunc(i))}function tI(t,e){return String(t).padStart(e,"0")}function tO(t){let{billion:e,zero:i}=tA(),r=t/e,a=t-r*e;a<i&&(r-=BigInt(1),a+=e);let n=new Date(1e3*Number(r)),o=n.getUTCFullYear();return{date:`${o<0?`-${tI(-o,4)}`:tI(o,4)}-${tI(n.getUTCMonth()+1,2)}-${tI(n.getUTCDate(),2)}`,time:`${tI(n.getUTCHours(),2)}:${tI(n.getUTCMinutes(),2)}:${tI(n.getUTCSeconds(),2)}`,nanos:a,fraction:tI(a.toString(),9)}}function tL(t){if(null===t)return"NaT";let{date:e,time:i,nanos:r,fraction:a}=tO(t),n=r===BigInt(0)?"":r%BigInt(1e3)===BigInt(0)?`.${a.slice(0,6)}`:`.${a}`;return"00:00:00"!==i||n?`${e}T${i}${n}`:e}function tU(t){if(null===t)return"'NaT'";let{date:e,time:i,fraction:r}=tO(t);return`'${e}T${i}.${r}'`}function tj(t){return"number"==typeof t?t:"NaN"===t?0/0:"Infinity"===t?1/0:"-Infinity"===t?-1/0:null}async function tB(t,e,i){let r=await O(e.getAuthHeaders,t),a=await fetch(t,{credentials:"same-origin",headers:r,...e.signal?{signal:e.signal}:{}});if(!a.ok)throw Error(`the chunk answered ${a.status}`);let n=a.body;if(n&&"function"==typeof n.getReader){let t=n.getReader(),e=[],r=0;for(;;){let{done:a,value:n}=await t.read();if(a)break;if((r+=n.length)>i)throw t.cancel().catch(()=>{}),Error("the chunk is larger than its shape allows");e.push(n)}let a=new Uint8Array(r),o=0;for(let t of e)a.set(t,o),o+=t.length;return a}let o=await a.arrayBuffer();if(o.byteLength>i)throw Error("the chunk is larger than its shape allows");return new Uint8Array(o)}async function tq(t,e,i,r={}){var a,n,o,s;let l,d,c,u,h,p,g,f,m,b,v,x=String(e.attrs.units??""),y=String(e.attrs.calendar??"standard").toLowerCase();if(!t$.has(y))return null;let w=function(t){let e={int8:{kind:"i",size:1},int16:{kind:"i",size:2},int32:{kind:"i",size:4},int64:{kind:"i",size:8},uint8:{kind:"u",size:1},uint16:{kind:"u",size:2},uint32:{kind:"u",size:4},uint64:{kind:"u",size:8},float32:{kind:"f",size:4},float64:{kind:"f",size:8}};if(e[t])return e[t];let i=/^[<>|=]?([iufM])(\d)(?:\[(\w+)\])?$/.exec(t);if(!i)return null;let r=i[1],a=Number(i[2]);return"M"===r?8===a&&i[3]&&t_[i[3]]?{kind:r,size:a,unit:i[3]}:null:"f"===r&&4!==a&&8!==a?null:[1,2,4,8].includes(a)?{kind:r,size:a}:null}(i.dtype);if(!w||1!==e.shape.length||!tC())return null;let _,k=tA().zero;if("M"===w.kind)_=t_[w.unit];else{let t=function(t){var e;let i=/^\s*(\w+)\s+since\s+(.+?)\s*$/i.exec(t);if(!i)return null;let r=null==(e=tk.find(([t])=>t.test(i[1])))?void 0:e[1];if(!r)return null;let a=/^(-?\d{1,4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2})(\.\d{1,9})?)?)?\s*(?:Z|UTC|GMT|([+-])(\d{1,2}):?(\d{2})?)?$/i.exec(i[2]);if(!a)return null;let[,n,o,s,l="0",d="0",c="0",u="",h,p="0",g="0"]=a,f=new Date(Date.UTC(2e3,0,1));f.setUTCFullYear(Number(n),Number(o)-1,Number(s)),f.setUTCHours(Number(l),Number(d),Number(c),0);let m=h?("-"===h?-1:1)*(3600*Number(p)+60*Number(g)):0,b=BigInt(u?u.slice(1).padEnd(9,"0"):0),v=BigInt(f.getTime())*BigInt(1e6)-BigInt(m)*tA().billion+b;return{unitNs:t_[r],origin:v}}(x);if(!t||({unitNs:_,origin:k}=t,"proleptic_gregorian"!==y&&k<tA().gregorianStart))return null}let $=tj(e.attrs.scale_factor),z=tj(e.attrs.add_offset),A="M"!==w.kind&&(null!==$||null!==z),C=e.shape[0],M=e.chunks[0]||C,S=M*w.size;if(0===C||S>1048576)return null;let{limits:E,cap:T}=function(t,e){let i=[],r=t;for(let t of e)i.push(r),r="crc32c"===t.id?r+4:Math.min(2162688,r+Math.ceil(r/8)+4096);return{limits:i,cap:Math.min(2162688,r)}}(S,i.codecs),I=C<=6,O=I?Array.from({length:C},(t,e)=>e):[0,1,2,C-3,C-2,C-1],L=U(t).replace(/\/$/,""),j=new Map,B="M"===w.kind?[]:(a=e.attrs,n=i.fill,[].concat(a._FillValue,a.missing_value,n).map(tj).filter(t=>null!==t));if("f"!==w.kind&&B.some(t=>Number.isInteger(t)&&!Number.isSafeInteger(t)&&0xffffffffffffffff>Math.abs(t)))return null;try{l=await Promise.all(O.map(async t=>{var e;let a,n,o=await (e=Math.floor(t/M),(n=j.get(e))||(n=(async()=>{let t=await tB(`${L}/${i.path}/${i.chunkPrefix}${e}`,r,T);for(let e=i.codecs.length-1;e>=0;e-=1)t=await tw(t,i.codecs[e],E[e],r.signal);let a=Math.min(M,C-e*M)*w.size;if(t.length<a||t.length>S)throw Error("the chunk does not match its shape");return new DataView(t.buffer,t.byteOffset,t.byteLength)})(),j.set(e,n)),n),s=function(t,e,i,r){let a=e*i.size;if("f"===i.kind)return{kind:"float",value:4===i.size?t.getFloat32(a,r):t.getFloat64(a,r)};if(8===i.size)return{kind:"int",value:"u"===i.kind?t.getBigUint64(a,r):t.getBigInt64(a,r)};let n={i1:()=>t.getInt8(a),u1:()=>t.getUint8(a),i2:()=>t.getInt16(a,r),u2:()=>t.getUint16(a,r),i4:()=>t.getInt32(a,r),u4:()=>t.getUint32(a,r)}[`${i.kind}${i.size}`];if(!n)throw new tM("unsupported integer type");return{kind:"int",value:BigInt(n())}}(o,t%M,w,i.littleEndian);return"M"===w.kind?s.value===tA().nat?null:tS(tE(s.value,_)):"i"===w.kind&&8===w.size&&s.value===tA().nat||B.some(t=>{if("int"===s.kind)return Number.isInteger(t)&&BigInt(t)===s.value;let e=4===w.size?Math.fround(t):t;return e===s.value||Number.isNaN(e)&&Number.isNaN(s.value)})||"float"===s.kind&&Number.isNaN(s.value)?null:(a=A?tT(Number(s.value)*($??1)+(z??0),_):"int"===s.kind?tE(s.value,_):tT(s.value,_),tS(a+k))}))}catch(t){if(t instanceof tM)return null;throw t}return"proleptic_gregorian"!==y&&l.some(t=>null!==t&&t<tA().gregorianStart)?null:(o=l,d=(s=!I)?o.slice(0,3):o,c=s?o.slice(-3):[],u=[...d.map(tU),...s?["...",...c.map(tU)]:[]],h=o[0]??null,p=o[o.length-1]??null,{dtype:"datetime64[ns]",preview:1===o.length?tL(h):2===C?`${tL(h)} ${tL(p)}`:`${tL(h)} ... ${tL(p)}`,repr:(g=" ".repeat(7),f=[],m=g,u.forEach((t,e)=>{let i=e===u.length-1;m.length>g.length&&m.length+t.length>74&&(f.push(m.replace(/\s+$/,"")),m=g),m+=t,i||(m+=", ")}),f.push(m),b=`array([${f.join(`
`).slice(g.length)}]`,v=`${s?`shape=(${C},), `:""}dtype='datetime64[ns]')`,b.length-(b.lastIndexOf(`
`)+1)+1+1+v.length>75?`${b},
${" ".repeat(6)}${v}`:`${b}, ${v}`)})}async function tD(t,e,i={}){if(!tC())return;let r=i.signal,a=new AbortController,n=new Promise(t=>{a.signal.aborted?t():a.signal.addEventListener("abort",()=>t(),{once:!0})}),o=()=>a.abort();null==r||r.addEventListener("abort",o,{once:!0}),null!=r&&r.aborted&&o();let s=setTimeout(o,i.budgetMs??3e3),l=[];try{if(!a.signal.aborted)for(let r of e.groups?Object.values(e.groups):[e])for(let e of Object.values(r.coords)){let r=e._chunks;e._isTimeCoord&&r&&l.push(Promise.resolve().then(()=>tq(t,e,r,{...i,signal:a.signal})).then(t=>{t&&!a.signal.aborted&&(e._values=t)},()=>{}))}await Promise.race([Promise.all(l),n])}finally{clearTimeout(s),null==r||r.removeEventListener("abort",o),a.abort()}if(null!=r&&r.aborted)throw r.reason instanceof Error?r.reason:new DOMException("The metadata read was aborted.","AbortError")}class tN extends Error{constructor(t,e){super(t),this.name="ZarrMetadataError",this.status=e}}function tR(t,e,i){let r={},a={};for(let[e,n]of Object.entries(t)){let{shape:t,chunks:o,dtype:s,dims:l,attrs:d,source:c}=i(n,e);l.forEach((e,i)=>{e in r||(r[e]=t[i]??0)});let u=d.units,h=1===l.length&&l[0]===e&&(String(u??"").includes("since")||"time"===e);a[e]={shape:t,chunks:o,dtype:s,dims:l,attrs:d,_isTimeCoord:h,...c?{_chunks:c}:{}}}let n=new Set,o=t=>String(t??"").split(/[\s,]+/).filter(Boolean);for(let[t,e]of Object.entries(a))1===e.dims.length&&e.dims[0]===t&&n.add(t);for(let t of(o(e.coordinates).forEach(t=>n.add(t)),Object.values(a)))o(t.attrs.coordinates).forEach(t=>n.add(t));let s={},l={};for(let[t,e]of Object.entries(a))(n.has(t)?s:l)[t]=e;return{dims:r,coords:s,data_vars:l,attrs:e}}function tH(t){return Object.keys(t.coords).length+Object.keys(t.data_vars).length>0}function tF(t,e){let i=t[`${e}.zattrs`]??{},r={};for(let[i,a]of Object.entries(t)){if(!i.startsWith(e))continue;let t=i.slice(e.length);if(t.endsWith("/.zarray")){let e=t.slice(0,-8);if(e.includes("/"))continue;r[e]??(r[e]={}),r[e].zarray=a}else if(t.endsWith("/.zattrs")){let e=t.slice(0,-8);if(!e||e.includes("/"))continue;r[e]??(r[e]={}),r[e].zattrs=a}}for(let t of Object.keys(r))r[t].zarray||delete r[t];return tR(r,i,(t,i)=>{var r,a,n,o,s,l,d;let c,u=t.zattrs??{},h=(null==(r=t.zarray)?void 0:r.dtype)??"|u1",p=[...(null==(a=t.zarray)?void 0:a.filters)??[],...null!=(n=t.zarray)&&n.compressor?[t.zarray.compressor]:[]];return{shape:(null==(o=t.zarray)?void 0:o.shape)??[],chunks:(null==(s=t.zarray)?void 0:s.chunks)??(null==(l=t.zarray)?void 0:l.shape)??[],dtype:({f2:"float16",f4:"float32",f8:"float64",i1:"int8",i2:"int16",i4:"int32",i8:"int64",u1:"uint8",u2:"uint16",u4:"uint32",u8:"uint64",b1:"bool"})[h.slice(1)]??h,dims:u._ARRAY_DIMENSIONS??[],attrs:(c={...u},delete c._ARRAY_DIMENSIONS,c),source:{path:`${e}${i}`,chunkPrefix:"",dtype:h,littleEndian:!h.startsWith(">"),codecs:p,fill:(null==(d=t.zarray)?void 0:d.fill_value)??null}}})}function tP(t,e){let i=(t[e||""]??{}).attributes??{},r={};for(let[i,a]of Object.entries(t))if("array"===a.node_type)if(e){if(!i.startsWith(`${e}/`))continue;let t=i.slice(e.length+1);if(t.includes("/"))continue;r[t]={zarray:a}}else{if(!i||i.includes("/"))continue;r[i]={zarray:a}}return tR(r,i,(t,i)=>{var r,a;let n=t.zarray,o=function(t,e){var i,r;let a=t.chunk_key_encoding,n=(null==(i=null==a?void 0:a.configuration)?void 0:i.separator)??"/",o=(null==a?void 0:a.name)==="v2"?"":`c${n}`,s=!0,l=[],d=!0;for(let e of t.codecs??[]){let t=e.name??"";if(!(d&&"transpose"===t)){if(d&&"bytes"===t){s=(null==(r=e.configuration)?void 0:r.endian)!=="big",d=!1;continue}if(d)return;l.push({...e.configuration??{},id:t})}}return{path:e,chunkPrefix:o,dtype:t.data_type??"",littleEndian:s,codecs:l}}(n,e?`${e}/${i}`:i);return{...o?{source:o}:{},shape:n.shape??[],chunks:(null==(a=null==(r=n.chunk_grid)?void 0:r.configuration)?void 0:a.chunk_shape)??n.shape??[],dtype:n.data_type??"float32",dims:n.dimension_names??[],attrs:n.attributes??{}}})}async function tV(t,e={}){let i=U(t).replace(/\/$/,""),{signal:r}=e,a=()=>{if(null!=r&&r.aborted)throw r.reason instanceof Error?r.reason:new DOMException("The metadata read was aborted.","AbortError")},n=null,o=t=>401===t?2:+(403===t),s=async t=>{a();let s=`${i}/${t}`,l=await O(e.getAuthHeaders,s);a();try{let t=await fetch(s,{credentials:"same-origin",headers:l,...r?{signal:r}:{}});if(!t.ok){let e="number"==typeof t.status?t.status:null;return null!==e&&(null===n||o(e)>o(n))&&(n=e),null}return await t.json()}catch{return a(),null}},l=2,d=await s(".zmetadata");if(d||(l=3,d=await s("zarr.json")),!d){let t=null===n?"":` - the store answered ${n}`;throw new tN(`Could not read zarr metadata (.zmetadata or zarr.json)${t}`,n)}return 2===l?function(t){let e=t.metadata??{},i=new Set;for(let t of Object.keys(e))".zgroup"===t||".zattrs"===t||t.endsWith("/.zgroup")&&i.add(t.slice(0,-8));if(0===i.size){let t=tF(e,"");if(!tH(t))throw Error("No arrays found in .zmetadata");return{groups:null,...t}}let r={},a=tF(e,"");for(let t of(tH(a)&&(r["/"]=a),[...i].sort())){let i=tF(e,`${t}/`);tH(i)&&(r[t]=i)}if(!Object.keys(r).length)throw Error("No arrays found in .zmetadata");return{groups:r}}(d):function(t){var e;let i=(null==(e=t.consolidated_metadata)?void 0:e.metadata)??{};if(!Object.keys(i).length)throw Error("zarr.json has no consolidated_metadata");let r=new Set;for(let[t,e]of Object.entries(i))t&&"group"===e.node_type&&r.add(t);if(0===r.size){let t=tP(i,"");if(!tH(t))throw Error("No arrays found in zarr.json");return{groups:null,...t}}let a={},n=tP(i,"");for(let t of(tH(n)&&(a["/"]=n),[...r].sort())){let e=tP(i,t);tH(e)&&(a[t]=e)}if(!Object.keys(a).length)throw Error("No arrays found in zarr.json");return{groups:a}}(d)}function tZ(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}let tY=0;function tG(){return`xr${++tY}`}function tK(t){return`<svg class="icon xr-${t}"><use xlink:href="#${t}"></use></svg>`}function tJ(t){let e=Object.entries(t);return e.length?`<dl class='xr-attrs'>${e.map(([t,e])=>`<dt><span>${tZ(t)} :</span></dt><dd>${tZ(String(e))}</dd>`).join("")}</dl>`:"<em>No attributes</em>"}function tW(t){return t<1024?t+" B":t<1048576?(t/1024).toFixed(2)+" KiB":t<0x40000000?(t/1048576).toFixed(2)+" MiB":(t/0x40000000).toFixed(2)+" GiB"}function tX(t,e){return`<ul class='xr-var-list'>${Object.entries(t).map(([t,i])=>{var r,a,n;let o,s,l,d;return`<li class='xr-var-item'>${r=e.has(t),o=tG(),s=tG(),l=Object.keys(i.attrs).length>0,`
    <div class='xr-var-name'><span${r?" class='xr-has-index'":""}>${tZ(t)}</span></div>
    <div class='xr-var-dims'>(${i.dims.map(tZ).join(", ")})</div>
    <div class='xr-var-dtype'>${tZ((null==(a=i._values)?void 0:a.dtype)??i.dtype)}</div>
    <div class='xr-var-preview xr-preview'>${tZ((null==(n=i._values)?void 0:n.preview)??(0===(d=i.shape.reduce((t,e)=>t*e,1))?"[]":`${i.dtype} (${i.shape.join(" \xd7 ")} = ${d.toLocaleString()})`))}</div>
    <input id='${o}' class='xr-var-attrs-in' type='checkbox'${l?"":" disabled"}>
    <label for='${o}' title='Show/Hide attributes'>${tK("icon-file-text2")}</label>
    <input id='${s}' class='xr-var-data-in' type='checkbox'>
    <label for='${s}' title='Show/Hide data repr'>${tK("icon-database")}</label>
    <div class='xr-var-attrs'>${tJ(i.attrs)}</div>
    <div class='xr-var-data'>${i._values?`<pre>${tZ(i._values.repr)}</pre>`:""}${function(t){var e;let{shape:i,chunks:r,dtype:a}=t,n={int8:1,uint8:1,bool:1,int16:2,uint16:2,int32:4,uint32:4,float32:4,int64:8,uint64:8,float64:8}[a]??4,o=i.reduce((t,e)=>t*e,1)*n,s=null,l=null;r&&r.length===i.length&&(s=r.reduce((t,e)=>t*e,1)*n,l=i.reduce((t,e,i)=>t*Math.ceil(e/r[i]),1));let d=(t,e,i="")=>`<tr><td style="color:var(--xr-font-color3);padding:2px 16px 2px 0;white-space:nowrap;vertical-align:top">${t}</td><td style="padding:2px 16px 2px 0;white-space:nowrap;vertical-align:top">${e}</td><td style="padding:2px 0;white-space:nowrap;color:var(--xr-font-color2);vertical-align:top">${i}</td></tr>`;return`<table style="border-collapse:collapse;padding:6px 0 12px"><tr>
    <td style="vertical-align:top;padding:0">
      <table style="font-size:12px;font-family:monospace;border-collapse:collapse;line-height:1.75">
        <thead><tr>
          <th style="font-weight:400;padding:0 16px 5px 0;text-align:left"></th>
          <th style="font-weight:600;padding:0 16px 5px 0;text-align:left">Array</th>
          <th style="font-weight:600;padding:0 0 5px 0;text-align:left">Chunk</th>
        </tr></thead><tbody>
          ${d("Bytes",tW(o),null!==s?tW(s):"—")}
          ${d("Shape","("+i.join(", ")+")",r?"("+r.join(", ")+")":"—")}
          ${null!==l?d("Chunks",l.toLocaleString()+" chunks"):""}
          ${d("dtype",tZ((null==(e=t._values)?void 0:e.dtype)??a))}
          ${d("dims","("+t.dims.join(", ")+")")}
        </tbody>
      </table>
    </td>
    <td style="vertical-align:middle;padding:0 0 0 32px">${function(t){if(!t.length)return"";let e=Math.min(t.length,3),i=t.slice(-e),r=t=>Math.max(20,Math.min(110,20+30*Math.log10(Math.max(1,t)))),a="font-size:11px;fill:var(--xr-font-color2);font-family:monospace";if(e<3){let t=r(i[e-1]),n=2===e?r(i[0]):12,o=2===e?42:2,s=o+t+4,l=n+16;return`<svg width="${Math.ceil(s)}" height="${Math.ceil(l)}"
        viewBox="0 0 ${Math.ceil(s)} ${Math.ceil(l)}"
        style="overflow:visible;display:block;flex-shrink:0">
      <rect x="${o}" y="0" width="${t}" height="${n}"
            style="fill:var(--xr-chunk-face);stroke:var(--xr-chunk-edge);stroke-width:0.8"/>
      ${2===e?`<text x="${o-5}" y="${n/2+4}"
            text-anchor="end" style="${a}">${i[0].toLocaleString()}</text>`:""}
      <text x="${o+t/2}" y="${n+16-3}"
            text-anchor="middle" style="${a}">${i[e-1].toLocaleString()}</text>
    </svg>`}let n=r(i[2]),o=r(i[1]),s=r(i[0]),l=.5*s,d=.5*s*.45,c=n+l+52,u=16+o+d+16,h=16+o+d;return`<svg width="${Math.ceil(c)}" height="${Math.ceil(u)}"
      viewBox="0 0 ${Math.ceil(c)} ${Math.ceil(u)}"
      style="overflow:visible;display:block;flex-shrink:0">
    <polygon points="2,${h} ${2+n},${h} ${2+n},${h-o} 2,${h-o}"
             style="fill:var(--xr-chunk-face);stroke:var(--xr-chunk-edge);stroke-width:0.8"/>
    <polygon points="2,${h-o} ${2+n},${h-o} ${2+n+l},${h-o-d} ${2+l},${h-o-d}"
             style="fill:var(--xr-chunk-top);stroke:var(--xr-chunk-edge);stroke-width:0.8"/>
    <polygon points="${2+n},${h} ${2+n+l},${h-d} ${2+n+l},${h-o-d} ${2+n},${h-o}"
             style="fill:var(--xr-chunk-side);stroke:var(--xr-chunk-edge);stroke-width:0.8"/>
    <text x="${2+n/2}" y="${h+16-3}"
          text-anchor="middle" style="${a}">${i[2].toLocaleString()}</text>
    <text x="${2+n/2+l/2}" y="13"
          text-anchor="middle" style="${a}">${i[1].toLocaleString()}</text>
    <text x="${2+n+l+5}" y="${h-o/2-d/2+4}"
          text-anchor="start" style="${a}">${i[0].toLocaleString()}</text>
  </svg>`}(i)}</td>
  </tr></table>`}(i)}</div>
  `}</li>`}).join("")}</ul>`}function tQ(t,e,i,r,a,n){let o=tG(),s=(r??0)>0,l=null!==r?` <span>(${r})</span>`:"",d=a&&s?"":" disabled";return`
    <input id='${o}' class='xr-section-summary-in' type='checkbox'${d}${n||!s?"":" checked"} />
    <label for='${o}' class='xr-section-summary'${""===d?" title='Expand/collapse section'":""}>${t}${l}</label>
    <div class='xr-section-inline-details'>${e}</div>
    ${i?`<div class='xr-section-details'>${i}</div>`:""}
  `}let t1=`<svg class="xr-icons" aria-hidden="true"><defs>
<symbol id="icon-database" viewBox="0 0 32 32">
  <path d="M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5z"/>
  <path d="M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"/>
  <path d="M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"/>
</symbol>
<symbol id="icon-file-text2" viewBox="0 0 32 32">
  <path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"/>
</symbol>
</defs></svg>`;function t0(t){var e;let i=new Set(Object.keys(t.coords)),r=[];return r.push(tQ("Dimensions:",(e=t.dims,Object.keys(e).length?`<ul class='xr-dim-list'>${Object.entries(e).map(([t,e])=>`<li><span${i.has(t)?" class='xr-has-index'":""}>${tZ(t)}</span>: ${e}</li>`).join("")}</ul>`:""),"",Object.keys(t.dims).length,!1,!0)),Object.keys(t.coords).length&&r.push(tQ("Coordinates:","",tX(t.coords,i),Object.keys(t.coords).length,!0,!1)),r.push(tQ("Data variables:","",tX(t.data_vars,new Set),Object.keys(t.data_vars).length,!0,!1)),Object.keys(t.attrs).length&&r.push(tQ("Attributes:","",tJ(t.attrs),Object.keys(t.attrs).length,!0,!0)),`<div class='xr-root'>
    <div class='xr-wrap'>
      <div class='xr-header'><div class='xr-obj-type'>xarray.Dataset</div></div>
      <ul class='xr-sections'>${r.map(t=>`<li class='xr-section-item'>${t}</li>`).join("")}</ul>
    </div>
  </div>`}function t2(t){if(!t.groups)return`${t1}${t0(t)}`;let e=Object.entries(t.groups).map(([t,e])=>`
    <details open style="margin-bottom:10px;border:1px solid var(--xr-border-color);border-radius:4px;overflow:hidden">
      <summary class="xr-group-summary">
        <span class="xr-group-marker" aria-hidden="true"></span>
        <span>Group: ${tZ(t)}</span>
      </summary>
      <div style="padding:0 12px 8px">${t0(e)}</div>
    </details>
  `).join("");return`${t1}<div style="font-family:monospace">${e}</div>`}let t3=`
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
`,t4=!1;function t6(t={}){if(t4||typeof document>"u")return;t4=!0;let e="u">typeof window?window.MAIN_COLOR:void 0,i=(t.mainColor??e??"#9b7a52").replace(/^#/,""),r=parseInt(i.slice(0,2),16),a=parseInt(i.slice(2,4),16),n=parseInt(i.slice(4,6),16),o=t=>`rgb(${Math.min(255,r*t|0)},${Math.min(255,a*t|0)},${Math.min(255,n*t|0)})`,s=(t,e)=>`rgba(${Math.min(255,r*t|0)},${Math.min(255,a*t|0)},${Math.min(255,n*t|0)},${e})`,l=`rgb(${255-r},${255-a},${255-n})`,d=`
    :root{--xr-chunk-face:${o(.85)};--xr-chunk-top:${o(1.25)};--xr-chunk-side:${o(.55)};--xr-chunk-edge:${l}}
    html[data-theme="dark"],body[data-theme="dark"],body.vscode-dark{
      --xr-chunk-face:${s(.85,.65)};--xr-chunk-top:${s(1.25,.65)};--xr-chunk-side:${s(.55,.65)};--xr-chunk-edge:${l}
    }
  `+t3;try{if("function"==typeof CSSStyleSheet&&Array.isArray(document.adoptedStyleSheets)){let t=new CSSStyleSheet;t.replaceSync(d),document.adoptedStyleSheets=[...document.adoptedStyleSheets,t];return}}catch{}let c=document.createElement("style");c.setAttribute("data-xarray-repr","1"),c.textContent=d,document.head.appendChild(c)}async function t5(t,e={}){!1!==e.injectCss&&t6({mainColor:e.mainColor});let i=await tV(t,{getAuthHeaders:e.getAuthHeaders,signal:e.signal});return await tD(t,i,{getAuthHeaders:e.getAuthHeaders,signal:e.signal}),t2(i)}function t8(t){let e=t.trim();return/^https?:\/\//i.test(e)||/\.zarr\/?$/i.test(e)}function t9(t){return Object.keys(t).some(t=>"authorization"===t.toLowerCase())}function t7(t){return/\/data-portal\/share\//.test(t)}let et={1:"The data-loader could not convert this data",2:"The data-loader could not find this file",5:"The conversion is gone - it expired, or the data-loader never picked it up",6:"You are not allowed to read this file"};function ee(t,e=300){let i={},r=e;for(let[e,a]of Object.entries(t??{}))if(null!=a&&""!==a&&!1!==a){if("timeout"===e){"number"==typeof a&&a>0&&(r=a);continue}i[e]=a}return{options:i,timeoutS:r}}class ei extends Error{constructor(t,e){super(e),this.name="PortalError",this.status=t}}function er(t,e={}){let i=e.dataPortalBase?e.dataPortalBase.replace(/\/+$/,""):null,r=null!==i&&!1!==e.dataLoader,a=e.isStore??t8,n=e.shareTtlSeconds??3600,o=e.pollMs??1500,s=e.startupGraceMs??3e4,l="function"==typeof e.signIn?e.signIn:null,d=t=>O(e.getAuthHeaders,t),c=0,u=null,h=!1;async function p(t,e,r){let a=`${i}${t}`,n={...await d(a)};void 0!==e.body&&(n["Content-Type"]="application/json");let o=await fetch(a,{method:e.method??"GET",credentials:"same-origin",headers:n,...void 0!==e.body?{body:JSON.stringify(e.body)}:{},signal:r});if(!o.ok){var s;let t="";try{let e=await o.clone().json();"string"==typeof e.detail&&(t=e.detail)}catch{}let e=401===(s=o.status)?"Sign in again to continue.":403===s?"Access denied.":404===s?"Not found.":429===s?"Rate-limited - wait a moment and try again.":s>=500?"Service error - try again.":`Request failed (${s}).`;throw new ei(o.status,t&&!e.includes(t)?`${e} ${t}`:e)}return await o.json()}async function g(g,f){if(h)return;let m=++c;null==u||u.abort();let b=new AbortController;u=b;let v=()=>h||m!==c,x=(Array.isArray(g)?g:[g]).map(t=>String(t).trim()).filter(Boolean);if(!x.length)return;let{options:y,timeoutS:w}=ee(f,e.timeoutSeconds??300),_=Array.isArray(g);_&&"aggregationConfig"in t&&(t.aggregationConfig=f??null);let k=_?JSON.stringify(x):x[0];for(let e of(t.getAttribute("file")!==k&&t.setAttribute("file",k),t.hasAttribute("is-aggregation")!==_&&(_?t.setAttribute("is-aggregation",""):t.removeAttribute("is-aggregation")),!_&&"loadOptions"in t&&(t.loadOptions=f??null),t.error=null,["error-action","zarr-status-code","viewer-disabled"]))t.removeAttribute(e);t.setAttribute("status","loading");let $=x.length>1?"Aggregating these files":"This file isn’t a zarr store - inspecting it",z=(e,i=!1)=>{v()||(t.error=e,i&&l&&t.setAttribute("error-action","Sign in"),t.setAttribute("status","error"))},A=async e=>{let r="the server did not return one";if(i)try{let t=await p("/share-zarr",{method:"POST",body:{path:e,ttl_seconds:n}},b.signal);if("string"==typeof(null==t?void 0:t.url)&&t.url)return t.url}catch(t){t instanceof ei&&(r=`the server answered ${t.status}`)}else r="no data-portal is configured to make one";return v()||t.setAttribute("viewer-disabled",`The 3D viewer needs a share link for this protected store, and none could be made (${r}). Load it again to retry.`),e},C="",M=null,S=!1,E=async t=>{let e=await d(t);return t9(e)&&(S=!0),e};if(1===x.length&&!Object.keys(y).length&&a(x[0])){t.setAttribute("zarr-url",x[0]);try{let e=await t5(x[0],{getAuthHeaders:E,signal:b.signal});if(v())return;if(S&&!t7(x[0])){let e=await A(x[0]);if(v())return;t.setAttribute("zarr-url",e)}t.output=e,t.setAttribute("status","ready");return}catch(e){if(v())return;C=e instanceof Error?e.message:String(e),M=e instanceof tN?e.status:null,t.removeAttribute("zarr-url")}}if(401===M||403===M){let t=r&&t9(await d(`${i}/zarr/convert`));if(v())return;if(!t)return void(S?401===M?z("This store did not accept your sign-in (401) - sign in again to continue.",!0):z("You are not allowed to read this store (403)."):z(`This store needs sign-in (it answered ${M}).`,!0))}if(!r){let t=C?` (${C})`:"",e=i?"the data-portal's conversion is not enabled here":"no data-portal is configured";z(x.length>1?`Aggregating these files needs the data-portal's conversion, and ${e}.`:`This could not be read as a zarr store${t}, and ${e} to convert it.`);return}let T=t9(await d(`${i}/zarr/convert`));if(!v()){if(!T)return void z(`${$} needs sign-in`,!0);t.setAttribute("zarr-status-code","3");try{let e={...y,path:1===x.length?x[0]:x,...x.length>1&&!y.aggregate?{aggregate:"auto"}:{}},{urls:i}=await p("/zarr/convert",{method:"POST",body:e},b.signal);if(v())return;let r=Array.isArray(i)?i[0]:void 0;if("string"!=typeof r||!r)throw Error("The data-loader returned no store URL.");let a=t7(r)?r:await A(r);if(v())return;t.setAttribute("zarr-url",a);let n=Date.now(),l=n+1e3*w,c=!1;for(;;){let e=await p(`/zarr-utils/status?url=${encodeURIComponent(r)}&timeout=1`,{},b.signal);if(v())return;let i="number"==typeof e.status?e.status:5;if(0===i){t.setAttribute("zarr-status-code","0");break}let a=5===i&&!c&&Date.now()-n<s;if(!a&&i in et){t.setAttribute("zarr-status-code",String(i));let r="string"==typeof e.reason&&e.reason?`: ${e.reason}`:".";throw Error(`${et[i]}${r}`)}if(a||(c=!0),t.setAttribute("zarr-status-code",String(a?3:i)),Date.now()>l)throw Error(`The conversion did not finish within ${w} s - try again, or raise the timeout.`);if(await function(t,e){return new Promise(i=>{let r=setTimeout(i,t);e.addEventListener("abort",()=>{clearTimeout(r),i()},{once:!0})})}(o,b.signal),v())return}let u=await t5(r,{getAuthHeaders:d,signal:b.signal});if(v())return;t.output=u,t.setAttribute("status","ready")}catch(t){if(v()||b.signal.aborted)return;if((t instanceof ei||t instanceof tN)&&401===t.status)return void z(`${$} needs sign-in - your session has ended`,!0);z(t instanceof Error?t.message:String(t))}}}let f=t=>{let e=t.detail,i=null==e?void 0:e.file,r=null!=e&&e.aggregationConfig&&"object"==typeof e.aggregationConfig?e.aggregationConfig:null;("string"==typeof i||Array.isArray(i))&&g(i,r)},m=()=>{null==l||l()};return t.addEventListener("inspector-submit",f),t.addEventListener("inspector-error-action",m),{load:g,detach(){h||(h=!0,null==u||u.abort(),t.removeEventListener("inspector-submit",f),t.removeEventListener("inspector-error-action",m))}}}i.d(e,{AggregationConfigElement:()=>s,DataInspectorElement:()=>x,ZarrLoadingStepsElement:()=>E,ZarrMetadataError:()=>tN,ZarrPoller:()=>B,attachInspector:()=>er,buildXarrayRepr:()=>t2,convertOptions:()=>ee,detectZarrStore:()=>D,injectXarrayCss:()=>t6,loadZarrMetadataHtml:()=>t5,looksLikeStore:()=>t8,openDatasetMeta:()=>tV,scopedBearerAuth:()=>L},{NcDumpDialogState:l})}}]);