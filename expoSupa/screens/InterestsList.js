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




//Importing switch
//import settingsSwitch from '../Components/settingsSwitch';


function InterestsList() {

  const [simplifiedSettingsSelected, toggleSettings] = useState('false');
  //Animated Status
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleSettingsView = (value) => {
    toggleSettings(value);
    console.log(simplifiedSettingsSelected);
  }

  useEffect(() => {
    toggleSettingsView(simplifiedSettingsSelected);
    return;
  }, [])


  if (simplifiedSettingsSelected) {
    return (
      <SafeAreaView style={styles.safeView}>
        <ScrollView>

          
          <View>
            <FactScore />
            <Sentiment simplified={simplifiedSettingsSelected} />
            <Category simplified={simplifiedSettingsSelected} />
          </View>
          <Location />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Simplified View:</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={simplifiedSettingsSelected ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              activeText={'ON'}
              inActiveText={'Off'}
              onValueChange={toggleSettingsView}
              value={simplifiedSettingsSelected}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.safeView}>
        <ScrollView>
          
          <FactScore />
          <Sentiment simplified={simplifiedSettingsSelected} />
          <Category simplified={simplifiedSettingsSelected} />
          <Location />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Simplified View:</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={simplifiedSettingsSelected ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              activeText={'ON'}
              inActiveText={'Off'}
              onValueChange={toggleSettingsView}
              value={simplifiedSettingsSelected}
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
    backgroundColor: '#dcdcdc',
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
    backgroundColor: '#f3f7f0',
    justifyContent: "flex-end",
  },
  saveSettingsBtn: {
    padding: 20,
    flexDirection: 'row'
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
