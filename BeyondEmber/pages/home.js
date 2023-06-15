import MainStyles from "../assets/stylesheets/main-style";
import CustomButton from "../components/button";
import { StyleSheet, Text, View } from 'react-native';

const Home = ({navigation}) => {
    function change(){
        console.log("change page");
        navigation.navigate('Profile');
    }
    return (
      <View style={[MainStyles.bg,MainStyles.container]}>
        <Text style={MainStyles.textPrimary}>Open up App.js to start working on your app!</Text>
        {/* <View style={MainStyles.btnAction}><Button title="Challenge" onPress={() => {}}/></View>
         */}
         <CustomButton type="action" text="Challenge"/>
         <CustomButton
         text="Submit"
         divStyle={{background:"#BB86FC",borderRadius:10, padding:10}}
         textStyle={{color:"#FFFFFF", fontSize:18}} 
         onPress={change}
         />
      </View>
    );
}

export default Home;