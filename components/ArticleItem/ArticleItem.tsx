import { StyleSheet, Text, View, Image } from "react-native";
import { Divider } from "native-base";
import type { Article } from "../../app/types/article";

type ArticleItemProps = {
  article: Article;
};

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const ArticleItem = ({ article }: ArticleItemProps) => {
  const { author, createdAt, title, description, tagList } = article;
  const date = new Date(createdAt);

  return (
    <>
      <Divider />
      <View style={styles.container}>
        <View style={styles.authorInfoContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.authorLogo}
              source={{
                uri: author.image,
              }}
            />
          </View>
          <View style={styles.authorData}>
            <View>
              <Text style={styles.userName}>{author.username}</Text>
            </View>
            <View>
              <Text style={styles.date}>
                {date.toLocaleDateString("en-US", options)}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.readMore}>Read more...</Text>
          </View>
          <View style={styles.tagList}>
            {tagList.map((tag, index) => (
              <Text key={index} style={styles.tagListItem}>
                {tag}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  imageContainer: {
    width: 32,
    height: 32,
  },
  authorInfoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  authorData: {
    display: "flex",
    gap: 1,
  },
  authorLogo: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
  userName: {
    color: "#5CB85C",
    fontWeight: "bold",
  },
  date: {
    color: "#bbb",
  },
  title: {
    fontWeight: "800",
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
  readMore: {
    color: "#bbb",
    fontWeight: "300",
    fontSize: 14,
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
