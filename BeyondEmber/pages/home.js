import LoadStyles from "../assets/stylesheets/main-style";
import CustomButton from "../components/button";
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';

const Home = ({navigation}) => {
    const [MainStyles, setStyles] = React.useState(null);

    React.useEffect(() => {
        const loadStyles = async () => {
          const loadedStyles = await LoadStyles();
          setStyles(loadedStyles);
        };
    
        loadStyles();
    }, []);

    function change(){
        console.log("change page");
        navigation.navigate('Profile');
    }

    return (
        <>
     {  MainStyles && <View style={[MainStyles.bg,MainStyles.container]}>
            <Text style={MainStyles.textPrimary}>Open up App.js to start working on your app!</Text>
            {/* <View style={MainStyles.btnAction}><Button title="Challenge" onPress={() => {}}/></View>
            */}
            <CustomButton type="action" text="Challenge"/>
            <CustomButton
            text="Submit"
            divStyle={MainStyles.btnPrimary}
            textStyle={MainStyles.btnPrimaryText} 
            onPress={change}
            />
        </View>}
      </>
    );
}

export default Home;