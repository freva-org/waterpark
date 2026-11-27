import{e as Zn}from"./chunk.BUWK7MLJ.js";import"./chunk.WXDLP45E.js";var Uo="Result stream too big.";async function Yn(e){if(!e)return null;try{return await e()||null}catch{return null}}function qo(e,t,o,n){let r=t?.[o]??o,a=e[r]??e[o],s=a?a[n]:void 0;return typeof s=="string"&&s.length>0?s:null}var at=["freva","cmip5","cmip6","cordex","user"],He=["project","product","institute","model","experiment","time_frequency","realm","variable","ensemble","time_aggregation"],it=["cmor_table","dataset","driving_model","format","grid_label","level_type","rcm_name","rcm_version","fs_type","grid_id","user"],zi=100,Li=new Set(["variable","ensemble"]);function er(e){return{flavour:e.flavour,uniqKey:"file",selected:{},baseFilters:{},time:null,bbox:null,rows:[],totalCount:0,facets:[],primaryFacets:[],overviewShape:[],facetMapping:{},attributeKeys:[],flavours:[...at],flavourMaps:structuredClone(Ri),start:0,search:"idle",lastRequestId:0,facetsVersion:0,rowsVersion:0,rowsEpoch:0,layout:"results",theme:"night",view:"list",pickedKeys:new Set,focusKey:null,detailSource:"focus",detailsOpen:!1,details:"idle",detailsCache:new Map,terminalDraft:"",externalEdits:0,terminalFocused:!1,terminalTab:"cli",overviewFilters:{},overviewSort:{},overviewCollapsed:new Set,overviewAddOpen:!1,overviewSpan:{},overviewStacked:!1,overviewStackSeen:[],overviewSnapshot:null,overviewH:{},overviewOrder:[],overviewStale:!1,sidebarOpen:new Set,sidebarAddOpen:!1,sidebarSeeded:!1,sidebarCollapsed:!1,status:"",metadata:{},metadataVersion:0}}function Ro(e){let t=e.facets.filter(n=>n.values.length);if(!t.length)return;let o=new Map(e.overviewShape.map(n=>[n.key,n]));for(let n of t)o.set(n.key,{key:n.key,label:n.label});e.overviewShape=[...o.values()]}function tr(e){let t=new Map(e.facets.map(r=>[r.key,r])),o=[],n=new Set;for(let r of e.overviewShape){let a=t.get(r.key);o.push(a??{key:r.key,label:r.label,values:[],hasMore:!1}),n.add(r.key)}for(let r of e.facets)n.has(r.key)||o.push(r);return o}var Vt="_not_";function ue(e){return e.length>Vt.length&&e.toLowerCase().endsWith(Vt)?{baseKey:e.slice(0,e.length-Vt.length),negated:!0}:{baseKey:e,negated:!1}}function Pe(e){return ue(e).negated?e:`${e}${Vt}`}function Z(e){return ue(e).baseKey}function gt(e,t){return t?Pe(e):Z(e)}function vt(e,t){return e.selected[Z(t)]??[]}function Ee(e,t){return e.selected[Pe(t)]??[]}function De(e,t){return vt(e,t).length+Ee(e,t).length}function Fi(e,t){delete e.selected[Z(t)],delete e.selected[Pe(t)]}function or(e,t,o){delete e.selected[o?Pe(t):Z(t)]}function Ho(e,t,o,n){let{baseKey:r,negated:a}=ue(t);return gt(lt(e,r,o,n),a)}function Ve(e,t,o){let n=Z(t);return(e.selected[n]??[]).includes(o)||st(e,n,o)}function Jt(e,t,o){return Ee(e,t).includes(o)}function nr(e,t,o,n){let r=gt(t,!n),a=e.selected[r];if(a){let s=a.indexOf(o);s>=0&&(a.splice(s,1),a.length===0&&delete e.selected[r])}Ui(e,gt(t,n),o)}function st(e,t,o){let n=Z(t).toLowerCase();for(let r of Object.keys(e.baseFilters)){let{baseKey:a,negated:s}=ue(r);if(!s&&lt(e,a,"freva",e.flavour).toLowerCase()===n&&e.baseFilters[r].includes(o))return!0}return!1}function xe(e,t){return ze(e).has(Z(t).toLowerCase())}function rr(e,t){return xe(e,t.key)?t.values.filter(o=>st(e,t.key,o.value)):t.values}function xt(e){let t=[];for(let[o,n]of Object.entries(e.baseFilters)){let r=Ho(e,o,"freva",e.flavour);for(let a of n)t.push([r,a])}return t}function ar(e){let t=[];for(let[o,n]of Object.entries(e.baseFilters)){let{baseKey:r,negated:a}=ue(o);if(!a)continue;let s=lt(e,r,"freva",e.flavour);for(let l of n)t.push([s,l])}return t}function Ui(e,t,o){let n=e.selected[t]??(e.selected[t]=[]),r=n.indexOf(o);r>=0?(n.splice(r,1),n.length===0&&delete e.selected[t]):n.push(o)}function ir(e){e.selected={},e.time=null,e.bbox=null}function sr(e,t){Fi(e,t)}function lr(e){return Object.keys(e.selected).length>0||!!e.time||!!e.bbox}function cr(e){return e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function wt(e,t){return e.facetMapping[t]??cr(t)}function Po(e){let t={};for(let o of e){let n=typeof o.flavour_name=="string"?o.flavour_name:null,r=o.mapping;if(!n||!r||typeof r!="object")continue;let a={},s={};for(let[l,d]of Object.entries(r))typeof d=="string"&&(a[l]=d,s[d]=l);t[n]={forward:a,backward:s}}return t}function lt(e,t,o,n){if(o===n)return t;let r=e.flavourMaps[o]?.backward[t]??t;return e.flavourMaps[n]?.forward[r]??r}function dr(e,t,o,n){if(o===n)return t;let r={};for(let[a,s]of Object.entries(t))r[Ho(e,a,o,n)]=s;return r}var qi=["project","product","institute","model","experiment","time_frequency","realm","variable","ensemble","time_aggregation","cmor_table","dataset","driving_model","format","grid_id","grid_label","level_type","rcm_name","rcm_version","fs_type"],Ni={cmip5:{ensemble:"member_id",institute:"institution_id",model:"model_id"},cmip6:{experiment:"experiment_id",ensemble:"member_id",institute:"institution_id",model:"source_id",project:"mip_era",product:"activity_id",variable:"variable_id",time_frequency:"frequency",cmor_table:"table_id"},cordex:{institute:"institution",product:"domain"}},Ri=Po(["freva","cmip5","cmip6","cordex"].map(e=>{let t=Ni[e]??{},o={};for(let n of qi)o[n]=t[n]??n;return{flavour_name:e,mapping:o}}));function Ge(e,t,o){return qo(e.metadata,e.flavourMaps[e.flavour]?.backward,t,o)}function yt(e){let t=new Set;for(let o of e.facets)t.add(o.key.toLowerCase());for(let o of e.attributeKeys)t.add(o.toLowerCase());for(let o of e.primaryFacets)t.add(o.toLowerCase());return t}function Vo(e,t){let o=Z(t).toLowerCase();if((e.selected[o]??[]).length>0||(e.selected[Pe(o)]??[]).length>0)return null;let n=e.facets.find(r=>r.key.toLowerCase()===o);return!n||n.hasMore||n.values.length===0?null:new Set(n.values.map(r=>r.value))}function kt(e,t){let o={},n=[],r=yt(e),a=ze(e),s=(l,d)=>{n.push(`${l}=${rt(d)}`)};for(let l of Object.keys(t)){let d=Z(l).toLowerCase();if(a.has(d)||r.size===0||!r.has(d)){for(let f of t[l])s(l,f);continue}let p=Vo(e,l);for(let f of t[l]){if(p&&!p.has(f)){s(l,f);continue}(o[l]??(o[l]=[])).push(f)}}for(let l of Object.keys(o)){let{baseKey:d,negated:p}=ue(l);if(!p)continue;let f=o[d];if(!f?.length)continue;let i=o[l].filter(m=>f.includes(m)?(s(l,m),!1):!0);i.length?o[l]=i:delete o[l]}return{accepted:o,rejected:n}}function pr(e,t){let o=Object.keys(e),n=Object.keys(t);if(o.length!==n.length)return!1;for(let r of o){let a=e[r],s=t[r];if(!s||a.length!==s.length)return!1;let l=new Set(s);for(let d of a)if(!l.has(d))return!1}return!0}function Ar(e,t){return{key:t==="uri"?String(e.uri??e.file):e.file,file:e.file,fsType:e.fs_type,raw:e}}function Kt(e){let t=[];for(let o=0;o+1<e.length;o+=2)t.push([String(e[o]),Number(e[o+1])]);return t}function Go(e){let t=e.facets??{},o=e.facet_mapping??{},n=e.primary_facets??[],r=[],a=new Set;for(let s of n)s in t&&!a.has(s)&&(r.push(s),a.add(s));for(let s of Object.keys(t))a.has(s)||(r.push(s),a.add(s));return r.map(s=>{let d=Kt(t[s]??[]).map(([f,i])=>({value:f,count:i})),p=d.length>=zi||Li.has(s);return{key:s,label:o[s]??cr(s),values:d,hasMore:p}})}function fr(e){let t={};for(let[o,n]of Object.entries(e)){let r=Kt(n);if(r.length===0)continue;let a=r.map(s=>s[0]);t[o]=a.length===1?a[0]:a}return t}function jt(e){let o=(e.split("/").pop()??e).match(/_(\d{4,8})-(\d{4,8})(?:\.\w+)?$/);if(!o)return null;let n=s=>{if(s.length!==4&&s.length!==6&&s.length!==8)return null;let l=s.slice(0,4);if(s.length===4)return l;let d=Number(s.slice(4,6));if(d<1||d>12)return null;if(s.length===6)return`${l}-${s.slice(4,6)}`;let p=Number(s.slice(6,8));return p<1||p>31?null:`${l}-${s.slice(4,6)}-${s.slice(6,8)}`},r=n(o[1]),a=n(o[2]);return!r||!a||!Oe(r)||!Oe(a)||Re(r)>Re(a)?null:`${r} \u2192 ${a}`}var Gt=encodeURIComponent;function Hi(e){let t=ze(e);return Wt(e).filter(([o])=>!t.has(Z(o).toLowerCase()))}function Wt(e){let t=[];for(let o of Object.keys(e.selected))for(let n of e.selected[o])t.push([o,n]);return t}function Jo(e){if(!e||!e.from&&!e.to)return[];let t=e.from||"1",o=e.to||"9999";return[["time",`${t} TO ${o}`],["time_select",e.mode]]}function Ko(e){return e?[["bbox",`${e.minLon},${e.maxLon},${e.minLat},${e.maxLat}`],["bbox_select",e.mode]]:[]}function jo(e){return[...Wt(e),...Jo(e.time),...Ko(e.bbox)]}function ur(e){let t={};if(!e)return t;for(let[o,n]of Object.entries(e)){let r=(Array.isArray(n)?n:[n]).map(a=>String(a)).filter(a=>a.length>0);r.length&&(t[o]=r)}return t}function ze(e){let t=new Set;for(let o of Object.keys(e.baseFilters)){let{baseKey:n,negated:r}=ue(o);r||t.add(lt(e,n,"freva",e.flavour).toLowerCase())}return t}function hr(e){let t=ze(e),o={};for(let[r,a]of Object.entries(e.baseFilters)){let s=Ho(e,r,"freva",e.flavour),l=o[s]??(o[s]=[]);for(let d of a)l.includes(d)||l.push(d)}for(let[r,a]of Object.entries(e.selected)){if(t.has(Z(r).toLowerCase()))continue;let s=o[r]??(o[r]=[]);for(let l of a)s.includes(l)||s.push(l)}let n=[];for(let r of Object.keys(o))for(let a of o[r])n.push([r,a]);return n}function Je(e){return[...hr(e),...Jo(e.time),...Ko(e.bbox)].map(([t,o])=>`${Gt(t)}=${Gt(o)}`).join("&")}function Wo(e){let t=new URLSearchParams(e),o=null,n={};for(let[l,d]of t.entries()){if(l==="flavour"){o=d;continue}Pi.has(l)||(n[l]??(n[l]=[])).push(d)}let{time:r,bbox:a,rest:s}=Yt(n);return{flavour:o,selected:s,time:r,bbox:a}}var Pi=new Set(["siv","q","translate","max-results","start","fields","facets","multi-version","multi_version","uniq_key"]);function mr(e,t){let o=ze(e),n=Z(t).toLowerCase();return[...hr(e),...Jo(e.time),...Ko(e.bbox)].filter(([r])=>{let a=Z(r).toLowerCase();return a!==n||o.has(a)}).map(([r,a])=>`${Gt(r)}=${Gt(a)}`).join("&")}function rt(e){return/[\s"]/.test(e)?`"${e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`:e}function Ke(e){let t=[],o=0,n=e.length;for(;o<n;){let r=o;if(/\s/.test(e[o])){for(;o<n&&/\s/.test(e[o]);)o++;t.push({kind:"ws",raw:e.slice(r,o),value:e.slice(r,o),start:r,end:o});continue}let a="",s=!1;for(;o<n;){let l=e[o];if(!s&&/\s/.test(l))break;if(l==='"'){s=!s,o++;continue}if(s&&l==="\\"&&o+1<n&&(e[o+1]==='"'||e[o+1]==="\\")){a+=e[o+1],o+=2;continue}a+=l,o++}t.push({kind:"tok",raw:e.slice(r,o),value:a,start:r,end:o})}return t}function Vi(e){return Ke(e).filter(t=>t.kind==="tok").map(t=>t.value)}function je(e){let t={};for(let o of Vi(e)){let n=o.indexOf("=");if(n<1)continue;let r=o.slice(0,n).toLowerCase(),a=o.slice(n+1);if(!a)continue;let s=t[r]??(t[r]=[]);s.includes(a)||s.push(a)}return t}function Xn(e){return`"${e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`}function Gi(e){let t=ze(e);return Object.keys(e.selected).filter(o=>!t.has(Z(o).toLowerCase())).map(o=>[o,e.selected[o]])}var Ji=/^(['"])([\s\S]*)\1$/;function No(e){let t=e.trim(),o=t.match(Ji);return o?o[2].replace(/\\(["'\\])/g,"$1"):t}function $n(e,t){let o=[],n=0,r="",a="";for(let s=0;s<e.length;s++){let l=e[s];if(r){if(l==="\\"&&s+1<e.length){a+=l+e[s+1],s++;continue}a+=l,l===r&&(r="");continue}if(l==='"'||l==="'"){r=l,a+=l;continue}l==="["||l==="{"?n++:(l==="]"||l==="}")&&(n=Math.max(0,n-1)),t.includes(l)&&n===0?(o.push(a),a=""):a+=l}return a.trim()&&o.push(a),o}function Ne(e,t){return`${e}=${t.length>1?`[${t.map(Xn).join(", ")}]`:Xn(t[0])}`}function gr(e){let t=e.trim();t=t.replace(/^\bdatabrowser\s*\(/,"").replace(/^\{/,"").replace(/[})]\s*$/,"");let o=[];for(let n of $n(t,`,
`)){let r=n.match(/^\s*(.+?)\s*[:=]\s*([\s\S]+?)\s*,?\s*$/);if(!r)continue;let a=No(r[1]);if(!a||/^(host|flavour)$/i.test(a))continue;let s=r[2].trim(),l=s.startsWith("[")?$n(s.replace(/^\[/,"").replace(/\]$/,""),",").map(No).filter(Boolean):[No(s)];for(let d of l)d&&o.push(`${a}=${rt(d)}`)}return o.join(" ")}function Zo(e){let t=[];e.flavour!=="freva"&&t.push({code:Ne("flavour",[e.flavour]),scope:!1});let o=new Map;for(let[n,r]of xt(e)){let a=o.get(n)??[];a.push(r),o.set(n,a)}for(let[n,r]of o)t.push({code:Ne(n,r),scope:!0});return t}function br(e){let t=Zo(e).map(r=>`    ${r.code},`),o=Xo(e).split(`
`).filter(r=>r.trim()).map(r=>`    ${r}`),n=[...t,...o];return n.length?`from freva_client import databrowser
databrowser(
${n.join(`
`)}
)`:`from freva_client import databrowser
databrowser()`}function Yo(e){if(!e)return null;let t=o=>Math.round(o*100)/100;return{...e,minLon:t(e.minLon),maxLon:t(e.maxLon),minLat:t(e.minLat),maxLat:t(e.maxLat)}}var we=new Set(["time","time_select","bbox","bbox_select"]),bt=["flexible","strict","file"],Pt="flexible";function Ki(e){let t=e.split(",").map(l=>l.trim());if(t.length!==4)return{box:null,error:"bbox needs 4 numbers: minLon,maxLon,minLat,maxLat"};let o=t.map(Number);if(o.some(l=>!Number.isFinite(l)))return{box:null,error:"bbox values must be numbers"};let[n,r,a,s]=o;return n>r?{box:null,error:"bbox: minLon must be \u2264 maxLon"}:a>s?{box:null,error:"bbox: minLat must be \u2264 maxLat"}:Math.abs(a)>90||Math.abs(s)>90?{box:null,error:"bbox: latitude must be within \xB190"}:Math.abs(n)>180||Math.abs(r)>180?{box:null,error:"bbox: longitude must be within \xB1180"}:{box:{minLon:n,maxLon:r,minLat:a,maxLat:s}}}var vr=/^(\d{4})(?:-(\d{2})(?:-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?)?)?$/;function Zt(e){let t=e.trim();return t===""||t==="*"}function xr(e,t,o,n=0,r=0,a=0){let s=new Date(0);return s.setUTCFullYear(e,t-1,o),s.setUTCHours(n,r,a,0),s}function Oe(e){let t=e.trim();if(Zt(t))return!0;let o=vr.exec(t);if(!o)return!1;let[,n,r,a,s,l,d]=o,p=r?+r:1,f=a?+a:1,i=s?+s:0,m=l?+l:0,h=d?+d:0;if(p<1||p>12||i>23||m>59||h>59)return!1;if(a){let u=xr(+n,p,f);if(u.getUTCFullYear()!==+n||u.getUTCMonth()!==p-1||u.getUTCDate()!==f)return!1}return!0}function Re(e){let t=vr.exec(e.trim());if(!t)return NaN;let[,o,n,r,a,s,l]=t;return xr(+o,n?+n:1,r?+r:1,a?+a:0,s?+s:0,l?+l:0).getTime()}function ji(e){let t=e.split(/\s+TO\s+/i);if(t.length!==2)return{range:null,error:'time needs a range: time="2000 TO 2010"'};let o=a=>a.trim()==="*"?"":a.trim(),n=o(t[0]),r=o(t[1]);return!n&&!r?{range:null,error:"time range is empty"}:n&&!Oe(n)?{range:null,error:`not a valid time: "${n}"`}:r&&!Oe(r)?{range:null,error:`not a valid time: "${r}"`}:n&&r&&Re(n)>Re(r)?{range:null,error:"time range is reversed - the start is after the end"}:{range:{from:n,to:r}}}function wr(e){return`${e.from||"1"} TO ${e.to||"9999"}`}function _n(e){let t=e.trim().toLowerCase();return bt.includes(t)?t:null}function Yt(e){let t={},o=[],n=null,r=null,a=d=>{let p=e[d];return p&&p.length?p[p.length-1]:null};for(let d of Object.keys(e))we.has(d)||(t[d]=e[d]);let s=a("bbox");if(s!==null){let{box:d,error:p}=Ki(s);if(p&&o.push(p),d){let f=a("bbox_select"),i=f===null?Pt:_n(f);f!==null&&i===null&&o.push(`bbox_select must be one of ${bt.join(", ")}`),r={...d,mode:i??Pt}}}let l=a("time");if(l!==null){let{range:d,error:p}=ji(l);if(p&&o.push(p),d){let f=a("time_select"),i=f===null?Pt:_n(f);f!==null&&i===null&&o.push(`time_select must be one of ${bt.join(", ")}`),n={...d,mode:i??Pt}}}return{time:n,bbox:r,rest:t,errors:o}}function yr(e){let t=[],o=e.time;o&&(o.from||o.to)&&(t.push(`time=${rt(wr(o))}`),t.push(`time_select=${o.mode}`));let n=e.bbox;n&&(t.push(`bbox=${n.minLon},${n.maxLon},${n.minLat},${n.maxLat}`),t.push(`bbox_select=${n.mode}`));for(let[r,a]of Hi(e))t.push(`${r}=${rt(a)}`);return t.join(" ")}function Xo(e){let t=[],o=e.time;o&&(o.from||o.to)&&(t.push(`${Ne("time",[wr(o)])},`),t.push(`${Ne("time_select",[o.mode])},`));let n=e.bbox;n&&(t.push(`${Ne("bbox",[`${n.minLon},${n.maxLon},${n.minLat},${n.maxLat}`])},`),t.push(`${Ne("bbox_select",[n.mode])},`));for(let[r,a]of Gi(e))t.push(`${Ne(r,a)},`);return t.join(`
`)}function kr(e){let t=Array.isArray(e)?e[0]:e;if(typeof t!="string")return null;let o=t.match(/ENVELOPE\s*\(([^)]*)\)/i);if(!o)return null;let n=o[1].split(",").map(p=>Number(p.trim()));if(n.length!==4||n.some(p=>!Number.isFinite(p)))return null;let[r,a,s,l]=n,d=Te({minLon:r,maxLon:a,minLat:l,maxLat:s});return{minLon:d.minLon,maxLon:d.maxLon,minLat:d.minLat,maxLat:d.maxLat}}function Br(e){if(typeof e!="string")return null;let t=e.match(/^\s*[[{]?\s*(.+?)\s+TO\s+(.+?)\s*[\]}]?\s*$/i);if(!t)return null;let o=a=>a.replace(/T/," ").replace(/\s*(00:00:00|23:59:00|23:59:59)$/,"").trim(),n=o(t[1]),r=o(t[2]);return!n||!r?null:`${n} \u2192 ${r}`}function Te(e){let t=Math.min(e.minLat,e.maxLat),o=Math.max(e.minLat,e.maxLat);if(Math.abs(e.maxLon-e.minLon)>=359.5)return{minLon:-180,maxLon:180,minLat:t,maxLat:o,global:!0,wraps:!1};let n=s=>{let l=((s+180)%360+360)%360-180;return l===-180&&s>0&&(l=180),l},r=n(e.minLon),a=n(e.maxLon);return{minLon:r,maxLon:a,minLat:t,maxLat:o,global:!1,wraps:r>a}}function Sr(e,t,o,n,r,a={}){let l=`${e.replace(/\/+$/,"")}/${t}/${encodeURIComponent(o)}/${n}?translate=true`;return a.maxResults!==void 0&&(l+=`&max-results=${a.maxResults}`),a.start&&(l+=`&start=${a.start}`),r&&(l+=`&${r}`),l}var Bt=encodeURIComponent,ie=class extends Error{constructor(t,o,n,r=!1){super(o),this.name="ApiError",this.status=t,this.detail=n,this.aborted=r}};function Wi(e,t){switch(e){case 401:return"Sign in again to continue.";case 403:return"Access denied.";case 404:return"Not found - it may be temporarily unavailable.";case 413:return"Result set too large - narrow your search.";case 422:return t?`Invalid query: ${t}`:"Invalid query - check your facets.";case 429:return"Rate-limited - wait a moment and try again.";case 500:case 503:return"Service error - try again.";default:return`Request failed (${e}).`}}function $o(e){try{let t=typeof document<"u"&&document.baseURI?document.baseURI:typeof location<"u"?location.href:void 0,o=t?new URL(e,t):new URL(e);return o.origin==="null"?null:o.origin}catch{return null}}var Xt=class{constructor(t,o){this.channels=new Map,this.oneOffSet=new Set,this.reqCounter=0,this.signedIn=!1,this.authGen=0,this.signedInListeners=new Set,this.cfg=t,this.base=t.apiBase.replace(/\/+$/,""),this.portal=t.dataPortalBase.replace(/\/+$/,""),this.authOrigins=[$o(this.base),$o(this.portal)].filter(n=>n!==null),o.add(()=>{for(let n of this.channels.values())n.abort();for(let n of this.oneOffSet)n.abort();this.signedInListeners.clear()})}nextRequestId(){return++this.reqCounter}oneOffPending(){return this.oneOffSet.size}channelSignal(t){this.channels.get(t)?.abort();let o=new AbortController;return this.channels.set(t,o),o.signal}async oneOff(t){let o=new AbortController;this.oneOffSet.add(o);try{return await t(o.signal)}finally{this.oneOffSet.delete(o)}}async bearer(){let t=this.cfg.authEnabled?await Yn(this.cfg.getAuthToken):null;return this.noteSignedIn(t!==null),t}isSignedIn(){return this.signedIn}onSignedInChange(t){return this.signedInListeners.add(t),()=>this.signedInListeners.delete(t)}authGeneration(){return this.authGen}noteSignedIn(t){if(t!==this.signedIn){this.signedIn=t,this.authGen++;for(let o of[...this.signedInListeners])try{o(t)}catch{}}}async headers(t){let o={...t},n=await this.bearer();n&&(o.Authorization=`Bearer ${n}`);let r=this.cfg.getCsrfToken();return r&&(o["X-CSRFToken"]=r),o}async request(t,o,n){let r,{headers:a,...s}=o??{},l=await this.headers(a);n&&(n.authGen=this.authGen);try{r=await fetch(t,{...s,credentials:"same-origin",headers:l})}catch(d){throw d instanceof DOMException&&d.name==="AbortError"?new ie(0,"Request aborted.",void 0,!0):new ie(0,"Network error - check your connection.")}if(!r.ok){let d;try{let p=await r.clone().json();typeof p.detail=="string"&&(d=p.detail)}catch{}throw new ie(r.status,Wi(r.status,d),d)}return r}async json(t,o,n){return await(await this.request(t,o,n)).json()}searchUrl(t,o,n,r,a){return Sr(this.base,t,o,n,r,a??{})}catalogueUrl(t,o,n,r){let a=`${this.base}/${t}-catalogue/${Bt(o)}/${n}?translate=true&max-results=100000`;return r&&(a+=`&${r}`),a}dataSearchUrl(t,o,n){let r=`${this.base}/data-search/${Bt(t)}/${o}?translate=true&max-results=100000`;return n&&(r+=`&${n}`),r}extendedSearch(t,o,n,r){let a=this.searchUrl("extended-search",t,o,n,{maxResults:100,start:r?.start});return this.json(a,{signal:r?.signal})}metadataSearch(t,o,n,r){let a=this.searchUrl("metadata-search",t,o,n,{});return this.json(a,{signal:r})}overview(t){return this.oneOff(o=>this.json(`${this.base}/overview`,{signal:o},t))}filePathMetadata(t,o,n){let r=o.map(s=>`file=${Bt(s)}`).join("&"),a=`${this.base}/extended-search/${Bt(t)}/file?max-results=100&translate=true&fields=time&fields=bbox&${r}`;return this.json(a,{signal:n})}catalogueResponse(t,o,n,r,a){return this.request(this.catalogueUrl(t,o,n,r),{signal:a})}manifestResponse(t,o,n,r){return this.request(this.dataSearchUrl(t,o,n),{signal:r})}async dataSearchText(t,o,n){return(await this.oneOff(a=>this.request(this.dataSearchUrl(t,o,n),{signal:a}))).text()}async load(t,o){let n=`${this.base}/load/${Bt(t)}?${o}`;return(await this.oneOff(a=>this.request(n,{method:"GET",signal:a}))).text()}async authHeadersFor(t){let o=$o(t);if(!o||!this.authOrigins.includes(o))return{};let n=await this.bearer();return n?{Authorization:`Bearer ${n}`}:{}}listFlavours(t){return this.oneOff(o=>this.json(`${this.base}/flavours`,{signal:o},t))}};function c(e,t,o){let n=document.createElement(e),r=null;if(t)for(let[a,s]of Object.entries(t))s==null||s===!1||(a==="class"?n.className=String(s):a==="text"?n.textContent=String(s):a==="title"?(n.setAttribute("data-tip",String(s)),r=String(s)):n.setAttribute(a,String(s)));if(o)for(let a of o)a==null||a===!1||n.append(typeof a=="string"?document.createTextNode(a):a);return r&&!n.getAttribute("aria-label")&&!n.getAttribute("aria-labelledby")&&!(n.textContent&&n.textContent.trim())&&n.setAttribute("aria-label",r),n}function H(e,...t){e.textContent="";for(let o of t)o==null||o===!1||e.append(typeof o=="string"?document.createTextNode(o):o)}var Zi="http://www.w3.org/2000/svg";function S(e,t){let o=document.createElementNS(Zi,"svg"),n=t?.size??18;return o.setAttribute("viewBox",t?.viewBox??"0 0 24 24"),o.setAttribute("width",String(n)),o.setAttribute("height",String(n)),o.setAttribute("fill","none"),o.setAttribute("aria-hidden","true"),o.innerHTML=e,o}var $t=class e{constructor(){this.items=[],this.disposed=!1,this.detach=null}get isDisposed(){return this.disposed}get size(){return this.items.length}add(t){return this.disposed?(t(),()=>{}):(this.items.push(t),()=>this.removeDisposer(t))}listen(t,o,n,r){t.addEventListener(o,n,r);let a=!0,s=()=>{},l=()=>{a&&(a=!1,t.removeEventListener(o,n,r),s())};return s=this.add(l),l}setTimeout(t,o){let n=window.setTimeout(()=>{this.removeDisposer(r),t()},o),r=()=>window.clearTimeout(n);return this.add(r),n}setInterval(t,o){let n=window.setInterval(t,o);return this.add(()=>window.clearInterval(n)),n}raf(t){let o=window.requestAnimationFrame(r=>{this.removeDisposer(n),t(r)}),n=()=>window.cancelAnimationFrame(o);return this.add(n),o}abortController(){let t=new AbortController,o=()=>t.abort();return this.add(o),t}child(){let t=new e,o=()=>t.flush();return this.add(o),t.detach=()=>this.removeDisposer(o),t}removeDisposer(t){let o=this.items.indexOf(t);o>=0&&this.items.splice(o,1)}flush(){if(!this.disposed)for(this.disposed=!0,this.detach?.(),this.detach=null;this.items.length;){let t=this.items.pop();try{t?.()}catch{}}}};function _t(e,t,o,n,r=60){let a=0,s=()=>{let l=Math.min(o,a+r),d=document.createDocumentFragment();for(;a<l;a++)d.append(n(a));t.append(d)};if(s(),!(a>=o))if(typeof IntersectionObserver=="function"){let l=c("div",{class:"chunk-sentinel","aria-hidden":"true"});t.append(l);let d=new IntersectionObserver(p=>{p.some(f=>f.isIntersecting)&&(s(),a>=o?(d.disconnect(),l.remove()):t.append(l))});d.observe(l),e.add(()=>d.disconnect())}else{let l=c("button",{class:"chunk-more",type:"button"}),d=()=>{l.textContent=`Show ${Math.min(r,o-a)} more (${o-a} remaining)`};d(),t.append(l),e.listen(l,"click",()=>{l.remove(),s(),a<o&&(d(),t.append(l))})}}function ct(e){let t=null,o=()=>{t!==null&&window.clearTimeout(t),t=null};return e.add(o),(n,r)=>{t!==null&&window.clearTimeout(t),t=window.setTimeout(()=>{t=null,n()},r)}}var _o="http://www.w3.org/2000/svg",Yi=["netcdf","grib","zarr","stac","intake"],Xi={netcdf:'<path fill-rule="evenodd" d="M134 96v47H40l2 3 3 2h89l2-3 3-2V54l-2-3-3-2zm113 0v47h-94l2 3 3 2h88l3-2 3-3v-43l-3-50c-2-1-2-1-2 46m228 0v47h-47c-48 0-48 1-46 3 1 1 2 2 47 2h46l2-3 3-2V54l-2-3-3-2zm-113 0v47h-48l-48 1 2 2c2 1 4 2 47 2h44l3-3 3-3V99c0-41 0-49-3-49zM134 209v47H87l-47 1c1 4 5 4 50 4h44l3-3 2-3v-88l-2-3-3-2zm113 0v47h-94l2 3 3 2h88l3-3 3-3v-88l-2-3-3-2zm228 0v47h-48l-47 1c1 4 5 4 50 4h44l3-3 3-3v-88l-2-3-3-2zm-113-45v92h-96l2 3 3 2h43l46-1c5-1 5-3 5-49l-1-46zM134 323v48H87l-42 3 43 1h44l3-3 4-4v-89l-3-2-2-2zm113 0v48h-47l-42 3a509 509 0 0 0 89-1l5-5v-89l-3-2-2-2zm228 0v48h-47c-47 0-47 0-45 2s4 2 46 2c43 0 43 0 47-2l4-5v-89l-3-2-2-2zm-113 0-1 47-47 1c-46 0-46 0-44 2s4 2 46 2l45-2 3-3a1011 1011 0 0 0-2-93zm-79 77-1 9v9h-4q-4 0-4 3-1 4 4 3h4v43h8l-1-15 1-15q5 0 6-5l1-2q2-1 1-3l1-4q3-4-5-6h-5v-17zm46 0-2 1-2 1-6 4-2 1-4 3-6 8-1 3-1 13c0 9 0 11 2 16l5 7 1 2 2 2 3 2 5 3 5 2c1 2 21 2 23 0l5-2c4-1 12-8 12-10l-2-2q-1-3-6 1l-5 3-1 1c0 2-10 3-17 3q-8-1-12-4-10-7-12-15l-1-4v-10l2-5q1-5 7-10 6-6 12-7 15-2 23 4 8 7 10 5 6-3-2-8l-6-5-5-2q-4-2-13-2zm48 34v33h5l6 2h7q1-2 10-2l13-2c6-4 14-14 14-20l1-2 1-8-1-9-1-4q-3-9-13-16l-10-4-7-1-13-1h-12zm65-33-1 33v33h8v-12q0-13 1-11 4 1 9-6 3-4 10-3h6v-7l-13-1h-13v-10c0-9 0-9 2-9q3 0 1 2-3 3-1 6 1 1 5-2l3-5q-2-1 8-1h8v-7l-17-1zm-57 34v26h12c10-1 12-1 17-4q6-3 8-7c3-5 3-6 3-15q1-10-2-13c-1-3-7-9-8-9l-3-2q-2-2-11-3l-7 1c1 1-5 8-7 8q-2-3 1-7 2-2-1-2c-2 0-2 0-2 27m-204-15-5 4-2-2q0-4-4-3h-2l-1 24v24h8v-11l1-12q2 0 3-3l4-6 2-4-2-2-2-2 2-1 8-2c6 0 6 0 9 3q3 3 3 7l1 4 1 15v14h6v-18c0-20 0-21-8-28-4-4-4-4-11-4-6 0-7 0-11 3m54-2-2 1-1 1c-2 0-9 7-9 9l-1 1c-1 0-3 7-3 12 0 6 2 14 3 14l1 1c0 2 6 8 11 10q3 2 11 2 10 0 17-7l6-9-4-2q-3 0-4 2-1 6-9 8l-9 1q-6-1-9-4l-3-3 5-4 4-6c-1-2 0-2 11-2s12 0 11 2q-1 2 4 2 6 0 5-4c0-5-2-13-3-13l-1-1c0-2-7-8-11-10s-14-2-20-1m1 7-5 4c-2 2-4 8-2 8l1-1h4l10 1a36 36 0 0 0 17-2l-1-3q-3-8-16-8zm189 37-3 3 4-2q5-5-1-1"/><path fill="#f9f9f9" fill-rule="evenodd" d="m373 45 1 50v46h100V43l-51-1h-50zM260 206v50h100V156H260zm113-48 1 50v48h100V156H373zM147 320v50h100V269H147zm113 0v50h100V269H260zm114-2v51l50 1h50V269H374z"/><path fill="#ececec" fill-rule="evenodd" d="M260 92v51h100V41H260zm163-50h50v99h-98V94h-2v49h50l51-1 1-51V42zh-51zM165 155l-10 1h-8v8l-1 10-1 37 2 42v3h100V156h-3l-4-1-38-1zm113 0 37 1 37-1-37-1zm113 0 38 1 38-1-38-1zm82 51h2zm-113-48h2l-1-1zm13 50h2zM32 320v50h102V269H32zm328-49 1 1 1-2h-1zm-215 54 1 37 1-37-1-38zm116 45"/><path fill="#036581" fill-rule="evenodd" d="M147 92v51h100V41H147zM32 206v50h102V156H32z"/><path fill="#264961" fill-rule="evenodd" d="m33 42-1 51v50h102V41H84zm327 52h2zm-215 3 1 38 1-37-1-37q-1-1-1 36m-94 58 38 1 37-1-37-1zm309 52h2zm0 114v48h-48l-1 2 50-1 1-50zM36 370l49 1 49-1-50-1zm114 0q-1 1 48 1l1-2zm226 0 50 1-1-2z"/>',grib:'<path fill="#404040" fill-rule="evenodd" d="m88 34-2 3v189H68c-19 0-24 1-26 4l-1 71v69l23 42 22 41v11c0 10 0 11 2 14l3 2h329l3-2c2-3 2-4 2-14v-11l15-27 22-42 8-14v-69l-1-71c-2-3-7-4-26-4h-18v-96l-50-49-49-49H91zm13 13v179h310v-85l-46-1h-45l-2-3c-2-2-2-3-2-47V46H209zm230 45v34h69l-34-34-35-35zM55 241v61l1 60h400V241l-200-1zm67 29q-11 5-17 16-7 14-1 30 6 9 16 15c4 2 6 2 14 2s10 0 15-2c10-6 18-18 18-28q0-5-3-7c-2-2-4-2-17-2-15 0-15 0-18 2q-5 5 0 10c2 2 3 2 13 2h10l-2 3-6 6q-4 3-10 3-16-1-19-16-1-21 21-22 7 1 10-2 5-5 0-9-1-4-10-3zm70 0c-2 2-2 4-2 31 0 28 0 29 2 31q4 4 10 1 2-1 2-10l1-8 12 9c14 11 17 12 21 8q4-4 1-8l-11-9-9-7 4-1 6-2q7-4 10-12 3-15-10-23c-4-2-6-2-20-2s-15 0-17 2m81 0c-3 2-2 8 0 10q2 3 9 2h7v38h-6q-9 0-11 3c-2 2-1 8 1 9 1 2 5 2 23 2 20 0 22 0 23-2q4-5 1-9-2-3-11-3h-6v-38h7q11 0 11-7c0-7-1-7-25-7-20 0-22 0-23 2m81 0c-2 2-2 3-2 29l2 33c1 2 1 2 18 2h18l4-4q8-5 8-14 0-6-2-10l-2-5 2-4c4-7 2-18-4-24-5-4-8-5-24-5-15 0-16 0-18 2m-150 17q-1 7 4 7h9q10 0 9-7 1-5-13-5h-9zm162 1v6h9l11-1 2-3v-4l-2-3-11-1h-9zm0 26v6h9l11-1q5-4 0-9-2-2-11-2h-9zM64 384l12 20 8 15 2 5v-48H60zm36 37 1 45h310v-90H100zm325-21v24l2-5 20-35 4-8h-26z"/><path fill="#e7f7dc" fill-rule="evenodd" d="m56 241-1 61 1 60h400V241l-200-1zm68 28q-11 4-16 11-9 12-7 25 6 28 33 29c7 0 10-1 18-5 9-5 17-22 15-31q-1-4-21-4c-11 0-13 0-16 2q-5 4-2 10c2 2 3 2 13 2q15-1 7 6-10 10-23 4-9-5-10-15 0-9 6-16 6-5 14-4l7-1q6-3 6-8-2-7-12-6zm68 1c-2 2-2 7-2 31 0 32 0 33 6 33q8 1 8-11l1-8 12 10c14 10 17 11 21 7q3-3 1-7l-10-10-10-7 4-1 8-3q4-1 6-7l3-8q0-14-11-19c-4-2-7-2-20-2-15 0-16 0-17 2m81-1-2 4v5q4 5 13 5l5-1v38h-7q-7 0-9 2c-2 2-3 8 0 10 2 3 7 3 27 3l19-2c4-3 2-10-2-12l-8-1h-6v-38l5 1q11 0 13-5t-1-8c-2-2-3-2-24-2zm81 1c-2 2-2 8-2 31l1 30c2 3 3 3 12 4q17 1 24-2c4-1 11-8 12-12 2-4 1-13-1-17q-3-3 0-7 4-8 1-16c-1-5-9-12-13-12l-18-1c-14 0-15 0-16 2m-150 18q-1 5 3 6h9q11 0 10-7 2-4-13-4h-9zm162 0v6l9-1h11l2-4q3-7-13-6h-9zm0 26v6h9c9 0 10 0 12-3q3-2 1-5l-4-3-10-1h-8z"/><path fill="#fff" fill-rule="evenodd" d="M100 47v90l1 89h310v-85l-46-1c-44 0-46-1-48-2l-1-47V46H208zm231 10v69h69zM61 377l3 6 20 37c2 2 2 2 2-21v-23H74zm39 44 1 45h310v-89l-156-1H100zm325-22c0 27-1 25 7 11l18-33-12-1h-13z"/>',zarr:'<defs><linearGradient id="freva-zarr-grad" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#e57c77"/><stop offset="48%" stop-color="#e41073"/><stop offset="100%" stop-color="#bd1083"/></linearGradient></defs><path fill="url(#freva-zarr-grad)" fill-rule="evenodd" d="m247 35-11 5-1 1-2 1-3 3c-2 2-2 3-2 11l1 10 5-2 7-3 4-2 3-2 5-2q2-2 2-12V33h-3zm10 8q0 11 2 11c2 3 17 10 19 10l4 2q5 5-12-3l-12-6-1 13c0 11 0 12 2 14l4 2 11 5 10 4 1-12-1-12v-3l1-12V45l-4-2-4-2-4-2-6-4-7-2h-3zm4-8v9q0 12 4 11l4 2c2 2 12 6 13 5l1-7q1-6-2-9l-5-2-4-2-4-3-4-2zm25 22v12l12 6 13 6 1-11V59l-4-2-5-3-2-1-2-1-1-1-3-1-4-2-2-1q-3-5-3 10m-66-8-4 2-3 1-2 1-2 1-1 1-3 2-4 2-1 11 1 11 4-2 4-2 2-1 1-1 7-3 6-3V59c0-10 0-11-2-11zm68 9q0 10 2 10l2 1 1 1 3 2 3 1 6 2 4 2 1-8q0-10-3-9l-2-2-2-1-6-3-4-3-3-1q-2-1-2 8m-37 1-5 2-3 2-3 1-7 3-3 2c-2 1-2 1-2 14l1 13 1-1 3-1 3-2 4-2 2-1 1-1 7-3 5-2V70l-1-13zm-58 3-2 1-2 1-3 2-3 2-4 2-4 2c-2 1-3 2-3 13l1 11 1-1 11-5 2-1 6-4 5-2V72c0-12 0-12-5-10m68 10c0 9 0 10 2 11l16 8 2 1c2-1 2-2 2-11v-9l-11-6-11-5zm53-1c0 10 0 11 2 13l4 2q5 1 5 4l-5-2-5-1-1 12c0 13 0 14 5 15v2l-3-1-1-1-1 14c0 11 1 13 2 14q21 11 23 10l1-12-1-13-6-4-7-3-3-2-1-1 2-1 1 1 4 3 5 2 2 1 2 1 1 1 1-14V98l-3-2-6-2q-4-1-4-4l11 5h1l1-10c0-10 0-11-2-13l-9-5-8-4-4-2h-3zm2 1 1 10 3 1 2 1 7 4 7 3 1 1 1-9c0-9 0-9-2-9l-4-2-4-2-1-1-1-1-3-2-5-2c-2 0-2 0-2 8m-92 1-3 1-4 2-3 1-4 2-4 2-4 2c-2 2-2 4-2 15v12l12-5q9-6 12-6 2 2 2-13 0-18-2-13m62 13c0 13 0 13 2 13l2 1 2 1 7 3 2 1 3 1 8 4V83l-3-1-4-2-2-1-2-1-2-1-13-5zm56-1 1 13v1l-1 14v14l10 4 11 5 1 1 1 1q3 0 3-17v-8l-7-4-8-5q0-2 6 1 8 6 8 3l1-11c0-11 2-9-13-16l-8-5-3-1c-2-1-2-1-2 10m-177-9-2 1-3 2-3 2-4 2-5 3-3 1-1 10 1 11 6-2 8-3 3-2 5-2 3-1V75h-2zm123 9c0 9 0 10 2 12l5 2 3 2 4 2 3 1 3 2 2 1V97q1-12-2-12l-4-2-3-2-11-5q-3-1-2 9m58-5-1 8v9l7 3 8 3 3 2 2 2 1-10c0-8-1-8-3-10l-8-4-2-1-2-1-2-1zm-154 8-5 3-2 1-2 1-2 1-6 3-3 4v24l3-2 4-2 3-1 8-4 4-2 3-2 1-12-1-13zm59-1-3 2-3 1-4 2-3 2-4 2-4 2c-2 1-2 2-2 14v13l4-2 5-2 2-1 8-5 8-3V99l-1-12zm7 0-1 12c0 12 0 13 2 14q5 2 1 3h-3v25l13 6 13 7c0 2-5 1-6 0-1-2-17-10-19-10l-1 12 1 14 1 2-3 1-12 5-10 4-1 1-1 1-3 2-4 2-9 4-7 3-3 2-4 2-2 1q1 2-8 4l-4 2-9 5-7 4v12c0 11 0 12 2 12l4-1q6-3 7-1l-2 1-6 3-5 2v13q0 13 2 13l2-1 1-1 4-2 4-2 2-1 5-3 5-3 1-5 1-4 1 5q0 6 2 3c1-2 7-5 9-5l2-1 1-1 4-2 4-1c1 1-3 4-4 4l-2 1-1 1-8 3-6 4-1 12 1 12 6-3 2-1 2-1 1-1 3-1 3-2 5-1 2-2v-12l-1-14 5-2-1 1v12c0 12 0 12 3 12l2 1-6 5-10 5-3 2-4 2-3 1c-1 0-22 10-23 12l-4 1-2 1-12 6-12 7-2 1-26 13-5 2-6 2-3 2-4 2-2 1-17 8-3 2-3 1-3 2c-1 1-11 6-16 7l-3 3-3 1-4 2c-1 1-13 7-18 8l-2 2 7 3 3 2c2 2 12 7 15 7l4 2 3 2 4 2 4 2 2 1 9 4 6 3 6 3 9 5 5 2 2 1 2 1 2 1 13 6 3 2 4 2 2 1 15 7 3 2 3 1 1 1 18 8 3 2 3 2 2 1 11 5 2 1 4 2 3 1 1 1 3 2 11 5 4 2 5 2 2 1 1 1 4 2 4 2 3 2 4 1 2 1 2 1 2 1c0 2 8 1 10-1l7-4 5-2 22-11 2-1 2-1c1-1 15-8 18-8l3-2 25-13 19-9 1-1 2-1 2-1 7-3 3-2 7-4 5-2 11-5 5-2 5-3 1-1 2-1 2-1 11-5 5-2 4-3 2-1 15-7 2-1 1-1 3-1 7-5q6-2 7-4l-2-2c-5-1-17-7-18-8l-3-2-4-1-2-2-17-8-4-2-3-2-2-1-17-8-20-9-4-2-4-3-8-4-10-4-2-1-8-5-8-5q0-3 4-1l11 6 10 5v-3l1-12v-9l-4-1-5-3-14-7-1-1-1-1-1 9-1 9-1-10v-9l-12-6-12-7q0-2 5 1 17 9 18 8l1-27-1-28-4-1q-4-1-4-4l7 3 1 1 1-9 1-8 1 9q0 10 2 9l1 1 3 1 5 3 4 3 6 2 4 2v-2l1-13c0-9 0-10-2-11l-3-2-3-2-16-8q-2-3 12 4l11 5 1-13v-13l-7-3q-10-4-10-6 1-3 5 1l4 2 3 2q4 3 4-2l1-13c0-9 0-10-2-11l-2-1-3-1-3-1-15-8-1 14q0 15 2 13l1 1 2 1 2 1-1 1-8-4-2-1-4-2-5-2-3-2q-2-2-7-3l-7-4-6-3-3-2-2-1-3-1-4-3q-6-2-2-3l2 1 1 1 3 1 12 6c2 0 2-1 2-13v-13l-3-1-5-2-12-6-2 1 2 1 3 2 2 2 7 3 6 3v10c0 11 0 11-2 10l-3-2-4-2-5-2-2-1-2-1q-4 1-4-13l1-10v-3l-2 2v53l1 1h-4v-2l1-14c0-12 0-13-2-14l-2-1-2-1-7-4-4-3q-5-1-3-2l3 1 2 1 3 2 3 1 1 1 2 1 2 1 1 1q3 0 3-17 1-9-2-10-6-4-9-4l-3-2-3-2-2-1zm113 3-1 12-1 10 7 3 47 23c2-1 2-2 2-11 0-10 0-10-3-13l-4-2-4-2-15-7-3-2-4-2-2-1-9-5-8-4q-1-2-2 1m-239 2-6 5-2 1-6 3-1 11q0 15 3 10l1-1 3-1 4-2 7-3 2-1q4 1 4-13c0-11 0-11-2-11zm129 9v11l4 1 3 2 2 1 6 2q8 6 7-7 1-10-2-10l-10-5-2-2-7-4zm55-1 1 10 4 2 4 3 2 1 4 2q8 7 7-9 1-10-2-10l-2-1-3-1-4-3-9-4q-2-2-2 10m57 1 1 9 9 5 10 5v-9c0-9 0-10-3-11l-4-1-3-1-3-2-4-2-2-2zm-29-1 2 1q2 1 0 3l-1 10q0 11 2 11c2 2 13 8 16 8l3 1v-9l-1-11-7-3-6-4q0-2-3-2-3-1 0-2 5-1 0-2l-2-1-1-1zm-180 2-3 2-6 4c-12 6-11 4-11 17q0 13 2 13l2-1 2-1 10-6 4-1 4-2c2-2 2-4 2-14 0-12 0-12-2-12zm58 0-3 1-3 1c-1 2-13 8-15 8l-1 13c0 13 0 13 2 13l5-2 4-2 2-1 8-4c4 0 5-2 4-16q1-13-2-12zm-113 3-5 2-3 1-4 3-4 2-2 1q-4-1-4 13c0 9 0 10 2 11l2-1 2-1 2-1 1-1 5-2 5-3 4-1 3-1v-12l-1-12zm292 11 1 9 3 2 4 2 6 3c8 3 8 3 8-7 0-9 0-9-2-9l-4-2-5-2-3-1-4-2-2-1-1-1zm-31-1 1 26q3 3 0 3l-1 13v13l3 1q4 1-1 2l-2 1v12l1 13 2 1 4 2q5 1 7 4l4 2 13 6q0 3-4 0l-4-2-9-5-5-2-2-1-7-3v26l9 4 40 21c6 3 6 3 6-11v-12l-7-4-8-4-6-3-1-1v-2l9 5 10 4c3 1 3 0 3-12s0-13-2-13l-3-2-2-2-17-8v-1l6 2 7 3 1 1 2 1 2 1 2 1 3 2 1-13v-14l-7-3-10-6q1-3 5 1l4 2 3 2 3 1c2 0 2-1 2-12 0-12 0-12-2-15l-5-2-2-1-17-8-3-2-4-2-2-1-7-4-6-3-2-1-4-1zm-235 2-4 2-8 5-5 3-1 13v13l8-4 8-5 4-1c3 0 4-2 4-15v-12h-3zm52 2-7 5-3 1c-4 0-5 2-5 15l1 13 1-1 2-1 11-5 2-1 2-1 3-2 4-1v-12c0-13 0-13-2-13zm54 2c-14 7-13 6-13 20q0 16 3 11l2-1 4-1 9-5 2-1 4-2h3v-13c0-13 0-13-2-13zm186 7v12l4 3 6 3 3 1 4 2 4 2 3 1q1 3 1-11l-1-12-2-1-2-1-2-1-2-1-3-2-2-2-6-2-5-3zm-345-9-3 1-4 2-3 1-1 1-2 1-2 1-3 2-4 1v24l4-2 5-3 2-1 5-2 3-2 4-2c2-2 2-3 2-12q1-12-2-11zm234 10v11l3 1 18 8 1-10v-10l-11-6-11-5zm57 0 1 11 10 4 9 4v-10c0-10 0-11-3-12l-4-1-2-1-11-6zm-112 1 1 10 11 5 3 2 4 2q3 2 3-9 1-10-2-10l-5-4-6-3-6-2-3-1zm168-1c0 8 0 8 2 11l5 2 2 1 1 1 5 2 5 2v-18l-2-1-5-2-12-6zm-323 3-18 10-1 13 1 12 3-1 21-10 1-13-1-14zm60-2-4 2-6 4-5 2-5 3c-2 2-2 3-2 14l1 12 18-9 4-2 3-1v-12l-1-13zm52 3q-6 2-7 4l-3 1-4 2-3 2-1 12 1 13 12-5 13-6v-14l-1-13zm236 11c0 11 0 12 2 12l7 3 2 1 2 1 7 3 3 2 2 1 1-12c0-12 0-13-2-13l-12-6-11-5zM53 133l-4 2-3 1-1 1-2 1-2 1-4 3-4 2-1 11 1 11 10-5 3-1 3-1 5-3 4-2v-10l-1-11zm348 10q0 12 2 12l7 3 4 2 5 2q1 3 3 1l1-10c0-9-1-10-3-11l-4-2-4-2-3-2-4-2-3-1q-1-2-1 10m-113 1 1 11h3l4-2 4-2 4-2 4-2 2-3-1-1h-2l-1-1-3-2-14-7zm57 0c0 9 0 10 2 11l6 3 5 2 2 1 5 2 1-10c0-9-1-10-3-11l-4-2-13-7zm113 0c0 9 0 10 2 11l3 1 13 7 1 1 1-9q0-12-3-10l-2-2-2-1-3-2-3-2-5-2-2-2zm-83 0 4 2 5 4 3 1 3 1c0 1 8 6 10 6l3 1h3l-4-2-27-14zm-293 1-3 1-4 1-4 3-4 2-1 1-4 2c-2 2-2 3-2 14s1 11 3 11l3-2 4-1 4-2 4-2 2-1 2-2c2 0 3-1 3-13l-1-13zm57 0-3 1-4 2-3 1-1 1-2 1-2 1-3 2-4 1v14q0 17 3 12 3-3 7-4l4-2 3-2 4-2c3-2 3-3 3-15q0-16-2-11m53 1-6 3-7 5-6 3-1 12c0 12 0 13 2 13l2-1 8-4 4-2 3-2 5-2c2-2 2-4 2-15l-1-12zm59-1-3 1-4 3-13 6-3 1v14c0 12 0 12 3 12l2-1 4-3 6-3 4-2 5-2 3-2v-11l-1-13zm176 11v42l6 3 7 3 2 2 4 2 3 2 2 2 1-14-1-15-5-2-8-4-5-2-1-1-2-1q-3-1-1-2l3 1 2 1 4 2 7 4 5 2 1 1 1-26-3-2-4-2-3-2-6-3-6-2-3-1zm-166-8v21l3-1 6-2 5-2 3-2 3-2q3 0 1-1l-5-3-6-3-3-2-2-1zm47 2-7 4-5 3a619 619 0 0 0-66 33c-2 0-14 6-15 8l-4 1-2 1-2 1-3 1-3 1-6 4q-9 5-4 5l14 6c1 2 7 1 9-1l3-2 14-6 2-1 2-1 3-2 32-15 9-4 2-1 1-1 3-2 5-3 4-1 3-1 2-1 8-4 5-3 2-1 4-2 5-2 3-2 3-2 5-1 3-2-3-1-4-1-1-1-14-7zm66-2-1 10c0 10 0 11 3 12l4 1 7 4 4 2c2 0 2 0 2-10v-10l-3-1-5-3-10-6zm55 9v10l20 10 1-10v-10l-7-3-9-6-3-1q-2-2-2 10m-378 2-4 3-3 2-4 2-3 2h-3c-2 1-2 2-2 14s0 13 2 13l2-1 3-2 11-5 8-3v-13c0-12-1-13-2-13zm56 1-5 3-1 1-4 2-4 2-4 2c-2 3-2 4-2 14q0 12 2 11l8-3 1-1 14-7 1-13-1-13zm60-1-3 1-3 1-9 6-8 3v27l8-4 4-3 3-1 7-3c3 0 4-2 4-14l-1-13zm57 0-3 1-3 1-9 6-9 4v13l1 13 1-1 2-1 4-1c1-2 11-7 15-8 2 0 2-1 2-14zm231 0-1 13 1 12v2l-1 14 1 13q4 1 1 3c-2 0-2 1-2 12l1 13 23 12 1 1 1-13v-14l-3-1-4-2-2-1-3-2-2-2-4-1q-3-1-1-2h2l2 1 3 2 11 6 1-13c0-12 0-13-2-14q-4-3 0-3c2 0 2-1 2-13v-12l-4-2-5-3-15-7zm-124 3-6 4-4 3-11 4-9 4-2 1-2 2-3 1-9 5-32 15-2 1-4 2-16 8-2 1-5 2-7 4-4 2c-3 0-4 2-4 14l1 12 7-3 18-8 3-2 3-2 4-2 3-2 4-1 18-9 11-5 10-5 4-2 2-1 9-4 3-1h3l-2 3-2 3-2 4-3 4-2 2-3 6-5 6-3 4-1 2-3 4-4 7-4 6-4 5-2 4-2 3-2 2-3 4-3 4-1 2-2 3-1 2-1 1-3 4-6 10-2 3-2 2-2 3-2 4-1 1-1 2-1 1-2 2-3 4-3 5-2 4-3 4-2 3-2 2-3 5-4 6-2 3c-2 1-2 3-2 19l1 17 1-1 11-5 3-1 3-2 1-1 2-1 2-1 7-3 3-1 6-3 4-2 2-1 2-1 1-1 4-2 3-2 4-1 6-3 4-2 29-14 4-2 2-2 9-4 2-1 2-1 7-3c3 0 4-2 4-16v-13l-4 1-4 2-3 2-4 2-9 4-4 3-3 1-2 1-9 4-9 5-2 1-2 1-2 1-2 1-26 13-11 5-4 1q-6 1 1-5l3-5 2-4 2-3 1-2 3-3 4-6 4-6 4-5 2-3 3-4 4-7 4-5 2-3 2-3 5-8 2-3 2-2 2-3 2-3 3-4 3-4q0-3 3-6l2-3 3-3 3-4 5-9 2-3 2-2 2-3 3-4 2-3 2-3 2-3 2-3 2-2 3-4c2-2 2-2 2-20l-1-17zm70 9 1 11 10 6 10 5 1-10v-11l-6-3-7-4-2-1-4-2-2-2zm-56 2c0 9 0 10 2 11l2 1 2 1 2 1 1 1 6 3 6 2v-21l-7-3-6-4-2-1-3-1q-3-5-3 10m113-1c0 9 0 10 2 12l4 2 11 5q3 4 3-10v-10l-9-4-10-5zm-378 2-2 1-3 2-5 3q-5 0-7 4c-3 2-3 3-3 14l1 12 11-6 8-3q6-3 6-5l-1-12v-11h-2zm57 0-8 5-10 4c-2 1-2 3-2 14l1 13 7-3 6-4 2-1 3-1c4 0 5-2 5-16 0-11 0-12-2-12zm54 2-10 5q-4 1-7 4c-2 2-2 3-2 14l1 12h1l6-3 14-8 2-1c2 0 2-1 2-13l-1-13zm186-2q1 3 11 6l7 4q3 4 4 1l-3-2-3-2-1-1-3-1-3-2-4-2q-4-3-5-1m52 2v10q0 14 4 13l8 4 8 3 1-10-1-10-3-2-4-2-2-1zm-56 12c0 10 0 11 2 11l4 1 13 6 1-10-1-10-3-2-7-3-5-3-2-1c-2 0-2 1-2 11m-262-1-4 2-4 3-3 1-4 2-4 2-1 1-2 1c-2 0-2 1-2 12l1 13 4-1 6-2 4-3 5-3 3-1 3-1v-14l-1-13zm347 0 2 1 2 1 2 1 4 2 5 3q3 1 1-2l-3-2-6-3q-8-3-7-1m-406 2-2 1-4 2-3 1-4 2-4 2c-2 2-3 2-3 15l1 13 4-2 3-2 4-2 3-2 4-2 5-3c1-1 2-2 2-12v-12h-3zm111 0-3 3-3 1-4 2-5 3-4 2v12l1 12c1 1 14-6 16-8l4-1 2-1 2-1 1-12c0-13 0-13-2-13zm238 12 1 11 2 1 15 7 2 1q3-1 2-10 0-13-4-12l-9-4-4-3-4-2zm57 0c0 11 0 11 3 12l2 1 2 1 5 2 4 2 2 1 1 1 1-10v-10l-6-3-7-4-6-4zm-113-9v11l1 8 8 4 8 5 2 1q3-1 2-10 0-13-5-12l-3-2-6-3-5-3zm-9 8-1 3q-4 3 1 3 3 1 2-3l-1-4zm-252 2-3 1-4 1-4 3-4 2-2 1-2 1-2 2c-2 0-3 1-3 13v13l2-1 5-2 5-2 4-3 6-3h3v-27zm53 1-5 3-2 1-2 1-2 1-4 3-4 2-1 12v13l2-1 3-1 6-3 7-5 4-1h2v-13l-1-14zm290 10v71l5 3 7 4 10 5 1 1 1 1 1-28-1-29-15-7-4-2-3-2v-2l9 5 12 5 2 1v-25l-3-2-4-2-3-2-2-2-4-1-6-3-3-1zm-124-8-4 2-5 3-4 2-2 1-4 2-6 2-6 4c-7 3-8 5-11 11l-2 3-2 2-3 4-3 5-5 7-2 3-2 3q-3 2-3 5l-3 5q-6 6-10 14l-2 2-2 2-1 2-1 2-2 3-2 3-2 3-4 5-4 7q-3 2-5 7l-4 6-3 3-1 2-1 2-3 4-4 6 4 1 5 2 2 1 6 2q6 4 5 1l3-4 6-10 2-3 2-2 3-4 3-4 1-3 3-4 5-6 4-7 3-5 2-3 1-1 1-2 4-5 3-4 2-3 3-5 4-5 2-3 2-3 2-3 2-3 2-4 3-3 2-3 2-3 2-2 3-5 2-4 3-5 9-12 3-5 2-3 1-2 1-1-1-1zm70 10v11l6 2 5 3 2 1 3 2 3 2 1-10c0-9 0-10-2-12l-4-2-3-2-5-2-3-1-2-2zm56 0 1 11 2 1 2 1 5 2 3 2 4 2 3 2 1-10v-11l-8-4-10-5-1-1q-3-1-2 10m-103 0-3 6-3 6 2 1 4 2 5 3q6 3 5 5l-11-5-4-2-3-2-1-1-1 1c1 1 3 3 15 9q9 5 6 2v-3l1-11c0-10-1-10-3-12q-7-4-9 1m-139 10c0 11 0 12 2 14l5 2 2 1 10 5 1-12c0-12-1-13-3-14l-4-2c-1-2-10-5-12-5zm-132-9-4 1-4 3-5 3-4 2-4 2c-2 2-2 3-2 14l1 13 21-12 4-1v-13l-1-12zm53 2-3 1-1 1-2 1-3 2-3 2-5 2-3 2-1 12q0 13 2 13l2-1 4-2 5-3 7-4 6-3v-12c0-12 0-13-2-13zm58 0-3 1-2 1-8 5-8 4-1 12 1 13 4-1 4-3 4-2 3-1 1-1 2-1 2-1 2-2c2 0 3-1 3-13l-1-13zm176 11 1 12 4 2 4 3 2 1 2 1 12 6 1-14v-12l-3-2-4-1-8-4-10-5zm4-9-1 11q0 12 2 10l2 1 4 2 7 4q7 7 6-9c0-10-1-11-2-11q-7-1-12-5zm55 10v11h3l2 1 2 1 2 1 1 1 5 3 5 2q3 2 2-10 1-12-2-11c-1 0-11-5-12-7l-3-1-4-1q-1-2-1 10m57 0c0 11 0 11 2 11l4 1c1 2 12 8 14 8v-21l-9-4-10-6zm-204-1 2 5 2-5-2-1zm-172 2-2 1-2 1-1 1-3 2-4 2-4 1-3 2c-2 2-3 2-3 15v13l7-4 7-4 2-1 4-2 3-2c2-1 2-1 2-13q1-15-2-13zm57 0-4 2-5 3-4 2-3 2-4 1h-2v14l1 14 1-1 6-3 6-4 3-1 1-1 3-2 3-1v-13l-1-13zm111 0q-1 1 1 1l1-1-1-1zm120 12 1 13 3 2 4 2 3 1 6 4 5 3h-2l-3-1-4-2c-2-2-10-5-12-5l-1 12 1 13 18 10q6 2 3 3l-7-3-15-7 1 24 7 3 3 1c1 2 13 8 15 8l4 2 3 2 4 2 7 4 5 2 3 1c2 0 3-1 3-11l-1-12-3-1-11-6-2-1-4-2-5-2q-5-1-3-3c1-1 12 4 17 8l4 2 2 1 3 1h3v-25l-4-1-5-3-3-2-4-2-4-2-3-1-3-2-2-1-2-1q-3-1-1-2l3 1 1 1 19 9 5 2 3 1v-14c0-12 0-13-2-13l-2-1-2-1-3-1-17-8-3-2-7-4-8-5-6-2-2-1q-3-5-3 12m-129-8v2h1l2-1 2-1q-2-2-5 0m71 23-1 24-13-7-6-3h-5l-1 1 23 11c4 0 5-2 5-14l1-12v-2l-1-11-1-11zm4-13c0 11 0 11 2 11l6 2 13 7 1-11c0-10 0-11-2-11l-7-2-6-3-2-2-4-2zm57 0c0 10 0 11 3 12l4 1 5 3 5 2 1 1 2 1v-22l-3-1-12-6q-5-7-5 9m56-1 1 11 3 1 1 1 2 1 2 1 1 1 6 2 5 3v-11c0-10 0-11-3-12l-4-1-2-1-11-6zm-195-5-3 2c1 1 7-1 7-3q0-2-4 1m74 2-3 4-2 3 3 2q5 3 4-7-1-6-2-2m146 15v14l4 2 6 2 1 1 1 1 3 1 6 4 5 3v-14c0-14-1-16-5-16l-2-1-7-4-6-3-2-1-2-1-1-1zm-403-9-11 6-8 4v25h2l4-1c1-2 17-10 19-10l1-13c0-13 0-13-2-13zm57 0-15 7-4 3c-2 2-2 3-2 14v12l3-1 6-2 5-3 4-3 3-1 3-1c2-2 2-3 2-14 0-14 0-14-5-11m55 0-5 4-4 2-4 1-2 1-2 1c-2 1-2 2-2 14l1 13 22-11 3-1v-13c0-13 0-13-2-13zm179 11v13l8 4 10 5 5 2 3 1v-13c0-13 0-13-2-14l-2-1-2-1-11-6-7-3c-2 0-2 1-2 13m3 2c0 10 1 11 3 11l4 1 5 3 3 2 5 2v-21l-5-2-4-2-10-5zm56-1 1 10 4 3 5 3 3 1 5 2 3 2 1-11c0-10 0-11-3-12l-4-1-3-2-11-5zm57 0 1 10 5 3 4 3 4 1 3 1 2 1 1-10q0-14-4-12l-7-3-8-4zm-157-8 4 3 2 1 2 1q3-1-2-3l-4-2-1-1zm-4 6-1 3-2 3-2 3-1 1c-2 1 2 4 4 4l2 1 12 6 1-9q1-14-8-13zm-215 3-9 5-6 3-1 1-4 2c-2 2-2 4-2 14q0 16 3 11l2-1 4-1 9-6 7-3v-27zm347-1 6 4 10 5h3q1-1-5-3l-5-4-2-1-3-1zm-293 3-3 1-4 2-8 4c-3 0-4 2-4 16l1 13 2-1 3-2 3-2 8-4 7-4v-12c0-12 0-13-2-13zm55 0-5 3-3 2-6 2-5 3v12l1 12 12-6 2-1 3-2q1-2 3-1l3-2q3 0 2-13 2-16-7-9m125 2v9q0 8 2 8l9 4 5 2 5 2 1-8v-7l-5-3-6-2-3-2-4-3zm58 0-1 10v11l5 1 4 2 2 1 2 1 6 3 1-10c0-10-1-11-3-11l-2-2-2-1-4-2zm55 9v11l3 1 5 2 3 2 4 2 4 2q2 2 2-9l-1-11-2-2-2-1-2-1-4-1c-1-2-7-5-9-5zm25 12c0 12 0 13 3 15l4 2 4 2q2 3 7 4l4 2 2 1c2 0 2-1 2-13v-12l-4-2-5-3-1-1-4-2-4-2-3-1-3-2c-2 0-2 1-2 12m-404-9-5 3-2 1-2 1-4 2-5 2v13c0 12 0 13 2 13l2-1 1-1 10-5 6-3 5-3v-11c0-14-1-14-8-11m60-1-4 1-2 1q-1 2-9 6l-8 4v24h3l3-1 3-2 5-2 7-4 5-2v-13l-1-12zm58 0-3 1-4 2-9 5-8 4v11c0 10 0 11 2 11a74 74 0 0 0 22-12c1-1 2-2 2-12l-1-11zm54 3-4 3-11 5-9 4-5 3-8 4-5 2-3 1-9 5-9 5-3 1-2 1-2 1-2 1-22 11-7 3-3 2-7 4-5 2-11 5-2 1-7 4-6 3-11 5-2 1-2 1-3 2-3 1-1 1-2 1-2 1-2 1-4 2-5 3q-5 1-2 2l9 4 12 6 3 2 2 1 9 5 4 1 3 2 3 1 4 2 3 2 17 8 2 1 4 2 3 2a589 589 0 0 1 73 35l3 2 5 3 31 15 2 1 2 1 11 5 2 1 3 2 2 1 4 1q1 1 8-2l9-4 3-2 2-2 8-3 34-17 7-4 3-2 7-2 16-9 3-2 23-10 17-9 26-13 3-2 26-12 18-10q4-2 1-3l-13-6-2-1-2-1-4-2-4-3-3-1-11-5-6-3-7-4-2-1-11-5-5-2-7-4-3-2-7-3-10-5-6-3-4-2-2-1-2-1-2-1-1-1-8-3-7-4v10q1 12-2 10l-2 1-7 3-3 2-5 3-3 1-2 1-2 1-10 5-9 4-2 1-4 2-12 6-2 1-4 2-3 1-1 1-3 2-4 2-4 2-4 2-27 13-20 9-7-3-2-1-2-1-2-1q-3 0-7-3l-5-3-1-18 1-18 1-2 2-2 2-2 2-4 2-3 3-4 2-4 2-2 2-3 5-8 2-3 3-3 6-10 2-3 2-2 3-5q6-7-1-3m61 0-2 4-3 4q-3 2-5 7l-3 5-2 3-2 2-2 2q1 3 4-1l15-7 4-2 4-2 3-2 5-3 4-2-17-10zm118 9v11l4 1 3 2 1 1 4 2 4 2 3 2 2 1 1-10-1-12-6-2-4-2-1-1-3-1-4-3-3-2zm57 0 1 11 4 2 3 2 1 1 2 1 2 1 2 1 4 1q1 2 1-9v-11l-9-4-9-6-1-1zm-113-8v10l1 7 9 5 10 4v-18l-6-2-4-2-2-1-3-2q-3-3-5-1m-31 6-4 2-3 1-2 1-2 1-22 11-8 4-9 5-3 1-2 2-1 2-1 1-3 4-6 10-2 3-2 3-1 1-1 2 2-1 8-4 8-5 4-1 2-1 2-1 2-1 3-2 13-6 4-2 2-1 7-3 15-8 22-11-7-3-3-1c-1-2-9-4-11-4zm-231 3-3 2-4 2-5 3-3 2-5 2-3 1v13l1 13 6-3 1-1q5 0 8-4l5-3 4-2v-25zm344 11 2 16 3 1 12 7 7 3 1-13v-13l-8-4-10-5-3-2-3-1q-1-3-1 11m-292-8-5 3-4 2-2 1-4 2-3 1v12l1 12 1-1 1-1 10-5 9-4c2 0 2-1 2-12 0-12 0-12-2-12zm294 1 1 21 2 1 2 1 4 2 5 3 4 1 2 1 1-10c0-11 0-12-8-14l-4-2-2-1-2-1zm-56 10v9l10 4 10 5v-20l-4-1-6-2-4-2-2-1-2-1q-2-1-2 9m-321 2-8 5-5 2-5 2c-2 3-2 4-2 14 0 11 0 12 2 12l19-9 3-2c2 0 2-1 2-13l-1-13zm59-1-5 3-7 4-4 1-2 1-3 2-3 1v11c0 10 1 11 3 11l3-1 9-4 2-2 5-3 4-1v-12l-1-12zm344 0-1 13v12l3 1 5 2 1 1 1 1 4 2 4 2q4 1 4 4l-7-3-2-1-2-1-3-2-2-1-3-1h-3v11c0 9 0 10 2 11l2 1 4 2 10 6 8 4v-12l-1-13v-1l1-14c0-13 0-14-2-14l-2-1-2-1-5-2-7-4-4-2zm-54 12c0 9 1 9 4 11l4 2 4 2 4 2 3 2 2 1 1-10q1-12-2-10l-9-3-8-4-1-1-1-1zm57 2c0 10 0 11 2 11l6 3 4 2 4 2 3 2 1-11v-10l-5-3-6-2-4-2-4-3zm-374 1-3 1-3 1-9 4-2 1-1 1-4 2q-3 1-2 13l1 11 7-4 4-2 2-1 9-4c2 0 2-1 2-12zm343 9v12q-1 2 2 2l3 1 2 2 5 2 4 2 2 1 6 3 1-12v-11l-5-3-7-3-12-6zm2 2v9l2 2 5 1 2 2 3 1 5 2q4 7 4-7l-1-9-2-1-11-5-2-1-3-2q-2-3-2 8m-376 4-4 2-2 1-2 1-2 1-7 3q-4-2-4 13l1 11 3-1 3-1 3-2 3-2 2-1 1-1 6-2 4-2v-11l-1-11zm405 11q0 12 3 10l3 2 4 1 3 1 4 3 3 2v-9q0-12-3-10l-2-2-2-1-5-2-4-2-3-1q-1-3-1 8m-274 3-1 14c0 13 0 14 2 15l2 1 5 2 2 1 2 1 5 2 4 2v-32l-3-2-4-1-5-2q-7-3-9-1"/>',stac:'<path fill="#09b3ad" fill-rule="evenodd" d="m110 110-3 3v239l3 2q3 3 7 3 6 1 8-5c2-3 2-17 2-114V127h224l3-3q3-3 3-7t-3-7l-3-3H113zm201 123a97 97 0 0 0-62 41c-6 8-12 21-14 31-2 6-2 10-2 25 0 16 0 18 2 26q8 27 27 44a98 98 0 0 0 129 6q23-20 33-50l3-21a99 99 0 0 0-37-82c-9-7-25-15-35-18-11-3-34-4-44-2m9 17q-15 2-29 9l-20 15-13 19 5 1q8 0 17 10c5 5 8 11 12 26l7 16q6 6 9 0l4-17c4-22 9-31 19-36 5-3 6-3 13-3l13 2q6 1 9-3 6-5 10-17l1-6-3-3c-4-3-17-9-24-11q-14-3-30-2m70 34c-1 5-8 15-12 18q-11 10-29 7-7-3-10-1c-4 3-7 9-10 26l-5 18q-4 10-12 14c-11 4-24-3-31-17-2-2-4-10-6-16q-6-17-11-20-3-3-5 0l-5 8q-9 17 4 45a78 78 0 0 0 70 43l17-1q7-1 6-3a49 49 0 0 1 10-53q8-9 22-12h24q2 1 2-10a73 73 0 0 0-17-50zm-7 74q-17 5-18 25c0 6 1 17 3 17l18-14c9-9 19-25 17-28z"/><path fill="#144e63" fill-rule="evenodd" d="m182 182-3 3v238l3 3q5 6 11 3c6-4 6 5 6-118V199h224l3-3q3-3 3-7t-3-7l-3-3H185zm281 51-2 2-1 112v113H347l-115 3-2 7q-1 5 3 7l3 3h118l121-1c5-3 5 3 5-124 0-102 0-117-2-120q-1-6-9-5-4 0-6 3"/><path fill="#c4e2ef" fill-rule="evenodd" d="m35 35-3 4v237l3 3q5 6 12 3l4-3 1-114 1-112 112-1h113l2-3c2-2 3-9 1-12l-4-3c-3-2-18-2-121-2H39z"/>',intake:'<path fill-rule="evenodd" d="M166 100v48H63l96 97 97 96 97-96 96-97H345V51H166zM58 207l-26 28 112 114 112 111 112-111 112-113-27-28-27-27-16 15-15 17 11 12 10 11-80 80-80 80-81-80-80-81 11-11 11-12c0-1-30-31-32-31z"/>'},$i=Yi.map(e=>`<symbol id="freva-brand-${e}" viewBox="0 0 512 512">${Xi[e]}</symbol>`).join("");function Er(){let e=document.createElementNS(_o,"svg");return e.setAttribute("aria-hidden","true"),e.setAttribute("width","0"),e.setAttribute("height","0"),e.setAttribute("style","position:absolute;width:0;height:0;overflow:hidden"),e.innerHTML=$i,e}function ye(e,t){let o=t?.size??16,n=document.createElementNS(_o,"svg");n.setAttribute("viewBox","0 0 512 512"),n.setAttribute("width",String(o)),n.setAttribute("height",String(o)),n.setAttribute("aria-hidden","true");let r=document.createElementNS(_o,"use");return r.setAttribute("href",`#freva-brand-${e}`),n.appendChild(r),t?.chip===!1?n:c("span",{class:"brand-chip"},[n])}var Cr="data:image/webp;base64,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";var T='stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"',k={search:`<circle cx="11" cy="11" r="7" ${T}/><path d="M21 21l-4.3-4.3" ${T}/>`,chevron:`<path d="M9 6l6 6-6 6" ${T}/>`,chevronDown:`<path d="M6 9l6 6 6-6" ${T}/>`,close:`<path d="M6 6l12 12M18 6L6 18" ${T}/>`,check:`<path d="M5 12l5 5 9-11" ${T}/>`,sun:`<circle cx="12" cy="12" r="4" ${T}/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" ${T}/>`,moon:`<path d="M21 12.8A8.5 8.5 0 1111.2 3a6.5 6.5 0 009.8 9.8z" ${T}/>`,notes:`<path d="M4 5h16M4 12h16M4 19h10" ${T}/>`,info:`<circle cx="12" cy="12" r="9" ${T}/><path d="M12 11v5M12 8h.01" ${T}/>`,resultsFocus:`<rect x="3" y="4" width="7" height="16" rx="1.5" ${T}/><rect x="12" y="4" width="9" height="16" rx="1.5" ${T}/>`,overview:`<path d="M4 20h16" ${T}/><rect x="5" y="10.5" width="3.4" height="6.5" rx="1" ${T}/><rect x="10.3" y="5.5" width="3.4" height="11.5" rx="1" ${T}/><rect x="15.6" y="13.5" width="3.4" height="3.5" rx="1" ${T}/>`,list:`<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" ${T}/>`,grid:`<rect x="3" y="3" width="8" height="8" rx="1.5" ${T}/><rect x="13" y="3" width="8" height="8" rx="1.5" ${T}/><rect x="3" y="13" width="8" height="8" rx="1.5" ${T}/><rect x="13" y="13" width="8" height="8" rx="1.5" ${T}/>`,command:`<path d="M9 6a3 3 0 10-3 3h12a3 3 0 10-3-3v12a3 3 0 103-3H6a3 3 0 10-3 3" ${T}/>`,inspect:`<path d="M6 18h8" ${T}/><path d="M3 22h18" ${T}/><path d="M14 22a7 7 0 100-14h-1" ${T}/><path d="M9 14h2" ${T}/><path d="M8 6h6v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" ${T}/><path d="M12 6V3a1 1 0 00-1-1H9a1 1 0 00-1 1v3" ${T}/>`,download:`<path d="M12 4v11M7 11l5 5 5-5M5 20h14" ${T}/>`,caret:`<path d="M6 9l6 6 6-6" ${T}/>`,copy:`<rect x="9" y="9" width="11" height="11" rx="2" ${T}/><path d="M5 15V5a2 2 0 012-2h10" ${T}/>`,kebab:'<circle cx="12" cy="5" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="19" r="1.6" fill="currentColor"/>',clock:`<circle cx="12" cy="12" r="9" ${T}/><path d="M12 7v5l3.5 2" ${T}/>`,box:`<rect x="3" y="6" width="18" height="12" rx="1.5" ${T}/>`,expandWide:`<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4" ${T}/>`,expandTall:`<path d="M12 3v18M8 7L12 3l4 4M8 17l4 4 4-4" ${T}/>`,plus:`<path d="M12 5v14M5 12h14" ${T}/>`,x:`<path d="M6 6l12 12M18 6L6 18" ${T}/>`,retry:`<path d="M21 12a9 9 0 11-3-6.7M21 4v4h-4" ${T}/>`,uris:`<path d="M6 3h9l4 4v14H6z" ${T}/><path d="M15 3v4h4" ${T}/><circle cx="9.3" cy="9" r=".95" fill="currentColor"/><path d="M11 9h5" ${T}/><circle cx="9.3" cy="12.5" r=".95" fill="currentColor"/><path d="M11 12.5h5" ${T}/><circle cx="9.3" cy="16" r=".95" fill="currentColor"/><path d="M11 16h5" ${T}/>`,aggregate:`<rect x="3" y="4.5" width="6.5" height="5" rx="1.3" ${T}/><rect x="3" y="14.5" width="6.5" height="5" rx="1.3" ${T}/><path d="M9.5 7h3.5a2 2 0 0 1 2 2v1M9.5 17h3.5a2 2 0 0 0 2-2v-1" ${T}/><rect x="15" y="8.5" width="6" height="7" rx="1.5" ${T}/>`,shelve:`<rect x="3" y="5" width="18" height="3.4" rx="1.6" ${T}/><rect x="3" y="10.3" width="18" height="3.4" rx="1.6" ${T}/><rect x="3" y="15.6" width="18" height="3.4" rx="1.6" ${T}/>`,gear:`<circle cx="12" cy="12" r="3.2" ${T}/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" ${T}/>`,reset:`<rect x="4" y="4" width="16" height="16" rx="2" ${T}/><path d="M9 9l-3-3M9 9V6M9 9H6M15 15l3 3M15 15v3M15 15h3" ${T}/>`,minimize:`<path d="M6 16h12" ${T}/><path d="M12 12l-3-3M12 12l3-3" ${T}/>`,sortCount:`<path d="M4 7h10M4 12h7M4 17h4" ${T}/><path d="M17 5v14M17 19l3-3M17 19l-3-3" ${T}/>`,sortAlpha:`<path d="M4 7h8M4 12h6M4 17h4" ${T}/><path d="M16 8l2-3 2 3M16.5 7h3M16 19l2-3 2 3M16.5 18h3" ${T}/>`,terminal:`<rect x="2.5" y="4" width="19" height="16" rx="2.5" ${T}/><path d="M7 9.5l2.8 2.5L7 14.5M12.8 15h4.4" ${T}/>`,bashTab:`<path d="M4 7l4 4-4 4M11 16h8" ${T}/>`,help:`<circle cx="12" cy="12" r="9" ${T}/><path d="M9.6 9.3a2.5 2.5 0 114 2.1c-.9.6-1.6 1-1.6 2.1M12 17h.01" ${T}/>`,pySnake:'<path fill="currentColor" d="M11.9 2c-1.6 0-3 .14-4 .5C6.6 3 6.2 3.9 6.2 5.2v1.9h5.9v.8H4.3c-1.4 0-2.6.8-3 2.4-.4 1.8-.4 2.9 0 4.8.3 1.4 1.1 2.4 2.5 2.4h1.6v-2.2c0-1.6 1.4-3 3-3h5.4c1.3 0 2.4-1.1 2.4-2.4V5.2c0-1.3-1.1-2.3-2.4-2.5-.8-.14-1.7-.2-2.5-.2zM9.2 4.2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"/><path fill="currentColor" d="M18.2 7.1v2.2c0 1.7-1.4 3-3 3H9.8c-1.3 0-2.4 1.1-2.4 2.4v3.5c0 1.3 1.1 2.1 2.4 2.5 1.5.4 3 .5 4.8 0 1.2-.3 2.4-1 2.4-2.5v-1.4h-5.9v-.8h8.8c1.4 0 1.9-1 2.4-2.4.5-1.5.5-2.9 0-4.8-.3-1.4-1-2.4-2.4-2.4h-1.7zm-3.3 12c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"/>'};var Tr={js:"https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",css:"https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",tileUrl:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:"\xA9 OpenStreetMap contributors"},eo=null,We=null,dt=null,en=null,tn="freva-leaflet-css",_i=null,Qr=null;function es(){let e=document.getElementById(tn);return!!e&&e.isConnected&&e.dataset.loaded==="true"}function ts(e,t=8e3){return new Promise((o,n)=>{let r=document.createElement("link");r.id=tn,r.rel="stylesheet",r.href=e;let a=!1,s=d=>{a||(a=!0,window.clearTimeout(l),d?(r.dataset.loaded="true",o()):(r.remove(),n(new Error("Leaflet stylesheet failed to load"))))},l=window.setTimeout(()=>s(!1),t);r.onload=()=>s(!0),r.onerror=()=>s(!1),document.head.appendChild(r)})}var St=!1;function os(e){return es()?Promise.resolve():(We&&St||(St=!0,We=(Qr??ts)(e).then(()=>{St=!1}).catch(t=>{throw St=!1,We=null,t})),We)}function ns(e,t=8e3){return new Promise((o,n)=>{let r=window;if(r.L){o(r.L);return}let a=document.createElement("script");a.src=e,a.async=!0;let s=!1,l=window.setTimeout(()=>{s||(s=!0,a.remove(),n(new Error("Leaflet load timed out")))},t);a.onload=()=>{if(s)return;s=!0,window.clearTimeout(l);let d=window.L;d?(a.remove(),o(d)):(a.remove(),n(new Error("Leaflet did not register")))},a.onerror=()=>{s||(s=!0,window.clearTimeout(l),a.remove(),n(new Error("Leaflet failed to load")))},document.head.appendChild(a)})}function rs(){if(Qr)return;let e=document.createElement("div");e.className="leaflet-pane",e.style.cssText="visibility:hidden;pointer-events:none",document.body.appendChild(e);let t=getComputedStyle(e).position==="absolute";if(e.remove(),!t)throw We=null,new Error("Leaflet stylesheet did not apply (blocked by CSP, or the wrong MIME type)")}function Ir(e,t){let o=dt?en??e.css:e.css,n=os(o);if(eo)dt&&e.js!==dt&&console.warn(`[freva-databrowser] Leaflet already loaded from ${dt}; ignoring a second URL (${e.js}). A page can host only one Leaflet build.`);else{dt=e.js,en=e.css;let a=_i??((s,l)=>ns(s.js));eo=Promise.resolve(a(e,t)).catch(s=>{throw eo=null,dt=null,en=null,s})}let r=eo;return Promise.all([n,r]).then(([,a])=>(rs(),a)).catch(a=>{let s=document.getElementById(tn);throw s&&s.remove(),We=null,St=!1,a})}function Mr(e){let t=e.getBoundingClientRect();return t.width>0&&t.height>0}function Or(e){let t=e.getBoundingClientRect(),o=window.innerWidth||t.width,n=window.innerHeight||t.height,r=Math.max(t.left,0)-t.left,a=Math.max(t.top,0)-t.top,s=Math.min(t.right,o)-t.left,l=Math.min(t.bottom,n)-t.top;return{left:r,top:a,right:s,bottom:l,width:Math.max(0,s-r),height:Math.max(0,l-a)}}function Dr(e,t){let o=e.getBoundingClientRect(),n=t.getBoundingClientRect();return{top:n.top-o.top,left:n.left-o.left,right:n.right-o.left,bottom:n.bottom-o.top,width:n.width,height:n.height}}function pt(e,t){if(!t.isConnected||!e.contains(t))return!1;if(!Mr(e))return!0;let o=Or(e);if(o.width===0||o.height===0)return!1;let n=Dr(e,t);return n.width===0&&n.height===0?!1:n.right>o.left&&n.left<o.right&&n.bottom>o.top&&n.top<o.bottom}function At(e,t,o,n={}){let r=n.margin??8,a=n.gap??6,s=n.placement??"below";if(!Mr(e))return;let l=Or(e);if(l.width===0||l.height===0)return;let d=Math.max(0,l.width-r*2),p=Math.max(0,l.height-r*2),f=Math.min(d,n.maxWidth??d),i=Math.min(p,n.maxHeight??p);t.style.maxWidth=`${f}px`,t.style.maxHeight=`${i}px`,t.style.overflowY="auto",n.minWidth&&(t.style.minWidth=`${Math.min(n.minWidth,f)}px`);let m=Dr(e,o),h=t.getBoundingClientRect(),u=Math.min(h.width||t.offsetWidth,f),b=Math.min(h.height||t.offsetHeight,i),x,C;s==="right"?(x=m.top,C=m.right+r,C+u>l.right-r&&(C=m.left-u-r)):(x=m.bottom+a,C=m.left,x+b>l.bottom-r&&(x=m.top-b-a)),C=Math.min(C,l.right-r-u),C=Math.max(C,l.left+r),x=Math.min(x,l.bottom-r-b),x=Math.max(x,l.top+r),t.style.left=`${Math.round(C)}px`,t.style.top=`${Math.round(x)}px`}var to=class{constructor(t,o){this.current=null,this.anchor=null,this.onCloseCb=null,this.reanchorCb=null,this.scrollMode="close",this.placement="below",this.root=t,o.listen(document,"mousedown",r=>{if(!this.current)return;let a=r.target;this.current.contains(a)||this.anchor&&this.anchor.contains(a)||this.close()}),o.listen(document,"keydown",r=>{if(this.current&&r.key==="Escape"){r.preventDefault();let a=this.anchor;this.close(),a?.focus()}});let n=()=>{if(!(!this.current||!this.anchor)){if(!this.anchor.isConnected&&!this.tryReanchor()){this.close();return}if(!pt(this.root,this.anchor)&&!this.tryReanchor()){this.close();return}this.position(this.current,this.anchor,this.placement)}};o.listen(window,"resize",n),o.listen(window,"scroll",r=>{if(!this.current)return;let a=r.target;if(!(a&&typeof a.nodeType=="number"&&this.current.contains(a))){if(this.scrollMode==="close"){this.close();return}n()}},!0)}isOpen(){return this.current!==null}closeIfAnchorDetached(){this.current&&this.anchor&&!this.anchor.isConnected&&(this.tryReanchor()?this.position(this.current,this.anchor,this.placement):this.close())}tryReanchor(){let t=this.reanchorCb?.()??null;return t&&t.isConnected?(this.anchor=t,!0):!1}open(t,o,n={}){this.close();let r=c("div",{class:`pop show${n.className?" "+n.className:""}`,role:"dialog"});r.style.position="absolute";for(let a of Array.isArray(o)?o:[o])r.append(a);return this.root.append(r),this.current=r,this.anchor=t,this.onCloseCb=n.onClose??null,this.reanchorCb=n.reanchor??null,this.placement=n.placement??"below",this.scrollMode=n.scrollBehavior??(n.reanchor?"reposition":"close"),this.position(r,t,this.placement),n.autoFocus&&r.querySelector("input, button, [href], [tabindex], select, textarea")?.focus(),r}position(t,o,n){At(this.root,t,o,{placement:n})}close(){if(!this.current)return;let t=!!this.current.contains(this.root.ownerDocument.activeElement),o=this.anchor;this.current.remove(),this.current=null,this.anchor=null,this.reanchorCb=null;let n=this.onCloseCb;this.onCloseCb=null,t&&o&&o.isConnected&&o.focus(),n?.()}};var as={time:(e,t)=>t(),start:()=>()=>{},getSummary:()=>({}),enabled:!1};function zr(e){if(!e)return as;let t={},o=typeof performance<"u"&&typeof performance.now=="function",n=()=>o?performance.now():Date.now(),r=(s,l)=>{let d=t[s]??(t[s]={count:0,totalMs:0,maxMs:0,lastMs:0});if(d.count++,d.totalMs+=l,d.lastMs=l,l>d.maxMs&&(d.maxMs=l),o&&typeof performance.mark=="function"&&typeof performance.measure=="function")try{performance.measure(`fdb:${s}`,{start:n()-l,duration:l})}catch{}},a={enabled:!0,time(s,l){let d=n();try{return l()}finally{r(s,n()-d)}},start(s){let l=n();return()=>r(s,n()-l)},getSummary:()=>t};return globalThis.__frevaPerf=a,a}var is=[...new Set([...He,...it])];function Lr(e){if(!e||typeof e!="object"||Array.isArray(e))return!1;for(let t of Object.values(e))if(typeof t!="string")return!1;return!0}function ss(e,t=is){let o={};for(let n of t){let r=e[n];Lr(r)&&Object.keys(r).length>0&&(o[n]={...r})}return o}function on(e,t){let o={};for(let n of new Set([...Object.keys(e),...Object.keys(t)]))o[n]={...e[n]??{},...t[n]??{}};return o}function nn(e){if(!e||typeof e!="object")return{};let t={};for(let[o,n]of Object.entries(e))Lr(n)&&(t[o]={...n});return t}async function ls(e,t,o,n=8e3){if(typeof fetch!="function"||typeof document>"u")return{};let r=t.abortController(),a=setTimeout(()=>r.abort(),n);try{let s=await fetch(e,{signal:r.signal,credentials:"same-origin"});if(!s.ok)return{};let l=(s.headers.get("content-type")??"").toLowerCase(),d=await s.text(),p=l.includes("javascript")||l.includes("ecmascript"),f=l===""||l.includes("application/octet-stream"),i=/\.m?js(?:[?#]|$)/i.test(e),m=/^\s*</.test(d);if(!(p||f&&i&&!m))return{}}catch{return{}}finally{clearTimeout(a)}return t.isDisposed?{}:new Promise(s=>{let l=!1,d=f=>{l||(l=!0,s(f))},p;try{p=document.createElement("script")}catch{d({});return}p.src=e,p.async=!0,p.addEventListener("load",()=>{d(ss(typeof window<"u"?window:{}))}),p.addEventListener("error",()=>d({})),t.add(()=>{p.remove(),d({})}),t.setTimeout(()=>{p.remove(),d({})},n),o.appendChild(p)})}function Fr(e){return nn(e.metadata)}async function Ur(e,t,o){let n=nn(e.metadata),r=await cs(),a=e.metadataScriptUrl;if(!a)return on(r,n);let s=await ls(a,t,o);return on(on(r,s),n)}async function cs(){try{let e=await import("./metadata-builtin.VAZVGGJJ.js");return nn(e.BUILTIN_METADATA)}catch{return{}}}var qr=`/* styles.css - tokens + component styles for both themes.
   Ported from the prototype (the binding pixel source). The generic \`.overview\` class is
   renamed to \`.overview-mode\` to avoid a class collision that blanks the page.

   The TERMINAL's styles are NOT here: they moved to @freva-org/freva-client-terminal, which injects
   its own scoped stylesheet into the terminal window's root. Rules matching \`.freva-term\` do not
   belong in this file. */

.freva-db {
  --r: 10px;
  --r-sm: 7px;
  /* Advertise the app's scheme to native controls (scrollbars, form pickers) AND to embedded
     cross-origin iframes: an iframe inherits the embedder's used color-scheme, so the GridLook 3D
     viewer picks THIS up as its prefers-color-scheme and follows the databrowser theme (it otherwise
     falls back to the OS scheme). Overridden to dark under [data-theme="night"] below. */
  color-scheme: light;
  /* The mount target must have a definite height (the demo uses 100vh); .freva-db fills it so
     .fdb-app's grid can keep header/footer fixed and give each panel its own bounded scroll. */
  position: relative;
  height: 100%;
  min-height: 0;
  --mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --ui: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --bg: #eef1f6;
  --surface: #fff;
  --surface-2: #f4f6fa;
  --surface-3: #e9edf4;
  --text: #0e1726;
  --dim: #475569;
  /* Raised from #8a97ac (~2.96:1 on white). --faint is used for MEANINGFUL small text - counts,
     file paths, table headers, flavour captions - so it has to clear 4.5:1 on every day surface,
     not just look quiet. #5f6b7c measures 5.41:1 on --surface and 4.61:1 on --surface-3, the
     lightest and darkest day backgrounds it lands on. */
  --faint: #5f6b7c;
  --border: #dce2ec;
  --border-2: #c7d0dd;
  --accent: #2a63e8;
  --accent-2: #1e50c8;
  --accent-soft: color-mix(in srgb, var(--accent) 10%, transparent);
  --good: #1e9e6a;
  --warn: #c7841e;
  --danger: #d8543c;
  --ocean: #d9e6f2;
  --land: #c5d2e0;
  --shadow: 0 1px 2px rgba(16, 28, 52, 0.06), 0 4px 16px rgba(16, 28, 52, 0.07);
  font-family: var(--ui);
  color: var(--text);
}
.freva-db[data-theme="night"] {
  color-scheme: dark;
  --bg: #0a1120;
  --surface: #0f1a2e;
  --surface-2: #142339;
  --surface-3: #1a2c46;
  --text: #e7edf7;
  --dim: #9dabc4;
  /* Night equivalent: #5e6e88 measured 3.06-3.36:1 across the night surfaces. #8595b0 measures
     4.64:1 against --surface-3 (#1a2c46), the LIGHTEST night surface and therefore the worst case.
     The --text / --dim / --faint hierarchy and the dark-blue identity are unchanged. */
  --faint: #8595b0;
  --border: #213352;
  --border-2: #2c4267;
  --accent: #4f8df7;
  --accent-2: #6aa0ff;
  --accent-soft: color-mix(in srgb, var(--accent) 16%, transparent);
  --good: #34c98a;
  --warn: #e6b14e;
  --danger: #f0795f;
  --ocean: #0e2138;
  --land: #1c3554;
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.5), 0 6px 20px rgba(0, 0, 0, 0.4);
}
.freva-db,
.freva-db * {
  box-sizing: border-box;
}
.freva-db :focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

/* The app is a 3-row grid (header / body / footer); header + footer never
   scroll. The body is a 3-column grid (facets / center / details); each panel owns its scroll
   and its height never depends on another panel's content. */
.fdb-app {
  height: 100%;
  min-height: 680px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  /* An implicit grid column sizes to the WIDEST row's min-content, so at phone widths the top bar
     stretched the whole app past the viewport and took the body - top row included - with it.
     An explicit 0 minimum lets the column shrink; the rows clip or wrap their own content. */
  grid-template-columns: minmax(0, 1fr);
  background: var(--bg);
  color: var(--text);
  transition:
    background-color 0.35s,
    color 0.35s;
}

.top {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 56px;
  flex-shrink: 0;
  min-width: 0; /* \u2026and the bar itself must be allowed to shrink rather than set the app's width */
  padding: 0 16px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  transition:
    background-color 0.35s,
    border-color 0.35s;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 15px;
  white-space: nowrap;
}
.brand .mark {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  color: #fff;
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 55%, #fff));
  font-size: 13px;
}
.brand .brand-logo {
  width: 45px;
  height: 45px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
  margin: -4px 0;
}
.lens {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 10px;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
  background: var(--surface-2);
  cursor: pointer;
  font-size: 13px;
  color: var(--text);
  white-space: nowrap;
  font-family: inherit;
}
.lens:hover {
  border-color: var(--border-2);
}
.lens .k {
  color: var(--faint);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.lens .v {
  font-weight: 600;
}
.search {
  flex: 1;
  min-width: 0; /* a flex item's default \`min-width: auto\` would floor the bar at the input's width */
  position: relative;
}
.search input {
  width: 100%;
  height: 40px;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  font-size: 14px;
  font-family: inherit;
  /* Right padding clears the furniture: the spinner's reserved slot. Reserved at all times, so a
     search that starts loading never reflows the text under the caret. */
  padding: 0 40px 0 40px;
  outline: none;
  transition:
    border-color 0.15s,
    box-shadow 0.15s,
    background-color 0.35s;
}
.search input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

/* The live edge.
 *
 * A slow wash of light in the field's own border: it drifts along the edge, it rises and falls, and
 * it stops the moment somebody is typing in the field. Deliberately NOT an object travelling the
 * border - a small, high-contrast shape with an outline is something the visual system locks onto
 * and TRACKS at any speed - so this is one wide, low-contrast gradient whose brightest region
 * moves, with no edge for the eye to follow.
 *
 * The two cycles do not divide into each other (30s and 11s), so they drift in and out of phase and
 * never settle into a beat a reader can anticipate, which is how a slow loop becomes a tic.
 *
 * Drawn at \`inset: 0\`, so the ring sits exactly ON the input's own 1px border rather than beside
 * it. That is what makes the failure mode harmless: where \`mask-composite\` is unavailable the
 * pseudo-element paints nothing useful and the field still has the ordinary accent border
 * underneath it, rather than no border at all.
 */
.freva-db .search {
  /* One place to tune the whole treatment. */
  --db-breathe: 11s; /* one full rise and fall */
  --db-drift: 30s; /* one full pass of the light along the edge */
  --db-amp: 0.45; /* how far the breath dips below full */
  --db-hot: 62%; /* accent content of the light at its brightest */
}
@keyframes db-edge-drift {
  from {
    background-position: 0% 50%;
  }
  to {
    background-position: 260% 50%;
  }
}
@keyframes db-edge-breathe {
  0%,
  100% {
    opacity: calc(1 - var(--db-amp));
  }
  50% {
    opacity: 1;
  }
}
.freva-db .search::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--r-sm);
  padding: 1px;
  pointer-events: none;
  background: linear-gradient(
    100deg,
    color-mix(in srgb, var(--accent) 18%, transparent) 0%,
    color-mix(in srgb, var(--accent) var(--db-hot), transparent) 26%,
    color-mix(in srgb, var(--accent) 14%, transparent) 52%,
    color-mix(in srgb, var(--accent) var(--db-hot), transparent) 76%,
    color-mix(in srgb, var(--accent) 18%, transparent) 100%
  );
  /* Wider than the box, so the drift has somewhere to travel from and to. */
  background-size: 260% 100%;
  /* Keep only the ring: paint the border box, subtract the padding box. */
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  animation:
    db-edge-drift var(--db-drift) linear infinite,
    db-edge-breathe var(--db-breathe) ease-in-out infinite;
}
/*
 * In use, it stops.
 *
 * The caret is the thing to watch while you type, and a field somebody is reading their own
 * keystrokes in is the one place a moving edge would genuinely be in the way. So focus settles it
 * to an even, steady ring - still lit, no longer moving.
 */
.freva-db .search:focus-within::before {
  /*
   * \`animation: none\`, not \`animation-play-state: paused\`. A paused animation still holds the
   * property at whatever keyframe it stopped on, which would leave the ring at whatever brightness
   * the breath was passing through - a focus ring whose intensity depends on when you clicked.
   * Removing the animations entirely is what lets the declarations below take effect.
   */
  animation: none;
  opacity: 1;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 55%, transparent),
    color-mix(in srgb, var(--accent) 92%, transparent),
    color-mix(in srgb, var(--accent) 55%, transparent)
  );
  background-size: 100% 100%;
}
@media (prefers-reduced-motion: reduce) {
  /* The same edge, held still. The treatment is the light, not the movement of it, so the
     reduced-motion field is the finished thing minus its motion - never a bare box. */
  .freva-db .search::before {
    animation: none;
    opacity: 0.85;
    background-position: 40% 50%;
  }
}
.search .ic {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--faint);
  display: grid;
  place-items: center;
}
.icon-btn {
  height: 36px;
  min-width: 36px;
  padding: 0 9px;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--dim);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-family: inherit;
  transition:
    background-color 0.15s,
    color 0.15s,
    border-color 0.15s;
  white-space: nowrap;
}
.icon-btn:hover {
  color: var(--text);
  border-color: var(--border-2);
}
.icon-btn.on {
  background: var(--accent-soft);
  color: var(--accent);
  border-color: transparent;
}
.theme {
  width: 60px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition:
    background-color 0.35s,
    border-color 0.35s;
}
.theme .knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: var(--surface);
  box-shadow: var(--shadow);
  display: grid;
  place-items: center;
  color: var(--accent);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.freva-db[data-theme="night"] .theme .knob {
  transform: translateX(26px);
}

.body {
  display: grid;
  /* minmax(0, \u2026) rather than a bare 1fr: a \`1fr\` track floors at its content's min-content width,
     so at phone widths the centre column grew past the viewport and took the top row - Clear all
     and the Browse/Overview cluster included - off screen with it. The explicit 0 minimum lets the
     column actually shrink; \`.center\` already sets \`min-width: 0\` and clips its own overflow. */
  grid-template-columns: auto minmax(0, 1fr) auto;
  min-height: 0;
  position: relative;
}
/* Explicit placement: hiding .side (metaview) must NOT let .center/.details-panel auto-place into the
   wrong track (that mis-sized the center in metadata-focused view). */
.side {
  grid-column: 1;
}
.center {
  grid-column: 2;
}
.details-panel {
  grid-column: 3;
}

/* SIDEBAR */
.side {
  width: 268px;
  flex-shrink: 0;
  min-height: 0;
  border-right: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition:
    width 0.22s ease,
    background-color 0.35s,
    border-color 0.35s;
}
.fdb-app.metaview .side {
  display: none;
}
/* Collapsible: the sidebar collapses to a slim rail with a reopen affordance; persisted. */
.fdb-app.side-collapsed .side {
  width: 44px;
}
.fdb-app.side-collapsed .side .side-scroll,
.fdb-app.side-collapsed .side .side-head .side-title {
  display: none;
}
.fdb-app.side-collapsed .side .side-filterhead {
  display: none;
}
.side-head {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  padding: 6px 8px 2px;
}
.side-head .side-title {
  padding: 2px 4px;
}
.side-collapse {
  width: 28px;
  height: 28px;
  margin-left: auto;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: var(--surface-2);
  color: var(--dim);
  cursor: pointer;
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  transition:
    color 0.12s,
    border-color 0.12s;
}
.side-collapse:hover {
  color: var(--text);
  border-color: var(--border-2);
}
.side-collapse .chev {
  transition: transform 0.22s;
  display: inline-grid;
  place-items: center;
  transform: rotate(180deg);
}
.fdb-app.side-collapsed .side-collapse {
  margin: 0 auto;
}
.fdb-app.side-collapsed .side-collapse .chev {
  transform: rotate(0deg);
}
.side-scroll {
  overflow-y: auto;
  padding: 10px 10px 16px;
  flex: 1;
}
.side-title {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--faint);
  padding: 8px 8px 4px;
  display: flex;
  align-items: center;
}
.facet {
  border-radius: var(--r-sm);
}
/* The per-facet sort control. Present in the markup at all times so opening a panel stays a class
   toggle rather than a re-render (see sidebar.ts), and revealed only once there is a list to sort.
   \`margin-left: auto\` is deliberately NOT used: the +N / -N clear badges already claim that slot,
   and the sort must sit between them and the chevron in both cases. */
.facet .fh-sort {
  display: none;
}
.facet.open .fh-sort {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  height: 21px;
  gap: 4px;
  padding: 0 6px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface-2);
  color: var(--faint);
  cursor: pointer;
  font-family: inherit;
  transition:
    color 0.12s,
    border-color 0.12s;
}
.facet.open .fh-sort:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.facet-head {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 8px 0 10px;
  border-radius: var(--r-sm);
  cursor: pointer;
  font-size: 12.5px;
  color: var(--text);
  transition:
    background-color 0.12s,
    color 0.12s;
  width: 100%;
  border: none;
  background: none;
  font-family: inherit;
  text-align: left;
}
.facet-head:hover {
  background: var(--surface-2);
}
.facet-head .chev {
  color: var(--faint);
  width: 12px;
  display: inline-grid;
  place-items: center;
  transition: transform 0.2s;
}
.facet.open > .facet-head .chev {
  transform: rotate(90deg);
}
.facet-head .fh-label {
  font-weight: 600;
  letter-spacing: 0.005em;
}
.facet-head .badge {
  margin-left: auto;
  font-size: 10px;
  color: var(--faint);
  font-family: var(--mono);
  font-weight: 500;
}
/* The \`+N\` / \`-N\` clear buttons are styled with the rest of the inclusion/exclusion language at
   the end of this sheet - one filled, one dashed, and neither of them a bare accent pill. */
.facet-head .fh-count {
  margin-left: 0;
  font-family: var(--mono);
}
.facet-head.active .fh-label {
  color: var(--accent);
}
.facet-head.active .chev {
  color: var(--accent);
}
.facet-head.active::before {
  content: "";
  position: absolute;
  left: 1px;
  top: 8px;
  bottom: 8px;
  width: 3px;
  border-radius: 2px;
  background: var(--accent);
}
.facet-body {
  display: none;
  padding: 1px 0 6px 16px;
}
.facet.open > .facet-body {
  display: block;
}
.fval {
  /*
   * Positioned, because the share bar is a \`::before\` inside it. It was only the overview's cards
   * that drew one, so the context lived there; the sidebar draws the same bar now, and a row that
   * is \`static\` would hang the bar off whatever ancestor happened to be positioned - which in the
   * sidebar is the scroll container, giving one full-width bar behind the whole list.
   */
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 27px;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 12px;
  color: var(--dim);
  cursor: pointer;
  transition:
    background-color 0.12s,
    color 0.12s;
  width: 100%;
  border: none;
  background: none;
  font-family: inherit;
  text-align: left;
}
.fval:hover {
  background: var(--surface-2);
  color: var(--text);
}
.fval.sel {
  color: var(--accent);
  font-weight: 600;
}
.fval[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
.fval.locked {
  opacity: 1;
  cursor: default;
} /* base scope: active, not disabled-looking */
.fval.locked:hover {
  background: transparent;
}
.fval .nm {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fval .n {
  margin-left: auto;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--faint);
  flex-shrink: 0;
  padding-left: 6px;
}
.fval .cb {
  width: 13px;
  height: 13px;
  border-radius: 3px;
  border: 1.5px solid var(--border-2);
  flex-shrink: 0;
  display: grid;
  place-items: center;
  color: transparent;
}
.fval.sel .cb {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.fmore {
  font-size: 11px;
  color: var(--faint);
  padding: 4px 8px 2px;
  font-style: italic;
}
.special {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 5px 8px;
  border-radius: var(--r-sm);
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  transition: background-color 0.12s;
  width: 100%;
  border: none;
  background: none;
  font-family: inherit;
  text-align: left;
}
.special:hover {
  background: var(--surface-2);
}
.special.set {
  background: var(--accent-soft);
  color: var(--accent);
}
.special .val {
  margin-left: auto;
  font-size: 10px;
  color: var(--faint);
  font-family: var(--mono);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.special.set .val {
  color: var(--accent);
}
.special .lead {
  display: inline-grid;
  place-items: center;
}
.addbtn {
  width: 100%;
  margin: 8px 0 4px;
  height: 38px;
  border-radius: var(--r-sm);
  border: 1px dashed var(--border-2);
  background: transparent;
  color: var(--dim);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.addbtn:hover {
  background: var(--surface-2);
  color: var(--text);
}

/* CENTER - toprow + res-bar are fixed chrome; only the results column scrolls. */
.center {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  position: relative;
  overflow: hidden;
}
.center-fixed {
  flex-shrink: 0;
  padding: 14px 18px 0;
}
.results-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  /* NO top padding. \`.list-head\` sticks at \`top: 0\` of the PADDING box, so any top padding leaves a
     band between the scrollport edge and the pinned header - and once the header is pinned, the
     content occupying that band is the rows. That is the strip of file text that painted above the
     column header. The spacing belongs on the content that wants it, below - not here. */
  padding: 0 18px 92px;
}

/* Breathing room applied to the content rather than to the scrollport, so it scrolls away with
   that content instead of holding a gap open above the pinned header. */
.results-scroll > .overview-mode,
.results-scroll > .list-head[hidden] + .rows {
  margin-top: 8px;
}
.toprow {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  align-items: center;
  flex: 1;
  min-width: 0;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-family: inherit;
}
.chip .x {
  opacity: 0.7;
  display: inline-grid;
  place-items: center;
}
.chip.geo {
  background: color-mix(in srgb, var(--good) 14%, transparent);
  color: var(--good);
}
.clear-btn {
  flex-shrink: 0;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--danger) 40%, transparent);
  background: transparent;
  color: var(--danger);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  display: none;
}
.clear-btn.show {
  display: inline-flex;
  align-items: center;
}
.ctrl-cluster {
  flex-shrink: 0;
  /* The mode switch belongs on the RIGHT. Relying on \`.chips\` to fill the row only worked while
     there were chips: with none (or the row hidden) the cluster fell back to the left and the
     control jumped as soon as the first filter was applied. \`margin-left: auto\` states the
     intention instead of depending on a sibling's content. */
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px;
  box-shadow: var(--shadow);
}
/* The worded half of clear-all. Right-aligned so it reads as the row's action rather than as a
   third thing about the count, and quiet until it is wanted - it is an undo, not an invitation. */
.sf-clear {
  margin-left: auto;
  flex-shrink: 0;
  height: 21px;
  padding: 0 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface-2);
  color: var(--dim);
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-transform: none;
  cursor: pointer;
  transition:
    color 0.12s,
    border-color 0.12s,
    background-color 0.12s;
}
.sf-clear:hover {
  color: var(--danger);
  border-color: color-mix(in srgb, var(--danger) 55%, transparent);
}
.ctrl {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: var(--dim);
  cursor: pointer;
  display: grid;
  place-items: center;
  transition:
    background-color 0.15s,
    color 0.15s;
}
.ctrl:hover {
  background: var(--surface-2);
  color: var(--text);
}
.ctrl.on {
  background: var(--accent-soft);
  color: var(--accent);
}
.ctrl-sep {
  width: 1px;
  height: 20px;
  background: var(--border);
  margin: 0 2px;
}

.overview-mode {
  display: none;
  margin-bottom: 16px;
}
.fdb-app.metaview .overview-mode {
  display: block;
}
.overview-cap {
  font-size: 12px;
  color: var(--faint);
  margin: 0 0 10px;
}
.stale-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-left: 8px;
  padding: 1px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--warn) 16%, transparent);
  color: var(--warn);
  font-size: 10.5px;
  font-weight: 700;
}
.facet-grid {
  --block-h: 256px;
  --block-gap: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(244px, 100%), 1fr));
  gap: var(--block-gap);
  /* Rows are sized by their CONTENT and each card states its own block height (below). A fixed
     \`grid-auto-rows\` could never let a minimized row close up; \`min-content\` alone let an expanded
     card grow past its box (which is what killed the value scrollbar). This does both. */
  grid-auto-rows: min-content;
  align-items: start;
}
/* "stacked": every block a full-width row. A single column forces full width regardless of each
   card's saved span, and \`1 / -1\` overrides the inline \`span N\` so no implicit tracks (= no page
   overflow) can ever be created. */
.facet-grid.stacked {
  grid-template-columns: 1fr;
}
.facet-grid.stacked .fcard,
.facet-grid.stacked .ov-addrow {
  grid-column: 1 / -1 !important;
}
.fcard {
  border: 1px solid var(--border);
  border-radius: var(--r);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow);
  height: var(--block-h);
}
/* one block down - and no further */
.fcard[data-rows="2"] {
  height: calc(var(--block-h) * 2 + var(--block-gap));
}
.fcard.tall {
  grid-row: span 2;
}
.fcard.wide {
  grid-column: span 2;
}
.fcard-empty {
  padding: 8px 10px;
  font-size: 12px;
  color: var(--faint);
  font-style: italic;
}
/* Value lists lay out as a GRID that fits as many ~200px columns as the width allows and then
   grows DOWNWARD (vertical scroll), row-major. This replaces CSS multi-column, whose fixed-height
   column packing forced a horizontal scroll when a card was stretched. Applies uniformly: a narrow
   card gets one column, a wide/stacked/full-width card gets several - always scrolling vertically. */
.fcard-h {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
  font-weight: 700;
  font-size: 13px;
}
/* The header toggles collapse/expand; make that obvious (its own controls keep their cursors). */
.fcard-h.clickable {
  cursor: pointer;
}
.fcard-h.clickable:hover {
  background: var(--surface-2);
}
.fcard-h .badge {
  margin-left: auto;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--faint);
}
.fcard-h .fh-count {
  margin-left: 6px;
  font-family: var(--mono);
}
/* NOTE: the hover treatment is a real element swap in a neutral colour; see the end of this sheet.
   A red \`::after\` cross drawn OVER the badge with the number merely turned transparent puts both
   on screen at once, and takes the host's danger colour - which in a red-branded deployment is
   the accent. */
.fcard-h.active {
  color: var(--accent);
}
.fcard-h .exp {
  margin-left: 4px;
  color: var(--faint);
  cursor: pointer;
  border: none;
  background: none;
  padding: 2px;
  display: inline-grid;
  place-items: center;
}
.fcard-h .exp:hover {
  color: var(--accent);
}
.fcard-h .exp.on {
  color: var(--accent);
}
.fcard .within {
  margin: 8px 10px 4px;
  height: 30px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  border-radius: 6px;
  padding: 0 9px;
  font-size: 12px;
  outline: none;
  font-family: inherit;
}
.fcard .within:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.fcard-vals {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(190px, 100%), 1fr));
  column-gap: 10px;
  align-content: start;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2px 6px 8px;
  flex: 1 1 auto;
  min-height: 0;
}
.fcard-vals .fmore,
.fcard-vals .fcard-empty {
  grid-column: 1 / -1;
} /* notes span the whole width */
.fcard-vals .fval {
  font-size: 12px;
}
.fcard .editline {
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.fcard .editline .v {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--accent);
  flex: 1;
  word-break: break-all;
}
.fcard .editline .v.off {
  color: var(--faint);
}

.res-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--r);
  background: var(--surface-2);
  border: 1px solid var(--border);
  margin-bottom: 6px;
  flex-wrap: wrap;
}
.bar-div {
  width: 1px;
  height: 22px;
  background: var(--border);
  margin: 0 2px;
}
/* Select-all (in the results bar, both list + grid). Reuses the .cb checkbox box. */
.selall {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 32px;
  padding: 0 9px;
  border: none;
  background: transparent;
  color: var(--dim);
  cursor: pointer;
  font-size: 12.5px;
  border-radius: 8px;
  white-space: nowrap;
}
.selall:hover:not(:disabled) {
  background: var(--surface-2);
  color: var(--text);
}
.selall:disabled {
  opacity: 0.4;
  cursor: default;
}
.selall .cb {
  color: transparent;
}
.selall .cb.on {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.selall .cb.mixed {
  background: var(--accent);
  border-color: var(--accent);
  position: relative;
}
.selall .cb.mixed::after {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  width: 9px;
  height: 2px;
  background: #fff;
  border-radius: 1px;
}
/* the file-panel controls fade/translate in place. The slot is RESERVED (this
   stays in flow with its width even when hidden) so nothing else in the bar moves; Export and the
   count never shift. pointer-events:none keeps the invisible controls unclickable. */
.panelctl {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transform: translateY(-3px);
  pointer-events: none;
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}
.panelctl.in {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.res-bar.merged {
  border-color: color-mix(in srgb, var(--accent) 35%, var(--border));
  box-shadow: 0 2px 10px color-mix(in srgb, var(--accent) 12%, transparent);
}
@media (prefers-reduced-motion: reduce) {
  .panelctl {
    transition: none;
  }
}

.iconbtn {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: var(--dim);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.15s,
    color 0.15s;
}
.iconbtn:hover {
  background: var(--surface-3);
  color: var(--text);
}
.iconbtn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.iconbtn .caret {
  position: absolute;
  right: 3px;
  bottom: 4px;
  color: var(--faint);
  display: inline-grid;
  place-items: center;
}
.scope-tag {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--faint);
  border: 1px solid var(--border-2);
  padding: 2px 7px;
  border-radius: 999px;
}
.res-count {
  font-size: 14px;
  font-weight: 700;
}
.res-count .sub {
  font-weight: 500;
  color: var(--faint);
  font-size: 12px;
  margin-left: 6px;
}
.spacer {
  flex: 1;
}
.seg {
  display: flex;
  border: 1px solid var(--border-2);
  border-radius: var(--r-sm);
  overflow: hidden;
}
.seg button {
  height: 34px;
  padding: 0 12px;
  min-width: 36px;
  display: grid;
  place-items: center;
  border: none;
  cursor: pointer;
  background: var(--surface);
  color: var(--dim);
  transition:
    background-color 0.15s,
    color 0.15s;
  font-family: inherit;
  font-size: 12px;
}
.seg button.on {
  background: var(--accent-soft);
  color: var(--accent);
}

.btn {
  height: 34px;
  padding: 0 13px;
  border-radius: var(--r-sm);
  border: 1px solid var(--border-2);
  background: var(--surface);
  color: var(--text);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  transition:
    background-color 0.15s,
    border-color 0.15s;
}
.btn:hover {
  background: var(--surface-2);
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn.primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.btn.primary:hover {
  background: var(--accent-2);
}
.ac {
  position: absolute;
  z-index: 70;
  background: #0e1626;
  border: 1px solid #28406a;
  border-radius: 8px;
  box-shadow: var(--shadow);
  min-width: 160px;
  max-height: 240px;
  overflow: auto;
  padding: 4px;
  display: none;
}
.ac.show {
  display: block;
}
.ac-item {
  padding: 6px 9px;
  border-radius: 5px;
  font-family: var(--mono);
  font-size: 12px;
  color: #d7e2f4;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
}
.ac-item:hover,
.ac-item.hl {
  background: rgba(79, 141, 247, 0.2);
}
.ac-item .cnt {
  margin-left: auto;
  color: #6f7f9c;
  font-size: 10px;
}

/* results */
.rows {
  border: 1px solid var(--border);
  border-radius: var(--r);
  overflow: hidden;
  background: var(--surface);
}
.row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 14px;
}
.row {
  min-height: 48px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: background-color 0.12s;
}
.row:last-child {
  border-bottom: none;
}
.row:hover {
  background: var(--surface-2);
}
.row.focus {
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent);
}
.row.picked {
  background: color-mix(in srgb, var(--accent-soft) 62%, transparent);
}
.row.focus.picked {
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent);
}
.cb {
  width: 17px;
  height: 17px;
  border-radius: 4px;
  border: 1.5px solid var(--border-2);
  flex-shrink: 0;
  display: grid;
  place-items: center;
  background: var(--surface);
  color: transparent;
  transition: background-color 0.12s;
  padding: 0;
  cursor: pointer;
}
.row.picked .cb,
.gcard.picked .cb {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.uricell {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
}
.row .ext {
  width: 30px;
  height: 30px;
  border-radius: 7px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 700;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent);
}
.row .meta {
  flex: 1;
  min-width: 0;
}
/* ONE complete path per row (see results.ts \`pathEl\`). A single line with an ellipsis: the whole
   value lives in \`title\` and \`aria-label\`, so clipping loses nothing but pixels. \`direction: rtl\`
   keeps the END of a long path - the part that identifies the file - visible when it is clipped,
   while \`unicode-bidi: plaintext\` stops the text itself being reordered. */
.row .path {
  font-size: 13px;
  font-weight: 600;
  font-family: var(--mono);
  overflow: hidden;
  direction: rtl;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  unicode-bidi: plaintext;
}
.fs {
  font-size: 11px;
  font-weight: 500;
  font-family: var(--mono);
  color: var(--dim);
  flex-shrink: 0;
  white-space: nowrap;
}
/* List-view column header (uri | fs type). Sits directly on top of the .rows box. */
.list-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 14px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--dim);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--r) var(--r) 0 0;
}
.list-head[hidden] {
  display: none;
}
.list-head .lh-uri {
  flex: 1;
  padding-left: 42px;
}
.list-head .lh-fs {
  flex-shrink: 0;
  padding-right: 34px;
}
.list-head:not([hidden]) + .rows {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr));
  gap: 10px;
}
.gcard {
  border: 1px solid var(--border);
  border-radius: var(--r);
  background: var(--surface);
  padding: 12px;
  cursor: pointer;
  transition:
    border-color 0.12s,
    box-shadow 0.12s,
    transform 0.1s;
}
.gcard:hover {
  box-shadow: var(--shadow);
  border-color: var(--border-2);
  transform: translateY(-1px);
}
.gcard.focus {
  border-color: transparent;
  box-shadow:
    inset 0 0 0 1px var(--accent),
    0 0 0 3px var(--accent-soft);
}
.gcard.picked {
  background: color-mix(in srgb, var(--accent-soft) 55%, transparent);
}
.gcard .top2 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 9px;
}
/* A card may WRAP the path across lines - it is still one complete value, never two. */
.gcard .path {
  font-size: 12px;
  font-weight: 600;
  font-family: var(--mono);
  line-height: 1.35;
  word-break: break-all;
}
.gcard .bits {
  font-size: 10.5px;
  color: var(--faint);
  margin-top: 6px;
  font-family: var(--mono);
}
.kebab {
  width: 30px;
  height: 30px;
  border-radius: 7px;
  border: none;
  background: transparent;
  color: var(--faint);
  cursor: pointer;
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
}
.kebab:hover {
  background: var(--surface-3);
  color: var(--text);
}

.load-next {
  width: 100%;
  justify-content: center;
}
.more-note {
  text-align: center;
  padding: 12px;
  color: var(--faint);
  font-size: 12.5px;
}

/* states */
.skeleton-rows {
  border: 1px solid var(--border);
  border-radius: var(--r);
  overflow: hidden;
  background: var(--surface);
}
.sk-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  border-bottom: 1px solid var(--border);
}
.sk-row:last-child {
  border-bottom: none;
}
.sk {
  background: linear-gradient(
    90deg,
    var(--surface-2) 25%,
    var(--surface-3) 50%,
    var(--surface-2) 75%
  );
  background-size: 400% 100%;
  animation: sk 1.3s ease infinite;
  border-radius: 6px;
}
@keyframes sk {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: -100% 0;
  }
}
.fdb-app[data-reduced-motion="true"] .sk {
  animation: none;
}
.state-msg {
  text-align: center;
  padding: 44px 22px;
  color: var(--dim);
  border: 1px solid var(--border);
  border-radius: var(--r);
  background: var(--surface);
}
.state-msg .big {
  color: var(--faint);
  margin-bottom: 12px;
  display: grid;
  place-items: center;
}
.state-msg p {
  font-size: 13.5px;
  line-height: 1.5;
  margin: 0 0 12px;
}
.state-msg.err {
  color: var(--danger);
}

.pickbar {
  position: absolute;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  width: min(680px, calc(100% - 36px));
  background: var(--surface);
  border: 1px solid var(--accent);
  border-radius: var(--r);
  box-shadow: var(--shadow);
  padding: 10px 14px;
  display: none;
  align-items: center;
  gap: 12px;
  z-index: 20;
}
.pickbar.show {
  display: flex;
}
.pickbar .cnt {
  font-size: 13px;
  font-weight: 600;
}
.pickbar .cnt b {
  color: var(--accent);
  font-family: var(--mono);
}
.pickbar .x {
  cursor: pointer;
  color: var(--faint);
  border: none;
  background: none;
  display: inline-grid;
  place-items: center;
}

/* RIGHT DETAILS PANEL */
.details-panel {
  width: 340px;
  flex-shrink: 0;
  border-left: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition:
    width 0.25s,
    border-color 0.25s,
    background-color 0.35s;
}
.details-panel.collapsed {
  width: 0;
  border-left: none;
}
.info-scroll {
  overflow-y: auto;
  flex: 1;
}
.info-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
}
.info-head .t {
  font-weight: 700;
  font-size: 14px;
}
.info-head .x {
  margin-left: auto;
  cursor: pointer;
  color: var(--faint);
  border: none;
  background: none;
  display: inline-grid;
  place-items: center;
}
.empty {
  padding: 40px 22px;
  text-align: center;
  color: var(--dim);
}
.empty .big {
  font-size: 30px;
  color: var(--faint);
  margin-bottom: 12px;
  display: grid;
  place-items: center;
}
.empty p {
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
}
.empty code {
  font-family: var(--mono);
  color: var(--accent);
}
.info-name {
  padding: 16px 16px 2px;
  font-weight: 700;
  font-size: 13.5px;
  font-family: var(--mono);
  word-break: break-all;
}
.info-sub {
  padding: 0 16px 14px;
  font-size: 11.5px;
  color: var(--faint);
  word-break: break-all;
}
.info-sec {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--faint);
  padding: 10px 16px 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.meta {
  padding: 0 16px;
}
.meta-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 0;
  border-bottom: 1px solid var(--border);
  font-size: 12.5px;
}
.meta-row:last-child {
  border-bottom: none;
}
.meta-row .k {
  color: var(--dim);
}
.meta-row .v {
  font-family: var(--mono);
  color: var(--text);
  text-align: right;
  font-weight: 500;
  word-break: break-all;
}
.miniwrap {
  padding: 4px 16px 6px;
}
.minimap {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
  position: relative;
}
.coords {
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--dim);
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
}
.na {
  font-size: 12px;
  color: var(--faint);
  padding: 2px 16px 8px;
  font-style: italic;
}
.info-actions {
  padding: 14px 16px 18px;
}
.cat-seg {
  margin: 6px 0 10px;
}
.info-actions .btn {
  width: 100%;
  justify-content: center;
  margin-bottom: 8px;
}
.scope-note {
  font-size: 11px;
  color: var(--faint);
  margin: 0 0 8px;
}
.querying {
  padding: 22px 16px;
  font-size: 12.5px;
  color: var(--faint);
  font-family: var(--mono);
}
.querying .bar {
  height: 3px;
  background: var(--surface-3);
  border-radius: 2px;
  margin-top: 10px;
  overflow: hidden;
  position: relative;
}
.querying .bar::after {
  content: "";
  position: absolute;
  left: -40%;
  top: 0;
  height: 100%;
  width: 40%;
  background: var(--accent);
  border-radius: 2px;
  animation: slide 1s infinite;
}
@keyframes slide {
  to {
    left: 100%;
  }
}
.partial-flag {
  margin: 6px 16px;
  padding: 6px 9px;
  border-radius: 6px;
  font-size: 11.5px;
  color: var(--warn);
  background: color-mix(in srgb, var(--warn) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--warn) 40%, transparent);
}

.diff-summary {
  padding: 0 16px 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.varchip {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  background: var(--surface-2);
  border: 1px solid var(--border);
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-family: var(--mono);
  color: var(--accent);
}
.dscroll {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: 8px;
  margin: 0 16px 4px;
}
.dmatrix {
  width: 100%;
  border-collapse: collapse;
  font-size: 11.5px;
  font-family: var(--mono);
}
.dmatrix th,
.dmatrix td {
  text-align: left;
  padding: 6px 9px;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}
.dmatrix tr:last-child td {
  border-bottom: none;
}
.dmatrix thead th {
  color: var(--faint);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 9.5px;
  letter-spacing: 0.05em;
  background: var(--surface-2);
}
.dmatrix td.rownum {
  color: var(--faint);
}
.dchip {
  padding: 1px 7px;
  border-radius: 5px;
  font-weight: 600;
}
/* Enlarge control + full-screen comparison overlay (scrolls X and Y for wide/tall tables). */
.diff-tools {
  display: flex;
  justify-content: flex-end;
  margin: 0 16px 6px;
}
.diff-enlarge {
  padding: 4px 10px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
/* The full-screen comparison. */
.dmm-backdrop {
  /*
   * A <dialog>, so most of this is undoing the UA's own dialog box (fit-content width, auto
   * margins, a border, a background, absolute positioning) to get a full-viewport scrim back.
   *
   * \`position: fixed\` here is against the VIEWPORT even inside a transformed host container,
   * because a modal dialog is in the top layer and the top layer's containing block is the initial
   * one. The z-index is only for the no-<dialog> fallback path, where this is an ordinary element
   * again; nothing in the top layer needs one.
   *
   * \`dvh\`, not \`vh\`, on the modal below: on a phone \`vh\` is the viewport with the browser chrome
   * RETRACTED, so a modal capped at 92vh is taller than the screen it is on until the address bar
   * scrolls away - which for a modal that owns the scroll it never does.
   */
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  border: none;
  color: inherit;
  z-index: 2147483000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(8, 14, 26, 0.58);
  /* Its own stacking context, so nothing inside can be re-ordered against the page by a host
     stylesheet that happens to give something a higher z-index. */
  isolation: isolate;
  overscroll-behavior: contain;
}
/* \`display: flex\` above would otherwise defeat the UA's own \`dialog:not([open])\` rule. */
.dmm-backdrop:not([open]) {
  display: none;
}
/* The scrim is painted by the dialog itself (it has to be, for the fallback path), so the real
   backdrop pseudo-element stays out of the way rather than doubling the dimming. */
.dmm-backdrop::backdrop {
  background: transparent;
}
.dmm-modal {
  display: flex;
  flex-direction: column;
  width: min(1200px, 96vw);
  max-height: min(92vh, 92dvh);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}
.dmm-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  background: var(--accent);
  color: #fff;
}
.dmm-title {
  font-weight: 600;
  font-size: 14px;
}
.dmm-head .x {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  padding: 4px;
  display: inline-grid;
  place-items: center;
}
.dmm-head .x:hover {
  background: rgba(255, 255, 255, 0.18);
}
.dmm-body {
  overflow: auto;
  padding: 12px;
}
.dmm-body .dmatrix {
  font-size: 12.5px;
}
.dmm-body .dmatrix th,
.dmm-body .dmatrix td {
  padding: 8px 12px;
}
.shared {
  margin: 12px 16px 4px;
  border-top: 1px solid var(--border);
  padding-top: 2px;
}
.shared-head {
  cursor: pointer;
  padding-left: 0 !important;
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: none;
  width: 100%;
  font-family: inherit;
}
.shared-head .chev2 {
  color: var(--faint);
  transition: transform 0.2s;
  margin-left: 2px;
  display: inline-grid;
  place-items: center;
}
.shared:not(.open) .shared-head .chev2 {
  transform: rotate(-90deg);
}
.shared-body {
  display: none;
}
.shared.open .shared-body {
  display: block;
}
.shared-body .miniwrap,
.shared-body .meta {
  padding-left: 0;
  padding-right: 0;
}

.status {
  height: 36px;
  flex-shrink: 0;
  border-top: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  align-items: center;
  padding: 0 18px;
  font-size: 12px;
  color: var(--dim);
  gap: 14px;
  transition:
    background-color 0.35s,
    border-color 0.35s;
}
.status .mono {
  font-family: var(--mono);
}

/* popovers */
.pop {
  position: absolute;
  z-index: 50;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r);
  box-shadow: var(--shadow);
  padding: 6px;
  display: none;
}
.pop.show {
  display: block;
}
.pop-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: var(--r-sm);
  cursor: pointer;
  font-size: 13px;
  color: var(--text);
  border: none;
  background: none;
  width: 100%;
  font-family: inherit;
  text-align: left;
}
.pop-item:hover {
  background: var(--surface-2);
}
.pop-item .pic {
  width: 18px;
  display: inline-grid;
  place-items: center;
  color: var(--accent);
}
.pop-item .desc {
  font-size: 11px;
  color: var(--faint);
}
/* The export menu (components/exportMenu.ts)
   ONE layout for both the whole-result Export and the pickbar's selected-files Download.

   The previous markup reused \`.desc\` - the package's faint 11px CAPTION style - for the PRIMARY
   label, and paired it with a \`.sub\` span that had no rule at all. Two inline spans with no line
   break and no hierarchy is why the menu read as
   "Intake catalogueintake-esm JSON for the whole result set". */
.xm-head {
  padding: 6px 10px 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--faint);
  text-transform: uppercase;
  /* The scope is stated ONCE, here, instead of being repeated in all three descriptions. */
}
.xm {
  display: flex;
  flex-direction: column;
  gap: 2px;
  /* Never wider than the component it lives in: at a 320px mount the menu still fits. */
  max-width: min(340px, calc(100vw - 24px));
}
.xm-item {
  display: grid;
  /* fixed icon column | text | optional format marker */
  grid-template-columns: 22px minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  width: 100%;
  min-height: 44px; /* a comfortable touch target */
  padding: 7px 10px;
  border: none;
  border-radius: var(--r-sm);
  background: none;
  color: var(--text);
  font-family: inherit;
  text-align: left;
  cursor: pointer;
}
.xm-item:hover {
  background: var(--surface-2);
}
.xm-item:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}
.xm-ic {
  display: inline-grid;
  place-items: center;
  color: var(--accent);
}
.xm-text {
  display: grid; /* label and description on their OWN lines - the actual bug */
  gap: 1px;
  min-width: 0;
}
.xm-label {
  font-size: 13px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.xm-desc {
  font-size: 11px;
  color: var(--faint);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.xm-fmt {
  padding: 1px 6px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface-2);
  color: var(--faint);
  font-family: var(--mono);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.pop-sep {
  height: 1px;
  background: var(--border);
  margin: 5px 2px;
}
.pop-item.check.on .tick {
  margin-left: auto;
  color: var(--accent);
  font-weight: 700;
  display: inline-grid;
  place-items: center;
}

/* editors */
.editor {
  width: 300px;
  padding: 12px;
}
.editor h5 {
  margin: 0 0 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 7px;
}
.editor h5 .sub {
  font-weight: 500;
  color: var(--faint);
  font-size: 11px;
}
.editor .modes {
  display: flex;
  gap: 6px;
  margin: 10px 0;
}
.editor .modes button {
  flex: 1;
  height: 30px;
  border: 1px solid var(--border-2);
  background: var(--surface);
  border-radius: 6px;
  font-size: 11.5px;
  color: var(--dim);
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
}
.editor .modes button.on {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}
.editor .modes button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.editor .mode-help {
  font-size: 11px;
  color: var(--faint);
  line-height: 1.45;
  min-height: 30px;
  margin-bottom: 8px;
}
.editor .daterow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.editor .daterow label {
  font-size: 11px;
  color: var(--faint);
  width: 34px;
}
.editor .daterow input {
  flex: 1;
  height: 32px;
  border: 1px solid var(--border-2);
  background: var(--surface-2);
  color: var(--text);
  border-radius: 6px;
  padding: 0 8px;
  font-family: var(--mono);
  font-size: 12px;
  outline: none;
}
.editor .daterow input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.editor .daterow input.bad {
  border-color: var(--danger);
}
.editor .actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}
.editor .actions .btn {
  flex: 1;
  justify-content: center;
}
.editor .preview {
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--accent);
  background: var(--surface-2);
  border-radius: 6px;
  padding: 7px 9px;
  margin-top: 8px;
  word-break: break-all;
}
.editor .err-line {
  font-size: 11px;
  color: var(--danger);
  margin-top: 6px;
  min-height: 14px;
}
.draw-hint {
  font-size: 11px;
  color: var(--faint);
  text-align: center;
  margin-top: 6px;
}
.bbox-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin-top: 8px;
}
.bbox-fields .f {
  display: flex;
  align-items: center;
  gap: 5px;
}
.bbox-fields .f label {
  font-size: 10px;
  color: var(--faint);
  width: 42px;
}
.bbox-fields input {
  width: 100%;
  height: 28px;
  border: 1px solid var(--border-2);
  background: var(--surface-2);
  color: var(--text);
  border-radius: 5px;
  padding: 0 6px;
  font-family: var(--mono);
  font-size: 11px;
  outline: none;
}
.bbox-fields input:focus {
  border-color: var(--accent);
}
.bbox-fields input.bad {
  border-color: var(--danger);
}
.map-overlay {
  position: absolute;
  inset: 0;
  cursor: crosshair;
}

/* dev notes drawer */
.notes-drawer {
  position: fixed;
  right: 0;
  bottom: 0;
  top: 56px;
  width: 372px;
  background: var(--surface);
  border-left: 1px solid var(--border);
  box-shadow: var(--shadow);
  transform: translateX(100%);
  transition: transform 0.3s;
  z-index: 60;
  display: flex;
  flex-direction: column;
}
.notes-drawer.show {
  transform: translateX(0);
}
.notes-drawer h4 {
  margin: 0;
  padding: 16px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
  display: flex;
  align-items: center;
}
.notes-drawer h4 .x {
  margin-left: auto;
  cursor: pointer;
  border: none;
  background: none;
  color: var(--faint);
}
.notes-list {
  overflow-y: auto;
  padding: 8px 16px 20px;
}
.nl {
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.nl .h {
  display: flex;
  align-items: center;
  gap: 9px;
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 5px;
}
.nl .h .num {
  width: 19px;
  height: 19px;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 800;
  flex-shrink: 0;
}
.nl p {
  margin: 0;
  font-size: 12.5px;
  color: var(--dim);
  line-height: 1.55;
}

.freva-db ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.freva-db ::-webkit-scrollbar-thumb {
  background: var(--border-2);
  border-radius: 999px;
  border: 3px solid transparent;
  background-clip: padding-box;
}
@media (max-width: 1100px) {
  .details-panel {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 30;
    box-shadow: var(--shadow);
  }
}
@media (max-width: 680px) {
  .top {
    gap: 8px;
    padding: 0 10px;
  }
  .lens .k {
    display: none;
  } /* drop the "FLAVOUR" label; keep the value */
  .side {
    width: 208px;
  } /* results sidebar shrinks so content keeps room */
  .center-fixed {
    padding: 12px 12px 0;
  }
  .results-scroll {
    padding: 0 12px 92px;
  }
  .details-panel {
    width: min(360px, calc(100vw - 24px));
  } /* the details overlay fits a phone (still 0 when collapsed) */
  /* The panel controls (Select all / View / Details) reserve an invisible slot so Export doesn't shift
     when they fade in. On a phone that reserved slot wraps to a tall blank strip inside the result bar
     (the "weird big" section in Overview). Drop the reservation here - the controls still show when
     active (file panel scrolled into view). */
  .res-bar {
    padding: 8px 10px;
    gap: 8px;
  }
  .panelctl:not(.in) {
    display: none;
  }
}
@media (max-width: 460px) {
  .brand span {
    display: none;
  } /* just the mark on very small screens */
  .top {
    gap: 6px;
    padding: 0 8px;
  }
  .center-fixed {
    padding: 10px 10px 0;
  }
  .results-scroll {
    padding: 0 10px 92px;
  }
}
@media (max-width: 560px) {
  .fdb-app:not(.side-collapsed) .side {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 25;
    box-shadow: var(--shadow);
  }
}
@media (prefers-reduced-motion: reduce) {
  .sk {
    animation: none;
  }
  .querying .bar::after {
    animation: none;
  }
}

/* Theme flip: the controller sets data-notransition around the data-theme swap so the
   variable re-resolve is ONE style pass instead of thousands of simultaneous per-node
   background/color animations (the measured cause of the toggle stutter). */
.freva-db[data-notransition],
.freva-db[data-notransition] * {
  transition: none !important;
}

/* Incremental long lists: the IO sentinel is invisible; the no-IO fallback button
   (also the deterministic path in tests) looks like the quiet inline affordances. */
.chunk-sentinel {
  height: 1px;
}
.chunk-more {
  display: block;
  width: 100%;
  padding: 7px 10px;
  margin: 2px 0;
  border: 1px dashed var(--border-2);
  border-radius: var(--r-sm);
  background: none;
  color: var(--dim);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.chunk-more:hover {
  background: var(--surface-2);
  color: var(--text);
}

/* Details partial-failure retry (extends the base .partial-flag rule above) */
.partial-flag {
  display: flex;
  align-items: center;
  gap: 8px;
}
.btn.sm {
  padding: 3px 9px;
  font-size: 11.5px;
}

/* Format thumbnails: the leading tile for zarr/nc/grib rows/cards. Other extensions
   keep the generic .ext text tile. The brand mark sits on a white chip so the fixed-palette logos
   (netCDF/GRIB/Intake are dark) read on light AND dark result cards. */
.ftile {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  line-height: 0;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 7px;
}
.gcard .ftile {
  width: 30px;
  height: 30px;
}
/* Small white chip for brand logos shown inline in menus/buttons (Export \u25BE, Details downloads). */
.brand-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 2px;
  line-height: 0;
}

/* Manual load-next with a proportion bar (no scroll auto-load: cheaper on Solr, no
   jank at thousands of rendered rows). */
.more-loader {
  margin: 14px 0 0;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: var(--r);
  background: var(--surface);
}
.more-info {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 12.5px;
  color: var(--dim);
}
.more-pct {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--faint);
}
.more-bar {
  height: 4px;
  background: var(--surface-3);
  border-radius: 2px;
  overflow: hidden;
  margin: 8px 0 10px;
}
.more-bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: width 0.25s ease;
}
.more-loader .load-next {
  margin: 0;
}

/* One loading language: the shared inline spinner primitive. */
.spin {
  width: 14px;
  height: 14px;
  border: 2px solid var(--border-2);
  border-top-color: var(--accent);
  border-radius: 999px;
  display: inline-block;
  vertical-align: -2px;
  animation: fdb-spin 0.7s linear infinite;
}
@keyframes fdb-spin {
  to {
    transform: rotate(360deg);
  }
}
.fdb-app[data-reduced-motion="true"] .spin {
  animation: none;
}

/* Flavour (naming) change: a clean spinner veil over the sidebar while labels/counts re-fetch. */
.side {
  position: relative;
}
.side-flavour-veil {
  position: absolute;
  inset: 0;
  display: none;
  place-items: center;
  z-index: 5;
  background: color-mix(in srgb, var(--surface) 45%, transparent);
}
.side-flavour-veil .spin {
  width: 22px;
  height: 22px;
  border-width: 2.5px;
}
.fdb-app.flavour-loading .side-flavour-veil {
  display: grid;
}
.fdb-app.side-collapsed .side-flavour-veil {
  display: none;
}

/* Chip/mode/diff tags replace the removed \`\xB7\` separators with quiet grouping. */
.chip-tag {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.72;
  margin-left: 2px;
}
.mode-tag {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--faint);
  margin-left: 8px;
  font-family: var(--mono);
}
.varchip .vc-n {
  color: var(--accent);
  font-weight: 700;
  margin-left: 6px;
}

/* Config: brand description in the results scope line */
.scope-desc {
  font-size: 11.5px;
  color: var(--faint);
  margin-left: 2px;
}

/* Value-first main search dropdown */
.vsearch-pop {
  display: none;
  z-index: 60;
  background: var(--surface);
  border: 1px solid var(--border-2);
  border-radius: var(--r);
  box-shadow: var(--shadow-lg, 0 12px 32px rgba(0, 0, 0, 0.4));
  max-height: 340px;
  overflow-y: auto;
  padding: 5px;
}
.vsearch-pop.show {
  display: block;
}
.vs-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 7px 9px;
  border-radius: 7px;
  cursor: pointer;
}
.vs-item.hl,
.vs-item:hover {
  background: var(--accent-soft);
}
.vs-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 2px 7px;
  border-radius: 999px;
  flex-shrink: 0;
}
.vs-val {
  font-family: var(--mono);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text);
  flex-shrink: 0;
}
.vs-desc {
  font-size: 11.5px;
  color: var(--dim);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vs-cnt {
  margin-left: auto;
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--faint);
  flex-shrink: 0;
}
.vs-empty {
  padding: 10px 12px;
  font-size: 12.5px;
  color: var(--faint);
}

/* Footer console + toasts */
.status {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 14px;
  user-select: none;
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  flex-shrink: 0;
  background: var(--faint);
}
.status-dot.info {
  background: var(--accent);
}
.status-dot.success {
  background: var(--good);
}
.status-dot.warn {
  background: var(--warn);
}
.status-dot.error {
  background: var(--danger);
}
/* The footer message itself is coloured by severity (green routine/ok, yellow warning, red
   error), so activity reads at a glance without an event-log panel. */
.status-msg.info,
.status-msg.success {
  color: var(--good);
}
.status-msg.warn {
  color: var(--warn);
}
.status-msg.error {
  color: var(--danger);
}
.status .spacer {
  flex: 1;
}
.log-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 22px;
  padding: 0 8px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--dim);
  font-size: 11px;
  cursor: pointer;
}
.log-toggle:hover,
.log-toggle.on {
  color: var(--text);
  border-color: var(--border-2);
}
.log-count {
  font-family: var(--mono);
  font-size: 10.5px;
}

.console-panel {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 36px;
  z-index: 55;
  display: none;
  max-height: 42%;
  background: var(--surface);
  border-top: 1px solid var(--border-2);
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.35);
  flex-direction: column;
}
.console-panel.show {
  display: flex;
}
.console-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.console-title {
  font-weight: 700;
  font-size: 12.5px;
}
.console-cap {
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--faint);
}
.console-clear {
  margin-left: auto;
  height: 24px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid var(--border-2);
  background: var(--surface-2);
  color: var(--dim);
  font-size: 11.5px;
  cursor: pointer;
}
.console-clear:hover {
  color: var(--text);
}
.console-list {
  overflow-y: auto;
  padding: 4px 0;
}
.log-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 3px 14px;
  font-size: 12px;
}
.log-row:hover {
  background: var(--surface-2);
}
.log-time {
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--faint);
  flex-shrink: 0;
}
.log-sev {
  font-family: var(--mono);
  font-size: 9.5px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  flex-shrink: 0;
  width: 54px;
}
.log-sev.info {
  color: var(--accent);
}
.log-sev.success {
  color: var(--good);
}
.log-sev.warn {
  color: var(--warn);
}
.log-sev.error {
  color: var(--danger);
}
.log-msg {
  color: var(--dim);
}
.log-row.error .log-msg {
  color: var(--text);
}
.log-empty {
  padding: 14px;
  color: var(--faint);
  font-size: 12.5px;
}

/* Toasts live TOP-RIGHT (out of the way of the results/terminal, which own the lower half) and
   slide in from the right rather than popping up from the bottom. */
.toast-host {
  position: absolute;
  right: 16px;
  top: 60px;
  z-index: 140;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}
/* Immediate, styled tooltip (replaces the slow native \`title\` popup - see components/tooltip.ts).
   Fixed-position so it is never clipped by a scroll container; flips/clamps to stay on screen. */
.fdb-tip {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1500;
  pointer-events: none;
  max-width: 280px;
  padding: 5px 9px;
  border-radius: 7px;
  font-size: 12px;
  line-height: 1.45;
  font-weight: 500;
  background: var(--surface-2);
  color: var(--text);
  border: 1px solid var(--border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  white-space: normal;
  opacity: 0;
  transition: opacity 0.1s ease;
}
.fdb-tip.show {
  opacity: 1;
}
.toast {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  width: 320px;
  max-width: calc(100vw - 32px);
  padding: 11px 12px;
  border-radius: 12px;
  background: var(--surface);
  border: 1px solid var(--border-2);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.18),
    0 1px 0 rgba(255, 255, 255, 0.03) inset;
  color: var(--text);
  font-size: 12.5px;
  line-height: 1.45;
  pointer-events: auto;
  cursor: pointer;
  opacity: 0;
  transform: translateX(12px);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}
.toast.in {
  opacity: 1;
  transform: translateX(0);
}
/* a status dot instead of a left bar - reads faster and keeps the card shape clean */
.toast::before {
  content: "";
  flex: 0 0 auto;
  width: 8px;
  height: 8px;
  margin-top: 5px;
  border-radius: 50%;
  background: var(--accent);
}
.toast.success::before {
  background: var(--good);
}
.toast.warn::before {
  background: var(--warn);
}
.toast.error::before {
  background: var(--danger);
}
.toast.info::before {
  background: var(--accent);
}
.toast-msg {
  flex: 1;
}
.fdb-app[data-reduced-motion="true"] ~ .toast-host .toast,
.freva-db[data-reduced-motion="true"] .toast {
  transition: none;
}

/* Metadata-focused block controls: sort, collapse, additional */
.fcard-h .drag-grip {
  cursor: grab;
  color: var(--dim);
  font-size: 13px;
  margin-right: 2px;
  user-select: none;
  padding: 0 2px;
  opacity: 0.9;
  appearance: none;
  background: none;
  border: 0;
  font-family: inherit;
  line-height: 1;
}
.fcard-h .drag-grip:hover {
  color: var(--text);
  opacity: 1;
}
.fcard-h .drag-grip-fixed {
  cursor: default;
  opacity: 0.4;
}
.fcard-h .drag-grip-fixed:hover {
  color: var(--dim);
  opacity: 0.4;
}
.fcard-h button.drag-grip:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
  border-radius: 3px;
  color: var(--text);
}
.fcard.dragging {
  opacity: 0.55;
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}
.fcard.resizing {
  outline: 1px dashed var(--accent);
  outline-offset: -1px;
}
body.fdb-dragging {
  cursor: grabbing;
  user-select: none;
}
body.fdb-dragging * {
  user-select: none !important;
}
.fcard.collapsed .fcard-vals,
.fcard.collapsed .within {
  display: none;
}
.fcard-h .fh-label {
  font-weight: 600;
}
.ov-addrow {
  grid-column: 1 / -1;
}
.ov-addbtn {
  width: 100%;
  height: 40px;
  border-radius: var(--r-sm);
  border: 1px dashed var(--border-2);
  background: transparent;
  color: var(--dim);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.ov-addbtn:hover {
  color: var(--text);
  border-color: var(--accent);
}

/* Overview card drag-resize handle */
.fcard {
  position: relative;
}
.fcard-resize {
  position: absolute;
  right: 3px;
  bottom: 3px;
  width: 14px;
  height: 14px;
  cursor: ew-resize;
  opacity: 0;
  z-index: 2;
  appearance: none;
  border: 0;
  padding: 0;
  background: linear-gradient(
    135deg,
    transparent 55%,
    var(--border-2) 55%,
    var(--border-2) 66%,
    transparent 66%,
    transparent 78%,
    var(--border-2) 78%,
    var(--border-2) 88%,
    transparent 88%
  );
  transition: opacity 0.12s;
}
.fcard:hover .fcard-resize {
  opacity: 1;
}
.fcard-resize:focus-visible {
  opacity: 1;
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}
.fcard.collapsed .fcard-resize {
  display: none;
}

/* Spinners: search-in-flight + export-in-progress */
.res-spin {
  display: none;
  align-items: center;
  margin-left: 2px;
}
.res-spin.show {
  display: inline-flex;
}
.iconbtn.busy {
  position: relative;
  color: transparent;
}
.iconbtn.busy svg {
  visibility: hidden;
}
.iconbtn.busy::after {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  width: 15px;
  height: 15px;
  border: 2px solid var(--border-2);
  border-top-color: var(--accent);
  border-radius: 999px;
  animation: fdb-spin 0.7s linear infinite;
}
.freva-db[data-reduced-motion="true"] .iconbtn.busy::after {
  animation: none;
}

/* read-only time/bbox prefix (always first) */
/* Read-only (time/bbox/flavour) tokens are deliberately NOT blue/amber - those colours mean
   "you typed this, you can edit it". They're also NOT boxed: a bordered chip read as an
   autocomplete row. They're plain, dimmed and italic - quietly present, clearly not editable. */
.tf-tok {
  white-space: nowrap;
  font-style: italic;
  opacity: 0.72;
}
.tf-k,
.tf-eq,
.tf-v {
  color: #7f8da3;
}

/* app-level Help panel (top bar) */
.help-pop {
  display: none;
  position: fixed;
  right: 18px;
  top: 62px;
  z-index: 130;
  width: min(400px, calc(100vw - 36px));
  padding: 16px;
  border-radius: var(--r);
  border: 1px solid var(--border-2);
  background: var(--surface);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.34);
}
.help-pop.show {
  display: block;
}
.help-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  color: var(--text);
}
.help-head .t {
  font-weight: 700;
  font-size: 14px;
  flex: 1;
}
.help-x {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: none;
  background: none;
  color: var(--dim);
  border-radius: 6px;
  cursor: pointer;
}
.help-x:hover {
  background: var(--surface-2);
  color: var(--text);
}
.help-pop p {
  margin: 7px 0;
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--dim);
}
.help-h2 {
  margin-top: 12px;
  font-weight: 700;
  font-size: 12.5px;
  color: var(--text);
}
.help-code {
  margin: 6px 0;
  padding: 8px 10px;
  border-radius: 7px;
  background: var(--surface-2);
  border: 1px solid var(--border-2);
  color: var(--text);
  font-family: var(--mono);
  font-size: 12px;
  overflow-x: auto;
}
.help-dim {
  color: var(--dim);
  font-size: 11.5px;
}
.help-link {
  display: inline-block;
  margin-top: 8px;
  color: var(--accent);
  font-size: 12.5px;
  text-decoration: none;
}
.help-link:hover {
  text-decoration: underline;
}
.spacer {
  flex: 1 1 0;
  min-width: 0;
} /* above the editable kwargs */

/* Sidebar - one "Filter" header, sections named by what they are, each with its
   own search + capped scroll area. */

/* Pinned, with its rule.
 *
 * "Filter" and its count are the sidebar's own header - what the panel below IS, and the control
 * that clears it - so they stay put while the facets scroll under them. Scrolling a header out of
 * a panel that has its own scrollbar loses the one clear-everything affordance exactly when a long
 * filtered list is the reason you want it.
 *
 * The negative margins and the matching \`top\` pull the sticky edge out to \`.side-scroll\`'s border
 * box, past its 10px padding: without them the head would stop 10px down and content would keep
 * scrolling visibly through the gap above it. The background is opaque for the same reason - a
 * transparent sticky header is a sticky header with the list running through it. */
.side-filterhead {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 2px 10px;
  margin: -10px -10px 4px;
  padding-left: 12px;
  padding-right: 12px;
  border-bottom: 1px solid var(--border-2);
  position: sticky;
  top: -10px;
  z-index: 3;
  background: var(--surface);
}
.sf-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text);
}
.sf-badge {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 4px;
  background: var(--accent);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  font-family: var(--mono);
  border: none;
  cursor: pointer;
  position: relative;
  transition: background-color 0.12s;
}
/* The global Filter total's hover treatment lives at the end of this sheet: a real element swap in
   a NEUTRAL colour. A red \`::after\` cross over a merely-transparent number puts two crosses on
   screen, and takes its red from \`--danger\`, which in a red-branded deployment is the accent. */

/* sections: a hairline rule between them, chevron on the RIGHT (the e-commerce convention) */
.facet {
  border-bottom: 1px solid var(--border-2);
  border-radius: 0;
}
.facet-head {
  height: auto;
  min-height: 44px;
  padding: 10px 10px;
  gap: 10px;
  border-radius: 6px;
}
.facet-head:focus-visible {
  outline-offset: -2px;
} /* inset, so it never lands on the text */
.special:focus-visible {
  outline-offset: -2px;
}
.facet-head:hover {
  background: none;
}
.facet-head:hover .fh-label {
  color: var(--accent);
}
.fh-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  min-width: 0;
  flex: 1;
}
/* the selected values, readable WITHOUT expanding the section */
.fh-sel {
  font-size: 11px;
  color: var(--dim);
  max-width: 100%;
  white-space: normal;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.facet.open .fh-sel {
  display: none;
} /* redundant once the values are visible below */
.facet-head .chev {
  margin-left: 0;
  transition: transform 0.2s;
}
.facet.open .facet-head .chev {
  transform: rotate(90deg);
} /* right -> down, not left */
.facet-head .badge,
.facet-head .fh-count {
  margin-left: 0;
}

/* per-facet search + a capped, scrollable value list (a facet may hold thousands of values) */
.fval-search {
  width: 100%;
  margin: 2px 0 8px;
  padding: 7px 9px;
  border-radius: var(--r-sm);
  border: 1px solid var(--border-2);
  background: var(--surface-2);
  color: var(--text);
  font-size: 12px;
}
.fval-search:focus {
  outline: none;
  border-color: var(--accent);
}
.fval-list {
  max-height: 240px;
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding-right: 2px;
}
.fval-list::-webkit-scrollbar {
  width: 8px;
}
.fval-list::-webkit-scrollbar-thumb {
  background: var(--border-2);
  border-radius: 4px;
}

/* interactive map: an on-demand upgrade over the instant SVG */
.map-slot {
  position: relative;
}
.map-zoom {
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid var(--border-2);
  background: var(--surface);
  color: var(--dim);
  font-size: 11px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}
.map-zoom:hover {
  color: var(--text);
  border-color: var(--accent);
}
.map-zoom:disabled {
  cursor: default;
  opacity: 0.7;
}
/* once Leaflet is mounted the SVG underneath is redundant */
.minimap.has-leaflet > svg {
  display: none;
}
.lmap {
  width: 100%;
  height: 220px;
  border-radius: var(--r-sm);
  overflow: hidden;
}
.miniwrap .lmap {
  height: 180px;
}
.leaflet-container {
  background: var(--surface-2);
  font: inherit;
}

/* Metadata view (overview) */
.fcard.collapsed {
  height: auto !important;
  align-self: start;
  min-height: 0;
}
.fcard.collapsed .fcard-vals,
.fcard.collapsed .within,
.fcard.collapsed .fcard-special-body {
  display: none;
}
/* a minimized card must not keep its 2-block height */
.fcard.collapsed[data-rows="2"] {
  height: auto !important;
}

/* (a wider card gets more columns automatically from the auto-fill grid on .fcard-vals) */

/* resize grip: now a 2-D handle (sideways AND up), so say so */
.fcard-resize {
  cursor: nwse-resize;
}

/* the sort control shows its mode, not just an icon */
.sortbtn {
  width: auto;
  gap: 4px;
  padding: 0 6px;
}
.sortlbl {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.02em;
}

/* time / bbox cards wear the same chrome as the facet cards, and their editor is always visible */
.fcard.fcard-sp .badge.on {
  background: var(--accent);
  color: #fff;
}
.fcard-special-body {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 6px 8px 8px;
}
/* Centred only while the content FITS. \`justify-content: center\` on a scroll container pushes
   overflow off both ends, and the start-side overflow is unreachable - which is how the From row
   ended up hidden beneath the card header. \`safe center\` falls back to start-alignment the moment
   the content is taller than the body. */
.fcard-special-body.time-body {
  display: flex;
  flex-direction: column;
  justify-content: safe center;
}
/* The inline editor is stretched to height:100% (so the bbox map can fill its card), which left
   nothing for the body's justify-content to centre. Centre the time picker's rows WITHIN that
   full-height editor instead. Only time - the bbox editor wants its map to fill. */
.fcard-special-body.time-body .editor.inline {
  justify-content: safe center;
}
/* the embedded editors size to the CARD instead of overflowing it */
.fcard-special-body .editor {
  border: none;
  box-shadow: none;
  padding: 0;
  background: none;
  width: auto;
}
.fcard-special-body .editor h5 {
  display: none;
} /* the card header already says what this is */
.fcard-special-body .minimap {
  width: 100%;
}
.fcard-special-body .minimap > svg {
  width: 100%;
  height: auto;
  display: block;
}

/* Leaflet attribution: required for OSM, but it was dominating a small card. Keep it, shrink it. */
.leaflet-control-attribution {
  font-size: 9px !important;
  padding: 0 4px !important;
  line-height: 1.4;
  background: rgba(255, 255, 255, 0.72) !important;
}
.leaflet-control-attribution a {
  color: var(--dim) !important;
  text-decoration: none;
}
.leaflet-control-zoom {
  margin: 6px !important;
}
.leaflet-control-zoom a {
  width: 22px !important;
  height: 22px !important;
  line-height: 22px !important;
  font-size: 14px !important;
}

/* overview: minimized rows must close up, not leave a hole */
.fcard.collapsed {
  height: auto !important;
  align-self: start;
  min-height: 0;
}

/* inline (in-card) editors: everything visible, nothing clipped */
.fcard-special-body {
  padding: 0 10px 10px;
}
.editor.inline {
  width: auto;
  padding: 0;
  border: none;
  box-shadow: none;
  background: none;
  gap: 6px;
}
.editor.inline h5 {
  display: none;
} /* the card header already names it */
.editor.inline .preview {
  display: none;
} /* the terminal shows the query; a card has no room */
.editor.inline .mode-help {
  font-size: 10.5px;
  line-height: 1.35;
}
.editor.inline .daterow {
  gap: 6px;
}
.editor.inline .daterow input {
  min-width: 0; /* a grid item's default \`min-width: auto\` would let the field push the row wider */
}
.editor.inline .modes {
  gap: 4px;
}
.editor.inline .modes .btn {
  padding: 3px 8px;
  font-size: 11px;
}
.editor.inline .bbox-fields {
  gap: 5px;
}
.editor.inline .bbox-fields input {
  min-width: 0;
}
.editor.inline .draw-hint {
  font-size: 10.5px;
}
/* the map scales to the card instead of overflowing it */

/* time / bbox blocks: same family, and legible inside one block */
.fcard.fcard-sp .fcard-special-body {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: auto;
}
.editor.inline {
  display: flex;
  flex-direction: column;
  gap: 7px;
  height: 100%;
  min-height: 0;
}

/* the map takes the room that's left, so it fills the block instead of being a squashed strip */
.editor.inline .map-slot {
  flex: 1 1 auto;
  min-height: 130px;
  display: flex;
}
.editor.inline .minimap {
  flex: 1;
  display: flex;
  min-height: 130px;
}
.editor.inline .lmap {
  flex: 1 1 auto;
  height: auto;
  min-height: 130px;
}
.editor.inline .minimap > svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* bounds/dates: a tight 2-up grid rather than four stacked rows that overflow the card */
.editor.inline .bbox-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}
.editor.inline .bbox-fields .f {
  display: flex;
  align-items: center;
  gap: 4px;
}
.editor.inline .bbox-fields label {
  font-size: 10px;
  color: var(--faint);
  min-width: 34px;
}
.editor.inline .bbox-fields input {
  width: 100%;
  padding: 4px 6px;
  font-size: 11px;
}
/* THREE children, THREE columns: label, text field, calendar button.
   Declaring only \`34px 1fr\` puts the calendar button on an implicit second grid row, making each
   date row two lines tall. Two of those plus the mode buttons overflow the card body, and because
   the body centres its content the overflow goes off BOTH ends, clipping the From row under the
   card header. The third column is what holds it, not a taller card. */
.editor.inline .daterow {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) auto;
  align-items: center;
}
.editor.inline .daterow label {
  font-size: 10px;
  color: var(--faint);
}
.editor.inline .daterow input {
  padding: 5px 7px;
  font-size: 11.5px;
}
/* the mode help is one line in a card - the full text lives in the popover editor */
.editor.inline .mode-help {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 10px;
  color: var(--faint);
}
.editor.inline .draw-hint {
  display: none;
} /* the map itself says "drag" well enough in a card */

/* Leaflet: a container with a REAL height (never a % inside a flex chain), and the Draw/Pan
       toggle. A 0-height container is what makes Leaflet mis-tile and mis-map its coordinates. */
.lmap {
  position: relative;
  min-height: 130px;
  background: var(--surface-2);
  isolation: isolate; /* contain Leaflet's high pane z-indexes so the map never paints over the terminal (z-index 80) */
}
.lmap.drawing,
.lmap.drawing .leaflet-grab {
  cursor: crosshair;
}
/* While a rectangle is being dragged the pointer sweeps across the +/- controls and the attribution,
   and the browser treats that as a text selection - the controls light up with the selection
   highlight mid-gesture. Suppressing selection for the duration of Draw mode, on this map only,
   removes the highlight without touching hit-testing: the controls are still clickable, still
   focusable, still keyboard-activatable, and Pan mode selects text normally again. */
.lmap.drawing,
.lmap.drawing * {
  user-select: none;
  -webkit-user-select: none;
}
.lmap-mode {
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 500; /* above Leaflet panes */
  padding: 4px 9px;
  border-radius: 999px;
  border: 1px solid var(--border-2);
  background: var(--surface);
  color: var(--dim);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}
.lmap-mode.on {
  border-color: var(--accent);
  color: var(--accent);
}
.lmap-mode:hover {
  color: var(--text);
}

/* Leaflet hygiene 
   Leaflet sizes and positions its tiles in JS assuming ITS OWN css. Application-wide resets that
   reach inside \`.leaflet-container\` are the classic cause of a mosaic-looking map, so we explicitly
   keep our resets out of it. */
.freva-db .leaflet-container,
.freva-db .leaflet-container * {
  box-sizing: content-box;
}
.freva-db .leaflet-container img {
  max-width: none !important;
  max-height: none !important;
}
.freva-db .leaflet-pane,
.freva-db .leaflet-tile,
.freva-db .leaflet-marker-icon {
  position: absolute;
}
.freva-db .leaflet-tile {
  padding: 0;
  border: 0;
}

/* Controls: two labelled TASK modes on top; view/details/export in the result bar.
   (Four icon-only buttons in a row answered three different questions at once.) */
.ctrl-cluster .ctrl {
  width: auto;
  height: 30px;
  padding: 0 11px;
  gap: 6px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
}
.ctrl-lbl {
  font-size: 12.5px;
  font-weight: 650;
  letter-spacing: 0.005em;
}

/* status text, not a control - a pill shape here reads as clickable */
.scope-lbl {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--faint);
}
.view-lbl {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--faint);
}

/* labelled buttons in the result bar */
.tbtn {
  width: auto;
  height: 30px;
  padding: 0 10px;
  gap: 6px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  border: 1px solid transparent;
}
.tbtn:hover {
  background: var(--surface-2);
  color: var(--accent);
}
/* Export locked past the 100k ceiling: greyed out, not-allowed cursor, no hover lift. The click
   handler already refuses to export; this makes it LOOK unavailable. Hover still shows the tooltip. */
.tbtn.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
  color: var(--dim);
}
.tbtn.is-disabled:hover {
  background: transparent;
  color: var(--dim);
}
.tbtn[hidden] {
  display: none;
}
.tbtn.on {
  color: var(--accent);
  background: var(--surface-2);
  border-color: var(--border);
}
.tbtn-lbl {
  font-size: 12px;
  font-weight: 600;
}
@media (max-width: 760px) {
  .tbtn-lbl,
  .view-lbl,
  .scope-lbl {
    display: none;
  }
}

/* overview: share-of-result-set bar per value
   The bar is the value's share of the WHOLE result set (count / totalCount), so a bar means the
   same thing in every card and cards can be compared with each other. A per-card scale makes every
   card's top value look "full", so \`historical\` (17%) and \`cmip6\` (56%) read alike.

   Drawn as a tinted fill BEHIND the row via ::before - no extra DOM node, and it reads as a bar
   chart rather than an underline. \`--pct\` is set per row, by BOTH panels: the overview's cards and
   the sidebar's filter lists draw the same bar off the same helper, so one value is one length
   wherever a reader meets it. The positioning context is on \`.fval\` itself (see the base rule),
   not on \`.fcard .fval\`, so both panels can carry a bar. */
.fcard .fval {
  border-radius: 6px;
}
.fval.has-bar::before {
  content: "";
  position: absolute;
  z-index: -1;
  left: 0;
  top: 2px;
  bottom: 2px;
  width: var(--pct, 0%);
  min-width: 2px;
  border-radius: 5px;
  /* derived from the accent so re-theming (any --accent) recolours every bar in one place */
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 18%, transparent),
    color-mix(in srgb, var(--accent) 6%, transparent)
  );
  transition: width 0.18s ease;
}
.fval.has-bar:hover::before {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 26%, transparent),
    color-mix(in srgb, var(--accent) 9%, transparent)
  );
}
.fval.sel.has-bar::before {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 36%, transparent),
    color-mix(in srgb, var(--accent) 13%, transparent)
  );
}
/* Dark mode: the same accent needs more alpha to read on the dark surface. Still derived from
   --accent, so a custom accent recolours the dark bars too. */
.freva-db[data-theme="night"] .fval.has-bar::before {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 36%, transparent),
    color-mix(in srgb, var(--accent) 15%, transparent)
  );
}
.freva-db[data-theme="night"] .fval.has-bar:hover::before {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 50%, transparent),
    color-mix(in srgb, var(--accent) 21%, transparent)
  );
}
.freva-db[data-theme="night"] .fval.sel.has-bar::before {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--accent) 64%, transparent),
    color-mix(in srgb, var(--accent) 27%, transparent)
  );
}
/* the count must stay readable where the bar runs under it */
.fcard .fval .n {
  position: relative;
  z-index: 1;
}

/* data-inspector: themed to the databrowser (blue), auto-following light/night
   The <data-inspector> (imported lazily) renders inside .freva-db, so our design tokens are in
   scope. We map them onto the component's public knobs (--di-*), so the modal follows the app theme
   instead of prefers-color-scheme. On top of that:
     \u2022 a solid blue header - there is no --di-header-bg knob, so we colour .di-header directly and
       flip its text to white (this mirrors what other embedders like grid-doctor do);
     \u2022 the Load button is inverted (white-on-blue) so it doesn't vanish into the header;
     \u2022 the xarray repr caps itself at max-width:700px, which reads as "left-aligned" in the wide
       modal - we lift the cap so metadata fills the width, like grid-doctor's docs.
   These header/xr overrides target the package's internal classes and are therefore version-coupled;
   they degrade gracefully (a class rename just falls back to the component's own defaults). */
.freva-db data-inspector {
  --di-bg: var(--surface);
  --di-fg: var(--text);
  --di-muted: var(--dim);
  --di-border: var(--border);
  --di-surface: var(--surface-2);
  --di-accent: var(--accent);
  /* The xarray repr colours default to a fixed LIGHT palette (--jp-* and white fallbacks), so
     the metadata table ignored the app theme. Map them onto our tokens so the table follows light/night. */
  --xr-font-color0: var(--text);
  --xr-font-color2: var(--dim);
  --xr-font-color3: var(--dim);
  --xr-border-color: var(--border);
  --xr-disabled-color: var(--dim);
  --xr-background-color: var(--surface);
  --xr-background-color-row-even: var(--surface);
  --xr-background-color-row-odd: var(--surface-2);
  /* The chunk-cube diagram (shown on an expanded variable) defaults to Freva's brown
     (#9b7a52). Shade it from our accent so it reads as the dominant blue, in both themes. */
  --xr-chunk-face: var(--accent);
  --xr-chunk-top: color-mix(in srgb, var(--accent) 68%, #fff);
  --xr-chunk-side: color-mix(in srgb, var(--accent) 80%, #000);
  --xr-chunk-edge: color-mix(in srgb, var(--accent) 38%, #fff);
}
.freva-db data-inspector .di-header {
  background: var(--accent);
  border-bottom: none;
}
.freva-db data-inspector .di-header .di-title,
.freva-db data-inspector .di-header .di-title-ico,
.freva-db data-inspector .di-header .di-pathbar-label,
.freva-db data-inspector .di-header .di-muted,
.freva-db data-inspector .di-header .di-close {
  color: #fff;
}
.freva-db data-inspector .di-header .di-close:hover {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}
.freva-db data-inspector .di-header .di-btn-primary {
  background: #fff;
  border-color: #fff;
  color: var(--accent);
}
.freva-db data-inspector .di-header .di-btn-primary:hover:not(:disabled) {
  filter: none;
  background: rgba(255, 255, 255, 0.88);
}
.freva-db data-inspector .di-header .di-btn-split {
  border-left-color: rgba(0, 0, 0, 0.12);
}
/* Let the metadata fill the modal instead of the built-in 700px cap. */
.freva-db data-inspector .xr-wrap {
  max-width: none;
}
/* Production hardening. Each block names the defect it removes. */

/* Screen-reader-only utilities
   Used by the in-field search status and, when \`features.footer:false\`, by the status region.
   \`display:none\` / \`visibility:hidden\` would take the node OUT of the accessibility tree and
   silence the live region - which is the whole reason this class exists. */
.freva-db .sr-only,
.freva-db .sr-status {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

/* Footer as an independent option
   The grid drops to two rows, so the strip consumes NO height (rather than being painted and then
   hidden, which still reserves its track). */
.freva-db .fdb-app.no-footer {
  grid-template-rows: auto 1fr;
}

/* Overlays are COMPONENT-scoped, not viewport-scoped
   All three overlay owners now append to \`.freva-db\` and are positioned absolutely in its
   coordinate space by anchor.ts. \`position: fixed\` here would re-introduce exactly the embedded-host
   bug that fix exists to remove (a transformed/contained ancestor changes what \`fixed\` resolves
   against, and an \`overflow:hidden\` mount clips whatever lands outside it). */
.freva-db .fdb-tip {
  position: absolute;
  /* A very long unbroken label - a deep path, an ensemble id - must not push the bubble past a
     viewport edge, and must not render as one unwrappable line. */
  max-inline-size: min(280px, calc(100vw - 16px));
  overflow-wrap: anywhere;
  word-break: normal;
}

/* Chips: one long value cannot own the row
   Without a bounded, ellipsised label an unbroken value stretched its chip past the available
   width, pushing Clear all and the Browse/Overview cluster off a phone screen. The full value stays
   available as the tooltip and the accessible name. */
.freva-db .chip {
  min-width: 0;
  max-width: 100%;
}
.freva-db .chip-label {
  min-width: 0;
  max-inline-size: min(22ch, 60vw);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* The NEGATIVE chip is neutral - dotted, hatched, struck on the value only. \`--danger\` red says
   nothing in a red-branded deployment, in greyscale or in forced colours. Its rules live at the end of this sheet with the rest of the language. */
/* An IMMUTABLE base-scope indicator. Not a button: there is nothing to click, and "Clear all"
   deliberately does not touch it. */
.freva-db .chip.scope {
  background: var(--surface-3);
  color: var(--dim);
  border: 1px solid var(--border);
  cursor: default;
  font-weight: 600;
}

/* The top row wraps DETERMINISTICALLY at phone widths
   Chips take a full-width row of their own; Clear all and the Browse/Overview cluster share the
   next one. Nothing is absolutely positioned, so they cannot overlap however long the labels get.
   An empty chip row collapses instead of leaving a blank strip. */
.freva-db .chips.empty {
  display: none;
}
@media (max-width: 430px) {
  .freva-db .toprow {
    flex-wrap: wrap;
    align-items: center;
    row-gap: 8px;
  }
  .freva-db .toprow > .chips {
    flex: 1 0 100%; /* own row */
    order: 1;
  }
  .freva-db .toprow > .clear-btn {
    order: 2;
  }
  .freva-db .toprow > .ctrl-cluster {
    order: 3;
    margin-left: auto; /* the following row, right-aligned - never overlapping the chips */
  }
  .freva-db .chip-label {
    max-inline-size: min(18ch, 52vw);
  }
}

/* The list header stays visible
   It sticks INSIDE \`.results-scroll\` (it deliberately stays out of \`.rows\`, whose children are
   counted by the incremental append). Overview/terminal content above it scrolls away first,
   because sticking only begins once the header reaches the top of the scroller. */
.freva-db .results-scroll .list-head {
  position: sticky;
  top: 0;
  z-index: 6; /* above rows, below the pickbar/popovers/toasts */
  /* Opaque: rows scrolling underneath a translucent header is unreadable. A z-index alone would
     only put the strip BEHIND the header. What holds is that there is no band for rows to occupy
     (see \`.results-scroll\`'s padding); this keeps whatever does pass under it hidden. */
  background: var(--surface-2);
  box-shadow: 0 1px 0 var(--border);
  /* SQUARE top corners. The header's background is opaque, but a rounded corner is not part of the
     background - it is a hole, and a row passing underneath shows through the two little curved
     wedges at the top left and top right. There is no honest way to round the corner of something
     other content slides beneath, so the corner goes rather than the opacity. \`.rows\` already
     squares its own top corners when the header is present, so the two still read as one table. */
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

/* The comparison matrix has a bounded height
   Growing with the number of differing fields would push the rest of the Details panel out of
   reach. A SHORT comparison still uses only the height it needs (max-height, not height). */
.freva-db .dscroll {
  max-height: clamp(180px, 38vh, 360px);
  overflow: auto; /* both axes */
}
.freva-db .dmatrix thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--surface-2); /* opaque, or the scrolled rows show through the header */
}

/* Include / exclude, side by side
   TWO sibling controls. Nesting a button inside the button-like value row would be invalid HTML and
   unreliable for AT and touch. */
.freva-db .fval-row {
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
}
.freva-db .fval-row > .fval {
  flex: 1;
  min-width: 0;
}
.freva-db .fval-ex {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 5px;
  border: 1px solid transparent;
  background: none;
  color: var(--faint);
  font-family: inherit;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  /* Compact on pointer devices: revealed on hover/focus-within, so the row stays calm. */
  opacity: 0;
  transition: opacity 0.12s;
}
.freva-db .fval-row:hover .fval-ex,
.freva-db .fval-row:focus-within .fval-ex,
.freva-db .fval-ex:focus-visible,
.freva-db .fval-ex.on {
  opacity: 1;
}
.freva-db .fval-ex:hover {
  background: color-mix(in srgb, var(--danger) 12%, transparent);
  color: var(--danger);
}
.freva-db .fval-ex.on {
  color: var(--danger);
  border-color: color-mix(in srgb, var(--danger) 45%, transparent);
  background: color-mix(in srgb, var(--danger) 12%, transparent);
}
/* An EXCLUDED value in a FACET LIST: struck through, \`!=\`-marked and latched with a dashed control.
   The strike belongs here - a value list is a set of things you are choosing between, and the line
   is what shows at a glance which ones are out. The top-level CHIPS are the opposite case: there
   the value IS the label you have to read, so those are left unstruck. */
.freva-db .fval.excl .nm {
  text-decoration: line-through;
  text-decoration-thickness: 1px;
}
.freva-db .fval.excl {
  color: var(--danger);
}
/* On a touch layout there is no hover, so the control must be permanently discoverable. */
@media (hover: none), (pointer: coarse) {
  .freva-db .fval-ex {
    opacity: 1;
  }
}

/* Selection cap */
.freva-db .cb.capped {
  opacity: 0.4;
  cursor: not-allowed;
}
.freva-db .pickbar .cnt.at-cap b {
  color: var(--warn);
}

/* Remote source-file list */
.freva-db .dl-pop {
  width: min(460px, calc(100% - 24px));
}
.freva-db .dl-head {
  font-weight: 700;
  font-size: 13px;
  padding: 4px 8px 2px;
}
.freva-db .dl-note {
  font-size: 11.5px;
  color: var(--dim);
  padding: 0 8px 8px;
  line-height: 1.5;
}
.freva-db .dl-list {
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.freva-db .dl-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 8px;
  border-radius: 7px;
  color: var(--text);
  text-decoration: none;
  font-size: 12.5px;
  min-width: 0;
}
.freva-db .dl-item:hover {
  background: var(--surface-2);
}
.freva-db .dl-name {
  font-weight: 600;
  flex-shrink: 0;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.freva-db .dl-path {
  color: var(--faint);
  font-family: var(--mono);
  font-size: 10.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  direction: rtl; /* keep the informative TAIL of a long path visible */
  text-align: left;
}

/* Native date picker beside the text field
   The text input remains the source of truth (it is the only one that can express YYYY, YYYY-MM
   and open bounds); the native input exists solely to raise the platform calendar. */
.freva-db .date-pickwrap {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
}
.freva-db .date-pick {
  width: 30px;
  height: 30px;
  display: inline-grid;
  place-items: center;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--dim);
  cursor: pointer;
}
.freva-db .date-pick:hover {
  border-color: var(--border-2);
  color: var(--text);
}
/* Present for showPicker()/focus(), but never a second visible field or a tab stop. */
.freva-db .date-native {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  border: 0;
  padding: 0;
}

/* Flavour control: a real control, not a caption
   Layout only - the switching logic was already correct. */
.freva-db .lens {
  height: 43px;
  min-width: 160px;
  padding: 0 12px;
  gap: 10px;
  background: var(--surface); /* opaque - it sits over the top bar, not in it */
  border-color: var(--border-2);
  box-shadow: 0 1px 2px rgba(16, 28, 52, 0.06);
}
.freva-db .lens .v {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
.freva-db .lens svg {
  flex-shrink: 0;
  margin-left: auto; /* the caret stays pinned at the far edge as the value flexes */
}
/* The menu is never narrower than the control it drops from. */
.freva-db .lens-pop {
  min-width: 170px;
}
.freva-db .lens-pop .pop-item {
  padding: 9px 11px;
}
.freva-db .lens-pop .pop-item.on {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}
@media (max-width: 680px) {
  /* Dropping the FLAVOUR caption is fine; a usable value width and touch target are not optional. */
  .freva-db .lens {
    min-width: 108px;
    height: 42px;
  }
}

/* Search is the primary control */
.freva-db .search input {
  height: 45px;
  font-size: 14.5px;
  background: var(--surface); /* opaque, so it reads as raised rather than as part of the bar */
  border-color: color-mix(in srgb, var(--accent) 35%, var(--border));
  padding-right: 38px; /* the reserved spinner slot */
}
.freva-db .search .ic {
  color: var(--accent);
}
.freva-db .search input::placeholder {
  /* Explicit colour AND opacity:1 - the UA default is a low-opacity render of the text colour,
     which lands well under 4.5:1 and differs between engines. */
  color: var(--faint);
  opacity: 1;
}
.freva-db .search input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
/* The slot is ALWAYS reserved; only visibility changes, so showing the spinner shifts nothing. */
/* The field's right-hand furniture: the spinner's reserved slot. One element, so the input's right
   padding is a single number rather than a running sum. */
.freva-db .search-aside {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  pointer-events: none; /* the field underneath stays clickable across its whole width */
}
.freva-db .search-spin {
  display: grid;
  place-items: center;
  visibility: hidden;
  color: var(--accent);
}
.freva-db .search-spin.show {
  visibility: visible;
}
@media (prefers-reduced-motion: reduce) {
  /* Still visibly BUSY, just not spinning: a static ring rather than nothing at all. */
  .freva-db .search-spin .spin {
    animation: none;
    border-top-color: currentColor;
    opacity: 0.85;
  }
}

/* Small-text legibility
   Meaningful 9.5-10px labels move to 11px where the space exists. Hierarchy comes from weight,
   spacing and grouping - not from making text too faint to read. */
.freva-db .dmatrix thead th,
.freva-db .list-head,
.freva-db .dl-path,
.freva-db .fval .n {
  font-size: 11px;
}
.freva-db .scope-note,
.freva-db .more-info {
  font-size: 11.5px;
}
.freva-db input::placeholder,
.freva-db textarea::placeholder {
  color: var(--faint);
  opacity: 1;
}
/* Disabled text still has to be READ to be understood. 0.5 alpha on --dim does not clear 4.5:1. */
.freva-db .btn:disabled,
.freva-db [aria-disabled="true"] {
  opacity: 0.72;
}

/* 1,000-row interaction cost
   \`content-visibility\` lets the engine skip layout and paint for rows that are off screen.
   \`contain-intrinsic-size\` supplies a placeholder box so the scrollbar stays honest and the
   scroll position does not jump. Checked in Chromium against focus, keyboard navigation, the
   sticky list header and scrolling. Engines that ignore these properties simply render every row,
   exactly as before - the fallback is doing nothing. */
.freva-db .rows > .row {
  content-visibility: auto;
  contain-intrinsic-size: auto 48px;
}
.freva-db .grid > .gcard {
  content-visibility: auto;
  contain-intrinsic-size: auto 132px;
}
/* At or above the documented threshold (MANY_RESULTS_THRESHOLD = 500 loaded rows) the side panels
   stop ANIMATING their width. A width transition on a panel re-lays-out the centre column on every
   animation frame; with 1,000 rows in it, that is the measured cost of opening Details or
   collapsing the sidebar. The panels still change state instantly - only the tween is dropped. */
.freva-db.many-results .side,
.freva-db.many-results .details-panel {
  transition: none;
}
@media (max-width: 1100px) {
  /* Where the details panel is already an OVERLAY it does not reflow the grid, so its motion is
     compositor-only and can stay. */
  .freva-db.many-results .details-panel {
    transition: transform 0.18s ease;
  }
}

/* The top bar fits a phone
   At 320px the brand, the flavour control, the search field and four icon buttons cannot all keep
   their comfortable sizes. Rather than let the bar set a min-content width that pushes the entire
   app off screen, the negotiable parts give way in a defined order: the brand mark stays, the
   flavour control shrinks to a usable-but-tight touch target, and the search field keeps the rest. */
@media (max-width: 430px) {
  .freva-db .top {
    gap: 6px;
    padding: 0 8px;
  }
  .freva-db .lens {
    min-width: 84px;
    padding: 0 8px;
    gap: 4px;
  }
  .freva-db .search input {
    padding-left: 34px;
    padding-right: 32px;
  }
  .freva-db .search .ic {
    left: 10px;
  }
}

/* INCLUSION vs EXCLUSION - told apart by CHARACTER and SHAPE, not by colour

   The host's accent is configurable and may itself be red, so "accent = kept, red = removed" is not
   a distinction at all in some deployments - and it is none whatsoever in greyscale, in
   \`forced-colors\`, or to a colour-blind reader. Every surface carries the meaning twice:

     +N   kept      a FILLED badge, and the control that clears ONLY the kept values
     -N   removed   a DASHED outlined badge, and the control that clears ONLY the removed ones
     !=   an excluded VALUE, struck through, on a dotted hatched chip

   Colour still reinforces all of it; it is simply never the only carrier. */

/* The per-facet +N / -N clear buttons */
.freva-db .fh-count {
  position: relative;
  display: inline-grid;
  place-items: center;
  /* Sized by the COUNT either way, so swapping in the cross cannot make the header jump.
     \`--fb-ch\` is the count's character length, set when the button is built. */
  min-width: calc(var(--fb-ch, 2) * 1ch + 16px);
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 10.5px;
  font-weight: 800;
  line-height: 16px;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  flex: none;
  transition: background-color 0.12s;
}
.freva-db .fh-count.fb-inc {
  background: var(--accent);
  color: #fff;
}
.freva-db .fh-count.fb-exc {
  background: transparent;
  /* \`currentColor\`, not the danger colour: in forced-colors the dash survives and the hue need not.
     The dashes ARE the signal. */
  border: 1px dashed currentColor;
  color: var(--text);
  font-weight: 700;
}
/* The count and the cross occupy the SAME grid cell and exactly one is rendered. Fading a cross in
   on top of a number leaves both readable at once, which is what "no overlap" rules out. */
.freva-db .fh-count > .fb-n,
.freva-db .fh-count > .fb-x {
  grid-area: 1 / 1;
}
.freva-db .fh-count > .fb-x {
  display: none;
  font-size: 13px;
  font-weight: 800;
  line-height: 1;
  /* NEUTRAL - the button's own text colour, never \`--danger\` and never the accent, both of which
     can be the same red in a themed deployment. */
  color: currentColor;
}
.freva-db .fh-count:hover > .fb-n,
.freva-db .fh-count:focus-visible > .fb-n {
  display: none;
}
.freva-db .fh-count:hover > .fb-x,
.freva-db .fh-count:focus-visible > .fb-x {
  display: block;
}
/* Hover changes what is WRITTEN, not what shape the badge is: solid stays solid, dashed dashed. */
.freva-db .fh-count.fb-inc:hover,
.freva-db .fh-count.fb-inc:focus-visible {
  background: color-mix(in srgb, var(--accent) 78%, var(--text));
  outline: none;
}
.freva-db .fh-count.fb-exc:hover,
.freva-db .fh-count.fb-exc:focus-visible {
  background: color-mix(in srgb, currentColor 10%, transparent);
  outline: none;
}

/* The facet header is a ROW of siblings, never nested buttons */
.freva-db .facet-head {
  display: flex;
  align-items: center;
  gap: 6px;
}
.freva-db .facet-head > .fh-toggle {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
}
.freva-db .facet-head > .fh-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 6px;
}

/* The GLOBAL Filter total: ONE number, swapped for ONE cross */
.freva-db .sf-badge {
  position: relative;
  display: inline-grid;
  place-items: center;
  min-width: calc(var(--fb-ch, 1) * 1ch + 14px);
  height: 20px;
  padding: 0 6px;
  border-radius: 4px;
  background: var(--accent);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
}
.freva-db .sf-badge > .sf-n,
.freva-db .sf-badge > .sf-x {
  grid-area: 1 / 1;
}
.freva-db .sf-badge > .sf-x {
  display: none;
  font-size: 14px;
  line-height: 1;
  color: currentColor;
}
.freva-db .sf-badge:hover > .sf-n,
.freva-db .sf-badge:focus-visible > .sf-n {
  display: none;
}
.freva-db .sf-badge:hover > .sf-x,
.freva-db .sf-badge:focus-visible > .sf-x {
  display: block;
}

/* An excluded VALUE, in the lists */
.freva-db .fval-row.excl .nm,
.freva-db .fval.excl .nm,
.freva-db .fval.excl .fv-t {
  text-decoration: line-through;
  text-decoration-thickness: 1px;
}
.freva-db .fval-row.excl .nm::before,
.freva-db .fval.excl .nm::before,
.freva-db .fval.excl .fv-t::before {
  content: "\\2260\\00a0";
  text-decoration: none;
  display: inline-block;
  font-weight: 700;
}
.freva-db .fval-row.excl .fval-ex,
.freva-db .fval-row .fval-ex[aria-pressed="true"] {
  border: 1px dashed currentColor;
  border-radius: 5px;
}

/* Negative top-level chips: neutral, dotted, hatched */
/* No \`--danger\`, no red, no accent. The chip reads as "removed" from its dotted outline, its \`NOT\`
   tag, its \`!=\` operator and a subtle static hatch - all theme-neutral, so the same treatment works
   in a dark theme, a light one and a red-branded deployment alike. */
.freva-db .chip.neg {
  border: 1px dotted var(--border-2);
  color: var(--text);
  background-color: var(--surface-2);
  /* Built from the TEXT colour at low alpha, so it follows the theme rather than carrying one of
     its own, and it is static - a moving pattern behind a label is unreadable. */
  background-image: repeating-linear-gradient(
    -45deg,
    color-mix(in srgb, var(--text) 9%, transparent) 0 1px,
    transparent 1px 6px
  );
}
.freva-db .chip.neg .chip-label {
  display: inline-flex;
  align-items: baseline;
  min-width: 0;
  overflow: hidden;
}
.freva-db .chip.neg .chip-k,
.freva-db .chip.neg .chip-op,
.freva-db .chip.neg .chip-tag,
.freva-db .chip.neg .x {
  color: var(--text);
  text-decoration: none;
}
/* The value is NOT struck through: the dotted outline, the hatch, \`NOT\` and \`!=\` carry the meaning,
   and an unstruck value stays legible - which matters most for the long ones. */
.freva-db .chip.neg .chip-v {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.freva-db .chip.neg .chip-tag {
  background: none;
  border: 1px dotted currentColor;
  border-radius: 3px;
  padding: 0 3px;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.04em;
  opacity: 0.85;
}
.freva-db .chip.neg .x {
  opacity: 0.9;
}

@media (forced-colors: active) {
  /* No hatch survives forced colours, and none is needed: the dotted border, \`NOT\` and \`!=\` carry
     it on their own. */
  .freva-db .chip.neg {
    background-image: none;
    border-style: dotted;
  }
  .freva-db .fh-count.fb-inc {
    border: 1px solid CanvasText;
  }
  .freva-db .fh-count.fb-exc {
    border: 1px dashed CanvasText;
  }
  .freva-db .fval-row.excl .fval-ex {
    border-style: dashed;
  }
}

/* The File Inspector, modal. */

/*
 * The Inspector is a \`<dialog>\` opened with \`showModal()\`, so the browser puts
 * it in the top layer: laid out against the viewport, painted over everything,
 * with the rest of the document inert. What it needs from CSS is only that the
 * element inside stops trying to be the modal itself.
 *
 * The packaged element renders its own full-screen dimmer and centres a panel
 * inside it, with both the panel and its body sized in \`vh\`. Inside a dialog
 * that is a second modal inside the first, and the viewport units are measured
 * against the whole screen while the box they live in is not, which pushes the
 * header off the top and the actions off the bottom. So the dimmer becomes an
 * ordinary flex box, the dialog carries the geometry, and the body is the only
 * thing that scrolls.
 */
.freva-db.fdb-inspector-dialog[open] {
  display: flex;
  flex-direction: column;
  /* The panel sits in the middle of the frame; the frame is the whole band. */
  justify-content: center;
}
.freva-db.fdb-inspector-dialog {
  /* The component root's own \`position: relative; height: 100%\` are for a widget
     filling a mount, and this is a dialog sizing itself to its content. */
  position: fixed;
  height: auto;
  width: min(1100px, 96vw);
  max-width: 96vw;
  /*
   * A *definite* height, not a cap - and this is the load-bearing line.
   *
   * With \`max-height\` alone the dialog's height stays "auto, then clamped", and
   * an auto-height flex container does not make its items shrink: they lay out
   * at their content size and overflow the clamp. Everything below inherits
   * that indefiniteness, which is why the panel kept growing out of the box no
   * matter how many \`min-height: 0\`s went into the chain.
   *
   * So the dialog is a full-height transparent frame with the panel centred in
   * it, and every child below has something definite to resolve against.
   * Dynamic units, so a mobile browser's collapsing toolbars cannot hide a row.
   */
  height: 92dvh;
  max-height: 92dvh;
  padding: 0;
  border: 0;
  background: none;
  /* The dialog is the boundary; nothing inside it may paint past it. */
  overflow: hidden;
  color: inherit;
}
.freva-db.fdb-inspector-dialog::backdrop {
  /* The dim, drawn here rather than by the element. From the top layer it covers
     the whole viewport, which is the point: the header and the footer dim too. */
  background: rgba(15, 23, 42, 0.55);
}
/*
 * The custom element itself, which is a box like any other.
 *
 * \`<data-inspector>\` sits between the dialog and everything the element draws.
 * Left unstyled it is an ordinary auto-height block, and it is the first and
 * quietest break in the chain from the dialog's height down to the scrolling
 * body - a chain only as definite as its least definite link.
 */
.freva-db.fdb-inspector-dialog > data-inspector {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}

/*
 * The element's dimmer becomes an ordinary box inside the dialog.
 *
 * It keeps its node - its key handler is bound to it - and loses everything
 * that would make it a modal in its own right: the fixed positioning, the
 * full-screen inset, the dim (the dialog's \`::backdrop\` draws that), the
 * padding, and \`align-items: center\`, which centres a panel taller than the box
 * and lets it overflow off the top of the screen.
 *
 * It is a *shrinkable* flex column, which is the part that matters: it is the
 * first link in the chain from the dialog's height down to the scrolling body,
 * and a link that cannot shrink breaks the whole chain.
 */
.freva-db.fdb-inspector-dialog .di-backdrop {
  position: static;
  inset: auto;
  z-index: auto;
  padding: 0;
  background: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  flex: 1 1 auto;
  min-height: 0;
}
/*
 * The panel is the dialog's one flex item and shrinks with it.
 *
 * Not \`max-height: 100%\`: the dialog's height is \`auto\` capped by \`max-height\`,
 * and a percentage against an indefinite height resolves to nothing at all.
 * \`flex: 1 1 auto\` with \`min-height: 0\` is what actually makes a flex item
 * smaller than its content - the automatic minimum size is the reason panels
 * like this one grow through the bottom of the box that holds them.
 */
.freva-db.fdb-inspector-dialog .di-modal {
  width: 100%;
  /* Grows to its content and stops at the frame - now that the frame is
     definite, \`100%\` is a real number and the panel can be smaller than it. */
  flex: 0 1 auto;
  min-height: 0;
  max-height: 100%;
}
/*
 * The one unclassed box in the chain.
 *
 * Between the panel and the scrolling body sits \`#nc-tabs-wrap\`, an ordinary
 * block. A block does not shrink, so the flex chain stopped there and the body
 * grew to its content with the panel following it out of the dialog. Making it
 * a shrinkable flex column is what connects the dialog's height to the body's.
 */
.freva-db.fdb-inspector-dialog #nc-tabs-wrap {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}
.freva-db.fdb-inspector-dialog #nc-tabs-wrap[hidden] {
  display: none;
}

/*
 * The header and the action row stay; only the body scrolls. \`min-height: 0\` is
 * the load-bearing part - without it the flex item refuses to shrink below its
 * content and the panel grows past the dialog again.
 */
.freva-db.fdb-inspector-dialog .di-body {
  flex: 1 1 auto;
  min-height: 0;
  max-height: none;
}
`;var Nr="freva.db.theme",Rr="freva.db.layout",Hr="freva.db.view",Pr="freva.db.sidebar";function Ze(e){try{return window.localStorage.getItem(e)}catch{return null}}function Ye(e,t){try{window.localStorage.setItem(e,t)}catch{}}function Vr(){return Ze(Nr)==="day"?"day":"night"}function Gr(e){Ye(Nr,e)}function Jr(e="results"){let t=Ze(Rr);return t==="overview"?"overview":t==="results"?"results":e}function Kr(e){Ye(Rr,e)}function jr(){return Ze(Hr)==="grid"?"grid":"list"}function Wr(e){Ye(Hr,e)}function Zr(e=!1){let t=Ze(Pr);return t==="collapsed"?!0:t==="open"?!1:e}function Yr(e){Ye(Pr,e?"collapsed":"open")}var Xr="freva.db.overview";function $r(){let e=Ze(Xr);if(!e)return null;let t=n=>{let r={};if(n&&typeof n=="object")for(let[a,s]of Object.entries(n)){let l=typeof s=="number"?s:Number(s);Number.isFinite(l)&&(r[a]=l)}return r},o=n=>Array.isArray(n)?n.filter(r=>typeof r=="string"):[];try{let n=JSON.parse(e),r=n.snapshot;return{sort:n.sort&&typeof n.sort=="object"?n.sort:{},collapsed:o(n.collapsed),h:t(n.h),span:t(n.span),order:o(n.order),addOpen:n.addOpen===!0,stacked:n.stacked===!0,stackSeen:o(n.stackSeen),snapshot:r&&Array.isArray(r.collapsed)&&r.span&&typeof r.span=="object"&&r.h&&typeof r.h=="object"?{collapsed:o(r.collapsed),span:t(r.span),h:t(r.h)}:null}}catch{return null}}function _r(e){try{Ye(Xr,JSON.stringify(e))}catch{}}var ea="freva.db.term.bg",ds=new Set(["black","ink","graphite","midnight","forest","plum","paper"]);function ta(){let e=Ze(ea);return e&&ds.has(e)?e:null}function oa(e){Ye(ea,e)}var na="freva.db.term.alpha";function ra(){let e=Number(Ze(na));return Number.isFinite(e)&&e>=.5&&e<=1?e:null}function aa(e){Ye(na,String(e))}function rn(e,t,o,n={}){let r=n.parts?[c("span",{class:"chip-label"},[c("span",{class:"chip-k",text:n.parts.key}),c("span",{class:"chip-op",text:` ${n.parts.op} `}),c("span",{class:"chip-v",text:n.parts.value,title:n.title??t})])]:[c("span",{class:"chip-label",text:t,title:n.title??t})];n.tag&&r.push(c("span",{class:"chip-tag",text:n.tag})),r.push(c("span",{class:"x"},[S(k.x,{size:12})]));let a=c("button",{class:`chip${n.geo?" geo":""}${n.negative?" neg":""}`,type:"button","aria-label":`Remove ${n.title??t}`},r);return e.listen(a,"click",o),a}function ps(e,t){return c("span",{class:"chip scope",role:"note",text:e,title:t,"aria-label":t})}function ia(e){let t=e.region("chips"),o=e.roots.chips,n=[];for(let[s,l]of ar(e.state))n.push(ps(`Scope: ${s} \u2260 ${l}`,`This instance always excludes ${s} = ${l}. It cannot be removed.`));for(let s of Object.keys(e.state.selected)){if(xe(e.state,s))continue;let{baseKey:l,negated:d}=ue(s);for(let p of e.state.selected[s]){let f=d?`${l} \u2260 ${p}`:`${s}=${p}`;n.push(rn(t,f,()=>d?e.excludeFacet(l,p):e.toggleFacet(s,p),{negative:d,tag:d?"NOT":void 0,...d?{parts:{key:l,op:"\u2260",value:p}}:{}}))}}let r=e.state.time;r&&n.push(rn(t,`time ${r.from} \u2192 ${r.to}`,()=>e.setTime(null),{geo:!0,tag:r.mode}));let a=e.state.bbox;if(a){let s=`bbox ${a.minLon},${a.maxLon},${a.minLat},${a.maxLat}`;n.push(rn(t,s,()=>e.setBbox(null),{geo:!0,tag:a.mode}))}H(o,...n),o.classList.toggle("empty",n.length===0),e.roots.clearAllBtn.classList.toggle("show",lr(e.state))}var oo="http://www.w3.org/2000/svg",Et=(e,t)=>(e+180)/360*t,Xe=(e,t)=>(90-e)/180*t,sn=(e,t)=>Math.max(-180,Math.min(180,e/t*360-180)),ln=(e,t)=>Math.max(-90,Math.min(90,90-e/t*180)),As=[[[-168,66],[-166,60],[-158,57],[-152,59],[-138,58],[-130,53],[-124,47],[-124,40],[-117,32],[-110,23],[-105,20],[-97,16],[-88,15],[-83,9],[-81,13],[-84,22],[-80,25],[-81,29],[-76,35],[-70,42],[-66,45],[-60,47],[-56,51],[-64,53],[-78,52],[-80,60],[-94,58],[-95,68],[-110,68],[-124,70],[-140,70],[-156,71],[-168,66]],[[-46,60],[-43,64],[-40,66],[-30,68],[-22,70],[-20,76],[-33,80],[-45,82],[-58,82],[-62,78],[-53,70],[-50,64],[-46,60]],[[-81,8],[-77,8],[-70,12],[-62,10],[-52,5],[-50,0],[-44,-2],[-40,-6],[-35,-8],[-38,-13],[-42,-23],[-48,-28],[-54,-34],[-58,-39],[-64,-42],[-66,-45],[-68,-50],[-66,-55],[-72,-54],[-74,-45],[-73,-37],[-71,-30],[-70,-20],[-76,-14],[-81,-6],[-80,0],[-78,4],[-81,8]],[[-16,15],[-16,21],[-10,28],[-6,36],[10,37],[20,33],[25,32],[32,31],[34,28],[43,12],[51,12],[48,5],[41,-2],[40,-10],[35,-18],[32,-26],[26,-34],[18,-35],[14,-23],[9,-1],[8,4],[-4,5],[-8,4],[-13,8],[-16,15]],[[-9,44],[-9,39],[-6,36],[3,42],[8,44],[12,45],[18,40],[16,45],[13,45],[13,54],[8,58],[5,61],[10,64],[15,68],[25,71],[30,68],[28,60],[38,60],[40,50],[30,46],[28,41],[22,40],[15,40],[8,44],[-9,44]],[[26,40],[36,36],[36,30],[43,39],[50,44],[48,30],[57,25],[60,25],[66,25],[68,20],[73,18],[77,8],[80,13],[80,22],[88,22],[90,16],[98,10],[104,9],[106,17],[109,22],[112,22],[121,31],[122,40],[128,42],[130,35],[128,45],[135,48],[142,54],[135,58],[150,60],[160,60],[170,66],[180,68],[178,72],[160,71],[140,73],[120,74],[100,77],[80,74],[68,77],[55,73],[50,69],[60,66],[68,66],[62,58],[52,52],[48,46],[40,46],[26,40]],[[114,-22],[113,-28],[116,-34],[123,-34],[131,-32],[138,-35],[141,-38],[147,-38],[150,-37],[153,-28],[153,-25],[146,-19],[142,-11],[136,-12],[130,-13],[124,-16],[122,-18],[114,-22]],[[-180,-72],[-140,-74],[-100,-74],[-60,-70],[-20,-72],[20,-70],[70,-68],[110,-66],[150,-70],[180,-72],[180,-84],[-180,-84],[-180,-72]]];function fs(e,t,o){let n=document.createElementNS(oo,"polygon");return n.setAttribute("points",e.map(([r,a])=>`${Et(r,t).toFixed(1)},${Xe(a,o).toFixed(1)}`).join(" ")),n.setAttribute("fill","var(--land)"),n.setAttribute("stroke","color-mix(in srgb, var(--land) 60%, #000)"),n.setAttribute("stroke-width","0.6"),n.setAttribute("opacity","0.92"),n}function an(e,t,o,n,r,a){let s=document.createElementNS(oo,"line");return s.setAttribute("x1",String(e)),s.setAttribute("y1",String(t)),s.setAttribute("x2",String(o)),s.setAttribute("y2",String(n)),s.setAttribute("stroke","var(--border-2)"),s.setAttribute("stroke-width",String(r)),s.setAttribute("opacity",String(a)),s}function no(e,t){let o=document.createElementNS(oo,"svg");o.setAttribute("width",String(e)),o.setAttribute("height",String(t)),o.setAttribute("viewBox",`0 0 ${e} ${t}`),o.style.display="block",o.style.background="var(--ocean)";for(let n of As)o.appendChild(fs(n,e,t));for(let n=-120;n<=120;n+=60)o.appendChild(an(Et(n,e),0,Et(n,e),t,.5,.4));for(let n=-60;n<=60;n+=30)o.appendChild(an(0,Xe(n,t),e,Xe(n,t),.5,.4));o.appendChild(an(0,Xe(0,t),e,Xe(0,t),.8,.85));for(let n of["selrect","selrect2"]){let r=document.createElementNS(oo,"rect");r.setAttribute("class",n),r.setAttribute("x","0"),r.setAttribute("y","0"),r.setAttribute("width","0"),r.setAttribute("height","0"),r.setAttribute("fill","var(--accent)"),r.setAttribute("fill-opacity","0.22"),r.setAttribute("stroke","var(--accent)"),r.setAttribute("stroke-width","1.4"),o.appendChild(r)}return o}function Ct(e,t,o,n){let r=e.querySelector(".selrect"),a=e.querySelector(".selrect2");if(!r)return;let s=i=>{i?.setAttribute("width","0"),i?.setAttribute("height","0")};if(!t){s(r),s(a);return}let l=Te(t),d=Xe(l.maxLat,n),p=Xe(l.minLat,n)-d,f=(i,m,h)=>{if(!i)return;let u=Et(m,o);i.setAttribute("x",String(u)),i.setAttribute("y",String(d)),i.setAttribute("width",String(Math.max(0,Et(h,o)-u))),i.setAttribute("height",String(p))};if(l.wraps){f(r,l.minLon,180),f(a,-180,l.maxLon);return}f(r,l.minLon,l.maxLon),s(a)}var sa=.1;function us(e,t,o=3e3){let n=()=>e.offsetWidth>0&&e.offsetHeight>0;return n()?Promise.resolve(!0):new Promise(r=>{let a=!1,s=p=>{a||(a=!0,d?.disconnect(),window.clearTimeout(l),r(p))},l=window.setTimeout(()=>s(n()),o),d=typeof ResizeObserver=="function"?new ResizeObserver(()=>{n()&&s(!0)}):null;if(d?.observe(e),!d){let p=window.requestAnimationFrame??(f=>window.setTimeout(f,16));p(()=>p(()=>s(n())))}t.add(()=>s(!1))})}async function ro(e,t,o,n){let r;try{r=await Ir(e.cfg.map,t)}catch{return null}if(t.isDisposed||!o.isConnected)return null;let a=c("div",{class:"lmap"});if(o.append(a),!await us(a,t)||t.isDisposed||!a.isConnected)return a.remove(),null;let l=r.map(a,{worldCopyJump:!1,zoomControl:!0,attributionControl:!0,dragging:!n.editable,boxZoom:!1});l.attributionControl.setPrefix(!1),r.tileLayer(e.cfg.map.tileUrl,{attribution:e.cfg.map.attribution,maxZoom:12,noWrap:!0}).addTo(l);let d=null,p=h=>{if(d&&(d.remove(),d=null),!h)return;let u=Te(h),b=u.wraps?[[[u.minLat,u.minLon],[u.maxLat,180]],[[u.minLat,-180],[u.maxLat,u.maxLon]]]:[[[u.minLat,u.minLon],[u.maxLat,u.maxLon]]];d=r.layerGroup(b.map(x=>r.rectangle(x,{color:"#4f7cff",weight:1.5,fillOpacity:.18}))).addTo(l)};if(n.bbox){let h=Te(n.bbox);p(n.bbox);let u=Math.max(0,(2-(h.maxLat-h.minLat))/2),b=Math.max(0,(2-(h.maxLon-h.minLon))/2);l.fitBounds([[h.minLat-u,h.minLon-b],[h.maxLat+u,h.maxLon+b]],{padding:[14,14],maxZoom:5})}else l.setView([20,0],1);if(n.editable&&n.onChange){let h=!0,u=c("button",{class:"lmap-mode",type:"button","aria-pressed":"true",title:"Draw a box (click to switch to panning)","aria-label":"Draw a box",text:"\u25AD Draw"}),b=()=>{u.setAttribute("aria-pressed",h?"true":"false"),u.classList.toggle("on",h),u.textContent=h?"\u25AD Draw":"\u270B Pan",u.setAttribute("data-tip",h?"Drawing a box (click to pan instead)":"Panning (click to draw a box)"),a.classList.toggle("drawing",h),h?l.dragging.disable():l.dragging.enable()};t.listen(u,"click",z=>{z.preventDefault(),z.stopPropagation(),h=!h,b()}),r.DomEvent.disableClickPropagation(u),a.append(u),b();let x=null,C=z=>!!z.originalEvent?.target?.closest?.(".leaflet-control, .leaflet-bar, .leaflet-control-attribution"),Q=z=>{if(!h||C(z))return;let N=z.originalEvent;N&&N.button===0&&N.preventDefault(),x=z.latlng},D=z=>{x&&p({minLon:Math.min(x.lng,z.latlng.lng),maxLon:Math.max(x.lng,z.latlng.lng),minLat:Math.min(x.lat,z.latlng.lat),maxLat:Math.max(x.lat,z.latlng.lat),mode:"flexible"})},M=z=>{if(!x)return;let N=x;x=null;let G={minLon:Math.min(N.lng,z.latlng.lng),maxLon:Math.max(N.lng,z.latlng.lng),minLat:Math.min(N.lat,z.latlng.lat),maxLat:Math.max(N.lat,z.latlng.lat)};if(Math.abs(G.maxLon-G.minLon)<sa||Math.abs(G.maxLat-G.minLat)<sa){p(n.bbox);return}n.onChange?.(G)};l.on("mousedown",Q),l.on("mousemove",D),l.on("mouseup",M),t.add(()=>{l.off("mousedown",Q),l.off("mousemove",D),l.off("mouseup",M)})}let f=!1,i=()=>{if(!(f||!a.isConnected))try{l.invalidateSize()}catch{}};if(t.setTimeout(i,0),typeof ResizeObserver=="function"){let h=new ResizeObserver(()=>i());h.observe(a),t.add(()=>h.disconnect())}if(typeof IntersectionObserver=="function"){let h=new IntersectionObserver(u=>{u.some(b=>b.isIntersecting)&&i()});h.observe(a),t.add(()=>h.disconnect())}t.listen(window,"resize",i);let m={destroy(){if(!f){f=!0;try{l.remove()}catch{}a.remove()}}};return t.add(()=>m.destroy()),m}var Tt=null,ao=null,hs=e=>e?import(e):import("./dist.RE3WVK6E.js"),ms=hs;async function gs(e){let t=e||null;return Tt&&t!==ao&&console.warn(`[freva-databrowser] data-inspector already loaded from ${ao??"the packaged dependency"}; ignoring a second source (${t??"the packaged dependency"}). The custom element can only be registered once per page.`),Tt||(ao=t,Tt=ms(t??void 0).then(o=>(o?.DataInspectorElement&&!customElements.get("data-inspector")&&customElements.define("data-inspector",o.DataInspectorElement),o)).catch(o=>{throw Tt=null,ao=null,o})),Tt}function io(e){return e.cfg.features.inspect}function la(e){return e.cfg.features.inspect?"":"Inspect is disabled for this deployment"}function so(e,t){if(!io(e))return{disabled:!0,why:`Aggregate - ${la(e).toLowerCase()}`,note:"Aggregate is disabled"};if(t>10)return{disabled:!0,why:`Aggregation handles up to ${10} files - deselect ${t-10} to enable it`,note:`Aggregate: max ${10} files`};let o=e.isSignedIn();return!o&&!e.cfg.signIn?{disabled:!0,why:"Aggregate - needs sign-in",note:"Aggregate needs sign-in"}:e.cfg.enableHeavyOps?{disabled:!1,why:o?"Combine the selected files into one dataset":"Combine the selected files into one dataset (you will be asked to sign in)",note:null}:{disabled:!0,why:"Aggregate - data-portal not enabled",note:"Aggregate needs the data-portal"}}function ca(e){let t=e.dis;async function o(n){if(!io(e)){e.toast("warn",la(e));return}let r=Array.isArray(n)?n:null,a=typeof n=="string"?n:null;e.log("info",r?`Aggregating ${r.length} files\u2026`:a?`Inspecting ${a.split("/").pop()??a}\u2026`:"Opening the inspector\u2026");let s;try{s=await gs(e.cfg.inspectorUrl)}catch{e.toast("error","Inspector unavailable \u2014 the data-inspector module could not be loaded.");return}if(typeof s.attachInspector!="function"){e.toast("error","Inspector unavailable \u2014 this data-inspector build is too old.");return}if(t.isDisposed)return;let l=document.createElement("data-inspector"),d=document.createElement("dialog");d.className="freva-db fdb-inspector-dialog";let p=e.roots.app.getAttribute("data-theme");p&&d.setAttribute("data-theme",p),d.append(l);let f=t.child(),i=!1,m=document.activeElement;f.add(()=>{try{d.open&&d.close(),d.remove()}catch{}m?.isConnected&&typeof m.focus=="function"&&m.focus()});let h=()=>{i||(i=!0,f.flush())};l.addEventListener("inspector-close",h),d.addEventListener("cancel",x=>{x.preventDefault(),h()}),d.addEventListener("close",h);let u=!1;d.addEventListener("pointerdown",x=>{u=x.target===d}),d.addEventListener("click",x=>{u&&x.target===d&&h(),u=!1});let b=s.attachInspector(l,{dataPortalBase:e.cfg.dataPortalBase,dataLoader:e.cfg.enableHeavyOps,getAuthHeaders:x=>e.api.authHeadersFor(x),signIn:e.cfg.signIn});f.add(()=>b.detach()),r?(l.setAttribute("is-aggregation",""),l.setAttribute("file",JSON.stringify(r))):a&&(l.file=a),e.roots.overlay.appendChild(d),a?b.load(a):l.setAttribute("status","ready"),l.setAttribute("open",""),typeof d.showModal=="function"?d.showModal():d.setAttribute("open","")}return{open:n=>o(n),openEmpty:()=>o(null),openAggregate:n=>o([...n])}}var da=new WeakMap;function Ao(e){let t=da.get(e);return t||(t={sig:null,sigSeen:null,reqId:0,attempted:new Set,failed:new Set,errorMsg:""},da.set(e,t)),t}function fa(e,t){return e.map(o=>o.key).join("|")+"#"+t}var pa=["#4F8DF7","#34C98A","#E6B14E","#C79BF0","#F0795F","#3FB6D8","#E0608A"];function bs(e,t){let o=parseInt(e.slice(1),16);return`rgba(${o>>16&255},${o>>8&255},${o&255},${t})`}function lo(e){return Array.isArray(e)?e.join(", "):String(e)}function An(e){let t=e.lastIndexOf("/");return t<0?e:e.slice(t+1)}function vs(e){let t=e.lastIndexOf("/");return t<0?"":e.slice(0,t+1)}function xs(e){let{detailSource:t,focusKey:o,pickedKeys:n}=e.state;return t==="focus"&&o?[o]:n.size>0?[...n]:o?[o]:[]}function dn(e,t,o=!1){return c("div",{class:"meta-row"},[c("span",{class:"k",text:e}),c("span",{class:`v${o?" na":""}`,text:t})])}function It(e,t){let o=c("div",{class:"info-sec"});return e&&o.append(S(k[e],{size:13})),o.append(c("span",{text:t})),o}function ua(e,t,o){let n=o.files,r=o.count>1,a,s=null;if(r){let f=o.count,i=f>10,m=so(e,f),h=c("button",{class:`btn primary${i?" locked":""}`,type:"button",disabled:m.disabled?"true":null,title:m.why},[S(k.aggregate,{size:15}),c("span",{text:"Aggregate"})]);m.disabled||t.listen(h,"click",()=>{e.openAggregate(n)}),a=h,m.disabled&&(s=c("p",{class:"scope-note",text:m.why}))}else{let f=io(e),i=c("button",{class:"btn primary",type:"button",disabled:f?null:"true",title:f?"Inspect data (zarr stores render without sign-in)":"Inspect is disabled for this deployment"},[S(k.inspect,{size:15}),c("span",{text:"Inspect data"})]);f&&t.listen(i,"click",()=>{e.openInspect(n[0])}),a=i}let l=f=>{let i=n.map(m=>`file=${encodeURIComponent(m)}`).join("&");e.exportCatalogue(f,i,"file")},d=c("button",{class:"btn",type:"button"},[ye("intake",{size:16}),c("span",{text:"Intake catalogue (.json)"})]),p=c("button",{class:"btn",type:"button"},[ye("stac",{size:16}),c("span",{text:"STAC catalogue (.zip)"})]);return t.listen(d,"click",()=>l("intake")),t.listen(p,"click",()=>l("stac")),c("div",{class:"info-actions"},[a,s,It("download","Download as catalog"),c("p",{class:"scope-note",text:r?`scoped to your ${o.count} picks - file= constraint`:"scoped to this file - file= constraint"}),d,p])}function ha(e,t,o){if(!o)return null;let n=c("button",{class:"btn sm",type:"button",text:"Retry failed"});return t.listen(n,"click",()=>{let r=Ao(e);r.attempted.clear(),r.failed.clear(),r.sig=null,Ae(e)}),c("div",{class:"partial-flag"},[c("span",{text:`${o} file(s) could not be loaded. `}),n])}function ws(e,t,o,n,r=0){let a=e.roots.infoScroll,s=[c("div",{class:"info-name",text:An(o.file)}),c("div",{class:"info-sub",text:vs(o.file)})],l=ha(e,t,r);if(l&&s.push(l),s.push(It("box","Bounding box")),o.bbox){let u=no(290,150),b=Te(o.bbox),x=b.global?"lon global (\u2212180 \u2192 180)":`lon ${b.minLon} \u2192 ${b.maxLon}${b.wraps?" (crosses the antimeridian)":""}`,C=c("div",{class:"minimap"},[u]),Q=c("button",{class:"map-zoom",type:"button",title:"Zoomable map","aria-label":"Switch to the zoomable map"},[S(k.search,{size:13}),c("span",{text:"Zoom"})]);t.listen(Q,"click",()=>{Q.disabled=!0,Q.textContent="Loading map\u2026",ro(e,t,C,{editable:!1,bbox:o.bbox??null}).then(M=>{if(!M){Q.disabled=!1,Q.textContent="Zoom unavailable";return}u.remove(),C.classList.add("has-leaflet"),Q.remove()})});let D=c("div",{class:"miniwrap"},[c("div",{class:"map-slot"},[C,Q]),c("div",{class:"coords"},[c("span",{text:x}),c("span",{text:`lat ${b.minLat} \u2192 ${b.maxLat}`})])]);s.push(D),Ct(u,o.bbox,290,150)}else s.push(c("div",{class:"meta"},[c("div",{class:"na",text:"Spatial extent: not available yet."})]));s.push(It("clock","Time"));let d=o.timeRange,p=d?null:jt(o.file),f=d??p,i=p!=null||o.timeRangeInferred===!0;s.push(c("div",{class:"meta"},[f?dn(i?"time range (from filename)":"time range",f):c("div",{class:"na",text:"Time range: not available yet."})])),s.push(It(null,"Facets (from ?file=)"));let m=c("div",{class:"meta"}),h=Object.entries(o.meta??{});if(h.length)for(let[u,b]of h)m.append(dn(wt(e.state,u),lo(b)));else m.append(c("div",{class:"na",text:"No per-file metadata returned."}));s.push(m),s.push(ua(e,t,n)),H(a,...s)}var pn=25;function ys(e,t,o,n){let r=t.child(),a=document.activeElement,s=()=>{r.flush()},l=null,d=c("button",{class:"x",type:"button","aria-label":"Close comparison"},[S(k.close,{size:18})]),p=c("div",{class:"dmm-head"},[c("span",{class:"dmm-title",text:n}),d]),f=c("div",{class:"dmm-body"},[o.cloneNode(!0)]),i=c("div",{class:"dmm-modal",tabindex:"-1"},[p,f]),m=c("dialog",{class:"dmm-backdrop","aria-label":n},[i]);r.listen(d,"click",s),r.listen(m,"click",b=>{b.target===m&&s()});let h=()=>Array.from(i.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(b=>!b.hasAttribute("disabled"));r.listen(document,"keydown",b=>{let x=b;if(x.key==="Escape"){s();return}if(x.key!=="Tab")return;let C=h();if(C.length===0){x.preventDefault(),i.focus();return}let Q=C[0],D=C[C.length-1],M=document.activeElement;i.contains(M)?x.shiftKey&&M===Q?(x.preventDefault(),D.focus()):!x.shiftKey&&M===D&&(x.preventDefault(),Q.focus()):(x.preventDefault(),Q.focus())}),r.add(()=>{try{l?.open&&l.close()}catch{}try{m.remove()}catch{}queueMicrotask(()=>{let b=a&&a.isConnected?a:e.roots.infoBtn;if(b&&b.isConnected)try{b.focus()}catch{}})}),e.roots.app.appendChild(m);let u=m;if(typeof u.showModal=="function"){l=u;try{u.showModal()}catch{l=null,u.setAttribute("open","")}r.listen(u,"cancel",b=>{b.preventDefault(),s()})}else u.setAttribute("open","");(h()[0]??i).focus()}var co="__time",po="__bbox";function ks(e){let t=e.timeRange,o=t?null:jt(e.file),n=t??o;return n?o||e.timeRangeInferred===!0?`${n} (from filename)`:n:null}function Bs(e){if(!e.bbox)return null;let t=Te(e.bbox);return`${t.global?"lon \u2212180 \u2192 180":`lon ${t.minLon} \u2192 ${t.maxLon}${t.wraps?" (crosses the antimeridian)":""}`}, lat ${e.bbox.minLat} \u2192 ${e.bbox.maxLat}`}function cn(e,t){return t===co?"Time range":t===po?"Spatial extent":wt(e.state,t)}function Ss(e,t,o,n,r,a=0){let s=e.roots.infoScroll,l=o.map(D=>{let M=ks(D),z=Bs(D),N={...D.meta??{}};return M&&(N[co]=M),z&&(N[po]=z),N}),d=[...new Set(l.flatMap(D=>Object.keys(D)))].filter(D=>D!==co&&D!==po),f=[...[co,po].filter(D=>l.some(M=>D in M)),...d],i=D=>[...new Set(l.map(M=>D in M?lo(M[D]):"-"))],m=f.filter(D=>i(D).length>1),h=f.filter(D=>!m.includes(D)),u=[c("div",{class:"info-name",text:`${n.count} files selected`}),c("div",{class:"info-sub",text:`comparing - ${m.length} field${m.length===1?"":"s"} differ`})];if(r){let D=ha(e,t,r);D&&u.push(D)}if(u.push(It(null,"Differences")),m.length){let D=c("div",{class:"diff-summary"});for(let $ of m)D.append(c("span",{class:"varchip"},[c("span",{class:"vc-k",text:cn(e,$)}),c("span",{class:"vc-n",text:String(i($).length)})]));u.push(D);let M={};for(let $ of m)M[$]=i($);let z=c("tr",{},[c("th",{text:"#"}),...m.map($=>c("th",{text:cn(e,$)}))]),N=o.map(($,he)=>{let J=l[he],fe=m.map(j=>{let ae=j in J?lo(J[j]):"-",g=pa[M[j].indexOf(ae)%pa.length];return c("td",{},[c("span",{class:"dchip",style:`background:${bs(g,.16)};color:${g}`,text:ae})])});return c("tr",{},[c("td",{class:"rownum",title:An($.file),text:String(he+1)}),...fe])}),G=c("table",{class:"dmatrix"},[c("thead",{},[z]),c("tbody",{},N)]),Y=c("button",{class:"btn diff-enlarge",type:"button",title:"Open the comparison full-screen"},[S(k.expandWide,{size:14}),c("span",{text:"Enlarge"})]);t.listen(Y,"click",()=>ys(e,t,G,`Comparing ${o.length} file${o.length===1?"":"s"}`)),u.push(c("div",{class:"diff-tools"},[Y])),u.push(c("div",{class:"dscroll",role:"region","aria-label":"Per-file differences"},[G])),a>0&&u.push(c("p",{class:"scope-note",style:"margin:6px 16px 0",text:`Comparing the first ${pn} files - ${a} more selected. Deselect some to compare the rest.`}))}else u.push(c("p",{class:"scope-note",style:"margin:0 16px",text:f.length===0?`No per-file metadata was returned to compare across these ${o.length} files.`:`Every field is identical across the ${o.length} files.`}));let b=c("div",{class:"shared-body"},[c("div",{class:"meta"},h.map(D=>dn(cn(e,D),lo(l[0][D]))))]),x=c("div",{class:"info-sec shared-head",role:"button",tabindex:"0"},[S(k.check,{size:13}),c("span",{text:`Shared by all ${o.length}`}),c("span",{class:"chev2"},[S(k.caret,{size:12})])]),C=c("div",{class:"shared open"},[x,b]),Q=()=>{C.classList.toggle("open")};t.listen(x,"click",Q),t.listen(x,"keydown",D=>{let M=D.key;(M==="Enter"||M===" ")&&(D.preventDefault(),Q())}),u.push(C),u.push(ua(e,t,n)),H(s,...u)}function Aa(e,t){H(e.roots.infoScroll,c("div",{class:"empty"},[c("div",{class:"big"},[S(k.info,{size:30})]),c("p",{},[document.createTextNode(t??"Details is on. Click a file to query "),t?null:c("code",{text:"?file=<name>"}),document.createTextNode(t?"":" - nothing is fetched until you do.")])]))}function Es(e,t){H(e.roots.infoScroll,c("div",{class:"querying"},[c("span",{text:`querying ?file= for ${t}\u2026`}),c("div",{class:"bar"})]))}function Cs(e,t,o){let n=c("button",{class:"btn",type:"button"},[S(k.retry,{size:15}),c("span",{text:"Retry"})]);t.listen(n,"click",()=>{let r=Ao(e);r.attempted.clear(),r.failed.clear(),Ae(e)}),H(e.roots.infoScroll,c("div",{class:"state-msg err"},[c("p",{text:o}),n]))}async function Ts(e,t,o){let n=new Array(e.length),r=0,a=async()=>{for(;r<e.length;){let s=r++;n[s]=await o(e[s])}};return await Promise.all(Array.from({length:Math.min(t,e.length)},()=>a())),n}var Qs=6,Is=500;function Ms(e,t,o){let n=Ao(e),r=e.state.flavour,a=fa(t,r);if(n.sig===a)return;n.sig=a;let s=e.api.nextRequestId();n.reqId=s,e.state.details="loading";let l=e.api.channelSignal("details");Ts(o,Qs,d=>e.api.filePathMetadata(r,[d.file],l).then(p=>({ok:!0,r:d,res:p})).catch(p=>({ok:!1,r:d,err:p}))).then(d=>{if(n.reqId!==s||e.state.flavour!==r)return;let p=!1;for(let f of d)if(n.attempted.add(f.r.key),f.ok){let i=(f.res.search_results??[]).find(x=>(x.file??x.uri)===f.r.file)??(f.res.search_results??[])[0],m=kr(i?.bbox),h=Br(i?.time),u=h?null:jt(f.r.file),b=e.state.detailsCache;for(b.set(Qt(r,f.r.key),{...f.r,meta:fr(f.res.facets??{}),bbox:m?{...m,mode:"flexible"}:f.r.bbox,timeRange:h??u??void 0,timeRangeInferred:!h&&!!u});b.size>Is;){let x=b.keys().next().value;if(x===void 0)break;b.delete(x)}n.failed.delete(f.r.key)}else f.err instanceof ie&&f.err.aborted?p=!0:(n.failed.add(f.r.key),n.errorMsg=f.err instanceof ie?f.err.message:"Details request failed.");p||(n.sig=null,Ae(e))}).catch(()=>{if(!(n.reqId!==s||e.state.flavour!==r)){for(let d of o)n.attempted.add(d.key),n.failed.add(d.key);n.errorMsg="Details response could not be read.",n.sig=null,Ae(e)}})}var Qt=(e,t)=>`${e}::${t}`;function Ae(e){let t=e.region("details"),o=e.roots.info;if(!e.state.detailsOpen){o.classList.add("collapsed");return}o.classList.remove("collapsed");let n=Ao(e),r=xs(e);if(r.length===0){e.state.details="idle",Aa(e);return}let a=new Map(e.state.rows.map(b=>[b.key,b])),s=r.map(b=>e.state.detailsCache.get(Qt(e.state.flavour,b))??a.get(b)).filter(b=>!!b),l=Math.max(0,s.length-pn),d=l>0?s.slice(0,pn):s;if(d.length===0){e.state.details="empty",Aa(e,"The selected file is no longer in the results.");return}let p=fa(d,e.state.flavour);n.sigSeen!==p&&(n.attempted.clear(),n.failed.clear(),n.sigSeen=p);let f=d.filter(b=>!e.state.detailsCache.has(Qt(e.state.flavour,b.key))&&!n.attempted.has(b.key));if(f.length){Ms(e,d,f),Es(e,d.length>1?`${d.length} files`:An(d[0].file));return}let i=d.filter(b=>e.state.detailsCache.has(Qt(e.state.flavour,b.key))),m=d.length-i.length;if(i.length===0){e.state.details="error",Cs(e,t,n.errorMsg||"No metadata returned.");return}e.state.details="loaded";let h=i.map(b=>e.state.detailsCache.get(Qt(e.state.flavour,b.key))),u={files:d.map(b=>b.file),count:d.length};h.length>1?Ss(e,t,h,u,m,l):ws(e,t,h[0],u,m)}var Os="\u2212",ma="\u2260";function Mt(e,t){let o=vt(e,t).length,n=Ee(e,t).length;return{included:o,excluded:n,total:o+n}}function Ot(e){let t=[];return e.included&&t.push({negative:!1,count:e.included}),e.excluded&&t.push({negative:!0,count:e.excluded}),t}function Dt(e,t,o,n){let r=e.negative?"excluded":"included",a=`${e.negative?Os:"+"}${e.count}`,s=`Clear ${e.count} ${r} ${t} value${e.count===1?"":"s"}`,l=c("button",{class:`fh-count fb ${e.negative?"fb-exc":"fb-inc"}`,type:"button","data-mode":e.negative?"exclude":"include",title:s,"aria-label":s},[c("span",{class:"fb-n",text:a}),c("span",{class:"fb-x","aria-hidden":"true",text:"\xD7"})]);return l.style.setProperty("--fb-ch",String(a.length)),n(l,"click",d=>{d.stopPropagation(),o()}),l}function zt(e,t){let o=e.state.totalCount;return!o||o<=0?null:Math.min(100,t/o*100)}function fo(e,t,o,n){let r=zt(e,o),a=r===null?"":` - ${o.toLocaleString("en-US")} (${r<.1?"<0.1":r.toFixed(1)}% of results)`;return n?`${t} - ${n}${a}`:`${t}${a}`}function fn(e){return Oe(e)}function Ds(e,t){return!Oe(e)||!Oe(t)?!1:Zt(e)||Zt(t)?!0:Re(e)<=Re(t)}var zs={flexible:"Any overlap between your range and the file\u2019s period (intersects).",strict:"Containment match - sent to the backend as time_select=strict.",file:"File-relative containment - sent as time_select=file."};function un(e,t,o,n=!1){let r=e.state.time,a=r?.mode??"flexible",s=c("input",{class:"date-text",type:"text",inputmode:"numeric",placeholder:"YYYY or YYYY-MM-DD",value:r?.from??"","aria-label":"From"}),l=c("input",{class:"date-text",type:"text",inputmode:"numeric",placeholder:"YYYY or YYYY-MM-DD",value:r?.to??"","aria-label":"To"}),d=c("div",{class:"err-line"}),p=(x,C)=>{let Q=c("input",{type:"date",class:"date-native",tabindex:"-1","aria-hidden":"true"}),D=c("button",{class:"date-pick",type:"button","aria-label":`Choose a ${C.toLowerCase()} date from a calendar`,title:`Pick a ${C.toLowerCase()} date`},[S(k.clock,{size:14})]),M=()=>{let z=x.value.trim();Q.value=/^\d{4}-\d{2}-\d{2}$/.test(z)&&fn(z)?z:""};return t.listen(D,"click",()=>{M();let z=Q;if(typeof z.showPicker=="function")try{z.showPicker();return}catch{}Q.focus(),Q.click()}),t.listen(Q,"change",()=>{Q.value&&(x.value=Q.value,m(),h())}),t.listen(x,"change",M),M(),c("span",{class:"date-pickwrap"},[D,Q])},f=["flexible","strict","file"].map(x=>{let C=c("button",{type:"button",class:x===a?"on":"",title:zs[x],text:x});return t.listen(C,"click",()=>{a=x;for(let Q of f)Q.classList.toggle("on",Q===C);m(),h()}),C}),i=()=>Ds(s.value.trim(),l.value.trim());function m(){let x=fn(s.value),C=fn(l.value);s.classList.toggle("bad",!x),l.classList.toggle("bad",!C);let Q=x&&C&&i();d.textContent=!x||!C?"Use YYYY, YYYY-MM, YYYY-MM-DD or a datetime.":Q?"":"The start is after the end."}t.listen(s,"input",m),t.listen(l,"input",m);let h=()=>{let x=s.value.trim(),C=l.value.trim();if(!x&&!C){e.setTime(null);return}i()&&e.setTime({from:x,to:C,mode:a})};t.listen(s,"change",h),t.listen(l,"change",h);let u=c("button",{class:"btn",type:"button",text:"Clear"});t.listen(u,"click",()=>{o(),e.setTime(null)});let b=c("div",{class:`editor${n?" inline":""}`},[c("h5",{},[S(k.clock,{size:16}),c("span",{text:"Time range"}),c("span",{class:"sub",text:"time_select"})]),c("div",{class:"daterow"},[c("label",{text:"From"}),s,p(s,"From")]),c("div",{class:"daterow"},[c("label",{text:"To"}),l,p(l,"To")]),c("div",{class:"modes"},f),d,...n?[]:[c("div",{class:"actions"},[u])]]);return m(),b}function ga(e,t){let o=e.region("popover"),n=un(e,o,()=>e.popover.close());e.popover.open(t,n,{placement:"right",className:"editor-pop",autoFocus:!0,reanchor:()=>e.roots.facetList.querySelector('.special[aria-label="Edit time range"]')})}var uo=e=>Math.round(e*100)/100,$e=276,_e=150,Ls={flexible:"Any overlap between your box and the file (intersects).",strict:"Containment match - sent to the backend as bbox_select=strict.",file:"File-relative containment - sent as bbox_select=file."};function ba(e){return Number.isFinite(e.minLon)&&Number.isFinite(e.maxLon)&&Number.isFinite(e.minLat)&&Number.isFinite(e.maxLat)&&e.minLon>=-180&&e.maxLon<=180&&e.minLat>=-90&&e.maxLat<=90&&e.minLon<e.maxLon&&e.minLat<e.maxLat}function hn(e,t,o,n={}){let r=n.autoMap??!1,a=n.inline??!1,s=e.state.bbox,l=s?{minLon:s.minLon,maxLon:s.maxLon,minLat:s.minLat,maxLat:s.maxLat}:null,d=s?.mode??"flexible",p=no($e,_e),f=c("div",{class:"map-overlay"}),i=c("div",{class:"minimap"},[p,f]),m=(g,w)=>{let y=c("input",{type:"text",inputmode:"decimal","aria-label":g,value:l?String(l[w]):""});return{wrap:c("div",{class:"f"},[c("label",{text:g}),y]),input:y}},h=m("minLon","minLon"),u=m("maxLon","maxLon"),b=m("minLat","minLat"),x=m("maxLat","maxLat");function C(){l&&(h.input.value=l.minLon.toFixed(1),u.input.value=l.maxLon.toFixed(1),b.input.value=l.minLat.toFixed(1),x.input.value=l.maxLat.toFixed(1))}function Q(){Ct(p,l?{...l,mode:d}:null,$e,_e);let g=l!==null&&ba(l);for(let w of[h,u,b,x])w.input.classList.toggle("bad",l!==null&&!g)}let D=()=>{l={minLon:parseFloat(h.input.value),maxLon:parseFloat(u.input.value),minLat:parseFloat(b.input.value),maxLat:parseFloat(x.input.value)},Q()};for(let g of[h,u,b,x])t.listen(g.input,"input",D);let M=null,z=!1,N=g=>{let w=f.getBoundingClientRect(),y=w.width?$e/w.width:1,B=w.height?_e/w.height:1;return{x:Math.max(0,Math.min($e,(g.clientX-w.left)*y)),y:Math.max(0,Math.min(_e,(g.clientY-w.top)*B))}};t.listen(f,"mousedown",g=>{M=N(g),z=!1});let G=t.listen(window,"mousemove",g=>{if(!M)return;z=!0;let w=N(g);l={minLon:sn(Math.min(M.x,w.x),$e),maxLon:sn(Math.max(M.x,w.x),$e),maxLat:ln(Math.min(M.y,w.y),_e),minLat:ln(Math.max(M.y,w.y),_e)},C(),Q()}),Y=t.listen(window,"mouseup",()=>{M&&z&&J(),M=null,z=!1}),$=["flexible","strict","file"].map(g=>{let w=c("button",{type:"button",class:g===d?"on":"",title:Ls[g],text:g});return t.listen(w,"click",()=>{d=g;for(let y of $)y.classList.toggle("on",y===w);Q(),J()}),w}),he=c("button",{class:"btn",type:"button",text:"Clear"});t.listen(he,"click",()=>{o(),e.setBbox(null)});let J=()=>{l&&ba(l)&&e.setBbox({...l,mode:d})},fe=()=>ro(e,t,i,{editable:!0,bbox:l?{...l,mode:d}:null,onChange:g=>{l={minLon:uo(g.minLon),maxLon:uo(g.maxLon),minLat:uo(g.minLat),maxLat:uo(g.maxLat)},C(),Q(),J()}}).then(g=>{if(!g){j.disabled=!1,j.textContent="Zoom unavailable";return}p.remove(),f.remove(),i.classList.add("has-leaflet"),j.remove()}),j=c("button",{class:"map-zoom",type:"button",title:"Zoomable map","aria-label":"Switch to the zoomable map"},[S(k.search,{size:13}),c("span",{text:"Zoom"})]);t.listen(j,"click",()=>{j.disabled=!0,j.textContent="Loading map\u2026",fe()}),r&&(j.remove(),fe());for(let g of[h,u,b,x])t.listen(g.input,"change",()=>J());let ae=c("div",{class:`editor${a?" inline":""}`},[c("h5",{},[S(k.box,{size:16}),c("span",{text:"Bounding box"}),c("span",{class:"sub",text:"bbox_select - drag to draw"})]),c("div",{class:"map-slot"},[i,j]),c("div",{class:"draw-hint",text:"Drag a rectangle, or type bounds below."}),c("div",{class:"bbox-fields"},[h.wrap,u.wrap,b.wrap,x.wrap]),c("div",{class:"modes"},$),...a?[]:[c("div",{class:"actions"},[he])]]);return l&&(C(),Ct(p,{...l,mode:d},$e,_e)),Q(),{editor:ae,dispose:()=>{G(),Y()}}}function va(e,t){let o=e.region("popover"),{editor:n,dispose:r}=hn(e,o,()=>e.popover.close(),{autoMap:!0});e.popover.open(t,n,{placement:"right",className:"editor-pop",onClose:r,reanchor:()=>e.roots.facetList.querySelector('.special[aria-label="Edit bounding box"]')})}var Fs=60;function ve(e){_r({sort:e.state.overviewSort,collapsed:[...e.state.overviewCollapsed],span:e.state.overviewSpan,h:e.state.overviewH,order:e.state.overviewOrder,addOpen:e.state.overviewAddOpen,stacked:e.state.overviewStacked,stackSeen:e.state.overviewStackSeen,snapshot:e.state.overviewSnapshot})}function ka(e,t,o,n){o.classList.add("clickable"),t.listen(o,"click",r=>{if(r.target.closest('button, .drag-grip, [role="button"]'))return;let a=o.ownerDocument.getSelection?.();a&&!a.isCollapsed&&o.contains(a.anchorNode)||(e.state.overviewCollapsed.has(n)?e.state.overviewCollapsed.delete(n):e.state.overviewCollapsed.add(n),ve(e),e.renderOverview())})}var Ba=24,go=e=>Math.min(Ba,Math.max(1,e)),Us=e=>Math.max(1,getComputedStyle(e).gridTemplateColumns.split(" ").filter(Boolean).length),qs=2,ft=e=>Math.min(qs,Math.max(1,e)),xa=e=>go(parseInt(e.style.gridColumn.replace("span ",""),10)||1);function Sa(e){return c("button",{class:"drag-grip",type:"button",title:"Drag, or focus and use \u2190 \u2192 to reorder","aria-label":`Reorder ${e} - use the arrow keys`,text:"\u283F"})}function Lt(e){return c("button",{class:"fcard-resize",type:"button",title:"Drag, or focus and use arrow keys to resize","aria-label":`Resize ${e} - \u2190 \u2192 change width, \u2191 \u2193 change height`})}var ho=new WeakMap;function Ns(e){let t=ho.get(e);if(!t)return;ho.set(e,null);let o=t.handle==="grip"?".drag-grip":".fcard-resize";for(let n of Array.from(e.roots.overviewGrid.querySelectorAll(".fcard[data-key]")))if(n.dataset.key===t.key){n.querySelector(o)?.focus();break}}function Ea(e,t){let o=new Set(t),n=new Map,r=null;for(let s of e){if(o.has(s)){r=s;continue}let l=n.get(r)??[];l.push(s),n.set(r,l)}let a=[...n.get(null)??[]];for(let s of t){a.push(s);for(let l of n.get(s)??[])a.push(l)}return a}function Ca(e){return Array.from(e.querySelectorAll(".fcard[data-key]")).map(t=>t.dataset.key??"").filter(Boolean)}function Rs(e,t,o,n){let r=Ca(t),a=r.indexOf(o),s=a+n;a<0||s<0||s>=r.length||([r[a],r[s]]=[r[s],r[a]],e.state.overviewOrder=Ea(e.state.overviewOrder,r),ho.set(e,{key:o,handle:"grip"}),ve(e),e.renderOverview())}function Hs(e,t,o,n){let r=e.state.overviewSpan[t]??1,a=e.state.overviewH[t]??1,s=go(r+o),l=ft(a+n);s===r&&l===a||(e.state.overviewSpan[t]=s,e.state.overviewH[t]=l,ho.set(e,{key:t,handle:"resize"}),ve(e),e.renderOverview())}function Ps(e,t){if(!e.state.overviewStacked)return;let o=new Set(e.state.overviewStackSeen),n=!1;for(let r of[...t,"__time","__bbox"])o.has(r)||(o.add(r),e.state.overviewCollapsed.add(r),n=!0);n&&(e.state.overviewStackSeen=[...o],ve(e))}var Vs=["button","input","textarea","select","a","label","[contenteditable]",'[role="button"]','[role="checkbox"]','[role="textbox"]','[role="listbox"]','[role="option"]','[role="slider"]','[role="menuitem"]',".fcard-resize",".leaflet-container",".fcard-special-body svg",".bbox-map",".map-svg",".te-map"].join(", ");function Gs(e,t){let o=null,n=null,r=null,a=!1,s=null,l=5,d=f=>{o="reorder",n=f,f.classList.add("dragging"),document.body.classList.add("fdb-dragging")};e.dis.listen(t,"pointerdown",f=>{let i=f;if(i.button!==void 0&&i.button!==0)return;let m=i.target,h=m.closest(".fcard");if(h){if(m.closest(".fcard-resize")){let u=xa(h),b=h.getBoundingClientRect();o="resize",n=h;let x=Us(t),C=ft(Number(h.dataset.rows)||1);s={startX:i.clientX,startY:i.clientY,startSpan:u,startRows:C,pitch:Math.max(120,b.width/u),rowPitch:Math.max(120,b.height/C),maxSpan:x},h.classList.add("resizing"),document.body.classList.add("fdb-dragging"),i.preventDefault();return}if(m.closest(".drag-grip")){d(h),i.preventDefault();return}m.closest(Vs)||(r={x:i.clientX,y:i.clientY,card:h,pointerId:i.pointerId})}}),e.dis.listen(window,"pointermove",f=>{let i=f;if(r&&!n){if(i.pointerId!==r.pointerId)return;let h=i.clientX-r.x,u=i.clientY-r.y;if(Math.hypot(h,u)<l)return;d(r.card),a=!0,t.ownerDocument.getSelection?.()?.removeAllRanges(),i.preventDefault()}if(!n)return;let m=i;if(o==="resize"&&s){let h=Math.round((m.clientX-s.startX)/s.pitch),u=Math.min(s.maxSpan,go(s.startSpan+h));n.style.gridColumn=`span ${u}`,n.classList.toggle("wide",u>1);let b=Math.round((m.clientY-s.startY)/s.rowPitch);n.dataset.rows=String(ft(s.startRows+b))}else if(o==="reorder"){let u=n.ownerDocument.elementFromPoint(m.clientX,m.clientY)?.closest(".fcard");if(u&&u!==n&&u.parentElement===t){let b=u.getBoundingClientRect(),x=m.clientX>b.left+b.width/2;t.insertBefore(n,x?u.nextSibling:u)}}});let p=()=>{if(r=null,!!n){if(o==="resize"){let f=n.dataset.key;f&&(e.state.overviewSpan[f]=xa(n),e.state.overviewH[f]=ft(Number(n.dataset.rows)||1)),n.classList.remove("resizing")}else o==="reorder"&&(n.classList.remove("dragging"),e.state.overviewOrder=Ea(e.state.overviewOrder,Ca(t)));document.body.classList.remove("fdb-dragging"),o=null,n=null,s=null,ve(e),e.renderOverview()}};e.dis.listen(window,"pointerup",p),e.dis.listen(window,"pointercancel",p),e.dis.listen(t,"click",f=>{a&&(a=!1,f.stopPropagation(),f.preventDefault())},!0),e.dis.listen(t,"keydown",f=>{let i=f;if(i.altKey||i.ctrlKey||i.metaKey)return;let m=i.target,h=m.closest(".fcard[data-key]");if(!h)return;let u=h.dataset.key??"";if(m.closest(".drag-grip")){let b=i.key==="ArrowLeft"||i.key==="ArrowUp"?-1:i.key==="ArrowRight"||i.key==="ArrowDown"?1:0;if(!b)return;i.preventDefault(),Rs(e,t,u,b)}else if(m.closest(".fcard-resize")){let b=i.key==="ArrowRight"?1:i.key==="ArrowLeft"?-1:0,x=i.key==="ArrowUp"?1:i.key==="ArrowDown"?-1:0;if(!b&&!x)return;i.preventDefault(),Hs(e,u,b,x)}}),e.dis.add(()=>{r=null,a=!1,n&&(n.classList.remove("resizing","dragging"),document.body.classList.remove("fdb-dragging"),o=null,n=null,s=null)})}var Js=e=>e.toLocaleString("en-US");function Ks(e,t,o,n,r){let a=Ve(e.state,o.key,n),s=Jt(e.state,o.key,n),l=st(e.state,o.key,n),d=Ge(e.state,o.key,n),p=c("button",{class:`fval${a?" sel":""}${s?" excl":""}${l?" locked":""}`,type:"button",role:"checkbox","aria-checked":a?"true":"false","aria-disabled":l?"true":"false","aria-label":l?`${o.label}: ${n} (locked scope)`:`Include ${o.label} ${n}`,"data-val":n.toLowerCase(),title:l?`${n} - this instance is scoped to this value`:fo(e,n,r,d)},[c("span",{class:"cb"},a?[S(k.check,{size:11})]:[]),c("span",{class:"nm",text:n}),c("span",{class:"n",text:Js(r)})]),f=zt(e,r);if(f!==null&&(p.classList.add("has-bar"),p.style.setProperty("--pct",`${f}%`)),l||t.listen(p,"click",()=>e.toggleFacet(o.key,n)),l)return c("div",{class:"fval-row"},[p]);let i=c("button",{class:`fval-ex${s?" on":""}`,type:"button","aria-pressed":s?"true":"false","aria-label":`Exclude ${o.label} ${n}`,title:s?`Stop excluding ${n}`:`Exclude ${n} from the results`,text:"\u2260"});return t.listen(i,"click",m=>{m.stopPropagation(),e.excludeFacet(o.key,n)}),c("div",{class:`fval-row${s?" excl":""}`},[p,i])}function mn(e,t){let o=e.state.overviewSort[t.key]??"count",n=rr(e.state,t).slice();return o==="alpha"?n.sort((r,a)=>r.value.localeCompare(a.value)):n.sort((r,a)=>a.count-r.count),n}function mo(e,t,o,n,r){let a=c("button",{class:`exp${o?" on":""}`,type:"button","aria-pressed":o?"true":"false","aria-label":t,title:t},[S(e,{size:14})]);return r.listen(a,"click",s=>{s.stopPropagation(),n(s)}),a}function gn(e,t,o,n,r=()=>e.renderOverview()){let a=n==="alpha",s=c("button",{class:"exp sortbtn",type:"button","aria-label":a?"Sorted A\u2013Z - switch to sorting by count":"Sorted by count - switch to A\u2013Z",title:a?"Sorted A\u2013Z (click: by count)":"Sorted by count (click: A\u2013Z)"},[S(a?k.sortAlpha:k.sortCount,{size:14}),c("span",{class:"sortlbl",text:a?"A\u2013Z":"Count"})]);return t.listen(s,"click",l=>{l.stopPropagation(),e.state.overviewSort[o]=a?"count":"alpha",ve(e),r()}),s}function wa(e,t,o){let n=e.state,r=De(n,o.key),a=n.overviewCollapsed.has(o.key),s=Math.min(Ba,Math.max(1,n.overviewSpan[o.key]??1)),l=n.overviewSort[o.key]??"count",d=ft(n.overviewH[o.key]??1),p=c("div",{class:`fcard${a?" collapsed":""}${s>1?" wide":""}`,"data-key":o.key});p.style.gridColumn=`span ${s}`,p.dataset.rows=String(a?1:d);let f=c("div",{class:`fcard-h${r?" active":""}`},[Sa(o.label),c("span",{class:"fh-label",text:o.label})]);if(r)for(let x of Ot(Mt(n,o.key)))f.append(Dt(x,o.label,()=>e.clearFacetMode(o.key,x.negative),(C,Q,D)=>t.listen(C,Q,D)));f.append(c("span",{class:"badge",text:o.hasMore?`${o.values.length}+`:String(o.values.length)})),f.append(gn(e,t,o.key,l)),(s!==1||d!==1)&&f.append(mo(k.reset,"Reset size",!1,()=>{delete n.overviewSpan[o.key],delete n.overviewH[o.key],ve(e),e.renderOverview()},t));let i=mo(a?k.chevron:k.minimize,a?"Expand":"Minimize",a,()=>{a?n.overviewCollapsed.delete(o.key):n.overviewCollapsed.add(o.key),ve(e),e.renderOverview()},t);if(i.setAttribute("aria-expanded",a?"false":"true"),f.append(i),ka(e,t,f,o.key),p.append(f),a)return p.append(Lt(o.label)),p;let m=c("input",{class:"within",type:"text",placeholder:`filter ${o.label.toLowerCase()}\u2026`,value:n.overviewFilters[o.key]??"","aria-label":`Filter ${o.label}`}),h=c("div",{class:"fcard-vals"});if(o.values.length===0)return p.append(c("div",{class:"fcard-empty",text:"No values in this selection."})),p.append(Lt(o.label)),p;let u=null,b=()=>{u?.flush(),u=t.child();let x=(n.overviewFilters[o.key]??"").toLowerCase(),C=mn(e,o),Q=x?C.filter(M=>M.value.toLowerCase().includes(x)):C;H(h);let D=u;_t(D,h,Q.length,M=>Ks(e,D,o,Q[M].value,Q[M].count),Fs),x&&Q.length===0&&h.append(c("div",{class:"fmore",text:"No values match."})),!x&&o.hasMore};return t.listen(m,"input",()=>{n.overviewFilters[o.key]=m.value,b()}),p.append(m,h),p.append(Lt(o.label)),b(),p}function ya(e,t,o){let n=e.state,r=o==="time",a=r?"__time":"__bbox",s=r?"Time range":"Bounding box",l=r?n.time:n.bbox,d=n.overviewCollapsed.has(a),p=go(n.overviewSpan[a]??1),f=ft(n.overviewH[a]??1),i=c("div",{class:`fcard fcard-sp${d?" collapsed":""}${p>1?" wide":""}`,"data-key":a});i.style.gridColumn=`span ${p}`,i.dataset.rows=String(d?1:f);let m=c("div",{class:`fcard-h${l?" active":""}`},[Sa(s),S(r?k.clock:k.box,{size:14}),c("span",{class:"fh-label",text:s})]);m.append(c("span",{class:`badge${l?" on":""}`,text:l?"set":"any"})),(p!==1||f!==1)&&m.append(mo(k.reset,"Reset size",!1,()=>{delete n.overviewSpan[a],delete n.overviewH[a],ve(e),e.renderOverview()},t));let h=mo(d?k.chevron:k.minimize,d?"Expand":"Minimize",d,()=>{d?n.overviewCollapsed.delete(a):n.overviewCollapsed.add(a),ve(e),e.renderOverview()},t);if(h.setAttribute("aria-expanded",d?"false":"true"),m.append(h),ka(e,t,m,a),i.append(m),d)return i.append(Lt(s)),i;let u=c("div",{class:`fcard-special-body ${r?"time-body":"bbox-body"}`});if(r)u.append(un(e,t.child(),()=>e.renderOverview(),!0));else{let{editor:b,dispose:x}=hn(e,t.child(),()=>e.renderOverview(),{inline:!0});t.add(x),u.append(b)}return i.append(u),i.append(Lt(s)),i}function js(e,t){let o=e.state.overviewOrder;if(o.length===0)return t;let n=new Map(o.map((r,a)=>[r,a]));return t.slice().sort((r,a)=>(n.get(r.key)??1e6)-(n.get(a.key)??1e6))}function Ta(e){let t=e.state,o=!t.overviewStacked;if(t.overviewStacked=o,o){t.overviewSnapshot={collapsed:[...t.overviewCollapsed],span:{...t.overviewSpan},h:{...t.overviewH}};for(let n of t.facets)n.values.length&&t.overviewCollapsed.add(n.key);t.overviewCollapsed.add("__time"),t.overviewCollapsed.add("__bbox"),t.overviewStackSeen=[...t.facets.filter(n=>n.values.length).map(n=>n.key),"__time","__bbox"]}else{let n=t.overviewSnapshot;n?(t.overviewCollapsed=new Set(n.collapsed),t.overviewSpan={...n.span},t.overviewH={...n.h}):t.overviewCollapsed.clear(),t.overviewSnapshot=null,t.overviewStackSeen=[]}ve(e),bn(e)}function bn(e){let t=e.region("overview"),o=e.roots.overviewWrap.querySelector(".overview-cap");if(o){let m=o.querySelector(".stale-pill");e.state.overviewStale&&!m?o.append(c("span",{class:"stale-pill",title:"The last attempt to refresh the facet counts failed, so these numbers may be from an earlier query. They update on the next successful search.",text:"counts may be stale"})):!e.state.overviewStale&&m&&m.remove()}let n=e.roots.overviewGrid;n.classList.toggle("stacked",e.state.overviewStacked),n.dataset.rzwired||(n.dataset.rzwired="1",Gs(e,n));let r=e.cfg.overview.mainFacets??e.state.primaryFacets,a=new Set(r),s=e.cfg.overview.mainFacets!==null||a.size>0,l=tr(e.state);Ps(e,l.map(m=>m.key));let d=s?l.filter(m=>a.has(m.key)):l,p=s?l.filter(m=>!a.has(m.key)):[],f=[...d.map(m=>({key:m.key,make:()=>wa(e,t,m)})),{key:"__time",make:()=>ya(e,t,"time")},{key:"__bbox",make:()=>ya(e,t,"bbox")},...e.state.overviewAddOpen?p.map(m=>({key:m.key,make:()=>wa(e,t,m)})):[]],i=[];for(let m of js(e,f))i.push(m.make());if(p.length){let m=c("button",{class:"ov-addbtn",type:"button","aria-expanded":e.state.overviewAddOpen?"true":"false"},[c("span",{text:e.state.overviewAddOpen?"Hide additional facets":`Show additional facets (${p.length})`})]);t.listen(m,"click",()=>{e.state.overviewAddOpen=!e.state.overviewAddOpen,ve(e),e.renderOverview()});let h=c("div",{class:"ov-addrow"},[m]);i.push(h)}H(n,...i),Ns(e)}function bo(e){let t=e.roots.overviewGrid;for(let o of t.querySelectorAll(".fcard[data-key]")){let n=o.dataset.key;if(!n||n.startsWith("__"))continue;let r=new Set(Ee(e.state,n));for(let l of o.querySelectorAll(".fval")){let d=l.querySelector(".nm")?.textContent??"",p=Ve(e.state,n,d),f=r.has(d);l.classList.toggle("sel",p),l.classList.toggle("excl",f),l.setAttribute("aria-checked",p?"true":"false");let i=l.querySelector(".cb");if(i){let u=i.childElementCount>0;p&&!u?i.append(S(k.check,{size:11})):!p&&u&&(i.textContent="")}let m=l.parentElement;m?.classList.toggle("excl",f);let h=m?.querySelector(".fval-ex");h&&(h.classList.toggle("on",f),h.setAttribute("aria-pressed",f?"true":"false"))}let a=o.querySelector(".fcard-h");if(!a)continue;let s=De(e.state,n);a.classList.toggle("active",s>0);for(let l of a.querySelectorAll(".fh-count"))l.remove();if(s>0){let l=a.querySelector(".fh-label")?.textContent??n,d=a.querySelector(".fh-label");for(let p of Ot(Mt(e.state,n))){let f=Dt(p,l,()=>e.clearFacetMode(n,p.negative),(i,m,h)=>i.addEventListener(m,h));d?.after(f),d=f}}}}var Ws=[".nc",".nc4",".cdf",".netcdf",".grib",".grib2",".grb",".grb2",".hdf",".hdf4",".hdf5",".h5",".he5"];function vn(e){let t=[e.raw?.uri,e.file];for(let o of t){if(typeof o!="string"||!o)continue;let n;try{n=new URL(o)}catch{continue}if(n.protocol!=="http:"&&n.protocol!=="https:")continue;let r=n.pathname.toLowerCase();if(Ws.some(a=>r.endsWith(a)))return n.href}return null}function Ft(e){try{return decodeURIComponent(new URL(e).pathname.split("/").pop()??"").replace(/[/\\]/g,"_").trim()||"download"}catch{return"download"}}function Qa(e){let t=[],o=0;for(let n of e){let r=vn(n);r?t.push({row:n,href:r}):o++}return{eligible:t,skipped:o}}var Zs=[{kind:"intake",label:"Intake catalogue",desc:"intake-esm JSON",format:"JSON",icon:()=>ye("intake",{size:16})},{kind:"stac",label:"STAC catalogue",desc:"STAC ZIP",format:"ZIP",icon:()=>ye("stac",{size:16})},{kind:"uris",label:"URI manifest",desc:"plain-text URI list",format:"TXT",icon:()=>S(k.uris,{size:16})}];function xn(e){let t=c("button",{class:"xm-item",type:"button",role:"menuitem"},[c("span",{class:"xm-ic","aria-hidden":"true"},[e.icon]),c("span",{class:"xm-text"},[c("span",{class:"xm-label",text:e.label}),c("span",{class:"xm-desc",text:e.desc})]),e.format?c("span",{class:"xm-fmt","aria-hidden":"true",text:e.format}):null]);return t.setAttribute("aria-label",`${e.label} - ${e.desc}`),e.reg.listen(t,"click",e.onPick),t}function vo(e,t){let n=[...Zs.map(a=>xn({icon:a.icon(),label:a.label,desc:a.desc,format:a.format,onPick:()=>t.onPick(a.kind),reg:e})),...t.extra??[]],r=c("div",{class:"xm",role:"menu","aria-label":t.heading},n);return e.listen(r,"keydown",a=>{let s=a,l=Array.from(r.querySelectorAll('[role="menuitem"]'));if(!l.length)return;let d=l.indexOf(document.activeElement),p=f=>{s.preventDefault(),l[Math.max(0,Math.min(l.length-1,f))]?.focus()};s.key==="ArrowDown"?p(d<0?0:d+1):s.key==="ArrowUp"?p(d<0?l.length-1:d-1):s.key==="Home"?p(0):s.key==="End"&&p(l.length-1)}),[c("div",{class:"xm-head",role:"presentation",text:t.heading}),r]}function Ia(e){return`Export all ${e.toLocaleString("en-US")} result${e===1?"":"s"}`}function Ma(e){return`Export ${e.toLocaleString("en-US")} selected file${e===1?"":"s"}`}function Ys(e,t){let o=[...e.state.pickedKeys];if(o.length===0)return;let n=o.map(r=>`file=${encodeURIComponent(r)}`).join("&");e.exportCatalogue(t,n,"file")}function Xs(e,t){let o=e.region("popover"),n=el(e,o);t.setAttribute("aria-expanded","true"),e.popover.open(t,vo(o,{heading:Ma(e.state.pickedKeys.size),onPick:r=>{e.popover.close(),Ys(e,r)},...n?{extra:[n]}:{}}),{placement:"below",className:"export-pop",autoFocus:!0,onClose:()=>t.setAttribute("aria-expanded","false")})}function $s(e){let t=new Map(e.state.rows.map(o=>[o.key,o]));return[...e.state.pickedKeys].map(o=>t.get(o)?.file??o)}function _s(e){let t=new Map(e.state.rows.map(o=>[o.key,o]));return[...e.state.pickedKeys].map(o=>t.get(o)).filter(o=>!!o)}function el(e,t){let o=_s(e),{eligible:n,skipped:r}=Qa(o);return n.length===0?null:xn({icon:S(k.download,{size:16}),label:`Remote source files (${n.length})`,desc:r?`direct links - ${r} selected file${r===1?"":"s"} not remote`:"direct links - one download per click",onPick:()=>{e.popover.close(),tl(e,n,r)},reg:t})}function tl(e,t,o){let n=e.region("popover"),r=c("div",{class:"dl-list",role:"list"});for(let{row:s,href:l}of t)r.append(c("a",{class:"dl-item",role:"listitem",href:l,download:Ft(l),target:"_blank",rel:"noopener noreferrer",title:l},[S(k.download,{size:14}),c("span",{class:"dl-name",text:Ft(l)}),c("span",{class:"dl-path",text:s.file})]));let a=[c("div",{class:"dl-head",text:`${t.length} remote source file${t.length===1?"":"s"}`}),c("div",{class:"dl-note",text:o?`Click a file to download it. ${o} selected file${o===1?" is":"s are"} local or not a supported remote format, so ${o===1?"it has":"they have"} no direct link.`:"Click a file to download it."}),r];e.popover.open(e.roots.pickbar,a,{placement:"below",className:"dl-pop",autoFocus:!0,scrollBehavior:"close"}),n.add(()=>{})}function et(e){let t=e.region("pickbar"),o=e.roots.pickbar,n=e.state.pickedKeys.size;if(o.classList.toggle("show",n>0),n===0){H(o);return}let r=c("button",{class:"x",type:"button","aria-label":"Clear selection",title:"Clear selection"},[S(k.x,{size:16})]);t.listen(r,"click",()=>e.clearPicks());let a=c("span",{class:`cnt${n>=25?" at-cap":""}`},[c("b",{text:`${n} / ${25}`}),c("span",{text:" selected"})]),s=c("button",{class:"btn",type:"button",title:"Compare the selected files"},[S(k.info,{size:14}),c("span",{text:"Details"})]);t.listen(s,"click",()=>{e.state.detailSource="picks",e.toggleDetails(!0)});let l=c("button",{class:"btn",type:"button",title:"Download for your selection","aria-haspopup":"menu","aria-expanded":"false"},[S(k.download,{size:14}),c("span",{text:"Download"}),S(k.chevronDown,{size:12})]);t.listen(l,"click",()=>Xs(e,l));let d=so(e,n),p=n>10,f=c("button",{class:`btn primary${p?" locked":""}`,type:"button",disabled:d.disabled?"true":null,title:d.why},[S(k.aggregate,{size:15}),c("span",{text:"Aggregate"})]);d.disabled||t.listen(f,"click",()=>{e.openAggregate($s(e))}),H(o,r,a,c("div",{class:"spacer"}),s,l,f),d.note&&o.append(c("span",{class:"scope-note",style:"margin:0 0 0 4px",text:d.note}))}var ol={zarr:"zarr",nc:"netcdf",grib:"grib"};function nl(e){let t=e.toLowerCase(),o=t.split("/").pop()??t;if(/\.zarr(\/|$)/.test(t)||o.endsWith(".zarr"))return"zarr";let n=o.match(/\.([a-z0-9]+)$/),r=n?n[1]:"";return r==="nc"||r==="nc4"||r==="cdf"||r==="netcdf"?"nc":r==="grib"||r==="grib2"||r==="grb"||r==="grb2"?"grib":null}function Oa(e){let o=(e.split("/").pop()??e).match(/\.([a-z0-9]+)$/i);return o?o[1].slice(0,4):"file"}function wn(e){let t=nl(e);return t?c("div",{class:`ftile ${t}`,title:`${t} file`,"aria-hidden":"true"},[ye(ol[t],{chip:!1,size:22})]):c("div",{class:"ext",title:`${Oa(e)} file`},[document.createTextNode(Oa(e))])}function Bn(e){return e.state.pickedKeys.size>=25}var Da=new WeakMap;function Ua(e){let t=Da.get(e);return t||(t={renderedCount:-1,view:null,rowsBucket:null,epoch:-1,nodes:new Map,focusedKey:null,atCap:!1},Da.set(e,t)),t}function qa(e,t){let o=c("div",{class:t,text:e,title:e});return o.setAttribute("aria-label",e),o}function Na(e,t,o){let n=e.state.pickedKeys.has(o.key),r=Bn(e)&&!n,a=c("span",{class:`cb${r?" capped":""}`,role:"checkbox",tabindex:"0","aria-checked":n?"true":"false","aria-disabled":r?"true":"false","aria-label":r?`Select ${o.file} - unavailable: the ${25}-file selection limit is reached`:`Select ${o.file}`},n?[S(k.check,{size:11})]:[]),s=l=>{l.stopPropagation(),e.togglePick(o.key)};return t.listen(a,"click",s),t.listen(a,"keydown",l=>{let d=l.key;(d===" "||d==="Enter")&&(l.preventDefault(),s(l))}),a}function Ra(e,t,o){let n=c("button",{class:"kebab",type:"button","aria-label":"File actions","aria-haspopup":"menu",title:"File actions"},[S(k.kebab,{size:18})]);return t.listen(n,"click",r=>{r.stopPropagation(),al(e,t,n,o)}),n}function Ut(e,t,o,n,r){let a=c("div",{class:"pop-item",role:"menuitem",tabindex:"0"},[c("span",{class:"pic"},[o]),c("div",{text:n})]),s=()=>{r(),e.popover.close()};return t.listen(a,"click",s),t.listen(a,"keydown",l=>{let d=l.key;(d==="Enter"||d===" ")&&(l.preventDefault(),s())}),a}function al(e,t,o,n){let r=t.child(),a=[Ut(e,r,S(k.info,{size:16}),"Details",()=>{e.toggleDetails(!0),e.focusFile(n.key)}),Ut(e,r,S(k.inspect,{size:16}),"Inspect (ncdump)",()=>{e.openInspect(n.file)}),c("div",{class:"pop-sep"}),Ut(e,r,ye("intake",{size:16}),"Download Intake (.json)",()=>yn(e,"intake",n)),Ut(e,r,ye("stac",{size:16}),"Download STAC (.zip)",()=>yn(e,"stac",n)),Ut(e,r,S(k.uris,{size:16}),"Download URI manifest (.txt)",()=>yn(e,"uris",n))],s=vn(n);s&&(a.push(c("div",{class:"pop-sep"})),a.push(c("a",{class:"pop-item",role:"menuitem",href:s,download:Ft(s),target:"_blank",rel:"noopener noreferrer"},[c("span",{class:"pic"},[S(k.download,{size:16})]),c("div",{text:"Download source file"})]))),e.popover.open(o,a,{placement:"below",onClose:()=>r.flush()})}function yn(e,t,o){e.exportCatalogue(t,`file=${encodeURIComponent(o.file)}`)}function il(e,t,o){let n=e.state.pickedKeys.has(o.key),r=e.state.focusKey===o.key,a=c("div",{class:`row${n?" picked":""}${r?" focus":""}`,"data-key":o.key,"data-file":o.file,tabindex:"0"},[Na(e,t,o),c("div",{class:"uricell"},[wn(o.file),c("div",{class:"meta"},[qa(o.file,"path")])]),c("span",{class:"fs",text:o.fsType}),Ra(e,t,o)]);return t.listen(a,"click",()=>e.focusFile(o.key)),t.listen(a,"keydown",s=>{s.key==="Enter"&&e.focusFile(o.key)}),a}function sl(e,t,o){let n=e.state.pickedKeys.has(o.key),r=e.state.focusKey===o.key,a=c("div",{class:`gcard${n?" picked":""}${r?" focus":""}`,"data-key":o.key,"data-file":o.file,tabindex:"0"},[c("div",{class:"top2"},[Na(e,t,o),wn(o.file),c("span",{class:"fs",style:"margin-left:auto",text:o.fsType}),Ra(e,t,o)]),qa(o.file,"path gpath")]);return t.listen(a,"click",()=>e.focusFile(o.key)),t.listen(a,"keydown",s=>{s.key==="Enter"&&e.focusFile(o.key)}),a}function ll(){let e=c("div",{class:"skeleton-rows","aria-hidden":"true"});for(let t=0;t<6;t++)e.append(c("div",{class:"sk-row"},[c("div",{class:"sk",style:"width:30px;height:30px;border-radius:7px"}),c("div",{class:"sk",style:"flex:1;height:14px"}),c("div",{class:"sk",style:"width:48px;height:14px"})]));return e}function cl(e,t){let o=c("button",{class:"btn",type:"button",text:"Clear all"});return t.listen(o,"click",()=>e.clearAllFacets()),c("div",{class:"state-msg"},[c("div",{class:"big"},[S(k.search,{size:30})]),c("p",{text:"No files match these facets."}),o])}function dl(e,t){let o=c("button",{class:"btn",type:"button"},[S(k.retry,{size:15}),c("span",{text:"Retry"})]);return t.listen(o,"click",()=>e.retrySearch()),c("div",{class:"state-msg err"},[c("p",{text:e.state.searchError??"Search failed."}),o])}function za(e,t){let o=e.roots.moreWrap;H(o);let n=e.state.rows.length;if(!(e.state.totalCount>n&&n>0))return;let r=e.state.totalCount,a=e.state.search==="loading",s=Math.min(100,Math.max(1,Math.round(n/r*100))),l=c("button",{class:"btn load-next",type:"button",disabled:a?"true":null,"aria-label":"Load next 100 results"},a?[c("span",{class:"spin","aria-hidden":"true"}),c("span",{text:"Loading\u2026"})]:[c("span",{text:"Load next 100"})]);t.listen(l,"click",()=>e.loadNextPage());let d=c("div",{class:"more-info"},[c("span",{text:`Showing ${n.toLocaleString("en-US")} of ${r.toLocaleString("en-US")}`}),c("span",{class:"more-pct",text:`${s}%`})]),p=c("div",{class:"more-bar"},[c("div",{class:"more-bar-fill",style:`width:${s}%`})]);o.append(c("div",{class:"more-loader"},[d,p,l]))}function Ha(e){let t=Ua(e),o=e.roots.results,n=e.region("results-more");e.roots.listHead.hidden=!0,kn(e);let r=()=>(t.rowsBucket=e.region("results-rows"),t.rowsBucket);if(e.state.search==="loading"&&e.state.rows.length===0){r(),t.renderedCount=-1,t.view=null,o.className="",t.nodes.clear(),H(o,ll()),H(e.roots.moreWrap);return}if(e.state.search==="error"){let i=r();t.renderedCount=-1,t.view=null,o.className="",t.nodes.clear(),H(o,dl(e,i)),H(e.roots.moreWrap);return}if(e.state.search==="empty"||e.state.search==="loaded"&&e.state.rows.length===0){let i=r();t.renderedCount=-1,t.view=null,o.className="",t.nodes.clear(),H(o,cl(e,i)),H(e.roots.moreWrap);return}let a=e.state.rows,s=e.state.view,l=s==="list"?il:sl;if(e.roots.listHead.hidden=s!=="list",t.view===s&&t.rowsBucket!==null&&t.epoch===e.state.rowsEpoch&&t.renderedCount>=0&&a.length>=t.renderedCount&&o.childElementCount===t.renderedCount){let i=t.rowsBucket;if(a.length>t.renderedCount){let m=document.createDocumentFragment();for(let h=t.renderedCount;h<a.length;h++){let u=l(e,i,a[h]);t.nodes.set(a[h].key,u),m.append(u)}o.append(m),t.renderedCount=a.length}La(e),za(e,n);return}let p=r();o.className=s==="list"?"rows":"grid",o.textContent="",t.nodes.clear();let f=document.createDocumentFragment();for(let i of a){let m=l(e,p,i);t.nodes.set(i.key,m),f.append(m)}o.append(f),t.renderedCount=a.length,t.view=s,t.epoch=e.state.rowsEpoch,t.focusedKey=e.state.focusKey,t.atCap=Bn(e),La(e),za(e,n)}function La(e){e.roots.app.classList.toggle("many-results",e.state.rows.length>=500)}function qt(e,t){let o=Ua(e),n=Bn(e),r=n!==o.atCap;if(o.atCap=n,t===void 0||r){for(let[s,l]of o.nodes)Fa(e,s,l,n);o.focusedKey=e.state.focusKey,kn(e);return}let a=new Set(t);o.focusedKey&&o.focusedKey!==e.state.focusKey&&a.add(o.focusedKey),e.state.focusKey&&a.add(e.state.focusKey);for(let s of a){let l=o.nodes.get(s);l&&Fa(e,s,l,n)}o.focusedKey=e.state.focusKey,kn(e)}function Fa(e,t,o,n){let r=e.state.pickedKeys.has(t),a=e.state.focusKey===t;o.classList.toggle("picked",r),o.classList.toggle("focus",a);let s=o.querySelector(".cb");if(!s)return;s.setAttribute("aria-checked",r?"true":"false");let l=n&&!r;s.classList.toggle("capped",l),s.setAttribute("aria-disabled",l?"true":"false");let d=o.dataset.file??t;s.setAttribute("aria-label",l?`Select ${d} - unavailable: the ${25}-file selection limit is reached`:`Select ${d}`);let p=s.childElementCount>0;r&&!p?s.append(S(k.check,{size:11})):!r&&p&&(s.textContent="")}function Sn(e){let t=e.state.rows.map(p=>p.key),o=t.length>25,n=o?t.slice(0,25):t,r=n.length>0&&n.every(p=>e.state.pickedKeys.has(p)),a=t.length-n.length,s=e.state.pickedKeys.size,l=r?`Clear ${s} selected`:o?`Select first ${25}`:"Select all",d=r?`Clear the ${s} selected file${s===1?"":"s"}`:o?`Select the first ${25} of ${t.length} listed files`:"Select all listed files";return{target:n,capped:o,omitted:a,willClear:r,label:l,ariaLabel:d}}function kn(e){let t=e.roots.selectAllBtn;if(!t)return;let o=t.querySelector(".cb"),n=t.querySelector(".ctrl-lbl"),r=e.state.rows.length,a=0;for(let p of e.state.rows)e.state.pickedKeys.has(p.key)&&a++;let s=Sn(e),l=r>0&&s.willClear,d=a>0&&!l;t.disabled=r===0,o&&(o.classList.toggle("on",l),o.classList.toggle("mixed",d),o.textContent="",l&&o.append(S(k.check,{size:11}))),n&&(n.textContent=s.label),t.setAttribute("aria-label",s.ariaLabel),t.setAttribute("aria-checked",l?"true":d?"mixed":"false")}var pl=60,Al=8;function fl(e){if(!(e.state.sidebarSeeded||e.state.facets.length===0)){for(let t of e.state.facets)De(e.state,t.key)&&e.state.sidebarOpen.add(t.key);e.state.sidebarSeeded=!0}}var ul=e=>e.toLocaleString("en-US");function hl(e,t,o,n,r){let a=Ve(e.state,o.key,n),s=Jt(e.state,o.key,n),l=st(e.state,o.key,n),d=Ge(e.state,o.key,n),p=c("span",{class:"cb"},a?[S(k.check,{size:11})]:[]),f=c("button",{class:`fval${a?" sel":""}${s?" excl":""}${l?" locked":""}`,type:"button",role:"checkbox","aria-checked":a?"true":"false","aria-disabled":l?"true":"false","aria-label":l?`${o.label}: ${n} (locked scope)`:`Include ${o.label} ${n}`,title:l?`${n} - this instance is scoped to this value`:fo(e,n,r,d)},[p,c("span",{class:"nm",text:n}),c("span",{class:"n",text:ul(r)})]),i=zt(e,r);if(i!==null&&i>0&&(f.classList.add("has-bar"),f.style.setProperty("--pct",`${i}%`)),l||t.listen(f,"click",()=>e.toggleFacet(o.key,n)),l)return c("div",{class:"fval-row"},[f]);let m=c("button",{class:`fval-ex${s?" on":""}`,type:"button","aria-pressed":s?"true":"false","aria-label":`Exclude ${o.label} ${n}`,title:s?`Stop excluding ${n}`:`Exclude ${n} from the results`,text:"\u2260"});return t.listen(m,"click",h=>{h.stopPropagation(),e.excludeFacet(o.key,n)}),c("div",{class:`fval-row${s?" excl":""}`},[f,m])}function Pa(e,t,o){let n=e.state.selected[o.key]??[],r=Ee(e.state,o.key),a=De(e.state,o.key),s=e.state.sidebarOpen.has(o.key),l=c("div",{class:`facet${s?" open":""}`,"data-key":o.key}),d=c("div",{class:`facet-head${a?" active":""}`}),p=c("button",{class:"fh-toggle",type:"button","aria-expanded":s?"true":"false"}),f=c("span",{class:"fh-text"},[c("span",{class:"fh-label",text:o.label})]);if(a){let M=[...n,...r.map(z=>`${ma} ${z}`)];f.append(c("span",{class:"fh-sel",text:M.join(", ")}))}if(p.append(f),d.append(p),a){let M=Mt(e.state,o.key);for(let z of Ot(M))d.append(Dt(z,o.label,()=>e.clearFacetMode(o.key,z.negative),(N,G,Y)=>t.listen(N,G,Y)))}else{let M=o.hasMore?`${o.values.length}+`:String(o.values.length);d.append(c("span",{class:"badge",text:M}))}let i=c("span",{class:"chev"},[S(k.chevron,{size:12})]);d.append(i);let m=c("div",{class:"facet-body"}),h=c("div",{class:"fval-list"}),u=c("input",{class:"fval-search",type:"search",placeholder:`Search ${o.label.toLowerCase()}\u2026`,"aria-label":`Search ${o.label} values`,autocomplete:"off"}),b=c("div",{class:"fmore",text:"No matching values."});b.style.display="none";let x=M=>{let z=M.trim().toLowerCase(),N=mn(e,o),G=z?N.filter(Y=>Y.value.toLowerCase().includes(z)):N;H(h),b.style.display=G.length?"none":"",_t(t,h,G.length,Y=>hl(e,t,o,G[Y].value,G[Y].count),pl)},C=()=>{let M=e.state.overviewSort[o.key]??"count",z=gn(e,t,o.key,M,()=>{z.remove(),C(),x(u.value)});z.classList.add("fh-sort"),d.insertBefore(z,i)},Q=!1,D=()=>{Q||(Q=!0,C(),o.values.length>Al&&(t.listen(u,"input",()=>x(u.value)),t.listen(u,"keydown",M=>{M.key==="Escape"&&(u.value="",x(""))}),m.append(u)),m.append(h,b),x(""))};return s&&D(),t.listen(d,"click",()=>{let M=!l.classList.contains("open");l.classList.toggle("open",M),p.setAttribute("aria-expanded",M?"true":"false"),M?(e.state.sidebarOpen.add(o.key),D()):e.state.sidebarOpen.delete(o.key)}),l.append(d,m),l}function Va(e,t,o){let n=o==="time",r=n?!!e.state.time:!!e.state.bbox,a=c("button",{class:`special${r?" set":""}`,type:"button","aria-label":n?"Edit time range":"Edit bounding box"});a.append(c("span",{class:"lead"},[S(n?k.clock:k.box,{size:15})])),a.append(c("span",{text:n?"Time range":"Bounding box"}));let s=n?"time_select":"draw on map";return n&&e.state.time?s=`${e.state.time.from}\u2192${e.state.time.to}`:!n&&e.state.bbox&&(s="on map"),a.append(c("span",{class:"val",text:s})),t.listen(a,"click",l=>{l.stopPropagation(),n?e.openTimeEditor(a):e.openBboxEditor(a)}),a}function Ga(e){let t=e.region("sidebar"),o=e.roots.facetList;fl(e);let n=new Set(e.state.primaryFacets),r=e.state.facets.filter(p=>n.size===0||n.has(p.key)),a=e.state.facets.filter(p=>n.size>0&&!n.has(p.key)),s=Object.values(e.state.selected).reduce((p,f)=>p+f.length,0)+(e.state.time?1:0)+(e.state.bbox?1:0),l=[c("span",{class:"sf-title",text:"Filter"})];if(s){let p=c("button",{class:"sf-badge",type:"button",title:"Clear all filters","aria-label":`Clear all ${s} filter${s===1?"":"s"}`},[c("span",{class:"sf-n",text:String(s)}),c("span",{class:"sf-x","aria-hidden":"true",text:"\xD7"})]);p.style.setProperty("--fb-ch",String(String(s).length)),t.listen(p,"click",()=>e.clearAllFacets()),l.push(p);let f=c("button",{class:"sf-clear",type:"button",title:"Clear all filters","aria-label":`Clear all ${s} filter${s===1?"":"s"}`,text:"Clear all"});t.listen(f,"click",()=>e.clearAllFacets()),l.push(f)}let d=[c("div",{class:"side-filterhead"},l)];if(e.state.facets.length===0)d.push(c("div",{class:"fmore",text:"Run a search to load facet values."}));else{for(let p of r)d.push(Pa(e,t,p));if(d.push(Va(e,t,"time")),d.push(Va(e,t,"bbox")),a.length){let p=c("button",{class:"addbtn",type:"button",text:e.state.sidebarAddOpen?"\u2212 Hide additional facets":"\uFF0B Show additional facets"});if(t.listen(p,"click",()=>{e.state.sidebarAddOpen=!e.state.sidebarAddOpen,e.renderSidebar()}),d.push(p),e.state.sidebarAddOpen)for(let f of a)d.push(Pa(e,t,f))}else d.push(c("div",{"aria-hidden":"true"}))}H(o,...d)}var En=/^[A-Za-z0-9_./:@%+=-]+$/;function Ja(e){return e===""?"''":En.test(e)?e:`'${e.replace(/'/g,"'\\''")}'`}function ml(e){return e===""?"''":En.test(e)?e:`'${e.replace(/'/g,"''")}'`}function gl(e){return e===""?'""':En.test(e)?e:`"${e.replace(/"/g,'""')}"`}var Fe={bash:{id:"bash",label:"bash",prompt:"$",cont:"\\",quote:Ja},zsh:{id:"zsh",label:"zsh",prompt:"%",cont:"\\",quote:Ja},powershell:{id:"powershell",label:"PowerShell",prompt:"PS>",cont:"`",quote:ml},cmd:{id:"cmd",label:"cmd",prompt:"C:\\>",cont:"^",quote:gl}};function Ka(e){return e==="windows"?"powershell":"bash"}function ja(e){let t=e??(typeof navigator<"u"?navigator:void 0);if(!t)return"unknown";let o=t.userAgentData?.platform;if(typeof o=="string"&&o){let a=o.toLowerCase();if(a.includes("win"))return"windows";if(a.includes("mac"))return"mac";if(a.includes("linux")||a.includes("chrome os")||a.includes("android"))return"linux"}let n=(t.platform??"").toLowerCase();if(n){if(n.includes("win"))return"windows";if(n.includes("mac"))return"mac";if(n.includes("linux")||n.includes("x11"))return"linux"}let r=(t.userAgent??"").toLowerCase();return r.includes("windows")?"windows":r.includes("mac os")||r.includes("macintosh")?"mac":r.includes("linux")||r.includes("x11")?"linux":"unknown"}function Wa(e,t){let o=Fe[t?.shell??"bash"],n=["freva-client databrowser data-search"];e.flavour!=="freva"&&n.push(`--flavour ${o.quote(e.flavour)}`);for(let[r,a]of xt(e))n.push(`${r}=${o.quote(a)}`);return n.push(vl(e,o)),n.filter(Boolean).join(" ").trim()}function bl(e,t=Fe.bash){let o=t.quote,n=[],r=e.time;r&&(r.from||r.to)&&(n.push(`time=${o(`${r.from||"1"} TO ${r.to||"9999"}`)}`),n.push(`time_select=${r.mode}`));let a=e.bbox;return a&&(n.push(`bbox=${a.minLon},${a.maxLon},${a.minLat},${a.maxLat}`),n.push(`bbox_select=${a.mode}`)),n.join(" ")}function vl(e,t=Fe.bash){let o=t.quote,n=bl(e,t),r=Wt(e).map(([a,s])=>`${a}=${o(s)}`).join(" ");return[n,r].filter(Boolean).join(" ")}var Za=160,xl=200,Cn=60,Tn={bbox:"bbox=minLon,maxLon,minLat,maxLat - e.g. bbox=-10,10,35,60 \xB7 add bbox_select (defaults to flexible)",time:'time="2000 TO 2010" - e.g. time="2000-01 TO 2010-12" \xB7 add time_select (defaults to flexible)'};function Ya(e){return e==="bbox_select"||e==="time_select"?[...bt]:null}var wl=/_n(?:o(?:t_?)?)?$/;function Xa(e){let t=ct(e.dis),o=ct(e.dis),n=new Map,r=-1,a=e.cfg.terminal.os??ja(),s=e.cfg.terminal.shell??Ka(a);function l(){let g=new Set(yt(e.state));if(g.size)for(let w of we)g.add(w);return g}function d(){let g=l(),w=g.size?[...g]:[...He,...it];return[...new Set([...w,...we])].filter(B=>!xe(e.state,B))}function p(g){let w=g.toLowerCase(),y=d();return wl.test(w)?[...y.filter(I=>!we.has(I)).map(Pe).filter(I=>I.startsWith(w)),...y.filter(I=>I.startsWith(w))]:y.filter(I=>I.startsWith(w))}function f(g){let w=e.state.facets.find(y=>y.key===Z(g));return w?w.values.map(y=>({value:y.value,count:y.count})):[]}function i(g){let w=Z(g),y=n.get(w);return y&&y.length?y:f(w).map(B=>B.value)}async function m(g){let w=Z(g);if(!xe(e.state,w))try{let y=e.api.channelSignal("autocomplete"),B=await e.api.metadataSearch(e.state.flavour,e.state.uniqKey,mr(e.state,w),y),I=Kt(B.facets[w]??[]);I.length&&(n.set(w,I.map(([E])=>E)),ae?.render())}catch{}}function h(g,w){for(let y of Ke(g))if(y.kind==="tok"&&w>=y.start&&w<=y.end)return y;return null}function u(g,w){let y=h(g,w);return y?{start:y.start,typed:g.slice(y.start,w).replace(/"/g,"")}:{start:w,typed:""}}function b(g,w){for(let y of Ke(g))if(y.kind==="tok"&&y.start===w)return y.end;return w}function x(g,w,y){let B=b(g,w);if(!g.slice(w,B).includes("=")){let q=`${y}=`;return{text:g.slice(0,w)+q+g.slice(B),caret:w+q.length}}let E=g.indexOf("=",w),U=`${g.slice(w,E)}=${rt(y)} `;return{text:g.slice(0,w)+U+g.slice(B),caret:w+U.length}}function C(){let g=Fe[s],w=[{text:g.prompt,kind:"prompt"},{text:" "},{text:"freva-client databrowser data-search",kind:"fixed"}];e.state.flavour!=="freva"&&(w.push({text:" "},{text:"--flavour",kind:"fixed"}),w.push({text:" "},{text:e.state.flavour,kind:"accent"}));for(let[y,B]of xt(e.state))w.push({text:" "},{text:y,kind:"key"},{text:"=",kind:"eq"},{text:g.quote(B),kind:"value"});return w}function Q(g){let w=l(),y=w.size>0,B=[],I="";for(let E of Ke(g)){if(E.kind==="ws"){B.push({text:E.raw});continue}let P=E.value.indexOf("=");if(P<0){let R=!y||w.has(Z(E.value.toLowerCase()))||[...w].some(W=>W.startsWith(Z(E.value.toLowerCase())));B.push({text:E.raw,kind:R?"key":"bad"}),!R&&!I&&(I=`\u201C${E.value}\u201D is not a facet`);continue}let U=E.value.slice(0,P),q=E.value.slice(P+1),oe=E.raw.indexOf("="),se=oe<0?E.raw:E.raw.slice(0,oe),me=oe<0?"":E.raw.slice(oe+1),{baseKey:Qe}=ue(U.toLowerCase()),pe=!y||w.has(Qe);B.push({text:se,kind:pe?"key":"bad"}),oe>=0&&B.push({text:"=",kind:"eq"}),!pe&&!I&&(I=`\u201C${U}\u201D is not a facet`);let ge=!1;if(pe&&q){let R=Vo(e.state,U.toLowerCase());R&&!R.has(q)&&(ge=!0,I||(I=`\u201C${q}\u201D isn\u2019t a ${U} value`))}B.push({text:me,kind:ge?"bad":"value"})}return{segments:B,warning:I}}function D(g,w){let{start:y,typed:B}=u(g,w),I=w===g.length,E=R=>x(g,y,R),P=B.indexOf("=");if(P<0){let R=B.toLowerCase(),W=p(R),ee=W.filter(te=>te.length>R.length).sort((te,le)=>te.length-le.length)[0];return{items:W.slice(0,Cn).map(te=>({value:te,count:null})),ghost:I&&B&&ee?ee.slice(B.length):"",ghostValue:ee,apply:E}}let U=B.slice(0,P).toLowerCase(),q=B.slice(P+1),oe=q.toLowerCase(),se=Tn[U];if(se)return{items:[],message:se,apply:E};let me=Ya(U);if(me){let R=me.filter(ee=>ee.startsWith(oe)),W=R.filter(ee=>ee.length>q.length)[0];return{items:R.map(ee=>({value:ee,count:null})),ghost:I&&W?W.slice(q.length):"",ghostValue:W,apply:E}}t(()=>{m(U)},Za);let Qe=new Map(f(U).map(R=>[R.value,R.count??null])),pe=i(U).filter(R=>R.toLowerCase().startsWith(oe)),ge=pe.filter(R=>R.length>q.length).sort((R,W)=>R.length-W.length)[0];return{items:pe.slice(0,Cn).map(R=>({value:R,count:Qe.get(R)??null})),ghost:I&&ge?ge.slice(q.length):"",ghostValue:ge,apply:E}}function M(g,w,y){if(y)return g;let B=h(g,w);return B?g.slice(0,B.start)+g.slice(B.end):g}function z(g){let w={};for(let y of Object.keys(g))we.has(y.toLowerCase())||(w[y]=g[y]);return w}function N(g){let{rejected:w}=kt(e.state,z(je(g))),y=[...w];for(let I of Ke(g)){if(I.kind!=="tok")continue;let E=g.slice(I.start,I.end),P=E.indexOf("=");if(P<0)continue;let U=E.slice(0,P).toLowerCase();we.has(U)&&E.slice(P+1).trim()===""&&!y.includes(E)&&y.push(E)}let B=/\S+$/.exec(g)?.[0]??"";if(B&&!y.includes(B)){let I=z(je(B)),E=Object.keys(je(B)).every(U=>we.has(U.toLowerCase()));!(Object.keys(I).length&&!kt(e.state,I).rejected.length&&Object.values(I).every(U=>U.every(Boolean)))&&!E&&y.push(B)}return[...new Set(y)].join(" ")}function G(g){let w=B=>xe(e.state,B),y=[];for(let B of e.state.facets){if(y.length>=(g==="cli"?2:1))break;let I=B.key.toLowerCase();if(w(I)||we.has(I))continue;let E=B.values[0]?.value;E&&y.push([I,E])}if(!y.length){let B=He.find(I=>!w(I));return B?g==="cli"?`${B}=\u2026`:`${B}="\u2026"`:""}return y.map(([B,I])=>g==="cli"?`${B}=${Fe[s].quote(I)}`:`${B}=${JSON.stringify(I)}`).join(" ")}let Y={id:"cli",cssPrefix:"te",label:Fe[s].label,icon:k.bashTab,multiline:!1,get placeholder(){return G("cli")},ariaLabel:"Command facets",prefix:C,text:()=>yr(e.state),highlight:Q,complete:D,commit(g,w,y){let B=M(g,w,y),I=e.applyTerminalDraft(B),E=e.terminalDraftErrors(B),U=(Q(g).warning??"")||E[0]||"",q=B!==g,oe=Ke(B).some(se=>{if(se.kind!=="tok")return!1;let me=se.value.indexOf("=");return me<1||se.value.slice(me+1)===""});return{dirty:I>0||q||U!==""||oe,warning:E[0]}},copyText:()=>Wa(e.state,{shell:s}),revision:()=>e.state.externalEdits,retain:N};function $(g){let w=0,y="",B=0;for(let I=0;I<g.length;I++){let E=g[I];if(y){if(E==="\\"){I++;continue}E===y&&(y="");continue}if(E==='"'||E==="'"){y=E;continue}E==="["||E==="{"||E==="("?w++:E==="]"||E==="}"||E===")"?w=Math.max(0,w-1):E===","&&w===0&&(B=I+1)}return g.slice(B)}function he(g,w){let y=g[w];if(y!==void 0&&y!==`
`&&y!==",")return null;let B=g.lastIndexOf(`
`,w-1)+1,I=$(g.slice(B,w)),E=I.indexOf("=");if(E<0){let q=I.match(/([\w-]*)$/);return{word:q?q[1]:"",isValue:!1,key:""}}let P=I.slice(0,E).trim().replace(/["']/g,""),U=I.slice(E+1).match(/([^\s,"'[\]]*)$/);return{word:U?U[1]:"",isValue:!0,key:P}}function J(g,w,y,B,I){let E=w-y,P;return B?((g[E-1]==='"'||g[E-1]==="'")&&E--,P=`${JSON.stringify(I)},`):P=`${I}=`,{text:g.slice(0,E)+P+g.slice(w),caret:E+P.length}}function fe(g,w,{cont:y=!1,code:B="fixed"}={}){return[{text:g,kind:y?"contprompt":"prompt"},{text:w,kind:B}]}let j={id:"py",label:"python",icon:k.pySnake,multiline:!0,get placeholder(){return G("py")},ariaLabel:"databrowser keyword arguments",prefix:()=>[],headerLines:()=>{let g=[fe(">>> ","from freva_client import databrowser"),fe(">>> ","databrowser(")];for(let w of Zo(e.state))g.push(fe("... ",`    ${w.code},`,{cont:!0,code:w.scope?"fixed":"muted"}));return g},footerLines:()=>[[{text:"... ",kind:"contprompt"},{text:")",kind:"fixed"}]],text:()=>Xo(e.state),highlight:g=>({segments:[{text:g}]}),complete(g,w){let y=he(g,w);if(!y)return null;let B=y.word.toLowerCase(),I=q=>J(g,w,y.word.length,y.isValue,q);if(y.isValue&&Tn[y.key])return{items:[],message:Tn[y.key],apply:I};let E=y.isValue?Ya(y.key):null,P=E?E.filter(q=>q.startsWith(B)):y.isValue?i(y.key).filter(q=>q.toLowerCase().startsWith(B)):p(B);y.isValue&&y.key&&!E&&t(()=>{m(y.key)},Za);let U=P.filter(q=>q.toLowerCase().startsWith(B)&&q.length>y.word.length).sort((q,oe)=>q.length-oe.length)[0];return{items:P.slice(0,Cn).map(q=>({value:q,count:null})),ghost:y.word&&U?U.slice(y.word.length):"",ghostValue:U,apply:I}},commit(g,w,y){let B=()=>{e.applyTerminalDraft(gr(g))};return y?B():o(B,xl),{dirty:!1}},copyText:()=>br(e.state),revision:()=>e.state.externalEdits},ae=Zn(e.roots.overlay,{tabs:[Y,j],activeTab:e.state.terminalTab,os:a==="unknown"?"mac":a,bounds:()=>e.roots.overlay,tooltipAttribute:"data-tip",storage:{getTheme:()=>ta(),setTheme:g=>oa(g),getAlpha:()=>ra(),setAlpha:g=>aa(g)},fallback:()=>e.roots.app.dataset.terminalFallback==="true"||typeof window.matchMedia=="function"&&window.matchMedia("(max-width: 720px)").matches,menuItems:[{label:"How to install freva-client",onSelect:()=>e.openHelp()},{label:"Documentation \u2197",href:"https://freva-org.github.io/freva-nextgen/"}],onTabChange:g=>{e.state.terminalTab=g==="py"?"py":"cli"},onFocusChange:g=>{e.state.terminalFocused=g},onClose:()=>{e.state.terminalFocused=!1,e.roots.app.querySelector('[aria-label="Command terminal"]')?.focus()},onCopyFailed:g=>e.toast("error",g)});return e.dis.add(()=>ae.destroy()),{render(){e.state.facetsVersion!==r&&(r=e.state.facetsVersion,n.clear()),ae.render()},toggle(){ae.toggle()},isShown(){return ae.isShown()},destroy(){ae.destroy()}}}var yl=[{title:"load/{flavour} is a GET",body:"The data-load endpoint is a GET that returns 201 and streams zarr URLs; it is auth.required. It is never issued as a POST."},{title:"Time is unbracketed",body:"Time queries are sent as time=<from> TO <to> with a separate time_select=<mode>. The prototype\u2019s [ \u2026 TO \u2026 ] bracket form is not used anywhere."},{title:"Catalogue export guard",body:'Intake/STAC export requests max-results=100000; the server answers 413 with the exact detail "Result stream too big." Export is disabled client-side past that ceiling.'},{title:"Browsing fetches no per-file metadata",body:"Result rows are the thin {file|uri, fs_type} only. Full per-file facets are fetched lazily - one ?file= call per inspected file - and rendered in the Details panel."},{title:"V4 - strict/file bbox+time deferred",body:"Only flexible (Intersects) ships enabled. strict/file modes for both the time and bbox editors are gated behind config.enableStrictBBoxModes until verified against the backend."},{title:"V10 - per-file extent deferred",body:"Per-file bbox renders whenever the ?file= response carries a bbox (the backend must include bbox in the file field list). Time range is derived from the filename, else shown as not available. Coordinates are never fabricated."},{title:"Embedding - transformed ancestors break fixed overlays",body:"Popovers/menus/tooltips position as fixed relative to the viewport. If any ANCESTOR of the mount establishes a containing block for fixed elements, they anchor to that ancestor instead and appear offset. Triggers: transform, filter, backdrop-filter, perspective, contain: paint/layout/strict, or will-change of any of those. Mount outside such wrappers, or drop the property on the ancestor."},{title:"Leaflet is a page-global install (survives destroy)",body:"The Leaflet stylesheet (and window.L) are installed once per PAGE, tied to no component - because tying the stylesheet to a component lifecycle caused maps in other components to lose their layout when that component re-rendered. Consequently they persist after destroy(): the stylesheet stays in <head> and window.L stays defined. destroy() fully tears down THIS widget (DOM, observers, in-flight requests); it does not, by design, uninstall this shared page-global. The script tag itself is removed once it registers window.L."}];function $a(e){let t=c("div",{class:"notes-list"});for(let a of yl)t.append(c("div",{class:"nl"},[c("div",{class:"h",text:a.title}),c("p",{text:a.body})]));let o=c("button",{class:"x",type:"button","aria-label":"Close developer notes"},[S(k.x,{size:16})]),n=c("div",{class:"notes-drawer",role:"complementary","aria-label":"Developer notes"},[c("h4",{},[S(k.notes,{size:16}),c("span",{text:"Developer notes"}),o]),t]);e.roots.app.append(n),e.dis.add(()=>n.remove());let r=a=>{n.classList.toggle("show",a)};return e.dis.listen(o,"click",()=>r(!1)),H(t,...Array.from(t.childNodes)),{toggle(){r(!n.classList.contains("show"))},isShown(){return n.classList.contains("show")}}}function _a(e,t,o={}){let n=t.trim().toLowerCase();if(!n)return[];let r=[],a=[];for(let l of e){let d=o.label?o.label(l):l.label;for(let p of l.values){if(o.isApplied?.(l.key,p.value))continue;let f=p.value.toLowerCase(),i=o.describe?.(l.key,p.value)??null,m=f.includes(n),h=i?i.toLowerCase().includes(n):!1;if(!m&&!h)continue;let u={key:l.key,label:d,value:p.value,count:p.count,desc:i};f.startsWith(n)?r.push(u):a.push(u)}}let s=(l,d)=>d.count-l.count;return r.sort(s),a.sort(s),[...r,...a].slice(0,o.limit??40)}function kl(e,t){return _a(e.state.facets,t,{label:o=>wt(e.state,o.key),describe:(o,n)=>Ge(e.state,o,n),isApplied:(o,n)=>Ve(e.state,o,n)})}function ri(e,t){let o=e.dis,n=c("div",{class:"vsearch-pop",role:"listbox","aria-label":"Facet value matches"});n.style.position="absolute",e.roots.app.append(n);let r=[],a=0,s=!1,l=null,d=()=>{s=!1,n.classList.remove("show"),H(n),l?.flush(),l=null},p=()=>{let h=t.getBoundingClientRect().width;At(e.roots.app,n,t,{placement:"below",gap:5,minWidth:Math.max(h,280),maxWidth:Math.max(h,420),maxHeight:340})},f=()=>{n.querySelectorAll(".vs-item").forEach((h,u)=>{let b=u===a;h.classList.toggle("hl",b),h.setAttribute("aria-selected",b?"true":"false"),b&&h.scrollIntoView({block:"nearest"})})},i=h=>{let u=r[h];u&&(t.value="",d(),e.toggleFacet(u.key,u.value))},m=()=>{r=kl(e,t.value),l?.flush(),l=o.child();let h=l;if(r.length===0){t.value.trim()?(H(n,c("div",{class:"vs-empty",text:"No matching facet values."})),n.classList.add("show"),s=!0,p()):d();return}a=0;let u=r.map((b,x)=>c("div",{class:`vs-item${x===0?" hl":""}`,role:"option","aria-selected":x===0?"true":"false",title:b.desc?`${b.value} - ${b.desc}`:`${b.label}: ${b.value}`},[c("span",{class:"vs-badge",text:b.label}),c("span",{class:"vs-val",text:b.value}),b.desc?c("span",{class:"vs-desc",text:b.desc}):null,c("span",{class:"vs-cnt",text:b.count.toLocaleString("en-US")})]));u.forEach((b,x)=>{h.listen(b,"mousedown",C=>{C.preventDefault(),i(x)})}),H(n,...u),n.classList.add("show"),s=!0,p()};return o.listen(t,"input",()=>m()),o.listen(t,"focus",()=>{t.value.trim()&&m()}),o.listen(t,"blur",()=>o.setTimeout(()=>d(),120)),o.listen(t,"keydown",h=>{let u=h;if(!s){u.key==="ArrowDown"&&t.value.trim()&&(u.preventDefault(),m());return}u.key==="ArrowDown"?(u.preventDefault(),a=Math.min(r.length-1,a+1),f()):u.key==="ArrowUp"?(u.preventDefault(),a=Math.max(0,a-1),f()):u.key==="Enter"?(u.preventDefault(),i(a)):u.key==="Escape"&&(u.preventDefault(),d())}),o.listen(window,"resize",()=>s&&p()),o.listen(window,"scroll",h=>{if(!s)return;let u=h.target;u&&typeof u.nodeType=="number"&&n.contains(u)||d()},!0),o.listen(t,"blur",()=>{s&&!pt(e.roots.app,t)&&d()}),o.add(()=>n.remove()),{destroy:d}}var ei=62,Bl=28,ti=1900,Sl=6,El="Search values \u2013 e.g. ",Qn=["a variable","a model","an experiment"],oi=30;function ni(e){let t=[],o=[];for(let r of e.state.facets)for(let{value:a}of r.values.slice(0,4)){if(typeof a!="string"||a.length===0)continue;let s=Ge(e.state,r.key,a),l=s!==null&&s.length>0&&s.length<=oi,d=l?s:a;if(!(d.length>oi)){(l?t:o).push(d);break}}let n=[];for(let r of[...t,...o])if(n.includes(r)||n.push(r),n.length>=Sl)break;return n}function Cl(e,t,o){let n=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches,r=typeof IntersectionObserver=="function",a=Qn,s=0,l=0,d=!1,p=0,f=!1,i=!1,m=()=>t.value.length===0&&t.ownerDocument.activeElement!==t,h=C=>{t.placeholder=`${El}${C}`},u=()=>{if(f||!i||!t.isConnected)return;if(!d&&l===0){let Q=ni(e);Q.length&&(a=Q),s>=a.length&&(s=0)}let C=a[s]??Qn[0];if(!m()){p=o.setTimeout(u,ti);return}if(d){if(l-=1,h(C.slice(0,Math.max(0,l))),l<=0){d=!1,l=0,s=(s+1)%a.length,p=o.setTimeout(u,ei*4);return}p=o.setTimeout(u,Bl);return}if(l+=1,h(C.slice(0,l)),l>=C.length){d=!0,p=o.setTimeout(u,ti);return}p=o.setTimeout(u,ei)},b=()=>{let C=ni(e);h((C.length?C:Qn)[0]??"")};if(n||!r){h(""),p=o.setTimeout(b,600),o.add(()=>window.clearTimeout(p));return}h("");let x=new IntersectionObserver(C=>{let Q=C.some(D=>D.isIntersecting);Q!==i&&(i=Q,window.clearTimeout(p),Q&&(p=o.setTimeout(u,400)))},{threshold:0});x.observe(t),o.add(()=>{f=!0,x.disconnect(),p&&window.clearTimeout(p)})}function ai(e,t){Cl(e,t,e.dis)}var Tl=4200;function ii(e){let t=e.dis,{statusDot:o,statusMsg:n,toastHost:r}=e.roots;function a(l,d){o.className=`status-dot ${l}`,n.className=`mono status-msg ${l}`,n.textContent=d}function s(l,d){a(l,d);let p=c("div",{class:`toast ${l}`,role:"status"},[S(k.info,{size:15}),c("span",{class:"toast-msg",text:d})]);r.append(p),t.setTimeout(()=>p.classList.add("in"),10);let f=()=>{},i=()=>{f(),p.classList.remove("in"),t.setTimeout(()=>p.remove(),220)};t.setTimeout(i,Tl),f=t.listen(p,"click",i)}return{log:a,toast:s}}var Ql=80,Il=8;function si(e,t){let o=c("div",{class:"fdb-tip",role:"tooltip"});e.appendChild(o);let n=null,r=0,a=p=>{let f=p.getAttribute("data-tip")??"";if(!f||!p.isConnected)return;if(!pt(e,p)){s();return}o.textContent=f,o.classList.add("show"),l?.observe(e,{childList:!0,subtree:!0});let i=o.getBoundingClientRect().top;At(e,o,p,{placement:"below",gap:Il,margin:6}),o.classList.toggle("above",o.getBoundingClientRect().top<i)},s=()=>{window.clearTimeout(r),n=null,o.classList.remove("show"),l?.disconnect()},l=typeof MutationObserver<"u"?new MutationObserver(()=>{n&&!n.isConnected&&s()}):null,d=p=>{let i=p.target?.closest?.("[data-tip]");return i&&e.contains(i)&&i.getAttribute("data-tip")?i:null};t.listen(e,"pointerover",p=>{let f=d(p);!f||f===n||(n=f,window.clearTimeout(r),r=window.setTimeout(()=>{n===f&&f.isConnected&&a(f)},Ql))}),t.listen(e,"pointerout",p=>{let f=d(p);if(!f||f!==n)return;let i=p.relatedTarget;i&&f.contains(i)||s()}),t.listen(e,"focusin",p=>{let f=d(p);f&&(n=f,a(f))}),t.listen(e,"focusout",s),t.listen(e,"pointerdown",s,!0),t.listen(window,"scroll",s,!0),t.listen(window,"resize",()=>{n&&a(n)}),t.add(()=>{window.clearTimeout(r),l?.disconnect(),o.remove()})}var li=1,ci="siv",di="q",Ml=/^[a-z][a-z0-9-]{0,31}$/,Ol=/([+\-!(){}[\]^"~?:\\/&|])/g;function xo(e){let t=e.trim().replace(/\s+/g," ");return t===""?"":`*${t.replace(Ol,"\\$1").replace(/ /g,"*")}*`}function pi(e,t="file"){let o=new URLSearchParams;o.set("siv",String(e.v??1)),e.flavour&&o.set("flavour",e.flavour);for(let[r,a]of Object.entries(e.facets??{}).sort(([s],[l])=>s.localeCompare(l)))for(let s of a)o.append(r,s);let n=e.q?xo(e.q):"";return n&&o.append(t,n),o.toString()}function wo(e,t="file"){let o=new URLSearchParams(e),n=o.get("siv"),r=n===null?void 0:Number(n);o.delete("siv");let a=o.get("q")??void 0;o.delete("q");let s=o.get("flavour"),l=s&&Ml.test(s)?s:void 0,d={};for(let[i,m]of o.entries())i!=="flavour"&&(d[i]??(d[i]=[])).push(m);if(a&&a.trim()!==""){let i=xo(a);i&&(o.append(t,i),(d[t]??(d[t]=[])).push(i))}let p={v:1};a&&a.trim()!==""&&(p.q=a.trim()),l&&(p.flavour=l),Object.keys(d).length>0&&(p.facets=d);let f={intent:p,normalizedSearch:o.toString()};return r!==void 0&&r!==1&&(f.unsupportedVersion=r),f}function yo(e,t){return t.flavour?{...e,flavour:t.flavour}:{...e}}function Dl(e,t={},o={}){let n=o.search??(typeof window<"u"?window.location.search:""),r=wo(n,o.uniqKey??"file");if(o.normalizeUrl!==!1&&typeof window<"u"&&window.history&&r.normalizedSearch!==n.replace(/^\?/,"")){let a=new URL(window.location.href);a.search=r.normalizedSearch?`?${r.normalizedSearch}`:"",window.history.replaceState(null,"",a.toString())}return In(e,yo(t,r.intent))}var Ai="/api/freva-nextgen/databrowser",Ll=250,Fl=300;function Ul(e){let t=e.replace(/\/+$/,"");return/\/databrowser$/.test(t)?t.replace(/\/databrowser$/,"/data-portal"):"/api/freva-nextgen/data-portal"}function ql(e){return{map:{...Tr,...e.map??{}},...e.inspectorUrl?{inspectorUrl:e.inspectorUrl}:{},...e.overlayRoot?{overlayRoot:e.overlayRoot}:{},apiBase:e.apiBase??Ai,dataPortalBase:e.dataPortalBase??Ul(e.apiBase??Ai),signIn:typeof e.signIn=="function"?e.signIn:null,flavour:e.flavour??"freva",devNotes:e.devNotes??!1,authEnabled:e.authEnabled??!1,enableHeavyOps:e.enableHeavyOps??!1,syncUrl:e.syncUrl??!0,baseFilters:e.baseFilters,enableStrictBBoxModes:e.enableStrictBBoxModes??!1,metadata:e.metadata??{},metadataScriptUrl:e.metadataScriptUrl??null,defaultLayout:e.defaultLayout==="overview"?"overview":"results",overview:{order:e.overview?.order?[...e.overview.order]:[],mainFacets:e.overview?.mainFacets?[...e.overview.mainFacets]:null},scopeRemovable:e.scopeRemovable??!1,features:{themeToggle:e.features?.themeToggle??!0,terminal:e.features?.terminal??!0,overview:e.features?.overview??!0,export:e.features?.export??!0,details:e.features?.details??!0,search:e.features?.search??!0,lensSwitcher:e.features?.lensSwitcher??!0,inspect:e.features?.inspect??!0,brand:e.features?.brand??!0,footer:e.features?.footer??!0},theme:e.theme??{},brand:{title:e.brand?.title??"Freva",mark:e.brand?.mark??"\u2248",description:e.brand?.description??"",showMark:e.brand?.showMark??!0,showTitle:e.brand?.showTitle??!0},terminal:{host:e.terminal?.host??null,shell:e.terminal?.shell??null,os:e.terminal?.os??null},getAuthToken:e.getAuthToken??(()=>null),getCsrfToken:e.getCsrfToken??(()=>null)}}function Nl(e){let t=c("span",{class:"knob"},[S(k.moon,{size:15})]),o=c("button",{class:"theme",type:"button","aria-label":"Toggle theme",title:"Toggle day / night"},[t]),n=c("span",{class:"v",text:e.flavour}),r=c("button",{class:"lens",type:"button","aria-haspopup":"dialog","aria-expanded":"false","aria-label":"Naming flavour",title:"Change the naming flavour (metadata lens)"},[c("span",{class:"k",text:"Flavour"}),n,S(k.caret,{size:14})]),a=c("input",{class:"input",type:"text",placeholder:"Search","aria-label":"Search facet values",autocomplete:"off",spellcheck:!1}),s=c("span",{class:"search-spin","aria-hidden":"true"},[c("span",{class:"spin"})]),l=c("span",{class:"sr-only",role:"status","aria-live":"polite"}),d=c("span",{class:"search-aside"},[s]),p=c("div",{class:"search"},[c("span",{class:"ic"},[S(k.search,{size:16})]),a,d,l]),f=e.devNotes?c("button",{class:"icon-btn",type:"button","aria-label":"Developer notes",title:"Developer notes"},[S(k.notes,{size:16})]):null,i=e.features,m=c("button",{class:"iconbtn",type:"button","aria-label":"Command terminal",title:"Terminal"},[S(k.terminal,{size:20})]),h=c("button",{class:"iconbtn",type:"button","aria-label":"Inspect data",title:"Inspect a dataset by URL (metadata & 3D viewer)"},[S(k.inspect,{size:18})]),u=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches===!0,b=e.brand.showMark?e.brand.mark==="\u2248"?u?c("span",{class:"mark brand-mark-static",text:"\u2248","aria-hidden":"true"}):c("img",{class:"brand-logo",src:Cr,alt:"","aria-hidden":"true",decoding:"async"}):c("span",{class:"mark",text:e.brand.mark}):null,x=e.brand.showMark||e.brand.showTitle?c("div",{class:"brand"},[b,e.brand.showTitle?c("span",{text:e.brand.title}):null]):null,C=[i.brand?x:null,i.lensSwitcher?r:null,i.search?p:null,f,i.inspect?h:null,i.terminal?m:null,i.themeToggle?o:null],Q=c("header",{class:"top"},C),D=c("button",{class:"help-x",type:"button","aria-label":"Close help"},[S(k.close,{size:15})]),M=c("div",{class:"help-pop",role:"dialog","aria-modal":"false","aria-label":"Help and setup"},[c("div",{class:"help-head"},[S(k.terminal,{size:16}),c("span",{class:"t",text:"Run this search yourself"}),D]),c("p",{text:"The terminal shows the exact CLI command and python call for whatever you have selected. To run them, install the client library:"}),c("pre",{class:"help-code",text:"python3 -m pip install freva-client"}),c("p",{text:"That gives you both the freva-client command line tool and the freva_client python library."}),c("div",{class:"help-h2",text:"Pointing it at this instance"}),c("p",{text:"On a centrally administered freva instance there is nothing to do. If you installed the client yourself, set the host once in your config file:"}),c("pre",{class:"help-code",text:"~/.config/freva/freva.toml"}),c("p",{class:"help-dim",text:"FREVA_CONFIG can also point at a freva.toml elsewhere. That is why the commands here carry no --host flag."}),c("a",{class:"help-link",href:"https://freva-org.github.io/freva-nextgen/",target:"_blank",rel:"noopener noreferrer",text:"freva-client documentation \u2197"})]),z=c("div",{class:"side-scroll"}),N=c("button",{class:"side-collapse",type:"button","aria-label":"Collapse filters",title:"Collapse filter sidebar"},[c("span",{class:"chev"},[S(k.chevron,{size:14})])]),G=c("aside",{class:"side"},[c("div",{class:"side-head"},[N]),z,c("div",{class:"side-flavour-veil","aria-hidden":"true"},[c("span",{class:"spin"})])]),Y=c("div",{class:"chips"}),$=c("button",{class:"clear-btn",type:"button",text:"Clear all"}),he=c("button",{class:"ctrl on",type:"button","aria-label":"Browse results",title:"Browse the matching results"},[S(k.resultsFocus,{size:15}),c("span",{class:"ctrl-lbl",text:"Browse"})]),J=c("button",{class:"ctrl",type:"button","aria-label":"Overview",title:"Overview of the whole result set"},[S(k.overview,{size:15}),c("span",{class:"ctrl-lbl",text:"Overview"})]),fe=c("button",{class:"iconbtn tbtn",type:"button","aria-label":"Details panel",title:"Details panel"},[S(k.info,{size:15}),c("span",{class:"tbtn-lbl",text:"Details"})]),j=c("div",{class:"ctrl-cluster"},[he,i.overview?J:null]),ae=c("div",{class:"toprow"},[Y,$,j]),g=c("div",{class:"facet-grid"}),w=c("div",{class:"overview-mode"},[c("div",{class:"overview-cap",text:"Metadata overview - every facet for the current query at a glance."}),g]),y=c("span",{class:"res-count",text:"-"}),B=c("span",{class:"res-spin","aria-hidden":"true"},[c("span",{class:"spin"})]),I=c("button",{type:"button",class:"on","aria-label":"List view",title:"List view"},[S(k.list,{size:15})]),E=c("button",{type:"button","aria-label":"Grid view",title:"Grid view"},[S(k.grid,{size:15})]),P=c("div",{class:"seg"},[I,E]),U=c("button",{class:"iconbtn tbtn",type:"button","aria-label":"Export catalogue",title:"Export catalogue","aria-haspopup":"menu","aria-expanded":"false"},[S(k.download,{size:15}),c("span",{class:"tbtn-lbl",text:"Export"})]),q=c("button",{class:"iconbtn tbtn ov-shelve",type:"button",hidden:"true","aria-label":"Minimize all blocks to full-width rows",title:"Minimize every block to a full-width row - then expand them one at a time"},[S(k.shelve,{size:15}),c("span",{class:"tbtn-lbl",text:"Stack"})]),oe=c("span",{class:"cb","aria-hidden":"true"}),se=c("button",{class:"selall",type:"button","aria-label":"Select all listed files",title:"Select all currently listed files"},[oe,c("span",{class:"ctrl-lbl",text:"Select all"})]),me=c("span",{class:"panelctl in"},[se,c("span",{class:"bar-div"}),c("span",{class:"view-lbl",text:"View"}),P,i.details?c("span",{class:"bar-div"}):null,i.details?fe:null,i.export?c("span",{class:"bar-div"}):null]),Qe=[c("span",{class:"scope-lbl",text:"Whole result set"}),y,B,e.brand.description?c("span",{class:"scope-desc",text:e.brand.description}):null,c("span",{class:"spacer"}),me,q,i.export?U:null],pe=c("div",{class:"res-bar"},Qe),ge=c("div",{class:"list-head",hidden:"true"},[c("span",{class:"lh-uri",text:"uri"}),c("span",{class:"lh-fs",text:"fs type"})]),R=c("div",{class:"rows",id:"fdb-results"}),W=c("div",{class:"more-wrap"}),ee=c("div",{class:"center-fixed"},[ae,pe]),te=c("div",{class:"results-scroll"},[w,ge,R,W]),le=c("div",{class:"pickbar"}),ke=c("main",{class:"center"},[ee,te,le]),be=c("div",{class:"info-scroll"}),ut=c("button",{class:"x",type:"button","aria-label":"Close details",title:"Close details"},[S(k.close,{size:16})]),Ue=c("aside",{class:"details-panel collapsed"},[c("div",{class:"info-head"},[S(k.info,{size:16}),c("span",{class:"t",text:"Details"}),ut]),be]);ut.dataset.role="details-close";let tt=c("div",{class:"body"},[G,ke,Ue]),qe=c("span",{class:"status-dot info"}),Ce=c("span",{class:"mono"}),ht=i.footer?c("footer",{class:"status","aria-live":"polite","aria-label":"Status"},[qe,Ce]):null,Bo=i.footer?null:c("div",{class:"sr-status","aria-live":"polite","aria-label":"Status",role:"status"},[qe,Ce]),ot=c("div",{class:"toast-host","aria-live":"polite"}),ne=c("div",{class:`fdb-app${i.footer?"":" no-footer"}`},[Q,tt,ht]),mt=c("div",{class:"freva-db","data-theme":"night"},[ne,Bo,ot,M]);typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches&&ne.setAttribute("data-reduced-motion","true");let Nt={app:mt,overlay:e.overlayRoot??mt,facetList:z,chips:Y,clearAllBtn:$,overviewWrap:w,overviewGrid:g,resCount:y,resSpin:B,exportBtn:U,shelveBtn:q,selectAllBtn:se,listHead:ge,results:R,moreWrap:W,pickbar:le,info:Ue,infoScroll:be,infoBtn:fe,statusMsg:Ce,statusDot:qe,toastHost:ot,lensValue:n};return Nt.infoClose=ut,{outer:mt,shell:ne,roots:Nt,lensBtn:r,themeBtn:o,themeKnob:t,notesBtn:f,helpPanel:M,sideCollapse:N,searchInput:a,searchRegion:p,searchAside:d,searchSpin:s,searchStatus:l,resultsCtrl:he,overviewCtrl:J,shelveBtn:q,listSeg:I,gridSeg:E,selectAllBtn:se,cmdBtn:m,inspectBtn:h,resBar:pe,panelCtl:me,resultsScroll:te}}function In(e,t={}){var o;let n=ql(t),r=Nl(n),{roots:a,shell:s}=r,l=c("style",{type:"text/css"});l.textContent=qr,a.app.insertBefore(l,a.app.firstChild),a.app.insertBefore(Er(),a.app.firstChild);let d=new $t,p=new Xt(n,d),f=new to(a.app,d),i=er(n);i.flavour=n.flavour,i.theme=n.theme.mode??Vr(),i.layout=Jr(n.defaultLayout),i.view=jr(),i.flavours=[...at];let m=typeof matchMedia=="function"&&matchMedia("(max-width: 560px)").matches;i.sidebarCollapsed=Zr(m),n.overview.order.length&&(i.overviewOrder=[...n.overview.order]);let h=$r();h&&(i.overviewSort=h.sort,i.overviewCollapsed=new Set(h.collapsed),i.overviewSpan=h.span,i.overviewH=h.h??{},i.overviewOrder=h.order,i.overviewAddOpen=h.addOpen,i.overviewStacked=h.stacked??!1,i.overviewStackSeen=h.stackSeen??[],i.overviewSnapshot=h.snapshot??null),i.metadata=Fr(n);let u=ur(n.baseFilters);if(n.scopeRemovable){i.baseFilters={};let A=n.syncUrl&&typeof window<"u"&&window.location?Wo(window.location.search):null;if(!!!(A&&(Object.keys(A.selected).length>0||A.time||A.bbox)))for(let[O,L]of Object.entries(u)){let{baseKey:V,negated:K}=ue(O),X=gt(lt(i,V,"freva",i.flavour),K),de=(o=i.selected)[X]??(o[X]=[]);for(let Be of L)de.includes(Be)||de.push(Be)}}else i.baseFilters=u;let b=new Set,x=!1,C=!1,Q=null;if(n.syncUrl&&typeof window<"u"&&window.location)try{let A=Wo(window.location.search);A.flavour&&i.flavours.includes(A.flavour)?(i.flavour=A.flavour,a.lensValue.textContent=i.flavour):A.flavour&&(Q=A.flavour);let v=ze(i);for(let O of Object.keys(A.selected))v.has(Z(O).toLowerCase())&&delete A.selected[O];if(Object.keys(A.selected).length){i.selected=A.selected;for(let O of Object.keys(A.selected))b.add(O)}A.time&&(i.time=A.time,b.add("time"),b.add("time_select")),A.bbox&&(i.bbox=A.bbox,b.add("bbox"),b.add("bbox_select")),A.flavour&&i.flavours.includes(A.flavour)&&b.add("flavour")}catch{}let D=ct(d),M=ct(d),z=zr(n.devNotes),N=null,G=null,Y=null,$=0;function he(A){let v=A.toLowerCase();return/fail|error|could not|too big|couldn|unable|denied/.test(v)?"error":/not applied|warn|narrow it|up to \d|still loading/.test(v)?"warn":/downloaded|done|copied|complete|added|applied/.test(v)?"success":"info"}function J(A,v=0){let O=Date.now();v<=0&&O<$||(i.status=A,Y&&A?Y.log(he(A),A):a.statusMsg.textContent=A,$=v>0?O+v:0)}function fe(){$=0}function j(){let A;i.search==="loading"&&i.rows.length===0?A="Searching\u2026":i.search==="error"?A="Search failed":i.rows.length===0?A="No files match":A=`${i.totalCount.toLocaleString("en-US")} ${i.totalCount===1?"file":"files"}`,a.resCount.textContent=A;let v=i.search==="loading";a.resSpin.classList.toggle("show",v),r.searchSpin.classList.toggle("show",v),r.searchRegion.setAttribute("aria-busy",v?"true":"false");let O=v?"Searching":"";r.searchStatus.textContent!==O&&(r.searchStatus.textContent=O)}function ae(){return i.totalCount>1e5}function g(){let A=ae(),v=A?`Too many files to export (>${1e5.toLocaleString("en-US")}) - narrow the query`:"Export catalogue";a.exportBtn.setAttribute("aria-disabled",A?"true":"false"),a.exportBtn.classList.toggle("is-disabled",A),a.exportBtn.setAttribute("data-tip",v),a.exportBtn.setAttribute("aria-label",A?`Export catalogue - unavailable: too many files (>${1e5.toLocaleString("en-US")}); narrow the query`:"Export catalogue")}let w=["bg","surface","surface-2","surface-3","text","dim","faint","border","border-2","accent","accent-2","accent-soft","good","warn","danger","ocean","land"];function y(){let A=a.app.style,v=L=>typeof L=="string"&&L.length>0&&L.length<200&&!/[{}<>;]/.test(L);for(let L of w)A.removeProperty(`--${L}`);let O={...n.theme.both??{},...n.theme[i.theme]??{}};for(let[L,V]of Object.entries(O))v(V)&&A.setProperty(`--${L}`,V);v(n.theme.font)?A.setProperty("--ui",n.theme.font):A.removeProperty("--ui")}function B(){a.app.setAttribute("data-theme",i.theme),y(),r.themeKnob.replaceChildren(S(i.theme==="night"?k.moon:k.sun,{size:15}))}function I(){if(s.classList.toggle("metaview",i.layout==="overview"),i.layout==="overview"){let A=r.shelveBtn.querySelector(".tbtn-lbl");A&&(A.textContent=i.overviewStacked?"Unstack":"Stack")}r.resultsCtrl.classList.toggle("on",i.layout==="results"),r.resultsCtrl.setAttribute("aria-pressed",i.layout==="results"?"true":"false"),r.overviewCtrl.classList.toggle("on",i.layout==="overview"),r.overviewCtrl.setAttribute("aria-pressed",i.layout==="overview"?"true":"false"),q()}let E=null,P=!1;function U(A){r.panelCtl.classList.toggle("in",A),r.panelCtl.setAttribute("aria-hidden",A?"false":"true"),r.panelCtl.querySelectorAll("button").forEach(v=>{v.tabIndex=A?0:-1}),r.resBar.classList.toggle("merged",A&&i.layout==="overview"),r.shelveBtn.hidden=i.layout!=="overview"||P&&A}function q(){if(E?.disconnect(),E=null,P=!1,i.layout!=="overview"||typeof IntersectionObserver!="function"){U(!0);return}P=!0,U(!1),E=new IntersectionObserver(A=>U(A.some(v=>v.isIntersecting)),{root:r.resultsScroll,rootMargin:"0px 0px -120px 0px",threshold:0}),E.observe(a.results)}d.add(()=>{E?.disconnect(),E=null});function oe(){r.listSeg.classList.toggle("on",i.view==="list"),r.gridSeg.classList.toggle("on",i.view==="grid")}function se(){s.classList.toggle("side-collapsed",i.sidebarCollapsed),r.sideCollapse.setAttribute("aria-label",i.sidebarCollapsed?"Expand filters":"Collapse filters"),r.sideCollapse.setAttribute("aria-expanded",i.sidebarCollapsed?"false":"true")}function me(){i.sidebarCollapsed=!i.sidebarCollapsed,Yr(i.sidebarCollapsed),se()}let Qe=new Map;function pe(A,v,O){if(Qe.get(A)===v)return;Qe.set(A,v);let L=z.start(`render:${A}`);O(),L()}let ge=()=>JSON.stringify(i.selected),R=()=>JSON.stringify([i.time,i.bbox]);function W(){pe("sidebar",JSON.stringify([i.facetsVersion,ge(),R(),i.flavour,[...i.sidebarOpen],i.sidebarAddOpen,i.metadataVersion]),()=>Ga(F))}function ee(){pe("chips",JSON.stringify([ge(),R()]),()=>ia(F))}function te(){i.layout==="overview"&&pe("overview",JSON.stringify([i.facetsVersion,R(),i.flavour,i.overviewStale,i.metadataVersion,i.overviewSort,i.overviewSpan,i.overviewH,[...i.overviewCollapsed],i.overviewAddOpen,i.overviewOrder,i.overviewStacked]),()=>bn(F))}function le(){pe("results",JSON.stringify([i.rowsVersion,i.view,i.search,i.searchError??"",i.totalCount]),()=>Ha(F))}function ke(){N?.render()}function be(){W(),ee(),te(),bo(F),ke()}function ut(){tt(),s.classList.remove("flavour-loading"),W(),ee(),te(),le(),et(F),Ae(F),ke(),j(),g()}async function Ue(A){let v=A?i.rows.length:0,O=p.nextRequestId();i.lastRequestId=O;let L=Ie,V=p.channelSignal("search");i.search="loading",A||(i.start=0),le(),j(),A||J("Searching\u2026");try{let K=z.start("search:fetch+parse"),X=await p.extendedSearch(i.flavour,i.uniqKey,Je(i),{start:v,signal:V});if(K(),i.lastRequestId!==O||Ie!==L)return;z.time("search:normalize",()=>{let de=X.search_results.map(Be=>Ar(Be,i.uniqKey));if(A)for(let Be of de)i.rows.push(Be);else i.rows=de,i.rowsEpoch++;On=L,i.rowsVersion++,i.totalCount=typeof X.total_count=="number"?X.total_count:i.rows.length,O>=Rt&&(Rt=O,i.facets=Go(X),i.facetsVersion++,i.primaryFacets=X.primary_facets??[],i.facetMapping=X.facet_mapping??{},Ro(i))}),i.start=i.rows.length,i.search=i.rows.length===0?"empty":"loaded",i.searchError=void 0,i.overviewStale=!1,ut(),J(i.rows.length===0?"No files match the current filters.":"")}catch(K){if(K instanceof ie&&K.aborted||i.lastRequestId!==O||Ie!==L)return;let X=K instanceof ie?K.message:"Search failed.";if(A){i.search="loaded",le(),j(),J(`Could not load more results: ${X}`,4e3);return}i.search="error",i.searchError=X,s.classList.remove("flavour-loading"),le(),j(),g(),J(X,4e3),tt(C)}}function tt(A=!1){if(x||!n.syncUrl)return;let v=yt(i);if(v.size===0){if(!A)return;v=new Set([...He,...it,...we].map(L=>L.toLowerCase()))}x=!0;let O=!1;for(let L of Object.keys(i.selected))v.has(Z(L).toLowerCase())||(delete i.selected[L],b.delete(L),O=!0);O&&(qe(),ne())}function qe(){if(!(!n.syncUrl||typeof window>"u"||!window.history?.replaceState))try{let A=new URLSearchParams(window.location.search);for(let L of b)A.delete(L);b.clear(),i.flavour&&i.flavour!=="freva"&&(A.set("flavour",i.flavour),b.add("flavour"));for(let[L,V]of jo(i))A.append(L,V),b.add(L);let v=A.toString(),O=window.location.pathname+(v?`?${v}`:"")+window.location.hash;window.history.replaceState(null,"",O)}catch{}}let Ce=!1,ht=!1,Bo=()=>Object.keys(i.baseFilters).length===0||at.includes(i.flavour)||!!i.flavourMaps[i.flavour];function ot(){i.search="error",i.searchError="Scoped browsing is unavailable - this flavour\u2019s field mapping could not be loaded.",s.classList.remove("flavour-loading"),le(),j()}function ne(){if(!Bo()){ht?ot():(Ce=!0,i.search="loading",s.classList.add("flavour-loading"),le());return}Ie++,qe(),p.channelSignal("search"),p.channelSignal("recount"),D(()=>{Ue(!1)},Ll)}function mt(){i.search!=="loading"&&On===Ie&&Ue(!0)}function Nt(){Ue(!1)}function Mn(){M(()=>{(async()=>{let A=p.nextRequestId();So=A;let v=Ie,O=p.channelSignal("recount");try{let L=await p.metadataSearch(i.flavour,i.uniqKey,Je(i),O);if(So!==A||i.lastRequestId>A||A<Rt||Ie!==v)return;Rt=A,i.facets=Go(L),i.facetsVersion++,i.primaryFacets=L.primary_facets??i.primaryFacets,i.facetMapping=L.facet_mapping??i.facetMapping,i.overviewStale=!1,Ro(i)}catch(L){if(L instanceof ie&&L.aborted||So!==A||i.lastRequestId>A||Ie!==v)return;i.overviewStale=!0}te(),W()})()},Fl)}let So=0,Ie=0,On=0,Rt=0;function Dn(A,v,O){xe(i,A)||(i.externalEdits++,nr(i,A,v,O),be(),ne())}function fi(A,v){Dn(A,v,!1)}function ui(A,v){Dn(A,v,!0)}function hi(A){xe(i,A)||De(i,A)!==0&&(i.externalEdits++,sr(i,A),be(),ne())}function mi(A,v){xe(i,A)||(v?Ee(i,A).length:vt(i,A).length)===0||(i.externalEdits++,or(i,A,v),be(),ne())}function zn(){i.externalEdits++,ir(i),be(),ne()}function gi(A){i.externalEdits++,i.time=A,be(),ne()}let bi=(A,v)=>!A&&!v||!!A&&!!v&&A.from===v.from&&A.to===v.to&&A.mode===v.mode,vi=(A,v)=>!A&&!v||!!A&&!!v&&A.minLon===v.minLon&&A.maxLon===v.maxLon&&A.minLat===v.minLat&&A.maxLat===v.maxLat&&A.mode===v.mode;function xi(A){i.externalEdits++,i.bbox=Yo(A),be(),ne()}function wi(){return n.flavour!=="user"&&i.flavours.includes(n.flavour)?n.flavour:i.flavours.find(A=>A!=="user")??"freva"}function Ht(A){if(i.externalEdits++,A===i.flavour)return;let v=i.flavour;i.flavour=A,i.selected=dr(i,i.selected,v,A),i.overviewShape=[],Lo(),a.lensValue.textContent=A,s.classList.add("flavour-loading"),be(),ne()}function Eo(A){i.layout=A,Kr(A),I(),A==="overview"&&(te(),bo(F),Mn(),r.resultsScroll.scrollTo?.({top:0}))}function Co(A){i.view=A,Wr(A),oe(),le()}let Ln=0;function To(A){let v=i.theme!==A;i.theme=A,Gr(A);let O=++Ln;a.app.setAttribute("data-notransition","true"),B(),d.raf(()=>{d.raf(()=>{O===Ln&&a.app.removeAttribute("data-notransition")})}),v&&n.theme.onModeChange?.(A)}function Qo(A){i.detailsOpen=A??!i.detailsOpen,a.infoBtn.classList.toggle("on",i.detailsOpen),a.infoBtn.setAttribute("aria-pressed",i.detailsOpen?"true":"false"),Ae(F)}function yi(A){i.focusKey=A,i.detailSource="focus",qt(F,[]),i.detailsOpen&&Ae(F)}function ki(A){if(i.pickedKeys.has(A))i.pickedKeys.delete(A);else{if(i.pickedKeys.size>=25)return J(`You can select up to ${25} files - deselect one to choose another.`,3e3),F.toast("warn",`Selection is limited to ${25} files. Deselect one first.`),!1;i.pickedKeys.add(A)}return i.detailSource="picks",qt(F,[A]),et(F),i.detailsOpen&&Ae(F),!0}function Bi(){i.pickedKeys.clear(),i.detailSource="focus",qt(F),et(F),i.detailsOpen&&Ae(F)}function Si(A){i.terminalDraft=A;let v=Yt(je(A)),{accepted:O,rejected:L}=kt(i,v.rest),V=!bi(i.time,v.time),K=!vi(i.bbox,v.bbox);return pr(i.selected,O)&&!V&&!K||(i.selected=O,V&&(i.time=v.time),K&&(i.bbox=Yo(v.bbox)),ee(),W(),te(),bo(F),ne()),L.length+v.errors.length}function Ei(A){return Yt(je(A)).errors}function Ci(A){ga(F,A)}function Ti(A){va(F,A)}function Qi(){f.close()}let Fn=new Map,ce=!1;function Io(A){Fn.get(A)?.flush();let v=d.child();return Fn.set(A,v),queueMicrotask(()=>{ce||f.closeIfAnchorDetached()}),v}let F={state:i,api:p,dis:d,region:Io,cfg:n,roots:a,popover:f,commitSearch:ne,loadNextPage:mt,retrySearch:Nt,syncAll:be,renderSidebar:W,renderChips:ee,renderResults:le,renderOverview:te,renderCommand:ke,renderDetails:()=>Ae(F),recountOverview:Mn,exportCatalogue:(A,v,O)=>Rn(A,v,O),toggleFacet:fi,excludeFacet:ui,clearAllFacets:zn,clearFacet:hi,clearFacetMode:mi,setTime:gi,setBbox:xi,setFlavour:Ht,setLayout:Eo,setView:Co,setTheme:To,toggleDetails:Qo,focusFile:yi,togglePick:ki,clearPicks:Bi,applyTerminalDraft:Si,terminalDraftErrors:Ei,openTimeEditor:Ci,openBboxEditor:Ti,closeAllPopovers:Qi,setStatus:J,log:(A,v)=>Y?.log(A,v),toast:(A,v)=>Y?.toast(A,v),openInspect:A=>Oo.open(A),openAggregate:A=>Oo.openAggregate(A),isSignedIn:()=>p.isSignedIn(),openHelp:()=>Mo(!0)};function Mo(A){r.helpPanel.classList.toggle("show",A??!r.helpPanel.classList.contains("show"))}d.listen(r.helpPanel.querySelector(".help-x"),"click",()=>Mo(!1)),d.listen(document,"keydown",A=>{let v=A;v.key==="Escape"&&!v.defaultPrevented&&!f.isOpen()&&Mo(!1)}),Y=ii(F),si(a.app,d);let Oo=ca(F);n.features.terminal&&(N=Xa(F)),n.devNotes&&(G=$a(F)),d.listen(r.themeBtn,"click",()=>To(i.theme==="night"?"day":"night")),d.listen(r.sideCollapse,"click",()=>me()),d.listen(r.listSeg,"click",()=>Co("list")),d.listen(r.gridSeg,"click",()=>Co("grid")),d.listen(r.shelveBtn,"click",()=>{Ta(F),Un()});function Un(){let A=i.overviewStacked,v=r.shelveBtn.querySelector(".tbtn-lbl");v&&(v.textContent=A?"Unstack":"Stack"),r.shelveBtn.setAttribute("aria-pressed",A?"true":"false"),r.shelveBtn.setAttribute("aria-label",A?"Unstack - restore the block layout":"Stack all blocks into full-width rows"),r.shelveBtn.classList.toggle("on",A)}Un(),d.listen(r.selectAllBtn,"click",()=>{let A=Sn(F);if(A.willClear)i.pickedKeys.clear(),J("Selection cleared.");else{i.pickedKeys.clear();for(let v of A.target)i.pickedKeys.add(v);J(A.capped?`Selected the first ${25} of ${i.rows.length.toLocaleString("en-US")} listed files - ${A.omitted.toLocaleString("en-US")} were not selected.`:`Selected ${A.target.length} file${A.target.length===1?"":"s"}.`,A.capped?4e3:0)}i.detailSource="picks",qt(F),et(F),i.detailsOpen&&Ae(F)}),d.listen(r.resultsCtrl,"click",()=>Eo("results")),d.listen(r.overviewCtrl,"click",()=>Eo("overview")),d.listen(a.infoBtn,"click",()=>Qo()),d.listen(r.cmdBtn,"click",()=>N?.toggle()),d.listen(r.inspectBtn,"click",()=>{Oo.openEmpty()}),d.listen(a.clearAllBtn,"click",()=>zn());let qn=a.infoClose;if(qn&&d.listen(qn,"click",()=>Qo(!1)),r.notesBtn&&G){let A=r.notesBtn,v=G;d.listen(A,"click",()=>{v.toggle(),A.classList.toggle("on",v.isShown())})}n.features.search&&ri(F,r.searchInput),ai(F,r.searchInput),d.listen(r.lensBtn,"click",()=>{if(f.isOpen()){f.close();return}let A=Io("popover"),v=[];for(let O of i.flavours){if(O==="user"&&!p.isSignedIn())continue;let L=O===i.flavour,V=c("button",{class:`pop-item${L?" check on":""}`,type:"button"},[c("span",{class:"desc",text:O}),L?c("span",{class:"tick"},[S(k.check,{size:13})]):null]);A.listen(V,"click",()=>{f.close(),Ht(O)}),v.push(V)}r.lensBtn.setAttribute("aria-expanded","true"),f.open(r.lensBtn,v,{placement:"below",className:"lens-pop",autoFocus:!0,onClose:()=>r.lensBtn.setAttribute("aria-expanded","false")})}),d.listen(a.exportBtn,"click",()=>{if(ae()){J(`This query returns more than ${1e5.toLocaleString("en-US")} files - narrow it before exporting a catalogue.`);return}if(f.isOpen()){f.close();return}let A=Io("popover");a.exportBtn.setAttribute("aria-expanded","true"),f.open(a.exportBtn,vo(A,{heading:Ia(i.totalCount),onPick:v=>{f.close(),Rn(v)}}),{placement:"below",className:"export-pop",autoFocus:!0,onClose:()=>a.exportBtn.setAttribute("aria-expanded","false")})});let Do=0;function Nn(A){Do=Math.max(0,Do+A),a.exportBtn.classList.toggle("busy",Do>0)}async function Rn(A,v,O){let L={intake:{label:"Intake catalogue",filename:"freva-intake.json"},stac:{label:"STAC catalogue",filename:"freva-stac.zip"},uris:{label:"URI manifest",filename:"freva-uris.txt"}}[A],{label:V,filename:K}=L,X=O??i.uniqKey,de=v??Je(i),Be=A==="uris"?p.dataSearchUrl(i.flavour,X,de):p.catalogueUrl(A,i.flavour,X,de);if(fe(),Be.length>6e3){let _=`This selection makes too long a request for ${V} - select fewer files and try again.`;J(_,4e3),F.toast("error",_);return}let jn=_=>{let Se=document.createElement("a");Se.href=_,Se.download=K,Se.rel="noopener",document.body.appendChild(Se),Se.click(),Se.remove()},Oi=await p.bearer();if(ce)return;if(!Oi){let _=new AbortController,Se=d.add(()=>_.abort());try{let Me=await fetch(Be,{method:"HEAD",signal:_.signal});if(ce)return;if(!Me.ok&&Me.status!==405){let Wn=Me.status===413?"This query is too large for the server to export - narrow it and try again.":Me.status===414?`The request URL is too long for ${V} - select fewer files and try again.`:`${V} couldn't be prepared (server responded ${Me.status}).`;J(Wn),F.toast("error",Wn);return}}catch{if(ce||_.signal.aborted)return}finally{Se()}if(ce)return;jn(Be),J(`${V} download started.`),F.toast("success",`${V} download started.`);return}let Fo=new AbortController,Di=d.add(()=>Fo.abort());Nn(1),J(`Preparing ${V}\u2026`);try{let Se=await(A==="uris"?await p.manifestResponse(i.flavour,X,de,Fo.signal):await p.catalogueResponse(A,i.flavour,X,de,Fo.signal)).blob(),Me=URL.createObjectURL(Se);jn(Me),d.setTimeout(()=>URL.revokeObjectURL(Me),0),ce||F.toast("success",`${V} downloaded.`)}catch(_){if(_ instanceof ie&&_.aborted||_ instanceof DOMException&&_.name==="AbortError")return;if(_ instanceof ie&&_.status===414){F.toast("error","The request URL is too long - select fewer files and try again.");return}if(_ instanceof ie&&(_.status===413||_.detail===Uo)){g(),F.toast("warn","The result stream is too big to export - narrow the query and try again.");return}F.toast("error",_ instanceof ie?_.message:"Catalogue export failed.")}finally{Di(),Nn(-1)}}function Hn(A){let v=!1,O=null,L=async()=>{v=!0;try{for(;;){let V=p.authGeneration(),K=await A(O!==null);if(ce)return;if(K===null){if(p.authGeneration()!==V)continue;return}if(K.applied&&(O=K.gen),O===p.authGeneration())return}}finally{v=!1}};return{start:()=>{L()},authChanged:()=>{!v&&O!==p.authGeneration()&&L()}}}let Pn=Hn(A=>Ii(A)),Vn=Hn(()=>Mi());d.add(p.onSignedInChange(()=>{ce||(!p.isSignedIn()&&i.flavour==="user"&&Ht(wi()),et(F),i.detailsOpen&&Ae(F),Pn.authChanged(),Vn.authChanged())})),B(),I(),oe(),se(),W(),ee(),le(),et(F),Ae(F),ke(),j(),g(),e.appendChild(r.outer);let zo=Object.keys(i.baseFilters).length>0&&!at.includes(i.flavour),nt=!1,Gn=()=>{nt||ce||(nt=!0,Ue(!1))},Jn=()=>{nt||ce||(nt=!0,ot())};zo?(i.search="loading",le()):Gn(),(async()=>{try{let A=await Ur(n,d,a.app);if(ce)return;i.metadata=A,i.metadataVersion++,W(),te()}catch{}})();let Kn=null;function Lo(){let A=Kn;if(!A)return;if(Array.isArray(A)){i.attributeKeys=A;return}let v=A[i.flavour];i.attributeKeys=Array.isArray(v)?v:[...new Set(Object.values(A).flat())]}async function Ii(A=!1){try{let v={},O=await p.overview(v),L=v.authGen??p.authGeneration();if(ce)return null;if(L!==p.authGeneration())return{gen:L,applied:!1};let V=Array.isArray(O.flavours)?O.flavours:[],K=[...at];for(let de of V)K.includes(de)||K.push(de);let X=i.flavours.includes(i.flavour);return i.flavours=K,A&&X&&!K.includes(i.flavour)&&Ht(K.includes(n.flavour)?n.flavour:K[0]),Q&&i.flavours.includes(Q)&&Q!==i.flavour&&(i.flavour=Q,Q=null,Lo(),a.lensValue.textContent=i.flavour,be(),qe(),ne()),Kn=O.attributes??null,Lo(),tt(),ke(),{gen:L,applied:!0}}catch{return A||(C=!0,tt(!0)),null}}Pn.start();async function Mi(){try{let A={},v=await p.listFlavours(A),O=A.authGen??p.authGeneration();if(ce)return null;if(O!==p.authGeneration())return{gen:O,applied:!1};let L=Array.isArray(v.flavours)?v.flavours:[],V=JSON.stringify(i.flavourMaps[i.flavour]?.forward??null),K=Je(i);i.flavourMaps={...i.flavourMaps,...Po(L)};let X=JSON.stringify(i.flavourMaps[i.flavour]?.forward??null),de=Je(i);return ht=!0,zo&&!nt?(i.flavourMaps[i.flavour]?(ke(),Gn()):Jn(),{gen:O,applied:!0}):Ce?(Ce=!1,W(),ee(),te(),ke(),ne(),{gen:O,applied:!0}):(V!==X&&(W(),ee(),te(),ke(),K!==de&&ne()),{gen:O,applied:!0})}catch{return ht=!0,zo&&!nt?Jn():Ce&&(Ce=!1,ot()),null}}return Vn.start(),{destroy(){ce=!0,f.close(),d.flush(),r.outer.remove()},getState(){return structuredClone(i)},setTheme(A){ce||To(A)}}}var Lp=In;export{di as SEARCH_INTENT_TEXT_KEY,li as SEARCH_INTENT_VERSION,ci as SEARCH_INTENT_VERSION_KEY,yo as applySearchIntentV1,Lp as default,In as mountDataBrowser,Dl as mountDataBrowserFromIntent,wo as parseSearchIntentV1,pi as serializeSearchIntentV1,xo as textToFacetValue};
