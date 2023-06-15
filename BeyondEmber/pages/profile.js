import LoadStyles from "../assets/stylesheets/main-style";
import CustomButton from "../components/button";
import { StyleSheet, Text, View, PixelRatio } from 'react-native';
import * as React from 'react';
// import 

const Profile = ({navigation}) => {
    const remToDp = (rem) => rem * PixelRatio.get();

    const [MainStyles, setStyles] = React.useState(null);

    React.useEffect(() => {
        const loadStyles = async () => {
          const loadedStyles = await LoadStyles();
          setStyles(loadedStyles);
        };
    
        loadStyles();
    }, []);

    return (
        <>
        {MainStyles && 
        <View style={[MainStyles.bg, MainStyles.container]}>
          <Text style={MainStyles.textPrimary}>This is Profile Page</Text>
          {/* <View style={MainStyles.btnAction}><Button title="Challenge" onPress={() => {}}/></View>
           */}
           <CustomButton type="action" text="Challenge"/>
           <CustomButton 
           text="Submit"
           divStyle={{backgroundColor:"#BB86FC",borderRadius:10, padding:remToDp(2), width:'auto'}}
           textStyle={{color:"#FFFFFF", fontSize:18}} 
           />
        </View>}
        </>
      );

}

export default Profile;