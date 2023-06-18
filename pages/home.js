import LoadStyles from "../assets/stylesheets/main-style";
import CustomButton from "../components/button";
import { Button, StyleSheet, Text, View } from "react-native";
import * as React from "react";
// import ChallengeStack1 from "./junwei";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../components/UserContext";

import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../components/firebase";

const HomeMain = ({ navigation }) => {
    const { username } = useContext(UserContext);
    const [MainStyles, setStyles] = React.useState(null);
    console.log(username);
    React.useEffect(() => {
        const loadStyles = async () => {
            const loadedStyles = await LoadStyles();
            setStyles(loadedStyles);
        };

        loadStyles();
    }, []);
    const [profile, setProfile] = useState([]);

    // get user email from token
    const email = username;
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "users"), where("__name__", "==", email)),
            (snapshot) => {
                const documents = snapshot.docs.reduce((acc, doc) => {
                    acc = {
                        ...doc.data(),
                    };
                    return acc;
                }, {});
                // console.log(documents);
                setProfile(documents);
            }
        );
        return () => unsubscribe();
    }, []);

    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "challenges"), (snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            // console.log(documents);
            setNotes(documents);
        });
        return () => unsubscribe();
    }, []);

    console.log(notes);
    console.log(profile);
    const projects = [
        "SGX Marketing Project",
        "DBS Data Analytic Project",
        "Ember Mobile App Project",
    ];
    console.log(projects);

  
  function change(id) {
    console.log("change page");
    navigation.navigate("Profile");
    if (id === "jw") {
      navigation.navigate("ChallengeStack1");
    } else if (id === "wh") {
      //weihern put the name of navigator screen here
      navigation.navigate("ChallengeStack1");
    } else if (id === "b") {
      //brian put the name of navigator screen here
      navigation.navigate("ChallengeStack1");
    } else{
      navigation.navigate("Home2");
    }

    return (
        <>
            {MainStyles && (
                <View style={[MainStyles.bg, MainStyles.container]}>
                    {/* <Text style={MainStyles.textPrimary}>Open up App.js to start working on your app!</Text> */}
                    {/* <View style={MainStyles.btnAction}><Button title="Challenge" onPress={() => {}}/></View>
                     */}
                    {/* <CustomButton type="action" text="Challenge"/>
            <CustomButton
            text="Submit"
            divStyle={MainStyles.btnPrimary}
            textStyle={MainStyles.btnPrimaryText} 
            onPress={change}
            /> */}
                    <Button
                        title="Jun Wei"
                        onPress={(e) => {
                            change("jw");
                        }}
                    />
                    <Button
                        title="Wei Hern"
                        onPress={(e) => {
                            change("wh");
                        }}
                    />
                    <Button
                        title="Brian"
                        onPress={(e) => {
                            change("b");
                        }}
                    />
                    <Button
                        title="Hui Ru"
                        onPress={(e) => {
                            change("hr");
                        }}
                    />
                </View>
            )}
        </>
    );
};
}

const Stack = createNativeStackNavigator();
export default function Home() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeMain} />
      {/* <Stack.Screen name="ChallengeStack1" component={ChallengeStack1} /> */}
      {/* <Stack.Screen name="Challenge7" component={Challenge3} /> */}
      {/* Wei Hern & Brian to add your Page's component! then change the navigation in change function (line 25-31)*/}
    </Stack.Navigator>
  );
}

// export default Home;
