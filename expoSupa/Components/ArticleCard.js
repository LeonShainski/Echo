import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addFavorite, removeFavorite } from '../store/favorites';
import { useSelector, useDispatch } from 'react-redux';

function ArticleCard(props) {

  const item = props.item;
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(item.favorite);

  const [expand, setExpand] = useState('expand +');
  var long;
  var cat = item.category;

  if (cat == 'entertainment') {
    cat = 'Humanities';
  }
  else if (cat == 'business') {
    cat = 'Business'
  }
  else if (cat == 'politics') {
    cat = 'Politics';
  }
  else if (cat == 'sports') {
    cat = 'Sports';
  }
  else if (cat == 'tech') {
    cat = 'Tech';
  }

  if (item.summary !== undefined){
    long = item.summary.length > 155;
  } else {long = false}


  function toggleText() {
      console.log(long)
      console.log(item.summary.length)
      if (long && !clicked){
          setExpand('[-]')
      }
      if (long && clicked){
          setExpand('expand [+]')
      }
      if (long){
      setClicked(!clicked);
      }
      
  }

  function nav() {
    props.navigation.navigate("Article", { link: item.link });
  }

  function addFav() {
    dispatch(addFavorite(item));
    console.log('added', item);
    setFavorite(true);
    return;
  };

  function removeFav() {
    dispatch(removeFavorite(item));
    setFavorite(false);
    return;
  }

  function loadMore() {
    props.loadMore();
  }

  if (item.id != 0) {
    return (
      <View>
        <Card>
          <Card.Actions>
            <Pressable onPress={favorite ? removeFav : addFav}>
            <Icon type={'font-awesome'} name={favorite? 'star': 'star-o'} color={favorite? '#dbcb18': 'black'} size={30}/>
            </Pressable>
          </Card.Actions>
          <Pressable onPress={nav}>
            <Card.Cover source={(item.img !== "") ? { uri: item.img } : require('../assets/Leon_Echo_MediumFullLogoWithPhone_Version1.png')} />
            <Card.Content>
              <Title>{item.title}</Title>
              <View style={styles.iconContainer}>
                <View style={styles.iconGroup}>
                  <Icon name='checkbox-marked-circle-outline' type='material-community' color='#2bd63c' />
                  <Text>  {Math.floor(item.factScore * 100)}%</Text>
                </View>
                <View style={styles.iconGroup}>
                  <Icon name='heart-pulse' type='material-community' color='#e62929'/>
                  <Text>  {item.sentiment}</Text>
                </View>
                <View style={styles.iconGroup}>
                  <Icon name='newspaper' type='material-community' color='#1717bf'/>
                  <Text>  {cat}</Text>
                </View>
              </View>
              <Pressable onPress={toggleText} >
                <View style={styles.container}>
                  <Paragraph style={clicked ? styles.container : styles.container2}>
                    {item.summary}
                  </Paragraph>
                  <Paragraph >
                  {long? expand: ''}
                  </Paragraph>
                </View>
              </Pressable>
            </Card.Content></Pressable>
        </Card>
      </View>
    );
  } else {
    return (
      <View>
        <Button mode="contained" onPress={loadMore}> Load More</Button>
      </View>)
  }
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});



export default ArticleCard;