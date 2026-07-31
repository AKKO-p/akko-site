import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['Souveraineté', 'Architecture', 'Gouvernance et IA', 'Actualités AKKO']),
    date: z.coerce.date(),
    minutes: z.number(),
    author: z.string().default('Équipe AKKO'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
