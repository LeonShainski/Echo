import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto';
import { Card, Title, Paragraph } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Home  from './screens/Home'
import  Settings  from './screens/Settings';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import TouchableExample from './screens/TouchableExample';

const Tab = createBottomTabNavigator();

const supabaseUrl = 'https://vsaxkocxddahwxlbzkjj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzYXhrb2N4ZGRhaHd4bGJ6a2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3MjU2MjYsImV4cCI6MTk3OTMwMTYyNn0.mUro088rMzVnGQAZRxtelwUyE-hLLCHJ5VfxoTHLbsM';
const supabase = createClient(supabaseUrl, supabaseKey)

export default function App() {

  const [factScore, setFactScore] = useState(50);
  const [sentiment, setSentiment] = useState(['happy', 'sad', 'informational']);
  const [category, setCategory] = useState(['business', 'politics', 'sports']);



  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{
            tabBarIcon: (props) => (
              <Icon type='feather' name='home' color={props.color} />
            ),
          }} factScore={factScore} sentiment={sentiment} category={category}/>
      <Tab.Screen name="Settings" component={Settings} options={{
            tabBarIcon: (props) => (
              <Icon type='feather' name='dollar-sign' color={props.color} />
            ),
          }} factScore={factScore} sentiment={sentiment} category={category}/>
      <Tab.Screen name="TouchableExample" component={TouchableExample} options={{
            tabBarIcon: (props) => (
              <Icon type='feather' name='dollar-sign' color={props.color} />
            ),
          }} factScore={factScore} sentiment={sentiment} category={category}/>
    </Tab.Navigator>
    </NavigationContainer>
  
)}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

