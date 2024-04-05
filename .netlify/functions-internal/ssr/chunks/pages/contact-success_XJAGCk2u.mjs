import { $ as $$PageTitle, a as $$PagesLayout } from './_slug__lUzN1spD.mjs';
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent } from '../astro_ZFRm7wLK.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';

const $$Astro = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$ContactSuccess = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ContactSuccess;
  return renderTemplate`${renderComponent($$result, "PagesLayout", $$PagesLayout, { "title": "Estelle Chauvard - projets et portfolio" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTitle", $$PageTitle, { "title": "portfolio" })} ` })} `;
}, "/home/nicolasseine/Code/site-estelle/src/pages/contact-success.astro", void 0);

const $$file = "/home/nicolasseine/Code/site-estelle/src/pages/contact-success.astro";
const $$url = "/contact-success";

export { $$ContactSuccess as default, $$file as file, $$url as url };
