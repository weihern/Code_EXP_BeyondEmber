import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./pages/profile";
import Challenge from "./pages/challenge.js";
import Home from "./pages/home";
import Header from "./components/header";

import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoadStyles from "./assets/stylesheets/main-style";
import * as React from "react";
import { logo, add } from "./assets/icons";

export default function App() {
  const Tab = createBottomTabNavigator();
  const [MainStyles, setStyles] = React.useState(null);
  React.useEffect(() => {
    const loadStyles = async () => {
      try {
        const loadedStyles = await LoadStyles();
        setStyles(loadedStyles);
      } catch (error) {
        console.log("Error loading styles:", error);
      }
    };

    loadStyles();
  }, []);
  if (MainStyles === null) {
    // Render a loading state or placeholder UI until styles are loaded
    return null;
  }

  console.log(MainStyles);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            //Set the icon based on which route it is (name of the tab)
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Challenge") {
              iconName = "apple";
            } else if (route.name === "Profile") {
              iconName = focused ? "user" : "user-o";
            }
            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
            // Alternatively, if you dont want to use expo icon images, u can use download image via source path
            // return <Image source={iconImageSource} style={{ width: size, height: size, tintColor: color }} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#272A37", // Set the background color of the tab bar
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
            header: () => <Header title="BeyondEmber"/>,
            
          }}
          name="Challenge"
          component={Challenge}
        />
        <Tab.Screen
          options={{
            header: () => <Header title="BeyondEmber"/>,
          }}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
  // return (
  //   <View style={[styles.container, MainStyles.bg]}>
  //     <Text style={MainStyles.textPrimary}>Open up App.js to start working on your app!</Text>
  //     {/* <View style={MainStyles.btnAction}><Button title="Challenge" onPress={() => {}}/></View>
  //      */}
  //      <CustomButton type="action" text="Challenge"/>
  //      <CustomButton
  //      text="Submit"
  //      divStyle={{background:"#BB86FC",borderRadius:"10px", width:"fit-content", padding:".5rem"}}
  //      textStyle={{color:"#FFFFFF", fontSize:"18px"}}
  //      />
  //     <StatusBar style="auto" />
  //   </View>
  // );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
