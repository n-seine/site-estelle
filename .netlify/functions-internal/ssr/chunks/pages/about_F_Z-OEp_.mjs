import { $ as $$PageTitle, a as $$PagesLayout } from './_slug__lUzN1spD.mjs';
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_ZFRm7wLK.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';

const $$Astro = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "PagesLayout", $$PagesLayout, { "title": "Estelle Chauvard - \xE0 propos de moi" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTitle", $$PageTitle, { "title": "\xE0 propos" })} ${maybeRenderHead()}<article class="w-full lg:max-w-3xl mx-auto"> <p class="w-full pb-6 text-xl font-light">
Dessinatrice et vidéaste formée à l’École Estienne, je m’intéresse à la
      sociologie dont mon travail de création reprend certaines des méthodes
      d’enquête.
</p> <p class="w-full pb-6 text-xl font-light">
Ma pratique s’organise autour de deux axes : les biographies imaginaires,
      portées par une écriture mêlant textes, dessins, photographies et fausses
      archives (Danielle Dixe à Lagrasse, 2021) d’une part et d’autre part, les
      articulations possibles entre dessin, animation et danse (Tombé du ciel,
      2016 et Chut…, 2023 pour la Compagnie Arcane).
</p> <p class="w-full pb-6 text-xl font-light">
Par ailleurs graphiste indépendante, je réalise des missions régulières
      pour le Groupe des 20 Théâtres en Île-de-France, la Compagnie Arcane et le
      Centre arabe de recherche et d’études politiques de Paris (CAREP), ainsi
      que des travaux de création ponctuels pour différents clients. Je
      collabore à des projets de films d’animation (No-Go Zone et Sonder de
      William Henne, 2015 / en cours ; Ozymandias d’Alvaro Lamarche-Toloza,
      2021) et enseigne la sociologie à Sciences Po Paris.
</p> </article> ` })}`;
}, "/home/nicolasseine/Code/site-estelle/src/pages/about.astro", void 0);

const $$file = "/home/nicolasseine/Code/site-estelle/src/pages/about.astro";
const $$url = "/about";

export { $$About as default, $$file as file, $$url as url };
