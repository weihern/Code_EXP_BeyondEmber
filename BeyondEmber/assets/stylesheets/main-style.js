import { StyleSheet, PixelRatio } from "react-native";
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

const remToDp = (rem) => rem * PixelRatio.get();

const loadFonts = async () => {
    await Font.loadAsync({
      'righteous': require('../fonts/Righteous/Righteous-Regular.ttf'),
      'alegraya sans reg': require('../fonts/Alegreya_Sans/AlegreyaSans-Regular.ttf')
    });
};
  
loadFonts();

const LoadStyles = async() => {
    await loadFonts();
    return StyleSheet.create({
        headerDiv:{
            backgroundColor: mainDark,
            justifyContent:'start',
            alignItems:'center',
            width:'100%',
            paddingVertical: remToDp(3),
            paddingHorizontal: remToDp(5),
            flexDirection: 'row'
        },
    
        header:{
            fontFamily:'righteous',
            color:'#FFFFFF',
            fontSize: 18,
            marginRight:'auto'
        },
    
        container: {
            width:"100%",
            height:"100%",
            justifyContent:'center',
            alignItems:'center',
            display:'flex',
            backgroundColor: mainDark
        },
        
        bg: {
            backgroundColor: mainDark
        },
    
        containerPrimary:{
            backgroundColor: divColor,
            borderRadius: 10
        },
    
        btnPrimary: {
            backgroundColor: mainPurple,
            borderRadius:10, 
            padding:remToDp(2), 
            width:'auto'
        },

        btnPrimaryText:{
            color: "#FFFFFF",
            fontSize: 18
        },
    
        //default btn style
        btnDfText: {
            fontFamily: 'righteous',
            fontSize: 18,
            color: "#FFFFFF"
        },
    
        btnDf: {
            padding: remToDp(0.5)
        },
    
        //call to action btn style
        btnAction: {
            backgroundColor: pink,
            borderRadius: 20,
            height: 55,
            width: 220,
            alignItems:'center',
            justifyContent:'center'
        },
    
        btnActionText:{
            fontSize: 30,
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
}

// const MainStyles = StyleSheet.create({
//     headerDiv:{
//         backgroundColor: mainDark,
//         justifyContent:'start',
//         alignItems:'center',
//         width:'100%',
//         paddingVertical: remToDp(0.5),
//         paddingHorizontal: remToDp(1),
//         flexDirection: 'row'
//     },

//     header:{
//         fontFamily:'righteous',
//         color:'#FFFFFF',
//         fontSize:18,
//         marginRight:'auto'
//     },

//     container: {
//         width:"100%",
//         height:"100%",
//         justifyContent:'center',
//         alignItems:'center'
//     },
    
//     bg: {
//         backgroundColor: mainDark
//     },

//     containerPrimary:{
//         backgroundColor: divColor,
//         borderRadius: 10
//     },

//     btnPrimary: {
//         backgroundColor: mainPurple
//     },

//     //default btn style
//     btnDfText: {
//         fontFamily: 'righteous',
//         fontSize: 18,
//         color: "#FFFFFF"
//     },

//     btnDf: {
//         padding: remToDp(0.5)
//     },

//     //call to action btn style
//     btnAction: {
//         backgroundColor: pink,
//         borderRadius: 20,
//         height: 55,
//         width: 220,
//         alignItems:'center',
//         justifyContent:'center'
//     },

//     btnActionText:{
//         fontSize: 30,
//         color: textLight
//     },

//     icon: {
//         fill: inactive
//     },

//     iconActive: {
//         fill: mainPurple
//     },

//     textPrimary :{
//         color: textLight,
//         fontFamily: 'alegraya sans reg'
//     }
// });

export default LoadStyles;