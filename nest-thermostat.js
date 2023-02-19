/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=window,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$3=new WeakMap;class o$3{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$3.set(s,t));}return t}toString(){return this.cssText}}const r$2=t=>new o$3("string"==typeof t?t:t+"",void 0,s$3),i$1=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$3(n,t,s$3)},S$1=(s,n)=>{e$2?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$1.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$1=window,r$1=e$1.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$2=e$1.reactiveElementPolyfillSupport,n$2={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:n$2,reflect:!1,hasChanged:a$1};class d$1 extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$2).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$2;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}d$1.finalized=!0,d$1.elementProperties=new Map,d$1.elementStyles=[],d$1.shadowRootOptions={mode:"open"},null==o$2||o$2({ReactiveElement:d$1}),(null!==(s$2=e$1.reactiveElementVersions)&&void 0!==s$2?s$2:e$1.reactiveElementVersions=[]).push("1.6.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;const i=window,s$1=i.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$1=`lit$${(Math.random()+"").slice(9)}$`,n$1="?"+o$1,l$1=`<${n$1}>`,h=document,r=(t="")=>h.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,c=t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a=/-->/g,f=/>/g,_=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),m=/'/g,p=/"/g,$=/^(?:script|style|textarea|title)$/i,g=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),y=g(1),w=g(2),x=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),T=new WeakMap,A=h.createTreeWalker(h,129,null,!1),E=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=v;for(let i=0;i<s;i++){const s=t[i];let e,u,c=-1,g=0;for(;g<s.length&&(d.lastIndex=g,u=d.exec(s),null!==u);)g=d.lastIndex,d===v?"!--"===u[1]?d=a:void 0!==u[1]?d=f:void 0!==u[2]?($.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_):void 0!==u[3]&&(d=_):d===_?">"===u[0]?(d=null!=h?h:v,c=-1):void 0===u[1]?c=-2:(c=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_:'"'===u[3]?p:m):d===p||d===m?d=_:d===a||d===f?d=v:(d=_,h=void 0);const y=d===_&&t[i+1].startsWith("/>")?" ":"";r+=d===v?s+l$1:c>=0?(n.push(e),s.slice(0,c)+"$lit$"+s.slice(c)+o$1+y):s+o$1+(-2===c?(n.push(void 0),i):y);}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==e?e.createHTML(u):u,n]};class C{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,c=this.parts,[v,a]=E(t,i);if(this.el=C.createElement(v,e),A.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o$1)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o$1),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?k:"@"===i[1]?H:S});}else c.push({type:6,index:h});}for(const i of t)l.removeAttribute(i);}if($.test(l.tagName)){const t=l.textContent.split(o$1),i=t.length-1;if(i>0){l.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r()),A.nextNode(),c.push({type:2,index:++h});l.append(t[i],r());}}}else if(8===l.nodeType)if(l.data===n$1)c.push({type:2,index:h});else {let t=-1;for(;-1!==(t=l.data.indexOf(o$1,t+1));)c.push({type:7,index:h}),t+=o$1.length-1;}h++;}}static createElement(t,i){const s=h.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===x)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=P(t,r._$AS(t,i.values),r,e)),i}class V{constructor(t,i){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new I(n,this,t)),this.u.push(i),d=e[++r];}l!==(null==d?void 0:d.index)&&(n=A.nextNode(),l++);}return o}p(t){let i=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cm=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),d(t)?t===b||null==t||""===t?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==x&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):c(t)?this.k(t):this.g(t);}O(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}g(t){this._$AH!==b&&d(this._$AH)?this._$AA.nextSibling.data=t:this.T(h.createTextNode(t)),this._$AH=t;}$(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=C.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.p(s);else {const t=new V(o,this),i=t.v(this.options);t.p(s),this.T(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new C(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.O(r()),this.O(r()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cm=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===x&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===b?t=b:t!==b&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===b?void 0:t;}}const R=s$1?s$1.emptyScript:"";class k extends S{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==b?this.element.setAttribute(this.name,R):this.element.removeAttribute(this.name);}}class H extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:b)===x)return;const e=this._$AH,o=t===b&&e!==b||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==b&&(e===b||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class I{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=i.litHtmlPolyfillSupport;null==z||z(C,N),(null!==(t=i.litHtmlVersions)&&void 0!==t?t:i.litHtmlVersions=[]).push("2.6.1");const Z=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(r(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o;class s extends d$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Z(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return x}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n=globalThis.litElementPolyfillSupport;null==n||n({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.2.2");

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = i$1`div.wrapper {
  display: flex;
}
.dial {
  --main-color: white;
  --second-color: rgba(255, 255, 255, 0.3);
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  touch-action: none;
}
.dial.away .dial__ico__leaf {
  visibility: hidden;
}
.dial.away .dial__lbl--target {
  visibility: hidden;
}
.dial.away .dial__lbl--target--half {
  visibility: hidden;
}
.dial.away .dial__lbl--away {
  opacity: 1;
}
.dial .dial__shape {
  transition: fill 0.5s;
}
.dial__ico__leaf {
  fill: #13eb13;
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}
.dial.has-leaf .dial__ico__leaf {
  display: block;
  opacity: 1;
  pointer-events: initial;
}
.dial__editableIndicator {
  fill: var(--main-color);
  fill-rule: evenodd;
  opacity: 0;
  transition: opacity 0.5s;
}
.dial--edit .dial__editableIndicator {
  opacity: 1;
}
.dial--state--off .dial__shape {
  fill: #222;
}
.dial--state--heating .dial__shape {
  fill: #e36304;
}
.dial--state--cooling .dial__shape {
  fill: #007af1;
}
.dial__ticks path {
  fill: rgba(255, 255, 255, 0.3);
}
.dial__ticks path.active {
  fill: rgba(255, 255, 255, 0.8);
}
.dial text {
  fill: var(--main-color);
  text-anchor: middle;
  font-family: Helvetica, sans-serif;
}
.dial__lbl--target {
  font-size: 100px;
  font-weight: bold;
}
.dial__lbl--target--half {
  font-size: 40px;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.1s;
}
.dial__lbl--target--half.shown {
  opacity: 1;
  transition: opacity 0s;
}
.dial__lbl--ambient {
  font-size: 22px;
  font-weight: bold;
}
.dial__lbl--away {
  font-size: 72px;
  font-weight: bold;
  opacity: 0;
  pointer-events: none;
}
.dial path.chevron_button {
  fill: var(--second-color);
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.dial rect.chevron_button_hover {
  fill: transparent;
  cursor: pointer;
}
@media (hover: hover) {
  .dial path.chevron_button:hover,
  .dial rect.chevron_button_hover:hover + path.chevron_button {
    fill: var(--main-color);
  }
}
.dial text.current_temperature {
  font-size: 44px;
  fill: #dcdcdc;
}
.dial text.current_humidity {
  fill: var(--second-color);
  font-size: 20px;
}
.dial path.current_action {
  fill: var(--second-color);
  transition: 0.25s;
}
.dial path.current_action_active {
  fill: #ff8000 !important;
}
`;
styleInject(css_248z);

// Define element tag name
const ELEMENT_TAG = "nest-thermostat";

/**
 *
 * Nest thermostat like lit element
 *
 * Based on the thermostat by Dal Hundal (https://codepen.io/dalhundal)
 * source: https://codepen.io/dalhundal/pen/KpabZB/
 *
 */
class ThermostatControl extends s {
    /**
     * Define element properties and default values
     */
    static get properties() {
        return {
            target_temperature: {
                type: Number,
            },
            ambient_temperature: {
                type: Number,
            },
            current_temperature: {
                type: Number,
            },
            current_humidity: {
                type: Number,
            },
            // possible values: off, heat, cool, heat/cool, dry, fan, auto
            current_action: {
                type: String,
            },
            action_active: {
                type: Boolean,
            },
            min_value: {
                type: Number,
            },
            max_value: {
                type: Number,
            },
            step: {
                type: Number,
            },
            enable_ambient_temperature: {
                type: Boolean,
            },
            enable_current_action: {
                type: Boolean,
            },
            enable_move_buttons: {
                type: Boolean,
            },
            onSetTargetTemperature: {
                type: Object,
            },
        };
    }

    constructor() {
        super();

        // State config
        this.target_temperature = 20.0;

        // UI config
        this.diameter = 400; // is not an property
        this.min_value = 10;
        this.max_value = 30;
        this.step = 0.5;
        this.action_active = false;
        this.enable_ambient_temperature = false;
        this.enable_current_action = false;
        this.enable_move_buttons = true;

        this.onSetTargetTemperature = function (target_temperature) {};

        this.numTicks = 120;
        this.tickPoints = [
            [this.configuration.radius - 1, this.configuration.ticksOuterRadius],
            [this.configuration.radius + 1, this.configuration.ticksOuterRadius],
            [this.configuration.radius + 1, this.configuration.ticksInnerRadius],
            [this.configuration.radius - 1, this.configuration.ticksInnerRadius],
        ];
        this.tickPointsLarge = [
            [this.configuration.radius - 1.5, this.configuration.ticksOuterRadius],
            [this.configuration.radius + 1.5, this.configuration.ticksOuterRadius],
            [this.configuration.radius + 1.5, this.configuration.ticksInnerRadius + 20],
            [this.configuration.radius - 1.5, this.configuration.ticksInnerRadius + 20],
        ];
        this.theta = this.configuration.tickDegrees / this.numTicks;
    }

    /**
     *  Gets configuration
     */
    get configuration() {
        let tickDegrees = 300;
        let radius = this.diameter / 2;
        let ticksOuterRadius = this.diameter / 30;
        let ticksInnerRadius = this.diameter / 8;

        return {
            tickDegrees: tickDegrees, //  Degrees of the dial that should be covered in tick lines
            rangeValue: this.max_value - this.min_value,
            radius: radius,
            ticksOuterRadius: ticksOuterRadius,
            ticksInnerRadius: ticksInnerRadius,
            hvac_states: ["off", "heating", "cooling"],
            dragLockAxisDistance: 15,
            lblAmbientPosition: [radius, ticksOuterRadius - (ticksOuterRadius - ticksInnerRadius) / 2],
            offsetDegrees: 180 - (360 - tickDegrees) / 2,
        };
    }

    /**
     * Return only first decimal place from target temperature
     * @returns int
     */
    get _targetTemperatureDecimal() {
        // Do modular on the hard way (because JS can't do real mod for floating numbers)
        return parseInt(this.target_temperature * 10) % 10;
    }

    /**
     * Defines CSS styles
     * @returns css
     */
    static get styles() {
        return css_248z;
    }

    /**
     * On svg mouse pressed down, remember this
     * @param {MouseEvent} ev
     */
    onPointerDown(ev) {
        let x = ev.offsetX;
        let y = ev.offsetY;

        // Remember mouse pressed down
        if (this.isPointInControlCircle(x, y)) {
            this._mouseDown = true;
            this.setSteppedTemperatureByPoint(x, y);
        }
    }

    /**
     * On svg mouse pressed up, remember this
     * @param {MouseEvent} ev MouseEvent
     */
    onPointerEnd(ev) {
        this._mouseDown = false;
    }

    /**
     * On svg mouse move if mouse is pressed down
     * @param {MouseEvent} ev
     */
    onPointerMove(ev) {
        // Return if mouse is pressed down
        if (!this._mouseDown) return;

        this.setSteppedTemperatureByPoint(ev.offsetX, ev.offsetY);
    }

    /**
     * On move up click
     * @param {MouseEvent} ev
     */
    onMoveUpClick(ev) {
        this.setSteppedTargetTemperature(this.target_temperature + this.step);
    }

    /**
     * On move down click
     * @param {MouseEvent} ev
     */
    onMoveDownClick(ev) {
        this.setSteppedTargetTemperature(this.target_temperature - this.step);
    }

    /**
     * Set target temperature stepped wise
     * @param {int} targetTemperature
     */
    setSteppedTargetTemperature(targetTemperature) {
        if (targetTemperature < this.min_value || targetTemperature > this.max_value) return;

        this.target_temperature = Math.round(targetTemperature * (1 / this.step)) / (1 / this.step);
        this.onSetTargetTemperature(targetTemperature);
    }

    /**
     * Get infos about degree and radius by clicked point within control circle
     * @param {int} x
     * @param {int} y
     * @returns {
     *    radius: {double},
     *    degree: {double},
     * }
     */
    getControlCircleInfosByPoint(x, y) {
        let svgElement = this.renderRoot.querySelector("svg");

        // Check if pointer is in control radius
        let clickedRadius = Math.sqrt(
            Math.pow(x - svgElement.clientWidth / 2, 2) + Math.pow(svgElement.clientHeight / 2 - y, 2)
        );

        return {
            radius: clickedRadius,
            degree: Math.asin((svgElement.clientHeight / 2 - y) / clickedRadius),
        };
    }

    /**
     * Checks if given point is in control circle
     * @param {int} x
     * @param {int} y
     * @returns boolean isPointInControl
     */
    isPointInControlCircle(x, y) {
        let svgElement = this.renderRoot.querySelector("svg");
        console.log(svgElement);

        // Check if pointer is in control radius
        let clickedCircleInfos = this.getControlCircleInfosByPoint(x, y);
        let innerPerc = 1 - this.configuration.ticksInnerRadius / this.configuration.radius;
        let outerPerc = 1 - this.configuration.ticksOuterRadius / this.configuration.radius;
        let clickedRadiusPerc = clickedCircleInfos.radius / (svgElement.clientWidth / 2);

        // Continue if in radius
        if (outerPerc > clickedRadiusPerc && clickedRadiusPerc > innerPerc && clickedCircleInfos.degree > -1.05)
            return true;

        return false;
    }

    /**
     * Sets stepped temperature by mouse point
     * @param {int} x
     * @param {int} y
     * @returns double temperature
     */
    setSteppedTemperatureByPoint(x, y) {
        let svgElement = this.renderRoot.querySelector("svg");
        let clickedCircleInfos = this.getControlCircleInfosByPoint(x, y);

        // Continue if in radius
        if (clickedCircleInfos.degree < -1.05) return;

        // Calculate target temperature
        let controlSize = this.max_value - this.min_value;
        let targetSlice = (Math.PI / 2 + 1.05) / (controlSize / this.step / 2);
        let temperature;

        if (x < svgElement.clientWidth / 2)
            temperature = this.min_value + (clickedCircleInfos.degree + 1.05) / targetSlice / (1 / this.step);
        else temperature = controlSize - (clickedCircleInfos.degree - Math.PI / 2) / targetSlice / (1 / this.step);

        // Set temperature
        if (!temperature) return;
        this.setSteppedTargetTemperature(temperature);

        return temperature;
    }

    /**
     * Set ambient temperature stepped wise
     * @param int ambientTemperature
     */
    setSteppedAmbientTemperature(ambientTemperature) {
        if (ambientTemperature < this.min_value || ambientTemperature > this.max_value) return;

        this.ambient_temperature = Math.round(ambientTemperature * (1 / this.step)) / (1 / this.step);
    }

    /**
     * Render circle background & indicator
     * @returns svg
     */
    renderCircle() {
        return w`
            <circle
                class="dial__shape"
                cx="${this.configuration.radius}"
                cy="${this.configuration.radius}"
                r="${this.configuration.radius}"
            ></circle>

            <path
                class="dial__editableIndicator"
                d="${this.donutPath(
                    this.configuration.radius,
                    this.configuration.radius,
                    this.configuration.radius - 4,
                    this.configuration.radius - 8
                )}"
            ></path>`;
    }

    /**
     * Render move target temperature up button
     * @returns svg
     */
    renderMoveUp() {
        if (!this.enable_move_buttons) return w``;

        return w`
            <rect @click="${this.onMoveUpClick}" class="chevron_button_hover" x="165" y="104" width="70" height="50" rx="15"></rect>
            <path @click="${this.onMoveUpClick}" class="chevron_button" d="M7.06,37.09L30.03,14.16l22.97,22.92,7.06-7.06L30.03,0,0,30.03l7.06,7.06Z" transform="translate(170, 110)"/>
        `;
    }

    /**
     * Render move target temperature down button
     * @returns svg
     */
    renderMoveDown() {
        if (!this.enable_move_buttons) return w``;

        return w`
            <rect @click="${this.onMoveDownClick}" class="chevron_button_hover" x="165" y="244" width="70" height="50" rx="15"></rect>
            <path @click="${this.onMoveDownClick}" class="chevron_button" d="M7.06,0L30.03,22.97,53,0l7.06,7.11-30.03,30.03L0,7.11,7.06,0Z" transform="translate(170, 250)"/>
        `;
    }
    /**
     * Render ticks on the circle
     * @returns svg
     */
    renderTicks() {
        let tickArray = [];

        var vMin, vMax;
        if (this.away) {
            vMin = this.ambient_temperature ?? this.min_value;
            vMax = vMin;
        } else {
            vMin = Math.min(this.ambient_temperature ?? this.min_value, this.target_temperature);
            vMax = Math.max(this.ambient_temperature ?? this.min_value, this.target_temperature);
        }
        var min = this.restrictToRange(
            Math.round(((vMin - this.min_value) / this.configuration.rangeValue) * this.numTicks),
            0,
            this.numTicks - 1
        );
        var max = this.restrictToRange(
            Math.round(((vMax - this.min_value) / this.configuration.rangeValue) * this.numTicks),
            0,
            this.numTicks - 1
        );

        for (let iTick = 0; iTick < this.numTicks; iTick++) {
            var isLarge = iTick == min || iTick == max;
            var isActive = iTick >= min && iTick <= max;

            tickArray.push(w`
                <path
                    d="${this.pointsToPath(
                        this.rotatePoints(
                            isLarge ? this.tickPointsLarge : this.tickPoints,
                            iTick * this.theta - this.configuration.offsetDegrees,
                            [this.configuration.radius, this.configuration.radius]
                        )
                    )}"
                    class="${isActive ? "active" : ""}"
                ></path>`);
        }
        return tickArray;
    }

    /**
     * Render target temperature text
     * @returns svg
     */
    renderTargetTemperature() {
        return w`
            <text
                x="${this.configuration.radius}"
                y="${this.configuration.radius * 1.17}"
                class="dial__lbl dial__lbl--target"
            >
                ${parseInt(this.target_temperature)}
            </text>
            <text
                x="${this.configuration.radius * 1.35}"
                y="${this.configuration.radius * 0.954}"
                class="dial__lbl dial__lbl--target--half ${this.target_temperature % 1 != 0 ? "shown" : ""}"
            >${this._targetTemperatureDecimal}</text>`;
    }

    /**
     * Renders current action icon
     * @returns svg
     */
    renderCurrentAction() {
        if (!this.enable_current_action) return w``;

        // Off mode
        if (this.current_action == "off")
            return w`
            <text x="${this.configuration.radius}" y="${this.configuration.radius * 0.47}">OFF</text>
            `;

        // Heat mode
        if (this.current_action == "heat")
            return w`
            <path class="current_action ${
                this.action_active ? "current_action_active" : ""
            }" transform="translate(191, 76)" d="M16.3,10.55c-.3-.39-.66-.72-.99-1.05-.86-.77-1.84-1.32-2.66-2.14-1.92-1.88-2.34-4.98-1.12-7.36-1.22,.3-2.29,.96-3.2,1.7-3.33,2.68-4.64,7.4-3.07,11.45,.05,.13,.1,.26,.1,.42,0,.28-.19,.54-.45,.64-.3,.13-.6,.05-.85-.15-.08-.06-.13-.13-.18-.22-1.45-1.84-1.69-4.48-.71-6.59C1.02,9-.15,11.96,.02,14.75c.08,.64,.15,1.29,.37,1.93,.18,.77,.53,1.54,.91,2.23,1.39,2.23,3.79,3.82,6.38,4.14,2.75,.35,5.7-.15,7.81-2.06,2.35-2.14,3.18-5.56,1.97-8.49l-.17-.33c-.27-.59-.99-1.62-.99-1.62m-4.06,8.1c-.36,.31-.95,.64-1.41,.77-1.44,.51-2.88-.21-3.73-1.05,1.53-.36,2.44-1.49,2.71-2.64,.22-1.03-.19-1.88-.36-2.87-.15-.95-.13-1.76,.22-2.65,.24,.49,.5,.98,.81,1.36,.99,1.29,2.55,1.85,2.88,3.6,.05,.18,.08,.36,.08,.55,.04,1.05-.42,2.21-1.2,2.92h0Z"/>
        `;

        // Cool mode
        if (this.current_action == "cool")
            return w` <path class="current_action ${
                this.action_active ? "current_action_active" : ""
            }" transform="translate(188, 76)" d="M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z"/`;

        // Heat/cool mode
        if (this.current_action == "heat_cool")
            return w`<path class="current_action ${
                this.action_active ? "current_action_active" : ""
            }" transform="translate(188, 76)" d="M12 .69L8.69 4H4V8.69L.69 12L4 15.31V20H8.69L12 23.31L13 22.31V17.83L16.24 21.07L17.66 19.66L13 15V13H15L19.66 17.66L21.07 16.24L17.83 13H22V11H17.83L21.07 7.76L19.66 6.34L15 11H13V9L17.66 4.34L16.24 2.93L13 6.17V1.69M11 6.09V8.13C9.24 8.59 8 10.18 8 12C8 13.82 9.24 15.41 11 15.87V17.91C8.12 17.42 6 14.93 6 12C6 9.07 8.11 6.57 11 6.09Z" />`;

        // Dry mode
        if (this.current_action == "dry")
            return w`<path class="current_action ${
                this.action_active ? "current_action_active" : ""
            }" transform="translate(188, 76)" d="M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4" />`;

        // Fan mode
        if (this.current_action == "fan")
            return w`<path class="current_action ${
                this.action_active ? "current_action_active" : ""
            }" transform="translate(188, 76)" d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z" />`;

        // Auto mode
        if (this.current_action == "auto")
            return w`<text x="${this.configuration.radius}" y="${this.configuration.radius * 0.47}">AUTO</text>`;
    }

    /**
     * Renders current temperature and humidity
     * @returns svg
     */
    renderBottomStates() {
        return w`
            <text
                x="${this.configuration.radius}"
                y="${this.configuration.radius * 1.7}"
                class="current_temperature dial__lbl"
            >
                ${this.current_temperature}
            </text>

            <text
                x="${this.configuration.radius}"
                y="${this.configuration.radius * 1.88}"
                class="current_humidity dial__lbl"
            >
                ${this.current_humidity ? this.current_humidity + ` %` : ``}
            </text>`;
    }

    /**
     * Render ambient label
     * @returns svg
     */
    renderAmbientLabel() {
        if (!this.enable_ambient_temperature || !this.ambient_temperature) return w``;

        let peggedValue = this.restrictToRange(this.ambient_temperature, this.min_value, this.max_value);
        let deg =
            (this.configuration.tickDegrees * (peggedValue - this.min_value)) / this.configuration.rangeValue -
            this.configuration.offsetDegrees;
        if (peggedValue > this.target_temperature) {
            deg += 8;
        } else {
            deg -= 8;
        }
        let pos = this.rotatePoint(this.configuration.lblAmbientPosition, deg, [
            this.configuration.radius,
            this.configuration.radius,
        ]);

        return w`
            <text class="dial__lbl dial__lbl--ambient" x="${pos[0]}" y="${pos[1]}">${Math.floor(
            this.ambient_temperature
        )} ${this.ambient_temperature % 1 != 0 ? "⁵" : ""}
            </text>`;
    }

    /**
     * Main render function, returns whole thermostat
     * @returns svg
     */
    renderSvg() {
        return w`
            <svg
                width="100%"
                height="100%"
                class="dial dial--state--off"
                viewBox="0 0 ${this.diameter} ${this.diameter}"
                @pointermove="${this.onPointerMove}"
                @pointerdown="${this.onPointerDown}"
                @pointerup="${this.onPointerEnd}"
                @pointercancel="${this.onPointerEnd}"
            >
                ${this.renderCircle()}
                <g class="dial__ticks">${this.renderTicks()}</g>
                ${this.renderAmbientLabel()}

                ${this.renderTargetTemperature()}
                ${this.renderCurrentAction()}
                ${this.renderMoveUp()}
                ${this.renderMoveDown()}
                ${this.renderBottomStates()}
            </svg>`;
    }

    render() {
        return y` <div class="wrapper">${this.renderSvg()}</div> `;
    }

    /********************************************************************
     * Helper functions
     *******************************************************************/

    // Set attributes for an element
    attr(element, attrs) {
        for (var i in attrs) {
            element.setAttribute(i, attrs[i]);
        }
    }

    // Rotate a cartesian point about given origin by X degrees
    rotatePoint(point, angle, origin) {
        var radians = (angle * Math.PI) / 180;
        var x = point[0] - origin[0];
        var y = point[1] - origin[1];
        var x1 = x * Math.cos(radians) - y * Math.sin(radians) + origin[0];
        var y1 = x * Math.sin(radians) + y * Math.cos(radians) + origin[1];
        return [x1, y1];
    }

    // Rotate an array of cartesian points about a given origin by X degrees
    rotatePoints(points, angle, origin) {
        let rotatePoint = this.rotatePoint;
        return points.map(function (point) {
            return rotatePoint(point, angle, origin);
        });
    }

    // Given an array of points, return an SVG path string representing the shape they define
    pointsToPath(points) {
        return (
            points
                .map(function (point, iPoint) {
                    return (iPoint > 0 ? "L" : "M") + point[0] + " " + point[1];
                })
                .join(" ") + "Z"
        );
    }

    circleToPath(cx, cy, r) {
        return [
            "M",
            cx,
            ",",
            cy,
            "m",
            0 - r,
            ",",
            0,
            "a",
            r,
            ",",
            r,
            0,
            1,
            ",",
            0,
            r * 2,
            ",",
            0,
            "a",
            r,
            ",",
            r,
            0,
            1,
            ",",
            0,
            0 - r * 2,
            ",",
            0,
            "z",
        ]
            .join(" ")
            .replace(/\s,\s/g, ",");
    }

    donutPath(cx, cy, rOuter, rInner) {
        return this.circleToPath(cx, cy, rOuter) + " " + this.circleToPath(cx, cy, rInner);
    }

    // Restrict a number to a min + max range
    restrictToRange(val, min, max) {
        if (val < min) return min;
        if (val > max) return max;
        return val;
    }

    // Round a number to the nearest 0.5
    roundHalf(num) {
        return Math.round(num * 2) / 2;
    }
}

customElements.define(ELEMENT_TAG, ThermostatControl);
