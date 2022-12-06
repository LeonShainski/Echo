import { StyleSheet, View } from 'react-native';
import ArticleList from '../Components/ArticleList';
import { useIsFocused } from '@react-navigation/native';


function Home(props) {

  const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      {isFocused ?<ArticleList navigation={props.navigation} style={styles.article}/> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10

  },
  article: {
    flex: 2,
    backgroundColor: '#f5e8c6',
    padding: 20

  }
});

export default Home;