import { View, StyleSheet, Image, Text } from "react-native";
import React, { useEffect } from "react";
import { styles } from "../themes";
import { colors } from "../themes/colors";
import images from "../assets/images";
import { moderateScale } from "../common/constants";
import { StackNav } from "../navigation/NavigationKeys";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(StackNav.OnBoarding);
    }, 2000);
  }, []);
  return (
    <View style={localStyles.main}>
      <Image source={images.splashBg} style={localStyles.imageStyle} />
      <View style={localStyles.logoview}>
        <Image source={images.logo} style={localStyles.logo} />
      </View>
      <Image source={images.logotext} style={localStyles.logotext} />
    </View>
  );
};

export default Splash;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flexCenter,
    backgroundColor: colors.illulight,
  },
  imageStyle: {
    height: moderateScale(800),
    width: moderateScale(400),
    position: "absolute",
  },
  logoview: {
    ...styles.flexCenter,
  },
  logo: {
    ...styles.center,
    height: moderateScale(200),
    width: moderateScale(200),
    resizeMode: "contain",
  },
  logotext: {
    height: moderateScale(48),
    width: moderateScale(120),
    resizeMode: "contain",
    ...styles.mb50,
  },
});
