import LoadStyles from "../assets/stylesheets/main-style";
import CustomButton from "../components/button";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as React from "react";

import { useEffect, useState, useContext } from "react";

// import
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../components/firebase";
import * as Progress from "react-native-progress";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfileStatsCard from "../components/ProfileStatsCard";
import { BarChart } from "react-native-chart-kit";

import { UserContext } from "../components/UserContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Win = async ({ navigation }) => {
  const { username } = useContext(UserContext);

  console.log(username, "usernammeeee");

  const email = username;

  const [MainStyles, setStyles] = useState(null);
  useEffect(() => {
    const loadStyles = async () => {
      const loadedStyles = await LoadStyles();
      setStyles(loadedStyles);
    };
    loadStyles();
  }, []);
  const [profile, setProfile] = useState([]);
  // get user email from token
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "users"), where("__name__", "==", email)),
      (snapshot) => {
        const documents = snapshot.docs.reduce((acc, doc) => {
          acc = {
            ...doc.data(),
          };
          return acc;
        }, {});
        setProfile(documents);
      }
    );
    return () => unsubscribe();
  }, []);
  console.log(profile, "profillllleeee");
  const data = {
    labels: ["Innovation", "Teamwork", "Leadership", "Professional"],
    datasets: [
      {
        data: [
          profile.stats?.innovative,
          profile.stats?.leadership,
          profile.stats?.professional,
          profile.stats?.teamwork,
        ],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 1, // Set the bar width to occupy the full space
    propsForLabels: {
      fontSize: 7.5,
      fontWeight: "bold",
    },
  };
  const graphStyle = {
    marginLeft: -80, // Adjust the negative margin as needed to move the graph to the left
  };
  const handlePress = () => {
    navigation.goBack();
  };
  return (
    <>
      {MainStyles && (
        <View style={[MainStyles.bg, MainStyles.container]}>
          <View style={styles.container}>
            <View>
              <Text
                style={[
                  MainStyles.textHeader,
                  { fontSize: 30, color: "#52FF00" },
                ]}
              >
                You won!
              </Text>
            </View>

            <View style={styles.rectangle}>
              <Text
                style={[MainStyles.textHeader, { fontSize: 18, padding: 10 }]}
              >
                Your idea has been selected in the Challenge: How to gamify
                employee experience?
              </Text>
            </View>

            <View style={[styles.row, { marginTop: 80 }]}>
              {/* Third Row */}
              <View style={styles.imageContainer}>
                <Image
                  source={require("../assets/images/epic_avatar.png")}
                  style={styles.image}
                />
                <Image
                  source={require("../assets/images/confetti.png")}
                  style={[styles.image, styles.overlappingImage]}
                />
              </View>
            </View>
            <View style={{ width: 300 }}>
              {/* Fourth Row */}
              <View style={styles.textContainer}>
                <Text
                  style={[
                    MainStyles.textHeader,
                    { fontSize: 18, color: "#52FF00" },
                  ]}
                >
                  +5 Professional
                </Text>
                <Text
                  style={[
                    MainStyles.textHeader,
                    { fontSize: 18, color: "#52FF00" },
                  ]}
                >
                  +200 exp
                </Text>
              </View>
            </View>
            <View>
              <Progress.Bar
                progress={0.6}
                width={windowWidth * 0.7}
                height={20}
                color={MainStyles.colors.bargraphColor}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <CustomButton
                onPress={handlePress}
                divStyle={{
                  backgroundColor: "#E03232",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "flex-end",
                  height: 40,
                  width: 100,
                }}
                textStyle={{
                  color: "#FFFFFF",
                  fontSize: 20,
                }}
                text="Close"
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    marginVertical: 10,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  overlappingImage: {
    position: "absolute",
    top: -50,
    left: -50,
    width: 400,
    height: 400,
    resizeMode: "contain",
  },
  rectangle: {
    backgroundColor: "#414657",
    width: 300,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 60,
  },
});
export default Win;
