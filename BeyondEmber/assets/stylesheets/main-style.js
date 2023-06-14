import { StyleSheet } from "react-native";
import * as Font from 'expo-font';

/*colors*/
const mainPurple = "#BB86FC";
const red = "#E03232";
const mainDark = "#272A37";
const inactive = "#BDBDBB";
const divColor = "#323644";
const pink = "#FF005C";
const hard = "#EA3636";
const moderate = "#EAA236";
const easy = "#36EA5D";
const secondaryGrey = "#414657";
const lightGrey = "#D9D9D9";
const orange = "#FFA184";
const yellow = "#FDFF84";
const levelBar = "#FFE500";
const textLight =  "#FFFFFF";
const textDark = "#272A37";
const textGrey = "#BDBDBD";

/**import font family */
Font.loadAsync({
    'righteous': require('../fonts/Righteous/Righteous-Regular.ttf'),
    'alegraya sans reg':require('../fonts/Alegreya_Sans/AlegreyaSans-Regular.ttf')
})


const MainStyles = StyleSheet.create({
    bg: {
        backgroundColor: mainDark
    },

    containerPrimary:{
        backgroundColor: divColor,
        borderRadius: "10px"
    },

    btnPrimary: {
        backgroundColor: mainPurple
    },

    btnAction: {
        backgroundColor: pink,
        borderRadius: "20px",
        height: "55px",
        width: "220px",
        alignItems:'center',
        justifyContent:'center',
        display:'flex'
    },

    btnActionText:{
        fontFamily: 'righteous',
        fontSize: "30px",
        color: textLight
    },

    icon: {
        fill: inactive
    },

    iconActive: {
        fill: mainPurple
    },

    textPrimary :{
        color: textLight,
        fontFamily: 'alegraya sans reg'
    }
});

export default MainStyles;