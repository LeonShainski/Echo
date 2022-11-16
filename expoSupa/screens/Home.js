import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { useEffect, useState } from 'react';
import ArticleList from '../Components/ArticleList';




function Home(props) {



    const allCategories = ['business', 'politics', 'sports'];
    const allSentiments = ['Happy', 'Sad', 'Information'];
    const [factScore, setFactScore] = useState(0.5);
    const [sentiments, setSentiments] = useState(allSentiments);
    const [categories, setCategories] = useState(allCategories);
    
    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );



    return (
    

        <View style={styles.container}>
            <ArticleList factScore={factScore} sentiments={sentiments} categories={categories} navigation={props.navigation} ></ArticleList>
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