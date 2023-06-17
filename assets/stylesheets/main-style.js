import { StyleSheet, PixelRatio } from "react-native";
import * as Font from 'expo-font';

/*colors*/
const mainPurple = "#BB86FC";
const red = "#E03232";
const mainDark = "#272A37";
const inactive = "#BDBDBD";
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

        // shadowDiv:{
        //     ...Platform.select({
        //         ios: {
        //           shadowColor: 'black',
        //           shadowOpacity: 0.5,
        //           shadowOffset: { width: 0, height: 2 },
        //           shadowRadius: 4,
        //         },
        //         android: {
        //           elevation: 4,
        //         },
        //       }),
        // },
        shadowDiv:{
            shadowColor: 'black',
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 4
        },
        
        bg: {
            backgroundColor: mainDark
        },
    
        containerPrimary:{
            backgroundColor: divColor,
            borderRadius: 10,
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            marginVertical: 5
        },

        rowDiv:{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: remToDp(3),
            paddingVertical: remToDp(3)
        },

        colDiv:{
            display: 'flex',
            flexDirection:'column',
            width:'100%',
            padding: 5
        },

        hardDiv:{
            backgroundColor: hard
        },

        moderateDiv:{
            backgroundColor: moderate
        },

        easyDiv:{
            backgroundColor: easy
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
        },

        textHeader: {
            color: textLight,
            fontFamily: 'righteous',
            fontSize: 24
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