import LoadStyles from "../assets/stylesheets/main-style";
import { View,Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { logo, add } from "../assets/icons";
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
                {(title==='BeyondEmber' || title==='Avatar')&&
                    <Svg width={37} height={40} style={{marginRight:10}}>
                        <Path d={logo} 
                        fill="#BB86FC"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        ></Path>
                    </Svg>
                }

                <Text style={MainStyles.header}>
                    {title}
                </Text>
                {
                    (title==='Challenge') && 
                    <Svg width={30} height={30}>
                        <Path d={add} fill="#FFFFFF"></Path>
                    </Svg>
                }
            </View>
        </View>
        }
        </>
    );
}

export default Header;