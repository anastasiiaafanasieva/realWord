import { userStore } from "../store";
import { User } from "../types/user";

const BASE_URL = "https://api.realworld.io/api";

const getHeaders = () => {
  const { user } = userStore.getUser();
  const headers = new Headers({
    "content-type": "application/json; charset=utf-8",
  });

  if (user) {
    headers.set("authorization", `Token ${user?.token}`);
  }

  return headers;
};

const request = async (path: string, method: string, body?: {}) => {
  const response = await fetch(`${BASE_URL}/${path}`, {
    method,
    headers: getHeaders(),
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

export const signUp = async (userData: User) => {
  const response = await request("users", "POST", { user: userData });

  return response;
};

export const login = async (userData: User) => {
  const response = await request("users/login", "POST", { user: userData });

  if (response instanceof Error) {
    return undefined;
  }

  if (response.user) {
    userStore.setUser(response.user);
  }

  return response.user;
};

export const addFavorites = async (slug: string) => {
  const response = await request(`articles/${slug}/favorite`, "POST");

  if (response instanceof Error) {
    return undefined;
  }

  return response.article;
};

export const deleteFavorites = async (slug: string) => {
  const response = await request(`articles/${slug}/favorite`, "DELETE");

  if (response instanceof Error) {
    return undefined;
  }

  return response.article;
};
