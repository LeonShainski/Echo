import { StyleSheet, View, FlatList } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState, useRef } from 'react';
import ArticleCard from './ArticleCard';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setSentiment } from '../store/sentiment';
import { setCategory } from '../store/category';
import { changeFactScore } from '../store/factscore';
import { changeLocation } from '../store/location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { Image } from 'react-native-elements';
import { ImageBackground } from 'react-native';
import { TouchableHighlight, Dimensions } from 'react-native';

import { addFavorite, removeFavorite } from '../store/favorites';



function ArticleList(props) {

  const supabaseUrl = 'https://vsaxkocxddahwxlbzkjj.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzYXhrb2N4ZGRhaHd4bGJ6a2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3MjU2MjYsImV4cCI6MTk3OTMwMTYyNn0.mUro088rMzVnGQAZRxtelwUyE-hLLCHJ5VfxoTHLbsM';
  const supabase = createClient(supabaseUrl, supabaseKey)

  const dispatch = useDispatch();

  const reduxSentiment = useSelector((state) => state.sentiments.sentiments);
  const reduxCategory = useSelector((state) => state.categories.categories);
  const reduxFactScore = useSelector((state) => state.factScore.factscore);
  const reduxLocation = useSelector((state) => state.location.location);
  const reduxFavorites = useSelector((state) => state.favorites.favorites);
  const [id, setId] = useState(0);
  const flatListRef = useRef();

/* 
  const readData = async () => {
    console.log('read data');
    try {
      const storedSentiments = JSON.parse(await AsyncStorage.getItem('SENTIMENT_STORAGE_KEY'));
      if (storedSentiments !== null && storedSentiments !== undefined) {
        console.log('storedSentiments');
        console.log(storedSentiments);
        dispatch(setSentiment(storedSentiments));
      }
    } catch (e) {
      console.log('Failed to fetch the sentiments from storage');
      console.log(e);
    }
    try {
      const storedCategories = JSON.parse(await AsyncStorage.getItem('CATEGORIES_STORAGE_KEY'));
      if (storedCategories !== null && storedCategories !== undefined) {
        console.log('storedCategories');
        console.log(storedCategories);
        dispatch(setCategory(storedCategories));
      }
    } catch (e) {
      console.log('Failed to fetch the categories from storage');
    }
    try {
      const storedFactScore = parseInt(await AsyncStorage.getItem('FACT_SCORE_STORAGE_KEY'));

      if (storedFactScore !== null && storedFactScore !== undefined) {
        console.log('storedFactScore');
        console.log(storedFactScore);
        dispatch(changeFactScore(storedFactScore));
      }
    } catch (e) {
      console.log('Failed to fetch the factscore from storage');
      console.log(e);
    }
    try {
      const storedLocation = await AsyncStorage.getItem('LOCATION_STORAGE_KEY');
      if (storedLocation !== null && storedLocation !== undefined) {
        console.log('storedLocation');
        console.log(storedLocation);
        dispatch(changeLocation(storedLocation));
      }
    } catch (e) {
      console.log('Failed to fetch the location from storage');
      console.log(e);
    }
    return;

  }

 */

  async function fetchArticles(factScore, category, sentiment, location) {

    if (location == undefined) {
      location = 'EST'
    }
    const artList = await supabase
      .from('articles')
      .select('*')
      .gte('id', id)
      .gte('fact_score', (factScore / 10))
      .in('category', category)
      .in('sentiment', sentiment)
      .eq('location', location)
      .not('title', 'is', null)
      .limit(100)

    var arts = [];
    for (const key in artList.data) {
      let inFaves = false;
      
      
      if (reduxFavorites!= undefined && reduxFavorites.find(x => x.id == artList.data[key].id) != undefined) {
        inFaves = true;
      }

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
        favorite: inFaves
      };
      arts.push(artobj);
    }
    var end = { id: 0 }
    arts.push(end);
    setArticles(arts);
  }

  function nav() {
    props.navigation.navigate("About");
  }

  async function loadMore() {
    if (articles.length > 20) {
      var s = articles.pop();
      s = articles.pop();
      setId(s.id)
    } else {
      setId(0);
    }
    await sleep(300);
    flatListRef.current.scrollToIndex({ animated: false, index: 0 });
    return;
  }


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
   // readData();
    return;
  }, []
  )

  useEffect(() => {
    fetchArticles(reduxFactScore, reduxCategory, reduxSentiment, reduxLocation);
    console.log("article list updated")
    sleep(1000);
    return;
  }, [reduxFactScore, reduxCategory, reduxSentiment, reduxLocation, reduxFavorites, id]
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

      <Image source={image} resizeMode={"stretch"} style={{ width: '100%', height: 20 }}>
        <View style={styles.container}>
          <TouchableHighlight onPress={nav}>
            <Image
              source={{ uri: 'https://i.ibb.co/DYnBzsG/Leon-Echo-Mediumer-Text-Version1.png' }}//Have echo log pop up really small here (for brand)
              style={{
                width: 60, height: 20, alignContent: 'center', //https://i.ibb.co/4txfbtM/Leon-Echo-Medium-Full-Logo-With-Phone-Version1.png
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
      <View style={styles.container3}>
        <FlatList ref={flatListRef} data={articles} renderItem={(itemData) => {
          return (
            <View style={styles.container2}>
              <ArticleCard item={itemData.item} navigation={props.navigation} style={styles.article} loadMore={loadMore} />
            </View>
          );
        }} alwaysBounceVertical={false} />
      </View>
    </View>

  )
}

let { height } = Dimensions.get("window");


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
    backgroundColor: '#dfebf0',
    padding: 10,
  },
  container3: {
    height: height - 140,
  },
  topText: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
  },
  article: {
    borderColor: '#cbf5f2',
    borderWidth: 1
  }

});1

export default ArticleList;

