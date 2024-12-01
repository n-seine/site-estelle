import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import './chunks/astro_ZFRm7wLK.mjs';
import 'clsx';
import 'cssesc';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page._iJM7r4E.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.tCUfTdF5.js"},{"type":"external","value":"/_astro/page._iJM7r4E.js"}],"styles":[{"type":"external","src":"/_astro/about.A9OGat_R.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.tCUfTdF5.js"},{"type":"external","value":"/_astro/page._iJM7r4E.js"}],"styles":[{"type":"external","src":"/_astro/about.A9OGat_R.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.tCUfTdF5.js"},{"type":"external","value":"/_astro/page._iJM7r4E.js"}],"styles":[{"type":"external","src":"/_astro/about.A9OGat_R.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Doz1Jjix.js"},{"type":"external","value":"/_astro/page._iJM7r4E.js"}],"styles":[{"type":"external","src":"/_astro/about.A9OGat_R.css"}],"routeData":{"route":"/contact-success","isIndex":false,"type":"page","pattern":"^\\/contact-success\\/?$","segments":[[{"content":"contact-success","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact-success.astro","pathname":"/contact-success","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.tCUfTdF5.js"},{"type":"external","value":"/_astro/page._iJM7r4E.js"}],"styles":[{"type":"external","src":"/_astro/about.A9OGat_R.css"}],"routeData":{"route":"/projets/[slug]","isIndex":false,"type":"page","pattern":"^\\/projets\\/([^/]+?)\\/?$","segments":[[{"content":"projets","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/projets/[slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page._iJM7r4E.js"}],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://fantastic-fudge-691ec9.netlify.app/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/nicolasseine/Code/site-estelle/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/home/nicolasseine/Code/site-estelle/src/pages/contact-success.astro",{"propagation":"none","containsHead":true}],["/home/nicolasseine/Code/site-estelle/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/home/nicolasseine/Code/site-estelle/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/nicolasseine/Code/site-estelle/src/pages/projets/[slug].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/about.astro":"chunks/pages/about_MjQgigPp.mjs","/src/pages/contact-success.astro":"chunks/pages/contact-success_hMapuMN8.mjs","/src/pages/contact.astro":"chunks/pages/contact_d0mN7Qeq.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_ETeZ2sSr.mjs","/src/pages/index.astro":"chunks/pages/index_e_q5QJH6.mjs","/src/pages/robots.txt.ts":"chunks/pages/robots_XAAWTj96.mjs","\u0000@astrojs-manifest":"manifest_Hkn-Eer4.mjs","/home/nicolasseine/Code/site-estelle/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_3wEZly-Z.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_8TkBo3nI.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_Gh-dXGh1.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_XskMn9Kp.mjs","\u0000@astro-page:src/pages/contact@_@astro":"chunks/contact_2hKe4Koi.mjs","\u0000@astro-page:src/pages/contact-success@_@astro":"chunks/contact-success_iSIG7BFT.mjs","\u0000@astro-page:src/pages/projets/[slug]@_@astro":"chunks/_slug__ZvIsJdEM.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"chunks/robots_H_wV9EzD.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.Doz1Jjix.js","astro:scripts/page.js":"_astro/page._iJM7r4E.js","/astro/hoisted.js?q=1":"_astro/hoisted.tCUfTdF5.js","@astrojs/react/client.js":"_astro/client.gSoe9Upx.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/lapin-nez-web.Pt_TrrqK.webp","/_astro/source-sans-pro-cyrillic-ext-200-normal.6qMNr0ap.woff2","/_astro/source-sans-pro-cyrillic-200-normal.0K4gHXlw.woff2","/_astro/source-sans-pro-greek-ext-200-normal.7u330p2G.woff2","/_astro/source-sans-pro-greek-200-normal.LixfNNy3.woff2","/_astro/source-sans-pro-vietnamese-200-normal.WnP5DdlJ.woff2","/_astro/source-sans-pro-latin-ext-200-normal.9BqYHSYT.woff2","/_astro/source-sans-pro-latin-200-normal.54O9Ttr4.woff2","/_astro/source-sans-pro-cyrillic-ext-300-normal.cWUEv_xe.woff2","/_astro/source-sans-pro-cyrillic-300-normal.HlsXSxjB.woff2","/_astro/source-sans-pro-greek-ext-300-normal.nwvAyo4H.woff2","/_astro/source-sans-pro-greek-300-normal.-bLg-IRb.woff2","/_astro/source-sans-pro-vietnamese-300-normal.5HlECNxU.woff2","/_astro/source-sans-pro-latin-ext-300-normal.fsd5C8JF.woff2","/_astro/source-sans-pro-latin-300-normal.GHCzXwda.woff2","/_astro/source-sans-pro-cyrillic-ext-400-normal.WSUZCeeR.woff2","/_astro/source-sans-pro-cyrillic-400-normal.aOoJ1hLD.woff2","/_astro/source-sans-pro-greek-ext-400-normal.7q1fijPT.woff2","/_astro/source-sans-pro-greek-400-normal.mSZgj3WI.woff2","/_astro/source-sans-pro-vietnamese-400-normal.5qW7Uq8a.woff2","/_astro/source-sans-pro-latin-ext-400-normal.G9Is0bPK.woff2","/_astro/source-sans-pro-latin-400-normal.LabC1wki.woff2","/_astro/source-sans-pro-cyrillic-ext-600-normal.KhA6cBkb.woff2","/_astro/source-sans-pro-cyrillic-600-normal.OyFvtKyO.woff2","/_astro/source-sans-pro-greek-ext-600-normal.ZN6MoA23.woff2","/_astro/source-sans-pro-greek-600-normal.7n86Yjvz.woff2","/_astro/source-sans-pro-vietnamese-600-normal.f-721QLd.woff2","/_astro/source-sans-pro-latin-ext-600-normal.FxpJIxc-.woff2","/_astro/source-sans-pro-latin-600-normal.TNggc-lg.woff2","/_astro/source-sans-pro-cyrillic-ext-700-normal.jDTieUJm.woff2","/_astro/source-sans-pro-cyrillic-700-normal.pHUumuWs.woff2","/_astro/source-sans-pro-greek-ext-700-normal.LGOSlb8g.woff2","/_astro/source-sans-pro-greek-700-normal.avpkQ6hR.woff2","/_astro/source-sans-pro-vietnamese-700-normal.H_gZteK8.woff2","/_astro/source-sans-pro-latin-ext-700-normal.n_JzVrJh.woff2","/_astro/source-sans-pro-latin-700-normal.y-yeONtr.woff2","/_astro/source-sans-pro-cyrillic-ext-900-normal.BFcMfIry.woff2","/_astro/source-sans-pro-cyrillic-900-normal.8C18PdZX.woff2","/_astro/source-sans-pro-greek-ext-900-normal.uvAw3Qw8.woff2","/_astro/source-sans-pro-greek-900-normal.Q4gonnj6.woff2","/_astro/source-sans-pro-vietnamese-900-normal.Ci339CkA.woff2","/_astro/source-sans-pro-latin-ext-900-normal.8OKdX2yS.woff2","/_astro/source-sans-pro-latin-900-normal.ZSRlRiID.woff2","/_astro/pt-serif-cyrillic-ext-400-italic.xPZm4cof.woff2","/_astro/pt-serif-cyrillic-400-italic.lCocHVYf.woff2","/_astro/pt-serif-latin-ext-400-italic.RznLwu1I.woff2","/_astro/pt-serif-latin-400-italic.M4ORCdnF.woff2","/_astro/pt-serif-cyrillic-ext-700-italic.35JMwhZT.woff2","/_astro/pt-serif-cyrillic-700-italic.uO2sJAUS.woff2","/_astro/pt-serif-latin-ext-700-italic.XX-FKKfp.woff2","/_astro/pt-serif-latin-700-italic.NSz7B9rQ.woff2","/_astro/pt-serif-cyrillic-ext-400-normal._7A1uCzQ.woff2","/_astro/pt-serif-cyrillic-400-normal.Jz3ZJrdX.woff2","/_astro/pt-serif-latin-ext-400-normal.LI8MFZlI.woff2","/_astro/pt-serif-latin-400-normal.sdJkI-3q.woff2","/_astro/pt-serif-cyrillic-ext-700-normal.0Unn-DrO.woff2","/_astro/pt-serif-cyrillic-700-normal.F-dmdJDB.woff2","/_astro/pt-serif-latin-ext-700-normal.Wp-OCy2q.woff2","/_astro/pt-serif-latin-700-normal.bLqPY3rM.woff2","/_astro/source-sans-pro-cyrillic-ext-200-normal.HzpMSiZC.woff","/_astro/source-sans-pro-cyrillic-200-normal.iWllw7bI.woff","/_astro/source-sans-pro-greek-ext-200-normal.Vpo20cTy.woff","/_astro/source-sans-pro-greek-200-normal.wtydRPkk.woff","/_astro/source-sans-pro-vietnamese-200-normal.iBvnbBsi.woff","/_astro/source-sans-pro-latin-ext-200-normal.xIyksokC.woff","/_astro/source-sans-pro-latin-200-normal.P5A3tZ7z.woff","/_astro/source-sans-pro-cyrillic-ext-300-normal.ifrltUCl.woff","/_astro/source-sans-pro-cyrillic-300-normal.wIIrKd_f.woff","/_astro/source-sans-pro-greek-ext-300-normal.iYtcRN95.woff","/_astro/source-sans-pro-greek-300-normal.QwIis1WV.woff","/_astro/source-sans-pro-vietnamese-300-normal.OqUfbn6w.woff","/_astro/source-sans-pro-latin-ext-300-normal.3s6Clwr3.woff","/_astro/source-sans-pro-latin-300-normal.-Gp3AfCd.woff","/_astro/source-sans-pro-cyrillic-ext-400-normal.7Q_4NH1v.woff","/_astro/source-sans-pro-cyrillic-400-normal.IeopwKy0.woff","/_astro/source-sans-pro-greek-ext-400-normal.XyFi9adT.woff","/_astro/source-sans-pro-greek-400-normal.vqgfQkwW.woff","/_astro/source-sans-pro-vietnamese-400-normal.v19ljxzR.woff","/_astro/source-sans-pro-latin-ext-400-normal.eMmr7uTj.woff","/_astro/source-sans-pro-latin-400-normal.Eew2UvZK.woff","/_astro/source-sans-pro-cyrillic-ext-600-normal.S1MkhIMc.woff","/_astro/source-sans-pro-cyrillic-600-normal.uoKb_-Mk.woff","/_astro/source-sans-pro-greek-ext-600-normal.ZN8Fny-I.woff","/_astro/source-sans-pro-greek-600-normal.jV28UqMi.woff","/_astro/source-sans-pro-vietnamese-600-normal.yal-3cy0.woff","/_astro/source-sans-pro-latin-ext-600-normal.YMCje018.woff","/_astro/source-sans-pro-latin-600-normal.o1dvjFz8.woff","/_astro/source-sans-pro-cyrillic-ext-700-normal.upavzlFp.woff","/_astro/source-sans-pro-cyrillic-700-normal.wiS-NyVY.woff","/_astro/source-sans-pro-greek-ext-700-normal.Vz6ehKsT.woff","/_astro/source-sans-pro-greek-700-normal.Qs_W-KhW.woff","/_astro/source-sans-pro-vietnamese-700-normal.sKk4eiTM.woff","/_astro/source-sans-pro-latin-ext-700-normal.Mo9MOQij.woff","/_astro/source-sans-pro-latin-700-normal.TXU4Ax_8.woff","/_astro/source-sans-pro-cyrillic-ext-900-normal.26edRbQS.woff","/_astro/source-sans-pro-cyrillic-900-normal.kvjxEqJ3.woff","/_astro/source-sans-pro-greek-ext-900-normal.QOozsY2f.woff","/_astro/source-sans-pro-greek-900-normal.B7kJuJdJ.woff","/_astro/source-sans-pro-vietnamese-900-normal.FbmkQav-.woff","/_astro/source-sans-pro-latin-ext-900-normal.wFELebGP.woff","/_astro/source-sans-pro-latin-900-normal.uluZdw9Y.woff","/_astro/pt-serif-cyrillic-ext-400-italic.jVtGWfN-.woff","/_astro/pt-serif-cyrillic-400-italic.z9DWWkGg.woff","/_astro/pt-serif-latin-ext-400-italic.LdomZ65w.woff","/_astro/pt-serif-latin-400-italic.B3XfSXne.woff","/_astro/pt-serif-cyrillic-ext-700-italic.R-ynlgGz.woff","/_astro/pt-serif-cyrillic-700-italic.P_CpRIFl.woff","/_astro/pt-serif-latin-ext-700-italic.i2-yn75F.woff","/_astro/pt-serif-latin-700-italic.u47PGDdv.woff","/_astro/pt-serif-cyrillic-ext-400-normal.gld8g61Y.woff","/_astro/pt-serif-cyrillic-400-normal.Wo2Zt77X.woff","/_astro/pt-serif-latin-ext-400-normal.gmviVA4c.woff","/_astro/pt-serif-latin-400-normal.yLv5UVtF.woff","/_astro/pt-serif-cyrillic-ext-700-normal.GXkwGE1l.woff","/_astro/pt-serif-cyrillic-700-normal.v6rye0Ou.woff","/_astro/pt-serif-latin-ext-700-normal.Z15AFW5T.woff","/_astro/pt-serif-latin-700-normal.ZyS3CfCn.woff","/_astro/about.A9OGat_R.css","/favicon.webp","/_astro/client.gSoe9Upx.js","/_astro/hoisted.Doz1Jjix.js","/_astro/hoisted.tCUfTdF5.js","/_astro/index.hLBgGYxu.js","/_astro/page._iJM7r4E.js","/fonts/PTSerif-BoldItalic.ttf","/fonts/PTSerif-Italic.ttf","/_astro/page._iJM7r4E.js"],"buildFormat":"directory"});

export { manifest };