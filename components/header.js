import LoadStyles from "../assets/stylesheets/main-style";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
// import Svg, { Path } from "react-native-svg";
// import { logo, add } from "../assets/icons";
import { Icon } from "./icons";
import * as React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const Header = ({ title }) => {
  const [MainStyles, setStyles] = React.useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  title = route.params?.proj ? route.params.proj : title;
  // const currentScreen = route.state ? route.state.routes[route.state.index].name : route.name;
  // console.log(currentScreen);
  // title = route.name;

  React.useEffect(() => {
    const loadStyles = async () => {
      const loadedStyles = await LoadStyles();
      setStyles(loadedStyles);
    };

    loadStyles();
  }, []);

  function addCh() {
    navigation.navigate("AddChallenge");
  }

  function showWin() {
    navigation.navigate("Win");
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <>
      {MainStyles && (
        <View>
          <View
            style={{ backgroundColor: "#272A37", height: 44, width: "100%" }}
          ></View>
          <View style={MainStyles.headerDiv}>
            {title !== "Challenge" &&
              title !== "Profile" &&
              title !== "Home" &&
              title !== "BeyondEmber" && (
                <TouchableOpacity
                  onPress={handleGoBack}
                  style={{
                    backgroundColor: "#BB86FC",
                    borderRadius: 50,
                    width: 30,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={[
                      MainStyles.textHeader,
                      { textAlign: "center", justifyContent: "center" },
                    ]}
                  >
                    {"<"}
                  </Text>
                </TouchableOpacity>
              )}
            {(title === "BeyondEmber" ||
              title === "Avatar" ||
              title === "Profile") && (
              <Icon width={37} height={40} name="home" color="#BB86FC" />
            )}
            {title === "Challenge" && (
              <Icon width={40} height={40} name="challenge" color="#BB86FC" />
            )}
            <Text style={[MainStyles.header, { marginStart: 5 }]}>
              {title.includes("Challenge")
                ? "Challenge"
                : title.includes("Profile")
                ? "Profile"
                : title}
            </Text>

            {title === "Challenge" && (
              <TouchableOpacity onPress={addCh}>
                <Icon width={30} height={30} name="add" color="#FFFFFF" />
              </TouchableOpacity>
            )}

            {title === "BeyondEmber" && (
              <TouchableOpacity onPress={showWin}>
                <Icon name="win" color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default Header;
