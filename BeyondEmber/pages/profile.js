import MainStyles from "../assets/stylesheets/main-style";
import CustomButton from "../components/button";
import { StyleSheet, Text, View } from 'react-native';
// import 

const Profile = ({navigation}) => {
    return (
        <View style={[MainStyles.bg,MainStyles.container]}>
          <Text style={MainStyles.textPrimary}>This is Profile Page</Text>
          {/* <View style={MainStyles.btnAction}><Button title="Challenge" onPress={() => {}}/></View>
           */}
           <CustomButton type="action" text="Challenge"/>
           <CustomButton 
           text="Submit"
           divStyle={{background:"#BB86FC",borderRadius:"10px", width:"fit-content", padding:".5rem"}}
           textStyle={{color:"#FFFFFF", fontSize:"18px"}} 
           />
        </View>
      );

}

export default Profile;