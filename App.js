import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./pages/profile";
import ChallengeStack from "./pages/challenge.js";
import Home from "./pages/home";


import Header from "./components/header";
import {auth} from './components/firebase'; 

import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import {Icon} from "./components/icons";
import { PixelRatio } from "react-native";


export default function App() {
  const Tab = createBottomTabNavigator();

  const remToDp = (rem) => rem * PixelRatio.get();
  // const user = auth.currentUser;
  // if (!user) {
  //   // User is not logged in, render the login screen
  //   return <LoginScreen />;
  // }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon 
            width={25} height={25} color={color} name={route.name}/>

          },
          tabBarActiveTintColor: "#BB86FC",
          tabBarInactiveTintColor: "#BDBDBD",
          tabBarStyle: {
            backgroundColor: "#272A37", // Set the background color of the tab bar
            borderTopWidth: 0.5,
            borderTopColor: "#414657",
            paddingBottom: remToDp(1) + 15,
            paddingTop: remToDp(1),
            paddingHorizontal: 5,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          options={{
            header: () => <Header title="BeyondEmber"/>,
            // The style below is not applying 
          }}
          component={Home}
        />
        <Tab.Screen
          options={{
            header: () => <Header title="Challenge"/>,
            
          }}
          name="Challenge"
          component={ChallengeStack}
        />
        <Tab.Screen
          options={{
            header: () => <Header title="Profile"/>,
          }}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}