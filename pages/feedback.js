import * as React from "react";
import LoadStyles from "../assets/stylesheets/main-style";
import { FlatList, Pressable, View, Text, PixelRatio, StyleSheet } from "react-native";
// import { Picker } from '@react-native-picker/picker';
import CustomButton from "../components/button";
import RNPickerSelect from "react-native-picker-select";
import { useEffect, useState } from "react";

const remToDp = (rem) => rem * PixelRatio.get();
const testdata = [
  {
    comment:
      "[Project: Ember Mobile App] Your creative approach to problem-solving has been instrumental in finding innovative solutions that have positively impacted our projects.",
    stats: {
      leadership: 7,
      teamwork: 6,
      innovative: 10,
      professional: 6,
    },
  },
  {
    stats: {
      teamwork: 10,
      leadership: 7,
      innovative: 6,
      professional: 8,
    },
    comment:
      "[Project: Ember Mobile App] Your exceptional ability to collaborate and support your colleagues has fostered a positive team spirit, leading to increased productivity and a strong sense of camaraderie",
  },
  {
    comments:
      "[Project: Ember Mobile App] Your consistently high level of professionalism, attention to detail, and adherence to deadlines have set a commendable standard for the team",
    stats: {
      leadership: 7,
      professional: 10,
      innovative: 8,
      teamwork: 7,
    },
  },
  {
    stats: {
      teamwork: 6,
      leadership: 8,
      innovative: 6,
    },
    comments:
      "[Project: Ember] Your strong leadership skills, ability to inspire others, and strategic decision-making have played a pivotal role in guiding the team towards success.",
  },
];

const Feedback = ({ navigation, route }) => {
  // import styling
  const [MainStyles, setStyles] = useState(null);
  useEffect(() => {
    const loadStyles = async () => {
      const loadedStyles = await LoadStyles();
      setStyles(loadedStyles);
    };
    loadStyles();
  }, []);
  const feedbacks = route.params.feedbacks;
  console.log(feedbacks);

  const [selectedValue, setSelectedValue] = React.useState({});
  function updateValues(value, user, skill) {
    setSelectedValue((prevSelectedValue) => {
      const updatedValue = {
        ...prevSelectedValue,
        [user]: {
          ...prevSelectedValue[user],
          [skill]: value,
        },
      };
      return updatedValue;
    });
    // console.log("c,",currentVal);
  }

  React.useEffect(() => {
    console.log("s", selectedValue);
  }, [selectedValue]);

  const rowRenderer = ({ item, index }) => (
    <View style={[MainStyles.containerPrimary]}>
      <View style={[MainStyles.rowDiv]}>
        <Text style={[MainStyles.textPrimary, { fontSize: 14, width: "80%", fontStyle: 'italic'}]}>" {item.comment} "</Text>
      </View>
      <View style={[MainStyles.colDiv]}>
        <View style={[MainStyles.rowDiv, {paddingVertical: 0}]}>
          <Text style={[styles.statsDiv,{color:"#FFA184"}]}>Professional + {item.stats.professional}</Text>
          <Text style={[styles.statsDiv,{color:"#FDFF84"}]}>Leadership + {item.stats.leadership}</Text>
        </View>
        <View style={[MainStyles.rowDiv,{paddingVertical: 0}]}>
          <Text style={[styles.statsDiv,{color:"#FFA184"}]}>Teamwork + {item.stats.teamwork}</Text>
          <Text style={[styles.statsDiv,{color:"#FDFF84"}]}>Innovative + {item.stats.innovative}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[MainStyles?.container]}>
      {MainStyles && feedbacks && (
        <FlatList
          data={feedbacks}
          keyExtractor={(item, index) => index}
          renderItem={rowRenderer}
          style={[{ width: "90%" },{marginTop:10}]}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statsDiv: {
    fontSize: 14,
    width: "80%",
    color: "#FFFFFF",
    fontFamily: "alegraya sans reg",
  },
});

export default Feedback;
