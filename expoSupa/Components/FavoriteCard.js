import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useState } from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Icon } from '@rneui/themed';

function FavoriteCard(props) {

    const item = props.item;
    const [clicked, setClicked] = useState(false);

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
                        <Icon name={'star'} />
                    </Pressable>
                </Card.Actions>
                <Pressable onPress={nav}>
                    <Card.Cover source={(item.img !== "") ? { uri: item.img } : require('../assets/Leon_Echo_MediumFullLogoWithPhone_Version1.png')} />
                    <Card.Content>
                        <Title>{item.title}</Title>
                        <View style={styles.iconContainer}>
                            <View style={styles.iconGroup}>
                                <Icon name='checkbox-marked-circle-outline' type='material-community' />
                                <Text>  {Math.floor(item.factScore * 100)}%</Text>
                            </View>
                            <View style={styles.iconGroup}>
                                <Icon name='heart-pulse' type='material-community' />
                                <Text>  {item.sentiment}</Text>
                            </View>
                            <View style={styles.iconGroup}>
                                <Icon name='newspaper' type='material-community' />
                                <Text>  {item.category}</Text>
                            </View>
                        </View>
                        <Pressable onPress={toggleText} >
                            <View style={styles.container}>
                                <Paragraph style={clicked ? styles.container : styles.container2}>
                                    {item.summary}
                                </Paragraph>
                                <Paragraph>
                                    expand +
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