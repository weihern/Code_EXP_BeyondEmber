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

function Challenge({ navigation }) {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  const rowRenderer = ({ item }) => (
    <View style={{ padding: 10, backgroundColor: "lightblue", margin: 2 }}>
      <Text>{item.cat}</Text>
      {/* <Button mode="contained" onPress={() => chosenCat(item.cat)}>
        Edit Note
      </Button> */}
    </View>
  );
  const chosenCat = (data) => {
    navigation.navigate("Challenge2", { data }); // Pass the data object as a parameter
  };

  return (
    <FlatList
      data={categoryAsObjects()}
      keyExtractor={(item) => item.id}
      renderItem={rowRenderer}
    />
  );
}

function Challenge2({ route }) {
  // const { data } = route.params; // Access the passed parameter
  // console.log(data); // Should display the passed data

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notes"), (snapshot) => {
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
    navigation.navigate("Challenge2", { data }); // Pass the data object as a parameter
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
export default function ChallengeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Challenge1" component={Challenge} />
      <Stack.Screen name="Challenge2" component={Challenge2} />
      {/* <Stack.Screen name="Challenge3" component={Challenge3} /> */}
    </Stack.Navigator>
  );
}
