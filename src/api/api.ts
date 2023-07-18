const BASE_URL = "https://api.realworld.io/api";

const headers = new Headers({
  "content-type": "application/json; charset=utf-8",
});

const request = async (path: string, method: string, body?: {}) => {
  const response = await fetch(`${BASE_URL}/${path}`, {
    method,
    headers: headers,
    body: JSON.stringify(body),
  });

  const json = await response.json();

  return json;
};

export const getArticles = async () => {
  const articles = await request("articles", "GET");

  return articles;
};

export const getArticle = async (slug: string) => {
  const article = await request(`articles/${slug}`, "GET");

  return article;
};

export const getTags = async () => {
  const tags = await request("tags", "GET");

  return tags;
};
