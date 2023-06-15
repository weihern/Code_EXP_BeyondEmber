import React from "react";
import MainStyles from "../assets/stylesheets/main-style";
import { Pressable, Text } from "react-native";

export default function CustomButton({type, divStyle, textStyle, text}){
    const [bgStyle, setBgStyle] = React.useState(divStyle); 
    const [innerStyle, setInnerStyle] = React.useState(textStyle);

    React.useEffect(()=>{
        if(type==="action"){
            setBgStyle(MainStyles.btnAction);
            setInnerStyle(MainStyles.btnActionText);
        }
    },[])
    
    return(
        <>
        <Pressable style={[MainStyles.btnDf, bgStyle]}>
            <Text style={[MainStyles.btnDfText, innerStyle]}>{text}</Text>
        </Pressable>
        </>
    )
}