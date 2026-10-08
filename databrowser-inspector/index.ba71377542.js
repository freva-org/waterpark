const ct = `<svg viewBox="0 0 448 512" width="10" height="10" style="vertical-align:middle;">
  <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667
    c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335
    24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941
    L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" fill="currentColor"/>
</svg>`, ut = `<svg viewBox="0 0 256 512" width="6" height="10" style="vertical-align:middle;">
  <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6
    0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4
    24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" fill="currentColor"/>
</svg>`, K = {
  aggregate: "auto",
  join: null,
  compat: null,
  data_vars: null,
  coords: null,
  dim: "",
  group_by: "",
  reload: !1,
  access_pattern: "map",
  chunk_size: 16,
  map_primary_chunksize: 1,
  timeout: 120
};
function G(i) {
  return String(i ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
class qt extends HTMLElement {
  constructor() {
    super(...arguments), this._config = { ...K }, this._showAdvanced = !1, this._handleChange = (t) => {
      const e = t.target, r = e.dataset.field;
      if (!r) return;
      let a;
      if (e.type === "checkbox")
        a = e.checked;
      else if (e.type === "number") {
        const o = parseFloat(e.value);
        a = Number.isFinite(o) ? o : parseInt(e.value, 10);
      } else
        a = e.value === "" ? null : e.value;
      this._config = { ...this._config, [r]: a }, this._emitChange(), this._updateConditionals();
    }, this._handleClick = (t) => {
      if (t.target.closest("#nc-advanced-toggle")) {
        this._showAdvanced = !this._showAdvanced;
        const e = this.querySelector(".nc-advanced"), r = this.querySelector(".nc-chevron");
        e && (e.style.display = this._showAdvanced ? "block" : "none"), r && (r.innerHTML = this._showAdvanced ? ct : ut);
      }
    };
  }
  connectedCallback() {
    try {
      const t = JSON.parse(
        this.getAttribute("initial-config") ?? "{}"
      );
      this._config = { ...K, ...t };
    } catch {
      this._config = { ...K };
    }
    this._render(), this.addEventListener("change", this._handleChange), this.addEventListener("click", this._handleClick);
  }
  /** The values the form shows. Setting it redraws the form (the Advanced section stays as is). */
  get config() {
    return { ...this._config };
  }
  set config(t) {
    if (this._config = { ...K, ...t ?? {} }, !this.isConnected) return;
    this._render();
    const e = this._config;
    this.querySelectorAll("[data-field]").forEach((r) => {
      const a = e[r.dataset.field ?? ""];
      r instanceof HTMLInputElement && r.type === "checkbox" ? r.checked = !!a : r.value = a == null ? "" : String(a);
    });
  }
  disconnectedCallback() {
    this.removeEventListener("change", this._handleChange), this.removeEventListener("click", this._handleClick);
  }
  _emitChange() {
    this.dispatchEvent(
      new CustomEvent("config-change", {
        bubbles: !0,
        composed: !0,
        detail: this._config
      })
    );
  }
  /** Show/hide conditional fields without re-rendering. */
  _updateConditionals() {
    const t = this.querySelector(".nc-dim-field"), e = this.querySelector(".nc-map-chunksize");
    t && (t.style.display = this._config.aggregate === "concat" ? "block" : "none"), e && (e.style.display = this._config.access_pattern === "map" ? "block" : "none");
  }
  _render() {
    const t = this._config;
    this.innerHTML = `
      <div class="aggregation-config">

        <!-- Aggregation Method -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Aggregation Method</label>
          <select class="form-select form-select-sm" data-field="aggregate">
            <option value="auto"   ${t.aggregate === "auto" ? "selected" : ""}>Auto (Detect automatically)</option>
            <option value="merge"  ${t.aggregate === "merge" ? "selected" : ""}>Merge (Combine variables)</option>
            <option value="concat" ${t.aggregate === "concat" ? "selected" : ""}>Concat (Join along dimension)</option>
          </select>
          <div class="form-text text-muted">Auto mode will automatically detect the best aggregation method</div>
        </div>

        <!-- Timeout -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Timeout (seconds)</label>
          <input type="number" class="form-control form-control-sm"
            data-field="timeout" min="10" max="3600" value="${G(t.timeout ?? 120)}">
          <div class="form-text text-muted">
            Max wait time for the aggregation to complete (default: 120 s). Increase for large datasets.
          </div>
        </div>

        <!-- Advanced Toggle -->
        <button type="button" id="nc-advanced-toggle"
          class="btn btn-link btn-sm p-0 mb-3 text-decoration-none">
          <span class="nc-chevron">${this._showAdvanced ? ct : ut}</span>
          <span class="ms-2">Advanced Options</span>
        </button>

        <!-- Advanced Options -->
        <div class="nc-advanced" style="display:${this._showAdvanced ? "block" : "none"};">

          <!-- Dimension (concat only) -->
          <div class="mb-3 nc-dim-field" style="display:${t.aggregate === "concat" ? "block" : "none"};">
            <label class="form-label">Dimension to Concatenate Along</label>
            <input type="text" class="form-control form-control-sm"
              data-field="dim" placeholder="e.g., time, ensemble" value="${G(t.dim)}">
            <div class="form-text text-muted">Leave empty to create a new dimension</div>
          </div>

          <!-- Join Mode -->
          <div class="mb-3">
            <label class="form-label">Join Mode</label>
            <select class="form-select form-select-sm" data-field="join">
              <option value=""      ${t.join ? "" : "selected"}>Default</option>
              <option value="outer" ${t.join === "outer" ? "selected" : ""}>Outer (Union)</option>
              <option value="inner" ${t.join === "inner" ? "selected" : ""}>Inner (Intersection)</option>
              <option value="left"  ${t.join === "left" ? "selected" : ""}>Left</option>
              <option value="right" ${t.join === "right" ? "selected" : ""}>Right</option>
              <option value="exact" ${t.join === "exact" ? "selected" : ""}>Exact (Must match)</option>
            </select>
          </div>

          <!-- Compatibility Mode -->
          <div class="mb-3">
            <label class="form-label">Compatibility Mode</label>
            <select class="form-select form-select-sm" data-field="compat">
              <option value=""              ${t.compat ? "" : "selected"}>Default</option>
              <option value="no_conflicts"  ${t.compat === "no_conflicts" ? "selected" : ""}>No Conflicts</option>
              <option value="equals"        ${t.compat === "equals" ? "selected" : ""}>Equals</option>
              <option value="override"      ${t.compat === "override" ? "selected" : ""}>Override</option>
            </select>
          </div>

          <!-- Data Variables -->
          <div class="mb-3">
            <label class="form-label">Data Variables Handling</label>
            <select class="form-select form-select-sm" data-field="data_vars">
              <option value=""          ${t.data_vars ? "" : "selected"}>Default</option>
              <option value="minimal"   ${t.data_vars === "minimal" ? "selected" : ""}>Minimal</option>
              <option value="different" ${t.data_vars === "different" ? "selected" : ""}>Different</option>
              <option value="all"       ${t.data_vars === "all" ? "selected" : ""}>All</option>
            </select>
          </div>

          <!-- Coordinates -->
          <div class="mb-3">
            <label class="form-label">Coordinates Handling</label>
            <select class="form-select form-select-sm" data-field="coords">
              <option value=""          ${t.coords ? "" : "selected"}>Default</option>
              <option value="minimal"   ${t.coords === "minimal" ? "selected" : ""}>Minimal</option>
              <option value="different" ${t.coords === "different" ? "selected" : ""}>Different</option>
              <option value="all"       ${t.coords === "all" ? "selected" : ""}>All</option>
            </select>
          </div>

          <!-- Group By -->
          <div class="mb-3">
            <label class="form-label">Group By (Optional)</label>
            <input type="text" class="form-control form-control-sm"
              data-field="group_by" placeholder="e.g., ensemble, variable" value="${G(t.group_by)}">
            <div class="form-text text-muted">Group files by a specific attribute</div>
          </div>

          <!-- Reload Cache -->
          <div class="mb-3">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="aggregation-reload"
                data-field="reload" ${t.reload ? "checked" : ""}>
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
              <option value="map"         ${t.access_pattern === "map" ? "selected" : ""}>Map (spatial slices)</option>
              <option value="time_series" ${t.access_pattern === "time_series" ? "selected" : ""}>Time Series (temporal slices)</option>
            </select>
            <div class="form-text text-muted">Optimize chunk layout for your typical data access pattern</div>
          </div>

          <!-- Chunk Size -->
          <div class="mb-3">
            <label class="form-label">Target Chunk Size (MB)</label>
            <input type="number" class="form-control form-control-sm"
              data-field="chunk_size" step="0.1" min="1" max="1000" value="${G(t.chunk_size ?? 16)}">
            <div class="form-text text-muted">Target size for data chunks (default: 16 MB)</div>
          </div>

          <!-- Map Primary Chunksize (map pattern only) -->
          <div class="mb-3 nc-map-chunksize" style="display:${t.access_pattern === "map" ? "block" : "none"};">
            <label class="form-label">Primary Dimension Chunk Size</label>
            <input type="number" class="form-control form-control-sm"
              data-field="map_primary_chunksize" min="1" value="${G(t.map_primary_chunksize ?? 1)}">
            <div class="form-text text-muted">Number of time steps per chunk (for map access pattern)</div>
          </div>

        </div>
      </div>`;
  }
}
const R = {
  ERROR: "error",
  READY: "ready",
  LOADING: "loading"
}, pt = {
  aggregate: "auto",
  join: null,
  compat: null,
  data_vars: null,
  coords: null,
  dim: "",
  group_by: "",
  reload: !1,
  access_pattern: "map",
  chunk_size: 16,
  map_primary_chunksize: 1,
  timeout: 120
}, Rt = "https://gridlook.pages.dev/";
function tt(i) {
  return `${Rt}#${i}`;
}
function Dt(i) {
  var e;
  const t = navigator;
  return (e = t.clipboard) != null && e.writeText ? t.clipboard.writeText(i) : new Promise((r, a) => {
    try {
      const o = document.createElement("textarea");
      o.value = i, o.style.position = "fixed", o.style.opacity = "0", document.body.appendChild(o), o.focus(), o.select(), document.execCommand("copy"), document.body.removeChild(o), r();
    } catch (o) {
      a(o instanceof Error ? o : new Error(String(o)));
    }
  });
}
function $(i, t = !1) {
  return `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" style="vertical-align:-0.14em;flex-shrink:0${t ? ";margin-right:.5em" : ""}">${i}</svg>`;
}
const k = {
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11.5v5"/><circle cx="12" cy="7.8" r="0.6" fill="currentColor" stroke="none"/>',
  layers: '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
  load: '<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 4v4h-4"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  ban: '<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
  link: '<path d="M9.5 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 1 0-5.7-5.7l-1 1"/><path d="M14.5 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 1 0 5.7 5.7l1-1"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  database: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
  cube: '<path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3Z"/><path d="m3 7.5 9 4.5 9-4.5"/><path d="M12 12v9"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 4v4h-4"/>',
  compress: '<path d="M9 5v4H5"/><path d="m4 4 5 5"/><path d="M15 5v4h4"/><path d="m20 4-5 5"/><path d="M9 19v-4H5"/><path d="m4 20 5-5"/><path d="M15 19v-4h4"/><path d="m20 20-5-5"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5"/><circle cx="12" cy="16.3" r="0.6" fill="currentColor" stroke="none"/>'
}, ht = `
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
`;
let gt = !1;
function Bt() {
  if (gt || typeof document > "u") return;
  gt = !0;
  try {
    if (typeof CSSStyleSheet == "function" && Array.isArray(document.adoptedStyleSheets)) {
      const t = new CSSStyleSheet();
      t.replaceSync(ht), document.adoptedStyleSheets = [...document.adoptedStyleSheets, t];
      return;
    }
  } catch {
  }
  const i = document.createElement("style");
  i.setAttribute("data-data-inspector", "1"), i.textContent = ht, document.head.appendChild(i);
}
class Ut extends HTMLElement {
  constructor() {
    super(...arguments), this._pathInput = "", this._loadOptions = null, this._copied = !1, this._gridlookCopied = !1, this._activeTab = "metadata", this._dropdownOpen = !1, this._aggregationConfig = { ...pt }, this._output = null, this._built = !1, this._builtMode = !1, this._domOutput = void 0, this._domIframeUrl = void 0, this._domFileKey = void 0, this._copyTimer = null, this._gridlookTimer = null, this._restoreFocusTo = null, this._onOutsideClick = (t) => {
      const e = this.querySelector("#nc-dropdown-wrap");
      e && !e.contains(t.target) && this._dropdownOpen && (this._dropdownOpen = !1, this._syncDropdown());
    };
  }
  // ── Observed attributes ───────────────────────────────────────────────────
  static get observedAttributes() {
    return [
      "open",
      "file",
      "status",
      "error",
      "zarr-url",
      "zarr-status-code",
      "is-aggregation",
      "error-action",
      "viewer-disabled",
      "viewer-off",
      "embedded",
      "view"
    ];
  }
  /** Without dialog chrome, inside a host's own pane (see the `embedded` attribute). */
  get embedded() {
    return this.hasAttribute("embedded");
  }
  set embedded(t) {
    t ? this.setAttribute("embedded", "") : this.removeAttribute("embedded");
  }
  /** The view asked for (`view`): "viewer" for the 3D viewer, else the metadata. */
  get view() {
    return this.getAttribute("view") === "viewer" ? "viewer" : "metadata";
  }
  set view(t) {
    this.setAttribute("view", t);
  }
  /** The view shown now: the viewer only while it can show (a read store, not disabled). */
  get activeView() {
    return this._activeTab === "gridlook" && this._viewerAvailable() ? "viewer" : "metadata";
  }
  /** Whether the 3D viewer can show: the store was read and nothing disabled it. */
  _viewerAvailable() {
    return this.open && this.status === R.READY && this._output != null && this._output !== "" && !!this.zarrUrl && this._viewerBlocked() === null;
  }
  /** Why the viewer cannot show: the host's policy first, then this read's reason; or null. */
  _viewerBlocked() {
    return this.hasAttribute("viewer-off") ? this.getAttribute("viewer-off") || "The 3D viewer is not available here." : this.getAttribute("viewer-disabled");
  }
  _requestedTab() {
    return this.view === "viewer" ? "gridlook" : "metadata";
  }
  // ── Attribute accessors ───────────────────────────────────────────────────
  get open() {
    return this.hasAttribute("open");
  }
  set open(t) {
    t ? this.setAttribute("open", "") : this.removeAttribute("open");
  }
  get file() {
    const t = this.getAttribute("file");
    if (!t) return null;
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
  }
  set file(t) {
    t === null ? this.removeAttribute("file") : this.setAttribute("file", Array.isArray(t) ? JSON.stringify(t) : t);
  }
  get status() {
    return this.getAttribute("status") ?? R.READY;
  }
  set status(t) {
    this.setAttribute("status", t);
  }
  /** Trusted xarray-repr HTML string. Setting triggers re-render. */
  get output() {
    return this._output;
  }
  set output(t) {
    this._output = t, this.isConnected && this._render();
  }
  get error() {
    return this.getAttribute("error");
  }
  set error(t) {
    t === null ? this.removeAttribute("error") : this.setAttribute("error", t);
  }
  get zarrUrl() {
    return this.getAttribute("zarr-url");
  }
  set zarrUrl(t) {
    t === null ? this.removeAttribute("zarr-url") : this.setAttribute("zarr-url", t);
  }
  get zarrStatusCode() {
    const t = this.getAttribute("zarr-status-code");
    return t === null ? null : parseInt(t, 10);
  }
  set zarrStatusCode(t) {
    t === null ? this.removeAttribute("zarr-status-code") : this.setAttribute("zarr-status-code", String(t));
  }
  get loadOptions() {
    return this._loadOptions ? { ...this._loadOptions } : null;
  }
  set loadOptions(t) {
    this._loadOptions = t && Object.keys(t).length ? { ...t } : null;
  }
  get aggregationConfig() {
    return { ...this._aggregationConfig };
  }
  set aggregationConfig(t) {
    const e = t ? { ...t } : { ...pt };
    if (JSON.stringify(e) === JSON.stringify(this._aggregationConfig)) return;
    this._aggregationConfig = e;
    const r = this._q("#nc-agg-config");
    r && (r.setAttribute("initial-config", JSON.stringify(e)), "config" in r && (r.config = e));
  }
  get isAggregation() {
    return this.hasAttribute("is-aggregation");
  }
  set isAggregation(t) {
    t ? this.setAttribute("is-aggregation", "") : this.removeAttribute("is-aggregation");
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  connectedCallback() {
    const t = this.file;
    t && !Array.isArray(t) && (this._pathInput = t), this.open && (this._restoreFocusTo = document.activeElement), this._render(), document.addEventListener("mousedown", this._onOutsideClick);
  }
  disconnectedCallback() {
    document.removeEventListener("mousedown", this._onOutsideClick), this._clearTimers();
  }
  attributeChangedCallback(t, e, r) {
    var a, o;
    if (t === "open" && r !== null) {
      this._restoreFocusTo === null && (this._restoreFocusTo = document.activeElement), this._activeTab = this._requestedTab(), this._copied = !1, this._gridlookCopied = !1;
      const n = this.file;
      n && this._output === null && this.status === R.READY && !this.isAggregation && this._emit("inspector-submit", { file: n, aggregationConfig: null });
    }
    if (t === "file") {
      if (r && !r.startsWith("[")) {
        this._pathInput = r;
        const n = this._q("#nc-path-input");
        n && n.value !== r && (n.value = r);
      }
      e !== null && e !== r && (this._loadOptions = null, this._output = null, this._domOutput = void 0, this._activeTab = this._requestedTab(), this._copied = !1, this._gridlookCopied = !1, this.hasAttribute("error") && this.removeAttribute("error"), this.hasAttribute("zarr-url") && this.removeAttribute("zarr-url"));
    }
    if (t === "view" && (this._activeTab = this._requestedTab()), t === "embedded" && this._built && (this._built = !1), t === "status" && r === R.ERROR && (this._activeTab = "metadata"), t === "zarr-status-code" && this.isConnected && this._built) {
      const n = r ?? "3";
      (a = this.querySelector("#nc-pre-steps")) == null || a.setAttribute("status-code", n), (o = this.querySelector("#nc-body-steps")) == null || o.setAttribute("status-code", n);
      return;
    }
    this.isConnected && this._render();
  }
  // ── Event helpers ─────────────────────────────────────────────────────────
  _emit(t, e) {
    this.dispatchEvent(new CustomEvent(t, { bubbles: !0, composed: !0, detail: e }));
  }
  _clearTimers() {
    this._copyTimer !== null && (clearTimeout(this._copyTimer), this._copyTimer = null), this._gridlookTimer !== null && (clearTimeout(this._gridlookTimer), this._gridlookTimer = null);
  }
  // ── Action handlers ───────────────────────────────────────────────────────
  _handleInspect() {
    this.isAggregation ? this._emit("inspector-submit", {
      file: this.file,
      aggregationConfig: { ...this._aggregationConfig }
    }) : this._pathInput.trim() && this._emit("inspector-submit", { file: this._pathInput.trim(), aggregationConfig: null });
  }
  /**
   * Repeat the failed read with its options: an aggregation's config, or `loadOptions` while the
   * field still holds the file that was read (an edited path is a new read).
   */
  _handleRetry() {
    const t = this._pathInput.trim();
    if (this.isAggregation || !t) {
      this._handleInspect();
      return;
    }
    const e = t === this.getAttribute("file");
    this._emit("inspector-submit", {
      file: t,
      aggregationConfig: e && this._loadOptions ? { ...this._loadOptions } : null
    });
  }
  _handleInspectReload() {
    this._dropdownOpen = !1, this._syncDropdown(), this._pathInput.trim() && this._emit("inspector-submit", {
      file: this._pathInput.trim(),
      aggregationConfig: { reload: !0 }
    });
  }
  _copy(t, e) {
    Dt(t).then(() => {
      e === "zarr" ? this._copied = !0 : this._gridlookCopied = !0, this.open && this._update();
      const a = setTimeout(() => {
        e === "zarr" ? this._copied = !1 : this._gridlookCopied = !1, this.isConnected && this.open && this._update();
      }, 2e3);
      e === "zarr" ? this._copyTimer = a : this._gridlookTimer = a;
    }).catch(() => {
    });
  }
  // ── Render orchestration ──────────────────────────────────────────────────
  _render() {
    if (!this.open) {
      this._teardown();
      return;
    }
    (!this._built || this._builtMode !== this.isAggregation) && (this._domOutput = void 0, this._domIframeUrl = void 0, this._build()), this._update();
  }
  _teardown() {
    this._clearTimers(), this.innerHTML = "", this._built = !1, this._domOutput = void 0, this._domIframeUrl = void 0, this._domFileKey = void 0;
    const t = this._restoreFocusTo;
    this._restoreFocusTo = null, t && t.isConnected && typeof t.focus == "function" && t.focus();
  }
  _q(t) {
    return this.querySelector(t);
  }
  _toggle(t, e) {
    t && (t.hidden = !e);
  }
  _setCopyBtn(t, e, r) {
    const a = this._q(t);
    a && (a.setAttribute("title", e ? "Copied!" : r), a.innerHTML = $(e ? k.check : k.copy));
  }
  // ── Build the static skeleton (once per open session / mode) ───────────────
  _build() {
    Bt();
    const t = this.isAggregation;
    this._builtMode = t, this._domOutput = void 0, this._domIframeUrl = void 0, this._domFileKey = void 0;
    const e = `
      <div class="di-header">
        <div class="di-header-row">
          <div class="di-header-main">
            <h1 class="di-title">
              <span class="di-title-ico">${$(t ? k.layers : k.info)}</span>
              <span id="nc-title">${t ? "Aggregate Files" : "File Inspector"}</span>
            </h1>
            ${t ? `<div id="nc-file-list-wrap" class="di-file-list" hidden>
                     <div id="nc-file-list-label" class="di-file-list-label"></div>
                     <ul id="nc-file-list"></ul>
                   </div>` : this._pathBarHtml()}
            <div id="nc-zarr-row" class="di-zarr-row" hidden>
              <div class="di-zarr-inner">
                <span class="di-muted" style="display:inline-flex;flex-shrink:0">${$(k.link)}</span>
                <span class="di-muted" style="font-weight:500;flex-shrink:0">Zarr:</span>
                <code id="nc-zarr-url" class="di-code"></code>
                <button id="nc-copy-zarr" class="di-btn di-btn-outline" title="Copy Zarr URL">${$(k.copy)}</button>
              </div>
            </div>
          </div>
          <button id="nc-close-btn" class="di-close" aria-label="Close">&times;</button>
        </div>
      </div>`, r = t ? `<div id="nc-agg-form" class="di-agg-form" hidden>
           <h5>Aggregation Configuration</h5>
           <aggregation-config id="nc-agg-config"></aggregation-config>
           <div class="di-agg-actions">
             <button id="nc-cancel-btn" class="di-btn di-btn-secondary">Cancel</button>
             <button id="nc-aggregate-btn" class="di-btn di-btn-primary">${$(k.compress, !0)}Aggregate Files</button>
           </div>
         </div>` : "", a = `
      <div id="nc-pre-loading" class="di-center" hidden>
        <zarr-loading-steps id="nc-pre-steps" status-code="3"${t ? " is-aggregation" : ""}></zarr-loading-steps>
        <p id="nc-pre-loading-text" class="di-muted" style="margin-top:12px;font-size:13px;"></p>
      </div>`, o = `
      <div id="nc-tabs-wrap" hidden>
        <div class="di-tabs" role="tablist" aria-label="Inspector views">
          <button id="nc-tab-metadata" data-tab="metadata" class="nc-tab-btn di-tab" role="tab" aria-controls="nc-metadata" aria-selected="true">${$(k.database, !0)}Metadata</button>
          <button id="nc-tab-gridlook" data-tab="gridlook" class="nc-tab-btn di-tab" role="tab" aria-controls="nc-gridlook" aria-selected="false">${$(k.cube, !0)}3D Viewer</button>
        </div>
        <div id="nc-body" class="di-body">
          <div id="nc-error" class="di-error" hidden>
            <div class="di-error-row">
              <span class="di-error-ico">${$(k.alert)}</span>
              <div class="di-error-body">
                <strong class="di-error-title">Error loading metadata</strong>
                <div id="nc-error-msg" class="di-error-msg"></div>
                <div class="di-error-actions">
                  <button id="nc-retry-btn" class="di-btn di-btn-danger">${$(k.refresh, !0)}Retry</button>
                  <button id="nc-error-action" class="di-btn di-btn-primary" hidden></button>
                </div>
              </div>
            </div>
          </div>

          <div id="nc-loading" class="di-center" hidden>
            <zarr-loading-steps id="nc-body-steps" status-code="3"${t ? " is-aggregation" : ""}></zarr-loading-steps>
            <p id="nc-loading-text" class="di-muted" style="margin-top:12px;font-size:13px;"></p>
          </div>

          <div id="nc-metadata" class="di-metadata" role="tabpanel" aria-labelledby="nc-tab-metadata" tabindex="0" hidden>
            <div id="nc-metadata-inner"></div>
          </div>

          <div id="nc-gridlook" role="tabpanel" aria-labelledby="nc-tab-gridlook" tabindex="0" hidden>
            <div class="di-gridlook-bar">
              <div class="di-gridlook-inner">
                <span class="di-gridlook-ico">${$(k.external)}</span>
                <span class="di-gridlook-label">GridLook URL:</span>
                <code id="nc-gridlook-url" class="di-gridlook-code"></code>
                <button id="nc-copy-gridlook" class="di-btn di-gridlook-btn" title="Copy link">${$(k.copy)}</button>
                <button id="nc-refresh-gridlook" class="di-btn di-gridlook-btn" title="Refresh GridLook viewer">${$(k.refresh)}</button>
                <button id="nc-open-gridlook" class="di-btn di-gridlook-btn-primary" title="Open in new tab">${$(k.external, !0)}Open in New Tab</button>
              </div>
            </div>
            <div id="nc-gridlook-frame" class="di-gridlook-frame"></div>
          </div>

          <div id="nc-empty-body" class="di-center" hidden>
            <span class="di-empty-ico">${$(k.database)}</span>
            <p id="nc-empty-body-text" class="di-empty-text"></p>
          </div>
        </div>
      </div>`, n = `
      <div id="nc-empty-main" class="di-center" hidden>
        <span class="di-empty-ico">${$(k.database)}</span>
        <p id="nc-empty-main-text" class="di-empty-text"></p>
      </div>`;
    this.innerHTML = this.embedded ? `
      <div class="di-embedded">
        <div id="nc-zarr-row" class="di-zarr-row" hidden>
          <div class="di-zarr-inner">
            <span class="di-muted" style="display:inline-flex;flex-shrink:0">${$(k.link)}</span>
            <span class="di-muted" style="font-weight:500;flex-shrink:0">Zarr:</span>
            <code id="nc-zarr-url" class="di-code"></code>
            <button id="nc-copy-zarr" class="di-btn di-btn-outline" title="Copy Zarr URL">${$(k.copy)}</button>
          </div>
        </div>
        ${r}
        ${a}
        ${o}
        ${n}
      </div>` : `
      <div id="nc-backdrop" class="di-backdrop">
        <div class="di-modal" role="dialog" aria-modal="true" aria-labelledby="nc-title" tabindex="-1">
          ${e}
          ${r}
          ${a}
          ${o}
          ${n}
        </div>
      </div>`;
    const s = this._q("#nc-agg-config");
    s && (s.setAttribute("initial-config", JSON.stringify(this._aggregationConfig)), "config" in s && (s.config = this._aggregationConfig)), this._built = !0, this._attach(), this.embedded || this._initialFocus();
  }
  _ensureIframe() {
    const t = this._q("#nc-gridlook-iframe");
    if (t) return t;
    const e = this._q("#nc-gridlook-frame");
    if (!e) return null;
    const r = document.createElement("iframe");
    r.id = "nc-gridlook-iframe", r.title = "GridLook 3D Viewer", r.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups allow-downloads"), r.setAttribute("referrerpolicy", "no-referrer"), r.setAttribute("loading", "lazy");
    try {
      e.appendChild(r);
    } catch {
    }
    return r;
  }
  /** Assign an iframe src defensively (never let a load error abort a render). */
  _setIframeSrc(t, e) {
    try {
      t.src = e;
    } catch {
    }
  }
  _pathBarHtml() {
    return `
      <div class="di-pathbar">
        <label class="di-pathbar-label" for="nc-path-input">File path:</label>
        <div class="di-pathbar-row">
          <input id="nc-path-input" type="text" class="di-input" placeholder="/path/to/data.nc" />
          <div id="nc-dropdown-wrap" class="di-dropdown-wrap di-btn-group">
            <button id="nc-load-btn" class="di-btn di-btn-primary">${$(k.load, !0)}Load</button>
            <button id="nc-load-toggle" class="di-btn di-btn-primary di-btn-split" title="More load options">${$(k.chevronDown)}</button>
            <ul id="nc-dropdown-menu" class="di-menu" hidden>
              <li>
                <button id="nc-reload-btn" class="di-menu-item">${$(k.ban, !0)}Force Reload (bypass cache)</button>
              </li>
            </ul>
          </div>
        </div>
      </div>`;
  }
  // ── Attach listeners once (nodes persist across updates) ───────────────────
  _attach() {
    var e, r, a, o, n, s, c, d, f, h, p, v, y, M, S;
    (e = this._q("#nc-backdrop")) == null || e.addEventListener("click", (l) => {
      l.target === l.currentTarget && this._emit("inspector-close", null);
    }), (r = this._q("#nc-backdrop")) == null || r.addEventListener(
      "keydown",
      (l) => this._onKeydown(l)
    ), (a = this._q("#nc-close-btn")) == null || a.addEventListener("click", () => this._emit("inspector-close", null)), (o = this._q("#nc-cancel-btn")) == null || o.addEventListener("click", () => this._emit("inspector-close", null)), (n = this._q("#nc-load-btn")) == null || n.addEventListener("click", () => this._handleInspect()), (s = this._q("#nc-aggregate-btn")) == null || s.addEventListener("click", () => this._handleInspect()), (c = this._q("#nc-retry-btn")) == null || c.addEventListener("click", () => this._handleRetry()), (d = this._q("#nc-error-action")) == null || d.addEventListener(
      "click",
      () => this._emit("inspector-error-action", null)
    );
    const t = this._q("#nc-path-input");
    t && (t.value = this._pathInput, t.addEventListener("input", (l) => {
      this._pathInput = l.target.value;
    }), t.addEventListener("keypress", (l) => {
      l.key === "Enter" && this._handleInspect();
    })), (f = this._q("#nc-load-toggle")) == null || f.addEventListener("click", () => {
      this._dropdownOpen = !this._dropdownOpen, this._syncDropdown();
    }), (h = this._q("#nc-reload-btn")) == null || h.addEventListener("click", () => this._handleInspectReload()), (p = this._q("#nc-copy-zarr")) == null || p.addEventListener("click", () => {
      const l = this.zarrUrl;
      l && this._copy(l, "zarr");
    }), (v = this._q("#nc-copy-gridlook")) == null || v.addEventListener("click", () => {
      const l = this.zarrUrl;
      l && this._copy(tt(l), "gridlook");
    }), (y = this._q("#nc-refresh-gridlook")) == null || y.addEventListener("click", () => {
      var l;
      this.zarrUrl && ((l = this._q("#nc-gridlook-iframe")) == null || l.remove(), this._domIframeUrl = void 0, this._update());
    }), (M = this._q("#nc-open-gridlook")) == null || M.addEventListener("click", () => {
      const l = this.zarrUrl;
      l && window.open(tt(l), "_blank", "noopener,noreferrer");
    }), this.querySelectorAll(".nc-tab-btn").forEach((l) => {
      l.addEventListener("click", () => {
        const u = l.dataset.tab;
        u && !l.disabled && (this._activeTab = u, this._update());
      });
    }), (S = this._q("#nc-agg-config")) == null || S.addEventListener("config-change", (l) => {
      this._aggregationConfig = l.detail;
    });
  }
  // ── Patch dynamic state (no DOM rebuild) ───────────────────────────────────
  _update() {
    var N, I;
    const t = this.isAggregation, e = this.status, r = e === R.LOADING, a = e === R.READY, o = e === R.ERROR, n = this.zarrUrl, s = this.file, c = Array.isArray(s) ? s : [], d = this._output != null && this._output !== "", f = String(this.zarrStatusCode ?? 3), h = t ? "Aggregating files and loading metadata..." : "Loading metadata...", p = t ? "Configure aggregation settings and click 'Aggregate Files' to begin" : "Enter a file path and click Load to inspect metadata";
    if (t) {
      const w = this._q("#nc-file-list-wrap"), j = c.length > 0;
      if (this._toggle(w, j), j) {
        const L = this._q("#nc-file-list-label");
        L && (L.textContent = `Selected files (${c.length}):`);
        const D = this._q("#nc-file-list"), P = c.join("\0");
        D && this._domFileKey !== P && (D.replaceChildren(
          ...c.map((X) => {
            const g = document.createElement("li");
            return g.textContent = X, g;
          })
        ), this._domFileKey = P);
      }
    }
    if (!t) {
      const w = this._q("#nc-load-btn"), j = this._q("#nc-load-toggle");
      w && (w.disabled = r), j && (j.disabled = r), this._syncDropdown();
    }
    const y = !!n && n !== (typeof s == "string" ? s : null);
    if (this._toggle(this._q("#nc-zarr-row"), y), y && n) {
      const w = this._q("#nc-zarr-url");
      w && (w.textContent = n);
    }
    this._setCopyBtn("#nc-copy-zarr", this._copied, "Copy Zarr URL"), t && this._toggle(this._q("#nc-agg-form"), a && !d), this._toggle(this._q("#nc-pre-loading"), !n && r), this._toggle(this._q("#nc-tabs-wrap"), !!n && (d || r) || o), this._toggle(this._q("#nc-empty-main"), !n && !r && a && !d);
    const M = this._q("#nc-pre-loading-text");
    M && (M.textContent = h), (N = this._q("#nc-pre-steps")) == null || N.setAttribute("status-code", f);
    const S = this._viewerBlocked();
    S !== null && this._activeTab === "gridlook" && (this._activeTab = "metadata");
    const l = this._activeTab === "gridlook" && !(d && n) ? "metadata" : this._activeTab, u = this._q('[data-tab="metadata"]'), m = this._q('[data-tab="gridlook"]');
    if (u) {
      const w = l === "metadata";
      u.classList.toggle("di-tab-active", w), u.setAttribute("aria-selected", String(w));
    }
    if (m) {
      const w = l === "gridlook";
      m.disabled = e !== R.READY || !d || S !== null, S ? m.setAttribute("title", S) : m.removeAttribute("title"), m.classList.toggle("di-tab-active", w), m.setAttribute("aria-selected", String(w));
    }
    this._toggle(this._q("#nc-error"), o && l === "metadata");
    const _ = this._q("#nc-error-msg");
    _ && (_.textContent = this.error ?? "");
    const x = this._q("#nc-error-action");
    if (x) {
      const w = this.getAttribute("error-action");
      x.hidden = !w, x.textContent = w ?? "";
    }
    this._toggle(this._q("#nc-loading"), r);
    const b = this._q("#nc-loading-text");
    b && (b.textContent = h), (I = this._q("#nc-body-steps")) == null || I.setAttribute("status-code", f), this._toggle(
      this._q("#nc-metadata"),
      l === "metadata" && d && !r && !o
    );
    const T = this._q("#nc-metadata-inner");
    T && this._domOutput !== this._output && (T.innerHTML = this._output ?? "", this._domOutput = this._output);
    const O = l === "gridlook" && !!n;
    if (this._toggle(this._q("#nc-gridlook"), O), n) {
      const w = tt(n), j = this._q("#nc-gridlook-url");
      if (j && (j.textContent = w), O) {
        const L = this._ensureIframe();
        L && this._domIframeUrl !== w && (this._setIframeSrc(L, w), this._domIframeUrl = w);
      }
    }
    this._setCopyBtn("#nc-copy-gridlook", this._gridlookCopied, "Copy link"), this._toggle(this._q("#nc-empty-body"), !d && !r && !o);
    const E = this._q("#nc-empty-body-text");
    E && (E.textContent = p);
    const H = this._q("#nc-empty-main-text");
    H && (H.textContent = p);
  }
  _syncDropdown() {
    const t = this._q("#nc-dropdown-menu");
    t && (t.hidden = !this._dropdownOpen);
  }
  // ── Accessibility: focus trap, initial focus, Escape-to-close ─────────────
  _focusables() {
    const t = this._q(".di-modal");
    return t ? Array.from(t.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(
      (r) => !r.closest("[hidden]")
    ) : [];
  }
  _initialFocus() {
    var e;
    const t = this._q("#nc-path-input") ?? this._focusables()[0] ?? this._q(".di-modal");
    (e = t == null ? void 0 : t.focus) == null || e.call(t);
  }
  _onKeydown(t) {
    if (t.key === "Escape") {
      t.stopPropagation(), this._emit("inspector-close", null);
      return;
    }
    if (t.key !== "Tab") return;
    const e = this._focusables();
    if (e.length === 0) {
      t.preventDefault();
      return;
    }
    const r = e[0], a = e[e.length - 1], o = document.activeElement;
    t.shiftKey && (o === r || !this.contains(o)) ? (t.preventDefault(), a.focus()) : !t.shiftKey && o === a && (t.preventDefault(), r.focus());
  }
}
const Ht = `
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
`, ft = [
  { id: "submitted", label: "Submitted" },
  { id: "queued", label: "Queued" },
  { id: "converting", label: "Converting" },
  { id: "ready", label: "Ready" }
], A = {
  done: "#0d9488",
  active: "#14b8a6",
  pending: "#d1d5db",
  track: "#e5e7eb",
  textOn: "#0f766e",
  textOff: "#9ca3af",
  msg: "#6b7280",
  timer: "#d1d5db"
}, V = [
  "Reading file structure…",
  "Analysing coordinate metadata…",
  "Optimising chunk layout…",
  "Building Zarr metadata store…",
  "Assembling data variables…",
  "Applying access-pattern optimisation…",
  "Finalising dataset…"
], W = [
  "Aligning coordinate indexes…",
  "Resolving variable conflicts…",
  "Concatenating along dimension…",
  "Merging datasets…",
  "Validating compatibility…",
  "Assembling aggregated store…",
  "Almost there…"
];
function Z(i) {
  return i === 0 ? 3 : i === 4 ? 2 : i === 3 ? 1 : 0;
}
function Nt() {
  if (!document.getElementById("zarr-loading-keyframes")) {
    const i = document.createElement("style");
    i.id = "zarr-loading-keyframes", i.textContent = Ht, document.head.appendChild(i);
  }
}
function mt(i, t, e) {
  const r = i < t, a = i === t, o = r ? `<svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M1 4L3.8 7L9 1" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>` : a ? `<svg width="16" height="16" viewBox="0 0 16 16" class="zarr-spin" style="position:absolute;">
        <circle cx="8" cy="8" r="5.5" fill="none" stroke="${A.active}" stroke-width="2"
          stroke-dasharray="18 17" stroke-linecap="round"/>
       </svg>` : `<div style="width:5px;height:5px;border-radius:50%;background:${A.pending};"></div>`, n = a ? `<div style="position:absolute;width:30px;height:30px;border-radius:50%;
         border:2px solid ${A.active};animation:zarrPulseRing 2s ease-out infinite;pointer-events:none;"></div>` : "";
  return `
    ${i > 0 ? `
    <div style="flex:1;height:2px;background:${r ? `linear-gradient(90deg,${A.done},${A.active})` : A.track};
      transition:background 0.5s ease;position:relative;overflow:hidden;">
      ${a ? `<div style="position:absolute;top:0;left:0;height:100%;
        background:linear-gradient(90deg,${A.done},${A.active});
        animation:zarrTrackFill 0.6s ease forwards;"></div>` : ""}
    </div>` : ""}
    <div style="position:relative;display:flex;flex-direction:column;align-items:center;">
      ${n}
      <div style="width:22px;height:22px;border-radius:50%;
        background:${r ? A.done : a ? "#fff" : "#f9fafb"};
        border:2px solid ${r ? A.done : a ? A.active : A.pending};
        display:flex;align-items:center;justify-content:center;
        position:relative;z-index:1;
        box-shadow:${a ? "0 0 0 4px rgba(20,184,166,0.12)" : "none"};
        transition:all 0.4s ease;">
        ${o}
      </div>
      <span style="position:absolute;top:28px;font-size:10.5px;
        font-weight:${a ? 600 : 400};
        color:${r ? A.done : a ? A.textOn : A.textOff};
        white-space:nowrap;letter-spacing:0.03em;text-transform:uppercase;
        transition:color 0.4s ease;">
        ${e}
      </span>
    </div>`;
}
class Ft extends HTMLElement {
  constructor() {
    super(...arguments), this._msgIdx = 0, this._msgKey = 0, this._elapsed = 0, this._startTime = Date.now(), this._msgTimer = null, this._elapsedTimer = null;
  }
  static get observedAttributes() {
    return ["status-code", "is-aggregation"];
  }
  get statusCode() {
    return parseInt(this.getAttribute("status-code") ?? "3", 10);
  }
  get isAggregation() {
    return this.hasAttribute("is-aggregation");
  }
  connectedCallback() {
    Nt(), this._render(), this._startTimers();
  }
  disconnectedCallback() {
    this._stopTimers();
  }
  attributeChangedCallback() {
    this.isConnected && this._updateStages();
  }
  _startTimers() {
    this._startTime = Date.now(), this._elapsedTimer = setInterval(() => {
      this._elapsed = Math.floor((Date.now() - this._startTime) / 1e3);
      const t = this.querySelector(".zarr-elapsed");
      t && (t.textContent = this._formatElapsed(this._elapsed));
    }, 1e3), this._startMsgCycle();
  }
  _startMsgCycle() {
    if (this._msgTimer && clearInterval(this._msgTimer), Z(this.statusCode) !== 2) return;
    const e = this.isAggregation ? W : V;
    this._msgTimer = setInterval(() => {
      this._msgIdx = (this._msgIdx + 1) % e.length, this._msgKey += 1, this._updateMessage();
    }, 2800);
  }
  _stopTimers() {
    this._msgTimer && (clearInterval(this._msgTimer), this._msgTimer = null), this._elapsedTimer && (clearInterval(this._elapsedTimer), this._elapsedTimer = null);
  }
  _formatElapsed(t) {
    return t < 60 ? `${t}s` : `${Math.floor(t / 60)}m ${t % 60}s`;
  }
  _render() {
    const t = Z(this.statusCode), e = this.isAggregation ? W : V;
    this.innerHTML = `
      <div style="padding:28px 12px 20px;display:flex;flex-direction:column;align-items:center;gap:0;">
        <div class="zarr-stages" style="display:flex;align-items:center;width:100%;max-width:360px;margin-bottom:28px;">
          ${ft.map((r, a) => mt(a, t, r.label)).join("")}
        </div>

        <div style="height:20px;"></div>

        <div class="zarr-msg-container" style="min-height:22px;text-align:center;">
          ${this._renderMessage(t, e)}
        </div>

        <div style="margin-top:10px;">
          <span class="zarr-elapsed" style="font-size:11px;color:${A.timer};
            font-variant-numeric:tabular-nums;letter-spacing:0.05em;">
            ${this._formatElapsed(this._elapsed)}
          </span>
        </div>
      </div>`;
  }
  _renderMessage(t, e) {
    return t === 2 ? `<span key="${this._msgKey}" class="zarr-msg" style="font-size:13px;color:${A.msg};">
                ${e[this._msgIdx]}
              </span>` : t === 1 ? `<span style="font-size:13px;color:${A.msg};">Waiting for a worker to pick up the task…</span>` : "";
  }
  /** Update only the stage dots (called when statusCode changes). */
  _updateStages() {
    const t = Z(this.statusCode), e = this.querySelector(".zarr-stages");
    e && (e.innerHTML = ft.map((a, o) => mt(o, t, a.label)).join(""));
    const r = this.querySelector(".zarr-msg-container");
    if (r) {
      const a = this.isAggregation ? W : V;
      r.innerHTML = this._renderMessage(t, a);
    }
    this._startMsgCycle();
  }
  /** Update only the rotating message text. */
  _updateMessage() {
    const t = Z(this.statusCode), e = this.querySelector(".zarr-msg-container");
    if (e) {
      const r = this.isAggregation ? W : V;
      e.innerHTML = this._renderMessage(t, r);
    }
  }
}
for (const [i, t] of [
  ["data-inspector", Ut],
  ["aggregation-config", qt],
  ["zarr-loading-steps", Ft]
])
  customElements.get(i) || customElements.define(i, t);
const Gt = "freva_auth_token=";
function St() {
  return typeof document < "u" && document.baseURI ? document.baseURI : typeof location < "u" && location.href ? location.href : null;
}
function Pt(i) {
  try {
    const t = St();
    return t ? new URL(i, t).href : new URL(i).href;
  } catch {
    return i;
  }
}
function ot(i) {
  try {
    const t = St(), e = t ? new URL(i, t) : new URL(i);
    return e.origin === "null" ? null : e.origin;
  } catch {
    return null;
  }
}
function Kt(i) {
  return typeof location > "u" ? !1 : ot(i) === location.origin;
}
function Vt(i) {
  if (typeof document > "u") return {};
  if (i !== void 0 && !Kt(i)) return {};
  const e = document.cookie.split(";").find((r) => r.trim().startsWith(Gt));
  if (!e) return {};
  try {
    let r = e.substring(e.indexOf("=") + 1).trim();
    return r.startsWith('"') && r.endsWith('"') && (r = r.slice(1, -1)), r ? { Authorization: `Bearer ${r}` } : {};
  } catch {
    return {};
  }
}
async function J(i, t) {
  try {
    const e = await (i ?? Vt)(Pt(t));
    return e && typeof e == "object" ? { ...e } : {};
  } catch {
    return {};
  }
}
function ge(i) {
  var e;
  const t = (e = i.origins) == null ? void 0 : e.map((r) => ot(r)).filter((r) => !!r);
  return async (r) => {
    const a = ot(r);
    if (!a) return {};
    if (!(t ?? (typeof location < "u" ? [location.origin] : [])).includes(a)) return {};
    const n = await i.getToken();
    return n ? { Authorization: `Bearer ${n}` } : {};
  };
}
function Tt(i) {
  if (typeof i != "string") return i;
  let t = i.trim();
  for (; /^https?%(25)*3a/i.test(t); )
    try {
      const e = decodeURIComponent(t);
      if (e === t) break;
      t = e;
    } catch {
      break;
    }
  return t;
}
function Wt(i) {
  return `/api/freva-nextgen/data-portal/zarr-utils/status?url=${i}&timeout=1`;
}
class fe {
  constructor(t, e = {}) {
    this.timer = null, this.cancelled = !1, this.zarrUrl = t, this.intervalMs = e.intervalMs ?? 2e3, this.getAuthHeaders = e.getAuthHeaders, this.getStatusUrl = e.getStatusUrl ?? Wt, this.onStatus = e.onStatus ?? (() => {
    }), this.onError = e.onError ?? (() => {
    });
  }
  start() {
    this.cancelled = !1, this.poll(), this.timer = setInterval(() => {
      this.poll();
    }, this.intervalMs);
  }
  stop() {
    this.cancelled = !0, this.timer !== null && (clearInterval(this.timer), this.timer = null);
  }
  async poll() {
    try {
      const t = this.getStatusUrl(encodeURIComponent(this.zarrUrl)), e = await fetch(t, {
        credentials: "same-origin",
        headers: await J(this.getAuthHeaders, t)
      });
      if (!e.ok) {
        this.cancelled || this.onStatus(5, null);
        return;
      }
      const r = await e.json(), a = r.status ?? 5, o = r.reason ?? null;
      this.cancelled || (this.onStatus(a, o), a <= 2 && this.stop());
    } catch (t) {
      this.cancelled || this.onError(t instanceof Error ? t.message : String(t));
    }
  }
}
const bt = { isZarr: !1, version: null, consolidated: !1 };
async function me(i, t = {}) {
  if (!i) return { ...bt };
  const e = Tt(i).replace(/\/$/, ""), r = async (a) => ({
    credentials: "same-origin",
    headers: await J(t.getAuthHeaders, a),
    signal: AbortSignal.timeout(t.timeoutMs ?? 5e3)
  });
  try {
    if ((await fetch(`${e}/.zmetadata`, await r(`${e}/.zmetadata`))).ok) return { isZarr: !0, version: 2, consolidated: !0 };
  } catch {
  }
  try {
    const a = await fetch(`${e}/zarr.json`, await r(`${e}/zarr.json`));
    if (a.ok) {
      const o = await a.json(), n = o.zarr_format;
      if (n === 2 || n === 3) {
        const s = n === 3 ? "consolidated_metadata" in o : !1;
        return { isZarr: !0, version: n, consolidated: s };
      }
    }
  } catch {
  }
  return { ...bt };
}
class nt extends Error {
  constructor(t, e) {
    super(t), this.name = "ZarrMetadataError", this.status = e;
  }
}
function Zt(i) {
  return {
    f2: "float16",
    f4: "float32",
    f8: "float64",
    i1: "int8",
    i2: "int16",
    i4: "int32",
    i8: "int64",
    u1: "uint8",
    u2: "uint16",
    u4: "uint32",
    u8: "uint64",
    b1: "bool"
  }[i.slice(1)] ?? i;
}
function Yt(i) {
  const t = { ...i };
  return delete t._ARRAY_DIMENSIONS, t;
}
function Et(i, t, e) {
  const r = {}, a = {};
  for (const [d, f] of Object.entries(i)) {
    const { shape: h, chunks: p, dtype: v, dims: y, attrs: M } = e(f);
    y.forEach((u, m) => {
      u in r || (r[u] = h[m] ?? 0);
    });
    const S = M.units, l = y.length === 1 && y[0] === d && (String(S ?? "").includes("since") || d === "time");
    a[d] = {
      shape: h,
      chunks: p,
      dtype: v,
      dims: y,
      attrs: M,
      _isTimeCoord: l
    };
  }
  const o = /* @__PURE__ */ new Set(), n = (d) => String(d ?? "").split(/[\s,]+/).filter(Boolean);
  for (const [d, f] of Object.entries(a))
    f.dims.length === 1 && f.dims[0] === d && o.add(d);
  n(t.coordinates).forEach((d) => o.add(d));
  for (const d of Object.values(a))
    n(d.attrs.coordinates).forEach((f) => o.add(f));
  const s = {}, c = {};
  for (const [d, f] of Object.entries(a))
    (o.has(d) ? s : c)[d] = f;
  return { dims: r, coords: s, data_vars: c, attrs: t };
}
function U(i) {
  return Object.keys(i.coords).length + Object.keys(i.data_vars).length > 0;
}
function et(i, t) {
  const e = i[`${t}.zattrs`] ?? {}, r = {};
  for (const [a, o] of Object.entries(i)) {
    if (!a.startsWith(t)) continue;
    const n = a.slice(t.length);
    if (n.endsWith("/.zarray")) {
      const s = n.slice(0, -8);
      if (s.includes("/")) continue;
      r[s] ?? (r[s] = {}), r[s].zarray = o;
    } else if (n.endsWith("/.zattrs")) {
      const s = n.slice(0, -8);
      if (!s || s.includes("/")) continue;
      r[s] ?? (r[s] = {}), r[s].zattrs = o;
    }
  }
  for (const a of Object.keys(r))
    r[a].zarray || delete r[a];
  return Et(r, e, (a) => {
    var n, s, c, d;
    const o = a.zattrs ?? {};
    return {
      shape: ((n = a.zarray) == null ? void 0 : n.shape) ?? [],
      chunks: ((s = a.zarray) == null ? void 0 : s.chunks) ?? ((c = a.zarray) == null ? void 0 : c.shape) ?? [],
      dtype: Zt(((d = a.zarray) == null ? void 0 : d.dtype) ?? "|u1"),
      dims: o._ARRAY_DIMENSIONS ?? [],
      attrs: Yt(o)
    };
  });
}
function Jt(i) {
  const t = i.metadata ?? {}, e = /* @__PURE__ */ new Set();
  for (const o of Object.keys(t))
    o === ".zgroup" || o === ".zattrs" || o.endsWith("/.zgroup") && e.add(o.slice(0, -8));
  if (e.size === 0) {
    const o = et(t, "");
    if (!U(o))
      throw new Error("No arrays found in .zmetadata");
    return { groups: null, ...o };
  }
  const r = {}, a = et(t, "");
  U(a) && (r["/"] = a);
  for (const o of [...e].sort()) {
    const n = et(t, `${o}/`);
    U(n) && (r[o] = n);
  }
  if (!Object.keys(r).length)
    throw new Error("No arrays found in .zmetadata");
  return { groups: r };
}
function it(i, t) {
  const r = (i[t || ""] ?? {}).attributes ?? {}, a = {};
  for (const [o, n] of Object.entries(i))
    if (n.node_type === "array")
      if (t) {
        if (!o.startsWith(`${t}/`)) continue;
        const s = o.slice(t.length + 1);
        if (s.includes("/")) continue;
        a[s] = { zarray: n };
      } else {
        if (!o || o.includes("/")) continue;
        a[o] = { zarray: n };
      }
  return Et(a, r, (o) => {
    var s, c;
    const n = o.zarray;
    return {
      shape: n.shape ?? [],
      chunks: ((c = (s = n.chunk_grid) == null ? void 0 : s.configuration) == null ? void 0 : c.chunk_shape) ?? n.shape ?? [],
      // v3 dtypes are already human-readable.
      dtype: n.data_type ?? "float32",
      dims: n.dimension_names ?? [],
      attrs: n.attributes ?? {}
    };
  });
}
function Xt(i) {
  var o;
  const t = ((o = i.consolidated_metadata) == null ? void 0 : o.metadata) ?? {};
  if (!Object.keys(t).length)
    throw new Error("zarr.json has no consolidated_metadata");
  const e = /* @__PURE__ */ new Set();
  for (const [n, s] of Object.entries(t))
    !n || s.node_type !== "group" || e.add(n);
  if (e.size === 0) {
    const n = it(t, "");
    if (!U(n))
      throw new Error("No arrays found in zarr.json");
    return { groups: null, ...n };
  }
  const r = {}, a = it(t, "");
  U(a) && (r["/"] = a);
  for (const n of [...e].sort()) {
    const s = it(t, n);
    U(s) && (r[n] = s);
  }
  if (!Object.keys(r).length)
    throw new Error("No arrays found in zarr.json");
  return { groups: r };
}
async function Qt(i, t = {}) {
  const e = Tt(i).replace(/\/$/, ""), { signal: r } = t, a = () => {
    if (r != null && r.aborted)
      throw r.reason instanceof Error ? r.reason : new DOMException("The metadata read was aborted.", "AbortError");
  };
  let o = null;
  const n = (f) => f === 401 ? 2 : f === 403 ? 1 : 0, s = async (f) => {
    a();
    const h = `${e}/${f}`, p = await J(t.getAuthHeaders, h);
    a();
    try {
      const v = await fetch(h, {
        credentials: "same-origin",
        headers: p,
        ...r ? { signal: r } : {}
      });
      if (!v.ok) {
        const y = typeof v.status == "number" ? v.status : null;
        return y !== null && (o === null || n(y) > n(o)) && (o = y), null;
      }
      return await v.json();
    } catch {
      return a(), null;
    }
  };
  let c = 2, d = await s(".zmetadata");
  if (d || (c = 3, d = await s("zarr.json")), !d) {
    const f = o === null ? "" : ` - the store answered ${o}`;
    throw new nt(
      `Could not read zarr metadata (.zmetadata or zarr.json)${f}`,
      o
    );
  }
  return c === 2 ? Jt(d) : Xt(d);
}
function q(i) {
  return String(i).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
let te = 0;
function st() {
  return `xr${++te}`;
}
function vt(i) {
  return `<svg class="icon xr-${i}"><use xlink:href="#${i}"></use></svg>`;
}
function ee(i, t) {
  return Object.keys(i).length ? `<ul class='xr-dim-list'>${Object.entries(i).map(
    ([r, a]) => `<li><span${t.has(r) ? " class='xr-has-index'" : ""}>${q(r)}</span>: ${a}</li>`
  ).join("")}</ul>` : "";
}
function Mt(i) {
  const t = Object.entries(i);
  return t.length ? `<dl class='xr-attrs'>${t.map(([e, r]) => `<dt><span>${q(e)} :</span></dt><dd>${q(String(r))}</dd>`).join("")}</dl>` : "<em>No attributes</em>";
}
function ie(i) {
  const t = i.shape.reduce((e, r) => e * r, 1);
  return t === 0 ? "[]" : `${i.dtype} (${i.shape.join(" × ")} = ${t.toLocaleString()})`;
}
function xt(i) {
  return i < 1024 ? i + " B" : i < 1024 ** 2 ? (i / 1024).toFixed(2) + " KiB" : i < 1024 ** 3 ? (i / 1024 ** 2).toFixed(2) + " MiB" : (i / 1024 ** 3).toFixed(2) + " GiB";
}
function re(i) {
  if (!i.length) return "";
  const t = Math.min(i.length, 3), e = i.slice(-t), r = (_) => Math.max(20, Math.min(110, 20 + Math.log10(Math.max(1, _)) * 30)), a = (_) => _.toLocaleString(), n = "font-size:11px;fill:var(--xr-font-color2);font-family:monospace";
  if (t < 3) {
    const _ = r(e[t - 1]), x = t === 2 ? r(e[0]) : 12, b = t === 2 ? 42 : 2, T = 16, O = b + _ + 4, E = x + T;
    return `<svg width="${Math.ceil(O)}" height="${Math.ceil(E)}"
        viewBox="0 0 ${Math.ceil(O)} ${Math.ceil(E)}"
        style="overflow:visible;display:block;flex-shrink:0">
      <rect x="${b}" y="0" width="${_}" height="${x}"
            style="fill:var(--xr-chunk-face);stroke:var(--xr-chunk-edge);stroke-width:0.8"/>
      ${t === 2 ? `<text x="${b - 5}" y="${x / 2 + 4}"
            text-anchor="end" style="${n}">${a(e[0])}</text>` : ""}
      <text x="${b + _ / 2}" y="${x + T - 3}"
            text-anchor="middle" style="${n}">${a(e[t - 1])}</text>
    </svg>`;
  }
  const s = r(e[2]), c = r(e[1]), d = r(e[0]), f = 0.5, h = d * f, p = d * f * 0.45, v = 16, y = 16, S = s + h + 52, l = v + c + p + y, u = 2, m = v + c + p;
  return `<svg width="${Math.ceil(S)}" height="${Math.ceil(l)}"
      viewBox="0 0 ${Math.ceil(S)} ${Math.ceil(l)}"
      style="overflow:visible;display:block;flex-shrink:0">
    <polygon points="${u},${m} ${u + s},${m} ${u + s},${m - c} ${u},${m - c}"
             style="fill:var(--xr-chunk-face);stroke:var(--xr-chunk-edge);stroke-width:0.8"/>
    <polygon points="${u},${m - c} ${u + s},${m - c} ${u + s + h},${m - c - p} ${u + h},${m - c - p}"
             style="fill:var(--xr-chunk-top);stroke:var(--xr-chunk-edge);stroke-width:0.8"/>
    <polygon points="${u + s},${m} ${u + s + h},${m - p} ${u + s + h},${m - c - p} ${u + s},${m - c}"
             style="fill:var(--xr-chunk-side);stroke:var(--xr-chunk-edge);stroke-width:0.8"/>
    <text x="${u + s / 2}" y="${m + y - 3}"
          text-anchor="middle" style="${n}">${a(e[2])}</text>
    <text x="${u + s / 2 + h / 2}" y="${v - 3}"
          text-anchor="middle" style="${n}">${a(e[1])}</text>
    <text x="${u + s + h + 5}" y="${m - c / 2 - p / 2 + 4}"
          text-anchor="start" style="${n}">${a(e[0])}</text>
  </svg>`;
}
function ae(i) {
  const { shape: t, chunks: e, dtype: r } = i, a = {
    int8: 1,
    uint8: 1,
    bool: 1,
    int16: 2,
    uint16: 2,
    int32: 4,
    uint32: 4,
    float32: 4,
    int64: 8,
    uint64: 8,
    float64: 8
  }[r] ?? 4, o = t.reduce((p, v) => p * v, 1) * a;
  let n = null, s = null;
  e && e.length === t.length && (n = e.reduce((p, v) => p * v, 1) * a, s = t.reduce((p, v, y) => p * Math.ceil(v / e[y]), 1));
  const c = 'style="color:var(--xr-font-color3);padding:2px 16px 2px 0;white-space:nowrap;vertical-align:top"', d = 'style="padding:2px 16px 2px 0;white-space:nowrap;vertical-align:top"', f = 'style="padding:2px 0;white-space:nowrap;color:var(--xr-font-color2);vertical-align:top"', h = (p, v, y = "") => `<tr><td ${c}>${p}</td><td ${d}>${v}</td><td ${f}>${y}</td></tr>`;
  return `<table style="border-collapse:collapse;padding:6px 0 12px"><tr>
    <td style="vertical-align:top;padding:0">
      <table style="font-size:12px;font-family:monospace;border-collapse:collapse;line-height:1.75">
        <thead><tr>
          <th style="font-weight:400;padding:0 16px 5px 0;text-align:left"></th>
          <th style="font-weight:600;padding:0 16px 5px 0;text-align:left">Array</th>
          <th style="font-weight:600;padding:0 0 5px 0;text-align:left">Chunk</th>
        </tr></thead><tbody>
          ${h("Bytes", xt(o), n !== null ? xt(n) : "—")}
          ${h("Shape", "(" + t.join(", ") + ")", e ? "(" + e.join(", ") + ")" : "—")}
          ${s !== null ? h("Chunks", s.toLocaleString() + " chunks") : ""}
          ${h("dtype", q(r))}
          ${h("dims", "(" + i.dims.join(", ") + ")")}
        </tbody>
      </table>
    </td>
    <td style="vertical-align:middle;padding:0 0 0 32px">${re(t)}</td>
  </tr></table>`;
}
function oe(i, t, e) {
  const r = st(), a = st(), o = Object.keys(t.attrs).length > 0;
  return `
    <div class='xr-var-name'><span${e ? " class='xr-has-index'" : ""}>${q(i)}</span></div>
    <div class='xr-var-dims'>(${t.dims.map(q).join(", ")})</div>
    <div class='xr-var-dtype'>${q(t.dtype)}</div>
    <div class='xr-var-preview xr-preview'>${q(ie(t))}</div>
    <input id='${r}' class='xr-var-attrs-in' type='checkbox'${o ? "" : " disabled"}>
    <label for='${r}' title='Show/Hide attributes'>${vt("icon-file-text2")}</label>
    <input id='${a}' class='xr-var-data-in' type='checkbox'>
    <label for='${a}' title='Show/Hide data repr'>${vt("icon-database")}</label>
    <div class='xr-var-attrs'>${Mt(t.attrs)}</div>
    <div class='xr-var-data'>${ae(t)}</div>
  `;
}
function yt(i, t) {
  return `<ul class='xr-var-list'>${Object.entries(i).map(
    ([e, r]) => `<li class='xr-var-item'>${oe(e, r, t.has(e))}</li>`
  ).join("")}</ul>`;
}
function Y(i, t, e, r, a, o) {
  const n = st(), s = (r ?? 0) > 0, c = r !== null ? ` <span>(${r})</span>` : "", d = a && s ? "" : " disabled";
  return `
    <input id='${n}' class='xr-section-summary-in' type='checkbox'${d}${o || !s ? "" : " checked"} />
    <label for='${n}' class='xr-section-summary'${d === "" ? " title='Expand/collapse section'" : ""}>${i}${c}</label>
    <div class='xr-section-inline-details'>${t}</div>
    ${e ? `<div class='xr-section-details'>${e}</div>` : ""}
  `;
}
const _t = `<svg class="xr-icons" aria-hidden="true"><defs>
<symbol id="icon-database" viewBox="0 0 32 32">
  <path d="M16 0c-8.837 0-16 2.239-16 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0-2.761-7.163-5-16-5z"/>
  <path d="M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"/>
  <path d="M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"/>
</symbol>
<symbol id="icon-file-text2" viewBox="0 0 32 32">
  <path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"/>
</symbol>
</defs></svg>`;
function wt(i) {
  const t = new Set(Object.keys(i.coords)), e = [];
  return e.push(
    Y(
      "Dimensions:",
      ee(i.dims, t),
      "",
      Object.keys(i.dims).length,
      !1,
      !0
    )
  ), Object.keys(i.coords).length && e.push(
    Y(
      "Coordinates:",
      "",
      yt(i.coords, t),
      Object.keys(i.coords).length,
      !0,
      !1
    )
  ), e.push(
    Y(
      "Data variables:",
      "",
      yt(i.data_vars, /* @__PURE__ */ new Set()),
      Object.keys(i.data_vars).length,
      !0,
      !1
    )
  ), Object.keys(i.attrs).length && e.push(
    Y(
      "Attributes:",
      "",
      Mt(i.attrs),
      Object.keys(i.attrs).length,
      !0,
      !0
    )
  ), `<div class='xr-root'>
    <div class='xr-wrap'>
      <div class='xr-header'><div class='xr-obj-type'>xarray.Dataset</div></div>
      <ul class='xr-sections'>${e.map((a) => `<li class='xr-section-item'>${a}</li>`).join("")}</ul>
    </div>
  </div>`;
}
function ne(i) {
  if (!i.groups)
    return `${_t}${wt(i)}`;
  const t = Object.entries(i.groups).map(
    ([e, r]) => `
    <details open style="margin-bottom:10px;border:1px solid var(--xr-border-color);border-radius:4px;overflow:hidden">
      <summary class="xr-group-summary">
        <span class="xr-group-marker" aria-hidden="true"></span>
        <span>Group: ${q(e)}</span>
      </summary>
      <div style="padding:0 12px 8px">${wt(r)}</div>
    </details>
  `
  ).join("");
  return `${_t}<div style="font-family:monospace">${t}</div>`;
}
const se = `
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
`;
let kt = !1;
function de(i = {}) {
  if (kt || typeof document > "u") return;
  kt = !0;
  const t = typeof window < "u" ? window.MAIN_COLOR : void 0, e = (i.mainColor ?? t ?? "#9b7a52").replace(/^#/, ""), r = parseInt(e.slice(0, 2), 16), a = parseInt(e.slice(2, 4), 16), o = parseInt(e.slice(4, 6), 16), n = (p) => `rgb(${Math.min(255, r * p | 0)},${Math.min(255, a * p | 0)},${Math.min(255, o * p | 0)})`, s = (p, v) => `rgba(${Math.min(255, r * p | 0)},${Math.min(255, a * p | 0)},${Math.min(255, o * p | 0)},${v})`, c = `rgb(${255 - r},${255 - a},${255 - o})`, f = `
    :root{--xr-chunk-face:${n(0.85)};--xr-chunk-top:${n(1.25)};--xr-chunk-side:${n(0.55)};--xr-chunk-edge:${c}}
    html[data-theme="dark"],body[data-theme="dark"],body.vscode-dark{
      --xr-chunk-face:${s(0.85, 0.65)};--xr-chunk-top:${s(1.25, 0.65)};--xr-chunk-side:${s(0.55, 0.65)};--xr-chunk-edge:${c}
    }
  ` + se;
  try {
    if (typeof CSSStyleSheet == "function" && Array.isArray(document.adoptedStyleSheets)) {
      const p = new CSSStyleSheet();
      p.replaceSync(f), document.adoptedStyleSheets = [...document.adoptedStyleSheets, p];
      return;
    }
  } catch {
  }
  const h = document.createElement("style");
  h.setAttribute("data-xarray-repr", "1"), h.textContent = f, document.head.appendChild(h);
}
async function $t(i, t = {}) {
  t.injectCss !== !1 && de({ mainColor: t.mainColor });
  const e = await Qt(i, {
    getAuthHeaders: t.getAuthHeaders,
    signal: t.signal
  });
  return ne(e);
}
function le(i) {
  const t = i.trim();
  return /^https?:\/\//i.test(t) || /\.zarr\/?$/i.test(t);
}
function rt(i) {
  return Object.keys(i).some((t) => t.toLowerCase() === "authorization");
}
function At(i) {
  return /\/data-portal\/share\//.test(i);
}
const ce = 0, zt = 5, Ct = {
  1: "The data-loader could not convert this data",
  2: "The data-loader could not find this file",
  5: "The conversion is gone - it expired, or the data-loader never picked it up",
  6: "You are not allowed to read this file"
};
function ue(i, t = 300) {
  const e = {};
  let r = t;
  for (const [a, o] of Object.entries(i ?? {}))
    if (!(o == null || o === "" || o === !1)) {
      if (a === "timeout") {
        typeof o == "number" && o > 0 && (r = o);
        continue;
      }
      e[a] = o;
    }
  return { options: e, timeoutS: r };
}
class at extends Error {
  constructor(t, e) {
    super(e), this.name = "PortalError", this.status = t;
  }
}
function pe(i) {
  return i === 401 ? "Sign in again to continue." : i === 403 ? "Access denied." : i === 404 ? "Not found." : i === 429 ? "Rate-limited - wait a moment and try again." : i >= 500 ? "Service error - try again." : `Request failed (${i}).`;
}
function he(i, t) {
  return new Promise((e) => {
    const r = setTimeout(e, i);
    t.addEventListener(
      "abort",
      () => {
        clearTimeout(r), e();
      },
      { once: !0 }
    );
  });
}
function be(i, t = {}) {
  const e = t.dataPortalBase ? t.dataPortalBase.replace(/\/+$/, "") : null, r = e !== null && t.dataLoader !== !1, a = t.isStore ?? le, o = t.shareTtlSeconds ?? 3600, n = t.pollMs ?? 1500, s = t.startupGraceMs ?? 3e4, c = typeof t.signIn == "function" ? t.signIn : null, d = (l) => J(t.getAuthHeaders, l);
  let f = 0, h = null, p = !1;
  async function v(l, u, m) {
    const _ = `${e}${l}`, x = { ...await d(_) };
    u.body !== void 0 && (x["Content-Type"] = "application/json");
    const b = await fetch(_, {
      method: u.method ?? "GET",
      credentials: "same-origin",
      headers: x,
      ...u.body !== void 0 ? { body: JSON.stringify(u.body) } : {},
      signal: m
    });
    if (!b.ok) {
      let T = "";
      try {
        const E = await b.clone().json();
        typeof E.detail == "string" && (T = E.detail);
      } catch {
      }
      const O = pe(b.status);
      throw new at(
        b.status,
        T && !O.includes(T) ? `${O} ${T}` : O
      );
    }
    return await b.json();
  }
  async function y(l, u) {
    if (p) return;
    const m = ++f;
    h == null || h.abort();
    const _ = new AbortController();
    h = _;
    const x = () => p || m !== f, b = (Array.isArray(l) ? l : [l]).map((g) => String(g).trim()).filter(Boolean);
    if (!b.length) return;
    const { options: T, timeoutS: O } = ue(
      u,
      t.timeoutSeconds ?? 300
    ), E = Array.isArray(l);
    E && "aggregationConfig" in i && (i.aggregationConfig = u ?? null);
    const H = E ? JSON.stringify(b) : b[0];
    i.getAttribute("file") !== H && i.setAttribute("file", H), i.hasAttribute("is-aggregation") !== E && (E ? i.setAttribute("is-aggregation", "") : i.removeAttribute("is-aggregation")), !E && "loadOptions" in i && (i.loadOptions = u ?? null), i.error = null;
    for (const g of ["error-action", "zarr-status-code", "viewer-disabled"]) i.removeAttribute(g);
    i.setAttribute("status", "loading");
    const N = b.length > 1 ? "Aggregating these files" : "This file isn’t a zarr store - inspecting it", I = (g, z = !1) => {
      x() || (i.error = g, z && c && i.setAttribute("error-action", "Sign in"), i.setAttribute("status", "error"));
    }, w = async (g) => {
      let z = "the server did not return one";
      if (e)
        try {
          const C = await v(
            "/share-zarr",
            { method: "POST", body: { path: g, ttl_seconds: o } },
            _.signal
          );
          if (typeof (C == null ? void 0 : C.url) == "string" && C.url) return C.url;
        } catch (C) {
          C instanceof at && (z = `the server answered ${C.status}`);
        }
      else
        z = "no data-portal is configured to make one";
      return x() || i.setAttribute(
        "viewer-disabled",
        `The 3D viewer needs a share link for this protected store, and none could be made (${z}). Load it again to retry.`
      ), g;
    };
    let j = "", L = null, D = !1;
    const P = async (g) => {
      const z = await d(g);
      return rt(z) && (D = !0), z;
    };
    if (b.length === 1 && !Object.keys(T).length && a(b[0])) {
      i.setAttribute("zarr-url", b[0]);
      try {
        const g = await $t(b[0], {
          getAuthHeaders: P,
          signal: _.signal
        });
        if (x()) return;
        if (D && !At(b[0])) {
          const z = await w(b[0]);
          if (x()) return;
          i.setAttribute("zarr-url", z);
        }
        i.output = g, i.setAttribute("status", "ready");
        return;
      } catch (g) {
        if (x()) return;
        j = g instanceof Error ? g.message : String(g), L = g instanceof nt ? g.status : null, i.removeAttribute("zarr-url");
      }
    }
    if (L === 401 || L === 403) {
      const g = r && rt(await d(`${e}/zarr/convert`));
      if (x()) return;
      if (!g) {
        D ? L === 401 ? I("This store did not accept your sign-in (401) - sign in again to continue.", !0) : I("You are not allowed to read this store (403).") : I(`This store needs sign-in (it answered ${L}).`, !0);
        return;
      }
    }
    if (!r) {
      const g = j ? ` (${j})` : "", z = e ? "the data-portal's conversion is not enabled here" : "no data-portal is configured";
      I(
        b.length > 1 ? `Aggregating these files needs the data-portal's conversion, and ${z}.` : `This could not be read as a zarr store${g}, and ${z} to convert it.`
      );
      return;
    }
    const X = rt(await d(`${e}/zarr/convert`));
    if (!x()) {
      if (!X) {
        I(`${N} needs sign-in`, !0);
        return;
      }
      i.setAttribute("zarr-status-code", "3");
      try {
        const g = {
          ...T,
          path: b.length === 1 ? b[0] : b,
          ...b.length > 1 && !T.aggregate ? { aggregate: "auto" } : {}
        }, { urls: z } = await v(
          "/zarr/convert",
          { method: "POST", body: g },
          _.signal
        );
        if (x()) return;
        const C = Array.isArray(z) ? z[0] : void 0;
        if (typeof C != "string" || !C)
          throw new Error("The data-loader returned no store URL.");
        const Ot = At(C) ? C : await w(C);
        if (x()) return;
        i.setAttribute("zarr-url", Ot);
        const dt = Date.now(), jt = dt + O * 1e3;
        let lt = !1;
        for (; ; ) {
          const F = await v(
            `/zarr-utils/status?url=${encodeURIComponent(C)}&timeout=1`,
            {},
            _.signal
          );
          if (x()) return;
          const B = typeof F.status == "number" ? F.status : zt;
          if (B === ce) {
            i.setAttribute("zarr-status-code", "0");
            break;
          }
          const Q = B === zt && !lt && Date.now() - dt < s;
          if (!Q && B in Ct) {
            i.setAttribute("zarr-status-code", String(B));
            const It = typeof F.reason == "string" && F.reason ? `: ${F.reason}` : ".";
            throw new Error(`${Ct[B]}${It}`);
          }
          if (Q || (lt = !0), i.setAttribute("zarr-status-code", String(Q ? 3 : B)), Date.now() > jt)
            throw new Error(
              `The conversion did not finish within ${O} s - try again, or raise the timeout.`
            );
          if (await he(n, _.signal), x()) return;
        }
        const Lt = await $t(C, {
          getAuthHeaders: d,
          signal: _.signal
        });
        if (x()) return;
        i.output = Lt, i.setAttribute("status", "ready");
      } catch (g) {
        if (x() || _.signal.aborted) return;
        if ((g instanceof at || g instanceof nt) && g.status === 401) {
          I(`${N} needs sign-in - your session has ended`, !0);
          return;
        }
        I(g instanceof Error ? g.message : String(g));
      }
    }
  }
  const M = (l) => {
    const u = l.detail, m = u == null ? void 0 : u.file, _ = u != null && u.aggregationConfig && typeof u.aggregationConfig == "object" ? u.aggregationConfig : null;
    (typeof m == "string" || Array.isArray(m)) && y(m, _);
  }, S = () => {
    c == null || c();
  };
  return i.addEventListener("inspector-submit", M), i.addEventListener("inspector-error-action", S), {
    load: y,
    detach() {
      p || (p = !0, h == null || h.abort(), i.removeEventListener("inspector-submit", M), i.removeEventListener("inspector-error-action", S));
    }
  };
}
export {
  qt as AggregationConfigElement,
  Ut as DataInspectorElement,
  R as NcDumpDialogState,
  Ft as ZarrLoadingStepsElement,
  nt as ZarrMetadataError,
  fe as ZarrPoller,
  be as attachInspector,
  ne as buildXarrayRepr,
  ue as convertOptions,
  me as detectZarrStore,
  de as injectXarrayCss,
  $t as loadZarrMetadataHtml,
  le as looksLikeStore,
  Qt as openDatasetMeta,
  ge as scopedBearerAuth
};
