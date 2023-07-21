import { StyleSheet, View } from "react-native";
import { Divider } from "native-base";
import LoaderScreen from "react-native-ui-lib/loaderScreen";
import { getArticles, getTags } from "../api/api";
import { useEffect, useState } from "react";
import { Article } from "../types/article";
import { ArticleList } from "../components/ArticleList";
import { EmptyArticles } from "../components/EmptyArticles";
import { TagList } from "../components/TagList";
import { useConnect } from "remx";
import { articlesStore, tagsStore, userStore } from "../store";
import { SkeletonTags } from "../components/SkeletonTags";

export const Home = () => {
  const articles = useConnect(articlesStore.getArticles);
  const openedArticle = useConnect(articlesStore.getOpenedArticle);
  const tags = useConnect(tagsStore.getTags);
  const selectedTag = useConnect(tagsStore.getSelectedTag);
  const user = useConnect(userStore.getUser);
  const [isArticlesLoading, setIsArticlesLoading] = useState(true);
  const [isTagsLoading, setIsTagsLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      setIsTagsLoading(true);
      const fetchedTags = await getTags();
      tagsStore.setTags(fetchedTags.tags);
      setIsTagsLoading(false);
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsArticlesLoading(true);
      const fetchedArticles = await getArticles();
      if (selectedTag) {
        articlesStore.setArticles(
          fetchedArticles.articles.filter((article: Article) =>
            article.tagList.includes(selectedTag)
          )
        );
      } else {
        articlesStore.setArticles(fetchedArticles.articles);
      }

      setIsArticlesLoading(false);
    };

    fetchArticles();
  }, [selectedTag, user, openedArticle]);

  const selectTag = (currentTag: string) => {
    if (currentTag !== selectedTag) {
      tagsStore.setSelectedTag(currentTag);
    } else {
      tagsStore.setSelectedTag("");
    }
  };

  return (
    <View style={styles.tags}>
      {isTagsLoading ? (
        <View style={styles.skeletonTags}>
          <SkeletonTags />
        </View>
      ) : (
        <TagList tags={tags} selectedTag={selectedTag} selectTag={selectTag} />
      )}
      {isArticlesLoading ? (
        <>
          <Divider />
          <LoaderScreen containerStyle={styles.loader} color={"#ddd"} />
        </>
      ) : (
        <>
          {articles.length === 0 ? (
            <EmptyArticles />
          ) : (
            <ArticleList articles={articles} />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tags: {
    margin: 20,
  },
  skeletonTags: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  loader: {
    marginVertical: 100,
  },
});
