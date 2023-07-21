import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  Input,
  Icon,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useConnect } from "remx";
import { userStore } from "../store";
import { signUp } from "../api/api";

export const SignUp = () => {
  const navigation = useNavigation();
  const user = useConnect(userStore.getUser);
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLoginClick = () => {
    navigation.navigate("Login");
  };

  const isInputsCorrect = () => {
    if (userName.length === 0) {
      setError("Please, fill in your username");
      return false;
    }
    if (email.length === 0 || !email.includes("@")) {
      setError("Please, fill correct email");
      return false;
    }
    if (password.length < 4) {
      setError("Password length should be more than 3 characters");
      return false;
    }

    return true;
  };

  const onSignUpPress = async () => {
    if (!isInputsCorrect()) {
      return;
    }

    const userData = await signUp({
      username: userName,
      email,
      password,
    });

    if (!userData.user) {
      setError(
        userData.errors.username
          ? `Username ${userData.errors.username}`
          : `Email ${userData.errors.email}`
      );
      return;
    }

    userStore.setUser(userData.user);
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView
      h={{
        base: "600px",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {error && (
            <Alert marginBottom={5} w='100%' status={"error"}>
              <Text>{error}</Text>
            </Alert>
          )}
          <View>
            <Text style={styles.title}>Sign Up</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <Input
                placeholder='Username'
                inputMode='text'
                size='lg'
                onChangeText={setUserName}
              />
            </View>
            <View style={styles.input}>
              <Input
                placeholder='Email'
                inputMode='email'
                size='lg'
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.input}>
              <Input
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr='2'
                      color='muted.400'
                    />
                  </Pressable>
                }
                placeholder='Password'
                size='lg'
                type={show ? "text" : "password"}
                onChangeText={setPassword}
              />
            </View>
            <Button
              color='#5CB85C'
              title='Create account'
              onPress={onSignUpPress}
            />
          </View>
          <View style={styles.login}>
            <Text>Have an account?</Text>
            <TouchableOpacity onPress={onLoginClick}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
  },
  inputContainer: {
    marginVertical: 40,
  },
  input: {
    width: 250,
    padding: 5,
    margin: 5,
  },
  login: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
  loginText: {
    color: "#5CB85C",
  },
});
