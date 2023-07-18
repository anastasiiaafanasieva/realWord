import { FlatList, View } from "react-native";
import { ArticleItem } from "../ArticleItem";
import { Article } from "../../types/article";

type ArticleListProps = {
  articles: Article[];
};

export const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <View>
      <FlatList
        data={articles}
        renderItem={({ item }) => <ArticleItem article={item} />}
        keyExtractor={(item) => item.slug}
      />
    </View>
  );
};
