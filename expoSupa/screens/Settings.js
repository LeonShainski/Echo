import FactScore from '../Components/FactScore';
import Sentiment from '../Components/Sentiment';
import Category from '../Components/Category';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, TextInput, Pressable, Switch, Animated, SafeAreaView } from 'react-native';
import React, { useEffect, useState, useRef, Component } from 'react';
import 'react-native-url-polyfill/auto';
import { Card, Title, Paragraph } from 'react-native-paper'
import { Icon, Slider } from '@rneui/themed';
import PrimaryButton from '../Components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { addSentiment, removeSentiment } from '../store/sentiment';

//Importing Buttons
import AdditionButton from '../Components/AdditionButton';
import RemoveButton from '../Components/RemoveButton';





function Settings(props) {
/*
  //Fact Score
  const [factScore, setFactScore] = useState(0.5);
  //Sentiments
  const [sentiment, setSentiment] = useState(['happy', 'sad', 'informational']);
  const [usedSentiment, setUsedSentiment] = useState(['Happy', 'Sad', 'Information']);
  const allSentiments = ['Happy', 'Sad', 'Information'];
  //Categories
  const [category, setCategory] = useState(['business', 'politics', 'sport', 'tech', 'entertainment']);
  const [usedCategory, setUsedCategory] = useState(['business', 'politics', 'sport', 'tech', 'entertainment']);
  //const allCategories = ['business', 'politics', 'sports', 'tech', 'entertainment'];
  //Misc
  //const [input, setInput] = useState('');

  useEffect(() => {
    readData();
  }, []);

  const dispatch = useDispatch();


  const allCategories = ['business', 'politics', 'sport', 'tech', 'entertainment'];
  //Misc
  const [input, setInput] = useState('');



  //Animated Status
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  // const fadeAnim = useRef(new Animated.Value(0)).current;

     const fadeIn = () => {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();
    }; */

  /*   const fadeOut = () => {
      // Will change fadeAnim value to 0 in 3 seconds
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    }; */

/* 
  //Good version
  const readData = async () => {
    try {
      const storedSentiments = await AsyncStorage.getItem('SENTIMENT_STORAGE_KEY');
      const storedCategories = await AsyncStorage.getItem('CATEGORIES_STORAGE_KEY');
      const storedFactScore = await AsyncStorage.getItem('FACT_SCORE_STORAGE_KEY');

      if (storedSentiments !== null) {
        console.log(storedSentiments);
        console.log(storedCategories);
        console.log(storedFactScore);

      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  }
  const addTask = async (text) => {
    if (!text) {
      Alert.alert(null, 'No task entered - Please enter a task',);
    } else {
      await AsyncStorage.setItem('SENTIMENT_STORAGE_KEY', JSON.stringify(usedSentiment));
      await AsyncStorage.setItem('CATEGORIES_STORAGE_KEY', JSON.stringify(usedCategory));
      await AsyncStorage.setItem('FACT_SCORE_STORAGE_KEY', JSON.stringify(factScore));

      console.log(text);
      console.log(factScore);
    }
  };

  function deleteSentiment(sentiment) {
    //fadeOut();//Animated View
    if (usedSentiment.includes(sentiment)) {
      console.log("Removing " + sentiment)
      setUsedSentiment((currSentiment) => {
        return currSentiment.filter((item) => item !== sentiment)
      })
    }
  }

  function deleteCategory(category) {
    //fadeOut();//Animated View
    if (usedCategory.includes(category)) {
      console.log("Removing " + category)
      setUsedCategory((currCategory) => {
        return currCategory.filter((item) => item !== category)
      })
    }
  }

  function addSentiment(sentiment) {
    var arr = usedSentiment.slice();
    //fadeIn();//Animated View
    if (!arr.includes(sentiment)) {
      arr.push(sentiment)
      setUsedSentiment(arr);
      console.log('added');
      console.log(arr);
      addTask("Updated!");
      if (sentiment == 'happy') {

      }
    }
    console.log('not added ');
    console.log(arr);

  }
  function addCategory(category) {
    var categoryArr = usedCategory.slice();
    //fadeIn();//Animated View
    if (!categoryArr.includes(category)) {
      categoryArr.push(category)
      setUsedCategory(categoryArr);
      console.log('added');
      console.log(categoryArr);
    }
    console.log('not added ');
    console.log(categoryArr);

  }
 



  useEffect(() => {

    console.log(usedSentiment);
    return;
  }, [usedSentiment])

  useEffect(() => {
    //fadeIn();
    return;
  })

  useEffect(() => {

    console.log(usedCategory);
    return;
  }, [usedCategory])
*/

  return (
    <SafeAreaView style={styles.safeView}>
      <FactScore/>
      <Sentiment />
      <Category />
    </SafeAreaView>
  );

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
    textAlign: 'center',
    fontSize: 20
  },
  safeView: {
    flex: 1,
    backgroundColor: '#f3f7f0',
    
  },
  saveSettingsBtn: {
    paddingTop: 20,
  },
  notIncluded: {
    backgroundColor: 'red'
  },
  included: {
    backgroundColor: 'green'
  }


});

export default Settings



//old - john nov 23
  //Good version
  /*const readData = async () => {
    try {
      const storedSentiments = await AsyncStorage.getItem('SENTIMENT_STORAGE_KEY');
      const storedCategories= await AsyncStorage.getItem('CATEGORIES_STORAGE_KEY');
  
      if (storedSentiments !== null) {
        //console.log(storedSentiments);
       // console.log(storedCategories);
        
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  }
const addTask = async(text) => {
    if (!text) {
      Alert.alert(null,'No task entered - Please enter a task',);
    } else {
      await AsyncStorage.setItem('SENTIMENT_STORAGE_KEY', JSON.stringify(usedSentiment));
      await AsyncStorage.setItem('CATEGORIES_STORAGE_KEY', JSON.stringify(usedCategory));
      
      console.log(text);
    }
  };

function deleteSentiment(sentiment) {
  
  const inSentiment = reduxSentiment.includes(sentiment);
  if (inSentiment){
    dispatch(removeSentiment(sentiment));
    console.log('removed');
    //console.log(reduxSentiment);
    }
    else{
    console.log('not added ');
    //console.log(reduxSentiment);
    }
  
   
}

function deleteCategory(category) {
  if (usedCategory.includes(category)) {
    console.log("Removing " + category)
    setUsedCategory((currCategory) => {
      return currCategory.filter((item) => item !== category)
    })
  }
}

function addNewSentiment(sentiment){
  
  const inSentiment = reduxSentiment.includes(sentiment);
   
    if (!inSentiment){
    dispatch(addSentiment(sentiment))
    console.log('added');
    //console.log(reduxSentiment);
    }
    else{
    console.log('not added ');
    //console.log(reduxSentiment);
    }
}
function addCategory(category){
  var categoryArr = usedCategory.slice();
  if (!categoryArr.includes(category)){
    categoryArr.push(category)
    setUsedCategory(categoryArr);
    console.log('added');
    //console.log(categoryArr);
  }
  console.log('not added ');
  //console.log(categoryArr);
 
}

function goToHome(){
  props.navigation.navigate('Home');
}

useEffect(() => {
        
  console.log('updated');
  return;
}, [reduxSentiment] )

        
    useEffect(() => {
        
        //console.log(usedSentiment);
        return;
    }, [usedSentiment] )

    useEffect(() => {
        
      //console.log(usedCategory);
      return;
  }, [usedCategory] )

  /*return (
    <View style={styles.container}>
      <View>
                <FactScore factScore={factScore} setFactScore={setFactScore}/>
            </View>
            <Sentiment/>
            
           
            <Category/>
            <PrimaryButton onPress={goToHome}>Save Settings</PrimaryButton>
            <PrimaryButton onPress={() => readData()}>Check Settings For Update</PrimaryButton>
            <PrimaryButton onPress={() => addNewSentiment()}>add sent</PrimaryButton>
            <PrimaryButton onPress={() => deleteSentiment()}>del sent</PrimaryButton>
    </View>
  );*/