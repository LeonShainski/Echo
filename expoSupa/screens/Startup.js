import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { useEffect, useState } from 'react';
import ArticleList from '../Components/ArticleList';




function Startup(props) {



    const allCategories = ['business', 'politics', 'sports'];
    const allSentiments = ['Happy', 'Sad', 'Information'];
    const [factScore, setFactScore] = useState(0.5);
    const [sentiments, setSentiments] = useState(allSentiments);
    const [categories, setCategories] = useState(allCategories);
    
    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

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

    return (
        <View> 
            <Text>loading</Text>
        </View>
    )
    }

    export default Startup
