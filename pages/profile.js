import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Profile = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>Details Screen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profilestatistics")}
      >
        <Text style={{ fontSize: 20 }}>Go to Profile Statistics</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
