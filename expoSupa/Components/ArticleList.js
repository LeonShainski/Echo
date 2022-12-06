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

import { Image } from 'react-native-elements';
import { ImageBackground } from 'react-native';
import { TouchableHighlight } from 'react-native';



function ArticleList(props) {

  const supabaseUrl = 'https://vsaxkocxddahwxlbzkjj.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzYXhrb2N4ZGRhaHd4bGJ6a2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3MjU2MjYsImV4cCI6MTk3OTMwMTYyNn0.mUro088rMzVnGQAZRxtelwUyE-hLLCHJ5VfxoTHLbsM';
  const supabase = createClient(supabaseUrl, supabaseKey)

  const dispatch = useDispatch();

  const reduxSentiment = useSelector((state) => state.sentiments.sentiments);
  const reduxCategory = useSelector((state) => state.categories.categories);
  const reduxFactScore = useSelector((state) => state.factScore.factscore);
  const reduxLocation = useSelector((state) => state.location.location);
  const isFocused = useIsFocused()

    const readData = async () => {
      console.log('read data');  
      try {
          const storedSentiments =  JSON.parse(await AsyncStorage.getItem('SENTIMENT_STORAGE_KEY'));
          if (storedSentiments !== null && storedSentiments !== undefined) {
            console.log('storedSentiments');
            console.log(storedSentiments);
            for (const s of storedSentiments){
              
            }
            
            
           
        }
       } catch (e) {
          console.log('Failed to fetch the sentiments from storage');
          console.log(e);
        }
        try {
            const storedCategories= JSON.parse(await AsyncStorage.getItem('CATEGORIES_STORAGE_KEY'));
            if (storedCategories !== null && storedCategories !== undefined) {
              console.log('storedCategories');
              console.log(storedCategories);
            }
          } catch (e) {
            console.log('Failed to fetch the categories from storage');
          }
          try {
            const storedFactScore= JSON.parse(await AsyncStorage.getItem('FACT_SCORE_STORAGE_KEY'));
            
            if (storedFactScore !== null && storedFactScore !== undefined) {
              console.log('storedFactScore');
              console.log(storedFactScore);
              
            }
          } catch (e) {
            console.log('Failed to fetch the factscore from storage');
          }
          try {
            const storedLocation= await AsyncStorage.getItem('LOCATION_STORAGE_KEY');
            if (storedLocation !== null && storedLocation !== undefined) {
              console.log('storedLocation');
              console.log(storedLocation);
              
            }
          } catch (e) {
            console.log('Failed to fetch the location from storage');
          }
          
      }



  async function fetchArticles(factScore, category, sentiment, location) {

    console.log('location');
    console.log(location);
    if (location == undefined){
      location = 'EST'
    }
    const artList = await supabase
      .from('articles')
      .select('*')
      .gte('fact_score', (factScore/10))
      .in('category', category)
      .in('sentiment', sentiment)
      .eq('location', location)
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
        category: artList.data[key].category,
        location: artList.data[key].location,
      };
      arts.push(artobj);
    }
    setArticles(arts);
  }

function nav(){
  props.navigation.navigate("About");
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
  fetchArticles(reduxFactScore, reduxCategory, reduxSentiment, reduxLocation);
  console.log("article list focused")
  return;
}, [isFocused]
)

  useEffect(() => {
    fetchArticles(reduxFactScore, reduxCategory, reduxSentiment,reduxLocation);
    console.log("article list updated")
    AsyncStorage.setItem('CATEGORIES_STORAGE_KEY', JSON.stringify(reduxCategory));
    AsyncStorage.setItem('SENTIMENT_STORAGE_KEY', JSON.stringify(reduxSentiment));
    AsyncStorage.setItem('FACT_SCORE_STORAGE_KEY', JSON.stringify(reduxFactScore));
    AsyncStorage.setItem('LOCATION_STORAGE_KEY', JSON.stringify(reduxLocation));
    sleep(1000);
    return;
  }, [reduxFactScore, reduxCategory, reduxSentiment, reduxLocation]
  )


  const [articles, setArticles] = useState(() => fetchArticles(reduxFactScore, reduxCategory, reduxSentiment, reduxLocation));
  const image = { uri: "https://i.ibb.co/kqC18S0/echo-gradient-background1.jpg" };


  return (
    
    <View >
      <View>
        <Pressable onPress={nav} >
          <Text style={styles.topText}>OPEN ALPHA</Text>
          
        </Pressable>
        </View>
      
      <Image source={image} resizeMode={"stretch"}  style={{ width: '100%', height: 20}}>
      <View style={styles.container}>
        
      <TouchableHighlight onPress={nav}>
        
      <Image
        source={{ uri: 'https://i.ibb.co/DYnBzsG/Leon-Echo-Mediumer-Text-Version1.png' }}//Have echo log pop up really small here (for brand)
        style={{ width: 60, height: 20,alignContent: 'center', //https://i.ibb.co/4txfbtM/Leon-Echo-Medium-Full-Logo-With-Phone-Version1.png
        justifyContent: 'center',
        borderRadius: 1,
        borderColor: '#000',
        shadowRadius: 2,
        shadowColor: '#000'
        
        }}
      />
      </TouchableHighlight>
      
      
      </View>
      
        
      </Image>

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
    padding: 0,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 1,
    borderColor: '#000',
    shadowRadius: 2,
    shadowColor: '#000',
    flexDirection: 'row'
    
  },
  container2: {
   backgroundColor: '#f5e8c6',
    padding: 10,
    

  },
  topText: {
    justifyContent:'center',
    flexDirection: 'column',
    alignContent: 'center',
  },
  article: {
    borderColor: '#cbf5f2',
    borderWidth: 1
    
  }

});1

export default ArticleList;

