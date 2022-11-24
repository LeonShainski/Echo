import { StyleSheet, View, Pressable } from 'react-native';
import { useState } from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';


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
});



export default ArticleCard;