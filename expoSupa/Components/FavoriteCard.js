import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useState } from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Icon } from '@rneui/themed';

function FavoriteCard(props) {

    const item = props.item;
    const [clicked, setClicked] = useState(false);
    const [expand, setExpand] = useState('expand +');
    const long = item.summary.length > 155;

    function toggleText() {
        console.log(long)
        console.log(item.summary.length)
        if (long && !clicked){
            setExpand('   [-]')
        }
        if (long && clicked){
            setExpand('   expand [+]')
        }
        if (long){
        setClicked(!clicked);
        }
        
    }

    function toggleText() {
        setClicked(!clicked);
    }

    function nav() {
        props.navigation.navigate("Article", { link: item.link });
    }

    function removeFav() {
        props.removeFav(item);
        return;
    }

    return (

        <View>
            <Card>
                <Card.Actions>
                    <Pressable onPress={removeFav}>
                    <Icon type={'font-awesome'} name={'star'} color={'#eff74a'} size={35}/> 
                    </Pressable>
                </Card.Actions>
                <Pressable onPress={nav}>
                    <Card.Cover source={(item.img !== "") ? { uri: item.img } : require('../assets/Leon_Echo_MediumFullLogoWithPhone_Version1.png')} />
                    <Card.Content>
                        <Title>{item.title}</Title>
                        <View style={styles.iconContainer}>
                            <View style={styles.iconGroup}>
                                <Icon name='checkbox-marked-circle-outline' type='material-community' color='#2bd63c'/>
                                <Text>  {Math.floor(item.factScore * 100)}%</Text>
                            </View>
                            <View style={styles.iconGroup}>
                                <Icon name='heart-pulse' type='material-community' color='#e62929'/>
                                <Text>  {item.sentiment}</Text>
                            </View>
                            <View style={styles.iconGroup}>
                                <Icon name='newspaper' type='material-community' color='#1717bf'/>
                                <Text>  {item.category}</Text>
                            </View>
                        </View>
                        <Pressable onPress={toggleText} >
                            <View style={styles.container}>
                                <Paragraph style={clicked ? styles.container : styles.container2}>
                                    {item.summary}
                                </Paragraph>
                                <Paragraph>
                                {long? expand: ''}
                                </Paragraph>
                            </View>
                        </Pressable>
                    </Card.Content>
                </Pressable>
            </Card>
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



export default FavoriteCard;