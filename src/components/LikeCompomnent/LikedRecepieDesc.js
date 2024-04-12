// Library Imports
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../common/CHeader";
import { CommonString } from "../../i18n/String";
import { moderateScale } from "../../common/constants";
import images from "../../assets/images";
import CText from "../common/CText";
import CButton from "../common/CButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import typography from "../../themes/typography";

// Liked Recepie Description
const LikedRecepieDesc = ({ route }) => {
  const [selected, setSelected] = useState(false);

  // Pass the item with navigation here for use
  const { item } = route.params;

  // Press function for like and unlike
  const onPressLike = () => {
    setSelected(!selected);
  };
  return (
    <View style={localStyles.main}>
      <CHeader
        title={CommonString.recepie}
        type={"E15"}
        color={colors.fonttile}
        LeftIcon={true}
      />
      <ScrollView>
        <Image source={item.regular} style={localStyles.poster} />
        <View style={localStyles.innerview}>
          <View style={localStyles.starview}>
            <View style={localStyles.timetext}>
              <Image source={images.timeicon1} style={localStyles.time} />
              <CText type={"E15"} color={colors.fontbody}>
                {item.minutes}
              </CText>
              <Image source={images.usericon1} style={localStyles.time} />
              <CText type={"E15"} color={colors.fontbody}>
                {item.serve}
              </CText>
            </View>
            <Image source={images.stars} style={localStyles.stars} />
          </View>
          <View style={localStyles.likeview}>
            <CText type={"C22"} color={colors.fonttile}>
              {item.name}
            </CText>
            <TouchableOpacity
              style={localStyles.heartview}
              onPress={onPressLike}
            >
              <AntDesign
                name={selected ? "heart" : "hearto"}
                style={localStyles.unlikeicon}
              />
            </TouchableOpacity>
          </View>
          <CText
            type={"E17"}
            color={colors.fontbody}
            style={localStyles.desctext}
          >
            {item.desc}
          </CText>
          <CText type={"C17"} color={colors.premium}>
            {CommonString.ingredient}
          </CText>
          // Ingredient data render using map
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {item?.FoodRecepie?.map((item) => (
              <View key={item.id} style={localStyles.recepieview}>
                <Image source={item.img1} style={localStyles.recepieimg} />
                <View>
                  <CText type={"E15"} color={colors.allhere}>
                    {item.name}
                  </CText>
                  <CText type={"E13"} color={colors.alreadyAc}>
                    {item.piece}
                  </CText>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={localStyles.stepdivider}>
            <CText type={"C17"} color={colors.premium}>
              {CommonString.recepie}
            </CText>
            <View style={localStyles.stepdivider1}>
              <CText type={"K17"} color={colors.fontbody}>
                {item.strstep1}
              </CText>
              <CText type={"E17"} color={colors.allhere}>
                {item.step1}
              </CText>
            </View>
            <View>
              <CText type={"K17"} color={colors.fontbody}>
                {item.strstep2}
              </CText>
              <CText type={"E17"} color={colors.allhere}>
                {item.step2}
              </CText>
            </View>
            <View>
              <CText type={"K17"} color={colors.fontbody}>
                {item.strstep3}
              </CText>
              <CText type={"E17"} color={colors.allhere}>
                {item.step3}
              </CText>
            </View>
          </View>
          <CButton name={CommonString.addtofav} extraSty={localStyles.btnsty} />
        </View>
      </ScrollView>
    </View>
  );
};

export default LikedRecepieDesc;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  poster: {
    height: moderateScale(192),
    width: "100%",
  },
  innerview: {
    ...styles.mh20,
  },
  starview: {
    backgroundColor: colors.btncolor,
    borderRadius: moderateScale(12),
    ...styles.flexcenterrow,
    ...styles.justifyBetween,
    ...styles.p25,
    ...styles.ph35,
    ...styles.mv20,
  },
  time: {
    height: moderateScale(16),
    width: moderateScale(16),
    resizeMode: "contain",
  },
  stars: {
    height: moderateScale(15),
    width: moderateScale(80),
    resizeMode: "contain",
  },
  timetext: {
    ...styles.flexcenterrow,
    gap: moderateScale(7),
  },
  desctext: {
    ...styles.mv10,
  },
  stepdivider: {
    gap: moderateScale(20),
  },
  stepdivider1: {
    gap: moderateScale(10),
  },
  recepieimg: {
    height: moderateScale(64),
    width: moderateScale(64),
    resizeMode: "contain",
  },
  recepieview: {
    backgroundColor: colors.recepiecard,
    borderRadius: moderateScale(16),
    gap: moderateScale(10),
    ...styles.p20,
    ...styles.m10,
  },
  btnsty: {
    ...styles.mv20,
  },
  heartview: {
    backgroundColor: colors.btncolor,
    ...styles.p10,
    borderRadius: moderateScale(20),
  },
  likeview: {
    ...styles.flexcenterrow,
    ...styles.justifyBetween,
  },
  unlikeicon: {
    ...typography.fontSizes.f20,
    color: colors.green,
  },
  likeicon: {
    ...typography.fontSizes.f20,
    color: colors.green,
  },
});
