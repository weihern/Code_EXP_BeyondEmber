import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainStyles from './assets/stylesheets/main-style';
import CustomButton from './components/button';

export default function App() {
  return (
    <View style={[styles.container, MainStyles.bg]}>
      <Text style={MainStyles.textPrimary}>Open up App.js to start working on your app!</Text>
      {/* <View style={MainStyles.btnAction}><Button title="Challenge" onPress={() => {}}/></View>
       */}
       <CustomButton type="action" text="Challenge"/>
       <CustomButton 
       text="Submit"
       divStyle={{background:"#BB86FC",borderRadius:"10px", width:"fit-content", padding:".5rem"}}
       textStyle={{color:"#FFFFFF", fontSize:"18px"}} 
       />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
