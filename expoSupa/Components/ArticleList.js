import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Pressable } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { addSentiment, removeSentiment } from '../store/sentiment';



function ArticleList(props) {



  const supabaseUrl = 'https://vsaxkocxddahwxlbzkjj.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzYXhrb2N4ZGRhaHd4bGJ6a2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3MjU2MjYsImV4cCI6MTk3OTMwMTYyNn0.mUro088rMzVnGQAZRxtelwUyE-hLLCHJ5VfxoTHLbsM';
  const supabase = createClient(supabaseUrl, supabaseKey)

  // console.log(props.factScore);
  // console.log(props.categories);
  // console.log(props.sentiments);

  const reduxSentiment = useSelector((state) => state.sentiments.sentiments);
  const reduxCategory = useSelector((state) => state.categories.categories);
  console.log("in articlelist")
  console.log(reduxSentiment);
  console.log(reduxCategory);
  const dispatch = useDispatch();
  const isFocused = useIsFocused()

  const [articles, setArticles] = useState(() => fetchArticles(props.factScore, reduxCategory, reduxSentiment));


  async function fetchArticles(factScore, category, sentiment) {

    const artList = await supabase
      .from('articles')
      .select('*')
      .gte('id', 1600)
      .gte('fact_score', factScore)
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
        link: artList.data[key].link
      };
      arts.push(artobj);

    }
    setArticles(arts);
  }

function nav(){
  props.navigation.navigate("Article");
}

  
useEffect(() => {
  fetchArticles(props.factScore, reduxCategory, reduxSentiment);
  console.log("article list focused")
  return;
}, [isFocused]
)

  useEffect(() => {
    fetchArticles(props.factScore, reduxCategory, reduxSentiment);
    console.log("article list updated")
    return;
  }, [props.factScore, reduxCategory, reduxSentiment]
  )


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

