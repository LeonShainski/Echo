import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { useEffect, useState } from 'react';

import ArticleList from '../Components/ArticleList';



function Home(props) {





    return (
    

        <View style={styles.container}>
            <ArticleList navigation={props.navigation} ></ArticleList>
        </View>
      
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    article: {
        flex:2,
        backgroundColor: '#f5e8c6',
        padding: 20
    
      }
});

export default Home;