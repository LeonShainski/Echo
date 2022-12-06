import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Image } from 'react-native';
import { Icon } from '@rneui/themed';
import { ScrollView } from 'react-native';
import FrameScreen from '../Components/FrameScreen';
import { ImageBackground, Alert } from 'react-native';
import { BackgroundImage } from '@rneui/base';
import UselessTextInputMultiline from '../Components/UselessTextInputMultiline';
import { Button } from 'react-native-paper';
import PrimaryButton from '../Components/PrimaryButton';

function About() {

    const image = { uri: "https://i.ibb.co/8z3nDnJ/Cool-Sky.png" };
    const image2 = { uri: "https://i.ibb.co/yBvF99q/Broken-Hearts.png"}
    const onPressLearnMore = () => {
        Alert.alert(
            "Comment submitted!",
            "Thanks so much for your feedback, you're helping Echo grow and flourish :) Don't forget you can use this more than once!",
            [
              { text: "Happy to help", onPress: () => console.log("OK Pressed") }
            ]);
    }

    return(
        <View style={styles.container}>
            <ScrollView>
            
        <View style={styles.container3}>
        <ImageBackground source={image} resizeMode={"stretch"}  style={{ width: '100%', height: 300, resizeMode:'cover', marginTop: 'auto', marginBottom: 'auto'}}>
        <Image
        source={{ uri: 'https://i.ibb.co/4txfbtM/Leon-Echo-Medium-Full-Logo-With-Phone-Version1.png' }}//Have echo log pop up really small here (for brand)
        style={{ 
        width: 200, 
        height: 200,
        paddingTop: 30,
        alignContent: 'center', 
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        borderRadius: 1,
        borderColor: '#000',
        shadowRadius: 2,
        shadowColor: '#000'
        
        }}
      />
      
      
        
        <Text style={styles.plainText}>NEWS LIKE NEVER BEFORE</Text>
        
        
        </ImageBackground>
        </View>
        
        <Text style={styles.plainText2}>Welcome to the first news source that truly caters to your individual needs. </Text>
        <Text style={styles.plainText2}>Here are the five ways We put YOU first</Text>
        
        <View style={styles.container3}>
            
            <View style={styles.container2}>
                <Pressable >
                <Icon type='feather' name='lock' />
                <Text>Privacy</Text>
                </Pressable>
            </View>
            <View style={styles.container2}>
                <Icon type='feather' name='users' />
                <Text>Unity</Text>
                
            </View>
            <View style={styles.container2}>
                <Icon type='feather' name='sliders' />
                <Text>Choice</Text>
            </View>
            <View style={styles.container2}>
                <Icon type='feather' name='shield' />
                <Text>Honesty</Text>
            </View>
            <View style={styles.container2}>
                <Icon type='feather' name='globe' />
                <Text>Diversity</Text>
            </View>
        </View>


        <View>
            <ImageBackground source={{uri: 'https://i.ibb.co/Yj1DYxS/gradient-4.png'}} resizeMode={"stretch"}  style={{ width: '100%', resizeMode:'cover', marginTop: 'auto', marginBottom: 'auto'}}>
        
        <ImageBackground source={{uri: "https://i.ibb.co/jVbVsT5/gradient-9.png"}}>
        <View style={styles.pillarViews}>
            <Text style={styles.plainText3}>Your privacy is our 
            most topmost priority. We want to keep you informed with no strings attached. We require no log-in, we don't deal in cookies, and we do not collect an ounce of your data.
            With Echo, you are safe from the prying eyes of big data.
            </Text>
            <Image source={{uri: 'https://i.ibb.co/h9c9sbG/security-image.jpg'}} style={styles.squareImages}/>

        </View>
        </ImageBackground>

        <ImageBackground source={{uri: "https://i.ibb.co/6Ps5kNB/gradient-12.png"}}>
        <View style={styles.pillarViews}>
            
            <Image source={{uri: 'https://i.ibb.co/Xzdhz2M/unity.jpg'}} style={styles.squareImages}/>
        <Text style={styles.plainText3}>In unity is strength, let us end the divions around us today. Echo brings you news from both sides of the aisle.
        We do not reveal political affiliation by design, as we rotate through
        news providers on a daily basis, giving you the freshest news from all perspectives, leaving you better informed than ever before. 
        
        </Text>

        </View>
        </ImageBackground>

        <ImageBackground source={{uri: "https://i.ibb.co/7CP3SYp/gradient-13.png"}}>
        <View style={styles.pillarViews} id={"choice"}>
        <Text style={styles.plainText3}>Our choices reflect who we are, and there is nothing better than being your authentic self. 
        With Echo, instead of choosing what news you want to see, we can take away everything you DON'T want to see. That way, 
        you can broaden your horizons and have more choice than ever before.</Text>
            
            <Image  source={{uri: 'https://i.ibb.co/XpqSnqc/choice.png'}} style={styles.squareImages}/>
        

        </View>
        </ImageBackground>

        <ImageBackground source={{uri: "https://i.ibb.co/w6TP3hZ/gradient-14.png"}}>
        <View style={styles.pillarViews}>             
            <Image source={{uri: 'https://i.ibb.co/PWkXzwS/honety.png'}} style={styles.squareImages}/>
        <Text style={styles.plainText3}>Honesty is, of course, the best policy. We take that saying to the next level.
        We use the best available fact-checking algorithms to give you our truth-rating, 
        as in how confident we are as to the factuality of any given article. 
        </Text>
        </View>
        </ImageBackground>
        
        <ImageBackground source={{uri: "https://i.ibb.co/KGYJQhZ/gradient-15.png"}}>

        <View style={styles.pillarViews}>
            
        <Text style={styles.plainText3}>"In diversity we all thrive" is a mantra we uphold dilligently here at Echo. 
        We bring you news that is local to you, but we always leave you room to explore the happenings in the world by easily switching between regions.
        </Text>
                 
            <Image source={{uri: 'https://i.ibb.co/StV9Zww/diversity.jpg'}} style={styles.squareImages}/>
        


        </View>
        </ImageBackground>
        </ImageBackground>
        </View>
        <View>  
            <ImageBackground source={{uri: "https://i.ibb.co/hKjK1JX/gradient-19.png"}}>
            <View>
                <Text style={styles.plainText2}>
                    The Echo Advantage
                </Text>
                </View>
                </ImageBackground>
                <View>
                    <Text style={styles.plainText3_2}>
                        The Fact Score
                    </Text>
                    <Text style={styles.plainText4}>
                        The Fact Score slider in the settings page allows you to set the minimum allowable fact score rating that you would like to see your articles comply with.
                    </Text>
                </View>
                <View>
                    <Text style={styles.plainText3_2}>
                        Sentiment Settings
                    </Text>
                    <Text style={styles.plainText4}>
                        Our sentiment analysis ranks articles by their tonality, by what emotion you may experience when reading the article. 
                        By selecting a sentiment setting in the settings page, you are able to set which tone of articles you will see, giving you greater control into the human aspect of the world of news.
                    </Text>
                </View>
                <View>
                    <Text style={styles.plainText3_2}>
                        Favorites
                    </Text>
                    <Text style={styles.plainText4}>
                        When looking at an article on your home page, you may wish to save it for later. Worry not, saving it for later does not save it on our servers (thus potentially violating your privacy),
                        but rather stores all of the information about the article locally. Worry not about your dwindling local storage space either, as the article information is stored purley as text (even the image is stored not as an image but as a link to one), 
                        meaning a whole lot of articles can be stored with a tiny amount of space.
                    </Text>
                </View>
                <View>
                    <Text style={styles.plainText3_2}>
                        Time Zones
                    </Text>
                    <Text style={styles.plainText4}>
                        Whilst it might be a little weird to select a location by your nearest time zone, this was a crucial design step we had to take in order to provide as much news as possible for our early Alpha while maintaining some level of locality. 
                        In short, we started off on the macro scale, providing as much as possible, and as we continue to improve we will continue to reduce the scope of the locations, until it becomes as local as you would have wanted it to be.
                    </Text>
                </View>
            </View>
        <View >
            <ImageBackground source={{uri: 'https://i.ibb.co/zPtGtr9/Azur-Lane.png'}} resizeMode={"stretch"}  style={{ width: '100%', height: 300, resizeMode:'cover', marginTop: 'auto', marginBottom: 'auto'}}>
            
            <View style={styles.lowerContainer}>
            <Text style={styles.commentText}>Please leave any comments or concerns below, we would really appreciate your feedback! </Text>
            <Text style={styles.commentText}> (totally anonymous, of course)</Text>
            <UselessTextInputMultiline style={styles.commentBox}/>
            <PrimaryButton
                onPress={onPressLearnMore}
                title="Submit"
                color="#841584"
                accessibilityLabel=" button"
                style={{height: 100, width: 100, shadowRadius: 2,
                    shadowColor: '#000' }}
                >Submit</PrimaryButton>
            </View>
            </ImageBackground>

            
            
        </View>

        
        
        </ScrollView>
        </View>
    );

}

export default About;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },
    container2: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    container3: {
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        flexDirection:'row',
        paddingTop: 10,
        paddingBottom: 25
    },
    squareImages:  {
        width: 200, 
        height: 200,
        padding: 30,
        alignContent: 'center', 
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        borderRadius: 1,
        borderColor: '#fcba03',
        borderWidth: 1,
        shadowRadius: 2,
        shadowColor: '#000'
    },
    title: {
        textAlign: 'center',
        textShadowColor: '#000',
        fontSize: 48
    },
    subtitle: {

    },
    plainText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 24,
        color: '#263a52',
        textShadowColor: '#106fe3',
        textShadowRadius: 1,
        padding: 20,
        fontFamily: 'sans-serif-medium', 
    },
    plainText2: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 24,
        color: '#001938',
        textShadowColor: '#ab9b9a',
        textShadowRadius: 1,
        textAlign: 'center',
        padding: 5,
        fontFamily: 'sans-serif-medium', 
    },
    plainText3: {
        flex: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 16,
        color: '#000',
        flexWrap: 'wrap',
        textShadowColor: '#ab9b9a',
        textShadowRadius: 1,
        paddingLeft: 5,
        paddingRight: 5,
        textAlign: 'justify',
        fontFamily: 'sans-serif-medium', 
        
    },plainText3_2: {
        paddingTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20,
        color: '#028ac4',
        flexWrap: 'wrap',
        textShadowColor: '#000',
        textShadowRadius: 1,
        paddingLeft: 5,
        paddingRight: 5,
        textAlign: 'justify',
        fontFamily: 'sans-serif-medium', 
        
    }
    ,plainText4: {
        fontSize: 14,
        padding: 20,
        color: '#000',
        flexWrap: 'wrap',
        textShadowColor: '#ab9b9a',
        textShadowRadius: 1,
        paddingLeft: 5,
        paddingRight: 5,
        textAlign: 'left',
        fontFamily: 'sans-serif-medium', 
        
    },
    pillarViews: {
        padding: 10,
        paddingBottom: 20,
        paddingTop: 20,
        flexDirection: 'row',
        borderRadius: 1,
        borderColor: '#000',
        borderWidth: 1,
        
    },
    lowerContainer: {
        padding: 30
    },
    commentBox: {
        shadowRadius: 2,
        shadowColor: '#000',
        borderRadius: 1,
        borderColor: '#000',
    },
    commentText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'sans-serif-medium', 
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 18,
        justifyContent: 'center',
        paddingTop: 5
        
        
    }
  });