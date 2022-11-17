import { StyleSheet, Text, View, ScrollView, FlatList, Button, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, removeCategory } from '../store/category';

import AdditionButton from './AdditionButton';
import RemoveButton from './RemoveButton';

function Category(props) {
    
    const allCategories = ['business', 'politics', 'sports', 'tech', 'entertainment'];
    const reduxCategory = useSelector((state) => state.categories.categories)
    console.log(reduxCategory);
    const dispatch = useDispatch();

    

    
function deleteCategory(category) {
  
    const inCategory = reduxCategory.includes(category);
    if (inCategory){
      dispatch(removeCategory(category));
      console.log('removed');
      //console.log(reduxSentiment);
      }
      else{
      console.log('not added ');
      //console.log(reduxSentiment);
      }
  }

  function includeCategory(category){
  
    const inCategory = reduxCategory.includes(category);
     
      if (!inCategory){
      dispatch(addCategory(category))
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
              <Text style={styles.text}>Categories</Text>
                {allCategories.map((currCategory, index) => {
                    return (
                     <View key={index} style={{flexDirection:'row'}}>
                     <Text style={styles.text}> {currCategory}</Text> 
                     <AdditionButton  title={currCategory} onPress={(e)=> includeCategory(currCategory,e)}> 
                      Add
                     </AdditionButton>
                     <RemoveButton  title={currCategory} onPress={(e)=> deleteCategory(currCategory, e)}> 
                      Remove
                     </RemoveButton>
                     </View>
                    )
                }

                )}
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

export default Category;