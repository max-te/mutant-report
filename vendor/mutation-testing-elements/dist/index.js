/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4 = globalThis, e$6 = t$4.ShadowRoot && (void 0 === t$4.ShadyCSS || t$4.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$4 = Symbol(), o$6 = /* @__PURE__ */ new WeakMap();
let n$5 = class n {
  constructor(t2, e3, o2) {
    if (this._$cssResult$ = true, o2 !== s$4)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e3;
  }
  get styleSheet() {
    let t2 = this.o;
    const s3 = this.t;
    if (e$6 && void 0 === t2) {
      const e3 = void 0 !== s3 && 1 === s3.length;
      e3 && (t2 = o$6.get(s3)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e3 && o$6.set(s3, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$7 = (t2) => new n$5("string" == typeof t2 ? t2 : t2 + "", void 0, s$4), S$1 = (s3, o2) => {
  if (e$6)
    s3.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else
    for (const e3 of o2) {
      const o3 = document.createElement("style"), n3 = t$4.litNonce;
      void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e3.cssText, s3.appendChild(o3);
    }
}, c$4 = e$6 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e3 = "";
  for (const s3 of t3.cssRules)
    e3 += s3.cssText;
  return r$7(e3);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$2, defineProperty: e$5, getOwnPropertyDescriptor: r$6, getOwnPropertyNames: h$4, getOwnPropertySymbols: o$5, getPrototypeOf: n$4 } = Object, a$1 = globalThis, c$3 = a$1.trustedTypes, l$1 = c$3 ? c$3.emptyScript : "", p$2 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s3) => t2, u$3 = { toAttribute(t2, s3) {
  switch (s3) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s3) {
  let i2 = t2;
  switch (s3) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$3 = (t2, s3) => !i$2(t2, s3), y$1 = { attribute: true, type: String, converter: u$3, reflect: false, hasChanged: f$3 };
Symbol.metadata ??= Symbol("metadata"), a$1.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b$1 = class b extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ??= []).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s3 = y$1) {
    if (s3.state && (s3.attribute = false), this._$Ei(), this.elementProperties.set(t2, s3), !s3.noAccessor) {
      const i2 = Symbol(), r2 = this.getPropertyDescriptor(t2, i2, s3);
      void 0 !== r2 && e$5(this.prototype, t2, r2);
    }
  }
  static getPropertyDescriptor(t2, s3, i2) {
    const { get: e3, set: h2 } = r$6(this.prototype, t2) ?? { get() {
      return this[s3];
    }, set(t3) {
      this[s3] = t3;
    } };
    return { get() {
      return e3?.call(this);
    }, set(s4) {
      const r2 = e3?.call(this);
      h2.call(this, s4), this.requestUpdate(t2, r2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? y$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties")))
      return;
    const t2 = n$4(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized")))
      return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s3 = [...h$4(t3), ...o$5(t3)];
      for (const i2 of s3)
        this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s3 = litPropertyMetadata.get(t2);
      if (void 0 !== s3)
        for (const [t3, i2] of s3)
          this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s3] of this.elementProperties) {
      const i2 = this._$Eu(t3, s3);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s3) {
    const i2 = [];
    if (Array.isArray(s3)) {
      const e3 = new Set(s3.flat(1 / 0).reverse());
      for (const s4 of e3)
        i2.unshift(c$4(s4));
    } else
      void 0 !== s3 && i2.push(c$4(s3));
    return i2;
  }
  static _$Eu(t2, s3) {
    const i2 = s3.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t2) => t2(this));
  }
  addController(t2) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t2), void 0 !== this.renderRoot && this.isConnected && t2.hostConnected?.();
  }
  removeController(t2) {
    this._$EO?.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s3 = this.constructor.elementProperties;
    for (const i2 of s3.keys())
      this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t2) => t2.hostConnected?.());
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t2) => t2.hostDisconnected?.());
  }
  attributeChangedCallback(t2, s3, i2) {
    this._$AK(t2, i2);
  }
  _$EC(t2, s3) {
    const i2 = this.constructor.elementProperties.get(t2), e3 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e3 && true === i2.reflect) {
      const r2 = (void 0 !== i2.converter?.toAttribute ? i2.converter : u$3).toAttribute(s3, i2.type);
      this._$Em = t2, null == r2 ? this.removeAttribute(e3) : this.setAttribute(e3, r2), this._$Em = null;
    }
  }
  _$AK(t2, s3) {
    const i2 = this.constructor, e3 = i2._$Eh.get(t2);
    if (void 0 !== e3 && this._$Em !== e3) {
      const t3 = i2.getPropertyOptions(e3), r2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== t3.converter?.fromAttribute ? t3.converter : u$3;
      this._$Em = e3, this[e3] = r2.fromAttribute(s3, t3.type), this._$Em = null;
    }
  }
  requestUpdate(t2, s3, i2) {
    if (void 0 !== t2) {
      if (i2 ??= this.constructor.getPropertyOptions(t2), !(i2.hasChanged ?? f$3)(this[t2], s3))
        return;
      this.P(t2, s3, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t2, s3, i2) {
    this._$AL.has(t2) || this._$AL.set(t2, s3), true === i2.reflect && this._$Em !== t2 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t2);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t4, s4] of this._$Ep)
          this[t4] = s4;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0)
        for (const [s4, i2] of t3)
          true !== i2.wrapped || this._$AL.has(s4) || void 0 === this[s4] || this.P(s4, this[s4], i2);
    }
    let t2 = false;
    const s3 = this._$AL;
    try {
      t2 = this.shouldUpdate(s3), t2 ? (this.willUpdate(s3), this._$EO?.forEach((t3) => t3.hostUpdate?.()), this.update(s3)) : this._$EU();
    } catch (s4) {
      throw t2 = false, this._$EU(), s4;
    }
    t2 && this._$AE(s3);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    this._$EO?.forEach((t3) => t3.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Ej &&= this._$Ej.forEach((t3) => this._$EC(t3, this[t3])), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
b$1.elementStyles = [], b$1.shadowRootOptions = { mode: "open" }, b$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), b$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$2?.({ ReactiveElement: b$1 }), (a$1.reactiveElementVersions ??= []).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3 = globalThis, i$1 = t$3.trustedTypes, s$3 = i$1 ? i$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$4 = "$lit$", h$3 = `lit$${(Math.random() + "").slice(9)}$`, o$4 = "?" + h$3, n$3 = `<${o$4}>`, r$5 = document, l = () => r$5.createComment(""), c$2 = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, a = Array.isArray, u$2 = (t2) => a(t2) || "function" == typeof t2?.[Symbol.iterator], d = "[ 	\n\f\r]", f$2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v$1 = /-->/g, _ = />/g, m$1 = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p$1 = /'/g, g = /"/g, $ = /^(?:script|style|textarea|title)$/i, y = (t2) => (i2, ...s3) => ({ _$litType$: t2, strings: i2, values: s3 }), x = y(1), b2 = y(2), w = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), A = /* @__PURE__ */ new WeakMap(), E = r$5.createTreeWalker(r$5, 129);
function C(t2, i2) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== s$3 ? s$3.createHTML(i2) : i2;
}
const P = (t2, i2) => {
  const s3 = t2.length - 1, o2 = [];
  let r2, l2 = 2 === i2 ? "<svg>" : "", c2 = f$2;
  for (let i3 = 0; i3 < s3; i3++) {
    const s4 = t2[i3];
    let a2, u2, d2 = -1, y2 = 0;
    for (; y2 < s4.length && (c2.lastIndex = y2, u2 = c2.exec(s4), null !== u2); )
      y2 = c2.lastIndex, c2 === f$2 ? "!--" === u2[1] ? c2 = v$1 : void 0 !== u2[1] ? c2 = _ : void 0 !== u2[2] ? ($.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m$1) : void 0 !== u2[3] && (c2 = m$1) : c2 === m$1 ? ">" === u2[0] ? (c2 = r2 ?? f$2, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? m$1 : '"' === u2[3] ? g : p$1) : c2 === g || c2 === p$1 ? c2 = m$1 : c2 === v$1 || c2 === _ ? c2 = f$2 : (c2 = m$1, r2 = void 0);
    const x2 = c2 === m$1 && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === f$2 ? s4 + n$3 : d2 >= 0 ? (o2.push(a2), s4.slice(0, d2) + e$4 + s4.slice(d2) + h$3 + x2) : s4 + h$3 + (-2 === d2 ? i3 : x2);
  }
  return [C(t2, l2 + (t2[s3] || "<?>") + (2 === i2 ? "</svg>" : "")), o2];
};
class V {
  constructor({ strings: t2, _$litType$: s3 }, n3) {
    let r2;
    this.parts = [];
    let c2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = P(t2, s3);
    if (this.el = V.createElement(f2, n3), E.currentNode = this.el.content, 2 === s3) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = E.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes())
          for (const t3 of r2.getAttributeNames())
            if (t3.endsWith(e$4)) {
              const i2 = v2[a2++], s4 = r2.getAttribute(t3).split(h$3), e3 = /([.?@])?(.*)/.exec(i2);
              d2.push({ type: 1, index: c2, name: e3[2], strings: s4, ctor: "." === e3[1] ? k : "?" === e3[1] ? H : "@" === e3[1] ? I : R }), r2.removeAttribute(t3);
            } else
              t3.startsWith(h$3) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t3));
        if ($.test(r2.tagName)) {
          const t3 = r2.textContent.split(h$3), s4 = t3.length - 1;
          if (s4 > 0) {
            r2.textContent = i$1 ? i$1.emptyScript : "";
            for (let i2 = 0; i2 < s4; i2++)
              r2.append(t3[i2], l()), E.nextNode(), d2.push({ type: 2, index: ++c2 });
            r2.append(t3[s4], l());
          }
        }
      } else if (8 === r2.nodeType)
        if (r2.data === o$4)
          d2.push({ type: 2, index: c2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = r2.data.indexOf(h$3, t3 + 1)); )
            d2.push({ type: 7, index: c2 }), t3 += h$3.length - 1;
        }
      c2++;
    }
  }
  static createElement(t2, i2) {
    const s3 = r$5.createElement("template");
    return s3.innerHTML = t2, s3;
  }
}
function N(t2, i2, s3 = t2, e3) {
  if (i2 === w)
    return i2;
  let h2 = void 0 !== e3 ? s3._$Co?.[e3] : s3._$Cl;
  const o2 = c$2(i2) ? void 0 : i2._$litDirective$;
  return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s3, e3)), void 0 !== e3 ? (s3._$Co ??= [])[e3] = h2 : s3._$Cl = h2), void 0 !== h2 && (i2 = N(t2, h2._$AS(t2, i2.values), h2, e3)), i2;
}
class S {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s3 } = this._$AD, e3 = (t2?.creationScope ?? r$5).importNode(i2, true);
    E.currentNode = e3;
    let h2 = E.nextNode(), o2 = 0, n3 = 0, l2 = s3[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i3;
        2 === l2.type ? i3 = new M(h2, h2.nextSibling, this, t2) : 1 === l2.type ? i3 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : 6 === l2.type && (i3 = new L(h2, this, t2)), this._$AV.push(i3), l2 = s3[++n3];
      }
      o2 !== l2?.index && (h2 = E.nextNode(), o2++);
    }
    return E.currentNode = r$5, e3;
  }
  p(t2) {
    let i2 = 0;
    for (const s3 of this._$AV)
      void 0 !== s3 && (void 0 !== s3.strings ? (s3._$AI(t2, s3, i2), i2 += s3.strings.length - 2) : s3._$AI(t2[i2])), i2++;
  }
}
class M {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t2, i2, s3, e3) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s3, this.options = e3, this._$Cv = e3?.isConnected ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === t2?.nodeType && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = N(this, t2, i2), c$2(t2) ? t2 === T || null == t2 || "" === t2 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t2 !== this._$AH && t2 !== w && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : u$2(t2) ? this.k(t2) : this._(t2);
  }
  S(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.S(t2));
  }
  _(t2) {
    this._$AH !== T && c$2(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r$5.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    const { values: i2, _$litType$: s3 } = t2, e3 = "number" == typeof s3 ? this._$AC(t2) : (void 0 === s3.el && (s3.el = V.createElement(C(s3.h, s3.h[0]), this.options)), s3);
    if (this._$AH?._$AD === e3)
      this._$AH.p(i2);
    else {
      const t3 = new S(e3, this), s4 = t3.u(this.options);
      t3.p(i2), this.T(s4), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = A.get(t2.strings);
    return void 0 === i2 && A.set(t2.strings, i2 = new V(t2)), i2;
  }
  k(t2) {
    a(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s3, e3 = 0;
    for (const h2 of t2)
      e3 === i2.length ? i2.push(s3 = new M(this.S(l()), this.S(l()), this, this.options)) : s3 = i2[e3], s3._$AI(h2), e3++;
    e3 < i2.length && (this._$AR(s3 && s3._$AB.nextSibling, e3), i2.length = e3);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    for (this._$AP?.(false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    void 0 === this._$AM && (this._$Cv = t2, this._$AP?.(t2));
  }
}
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s3, e3, h2) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e3, this.options = h2, s3.length > 2 || "" !== s3[0] || "" !== s3[1] ? (this._$AH = Array(s3.length - 1).fill(new String()), this.strings = s3) : this._$AH = T;
  }
  _$AI(t2, i2 = this, s3, e3) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2)
      t2 = N(this, t2, i2, 0), o2 = !c$2(t2) || t2 !== this._$AH && t2 !== w, o2 && (this._$AH = t2);
    else {
      const e4 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++)
        r2 = N(this, e4[s3 + n3], i2, n3), r2 === w && (r2 = this._$AH[n3]), o2 ||= !c$2(r2) || r2 !== this._$AH[n3], r2 === T ? t2 = T : t2 !== T && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e3 && this.j(t2);
  }
  j(t2) {
    t2 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class k extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === T ? void 0 : t2;
  }
}
class H extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== T);
  }
}
class I extends R {
  constructor(t2, i2, s3, e3, h2) {
    super(t2, i2, s3, e3, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = N(this, t2, i2, 0) ?? T) === w)
      return;
    const s3 = this._$AH, e3 = t2 === T && s3 !== T || t2.capture !== s3.capture || t2.once !== s3.once || t2.passive !== s3.passive, h2 = t2 !== T && (s3 === T || e3);
    e3 && this.element.removeEventListener(this.name, this, s3), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s3) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s3;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    N(this, t2);
  }
}
const z = { P: e$4, A: h$3, C: o$4, M: 1, L: P, R: S, D: u$2, V: N, I: M, H: R, N: H, U: I, B: k, F: L }, Z = t$3.litHtmlPolyfillSupport;
Z?.(V, M), (t$3.litHtmlVersions ??= []).push("3.1.2");
const j = (t2, i2, s3) => {
  const e3 = s3?.renderBefore ?? i2;
  let h2 = e3._$litPart$;
  if (void 0 === h2) {
    const t3 = s3?.renderBefore ?? null;
    e3._$litPart$ = h2 = new M(i2.insertBefore(l(), t3), t3, void 0, s3 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let s$2 = class s extends b$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t2 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t2.firstChild, t2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = j(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return w;
  }
};
s$2._$litElement$ = true, s$2["finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: s$2 });
const r$4 = globalThis.litElementPolyfillSupport;
r$4?.({ LitElement: s$2 });
(globalThis.litElementVersions ??= []).push("4.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = (t2) => (e3, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e3);
  }) : customElements.define(t2, e3);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$3 = { attribute: true, type: String, converter: u$3, reflect: false, hasChanged: f$3 }, r$3 = (t2 = o$3, e3, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s3 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s3 && globalThis.litPropertyMetadata.set(i2, s3 = /* @__PURE__ */ new Map()), s3.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e3.get.call(this);
      e3.set.call(this, r3), this.requestUpdate(o2, n4, t2);
    }, init(e4) {
      return void 0 !== e4 && this.P(o2, void 0, t2), e4;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e3.call(this, r3), this.requestUpdate(o2, n4, t2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n$2(t2) {
  return (e3, o2) => "object" == typeof o2 ? r$3(t2, e3, o2) : ((t3, e4, o3) => {
    const r2 = e4.hasOwnProperty(o3);
    return e4.constructor.createProperty(o3, r2 ? { ...t3, wrapped: true } : t3), r2 ? Object.getOwnPropertyDescriptor(e4, o3) : void 0;
  })(t2, e3, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r$2(r2) {
  return n$2({ ...r2, state: true, attribute: false });
}
function groupBy(arr, criteria) {
  return arr.reduce((acc, item) => {
    const key = criteria(item);
    if (!Object.prototype.hasOwnProperty.call(acc, key)) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}
const SEPARATOR = "/";
function normalize(input, projectRoot, factory) {
  const fileNames = Object.keys(input);
  const commonBasePath = determineCommonBasePath(fileNames);
  const output = /* @__PURE__ */ Object.create(null);
  fileNames.forEach((fileName) => {
    const relativeFileName = normalizeName(fileName.startsWith(projectRoot) ? fileName.substr(projectRoot.length) : fileName);
    output[normalizeName(fileName.substr(commonBasePath.length))] = factory(input[fileName], relativeFileName);
  });
  return output;
}
function normalizeName(fileName) {
  return fileName.split(/\/|\\/).filter(Boolean).join("/");
}
function determineCommonBasePath(fileNames) {
  const directories = fileNames.map((fileName) => fileName.split(/\/|\\/).slice(0, -1));
  if (fileNames.length) {
    return directories.reduce(filterDirectories).join(SEPARATOR);
  } else {
    return "";
  }
  function filterDirectories(previousDirectories, currentDirectories) {
    for (let i2 = 0; i2 < previousDirectories.length; i2++) {
      if (previousDirectories[i2] !== currentDirectories[i2]) {
        return previousDirectories.splice(0, i2);
      }
    }
    return previousDirectories;
  }
}
function compareNames(a2, b3) {
  const sortValue = (metricsResult) => {
    if (metricsResult.file) {
      return `1${metricsResult.name}`;
    } else {
      return `0${metricsResult.name}`;
    }
  };
  return sortValue(a2).localeCompare(sortValue(b3));
}
var CharacterCodes;
(function(CharacterCodes2) {
  CharacterCodes2[CharacterCodes2["maxAsciiCharacter"] = 127] = "maxAsciiCharacter";
  CharacterCodes2[CharacterCodes2["lineFeed"] = 10] = "lineFeed";
  CharacterCodes2[CharacterCodes2["carriageReturn"] = 13] = "carriageReturn";
  CharacterCodes2[CharacterCodes2["lineSeparator"] = 8232] = "lineSeparator";
  CharacterCodes2[CharacterCodes2["paragraphSeparator"] = 8233] = "paragraphSeparator";
})(CharacterCodes || (CharacterCodes = {}));
function isLineBreak(ch) {
  return ch === CharacterCodes.lineFeed || ch === CharacterCodes.carriageReturn || ch === CharacterCodes.lineSeparator || ch === CharacterCodes.paragraphSeparator;
}
function computeLineStarts(text) {
  const result = [];
  let pos = 0;
  let lineStart = 0;
  function progressLineStart(pos2) {
    result.push(lineStart);
    lineStart = pos2;
  }
  progressLineStart(0);
  while (pos < text.length) {
    const ch = text.charCodeAt(pos);
    pos++;
    switch (ch) {
      case CharacterCodes.carriageReturn:
        if (text.charCodeAt(pos) === CharacterCodes.lineFeed) {
          pos++;
        }
        progressLineStart(pos);
        break;
      case CharacterCodes.lineFeed:
        progressLineStart(pos);
        break;
      default:
        if (ch > CharacterCodes.maxAsciiCharacter && isLineBreak(ch)) {
          progressLineStart(pos);
        }
        break;
    }
  }
  result.push(lineStart);
  return result;
}
function assertSourceFileDefined$1(sourceFile) {
  if (sourceFile === void 0) {
    throw new Error("mutant.sourceFile was not defined");
  }
}
class MutantModel {
  // MutantResult properties
  coveredBy;
  description;
  duration;
  id;
  killedBy;
  location;
  mutatorName;
  replacement;
  static;
  status;
  statusReason;
  testsCompleted;
  // New fields
  get coveredByTests() {
    if (this.#coveredByTests.size) {
      return Array.from(this.#coveredByTests.values());
    } else
      return void 0;
  }
  set coveredByTests(tests) {
    this.#coveredByTests = new Map(tests.map((test) => [test.id, test]));
  }
  get killedByTests() {
    if (this.#killedByTests.size) {
      return Array.from(this.#killedByTests.values());
    } else
      return void 0;
  }
  set killedByTests(tests) {
    this.#killedByTests = new Map(tests.map((test) => [test.id, test]));
  }
  #coveredByTests = /* @__PURE__ */ new Map();
  #killedByTests = /* @__PURE__ */ new Map();
  constructor(input) {
    this.coveredBy = input.coveredBy;
    this.description = input.description;
    this.duration = input.duration;
    this.id = input.id;
    this.killedBy = input.killedBy;
    this.location = input.location;
    this.mutatorName = input.mutatorName;
    this.replacement = input.replacement;
    this.static = input.static;
    this.status = input.status;
    this.statusReason = input.statusReason;
    this.testsCompleted = input.testsCompleted;
  }
  addCoveredBy(test) {
    this.#coveredByTests.set(test.id, test);
  }
  addKilledBy(test) {
    this.#killedByTests.set(test.id, test);
  }
  /**
   * Retrieves the lines of code with the mutant applied to it, to be shown in a diff view.
   */
  getMutatedLines() {
    assertSourceFileDefined$1(this.sourceFile);
    return this.sourceFile.getMutationLines(this);
  }
  /**
   * Retrieves the original source lines for this mutant, to be shown in a diff view.
   */
  getOriginalLines() {
    assertSourceFileDefined$1(this.sourceFile);
    return this.sourceFile.getLines(this.location);
  }
  /**
   * Helper property to retrieve the source file name
   * @throws When the `sourceFile` is not defined.
   */
  get fileName() {
    assertSourceFileDefined$1(this.sourceFile);
    return this.sourceFile.name;
  }
  // TODO: https://github.com/stryker-mutator/mutation-testing-elements/pull/2453#discussion_r1178769871
  update() {
    if (!this.sourceFile?.result?.file) {
      return;
    }
    this.sourceFile.result.updateAllMetrics();
  }
}
function assertSourceDefined(source) {
  if (source === void 0) {
    throw new Error("sourceFile.source is undefined");
  }
}
class SourceFile {
  lineMap;
  getLineMap() {
    assertSourceDefined(this.source);
    return this.lineMap ?? (this.lineMap = computeLineStarts(this.source));
  }
  /**
   * Retrieves the source lines based on the `start.line` and `end.line` property.
   */
  getLines(location) {
    assertSourceDefined(this.source);
    const lineMap = this.getLineMap();
    return this.source.substring(lineMap[location.start.line], lineMap[(location.end ?? location.start).line + 1]);
  }
}
class FileUnderTestModel extends SourceFile {
  name;
  /**
   * Programming language that is used. Used for code highlighting, see https://prismjs.com/#examples.
   */
  language;
  /**
   * Full source code of the mutated file, this is used for highlighting.
   */
  source;
  /**
   * The mutants inside this file.
   */
  mutants;
  /**
   * The associated MetricsResult of this file.
   */
  result;
  /**
   * @param input The file result content
   * @param name The file name
   */
  constructor(input, name) {
    super();
    this.name = name;
    this.language = input.language;
    this.source = input.source;
    this.mutants = input.mutants.map((mutantResult) => {
      const mutant = new MutantModel(mutantResult);
      mutant.sourceFile = this;
      return mutant;
    });
  }
  /**
   * Retrieves the lines of code with the mutant applied to it, to be shown in a diff view.
   */
  getMutationLines(mutant) {
    const lineMap = this.getLineMap();
    const start = lineMap[mutant.location.start.line];
    const startOfEndLine = lineMap[mutant.location.end.line];
    const end = lineMap[mutant.location.end.line + 1];
    return `${this.source.substr(start, mutant.location.start.column - 1)}${mutant.replacement ?? mutant.description ?? mutant.mutatorName}${this.source.substring(startOfEndLine + mutant.location.end.column - 1, end)}`;
  }
}
class MetricsResult {
  /**
   * The parent of this result (if it has one)
   */
  parent;
  /**
   * The name of this result
   */
  name;
  /**
   * The file belonging to this metric result (if it represents a single file)
   */
  file;
  /**
   * The the child results
   */
  childResults;
  /**
   * The actual metrics
   */
  metrics;
  constructor(name, childResults, metrics, file) {
    this.name = name;
    this.childResults = childResults;
    this.metrics = metrics;
    this.file = file;
  }
  updateParent(value) {
    this.parent = value;
    this.childResults.forEach((result) => result.updateParent(this));
  }
  updateAllMetrics() {
    if (this.parent !== void 0) {
      this.parent.updateAllMetrics();
      return;
    }
    this.updateMetrics();
  }
  updateMetrics() {
    if (this.file === void 0) {
      this.childResults.forEach((childResult) => {
        childResult.updateMetrics();
      });
      const files = this.#getFileModelsRecursively(this.childResults);
      if (files.length === 0) {
        return;
      }
      if (files[0].tests) {
        this.metrics = countTestFileMetrics(files);
      } else {
        this.metrics = countFileMetrics(files);
      }
      return;
    }
    if (this.file.tests) {
      this.metrics = countTestFileMetrics([this.file]);
    } else {
      this.metrics = countFileMetrics([this.file]);
    }
  }
  #getFileModelsRecursively(childResults) {
    const flattenedFiles = [];
    if (childResults.length === 0) {
      return flattenedFiles;
    }
    childResults.forEach((child) => {
      if (child.file) {
        flattenedFiles.push(child.file);
        return;
      }
      flattenedFiles.push(...this.#getFileModelsRecursively(child.childResults));
    });
    return flattenedFiles;
  }
}
function assertSourceFileDefined(sourceFile) {
  if (sourceFile === void 0) {
    throw new Error("test.sourceFile was not defined");
  }
}
function assertLocationDefined(location) {
  if (location === void 0) {
    throw new Error("test.location was not defined");
  }
}
var TestStatus;
(function(TestStatus2) {
  TestStatus2["Killing"] = "Killing";
  TestStatus2["Covering"] = "Covering";
  TestStatus2["NotCovering"] = "NotCovering";
})(TestStatus || (TestStatus = {}));
class TestModel {
  id;
  name;
  location;
  get killedMutants() {
    if (this.#killedMutants.size) {
      return Array.from(this.#killedMutants.values());
    } else
      return void 0;
  }
  get coveredMutants() {
    if (this.#coveredMutants.size) {
      return Array.from(this.#coveredMutants.values());
    } else
      return void 0;
  }
  #killedMutants = /* @__PURE__ */ new Map();
  #coveredMutants = /* @__PURE__ */ new Map();
  addCovered(mutant) {
    this.#coveredMutants.set(mutant.id, mutant);
  }
  addKilled(mutant) {
    this.#killedMutants.set(mutant.id, mutant);
  }
  constructor(input) {
    Object.entries(input).forEach(([key, value]) => {
      this[key] = value;
    });
  }
  /**
   * Retrieves the original source lines where this test is defined.
   * @throws if source file or location is not defined
   */
  getLines() {
    assertSourceFileDefined(this.sourceFile);
    assertLocationDefined(this.location);
    return this.sourceFile.getLines(this.location);
  }
  /**
   * Helper property to retrieve the source file name
   * @throws When the `sourceFile` is not defined.
   */
  get fileName() {
    assertSourceFileDefined(this.sourceFile);
    return this.sourceFile.name;
  }
  get status() {
    if (this.#killedMutants.size) {
      return TestStatus.Killing;
    } else if (this.#coveredMutants.size) {
      return TestStatus.Covering;
    } else {
      return TestStatus.NotCovering;
    }
  }
  update() {
    if (!this.sourceFile?.result?.file) {
      return;
    }
    this.sourceFile.result.updateAllMetrics();
  }
}
class TestFileModel extends SourceFile {
  name;
  tests;
  source;
  /**
   * The associated MetricsResult of this file.
   */
  result;
  /**
   * @param input the test file content
   * @param name the file name
   */
  constructor(input, name) {
    super();
    this.name = name;
    this.source = input.source;
    this.tests = input.tests.map((testDefinition) => {
      const test = new TestModel(testDefinition);
      test.sourceFile = this;
      return test;
    });
  }
}
const DEFAULT_SCORE = NaN;
const ROOT_NAME = "All files";
const ROOT_NAME_TESTS = "All tests";
function calculateMutationTestMetrics(result) {
  const { files, testFiles, projectRoot = "" } = result;
  const fileModelsUnderTest = normalize(files, projectRoot, (input, name) => new FileUnderTestModel(input, name));
  if (testFiles && Object.keys(testFiles).length) {
    const testFileModels = normalize(testFiles, projectRoot, (input, name) => new TestFileModel(input, name));
    relate(Object.values(fileModelsUnderTest).flatMap((file) => file.mutants), Object.values(testFileModels).flatMap((file) => file.tests));
    return {
      systemUnderTestMetrics: calculateRootMetrics(ROOT_NAME, fileModelsUnderTest, countFileMetrics),
      testMetrics: calculateRootMetrics(ROOT_NAME_TESTS, testFileModels, countTestFileMetrics)
    };
  }
  return {
    systemUnderTestMetrics: calculateRootMetrics(ROOT_NAME, fileModelsUnderTest, countFileMetrics),
    testMetrics: void 0
  };
}
function calculateRootMetrics(name, files, calculateMetrics) {
  const fileNames = Object.keys(files);
  if (fileNames.length === 1 && fileNames[0] === "") {
    return calculateFileMetrics(name, files[fileNames[0]], calculateMetrics);
  } else {
    return calculateDirectoryMetrics(name, files, calculateMetrics);
  }
}
function calculateDirectoryMetrics(name, files, calculateMetrics) {
  const metrics = calculateMetrics(Object.values(files));
  const childResults = toChildModels(files, calculateMetrics);
  return new MetricsResult(name, childResults, metrics);
}
function calculateFileMetrics(fileName, file, calculateMetrics) {
  return new MetricsResult(fileName, [], calculateMetrics([file]), file);
}
function toChildModels(files, calculateMetrics) {
  const filesByDirectory = groupBy(Object.entries(files), (namedFile) => namedFile[0].split("/")[0]);
  return Object.keys(filesByDirectory).map((directoryName) => {
    if (filesByDirectory[directoryName].length > 1 || filesByDirectory[directoryName][0][0] !== directoryName) {
      const directoryFiles = {};
      filesByDirectory[directoryName].forEach((file) => directoryFiles[file[0].substr(directoryName.length + 1)] = file[1]);
      return calculateDirectoryMetrics(directoryName, directoryFiles, calculateMetrics);
    } else {
      const [fileName, file] = filesByDirectory[directoryName][0];
      return calculateFileMetrics(fileName, file, calculateMetrics);
    }
  }).sort(compareNames);
}
function relate(mutants, tests) {
  const testMap = new Map(tests.map((test) => [test.id, test]));
  for (const mutant of mutants) {
    const coveringTestIds = mutant.coveredBy ?? [];
    for (const testId of coveringTestIds) {
      const test = testMap.get(testId);
      if (test) {
        mutant.addCoveredBy(test);
        test.addCovered(mutant);
      }
    }
    const killingTestIds = mutant.killedBy ?? [];
    for (const testId of killingTestIds) {
      const test = testMap.get(testId);
      if (test) {
        mutant.addKilledBy(test);
        test.addKilled(mutant);
      }
    }
  }
}
function countTestFileMetrics(testFile) {
  const tests = testFile.flatMap((_2) => _2.tests);
  const count = (status) => tests.filter((_2) => _2.status === status).length;
  return {
    total: tests.length,
    killing: count(TestStatus.Killing),
    covering: count(TestStatus.Covering),
    notCovering: count(TestStatus.NotCovering)
  };
}
function countFileMetrics(fileResult) {
  const mutants = fileResult.flatMap((_2) => _2.mutants);
  const count = (status) => mutants.filter((_2) => _2.status === status).length;
  const pending = count("Pending");
  const killed = count("Killed");
  const timeout = count("Timeout");
  const survived = count("Survived");
  const noCoverage = count("NoCoverage");
  const runtimeErrors = count("RuntimeError");
  const compileErrors = count("CompileError");
  const ignored = count("Ignored");
  const totalDetected = timeout + killed;
  const totalUndetected = survived + noCoverage;
  const totalCovered = totalDetected + survived;
  const totalValid = totalUndetected + totalDetected;
  const totalInvalid = runtimeErrors + compileErrors;
  return {
    pending,
    killed,
    timeout,
    survived,
    noCoverage,
    runtimeErrors,
    compileErrors,
    ignored,
    totalDetected,
    totalUndetected,
    totalCovered,
    totalValid,
    totalInvalid,
    mutationScore: totalValid > 0 ? totalDetected / totalValid * 100 : DEFAULT_SCORE,
    totalMutants: totalValid + totalInvalid + ignored + pending,
    mutationScoreBasedOnCoveredCode: totalValid > 0 ? totalDetected / totalCovered * 100 || 0 : DEFAULT_SCORE
  };
}
const tailwindCss = `/*! tailwindcss v3.4.1 | MIT License | https://tailwindcss.com*/*,:after,:before{border-color:rgb(var(--mut-gray-200,228 228 231)/1);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-size:1em;font-variation-settings:normal}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:initial}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-feature-settings:inherit;font-size:100%;font-variation-settings:inherit;font-weight:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:initial;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:initial}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{color:rgb(var(--mut-gray-400,161 161 170)/1);opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}[multiple],[type=date],[type=datetime-local],[type=email],[type=month],[type=number],[type=password],[type=search],[type=tel],[type=text],[type=time],[type=url],[type=week],input:where(:not([type])),select,textarea{-webkit-appearance:none;appearance:none;background-color:#fff;border-color:rgb(var(--mut-gray-500,113 113 122)/var(--tw-border-opacity,1));border-radius:0;border-width:1px;font-size:1rem;line-height:1.5rem;padding:.5rem .75rem;--tw-shadow:0 0 #0000}[multiple]:focus,[type=date]:focus,[type=datetime-local]:focus,[type=email]:focus,[type=month]:focus,[type=number]:focus,[type=password]:focus,[type=search]:focus,[type=tel]:focus,[type=text]:focus,[type=time]:focus,[type=url]:focus,[type=week]:focus,input:where(:not([type])):focus,select:focus,textarea:focus{outline:2px solid #0000;outline-offset:2px;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#2563eb;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);border-color:#2563eb;box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}input::placeholder,textarea::placeholder{color:rgb(var(--mut-gray-500,113 113 122)/var(--tw-text-opacity,1));opacity:1}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-date-and-time-value{min-height:1.5em;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-meridiem-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-year-field{padding-bottom:0;padding-top:0}select{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='rgb(var(--mut-gray-500, 113 113 122) / var(--tw-stroke-opacity, 1))' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");background-position:right .5rem center;background-repeat:no-repeat;background-size:1.5em 1.5em;padding-right:2.5rem;-webkit-print-color-adjust:exact;print-color-adjust:exact}[multiple],[size]:where(select:not([size="1"])){background-image:none;background-position:0 0;background-repeat:unset;background-size:initial;padding-right:.75rem;-webkit-print-color-adjust:unset;print-color-adjust:unset}[type=checkbox],[type=radio]{-webkit-appearance:none;appearance:none;background-color:#fff;background-origin:border-box;border-color:rgb(var(--mut-gray-500,113 113 122)/var(--tw-border-opacity,1));border-width:1px;color:#2563eb;display:inline-block;flex-shrink:0;height:1rem;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;-webkit-user-select:none;user-select:none;vertical-align:middle;width:1rem;--tw-shadow:0 0 #0000}[type=checkbox]{border-radius:0}[type=radio]{border-radius:100%}[type=checkbox]:focus,[type=radio]:focus{outline:2px solid #0000;outline-offset:2px;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:2px;--tw-ring-offset-color:#fff;--tw-ring-color:#2563eb;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}[type=checkbox]:checked,[type=radio]:checked{background-color:currentColor;background-position:50%;background-repeat:no-repeat;background-size:100% 100%;border-color:#0000}[type=checkbox]:checked{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 16 16'%3E%3Cpath d='M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0'/%3E%3C/svg%3E")}@media (forced-colors:active) {[type=checkbox]:checked{-webkit-appearance:auto;appearance:auto}}[type=radio]:checked{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='3'/%3E%3C/svg%3E")}@media (forced-colors:active) {[type=radio]:checked{-webkit-appearance:auto;appearance:auto}}[type=checkbox]:checked:focus,[type=checkbox]:checked:hover,[type=checkbox]:indeterminate,[type=radio]:checked:focus,[type=radio]:checked:hover{background-color:currentColor;border-color:#0000}[type=checkbox]:indeterminate{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3E%3C/svg%3E");background-position:50%;background-repeat:no-repeat;background-size:100% 100%}@media (forced-colors:active) {[type=checkbox]:indeterminate{-webkit-appearance:auto;appearance:auto}}[type=checkbox]:indeterminate:focus,[type=checkbox]:indeterminate:hover{background-color:currentColor;border-color:#0000}[type=file]{background:unset;border-color:inherit;border-radius:0;border-width:0;font-size:unset;line-height:inherit;padding:0}[type=file]:focus{outline:1px solid ButtonText;outline:1px auto -webkit-focus-ring-color}*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{margin-left:auto;margin-right:auto;width:100%}@media (min-width:640px){.container{max-width:640px}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}@media (min-width:2000px){.container{max-width:2000px}}.sr-only{height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;clip:rect(0,0,0,0);border-width:0;white-space:nowrap}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:sticky}.bottom-0{bottom:0}.left-0{left:0}.top-0{top:0}.top-offset{top:var(--top-offset,0)}.z-10{z-index:10}.z-20{z-index:20}.float-right{float:right}.mx-1{margin-left:.25rem;margin-right:.25rem}.mx-2{margin-left:.5rem;margin-right:.5rem}.mx-6{margin-left:1.5rem;margin-right:1.5rem}.my-3{margin-bottom:.75rem;margin-top:.75rem}.my-4{margin-bottom:1rem;margin-top:1rem}.-mb-px{margin-bottom:-1px}.mb-6{margin-bottom:1.5rem}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.ml-4{margin-left:1rem}.mr-12{margin-right:3rem}.mr-2{margin-right:.5rem}.mr-3{margin-right:.75rem}.mr-4{margin-right:1rem}.mr-6{margin-right:1.5rem}.mr-auto{margin-right:auto}.ms-3{margin-inline-start:.75rem}.mt-2{margin-top:.5rem}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.h-2{height:.5rem}.h-3{height:.75rem}.h-4{height:1rem}.h-5{height:1.25rem}.h-8{height:2rem}.w-12{width:3rem}.w-24{width:6rem}.w-4{width:1rem}.w-5{width:1.25rem}.w-full{width:100%}.min-w-\\[24px\\]{min-width:24px}.max-w-6xl{max-width:72rem}.table-auto{table-layout:auto}.rotate-180{--tw-rotate:180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-help{cursor:help}.cursor-pointer{cursor:pointer}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-center{justify-content:center}.justify-around{justify-content:space-around}.gap-4{gap:1rem}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(1rem*var(--tw-space-y-reverse));margin-top:calc(1rem*(1 - var(--tw-space-y-reverse)))}.divide-y>:not([hidden])~:not([hidden]){--tw-divide-y-reverse:0;border-bottom-width:calc(1px*var(--tw-divide-y-reverse));border-top-width:calc(1px*(1 - var(--tw-divide-y-reverse)))}.divide-gray-200>:not([hidden])~:not([hidden]){--tw-divide-opacity:1;border-color:rgb(var(--mut-gray-200,228 228 231)/var(--tw-divide-opacity))}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.whitespace-pre-wrap{white-space:pre-wrap}.rounded{border-radius:.25rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.rounded-t-3xl{border-top-left-radius:1.5rem;border-top-right-radius:1.5rem}.rounded-t-lg{border-top-left-radius:.5rem;border-top-right-radius:.5rem}.border{border-width:1px}.border-b{border-bottom-width:1px}.border-b-2{border-bottom-width:2px}.border-none{border-style:none}.border-gray-200{--tw-border-opacity:1;border-color:rgb(var(--mut-gray-200,228 228 231)/var(--tw-border-opacity))}.border-gray-300{--tw-border-opacity:1;border-color:rgb(var(--mut-gray-300,212 212 216)/var(--tw-border-opacity))}.border-primary-600{--tw-border-opacity:1;border-color:rgb(var(--mut-primary-600,2 132 199)/var(--tw-border-opacity))}.border-transparent{border-color:#0000}.bg-blue-600{--tw-bg-opacity:1;background-color:rgb(37 99 235/var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity:1;background-color:rgb(var(--mut-gray-100,244 244 245)/var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity:1;background-color:rgb(var(--mut-gray-200,228 228 231)/var(--tw-bg-opacity))}.bg-gray-200\\/60{background-color:rgb(var(--mut-gray-200,228 228 231)/.6)}.bg-gray-300{--tw-bg-opacity:1;background-color:rgb(var(--mut-gray-300,212 212 216)/var(--tw-bg-opacity))}.bg-green-100{--tw-bg-opacity:1;background-color:rgb(220 252 231/var(--tw-bg-opacity))}.bg-green-600{--tw-bg-opacity:1;background-color:rgb(22 163 74/var(--tw-bg-opacity))}.bg-orange-100{--tw-bg-opacity:1;background-color:rgb(255 237 213/var(--tw-bg-opacity))}.bg-primary-100{--tw-bg-opacity:1;background-color:rgb(var(--mut-primary-100,224 242 254)/var(--tw-bg-opacity))}.bg-red-100{--tw-bg-opacity:1;background-color:rgb(254 226 226/var(--tw-bg-opacity))}.bg-red-600{--tw-bg-opacity:1;background-color:rgb(220 38 38/var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgb(var(--mut-white,255 255 255)/var(--tw-bg-opacity))}.bg-yellow-100{--tw-bg-opacity:1;background-color:rgb(254 249 195/var(--tw-bg-opacity))}.bg-yellow-400{--tw-bg-opacity:1;background-color:rgb(250 204 21/var(--tw-bg-opacity))}.bg-yellow-600{--tw-bg-opacity:1;background-color:rgb(202 138 4/var(--tw-bg-opacity))}.p-1{padding:.25rem}.p-3{padding:.75rem}.p-4{padding:1rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-4{padding-left:1rem;padding-right:1rem}.py-0{padding-bottom:0;padding-top:0}.py-0\\.5{padding-bottom:.125rem;padding-top:.125rem}.py-2{padding-bottom:.5rem;padding-top:.5rem}.py-3{padding-bottom:.75rem;padding-top:.75rem}.py-4{padding-bottom:1rem;padding-top:1rem}.py-6{padding-bottom:1.5rem;padding-top:1.5rem}.pb-4{padding-bottom:1rem}.pl-1{padding-left:.25rem}.pr-2{padding-right:.5rem}.pt-6{padding-top:1.5rem}.text-left{text-align:left}.text-center{text-align:center}.align-middle{vertical-align:middle}.font-sans{font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.text-5xl{font-size:3rem;line-height:1}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.font-bold{font-weight:700}.font-light{font-weight:300}.font-medium{font-weight:500}.font-semibold{font-weight:600}.tracking-tight{letter-spacing:-.025em}.text-gray-200{--tw-text-opacity:1;color:rgb(var(--mut-gray-200,228 228 231)/var(--tw-text-opacity))}.text-gray-600{--tw-text-opacity:1;color:rgb(var(--mut-gray-600,82 82 91)/var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity:1;color:rgb(var(--mut-gray-700,63 63 70)/var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity:1;color:rgb(var(--mut-gray-800,39 39 42)/var(--tw-text-opacity))}.text-green-700{--tw-text-opacity:1;color:rgb(21 128 61/var(--tw-text-opacity))}.text-green-800{--tw-text-opacity:1;color:rgb(22 101 52/var(--tw-text-opacity))}.text-orange-800{--tw-text-opacity:1;color:rgb(154 52 18/var(--tw-text-opacity))}.text-primary-800{--tw-text-opacity:1;color:rgb(var(--mut-primary-800,7 89 133)/var(--tw-text-opacity))}.text-primary-on{--tw-text-opacity:1;color:rgb(var(--mut-primary-on,3 105 161)/var(--tw-text-opacity))}.text-red-700{--tw-text-opacity:1;color:rgb(185 28 28/var(--tw-text-opacity))}.text-red-800{--tw-text-opacity:1;color:rgb(153 27 27/var(--tw-text-opacity))}.text-yellow-600{--tw-text-opacity:1;color:rgb(202 138 4/var(--tw-text-opacity))}.text-yellow-800{--tw-text-opacity:1;color:rgb(133 77 14/var(--tw-text-opacity))}.underline{text-decoration-line:underline}.decoration-dotted{text-decoration-style:dotted}.opacity-0{opacity:0}.shadow{--tw-shadow:0 1px 3px 0 #0000001a,0 1px 2px -1px #0000001a;--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-xl{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px #0000001a,0 8px 10px -6px #0000001a;--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color)}.\\!ring-offset-gray-200{--tw-ring-offset-color:rgb(var(--mut-gray-200,228 228 231)/1)!important}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur-lg{--tw-backdrop-blur:blur(16px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-colors{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1)}.after\\:text-gray-800:after{content:var(--tw-content);--tw-text-opacity:1;color:rgb(var(--mut-gray-800,39 39 42)/var(--tw-text-opacity))}.after\\:content-\\[\\'\\/\\'\\]:after{--tw-content:"/";content:var(--tw-content)}.even\\:bg-gray-100:nth-child(2n),.odd\\:bg-gray-100:nth-child(odd){--tw-bg-opacity:1;background-color:rgb(var(--mut-gray-100,244 244 245)/var(--tw-bg-opacity))}.hover\\:cursor-pointer:hover{cursor:pointer}.hover\\:border-gray-300:hover{--tw-border-opacity:1;border-color:rgb(var(--mut-gray-300,212 212 216)/var(--tw-border-opacity))}.hover\\:bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgb(var(--mut-gray-100,244 244 245)/var(--tw-bg-opacity))}.hover\\:bg-gray-200:hover{--tw-bg-opacity:1;background-color:rgb(var(--mut-gray-200,228 228 231)/var(--tw-bg-opacity))}.hover\\:text-gray-700:hover{--tw-text-opacity:1;color:rgb(var(--mut-gray-700,63 63 70)/var(--tw-text-opacity))}.hover\\:text-gray-900:hover{--tw-text-opacity:1;color:rgb(var(--mut-gray-900,24 24 27)/var(--tw-text-opacity))}.hover\\:text-primary-on:hover{--tw-text-opacity:1;color:rgb(var(--mut-primary-on,3 105 161)/var(--tw-text-opacity))}.hover\\:underline:hover{text-decoration-line:underline}.focus\\:outline-none:focus{outline:2px solid #0000;outline-offset:2px}.focus\\:ring-2:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.focus\\:ring-primary-500:focus{--tw-ring-opacity:1;--tw-ring-color:rgb(var(--mut-primary-500,14 165 233)/var(--tw-ring-opacity))}.active\\:bg-gray-200:active,.group:hover .group-hover\\:bg-gray-200{--tw-bg-opacity:1;background-color:rgb(var(--mut-gray-200,228 228 231)/var(--tw-bg-opacity))}.aria-selected\\:border-b-\\[3px\\][aria-selected=true]{border-bottom-width:3px}.aria-selected\\:border-primary-700[aria-selected=true]{--tw-border-opacity:1;border-color:rgb(var(--mut-primary-700,3 105 161)/var(--tw-border-opacity))}.aria-selected\\:text-primary-on[aria-selected=true]{--tw-text-opacity:1;color:rgb(var(--mut-primary-on,3 105 161)/var(--tw-text-opacity))}@media (prefers-reduced-motion:no-preference){.motion-safe\\:transition-\\[height\\2c max-width\\]{transition-duration:.15s;transition-property:height,max-width;transition-timing-function:cubic-bezier(.4,0,.2,1)}.motion-safe\\:transition-max-width{transition-duration:.15s;transition-property:max-width;transition-timing-function:cubic-bezier(.4,0,.2,1)}.motion-safe\\:duration-200{transition-duration:.2s}}@media (min-width:768px){.md\\:ml-2{margin-left:.5rem}.md\\:after\\:pl-1:after{content:var(--tw-content);padding-left:.25rem}}@media (min-width:1536px){.\\32xl\\:w-28{width:7rem}}`;
const prismjsCss = "code[class*=language-],pre[class*=language-]{color:var(--prism-maintext);direction:ltr;font-family:Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;font-size:1em;-webkit-hyphens:none;hyphens:none;line-height:1.5;tab-size:4;text-align:left;white-space:pre;word-break:normal;word-spacing:normal}pre>code[class*=language-]{font-size:1em}pre[class*=language-]{border:1px solid var(--prism-border);border-radius:.25rem;margin:.5em 0;overflow:auto;padding:1em}:not(pre)>code[class*=language-],pre[class*=language-]{background:var(--prism-background)}.token.cdata,.token.comment,.token.doctype,.token.italic,.token.prolog{font-style:italic}.token.bold,.token.function,.token.important{font-weight:700}.token.namespace{opacity:.7}.token.atrule{color:var(--prism-atrule)}.token.attr{color:var(--prism-attr)}.token.attr-name{color:var(--prism-attr-name)}.token.boolean{color:var(--prism-boolean)}.token.builtin{color:var(--prism-builtin)}.token.cdata{color:var(--prism-cdata)}.token.changed{color:var(--prism-changed)}.token.char{color:var(--prism-char)}.token.comment{color:var(--prism-comment)}.token.constant{color:var(--prism-constant)}.token.deleted{color:var(--prism-deleted)}.token.doctype{color:var(--prism-doctype)}.token.entity{color:var(--prism-entity);cursor:help}.token.function{color:var(--prism-function)}.token.function-variable{color:var(--prism-function-variable,var(--prism-function))}.token.inserted{color:var(--prism-inserted)}.token.keyword{color:var(--prism-keyword)}.token.number{color:var(--prism-number)}.token.operator{color:var(--prism-operator)}.token.prolog{color:var(--prism-prolog)}.token.property{color:var(--prism-property)}.token.punctuation{color:var(--prism-punctuation)}.token.regex{color:var(--prism-regex)}.token.selector{color:var(--prism-selector)}.token.string{color:var(--prism-string)}.token.symbol{color:var(--prism-symbol)}.token.tag{color:var(--prism-tag)}.token.url{color:var(--prism-url)}.token.variable{color:var(--prism-variable)}.token.placeholder{color:var(--prism-placeholder)}.token.statement{color:var(--prism-statement)}.token.attr-value{color:var(--prism-attr-value)}.token.control{color:var(--prism-control)}.token.directive{color:var(--prism-directive)}.token.unit{color:var(--prism-unit)}.token.important{color:var(--prism-important)}.token.class-name{color:var(--prism-class-name)}";
const globalsCss = ":host{--mte-drawer-height-half-open:120px}";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var prismCore = { exports: {} };
(function(module) {
  var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
  /**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   */
  var Prism2 = function(_self2) {
    var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
    var uniqueId = 0;
    var plainTextGrammar = {};
    var _2 = {
      /**
       * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
       * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
       * additional languages or plugins yourself.
       *
       * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
       *
       * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
       * empty Prism object into the global scope before loading the Prism script like this:
       *
       * ```js
       * window.Prism = window.Prism || {};
       * Prism.manual = true;
       * // add a new <script> to load Prism's script
       * ```
       *
       * @default false
       * @type {boolean}
       * @memberof Prism
       * @public
       */
      manual: _self2.Prism && _self2.Prism.manual,
      /**
       * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
       * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
       * own worker, you don't want it to do this.
       *
       * By setting this value to `true`, Prism will not add its own listeners to the worker.
       *
       * You obviously have to change this value before Prism executes. To do this, you can add an
       * empty Prism object into the global scope before loading the Prism script like this:
       *
       * ```js
       * window.Prism = window.Prism || {};
       * Prism.disableWorkerMessageHandler = true;
       * // Load Prism's script
       * ```
       *
       * @default false
       * @type {boolean}
       * @memberof Prism
       * @public
       */
      disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
      /**
       * A namespace for utility methods.
       *
       * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
       * change or disappear at any time.
       *
       * @namespace
       * @memberof Prism
       */
      util: {
        encode: function encode(tokens) {
          if (tokens instanceof Token) {
            return new Token(tokens.type, encode(tokens.content), tokens.alias);
          } else if (Array.isArray(tokens)) {
            return tokens.map(encode);
          } else {
            return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          }
        },
        /**
         * Returns the name of the type of the given value.
         *
         * @param {any} o
         * @returns {string}
         * @example
         * type(null)      === 'Null'
         * type(undefined) === 'Undefined'
         * type(123)       === 'Number'
         * type('foo')     === 'String'
         * type(true)      === 'Boolean'
         * type([1, 2])    === 'Array'
         * type({})        === 'Object'
         * type(String)    === 'Function'
         * type(/abc+/)    === 'RegExp'
         */
        type: function(o2) {
          return Object.prototype.toString.call(o2).slice(8, -1);
        },
        /**
         * Returns a unique number for the given object. Later calls will still return the same number.
         *
         * @param {Object} obj
         * @returns {number}
         */
        objId: function(obj) {
          if (!obj["__id"]) {
            Object.defineProperty(obj, "__id", { value: ++uniqueId });
          }
          return obj["__id"];
        },
        /**
         * Creates a deep clone of the given object.
         *
         * The main intended use of this function is to clone language definitions.
         *
         * @param {T} o
         * @param {Record<number, any>} [visited]
         * @returns {T}
         * @template T
         */
        clone: function deepClone(o2, visited) {
          visited = visited || {};
          var clone;
          var id;
          switch (_2.util.type(o2)) {
            case "Object":
              id = _2.util.objId(o2);
              if (visited[id]) {
                return visited[id];
              }
              clone = /** @type {Record<string, any>} */
              {};
              visited[id] = clone;
              for (var key in o2) {
                if (o2.hasOwnProperty(key)) {
                  clone[key] = deepClone(o2[key], visited);
                }
              }
              return (
                /** @type {any} */
                clone
              );
            case "Array":
              id = _2.util.objId(o2);
              if (visited[id]) {
                return visited[id];
              }
              clone = [];
              visited[id] = clone;
              /** @type {Array} */
              /** @type {any} */
              o2.forEach(function(v2, i2) {
                clone[i2] = deepClone(v2, visited);
              });
              return (
                /** @type {any} */
                clone
              );
            default:
              return o2;
          }
        },
        /**
         * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
         *
         * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
         *
         * @param {Element} element
         * @returns {string}
         */
        getLanguage: function(element) {
          while (element) {
            var m2 = lang.exec(element.className);
            if (m2) {
              return m2[1].toLowerCase();
            }
            element = element.parentElement;
          }
          return "none";
        },
        /**
         * Sets the Prism `language-xxxx` class of the given element.
         *
         * @param {Element} element
         * @param {string} language
         * @returns {void}
         */
        setLanguage: function(element, language) {
          element.className = element.className.replace(RegExp(lang, "gi"), "");
          element.classList.add("language-" + language);
        },
        /**
         * Returns the script element that is currently executing.
         *
         * This does __not__ work for line script element.
         *
         * @returns {HTMLScriptElement | null}
         */
        currentScript: function() {
          if (typeof document === "undefined") {
            return null;
          }
          if ("currentScript" in document && 1 < 2) {
            return (
              /** @type {any} */
              document.currentScript
            );
          }
          try {
            throw new Error();
          } catch (err) {
            var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
            if (src) {
              var scripts = document.getElementsByTagName("script");
              for (var i2 in scripts) {
                if (scripts[i2].src == src) {
                  return scripts[i2];
                }
              }
            }
            return null;
          }
        },
        /**
         * Returns whether a given class is active for `element`.
         *
         * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
         * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
         * given class is just the given class with a `no-` prefix.
         *
         * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
         * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
         * ancestors have the given class or the negated version of it, then the default activation will be returned.
         *
         * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
         * version of it, the class is considered active.
         *
         * @param {Element} element
         * @param {string} className
         * @param {boolean} [defaultActivation=false]
         * @returns {boolean}
         */
        isActive: function(element, className, defaultActivation) {
          var no = "no-" + className;
          while (element) {
            var classList = element.classList;
            if (classList.contains(className)) {
              return true;
            }
            if (classList.contains(no)) {
              return false;
            }
            element = element.parentElement;
          }
          return !!defaultActivation;
        }
      },
      /**
       * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
       *
       * @namespace
       * @memberof Prism
       * @public
       */
      languages: {
        /**
         * The grammar for plain, unformatted text.
         */
        plain: plainTextGrammar,
        plaintext: plainTextGrammar,
        text: plainTextGrammar,
        txt: plainTextGrammar,
        /**
         * Creates a deep copy of the language with the given id and appends the given tokens.
         *
         * If a token in `redef` also appears in the copied language, then the existing token in the copied language
         * will be overwritten at its original position.
         *
         * ## Best practices
         *
         * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
         * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
         * understand the language definition because, normally, the order of tokens matters in Prism grammars.
         *
         * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
         * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
         *
         * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
         * @param {Grammar} redef The new tokens to append.
         * @returns {Grammar} The new language created.
         * @public
         * @example
         * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
         *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
         *     // at its original position
         *     'comment': { ... },
         *     // CSS doesn't have a 'color' token, so this token will be appended
         *     'color': /\b(?:red|green|blue)\b/
         * });
         */
        extend: function(id, redef) {
          var lang2 = _2.util.clone(_2.languages[id]);
          for (var key in redef) {
            lang2[key] = redef[key];
          }
          return lang2;
        },
        /**
         * Inserts tokens _before_ another token in a language definition or any other grammar.
         *
         * ## Usage
         *
         * This helper method makes it easy to modify existing languages. For example, the CSS language definition
         * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
         * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
         * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
         * this:
         *
         * ```js
         * Prism.languages.markup.style = {
         *     // token
         * };
         * ```
         *
         * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
         * before existing tokens. For the CSS example above, you would use it like this:
         *
         * ```js
         * Prism.languages.insertBefore('markup', 'cdata', {
         *     'style': {
         *         // token
         *     }
         * });
         * ```
         *
         * ## Special cases
         *
         * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
         * will be ignored.
         *
         * This behavior can be used to insert tokens after `before`:
         *
         * ```js
         * Prism.languages.insertBefore('markup', 'comment', {
         *     'comment': Prism.languages.markup.comment,
         *     // tokens after 'comment'
         * });
         * ```
         *
         * ## Limitations
         *
         * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
         * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
         * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
         * deleting properties which is necessary to insert at arbitrary positions.
         *
         * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
         * Instead, it will create a new object and replace all references to the target object with the new one. This
         * can be done without temporarily deleting properties, so the iteration order is well-defined.
         *
         * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
         * you hold the target object in a variable, then the value of the variable will not change.
         *
         * ```js
         * var oldMarkup = Prism.languages.markup;
         * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
         *
         * assert(oldMarkup !== Prism.languages.markup);
         * assert(newMarkup === Prism.languages.markup);
         * ```
         *
         * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
         * object to be modified.
         * @param {string} before The key to insert before.
         * @param {Grammar} insert An object containing the key-value pairs to be inserted.
         * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
         * object to be modified.
         *
         * Defaults to `Prism.languages`.
         * @returns {Grammar} The new grammar object.
         * @public
         */
        insertBefore: function(inside, before, insert, root) {
          root = root || /** @type {any} */
          _2.languages;
          var grammar = root[inside];
          var ret = {};
          for (var token in grammar) {
            if (grammar.hasOwnProperty(token)) {
              if (token == before) {
                for (var newToken in insert) {
                  if (insert.hasOwnProperty(newToken)) {
                    ret[newToken] = insert[newToken];
                  }
                }
              }
              if (!insert.hasOwnProperty(token)) {
                ret[token] = grammar[token];
              }
            }
          }
          var old = root[inside];
          root[inside] = ret;
          _2.languages.DFS(_2.languages, function(key, value) {
            if (value === old && key != inside) {
              this[key] = ret;
            }
          });
          return ret;
        },
        // Traverse a language definition with Depth First Search
        DFS: function DFS(o2, callback, type, visited) {
          visited = visited || {};
          var objId = _2.util.objId;
          for (var i2 in o2) {
            if (o2.hasOwnProperty(i2)) {
              callback.call(o2, i2, o2[i2], type || i2);
              var property = o2[i2];
              var propertyType = _2.util.type(property);
              if (propertyType === "Object" && !visited[objId(property)]) {
                visited[objId(property)] = true;
                DFS(property, callback, null, visited);
              } else if (propertyType === "Array" && !visited[objId(property)]) {
                visited[objId(property)] = true;
                DFS(property, callback, i2, visited);
              }
            }
          }
        }
      },
      plugins: {},
      /**
       * This is the most high-level function in Prism’s API.
       * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
       * each one of them.
       *
       * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
       *
       * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
       * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
       * @memberof Prism
       * @public
       */
      highlightAll: function(async2, callback) {
        _2.highlightAllUnder(document, async2, callback);
      },
      /**
       * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
       * {@link Prism.highlightElement} on each one of them.
       *
       * The following hooks will be run:
       * 1. `before-highlightall`
       * 2. `before-all-elements-highlight`
       * 3. All hooks of {@link Prism.highlightElement} for each element.
       *
       * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
       * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
       * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
       * @memberof Prism
       * @public
       */
      highlightAllUnder: function(container, async2, callback) {
        var env = {
          callback,
          container,
          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        _2.hooks.run("before-highlightall", env);
        env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
        _2.hooks.run("before-all-elements-highlight", env);
        for (var i2 = 0, element; element = env.elements[i2++]; ) {
          _2.highlightElement(element, async2 === true, env.callback);
        }
      },
      /**
       * Highlights the code inside a single element.
       *
       * The following hooks will be run:
       * 1. `before-sanity-check`
       * 2. `before-highlight`
       * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
       * 4. `before-insert`
       * 5. `after-highlight`
       * 6. `complete`
       *
       * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
       * the element's language.
       *
       * @param {Element} element The element containing the code.
       * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
       * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
       * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
       * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
       *
       * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
       * asynchronous highlighting to work. You can build your own bundle on the
       * [Download page](https://prismjs.com/download.html).
       * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
       * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
       * @memberof Prism
       * @public
       */
      highlightElement: function(element, async2, callback) {
        var language = _2.util.getLanguage(element);
        var grammar = _2.languages[language];
        _2.util.setLanguage(element, language);
        var parent = element.parentElement;
        if (parent && parent.nodeName.toLowerCase() === "pre") {
          _2.util.setLanguage(parent, language);
        }
        var code = element.textContent;
        var env = {
          element,
          language,
          grammar,
          code
        };
        function insertHighlightedCode(highlightedCode) {
          env.highlightedCode = highlightedCode;
          _2.hooks.run("before-insert", env);
          env.element.innerHTML = env.highlightedCode;
          _2.hooks.run("after-highlight", env);
          _2.hooks.run("complete", env);
          callback && callback.call(env.element);
        }
        _2.hooks.run("before-sanity-check", env);
        parent = env.element.parentElement;
        if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
          parent.setAttribute("tabindex", "0");
        }
        if (!env.code) {
          _2.hooks.run("complete", env);
          callback && callback.call(env.element);
          return;
        }
        _2.hooks.run("before-highlight", env);
        if (!env.grammar) {
          insertHighlightedCode(_2.util.encode(env.code));
          return;
        }
        if (async2 && _self2.Worker) {
          var worker = new Worker(_2.filename);
          worker.onmessage = function(evt) {
            insertHighlightedCode(evt.data);
          };
          worker.postMessage(JSON.stringify({
            language: env.language,
            code: env.code,
            immediateClose: true
          }));
        } else {
          insertHighlightedCode(_2.highlight(env.code, env.grammar, env.language));
        }
      },
      /**
       * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
       * and the language definitions to use, and returns a string with the HTML produced.
       *
       * The following hooks will be run:
       * 1. `before-tokenize`
       * 2. `after-tokenize`
       * 3. `wrap`: On each {@link Token}.
       *
       * @param {string} text A string with the code to be highlighted.
       * @param {Grammar} grammar An object containing the tokens to use.
       *
       * Usually a language definition like `Prism.languages.markup`.
       * @param {string} language The name of the language definition passed to `grammar`.
       * @returns {string} The highlighted HTML.
       * @memberof Prism
       * @public
       * @example
       * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
       */
      highlight: function(text, grammar, language) {
        var env = {
          code: text,
          grammar,
          language
        };
        _2.hooks.run("before-tokenize", env);
        if (!env.grammar) {
          throw new Error('The language "' + env.language + '" has no grammar.');
        }
        env.tokens = _2.tokenize(env.code, env.grammar);
        _2.hooks.run("after-tokenize", env);
        return Token.stringify(_2.util.encode(env.tokens), env.language);
      },
      /**
       * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
       * and the language definitions to use, and returns an array with the tokenized code.
       *
       * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
       *
       * This method could be useful in other contexts as well, as a very crude parser.
       *
       * @param {string} text A string with the code to be highlighted.
       * @param {Grammar} grammar An object containing the tokens to use.
       *
       * Usually a language definition like `Prism.languages.markup`.
       * @returns {TokenStream} An array of strings and tokens, a token stream.
       * @memberof Prism
       * @public
       * @example
       * let code = `var foo = 0;`;
       * let tokens = Prism.tokenize(code, Prism.languages.javascript);
       * tokens.forEach(token => {
       *     if (token instanceof Prism.Token && token.type === 'number') {
       *         console.log(`Found numeric literal: ${token.content}`);
       *     }
       * });
       */
      tokenize: function(text, grammar) {
        var rest = grammar.rest;
        if (rest) {
          for (var token in rest) {
            grammar[token] = rest[token];
          }
          delete grammar.rest;
        }
        var tokenList = new LinkedList();
        addAfter(tokenList, tokenList.head, text);
        matchGrammar(text, tokenList, grammar, tokenList.head, 0);
        return toArray(tokenList);
      },
      /**
       * @namespace
       * @memberof Prism
       * @public
       */
      hooks: {
        all: {},
        /**
         * Adds the given callback to the list of callbacks for the given hook.
         *
         * The callback will be invoked when the hook it is registered for is run.
         * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
         *
         * One callback function can be registered to multiple hooks and the same hook multiple times.
         *
         * @param {string} name The name of the hook.
         * @param {HookCallback} callback The callback function which is given environment variables.
         * @public
         */
        add: function(name, callback) {
          var hooks = _2.hooks.all;
          hooks[name] = hooks[name] || [];
          hooks[name].push(callback);
        },
        /**
         * Runs a hook invoking all registered callbacks with the given environment variables.
         *
         * Callbacks will be invoked synchronously and in the order in which they were registered.
         *
         * @param {string} name The name of the hook.
         * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
         * @public
         */
        run: function(name, env) {
          var callbacks = _2.hooks.all[name];
          if (!callbacks || !callbacks.length) {
            return;
          }
          for (var i2 = 0, callback; callback = callbacks[i2++]; ) {
            callback(env);
          }
        }
      },
      Token
    };
    _self2.Prism = _2;
    function Token(type, content, alias, matchedStr) {
      this.type = type;
      this.content = content;
      this.alias = alias;
      this.length = (matchedStr || "").length | 0;
    }
    Token.stringify = function stringify(o2, language) {
      if (typeof o2 == "string") {
        return o2;
      }
      if (Array.isArray(o2)) {
        var s3 = "";
        o2.forEach(function(e3) {
          s3 += stringify(e3, language);
        });
        return s3;
      }
      var env = {
        type: o2.type,
        content: stringify(o2.content, language),
        tag: "span",
        classes: ["token", o2.type],
        attributes: {},
        language
      };
      var aliases = o2.alias;
      if (aliases) {
        if (Array.isArray(aliases)) {
          Array.prototype.push.apply(env.classes, aliases);
        } else {
          env.classes.push(aliases);
        }
      }
      _2.hooks.run("wrap", env);
      var attributes = "";
      for (var name in env.attributes) {
        attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
      }
      return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
    };
    function matchPattern(pattern, pos, text, lookbehind) {
      pattern.lastIndex = pos;
      var match = pattern.exec(text);
      if (match && lookbehind && match[1]) {
        var lookbehindLength = match[1].length;
        match.index += lookbehindLength;
        match[0] = match[0].slice(lookbehindLength);
      }
      return match;
    }
    function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
      for (var token in grammar) {
        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
          continue;
        }
        var patterns = grammar[token];
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        for (var j2 = 0; j2 < patterns.length; ++j2) {
          if (rematch && rematch.cause == token + "," + j2) {
            return;
          }
          var patternObj = patterns[j2];
          var inside = patternObj.inside;
          var lookbehind = !!patternObj.lookbehind;
          var greedy = !!patternObj.greedy;
          var alias = patternObj.alias;
          if (greedy && !patternObj.pattern.global) {
            var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
            patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
          }
          var pattern = patternObj.pattern || patternObj;
          for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
            if (rematch && pos >= rematch.reach) {
              break;
            }
            var str = currentNode.value;
            if (tokenList.length > text.length) {
              return;
            }
            if (str instanceof Token) {
              continue;
            }
            var removeCount = 1;
            var match;
            if (greedy) {
              match = matchPattern(pattern, pos, text, lookbehind);
              if (!match || match.index >= text.length) {
                break;
              }
              var from2 = match.index;
              var to = match.index + match[0].length;
              var p2 = pos;
              p2 += currentNode.value.length;
              while (from2 >= p2) {
                currentNode = currentNode.next;
                p2 += currentNode.value.length;
              }
              p2 -= currentNode.value.length;
              pos = p2;
              if (currentNode.value instanceof Token) {
                continue;
              }
              for (var k2 = currentNode; k2 !== tokenList.tail && (p2 < to || typeof k2.value === "string"); k2 = k2.next) {
                removeCount++;
                p2 += k2.value.length;
              }
              removeCount--;
              str = text.slice(pos, p2);
              match.index -= pos;
            } else {
              match = matchPattern(pattern, 0, str, lookbehind);
              if (!match) {
                continue;
              }
            }
            var from2 = match.index;
            var matchStr = match[0];
            var before = str.slice(0, from2);
            var after = str.slice(from2 + matchStr.length);
            var reach = pos + str.length;
            if (rematch && reach > rematch.reach) {
              rematch.reach = reach;
            }
            var removeFrom = currentNode.prev;
            if (before) {
              removeFrom = addAfter(tokenList, removeFrom, before);
              pos += before.length;
            }
            removeRange(tokenList, removeFrom, removeCount);
            var wrapped = new Token(token, inside ? _2.tokenize(matchStr, inside) : matchStr, alias, matchStr);
            currentNode = addAfter(tokenList, removeFrom, wrapped);
            if (after) {
              addAfter(tokenList, currentNode, after);
            }
            if (removeCount > 1) {
              var nestedRematch = {
                cause: token + "," + j2,
                reach
              };
              matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
              if (rematch && nestedRematch.reach > rematch.reach) {
                rematch.reach = nestedRematch.reach;
              }
            }
          }
        }
      }
    }
    function LinkedList() {
      var head = { value: null, prev: null, next: null };
      var tail = { value: null, prev: head, next: null };
      head.next = tail;
      this.head = head;
      this.tail = tail;
      this.length = 0;
    }
    function addAfter(list, node, value) {
      var next = node.next;
      var newNode = { value, prev: node, next };
      node.next = newNode;
      next.prev = newNode;
      list.length++;
      return newNode;
    }
    function removeRange(list, node, count) {
      var next = node.next;
      for (var i2 = 0; i2 < count && next !== list.tail; i2++) {
        next = next.next;
      }
      node.next = next;
      next.prev = node;
      list.length -= i2;
    }
    function toArray(list) {
      var array = [];
      var node = list.head.next;
      while (node !== list.tail) {
        array.push(node.value);
        node = node.next;
      }
      return array;
    }
    if (!_self2.document) {
      if (!_self2.addEventListener) {
        return _2;
      }
      if (!_2.disableWorkerMessageHandler) {
        _self2.addEventListener("message", function(evt) {
          var message = JSON.parse(evt.data);
          var lang2 = message.language;
          var code = message.code;
          var immediateClose = message.immediateClose;
          _self2.postMessage(_2.highlight(code, _2.languages[lang2], lang2));
          if (immediateClose) {
            _self2.close();
          }
        }, false);
      }
      return _2;
    }
    var script = _2.util.currentScript();
    if (script) {
      _2.filename = script.src;
      if (script.hasAttribute("data-manual")) {
        _2.manual = true;
      }
    }
    function highlightAutomaticallyCallback() {
      if (!_2.manual) {
        _2.highlightAll();
      }
    }
    if (!_2.manual) {
      var readyState = document.readyState;
      if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
        document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
      } else {
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(highlightAutomaticallyCallback);
        } else {
          window.setTimeout(highlightAutomaticallyCallback, 16);
        }
      }
    }
    return _2;
  }(_self);
  if (module.exports) {
    module.exports = Prism2;
  }
  if (typeof commonjsGlobal !== "undefined") {
    commonjsGlobal.Prism = Prism2;
  }
})(prismCore);
var prismCoreExports = prismCore.exports;
Prism.languages.clike = {
  "comment": [
    {
      pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
      lookbehind: true,
      greedy: true
    },
    {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true,
      greedy: true
    }
  ],
  "string": {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  "class-name": {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: true,
    inside: {
      "punctuation": /[.\\]/
    }
  },
  "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  "boolean": /\b(?:false|true)\b/,
  "function": /\b\w+(?=\()/,
  "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  "punctuation": /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
      lookbehind: true
    }
  ],
  "keyword": [
    {
      pattern: /((?:^|\})\s*)catch\b/,
      lookbehind: true
    },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: true
    }
  ],
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  "number": {
    pattern: RegExp(
      /(^|[^\w$])/.source + "(?:" + // constant
      (/NaN|Infinity/.source + "|" + // binary integer
      /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
      /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
      /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
      /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
      /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
    ),
    lookbehind: true
  },
  "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore("javascript", "keyword", {
  "regex": {
    pattern: RegExp(
      // lookbehind
      // eslint-disable-next-line regexp/no-dupe-characters-character-class
      /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
      // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
      // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
      // with the only syntax, so we have to define 2 different regex patterns.
      /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
      /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
      /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
    ),
    lookbehind: true,
    greedy: true,
    inside: {
      "regex-source": {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: true,
        alias: "language-regex",
        inside: Prism.languages.regex
      },
      "regex-delimiter": /^\/|\/$/,
      "regex-flags": /^[a-z]+$/
    }
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  "function-variable": {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: "function"
  },
  "parameter": [
    {
      pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    }
  ],
  "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore("javascript", "string", {
  "hashbang": {
    pattern: /^#!.*/,
    greedy: true,
    alias: "comment"
  },
  "template-string": {
    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
    greedy: true,
    inside: {
      "template-punctuation": {
        pattern: /^`|`$/,
        alias: "string"
      },
      "interpolation": {
        pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
        lookbehind: true,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\$\{|\}$/,
            alias: "punctuation"
          },
          rest: Prism.languages.javascript
        }
      },
      "string": /[\s\S]+/
    }
  },
  "string-property": {
    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
    lookbehind: true,
    greedy: true,
    alias: "property"
  }
});
Prism.languages.insertBefore("javascript", "operator", {
  "literal-property": {
    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
    lookbehind: true,
    alias: "property"
  }
});
if (Prism.languages.markup) {
  Prism.languages.markup.tag.addInlined("script", "javascript");
  Prism.languages.markup.tag.addAttribute(
    /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
    "javascript"
  );
}
Prism.languages.js = Prism.languages.javascript;
(function(Prism2) {
  Prism2.languages.typescript = Prism2.languages.extend("javascript", {
    "class-name": {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: true,
      greedy: true,
      inside: null
      // see below
    },
    "builtin": /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
  });
  Prism2.languages.typescript.keyword.push(
    /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
    // keywords that have to be followed by an identifier
    /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
    // This is for `import type *, {}`
    /\btype\b(?=\s*(?:[\{*]|$))/
  );
  delete Prism2.languages.typescript["parameter"];
  delete Prism2.languages.typescript["literal-property"];
  var typeInside = Prism2.languages.extend("typescript", {});
  delete typeInside["class-name"];
  Prism2.languages.typescript["class-name"].inside = typeInside;
  Prism2.languages.insertBefore("typescript", "function", {
    "decorator": {
      pattern: /@[$\w\xA0-\uFFFF]+/,
      inside: {
        "at": {
          pattern: /^@/,
          alias: "operator"
        },
        "function": /^[\s\S]+/
      }
    },
    "generic-function": {
      // e.g. foo<T extends "bar" | "baz">( ...
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
      greedy: true,
      inside: {
        "function": /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
        "generic": {
          pattern: /<[\s\S]+/,
          // everything after the first <
          alias: "class-name",
          inside: typeInside
        }
      }
    }
  });
  Prism2.languages.ts = Prism2.languages.typescript;
})(Prism);
(function(Prism2) {
  function replace(pattern, replacements) {
    return pattern.replace(/<<(\d+)>>/g, function(m2, index) {
      return "(?:" + replacements[+index] + ")";
    });
  }
  function re(pattern, replacements, flags) {
    return RegExp(replace(pattern, replacements), flags || "");
  }
  function nested(pattern, depthLog2) {
    for (var i2 = 0; i2 < depthLog2; i2++) {
      pattern = pattern.replace(/<<self>>/g, function() {
        return "(?:" + pattern + ")";
      });
    }
    return pattern.replace(/<<self>>/g, "[^\\s\\S]");
  }
  var keywordKinds = {
    // keywords which represent a return or variable type
    type: "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",
    // keywords which are used to declare a type
    typeDeclaration: "class enum interface record struct",
    // contextual keywords
    // ("var" and "dynamic" are missing because they are used like types)
    contextual: "add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)",
    // all other keywords
    other: "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield"
  };
  function keywordsToPattern(words) {
    return "\\b(?:" + words.trim().replace(/ /g, "|") + ")\\b";
  }
  var typeDeclarationKeywords = keywordsToPattern(keywordKinds.typeDeclaration);
  var keywords = RegExp(keywordsToPattern(keywordKinds.type + " " + keywordKinds.typeDeclaration + " " + keywordKinds.contextual + " " + keywordKinds.other));
  var nonTypeKeywords = keywordsToPattern(keywordKinds.typeDeclaration + " " + keywordKinds.contextual + " " + keywordKinds.other);
  var nonContextualKeywords = keywordsToPattern(keywordKinds.type + " " + keywordKinds.typeDeclaration + " " + keywordKinds.other);
  var generic = nested(/<(?:[^<>;=+\-*/%&|^]|<<self>>)*>/.source, 2);
  var nestedRound = nested(/\((?:[^()]|<<self>>)*\)/.source, 2);
  var name = /@?\b[A-Za-z_]\w*\b/.source;
  var genericName = replace(/<<0>>(?:\s*<<1>>)?/.source, [name, generic]);
  var identifier = replace(/(?!<<0>>)<<1>>(?:\s*\.\s*<<1>>)*/.source, [nonTypeKeywords, genericName]);
  var array = /\[\s*(?:,\s*)*\]/.source;
  var typeExpressionWithoutTuple = replace(/<<0>>(?:\s*(?:\?\s*)?<<1>>)*(?:\s*\?)?/.source, [identifier, array]);
  var tupleElement = replace(/[^,()<>[\];=+\-*/%&|^]|<<0>>|<<1>>|<<2>>/.source, [generic, nestedRound, array]);
  var tuple = replace(/\(<<0>>+(?:,<<0>>+)+\)/.source, [tupleElement]);
  var typeExpression = replace(/(?:<<0>>|<<1>>)(?:\s*(?:\?\s*)?<<2>>)*(?:\s*\?)?/.source, [tuple, identifier, array]);
  var typeInside = {
    "keyword": keywords,
    "punctuation": /[<>()?,.:[\]]/
  };
  var character = /'(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'/.source;
  var regularString = /"(?:\\.|[^\\"\r\n])*"/.source;
  var verbatimString = /@"(?:""|\\[\s\S]|[^\\"])*"(?!")/.source;
  Prism2.languages.csharp = Prism2.languages.extend("clike", {
    "string": [
      {
        pattern: re(/(^|[^$\\])<<0>>/.source, [verbatimString]),
        lookbehind: true,
        greedy: true
      },
      {
        pattern: re(/(^|[^@$\\])<<0>>/.source, [regularString]),
        lookbehind: true,
        greedy: true
      }
    ],
    "class-name": [
      {
        // Using static
        // using static System.Math;
        pattern: re(/(\busing\s+static\s+)<<0>>(?=\s*;)/.source, [identifier]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Using alias (type)
        // using Project = PC.MyCompany.Project;
        pattern: re(/(\busing\s+<<0>>\s*=\s*)<<1>>(?=\s*;)/.source, [name, typeExpression]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Using alias (alias)
        // using Project = PC.MyCompany.Project;
        pattern: re(/(\busing\s+)<<0>>(?=\s*=)/.source, [name]),
        lookbehind: true
      },
      {
        // Type declarations
        // class Foo<A, B>
        // interface Foo<out A, B>
        pattern: re(/(\b<<0>>\s+)<<1>>/.source, [typeDeclarationKeywords, genericName]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Single catch exception declaration
        // catch(Foo)
        // (things like catch(Foo e) is covered by variable declaration)
        pattern: re(/(\bcatch\s*\(\s*)<<0>>/.source, [identifier]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Name of the type parameter of generic constraints
        // where Foo : class
        pattern: re(/(\bwhere\s+)<<0>>/.source, [name]),
        lookbehind: true
      },
      {
        // Casts and checks via as and is.
        // as Foo<A>, is Bar<B>
        // (things like if(a is Foo b) is covered by variable declaration)
        pattern: re(/(\b(?:is(?:\s+not)?|as)\s+)<<0>>/.source, [typeExpressionWithoutTuple]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Variable, field and parameter declaration
        // (Foo bar, Bar baz, Foo[,,] bay, Foo<Bar, FooBar<Bar>> bax)
        pattern: re(/\b<<0>>(?=\s+(?!<<1>>|with\s*\{)<<2>>(?:\s*[=,;:{)\]]|\s+(?:in|when)\b))/.source, [typeExpression, nonContextualKeywords, name]),
        inside: typeInside
      }
    ],
    "keyword": keywords,
    // https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/lexical-structure#literals
    "number": /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
    "operator": />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
    "punctuation": /\?\.?|::|[{}[\];(),.:]/
  });
  Prism2.languages.insertBefore("csharp", "number", {
    "range": {
      pattern: /\.\./,
      alias: "operator"
    }
  });
  Prism2.languages.insertBefore("csharp", "punctuation", {
    "named-parameter": {
      pattern: re(/([(,]\s*)<<0>>(?=\s*:)/.source, [name]),
      lookbehind: true,
      alias: "punctuation"
    }
  });
  Prism2.languages.insertBefore("csharp", "class-name", {
    "namespace": {
      // namespace Foo.Bar {}
      // using Foo.Bar;
      pattern: re(/(\b(?:namespace|using)\s+)<<0>>(?:\s*\.\s*<<0>>)*(?=\s*[;{])/.source, [name]),
      lookbehind: true,
      inside: {
        "punctuation": /\./
      }
    },
    "type-expression": {
      // default(Foo), typeof(Foo<Bar>), sizeof(int)
      pattern: re(/(\b(?:default|sizeof|typeof)\s*\(\s*(?!\s))(?:[^()\s]|\s(?!\s)|<<0>>)*(?=\s*\))/.source, [nestedRound]),
      lookbehind: true,
      alias: "class-name",
      inside: typeInside
    },
    "return-type": {
      // Foo<Bar> ForBar(); Foo IFoo.Bar() => 0
      // int this[int index] => 0; T IReadOnlyList<T>.this[int index] => this[index];
      // int Foo => 0; int Foo { get; set } = 0;
      pattern: re(/<<0>>(?=\s+(?:<<1>>\s*(?:=>|[({]|\.\s*this\s*\[)|this\s*\[))/.source, [typeExpression, identifier]),
      inside: typeInside,
      alias: "class-name"
    },
    "constructor-invocation": {
      // new List<Foo<Bar[]>> { }
      pattern: re(/(\bnew\s+)<<0>>(?=\s*[[({])/.source, [typeExpression]),
      lookbehind: true,
      inside: typeInside,
      alias: "class-name"
    },
    /*'explicit-implementation': {
    	// int IFoo<Foo>.Bar => 0; void IFoo<Foo<Foo>>.Foo<T>();
    	pattern: replace(/\b<<0>>(?=\.<<1>>)/, className, methodOrPropertyDeclaration),
    	inside: classNameInside,
    	alias: 'class-name'
    },*/
    "generic-method": {
      // foo<Bar>()
      pattern: re(/<<0>>\s*<<1>>(?=\s*\()/.source, [name, generic]),
      inside: {
        "function": re(/^<<0>>/.source, [name]),
        "generic": {
          pattern: RegExp(generic),
          alias: "class-name",
          inside: typeInside
        }
      }
    },
    "type-list": {
      // The list of types inherited or of generic constraints
      // class Foo<F> : Bar, IList<FooBar>
      // where F : Bar, IList<int>
      pattern: re(
        /\b((?:<<0>>\s+<<1>>|record\s+<<1>>\s*<<5>>|where\s+<<2>>)\s*:\s*)(?:<<3>>|<<4>>|<<1>>\s*<<5>>|<<6>>)(?:\s*,\s*(?:<<3>>|<<4>>|<<6>>))*(?=\s*(?:where|[{;]|=>|$))/.source,
        [typeDeclarationKeywords, genericName, name, typeExpression, keywords.source, nestedRound, /\bnew\s*\(\s*\)/.source]
      ),
      lookbehind: true,
      inside: {
        "record-arguments": {
          pattern: re(/(^(?!new\s*\()<<0>>\s*)<<1>>/.source, [genericName, nestedRound]),
          lookbehind: true,
          greedy: true,
          inside: Prism2.languages.csharp
        },
        "keyword": keywords,
        "class-name": {
          pattern: RegExp(typeExpression),
          greedy: true,
          inside: typeInside
        },
        "punctuation": /[,()]/
      }
    },
    "preprocessor": {
      pattern: /(^[\t ]*)#.*/m,
      lookbehind: true,
      alias: "property",
      inside: {
        // highlight preprocessor directives as keywords
        "directive": {
          pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
          lookbehind: true,
          alias: "keyword"
        }
      }
    }
  });
  var regularStringOrCharacter = regularString + "|" + character;
  var regularStringCharacterOrComment = replace(/\/(?![*/])|\/\/[^\r\n]*[\r\n]|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>/.source, [regularStringOrCharacter]);
  var roundExpression = nested(replace(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [regularStringCharacterOrComment]), 2);
  var attrTarget = /\b(?:assembly|event|field|method|module|param|property|return|type)\b/.source;
  var attr = replace(/<<0>>(?:\s*\(<<1>>*\))?/.source, [identifier, roundExpression]);
  Prism2.languages.insertBefore("csharp", "class-name", {
    "attribute": {
      // Attributes
      // [Foo], [Foo(1), Bar(2, Prop = "foo")], [return: Foo(1), Bar(2)], [assembly: Foo(Bar)]
      pattern: re(/((?:^|[^\s\w>)?])\s*\[\s*)(?:<<0>>\s*:\s*)?<<1>>(?:\s*,\s*<<1>>)*(?=\s*\])/.source, [attrTarget, attr]),
      lookbehind: true,
      greedy: true,
      inside: {
        "target": {
          pattern: re(/^<<0>>(?=\s*:)/.source, [attrTarget]),
          alias: "keyword"
        },
        "attribute-arguments": {
          pattern: re(/\(<<0>>*\)/.source, [roundExpression]),
          inside: Prism2.languages.csharp
        },
        "class-name": {
          pattern: RegExp(identifier),
          inside: {
            "punctuation": /\./
          }
        },
        "punctuation": /[:,]/
      }
    }
  });
  var formatString = /:[^}\r\n]+/.source;
  var mInterpolationRound = nested(replace(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [regularStringCharacterOrComment]), 2);
  var mInterpolation = replace(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [mInterpolationRound, formatString]);
  var sInterpolationRound = nested(replace(/[^"'/()]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>|\(<<self>>*\)/.source, [regularStringOrCharacter]), 2);
  var sInterpolation = replace(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [sInterpolationRound, formatString]);
  function createInterpolationInside(interpolation, interpolationRound) {
    return {
      "interpolation": {
        pattern: re(/((?:^|[^{])(?:\{\{)*)<<0>>/.source, [interpolation]),
        lookbehind: true,
        inside: {
          "format-string": {
            pattern: re(/(^\{(?:(?![}:])<<0>>)*)<<1>>(?=\}$)/.source, [interpolationRound, formatString]),
            lookbehind: true,
            inside: {
              "punctuation": /^:/
            }
          },
          "punctuation": /^\{|\}$/,
          "expression": {
            pattern: /[\s\S]+/,
            alias: "language-csharp",
            inside: Prism2.languages.csharp
          }
        }
      },
      "string": /[\s\S]+/
    };
  }
  Prism2.languages.insertBefore("csharp", "string", {
    "interpolation-string": [
      {
        pattern: re(/(^|[^\\])(?:\$@|@\$)"(?:""|\\[\s\S]|\{\{|<<0>>|[^\\{"])*"/.source, [mInterpolation]),
        lookbehind: true,
        greedy: true,
        inside: createInterpolationInside(mInterpolation, mInterpolationRound)
      },
      {
        pattern: re(/(^|[^@\\])\$"(?:\\.|\{\{|<<0>>|[^\\"{])*"/.source, [sInterpolation]),
        lookbehind: true,
        greedy: true,
        inside: createInterpolationInside(sInterpolation, sInterpolationRound)
      }
    ],
    "char": {
      pattern: RegExp(character),
      greedy: true
    }
  });
  Prism2.languages.dotnet = Prism2.languages.cs = Prism2.languages.csharp;
})(Prism);
(function(Prism2) {
  var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;
  var classNamePrefix = /(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source;
  var className = {
    pattern: RegExp(/(^|[^\w.])/.source + classNamePrefix + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
    lookbehind: true,
    inside: {
      "namespace": {
        pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
        inside: {
          "punctuation": /\./
        }
      },
      "punctuation": /\./
    }
  };
  Prism2.languages.java = Prism2.languages.extend("clike", {
    "string": {
      pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,
      lookbehind: true,
      greedy: true
    },
    "class-name": [
      className,
      {
        // variables, parameters, and constructor references
        // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
        pattern: RegExp(/(^|[^\w.])/.source + classNamePrefix + /[A-Z]\w*(?=\s+\w+\s*[;,=()]|\s*(?:\[[\s,]*\]\s*)?::\s*new\b)/.source),
        lookbehind: true,
        inside: className.inside
      },
      {
        // class names based on keyword
        // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
        pattern: RegExp(/(\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\s+)/.source + classNamePrefix + /[A-Z]\w*\b/.source),
        lookbehind: true,
        inside: className.inside
      }
    ],
    "keyword": keywords,
    "function": [
      Prism2.languages.clike.function,
      {
        pattern: /(::\s*)[a-z_]\w*/,
        lookbehind: true
      }
    ],
    "number": /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    "operator": {
      pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
      lookbehind: true
    },
    "constant": /\b[A-Z][A-Z_\d]+\b/
  });
  Prism2.languages.insertBefore("java", "string", {
    "triple-quoted-string": {
      // http://openjdk.java.net/jeps/355#Description
      pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
      greedy: true,
      alias: "string"
    },
    "char": {
      pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/,
      greedy: true
    }
  });
  Prism2.languages.insertBefore("java", "class-name", {
    "annotation": {
      pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
      lookbehind: true,
      alias: "punctuation"
    },
    "generics": {
      pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
      inside: {
        "class-name": className,
        "keyword": keywords,
        "punctuation": /[<>(),.:]/,
        "operator": /[?&|]/
      }
    },
    "import": [
      {
        pattern: RegExp(/(\bimport\s+)/.source + classNamePrefix + /(?:[A-Z]\w*|\*)(?=\s*;)/.source),
        lookbehind: true,
        inside: {
          "namespace": className.inside.namespace,
          "punctuation": /\./,
          "operator": /\*/,
          "class-name": /\w+/
        }
      },
      {
        pattern: RegExp(/(\bimport\s+static\s+)/.source + classNamePrefix + /(?:\w+|\*)(?=\s*;)/.source),
        lookbehind: true,
        alias: "static",
        inside: {
          "namespace": className.inside.namespace,
          "static": /\b\w+$/,
          "punctuation": /\./,
          "operator": /\*/,
          "class-name": /\w+/
        }
      }
    ],
    "namespace": {
      pattern: RegExp(
        /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(/<keyword>/g, function() {
          return keywords.source;
        })
      ),
      lookbehind: true,
      inside: {
        "punctuation": /\./
      }
    }
  });
})(Prism);
Prism.languages.scala = Prism.languages.extend("java", {
  "triple-quoted-string": {
    pattern: /"""[\s\S]*?"""/,
    greedy: true,
    alias: "string"
  },
  "string": {
    pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  "keyword": /<-|=>|\b(?:abstract|case|catch|class|def|derives|do|else|enum|extends|extension|final|finally|for|forSome|given|if|implicit|import|infix|inline|lazy|match|new|null|object|opaque|open|override|package|private|protected|return|sealed|self|super|this|throw|trait|transparent|try|type|using|val|var|while|with|yield)\b/,
  "number": /\b0x(?:[\da-f]*\.)?[\da-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e\d+)?[dfl]?/i,
  "builtin": /\b(?:Any|AnyRef|AnyVal|Boolean|Byte|Char|Double|Float|Int|Long|Nothing|Short|String|Unit)\b/,
  "symbol": /'[^\d\s\\]\w*/
});
Prism.languages.insertBefore("scala", "triple-quoted-string", {
  "string-interpolation": {
    pattern: /\b[a-z]\w*(?:"""(?:[^$]|\$(?:[^{]|\{(?:[^{}]|\{[^{}]*\})*\}))*?"""|"(?:[^$"\r\n]|\$(?:[^{]|\{(?:[^{}]|\{[^{}]*\})*\}))*")/i,
    greedy: true,
    inside: {
      "id": {
        pattern: /^\w+/,
        greedy: true,
        alias: "function"
      },
      "escape": {
        pattern: /\\\$"|\$[$"]/,
        greedy: true,
        alias: "symbol"
      },
      "interpolation": {
        pattern: /\$(?:\w+|\{(?:[^{}]|\{[^{}]*\})*\})/,
        greedy: true,
        inside: {
          "punctuation": /^\$\{?|\}$/,
          "expression": {
            pattern: /[\s\S]+/,
            inside: Prism.languages.scala
          }
        }
      },
      "string": /[\s\S]+/
    }
  }
});
delete Prism.languages.scala["class-name"];
delete Prism.languages.scala["function"];
delete Prism.languages.scala["constant"];
(function(Prism2) {
  var tableRow = /(?:\r?\n|\r)[ \t]*\|.+\|(?:(?!\|).)*/.source;
  Prism2.languages.gherkin = {
    "pystring": {
      pattern: /("""|''')[\s\S]+?\1/,
      alias: "string"
    },
    "comment": {
      pattern: /(^[ \t]*)#.*/m,
      lookbehind: true
    },
    "tag": {
      pattern: /(^[ \t]*)@\S*/m,
      lookbehind: true
    },
    "feature": {
      pattern: /((?:^|\r?\n|\r)[ \t]*)(?:Ability|Ahoy matey!|Arwedd|Aspekt|Besigheid Behoefte|Business Need|Caracteristica|Característica|Egenskab|Egenskap|Eiginleiki|Feature|Fīča|Fitur|Fonctionnalité|Fonksyonalite|Funcionalidade|Funcionalitat|Functionalitate|Funcţionalitate|Funcționalitate|Functionaliteit|Fungsi|Funkcia|Funkcija|Funkcionalitāte|Funkcionalnost|Funkcja|Funksie|Funktionalität|Funktionalitéit|Funzionalità|Hwaet|Hwæt|Jellemző|Karakteristik|Lastnost|Mak|Mogucnost|laH|Mogućnost|Moznosti|Možnosti|OH HAI|Omadus|Ominaisuus|Osobina|Özellik|Potrzeba biznesowa|perbogh|poQbogh malja'|Požadavek|Požiadavka|Pretty much|Qap|Qu'meH 'ut|Savybė|Tính năng|Trajto|Vermoë|Vlastnosť|Właściwość|Značilnost|Δυνατότητα|Λειτουργία|Могућност|Мөмкинлек|Особина|Свойство|Үзенчәлеклелек|Функционал|Функционалност|Функция|Функціонал|תכונה|خاصية|خصوصیت|صلاحیت|کاروبار کی ضرورت|وِیژگی|रूप लेख|ਖਾਸੀਅਤ|ਨਕਸ਼ ਨੁਹਾਰ|ਮੁਹਾਂਦਰਾ|గుణము|ಹೆಚ್ಚಳ|ความต้องการทางธุรกิจ|ความสามารถ|โครงหลัก|기능|フィーチャ|功能|機能):(?:[^:\r\n]+(?:\r?\n|\r|$))*/,
      lookbehind: true,
      inside: {
        "important": {
          pattern: /(:)[^\r\n]+/,
          lookbehind: true
        },
        "keyword": /[^:\r\n]+:/
      }
    },
    "scenario": {
      pattern: /(^[ \t]*)(?:Abstract Scenario|Abstrakt Scenario|Achtergrond|Aer|Ær|Agtergrond|All y'all|Antecedentes|Antecedents|Atburðarás|Atburðarásir|Awww, look mate|B4|Background|Baggrund|Bakgrund|Bakgrunn|Bakgrunnur|Beispiele|Beispiller|Bối cảnh|Cefndir|Cenario|Cenário|Cenario de Fundo|Cenário de Fundo|Cenarios|Cenários|Contesto|Context|Contexte|Contexto|Conto|Contoh|Contone|Dæmi|Dasar|Dead men tell no tales|Delineacao do Cenario|Delineação do Cenário|Dis is what went down|Dữ liệu|Dyagram Senaryo|Dyagram senaryo|Egzanp|Ejemplos|Eksempler|Ekzemploj|Enghreifftiau|Esbozo do escenario|Escenari|Escenario|Esempi|Esquema de l'escenari|Esquema del escenario|Esquema do Cenario|Esquema do Cenário|EXAMPLZ|Examples|Exempel|Exemple|Exemples|Exemplos|First off|Fono|Forgatókönyv|Forgatókönyv vázlat|Fundo|Geçmiş|Grundlage|Hannergrond|ghantoH|Háttér|Heave to|Istorik|Juhtumid|Keadaan|Khung kịch bản|Khung tình huống|Kịch bản|Koncept|Konsep skenario|Kontèks|Kontekst|Kontekstas|Konteksts|Kontext|Konturo de la scenaro|Latar Belakang|lut chovnatlh|lut|lutmey|Lýsing Atburðarásar|Lýsing Dæma|MISHUN SRSLY|MISHUN|Menggariskan Senario|mo'|Náčrt Scenára|Náčrt Scénáře|Náčrt Scenáru|Oris scenarija|Örnekler|Osnova|Osnova Scenára|Osnova scénáře|Osnutek|Ozadje|Paraugs|Pavyzdžiai|Példák|Piemēri|Plan du scénario|Plan du Scénario|Plan Senaryo|Plan senaryo|Plang vum Szenario|Pozadí|Pozadie|Pozadina|Príklady|Příklady|Primer|Primeri|Primjeri|Przykłady|Raamstsenaarium|Reckon it's like|Rerefons|Scenár|Scénář|Scenarie|Scenarij|Scenarijai|Scenarijaus šablonas|Scenariji|Scenārijs|Scenārijs pēc parauga|Scenarijus|Scenario|Scénario|Scenario Amlinellol|Scenario Outline|Scenario Template|Scenariomal|Scenariomall|Scenarios|Scenariu|Scenariusz|Scenaro|Schema dello scenario|Se ðe|Se the|Se þe|Senario|Senaryo Deskripsyon|Senaryo deskripsyon|Senaryo|Senaryo taslağı|Shiver me timbers|Situācija|Situai|Situasie Uiteensetting|Situasie|Skenario konsep|Skenario|Skica|Structura scenariu|Structură scenariu|Struktura scenarija|Stsenaarium|Swa hwaer swa|Swa|Swa hwær swa|Szablon scenariusza|Szenario|Szenariogrundriss|Tapaukset|Tapaus|Tapausaihio|Taust|Tausta|Template Keadaan|Template Senario|Template Situai|The thing of it is|Tình huống|Variantai|Voorbeelde|Voorbeelden|Wharrimean is|Yo-ho-ho|You'll wanna|Założenia|Παραδείγματα|Περιγραφή Σεναρίου|Σενάρια|Σενάριο|Υπόβαθρο|Кереш|Контекст|Концепт|Мисаллар|Мисоллар|Основа|Передумова|Позадина|Предистория|Предыстория|Приклади|Пример|Примери|Примеры|Рамка на сценарий|Скица|Структура сценарија|Структура сценария|Структура сценарію|Сценарий|Сценарий структураси|Сценарийның төзелеше|Сценарији|Сценарио|Сценарій|Тарих|Үрнәкләр|דוגמאות|רקע|תבנית תרחיש|תרחיש|الخلفية|الگوی سناریو|امثلة|پس منظر|زمینه|سناریو|سيناريو|سيناريو مخطط|مثالیں|منظر نامے کا خاکہ|منظرنامہ|نمونه ها|उदाहरण|परिदृश्य|परिदृश्य रूपरेखा|पृष्ठभूमि|ਉਦਾਹਰਨਾਂ|ਪਟਕਥਾ|ਪਟਕਥਾ ਢਾਂਚਾ|ਪਟਕਥਾ ਰੂਪ ਰੇਖਾ|ਪਿਛੋਕੜ|ఉదాహరణలు|కథనం|నేపథ్యం|సన్నివేశం|ಉದಾಹರಣೆಗಳು|ಕಥಾಸಾರಾಂಶ|ವಿವರಣೆ|ಹಿನ್ನೆಲೆ|โครงสร้างของเหตุการณ์|ชุดของตัวอย่าง|ชุดของเหตุการณ์|แนวคิด|สรุปเหตุการณ์|เหตุการณ์|배경|시나리오|시나리오 개요|예|サンプル|シナリオ|シナリオアウトライン|シナリオテンプレ|シナリオテンプレート|テンプレ|例|例子|剧本|剧本大纲|劇本|劇本大綱|场景|场景大纲|場景|場景大綱|背景):[^:\r\n]*/m,
      lookbehind: true,
      inside: {
        "important": {
          pattern: /(:)[^\r\n]*/,
          lookbehind: true
        },
        "keyword": /[^:\r\n]+:/
      }
    },
    "table-body": {
      // Look-behind is used to skip the table head, which has the same format as any table row
      pattern: RegExp("(" + tableRow + ")(?:" + tableRow + ")+"),
      lookbehind: true,
      inside: {
        "outline": {
          pattern: /<[^>]+>/,
          alias: "variable"
        },
        "td": {
          pattern: /\s*[^\s|][^|]*/,
          alias: "string"
        },
        "punctuation": /\|/
      }
    },
    "table-head": {
      pattern: RegExp(tableRow),
      inside: {
        "th": {
          pattern: /\s*[^\s|][^|]*/,
          alias: "variable"
        },
        "punctuation": /\|/
      }
    },
    "atrule": {
      pattern: /(^[ \t]+)(?:'a|'ach|'ej|7|a|A také|A taktiež|A tiež|A zároveň|Aber|Ac|Adott|Akkor|Ak|Aleshores|Ale|Ali|Allora|Alors|Als|Ama|Amennyiben|Amikor|Ampak|an|AN|Ananging|And y'all|And|Angenommen|Anrhegedig a|An|Apabila|Atès|Atesa|Atunci|Avast!|Aye|A|awer|Bagi|Banjur|Bet|Biết|Blimey!|Buh|But at the end of the day I reckon|But y'all|But|BUT|Cal|Când|Cand|Cando|Ce|Cuando|Če|Ða ðe|Ða|Dadas|Dada|Dados|Dado|DaH ghu' bejlu'|dann|Dann|Dano|Dan|Dar|Dat fiind|Data|Date fiind|Date|Dati fiind|Dati|Daţi fiind|Dați fiind|DEN|Dato|De|Den youse gotta|Dengan|Diberi|Diyelim ki|Donada|Donat|Donitaĵo|Do|Dun|Duota|Ðurh|Eeldades|Ef|Eğer ki|Entao|Então|Entón|E|En|Entonces|Epi|És|Etant donnée|Etant donné|Et|Étant données|Étant donnée|Étant donné|Etant données|Etant donnés|Étant donnés|Fakat|Gangway!|Gdy|Gegeben seien|Gegeben sei|Gegeven|Gegewe|ghu' noblu'|Gitt|Given y'all|Given|Givet|Givun|Ha|Cho|I CAN HAZ|In|Ir|It's just unbelievable|I|Ja|Jeśli|Jeżeli|Kad|Kada|Kadar|Kai|Kaj|Když|Keď|Kemudian|Ketika|Khi|Kiedy|Ko|Kuid|Kui|Kun|Lan|latlh|Le sa a|Let go and haul|Le|Lè sa a|Lè|Logo|Lorsqu'<|Lorsque|mä|Maar|Mais|Mając|Ma|Majd|Maka|Manawa|Mas|Men|Menawa|Mutta|Nalika|Nalikaning|Nanging|Når|När|Nato|Nhưng|Niin|Njuk|O zaman|Och|Og|Oletetaan|Ond|Onda|Oraz|Pak|Pero|Però|Podano|Pokiaľ|Pokud|Potem|Potom|Privzeto|Pryd|Quan|Quand|Quando|qaSDI'|Så|Sed|Se|Siis|Sipoze ke|Sipoze Ke|Sipoze|Si|Şi|Și|Soit|Stel|Tada|Tad|Takrat|Tak|Tapi|Ter|Tetapi|Tha the|Tha|Then y'all|Then|Thì|Thurh|Toda|Too right|Un|Und|ugeholl|Và|vaj|Vendar|Ve|wann|Wanneer|WEN|Wenn|When y'all|When|Wtedy|Wun|Y'know|Yeah nah|Yna|Youse know like when|Youse know when youse got|Y|Za predpokladu|Za předpokladu|Zadan|Zadani|Zadano|Zadate|Zadato|Zakładając|Zaradi|Zatati|Þa þe|Þa|Þá|Þegar|Þurh|Αλλά|Δεδομένου|Και|Όταν|Τότε|А також|Агар|Але|Али|Аммо|А|Әгәр|Әйтик|Әмма|Бирок|Ва|Вә|Дадено|Дано|Допустим|Если|Задате|Задати|Задато|И|І|К тому же|Када|Кад|Когато|Когда|Коли|Ләкин|Лекин|Нәтиҗәдә|Нехай|Но|Онда|Припустимо, що|Припустимо|Пусть|Также|Та|Тогда|Тоді|То|Унда|Һәм|Якщо|אבל|אזי|אז|בהינתן|וגם|כאשר|آنگاه|اذاً|اگر|اما|اور|با فرض|بالفرض|بفرض|پھر|تب|ثم|جب|عندما|فرض کیا|لكن|لیکن|متى|هنگامی|و|अगर|और|कदा|किन्तु|चूंकि|जब|तथा|तदा|तब|परन्तु|पर|यदि|ਅਤੇ|ਜਦੋਂ|ਜਿਵੇਂ ਕਿ|ਜੇਕਰ|ਤਦ|ਪਰ|అప్పుడు|ఈ పరిస్థితిలో|కాని|చెప్పబడినది|మరియు|ಆದರೆ|ನಂತರ|ನೀಡಿದ|ಮತ್ತು|ಸ್ಥಿತಿಯನ್ನು|กำหนดให้|ดังนั้น|แต่|เมื่อ|และ|그러면<|그리고<|단<|만약<|만일<|먼저<|조건<|하지만<|かつ<|しかし<|ただし<|ならば<|もし<|並且<|但し<|但是<|假如<|假定<|假設<|假设<|前提<|同时<|同時<|并且<|当<|當<|而且<|那么<|那麼<)(?=[ \t])/m,
      lookbehind: true
    },
    "string": {
      pattern: /"(?:\\.|[^"\\\r\n])*"|'(?:\\.|[^'\\\r\n])*'/,
      inside: {
        "outline": {
          pattern: /<[^>]+>/,
          alias: "variable"
        }
      }
    },
    "outline": {
      pattern: /<[^>]+>/,
      alias: "variable"
    }
  };
})(Prism);
Prism.languages.markup = {
  "comment": {
    pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
    greedy: true
  },
  "prolog": {
    pattern: /<\?[\s\S]+?\?>/,
    greedy: true
  },
  "doctype": {
    // https://www.w3.org/TR/xml/#NT-doctypedecl
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: true,
    inside: {
      "internal-subset": {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: true,
        greedy: true,
        inside: null
        // see below
      },
      "string": {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: true
      },
      "punctuation": /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/i,
      "name": /[^\s<>'"]+/
    }
  },
  "cdata": {
    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
    greedy: true
  },
  "tag": {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      "tag": {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          "punctuation": /^<\/?/,
          "namespace": /^[^\s>\/:]+:/
        }
      },
      "special-attr": [],
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          "punctuation": [
            {
              pattern: /^=/,
              alias: "attr-equals"
            },
            {
              pattern: /^(\s*)["']|["']$/,
              lookbehind: true
            }
          ]
        }
      },
      "punctuation": /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          "namespace": /^[^\s>\/:]+:/
        }
      }
    }
  },
  "entity": [
    {
      pattern: /&[\da-z]{1,8};/i,
      alias: "named-entity"
    },
    /&#x?[\da-f]{1,8};/i
  ]
};
Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism.languages.markup["entity"];
Prism.languages.markup["doctype"].inside["internal-subset"].inside = Prism.languages.markup;
Prism.hooks.add("wrap", function(env) {
  if (env.type === "entity") {
    env.attributes["title"] = env.content.replace(/&amp;/, "&");
  }
});
Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
  /**
   * Adds an inlined language to markup.
   *
   * An example of an inlined language is CSS with `<style>` tags.
   *
   * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addInlined('style', 'css');
   */
  value: function addInlined(tagName, lang) {
    var includedCdataInside = {};
    includedCdataInside["language-" + lang] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: Prism.languages[lang]
    };
    includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
    var inside = {
      "included-cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside
      }
    };
    inside["language-" + lang] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[lang]
    };
    var def = {};
    def[tagName] = {
      pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
        return tagName;
      }), "i"),
      lookbehind: true,
      greedy: true,
      inside
    };
    Prism.languages.insertBefore("markup", "cdata", def);
  }
});
Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
  /**
   * Adds an pattern to highlight languages embedded in HTML attributes.
   *
   * An example of an inlined language is CSS with `style` attributes.
   *
   * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addAttribute('style', 'css');
   */
  value: function(attrName, lang) {
    Prism.languages.markup.tag.inside["special-attr"].push({
      pattern: RegExp(
        /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
        "i"
      ),
      lookbehind: true,
      inside: {
        "attr-name": /^[^\s=]+/,
        "attr-value": {
          pattern: /=[\s\S]+/,
          inside: {
            "value": {
              pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
              lookbehind: true,
              alias: [lang, "language-" + lang],
              inside: Prism.languages[lang]
            },
            "punctuation": [
              {
                pattern: /^=/,
                alias: "attr-equals"
              },
              /"|'/
            ]
          }
        }
      }
    });
  }
});
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;
Prism.languages.xml = Prism.languages.extend("markup", {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;
(function(Prism2) {
  function getPlaceholder(language, index) {
    return "___" + language.toUpperCase() + index + "___";
  }
  Object.defineProperties(Prism2.languages["markup-templating"] = {}, {
    buildPlaceholders: {
      /**
       * Tokenize all inline templating expressions matching `placeholderPattern`.
       *
       * If `replaceFilter` is provided, only matches of `placeholderPattern` for which `replaceFilter` returns
       * `true` will be replaced.
       *
       * @param {object} env The environment of the `before-tokenize` hook.
       * @param {string} language The language id.
       * @param {RegExp} placeholderPattern The matches of this pattern will be replaced by placeholders.
       * @param {(match: string) => boolean} [replaceFilter]
       */
      value: function(env, language, placeholderPattern, replaceFilter) {
        if (env.language !== language) {
          return;
        }
        var tokenStack = env.tokenStack = [];
        env.code = env.code.replace(placeholderPattern, function(match) {
          if (typeof replaceFilter === "function" && !replaceFilter(match)) {
            return match;
          }
          var i2 = tokenStack.length;
          var placeholder;
          while (env.code.indexOf(placeholder = getPlaceholder(language, i2)) !== -1) {
            ++i2;
          }
          tokenStack[i2] = match;
          return placeholder;
        });
        env.grammar = Prism2.languages.markup;
      }
    },
    tokenizePlaceholders: {
      /**
       * Replace placeholders with proper tokens after tokenizing.
       *
       * @param {object} env The environment of the `after-tokenize` hook.
       * @param {string} language The language id.
       */
      value: function(env, language) {
        if (env.language !== language || !env.tokenStack) {
          return;
        }
        env.grammar = Prism2.languages[language];
        var j2 = 0;
        var keys = Object.keys(env.tokenStack);
        function walkTokens(tokens) {
          for (var i2 = 0; i2 < tokens.length; i2++) {
            if (j2 >= keys.length) {
              break;
            }
            var token = tokens[i2];
            if (typeof token === "string" || token.content && typeof token.content === "string") {
              var k2 = keys[j2];
              var t2 = env.tokenStack[k2];
              var s3 = typeof token === "string" ? token : token.content;
              var placeholder = getPlaceholder(language, k2);
              var index = s3.indexOf(placeholder);
              if (index > -1) {
                ++j2;
                var before = s3.substring(0, index);
                var middle = new Prism2.Token(language, Prism2.tokenize(t2, env.grammar), "language-" + language, t2);
                var after = s3.substring(index + placeholder.length);
                var replacement = [];
                if (before) {
                  replacement.push.apply(replacement, walkTokens([before]));
                }
                replacement.push(middle);
                if (after) {
                  replacement.push.apply(replacement, walkTokens([after]));
                }
                if (typeof token === "string") {
                  tokens.splice.apply(tokens, [i2, 1].concat(replacement));
                } else {
                  token.content = replacement;
                }
              }
            } else if (token.content) {
              walkTokens(token.content);
            }
          }
          return tokens;
        }
        walkTokens(env.tokens);
      }
    }
  });
})(Prism);
(function(Prism2) {
  var comment = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/;
  var constant = [
    {
      pattern: /\b(?:false|true)\b/i,
      alias: "boolean"
    },
    {
      pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i,
      greedy: true,
      lookbehind: true
    },
    {
      pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,
      greedy: true,
      lookbehind: true
    },
    /\b(?:null)\b/i,
    /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/
  ];
  var number = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i;
  var operator = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/;
  var punctuation = /[{}\[\](),:;]/;
  Prism2.languages.php = {
    "delimiter": {
      pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
      alias: "important"
    },
    "comment": comment,
    "variable": /\$+(?:\w+\b|(?=\{))/,
    "package": {
      pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
      lookbehind: true,
      inside: {
        "punctuation": /\\/
      }
    },
    "class-name-definition": {
      pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
      lookbehind: true,
      alias: "class-name"
    },
    "function-definition": {
      pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,
      lookbehind: true,
      alias: "function"
    },
    "keyword": [
      {
        pattern: /(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/i,
        alias: "type-casting",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/i,
        alias: "type-hint",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|never|object|self|static|string|void)\b/i,
        alias: "return-type",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/i,
        alias: "type-declaration",
        greedy: true
      },
      {
        pattern: /(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/i,
        alias: "type-declaration",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /\b(?:parent|self|static)(?=\s*::)/i,
        alias: "static-context",
        greedy: true
      },
      {
        // yield from
        pattern: /(\byield\s+)from\b/i,
        lookbehind: true
      },
      // `class` is always a keyword unlike other keywords
      /\bclass\b/i,
      {
        // https://www.php.net/manual/en/reserved.keywords.php
        //
        // keywords cannot be preceded by "->"
        // the complex lookbehind means `(?<!(?:->|::)\s*)`
        pattern: /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|never|new|or|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield|__halt_compiler)\b/i,
        lookbehind: true
      }
    ],
    "argument-name": {
      pattern: /([(,]\s*)\b[a-z_]\w*(?=\s*:(?!:))/i,
      lookbehind: true
    },
    "class-name": [
      {
        pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i,
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i,
        greedy: true
      },
      {
        pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
        alias: "class-name-fully-qualified",
        greedy: true,
        lookbehind: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
        alias: "class-name-fully-qualified",
        greedy: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        alias: "class-name-fully-qualified",
        greedy: true,
        lookbehind: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /\b[a-z_]\w*(?=\s*\$)/i,
        alias: "type-declaration",
        greedy: true
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
        alias: ["class-name-fully-qualified", "type-declaration"],
        greedy: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /\b[a-z_]\w*(?=\s*::)/i,
        alias: "static-context",
        greedy: true
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
        alias: ["class-name-fully-qualified", "static-context"],
        greedy: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
        alias: "type-hint",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
        alias: ["class-name-fully-qualified", "type-hint"],
        greedy: true,
        lookbehind: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
        alias: "return-type",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        alias: ["class-name-fully-qualified", "return-type"],
        greedy: true,
        lookbehind: true,
        inside: {
          "punctuation": /\\/
        }
      }
    ],
    "constant": constant,
    "function": {
      pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,
      lookbehind: true,
      inside: {
        "punctuation": /\\/
      }
    },
    "property": {
      pattern: /(->\s*)\w+/,
      lookbehind: true
    },
    "number": number,
    "operator": operator,
    "punctuation": punctuation
  };
  var string_interpolation = {
    pattern: /\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,
    lookbehind: true,
    inside: Prism2.languages.php
  };
  var string = [
    {
      pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
      alias: "nowdoc-string",
      greedy: true,
      inside: {
        "delimiter": {
          pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
          alias: "symbol",
          inside: {
            "punctuation": /^<<<'?|[';]$/
          }
        }
      }
    },
    {
      pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
      alias: "heredoc-string",
      greedy: true,
      inside: {
        "delimiter": {
          pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
          alias: "symbol",
          inside: {
            "punctuation": /^<<<"?|[";]$/
          }
        },
        "interpolation": string_interpolation
      }
    },
    {
      pattern: /`(?:\\[\s\S]|[^\\`])*`/,
      alias: "backtick-quoted-string",
      greedy: true
    },
    {
      pattern: /'(?:\\[\s\S]|[^\\'])*'/,
      alias: "single-quoted-string",
      greedy: true
    },
    {
      pattern: /"(?:\\[\s\S]|[^\\"])*"/,
      alias: "double-quoted-string",
      greedy: true,
      inside: {
        "interpolation": string_interpolation
      }
    }
  ];
  Prism2.languages.insertBefore("php", "variable", {
    "string": string,
    "attribute": {
      pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
      greedy: true,
      inside: {
        "attribute-content": {
          pattern: /^(#\[)[\s\S]+(?=\]$)/,
          lookbehind: true,
          // inside can appear subset of php
          inside: {
            "comment": comment,
            "string": string,
            "attribute-class-name": [
              {
                pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
                alias: "class-name",
                greedy: true,
                lookbehind: true
              },
              {
                pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                alias: [
                  "class-name",
                  "class-name-fully-qualified"
                ],
                greedy: true,
                lookbehind: true,
                inside: {
                  "punctuation": /\\/
                }
              }
            ],
            "constant": constant,
            "number": number,
            "operator": operator,
            "punctuation": punctuation
          }
        },
        "delimiter": {
          pattern: /^#\[|\]$/,
          alias: "punctuation"
        }
      }
    }
  });
  Prism2.hooks.add("before-tokenize", function(env) {
    if (!/<\?/.test(env.code)) {
      return;
    }
    var phpPattern = /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/g;
    Prism2.languages["markup-templating"].buildPlaceholders(env, "php", phpPattern);
  });
  Prism2.hooks.add("after-tokenize", function(env) {
    Prism2.languages["markup-templating"].tokenizePlaceholders(env, "php");
  });
})(Prism);
const blocks = "(if|else if|await|then|catch|each|html|debug)";
Prism.languages.svelte = Prism.languages.extend("markup", {
  each: {
    pattern: new RegExp(
      "{[#/]each(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}"
    ),
    inside: {
      "language-javascript": [
        {
          pattern: /(as[\s\S]*)\([\s\S]*\)(?=\s*\})/,
          lookbehind: true,
          inside: Prism.languages["javascript"]
        },
        {
          pattern: /(as[\s]*)[\s\S]*(?=\s*)/,
          lookbehind: true,
          inside: Prism.languages["javascript"]
        },
        {
          pattern: /(#each[\s]*)[\s\S]*(?=as)/,
          lookbehind: true,
          inside: Prism.languages["javascript"]
        }
      ],
      keyword: /[#/]each|as/,
      punctuation: /{|}/
    }
  },
  block: {
    pattern: new RegExp(
      "{[#:/@]/s" + blocks + "(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}"
    ),
    inside: {
      punctuation: /^{|}$/,
      keyword: [new RegExp("[#:/@]" + blocks + "( )*"), /as/, /then/],
      "language-javascript": {
        pattern: /[\s\S]*/,
        inside: Prism.languages["javascript"]
      }
    }
  },
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?:"[^"]*"|'[^']*'|{[\s\S]+?}(?=[\s/>])))|(?=[\s/>])))+)?\s*\/?>/i,
    greedy: true,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>\/:]+:/
        }
      },
      "language-javascript": {
        pattern: /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
        inside: Prism.languages["javascript"]
      },
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
        inside: {
          punctuation: [
            /^=/,
            {
              pattern: /^(\s*)["']|["']$/,
              lookbehind: true
            }
          ],
          "language-javascript": {
            pattern: /{[\s\S]+}/,
            inside: Prism.languages["javascript"]
          }
        }
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          namespace: /^[^\s>\/:]+:/
        }
      }
    }
  },
  "language-javascript": {
    pattern: /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
    lookbehind: true,
    inside: Prism.languages["javascript"]
  }
});
Prism.languages.svelte["tag"].inside["attr-value"].inside["entity"] = Prism.languages.svelte["entity"];
Prism.hooks.add("wrap", (env) => {
  if (env.type === "entity") {
    env.attributes["title"] = env.content.replace(/&amp;/, "&");
  }
});
Object.defineProperty(Prism.languages.svelte.tag, "addInlined", {
  value: function addInlined2(tagName, lang) {
    const includedCdataInside = {};
    includedCdataInside["language-" + lang] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: Prism.languages[lang]
    };
    includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
    const inside = {
      "included-cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside
      }
    };
    inside["language-" + lang] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[lang]
    };
    const def = {};
    def[tagName] = {
      pattern: RegExp(
        /(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(
          /__/g,
          tagName
        ),
        "i"
      ),
      lookbehind: true,
      greedy: true,
      inside
    };
    Prism.languages.insertBefore("svelte", "cdata", def);
  }
});
Prism.languages.svelte.tag.addInlined("style", "css");
Prism.languages.svelte.tag.addInlined("script", "javascript");
(function() {
  if (typeof Prism === "undefined" || typeof document === "undefined" || !document.createRange) {
    return;
  }
  Prism.plugins.KeepMarkup = true;
  Prism.hooks.add("before-highlight", function(env) {
    if (!env.element.children.length) {
      return;
    }
    if (!Prism.util.isActive(env.element, "keep-markup", true)) {
      return;
    }
    var dropTokens = Prism.util.isActive(env.element, "drop-tokens", false);
    function shouldKeep(element) {
      if (dropTokens && element.nodeName.toLowerCase() === "span" && element.classList.contains("token")) {
        return false;
      }
      return true;
    }
    var pos = 0;
    var data = [];
    function processElement(element) {
      if (!shouldKeep(element)) {
        processChildren(element);
        return;
      }
      var o2 = {
        // Store original element so we can restore it after highlighting
        element,
        posOpen: pos
      };
      data.push(o2);
      processChildren(element);
      o2.posClose = pos;
    }
    function processChildren(element) {
      for (var i2 = 0, l2 = element.childNodes.length; i2 < l2; i2++) {
        var child = element.childNodes[i2];
        if (child.nodeType === 1) {
          processElement(child);
        } else if (child.nodeType === 3) {
          pos += child.data.length;
        }
      }
    }
    processChildren(env.element);
    if (data.length) {
      env.keepMarkup = data;
    }
  });
  Prism.hooks.add("after-highlight", function(env) {
    if (env.keepMarkup && env.keepMarkup.length) {
      var walk = function(elt, nodeState) {
        for (var i2 = 0, l2 = elt.childNodes.length; i2 < l2; i2++) {
          var child = elt.childNodes[i2];
          if (child.nodeType === 1) {
            if (!walk(child, nodeState)) {
              return false;
            }
          } else if (child.nodeType === 3) {
            if (!nodeState.nodeStart && nodeState.pos + child.data.length > nodeState.node.posOpen) {
              nodeState.nodeStart = child;
              nodeState.nodeStartPos = nodeState.node.posOpen - nodeState.pos;
            }
            if (nodeState.nodeStart && nodeState.pos + child.data.length >= nodeState.node.posClose) {
              nodeState.nodeEnd = child;
              nodeState.nodeEndPos = nodeState.node.posClose - nodeState.pos;
            }
            nodeState.pos += child.data.length;
          }
          if (nodeState.nodeStart && nodeState.nodeEnd) {
            var range = document.createRange();
            range.setStart(nodeState.nodeStart, nodeState.nodeStartPos);
            range.setEnd(nodeState.nodeEnd, nodeState.nodeEndPos);
            nodeState.node.element.innerHTML = "";
            nodeState.node.element.appendChild(range.extractContents());
            range.insertNode(nodeState.node.element);
            range.detach();
            return false;
          }
        }
        return true;
      };
      env.keepMarkup.forEach(function(node) {
        walk(env.element, {
          node,
          pos: 0
        });
      });
      env.highlightedCode = env.element.innerHTML;
    }
  });
})();
const tailwind = r$7(tailwindCss);
const prismjs = r$7(prismjsCss);
const globals = r$7(globalsCss);
var extendStatics = function(d2, b3) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b4) {
    d3.__proto__ = b4;
  } || function(d3, b4) {
    for (var p2 in b4)
      if (Object.prototype.hasOwnProperty.call(b4, p2))
        d3[p2] = b4[p2];
  };
  return extendStatics(d2, b3);
};
function __extends(d2, b3) {
  if (typeof b3 !== "function" && b3 !== null)
    throw new TypeError("Class extends value " + String(b3) + " is not a constructor or null");
  extendStatics(d2, b3);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b3 === null ? Object.create(b3) : (__.prototype = b3.prototype, new __());
}
function __awaiter(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e3) {
        reject(e3);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e3) {
        reject(e3);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t2[0] & 1)
      throw t2[1];
    return t2[1];
  }, trys: [], ops: [] }, f2, y2, t2, g2;
  return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n3) {
    return function(v2) {
      return step([n3, v2]);
    };
  }
  function step(op) {
    if (f2)
      throw new TypeError("Generator is already executing.");
    while (g2 && (g2 = 0, op[0] && (_2 = 0)), _2)
      try {
        if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
          return t2;
        if (y2 = 0, t2)
          op = [op[0] & 2, t2.value];
        switch (op[0]) {
          case 0:
          case 1:
            t2 = op;
            break;
          case 4:
            _2.label++;
            return { value: op[1], done: false };
          case 5:
            _2.label++;
            y2 = op[1];
            op = [0];
            continue;
          case 7:
            op = _2.ops.pop();
            _2.trys.pop();
            continue;
          default:
            if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _2 = 0;
              continue;
            }
            if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
              _2.label = op[1];
              break;
            }
            if (op[0] === 6 && _2.label < t2[1]) {
              _2.label = t2[1];
              t2 = op;
              break;
            }
            if (t2 && _2.label < t2[2]) {
              _2.label = t2[2];
              _2.ops.push(op);
              break;
            }
            if (t2[2])
              _2.ops.pop();
            _2.trys.pop();
            continue;
        }
        op = body.call(thisArg, _2);
      } catch (e3) {
        op = [6, e3];
        y2 = 0;
      } finally {
        f2 = t2 = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __values(o2) {
  var s3 = typeof Symbol === "function" && Symbol.iterator, m2 = s3 && o2[s3], i2 = 0;
  if (m2)
    return m2.call(o2);
  if (o2 && typeof o2.length === "number")
    return {
      next: function() {
        if (o2 && i2 >= o2.length)
          o2 = void 0;
        return { value: o2 && o2[i2++], done: !o2 };
      }
    };
  throw new TypeError(s3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o2, n3) {
  var m2 = typeof Symbol === "function" && o2[Symbol.iterator];
  if (!m2)
    return o2;
  var i2 = m2.call(o2), r2, ar = [], e3;
  try {
    while ((n3 === void 0 || n3-- > 0) && !(r2 = i2.next()).done)
      ar.push(r2.value);
  } catch (error) {
    e3 = { error };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i2["return"]))
        m2.call(i2);
    } finally {
      if (e3)
        throw e3.error;
    }
  }
  return ar;
}
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2)
    for (var i2 = 0, l2 = from2.length, ar; i2 < l2; i2++) {
      if (ar || !(i2 in from2)) {
        if (!ar)
          ar = Array.prototype.slice.call(from2, 0, i2);
        ar[i2] = from2[i2];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
function __await(v2) {
  return this instanceof __await ? (this.v = v2, this) : new __await(v2);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g2 = generator.apply(thisArg, _arguments || []), i2, q = [];
  return i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
    return this;
  }, i2;
  function verb(n3) {
    if (g2[n3])
      i2[n3] = function(v2) {
        return new Promise(function(a2, b3) {
          q.push([n3, v2, a2, b3]) > 1 || resume(n3, v2);
        });
      };
  }
  function resume(n3, v2) {
    try {
      step(g2[n3](v2));
    } catch (e3) {
      settle(q[0][3], e3);
    }
  }
  function step(r2) {
    r2.value instanceof __await ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q[0][2], r2);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f2, v2) {
    if (f2(v2), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
}
function __asyncValues(o2) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m2 = o2[Symbol.asyncIterator], i2;
  return m2 ? m2.call(o2) : (o2 = typeof __values === "function" ? __values(o2) : o2[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
    return this;
  }, i2);
  function verb(n3) {
    i2[n3] = o2[n3] && function(v2) {
      return new Promise(function(resolve, reject) {
        v2 = o2[n3](v2), settle(resolve, reject, v2.done, v2.value);
      });
    };
  }
  function settle(resolve, reject, d2, v2) {
    Promise.resolve(v2).then(function(v3) {
      resolve({ value: v3, done: d2 });
    }, reject);
  }
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e3 = new Error(message);
  return e3.name = "SuppressedError", e3.error = error, e3.suppressed = suppressed, e3;
};
function isFunction(value) {
  return typeof value === "function";
}
function createErrorClass(createImpl) {
  var _super = function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}
var UnsubscriptionError = createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i2) {
      return i2 + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}
var Subscription = function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                _a.call(_parentage_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e3) {
          errors = e3 instanceof UnsubscriptionError ? e3.errors : [e3];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
              _b.call(_finalizers_1);
          } finally {
            if (e_2)
              throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = function() {
    var empty = new Subscription2();
    empty.closed = true;
    return empty;
  }();
  return Subscription2;
}();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};
var timeoutProvider = {
  setTimeout: function(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
  },
  clearTimeout: function(handle) {
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },
  delegate: void 0
};
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    {
      throw err;
    }
  });
}
function noop() {
}
function errorContext(cb) {
  {
    cb();
  }
}
var Subscriber = function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber2.create = function(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped)
      ;
    else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped)
      ;
    else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped)
      ;
    else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
}(Subscription);
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}
var ConsumerObserver = function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver2;
}();
var SafeSubscriber = function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      var context_1;
      if (_this && config.useDeprecatedNextContext) {
        context_1 = Object.create(observerOrNext);
        context_1.unsubscribe = function() {
          return _this.unsubscribe();
        };
        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context_1),
          error: observerOrNext.error && bind(observerOrNext.error, context_1),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber2;
}(Subscriber);
function handleUnhandledError(error) {
  {
    reportUnhandledError(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};
var observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
function identity(x2) {
  return x2;
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}
var Observable = function() {
  function Observable2(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable2 = new Observable2();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(function() {
      var _a = _this, operator = _a.operator, source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable2.prototype[observable] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x2) {
        return value = x2;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
}();
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}
function hasLift(source) {
  return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber2;
}(Subscriber);
var ObjectUnsubscribedError = createErrorClass(function(_super) {
  return function ObjectUnsubscribedErrorImpl() {
    _super(this);
    this.name = "ObjectUnsubscribedError";
    this.message = "object unsubscribed";
  };
});
var Subject = function(_super) {
  __extends(Subject2, _super);
  function Subject2() {
    var _this = _super.call(this) || this;
    _this.closed = false;
    _this.currentObservers = null;
    _this.observers = [];
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }
  Subject2.prototype.lift = function(operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };
  Subject2.prototype._throwIfClosed = function() {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
  };
  Subject2.prototype.next = function(value) {
    var _this = this;
    errorContext(function() {
      var e_1, _a;
      _this._throwIfClosed();
      if (!_this.isStopped) {
        if (!_this.currentObservers) {
          _this.currentObservers = Array.from(_this.observers);
        }
        try {
          for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
            var observer = _c.value;
            observer.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return))
              _a.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
      }
    });
  };
  Subject2.prototype.error = function(err) {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.hasError = _this.isStopped = true;
        _this.thrownError = err;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().error(err);
        }
      }
    });
  };
  Subject2.prototype.complete = function() {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.isStopped = true;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().complete();
        }
      }
    });
  };
  Subject2.prototype.unsubscribe = function() {
    this.isStopped = this.closed = true;
    this.observers = this.currentObservers = null;
  };
  Object.defineProperty(Subject2.prototype, "observed", {
    get: function() {
      var _a;
      return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
    },
    enumerable: false,
    configurable: true
  });
  Subject2.prototype._trySubscribe = function(subscriber) {
    this._throwIfClosed();
    return _super.prototype._trySubscribe.call(this, subscriber);
  };
  Subject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._checkFinalizedStatuses(subscriber);
    return this._innerSubscribe(subscriber);
  };
  Subject2.prototype._innerSubscribe = function(subscriber) {
    var _this = this;
    var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
    if (hasError || isStopped) {
      return EMPTY_SUBSCRIPTION;
    }
    this.currentObservers = null;
    observers.push(subscriber);
    return new Subscription(function() {
      _this.currentObservers = null;
      arrRemove(observers, subscriber);
    });
  };
  Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
    var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  };
  Subject2.prototype.asObservable = function() {
    var observable2 = new Observable();
    observable2.source = this;
    return observable2;
  };
  Subject2.create = function(destination, source) {
    return new AnonymousSubject(destination, source);
  };
  return Subject2;
}(Observable);
var AnonymousSubject = function(_super) {
  __extends(AnonymousSubject2, _super);
  function AnonymousSubject2(destination, source) {
    var _this = _super.call(this) || this;
    _this.destination = destination;
    _this.source = source;
    return _this;
  }
  AnonymousSubject2.prototype.next = function(value) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  AnonymousSubject2.prototype.error = function(err) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
  };
  AnonymousSubject2.prototype.complete = function() {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
  };
  AnonymousSubject2.prototype._subscribe = function(subscriber) {
    var _a, _b;
    return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
  };
  return AnonymousSubject2;
}(Subject);
var dateTimestampProvider = {
  now: function() {
    return Date.now();
  },
  delegate: void 0
};
var Action = function(_super) {
  __extends(Action2, _super);
  function Action2(scheduler, work) {
    return _super.call(this) || this;
  }
  Action2.prototype.schedule = function(state, delay) {
    return this;
  };
  return Action2;
}(Subscription);
var intervalProvider = {
  setInterval: function(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
  },
  clearInterval: function(handle) {
    var delegate = intervalProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
  },
  delegate: void 0
};
var AsyncAction = function(_super) {
  __extends(AsyncAction2, _super);
  function AsyncAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    _this.pending = false;
    return _this;
  }
  AsyncAction2.prototype.schedule = function(state, delay) {
    var _a;
    if (delay === void 0) {
      delay = 0;
    }
    if (this.closed) {
      return this;
    }
    this.state = state;
    var id = this.id;
    var scheduler = this.scheduler;
    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay);
    }
    this.pending = true;
    this.delay = delay;
    this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
    return this;
  };
  AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
  };
  AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    if (delay != null && this.delay === delay && this.pending === false) {
      return id;
    }
    if (id != null) {
      intervalProvider.clearInterval(id);
    }
    return void 0;
  };
  AsyncAction2.prototype.execute = function(state, delay) {
    if (this.closed) {
      return new Error("executing a cancelled action");
    }
    this.pending = false;
    var error = this._execute(state, delay);
    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  };
  AsyncAction2.prototype._execute = function(state, _delay) {
    var errored = false;
    var errorValue;
    try {
      this.work(state);
    } catch (e3) {
      errored = true;
      errorValue = e3 ? e3 : new Error("Scheduled action threw falsy error");
    }
    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  };
  AsyncAction2.prototype.unsubscribe = function() {
    if (!this.closed) {
      var _a = this, id = _a.id, scheduler = _a.scheduler;
      var actions = scheduler.actions;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      arrRemove(actions, this);
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
      _super.prototype.unsubscribe.call(this);
    }
  };
  return AsyncAction2;
}(Action);
var Scheduler = function() {
  function Scheduler2(schedulerActionCtor, now) {
    if (now === void 0) {
      now = Scheduler2.now;
    }
    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now;
  }
  Scheduler2.prototype.schedule = function(work, delay, state) {
    if (delay === void 0) {
      delay = 0;
    }
    return new this.schedulerActionCtor(this, work).schedule(state, delay);
  };
  Scheduler2.now = dateTimestampProvider.now;
  return Scheduler2;
}();
var AsyncScheduler = function(_super) {
  __extends(AsyncScheduler2, _super);
  function AsyncScheduler2(SchedulerAction, now) {
    if (now === void 0) {
      now = Scheduler.now;
    }
    var _this = _super.call(this, SchedulerAction, now) || this;
    _this.actions = [];
    _this._active = false;
    return _this;
  }
  AsyncScheduler2.prototype.flush = function(action) {
    var actions = this.actions;
    if (this._active) {
      actions.push(action);
      return;
    }
    var error;
    this._active = true;
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());
    this._active = false;
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsyncScheduler2;
}(Scheduler);
var asyncScheduler = new AsyncScheduler(AsyncAction);
var async = asyncScheduler;
var EMPTY = new Observable(function(subscriber) {
  return subscriber.complete();
});
function isScheduler(value) {
  return value && isFunction(value.schedule);
}
function last(arr) {
  return arr[arr.length - 1];
}
function popScheduler(args) {
  return isScheduler(last(args)) ? args.pop() : void 0;
}
function popNumber(args, defaultValue) {
  return typeof last(args) === "number" ? args.pop() : defaultValue;
}
var isArrayLike = function(x2) {
  return x2 && typeof x2.length === "number" && typeof x2 !== "function";
};
function isPromise(value) {
  return isFunction(value === null || value === void 0 ? void 0 : value.then);
}
function isInteropObservable(input) {
  return isFunction(input[observable]);
}
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();
function isIterable(input) {
  return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          return [4, __await(reader.read())];
        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done)
            return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(obj) {
  return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
  return new Observable(function(subscriber) {
    var obs = obj[observable]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(array) {
  return new Observable(function(subscriber) {
    for (var i2 = 0; i2 < array.length && !subscriber.closed; i2++) {
      subscriber.next(array[i2]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise) {
  return new Observable(function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError);
  });
}
function fromIterable(iterable) {
  return new Observable(function(subscriber) {
    var e_1, _a;
    try {
      for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
          _a.call(iterable_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new Observable(function(subscriber) {
    process(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
            return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)))
            return [3, 8];
          return [4, _a.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2)
            throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
  if (delay === void 0) {
    delay = 0;
  }
  if (repeat === void 0) {
    repeat = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat) {
      parentSubscription.add(this.schedule(null, delay));
    } else {
      this.unsubscribe();
    }
  }, delay);
  parentSubscription.add(scheduleSubscription);
  if (!repeat) {
    return scheduleSubscription;
  }
}
function observeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.next(value);
      }, delay);
    }, function() {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.complete();
      }, delay);
    }, function(err) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.error(err);
      }, delay);
    }));
  });
}
function subscribeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    subscriber.add(scheduler.schedule(function() {
      return source.subscribe(subscriber);
    }, delay));
  });
}
function scheduleObservable(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function schedulePromise(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function scheduleArray(input, scheduler) {
  return new Observable(function(subscriber) {
    var i2 = 0;
    return scheduler.schedule(function() {
      if (i2 === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i2++]);
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}
function scheduleIterable(input, scheduler) {
  return new Observable(function(subscriber) {
    var iterator$1;
    executeSchedule(subscriber, scheduler, function() {
      iterator$1 = input[iterator]();
      executeSchedule(subscriber, scheduler, function() {
        var _a;
        var value;
        var done;
        try {
          _a = iterator$1.next(), value = _a.value, done = _a.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return function() {
      return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return();
    };
  });
}
function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable(function(subscriber) {
    executeSchedule(subscriber, scheduler, function() {
      var iterator2 = input[Symbol.asyncIterator]();
      executeSchedule(subscriber, scheduler, function() {
        iterator2.next().then(function(result) {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}
function scheduleReadableStreamLike(input, scheduler) {
  return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    }
    if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    }
    if (isPromise(input)) {
      return schedulePromise(input, scheduler);
    }
    if (isAsyncIterable(input)) {
      return scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable(input)) {
      return scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike(input)) {
      return scheduleReadableStreamLike(input, scheduler);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function from(input, scheduler) {
  return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}
function of() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  return from(args, scheduler);
}
function isValidDate(value) {
  return value instanceof Date && !isNaN(value);
}
function map(project, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}
var isArray = Array.isArray;
function callOrApply(fn, args) {
  return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
  return map(function(args) {
    return callOrApply(fn, args);
  });
}
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
  var buffer = [];
  var active = 0;
  var index = 0;
  var isComplete = false;
  var checkComplete = function() {
    if (isComplete && !buffer.length && !active) {
      subscriber.complete();
    }
  };
  var outerNext = function(value) {
    return active < concurrent ? doInnerSub(value) : buffer.push(value);
  };
  var doInnerSub = function(value) {
    expand && subscriber.next(value);
    active++;
    var innerComplete = false;
    innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
      onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
      if (expand) {
        outerNext(innerValue);
      } else {
        subscriber.next(innerValue);
      }
    }, function() {
      innerComplete = true;
    }, void 0, function() {
      if (innerComplete) {
        try {
          active--;
          var _loop_1 = function() {
            var bufferedValue = buffer.shift();
            if (innerSubScheduler) {
              executeSchedule(subscriber, innerSubScheduler, function() {
                return doInnerSub(bufferedValue);
              });
            } else {
              doInnerSub(bufferedValue);
            }
          };
          while (buffer.length && active < concurrent) {
            _loop_1();
          }
          checkComplete();
        } catch (err) {
          subscriber.error(err);
        }
      }
    }));
  };
  source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
    isComplete = true;
    checkComplete();
  }));
  return function() {
    additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
  };
}
function mergeMap(project, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  if (isFunction(resultSelector)) {
    return mergeMap(function(a2, i2) {
      return map(function(b3, ii) {
        return resultSelector(a2, b3, i2, ii);
      })(innerFrom(project(a2, i2)));
    }, concurrent);
  } else if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return operate(function(source, subscriber) {
    return mergeInternals(source, subscriber, project, concurrent);
  });
}
function mergeAll(concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  return mergeMap(identity, concurrent);
}
var nodeEventEmitterMethods = ["addListener", "removeListener"];
var eventTargetMethods = ["addEventListener", "removeEventListener"];
var jqueryMethods = ["on", "off"];
function fromEvent(target, eventName, options, resultSelector) {
  if (isFunction(options)) {
    resultSelector = options;
    options = void 0;
  }
  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs(resultSelector));
  }
  var _a = __read(isEventTarget(target) ? eventTargetMethods.map(function(methodName) {
    return function(handler) {
      return target[methodName](eventName, handler, options);
    };
  }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2), add = _a[0], remove = _a[1];
  if (!add) {
    if (isArrayLike(target)) {
      return mergeMap(function(subTarget) {
        return fromEvent(subTarget, eventName, options);
      })(innerFrom(target));
    }
  }
  if (!add) {
    throw new TypeError("Invalid event target");
  }
  return new Observable(function(subscriber) {
    var handler = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return subscriber.next(1 < args.length ? args : args[0]);
    };
    add(handler);
    return function() {
      return remove(handler);
    };
  });
}
function toCommonHandlerRegistry(target, eventName) {
  return function(methodName) {
    return function(handler) {
      return target[methodName](eventName, handler);
    };
  };
}
function isNodeStyleEventEmitter(target) {
  return isFunction(target.addListener) && isFunction(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
  return isFunction(target.on) && isFunction(target.off);
}
function isEventTarget(target) {
  return isFunction(target.addEventListener) && isFunction(target.removeEventListener);
}
function timer(dueTime, intervalOrScheduler, scheduler) {
  if (dueTime === void 0) {
    dueTime = 0;
  }
  if (scheduler === void 0) {
    scheduler = async;
  }
  var intervalDuration = -1;
  if (intervalOrScheduler != null) {
    if (isScheduler(intervalOrScheduler)) {
      scheduler = intervalOrScheduler;
    } else {
      intervalDuration = intervalOrScheduler;
    }
  }
  return new Observable(function(subscriber) {
    var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
    if (due < 0) {
      due = 0;
    }
    var n3 = 0;
    return scheduler.schedule(function() {
      if (!subscriber.closed) {
        subscriber.next(n3++);
        if (0 <= intervalDuration) {
          this.schedule(void 0, intervalDuration);
        } else {
          subscriber.complete();
        }
      }
    }, due);
  });
}
function interval(period, scheduler) {
  if (period === void 0) {
    period = 0;
  }
  if (scheduler === void 0) {
    scheduler = asyncScheduler;
  }
  if (period < 0) {
    period = 0;
  }
  return timer(period, period, scheduler);
}
function merge() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  var concurrent = popNumber(args, Infinity);
  var sources = args;
  return !sources.length ? EMPTY : sources.length === 1 ? innerFrom(sources[0]) : mergeAll(concurrent)(from(sources, scheduler));
}
function sample(notifier) {
  return operate(function(source, subscriber) {
    var hasValue = false;
    var lastValue = null;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      hasValue = true;
      lastValue = value;
    }));
    innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, function() {
      if (hasValue) {
        hasValue = false;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    }, noop));
  });
}
function sampleTime(period, scheduler) {
  if (scheduler === void 0) {
    scheduler = asyncScheduler;
  }
  return sample(interval(period, scheduler));
}
function tap(observerOrNext, error, complete) {
  var tapObserver = isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
  return tapObserver ? operate(function(source, subscriber) {
    var _a;
    (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
    var isUnsub = true;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var _a2;
      (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
      subscriber.next(value);
    }, function() {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      subscriber.complete();
    }, function(err) {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
      subscriber.error(err);
    }, function() {
      var _a2, _b;
      if (isUnsub) {
        (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      }
      (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
    }));
  }) : identity;
}
const locationChange$ = merge(of(1), fromEvent(window, "hashchange").pipe(tap((event) => event.preventDefault()))).pipe(
  map(() => window.location.hash.substr(1).split("/").filter(Boolean).map(decodeURIComponent))
);
var View = /* @__PURE__ */ ((View2) => {
  View2["mutant"] = "mutant";
  View2["test"] = "test";
  return View2;
})(View || {});
const theme = `:host(:not([theme=dark])){--prism-maintext:#393a34;--prism-background:#f6f8fa;--prism-border:#ddd;--prism-cdata:#998;--prism-comment:var(--prism-cdata);--prism-doctype:var(--prism-cdata);--prism-prolog:var(--prism-cdata);--prism-attr-value:#e3116c;--prism-string:var(--prism-attr-value);--prism-boolean:#36acaa;--prism-entity:var(--prism-boolean);--prism-url:var(--prism-boolean);--prism-constant:var(--prism-boolean);--prism-inserted:var(--prism-boolean);--prism-number:var(--prism-boolean);--prism-property:var(--prism-boolean);--prism-regex:var(--prism-boolean);--prism-symbol:var(--prism-boolean);--prism-variable:var(--prism-boolean);--prism-atrule:#00a4db;--prism-attr-name:var(--prism-atrule);--prism-attr:var(--prism-atrule);--prism-operator:var(--prism-maintext);--prism-punctuation:var(--prism-maintext);--prism-deleted:#9a050f;--prism-function:var(--prism-deleted);--prism-function-variable:#6f42c1;--prism-selector:#00009f;--prism-tag:var(--prism-selector);--prism-keyword:var(--prism-selector)}:host([theme=dark]){--prism-maintext:#d3d0c8;--prism-background:#1d1f21;--prism-border:rgb(var(--mut-gray-200));--prism-cdata:#7c7c7c;--prism-comment:var(--prism-cdata);--prism-doctype:var(--prism-cdata);--prism-prolog:var(--prism-cdata);--prism-punctuation:#c5c8c6;--prism-tag:#96cbfe;--prism-property:var(--prism-tag);--prism-keyword:var(--prism-tag);--prism-class-name:#ffffb6;--prism-boolean:#9c9;--prism-constant:var(--prism-boolean);--prism-symbol:#f92672;--prism-deleted:var(--prism-symbol);--prism-number:#ff73fd;--prism-inserted:#a8ff60;--prism-selector:var(--prism-inserted);--prism-attr-name:var(--prism-inserted);--prism-string:var(--prism-inserted);--prism-char:var(--prism-inserted);--prism-builtin:var(--prism-inserted);--prism-variable:#c6c5fe;--prism-operator:#ededed;--prism-entity:#ffffb6;--prism-url:#96cbfe;--prism-attr-value:#f9ee98;--prism-atrule:var(--prism-attr-value);--prism-function:#dad085;--prism-regex:#e9c062;--prism-important:#fd971f}:host(:not([theme=dark])){--mut-file-ts-color:#498ba7;--mut-file-ts-test-color:#b7b73b;--mut-file-scala-color:#b8383d;--mut-file-java-color:#b8383d;--mut-file-js-color:#b7b73b;--mut-file-js-test-color:#cc6d2e;--mut-file-php-color:#9068b0;--mut-file-html-color:#498ba7;--mut-file-csharp-color:#498ba7;--mut-file-vue-color:#7fae42;--mut-file-gherkin-color:#00a818}:host([theme=dark]){--mut-file-ts-color:#519aba;--mut-file-ts-test-color:#cbcb41;--mut-file-scala-color:#cc3e44;--mut-file-java-color:#cc3e44;--mut-file-js-color:#cbcb41;--mut-file-js-test-color:#e37933;--mut-file-php-color:#a074c4;--mut-file-html-color:#519aba;--mut-file-csharp-color:#519aba;--mut-file-vue-color:#8dc149;--mut-file-gherkin-color:#10b828}:host(:not([theme=dark])){--mut-gray-bg:rgb(var(--mut-white,255 255 255)/1);--mut-octicon-icon-color:#498ba7;--mut-line-number:#6e7781;--mut-diff-add-bg:#e6ffec;--mut-diff-add-bg-line-number:#ccffd8;--mut-diff-add-line-number:#24292f;--mut-diff-del-bg:#ffebe9;--mut-diff-del-bg-line-number:#ffd7d5;--mut-diff-del-line-number:var(--mut-diff-add-line-number);--mut-badge-info-bg:#54c6ec;--mut-badge-info:#212529;--mut-code-lense:#919191;--mut-squiggly-Survived:url("data:image/svg+xml;charset=UTF8,<svg xmlns='http://www.w3.org/2000/svg' height='3' width='6'><g fill='%23ef4444'><path d='m5.5 0-3 3H1.1l3-3z'/><path d='m4 0 2 2V.6L5.4 0zM0 2l1 1h1.4L0 .6z'/></g></svg>");--mut-squiggly-NoCoverage:url("data:image/svg+xml;charset=UTF8,<svg xmlns='http://www.w3.org/2000/svg' height='3' width='6'><g fill='%23fb923c'><path d='m5.5 0-3 3H1.1l3-3z'/><path d='m4 0 2 2V.6L5.4 0zM0 2l1 1h1.4L0 .6z'/></g></svg>");--mut-body-bg:#fff}:host([theme=dark]){color-scheme:dark;--mut-gray-50:24 24 27;--mut-gray-100:39 39 42;--mut-gray-200:63 63 70;--mut-gray-300:82 82 91;--mut-gray-400:113 113 122;--mut-gray-500:161 161 170;--mut-gray-600:212 212 216;--mut-gray-700:228 228 231;--mut-gray-800:244 244 245;--mut-gray-900:250 250 250;--mut-primary-100:7 89 133;--mut-primary-800:224 242 254;--mut-primary-900:240 249 255;--mut-primary-on:14 165 233;--mut-body-bg:#18181b;--mut-white:var(--mut-gray-50);--mut-octicon-icon-color:#519aba;--mut-line-number:#484f58;--mut-diff-add-bg:#2ea04326;--mut-diff-add-bg-line-number:#3fb9504d;--mut-diff-add-line-number:#c9d1d9;--mut-diff-del-bg:#f8514926;--mut-diff-del-bg-line-number:#f851494d;--mut-diff-del-line-number:#c9d1d9;--mut-badge-info-bg:#17a3b8;--mut-badge-info:#fff;--mut-code-lense:#999;--mut-squiggly-Survived:url("data:image/svg+xml;charset=UTF8,<svg xmlns='http://www.w3.org/2000/svg' height='3' width='6'><g fill='%23ef4444'><path d='m5.5 0-3 3H1.1l3-3z'/><path d='m4 0 2 2V.6L5.4 0zM0 2l1 1h1.4L0 .6z'/></g></svg>");--mut-squiggly-NoCoverage:url("data:image/svg+xml;charset=UTF8,<svg xmlns='http://www.w3.org/2000/svg' height='3' width='6'><g fill='%23fb923c'><path d='m5.5 0-3 3H1.1l3-3z'/><path d='m4 0 2 2V.6L5.4 0zM0 2l1 1h1.4L0 .6z'/></g></svg>")}`;
function createCustomEvent(eventName, detail, opts) {
  return new CustomEvent(eventName, { detail, ...opts });
}
const renderDetailLine = (title2, content) => x`<li title=${title2 || T} class="my-3 rounded bg-white px-2 py-3 shadow">${content}</li>`;
const renderSummaryLine = (content, title2) => x`<p title=${title2 || T}>${content}</p>`;
const renderSummaryContainer = (content) => x`<div class="mb-6 mr-6 mt-2 flex flex-col gap-4">${content}</div>`;
const renderEmoji = (emoji, label) => x`<span role="img" aria-label="${label}">${emoji}</span>`;
const style$7 = ":host{--mte-drawer-height-half-open:120px}:host([mode=closed]){height:0}:host([mode=half]){height:var(--mte-drawer-height-half-open)}:host([mode=open]){height:50%}:host([mode=open]) .scrollable{height:100%;overflow-x:hidden;overflow-y:auto}";
var __defProp$e = Object.defineProperty;
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __defNormalProp$e = (obj, key, value) => key in obj ? __defProp$e(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$e(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$e(target, key, result);
  return result;
};
var __publicField$e = (obj, key, value) => {
  __defNormalProp$e(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const DRAWER_HALF_OPEN_SIZE = 120;
let MutationTestReportDrawer = class extends s$2 {
  get toggleMoreLabel() {
    switch (this.mode) {
      case "half":
        return x`${renderEmoji("🔼", "up arrow")} More`;
      case "open":
        return x`${renderEmoji("🔽", "down arrow")} Less`;
      case "closed":
        return T;
    }
  }
  constructor() {
    super();
    this.mode = "closed";
    this.hasDetail = false;
  }
  toggleReadMore = (event) => {
    if (this.mode === "open") {
      this.mode = "half";
    } else {
      this.mode = "open";
    }
    event.preventDefault();
    event.stopImmediatePropagation();
  };
  render() {
    return x`<aside @click="${(event) => event.stopPropagation()}">
      <div class="mx-6">
        <header class="w-full py-4">
          <h2>
            <slot name="header"></slot>
            ${renderIf(
      this.hasDetail,
      x`<button data-testId="btnReadMoreToggle" class="ml-2 align-middle" @click="${this.toggleReadMore}"
                >${this.toggleMoreLabel}</button
              >`
    )}
          </h2>
        </header>
        <div class="scrollable container fixed motion-safe:transition-max-width">
          <slot name="summary"></slot>
          ${renderIf(this.hasDetail && this.mode === "open", x`<slot name="detail"></slot>`)}
        </div>
      </div>
    </aside>`;
  }
};
__publicField$e(MutationTestReportDrawer, "styles", [r$7(style$7), tailwind]);
__decorateClass$e([
  n$2({ reflect: true })
], MutationTestReportDrawer.prototype, "mode", 2);
__decorateClass$e([
  n$2({ reflect: true, type: Boolean })
], MutationTestReportDrawer.prototype, "hasDetail", 2);
__decorateClass$e([
  n$2()
], MutationTestReportDrawer.prototype, "toggleMoreLabel", 1);
MutationTestReportDrawer = __decorateClass$e([
  t$2("mte-drawer")
], MutationTestReportDrawer);
function renderIf(condition, consequence) {
  if (condition) {
    if (typeof consequence === "function") {
      return consequence();
    } else {
      return consequence;
    }
  } else {
    return T;
  }
}
function renderIfPresent(value, factory) {
  if (value === null || value === void 0) {
    return T;
  } else {
    return factory(value);
  }
}
function getContextClassForStatus(status) {
  switch (status) {
    case "Killed":
      return "success";
    case "NoCoverage":
      return "caution";
    case "Survived":
      return "danger";
    case "Timeout":
      return "warning";
    case "Ignored":
    case "RuntimeError":
    case "Pending":
    case "CompileError":
      return "secondary";
  }
}
function getContextClassForTestStatus(status) {
  switch (status) {
    case TestStatus.Killing:
      return "success";
    case TestStatus.Covering:
      return "warning";
    case TestStatus.NotCovering:
      return "caution";
  }
}
function getEmojiForTestStatus(status) {
  switch (status) {
    case TestStatus.Killing:
      return renderEmoji("✅", status);
    case TestStatus.Covering:
      return renderEmoji("☂", status);
    case TestStatus.NotCovering:
      return renderEmoji("🌧", status);
  }
}
function getEmojiForStatus(status) {
  switch (status) {
    case "Killed":
      return renderEmoji("✅", status);
    case "NoCoverage":
      return renderEmoji("🙈", status);
    case "Ignored":
      return renderEmoji("🤥", status);
    case "Survived":
      return renderEmoji("👽", status);
    case "Timeout":
      return renderEmoji("⏰", status);
    case "Pending":
      return renderEmoji("⌛", status);
    case "RuntimeError":
    case "CompileError":
      return renderEmoji("💥", status);
  }
}
function escapeHtml(unsafe) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function toAbsoluteUrl(...fragments) {
  const url = new URL(window.location.href);
  return new URL(`#${fragments.filter(Boolean).join("/")}`, url).href;
}
function plural(items) {
  if (items.length > 1) {
    return "s";
  }
  return "";
}
function describeLocation({ fileName, location }) {
  return fileName ? `${fileName}${location ? `:${location.start.line}:${location.start.column}` : ""}` : "";
}
function scrollToCodeFragmentIfNeeded(el) {
  if (el && !isElementInViewport(el)) {
    el.scrollIntoView({ block: "center", behavior: "smooth" });
  }
}
function isElementInViewport(el) {
  const { top, bottom } = el.getBoundingClientRect();
  return top >= 0 && bottom <= (window.innerHeight || document.documentElement.clientHeight) - DRAWER_HALF_OPEN_SIZE;
}
function isLocalStorageAvailable() {
  const test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e3) {
    return false;
  }
}
const mutantChanges = new Subject();
class RealTimeElement extends s$2 {
  shouldReactivate() {
    return true;
  }
  reactivate() {
    this.requestUpdate();
  }
  #subscription = new Subscription();
  connectedCallback() {
    super.connectedCallback();
    this.#subscription.add(mutantChanges.subscribe(() => this.shouldReactivate() && this.reactivate()));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.#subscription.unsubscribe();
  }
}
var __defProp$d = Object.defineProperty;
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __defNormalProp$d = (obj, key, value) => key in obj ? __defProp$d(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$d(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$d(target, key, result);
  return result;
};
var __publicField$d = (obj, key, value) => {
  __defNormalProp$d(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const UPDATE_CYCLE_TIME = 100;
let MutationTestReportAppComponent = class extends RealTimeElement {
  get themeBackgroundColor() {
    return getComputedStyle(this).getPropertyValue("--mut-body-bg");
  }
  get title() {
    if (this.context.result) {
      if (this.titlePostfix) {
        return `${this.context.result.name} - ${this.titlePostfix}`;
      } else {
        return this.context.result.name;
      }
    } else {
      return "";
    }
  }
  constructor() {
    super();
    this.context = { view: View.mutant, path: [] };
    this.path = [];
  }
  firstUpdated() {
    if (this.path.length === 0 || this.path[0] !== View.mutant && this.path[0] !== View.test) {
      window.location.replace(toAbsoluteUrl(`${View.mutant}`));
    }
  }
  async loadData() {
    if (this.src) {
      try {
        const res = await fetch(this.src);
        this.report = await res.json();
      } catch (error) {
        const e3 = String(error);
        this.errorMessage = e3;
      }
    }
  }
  async willUpdate(changedProperties) {
    if (this.report) {
      if (!this.theme) {
        this.theme = this.getTheme();
      }
      if (changedProperties.has("report")) {
        this.updateModel(this.report);
      }
      if (changedProperties.has("path") || changedProperties.has("report")) {
        this.updateContext();
        this.updateTitle();
      }
    }
    if (changedProperties.has("src")) {
      await this.loadData();
    }
  }
  mutants = /* @__PURE__ */ new Map();
  tests = /* @__PURE__ */ new Map();
  updated(changedProperties) {
    if (changedProperties.has("theme") && this.theme) {
      this.dispatchEvent(
        createCustomEvent("theme-changed", {
          theme: this.theme,
          themeBackgroundColor: this.themeBackgroundColor
        })
      );
    }
  }
  getTheme() {
    const theme2 = isLocalStorageAvailable() && localStorage.getItem("mutation-testing-elements-theme");
    if (theme2) {
      return theme2;
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)")?.matches) {
      return "dark";
    } else {
      return "light";
    }
  }
  updateModel(report) {
    this.rootModel = calculateMutationTestMetrics(report);
    collectForEach((file, metric) => {
      file.result = metric;
      file.mutants.forEach((mutant) => this.mutants.set(mutant.id, mutant));
    })(this.rootModel?.systemUnderTestMetrics);
    collectForEach((file, metric) => {
      file.result = metric;
      file.tests.forEach((test) => this.tests.set(test.id, test));
    })(this.rootModel?.testMetrics);
    this.rootModel.systemUnderTestMetrics.updateParent();
    this.rootModel.testMetrics?.updateParent();
    function collectForEach(collect) {
      return function forEachMetric(metrics) {
        if (metrics?.file) {
          collect(metrics.file, metrics);
        }
        metrics?.childResults.forEach((child) => {
          forEachMetric(child);
        });
      };
    }
  }
  updateContext() {
    if (this.rootModel) {
      const findResult = (root, path2) => {
        return path2.reduce(
          (model, currentPathPart) => model?.childResults.find((child) => child.name === currentPathPart),
          root
        );
      };
      const path = this.path.slice(1);
      if (this.path[0] === View.test && this.rootModel.testMetrics) {
        this.context = {
          view: View.test,
          path,
          result: findResult(this.rootModel.testMetrics, this.path.slice(1))
        };
      } else {
        this.context = {
          view: View.mutant,
          path,
          result: findResult(this.rootModel.systemUnderTestMetrics, this.path.slice(1))
        };
      }
    }
  }
  updateTitle() {
    document.title = this.title;
  }
  themeSwitch = (event) => {
    this.theme = event.detail;
    isLocalStorageAvailable() && localStorage.setItem("mutation-testing-elements-theme", this.theme);
  };
  subscriptions = [];
  connectedCallback() {
    super.connectedCallback();
    this.subscriptions.push(locationChange$.subscribe((path) => this.path = path));
    this.initializeSse();
  }
  source;
  sseSubscriptions = /* @__PURE__ */ new Set();
  theMutant;
  theTest;
  initializeSse() {
    if (!this.sse) {
      return;
    }
    this.source = new EventSource(this.sse);
    const modifySubscription = fromEvent(this.source, "mutant-tested").subscribe((event) => {
      const newMutantData = JSON.parse(event.data);
      if (!this.report) {
        return;
      }
      const mutant = this.mutants.get(newMutantData.id);
      if (mutant === void 0) {
        return;
      }
      this.theMutant = mutant;
      for (const [prop, val] of Object.entries(newMutantData)) {
        this.theMutant[prop] = val;
      }
      if (newMutantData.killedBy) {
        newMutantData.killedBy.forEach((killedByTestId) => {
          const test = this.tests.get(killedByTestId);
          if (test === void 0) {
            return;
          }
          this.theTest = test;
          test.addKilled(this.theMutant);
          this.theMutant.addKilledBy(test);
        });
      }
      if (newMutantData.coveredBy) {
        newMutantData.coveredBy.forEach((coveredByTestId) => {
          const test = this.tests.get(coveredByTestId);
          if (test === void 0) {
            return;
          }
          this.theTest = test;
          test.addCovered(this.theMutant);
          this.theMutant.addCoveredBy(test);
        });
      }
    });
    const applySubscription = fromEvent(this.source, "mutant-tested").pipe(sampleTime(UPDATE_CYCLE_TIME)).subscribe(() => {
      this.applyChanges();
    });
    this.sseSubscriptions.add(modifySubscription);
    this.sseSubscriptions.add(applySubscription);
    this.source.addEventListener("finished", () => {
      this.source?.close();
      this.applyChanges();
      this.sseSubscriptions.forEach((s3) => s3.unsubscribe());
    });
  }
  applyChanges() {
    this.theMutant?.update();
    this.theTest?.update();
    mutantChanges.next();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  renderTitle() {
    if (this.context.result) {
      return x`
        <h1 class="text-5xl font-bold tracking-tight">
          ${this.context.result.name}${this.titlePostfix ? x`<small class="text-light-muted ml-4 font-light">${this.titlePostfix}</small>` : T}
        </h1>
      `;
    }
    return T;
  }
  render() {
    if (this.context.result ?? this.errorMessage) {
      return x`
        <div class="container bg-white pb-4 font-sans text-gray-800 motion-safe:transition-max-width">
          <div class="space-y-4 transition-colors">
            ${this.renderErrorMessage()}
            <mte-theme-switch @theme-switch="${this.themeSwitch}" class="sticky top-offset z-20 float-right pt-6" .theme="${this.theme}">
            </mte-theme-switch>
            ${this.renderTitle()} ${this.renderTabs()}
            <mte-breadcrumb .view="${this.context.view}" .path="${this.context.path}"></mte-breadcrumb>
            <mte-result-status-bar
              .detected="${this.rootModel?.systemUnderTestMetrics.metrics.totalDetected}"
              .noCoverage="${this.rootModel?.systemUnderTestMetrics.metrics.noCoverage}"
              .pending="${this.rootModel?.systemUnderTestMetrics.metrics.pending}"
              .survived="${this.rootModel?.systemUnderTestMetrics.metrics.survived}"
              .total="${this.rootModel?.systemUnderTestMetrics.metrics.totalValid}"
            ></mte-result-status-bar>
            ${this.context.view === "mutant" && this.context.result ? x`<mte-mutant-view
                  id="mte-mutant-view"
                  .result="${this.context.result}"
                  .thresholds="${this.report.thresholds}"
                  .path="${this.path}"
                ></mte-mutant-view>` : T}
            ${this.context.view === "test" && this.context.result ? x`<mte-test-view id="mte-test-view" .result="${this.context.result}" .path="${this.path}"></mte-test-view>` : T}
          </div>
        </div>
      `;
    } else {
      return x``;
    }
  }
  renderErrorMessage() {
    if (this.errorMessage) {
      return x`<div class="my-4 rounded-lg bg-red-100 p-4 text-sm text-red-700" role="alert">${this.errorMessage}</div>`;
    } else {
      return T;
    }
  }
  renderTabs() {
    if (this.rootModel?.testMetrics) {
      const mutantsActive = this.context.view === "mutant";
      const testsActive = this.context.view === "test";
      return x`
        <nav class="border-b border-gray-200 text-center text-sm font-medium  text-gray-600">
          <ul class="-mb-px flex flex-wrap" role="tablist">
            ${[
        { type: "mutant", isActive: mutantsActive, text: "👽 Mutants" },
        { type: "test", isActive: testsActive, text: "🧪 Tests" }
      ].map(
        ({ type, isActive, text }) => x`<li class="mr-2" role="presentation">
                  <a
                    class="inline-block rounded-t-lg border-b-2 border-transparent p-4 transition-colors hover:border-gray-300 hover:bg-gray-200 hover:text-gray-700 aria-selected:border-b-[3px] aria-selected:border-primary-700  aria-selected:text-primary-on"
                    role="tab"
                    href="${toAbsoluteUrl(type)}"
                    aria-selected="${isActive}"
                    aria-controls="mte-${type}-view"
                    >${text}</a
                  >
                </li>`
      )}
          </ul>
        </nav>
      `;
    } else {
      return T;
    }
  }
};
__publicField$d(MutationTestReportAppComponent, "styles", [globals, r$7(theme), tailwind]);
__decorateClass$d([
  n$2({ attribute: false })
], MutationTestReportAppComponent.prototype, "report", 2);
__decorateClass$d([
  n$2({ attribute: false })
], MutationTestReportAppComponent.prototype, "rootModel", 2);
__decorateClass$d([
  n$2()
], MutationTestReportAppComponent.prototype, "src", 2);
__decorateClass$d([
  n$2()
], MutationTestReportAppComponent.prototype, "sse", 2);
__decorateClass$d([
  n$2({ attribute: false })
], MutationTestReportAppComponent.prototype, "errorMessage", 2);
__decorateClass$d([
  n$2({ attribute: false })
], MutationTestReportAppComponent.prototype, "context", 2);
__decorateClass$d([
  n$2()
], MutationTestReportAppComponent.prototype, "path", 2);
__decorateClass$d([
  n$2({ attribute: "title-postfix" })
], MutationTestReportAppComponent.prototype, "titlePostfix", 2);
__decorateClass$d([
  n$2({ reflect: true })
], MutationTestReportAppComponent.prototype, "theme", 2);
__decorateClass$d([
  n$2({ attribute: false })
], MutationTestReportAppComponent.prototype, "themeBackgroundColor", 1);
__decorateClass$d([
  n$2()
], MutationTestReportAppComponent.prototype, "title", 1);
MutationTestReportAppComponent = __decorateClass$d([
  t$2("mutation-test-report-app")
], MutationTestReportAppComponent);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: t$1 } = z, f$1 = (o2) => void 0 === o2.strings, s$1 = () => document.createComment(""), r$1 = (o2, i2, n3) => {
  const e3 = o2._$AA.parentNode, l2 = void 0 === i2 ? o2._$AB : i2._$AA;
  if (void 0 === n3) {
    const i3 = e3.insertBefore(s$1(), l2), c2 = e3.insertBefore(s$1(), l2);
    n3 = new t$1(i3, c2, o2, o2.options);
  } else {
    const t2 = n3._$AB.nextSibling, i3 = n3._$AM, c2 = i3 !== o2;
    if (c2) {
      let t3;
      n3._$AQ?.(o2), n3._$AM = o2, void 0 !== n3._$AP && (t3 = o2._$AU) !== i3._$AU && n3._$AP(t3);
    }
    if (t2 !== l2 || c2) {
      let o3 = n3._$AA;
      for (; o3 !== t2; ) {
        const t3 = o3.nextSibling;
        e3.insertBefore(o3, l2), o3 = t3;
      }
    }
  }
  return n3;
}, v = (o2, t2, i2 = o2) => (o2._$AI(t2, i2), o2), u$1 = {}, m = (o2, t2 = u$1) => o2._$AH = t2, p = (o2) => o2._$AH, h$2 = (o2) => {
  o2._$AP?.(false, true);
  let t2 = o2._$AA;
  const i2 = o2._$AB.nextSibling;
  for (; t2 !== i2; ) {
    const o3 = t2.nextSibling;
    t2.remove(), t2 = o3;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e$3 = (t2) => (...e3) => ({ _$litDirective$: t2, values: e3 });
class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e3, i2) {
    this._$Ct = t2, this._$AM = e3, this._$Ci = i2;
  }
  _$AS(t2, e3) {
    return this.update(t2, e3);
  }
  update(t2, e3) {
    return this.render(...e3);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s2 = (i2, t2) => {
  const e3 = i2._$AN;
  if (void 0 === e3)
    return false;
  for (const i3 of e3)
    i3._$AO?.(t2, false), s2(i3, t2);
  return true;
}, o$2 = (i2) => {
  let t2, e3;
  do {
    if (void 0 === (t2 = i2._$AM))
      break;
    e3 = t2._$AN, e3.delete(i2), i2 = t2;
  } while (0 === e3?.size);
}, r = (i2) => {
  for (let t2; t2 = i2._$AM; i2 = t2) {
    let e3 = t2._$AN;
    if (void 0 === e3)
      t2._$AN = e3 = /* @__PURE__ */ new Set();
    else if (e3.has(i2))
      break;
    e3.add(i2), c$1(t2);
  }
};
function h$1(i2) {
  void 0 !== this._$AN ? (o$2(this), this._$AM = i2, r(this)) : this._$AM = i2;
}
function n$1(i2, t2 = false, e3 = 0) {
  const r2 = this._$AH, h2 = this._$AN;
  if (void 0 !== h2 && 0 !== h2.size)
    if (t2)
      if (Array.isArray(r2))
        for (let i3 = e3; i3 < r2.length; i3++)
          s2(r2[i3], false), o$2(r2[i3]);
      else
        null != r2 && (s2(r2, false), o$2(r2));
    else
      s2(this, i2);
}
const c$1 = (i2) => {
  i2.type == t.CHILD && (i2._$AP ??= n$1, i2._$AQ ??= h$1);
};
class f extends i {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i2, t2, e3) {
    super._$AT(i2, t2, e3), r(this), this.isConnected = i2._$AU;
  }
  _$AO(i2, t2 = true) {
    i2 !== this.isConnected && (this.isConnected = i2, i2 ? this.reconnected?.() : this.disconnected?.()), t2 && (s2(this, i2), o$2(this));
  }
  setValue(t2) {
    if (f$1(this._$Ct))
      this._$Ct._$AI(t2, this);
    else {
      const i2 = [...this._$Ct._$AH];
      i2[this._$Ci] = t2, this._$Ct._$AI(i2, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$2 = () => new h();
class h {
}
const o$1 = /* @__PURE__ */ new WeakMap(), n2 = e$3(class extends f {
  render(i2) {
    return T;
  }
  update(i2, [s3]) {
    const e3 = s3 !== this.Y;
    return e3 && void 0 !== this.Y && this.rt(void 0), (e3 || this.lt !== this.ct) && (this.Y = s3, this.ht = i2.options?.host, this.rt(this.ct = i2.element)), T;
  }
  rt(t2) {
    if ("function" == typeof this.Y) {
      const i2 = this.ht ?? globalThis;
      let s3 = o$1.get(i2);
      void 0 === s3 && (s3 = /* @__PURE__ */ new WeakMap(), o$1.set(i2, s3)), void 0 !== s3.get(this.Y) && this.Y.call(this.ht, void 0), s3.set(this.Y, t2), void 0 !== t2 && this.Y.call(this.ht, t2);
    } else
      this.Y.value = t2;
  }
  get lt() {
    return "function" == typeof this.Y ? o$1.get(this.ht ?? globalThis)?.get(this.Y) : this.Y?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
var ProgrammingLanguage = /* @__PURE__ */ ((ProgrammingLanguage2) => {
  ProgrammingLanguage2["csharp"] = "cs";
  ProgrammingLanguage2["java"] = "java";
  ProgrammingLanguage2["javascript"] = "javascript";
  ProgrammingLanguage2["html"] = "html";
  ProgrammingLanguage2["php"] = "php";
  ProgrammingLanguage2["scala"] = "scala";
  ProgrammingLanguage2["typescript"] = "typescript";
  ProgrammingLanguage2["vue"] = "vue";
  ProgrammingLanguage2["gherkin"] = "gherkin";
  ProgrammingLanguage2["svelte"] = "svelte";
  return ProgrammingLanguage2;
})(ProgrammingLanguage || {});
function getExtension(fileName) {
  return fileName.substr(fileName.lastIndexOf(".") + 1).toLocaleLowerCase();
}
function determineLanguage(fileName) {
  switch (getExtension(fileName)) {
    case "cs":
      return "cs";
    case "html":
      return "html";
    case "java":
      return "java";
    case "js":
    case "cjs":
    case "mjs":
      return "javascript";
    case "ts":
    case "tsx":
    case "cts":
    case "mts":
      return "typescript";
    case "scala":
      return "scala";
    case "php":
      return "php";
    case "vue":
      return "vue";
    case "feature":
      return "gherkin";
    case "svelte":
      return "svelte";
    default:
      return void 0;
  }
}
function highlightCode(code, language) {
  let highlightLanguage = language;
  if (language === "vue") {
    highlightLanguage = "html";
  }
  return prismCoreExports.highlight(code, prismCoreExports.languages[highlightLanguage], highlightLanguage);
}
function transformHighlightedLines(source, visitor) {
  let currentLineParts = [];
  const lines = [];
  const currentPosition = {
    column: 0,
    // incremented to 1 before first visitation
    line: 1,
    offset: -1
    // incremented to 0 before first visitation
  };
  const currentlyActiveTags = [];
  let tagsNeedOpening = false;
  let pos = 0;
  while (pos < source.length) {
    if (tagsNeedOpening && !isWhitespace(source[pos])) {
      reopenActiveTags();
      tagsNeedOpening = false;
    }
    switch (source[pos]) {
      case "\r":
        currentPosition.offset++;
        break;
      case "\n":
        endLine();
        currentPosition.offset++;
        currentPosition.line++;
        currentPosition.column = 0;
        tagsNeedOpening = true;
        break;
      case "<": {
        const tag = parseTag();
        if (tag.isClosing) {
          closeTag(tag);
        } else {
          openTag(tag);
        }
        break;
      }
      case "&":
        visitCharacter(parseHtmlEntity());
        break;
      default:
        visitCharacter(source[pos]);
        break;
    }
    pos++;
  }
  endLine();
  return lines;
  function emit(...parts) {
    currentLineParts.push(...parts);
  }
  function reopenActiveTags() {
    currentlyActiveTags.forEach((tag) => emit(printTag(tag)));
  }
  function closeActiveTags() {
    currentlyActiveTags.forEach((tag) => emit(printTag({ ...tag, isClosing: true })));
  }
  function printTag({ attributes, elementName, isClosing }) {
    if (isClosing) {
      return `</${elementName}>`;
    }
    return `<${elementName}${Object.entries(attributes ?? {}).reduce(
      (acc, [name, value]) => value === void 0 ? `${acc} ${name}` : `${acc} ${name}="${value}"`,
      ""
    )}>`;
  }
  function endLine() {
    closeActiveTags();
    lines.push(currentLineParts.join(""));
    currentLineParts = [];
  }
  function visitCharacter(raw) {
    currentPosition.column++;
    currentPosition.offset++;
    if (visitor) {
      for (const tag of visitor(currentPosition)) {
        if (tag.isClosing) {
          closeTag(tag);
        } else {
          emit(printTag(tag));
          currentlyActiveTags.push(tag);
        }
      }
    }
    emit(raw);
  }
  function parseTag() {
    pos++;
    const isClosing = source[pos] === "/" ? true : void 0;
    if (isClosing) {
      pos++;
    }
    const elementNameStartPos = pos;
    while (!isWhitespace(source[pos]) && source[pos] !== ">") {
      pos++;
    }
    const elementName = source.substring(elementNameStartPos, pos);
    const attributes = parseAttributes();
    return { elementName, attributes, isClosing };
  }
  function openTag(tag) {
    currentlyActiveTags.push(tag);
    emit(printTag(tag));
  }
  function closeTag(tag) {
    let tagIndex;
    for (tagIndex = currentlyActiveTags.length - 1; tagIndex >= 0; tagIndex--) {
      const activeTag = currentlyActiveTags[tagIndex];
      if (tag.elementName === activeTag.elementName && activeTag.id === tag.id) {
        emit(printTag(tag));
        currentlyActiveTags.splice(tagIndex, 1);
        for (let i2 = tagIndex; i2 < currentlyActiveTags.length; i2++) {
          emit(printTag(currentlyActiveTags[i2]));
        }
        break;
      }
      emit(printTag({ ...activeTag, isClosing: true }));
    }
    if (tagIndex === -1) {
      throw new Error(`Cannot find corresponding opening tag for ${printTag(tag)}`);
    }
  }
  function parseAttributes() {
    const attributes = /* @__PURE__ */ Object.create(null);
    while (pos < source.length) {
      const char = source[pos];
      if (char === ">") {
        return attributes;
      } else if (!isWhitespace(char)) {
        const { name, value } = parseAttribute();
        attributes[name] = value;
      }
      pos++;
    }
    throw new Error(`Missing closing tag near ${source.substr(pos - 10)}`);
  }
  function parseAttribute() {
    const startPos = pos;
    while (source[pos] !== "=") {
      pos++;
    }
    const name = source.substring(startPos, pos);
    pos++;
    const value = parseAttributeValue();
    return { name, value };
  }
  function parseAttributeValue() {
    if (source[pos] === '"') {
      pos++;
    }
    const startPos = pos;
    while (source[pos] !== '"') {
      pos++;
    }
    return source.substring(startPos, pos);
  }
  function parseHtmlEntity() {
    const startPos = pos;
    while (source[pos] !== ";") {
      pos++;
    }
    return source.substring(startPos, pos + 1);
  }
}
function isWhitespace(char) {
  return char === "\n" || char === " " || char === "	";
}
function findDiffIndices(original, mutated) {
  let focusFrom = 0, focusTo = mutated.length - 1;
  while (original[focusFrom] === mutated[focusFrom] && focusFrom < mutated.length) {
    focusFrom++;
  }
  const lengthDiff = original.length - mutated.length;
  while (original[focusTo + lengthDiff] === mutated[focusTo] && focusTo > focusFrom) {
    focusTo--;
  }
  if (focusTo === focusFrom) {
    if (!isWhitespace(mutated[focusFrom - 1])) {
      focusFrom--;
    }
  }
  focusTo++;
  const mutatedPart = mutated.substring(focusFrom, focusTo);
  ["true", "false"].forEach((keyword) => {
    if (mutatedPart === keyword.substr(0, keyword.length - 1) && keyword.endsWith(mutated[focusTo])) {
      focusTo++;
    }
    if (mutatedPart === keyword.substr(1, keyword.length) && keyword.startsWith(mutated[focusFrom - 1])) {
      focusFrom--;
    }
  });
  return [focusFrom, focusTo];
}
function gte(a2, b3) {
  return a2.line > b3.line || a2.line === b3.line && a2.column >= b3.column;
}
const style$6 = '#report-code-block{background:var(--prism-background);border:1px solid var(--prism-border);overflow-x:auto;overflow-y:visible}.line-numbers{counter-reset:mte-line-number}.line .line-number{color:var(--mut-line-number);counter-increment:mte-line-number;padding:0 10px 0 15px;text-align:right}.line .line-number:before{content:counter(mte-line-number)}.line-marker:before{content:" ";padding:0 5px}.mte-selected-Pending .mutant.Pending{border-bottom:2px solid;border-color:#a3a3a3;cursor:pointer}svg.mutant-dot.Pending{fill:#a3a3a3}.mte-selected-Killed .mutant.Killed{border-bottom:2px solid;border-color:#16a34a;cursor:pointer}svg.mutant-dot.Killed{fill:#16a34a}svg.mutant-dot.NoCoverage{fill:#f97316}svg.mutant-dot.Survived{fill:#ef4444}.mte-selected-Timeout .mutant.Timeout{border-bottom:2px solid;border-color:#fbbf24;cursor:pointer}svg.mutant-dot.Timeout{fill:#fbbf24}.mte-selected-CompileError .mutant.CompileError{border-bottom:2px solid;border-color:#a3a3a3;cursor:pointer}svg.mutant-dot.CompileError{fill:#a3a3a3}.mte-selected-RuntimeError .mutant.RuntimeError{border-bottom:2px solid;border-color:#a3a3a3;cursor:pointer}svg.mutant-dot.RuntimeError{fill:#a3a3a3}.mte-selected-Ignored .mutant.Ignored{border-bottom:2px solid;border-color:#a3a3a3;cursor:pointer}svg.mutant-dot.Ignored{fill:#a3a3a3}svg.mutant-dot.selected{fill:#38bdf8}.mte-selected-Survived .mutant.Survived{border-bottom-style:solid;border-image-outset:6px;border-image-repeat:repeat;border-image-slice:0 0 4 0;border-image-source:var(--mut-squiggly-Survived);border-image-width:4px;cursor:pointer}.mte-selected-Survived .mutant.Survived .mutant.NoCoverage,.mte-selected-Survived .mutant.Survived .mutant.Survived{border-bottom-style:none;border-image:none}.mte-selected-NoCoverage .mutant.NoCoverage{border-bottom-style:solid;border-image-outset:6px;border-image-repeat:repeat;border-image-slice:0 0 4 0;border-image-source:var(--mut-squiggly-NoCoverage);border-image-width:4px;cursor:pointer}.mte-selected-NoCoverage .mutant.NoCoverage .mutant.NoCoverage,.mte-selected-NoCoverage .mutant.NoCoverage .mutant.Survived{border-bottom-style:none;border-image:none}.mutant-dot{cursor:pointer}svg.mutant-dot{margin:2px}.diff-old{background-color:var(--mut-diff-del-bg)}.diff-focus{background-color:var(--mut-diff-add-bg-line-number)}.diff-old .line-number{background-color:var(--mut-diff-del-bg-line-number);color:var(--mut-diff-del-line-number)}.diff-old .line-marker:before{content:"-"}.diff-new{background-color:var(--mut-diff-add-bg)}.diff-new .empty-line-number{background-color:var(--mut-diff-add-bg-line-number);color:var(--mut-diff-add-line-number)}.diff-new .line-marker:before{content:"+"}';
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let e$1 = class e extends i {
  constructor(i2) {
    if (super(i2), this.it = T, i2.type !== t.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r2) {
    if (r2 === T || null == r2)
      return this._t = void 0, this.it = r2;
    if (r2 === w)
      return r2;
    if ("string" != typeof r2)
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r2 === this.it)
      return this._t;
    this.it = r2;
    const s3 = [r2];
    return s3.raw = s3, this._t = { _$litType$: this.constructor.resultType, strings: s3, values: [] };
  }
};
e$1.directiveName = "unsafeHTML", e$1.resultType = 1;
const o = e$3(e$1);
function renderDots(dots, finalDots) {
  if (dots === T && finalDots === T) {
    return T;
  } else {
    return x`<span class="ml-1 flex flex-row items-center">${dots}${finalDots}</span>`;
  }
}
function renderLine(line, dots) {
  return x`<tr class="line"
    ><td class="line-number"></td><td class="line-marker"></td><td class="code flex"><span>${o(line)}</span>${dots}</td></tr
  >`;
}
var __defProp$c = Object.defineProperty;
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __defNormalProp$c = (obj, key, value) => key in obj ? __defProp$c(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$c(target, key, result);
  return result;
};
var __publicField$c = (obj, key, value) => {
  __defNormalProp$c(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const diffOldClass = "diff-old";
const diffNewClass = "diff-new";
let FileComponent = class extends RealTimeElement {
  codeRef = e$2();
  constructor() {
    super();
    this.filters = [];
    this.selectedMutantStates = [];
    this.lines = [];
    this.mutants = [];
  }
  filtersChanged = (event) => {
    this.selectedMutantStates = event.detail.concat(["Pending"]);
  };
  codeClicked = (ev) => {
    ev.stopPropagation();
    if (ev.target instanceof Element) {
      let maybeMutantTarget = ev.target;
      const mutantsInScope = [];
      for (; maybeMutantTarget instanceof Element; maybeMutantTarget = maybeMutantTarget.parentElement) {
        const mutantId = maybeMutantTarget.getAttribute("mutant-id");
        const mutant = this.mutants.find(({ id }) => id.toString() === mutantId);
        if (mutant) {
          mutantsInScope.push(mutant);
        }
      }
      const index = (this.selectedMutant ? mutantsInScope.indexOf(this.selectedMutant) : -1) + 1;
      if (mutantsInScope[index]) {
        this.toggleMutant(mutantsInScope[index]);
        clearSelection();
      } else if (this.selectedMutant) {
        this.toggleMutant(this.selectedMutant);
        clearSelection();
      }
    }
  };
  render() {
    const mutantLineMap = /* @__PURE__ */ new Map();
    for (const mutant of this.mutants) {
      let mutants = mutantLineMap.get(mutant.location.start.line);
      if (!mutants) {
        mutants = [];
        mutantLineMap.set(mutant.location.start.line, mutants);
      }
      mutants.push(mutant);
    }
    const renderFinalMutants = (lastLine) => {
      return this.renderMutantDots([...mutantLineMap.entries()].filter(([line]) => line > lastLine).flatMap(([, mutants]) => mutants));
    };
    return x`
      <mte-state-filter
        allow-toggle-all
        .filters="${this.filters}"
        @filters-changed="${this.filtersChanged}"
        @next=${this.nextMutant}
        @previous=${this.previousMutant}
      ></mte-state-filter>
      <pre
        @click="${this.codeClicked}"
        id="report-code-block"
        class="line-numbers ${this.selectedMutantStates.map((state2) => `mte-selected-${state2}`).join(" ")} flex rounded-md py-4"
      >
        <code ${n2(this.codeRef)} class="flex language-${this.model.language}">
          <table>${this.lines.map((line, lineIndex) => {
      const lineNr = lineIndex + 1;
      const mutantDots = this.renderMutantDots(mutantLineMap.get(lineNr));
      const finalMutants = this.lines.length === lineNr ? renderFinalMutants(lineNr) : T;
      return renderLine(line, renderDots(mutantDots, finalMutants));
    })}</table>
          </code>
          </pre>
    `;
  }
  nextMutant = () => {
    const index = this.selectedMutant ? (this.mutants.indexOf(this.selectedMutant) + 1) % this.mutants.length : 0;
    if (this.mutants[index]) {
      this.toggleMutant(this.mutants[index]);
    }
  };
  previousMutant = () => {
    const index = this.selectedMutant ? (this.mutants.indexOf(this.selectedMutant) + this.mutants.length - 1) % this.mutants.length : this.mutants.length - 1;
    if (this.mutants[index]) {
      this.toggleMutant(this.mutants[index]);
    }
  };
  renderMutantDots(mutants) {
    return mutants?.length ? mutants.map(
      (mutant) => b2`<svg mutant-id="${mutant.id}" class="mutant-dot ${this.selectedMutant?.id === mutant.id ? "selected" : mutant.status}" height="10" width="12">
          <title>${title$1(mutant)}</title>
          <circle cx="5" cy="5" r="5" />
          </svg>`
    ) : T;
  }
  toggleMutant(mutant) {
    this.removeCurrentDiff();
    if (this.selectedMutant === mutant) {
      this.selectedMutant = void 0;
      this.dispatchEvent(createCustomEvent("mutant-selected", { selected: false, mutant }));
      return;
    }
    this.selectedMutant = mutant;
    const lines = this.codeRef.value.querySelectorAll("tr.line");
    for (let i2 = mutant.location.start.line - 1; i2 < mutant.location.end.line; i2++) {
      lines.item(i2).classList.add(diffOldClass);
    }
    const mutatedLines = this.highlightedReplacementRows(mutant);
    const mutantEndRow = lines.item(mutant.location.end.line - 1);
    mutantEndRow.insertAdjacentHTML("afterend", mutatedLines);
    scrollToCodeFragmentIfNeeded(mutantEndRow);
    this.dispatchEvent(createCustomEvent("mutant-selected", { selected: true, mutant }));
  }
  removeCurrentDiff() {
    const oldDiffLines = this.codeRef.value.querySelectorAll(`.${diffOldClass}`);
    oldDiffLines.forEach((oldDiffLine) => oldDiffLine.classList.remove(diffOldClass));
    const newDiffLines = this.codeRef.value.querySelectorAll(`.${diffNewClass}`);
    newDiffLines.forEach((newDiffLine) => newDiffLine.remove());
  }
  reactivate() {
    super.reactivate();
    this.updateFileRepresentation();
  }
  update(changes) {
    if (changes.has("model") && this.model) {
      this.updateFileRepresentation();
    }
    if (changes.has("model") && this.model || changes.has("selectedMutantStates")) {
      this.mutants = this.model.mutants.filter((mutant) => this.selectedMutantStates.includes(mutant.status)).sort((m1, m2) => gte(m1.location.start, m2.location.start) ? 1 : -1);
      if (this.selectedMutant && !this.mutants.includes(this.selectedMutant) && changes.has("selectedMutantStates") && // This extra check is to allow mutants that have been opened before, to stay open when a realtime update comes through
      this.selectedMutantsHaveChanged(changes.get("selectedMutantStates") ?? [])) {
        this.toggleMutant(this.selectedMutant);
      }
    }
    super.update(changes);
  }
  updateFileRepresentation() {
    this.filters = ["Killed", "Survived", "NoCoverage", "Ignored", "Timeout", "CompileError", "RuntimeError"].filter((status) => this.model.mutants.some((mutant) => mutant.status === status)).map((status) => ({
      enabled: [...this.selectedMutantStates, "Survived", "NoCoverage", "Timeout"].includes(status),
      count: this.model.mutants.filter((m2) => m2.status === status).length,
      status,
      label: x`${getEmojiForStatus(status)} ${status}`,
      context: getContextClassForStatus(status)
    }));
    const highlightedSource = highlightCode(this.model.source, this.model.language);
    const startedMutants = /* @__PURE__ */ new Set();
    const mutantsToPlace = new Set(this.model.mutants);
    this.lines = transformHighlightedLines(highlightedSource, function* (position) {
      for (const mutant of startedMutants) {
        if (gte(position, mutant.location.end)) {
          startedMutants.delete(mutant);
          yield { elementName: "span", id: mutant.id, isClosing: true };
        }
      }
      for (const mutant of mutantsToPlace) {
        if (gte(position, mutant.location.start)) {
          startedMutants.add(mutant);
          mutantsToPlace.delete(mutant);
          yield {
            elementName: "span",
            id: mutant.id,
            attributes: {
              class: escapeHtml(`mutant border-none ${mutant.status}`),
              title: escapeHtml(title$1(mutant)),
              "mutant-id": escapeHtml(mutant.id.toString())
            }
          };
        }
      }
    });
  }
  selectedMutantsHaveChanged(changedMutantStates) {
    if (changedMutantStates.length !== this.selectedMutantStates.length) {
      return true;
    }
    return !changedMutantStates.every((state2, index) => this.selectedMutantStates[index] === state2);
  }
  highlightedReplacementRows(mutant) {
    const mutatedLines = mutant.getMutatedLines().trimEnd();
    const originalLines = mutant.getOriginalLines().trimEnd();
    const [focusFrom, focusTo] = findDiffIndices(originalLines, mutatedLines);
    const lines = transformHighlightedLines(highlightCode(mutatedLines, this.model.language), function* ({ offset }) {
      if (offset === focusFrom) {
        yield { elementName: "span", id: "diff-focus", attributes: { class: "diff-focus" } };
      } else if (offset === focusTo) {
        yield { elementName: "span", id: "diff-focus", isClosing: true };
      }
      return;
    });
    const lineStart = `<tr class="${diffNewClass}"><td class="empty-line-number"></td><td class="line-marker"></td><td class="code">`;
    const lineEnd = "</td></tr>";
    return lines.map((line) => `${lineStart}${line}${lineEnd}`).join("");
  }
};
__publicField$c(FileComponent, "styles", [prismjs, tailwind, r$7(style$6)]);
__decorateClass$c([
  r$2()
], FileComponent.prototype, "filters", 2);
__decorateClass$c([
  n$2()
], FileComponent.prototype, "model", 2);
__decorateClass$c([
  r$2()
], FileComponent.prototype, "selectedMutantStates", 2);
__decorateClass$c([
  r$2()
], FileComponent.prototype, "selectedMutant", 2);
__decorateClass$c([
  r$2()
], FileComponent.prototype, "lines", 2);
__decorateClass$c([
  r$2()
], FileComponent.prototype, "mutants", 2);
FileComponent = __decorateClass$c([
  t$2("mte-file")
], FileComponent);
function title$1(mutant) {
  return `${mutant.mutatorName} ${mutant.status}`;
}
function clearSelection() {
  window.getSelection()?.removeAllRanges();
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u = (e3, s3, t2) => {
  const r2 = /* @__PURE__ */ new Map();
  for (let l2 = s3; l2 <= t2; l2++)
    r2.set(e3[l2], l2);
  return r2;
}, c = e$3(class extends i {
  constructor(e3) {
    if (super(e3), e3.type !== t.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  dt(e3, s3, t2) {
    let r2;
    void 0 === t2 ? t2 = s3 : void 0 !== s3 && (r2 = s3);
    const l2 = [], o2 = [];
    let i2 = 0;
    for (const s4 of e3)
      l2[i2] = r2 ? r2(s4, i2) : i2, o2[i2] = t2(s4, i2), i2++;
    return { values: o2, keys: l2 };
  }
  render(e3, s3, t2) {
    return this.dt(e3, s3, t2).values;
  }
  update(s3, [t2, r2, c2]) {
    const d2 = p(s3), { values: p$12, keys: a2 } = this.dt(t2, r2, c2);
    if (!Array.isArray(d2))
      return this.ut = a2, p$12;
    const h2 = this.ut ??= [], v$12 = [];
    let m$12, y2, x2 = 0, j2 = d2.length - 1, k2 = 0, w$1 = p$12.length - 1;
    for (; x2 <= j2 && k2 <= w$1; )
      if (null === d2[x2])
        x2++;
      else if (null === d2[j2])
        j2--;
      else if (h2[x2] === a2[k2])
        v$12[k2] = v(d2[x2], p$12[k2]), x2++, k2++;
      else if (h2[j2] === a2[w$1])
        v$12[w$1] = v(d2[j2], p$12[w$1]), j2--, w$1--;
      else if (h2[x2] === a2[w$1])
        v$12[w$1] = v(d2[x2], p$12[w$1]), r$1(s3, v$12[w$1 + 1], d2[x2]), x2++, w$1--;
      else if (h2[j2] === a2[k2])
        v$12[k2] = v(d2[j2], p$12[k2]), r$1(s3, d2[x2], d2[j2]), j2--, k2++;
      else if (void 0 === m$12 && (m$12 = u(a2, k2, w$1), y2 = u(h2, x2, j2)), m$12.has(h2[x2]))
        if (m$12.has(h2[j2])) {
          const e3 = y2.get(a2[k2]), t3 = void 0 !== e3 ? d2[e3] : null;
          if (null === t3) {
            const e4 = r$1(s3, d2[x2]);
            v(e4, p$12[k2]), v$12[k2] = e4;
          } else
            v$12[k2] = v(t3, p$12[k2]), r$1(s3, d2[x2], t3), d2[e3] = null;
          k2++;
        } else
          h$2(d2[j2]), j2--;
      else
        h$2(d2[x2]), x2++;
    for (; k2 <= w$1; ) {
      const e3 = r$1(s3, v$12[w$1 + 1]);
      v(e3, p$12[k2]), v$12[k2++] = e3;
    }
    for (; x2 <= j2; ) {
      const e3 = d2[x2++];
      null !== e3 && h$2(e3);
    }
    return this.ut = a2, m(s3, v$12), w;
  }
});
var __defProp$b = Object.defineProperty;
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __defNormalProp$b = (obj, key, value) => key in obj ? __defProp$b(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$b(target, key, result);
  return result;
};
var __publicField$b = (obj, key, value) => {
  __defNormalProp$b(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let MutationTestReportBreadcrumbComponent = class extends s$2 {
  get rootName() {
    switch (this.view) {
      case View.mutant:
        return "All files";
      case View.test:
        return "All tests";
    }
  }
  render() {
    return x`<nav class="my-4 flex rounded-md border border-primary-600 bg-primary-100 p-3 text-gray-700" aria-label="Breadcrumb">
      <ol class="inline-flex items-center">
        ${this.path && this.path.length > 0 ? this.renderLink(this.rootName, []) : this.renderActiveItem(this.rootName)}
        ${this.renderBreadcrumbItems()}
      </ol>
    </nav> `;
  }
  renderBreadcrumbItems() {
    if (this.path) {
      const path = this.path;
      return c(
        path,
        (item) => item,
        (item, index) => {
          if (index === path.length - 1) {
            return this.renderActiveItem(item);
          } else {
            return this.renderLink(item, path.slice(0, index + 1));
          }
        }
      );
    }
    return void 0;
  }
  renderActiveItem(title2) {
    return x`<li aria-current="page">
      <span class="ml-1 text-sm font-medium text-gray-800">${title2}</span>
    </li> `;
  }
  renderLink(title2, path) {
    return x`<li class="after:text-gray-800 after:content-['/'] md:after:pl-1">
      <a
        href="${toAbsoluteUrl(this.view, ...path)}"
        class="ml-1 text-sm font-medium text-primary-800 underline hover:text-gray-900 hover:underline md:ml-2"
        >${title2}</a
      >
    </li>`;
  }
};
__publicField$b(MutationTestReportBreadcrumbComponent, "styles", [tailwind]);
__decorateClass$b([
  n$2()
], MutationTestReportBreadcrumbComponent.prototype, "path", 2);
__decorateClass$b([
  n$2()
], MutationTestReportBreadcrumbComponent.prototype, "view", 2);
MutationTestReportBreadcrumbComponent = __decorateClass$b([
  t$2("mte-breadcrumb")
], MutationTestReportBreadcrumbComponent);
const style$5 = ".step-button{align-items:center;border-radius:.375rem;display:inline-flex;margin-right:.5rem;--tw-bg-opacity:1;background-color:rgb(var(--mut-primary-600,2 132 199)/var(--tw-bg-opacity));padding:.25rem;text-align:center;--tw-text-opacity:1;color:rgb(var(--mut-white,255 255 255)/var(--tw-text-opacity))}.step-button:hover{--tw-bg-opacity:1;background-color:rgb(var(--mut-primary-700,3 105 161)/var(--tw-bg-opacity))}.step-button:focus{outline:2px solid #0000;outline-offset:2px;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000);--tw-ring-opacity:1;--tw-ring-color:rgb(var(--mut-primary-500,14 165 233)/var(--tw-ring-opacity))}";
var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __defNormalProp$a = (obj, key, value) => key in obj ? __defProp$a(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$a(target, key, result);
  return result;
};
var __publicField$a = (obj, key, value) => {
  __defNormalProp$a(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let FileStateFilterComponent = class extends RealTimeElement {
  updated(changedProperties) {
    if (changedProperties.has("filters")) {
      this.dispatchFiltersChangedEvent();
    }
  }
  checkboxChanged(filter, enabled) {
    filter.enabled = enabled;
    this.dispatchFiltersChangedEvent();
  }
  dispatchFiltersChangedEvent() {
    this.dispatchEvent(
      createCustomEvent(
        "filters-changed",
        this.filters.filter(({ enabled }) => enabled).map(({ status }) => status)
      )
    );
  }
  next = (ev) => {
    ev.stopPropagation();
    this.dispatchEvent(createCustomEvent("next", void 0, { bubbles: true, composed: true }));
  };
  previous = (ev) => {
    ev.stopPropagation();
    this.dispatchEvent(createCustomEvent("previous", void 0, { bubbles: true, composed: true }));
  };
  render() {
    return x`
      <div class="sticky top-offset z-10 flex flex-row bg-white py-6">
        <div class="mr-3">
          <button title="Previous" @click=${this.previous} type="button" class="step-button">
            <svg aria-hidden="true" class="h-4 w-4 rotate-180" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Select previous mutant</span>
          </button>
          <button title="Next" @click=${this.next} type="button" class="step-button">
            <svg aria-hidden="true" class="h-4 w-4" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Select next mutant</span>
          </button>
        </div>

        ${renderIf(
      this.filters?.length,
      c(
        this.filters,
        // Key function. I super duper want that all properties are weighed here,
        // see https://lit-html.polymer-project.org/guide/writing-templates#repeating-templates-with-the-repeat-directive
        (filter) => filter.status,
        (filter) => x`
              <div class="mr-4 flex items-center" data-status="${filter.status}">
                <input
                  ?checked="${filter.enabled}"
                  id="filter-${filter.status}"
                  aria-describedby="status-description"
                  type="checkbox"
                  value="${filter.status}"
                  @input="${(el) => this.checkboxChanged(filter, el.target.checked)}"
                  class="h-5 w-5 rounded border-gray-300 bg-gray-100 text-primary-on !ring-offset-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />

                <label
                  for="filter-${filter.status}"
                  class="${this.bgForContext(filter.context)} mx-2 rounded px-2.5 py-0.5 text-sm font-medium hover:cursor-pointer"
                >
                  ${filter.label} (${filter.count})
                </label>
              </div>
            `
      )
    )}
      </div>
    `;
  }
  bgForContext(context) {
    switch (context) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "danger":
        return "bg-red-100 text-red-800";
      case "caution":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
};
__publicField$a(FileStateFilterComponent, "styles", [tailwind, r$7(style$5)]);
__decorateClass$a([
  n$2({ type: Array })
], FileStateFilterComponent.prototype, "filters", 2);
FileStateFilterComponent = __decorateClass$a([
  t$2("mte-state-filter")
], FileStateFilterComponent);
const style$4 = '#darkTheme{position:absolute;right:100vw}#darkTheme+label{--i:0;--j:calc(1 - var(--i));display:grid;grid-gap:.15em .06em;background:hsl(199,98%,calc(var(--j)*48%));border-radius:.75em;color:#0000;cursor:pointer;height:1.5em;overflow:hidden;padding:.15em;transition:.3s;-webkit-user-select:none;user-select:none}#darkTheme+label:after,#darkTheme+label:before{content:"";height:1.2em;transition:inherit;width:1.2em}#darkTheme+label:before{background:#ff0;transform:translate(calc(var(--i)*(100% + .06em))) scale(calc(1 - var(--i)*.8));transform-origin:20% 20%;--poly:polygon(44.133707561% 12.9616872277%,50% 0%,55.866292439% 12.9616872277%,59.7057141913% 13.7777815142%,63.4387981079% 14.9907340064%,67.0246437402% 16.5872553429%,79.3892626146% 9.5491502813%,76.5165042945% 23.4834957055%,79.1429735546% 26.4004853356%,81.450146298% 29.5760361869%,83.4127446571% 32.9753562598%,97.5528258148% 34.5491502813%,87.0383127723% 44.133707561%,87.4486075533% 48.0374016409%,87.4486075533% 51.9625983591%,87.0383127723% 55.866292439%,97.5528258148% 65.4508497187%,83.4127446571% 67.0246437402%,81.450146298% 70.4239638131%,79.1429735546% 73.5995146644%,76.5165042945% 76.5165042945%,79.3892626146% 90.4508497187%,67.0246437402% 83.4127446571%,63.4387981079% 85.0092659936%,59.7057141913% 86.2222184858%,55.866292439% 87.0383127723%,50% 100%,44.133707561% 87.0383127723%,40.2942858087% 86.2222184858%,36.561201892% 85.0092659936%,32.9753562598% 83.4127446571%,20.6107373854% 90.4508497187%,23.4834957055% 76.5165042945%,20.8570264454% 73.5995146644%,18.5498537021% 70.4239638131%,16.587255343% 67.0246437402%,2.4471741856% 65.4508497188%,12.9616872286% 55.8662924391%,12.5513924487% 51.9625983594%,12.5513924508% 48.0374016414%,12.961687236% 44.1337075622%,2.4471742159% 34.5491502859%,16.587255404% 32.9753562694%,18.5498538164% 29.5760362054%,20.8570266557% 26.4004853707%,23.4834960862% 23.4834957706%,20.6107385856% 9.5491504949%,32.97535832% 16.5872557238%,36.5612054098% 14.9907346728%,40.2942917387% 13.7777826649%);-webkit-clip-path:var(--poly);clip-path:var(--poly)}#darkTheme+label:after{background:radial-gradient(circle at 19% 19%,#0000 41%,#fff 43%);border-radius:50%;grid-column:2;transform:translatey(calc(var(--i)*(-130% - .15em)))}#darkTheme:checked+label{--i:1}.check-box-container{width:2.9em}';
var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$9(target, key, result);
  return result;
};
var __publicField$9 = (obj, key, value) => {
  __defNormalProp$9(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let MutationTestReportThemeSwitchComponent$1 = class MutationTestReportThemeSwitchComponent extends s$2 {
  dispatchThemeChangedEvent = (e3) => {
    const checked = e3.target.checked;
    this.dispatchEvent(createCustomEvent("theme-switch", checked ? "dark" : "light"));
  };
  render() {
    return x`
      <div class="check-box-container" @click="${(event) => event.stopPropagation()}">
        <input type="checkbox" @click="${this.dispatchThemeChangedEvent}" ?checked="${this.theme == "dark"}" id="darkTheme" />
        <label for="darkTheme">Dark</label>
      </div>
    `;
  }
};
__publicField$9(MutationTestReportThemeSwitchComponent$1, "styles", [tailwind, r$7(style$4)]);
__decorateClass$9([
  n$2()
], MutationTestReportThemeSwitchComponent$1.prototype, "theme", 2);
MutationTestReportThemeSwitchComponent$1 = __decorateClass$9([
  t$2("mte-theme-switch")
], MutationTestReportThemeSwitchComponent$1);
const renderDrawer = ({ hasDetail, mode }, content) => x`<mte-drawer
    class="container fixed bottom-0 z-10 overflow-hidden rounded-t-3xl bg-gray-200/60 shadow-xl backdrop-blur-lg motion-safe:transition-[height,max-width] motion-safe:duration-200"
    ?hasDetail=${hasDetail}
    .mode="${mode}"
  >
    ${content}
  </mte-drawer>`;
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$8(target, key, result);
  return result;
};
var __publicField$8 = (obj, key, value) => {
  __defNormalProp$8(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const describeTest = (test) => `${test.name}${test.sourceFile && test.location ? ` (${describeLocation(test)})` : ""}`;
const whitespacePreserving = (content) => x`<span class="whitespace-pre-wrap">${content}</span>`;
let MutationTestReportDrawerMutant = class extends RealTimeElement {
  constructor() {
    super();
    this.mode = "closed";
  }
  render() {
    return renderDrawer(
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- we want to coalesce on length 0
      { hasDetail: Boolean(this.mutant?.killedByTests?.length || this.mutant?.coveredByTests?.length), mode: this.mode },
      renderIfPresent(
        this.mutant,
        (mutant) => x`
          <span class="align-middle text-lg" slot="header"
            >${getEmojiForStatus(mutant.status)} ${mutant.mutatorName} ${mutant.status}
            (${mutant.location.start.line}:${mutant.location.start.column})</span
          >
          <span slot="summary">${this.renderSummary()}</span>
          <span slot="detail" class="block">${this.renderDetail()}</span>
        `
      )
    );
  }
  renderSummary() {
    return renderSummaryContainer(
      x`${this.mutant?.killedByTests?.[0] ? renderSummaryLine(
        x`${renderEmoji("🎯", "killed")} Killed by:
            ${this.mutant.killedByTests?.[0].name}${this.mutant.killedByTests.length > 1 ? `(and ${this.mutant.killedByTests.length - 1} more)` : ""}`
      ) : T}
      ${renderIf(this.mutant?.static, renderSummaryLine(x`${renderEmoji("🗿", "static")} Static mutant`))}
      ${renderIfPresent(
        this.mutant?.coveredByTests,
        (coveredTests) => renderSummaryLine(
          x`${renderEmoji("☂️", "umbrella")} Covered by ${coveredTests.length}
          test${plural(coveredTests)}${this.mutant?.status === "Survived" ? " (yet still survived)" : ""}`
        )
      )}
      ${renderIf(
        this.mutant?.statusReason?.trim(),
        renderSummaryLine(
          x`${renderEmoji("🕵️", "spy")} ${whitespacePreserving(this.mutant.statusReason)}`,
          `Reason for the ${this.mutant.status} status`
        )
      )}
      ${renderIfPresent(
        this.mutant?.description,
        (description) => renderSummaryLine(x`${renderEmoji("📖", "book")} ${whitespacePreserving(description)}`)
      )}`
    );
  }
  renderDetail() {
    return x`<ul class="mb-6 mr-12">
      ${this.mutant?.killedByTests?.map(
      (test) => renderDetailLine("This mutant was killed by this test", x`${renderEmoji("🎯", "killed")} ${describeTest(test)}`)
    )}
      ${this.mutant?.coveredByTests?.filter((test) => !this.mutant?.killedByTests?.includes(test)).map((test) => renderDetailLine("This mutant was covered by this test", x`${renderEmoji("☂️", "umbrella")} ${describeTest(test)}`))}
    </ul>`;
  }
};
__publicField$8(MutationTestReportDrawerMutant, "styles", [tailwind]);
__decorateClass$8([
  n$2()
], MutationTestReportDrawerMutant.prototype, "mutant", 2);
__decorateClass$8([
  n$2({ reflect: true })
], MutationTestReportDrawerMutant.prototype, "mode", 2);
MutationTestReportDrawerMutant = __decorateClass$8([
  t$2("mte-drawer-mutant")
], MutationTestReportDrawerMutant);
const style$3 = "main{padding-bottom:var(--mte-drawer-height-half-open)}";
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$7(target, key, result);
  return result;
};
var __publicField$7 = (obj, key, value) => {
  __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let MutationTestReportMutantViewComponent = class extends RealTimeElement {
  constructor() {
    super();
    this.drawerMode = "closed";
  }
  handleClick = () => {
    this.drawerMode = "closed";
  };
  handleMutantSelected = (event) => {
    this.selectedMutant = event.detail.mutant;
    this.drawerMode = event.detail.selected ? "half" : "closed";
  };
  updated(changes) {
    if (changes.has("result") && !this.result.file) {
      this.drawerMode = "closed";
    }
  }
  render() {
    return x`
      <main @click="${this.handleClick}">
        <mte-metrics-table .columns="${COLUMNS$1}" .currentPath="${this.path}" .thresholds="${this.thresholds}" .model="${this.result}">
        </mte-metrics-table>
        ${this.result.file ? x`<mte-file @mutant-selected="${this.handleMutantSelected}" .model="${this.result.file}"></mte-file>` : T}
      </main>
      <mte-drawer-mutant .mode="${this.drawerMode}" .mutant="${this.selectedMutant}"></mte-drawer-mutant>
    `;
  }
};
__publicField$7(MutationTestReportMutantViewComponent, "styles", [r$7(style$3), tailwind]);
__decorateClass$7([
  n$2()
], MutationTestReportMutantViewComponent.prototype, "drawerMode", 2);
__decorateClass$7([
  n$2()
], MutationTestReportMutantViewComponent.prototype, "selectedMutant", 2);
__decorateClass$7([
  n$2()
], MutationTestReportMutantViewComponent.prototype, "result", 2);
__decorateClass$7([
  n$2({ attribute: false, reflect: false })
], MutationTestReportMutantViewComponent.prototype, "thresholds", 2);
__decorateClass$7([
  n$2({ attribute: false, reflect: false })
], MutationTestReportMutantViewComponent.prototype, "path", 2);
MutationTestReportMutantViewComponent = __decorateClass$7([
  t$2("mte-mutant-view")
], MutationTestReportMutantViewComponent);
const COLUMNS$1 = [
  {
    key: "mutationScore",
    label: "Mutation score",
    tooltip: "The percentage of mutants that were detected. The higher, the better!",
    category: "percentage"
  },
  {
    key: "killed",
    label: "Killed",
    tooltip: "At least one test failed while these mutants were active. This is what you want!",
    category: "number"
  },
  {
    key: "survived",
    label: "Survived",
    tooltip: "All tests passed while these mutants were active. You're missing a test for them.",
    category: "number"
  },
  {
    key: "timeout",
    label: "Timeout",
    tooltip: "Running the tests while these mutants were active resulted in a timeout. For example, an infinite loop.",
    category: "number"
  },
  {
    key: "noCoverage",
    label: "No coverage",
    tooltip: "These mutants aren't covered by one of your tests and survived as a result.",
    category: "number"
  },
  {
    key: "ignored",
    label: "Ignored",
    tooltip: "These mutants weren't tested because they are ignored. Either by user action, or for another reason.",
    category: "number"
  },
  {
    key: "runtimeErrors",
    label: "Runtime errors",
    tooltip: "Running tests when these mutants are active resulted in an error (rather than a failed test). For example: an out of memory error.",
    category: "number"
  },
  { key: "compileErrors", label: "Compile errors", tooltip: "Mutants that caused a compile error.", category: "number" },
  {
    key: "totalDetected",
    label: "Detected",
    tooltip: "The number of mutants detected by your tests (killed + timeout).",
    category: "number",
    width: "large",
    isBold: true
  },
  {
    key: "totalUndetected",
    label: "Undetected",
    tooltip: "The number of mutants that are not detected by your tests (survived + no coverage).",
    category: "number",
    width: "large",
    isBold: true
  },
  {
    key: "totalMutants",
    label: "Total",
    tooltip: "All mutants (except runtimeErrors + compileErrors)",
    category: "number",
    width: "large",
    isBold: true
  }
];
const style$2 = "main{padding-bottom:var(--mte-drawer-height-half-open)}";
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$6(target, key, result);
  return result;
};
var __publicField$6 = (obj, key, value) => {
  __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let MutationTestReportTestViewComponent = class extends RealTimeElement {
  constructor() {
    super();
    this.drawerMode = "closed";
  }
  handleClick = () => {
    this.drawerMode = "closed";
  };
  handleTestSelected = (event) => {
    this.selectedTest = event.detail.test;
    this.drawerMode = event.detail.selected ? "half" : "closed";
  };
  updated(changes) {
    if (changes.has("result") && !this.result.file) {
      this.drawerMode = "closed";
    }
  }
  render() {
    return x`
      <main @click="${this.handleClick}">
        <mte-metrics-table .columns="${COLUMNS}" .currentPath="${this.path}" .model="${this.result}"> </mte-metrics-table>
        ${this.result.file ? x`<mte-test-file @test-selected="${this.handleTestSelected}" .model="${this.result.file}"></mte-test-file>` : T}
      </main>
      <mte-drawer-test .mode="${this.drawerMode}" .test="${this.selectedTest}"></mte-drawer-test>
    `;
  }
};
__publicField$6(MutationTestReportTestViewComponent, "styles", [r$7(style$2), tailwind]);
__decorateClass$6([
  n$2()
], MutationTestReportTestViewComponent.prototype, "drawerMode", 2);
__decorateClass$6([
  n$2()
], MutationTestReportTestViewComponent.prototype, "result", 2);
__decorateClass$6([
  n$2({ attribute: false, reflect: false })
], MutationTestReportTestViewComponent.prototype, "path", 2);
__decorateClass$6([
  n$2()
], MutationTestReportTestViewComponent.prototype, "selectedTest", 2);
MutationTestReportTestViewComponent = __decorateClass$6([
  t$2("mte-test-view")
], MutationTestReportTestViewComponent);
const COLUMNS = [
  { key: "killing", label: "Killing", tooltip: "These tests killed at least one mutant", width: "normal", category: "number" },
  {
    key: "covering",
    label: "Covering",
    tooltip: "These tests are covering at least one mutant, but not killing any of them.",
    width: "normal",
    category: "number"
  },
  {
    key: "notCovering",
    label: "Not Covering",
    tooltip: "These tests were not covering a mutant (and thus not killing any of them).",
    width: "normal",
    category: "number"
  },
  { key: "total", label: "Total tests", width: "large", category: "number", isBold: true }
];
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e2 = e$3(class extends i {
  constructor(t$12) {
    if (super(t$12), t$12.type !== t.ATTRIBUTE || "class" !== t$12.name || t$12.strings?.length > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((s3) => t2[s3]).join(" ") + " ";
  }
  update(s3, [i2]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s3.strings && (this.nt = new Set(s3.strings.join(" ").split(/\s/).filter((t2) => "" !== t2)));
      for (const t2 in i2)
        i2[t2] && !this.nt?.has(t2) && this.st.add(t2);
      return this.render(i2);
    }
    const r2 = s3.element.classList;
    for (const t2 of this.st)
      t2 in i2 || (r2.remove(t2), this.st.delete(t2));
    for (const t2 in i2) {
      const s4 = !!i2[t2];
      s4 === this.st.has(t2) || this.nt?.has(t2) || (s4 ? (r2.add(t2), this.st.add(t2)) : (r2.remove(t2), this.st.delete(t2)));
    }
    return w;
  }
});
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$5(target, key, result);
  return result;
};
var __publicField$5 = (obj, key, value) => {
  __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let MutationTestReportTestMetricsTable = class extends RealTimeElement {
  constructor() {
    super();
    this.currentPath = [];
    this.thresholds = {
      high: 80,
      low: 60
    };
  }
  hasMultipleColspan = false;
  willUpdate(changedProperties) {
    if (changedProperties.has("columns")) {
      this.hasMultipleColspan = this.columns.some((column) => column.category === "percentage");
    }
  }
  render() {
    return x`${this.model ? x`<div class="overflow-x-auto rounded-md border border-gray-200">
          <table class="w-full table-auto text-left text-sm">${this.renderTableHeadRow()}${this.renderTableBody(this.model)} </table>
        </div>` : T}`;
  }
  renderTableHeadRow() {
    return x`<thead class="border-b border-gray-200 text-center text-sm">
      <tr>
        <th scope="col" class="px-4 py-4">
          <div class="flex items-center justify-around">
            <span>File / Directory</span
            ><a
              href="https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics"
              target="_blank"
              class="info-icon float-right"
              title="What does this all mean?"
              >${renderEmoji("ℹ", "info icon")}</a
            >
          </div>
        </th>
        ${c(
      this.columns,
      (column) => column.key,
      (column) => this.renderTableHead(column)
    )}
      </tr>
    </thead>`;
  }
  renderTableHead(column) {
    const id = `tooltip-${column.key.toString()}`;
    const header = column.tooltip ? x`<mte-tooltip title="${column.tooltip}" id="${id}">${column.label}</mte-tooltip>` : x`<span id="${id}">${column.label}</span>`;
    if (column.category === "percentage") {
      return x` <th colspan="2" class="px-2 even:bg-gray-100"> ${header} </th>`;
    }
    return x`<th class="w-24 px-2 even:bg-gray-100 2xl:w-28">
      <div class="inline-block">${header}</div>
    </th>`;
  }
  renderTableBody(model) {
    const renderChildren = () => {
      if (model.file) {
        return T;
      } else {
        return model.childResults.map((childResult) => {
          const nameParts = [childResult.name];
          while (!childResult.file && childResult.childResults.length === 1) {
            childResult = childResult.childResults[0];
            nameParts.push(childResult.name);
          }
          return this.renderRow(nameParts.join("/"), childResult, ...this.currentPath, ...nameParts);
        });
      }
    };
    return x`<tbody class="divide-y divide-gray-200">${this.renderRow(model.name, model)} ${renderChildren()}</tbody>`;
  }
  renderRow(name, row, ...path) {
    return x`<tr title="${row.name}" class="group hover:bg-gray-200">
      <td class="font-semibold">
        <div class="flex items-center justify-start">
          <mte-file-icon file-name="${row.name}" ?file="${row.file}" class="mx-1"></mte-file-icon> ${path.length > 0 ? x`<a class="mr-auto inline-block w-full py-4 pr-2 hover:text-primary-on hover:underline" href="${toAbsoluteUrl(...path)}"
                >${name}</a
              >` : x`<span class="py-4">${row.name}</span>`}
        </div>
      </td>
      ${this.columns.map((column) => this.renderCell(column, row.metrics))}
    </tr>`;
  }
  renderCell(column, metrics) {
    const value = metrics[column.key];
    const backgroundColoringClass = this.hasMultipleColspan ? "odd:bg-gray-100" : "even:bg-gray-100";
    if (column.category === "percentage") {
      const valueIsPresent = !isNaN(value);
      const bgColoringClass = this.determineBgColoringClass(value);
      const textColoringClass = this.determineTextColoringClass(value);
      const mutationScoreRounded = value.toFixed(2);
      const progressBarStyle = `width: ${value}%`;
      return x`<td class="bg-gray-100 px-4 py-4 group-hover:bg-gray-200">
          ${valueIsPresent ? x`<div class="h-3 w-full min-w-[24px] rounded-full bg-gray-300">
                <div
                  class="${bgColoringClass} h-3 rounded-full pl-1 transition-all"
                  role="progressbar"
                  aria-valuenow="${mutationScoreRounded}"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-describedby="tooltip-mutationScore"
                  title="${column.label}"
                  style="${progressBarStyle}"
                ></div>
              </div>` : x` <span class="text-light-muted font-bold">N/A</span> `}
        </td>
        <td class="${textColoringClass} ${backgroundColoringClass} w-12 pr-2 text-center font-bold group-hover:bg-gray-200"
          >${valueIsPresent ? x`<span class="transition-colors">${mutationScoreRounded}</span>` : T}</td
        >`;
    }
    return x`<td
      class="${e2({ "font-bold": column.isBold ?? false, [backgroundColoringClass]: true })} py-4 text-center group-hover:bg-gray-200"
      aria-describedby="${`tooltip-${column.key.toString()}`}"
      >${value}</td
    >`;
  }
  determineBgColoringClass(mutationScore) {
    if (!isNaN(mutationScore) && this.thresholds) {
      if (mutationScore < this.thresholds.low) {
        return "bg-red-600 text-gray-200";
      } else if (mutationScore < this.thresholds.high) {
        return "bg-yellow-400";
      } else {
        return "bg-green-600 text-gray-200";
      }
    } else {
      return "bg-blue-600";
    }
  }
  determineTextColoringClass(mutationScore) {
    if (!isNaN(mutationScore) && this.thresholds) {
      if (mutationScore < this.thresholds.low) {
        return "text-red-700";
      } else if (mutationScore < this.thresholds.high) {
        return "text-yellow-600";
      } else {
        return "text-green-700";
      }
    } else {
      return "";
    }
  }
};
__publicField$5(MutationTestReportTestMetricsTable, "styles", [tailwind]);
__decorateClass$5([
  n$2()
], MutationTestReportTestMetricsTable.prototype, "model", 2);
__decorateClass$5([
  n$2()
], MutationTestReportTestMetricsTable.prototype, "currentPath", 2);
__decorateClass$5([
  n$2({ type: Array })
], MutationTestReportTestMetricsTable.prototype, "columns", 2);
__decorateClass$5([
  n$2()
], MutationTestReportTestMetricsTable.prototype, "thresholds", 2);
MutationTestReportTestMetricsTable = __decorateClass$5([
  t$2("mte-metrics-table")
], MutationTestReportTestMetricsTable);
const style$1 = '#report-code-block{background:var(--prism-background);border:1px solid var(--prism-border);overflow-x:auto;overflow-y:visible}.line-numbers{counter-reset:mte-line-number}.line .line-number{color:var(--mut-line-number);counter-increment:mte-line-number;padding:0 10px 0 15px;text-align:right}.line .line-number:before{content:counter(mte-line-number)}.line-marker:before{content:" ";padding:0 5px}svg.test-dot.Killing{fill:#15803d}svg.test-dot.Covering{fill:#fbbf24}svg.test-dot.NotCovering{fill:#f97316}svg.test-dot.selected{fill:#38bdf8}svg.test-dot{margin:2px}';
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$4(target, key, result);
  return result;
};
var __publicField$4 = (obj, key, value) => {
  __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let TestFileComponent = class extends RealTimeElement {
  constructor() {
    super();
    this.filters = [];
    this.lines = [];
    this.enabledStates = [];
    this.tests = [];
  }
  filtersChanged = (event) => {
    this.enabledStates = event.detail;
    if (this.selectedTest && !this.enabledStates.includes(this.selectedTest.status)) {
      this.toggleTest(this.selectedTest);
    }
  };
  toggleTest(test) {
    if (this.selectedTest === test) {
      this.selectedTest = void 0;
      this.dispatchEvent(createCustomEvent("test-selected", { selected: false, test }));
    } else {
      this.selectedTest = test;
      this.dispatchEvent(createCustomEvent("test-selected", { selected: true, test }));
      scrollToCodeFragmentIfNeeded(this.shadowRoot.querySelector(`[test-id="${test.id}"]`));
    }
  }
  nextTest = () => {
    const index = this.selectedTest ? (this.tests.findIndex(({ id }) => id === this.selectedTest.id) + 1) % this.tests.length : 0;
    this.selectTest(this.tests[index]);
  };
  previousTest = () => {
    const index = this.selectedTest ? (this.tests.findIndex(({ id }) => id === this.selectedTest.id) + this.tests.length - 1) % this.tests.length : this.tests.length - 1;
    this.selectTest(this.tests[index]);
  };
  selectTest(test) {
    if (test) {
      this.toggleTest(test);
    }
  }
  render() {
    return x`
      <mte-state-filter
        @next=${this.nextTest}
        @previous=${this.previousTest}
        .filters="${this.filters}"
        @filters-changed="${this.filtersChanged}"
      ></mte-state-filter>
      ${this.renderTestList()} ${this.renderCode()}
    `;
  }
  renderTestList() {
    const testsToRenderInTheList = this.tests.filter((test) => !test.location);
    if (testsToRenderInTheList.length) {
      return x`<ul class="max-w-6xl">
        ${c(
        testsToRenderInTheList,
        (test) => test.id,
        (test) => x`<li class="my-3">
              <button
                class="w-full rounded p-3 text-left hover:bg-gray-100 active:bg-gray-200"
                type="button"
                data-active="${this.selectedTest === test}"
                test-id="${test.id}"
                @click=${(ev) => {
          ev.stopPropagation();
          this.toggleTest(test);
        }}
                >${getEmojiForTestStatus(test.status)} ${test.name} [${test.status}]
              </button>
            </li>`
      )}
      </ul>`;
    }
    return T;
  }
  renderCode() {
    if (this.model?.source) {
      const testsByLine = /* @__PURE__ */ new Map();
      for (const test of this.tests) {
        if (test.location) {
          let tests = testsByLine.get(test.location.start.line);
          if (!tests) {
            tests = [];
            testsByLine.set(test.location.start.line, tests);
          }
          tests.push(test);
        }
      }
      const renderFinalTests = (lastLine) => {
        return this.renderTestDots([...testsByLine.entries()].filter(([line]) => line > lastLine).flatMap(([, tests]) => tests));
      };
      return x`<pre id="report-code-block" class="line-numbers flex rounded-md p-1"><code class="flex language-${determineLanguage(
        this.model.name
      )}">
      <table>
        ${this.lines.map((line, lineIndex) => {
        const lineNr = lineIndex + 1;
        const testDots = this.renderTestDots(testsByLine.get(lineNr));
        const finalTests = this.lines.length === lineNr ? renderFinalTests(lineNr) : T;
        return renderLine(line, renderDots(testDots, finalTests));
      })}</table></code></pre>`;
    }
    return T;
  }
  renderTestDots(tests) {
    return tests?.length ? tests.map(
      (test) => b2`<svg test-id="${test.id}" class="cursor-pointer test-dot ${this.selectedTest === test ? "selected" : test.status}" @click=${(ev) => {
        ev.stopPropagation();
        this.toggleTest(test);
      }} height="10" width="12">
          <title>${title(test)}</title>
          <circle cx="5" cy="5" r="5" />
          </svg>`
    ) : T;
  }
  reactivate() {
    super.reactivate();
    this.updateFileRepresentation();
  }
  willUpdate(changes) {
    if (changes.has("model")) {
      this.updateFileRepresentation();
    }
    if ((changes.has("model") || changes.has("enabledStates")) && this.model) {
      this.tests = this.model.tests.filter((tests) => this.enabledStates.includes(tests.status)).sort((t1, t2) => {
        if (t1.location && t2.location) {
          return gte(t1.location.start, t2.location.start) ? 1 : -1;
        } else {
          return this.model.tests.indexOf(t1) - this.model.tests.indexOf(t2);
        }
      });
    }
    super.update(changes);
  }
  updateFileRepresentation() {
    if (!this.model) {
      return;
    }
    const model = this.model;
    this.filters = [TestStatus.Killing, TestStatus.Covering, TestStatus.NotCovering].filter((status) => model.tests.some((test) => test.status === status)).map((status) => ({
      enabled: true,
      count: model.tests.filter((m2) => m2.status === status).length,
      status,
      label: x`${getEmojiForTestStatus(status)} ${status}`,
      context: getContextClassForTestStatus(status)
    }));
    if (this.model.source) {
      this.lines = transformHighlightedLines(highlightCode(this.model.source, this.model.name));
    }
  }
};
__publicField$4(TestFileComponent, "styles", [prismjs, tailwind, r$7(style$1)]);
__decorateClass$4([
  n$2()
], TestFileComponent.prototype, "model", 2);
__decorateClass$4([
  r$2()
], TestFileComponent.prototype, "filters", 2);
__decorateClass$4([
  r$2()
], TestFileComponent.prototype, "lines", 2);
__decorateClass$4([
  r$2()
], TestFileComponent.prototype, "enabledStates", 2);
__decorateClass$4([
  r$2()
], TestFileComponent.prototype, "selectedTest", 2);
__decorateClass$4([
  r$2()
], TestFileComponent.prototype, "tests", 2);
TestFileComponent = __decorateClass$4([
  t$2("mte-test-file")
], TestFileComponent);
function title(test) {
  return `${test.name} (${test.status})`;
}
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target, key, result);
  return result;
};
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const describeMutant = (mutant) => x`<code>${mutant.getMutatedLines()}</code> (${describeLocation(mutant)})`;
let MutationTestReportDrawerTestComponent = class extends RealTimeElement {
  constructor() {
    super();
    this.mode = "closed";
  }
  render() {
    return renderDrawer(
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- we want to coalesce on length 0
      { hasDetail: Boolean(this.test?.killedMutants?.length || this.test?.coveredMutants?.length), mode: this.mode },
      renderIfPresent(
        this.test,
        (test) => x`
          <span class="align-middle text-lg" slot="header"
            >${getEmojiForTestStatus(test.status)} ${test.name} [${test.status}]
            ${test.location ? x`(${test.location.start.line}:${test.location.start.column})` : T}</span
          >
          <span slot="summary">${this.renderSummary()}</span>
          <span class="block" slot="detail">${this.renderDetail()}</span>
        `
      )
    );
  }
  renderSummary() {
    return renderSummaryContainer(
      x`${this.test?.killedMutants?.[0] ? renderSummaryLine(
        x`${renderEmoji("🎯", "killed")} Killed:
            ${describeMutant(this.test.killedMutants?.[0])}${this.test.killedMutants.length > 1 ? x` (and ${this.test.killedMutants.length - 1} more)` : ""}`
      ) : T}
      ${renderIfPresent(
        this.test?.coveredMutants,
        (coveredMutants) => renderSummaryLine(
          x`${renderEmoji("☂️", "umbrella")} Covered ${coveredMutants.length}
          mutant${plural(coveredMutants)}${this.test?.status === TestStatus.Covering ? " (yet didn't kill any of them)" : ""}`
        )
      )}`
    );
  }
  renderDetail() {
    return x`<ul class="mb-6 mr-12">
      ${this.test?.killedMutants?.map(
      (mutant) => renderDetailLine("This test killed this mutant", x`${renderEmoji("🎯", "killed")} ${describeMutant(mutant)}`)
    )}
      ${this.test?.coveredMutants?.filter((mutant) => !this.test?.killedMutants?.includes(mutant)).map((mutant) => renderDetailLine("This test covered this mutant", x`${renderEmoji("☂️", "umbrella")} ${describeMutant(mutant)}`))}
    </ul>`;
  }
};
__publicField$3(MutationTestReportDrawerTestComponent, "styles", [tailwind]);
__decorateClass$3([
  n$2()
], MutationTestReportDrawerTestComponent.prototype, "test", 2);
__decorateClass$3([
  n$2({ reflect: true })
], MutationTestReportDrawerTestComponent.prototype, "mode", 2);
MutationTestReportDrawerTestComponent = __decorateClass$3([
  t$2("mte-drawer-test")
], MutationTestReportDrawerTestComponent);
const style = "svg.cs{fill:var(--mut-file-csharp-color)}svg.html{fill:var(--mut-file-html-color)}svg.java{fill:var(--mut-file-java-color)}svg.javascript{fill:var(--mut-file-js-color)}svg.scala{fill:var(--mut-file-scala-color)}svg.typescript{fill:var(--mut-file-ts-color)}svg.php{fill:var(--mut-file-php-color)}svg.vue{fill:var(--mut-file-vue-color)}svg.octicon{fill:var(--mut-octicon-icon-color)}svg.javascript.test,svg.typescript.test{fill:var(--mut-file-js-test-color)}svg.gherkin{fill:var(--mut-file-gherkin-color)}svg{vertical-align:middle;width:20px}";
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let MutationTestReportFileIconComponent = class extends s$2 {
  get language() {
    return determineLanguage(this.fileName);
  }
  get isTestFile() {
    const baseName = this.fileName.substr(0, this.fileName.lastIndexOf(".")).toLowerCase();
    return baseName.endsWith("spec") || baseName.endsWith("test");
  }
  get cssClass() {
    return e2({ [this.language?.toString() ?? "unknown"]: this.isFile, test: this.isTestFile });
  }
  render() {
    if (!this.isFile) {
      return b2`<svg aria-label="directory" class="octicon octicon-file-directory" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fill-rule="evenodd" d="M 13,2 H 7 V 1 C 7,0.34 6.69,0 6,0 H 1 C 0.45,0 0,0.45 0,1 v 10 c 0,0.55 0.45,1 1,1 h 12 c 0.55,0 1,-0.45 1,-1 V 3 C 14,2.45 13.55,2 13,2 Z M 6,2 H 1 V 1 h 5 z" id="path2" /></svg>`;
    }
    if (!this.language) {
      return b2`<svg aria-label="file" class="octicon octicon-file" viewBox="0 0 12 16" version="1.1" width="12" height="16" role="img"><path fill-rule="evenodd" d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"></path></svg>`;
    }
    switch (this.language) {
      case ProgrammingLanguage.csharp:
        return b2`<svg class="${this.cssClass}" aria-label="cs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g><path d="M7.1 15.9c0-1.3.2-2.4.6-3.4.4-1 .9-1.8 1.6-2.5.7-.7 1.5-1.2 2.4-1.6s1.9-.5 2.9-.5 1.9.2 2.7.6c.8.4 1.5.9 2 1.4l-2.2 2.5c-.4-.3-.7-.6-1.1-.7-.4-.1-.8-.3-1.4-.3-.5 0-.9.1-1.3.3-.4.2-.8.5-1.1.9s-.5.8-.7 1.4c-.2.6-.3 1.2-.3 1.9 0 1.5.3 2.6 1 3.3.7.8 1.5 1.2 2.6 1.2.5 0 1-.1 1.4-.3.4-.2.8-.5 1.1-.9l2.2 2.5c-.7.8-1.4 1.3-2.2 1.7-.8.4-1.7.6-2.7.6s-2-.2-2.9-.5-1.7-.8-2.4-1.5-1.1-1.7-1.5-2.7c-.5-.9-.7-2.1-.7-3.4z"/><path d="M21.8 17.1h-1l-.4 2.4h-1.2l.4-2.4h-1.2V16h1.5l.2-1.6h-1.3v-1.1h1.5l.4-2.4h1.2l-.4 2.4h1l.4-2.4h1.2l-.4 2.4H25v1.1h-1.6l-.2 1.6h1.3v1.1h-1.6l-.4 2.4h-1.2c0 .1.5-2.4.5-2.4zm-.8-1h1l.2-1.6h-1l-.2 1.6z"/></g></svg>`;
      case ProgrammingLanguage.html:
        return b2`<svg class="${this.cssClass}" aria-label="html" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M8 15l6-5.6V12l-4.5 4 4.5 4v2.6L8 17v-2zm16 2.1l-6 5.6V20l4.6-4-4.6-4V9.3l6 5.6v2.2z"/></svg>`;
      case ProgrammingLanguage.java:
        return b2`<svg class="${this.cssClass}" aria-label="java" xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 20 20"><path class="cls-1" d="M6 0a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm2.14 6.8a2.16 2.16 0 0 1-2.29 2.41 2.5 2.5 0 0 1-2-.87l.73-.92a1.52 1.52 0 0 0 1.23.59c.66 0 1.06-.42 1.06-1.32V2.8h1.26z"/></svg>`;
      case ProgrammingLanguage.javascript:
        return b2`<svg class="${this.cssClass}" aria-label="js" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path  d="M11.4 10h2.7v7.6c0 3.4-1.6 4.6-4.3 4.6-.6 0-1.5-.1-2-.3l.3-2.2c.4.2.9.3 1.4.3 1.1 0 1.9-.5 1.9-2.4V10zm5.1 9.2c.7.4 1.9.8 3 .8 1.3 0 1.9-.5 1.9-1.3s-.6-1.2-2-1.7c-2-.7-3.3-1.8-3.3-3.6 0-2.1 1.7-3.6 4.6-3.6 1.4 0 2.4.3 3.1.6l-.6 2.2c-.5-.2-1.3-.6-2.5-.6s-1.8.5-1.8 1.2c0 .8.7 1.1 2.2 1.7 2.1.8 3.1 1.9 3.1 3.6 0 2-1.6 3.7-4.9 3.7-1.4 0-2.7-.4-3.4-.7l.6-2.3z"/></svg>`;
      case ProgrammingLanguage.typescript:
        return b2`<svg class="${this.cssClass}" aria-label="ts" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M15.6 11.8h-3.4V22H9.7V11.8H6.3V10h9.2v1.8zm7.7 7.1c0-.5-.2-.8-.5-1.1-.3-.3-.9-.5-1.7-.8-1.4-.4-2.5-.9-3.3-1.5-.7-.6-1.1-1.3-1.1-2.3 0-1 .4-1.8 1.3-2.4.8-.6 1.9-.9 3.2-.9 1.3 0 2.4.4 3.2 1.1.8.7 1.2 1.6 1.2 2.6h-2.3c0-.6-.2-1-.6-1.4-.4-.3-.9-.5-1.6-.5-.6 0-1.1.1-1.5.4-.4.3-.5.7-.5 1.1 0 .4.2.7.6 1 .4.3 1 .5 2 .8 1.3.4 2.3.9 3 1.5.7.6 1 1.4 1 2.4s-.4 1.9-1.2 2.4c-.8.6-1.9.9-3.2.9-1.3 0-2.5-.3-3.4-1s-1.5-1.6-1.4-2.9h2.4c0 .7.2 1.2.7 1.6.4.3 1.1.5 1.8.5s1.2-.1 1.5-.4c.2-.3.4-.7.4-1.1z"/></svg>`;
      case ProgrammingLanguage.scala:
        return b2`<svg class="${this.cssClass}" aria-label="scala" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M21.6 7v4.2c-.1.1-.1.2-.2.2-.3.3-.7.5-1.1.6-.9.3-1.9.5-2.8.7-1.6.3-3.1.5-4.7.7-.8.1-1.6.2-2.4.4V9.6c.1-.1.2-.1.4-.1 1.2-.2 2.5-.4 3.8-.5 1.9-.3 3.8-.5 5.6-1.1.5-.2 1.1-.4 1.4-.9zm0 5.6v4.2l-.2.2c-.5.4-1.1.6-1.6.8-.8.2-1.6.4-2.4.5-1 .2-1.9.3-2.9.5-1.4.2-2.7.3-4.1.6v-4.2c.1-.1.2-.1.3-.1 1.7-.2 3.4-.5 5.1-.7 1.4-.2 2.9-.5 4.3-.9.6-.2 1.1-.4 1.5-.9zM10.5 25h-.1v-4.2c.1-.1.2-.1.3-.1 1.2-.2 2.3-.3 3.5-.5 2-.3 3.9-.5 5.8-1.1.6-.2 1.2-.4 1.6-.9v4.2c-.1.2-.3.3-.5.5-.6.3-1.2.5-1.9.7-1.2.3-2.5.5-3.7.7-1.3.2-2.6.4-3.9.5-.4 0-.7.1-1.1.2z"/></svg>`;
      case ProgrammingLanguage.php:
        return b2`<svg class="${this.cssClass}" aria-label="php" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M12.7 19.7c-.1-.6-.4-1.1-1-1.3-.2-.1-.5-.3-.7-.4-.3-.1-.6-.2-.8-.3-.2-.1-.4 0-.6.2-.1.2 0 .4.1.5.1.2.2.3.4.5.2.3.4.5.7.8.2.3.4.5.3.9-.1.7-.4 1.4-.9 1.9-.1.1-.2.1-.2.1-.3 0-.7-.2-.9-.4-.3-.3-.2-.6.1-.8.1 0 .2-.1.2-.2.2-.2.3-.4.2-.7-.1-.1-.1-.2-.2-.3-.4-.4-.9-.8-1.4-1.2-1.3-1-1.9-2.2-2-3.6-.1-1.6.3-3.1 1.1-4.5.3-.5.7-1 1.3-1.3.4-.2.8-.3 1.2-.4 1.1-.3 2.3-.5 3.5-.3 1 .2 1.8.7 2.1 1.7.2.7.3 1.3.2 2-.1 1.4-1.2 2.6-2.5 3-.6.2-.9.1-1.2-.4-.2-.3-.5-.7-.7-1.1V14c0-.1-.1-.1-.1-.2.1.6.2 1.2.5 1.7.2.3.4.5.8.5 1.3.1 2.3-.3 3.1-1.3.8-1.1 1-2.4.8-3.8 0-.3-.1-.5-.2-.8 0-.2 0-.3.2-.4.1 0 .2 0 .2-.1 1-.2 2.1-.3 3.1-.2 1.2.1 2.3.4 3.3 1.1 1.6 1 2.6 2.5 3.1 4.3.1.3.1.5.1.8 0 .2-.1.2-.3.1-.2-.1-.3-.3-.4-.4-.1-.1-.2-.3-.3-.4-.1-.1-.2-.1-.2 0s-.1.2-.1.3c-.3 1-.7 1.9-1.4 2.6-.1.1-.2.3-.2.4 0 .4-.1.8 0 1.2.1.8.2 1.7.3 2.5.1.5-.1.7-.5.9-.3.1-.6.2-1 .2h-1.6c0-.6 0-1.2-.5-1.5.1-.4.2-.8.3-1.3.1-.4 0-.7-.2-1-.2-.3-.5-.3-.8-.2-.8.5-1.6.5-2.5.2-.4-.1-.7-.1-.9.3-.2.4-.3.8-.3 1.2 0 .5.1 1.1.2 1.6 0 .3 0 .4-.3.5-.7.2-1.4.2-2 .1h-.1c0-.6 0-1.2-.7-1.5.4-.4.4-1.1.3-1.7zm-4.1-2.3c.1-.1.2-.2.2-.4.1-.3-.2-.8-.5-.9-.2-.1-.3 0-.4.1-.3.3-.5.6-.8.9 0 .1-.1.1-.1.2-.1.2 0 .4.2.4.1 0 .3 0 .4.1.4 0 .7-.1 1-.4zm0-3.3c0-.2-.2-.4-.4-.4s-.5.2-.4.5c0 .2.2.4.5.4.1-.1.3-.3.3-.5z"/></svg>`;
      case ProgrammingLanguage.vue:
        return b2`<svg class="${this.cssClass}" aria-label="vue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1000"><path d="M600 495.9l159.1-275.4h-84.4L600 349.7l-74.6-129.2h-84.5z"/><path d="M793.7 220.5L600 555.9 406.3 220.5H277l323 559 323-559z"/></svg>`;
      case ProgrammingLanguage.gherkin:
        return b2`<svg class="${this.cssClass}" aria-label="gherkin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16.129,2a12.348,12.348,0,0,0-2.35,24.465V30c7.371-1.114,13.9-6.982,14.384-14.684a12.8,12.8,0,0,0-5.9-11.667c-.223-.132-.449-.262-.682-.377s-.481-.231-.729-.33c-.079-.033-.156-.063-.235-.094-.216-.08-.435-.17-.658-.236A12.188,12.188,0,0,0,16.129,2Z" style="fill:var(--mut-file-gherkin-color)"/><path d="M18.68,6.563a1.345,1.345,0,0,0-1.178.472,5.493,5.493,0,0,0-.518.9,2.9,2.9,0,0,0,.377,3.023A3.317,3.317,0,0,0,19.763,9,2.388,2.388,0,0,0,20,8,1.411,1.411,0,0,0,18.68,6.563Zm-5.488.071A1.441,1.441,0,0,0,11.85,8,2.388,2.388,0,0,0,12.085,9a3.427,3.427,0,0,0,2.473,1.96,3.141,3.141,0,0,0-.212-3.85,1.322,1.322,0,0,0-1.154-.472Zm-3.7,3.637a1.3,1.3,0,0,0-.73,2.338,5.663,5.663,0,0,0,.895.543,3.386,3.386,0,0,0,3.179-.307,3.492,3.492,0,0,0-2.049-2.338,2.69,2.69,0,0,0-1.06-.236,1.369,1.369,0,0,0-.236,0Zm11.611,4.582a3.44,3.44,0,0,0-1.955.567A3.492,3.492,0,0,0,21.2,17.758a2.69,2.69,0,0,0,1.06.236,1.329,1.329,0,0,0,.966-2.362,5.47,5.47,0,0,0-.895-.52,3.247,3.247,0,0,0-1.225-.26Zm-10.292.071a3.247,3.247,0,0,0-1.225.26,2.575,2.575,0,0,0-.895.543A1.34,1.34,0,0,0,9.73,18.065a2.426,2.426,0,0,0,1.06-.236,3.185,3.185,0,0,0,1.955-2.338,3.366,3.366,0,0,0-1.931-.567Zm3.815,2.314a3.317,3.317,0,0,0-2.4,1.96,2.286,2.286,0,0,0-.236.968,1.4,1.4,0,0,0,2.426.992,5.492,5.492,0,0,0,.518-.9,3.109,3.109,0,0,0-.306-3.023Zm2.8.071a3.141,3.141,0,0,0,.212,3.85,1.47,1.47,0,0,0,2.5-.9,2.388,2.388,0,0,0-.236-.992,3.427,3.427,0,0,0-2.473-1.96Z" style="fill:#fff"/></svg>`;
      case ProgrammingLanguage.svelte:
        return b2`<svg class="${this.cssClass}" aria-label="svelte" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path xmlns="http://www.w3.org/2000/svg" d="M26.47,5.7A8.973,8.973,0,0,0,14.677,3.246L7.96,7.4a7.461,7.461,0,0,0-3.481,5.009,7.686,7.686,0,0,0,.8,5.058,7.358,7.358,0,0,0-1.151,2.8,7.789,7.789,0,0,0,1.4,6.028,8.977,8.977,0,0,0,11.794,2.458L24.04,24.6a7.468,7.468,0,0,0,3.481-5.009,7.673,7.673,0,0,0-.8-5.062,7.348,7.348,0,0,0,1.152-2.8A7.785,7.785,0,0,0,26.47,5.7" style="fill:#ff3e00"/><path xmlns="http://www.w3.org/2000/svg" d="M14.022,26.64A5.413,5.413,0,0,1,8.3,24.581a4.678,4.678,0,0,1-.848-3.625,4.307,4.307,0,0,1,.159-.61l.127-.375.344.238a8.76,8.76,0,0,0,2.628,1.274l.245.073-.025.237a1.441,1.441,0,0,0,.271.968,1.63,1.63,0,0,0,1.743.636,1.512,1.512,0,0,0,.411-.175l6.7-4.154a1.366,1.366,0,0,0,.633-.909,1.407,1.407,0,0,0-.244-1.091,1.634,1.634,0,0,0-1.726-.622,1.509,1.509,0,0,0-.413.176l-2.572,1.584a4.934,4.934,0,0,1-1.364.582,5.415,5.415,0,0,1-5.727-2.06A4.678,4.678,0,0,1,7.811,13.1,4.507,4.507,0,0,1,9.9,10.09l6.708-4.154a4.932,4.932,0,0,1,1.364-.581A5.413,5.413,0,0,1,23.7,7.414a4.679,4.679,0,0,1,.848,3.625,4.272,4.272,0,0,1-.159.61l-.127.375-.344-.237a8.713,8.713,0,0,0-2.628-1.274l-.245-.074.025-.237a1.438,1.438,0,0,0-.272-.968,1.629,1.629,0,0,0-1.725-.622,1.484,1.484,0,0,0-.411.176l-6.722,4.14a1.353,1.353,0,0,0-.631.908,1.394,1.394,0,0,0,.244,1.092,1.634,1.634,0,0,0,1.726.621,1.538,1.538,0,0,0,.413-.175l2.562-1.585a4.9,4.9,0,0,1,1.364-.581,5.417,5.417,0,0,1,5.728,2.059,4.681,4.681,0,0,1,.843,3.625A4.5,4.5,0,0,1,22.1,21.905l-6.707,4.154a4.9,4.9,0,0,1-1.364.581" style="fill:#fff"/></svg>`;
    }
  }
};
__publicField$2(MutationTestReportFileIconComponent, "styles", [r$7(style)]);
__decorateClass$2([
  n$2({ attribute: "file-name" })
], MutationTestReportFileIconComponent.prototype, "fileName", 2);
__decorateClass$2([
  n$2({ attribute: "file", type: Boolean })
], MutationTestReportFileIconComponent.prototype, "isFile", 2);
MutationTestReportFileIconComponent = __decorateClass$2([
  t$2("mte-file-icon")
], MutationTestReportFileIconComponent);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let MutationTestReportThemeSwitchComponent2 = class extends s$2 {
  render() {
    return x`<span class="cursor-help underline decoration-dotted" title="${this.title}"><slot></slot></span>`;
  }
};
__publicField$1(MutationTestReportThemeSwitchComponent2, "styles", [tailwind]);
__decorateClass$1([
  n$2({ attribute: true })
], MutationTestReportThemeSwitchComponent2.prototype, "title", 2);
MutationTestReportThemeSwitchComponent2 = __decorateClass$1([
  t$2("mte-tooltip")
], MutationTestReportThemeSwitchComponent2);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _observer, _renderSmallParts, renderSmallParts_fn, _renderSmallPart, renderSmallPart_fn, _renderParts, renderParts_fn, _renderPart, renderPart_fn, _getMetrics, getMetrics_fn, _colorFromMetric, colorFromMetric_fn, _calculatePercentage, calculatePercentage_fn;
let ResultStatusBar = class extends s$2 {
  constructor() {
    super();
    __privateAdd(this, _renderSmallParts);
    __privateAdd(this, _renderSmallPart);
    __privateAdd(this, _renderParts);
    __privateAdd(this, _renderPart);
    __privateAdd(this, _getMetrics);
    __privateAdd(this, _colorFromMetric);
    __privateAdd(this, _calculatePercentage);
    __privateAdd(this, _observer, void 0);
    this.detected = 0;
    this.noCoverage = 0;
    this.pending = 0;
    this.survived = 0;
    this.total = 0;
    this.shouldBeSmall = false;
  }
  connectedCallback() {
    super.connectedCallback();
    __privateSet(this, _observer, new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.shouldBeSmall = false;
      } else {
        this.shouldBeSmall = true;
      }
      this.requestUpdate();
    }));
    __privateGet(this, _observer).observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    __privateGet(this, _observer)?.disconnect();
  }
  render() {
    return x`
      ${__privateMethod(this, _renderSmallParts, renderSmallParts_fn).call(this)}
      <div class="my-4 rounded-md border border-gray-200 bg-white transition-all">
        <div class="relative">
          <div class="parts flex h-8 w-full overflow-hidden rounded bg-gray-200">${__privateMethod(this, _renderParts, renderParts_fn).call(this)}</div>
        </div>
      </div>
    `;
  }
};
_observer = /* @__PURE__ */ new WeakMap();
_renderSmallParts = /* @__PURE__ */ new WeakSet();
renderSmallParts_fn = function() {
  return x`<div
      class="${this.shouldBeSmall ? "opacity-1" : "opacity-0"} pointer-events-none fixed left-0 top-0 z-20 flex w-full justify-center transition-all"
    >
      <div class="container w-full bg-white py-2">
        <div class="flex h-2 overflow-hidden rounded bg-gray-200">${__privateMethod(this, _getMetrics, getMetrics_fn).call(this).map((metric) => __privateMethod(this, _renderSmallPart, renderSmallPart_fn).call(this, metric))}</div>
      </div>
    </div>`;
};
_renderSmallPart = /* @__PURE__ */ new WeakSet();
renderSmallPart_fn = function(metric) {
  return x`<div
      class="${__privateMethod(this, _colorFromMetric, colorFromMetric_fn).call(this, metric.type)} z-20 h-2 transition-all"
      style="width: ${__privateMethod(this, _calculatePercentage, calculatePercentage_fn).call(this, metric.amount)}%"
    ></div>`;
};
_renderParts = /* @__PURE__ */ new WeakSet();
renderParts_fn = function() {
  return x`${__privateMethod(this, _getMetrics, getMetrics_fn).call(this).map((metric) => __privateMethod(this, _renderPart, renderPart_fn).call(this, metric))}`;
};
_renderPart = /* @__PURE__ */ new WeakSet();
renderPart_fn = function(metric) {
  return x`<div
      title="${metric.tooltip}"
      style="width: ${__privateMethod(this, _calculatePercentage, calculatePercentage_fn).call(this, metric.amount)}%"
      class="${__privateMethod(this, _colorFromMetric, colorFromMetric_fn).call(this, metric.type)} ${metric.amount === 0 ? "opacity-0" : ""} relative flex h-8 items-center overflow-hidden transition-all"
    >
      <span class="ms-3 font-bold text-gray-800">${metric.amount}</span>
    </div>`;
};
_getMetrics = /* @__PURE__ */ new WeakSet();
getMetrics_fn = function() {
  return [
    { type: "detected", amount: this.detected, tooltip: `killed + timeout (${this.detected})` },
    { type: "survived", amount: this.survived, tooltip: `survived (${this.survived})` },
    { type: "no coverage", amount: this.noCoverage, tooltip: `no coverage (${this.noCoverage})` },
    { type: "pending", amount: this.pending, tooltip: `pending` }
  ];
};
_colorFromMetric = /* @__PURE__ */ new WeakSet();
colorFromMetric_fn = function(metric) {
  switch (metric) {
    case "detected":
      return "bg-green-600";
    case "survived":
      return "bg-red-600";
    case "no coverage":
      return "bg-yellow-600";
    default:
      return "bg-gray-200";
  }
};
_calculatePercentage = /* @__PURE__ */ new WeakSet();
calculatePercentage_fn = function(metric) {
  return this.total !== 0 ? 100 * metric / this.total : 0;
};
__publicField(ResultStatusBar, "styles", [tailwind]);
__decorateClass([
  n$2({ attribute: false })
], ResultStatusBar.prototype, "detected", 2);
__decorateClass([
  n$2({ attribute: false })
], ResultStatusBar.prototype, "noCoverage", 2);
__decorateClass([
  n$2({ attribute: false })
], ResultStatusBar.prototype, "pending", 2);
__decorateClass([
  n$2({ attribute: false })
], ResultStatusBar.prototype, "survived", 2);
__decorateClass([
  n$2({ attribute: false })
], ResultStatusBar.prototype, "total", 2);
__decorateClass([
  r$2()
], ResultStatusBar.prototype, "shouldBeSmall", 2);
ResultStatusBar = __decorateClass([
  t$2("mte-result-status-bar")
], ResultStatusBar);
export {
  MutationTestReportAppComponent
};
