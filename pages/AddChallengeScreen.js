import { useEffect, useState, useRef } from "react";
import LoadStyles from "../assets/stylesheets/main-style.js";
import CustomButton from "../components/button.js";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  PixelRatio,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { FontAwesome } from '@expo/vector-icons';
import { handleAddChallenge } from "../components/AddChallenge";
import Toast from "react-native-root-toast";

const remToDp = (rem) => rem * PixelRatio.get();

const AddChallengeScreen = ({navigation}) => {
  // import styling
  const [MainStyles, setStyles] = useState(null);
  useEffect(() => {
    const loadStyles = async () => {
      const loadedStyles = await LoadStyles();
      setStyles(loadedStyles);
    };

    loadStyles();
  }, []);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [categories, setCategories] = useState([
    { label: "Innovation", value: "Innovation" },
    { label: "Improvements", value: "Improvements" },
    { label: "Risk", value: "Risk" },
    { label: "Sales", value: "Sales" },
    { label: "Marketing", value: "Marketing" },
  ]);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [difficuties, setDifficuties] = useState([
    { label: "Easy", value: "Easy" },
    { label: "Medium", value: "Medium" },
    { label: "Hard", value: "Hard" },
  ]);

  const [challengeText, setChallengeText] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChallengeTextChange = (value) => {
    setChallengeText(value);
  };

  const ref_input2 = useRef();

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setShowDatePicker(false);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleSubmit = async() => {
    // Handle form submission here
    const formattedDate = endDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const data = {
      category: value,
      difficulty: value1,
      title: challengeText,
      endDate: formattedDate
    }
    console.log(data);
    const result = await handleAddChallenge(data);
    if(result){
      let toast = Toast.show('New Challenge Added Successfully', {
        duration: Toast.durations.LONG,
        backgroundColor: '#BB86FC', // Set the background color here
        textColor: 'white',
        fontFamily: 'righteous'
      });

      setTimeout(function hideToast() {
        Toast.hide(toast);
        navigation.goBack();
      }, 2000);
    }
  };

  return (
    <>
      {MainStyles && (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={[
              MainStyles.container,
              { flexDirection: "column", padding: 10 },
            ]}
          >
            <Text style={[MainStyles.textHeader, { alignItems: "flex-end", marginBottom:5 }]}>
              Challenge Type
            </Text>

            <DropDownPicker
              open={open}
              placeholder="Select a Category"
              placeholderStyle={{ color: "grey" }}
              value={value}
              items={categories}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setCategories}
              style={[styles.dropdown]}
              textStyle={MainStyles.textPrimary}
              containerStyle={[{zIndex:9999}]}
              dropDownContainerStyle={{ backgroundColor: "#323644"}}
            />

            <DropDownPicker
              placeholder="Select a Difficulty"
              placeholderStyle={{ color: "grey" }}
              open={open1}
              value={value1}
              items={difficuties}
              setOpen={setOpen1}
              setValue={setValue1}
              setItems={setDifficuties}
              style={[styles.dropdown]}
              textStyle={MainStyles.textPrimary}
              dropDownContainerStyle={{ backgroundColor: "#323644" }}
            />

            <Text
              style={[
                MainStyles.textHeader,
                { marginTop: 20, textAlign: "left" },
              ]}
            >
              Write a New Challenge
            </Text>

            <KeyboardAvoidingView
              style={MainStyles.containerPrimary}
              behavior="padding"
            >
              <TextInput
                style={[MainStyles.textPrimary, { height: "40%", padding: 10 }]}
                placeholder="Write a Challenge"
                placeholderTextColor="#FFFFFF"
                value={challengeText}
                onChangeText={handleChallengeTextChange}
                multiline
                numberOfLines={5}
                blurOnSubmit={false}
                returnKeyType="next"
                // onSubmitEditing={() => ref_input2.current.focus()}
              />
            </KeyboardAvoidingView>

            <View style={[MainStyles.containerPrimary,{flexDirection:"row",padding:10}]}>
              <TextInput
                style={[MainStyles.textPrimary,{textAlign:"left"}]}
                editable={false}
                placeholder="End Date"
                value={endDate.toDateString()}
              />
              <TouchableOpacity onPress={showDatepicker} style={{alignItems:"flex-end", justifyContent:'center', marginLeft:'auto'}}
              >
                <FontAwesome name="calendar" size={24} color="white"/>
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={showDatePicker}
              mode="date"
              date={endDate}
              onConfirm={handleEndDateChange}
              onCancel={hideDatePicker}
              textColor="black"
            />
            <CustomButton onPress={handleSubmit} 
            text="Challenge"
            type="action"
            />
          </View>
        </TouchableWithoutFeedback>
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
  dropdownContainer: {
    backgroundColor: "#323644",
    position: "relative",
    zIndex: 9999,
  },
  dropdown: {
    backgroundColor: "#323644",
    // borderWidth: 1,
  },
  dropdownMenu: {
    backgroundColor: "#323644",
  },
  input: {
    height: "40%",
    borderColor: "#333",
    borderWidth: 1,
    paddingHorizontal: 10,
    color: "#333",
    marginBottom: 20,
  },
});

export default AddChallengeScreen;
