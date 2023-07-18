import { StyleSheet, Text, View, Image } from "react-native";

type AuthorInfoProps = {
    author: {
        username: string;
        bio: null;
        image: string;
        following: boolean;
      };
      createdAt: string;
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

export const AuthorInfo = ({ author, createdAt }: AuthorInfoProps) => {
    const date = new Date(createdAt);
    return (
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
    )
}

const styles = StyleSheet.create({
    authorInfoContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
    },
    imageContainer: {
        width: 32,
        height: 32,
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
  });