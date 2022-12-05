import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
//import LinearGradient from "react-native-linear-gradient";
import {LinearGradient} from 'expo-linear-gradient';

const FrameScreen = () => {
  return (
    <View style={styles.frameView}>
      <View style={styles.groupView}>
        <View style={styles.rectangleView} />
        <LinearGradient
          style={styles.bgLinearGradient}
          locations={[0, 1]}
          colors={["#fff", "rgba(255, 255, 255, 0)"]}
          useAngle={true}
          angle={90}
        />
        <Text style={styles.titleText}>Title</Text>
      </View>
      <Image
        style={styles.leonEchoMediumFullLogoWithPhIcon}
        resizeMode="cover"
        source={{ uri: 'https://i.ibb.co/4txfbtM/Leon-Echo-Medium-Full-Logo-With-Phone-Version1.png' }}
      />
      <Image
        style={styles.leonEchoMediumFullLogoWithPhIcon1}
        resizeMode="cover"
        source={{ uri: 'https://i.ibb.co/4txfbtM/Leon-Echo-Medium-Full-Logo-With-Phone-Version1.png' }}
      />
      <Image
        style={styles.leonEchoMediumFullLogoWithPhIcon2}
        resizeMode="cover"
        source={{ uri: 'https://i.ibb.co/4txfbtM/Leon-Echo-Medium-Full-Logo-With-Phone-Version1.png' }}
      />
      <Image
        style={styles.leonEchoMediumFullLogoWithPhIcon3}
        resizeMode="cover"
        source={{ uri: 'https://i.ibb.co/4txfbtM/Leon-Echo-Medium-Full-Logo-With-Phone-Version1.png' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rectangleView: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#d9d9d9",
    width: 476,
    height: 2350,
  },
  bgLinearGradient: {
    position: "absolute",
    top: 2350,
    left: 0,
    backgroundColor: "transparent",
    width: 2350,
    height: 476,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
  },
  titleText: {
    position: "absolute",
    top: 78,
    left: 49.24,
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Inter",
    color: "#000",
    textAlign: "center",
    width: 374.53,
    height: 96,
  },
  groupView: {
    position: "absolute",
    top: -15,
    left: -7,
    width: 476,
    height: 2350,
  },
  leonEchoMediumFullLogoWithPhIcon: {
    position: "absolute",
    top: 111,
    left: 180,
    width: 101,
    height: 101,
  },
  leonEchoMediumFullLogoWithPhIcon1: {
    position: "absolute",
    top: 275,
    left: 42,
    width: 101,
    height: 101,
  },
  leonEchoMediumFullLogoWithPhIcon2: {
    position: "absolute",
    top: 275,
    left: 179,
    width: 101,
    height: 101,
  },
  leonEchoMediumFullLogoWithPhIcon3: {
    position: "absolute",
    top: 275,
    left: 316,
    width: 101,
    height: 101,
  },
  frameView: {
    position: "relative",
    flex: 1,
    width: "100%",
    height: 2350,
    paddingTop: 50
  },
});

export default FrameScreen;
