import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { useEffect, useState } from 'react';
import { Image } from 'react-native-elements';

import ArticleList from '../Components/ArticleList';

import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



function Home(props) {


  const isFocused = useIsFocused();

    return (
    
        
     
         
        <View style={styles.container}>{isFocused?
            <ArticleList navigation={props.navigation} style={styles.article}></ArticleList>
       : <View></View>} 
       
       </View>
        
      
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:10
        
    },
    article: {
        flex:2,
        backgroundColor: '#f5e8c6',
        padding: 20
    
      }
});

export default Home;