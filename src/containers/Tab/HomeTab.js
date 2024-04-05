import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import CText from "../../components/common/CText";
import { CommonString } from "../../i18n/String";
import { colors } from "../../themes/colors";
import { styles } from "../../themes";
import {
  All,
  Favourite,
  PizzaCard,
  PosterAll,
  Treding,
} from "../../api/constant";
import { moderateScale } from "../../common/constants";
import images from "../../assets/images";
import { LoginButton } from "../../components/common/CLoginButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const HomeTab = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedData, setSelectedData] = useState(All);

  const _onViewableItemsChanged = useCallback(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index);
  }, []);
  const _viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  const renderPizza = ({ item }) => {
    return (
      <View>
        <View style={localStyles.cardview}>
          <View style={localStyles.innerview}>
            <CText type={"E13"} color={colors.recepie}>
              {item.title}
            </CText>
            <CText
              type={"C17"}
              color={colors.fontbody}
              style={localStyles.desctext}
            >
              {item.description}
            </CText>
            <TouchableOpacity style={localStyles.cardbtn}>
              <CText type={"K14"} color={colors.textbg}>
                View Recepie
              </CText>
            </TouchableOpacity>
          </View>
          <Image source={images.pizzaslice} style={localStyles.pizza} />
        </View>
        <View style={localStyles.carrotview}>
          {PizzaCard.map((item, index) => (
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
    );
  };

  const handleOnPress = (data) => {
    setSelectedData(data);
  };

  const onPressRenderBurger = ({ item }) => {
    return (
      <View style={localStyles.allrenderview}>
        <Image source={item.image} style={localStyles.burgerimage} />
        <CText type={"C20"} color={colors.fontbody}>
          {item.name}
        </CText>
      </View>
    );
  };

  const CommonTitle = ({ onPress1, onPress2, onPress3 }) => {
    return (
      <View>
        <View style={localStyles.foods}>
          <CText type={"C28"} color={colors.fonttile}>
            {CommonString.foods}
          </CText>
          <TouchableOpacity>
            <CText type={"K17"} color={colors.green}>
              {CommonString.viewall}
            </CText>
          </TouchableOpacity>
        </View>
        <View style={localStyles.allView}>
          <LoginButton
            extratext={CommonString.all}
            type={"K17"}
            color={colors.fontbody}
            onPress={onPress1}
          />
          <LoginButton
            extratext={CommonString.favourite}
            type={"K17"}
            color={colors.fontbody}
            onPress={onPress2}
          />
          <LoginButton
            extratext={CommonString.trending}
            type={"K17"}
            color={colors.fontbody}
            onPress={onPress3}
          />
        </View>
      </View>
    );
  };

  const PosterRender = ({ item }) => {
    return (
      <View style={localStyles.posterview}>
        <View>
          <Image source={item.image} style={localStyles.posterimage} />
          <View>
            <Ionicons
              name="time-outline"
              color={colors.textbg}
              style={localStyles.postericon1}
            />
            <CText
              style={localStyles.postertext1}
              type={"E15"}
              color={colors.textbg}
            >
              {item.minutes}
            </CText>
            <Feather
              name="users"
              color={colors.textbg}
              style={localStyles.postericon2}
            />
            <CText
              style={localStyles.postertext2}
              type={"E15"}
              color={colors.textbg}
            >
              {item.serve}
            </CText>
          </View>
        </View>
        <CText type={"C20"} color={colors.fonttile} align={"center"}>
          {item.name}
        </CText>
        <CText type={"K13"} color={colors.fontbody} align={"center"}>
          {item.description}
        </CText>
      </View>
    );
  };
  return (
    <View style={localStyles.main}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CText type={"C28"} color={colors.primary} align={"center"}>
          {CommonString.afreen}
        </CText>
        <CText type={"E17"} color={colors.fontbody} align={"center"}>
          {CommonString.homefeed}
        </CText>
        <FlatList
          data={PizzaCard}
          renderItem={renderPizza}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={_viewabilityConfig}
          bounces={false}
        />
        <View style={localStyles.weekview}>
          <CText type={"C20"} color={colors.fontbody}>
            {CommonString.trendingrecepie}
          </CText>
          <TouchableOpacity style={localStyles.viewbtn}>
            <CText type={"K14"} color={colors.fontbody}>
              {CommonString.view}
            </CText>
          </TouchableOpacity>
        </View>
        <CommonTitle
          onPress1={() => handleOnPress(All)}
          onPress2={() => handleOnPress(Favourite)}
          onPress3={() => handleOnPress(Treding)}
        />
        <FlatList
          data={selectedData}
          renderItem={onPressRenderBurger}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          bounces={false}
        />
        <CommonTitle />
        <FlatList data={PosterAll} renderItem={PosterRender} />
      </ScrollView>
    </View>
  );
};

export default HomeTab;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  cardview: {
    height: moderateScale(180),
    width: moderateScale(360),
    backgroundColor: colors.recepiecard,
    borderRadius: moderateScale(16),
    ...styles.mt15,
    ...styles.flexRow,
    ...styles.ph10,
    ...styles.center,
    ...styles.justifyBetween,
    ...styles.ml20,
  },
  cardbtn: {
    height: moderateScale(36),
    width: moderateScale(149),
    backgroundColor: colors.red,
    borderRadius: moderateScale(10),
    ...styles.center,
  },
  pizza: {
    height: moderateScale(120),
    width: moderateScale(120),
    resizeMode: "contain",
  },
  innerview: {
    gap: moderateScale(5),
    width: moderateScale(150),
  },
  desctext: {
    lineHeight: moderateScale(25),
  },
  carrotview: {
    ...styles.rowCenter,
    ...styles.mv20,
  },
  carrat: {
    height: moderateScale(16),
    width: moderateScale(16),
  },
  weekview: {
    height: moderateScale(88),
    width: moderateScale(327),
    backgroundColor: colors.btncolor,
    borderRadius: moderateScale(16),
    ...styles.selfCenter,
    ...styles.flexRow,
    ...styles.nonFlexCenter,
    gap: moderateScale(20),
  },
  viewbtn: {
    height: moderateScale(36),
    width: moderateScale(96),
    borderRadius: moderateScale(10),
    backgroundColor: colors.otpfocus,
    ...styles.center,
  },
  foods: {
    ...styles.rowSpaceBetween,
    ...styles.mh30,
    ...styles.mv15,
  },
  allView: {
    ...styles.flexRow,
    gap: moderateScale(15),
    ...styles.mh30,
  },
  allrenderview: {
    ...styles.flexcenterrow,
    height: moderateScale(72),
    width: moderateScale(160),
    backgroundColor: colors.recepiecard,
    borderRadius: moderateScale(16),
    ...styles.mh20,
    ...styles.justifyEvenly,
    ...styles.mt20,
    borderWidth: moderateScale(1),
    borderColor: colors.posterborder,
  },
  burgerimage: {
    height: moderateScale(36),
    width: moderateScale(36),
    resizeMode: "contain",
  },
  posterview: {
    height: moderateScale(237),
    width: moderateScale(327),
    backgroundColor: colors.recepiecard,
    borderRadius: moderateScale(20),
    ...styles.selfCenter,
    ...styles.mt20,
    borderWidth: moderateScale(1),
    borderColor: colors.posterborder,
  },
  posterimage: {
    height: moderateScale(132),
    width: moderateScale(327),
    resizeMode: "contain",
  },
  postericon1: {
    position: "absolute",
    bottom: moderateScale(0),
    left: moderateScale(10),
  },
  postertext1: {
    position: "absolute",
    bottom: moderateScale(0),
    left: moderateScale(30),
  },
  postericon2: {
    position: "absolute",
    bottom: moderateScale(0),
    left: moderateScale(85),
  },
  postertext2: {
    position: "absolute",
    bottom: moderateScale(0),
    left: moderateScale(100),
  },
});
