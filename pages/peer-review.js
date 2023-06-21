import * as React from 'react';
import LoadStyles from '../assets/stylesheets/main-style';
import { FlatList, Pressable, View, Text, PixelRatio } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import CustomButton from '../components/button';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-root-toast';


const remToDp = (rem) => rem * PixelRatio.get();

const CustomDiv = ({MainStyles, item}) => {
  const [value1, setValue1] = React.useState("1");
  const [value2, setValue2] = React.useState("1");
  const [value3, setValue3] = React.useState("1");
  const [value4, setValue4] = React.useState("1");

  return(
    <View style={[MainStyles.containerPrimary,{width:'100%'}]}>
      <View style={[MainStyles.rowDiv]}>
        <Text style={[MainStyles.textHeader,{fontSize:18, width:'80%'}]}>{item}</Text>
      </View>
      <View style={[MainStyles.colDiv]}>
        <View style={[MainStyles.rowDiv]}>
          <View style={[MainStyles.rowDiv, {width:'50%', margin:0, paddingVertical:0}]}>

          <Text style={[MainStyles.textPrimary, {marginEnd:5, width:'50%'}]}>Professional</Text>
            <RNPickerSelect
                selectedValue={value1}
                onValueChange={(itemValue) => setValue1(itemValue)}
                placeholder={{label:'0', value:'0', color:'#000000'}}
                style={{inputIOS:{backgroundColor:'#FFFFFF', width:20, color:'#000000', borderRadius: 5, textAlign:'center'}}}
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
          <View style={[MainStyles.rowDiv, {width:'50%', margin:0, paddingVertical:0}]}>
          <Text style={[MainStyles.textPrimary, {marginEnd:5, width:'50%' }]}>Leadership</Text>
            <RNPickerSelect
                selectedValue={value2}
                onValueChange={(itemValue) => setValue2(itemValue)}
                placeholder={{label:'0', value:'0', color:'#000000'}}
                style={{inputIOS:{backgroundColor:'#FFFFFF', width:20, color:'#000000', borderRadius: 5, textAlign:'center'}}}
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
        </View>
        <View style={[MainStyles.rowDiv]}>
        <View style={[MainStyles.rowDiv, {width:'50%', margin:0, paddingVertical:0}]}>
          <Text style={[MainStyles.textPrimary, {marginEnd:5, width:'50%'}]}>Team Work</Text>
          <RNPickerSelect
                selectedValue={value3}
                onValueChange={(itemValue) => setValue3(itemValue)}
                placeholder={{label:'0', value:'0', color:'#000000'}}
                style={{inputIOS:{backgroundColor:'#FFFFFF', width:20, color:'#000000', borderRadius: 5, textAlign:'center'}}}
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
          <View style={[MainStyles.rowDiv, {width:'50%', margin:0, paddingVertical:0}]}>
            <Text style={[MainStyles.textPrimary, {marginEnd:5, width:'50%'}]}>Innovative</Text>
            <RNPickerSelect
                selectedValue={value4}
                onValueChange={(itemValue) => setValue4(itemValue)}
                placeholder={{label:'0', value:'0', color:'#000000'}}
                style={{inputIOS:{backgroundColor:'#FFFFFF', width:20, color:'#000000', borderRadius: 5, textAlign:'center'}}}
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
        </View>
      </View>
    </View>
  );
}

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

    async function submit(){
      // const result = await handleAddSuggestion(input);
      let toast = Toast.show('Peer Review Submitted Successfully', {
        duration: Toast.durations.LONG,
        backgroundColor: 'red', // Set the background color here
        textColor: 'white',
        fontFamily: 'righteous'
      });

      setTimeout(function hideToast() {
        Toast.hide(toast);
        navigation.navigate("Home");
      }, 2000);
      
    }

    function rowRenderer ({ item, index }){
      return(
        <>
        <CustomDiv item={item} MainStyles={MainStyles}/>
        </>
      );
    }

    return (
        <View style={[MainStyles?.container,{flex:1}]}>
            {MainStyles &&
            <>
            <View style={{ alignSelf:'center', flex:1, width:'90%'}}>
                <FlatList
                    data={projectsDetail[proj]}
                    keyExtractor={(item, index) => index}
                    renderItem={rowRenderer}
                    style={{width:'100%'}}
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