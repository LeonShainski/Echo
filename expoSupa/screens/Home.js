import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Button, Pressable } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Article from '../Components/ArticleList';
import { Icon, Slider } from '@rneui/themed';
import { CheckBox } from '@rneui/base'
//Settings popup import \/\/
import { MenuProvider } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage'
import PrimaryButton from '../Components/PrimaryButton';





const supabaseUrl = 'https://vsaxkocxddahwxlbzkjj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzYXhrb2N4ZGRhaHd4bGJ6a2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3MjU2MjYsImV4cCI6MTk3OTMwMTYyNn0.mUro088rMzVnGQAZRxtelwUyE-hLLCHJ5VfxoTHLbsM';
const supabase = createClient(supabaseUrl, supabaseKey)

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';


function Home() {


    const [factScore, setFactScore] = useState(0.5);
    const [usedSentiment, setUsedSentiment] = useState(['Happy', 'Sad', 'Information']);
    const [category, setCategory] = useState(['business', 'politics', 'sport', 'tech', 'entertainment']);
    const [articles, setArticles] = useState(() => fetchArticles());
    const allCategories = ['business', 'politics', 'sports', 'tech', 'entertainment'];
    const allSentiments = ['Happy', 'Sad', 'Information'];
    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    async function fetchArticles() {

        //readData();
        
        const artList = await supabase
            .from('articles')
            .select('*')
            .gte('id', 1800)
            .gte('fact_score', factScore)
            .in('category', category)
            .in('sentiment', usedSentiment)
            .not('title', 'is', null)
        
        arts = [];
        for (const key in artList.data) {
            const artobj = {
                id: artList.data[key].id,
                title: artList.data[key].title,
                img: artList.data[key].img,
            };
           
            arts.push(artobj);

        }
        setArticles(arts);
    }

    //ASYNC storage operations
    const readData = async () => {
        try {
          const storedSentiments = await AsyncStorage.getItem('SENTIMENT_STORAGE_KEY');
          const storedCategories= await AsyncStorage.getItem('CATEGORIES_STORAGE_KEY');
          const storedFactScore= await AsyncStorage.getItem('FACT_SCORE_STORAGE_KEY');
          
          let tempSentiment=JSON.parse(storedSentiments);
          let tempCategory = JSON.parse(storedCategories);
          setUsedSentiment(tempSentiment);
          setCategory(tempCategory);
          setFactScore(storedFactScore);
          fetchArticles();
          if (storedSentiments !== null) {
            console.log("Settings reset correctly");
            //console.log(tempCategory);
            //console.log(typeof(tempCategory(0)));
            //console.log(category);
            //console.log(typeof(category));
            //console.log("End");
            
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

    //Functions to delete and update user selected sentiments
    function deleteSentiment(sentiment) {
        if (usedSentiment.includes(sentiment)) {

        
        setUsedSentiment((currSentiment) => {
            return currSentiment.filter((item) => item !== sentiment)
        })
    }

   
        
}
//Function to add sentiment (by user request) to sentiment list in use for article grabbing
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

    useEffect(() => {
        //readData(); ----THIS RUNS TOO OFTEN, FIND WAY TO ONLY RUN WHEN COMING BACK FROM SETTINGS PAGE
        fetchArticles();
        return;
    }, [factScore, usedSentiment, category])


    return (
        
      
        <View>
            <PrimaryButton onPress={() => readData()}>Reload</PrimaryButton>
            <Article articles={articles} style={styles.article} ></Article>
        </View>



    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    article: {
        flex:2,
        backgroundColor: '#f5e8c6',
        padding: 20
    
      }
});

export default Home;