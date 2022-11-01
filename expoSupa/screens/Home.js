import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const supabaseUrl = 'https://vsaxkocxddahwxlbzkjj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzYXhrb2N4ZGRhaHd4bGJ6a2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3MjU2MjYsImV4cCI6MTk3OTMwMTYyNn0.mUro088rMzVnGQAZRxtelwUyE-hLLCHJ5VfxoTHLbsM';
const supabase = createClient(supabaseUrl, supabaseKey)

function Home() {
  const [articles, setArticles] = useState(() => fetchArticles());

  async function fetchArticles() {

    const artList = await supabase.from('articles').select('*');

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
    setArticles(arts);
  }

  return (
    <View style={styles.container}>
      
      <FlatList data={articles} renderItem={(itemData) => {
        if (itemData.item.img !== ""){
          return (
          <Card>
            <Card.Content>
              <Title>{itemData.item.title}</Title>
              <Paragraph>{itemData.item.img}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: itemData.item.img }} />
          </Card>
        );
          }
        else{
        return (
             <Card>
            <Card.Content>
              <Title>{itemData.item.title}</Title>
              <Paragraph>{itemData.item.img}</Paragraph>
            </Card.Content>
            <Card.Cover source={require('../assets/Leon_Echo_MediumFullLogoWithPhone_Version1.png')} />
          </Card>
          )
        }
        
      }} alwaysBounceVertical={false} />

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Home;