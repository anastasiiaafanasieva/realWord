import { StyleSheet, Text, View } from "react-native";

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
      <View style={styles.tagList}>
        {tags.map((tag, index) => (
          <Text
            key={index}
            style={[styles.tag, selectedTag === tag && styles.selectedTag]}
            onPress={selectTag ? () => selectTag(tag) : undefined}
          >
            {tag}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tagListContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
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
    overflow: "hidden",
  },
});
