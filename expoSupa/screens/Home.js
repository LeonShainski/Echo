import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { useEffect, useState } from 'react';

import ArticleList from '../Components/ArticleList';

import AsyncStorage from '@react-native-async-storage/async-storage';



function Home(props) {


      useEffect(() => {
        readData();
      }, []);
    return (
    

        <View style={styles.container}>
            <ArticleList factScore={factScore} sentiments={sentiments} categories={categories} navigation={props.navigation} style={styles.article}></ArticleList>
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