import { StyleSheet, Text, View, ScrollView } from "react-native";

export const TagList = ({
  tags,
  selectedTag,
  selectTag,
}: {
  tags: string[];
  selectedTag?: string;
  selectTag?(tag: string): void | undefined;
}) => {
  return (
    <View style={styles.tagListContainer}>
      <ScrollView horizontal={true}>
        {tags.map((tag, index) => (
          <Text
            key={index}
            style={[styles.tag, selectedTag === tag && styles.selectedTag]}
            onPress={selectTag ? () => selectTag(tag) : undefined}
          >
            {tag}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tagListContainer: {
    marginBottom: 20,
  },
  tag: {
    color: "#aaa",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedTag: {
    backgroundColor: "#5CB85C",
    color: "white",
    overflow: "hidden",
  },
});
