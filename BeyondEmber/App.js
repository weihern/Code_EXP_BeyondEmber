import { StatusBar } from 'expo-status-bar';
import MainStyles from './assets/stylesheets/main-style';
import CustomButton from './components/button';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/home';
import Profile from './pages/profile';
import Header from './components/header';

export default function App() {

  const Stack = createNativeStackNavigator();

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => <Header title="BeyondEmber"/>,
            headerStyle: {
              borderBottomWidth: 0, // Set the border width to 0
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          header: () => <Header title="Avatar"/>,
          headerStyle: {
            borderBottomWidth: 0, // Set the border width to 0
          },
          headerShadowVisible: false,
        }}
        />
      </Stack.Navigator>
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
