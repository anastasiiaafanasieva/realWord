import { View, Text, StyleSheet } from "react-native";
import { AuthorInfo } from "../components/AuthorInfo";
import { getArticle } from "../api/api";
import { useEffect, useState } from "react";
import { Article } from "../types/article";
import { RouteProp } from "@react-navigation/native";
import { TagList } from "../components/TagList";
import { ScrollView } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SkeletonArticle } from "../components/SkeletonArticle/";

export const ArticleScreen = ({
  route,
}: {
  route: RouteProp<{ params: { articleSlug: string } }, "params">;
}) => {
  const [currentArticle, setCurrentArticle] = useState<Article>();

  useEffect(() => {
    const fetchArticle = async () => {
      const articleSlug = route.params.articleSlug;
      const fetchedArticle = await getArticle(articleSlug);
      setCurrentArticle(fetchedArticle.article);
    };

    fetchArticle();
  }, []);

  if (!currentArticle) {
    return <SkeletonArticle />;
  }

  return (
    <>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.title}>{currentArticle.title}</Text>
          </View>
          <View style={styles.authorData}>
            <AuthorInfo
              author={currentArticle.author}
              createdAt={currentArticle.createdAt}
            />
            <View style={styles.favorites}>
              <Text>{currentArticle.favoritesCount}</Text>
              <Ionicons name='ios-heart-outline' size={24} color='black' />
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View>
            <Text style={styles.text}>
              {currentArticle.body.replace(/\\n/g, " ")}
            </Text>
          </View>
          <TagList tags={currentArticle.tagList} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    gap: 20,
    padding: 20,
    backgroundColor: "#f5fffa",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 10,
  },
  authorData: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  favorites: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  body: {
    padding: 20,
    gap: 20,
  },
  text: {
    fontSize: 16,
  },
});
