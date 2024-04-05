import { b as $$Image, v as ve, k as ke, $ as $$PageTitle, a as $$PagesLayout } from './_slug__lUzN1spD.mjs';
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent, s as spreadAttributes } from '../astro_ZFRm7wLK.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';
import camelcase from 'camelcase';

const $$Astro$5 = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$ProjectDetails = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ProjectDetails;
  return renderTemplate`<!-- 
(
<div class="w-full max-w-5xl flex flex-col items-center">
  <p class="text-xl font-semibold text-primary not-prose mb-12">
    {blok.header}
  </p>

  {
    blok.mainVisual.filename && (
      <Image
        src={blok.mainVisual.filename + "/m/1200x0"}
        alt={blok.mainVisual.alt || "Image illustrant le projet" + storyTitle}
        width={1200}
        height={900}
        class="w-full max-w-3xl  lg:h-fit mb-24 "
      />
    )
  }
  {
    blok.youtube && (
      <iframe
        class="mb-24 w-2/3 aspect-video "
        width="100%"
        height="480"
        src={\`https://www.youtube.com/embed/\${blok.youtube}\`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    )
  }

  {
    blok.content.map((section) => (
      <section>
        <h3>{section.title}</h3>
        <div
          set:html={renderRichText(section.content)}
          class="prose prose-lg max-w-3xl prose-neutral prose-p:text-neutral-600 prose-a:no-underline prose-a:text-primary hover:prose-a:underline"
        />
        <ul class="grid-cols-3 grid gap-3">
          {section.gallery.map((picture) => (
            <li class="list-none m-0 p-0">
              <ClickableImage
                picture={picture}
                alt={picture.alt || "Image illustrant le projet" + storyTitle}
              />
            </li>
          ))}
        </ul>
      </section>
    ))
  }
</div>
) } -->`;
}, "/home/nicolasseine/Code/site-estelle/src/components/storyblok/ProjectDetails.astro", void 0);

const $$Astro$4 = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$PortfolioItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$PortfolioItem;
  const { title = "", featured = false, image, alt, slug, tags } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li${addAttribute([
    " portfolio-item h-full w-full group items-center hover:cursor-pointer",
    {
      "col-span-full ": featured === true
    }
  ], "class:list")}${addAttribute(tags.join(", "), "data-tags")}> <a${addAttribute(`/${slug}`, "href")}> <div${addAttribute([
    "relative flex flex-col justify-center items-center h-60 w-full  "
  ], "class:list")}> ${renderComponent($$result, "Image", $$Image, { "src": featured ? `${image}/m/1080x0` : `${image}/m/640x0`, "alt": alt, "height": 600, "width": 800, "class": "w-full h-full aspect-video object-cover group-hover:saturate-0 transition-all duration-200", "loading": featured ? "eager" : "lazy" })} <div class="absolute bg-primary/0 top-6 left-6 right-6 bottom-6 group-hover:bg-primary/70 transition-all duration-200 flex items-center justify-center"> <p class="text-base capitalize font-serif font-light italic text-stone-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"> ${tags.join(", ")} </p> </div> </div> <h4 class="mx-auto w-full mt-3 text-xl font-bold text-neutral-900 uppercase text-center"> ${title} </h4> </a> </li>`;
}, "/home/nicolasseine/Code/site-estelle/src/components/PortfolioItem.astro", void 0);

const $$Astro$3 = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$PortfolioGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$PortfolioGrid;
  const storyblokApi = ve();
  const { data } = await storyblokApi.get("cdn/stories/", {
    version: "draft" ,
    content_type: "project"
  });
  const rawProjects = data.stories.map(
    (project) => {
      return {
        title: project.content.homeDisplay[0].title,
        featured: project.content.homeDisplay[0].featured,
        image: project.content.homeDisplay[0].coverPicture,
        tags: project.tag_list,
        slug: project.full_slug,
        date: new Date(project.content.details[0].year)
      };
    }
  );
  const featuredProject = rawProjects.find(
    (project) => project.featured
  );
  const projects = rawProjects.filter((project) => project.slug !== featuredProject.slug).sort((a, b) => b.date - a.date);
  const allTags = [
    ...new Set(
      rawProjects.flatMap((project) => project.tags).sort()
    )
  ];
  Astro2.props;
  return renderTemplate`${maybeRenderHead()}<ul class="flex flex-wrap w-full md:w-11/12 justify-start gap-2 md:gap-6 font-serif italic text-neutral-500 max-w-7xl mx-4 md:mx-auto mb-12 text-base leading-0"> ${allTags.map((tag) => renderTemplate`<li> <span${addAttribute(tag, "data-tag")} data-filter="false" class=" tag hover:cursor-pointer hover:text-primary data-[filter=true]:font-bold"> ${tag} </span> <span>/</span> </li>`)} </ul> <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-12 w-full md:w-11/12 max-w-7xl grid-flow-dense mx-auto"> ${featuredProject && renderTemplate`${renderComponent($$result, "PortfolioItem", $$PortfolioItem, { "title": featuredProject.title, "alt": featuredProject.image.alt, "image": featuredProject.image.filename, "featured": true, "slug": featuredProject.slug, "tags": featuredProject.tags })}`} ${projects.map((project) => renderTemplate`${renderComponent($$result, "PortfolioItem", $$PortfolioItem, { "title": project.title, "alt": project.image.alt, "image": project.image.filename, "slug": project.slug, "tags": project.tags, "featured": false })}`)} </ul> `;
}, "/home/nicolasseine/Code/site-estelle/src/components/storyblok/PortfolioGrid.astro", void 0);

const $$Astro$2 = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$Page = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Page;
  const { blok } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${spreadAttributes(ke(blok))}> ${blok.body?.map((blok2) => {
    return renderTemplate`${renderComponent($$result, "StoryblokComponent", $$StoryblokComponent, { "blok": blok2 })}`;
  })} </div>`;
}, "/home/nicolasseine/Code/site-estelle/src/components/storyblok/Page.astro", void 0);

const components = {projectDetails: $$ProjectDetails,portfolioGrid: $$PortfolioGrid,page: $$Page};

const $$Astro$1 = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$StoryblokComponent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StoryblokComponent;
  const { blok, ...props } = Astro2.props;
  if (!blok) {
    throw new Error(
      "Cannot render StoryblokComponent. 'blok' prop is undefined."
    );
  }
  let key = camelcase(blok.component);
  const componentFound = key in components;
  let Component;
  if (!componentFound) {
    throw new Error(
        `Component could not be found for blok "${blok.component}"! Is it defined in astro.config.mjs?`
      );
  } else {
    Component = components[key];
  }
  return renderTemplate`${renderComponent($$result, "Component", Component, { "blok": blok, ...props })}`;
}, "/home/nicolasseine/Code/site-estelle/node_modules/@storyblok/astro/components/StoryblokComponent.astro", void 0);

const $$Astro = createAstro("https://fantastic-fudge-691ec9.netlify.app/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const storyblokApi = ve();
  const { data } = await storyblokApi.get("cdn/stories/home", {
    version: "draft" 
  });
  const content = data.story.content;
  return renderTemplate`${renderComponent($$result, "PagesLayout", $$PagesLayout, { "title": "Estelle Chauvard - projets et portfolio" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTitle", $$PageTitle, { "title": "portfolio" })} ${renderComponent($$result2, "StoryblokComponent", $$StoryblokComponent, { "blok": content })}  ` })}`;
}, "/home/nicolasseine/Code/site-estelle/src/pages/index.astro", void 0);
const $$file = "/home/nicolasseine/Code/site-estelle/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
