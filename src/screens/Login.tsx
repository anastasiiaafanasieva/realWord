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
import { login } from "../api/api";

export const Login = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSignUpClick = () => {
    navigation.navigate("SignUp");
  };

  const onLoginClick = async () => {
    const userData = await login({ email, password });

    if (!userData) {
      setError("Oops, cannot login");
      return;
    }

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
            <Text style={styles.title}>Login</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <Input
                InputLeftElement={
                  <Icon as={<MaterialIcons name='person' />} ml='2' />
                }
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
            <Button color='#5CB85C' title='Login' onPress={onLoginClick} />
          </View>
          <View style={styles.signUp}>
            <Text>Haven't account?</Text>
            <TouchableOpacity onPress={() => onSignUpClick()}>
              <Text style={styles.signUpText}>Create an account</Text>
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
  signUp: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
  signUpText: {
    color: "#5CB85C",
  },
});
