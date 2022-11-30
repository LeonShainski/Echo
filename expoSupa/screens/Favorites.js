import { StyleSheet, View, FlatList } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { addSentiment, removeSentiment } from '../store/sentiment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';

import { Image } from 'react-native-elements';
import { ImageBackground } from 'react-native';
import { TouchableHighlight } from 'react-native';
import ArticleCard from "../Components/ArticleCard";


function Favorites(props) {

    const isFocused = useIsFocused()
    var arrSavedArticles=[]


    //Calling read data function when the user enters the screen
    useEffect(() => {
        console.log('welcome to favorites');
        readData();
    }, [isFocused])

    //Getting latest saved article data
    const readData = async () => {
        console.log('readingData');
        
        arrSavedArticles =  JSON.parse(await AsyncStorage.getItem('FAV_ARTICLES_STORAGE_KEY'));
        //console.log(arrSavedArticles);
        console.log(typeof(arrSavedArticles));
        return;
    }
    return(
        
    <View style={styles.container}>
        <FlatList data={arrSavedArticles} renderItem={(itemData) => {
          return (
            <View style={styles.container2}>
                <Text>{itemData.id}</Text>
            </View>
          );
      }} alwaysBounceVertical={false} />
    </View>
    )

}

const styles = StyleSheet.create({

    article: {
        borderColor: '#cbf5f2',
        borderWidth: 1,
        
        
      },
    container2: {
        backgroundColor: '#f5e8c6',
         padding: 10,
         
     
       },
       container: {
        padding: 0,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 1,
        borderColor: '#000',
        shadowRadius: 2,
        shadowColor: '#000',
        flexDirection: 'row',
        flex:1
        
      }
    
    });

export default Favorites;
    
