import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { userStore } from "../../store";
import { useConnect } from "remx";

export const HeaderLeftButton = () => {
  const navigation = useNavigation();
  const onButtonClick = () => {
    navigation.navigate("Login");
  };
  const { user } = useConnect(userStore.getUser);

  if (user) {
    return (
      <View style={styles.userContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.authorLogo}
            source={{
              uri: user?.image,
            }}
          />
        </View>
      </View>
    );
  }
  return (
    <>
      <TouchableOpacity onPress={() => onButtonClick()}>
        <Ionicons name='person-circle-outline' size={30} color='white' />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 27,
    height: 27,
  },
  authorLogo: {
    width: 27,
    height: 27,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
  },
});
