import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import 'react-native-url-polyfill/auto';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import Article from './screens/Article';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store/store';
import InterestsList from './screens/InterestsList';
import About from './screens/About';
import Favorites from './screens/Favorites';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName='Home'>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: 'Home' }}
      />
      <HomeStack.Screen
        name="Article"
        component={Article}
        options={{ tabBarLabel: 'art' }}
      />
      <HomeStack.Screen
        name="Favourites"
        component={Favorites}
        options={{ tabBarLabel: 'art' }}
      />
      <HomeStack.Screen
        name="About"
        component={About}
        options={{ tabBarLabel: 'art' }}
      />
    </HomeStack.Navigator>
  );
}


export default function App() {

  const readData = async () => {
    try {
      const storedSentiments = await AsyncStorage.getItem('SENTIMENT_STORAGE_KEY');
      const storedCategories = await AsyncStorage.getItem('CATEGORIES_STORAGE_KEY');
      const storedFactScore = await AsyncStorage.getItem('FACT_SCORE_STORAGE_KEY');
      const storedSettingsView = await AsyncStorage.getItem('SETTINGS_VIEW_STORAGE_KEY');
      const storedLocation = await AsyncStorage.getItem('LOCATION_STORAGE_KEY');
      const storedFavorites = await AsyncStorage.getItem('FAV_ARTICLES_STORAGE_KEY');

      if (storedSentiments !== null) {
        console.log('sentiments', storedSentiments);
        console.log('categories', storedCategories);
        console.log('factScore', storedFactScore);
        console.log(storedSettingsView);
        console.log('location', storedLocation);
        console.log('favorites', storedFavorites);
        testVar = storedSettingsView;
        console.log('HEY LOOK HERE HEY LOOK HERE');
        console.log(testVar);


      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  }

  useEffect(() => {
    readData();
  }, []);
  //storedSettingsView ? Settings : InterestsList


  return (

    <Provider store={store}>
      <NavigationContainer style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{
            tabBarIcon: (props) => (
              <Icon type='feather' name='home' color={props.color} />
            ), headerShown: false, tabBarLabel: 'Home'
          }} />
          <Tab.Screen name="Settings" component={InterestsList} options={{
            tabBarIcon: (props) => (
              <Icon type='feather' name='settings' color={props.color} />
            ),
          }} />
          <Tab.Screen name="Favorites" component={Favorites} options={{
            tabBarIcon: (props) => (
              <Icon type='feather' name='star' color={props.color} />
            ),
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

