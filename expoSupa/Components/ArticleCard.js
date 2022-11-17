import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Pressable } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper'
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Article from '../screens/Article';


function ArticleCard(props) {
    const item = props.item;
    const [clicked, setClicked] = useState(false);

function toggleText(){
    setClicked(!clicked);
    
}
function nav(){
    props.navigation.navigate("Article", {link: item.link});
  }
return (
    
        <View>
          <Pressable onPress={nav}>
            <Card>
              <Card.Content>
                <Title>{item.title}</Title>
                <Pressable onPress={toggleText} >
                    <View style={styles.container}>
                  <Paragraph style={clicked? styles.container: styles.container2}>
                    {item.summary}
                  </Paragraph>
                  <Paragraph style={styles.container2}>
                    Expand +
                  </Paragraph></View>
                </Pressable>
              </Card.Content>
              <Card.Cover source={(item.img !== "") ? { uri: item.img }: require('../assets/Leon_Echo_MediumFullLogoWithPhone_Version1.png') } />
            </Card>
          </Pressable>
        </View>
      );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 0,
    },
    container2: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
      height: 80
    },
  });



export default ArticleCard;