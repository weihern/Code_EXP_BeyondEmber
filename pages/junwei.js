import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import categoryAsObjects from "../data/categories.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  onSnapshot,
  query,
  terminate,
} from "firebase/firestore";
import { db } from "../components/firebase";

import { useEffect, useState } from "react";

function Challenge5({ navigation }) {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  const rowRenderer = ({ item }) => (
    <View style={{ padding: 10, backgroundColor: "lightblue", margin: 2 }}>
      {/* <Text>{item.cat}</Text> */}
      <Button mode="contained" title={item.cat} onPress={() => chosenCat(item.cat)}/>
    </View>
  );
  const chosenCat = (data) => {
    navigation.navigate("Challenge6", { data }); // Pass the data object as a parameter
  };

  return (
    <FlatList
      data={categoryAsObjects()}
      keyExtractor={(item) => item.id}
      renderItem={rowRenderer}
    />
  );
}

function Challenge6({ route }) {
  // const { data } = route.params; // Access the passed parameter
  // console.log(data); // Should display the passed data

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "challenges"), (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(documents);
      setNotes(documents);
    });
    return () => unsubscribe();
  }, []);

  const rowRenderer = ({ item }) => (
    <View style={{ padding: 10, backgroundColor: "lightblue", margin: 2 }}>
      <Text>{item.title}</Text>
      {/* <Button mode="contained" onPress={() => handleEditNote(item.id)}>
        Edit Note
      </Button> */}
    </View>
  );

  const chosenCat = (data) => {
    navigation.navigate("Challenge6", { data }); // Pass the data object as a parameter
  };

  const handleEditNote = async (noteId) => {
    try {
      const noteRef = doc(db, "notes", noteId);
      await updateDoc(noteRef, {
        // Update the desired fields with new values
        title: "Updated Titledfdf",
      });
      console.log("Note updated successfully");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <View>
      <Text>Hello! This is ur category challenges screen !!!!!</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={rowRenderer}
      ></FlatList>
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function ChallengeStack1() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Challenge5" component={Challenge5} />
      <Stack.Screen name="Challenge6" component={Challenge6} />
      {/* <Stack.Screen name="Challenge7" component={Challenge7} /> */}
    </Stack.Navigator>
  );
}
