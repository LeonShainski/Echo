import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { useEffect, useState } from 'react';

import ArticleList from '../Components/ArticleList';

import AsyncStorage from '@react-native-async-storage/async-storage';



function Home(props) {



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
          const storedFactScore= await AsyncStorage.getItem('FACT_SCORE_STORAGE_KEY');
          const storedSettingsView= await AsyncStorage.getItem('SETTINGS_VIEW_STORAGE_KEY');
      
          if (storedSentiments !== null) {
            console.log(storedSentiments);
            console.log(storedCategories);
            console.log(storedFactScore);
            console.log(storedSettingsView);
            
          }
        } catch (e) {
          alert('Failed to fetch the input from storage');
        }
      }

      useEffect(() => {
        readData();
      }, []);
    return (
    

        <View style={styles.container}>
            <ArticleList factScore={factScore} sentiments={sentiments} categories={categories} navigation={props.navigation} style={styles.article}></ArticleList>
        </View>
      
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:10
        
    },
    article: {
        flex:2,
        backgroundColor: '#f5e8c6',
        padding: 20
    
      }
});

export default Home;