// Library Imports
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Text,
} from "react-native";
import React, { useCallback, useState } from "react";

// Local Imports
import CText from "../../components/common/CText";
import { CommonString } from "../../i18n/String";
import { colors } from "../../themes/colors";
import { styles } from "../../themes";
import {
  All,
  Favourite,
  PizzaCard,
  PosterAll,
  PosterFavourite,
  PosterTrending,
  Treding,
} from "../../api/constant";
import { moderateScale } from "../../common/constants";
import images from "../../assets/images";
import { LoginButton } from "../../components/common/CLoginButton";
import { StackNav } from "../../navigation/NavigationKeys";
import { FIREBASE_AUTH } from "../../../firebaseConfig";

// HomeTab Component
const HomeTab = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedData, setSelectedData] = useState(All);
  const [selectedPoster, setSelectedPoster] = useState(PosterAll);

  // Components and function for a pizza slice
  const _onViewableItemsChanged = useCallback(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index);
  }, []);
  const _viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  // render pizza Slice component
  const renderPizza = ({ item }) => {
    return (
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
    );
  };

  // onPress for change the data between 3 categories of food
  // (All, Trending, Favourite)
  const handleOnPress = (data) => {
    setSelectedData(data);
  };
  // onPress for change the data between 3 categories of recepie
  // (All, Trending, Favourite)
  const handleOnPress1 = (data) => {
    setSelectedPoster(data);
  };

  // onPress render the food burger category
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

  // Common  componen for 3 categoies (All, Trending, Favourite)
  const CommonTitle = ({
    onPress1,
    onPress2,
    onPress3,
    color3,
    color2,
    color1,
  }) => {
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
            color={color1 || colors.fontbody}
            onPress={onPress1}
          />
          <LoginButton
            extratext={CommonString.favourite}
            type={"K17"}
            color={color2 || colors.fontbody}
            onPress={onPress2}
          />
          <LoginButton
            extratext={CommonString.trending}
            type={"K17"}
            color={color3 || colors.fontbody}
            onPress={onPress3}
          />
        </View>
      </View>
    );
  };

  // onPres render the recepie category
  const PosterRender = ({ item }) => {
    return (
      <View style={localStyles.posterview}>
        <View>
          <ImageBackground source={item.image} style={localStyles.posterimage}>
            <View style={localStyles.bgimagerow}>
              <View style={localStyles.servetext}>
                <Image source={images.timeicon} style={localStyles.timeicon} />
                <CText type={"E15"} color={colors.textbg}>
                  {item.minutes}
                </CText>
                <Image source={images.usericon} style={localStyles.timeicon} />
                <CText type={"E15"} color={colors.textbg}>
                  {item.serve}
                </CText>
              </View>
              <View>
                <Image source={images.stars} style={localStyles.starsicon} />
              </View>
            </View>
          </ImageBackground>
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

  // onPress contact function for the contactus page
  const onPressContact = () => {
    navigation.navigate(StackNav.ChatWithUs);
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
        {/* // Flatlist for the data of slice pizaa */}
        <FlatList
          data={PizzaCard}
          renderItem={renderPizza}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={_viewabilityConfig}
          bounces={false}
          keyExtractor={(item) => item.id}
        />
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
          color1={selectedData === All ? colors.fontbody : colors.gray}
          color2={selectedData === Favourite ? colors.fontbody : colors.gray}
          color3={selectedData === Treding ? colors.fontbody : colors.gray}
        />
        {/* // FlatList for the food data */}
        <FlatList
          data={selectedData}
          renderItem={onPressRenderBurger}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          bounces={false}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={localStyles.renderdatasty}
          columnWrapperStyle={localStyles.rendercolumndata}
        />
        <CommonTitle
          onPress1={() => handleOnPress1(PosterAll)}
          onPress2={() => handleOnPress1(PosterFavourite)}
          onPress3={() => handleOnPress1(PosterTrending)}
          color1={selectedPoster === PosterAll ? colors.fontbody : colors.gray}
          color2={
            selectedPoster === PosterFavourite ? colors.fontbody : colors.gray
          }
          color3={
            selectedPoster === PosterTrending ? colors.fontbody : colors.gray
          }
        />
        {/* // FlatList for the recepie data */}
        <FlatList
          data={selectedPoster}
          renderItem={PosterRender}
          scrollEnabled={false}
          bounces={false}
          keyExtractor={(item) => item.id}
        />
        <View style={localStyles.helpview}>
          <View style={localStyles.contacttext}>
            <CText type={"E13"} color={colors.recepie}>
              {CommonString.help}
            </CText>
            <CText type={"C17"} color={colors.fontbody}>
              {CommonString.query}
            </CText>
            <CText type={"C17"} color={colors.fontbody}>
              {CommonString.chatus}
            </CText>
            <TouchableOpacity
              style={localStyles.contactbtn}
              onPress={onPressContact}
            >
              <CText type={"K14"} color={colors.textbg}>
                {CommonString.contact}
              </CText>
            </TouchableOpacity>
          </View>
          <View>
            <Image source={images.ladyread} style={localStyles.ladyreadimg} />
          </View>
        </View>
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
    backgroundColor: colors.recepiecard,
    borderRadius: moderateScale(16),
    ...styles.mt15,
    ...styles.flexRow,
    ...styles.p25,
    gap: moderateScale(30),
    ...styles.center,
    ...styles.justifyBetween,
    ...styles.ml10,
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
    ...styles.mt10,
    ...styles.mb20,
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
    ...styles.justifyEnd,
  },
  timeicon: {
    height: moderateScale(16),
    width: moderateScale(16),
  },
  bgimagerow: {
    ...styles.rowCenter,
    ...styles.justifyEvenly,
  },
  starsicon: {
    height: moderateScale(12),
    width: moderateScale(68),
    resizeMode: "contain",
  },
  servetext: {
    ...styles.flexRow,
    gap: moderateScale(6),
  },
  helpview: {
    height: moderateScale(160),
    width: moderateScale(320),
    backgroundColor: colors.btncolor,
    borderRadius: moderateScale(16),
    ...styles.selfCenter,
    ...styles.m25,
    ...styles.rowSpaceEvenly,
  },
  contactbtn: {
    height: moderateScale(36),
    width: moderateScale(140),
    borderRadius: moderateScale(10),
    backgroundColor: colors.red,
    ...styles.center,
  },
  ladyreadimg: {
    height: moderateScale(85),
    width: moderateScale(77),
    resizeMode: "contain",
  },
  contacttext: {
    gap: moderateScale(3),
  },
  renderdatasty: {
    ...styles.ph20,
  },
  rendercolumndata: {
    ...styles.justifyBetween,
  },
});
