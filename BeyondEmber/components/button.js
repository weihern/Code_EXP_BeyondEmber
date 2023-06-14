import MainStyles from "../assets/stylesheets/main-style";
import { Pressable, Text } from "react-native";

export default function ButtonAction(){
    return(
        <Pressable style={MainStyles.btnAction}>
            <Text style={MainStyles.btnActionText}>Challenge</Text>
        </Pressable>
    )
}