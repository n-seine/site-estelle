import { $ as $$PageTitle, a as $$PagesLayout } from './_slug__obXk0pSH.mjs';
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_ZFRm7wLK.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';

const $$Astro = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contact;
  return renderTemplate`${renderComponent($$result, "PagesLayout", $$PagesLayout, { "title": "Estelle Chauvard - Me contacter" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTitle", $$PageTitle, { "title": "me contacter" })} ${maybeRenderHead()}<div class="relative flex w-full justify-around max-w-7xl"> <div class="pb-24 sm:pb-32 pt-16 w-full lg:w-2/3"> <div class="px-6 lg:px-8"> <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-2xl"> <h2 class="text-3xl font-bold tracking-tight text-neutral-800">
Un projet, une question ?
</h2> <p class="mt-2 text-lg leading-8 text-neutral-800 font-light">
Contactez-moi via le formulaire ci-dessous, je vous répondrai dans
            les meilleurs délais
</p> <form data-netlify="true" name="contact-form" action="/contact-success" method="POST" class="mt-16"> <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"> <div> <label for="nom" class="block text-base font-semibold leading-6 text-neutral-800 mb-2">Nom</label> <input type="text" name="nom" id="nom" autocomplete="family-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-400 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"> </div> <div> <div> <label for="prenom" class="block text-base font-semibold leading-6 text-neutral-800 mb-2">Prénom</label> <input type="text" name="prenom" id="prenom" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-400 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"> </div> </div> <div class="sm:col-span-2"> <label for="email" class="block text-base font-semibold leading-6 text-neutral-800 mb-2">Email</label> <input type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md border-0 px-3.5 py-2 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-400 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"> </div> <!-- <div class="sm:col-span-2">
                <div class="flex justify-between text-base leading-6 mb-2">
                  <label
                    for="phone"
                    class="block font-semibold text-neutral-800"
                    >Téléphone</label
                  >
                  <p id="phone-description" class="text-neutral-400 text-sm">
                    Facultatif <span class="hidden sm:inline"
                      >mais tellement plus sympathique</span
                    >
                  </p>
                </div>
                <input
                  type="tel"
                  name="telephone"
                  id="telephone"
                  autocomplete="tel"
                  aria-describedby="phone-description"
                  class="block w-full rounded-md border-0 px-3.5 py-2 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-400 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div> --> <div class="sm:col-span-2"> <div class="flex justify-between text-sm leading-6"> <label for="message" class="block text-base font-semibold leading-6 text-neutral-800">Votre message</label> <p id="message-description" class="text-neutral-400 hidden sm:block">
Que puis-je faire pour vous ?
</p> </div> <textarea id="message" name="message" rows="9" aria-describedby="message-description" class="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-400 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"></textarea> </div> </div> <div class="mt-10 flex justify-end border-t border-neutral-800/10 pt-8"> <button type="submit" class="rounded-md bg-neutral-800 px-3.5 py-2.5 text-center text-base font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Envoyer le message</button> </div> </form> </div> </div> </div> <!-- <div
      class="hidden lg:flex lg:relative lg:w-1/3 bg-primary justify-center items-center font-semibold text-white text-lg pb-24"
    >
      <div>
        <p>Retrouvez-moi aussi sur les réseaux sociaux</p>
        <p class="fill-white pt-3 flex w-full justify-center gap-6">
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12"
            ><title>LinkedIn</title>
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            ></path>
          </svg>
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12"
            ><title>Facebook</title><path
              d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
            ></path></svg
          >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12"
            ><title>Behance</title><path
              d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"
            ></path></svg
          >
        </p>
      </div>
    </div> --> </div> ` })}`;
}, "/home/nicolasseine/Code/site-estelle/src/pages/contact.astro", void 0);

const $$file = "/home/nicolasseine/Code/site-estelle/src/pages/contact.astro";
const $$url = "/contact";

export { $$Contact as default, $$file as file, $$url as url };
