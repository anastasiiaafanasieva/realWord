import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { userStore } from "../../store";

export const HeaderRightButton = () => {
  const navigation = useNavigation();
  const onButtonClick = () => {
    userStore.logout();
    navigation.navigate("Home");
  };
  return (
    <>
      <TouchableOpacity onPress={() => onButtonClick()}>
        <Ionicons name='ios-exit-outline' size={30} color='white' />
      </TouchableOpacity>
    </>
  );
};
