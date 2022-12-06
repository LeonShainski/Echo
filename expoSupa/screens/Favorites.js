import { StyleSheet, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoriteList from "../Components/FavoriteList";


function Favorites(props) {

    const isFocused = useIsFocused()

    return(
        
      <View style={styles.container}>
        {isFocused ?
      <FavoriteList navigation={props.navigation} style={styles.article} />
      : null}
  </View>
    )

}

const styles = StyleSheet.create({

    article: {
        borderColor: '#cbf5f2',
        borderWidth: 1,
        
        
      },
    container2: {
        backgroundColor: '#f5e8c6',
         padding: 10,
         
     
       },
       container: {
        padding: 0,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 1,
        borderColor: '#000',
        shadowRadius: 2,
        shadowColor: '#000',
        flexDirection: 'row',
        flex:1
        
      }
    
    });

export default Favorites;
    
