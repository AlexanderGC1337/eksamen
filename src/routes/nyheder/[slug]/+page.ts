import { error } from "@sveltejs/kit";

export const load = async ({ params, fetch }) => {
  try {
    const response = await fetch("http://127.0.0.1:5333/news");
    if (!response.ok) {
      throw new Error("Kunne ikke hente data");
    }
    const allNews = await response.json();

    const currentArticle = allNews.find(
      (article: any) =>
        article.title.toLowerCase().replace(/\s+/g, "-") === params.slug
    );

    if (!currentArticle) {
      throw error(404, "Nyhed ikke fundet");
    }

    return {
      article: currentArticle,
      allNews, // Vi sender alle nyheder med
    };
  } catch (error) {
    console.error("Fejl ved hentning af data:", error);
    throw error;
  }
};
