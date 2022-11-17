
import { StyleSheet, Text, View, ScrollView, FlatList, TextInput, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto';
import { Icon, Slider } from '@rneui/themed';
import PrimaryButton from '../Components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FactScore from '../Components/FactScore';
import Sentiment from '../Components/Sentiment';
import Category from '../Components/Category';

//Importing Buttons
import AdditionButton from '../Components/AdditionButton';
import RemoveButton from '../Components/RemoveButton';
import { useSelector, useDispatch } from 'react-redux';
import { addSentiment, removeSentiment } from '../store/sentiment';




function Settings(props) {
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

  const reduxSentiment = useSelector((state) => state.sentiments.sentiments)
  console.log(reduxSentiment);
  const dispatch = useDispatch();

  

  //Good version
  const readData = async () => {
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

  return (
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
