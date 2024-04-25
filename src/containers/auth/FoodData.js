import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import CTextInput from "../../components/common/CTextInput";
import { CommonString } from "../../i18n/String";
import typography from "../../themes/typography";
import CText from "../../components/common/CText";
import CButton from "../../components/common/CButton";

export default function FoodData() {
  const CommonInput = ({ label, onChangeText, value, placeholder }) => {
    return (
      <View style={localStyles.inputview}>
        <CText type={"E15"} color={colors.fontbody} style={localStyles.label}>
          {label}
        </CText>
        <TextInput
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          style={localStyles.inputsty}
          placeholderTextColor={colors.gray}
          multiline={true}
          textAlignVertical="top"
        />
      </View>
    );
  };

  return (
    <View style={localStyles.main}>
      <View style={localStyles.innerview}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={images.logotextcolor} style={localStyles.logo} />
          <TouchableOpacity>
            <Image
              source={images.recepieprofile}
              style={localStyles.uploadphoto}
            />
          </TouchableOpacity>
          <CTextInput
            label={CommonString.recepiename}
            placeholder={CommonString.enterrecepie}
          />
          <CTextInput
            label={CommonString.subtitle}
            placeholder={CommonString.entersubtitle}
          />
          <CommonInput
            label={CommonString.desc}
            placeholder={CommonString.desc}
          />
          <CommonInput
            label={CommonString.step1}
            placeholder={CommonString.step1}
          />
          <CommonInput
            label={CommonString.step2}
            placeholder={CommonString.step2}
          />
          <CommonInput
            label={CommonString.step3}
            placeholder={CommonString.step3}
          />
          <CButton
            name={CommonString.addrecepie}
            extraSty={localStyles.btnsty}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.mh15,
  },
  logo: {
    height: moderateScale(24),
    width: moderateScale(60),
    alignSelf: "center",
    ...styles.mv20,
  },
  uploadphoto: {
    height: moderateScale(100),
    width: moderateScale(100),
    resizeMode: "contain",
    ...styles.selfCenter,
    borderRadius: 50,
  },
  inputsty: {
    height: moderateScale(150),
    backgroundColor: colors.pwhite,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(20),
    borderColor: colors.borders,
    ...styles.p20,
    ...styles.mb20,
    ...typography.fontSizes.f17,
    ...typography.fontWeights.ExtraBold,
  },
  inputview: {
    ...styles.mt20,
  },
  label: {
    ...styles.mh10,
    ...styles.mv5,
  },
  btnsty: {
    ...styles.mb20,
  },
});
