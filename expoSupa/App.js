import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto';
import { Card, Title, Paragraph } from 'react-native-paper'

const supabaseUrl = 'https://nnlrqgvazhqblcszxovj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ubHJxZ3ZhemhxYmxjc3p4b3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQwMzk1MDcsImV4cCI6MTk3OTYxNTUwN30.7NhfGtTTR_qzUCdyAHon1OMdR7mIvzwBisOzfW17NNM';
const supabase = createClient(supabaseUrl, supabaseKey)

export default function App() {
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

