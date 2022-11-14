import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function ArticleList(props) {
return (
<View>
      
      <FlatList data={props.articles}  renderItem={(itemData) => {
        if (itemData.item.img !== ""){
          return (
          <Card style={styles.article} >
            <Card.Content>
              <Title>{itemData.item.title}</Title>
              <Paragraph>{itemData.item.id}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: itemData.item.img }} />
          </Card>
        );
          }
        else{
        return (
             <Card>
            <Card.Content>
              <Title>{itemData.item.title}</Title>
              <Paragraph>{itemData.item.id}</Paragraph>
            </Card.Content>
            <Card.Cover source={require('../assets/Leon_Echo_MediumFullLogoWithPhone_Version1.png')} />
          </Card>
          )
        }
        
      }} alwaysBounceVertical={false} />

    </View>
)
}

export default ArticleList;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  article: {

      backgroundColor: '##fcf8eb',
      padding: 5,
      paddingTop: 20
  
    }
});