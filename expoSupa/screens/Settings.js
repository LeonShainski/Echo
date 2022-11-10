import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto';
import { Card, Title, Paragraph } from 'react-native-paper'
import { Icon } from '@rneui/themed';


function Settings() {
  const [factScore, setFactScore] = useState(50);
  const [sentiment, setSentiment] = useState(['happy', 'sad', 'informational']);
  const [category, setCategory] = useState(['business', 'politics', 'sports']);
  

  
  async function fetchArticles() {

    const artList = await supabase
    .from('articles')
    .select()
    .gte(factScore, 'fact_score')
    .in('category', category)
    .in('sentiment', sentiment)


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

  }

  return (
    <View style={styles.container}>

      <FlatList data={articles} renderItem={(itemData) => {
        return (
          <Card>
            <Card.Content>
              <Title>{itemData.item.title}</Title>
              <Paragraph>itemData.item.img</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: itemData.item.img }} />
          </Card>
        );
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

export default Settings
