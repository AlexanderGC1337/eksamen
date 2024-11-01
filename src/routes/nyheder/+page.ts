export const load = async ({ fetch }) => {
  try {
    const response = await fetch("http://127.0.0.1:5333/news");
    if (!response.ok) {
      throw new Error("Kunne ikke hente data");
    }
    const news = await response.json();
    return { news };
  } catch (error) {
    console.error("Fejl ved hentning af data:", error);
    return { news: [] };
  }
};
