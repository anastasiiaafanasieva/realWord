import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Divider } from "native-base";
import type { Article } from "../../types/article";
import { useNavigation } from "@react-navigation/native";
import { AuthorInfo } from "../AuthorInfo";
import Ionicons from "@expo/vector-icons/Ionicons";

type ArticleItemProps = {
  article: Article;
};

export const ArticleItem = ({ article }: ArticleItemProps) => {
  const navigation = useNavigation();
  const { author, createdAt, title, description, tagList, slug } = article;

  const onArticleClick = (selectedSlug: string) => {
    navigation.navigate("Article", { articleSlug: selectedSlug });
  };

  return (
    <>
      <Divider />
      <TouchableOpacity
        style={styles.container}
        onPress={() => onArticleClick(slug)}
      >
        <View style={styles.authorData}>
          <AuthorInfo author={author} createdAt={createdAt} />
          <View style={styles.favorites}>
            <Text style={{ color: "#bbb" }}>{article.favoritesCount}</Text>
            <Ionicons
              name={article.favorited ? "ios-heart" : "ios-heart-outline"}
              size={24}
              color='#5CB85C'
            />
          </View>
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.tagList}>
            {tagList.map((tag, index) => (
              <Text key={index} style={styles.tagListItem}>
                {tag}
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  authorData: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  favorites: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  title: {
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 3,
  },
  description: {
    color: "#999",
    fontWeight: "300",
    marginBottom: 15,
  },
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  tagList: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  tagListItem: {
    color: "#aaa",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});
