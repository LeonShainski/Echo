import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';


import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import Auth from './components/Auth';
import Account from './components/Account';
import MainScreen from './screens/MainScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen  name="LoginScreen" component={LoginScreen}/>
      <Stack.Screen name="SignupScreen" component={SignupScreen}/>
      <Stack.Screen name="AuthScreen" component={Auth} />
      <Stack.Screen name="AccountScreen" component={Account} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
    </Stack.Navigator>
    
  </NavigationContainer>


  );
}


