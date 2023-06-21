import * as React from 'react';
import LoadStyles from '../assets/stylesheets/main-style';
import { FlatList, Pressable, View, Text, Image } from 'react-native';
import {
    updateDoc,
    doc,
    collection,
    getDocs,
    onSnapshot,
    query,
    terminate,
    where
  } from "firebase/firestore";
import { db } from "../components/firebase";
import { UserContext } from "../components/UserContext";

const Home = ({navigation}) => {
    const { username } = React.useContext(UserContext);
    const [MainStyles, setStyles] = React.useState(null);
    const [profile, setProfile] = React.useState([]);
    const [challenges, setChallenges] = React.useState(null);

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

    // get user email from token
    const email = username;
    React.useEffect(() => {
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

    React.useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "challenges"), (snapshot) => {
          const documents = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(documents);
          setChallenges(documents);
        });
        return () => unsubscribe();
      }, []);

    function selectProject(proj){
        console.log(proj);
        navigation.navigate("PeerReview",{ proj });
    }

    function selectChallenge(data){
        navigation.navigate("Challenge3",{ data });
    }

    function goToCh(){
        navigation.navigate("Challenge");
    }

    function divRenderer({item, index}){
        return(
            <Pressable style={[MainStyles.containerPrimary, {backgroundColor:'#5200FF', flex:1, padding:5, justifyContent:'space-between'}]} onPress={() => selectProject(item)}>
                <Text style={[MainStyles.textHeader, {fontSize:18, maxWidth:120}]}>{item}</Text>
                <Text style={[MainStyles.textPrimary, {fontSize:16}]}>Do Peer Review Now!</Text>
            </Pressable>
        );
    }

    function challengesRenderer({item, index}){
        const bgColor = item.difficulty==="Hard"?MainStyles.hardDiv:item.difficulty==="Medium"?MainStyles.moderateDiv:MainStyles.easyDiv;

        return(
            <Pressable style={[MainStyles.containerPrimary, bgColor ,{flex:1, padding:5, justifyContent:'space-between'}]} onPress={() => selectChallenge(item)}>
                <Text numberOfLines={3} ellipsizeMode="tail" style={[MainStyles.textHeader, {fontSize:18, maxWidth:120, overflow:'hidden'}]}>{item.title}</Text>
                <Text style={[MainStyles.textPrimary, {fontSize:16}]}>{index+2} Days Left</Text>
            </Pressable>
        );
    }

    return(
        <>
        {MainStyles && 
        <View style={[MainStyles.container, {justifyContent:'flex-start', alignItems:'center', paddingVertical:20}]}>
            <View style={{alignItems:'center', width:'100%', marginBottom: 5, height:190}}>
                <View style={{backgroundColor:'#EDE6FB',borderRadius:10, width:'90%', padding: 10, minHeight:150}}>
                    <Text style={[MainStyles.textHeader, {color: '#E03232', fontSize:18}]}>Hurry Up!</Text>
                    <Text style={[MainStyles.textHeader,{marginBottom:'auto', color: '#E03232', fontSize:18}]}>467 more EXP to level 10</Text>
                    <Text style={[MainStyles.textPrimary,{alignSelf:'flex-end', color:'black'}]}>current EXP <Text style={{fontSize:30}}> 543</Text><Text>/1000</Text></Text>
                    <Pressable style={{alignSelf:'flex-end'}} onPress={goToCh}>
                        <Text style={[MainStyles.textHeader,{alignSelf:'flex-end', color:'#5073EE', fontSize:20}]}>Earn more now {'>'}</Text>
                    </Pressable> 
                </View>
                <Image
                    source={require("../assets/images/epic_avatar.png")}
                    style={{ width: 100, height: 150, position: 'absolute', bottom: 0, left: 0, top: 'auto', justifyContent:'flex-end', alignItems:'flex-end', display:'flex'}}
                    resizeMode="contain"
                />
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
            <View style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%', maxHeight:220, marginTop:10}}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[MainStyles.header, { fontSize: 24}]}>
                    Challenges Due Soon!
                    </Text>
                </View>
                <View style={{minHeight:150, padding:5, maxWidth:'90%'}}>
                    {challenges &&
                    <FlatList 
                        data={challenges.slice(0, 4)}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={challengesRenderer}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    ></FlatList>}
                </View>
            </View>
        </View>}
        </>
    );
}

export default Home;