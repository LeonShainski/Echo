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
  const [factScore, setFactScore] = useState(0.5);
  const [sentiment, setSentiment] = useState(['happy', 'sad', 'informational']);
  const allSentiments = ['Happy', 'Sad', 'Information'];
  const [input, setInput] = useState('');
  const [usedSentiment, setUsedSentiment] = useState(['Happy', 'Sad', 'Information']);
  const [category, setCategory] = useState(['business', 'politics', 'sport', 'tech', 'entertainment']);
  const allCategories = ['business', 'politics', 'sports', 'tech', 'entertainment'];

  /*useEffect(() => {
    readData();
  }, []);

  const onChangeText = value => setInput(value);

  const onSubmitEditing = () => {
    if (!input) return;

    saveData(input);
    setInput('');
  };*/
  
  /*async function fetchArticles() {

    const artList = await supabase
    .from('articles')
    .select()
    .gte(factScore, 'fact_score')
    .in('category', category)
    .in('sentiment', sentiment)


    arts = [];

    for (const key in artList.data) {
      const artobj = {
        id: key,
        title: artList.data[key].title,
        img: artList.data[key].img,
      };
      console.log(artobj);
      arts.push(artobj);

    }


  }*/
  

  

  /*const addTask = async(text) => {
    if (!text) {
      Alert.alert(null,'No task entered\nPlease enter a task',);
    } else {
      //const newTasks = [...tasks, {id: uuid.v4(), title: text}];
      await AsyncStorage.setItem('SENTIMENT_STORAGE_KEY', JSON.stringify(allSentiments));
      console.log(text);
      //setTasks(newTasks);
    }
  };

  const readData = async () => {
    try {
      const storedSentiments = await AsyncStorage.getItem('SENTIMENT_STORAGE_KEY');
  
      if (storedSentiments !== null) {
        console.log(storedSentiments);
        
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  }*/

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
      await AsyncStorage.setItem('CATEGORIES_STORAGE_KEY', JSON.stringify(category));
      
      console.log(text);
    }
  };
  function deleteSentiment(sentiment) {
    if (usedSentiment.includes(sentiment)) {

    
    setUsedSentiment((currSentiment) => {
        return currSentiment.filter((item) => item !== sentiment)
    })
}}
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


        
    useEffect(() => {
        
        console.log(usedSentiment);
        return;
    }, [usedSentiment] )

    


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
                     <View key={index}>
                     <Text> {currSentiment}</Text> 
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
            <PrimaryButton onPress={() => addTask("Updated!")}>Save Settings</PrimaryButton>
            <PrimaryButton onPress={() => readData()}>Check Settings For Update</PrimaryButton>
    </View>
    
  );

  /*<View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AsyncStorage React Native</Text>
      </View>
      <View style={styles.panel}>
        <Text style={styles.label}>Enter your input here:</Text>
        <TextInput
          style={styles.inputField}
          value={input}
          placeholder="Enter"
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
        <Text style={styles.text}>Your input is {input}</Text>
        <Pressable onPress={clearStorage} style={styles.button}>
          <Text style={styles.buttonText}>Clear Storage</Text>
        </Pressable>
      </View>
    </View>*/
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
    paddingTop: 10,
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
