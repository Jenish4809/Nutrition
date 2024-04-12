// Library Imports
import { View, StyleSheet, Image, FlatList, ScrollView } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../common/CHeader";
import { CommonString } from "../../i18n/String";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import { FoodIngridient, FoodProtein } from "../../api/constant";
import CText from "../common/CText";
import CButton from "../common/CButton";
import { LoginButton } from "../common/CLoginButton";
import { StackNav, TabNav } from "../../navigation/NavigationKeys";

const CameraScan = ({ navigation }) => {
  // Render Protein function
  const renderProtein = ({ item }) => {
    return (
      <View style={localStyles.renderview}>
        <CText type={"E15"} color={colors.red}>
          {item.title}
        </CText>
        <CText type={"C28"} color={colors.red}>
          {item.gram}
        </CText>
      </View>
    );
  };

  // Render Ingredient function
  const renderIngredient = ({ item }) => {
    return (
      <View style={localStyles.ingredientview}>
        <Image source={item.image} style={localStyles.ingredientimg} />
        <View style={localStyles.ingredienttext}>
          <CText type={"E15"} color={colors.allhere}>
            {item.title}
          </CText>
          <CText type={"E13"} color={colors.alreadyAc}>
            {item.slices}
          </CText>
        </View>
      </View>
    );
  };

  // Camera Open function
  const onPressUploadImg = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        navigation.navigate(StackNav.CameraScan);
      }
    } catch (err) {
      alert(CommonString.erruploadimg + err);
    }
  };

  // Header back Press function
  const onPressBackgo = () => {
    navigation.navigate(TabNav.HomeTab);
  };
  return (
    <View style={localStyles.main}>
      <ScrollView>
        <View>
          <CHeader
            title={CommonString.foodresult}
            LeftIcon={true}
            type={"E15"}
            color={colors.fonttile}
            onPressBack={onPressBackgo}
          />
          <Image source={images.burger1} style={localStyles.burgerimg} />
          {/* Protein data Flatlist */}
          <FlatList
            data={FoodProtein}
            renderItem={renderProtein}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <View style={localStyles.innerview}>
            <View style={localStyles.detailview}>
              <CText type={"C22"} color={colors.fonttile}>
                {CommonString.details}
              </CText>
              <CText type={"E17"} color={colors.fontbody}>
                {CommonString.details1}
              </CText>
            </View>
            <CText type={"C22"} color={colors.fonttile}>
              {CommonString.ingredient}
            </CText>
          </View>
          {/* Ingredients data Flatlist */}
          <FlatList
            data={FoodIngridient}
            renderItem={renderIngredient}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <CButton extraSty={localStyles.btnsty} name={CommonString.addtofav} />
          <LoginButton
            extratext={CommonString.scan}
            extrasty={localStyles.scansty}
            onPress={onPressUploadImg}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CameraScan;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.pwhite,
  },
  innerview: {
    ...styles.mh25,
    gap: moderateScale(10),
  },
  burgerimg: {
    height: moderateScale(128),
    width: moderateScale(128),
    resizeMode: "contain",
    ...styles.selfCenter,
  },
  renderview: {
    backgroundColor: colors.recepiecard,
    ...styles.p20,
    ...styles.nonFlexCenter,
    width: moderateScale(110),
    ...styles.mv30,
  },
  detailview: {
    gap: moderateScale(15),
    ...styles.mb20,
  },
  ingredientview: {
    backgroundColor: colors.recepiecard,
    ...styles.m10,
    ...styles.p15,
    borderRadius: moderateScale(16),
    ...styles.nonFlexCenter,
    gap: moderateScale(10),
  },
  ingredientimg: {
    height: moderateScale(64),
    width: moderateScale(64),
    resizeMode: "contain",
  },
  ingredienttext: {
    ...styles.nonFlexCenter,
  },
  btnsty: {
    ...styles.mt20,
    ...styles.mb15,
  },
  scansty: {
    ...styles.selfCenter,
    ...styles.mb20,
  },
});
