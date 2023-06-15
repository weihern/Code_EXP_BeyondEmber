import React from "react";
import LoadStyles from "../assets/stylesheets/main-style";
import { Pressable, Text } from "react-native";

export default function CustomButton({onPress, type, divStyle, textStyle, text}){
    const [bgStyle, setBgStyle] = React.useState(divStyle); 
    const [innerStyle, setInnerStyle] = React.useState(textStyle);
    const [MainStyles, setStyles] = React.useState(null);

    React.useEffect(() => {
        const loadStyles = async () => {
          const loadedStyles = await LoadStyles();
          setStyles(loadedStyles);
        };
    
        loadStyles();
    }, []);

    React.useEffect(()=>{
        if(MainStyles && type==="action"){
            setBgStyle(MainStyles.btnAction);
            setInnerStyle(MainStyles.btnActionText);
        }
    },[MainStyles])
    
    return(
        <>
        {MainStyles && <Pressable style={[MainStyles.btnDf, bgStyle]} onPress={onPress}>
            <Text style={[MainStyles.btnDfText, innerStyle]}>{text}</Text>
        </Pressable>}
        </>
    )
}