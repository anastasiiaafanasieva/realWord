import { Text, View, StyleSheet } from "react-native";
import { Divider } from "native-base";

export const EmptyArticles = () => {
  return (
      <View>
        <Divider />
        <Text style={styles.emptyArticles}>
          No articles with such tag were found...
        </Text>
      </View>
  );
};

const styles = StyleSheet.create({
  emptyArticles: {
    marginVertical: 24,
  },
});
