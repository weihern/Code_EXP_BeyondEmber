import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainStyles from './assets/stylesheets/main-style';
import ButtonAction from './components/button';

export default function App() {
  return (
    <View style={[styles.container, MainStyles.bg]}>
      <Text style={MainStyles.textPrimary}>Open up App.js to start working on your app!</Text>
      {/* <View style={MainStyles.btnAction}><Button title="Challenge" onPress={() => {}}/></View>
       */}
       <ButtonAction/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
