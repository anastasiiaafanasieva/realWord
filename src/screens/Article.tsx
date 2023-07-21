import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthorInfo } from "../components/AuthorInfo";
import { addFavorites, deleteFavorites, getArticle } from "../api/api";
import { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { TagList } from "../components/TagList";
import { ScrollView } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SkeletonArticle } from "../components/SkeletonArticle/";
import { useConnect } from "remx";
import { articlesStore, userStore } from "../store";
import { useNavigation } from "@react-navigation/native";

export const ArticleScreen = ({
  route,
}: {
  route: RouteProp<{ params: { articleSlug: string } }, "params">;
}) => {
  const navigation = useNavigation();
  const { user } = useConnect(userStore.getUser);
  const { article } = useConnect(articlesStore.getOpenedArticle);
  const { articleSlug } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      const fetchedArticle = await getArticle(articleSlug);
      articlesStore.setOpenedArticle(fetchedArticle.article);
      setIsLoading(false);
    };

    fetchArticle();
  }, [articleSlug]);

  const onFavoriteClick = async () => {
    if (!user) {
      return navigation.navigate("Login");
    }

    const updatedArticle = article?.favorited
      ? await deleteFavorites(articleSlug)
      : await addFavorites(articleSlug);

    if (updatedArticle) {
      articlesStore.setOpenedArticle(updatedArticle);
    }
  };

  if (isLoading || !article) {
    return <SkeletonArticle />;
  }

  return (
    <>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.title}>{article.title}</Text>
          </View>
          <View style={styles.authorData}>
            <AuthorInfo author={article.author} createdAt={article.createdAt} />
            <TouchableOpacity
              style={styles.favorites}
              onPress={onFavoriteClick}
            >
              <Text style={{ color: "#5CB85C" }}>{article.favoritesCount}</Text>
              <Ionicons
                name={article.favorited ? "ios-heart" : "ios-heart-outline"}
                size={24}
                color='#5CB85C'
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <View>
            <Text style={styles.text}>{article.body.replace(/\\n/g, " ")}</Text>
          </View>
          <TagList tags={article.tagList} />
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
