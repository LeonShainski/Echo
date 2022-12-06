import { StyleSheet, Text, View, ScrollView, FlatList, TextInput, Pressable, Switch, Animated, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { changeLocation } from '../store/location';
import React, { useEffect, useState, useRef } from 'react';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Location(props) {


    const reduxLocation = useSelector((state) => state.location.location);
    const allLocations = ['EST', 'PST', 'CET'];
    const [location, setLocation] = useState('EST');
    const dispatch = useDispatch();

    function setLocationHandler(location) {
        dispatch(changeLocation(location));
    }
    
    useEffect(( ) =>{
        setLocationHandler(location);
    }, [location]);


    useEffect(( ) =>{
        if (reduxLocation !== undefined)
        setLocation(reduxLocation);
      
    }, []);


    return (
        <View>
            <Text style={styles.title}>Time Zone</Text>
            <View style={{ flexDirection: 'row', 
            alignContent: 'center', 
            paddingLeft: 50
             }}>
                <RadioButton.Group onValueChange={value => setLocation(value)} value={location} style={styles.radioButtonOptions}>
                    <RadioButton.Item label="EST" value="EST" style={styles.radioButtonText}/>
                    <RadioButton.Item label="PST" value="PST" />
                    <RadioButton.Item label="CET" value="CET" />
                </RadioButton.Group>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: '#dcdcdc',
        paddingTop: 48,
        paddingBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
    },
    title: {
        margin: 10,
        padding: 10,
        textShadowColor: 'green',
        textShadowRadius: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        fontSize: 21},
    radioButtonText: {
        fontWeight: 'bold'
    },
    radioButtonOptions: {
        flexDirection: 'row',
        padding: 50
    }
})

export default Location;



