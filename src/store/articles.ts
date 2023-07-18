import * as remx from "remx";
import { Article } from "../types/article";

type ArticlesState = {
    articles: Article[],
    openedArticle: Article | undefined,
}

const initialArticlesState: ArticlesState = {
    articles: [],
    openedArticle: undefined,
  };
  
  const articlesState = remx.state(initialArticlesState);

  const articlesSetters = remx.setters({
    setArticles(articles: Article[]) {
        articlesState.articles = articles;
    },
  
    setOpenedArticle(article: Article) {
        articlesState.openedArticle = article;
    }
  });

  const articlesGetters = remx.getters({
    getArticles() {
      return articlesState.articles;
    },
  
    getOpenedArticle() {
      return articlesState.openedArticle;
    },
  });

  export const articlesStore = {
    ...articlesSetters,
    ...articlesGetters,
  };