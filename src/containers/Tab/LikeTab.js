import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../../components/common/CHeader";
import { CommonString } from "../../i18n/String";
import { FavouriteCategory, FavouriteFood } from "../../api/constant";
import CText from "../../components/common/CText";
import { moderateScale } from "../../common/constants";
import images from "../../assets/images";
import CButton from "../../components/common/CButton";

const LikeTab = () => {
  const [selected, setSelected] = useState(1);

  const onPressCategory = (item) => {
    setSelected(item.id);
  };
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

  const renderFavFood = ({ item }) => {
    return (
      <View style={localStyles.allrenderview}>
        <Image source={item.image} style={localStyles.burgerimage} />
        <CText type={"C20"} color={colors.fontbody}>
          {item.name}
        </CText>
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
        <FlatList
          data={FavouriteCategory}
          renderItem={renderCategory}
          horizontal
          style={localStyles.flatlist}
        />
      </View>
      {/* {selected === 1 ? (
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
      ) : (
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
      )} */}
      {selected === 1 ? (
        <FlatList
          data={FavouriteFood}
          renderItem={renderFavFood}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          bounces={false}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={localStyles.renderdatasty}
          columnWrapperStyle={localStyles.rendercolumndata}
        />
      ) : null}

      {/* <CButton name={CommonString.search} extraSty={localStyles.btnview} /> */}
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
  btnview: {
    ...styles.mb30,
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
    ...styles.ph30,
  },
  rendercolumndata: {
    ...styles.justifyBetween,
  },
});
