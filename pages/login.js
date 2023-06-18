import React, { createContext, useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import firebase from "../components/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase";
import { UserContext } from "../components/UserContext";

const LoginScreen = ({ navigation }) => {
    const UsernameContext = createContext("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { updateUser } = useContext(UserContext);
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                // Signed in
                updateUser(username);
                navigation.navigate("HomeTabs");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
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
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default LoginScreen;
