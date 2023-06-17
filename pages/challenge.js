import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
  Pressable,
  PixelRatio
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
import LoadStyles from "../assets/stylesheets/main-style.js";

import { useEffect, useState } from "react";

const remToDp = (rem) => rem * PixelRatio.get();

function Challenge({ navigation }) {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [MainStyles, setStyles] = React.useState(null);

  React.useEffect(() => {
      const loadStyles = async () => {
        const loadedStyles = await LoadStyles();
        setStyles(loadedStyles);
      };
  
      loadStyles();
  }, []);

  const rowRenderer = ({ item }) => (
    <Pressable style={MainStyles.containerPrimary} onPress={()=>chosenCat(item.cat)}>
      <View style={MainStyles.rowDiv}>
        <Text style={MainStyles.textHeader}>{item.cat}</Text>
      </View>
    </Pressable>
  );

  const chosenCat = (data) => {
    const dataObj = {
      cat: data
    };

    navigation.navigate("Challenge2", { dataObj }); // Pass the data object as a parameter
  };

  return (
    <View style={MainStyles?.container}>
      {MainStyles && 
      <FlatList
        data={categoryAsObjects()}
        keyExtractor={(item) => item.id}
        renderItem={rowRenderer}
        style={{width:'90%'}}
        showsVerticalScrollIndicator={false}
      ></FlatList>}
    </View>
  );
}

function Challenge2({ route, navigation }) {
  // const { data } = route.params; // Access the passed parameter
  // console.log(data); // Should display the passed data
  const {cat} = route.params;

  const [notes, setNotes] = useState([]);
  const [MainStyles, setStyles] = React.useState(null);

  React.useEffect(() => {
      const loadStyles = async () => {
        const loadedStyles = await LoadStyles();
        setStyles(loadedStyles);
      };
  
      loadStyles();
  }, []);

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

  //check if difficulty=hard: hardDiv, moderate:moderateDiv, easy: easyDiv

  const rowRenderer = ({ item }) => (
    <Pressable style={MainStyles.containerPrimary} onPress={()=>chosenCat(item)}>
      <View style={[MainStyles.rowDiv,{flex:1}]}>
        <Text style={[MainStyles.textHeader,{fontSize:18, width:'80%'}]}>{item.title}</Text>
        <View style={[MainStyles.hardDiv, {borderRadius:50, padding:5, position:'absolute', right:remToDp(3), top:remToDp(3)}]}>
          <Text style={{fontSize: 14, color: "#FFFFFF", flex: 1}}>Moderate</Text>
        </View>
      </View>
      <View style={[MainStyles.rowDiv,{flex:1}]}>
        <Text style={[MainStyles.textPrimary,{fontSize: 16, color: '#BDBDBB'}]}>27/09/2024</Text>
      </View>
    </Pressable>
  );

  const chosenCat = (data) => {
    navigation.navigate("Challenge3", { data }); 
    //navigation.navigate("Challenge2", { data }); // Pass the data object as a parameter
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
    <View style={MainStyles?.container}>
      {MainStyles && notes && 
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={rowRenderer}
        style={{width:'90%'}}
        showsVerticalScrollIndicator={false}
      ></FlatList>}
    </View>
  );
}

function Challenge3({route}) {
  const {data} = route.params;
  const suggestions = data.suggestions;
  const title = data.title;
  const id = data.id;
  const user = data.user? data.user : "Anne";
  //user, endDate, rewards/benefits(hardcode?)?
  console.log(route.params);
  console.log(suggestions);
  const [MainStyles, setStyles] = React.useState(null);

  React.useEffect(() => {
      const loadStyles = async () => {
        const loadedStyles = await LoadStyles();
        setStyles(loadedStyles);
      };
  
      loadStyles();
  }, []);

  const rowRenderer = ({ item }) => (
    <View style={[MainStyles.containerPrimary, {backgroundColor:'#D9D9D9'}]}>
      <View style={[MainStyles.colDiv,{flex:1, paddingHorizontal:remToDp(3)}]}>
        <Text style={[MainStyles.textHeader,{fontSize:16, width:'60%', color: '#5073EE'}]}>{item.user}</Text>
        <Text style={[MainStyles.textHeader,{fontSize:14, width:'60%', color: '#272A37'}]}>{item.idea}</Text>
        {/* <View style={[MainStyles.hardDiv, {borderRadius:50, padding:5, position:'absolute', right:remToDp(3), top:remToDp(3)}]}>
          <Text style={{fontSize: 14, color: "#FFFFFF", flex: 1}}>Moderate</Text>
        </View> */}
      </View>
    </View>
  );

  return(
    <>
    {MainStyles && 
    <View style={[MainStyles.container, {justifyContent:'start'}]}>
      <View style={[MainStyles.containerPrimary,{width:'90%', paddingHorizontal:remToDp(3), paddingTop:remToDp(3)}]}>
        <Text style={[MainStyles.textHeader,{color:'#BDBDBD',fontSize:16, marginBottom:remToDp(2)}]}>{user} Posted</Text>
        <Text style={[MainStyles.textHeader,{fontSize:20}]}>{title}</Text>
        <View style={[MainStyles.rowDiv, {justifyContent:'space-between'}]}>
          <Text style={[MainStyles.textHeader,{color:'#14FF9C', fontSize:14}]}>+5 Professional +200 EXP</Text>
          <Text style={[MainStyles.textHeader,{color:'#FF0000', fontSize:14}]}>23/07/2022</Text>
        </View>
      </View>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={rowRenderer}
        style={{width:'90%'}}
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </View>}
    </>
  );
}

const Stack = createNativeStackNavigator();
export default function ChallengeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Challenge1" component={Challenge} />
      <Stack.Screen name="Challenge2" component={Challenge2} />
      <Stack.Screen name="Challenge3" component={Challenge3} />
    </Stack.Navigator>
  );
}
