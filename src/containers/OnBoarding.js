// Library Imports
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useRef, useCallback, useState } from "react";

// Local Imports
import { styles } from "../themes";
import { colors } from "../themes/colors";
import { OnBoardingData } from "../api/constant";
import images from "../assets/images";
import { moderateScale, screenHeight, screenWidth } from "../common/constants";
import typography from "../themes/typography";
import CButton from "../components/common/CButton";
import { StackNav } from "../navigation/NavigationKeys";
import CText from "../components/common/CText";
import { CommonString } from "../i18n/String";
import { LoginButton } from "../components/common/CLoginButton";
import { setOnBoarding } from "../utils/asyncstorage";

// Onboarding component
export default function OnBoarding({ navigation }) {
  // All states
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef(null);

  //  Both for the change the pagination
  const _onViewableItemsChanged = useCallback(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index);
  }, []);
  const _viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  //  onPress for the go to the Login Page direct
  const loginPage = () => {
    setOnBoarding(true);
    navigation.reset({
      index: 0,
      routes: [{ name: StackNav.AuthNavigation }],
    });
  };

  // onPress for the go to the next scren of onboarding
  const OnPressStart = async () => {
    if (currentIndex === 2) {
      await setOnBoarding(true);
      navigation.reset({
        index: 0,
        routes: [{ name: StackNav.AuthNavigation }],
      });
    } else {
      slideRef.current._listRef._scrollRef.scrollTo({
        x: screenWidth * (currentIndex + 1),
      });
    }
  };

  // render the onBoarding data from the flatlist data
  const renderOnBoardingIterm = ({ item }) => {
    return (
      <View style={localStyles.rendetItemConatiner}>
        <Image source={item.onBoardingImg} style={localStyles.imagesty} />
        <View>
          <Text style={localStyles.title}>{item.title}</Text>
          <Text style={localStyles.description}>{item.description}</Text>
          <View style={localStyles.carrotview}>
            {OnBoardingData.map((item, index) => (
              <View key={index.toString()}>
                <Image
                  source={
                    index !== currentIndex ? images.carrot2 : images.carrot1
                  }
                  style={localStyles.carrat}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={localStyles.main}>
      <Image source={images.logotextcolor} style={localStyles.titlesty} />
      <FlatList
        horizontal
        data={OnBoardingData}
        ref={slideRef}
        key={(item) => item.id.toString()}
        renderItem={renderOnBoardingIterm}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={_onViewableItemsChanged}
        viewabilityConfig={_viewabilityConfig}
        bounces={false}
        pagingEnabled
      />
      <View style={localStyles.btnview}>
        <CButton name={"Get Started"} onPress={OnPressStart} />
        <View style={localStyles.loginview}>
          <CText type={"E17"} color={colors.fontbody}>
            {CommonString.already}
          </CText>
          <LoginButton onPress={loginPage} />
        </View>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  rendetItemConatiner: {
    width: screenWidth,
    ...styles.itemsCenter,
    ...styles.justifyEvenly,
  },
  imagesty: {
    resizeMode: "contain",
    width: screenWidth - moderateScale(40),
    height: screenHeight * 0.55,
  },
  title: {
    ...typography.fontSizes.f28,
    ...typography.fontWeights.ExtraBold,
    alignSelf: "center",
    color: colors.fonttile,
  },
  description: {
    ...typography.fontSizes.f18,
    ...typography.fontWeights.SemiBold,
    color: colors.fontbody,
    textAlign: "center",
    ...styles.mh20,
  },
  bottomIndicatorStyle: {
    height: moderateScale(10),
    borderRadius: moderateScale(10),
    ...styles.mh5,
  },
  titlesty: {
    height: moderateScale(24),
    width: moderateScale(59),
    ...styles.selfCenter,
    ...styles.mt20,
  },
  loginview: {
    ...styles.flexRow,
    gap: 5,
  },
  btnview: {
    ...styles.itemsCenter,
    gap: 20,
    ...styles.mv40,
  },
  imageStyle: {
    width: screenWidth - moderateScale(40),
    height: screenHeight * 0.55,
  },
  carrat: {
    height: moderateScale(16),
    width: moderateScale(16),
  },
  carrotview: {
    ...styles.rowCenter,
    ...styles.mt20,
  },
});
