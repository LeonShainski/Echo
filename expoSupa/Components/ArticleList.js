import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Pressable } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';



function ArticleList(props) {


  const supabaseUrl = 'https://vsaxkocxddahwxlbzkjj.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzYXhrb2N4ZGRhaHd4bGJ6a2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3MjU2MjYsImV4cCI6MTk3OTMwMTYyNn0.mUro088rMzVnGQAZRxtelwUyE-hLLCHJ5VfxoTHLbsM';
  const supabase = createClient(supabaseUrl, supabaseKey)

  // console.log(props.factScore);
  // console.log(props.categories);
  // console.log(props.sentiments);

  const [articles, setArticles] = useState(() => fetchArticles(props.factScore, props.sentiments, props.categories));


  async function fetchArticles(factScore, sentiments, categories) {


    const artList = await supabase
      .from('articles')
      .select('*')
      .gte('id', 1600)
      .gte('fact_score', factScore)
      .in('category', categories)
      .in('sentiment', sentiments)
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
    fetchArticles(props.factScore, props.sentiments, props.categories);
    return;
  }, [props.factScore, props.categories, props.sentiments]
  )


  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={nav}>
          <Text>THING</Text>
        </Pressable>
      </View>

      <FlatList data={articles} renderItem={(itemData) => {
        
          return (

            <View>
              <ArticleCard itemData={itemData} navigation={props.navigation}/>
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
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    height: 70
  },
});

export default ArticleList;