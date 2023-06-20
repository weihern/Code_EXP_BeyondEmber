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
  PixelRatio,
  TextInput,
  Keyboard,
  KeyboardAvoidingView
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
import CustomButton from '../components/button.js'
import LoadStyles from "../assets/stylesheets/main-style.js";
import {Icon} from "../components/icons.js"

import { handleAddSuggestion } from "../components/AddSuggestion";
import { useEffect, useState } from "react";
import Toast from 'react-native-root-toast';

// import { KeyboardAvoidingView } from "react-native-web";

const remToDp = (rem) => rem * PixelRatio.get();

export function Challenge({ navigation }) {
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

  const chosenCat = (cat) => {
    // const dataObj = {
    //   cat: data
    // };

    navigation.navigate("Challenge2", { cat }); // Pass the data object as a parameter
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

export function Challenge2({ route, navigation }) {
  // const { data } = route.params; // Access the passed parameter
  // console.log(data); // Should display the passed data
  const {cat} = route.params;
  // console.log(route.params);
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
    <>
    { item.category === cat && <Pressable style={MainStyles.containerPrimary} onPress={()=>chosenCat(item)}>
      <View style={[MainStyles.rowDiv]}>
        <Text style={[MainStyles.textHeader,{fontSize:18, width:'80%'}]}>{item.title}</Text>
        <View style={[item.difficulty==='Hard'? MainStyles.hardDiv : item.difficulty==='Medium'? MainStyles.moderateDiv: MainStyles.easyDiv, {borderRadius:50, padding:5, position:'absolute', right:remToDp(3), top:remToDp(3)}]}>
          <Text style={{fontSize: 14, color: "#FFFFFF", flex: 1}}>{item.difficulty}</Text>
        </View>
      </View>
      <View style={[MainStyles.rowDiv]}>
        <Text style={[MainStyles.textPrimary,{fontSize: 16, color: '#BDBDBB'}]}>27/09/2024</Text>
      </View>
    </Pressable>}
    </>
  );

  const chosenCat = (data) => {
    navigation.navigate("Challenge3", { data }); 
    //navigation.navigate("Challenge2", { data }); // Pass the data object as a parameter
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

export function Challenge3({navigation, route}) {
  const {data} = route.params;
  // const suggestions = data.suggestions;
  const [suggestions, setSuggestions] = useState(data.suggestions)
  const title = data.title;
  const id = data.id;
  const user = data.user? data.user : "Anne";
  const [MainStyles, setStyles] = React.useState(null);
  const [inputText, setInputText] = React.useState("");
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [inputFocus, setInputFocus] = useState(false);

  React.useEffect(() => {
      const loadStyles = async () => {
        const loadedStyles = await LoadStyles();
        setStyles(loadedStyles);
      };
  
      loadStyles();
  }, []);

  const rowRenderer = ({ item, index }) => (
    <View key={index} style={[MainStyles.containerPrimary, {backgroundColor:'#D9D9D9', justifyContent:'space-between', flexDirection:'row'}]}>
      <View style={[MainStyles.colDiv,{flex:1, paddingHorizontal:remToDp(3)}]}>
        <Text style={[MainStyles.textHeader,{fontSize:16, width:'80%', color: '#5073EE'}]}>{item.user}</Text>
        <Text style={[MainStyles.textHeader,{fontSize:14, width:'80%', color: '#272A37'}]}>{item.idea}</Text>  
      </View>
      <View style={{display: 'flex', flexDirection: 'row', padding:5, alignItems:'center', justifyContent:'center'}}>
          <View style={{alignItems:'center', justifyContent:'center', marginEnd:5}}>
            <Icon name="like"/>
            <Text style={{fontSize: 12, color: "#000000"}}>{item.like}</Text>
          </View>
          <View style={{alignItems:'center', justifyContent:'center', marginEnd:5}}>
            <Icon name="dislike"/>
            <Text style={{fontSize: 12, color: "#000000"}}>{item.dislike}</Text>
          </View>
        </View>
    </View>
  );

  const handleChangeText = (input) => {
    setInputText(input);
  }

  const submitInput = async() => {
    const input = {
      "id": data.id,
      "idea": inputText,
      "user": "Anne",
      "dislike": 0, "like": 0
    }
    setSuggestions(suggestions => [...suggestions, input]);
    const result = await handleAddSuggestion(input);
    if(result){
      let toast = Toast.show('Suggestion Added Successfully', {
        duration: Toast.durations.LONG,
        backgroundColor: '#BB86FC', // Set the background color here
        textColor: 'white',
        fontFamily: 'righteous'
      });

      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
    }else{
      let toast = Toast.show('Failed in Adding Suggestion', {
        duration: Toast.durations.LONG,
        backgroundColor: '#BB86FC', // Set the background color here
        textColor: 'white',
        fontFamily: 'righteous'
      });

      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      ({ endCoordinates }) => {
        setKeyboardOffset(endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOffset(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleInputFocus = () => {
    setInputFocus(true);
  }

  const handleInputBlur = () => {
    setInputFocus(false);
  }

  return(
    <>
    {MainStyles && 
      <View style={[MainStyles.container, {justifyContent:'start'}, inputFocus && {height:'58%'}]}>
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={rowRenderer}
          style={{width:'90%', marginBottom:80}}
          showsVerticalScrollIndicator={false}
        ></FlatList>
        
          <View style={[MainStyles.containerPrimary,{backgroundColor:'#F5F5F5',bottom: 20, position:'absolute', width:'90%', padding:10 }, MainStyles.shadowDiv]}>
            <TextInput
              value={inputText}
              onChangeText={handleChangeText}
              placeholder="Share your idea here..."
              placeholderTextColor="#7F7F7F"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              multiline={true}
              style={{color:'#272A37',  minHeight:50}}
            />
            <CustomButton onPress={submitInput} 
            divStyle={{backgroundColor:"#E03232",borderRadius:20, padding:remToDp(2), marginTop:remToDp(2), flex: 1, justifyContent:'center', alignItems:'center', alignSelf:'flex-end'}}
            textStyle={{color:"#FFFFFF", fontSize:14, alignSelf:'flex-start'}} 
            text="Submit"/>
          </View>

      </View>}
    </>
  );
}
