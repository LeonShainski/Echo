import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Button, Pressable } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Slider } from '@rneui/themed';
import { CheckBox } from '@rneui/base'


function Category(props) {
    

    function deleteCategory(category) {
        if (cat.includes(category)) {
            props.setCategories((currCat) => {
                return currCat.filter((item) => item !== category)
            })
        }
    }

    function addCategory(category) {
        var arr = cat.slice();
        if (!arr.includes(category)) {
            arr.push(category)
            props.setCategories(arr);
            console.log('added');
            console.log(arr);
        }
        console.log('not added');
        //console.log(arr);

    }

    return (
        <View>
            {props.allCategories.map((currCat, index) => {
                return (
                    <View key={index}>
                        <Text> {currCat}</Text>
                        <Pressable title={currCat} onPress={addCategory.bind(this, currCat)}>
                            <View>
                                <Text>add</Text>
                            </View>
                        </Pressable>
                        <Pressable title={currCat} onPress={deleteCategory.bind(this, currCat)}>
                            <View>
                                <Text>remove</Text>
                            </View>
                        </Pressable>
                    </View>
                )
            })}
        </View>
    )
}

export default Category;