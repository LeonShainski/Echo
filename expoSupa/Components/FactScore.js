import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Button, Pressable, PanResponder } from 'react-native';
import { Icon, Slider } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef, Component } from 'react';
import {changeFactScore} from '../store/factscore';


function FactScore(props) {
    
    const reduxFactScore = useSelector((state) => state.factScore.factscore);
    const [factScore, setFactScore] = useState(reduxFactScore);
    
    console.log('reduxFactScore');
    console.log(reduxFactScore);
    
   const dispatch = useDispatch();

    async function changefactscore() {
   
          dispatch(changeFactScore(factScore));
          return;
      }

      useEffect(( ) =>{
        changefactscore();
      
    }, [factScore]);
 

    return (
        <View>
            <Text>Factscore</Text>
            <Text>{reduxFactScore}</Text>
            <Slider
                value={factScore}
                onValueChange={setFactScore}
                maximumValue={10}
                minimumValue={0}
                step={1}
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
    )

}

export default FactScore
