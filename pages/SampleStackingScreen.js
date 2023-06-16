import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Title, Button } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { db } from "../components/firebase";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  onSnapshot,
  query,
  terminate,
} from "firebase/firestore";
import AddToFirestoreButton from "../components/AddToFirestoreButton";

function EventsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Title>Events!</Title>
      <AddToFirestoreButton data={{ title: "new document" }} />
      <Button
        onPress={() => {
          navigation.navigate("Events Page 2");
        }}
        icon="camera"
        mode="contained"
      >
        Go to next screen
      </Button>
    </View>
  );
}

function EventsScreen2() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "notes"),
      (snapshot) => {
        const documents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(documents);
        setNotes(documents);
      }
    );
    return () => unsubscribe();
  }, []);

  const rowRenderer = ({ item }) => (
    <View style={{ padding: 10, backgroundColor: "lightblue", margin: 2 }}>
      <Text>{item.title}</Text>
      <Button mode="contained" onPress={() => handleEditNote(item.id)}>
        Edit Note
      </Button>
    </View>
  );

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
      <Text>Hello! This is the second screen display flatlist!!!!!</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={rowRenderer}
      ></FlatList>
    </View>
  );
}

const Stack = createStackNavigator();

export default function EventsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Events Home" component={EventsScreen} />
      <Stack.Screen name="Events Page 2" component={EventsScreen2} />
    </Stack.Navigator>
  );
}
