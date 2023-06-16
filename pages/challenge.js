import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";

function namesAsObjects() {
  return names.map((name, index) => {
    return {
      name,
      id: index
    };
  });
}

const names = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
];

export default function Challenge() {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  const rowRenderer = ({ item }) => (
    <View style={{ padding: 10, backgroundColor: "lightblue", margin: 2 }}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
     <FlatList
        data={namesAsObjects()}
        keyExtractor={(item) => item.id}
        renderItem={rowRenderer}
      />
  );
}
