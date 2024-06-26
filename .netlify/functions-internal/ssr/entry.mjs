import { renderers } from './renderers.mjs';
import { manifest } from './manifest_Hkn-Eer4.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_8TkBo3nI.mjs');
const _page1 = () => import('./chunks/index_Gh-dXGh1.mjs');
const _page2 = () => import('./chunks/about_XskMn9Kp.mjs');
const _page3 = () => import('./chunks/contact_2hKe4Koi.mjs');
const _page4 = () => import('./chunks/contact-success_iSIG7BFT.mjs');
const _page5 = () => import('./chunks/_slug__ZvIsJdEM.mjs');
const _page6 = () => import('./chunks/robots_H_wV9EzD.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/index.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/contact.astro", _page3],
    ["src/pages/contact-success.astro", _page4],
    ["src/pages/projets/[slug].astro", _page5],
    ["src/pages/robots.txt.ts", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = undefined;
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
