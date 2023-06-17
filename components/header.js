import LoadStyles from "../assets/stylesheets/main-style";
import { View,Text } from "react-native";
// import Svg, { Path } from "react-native-svg";
// import { logo, add } from "../assets/icons";
import { Icon } from "./icons";
import * as React from 'react';

const Header = ({title}) => {
    const [MainStyles, setStyles] = React.useState(null);

    React.useEffect(() => {
        const loadStyles = async () => {
          const loadedStyles = await LoadStyles();
          setStyles(loadedStyles);
        };
    
        loadStyles();
    }, []);

    return(
    <>
       { MainStyles && 
       <View>
            <View style={{backgroundColor:"#272A37",height:44, width:"100%"}}></View>
            <View style={MainStyles.headerDiv}>
                {(title==='BeyondEmber' || title==='Avatar' || title ==='Profile')&&
                    <Icon width={37} height={40} name="home" color="#BB86FC"/>
                }
                {(title==='Challenge') &&
                    <Icon width={40} height={40} name="challenge" color="#BB86FC"/>
                }
                <Text style={MainStyles.header}>
                    {title}
                </Text>
                {
                    (title==='Challenge') && 
                    <Icon width={30} height={30} name="add" color="#FFFFFF"/>
                }
            </View>
        </View>
        }
        </>
    );
}

export default Header;