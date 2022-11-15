import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, TextInput, Pressable } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto';
import { Card, Title, Paragraph } from 'react-native-paper'
import { Icon, Slider } from '@rneui/themed';
import { MenuProvider } from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import PrimaryButton from '../Components/PrimaryButton';
import BasicExample from './TouchableExample';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Importing Buttons
import AdditionButton from '../Components/AdditionButton';
import RemoveButton from '../Components/RemoveButton';





function Settings() {
  //Fact Score
  const [factScore, setFactScore] = useState(0.5);
  //Sentiments
  const [sentiment, setSentiment] = useState(['happy', 'sad', 'informational']);
  const [usedSentiment, setUsedSentiment] = useState(['Happy', 'Sad', 'Information']);
  const allSentiments = ['Happy', 'Sad', 'Information'];
  //Categories
  const [category, setCategory] = useState(['business', 'politics', 'sport', 'tech', 'entertainment']);
  const [usedCategory, setUsedCategory] = useState(['business', 'politics', 'sport', 'tech', 'entertainment']);
  const allCategories = ['business', 'politics', 'sports', 'tech', 'entertainment'];
  //Misc
  const [input, setInput] = useState('');

  /*useEffect(() => {
    readData();
  }, []);*/

  

  //Good version
  const readData = async () => {
    try {
      const storedSentiments = await AsyncStorage.getItem('SENTIMENT_STORAGE_KEY');
      const storedCategories= await AsyncStorage.getItem('CATEGORIES_STORAGE_KEY');
  
      if (storedSentiments !== null) {
        console.log(storedSentiments);
        console.log(storedCategories);
        
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
  if (usedSentiment.includes(sentiment)) {
    console.log("Removing " + sentiment)
    setUsedSentiment((currSentiment) => {
      return currSentiment.filter((item) => item !== sentiment)
    })
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

function addSentiment(sentiment){
    var arr = usedSentiment.slice();
    if (!arr.includes(sentiment)){
    arr.push(sentiment)
    setUsedSentiment(arr);
    console.log('added');
    console.log(arr);
    }
    console.log('not added ');
    console.log(arr);
   
}
function addCategory(category){
  var categoryArr = usedCategory.slice();
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
    <View style={styles.container}>
      <View>
                <Text>Factscore</Text>
                <Text>{Math.floor(factScore * 10)}</Text>
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
                {allSentiments.map((currSentiment, index) => {
                    return (
                     <View key={index} style={{flexDirection:'row'}}>
                     <Text style={styles.text}> {currSentiment}</Text> 
                     <AdditionButton  title={currSentiment} onPress={addSentiment.bind(this, currSentiment)}> 
                      Add
                     </AdditionButton>
                     <RemoveButton  title={currSentiment} onPress={deleteSentiment.bind(this, currSentiment)}> 
                      Remove
                     </RemoveButton>
                     </View>
                    )
                }

                )}
            </View>
            <View>
              <Text style={styles.text}>Categories</Text>
                {allCategories.map((currCategory, index) => {
                    return (
                     <View key={index} style={{flexDirection:'row'}}>
                     <Text style={styles.text}> {currCategory}</Text> 
                     <AdditionButton  title={currCategory} onPress={addCategory.bind(this, currCategory)}> 
                      Add
                     </AdditionButton>
                     <RemoveButton  title={currCategory} onPress={deleteCategory.bind(this, currCategory)}> 
                      Remove
                     </RemoveButton>
                     </View>
                    )
                }

                )}
            </View>
            <PrimaryButton onPress={() => addTask("Updated!")}>Save Settings</PrimaryButton>
            <PrimaryButton onPress={() => readData()}>Check Settings For Update</PrimaryButton>
    </View>
    
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  }
  
});

export default Settings
