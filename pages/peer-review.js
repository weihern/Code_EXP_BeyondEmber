import * as React from 'react';
import LoadStyles from '../assets/stylesheets/main-style';
import { FlatList, Pressable, View, Text, PixelRatio } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import CustomButton from '../components/button';
import RNPickerSelect from 'react-native-picker-select';


const remToDp = (rem) => rem * PixelRatio.get();

const PeerReview = ({navigation, route}) => {
    const [MainStyles, setStyles] = React.useState(null);
    const {proj} = route.params;
    const [selectedValue, setSelectedValue] = React.useState({});

    const projectsDetail = {
        "SGX Marketing Project":["John Tan", "Lee Hui", "David Cheong"],
        "DBS Data Analytic Project":["Elaine See", "Joseph Chee", "Yap Wei Chen", "Lay Zhang"],
        "Ember Mobile App Project":["August Teo", "Wang Qiang", "Kiki Liew"]
    };

    React.useEffect(() => {
      const loadStyles = async () => {
        const loadedStyles = await LoadStyles();
        setStyles(loadedStyles);
      };
  
      loadStyles();
    }, []);

    function updateValues(value, user, skill){
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
        console.log("s",selectedValue);
      }, [selectedValue]);

    function submit(){
        navigation.navigate("Home2");
    }

    const rowRenderer = ({ item, index }) => (
        <>
        <View style={MainStyles.containerPrimary}>
          <View style={[MainStyles.rowDiv]}>
            <Text style={[MainStyles.textHeader,{fontSize:18, width:'80%'}]}>{item}</Text>
            {/* <View style={[item.difficulty==='Hard'? MainStyles.hardDiv : item.difficulty==='Medium'? MainStyles.moderateDiv: MainStyles.easyDiv, {borderRadius:50, padding:5, position:'absolute', right:remToDp(3), top:remToDp(3)}]}>
              <Text style={{fontSize: 14, color: "#FFFFFF", flex: 1}}>{item.difficulty}</Text>
            </View> */}
          </View>
          <View style={[MainStyles.colDiv]}>
            <View style={[MainStyles.rowDiv]}>
                <Text style={[MainStyles.textPrimary, {marginEnd:5}]}>Innovative</Text>
                <RNPickerSelect
                    selectedValue={selectedValue[item]?selectedValue[item]["skill1"]?selectedValue[item]["skill1"]:'1':'1'}
                    onValueChange={(itemValue) => updateValues(itemValue, item, "skill1")}
                    style={{borderRadius: 5}}
                    items={[
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                        { label: '3', value: '3' },
                        { label: '4', value: '1' },
                        { label: '5', value: '2' },
                        { label: '6', value: '3' },
                        { label: '7', value: '1' },
                        { label: '8', value: '2' },
                        { label: '9', value: '3' },
                        { label: '10', value: '3' },
                      ]}
                />
                    {/* <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" /> */}
                {/* </RNPickerSelect> */}
                <Text style={[MainStyles.textPrimary, {marginEnd:5}]}>Team Work</Text>
                <RNPickerSelect
                    selectedValue={selectedValue[item]?selectedValue[item]["skill2"]?selectedValue[item]["skill2"]:'1':'1'}
                    onValueChange={(itemValue) => updateValues(itemValue, item, "skill2")}
                    style={{borderRadius: 5}}
                    items={[
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                        { label: '3', value: '3' },
                        { label: '4', value: '1' },
                        { label: '5', value: '2' },
                        { label: '6', value: '3' },
                        { label: '7', value: '1' },
                        { label: '8', value: '2' },
                        { label: '9', value: '3' },
                        { label: '10', value: '3' },
                      ]}
                />
            </View>
            <View style={[MainStyles.rowDiv]}>
                {/* <Text style={[MainStyles.textPrimary, {marginEnd:5}]}>Innovative</Text>
                <Picker
                    selectedValue={(selectedValue[item])?(selectedValue[item]["skill3"])?selectedValue[item]["skill3"]:1:1}
                    onValueChange={(itemValue) => updateValues(itemValue, item, "skill3")}
                    style={{borderRadius: 5}}
                >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                </Picker>
                <Text style={[MainStyles.textPrimary, {marginEnd:5}]}>Team Work</Text>
                <Picker
                    selectedValue={selectedValue[item]?selectedValue[item]["skill4"]?selectedValue[item]["skill4"]:1:1}
                    onValueChange={(itemValue) => updateValues(itemValue, item, "skill4")}
                    style={{borderRadius: 5}}
                >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                </Picker> */}
            </View>
          </View>
        </View>
        </>
      );

    return (
        <View style={[MainStyles?.container,{flex:1}]}>
            {MainStyles &&
            <>
            <View style={{ alignSelf:'center', flex:1}}>
                <FlatList
                    data={projectsDetail[proj]}
                    keyExtractor={(item, index) => index}
                    renderItem={rowRenderer}
                    style={{width:'90%'}}
                    showsVerticalScrollIndicator={false}
                ></FlatList>
            </View>
            <View style={{height:40, marginBottom:20, alignSelf:'flex-end', marginEnd:'10%'}}>
                <CustomButton onPress={submit}
                divStyle={{backgroundColor:"#BB86FC",borderRadius:10, padding:remToDp(2), marginTop:remToDp(2), flex: 1, justifyContent:'center', alignItems:'center', alignSelf:'flex-end'}}
                textStyle={{color:"#FFFFFF", fontSize:20, alignSelf:'flex-start'}} 
                text="Submit"/>
            </View>
            </>
            }
        </View>
    );
}

export default PeerReview;