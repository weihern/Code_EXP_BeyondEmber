import * as React from 'react';
import LoadStyles from '../assets/stylesheets/main-style';
import { FlatList, Pressable, View, Text } from 'react-native';

const Home2 = ({navigation}) => {
    const [MainStyles, setStyles] = React.useState(null);

    const projects = [
        "SGX Marketing Project",
        "DBS Data Analytic Project",
        "Ember Mobile App Project",
      ];

    React.useEffect(() => {
      const loadStyles = async () => {
        const loadedStyles = await LoadStyles();
        setStyles(loadedStyles);
      };
  
      loadStyles();
    }, []);

    function selectProject(proj){
        console.log(proj);
        navigation.navigate("PeerReview",{ proj })
    }

    function divRenderer({item, index}){
        return(
            <Pressable style={[MainStyles.containerPrimary, {backgroundColor:'#5200FF', flex:1, padding:5, justifyContent:'space-between'}]} onPress={() => selectProject(item)}>
                <Text style={[MainStyles.textHeader, {fontSize:18, maxWidth:120}]}>{item}</Text>
                <Text style={[MainStyles.textPrimary, {fontSize:14}]}>Do Peer Review Now!</Text>
            </Pressable>
        );
    }

    function challengesRenderer({item, index}){
        return(
            <Pressable style={[MainStyles.containerPrimary, {backgroundColor:'#5200FF', flex:1, padding:5, justifyContent:'space-between'}]} onPress={() => selectProject(item)}>
                <Text style={[MainStyles.textHeader, {fontSize:18, maxWidth:120}]}>{item}</Text>
                <Text style={[MainStyles.textPrimary, {fontSize:14}]}>Do Peer Review Now!</Text>
            </Pressable>
        );
    }

    return(
        <>
        {MainStyles && 
        <View style={[MainStyles.container, {justifyContent:'flex-start', alignItems:'center', paddingVertical:20}]}>
            <View style={{alignItems:'center', width:'100%', marginBottom: 10}}>
                <View style={{backgroundColor:'#EDE6FB',borderRadius:10, width:'90%', padding: 10, minHeight:150}}>
                    <Text>Hurry Up!</Text>
                    <Text style={{marginBottom:'auto'}}>50 more EXP to level 10</Text>
                    <Text style={{alignSelf:'flex-end'}}>current EXP: 543/1000</Text>
                    <Pressable style={{alignSelf:'flex-end'}}>
                    <Text style={{alignSelf:'flex-end'}}>Earn more now</Text>
                    </Pressable> 
                </View>
            </View>
            {/* show all PE */}
            <View style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[MainStyles.header, { fontSize: 24}]}>
                    Be a good teammate!
                    </Text>
                </View>
                <View style={{minHeight:150, padding:5, maxWidth:'90%'}}>
                    <FlatList 
                        data={projects}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={divRenderer}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    ></FlatList>
                </View>
            </View>
            {/* show challenges due soon */}
            <View style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[MainStyles.header, { fontSize: 24}]}>
                    Challenges Due Soon!
                    </Text>
                </View>
                <View style={{minHeight:150, padding:5, maxWidth:'90%'}}>
                    <FlatList 
                        data={projects}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={challengesRenderer}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    ></FlatList>
                </View>
            </View>
        </View>}
        </>
    );
}

export default Home2;