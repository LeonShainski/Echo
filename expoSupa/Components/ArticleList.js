import { StyleSheet, View, FlatList } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { addSentiment, removeSentiment } from '../store/sentiment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';



function ArticleList(props) {

  const supabaseUrl = 'https://vsaxkocxddahwxlbzkjj.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzYXhrb2N4ZGRhaHd4bGJ6a2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3MjU2MjYsImV4cCI6MTk3OTMwMTYyNn0.mUro088rMzVnGQAZRxtelwUyE-hLLCHJ5VfxoTHLbsM';
  const supabase = createClient(supabaseUrl, supabaseKey)

  const dispatch = useDispatch();

  const reduxSentiment = useSelector((state) => state.sentiments.sentiments);
  const reduxCategory = useSelector((state) => state.categories.categories);
  const reduxFactScore = useSelector((state) => state.factScore.factscore);
  const isFocused = useIsFocused()

    const readData = async () => {
        try {
          const storedSentiments = await AsyncStorage.getItem('SENTIMENT_STORAGE_KEY');
          if (storedSentiments !== null) {
            console.log('storedSentiments');
            console.log(storedSentiments);
           
        }
       } catch (e) {
          console.log('Failed to fetch the sentiments from storage');

        }
        try {
            const storedCategories= await AsyncStorage.getItem('CATEGORIES_STORAGE_KEY');
            if (storedCategories !== null) {
              console.log('storedCategories');
              console.log(storedCategories);
            }
          } catch (e) {
            console.log('Failed to fetch the categories from storage');
          }
          try {
            const storedFactScore= await AsyncStorage.getItem('FACT_SCORE_STORAGE_KEY');
            if (storedFactScore !== null) {
              console.log('storedFactScore');
              console.log(storedFactScore);
              
            }
          } catch (e) {
            console.log('Failed to fetch the factscore from storage');
          }
      }



  async function fetchArticles(factScore, category, sentiment) {

    const artList = await supabase
      .from('articles')
      .select('*')
      .gte('id', 1600)
      .gte('fact_score', (factScore/10))
      .in('category', category)
      .in('sentiment', sentiment)
      .not('title', 'is', null)
      .limit(100)

    var arts = [];
    for (const key in artList.data) {
      const artobj = {
        id: artList.data[key].id,
        title: artList.data[key].title,
        img: artList.data[key].img,
        summary: artList.data[key].summary,
        link: artList.data[key].link,
        factScore: artList.data[key].fact_score,
        sentiment: artList.data[key].sentiment,
        category: artList.data[key].category
      };
      arts.push(artobj);
    }
    setArticles(arts);
  }

function nav(){
  props.navigation.navigate("Article");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

useEffect(() => {
  readData();
  return;
}, []
)
  
useEffect(() => {
  fetchArticles(reduxFactScore, reduxCategory, reduxSentiment);
  console.log("article list focused")
  return;
}, [isFocused]
)

  useEffect(() => {
    fetchArticles(reduxFactScore, reduxCategory, reduxSentiment);
    console.log("article list updated")
    AsyncStorage.setItem('CATEGORIES_STORAGE_KEY', JSON.stringify(reduxCategory));
    AsyncStorage.setItem('SENTIMENT_STORAGE_KEY', JSON.stringify(reduxSentiment));
    AsyncStorage.setItem('FACT_SCORE_STORAGE_KEY', JSON.stringify(reduxFactScore));
    sleep(1000);
    readData();
    return;
  }, [reduxFactScore, reduxCategory, reduxSentiment]
  )

  const [articles, setArticles] = useState(() => fetchArticles(reduxFactScore, reduxCategory, reduxSentiment));


  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={nav} >
          <Text style={styles.topText}>OPEN ALPHA</Text>
        </Pressable>
      </View>

      <FlatList data={articles} renderItem={(itemData) => {
          return (
            <View style={styles.container2}>
              <ArticleCard item={itemData.item} navigation={props.navigation} style={styles.article}/>
            </View>
          );
      }} alwaysBounceVertical={false} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
  container2: {
   backgroundColor: '#f5e8c6',
    padding: 10,
    

  },
  topText: {
    justifyContent:'center'
  },
  article: {
    borderColor: '#cbf5f2',
    borderWidth: 1
    
  }

});

export default ArticleList;

