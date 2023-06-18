import LoadStyles from "../assets/stylesheets/main-style";
import CustomButton from "../components/button";
import { StyleSheet, Text, View, PixelRatio, Image } from "react-native";
import * as React from "react";
import { useEffect, useState } from "react";
// import
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../components/firebase";
import * as Progress from "react-native-progress";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfileStatsCard from "../components/ProfileStatsCard";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
const deviceWidth = Dimensions.get("window").width;
const barWidth = deviceWidth * 0.7;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Profile = ({ navigation }) => {
  const remToDp = (rem) => rem * PixelRatio.get();

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
        // console.log(documents);
        setProfile(documents);
      }
    );
    return () => unsubscribe();
  }, []);
  console.log(profile);
  const rewards = ["grab", "ntuc", "capitalLand", "gojek"];
  console.log(rewards);

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

  return (
    <>
      {MainStyles && (
        <View style={[MainStyles.bg, MainStyles.container]}>
          <Text style={MainStyles.textHeader}>{profile.name}</Text>
          {/* <View style={MainStyles.btnAction}><Button title="Challenge" onPress={() => {}}/></View>
           */}
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/images/epic_avatar.png")}
              style={{ width: 200, height: 300 }}
              resizeMode="contain"
            />
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View style={styles.iconsContainer}>
                <Icon
                  name="facebook"
                  size={30}
                  color="#3b5998"
                  style={styles.icon}
                />
                <Icon
                  name="linkedin-square"
                  size={30}
                  color="#0077b5"
                  style={styles.icon}
                />
                <Icon
                  name="twitter"
                  size={30}
                  color="#1da1f2"
                  style={styles.icon}
                />
              </View>
              <BarChart
                data={data}
                width={windowWidth / 1.5}
                height={220}
                withHorizontalLabels={false}
                // withVerticalLabels={false}
                fromZero={true}
                chartConfig={chartConfig}
                style={graphStyle}
                showValuesOnTopOfBars={true}
              />
            </View>
          </View>
          <Text style={[MainStyles.textHeader, { fontSize: 20 }]}>
            Level {profile.level}
          </Text>
          <View style={{ marginTop: 5, position: "relative" }}>
            <Progress.Bar
              progress={0.6}
              width={barWidth}
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
          <Text style={[MainStyles.textHeader, { fontSize: 18 }]}>
            Average performances over 7 projects
          </Text>
          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <ProfileStatsCard
                  title={"Professional"}
                  score={8.2}
                  imageSource={require("../assets/icons/professional.png")}
                />
              </View>
              <View style={styles.cell}>
                <ProfileStatsCard
                  // title={profile.stats?.teamwork}
                  title={"Teamwork"}
                  score={9.3}
                  imageSource={require("../assets/icons/teamwork.png")}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <ProfileStatsCard
                  title={"Leadership"}
                  score={6.62}
                  imageSource={require("../assets/icons/leadership.png")}
                />
              </View>
              <View style={styles.cell}>
                <ProfileStatsCard
                  title={"Support"}
                  score={7.21}
                  imageSource={require("../assets/icons/innovation.png")}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    width: windowWidth * 0.9,
  },
  cell: {
    flex: 1,
    padding: 10,
    height: windowHeight * 0.1,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
});
export default Profile;
