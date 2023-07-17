import { SafeAreaView, FlatList, StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Divider } from "native-base";
import LoaderScreen from "react-native-ui-lib/loaderScreen";
import Colors from "react-native-ui-lib/colorPalette";
import { ArticleItem } from "../../components/ArticleItem";
import { getArticles, getTags } from "../api/api";
import { useEffect, useState } from "react";
import { Article } from "../types/article";

export const App = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [articles, setArticles] = useState<Article[]>([]);
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
        setArticles(
          fetchedArticles.articles.filter((article: Article) =>
            article.tagList.includes(selectedTag)
          )
        );
      } else {
        setArticles(fetchedArticles.articles);
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
    <>
      <NativeBaseProvider>
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.tagListContainer}>
              <View style={styles.tagList}>
                {tags.map((tag, index) => (
                  <Text
                    key={index}
                    style={[styles.tag, selectedTag === tag && styles.selectedTag]}
                    onPress={() => selectTag(tag)}
                  >
                    {tag}
                  </Text>
                ))}
              </View>
            </View>
            {!isLoading ? (
              <>
                {articles.length === 0 ? (
                  <View>
                    <Divider />
                    <Text style={styles.emptyArticles}>
                      No articles with such tag were found...
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      data={articles}
                      renderItem={({ item }) => <ArticleItem article={item} />}
                      keyExtractor={(item) => item.slug}
                    />
                  </View>
                )}
              </>
            ) : (
                <>
                <Divider />
                <LoaderScreen style={styles.emptyArticles} message={"Articles is loading..."} color={'#ddd'} />
                </>
            )}
          </View>
        </SafeAreaView>
      </NativeBaseProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  tagListContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 15,
  },
  tagList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    color: "#aaa",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedTag: {
    backgroundColor: "#5CB85C",
    color: "#ddd",
  },
  emptyArticles: {
    marginVertical: 24,
  },
});
