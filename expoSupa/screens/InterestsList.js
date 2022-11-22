import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, TextInput, Pressable, Switch, Animated, SafeAreaView } from 'react-native';
import React, { useEffect, useState, useRef, Component  } from 'react';
import 'react-native-url-polyfill/auto';
import { Card, Title, Paragraph } from 'react-native-paper'
import { Icon, Slider } from '@rneui/themed';
import PrimaryButton from '../Components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Importing Buttons
import AdditionButton from '../Components/AdditionButton';
import RemoveButton from '../Components/RemoveButton';

//Importing switch
//import settingsSwitch from '../Components/settingsSwitch';


function Settings() {
  //Fact Score
  const [factScore, setFactScore] = useState(0.5);
  //Sentiments
  //const [sentiment, setSentiment] = useState(['happy', 'sad', 'informational']);
  const [usedSentiment, setUsedSentiment] = useState([]);
  //const allSentiments = ['Happy', 'Sad', 'Information'];
  //Categories
  //const [category, setCategory] = useState(['business', 'politics', 'sport', 'tech', 'entertainment']);
  const [usedCategory, setUsedCategory] = useState([]);
  //const allCategories = ['business', 'politics', 'sport', 'tech', 'entertainment'];
  //Misc
  const [input, setInput] = useState('');

  //Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  

  //TEST ARRAY
  /*var testArr = [{
    "sentiment":"testHappy",
    isEnabled: false,
  },{
    "sentiment":"testSad",
    isEnabled: false,
  },{
  }
  ] 

  {testArr.map((item, index) => (
                      <View key={index}>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={item.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={toggleSwitch}
                          value={item.isEnabled}
                         />             
                       </View>
                   ))}
    PORTENTIAL IMPLEMENTAITON
  */

  //Animated Status
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [sentimentList, setSentimentList] = React.useState([
    {
        index: 1,
        isEnable:'false',
        title: 'Happy',
    },
    {
        index: 2,
        isEnable:'false',
        title: 'Sad',
    },
    {
        index: 3,
        isEnable:'false',
        title: "Information",
    },

]);

const [categoryList, setCategoryList] = React.useState([
  {
      index: 1,
      isEnable:'false',
      title: 'business',
  },
  {
      index: 2,
      isEnable:'false',
      title: 'politics',
  },
  {
      index: 3,
      isEnable:'false',
      title: "sport",
  },
  {
    index: 4,
    isEnable:'false',
    title: "tech",
  },
  {
    index: 5,
    isEnable:'false',
    title: "entertainment",
  },

]);

function toggleSwitchSentiment(value, index){

  const newData = [...sentimentList];
  newData[index].isEnable = value;
  setSentimentList(newData);
  console.log(newData[index]['isEnable']);
  console.log(newData[index]['title']);
  if (newData[index]['isEnable']) {
    addSentiment(newData[index]['title']);
  } else {
    deleteSentiment(newData[index]['title']);
  }
  

}

function ItemSentiment({item, index}) {
  return (
      <View style={{flexDirection:'row'}}>
          
          <Switch    
              
              value={item.isEnable || false} // change here
              onValueChange={(value) => toggleSwitchSentiment(value, index) } // change here
          />
          <Text style={styles.text}> {item.title} </Text> 
      </View>
  )
} 

function toggleSwitchCategory(value, index){

  const newData = [...categoryList];
  newData[index].isEnable = value;
  setCategoryList(newData);
  console.log(newData[index]['isEnable']);
  console.log(newData[index]['title']);
  if (newData[index]['isEnable']) {
    addCategory(newData[index]['title']);
  } else {
    deleteCategory(newData[index]['title']);
  }
  

}

function ItemCategory({item, index}) {
  return (
      <View style={{flexDirection:'row'}}>
          
          <Switch    
              
              value={item.isEnable || false} // change here
              onValueChange={(value) => toggleSwitchCategory(value, index) } // change here
          />
          <Text style={styles.text}> {item.title} </Text> 
      </View>
  )
} 

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };
  

  //Good version
  const readData = async () => {
    try {
      const storedSentiments = await AsyncStorage.getItem('SENTIMENT_STORAGE_KEY');
      const storedCategories= await AsyncStorage.getItem('CATEGORIES_STORAGE_KEY');
      const storedFactScore= await AsyncStorage.getItem('FACT_SCORE_STORAGE_KEY');
  
      if (storedSentiments !== null) {
        console.log(storedSentiments);
        console.log(storedCategories);
        console.log(storedFactScore);
        
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

function addSentiment(sentiment){
    var arr = usedSentiment.slice();
    fadeIn();//Animated View
    if (!arr.includes(sentiment)){
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
function addCategory(category){
  var categoryArr = usedCategory.slice();
  fadeIn();//Animated View
  if (!categoryArr.includes(category)){
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
    }, [usedSentiment] )

    useEffect(() => {
        
      console.log(usedCategory);
      return;
  }, [usedCategory] )


  return (
    <SafeAreaView style={styles.safeView}>
    
      <View>
                
                <Text style={styles.title}> Factscore: {Math.floor(factScore * 10)}</Text>
                <Slider
                    value={factScore}
                    onValueChange={setFactScore}
                    maximumValue={1}
                    minimumValue={0}
                    step={.1}
                    allowTouchTrack
                    trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                    thumbProps={{
                        children: (
                            <Icon
                                name="circle"
                                type="font-awesome"
                                size={20}
                                reverse
                                containerStyle={{ bottom: 20, right: 20 }}
                            />
                        ),
                    }}
                />
            </View>
            <View>
            <Text style={styles.title}>Sentiment</Text>
            <FlatList
                data = {sentimentList}
                keyExtractor = {ItemSentiment => ItemSentiment.id}
                renderItem = {({ item, index }) => <ItemSentiment item={item} index={index} /> } // send `item` as prop
                />
            </View>
            <View>
            <Text style={styles.title}>Category</Text>
              <FlatList
                data = {categoryList}
                keyExtractor = {ItemCategory => ItemCategory.id}
                renderItem = {({ item, index }) => <ItemCategory item={item} index={index} /> } // send `item` as prop
                />
            </View>
            
            
            <View style={styles.saveSettingsBtn}>
            <PrimaryButton onPress={() => addTask("Updated!")}>Save Settings</PrimaryButton>
            <PrimaryButton onPress={() => readData()}>Check Settings For Update</PrimaryButton>
            </View>
    
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
  fadingContainer: {
    padding: 2,
    backgroundColor: "powderblue",
    width: 30,
   height: 30,
   borderRadius: 30/2
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
    justifyContent: "flex-end",
  },
  saveSettingsBtn: {
    paddingTop: 20,
  },
  notIncluded : {
    backgroundColor: 'red'
  },
  included : {
    backgroundColor: 'green'
  }

  
});

export default Settings
