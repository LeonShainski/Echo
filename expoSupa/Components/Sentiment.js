import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Button, Pressable } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Slider } from '@rneui/themed';
import { CheckBox } from '@rneui/base'


function Sentiment(props) {
    var sent = props.sentiments;

    useEffect(() => {
        sent = props.sentiments;
    }, [])

    function deleteSentiment(sentiment) {
        if (sent.includes(sentiment)) {
            props.setSentiments((currSentiment) => {
                return currSentiment.filter((item) => item !== sentiment)
            })
        }
    }

    function addSentiment(sentiment) {
        var arr = sent.slice();
        if (!arr.includes(sentiment)) {
            arr.push(sentiment)
            props.setSentiments(arr);
            console.log('added');
            console.log(arr);
        }
        console.log('not added');
        console.log(arr);

    }

    return (
        <View>
            {props.allSentiments.map((currSentiment, index) => {
                return (
                    <View key={index}>
                        <Text> {currSentiment}</Text>
                        <Pressable title={currSentiment} onPress={addSentiment.bind(this, currSentiment)}>
                            <View>
                                <Text>add</Text>
                            </View>
                        </Pressable>
                        <Pressable title={currSentiment} onPress={deleteSentiment.bind(this, currSentiment)}>
                            <View>
                                <Text>remove</Text>
                            </View>
                        </Pressable>
                    </View>
                )
            })}
        </View>
    )
}

export default Sentiment;