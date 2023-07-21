import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { useConnect } from "remx";
import { userStore } from "../store";

import { Home } from "../screens/Home";
import { ArticleScreen } from "../screens/Article";
import { Login } from "../screens/Login";
import { SignUp } from "../screens/SignUp";

import { HeaderLeftButton } from "../components/HeaderButtons";
import { HeaderRightButton } from "../components/HeaderRightButton";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const { user } = useConnect(userStore.getUser);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#5CB85C",
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: user ? "Home" : "Feed",
            headerLeft: HeaderLeftButton,
            headerRight: user && HeaderRightButton,
          }}
        />
        <Stack.Screen
          name='Article'
          component={ArticleScreen}
          options={{ title: "Article" }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ title: "Login" }}
          screenOptions={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{ title: "Create an account" }}
          screenOptions={{
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
