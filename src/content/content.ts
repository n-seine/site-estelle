// Importe les propriétés depuis `astro:content`
import { number } from "astro/zod";
import { z, defineCollection } from "astro:content";
// Définir un `type` et un `schema` pour chaque collection
const projectsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      imagesPath: z.string(),
      tags: z.array(z.string()),
      display: z.object({ cols: z.number(), rows: z.number() }),
    }),
});

// Exporter un objet `collections` unique pour y enregistrer vos collections
export const collections = {
  projects: projectsCollection,
};
