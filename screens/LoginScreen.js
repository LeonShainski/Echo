import {View, Text, StyleSheet, Pressable, Image, ImageBackground} from 'react-native';
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { Session } from '@supabase/supabase-js'
import { withTheme } from 'react-native-elements';





function LoginScreen({navigation}) {

    

    function pressHandler() {
        console.log("pressed");
        navigation.navigate("MainScreen");
    }

    return (
        <>
        <View style={styles.container}>
        <Image imageStyle={styles.image} source={require('../assets/Leon_Echo_MediumFullLogoWithPhone_Version1.png')}/>
            <Text >Welcome to Echo, more coming soon!</Text>
            <Pressable onPress={pressHandler}><Text style={styles.myAccountButton}>My Account</Text></Pressable>
        </View>
            </>


    );
}


export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 3,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        backgroundColor: 'yelow'
    },
    myAccountButton: {
        color: 'blue'
    }
  });