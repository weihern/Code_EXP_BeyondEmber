import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
} from "react-native";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../components/firebase";
import LoadStyles from "../assets/stylesheets/main-style";
import * as Progress from "react-native-progress";
import { Dimensions } from "react-native";
import RewardsCards from "../components/RewardsCards";
import feedbacks from "./feedback";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const data_rewards = [
  {
    id: 1,
    text1: "$10 NTUC Voucher",
    text2: "Redeem",
    image: "fairprice",
  },
  {
    id: 2,
    text1: "$15 gojek voucher",
    text2: "Unlock at level 10",
    image: "gojek",
  },
  {
    id: 3,
    text1: "$10 grab voucher",
    text2: "Unlock at level 20",
    image: "grabfood",
  },
  {
    id: 4,
    text1: "Tangs voucher",
    text2: "Unlock at level 30",
    image: "tangs",
  },
  {
    id: 5,
    text1: "$5 uniqlo voucher",
    text2: "Unlock at level 40",
    image: "uniqlo",
  },
  {
    id: 6,
    text1: "starbucks vouchers",
    text2: "Unlock at level 50",
    image: "starbucks",
  },
  // Add more items as needed
];

const Profile = ({ navigation }) => {
  const [MainStyles, setStyles] = useState(null);

  useEffect(() => {
    const loadStyles = async () => {
      const loadedStyles = await LoadStyles();
      setStyles(loadedStyles);
    };

    loadStyles();
  }, []);

  const [profile, setProfile] = useState([]);

  const iconPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define the animation sequence
    const moveAnimation = Animated.sequence([
      Animated.timing(iconPosition, {
        toValue: 12, // Distance to move the icon
        duration: 450, // Duration of each movement
        useNativeDriver: true, // Enable native driver for better performance
      }),
      Animated.timing(iconPosition, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    // Start the animation
    Animated.loop(moveAnimation).start();
  }, [iconPosition]);
  // get user email from token
  const email = "test@hotmail.com";
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
  return (
    <>
      {MainStyles && (
        <View style={[MainStyles.bg, MainStyles.container]}>
          {/* Top Row */}
          <Text style={[MainStyles.textHeader, { fontSize: 20 }]}>
            {profile.name}
          </Text>
          <View style={styles.topRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profilestatistics")}
            >
              <Image
                source={require("../assets/images/epic_avatar.png")}
                style={styles.image}
              />
              {/* <Image
                source={require("../assets/icons/arrow.png")}
                style={styles.smallIcon}
              /> */}
              <Animated.Image
                source={require("../assets/icons/arrow.png")}
                style={[
                  styles.smallIcon,
                  { transform: [{ translateX: iconPosition }] },
                ]}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={[MainStyles.textHeader, { fontSize: 20, marginBottom: 10 }]}
          >
            Level {profile.level}
          </Text>
          <View style={{ position: "relative" }}>
            <Progress.Bar
              progress={0.6}
              width={windowWidth * 0.7}
              height={20}
              color={MainStyles.colors.bargraphColor}
            />
            <Text
              style={[
                MainStyles.textHeader,
                {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  textAlign: "center",
                  fontSize: 15,
                  color: MainStyles.colors.bargraphTextColor,
                },
              ]}
            >
              {457} exp to Level {10}
            </Text>
          </View>

          {/* Middle Row */}
          <View style={styles.middleRow}>
            <RewardsCards data={data_rewards} />
          </View>

          {/* Bottom Row */}
          <View style={styles.bottomRow}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Feedback", profile)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Image
                  source={require("../assets/icons/feedbacks.png")}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    MainStyles.textHeader,
                    {
                      fontSize: 18,
                      paddingLeft: 15,
                      color: "white",
                    },
                  ]}
                >
                  Feedbacks
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Image
                  source={require("../assets/icons/logout.png")}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    MainStyles.textHeader,
                    {
                      fontSize: 18,
                      paddingLeft: 15,
                      color: "white",
                    },
                  ]}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginTop: 5,
    marginRight: 10,
  },
  middleRow: {
    marginTop: 10,
    height: 150,
  },
  itemContainer: {
    width: 100,
    height: 100,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 100,
    width: 320,
  },
  smallIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default Profile;
