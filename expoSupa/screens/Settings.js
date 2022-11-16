import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Button } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto';


function Settings(props) {
  const allCategories = ['business', 'politics', 'sports'];
  const allSentiments = ['Happy', 'Sad', 'Information'];
  const [factScore, setFactScore] = useState(0.5);
  const [sentiments, setSentiments] = useState(allSentiments);
  const [categories, setCategories] = useState(allCategories);
  var newthing = "it";


  return (
    <View style={styles.container}>
      <Text> ngerwerfg</Text> 
     
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
