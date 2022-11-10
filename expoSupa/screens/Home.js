import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Button, Pressable } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Article from '../Components/ArticleList';
import { Icon, Slider } from '@rneui/themed';
import { CheckBox } from '@rneui/base'



const supabaseUrl = 'https://vsaxkocxddahwxlbzkjj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzYXhrb2N4ZGRhaHd4bGJ6a2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3MjU2MjYsImV4cCI6MTk3OTMwMTYyNn0.mUro088rMzVnGQAZRxtelwUyE-hLLCHJ5VfxoTHLbsM';
const supabase = createClient(supabaseUrl, supabaseKey)

function Home() {


    const [factScore, setFactScore] = useState(0.5);
    const [usedSentiment, setUsedSentiment] = useState(['Happy', 'Sad', 'Informational']);
    const [category, setCategory] = useState(['business', 'politics', 'sports']);
    const [articles, setArticles] = useState(() => fetchArticles());
    const allCategories = ['business', 'politics', 'sports'];
    const allSentiments = ['Happy', 'Sad', 'Informational'];
    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    async function fetchArticles() {
        
        const artList = await supabase
            .from('articles')
            .select('*')
            .gte('id', 1600)
            .gte('fact_score', factScore)
            .in('category', category)
            .in('sentiment', usedSentiment)
            .not('title', 'is', null)
        
        arts = [];
        for (const key in artList.data) {
            const artobj = {
                id: artList.data[key].id,
                title: artList.data[key].title,
                img: artList.data[key].img,
            };
           
            arts.push(artobj);

        }
        setArticles(arts);
    }

    

    function deleteSentiment(sentiment) {
        if (usedSentiment.includes(sentiment)) {

        
        setUsedSentiment((currSentiment) => {
            return currSentiment.filter((item) => item !== sentiment)
        })
    }

   
        
}

function addSentiment(sentiment){
    var arr = usedSentiment.slice();
    if (!arr.includes(sentiment)){
    arr.push(sentiment)
    setUsedSentiment(arr);
    console.log('added');
    console.log(arr);
    }
    console.log('not added');
    console.log(arr);
   
}


    useEffect(() => {

    })
    
        
    useEffect(() => {
        
        console.log(usedSentiment);
        return;
    }, [usedSentiment] )

    useEffect(() => {
        fetchArticles();
        return;
    }, [factScore, usedSentiment, category])


    return (
        <View>
            <View>
                <Text>Factscore</Text>
                <Text>{Math.floor(factScore * 10)}</Text>
                <Slider
                    value={factScore}
                    onValueChange={setFactScore}
                    maximumValue={1}
                    minimumValue={0}
                    step={.1}
                    allowTouchTrack
                    trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                    thumbProps={{
                        children: (
                            <Icon
                                name="circle"
                                type="font-awesome"
                                size={20}
                                reverse
                                containerStyle={{ bottom: 20, right: 20 }}
                            />
                        ),
                    }}
                />
            </View>
            <View>
                {allSentiments.map((currSentiment, index) => {
                    return (
                        <View key={index}>
                     <Text> {currSentiment}</Text> 
                     <Pressable  title={currSentiment} onPress={addSentiment.bind(this, currSentiment)}> 
                      <View>
                      
                       <Text>add</Text>
                      </View>
                      </Pressable>
                      <Pressable  title={currSentiment} onPress={deleteSentiment.bind(this, currSentiment)}> 
                      <View>
                      
                       <Text>remove</Text>
                      </View>
                      </Pressable>
                      </View>
                    )
                }

                )}
            </View>

            <Article articles={articles}></Article>
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