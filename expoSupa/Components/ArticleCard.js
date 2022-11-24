import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useState } from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Icon } from '@rneui/themed';

function ArticleCard(props) {
  const itemdata = props.itemdata;
  const item = props.itemdata.item;
  const [clicked, setClicked] = useState(false);

  function toggleText() {
    setClicked(!clicked);

  }
  function nav() {
    props.navigation.navigate("Article", { link: item.link });
  }


  function exportArticleInfo() {
    console.log(item);

  }


  return (

    <View>
      <Pressable onPress={nav}>
        <Card>
          <Card.Cover source={(item.img !== "") ? { uri: item.img } : require('../assets/Leon_Echo_MediumFullLogoWithPhone_Version1.png')} />
          <Card.Content>
            <Title>{item.title}</Title>
            <View style={styles.iconContainer}>
              <View style={styles.iconGroup}>
              <Icon name='checkbox-marked-circle-outline' type='material-community'/>
              <Text>  {Math.floor(item.factScore * 100)}%</Text>
              </View>
              <View style={styles.iconGroup}>
              <Icon name='heart-pulse' type='material-community'/>
              <Text>  {item.sentiment}</Text>
              </View>
              <View style={styles.iconGroup}>
              <Icon name='newspaper' type='material-community'/>
              <Text>  {item.category}</Text>
              </View>
            </View>
            <Pressable onPress={toggleText} >
              <View style={styles.container}>
                <Paragraph style={clicked ? styles.container : styles.container2}>
                  {item.summary}
                </Paragraph>
                <Button icon={clicked? "minus":"plus"} mode="contained" onPress={toggleText}>
              expand
            </Button>
              </View>
            </Pressable>
            <Button icon="book-open" mode="contained" onPress={exportArticleInfo}>
              Console log info
            </Button>
          </Card.Content>

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