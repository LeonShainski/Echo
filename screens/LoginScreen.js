import {View, Text, StyleSheet, Pressable} from 'react-native';
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { Session } from '@supabase/supabase-js'




function LoginScreen({navigation}) {

    

    function pressHandler() {
        console.log("pressed");
        navigation.navigate("MainScreen");
    }

    return (
        <View style={styles.container}>
            <Text >HELLO WORLD!</Text>
            <Pressable onPress={pressHandler}><Text>NO ACCOUNT YET?</Text></Pressable>
            
        </View>

    );
}


export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });