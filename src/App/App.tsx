import { SafeAreaView, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { Home } from "../screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ArticleScreen } from "../screens/Article";

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='Article' component={ArticleScreen} options={{ title: 'Article' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </>
  );
};
