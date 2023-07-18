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
import { articlesStore } from "../store";

export const Home = () => {
  const articles = useConnect(articlesStore.getArticles);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");

  useEffect(() => {
    const fetchTags = async () => {
      const fetchedTags = await getTags();
      setTags(fetchedTags.tags);
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
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

      setIsLoading(false);
    };

    fetchArticles();
  }, [selectedTag]);

  const selectTag = (currentTag: string) => {
    if (currentTag !== selectedTag) {
      setSelectedTag(currentTag);
    } else {
      setSelectedTag("");
    }
  };

  return (
    <View style={styles.tags}>
      <TagList tags={tags} selectedTag={selectedTag} selectTag={selectTag} />
      {!isLoading ? (
        <>
          {articles.length === 0 ? <EmptyArticles /> : <ArticleList articles={articles} />}
        </>
      ) : (
        <>
          <Divider />
          <LoaderScreen containerStyle={styles.loader} color={"#ddd"} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tags: {
    margin: 20,
  },
  loader: {
    marginVertical: 100,
  },
});
