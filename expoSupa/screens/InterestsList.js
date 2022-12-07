import { StyleSheet, Text, View, ScrollView, FlatList, Switch, Animated, SafeAreaView } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import 'react-native-url-polyfill/auto';
import { Icon, Slider } from '@rneui/themed';
import PrimaryButton from '../Components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FactScore from '../Components/FactScore';
import Sentiment from '../Components/Sentiment';
import Category from '../Components/Category';
import Location from '../Components/Location';
import { RadioButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { changeView } from '../store/simplified';




//Importing switch
//import settingsSwitch from '../Components/settingsSwitch';


function InterestsList() {

  const reduxsimplified = useSelector((state) => state.simplified.simplified);
  const [simplifiedSettings, toggleSettings] = useState(() => {return reduxsimplified==0;});
  //Animated Status
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleSettingsView = (value) => {
    console.log('value', value);
    toggleSettings(value);
    console.log(simplifiedSettings);
  }

  
/*   useEffect(() => {
  const storedSettingsView = AsyncStorage.getItem('SETTINGS_VIEW_STORAGE_KEY');
  if (storedSettingsView !== undefined){
    toggleSettings(storedSettingsView == 'false')
  }
    return;
  }, []) */


  if (simplifiedSettings) {
     
    return (
      
      <SafeAreaView style={styles.safeView}>
        <ScrollView style={styles.container}>

          <View style={styles.container}>
            <FactScore />
            <Sentiment simplified={simplifiedSettings} />
            <Category simplified={simplifiedSettings} />
          </View>
          <Location />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Simplified View:</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={simplifiedSettings ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSettingsView}
              value={simplifiedSettings}
            />
          </View>

          
        </ScrollView>
      </SafeAreaView>
    );
  } else{
    return (

      <SafeAreaView style={styles.safeView}>
        <ScrollView >
          
          <FactScore />
          <Sentiment simplified={simplifiedSettings} />
          <Category simplified={simplifiedSettings} />
          <Location />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Simplified View:</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={simplifiedSettings ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              activeText={'ON'}
              inActiveText={'Off'}
              onValueChange={toggleSettingsView}
              value={simplifiedSettings}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }


}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#dfebf0',
    paddingTop: 48,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    
  },
  settingsSwitches: {
    alignContent:'center',
    textAlign: 'right',
    justifyContent: 'center'
  },
  panel: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 20,
  },
  text: {
    fontSize: 24,
    paddingTop: 5,
    paddingRight: 40
  },
  inputField: {
    backgroundColor: '#fff',
    height: 44,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
    padding: 10,
    marginTop: 12,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#444',
  },
  fadingContainer: {
    padding: 2,
    backgroundColor: "powderblue",
    width: 30,
    height: 30,
    borderRadius: 30 / 2
  },
  fadingText: {
    fontSize: 20
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16
  },
  title: {
    margin: 10,
    padding: 10,
    textShadowColor: 'green',
    textShadowRadius: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    fontSize: 21
  },
  safeView: {
    flex: 1,
    backgroundColor: '#dfebf0',
    justifyContent: "flex-end",
  },
  saveSettingsBtn: {
    padding: 20,
    flexDirection: 'row'
  },
  container: {
    backgroundColor: '#dfebf0',
  },

  

  simplifiedViewToggle: {
    padding: 0,
    flexDirection:'row',
    alignContent: 'flex-end'

  },

notIncluded: {
    backgroundColor: 'red'
  },
  included: {
    backgroundColor: 'green'
  }


});

export default InterestsList;
