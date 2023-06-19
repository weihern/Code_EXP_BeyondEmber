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

const remToDp = (rem) => rem * PixelRatio.get();

const AddChallengeScreen = () => {
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

  const handleSubmit = () => {
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
    handleAddChallenge(data);
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
            <Text style={[MainStyles.textHeader, { alignItems: "flex-end" }]}>
              {" "}
              Challenge Type:{" "}
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
              style={[styles.dropdown,{zIndex:1005}]}
              textStyle={MainStyles.textPrimary}
              dropDownContainerStyle={{ backgroundColor: "#323644" }}
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
              Write a New Challenge:
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

            <View style={[MainStyles.containerPrimary,{flexDirection:"column",padding:10}]}>
              <TextInput
                style={[MainStyles.textPrimary,{textAlign:"left"}]}
                editable={false}
                placeholder="End Date"
                value={endDate.toDateString()}
              />
              <TouchableOpacity onPress={showDatepicker} style={{alignItems:"flex-end"}}
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
            {/* <CustomButton onPress={handleSubmit} 
            divStyle={{backgroundColor:"#E03232",borderRadius:20, justifyContent:'center', alignItems:'center', alignSelf:'center'}}
            textStyle={{color:"#FFFFFF", fontSize:30, alignSelf:'center'}} 
            text="Challenge"
            style={{padding:10,margin:10, paddingHorizontal:20}}/> */}
            <CustomButton onPress={handleSubmit} 
            // divStyle={{backgroundColor:"#E03232",borderRadius:20, justifyContent:'center', alignItems:'center', alignSelf:'center'}}
            // textStyle={{color:"#FFFFFF", fontSize:30, alignSelf:'center'}} 
            text="Challenge"
            type="action"
            // style={{padding:10,margin:10, paddingHorizontal:20}}
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
