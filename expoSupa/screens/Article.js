import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Button } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto';
import { WebView } from 'react-native-webview';


function Article(props) {

    console.log(props);

    return  (
        <WebView source={{ uri: props.route.params.link}}/>
            )
}

export default Article;