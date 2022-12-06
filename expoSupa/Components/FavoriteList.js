import { StyleSheet, View, FlatList } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import FavoriteCard from './FavoriteCard';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setFavorite } from '../store/favorites';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { Image } from 'react-native-elements';
import { TouchableHighlight } from 'react-native';

import { removeFavorite, setFavorites} from '../store/favorites';



function FavoriteList(props) {


  const dispatch = useDispatch();

  const reduxFavorites = useSelector((state) => state.favorites.favorites);
  const [favArticles, setFavArticles] = useState(reduxFavorites);

  function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
  
    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }
  
    return arr;
  }

  function fetchArticles() {
    setFavArticles(reduxFavorites);
    console.log('reduxFavorites');
    //console.log(reduxFavorites);
  }

  function removeFav(article) {
    
     console.log('removeFav', article);
    var temp = Array.from(favArticles);
     const index = favArticles.findIndex((obj) => obj.id === article.id);
     if (index > -1) {
      temp.splice(index, 1)
      setFavArticles(temp);
    }
    console.log('favArticles', favArticles);
    return;
  }

  function nav() {
    props.navigation.navigate("About");
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  /* 
  useEffect(() => {
    readData();
    return;
  }, []
  )
     */


  useEffect(() => {
    dispatch(setFavorites(favArticles));
    console.log("favorite list updated");
    AsyncStorage.setItem('FAV_ARTICLES_STORAGE_KEY', JSON.stringify(reduxFavorites));
    return;
  }, [favArticles]
  )

  const image = { uri: "https://i.ibb.co/kqC18S0/echo-gradient-background1.jpg" };


  return (

    <View >
      <View>
        <Pressable onPress={nav} >
          <Text style={styles.topText}>OPEN ALPHA</Text>

        </Pressable>
      </View>

      <Image source={image} resizeMode={"stretch"} style={{ width: '100%', height: 20 }}>
        <View style={styles.container}>

          <TouchableHighlight onPress={nav}>

            <Image
              source={{ uri: 'https://i.ibb.co/DYnBzsG/Leon-Echo-Mediumer-Text-Version1.png' }}//Have echo log pop up really small here (for brand)
              style={{
                width: 60, height: 20, alignContent: 'center', //https://i.ibb.co/4txfbtM/Leon-Echo-Medium-Full-Logo-With-Phone-Version1.png
                justifyContent: 'center',
                borderRadius: 1,
                borderColor: '#000',
                shadowRadius: 2,
                shadowColor: '#000'

              }}
            />
          </TouchableHighlight>


        </View>


      </Image>

      <FlatList data={favArticles} renderItem={(itemData) => {
        return (
          <View key={itemData.id} style={styles.container2}>
            <FavoriteCard item={itemData.item} navigation={props.navigation} style={styles.article} removeFav={removeFav}/>
          </View>
        );
      }} alwaysBounceVertical={false} />
    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    padding: 0,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 1,
    borderColor: '#000',
    shadowRadius: 2,
    shadowColor: '#000',
    flexDirection: 'row'

  },
  container2: {
    backgroundColor: '#f5e8c6',
    padding: 10,


  },
  topText: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
  },
  article: {
    borderColor: '#cbf5f2',
    borderWidth: 1

  }

});

export default FavoriteList;

