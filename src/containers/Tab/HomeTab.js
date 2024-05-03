// Library Imports
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FIREBASE_DB } from "../../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query, where } from "firebase/firestore";

// Local Imports
import CText from "../../components/common/CText";
import { CommonString } from "../../i18n/String";
import { colors } from "../../themes/colors";
import { styles } from "../../themes";
import { moderateScale } from "../../common/constants";
import images from "../../assets/images";
import { StackNav } from "../../navigation/NavigationKeys";
import { FoodCategoryTypes } from "../../api/constant";

// HomeTab Component
const HomeTab = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allFood, setAllFood] = useState();
  const [trendingFood, setTrendingFood] = useState();
  const [favouriteFood, setFavouriteFood] = useState();
  const [selectedData, setSelectedData] = useState(allFood);
  const [allRecepie, setAllRecepie] = useState();
  const [trendingRecepie, setTrendingRecepie] = useState();
  const [favouriteRecepie, setFavouriteRecepie] = useState();
  const [selectedPoster, setSelectedPoster] = useState(allRecepie);
  const [selectedFoodCategory, setSelectedFoodCategory] = useState(
    CommonString.all
  );
  const [selectedRecepieCategory, setSelectedRecepieCategory] = useState(
    CommonString.all
  );

  const db = FIREBASE_DB;

  useEffect(() => {
    const NewUi = async () => {
      const data = await newDataHere("fooddata");
      setAllFood(data);
      const data1 = await newDataHere("FavouriteFood");
      setFavouriteFood(data1);
      const data2 = await newDataHere("TrendingFood");
      setTrendingFood(data2);
      const recepie = await newDataHere("RecepieData");
      setAllRecepie(recepie);
      const recepie1 = await newDataHere("FavouriteRecepie");
      setFavouriteRecepie(recepie1);
      const recepie2 = await newDataHere("Trending Recepie");
      setTrendingRecepie(recepie2);
    };
    NewUi();
    getUserName();
  }, []);

  useEffect(() => {
    getFoodCatgoryData();
    getRecepieCategoryData();
  }, [selectedFoodCategory, selectedRecepieCategory]);

  // get the food category data from the firebase
  const newDataHere = async (dbname) => {
    const querySnapshot = await getDocs(collection(db, dbname));
    const docs = querySnapshot.docs;
    const foods = docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return foods;
  };

  // get the userName from the Firebasde
  const getUserName = async () => {
    const name = await AsyncStorage.getItem("users");
    const newData = JSON.parse(name);
    const login = await AsyncStorage.getItem("user");
    const newData1 = JSON.parse(login);
    const q = query(
      collection(db, "users"),
      where("uid", "==", newData1?.uid || newData?.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserName(doc.data()?.name);
    });
  };

  // Components and function for a pizza slice
  const _onViewableItemsChanged = useCallback(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index);
  }, []);
  const _viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  // navigate to the caraousel recepie dedc
  const onPressCrousel = (item) => {
    navigation.navigate(StackNav.LikedRecepieDesc, { item });
  };
  // render caraousel recepie component
  const renderPizza = ({ item }) => {
    return (
      <View style={localStyles.cardview}>
        <View style={localStyles.innerview}>
          <CText type={"E13"} color={colors.recepie}>
            {item.name}
          </CText>
          <CText
            type={"C17"}
            color={colors.fontbody}
            style={localStyles.desctext}
          >
            {item.minutes}
          </CText>
          <TouchableOpacity
            style={localStyles.cardbtn}
            onPress={() => onPressCrousel(item)}
          >
            <CText
              type={"K14"}
              color={colors.textbg}
              children={"View Recepie"}
            />
          </TouchableOpacity>
        </View>
        <Image source={{ uri: item.url }} style={localStyles.pizza} />
      </View>
    );
  };

  // onPress for change the data between 3 categories of food
  // (All, Trending, Favourite)
  const getFoodCatgoryData = () => {
    switch (selectedFoodCategory) {
      case CommonString.all:
        return setSelectedData(allFood);
      case CommonString.favourite:
        return setSelectedData(favouriteFood);
      case CommonString.trending:
        return setSelectedData(trendingFood);
      default:
        return setSelectedData(allFood);
    }
  };

  // onPress for change the data between 3 categories of recepie
  // (All, Trending, Favourite)
  const getRecepieCategoryData = () => {
    switch (selectedRecepieCategory) {
      case CommonString.all:
        return setSelectedPoster(allRecepie);
      case CommonString.favourite:
        return setSelectedPoster(favouriteRecepie);
      case CommonString.trending:
        return setSelectedPoster(trendingRecepie);
      default:
        return setSelectedPoster(allRecepie);
    }
  };

  // onPress render the food burger category
  const onPressRenderBurger = ({ item }) => {
    return (
      <TouchableOpacity
        style={localStyles.allrenderview}
        onPress={() => handleOnpress12(item)}
      >
        <Image
          source={{ uri: item.profileImage }}
          style={localStyles.burgerimage}
        />
        <CText type={"C20"} color={colors.fontbody}>
          {item.foodName}
        </CText>
      </TouchableOpacity>
    );
  };

  // onPress for go to information page of foos
  const handleOnpress12 = (item) => {
    navigation.navigate(StackNav.LikedFoodDesc, { item });
  };

  // Common  componen for 3 categoies (All, Trending, Favourite)
  const CommonTitle = ({ onPress, title }) => {
    return (
      <View style={localStyles.foods}>
        <CText type={"C28"} color={colors.fonttile}>
          {title}
        </CText>
        <TouchableOpacity onPress={onPress}>
          <CText type={"K17"} color={colors.green}>
            {CommonString.viewall}
          </CText>
        </TouchableOpacity>
      </View>
    );
  };

  // Common button for the category of food and recepie
  const CommonTypes = ({ setState }) => {
    return (
      <View style={localStyles.allView}>
        {FoodCategoryTypes.map((item) => (
          <TouchableOpacity onPress={() => setState(item.name)} key={item.id}>
            <CText
              type={"E17"}
              color={
                selectedFoodCategory === item.name ||
                selectedRecepieCategory === item.name
                  ? colors.fontbody
                  : colors.gray
              }
            >
              {item.name}
            </CText>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // for go to the recepie description
  const handleOnPressRecepie = (item) => {
    navigation.navigate(StackNav.LikedRecepieDesc, { item });
  };
  // onPres render the recepie category
  const PosterRender = ({ item }) => {
    return (
      <TouchableOpacity
        style={localStyles.posterview}
        onPress={() => handleOnPressRecepie(item)}
      >
        <View>
          <ImageBackground
            source={{ uri: item.url }}
            style={localStyles.posterimage}
          >
            <View style={localStyles.bgimagerow}>
              <View style={localStyles.servetext}>
                <Image source={images.timeicon} style={localStyles.timeicon} />
                <CText type={"E15"} color={colors.textbg}>
                  {item.minutes}
                </CText>
                <Image source={images.usericon} style={localStyles.timeicon} />
                <CText type={"E15"} color={colors.textbg}>
                  {item.serve + " " + "Serve"}
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
          {item.subtitle}
        </CText>
      </TouchableOpacity>
    );
  };

  // onPress contact function for the contactus page
  const onPressContact = () => {
    navigation.navigate(StackNav.ChatWithUs);
  };

  // navigate to all food
  const ViewAllFood = () => {
    navigation.navigate(StackNav.ViewAllFood);
  };

  // navigate to all recepie
  const ViewAllRecepie = () => {
    navigation.navigate(StackNav.ViewAllRecepie);
  };

  // onPress week to view recepies trending
  const onPressWeek = () => {
    navigation.navigate(StackNav.ViewAllRecepie);
  };

  return (
    <View style={localStyles.main}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CText type={"C28"} color={colors.primary} align={"center"}>
          {` Hello ${userName}`}
        </CText>
        <CText type={"E17"} color={colors.fontbody} align={"center"}>
          {CommonString.homefeed}
        </CText>
        {/* // Flatlist for the data of slice pizaa */}
        <FlatList
          data={allRecepie?.slice(0, 4)}
          renderItem={renderPizza}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={_viewabilityConfig}
          bounces={false}
          keyExtractor={(item) => item.id}
        />
        <View style={localStyles.carrotview}>
          {allRecepie?.slice(0, 4)?.map((item, index) => (
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
          <TouchableOpacity style={localStyles.viewbtn} onPress={onPressWeek}>
            <CText type={"K14"} color={colors.fontbody}>
              {CommonString.view}
            </CText>
          </TouchableOpacity>
        </View>
        <CommonTitle title={CommonString.foods} onPress={ViewAllFood} />
        <CommonTypes setState={setSelectedFoodCategory} />
        {/* // FlatList for the food data */}
        <FlatList
          data={selectedData?.slice(0, 4)}
          renderItem={onPressRenderBurger}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          bounces={false}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={localStyles.renderdatasty}
          columnWrapperStyle={localStyles.rendercolumndata}
        />
        <CommonTitle title={CommonString.recepie} onPress={ViewAllRecepie} />
        <CommonTypes setState={setSelectedRecepieCategory} />
        {/* // FlatList for the recepie data */}
        <FlatList
          data={selectedPoster?.slice(0, 2)}
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
    ...styles.mh10,
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
    borderRadius: moderateScale(16),
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
