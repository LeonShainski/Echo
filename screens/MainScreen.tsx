import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { View , Text, StyleSheet, Pressable, Button} from 'react-native'
import { Session } from '@supabase/supabase-js'
import SignupScreen from './SignupScreen'

function MainScreen({navigation}: {navigation: any}) {
  const [session, setSession] = useState<Session | null>(null)


  function accountPressHandler() {
    console.log("pressedAccount");
    
    
}

  

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  //Missing the key:{session.user.id} paramater in the call to the account screen
  //Account needs to recieve that key but I am unable to send it up

  return (
    <View>
      {session && session.user ? <SignupScreen/> : <Auth />}
      <Pressable onPress={() => navigation.navigate("AccountScreen", {
      session:{session}
      })}>
        <Text>
          CLICK ME 
        </Text>
      </Pressable>
    </View>
      

  );
}

export default MainScreen;

const styles = StyleSheet.create({
  myAccountAccess: {
    flex:1
  }
})