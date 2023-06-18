// Card.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LoadStyles from "../assets/stylesheets/main-style";

const ProfileStatsCard = ({ title, score, imageSource }) => {
  const [MainStyles, setStyles] = useState(null);
  useEffect(() => {
    const loadStyles = async () => {
      const loadedStyles = await LoadStyles();
      setStyles(loadedStyles);
    };

    loadStyles();
  }, []);
  return (
    <>
      {MainStyles && (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={imageSource}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[MainStyles.textPrimary, styles.topRightText]}>
              {title}
            </Text>
            <Text style={[MainStyles.textPrimary, styles.bottomRightText]}>
              <Text style={{ color: MainStyles.colors.bargraphTextColor }}>
                {score}
              </Text>{" "}
              / 10
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  topRightText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  bottomRightText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    alignSelf: "flex-end", // Align text to the right
  },
});

export default ProfileStatsCard;
