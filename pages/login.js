import React, { createContext, useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import firebase from "../components/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase";
import { UserContext } from "../components/UserContext";
import LoadStyles from "../assets/stylesheets/main-style";
import { CurrentRenderContext } from "@react-navigation/native";
import { Icon } from "../components/icons";
import Toast from "react-native-root-toast";

const LoginScreen = ({ navigation }) => {
  const UsernameContext = createContext("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [MainStyles, setStyles] = React.useState(null);
  const { updateUser } = useContext(UserContext);
  React.useEffect(() => {
    const loadStyles = async () => {
      const loadedStyles = await LoadStyles();
      setStyles(loadedStyles);
    };

    loadStyles();
  }, []);
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        updateUser(username);
        navigation.navigate("HomeTabs");
        // ...
      })
      .catch((error) => {
        let toast = Toast.show("Failed to Login: Incorrect crediential ", {
          duration: Toast.durations.LONG,
          backgroundColor: "#BB86FC", // Set the background color here
          textColor: "white",
          fontFamily: "righteous",
        });

        setTimeout(function hideToast() {
          Toast.hide(toast);
        }, 2000);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  const handleSignUp = () => {
    let toast = Toast.show("Signup Option not available in MVP", {
      duration: Toast.durations.LONG,
      backgroundColor: "#BB86FC", // Set the background color here
      textColor: "white",
      fontFamily: "righteous",
    });

    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 2000);
  };
  return (
    <>
      {MainStyles && (
        <View style={[MainStyles.bg, MainStyles.container]}>
          <Icon style={{ margin: 30 }} name="beyondember" width={50} height={50} color="#BB86FC" />
          <Text style={styles.text}>BeyondEmber</Text>

          <TextInput
            style={styles.input}
            placeholder="test@hotmail.com"
            placeholderTextColor="grey"
            onChangeText={setUsername}
            value={username}
          />

          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="grey"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
            returnKeyType="done" // Set the returnKeyType to "done" for the login action
            onSubmitEditing={handleLogin}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#824AAE",
              padding: 10,
              borderRadius: 75,
            }}
            onPress={handleLogin}
          >
            <Text style={{ color: "white", fontFamily: "righteous", textAlign: "center" }}>Play!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={{ marginTop: 10, color: "#A967DC", fontFamily: "righteous", textAlign: "center" }}>
              Don't have an account? Sign up now!
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    width: "75%",
    height: 40,
    borderWidth: 1,
    color: "white",
    textAlign: "left",
    backgroundColor: "#323644",
    marginBottom: 12,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  text: {
    color: "#A372CA",
    fontFamily: "righteous",
    fontSize: 40,
    marginBottom: 60,
  },
});

export default LoginScreen;
