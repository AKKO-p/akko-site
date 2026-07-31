import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  return rss({
    title: 'Blog AKKO',
    description:
      "Retours d'ingénierie, choix d'architecture et pédagogie sur la gouvernance des données et de l'IA, par l'équipe qui construit AKKO.",
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/blog/${p.id}/`,
    })),
    customData: '<language>fr</language>',
  });
}
