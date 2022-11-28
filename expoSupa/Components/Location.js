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
            <Text style={styles.title}>Location</Text>
            <View style={{ flexDirection: 'row', alignContent: 'center', borderColor: '#000000', borderWidth: 2 }}>
                <RadioButton.Group onValueChange={value => setLocation(value)} value={location} >
                    <RadioButton.Item label="EST" value="EST" />
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
        fontSize: 22,
        color: '#333',
        fontWeight: 'bold',
    }
})

export default Location;



