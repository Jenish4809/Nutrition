// Library Imports
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../../components/common/CHeader";
import { CommonString } from "../../i18n/String";
import { FavouriteCategory } from "../../api/constant";
import CText from "../../components/common/CText";
import { moderateScale } from "../../common/constants";
import images from "../../assets/images";
import CButton from "../../components/common/CButton";
import { StackNav } from "../../navigation/NavigationKeys";
import { CLoader } from "../../components/common/CLoader";
import { newDataHere } from "../../components/common/CDataGetFirebase";

// LikeTab component
const LikeTab = ({ navigation }) => {
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(true);
  const [food, setFood] = useState();
  const [recepie, setRecepie] = useState();

  useEffect(() => {
    const newData = async () => {
      const foodData = await newDataHere("fooddata");
      setFood(foodData);
      const recepieData = await newDataHere("RecepieData");
      setRecepie(recepieData);
      setLoading(false);
    };
    newData();
  }, []);

  if (loading) {
    return <CLoader />;
  }

  // onPress function for go between food and recepie
  const onPressCategory = (item) => {
    setSelected(item.id);
  };

  // render food and recepie title date
  const renderCategory = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onPressCategory(item)}>
        <View
          style={[
            localStyles.categoryview,
            {
              backgroundColor:
                selected === item.id ? colors.green : colors.btncolor,
            },
          ]}
        >
          <CText
            type={"C22"}
            color={selected === item.id ? colors.textbg : colors.fontbody}
          >
            {item.title}
          </CText>
        </View>
      </TouchableOpacity>
    );
  };

  // render favourite food category
  const renderFavFood = ({ item }) => {
    return (
      <TouchableOpacity
        style={localStyles.allrenderview}
        onPress={() => handleOnpress(item)}
      >
        <Image
          source={{ uri: item.profileImage }}
          style={localStyles.burgerimage}
        />
        <CText type={"C20"} color={colors.fontbody} align={"center"}>
          {item.foodName}
        </CText>
      </TouchableOpacity>
    );
  };

  // render favourite recepie category
  const renderFavRecepie = ({ item }) => {
    return (
      <TouchableOpacity
        style={localStyles.posterview}
        onPress={() => handleRecepiePress(item)}
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

  // onPress for go to the fav food description
  const handleOnpress = (item) => {
    navigation.navigate(StackNav.LikedFoodDesc, { item });
  };

  // onPress for go to the fav recepie description
  const handleRecepiePress = (item) => {
    navigation.navigate(StackNav.LikedRecepieDesc, { item });
  };

  // Empty food list component
  const EmptyFavFood = () => {
    return (
      <View>
        <View style={localStyles.innerview}>
          <Image source={images.diet1} style={localStyles.dietimg} />
          <CText type={"C22"} color={colors.fonttile} align={"center"}>
            {CommonString.nofood}
          </CText>
          <CText
            type={"E17"}
            color={colors.fontbody}
            align={"center"}
            style={localStyles.foodtext}
          >
            {CommonString.nofooddesc}
          </CText>
        </View>
        <CButton name={CommonString.search} />
      </View>
    );
  };

  // Empty recepie list component
  const EmptyFaVRecepie = () => {
    return (
      <View>
        <View style={localStyles.innerview}>
          <Image source={images.diet2} style={localStyles.dietimg} />
          <CText type={"C22"} color={colors.fonttile} align={"center"}>
            {CommonString.norecepie}
          </CText>
          <CText
            type={"E17"}
            color={colors.fontbody}
            align={"center"}
            style={localStyles.foodtext}
          >
            {CommonString.norecepiedesc}
          </CText>
        </View>
        <CButton name={CommonString.search} />
      </View>
    );
  };
  return (
    <View style={localStyles.main}>
      <View>
        <CHeader
          title={CommonString.favourite}
          type={"E15"}
          color={colors.fonttile}
        />
        {/* FLalist for the 2 category data */}
        <FlatList
          data={FavouriteCategory}
          renderItem={renderCategory}
          horizontal
          style={localStyles.flatlist}
        />
      </View>
      {/* Swithch two category of food and recepie data FlatList */}
      {selected === 1 ? (
        <FlatList
          data={food}
          renderItem={renderFavFood}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          bounces={false}
          key={"_"}
          scrollEnabled={false}
          keyExtractor={(item) => "_" + item.id.toString()}
          contentContainerStyle={localStyles.renderdatasty}
          columnWrapperStyle={localStyles.rendercolumndata}
          ListEmptyComponent={EmptyFavFood}
        />
      ) : (
        <FlatList
          key={"#"}
          data={recepie}
          renderItem={renderFavRecepie}
          keyExtractor={(item) => "#" + item.id.toString()}
          ListEmptyComponent={EmptyFaVRecepie}
        />
      )}
    </View>
  );
};

export default LikeTab;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
    ...styles.justifyBetween,
  },
  innerview: {
    ...styles.mh15,
    gap: moderateScale(10),
    ...styles.justifyCenter,
    height: moderateScale(520),
  },
  flatlist: {
    ...styles.selfCenter,
  },
  categoryview: {
    height: moderateScale(64),
    width: moderateScale(156),
    ...styles.nonFlexCenter,
    borderRadius: moderateScale(16),
  },
  dietimg: {
    height: moderateScale(96),
    width: moderateScale(96),
    resizeMode: "contain",
    ...styles.selfCenter,
    ...styles.mt30,
  },
  foodtext: {
    ...styles.mh25,
  },
  allrenderview: {
    ...styles.mt25,
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
  renderdatasty: {
    ...styles.ph20,
  },
  rendercolumndata: {
    ...styles.justifyBetween,
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
});
