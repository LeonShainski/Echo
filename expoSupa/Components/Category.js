
import { StyleSheet, Text, View, Switch, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, removeCategory } from '../store/category';
import { useEffect, useRef } from 'react';
import AdditionButton from './AdditionButton';
import RemoveButton from './RemoveButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Category(props) {

  const allCategories = ['business', 'politics', 'sports', 'tech', 'entertainment'];
  const displayCategories = ['Business', 'Politics', 'Sports', 'Tech', 'Humanities'];
  const reduxCategory = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;


  async function deleteCategory(category) {
    const inCategory = reduxCategory.includes(category);
    if (inCategory) {
      dispatch(removeCategory(category));
      fadeOut();

       }
    else {
      console.log('not added ');
    }
    return;
  }

  async function includeCategory(category) {

    const inCategory = reduxCategory.includes(category);

    if (!inCategory) {
      dispatch(addCategory(category))
      fadeIn();
     }
    else {
      console.log('not added ');
    }
    return;
  }

  async function onOffSwitch(category) {
    const inCategory = reduxCategory.includes(category);
    if (inCategory) {
      deleteCategory(category);
    } else {
      includeCategory(category);
    }
    return;
  }

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };


  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };


  useEffect(() => {
    fadeIn();
    return;
  })


  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      {allCategories.map((currCategory, index) => {
        if (props.simplified) {
          return (
            <View key={index} style={{ flexDirection: 'row', paddingLeft: 30 }}>
              <Animated.View //I SAVED A STACKOVERFLOW PAGE ON CHROME UNDER "CAPSTONE" BOOKMARKS THAT COULD
                key={index}
                style={[
                  styles.fadingContainer,
                  {
                    // Bind opacity to animated value
                    opacity: fadeAnim
                  },
                  reduxCategory.includes(currCategory) ? styles.included : styles.notIncluded
                ]}
              >
                <Text style={styles.fadingText}></Text>
              </Animated.View>

              <Text style={styles.text}> {displayCategories[index]}</Text>

              <AdditionButton title={currCategory} onPress={async (e) => await includeCategory(currCategory, e)}>
                Add
              </AdditionButton>
              <RemoveButton title={currCategory} onPress={async (e) => await deleteCategory(currCategory, e)}>
                Remove
              </RemoveButton>

            </View>
          )
        } else {
          return (

            <View key={index} style={{ flexDirection: 'row', paddingLeft: 30 }}>
              <Switch
                value={reduxCategory.includes(currCategory)} // change here
                onValueChange={(e) => onOffSwitch(currCategory, e)} // change here
              />
              <Text style={styles.text}> {displayCategories[index]} </Text>
            </View>
          )





        }
      }
      )}
    </View>
  )
}




const styles = StyleSheet.create({
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
    paddingRight: 40,
    paddingButtom: 40

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
    paddingRight: 40,

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
  },

  fadingContainer: {
    padding: 2,
    backgroundColor: "powderblue",
    width: 30,
    height: 30,
    borderRadius: 30 / 2
  },
  fadingText: {
    fontSize: 20
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16
  },
  title: {
    margin: 10,
    padding: 10,
    textShadowColor: 'green',
    textShadowRadius: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    fontSize: 21
  },
  safeView: {
    flex: 1,
    backgroundColor: '#f3f7f0',
    justifyContent: "flex-end",
  },
  saveSettingsBtn: {
    paddingTop: 20,
  },
  notIncluded: {
    backgroundColor: 'red'
  },
  included: {
    backgroundColor: 'green'
  }


});

export default Category;