import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Navigation } from "../navigation/navigation";

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};
