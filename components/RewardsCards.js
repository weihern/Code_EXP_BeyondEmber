import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import LoadStyles from "../assets/stylesheets/main-style";

const RewardsCards = ({ data }) => {
  const getImageSource = (image) => {
    switch (image) {
      case "fairprice":
        return require("../assets/images/vouchers/fairprice_voucher.png");
      case "gojek":
        return require("../assets/images/vouchers/gojek_voucher.jpg");
      case "grabfood":
        return require("../assets/images/vouchers/grabfood_voucher.png");
      case "tangs":
        return require("../assets/images/vouchers/tangs_voucher.png");
      case "uniqlo":
        return require("../assets/images/vouchers/uniqlo_voucher.jpg");
      case "starbucks":
        return require("../assets/images/vouchers/starbucks_voucher.jpg");
      default:
        return require("../assets/images/epic_avatar.png");
    }
  };

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
        <View style={styles.middleRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <Image
                  source={getImageSource(item.image)}
                  style={styles.image}
                />
                <Text
                  style={[
                    MainStyles.textHeader,
                    { fontSize: 12, fontWeight: "normal", color: "black" },
                  ]}
                >
                  {item.text1}
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text
                    style={[
                      MainStyles.textHeader,
                      { fontSize: 10, fontWeight: "normal", paddingBottom: 2 },
                    ]}
                  >
                    {item.text2}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  middleRow: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  itemContainer: {
    width: 130,
    height: 140,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginHorizontal: 10,
  },
  inputText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#3498db",
    borderRadius: 10,
    paddingVertical: 1,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RewardsCards;
