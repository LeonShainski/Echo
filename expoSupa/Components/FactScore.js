import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Button, Pressable, PanResponder } from 'react-native';
import { Icon, Slider } from '@rneui/themed';
import { useEffect, useState } from 'react';


function FactScore(props) {


    return (
        <View>
            <Text>Factscore</Text>
            <Text>{Math.floor(props.factScore * 10)}</Text>
            <Slider
                value={props.factScore}
                onValueChange={props.setFactScore}
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
    )

}

export default FactScore
