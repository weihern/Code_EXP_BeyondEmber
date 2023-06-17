import LoadStyles from "../assets/stylesheets/main-style";
import CustomButton from "../components/button";
import { StyleSheet, Text, View, PixelRatio } from "react-native";
import * as React from "react";
import { useEffect, useState } from "react";
// import
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../components/firebase";

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
  return (
    <>
      {MainStyles && (
        <View style={[MainStyles.bg, MainStyles.container]}>
          <Text style={MainStyles.textPrimary}>This is Profile Page</Text>
          {/* <View style={MainStyles.btnAction}><Button title="Challenge" onPress={() => {}}/></View>
           */}
          <CustomButton type="action" text="Challenge" />
          <CustomButton
            text="Submit"
            divStyle={{
              backgroundColor: "#BB86FC",
              borderRadius: 10,
              padding: remToDp(2),
              width: "auto",
            }}
            textStyle={{ color: "#FFFFFF", fontSize: 18 }}
          />
        </View>
      )}
    </>
  );
};

export default Profile;
