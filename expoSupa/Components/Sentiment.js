
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
//Importing Buttons
import AdditionButton from './AdditionButton';
import RemoveButton from './RemoveButton';

import { useSelector, useDispatch } from 'react-redux';
import { addSentiment, removeSentiment } from '../store/sentiment';


function Sentiment() {
    
    const allSentiments = ['Happy', 'Sad', 'Information'];

    const reduxSentiment = useSelector((state) => state.sentiments.sentiments)
    console.log(reduxSentiment);
    const dispatch = useDispatch();

    

    
function deleteSentiment(sentiment) {
  
    const inSentiment = reduxSentiment.includes(sentiment);
    if (inSentiment){
      dispatch(removeSentiment(sentiment));
      console.log('removed');
      //console.log(reduxSentiment);
      }
      else{
      console.log('not added ');
      //console.log(reduxSentiment);
      }
  }

  function includeSentiment(sentiment){
  
    const inSentiment = reduxSentiment.includes(sentiment);
     
      if (!inSentiment){
      dispatch(addSentiment(sentiment))
      console.log('added');
      //console.log(reduxSentiment);
      }
      else{
      console.log('not added ');
      //console.log(reduxSentiment);
      }
  }



    

    return (
        <View>
            {allSentiments.map((currSentiment, index) => {
                return (
                    <View key={index} style={{flexDirection:'row'}}>
                    <Text style={styles.text}> {currSentiment}</Text> 
                    <AdditionButton  title={currSentiment} onPress={(e) => includeSentiment(currSentiment, e)}> 
                     Add
                    </AdditionButton>
                    <RemoveButton  title={currSentiment} onPress={(e) => deleteSentiment(currSentiment, e)}> 
                     Remove
                    </RemoveButton>
                    </View>
                   )
            })}
        </View>
        
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      width: '100%',
      backgroundColor: '#dcdcdc',
      paddingTop: 48,
      paddingBottom: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      alignItems: 'center',
    },
    title: {
      fontSize: 22,
      color: '#333',
      fontWeight: 'bold',
    },
    panel: {
      paddingTop: 10,
      paddingHorizontal: 10,
    },
    label: {
      fontSize: 20,
    },
    text: {
      fontSize: 24,
      paddingTop: 5,
      paddingRight: 40
    },
    inputField: {
      backgroundColor: '#fff',
      height: 44,
      borderWidth: 1,
      borderColor: '#333',
      width: '100%',
      padding: 10,
      marginTop: 12,
    },
    button: {
      margin: 10,
      padding: 10,
      backgroundColor: 'orange',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    buttonText: {
      fontSize: 18,
      color: '#444',
    }
    
  });

export default Sentiment;