import '@astrojs/internal-helpers/path';
import { A as AstroError, c as InvalidImageService, d as ExpectedImageOptions, E as ExpectedImage, e as createAstro, f as createComponent, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderComponent, u as unescapeHTML, j as renderHead, k as renderSlot, F as Fragment, l as mergeSlots } from '../astro_ZFRm7wLK.mjs';
import 'cssesc';
/* empty css                          */
import { storyblokInit, apiPlugin } from '@storyblok/js';
import 'kleur/colors';
import { i as isESMImportedImage, a as isLocalService, b as isRemoteImage, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_WqIjNfQY.mjs';
import 'clsx';

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_WqIjNfQY.mjs'
    ).then(n => n.s).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  const originalPath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : resolvedOptions.src;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalPath);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalPath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$m = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "/home/nicolasseine/Code/site-estelle/node_modules/astro/components/Image.astro", void 0);

const $$Astro$l = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionaAttributes = {};
  if (props.sizes) {
    sourceAdditionaAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionaAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "/home/nicolasseine/Code/site-estelle/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					new URL("file:///home/nicolasseine/Code/site-estelle/dist/");
					const getImage = async (options) => await getImage$1(options, imageConfig);

const { storyblokApi } = storyblokInit({
            accessToken: "3x4DC77NUWhqwmHizLi7ngtt",
            use: [apiPlugin],
            apiOptions: undefined,
          });
          const storyblokApiInstance = storyblokApi;

globalThis.storyblokApiInstance = storyblokApiInstance;

var P = Object.defineProperty, _ = (r, t, e) => t in r ? P(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e, p = (r, t, e) => (_(r, typeof t != "symbol" ? t + "" : t, e), e);
class z {
  constructor() {
    p(this, "isCDNUrl", (t = "") => t.indexOf("/cdn/") > -1), p(this, "getOptionsPage", (t, e = 25, o = 1) => ({
      ...t,
      per_page: e,
      page: o
    })), p(this, "delay", (t) => new Promise((e) => setTimeout(e, t))), p(this, "arrayFrom", (t = 0, e) => [...Array(t)].map(e)), p(this, "range", (t = 0, e = t) => {
      const o = Math.abs(e - t) || 0, s = t < e ? 1 : -1;
      return this.arrayFrom(o, (a, n) => n * s + t);
    }), p(this, "asyncMap", async (t, e) => Promise.all(t.map(e))), p(this, "flatMap", (t = [], e) => t.map(e).reduce((o, s) => [...o, ...s], [])), p(this, "escapeHTML", function(t) {
      const e = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }, o = /[&<>"']/g, s = RegExp(o.source);
      return t && s.test(t) ? t.replace(o, (a) => e[a]) : t;
    });
  }
  /**
   * @method stringify
   * @param  {Object} params
   * @param  {String} prefix
   * @param  {Boolean} isArray
   * @return {String} Stringified object
   */
  stringify(t, e, o) {
    const s = [];
    for (const a in t) {
      if (!Object.prototype.hasOwnProperty.call(t, a))
        continue;
      const n = t[a], c = o ? "" : encodeURIComponent(a);
      let l;
      typeof n == "object" ? l = this.stringify(
        n,
        e ? e + encodeURIComponent("[" + c + "]") : c,
        Array.isArray(n)
      ) : l = (e ? e + encodeURIComponent("[" + c + "]") : c) + "=" + encodeURIComponent(n), s.push(l);
    }
    return s.join("&");
  }
  /**
   * @method getRegionURL
   * @param  {String} regionCode region code, could be eu, us, cn, ap or ca
   * @return {String} The base URL of the region
   */
  getRegionURL(t) {
    const e = "api.storyblok.com", o = "api-us.storyblok.com", s = "app.storyblokchina.cn", a = "api-ap.storyblok.com", n = "api-ca.storyblok.com";
    switch (t) {
      case "us":
        return o;
      case "cn":
        return s;
      case "ap":
        return a;
      case "ca":
        return n;
      default:
        return e;
    }
  }
}
const U = function(r, t) {
  const e = {};
  for (const o in r) {
    const s = r[o];
    t.indexOf(o) > -1 && s !== null && (e[o] = s);
  }
  return e;
}, D = (r) => r === "email", B = () => ({
  singleTag: "hr"
}), q = () => ({
  tag: "blockquote"
}), F = () => ({
  tag: "ul"
}), J = (r) => ({
  tag: [
    "pre",
    {
      tag: "code",
      attrs: r.attrs
    }
  ]
}), K = () => ({
  singleTag: "br"
}), V = (r) => ({
  tag: `h${r.attrs.level}`
}), H = (r) => ({
  singleTag: [
    {
      tag: "img",
      attrs: U(r.attrs, ["src", "alt", "title"])
    }
  ]
}), G = () => ({
  tag: "li"
}), W = () => ({
  tag: "ol"
}), Y = () => ({
  tag: "p"
}), Q = (r) => ({
  tag: [
    {
      tag: "span",
      attrs: {
        "data-type": "emoji",
        "data-name": r.attrs.name,
        emoji: r.attrs.emoji
      }
    }
  ]
}), X = () => ({
  tag: "b"
}), Z = () => ({
  tag: "s"
}), ee = () => ({
  tag: "u"
}), te = () => ({
  tag: "strong"
}), re = () => ({
  tag: "code"
}), oe = () => ({
  tag: "i"
}), se = (r) => {
  if (!r.attrs)
    return {
      tag: ""
    };
  const t = new z().escapeHTML, e = { ...r.attrs }, { linktype: o = "url" } = r.attrs;
  if (delete e.linktype, e.href && (e.href = t(r.attrs.href || "")), D(o) && (e.href = `mailto:${e.href}`), e.anchor && (e.href = `${e.href}#${e.anchor}`, delete e.anchor), e.custom) {
    for (const s in e.custom)
      e[s] = e.custom[s];
    delete e.custom;
  }
  return {
    tag: [
      {
        tag: "a",
        attrs: e
      }
    ]
  };
}, ae = (r) => ({
  tag: [
    {
      tag: "span",
      attrs: r.attrs
    }
  ]
}), ne = () => ({
  tag: "sub"
}), le = () => ({
  tag: "sup"
}), ie = (r) => ({
  tag: [
    {
      tag: "span",
      attrs: r.attrs
    }
  ]
}), ce = (r) => {
  var t;
  return (t = r.attrs) != null && t.color ? {
    tag: [
      {
        tag: "span",
        attrs: {
          style: `background-color:${r.attrs.color};`
        }
      }
    ]
  } : {
    tag: ""
  };
}, ge = (r) => {
  var t;
  return (t = r.attrs) != null && t.color ? {
    tag: [
      {
        tag: "span",
        attrs: {
          style: `color:${r.attrs.color}`
        }
      }
    ]
  } : {
    tag: ""
  };
}, ue = {
  nodes: {
    horizontal_rule: B,
    blockquote: q,
    bullet_list: F,
    code_block: J,
    hard_break: K,
    heading: V,
    image: H,
    list_item: G,
    ordered_list: W,
    paragraph: Y,
    emoji: Q
  },
  marks: {
    bold: X,
    strike: Z,
    underline: ee,
    strong: te,
    code: re,
    italic: oe,
    link: se,
    styled: ae,
    subscript: ne,
    superscript: le,
    anchor: ie,
    highlight: ce,
    textStyle: ge
  }
}, pe = function(r) {
  const t = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }, e = /[&<>"']/g, o = RegExp(e.source);
  return r && o.test(r) ? r.replace(e, (s) => t[s]) : r;
};
class fe {
  constructor(t) {
    p(this, "marks"), p(this, "nodes"), t || (t = ue), this.marks = t.marks || [], this.nodes = t.nodes || [];
  }
  addNode(t, e) {
    this.nodes[t] = e;
  }
  addMark(t, e) {
    this.marks[t] = e;
  }
  render(t, e = { optimizeImages: !1 }) {
    if (t && t.content && Array.isArray(t.content)) {
      let o = "";
      return t.content.forEach((s) => {
        o += this.renderNode(s);
      }), e.optimizeImages ? this.optimizeImages(o, e.optimizeImages) : o;
    }
    return console.warn(
      `The render method must receive an Object with a "content" field.
			The "content" field must be an array of nodes as the type ISbRichtext.
			ISbRichtext:
				content?: ISbRichtext[]
				marks?: ISbRichtext[]
				attrs?: any
				text?: string
				type: string
				
				Example:
				{
					content: [
						{
							content: [
								{
									text: 'Hello World',
									type: 'text'
								}
							],
							type: 'paragraph'
						}
					],
					type: 'doc'
				}`
    ), "";
  }
  optimizeImages(t, e) {
    let o = 0, s = 0, a = "", n = "";
    typeof e != "boolean" && (typeof e.width == "number" && e.width > 0 && (a += `width="${e.width}" `, o = e.width), typeof e.height == "number" && e.height > 0 && (a += `height="${e.height}" `, s = e.height), (e.loading === "lazy" || e.loading === "eager") && (a += `loading="${e.loading}" `), typeof e.class == "string" && e.class.length > 0 && (a += `class="${e.class}" `), e.filters && (typeof e.filters.blur == "number" && e.filters.blur >= 0 && e.filters.blur <= 100 && (n += `:blur(${e.filters.blur})`), typeof e.filters.brightness == "number" && e.filters.brightness >= -100 && e.filters.brightness <= 100 && (n += `:brightness(${e.filters.brightness})`), e.filters.fill && (e.filters.fill.match(/[0-9A-Fa-f]{6}/g) || e.filters.fill === "transparent") && (n += `:fill(${e.filters.fill})`), e.filters.format && ["webp", "png", "jpeg"].includes(e.filters.format) && (n += `:format(${e.filters.format})`), typeof e.filters.grayscale == "boolean" && e.filters.grayscale && (n += ":grayscale()"), typeof e.filters.quality == "number" && e.filters.quality >= 0 && e.filters.quality <= 100 && (n += `:quality(${e.filters.quality})`), e.filters.rotate && [90, 180, 270].includes(e.filters.rotate) && (n += `:rotate(${e.filters.rotate})`), n.length > 0 && (n = "/filters" + n))), a.length > 0 && (t = t.replace(/<img/g, `<img ${a.trim()}`));
    const c = o > 0 || s > 0 || n.length > 0 ? `${o}x${s}${n}` : "";
    return t = t.replace(
      /a.storyblok.com\/f\/(\d+)\/([^.]+)\.(gif|jpg|jpeg|png|tif|tiff|bmp)/g,
      `a.storyblok.com/f/$1/$2.$3/m/${c}`
    ), typeof e != "boolean" && (e.sizes || e.srcset) && (t = t.replace(/<img.*?src=["|'](.*?)["|']/g, (l) => {
      var i, g;
      const f = l.match(
        /a.storyblok.com\/f\/(\d+)\/([^.]+)\.(gif|jpg|jpeg|png|tif|tiff|bmp)/g
      );
      if (f && f.length > 0) {
        const d = {
          srcset: (i = e.srcset) == null ? void 0 : i.map((u) => {
            if (typeof u == "number")
              return `//${f}/m/${u}x0${n} ${u}w`;
            if (typeof u == "object" && u.length === 2) {
              let b = 0, y = 0;
              return typeof u[0] == "number" && (b = u[0]), typeof u[1] == "number" && (y = u[1]), `//${f}/m/${b}x${y}${n} ${b}w`;
            }
          }).join(", "),
          sizes: (g = e.sizes) == null ? void 0 : g.map((u) => u).join(", ")
        };
        let h = "";
        return d.srcset && (h += `srcset="${d.srcset}" `), d.sizes && (h += `sizes="${d.sizes}" `), l.replace(/<img/g, `<img ${h.trim()}`);
      }
      return l;
    })), t;
  }
  renderNode(t) {
    const e = [];
    t.marks && t.marks.forEach((s) => {
      const a = this.getMatchingMark(s);
      a && a.tag !== "" && e.push(this.renderOpeningTag(a.tag));
    });
    const o = this.getMatchingNode(t);
    return o && o.tag && e.push(this.renderOpeningTag(o.tag)), t.content ? t.content.forEach((s) => {
      e.push(this.renderNode(s));
    }) : t.text ? e.push(pe(t.text)) : o && o.singleTag ? e.push(this.renderTag(o.singleTag, " /")) : o && o.html ? e.push(o.html) : t.type === "emoji" && e.push(this.renderEmoji(t)), o && o.tag && e.push(this.renderClosingTag(o.tag)), t.marks && t.marks.slice(0).reverse().forEach((s) => {
      const a = this.getMatchingMark(s);
      a && a.tag !== "" && e.push(this.renderClosingTag(a.tag));
    }), e.join("");
  }
  renderTag(t, e) {
    return t.constructor === String ? `<${t}${e}>` : t.map((o) => {
      if (o.constructor === String)
        return `<${o}${e}>`;
      {
        let s = `<${o.tag}`;
        if (o.attrs)
          for (const a in o.attrs) {
            const n = o.attrs[a];
            n !== null && (s += ` ${a}="${n}"`);
          }
        return `${s}${e}>`;
      }
    }).join("");
  }
  renderOpeningTag(t) {
    return this.renderTag(t, "");
  }
  renderClosingTag(t) {
    return t.constructor === String ? `</${t}>` : t.slice(0).reverse().map((e) => e.constructor === String ? `</${e}>` : `</${e.tag}>`).join("");
  }
  getMatchingNode(t) {
    const e = this.nodes[t.type];
    if (typeof e == "function")
      return e(t);
  }
  getMatchingMark(t) {
    const e = this.marks[t.type];
    if (typeof e == "function")
      return e(t);
  }
  renderEmoji(t) {
    if (t.attrs.emoji)
      return t.attrs.emoji;
    const e = [
      {
        tag: "img",
        attrs: {
          src: t.attrs.fallbackImage,
          draggable: "false",
          loading: "lazy",
          align: "absmiddle"
        }
      }
    ];
    return this.renderTag(e, " /");
  }
}
const ke = (r) => {
  if (typeof r != "object" || typeof r._editable > "u")
    return {};
  try {
    const t = JSON.parse(
      r._editable.replace(/^<!--#storyblok#/, "").replace(/-->$/, "")
    );
    return t ? {
      "data-blok-c": JSON.stringify(t),
      "data-blok-uid": t.id + "-" + t.uid
    } : {};
  } catch {
    return {};
  }
};
let de;
const be = (r, t) => {
  r.addNode("blok", (e) => {
    let o = "";
    return e.attrs.body.forEach((s) => {
      o += t(s.component, s);
    }), {
      html: o
    };
  });
}, me = (r) => !r || !(r != null && r.content.some((t) => t.content || t.type === "blok" || t.type === "horizontal_rule")), ye = (r, t, e) => {
  let o = e || de;
  if (!o) {
    console.error(
      "Please initialize the Storyblok SDK before calling the renderRichText function"
    );
    return;
  }
  return me(r) ? "" : (t && (o = new fe(t.schema), t.resolver && be(o, t.resolver)), o.render(r));
};
function ve() {
  return globalThis.storyblokApiInstance || console.error("storyblokApiInstance has not been initialized correctly"), globalThis.storyblokApiInstance;
}
function Ie(r, t) {
  const e = globalThis.storyblokApiInstance.richTextResolver;
  if (!e) {
    console.error(
      "Please initialize the Storyblok SDK before calling the renderRichText function"
    );
    return;
  }
  return ye(r, t, e);
}

const $$Astro$k = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$PageTitle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$PageTitle;
  const { title, tags = "", altLayout = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="pb-6 border-b-2 text-neutral-900 border-neutral-900 flex flex-col items-center gap-3 w-10/12 max-w-xl mb-12 lg:mb-24" ,> <h3${addAttribute([
    "uppercase text-2xl md:text-3xl font-extrabold  w-fit not-prose text-center"
  ], "class:list")}> ${title} </h3> <p class="font-serif capitalize text-neutral-00 italic md:text-lg">${tags}</p> </div>`;
}, "/home/nicolasseine/Code/site-estelle/src/components/PageTitle.astro", void 0);

const $$Astro$j = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="w-full h-fit flex flex-col justify-center items-start sm:items-center bg-primary px-6 py-6 mx-0"> <div class="flex flex-row items-center gap-6"> <div class="leading-tight"> <a href="/contact" class="block mb-3"> <p class="text-2xl text-white font-bold font-sans uppercase">
Estelle Chauvard
</p> <p class="text-md text-white font-light italic font-serif">
Autrice / Vidéaste / Graphiste
</p> </a> </div> <ul class="flex flex-row gap-3"> <li> <a href="https://www.linkedin.com/in/estelle-chauvard-53030895/?originalSubdomain=fr"> <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 fill-white"><title>LinkedIn</title> <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path> </svg> </a> </li> <!-- <li>
        <a href="">
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 fill-white"
            ><title>Facebook</title><path
              d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
            ></path>
          </svg>
        </a>
      </li> --> </ul> </div> <div class="leading-tighter flex-col sm:flex-row flex"> <p class="text-xs text-white">
© Estelle Chauvard ${(/* @__PURE__ */ new Date()).getFullYear()} - Tous droits réservés
<span class="hidden sm:inline"> - </span> </p> <p class="text-xs text-white">
Un site réalisé par <a href="https://www.nicolasseine.com">Nicolas Seine</a> </p> </div> </footer>`;
}, "/home/nicolasseine/Code/site-estelle/src/components/Footer.astro", void 0);

const lapin = new Proxy({"src":"/_astro/lapin-nez-web.Pt_TrrqK.webp","width":84,"height":179,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/nicolasseine/Code/site-estelle/src/assets/lapin-nez-web.webp";
							}
							
							return target[name];
						}
					});

const $$Astro$i = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$NavLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$NavLink;
  const { text, link } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute([
    "hover:text-primary text-neutral-900 ",
    { "text-primary": Astro2.url.pathname === link }
  ], "class:list")}${addAttribute(link, "href")}>${text} </a>`;
}, "/home/nicolasseine/Code/site-estelle/src/components/NavLink.astro", void 0);

const $$Astro$h = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header class="pt-20 mx-auto flex flex-col items-center"> <a href="/" class="hover:opacity-70 transition-opacity duration-500 max-w-[84px] w-1/12"> ${renderComponent($$result, "Image", $$Image, { "alt": "une image de lapin dessin\xE9 par Estelle Chauvard", "loading": "eager", "src": lapin })} </a> <h1 class="text-4xl md:text-7xl uppercase font-extrabold text-neutral-800 pt-6 tracking-wide"> <a href="/" class="flex gap-2 md:flex-col lg:gap-4 items-center lg:flex-row"> <span>estelle</span> <span>chauvard</span></a> </h1> <h2 class="font-serif italic text-stone-400 pt-4">
Autrice / Vidéaste / Graphiste
</h2> <nav class="flex gap-6 font-extrabold uppercase pt-12"> ${renderComponent($$result, "NavLink", $$NavLink, { "text": "\xE0 propos", "link": "/about" })} <!-- <NavLink text="cv" link="/cv" /> --> ${renderComponent($$result, "NavLink", $$NavLink, { "text": "portfolio", "link": "/" })} ${renderComponent($$result, "NavLink", $$NavLink, { "text": "contact", "link": "/contact" })} </nav> </header>`;
}, "/home/nicolasseine/Code/site-estelle/src/components/Header.astro", void 0);

const $$Astro$g = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$Modal = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Modal;
  return renderTemplate`${maybeRenderHead()}<div id="modal" class="fixed top-0 left-0 overflow-visible bg-black/70 backdrop-blur-md h-screen w-screen hidden flex items-center justify-center group transition-all duration-200"> <span class="fixed z-50 top-6 right-8 text-white text-5xl font-bold hover:text-primary hover:cursor-pointer" onclick="hideModal">&times;</span> <!-- <slot name="modal-content" slot="modal-content" /> --> </div>`;
}, "/home/nicolasseine/Code/site-estelle/src/components/Modal.astro", void 0);

const $$Astro$f = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$OpenGraphArticleTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$OpenGraphArticleTags;
  const { publishedTime, modifiedTime, expirationTime, authors, section, tags } = Astro2.props.openGraph.article;
  return renderTemplate`${publishedTime ? renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>` : null}${modifiedTime ? renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>` : null}${expirationTime ? renderTemplate`<meta property="article:expiration_time"${addAttribute(expirationTime, "content")}>` : null}${authors ? authors.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`) : null}${section ? renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>` : null}${tags ? tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`) : null}`;
}, "/home/nicolasseine/Code/site-estelle/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro", void 0);

const $$Astro$e = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$OpenGraphBasicTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$OpenGraphBasicTags;
  const { openGraph } = Astro2.props;
  return renderTemplate`<meta property="og:title"${addAttribute(openGraph.basic.title, "content")}><meta property="og:type"${addAttribute(openGraph.basic.type, "content")}><meta property="og:image"${addAttribute(openGraph.basic.image, "content")}><meta property="og:url"${addAttribute(openGraph.basic.url || Astro2.url.href, "content")}>`;
}, "/home/nicolasseine/Code/site-estelle/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro", void 0);

const $$Astro$d = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$OpenGraphImageTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$OpenGraphImageTags;
  const { image } = Astro2.props.openGraph.basic;
  const { secureUrl, type, width, height, alt } = Astro2.props.openGraph.image;
  return renderTemplate`<meta property="og:image:url"${addAttribute(image, "content")}>${secureUrl ? renderTemplate`<meta property="og:image:secure_url"${addAttribute(secureUrl, "content")}>` : null}${type ? renderTemplate`<meta property="og:image:type"${addAttribute(type, "content")}>` : null}${width ? renderTemplate`<meta property="og:image:width"${addAttribute(width, "content")}>` : null}${height ? renderTemplate`<meta property="og:image:height"${addAttribute(height, "content")}>` : null}${alt ? renderTemplate`<meta property="og:image:alt"${addAttribute(alt, "content")}>` : null}`;
}, "/home/nicolasseine/Code/site-estelle/node_modules/astro-seo/src/components/OpenGraphImageTags.astro", void 0);

const $$Astro$c = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$OpenGraphOptionalTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$OpenGraphOptionalTags;
  const { optional } = Astro2.props.openGraph;
  return renderTemplate`${optional.audio ? renderTemplate`<meta property="og:audio"${addAttribute(optional.audio, "content")}>` : null}${optional.description ? renderTemplate`<meta property="og:description"${addAttribute(optional.description, "content")}>` : null}${optional.determiner ? renderTemplate`<meta property="og:determiner"${addAttribute(optional.determiner, "content")}>` : null}${optional.locale ? renderTemplate`<meta property="og:locale"${addAttribute(optional.locale, "content")}>` : null}${optional.localeAlternate?.map((locale) => renderTemplate`<meta property="og:locale:alternate"${addAttribute(locale, "content")}>`)}${optional.siteName ? renderTemplate`<meta property="og:site_name"${addAttribute(optional.siteName, "content")}>` : null}${optional.video ? renderTemplate`<meta property="og:video"${addAttribute(optional.video, "content")}>` : null}`;
}, "/home/nicolasseine/Code/site-estelle/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro", void 0);

const $$Astro$b = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$ExtendedTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$ExtendedTags;
  const { props } = Astro2;
  return renderTemplate`${props.extend.link?.map((attributes) => renderTemplate`<link${spreadAttributes(attributes)}>`)}${props.extend.meta?.map(({ content, httpEquiv, media, name, property }) => renderTemplate`<meta${addAttribute(content, "content")}${addAttribute(httpEquiv, "http-equiv")}${addAttribute(media, "media")}${addAttribute(name, "name")}${addAttribute(property, "property")}>`)}`;
}, "/home/nicolasseine/Code/site-estelle/node_modules/astro-seo/src/components/ExtendedTags.astro", void 0);

const $$Astro$a = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$TwitterTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$TwitterTags;
  const { card, site, title, creator, description, image, imageAlt } = Astro2.props.twitter;
  return renderTemplate`${card ? renderTemplate`<meta name="twitter:card"${addAttribute(card, "content")}>` : null}${site ? renderTemplate`<meta name="twitter:site"${addAttribute(site, "content")}>` : null}${title ? renderTemplate`<meta name="twitter:title"${addAttribute(title, "content")}>` : null}${image ? renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>` : null}${imageAlt ? renderTemplate`<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>` : null}${description ? renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>` : null}${creator ? renderTemplate`<meta name="twitter:creator"${addAttribute(creator, "content")}>` : null}`;
}, "/home/nicolasseine/Code/site-estelle/node_modules/astro-seo/src/components/TwitterTags.astro", void 0);

const $$Astro$9 = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$LanguageAlternatesTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$LanguageAlternatesTags;
  const { languageAlternates } = Astro2.props;
  return renderTemplate`${languageAlternates.map((alternate) => renderTemplate`<link rel="alternate"${addAttribute(alternate.hrefLang, "hreflang")}${addAttribute(alternate.href, "href")}>`)}`;
}, "/home/nicolasseine/Code/site-estelle/node_modules/astro-seo/src/components/LanguageAlternatesTags.astro", void 0);

const $$Astro$8 = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$SEO = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$SEO;
  Astro2.props.surpressWarnings = true;
  function validateProps(props) {
    if (props.openGraph) {
      if (!props.openGraph.basic || (props.openGraph.basic.title ?? void 0) == void 0 || (props.openGraph.basic.type ?? void 0) == void 0 || (props.openGraph.basic.image ?? void 0) == void 0) {
        throw new Error(
          "If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!"
        );
      }
    }
    if (props.title && props.openGraph?.basic.title) {
      if (props.title == props.openGraph.basic.title && !props.surpressWarnings) {
        console.warn(
          "WARNING(astro-seo): You passed the same value to `title` and `openGraph.optional.title`. This is most likely not what you want. See docs for more."
        );
      }
    }
    if (props.openGraph?.basic?.image && !props.openGraph?.image?.alt && !props.surpressWarnings) {
      console.warn(
        "WARNING(astro-seo): You defined `openGraph.basic.image`, but didn't define `openGraph.image.alt`. This is stongly discouraged.'"
      );
    }
  }
  validateProps(Astro2.props);
  let updatedTitle = "";
  if (Astro2.props.title) {
    updatedTitle = Astro2.props.title;
    if (Astro2.props.titleTemplate) {
      updatedTitle = Astro2.props.titleTemplate.replace(/%s/g, updatedTitle);
    }
  } else if (Astro2.props.titleDefault) {
    updatedTitle = Astro2.props.titleDefault;
  }
  return renderTemplate`${updatedTitle ? renderTemplate`<title>${unescapeHTML(updatedTitle)}</title>` : null}${Astro2.props.charset ? renderTemplate`<meta${addAttribute(Astro2.props.charset, "charset")}>` : null}<link rel="canonical"${addAttribute(Astro2.props.canonical || Astro2.url.href, "href")}>${Astro2.props.description ? renderTemplate`<meta name="description"${addAttribute(Astro2.props.description, "content")}>` : null}<meta name="robots"${addAttribute(`${Astro2.props.noindex ? "noindex" : "index"}, ${Astro2.props.nofollow ? "nofollow" : "follow"}`, "content")}>${Astro2.props.openGraph && renderTemplate`${renderComponent($$result, "OpenGraphBasicTags", $$OpenGraphBasicTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.optional && renderTemplate`${renderComponent($$result, "OpenGraphOptionalTags", $$OpenGraphOptionalTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.image && renderTemplate`${renderComponent($$result, "OpenGraphImageTags", $$OpenGraphImageTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.article && renderTemplate`${renderComponent($$result, "OpenGraphArticleTags", $$OpenGraphArticleTags, { ...Astro2.props })}`}${Astro2.props.twitter && renderTemplate`${renderComponent($$result, "TwitterTags", $$TwitterTags, { ...Astro2.props })}`}${Astro2.props.extend && renderTemplate`${renderComponent($$result, "ExtendedTags", $$ExtendedTags, { ...Astro2.props })}`}${Astro2.props.languageAlternates && renderTemplate`${renderComponent($$result, "LanguageAlternatesTags", $$LanguageAlternatesTags, { ...Astro2.props })}`}`;
}, "/home/nicolasseine/Code/site-estelle/node_modules/astro-seo/src/SEO.astro", void 0);

const $$Astro$7 = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/home/nicolasseine/Code/site-estelle/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$6 = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="fr"> <head>${renderComponent($$result, "SEO", $$SEO, { "title": title, "titleDefault": "Estelle Chauvard : Autrice / Vid\xE9aste / Graphiste", "description": "Le portfolio d'Estelle Chauvard, autrice, vid\xE9aste et graphiste \xE0 Paris, \xE0 l'origine du travail sur la m\xE9moire de Danielle Dixe \xE0 Lagrasse", "canonical": "https://estelle-chauvard.com", "openGraph": {
    basic: {
      title: title + " - Portfolio d'Estelle Chauvard, autrice, vid\xE9aste et graphiste",
      image: "../assets/lapin-nez-web.webp",
      type: "website",
      url: "https://estelle-chauvard.com/"
    }
  } })}<meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width" initial-scale="1"><link rel="icon" type="image/svg+xml" href="/favicon.webp"><link rel="sitemap" href="/sitemap-index.xml"><meta name="generator"${addAttribute(Astro2.generator, "content")}>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body class="bg-neutral-800 lg:p-6"> <div class="bg-stone-50 h-full min-h-[calc(100vh-48px)] flex flex-col items-center"> ${renderSlot($$result, $$slots["default"])} </div> </body></html>`;
}, "/home/nicolasseine/Code/site-estelle/src/layouts/Layout.astro", void 0);

const $$Astro$5 = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$PagesLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$PagesLayout;
  const { title } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="w-full"> <section class="my-24 md:my-32 mx-auto flex flex-col items-center"> ${renderSlot($$result2, $$slots["default"])} </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ${renderComponent($$result2, "Modal", $$Modal, {})} ` })}`;
}, "/home/nicolasseine/Code/site-estelle/src/layouts/PagesLayout.astro", void 0);

const $$Astro$4 = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$ClickableImage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ClickableImage;
  const { picture, alt } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a rel="prefetch"${addAttribute(picture.name.toLowerCase().includes("animation") ? picture.filename : `${picture.filename}/m/1600x0`, "href")}> ${renderComponent($$result, "Image", $$Image, { "alt": alt, "loading": "lazy", "src": picture.name.toLowerCase().includes("animation") ? picture.filename : `${picture.filename}/m/480x0`, "data-large-image": picture.name.toLowerCase().includes("animation") ? picture.filename : `${picture.filename}/m/1600x0`, "width": 480, "height": 320, "class": "clickable-picture cursor-pointer hover:brightness-110" })} </a>`;
}, "/home/nicolasseine/Code/site-estelle/src/components/ClickableImage.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$Astro$3 = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$ProjectLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ProjectLayout;
  const { story } = Astro2.props;
  const blok = story.content.details[0];
  blok.vimeo || blok.youtube;
  return renderTemplate`${renderComponent($$result, "PageTitle", $$PageTitle, { "title": story.name, "tags": story.tag_list.join(", "), "altLayout": true })} ${maybeRenderHead()}<article class="w-full md:px-12 max-w-4xl flex flex-col items-center"> <div class="flex flex-col items-center justify-center"> ${blok.mainVisual.filename && renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": blok.mainVisual.filename + "/m/720x0", "alt": blok.mainVisual.alt || "Image illustrant le projet" + story.name, "loading": "eager", "width": 1200, "height": 800, "class": "w-full  mb-12 lg:mb-24 " })}`} ${blok.vimeo && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate(_a$2 || (_a$2 = __template$2([' <div class="w-full aspect-video mb-12 lg:mb-24"> <iframe', ' class="w-full aspect-video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe> </div> <script src="https://player.vimeo.com/api/player.js"><\/script> '])), addAttribute(`https://player.vimeo.com/video/${blok.vimeo}`, "src")) })}`} ${blok.youtube && renderTemplate`<iframe class="mb-24 w-full aspect-video " width="100%" height="100%"${addAttribute(`https://www.youtube.com/embed/${blok.youtube}`, "src")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`} <p class="text-xl px-4 md:px-0 text-neutral-500 font-semibold not-prose text-justify"> ${blok.header} </p> ${blok.content.map((section) => renderTemplate`<section class="mt-12"> ${section.title && renderTemplate`<h3>${section.title}</h3>`} <div class="prose prose-lg max-w-3xl prose-neutral prose-p:text-neutral-600 prose-a:no-underline prose-a:text-neutral-800 hover:prose-a:underline">${unescapeHTML(Ie(section.content))}</div> <ul class="grid-cols-2 lg:grid-cols-3 grid gap-4 px-4"> ${section.gallery.map((picture) => renderTemplate`<li class="list-none m-0 p-0"> ${renderComponent($$result, "ClickableImage", $$ClickableImage, { "picture": picture, "alt": picture.alt || "Image illustrant le projet" + (story.title || "") })} </li>`)} </ul> </section>`)} </div> </article>`;
}, "/home/nicolasseine/Code/site-estelle/src/layouts/ProjectLayout.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$AltProjectLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AltProjectLayout;
  const { story } = Astro2.props;
  const blok = story.content.details[0];
  return renderTemplate`${maybeRenderHead()}<article class="w-full md:px-12 max-w-6xl"> <div> <div class="flex-col items-center xl:w-full flex xl:gap-12 mb-12"> ${renderComponent($$result, "PageTitle", $$PageTitle, { "title": story.name, "tags": story.tag_list.join(", "), "altLayout": true })} <div class="flex flex-col xl:flex-row gap-12 justify-start items-start h-fit mb-24"> ${blok.mainVisual.filename && renderTemplate`${renderComponent($$result, "Picture", $$Picture, { "src": blok.mainVisual.filename + "/m/720x0", "alt": blok.mainVisual.alt || "Image illustrant le projet" + story.name, "width": 720, "height": 900, "class": "  lg:h-fit w-full  pt-2 ", "loading": "eager" })}`} ${blok.vimeo && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate(_a$1 || (_a$1 = __template$1([' <div class="w-full aspect-video mb-12 lg:mb-24"> <iframe', ' class="w-full aspect-video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe> </div> <script src="https://player.vimeo.com/api/player.js"><\/script> '])), addAttribute(`https://player.vimeo.com/video/${blok.vimeo}`, "src")) })}`} ${blok.youtube && renderTemplate`<iframe width="100%" height="480"${addAttribute(`https://www.youtube.com/embed/${blok.youtube}`, "src")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`} <div class="flex flex-col w-full xl:w-1/3 items-center justify-start"> <p class="text-xl px-4 md:px-0 text-neutral-500 font-semibold not-prose text-justify"> ${blok.header} </p> </div> </div> </div> ${blok.content.map(
    (section) => renderTemplate`<section class=" flex px-4 md:px-0 flex-col-reverse md:flex-row items-start justify-center gap-6 md:gap-12 mb-24"> <ul class="sm:grid-cols-2 xl:grid-cols-3 grid gap-3 w-full  xl:w-2/3 pt-2"> ${section.gallery.map((picture) => renderTemplate`<li class="list-none m-0 p-0"> ${renderComponent($$result, "ClickableImage", $$ClickableImage, { "picture": picture, "alt": picture.alt || "Image illustrant le projet " + story.name })} </li>`)} </ul> <div class="w-full  xl:w-1/3 prose text-justify prose-lg prose-neutral prose-p:text-neutral-600  prose-a:text-neutral-800 prose-a:underline prose-a:decoration-primary hover:prose-a:decoration-2"> ${section.title && renderTemplate`<h3>${section.title}</h3>`} <div>${unescapeHTML(Ie(section.content))}</div> </div> </section>`
  )} </div> </article>`;
}, "/home/nicolasseine/Code/site-estelle/src/layouts/AltProjectLayout.astro", void 0);

const $$Astro$1 = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$OtherProjects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$OtherProjects;
  const { previous, next } = Astro2.props;
  console.log("next", next);
  return renderTemplate`${maybeRenderHead()}<div class="w-full sm:w-11/12 md:w-10/12 flex flex-row justify-between mx-auto mt-24 md:text-lg lg:text-xl xl:text-2xl"> <a class="group text-left hover:text-primary"${addAttribute(previous.slug, "href")}> <div class="flex flex-row items-center"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width=" 0.2" stroke="currentColor" class="w-12 h-12 lg:w-32 lg:h-32 group-hover:scale-150 transition-transform"> <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"></path> </svg> <div> <p class="font-bold">Projet précédent</p> <p class="font-light">${previous.name}</p> </div> </div> </a> <a class="group text-left hover:text-primary"${addAttribute(next.slug, "href")}> <div class="flex flex-row-reverse items-center"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width=" 0.2" stroke="currentColor" class="rotate-180 w-12 h-12 lg:w-32 lg:h-32 group-hover:scale-150 transition-transform"> <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"></path> </svg> <div> <p class="font-bold">Projet suivant</p> <p class="font-light">${next.name}</p> </div> </div> </a> </div>`;
}, "/home/nicolasseine/Code/site-estelle/src/components/OtherProjects.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
async function getStaticPaths() {
  const stories = await getAllStories();
  return stories.map((story) => {
    return {
      params: { slug: story.slug },
      props: { story }
    };
  });
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const getAllStories2 = async () => {
    const sbApi = ve();
    const { data } = await sbApi.get("cdn/stories", {
      content_type: "project",
      version: "draft" 
    });
    const stories2 = Object.values(data.stories);
    return stories2;
  };
  let retrievedProject = {
    slug: "",
    name: "",
    content: { details: [{ alternativeLayout: false }] }
  };
  {
    const { slug } = Astro2.params;
    const sbApi = ve();
    const { data } = await sbApi.get("cdn/stories/", {
      version: "draft",
      content_type: "project"
    });
    const project = data.stories.find(
      (story) => story.slug === slug
    );
    retrievedProject = project;
  }
  const stories = await getAllStories2();
  const projectIndex = stories.findIndex(
    (story) => story?.slug === retrievedProject.slug
  );
  const nextProject = {
    slug: projectIndex === stories.length - 1 ? stories[0].slug : stories[projectIndex + 1].slug,
    name: projectIndex === stories.length - 1 ? stories[0].name : stories[projectIndex + 1].name
  };
  const previousProject = {
    slug: projectIndex === 0 ? stories[stories.length - 1].slug : stories[projectIndex - 1].slug,
    name: projectIndex === 0 ? stories[stories.length - 1].name : stories[projectIndex - 1].name
  };
  const altLayout = retrievedProject.content.details[0].alternativeLayout;
  return renderTemplate(_a || (_a = __template(["", ' <script>\n  // function getUrl(url) {\n  //   url.replace("//a.storyblok.com", "//a2.storyblok.com")}\n\n  //Show modal when image is clicked\n\n  function addEventListenerToPictures(pictureContainer, modal, images) {\n    function showModal(image, modal, pictureContainer) {\n      pictureContainer.src = image.dataset.largeImage;\n      modal?.classList.remove("hidden");\n      setTimeout(() => pictureContainer?.classList.add("scale-100"), 1);\n    }\n    //Hide modal when clicked\n    function hideModal(modal, pictureContainer) {\n      modal?.classList.add("hidden");\n      pictureContainer?.classList.remove("scale-100");\n      setTimeout(() => (pictureContainer.src = ""), 500);\n    }\n    modal?.appendChild(pictureContainer);\n    modal?.addEventListener("click", (e) => hideModal(modal, pictureContainer));\n\n    pictureContainer.classList.add(\n      "scale-0",\n      "transition-all",\n      "duration-300",\n      "max-w-screen",\n      "p-4",\n      "md:p-16",\n      "lg:p-24",\n      "max-h-screen"\n    );\n\n    for (let i = 0; i < images.length; i++) {\n      const image = images[i];\n      image.addEventListener("click", (e) => {\n        e.preventDefault();\n        showModal(image, modal, pictureContainer);\n      });\n      image.addEventListener("mouseover", (e) => {\n        new Image().src = image.dataset.largeImage;\n      });\n    }\n  }\n\n  function setAllEventListenersOnPage() {\n    const modal = document.getElementById("modal");\n    const pictureContainer = document.createElement("img");\n    const images = document.getElementsByClassName("clickable-picture");\n    console.log("images", images);\n    addEventListenerToPictures(pictureContainer, modal, images);\n  }\n  setAllEventListenersOnPage();\n</script>'])), renderComponent($$result, "PagesLayout", $$PagesLayout, { "title": "Estelle Chauvard - " + retrievedProject.name }, mergeSlots({}, altLayout ? { "default": () => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AltProjectLayout", $$AltProjectLayout, { "story": retrievedProject })} ${renderComponent($$result2, "OtherProjects", $$OtherProjects, { "previous": previousProject, "next": nextProject })} ` })}` } : { "default": () => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProjectLayout", $$ProjectLayout, { "story": retrievedProject })} ${renderComponent($$result2, "OtherProjects", $$OtherProjects, { "previous": previousProject, "next": nextProject })} ` })}` })));
}, "/home/nicolasseine/Code/site-estelle/src/pages/projets/[slug].astro", void 0);
const $$file = "/home/nicolasseine/Code/site-estelle/src/pages/projets/[slug].astro";
const $$url = "/projets/[slug]";

const _slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$PageTitle as $, _slug_ as _, $$PagesLayout as a, $$Image as b, getConfiguredImageService as g, imageConfig as i, ke as k, ve as v };
