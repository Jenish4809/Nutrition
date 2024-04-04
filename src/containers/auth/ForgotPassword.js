import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import { CommonString } from "../../i18n/String";
import CText from "../../components/common/CText";
import CTextInput from "../../components/common/CTextInput";
import CButton from "../../components/common/CButton";
import { AuthNav } from "../../navigation/NavigationKeys";

const ForgotPassword = ({ navigation }) => {
  const onPressLogin = () => {
    navigation.navigate(AuthNav.Login);
  };
  const onPressSignup = () => {
    navigation.navigate(AuthNav.SignUpScreen);
  };
  const onPressEmailSent = () => {
    navigation.navigate(AuthNav.EmailSend);
  };

  return (
    <View style={localStyles.main}>
      <Image source={images.logotextcolor} style={localStyles.logo} />
      <CText type={"C22"} align={"center"}>
        {CommonString.forgotpass1}
      </CText>
      <View style={localStyles.innerview}>
        <CText type={"E17"} align={"center"}>
          {CommonString.forgotpassdesc}
        </CText>
        <Image source={images.emaillogo} style={localStyles.emaillogosty} />
        <View style={localStyles.inputview}>
          <CTextInput
            placeholder={CommonString.emial}
            LeftIcon={() => (
              <Image source={images.emailicon} style={localStyles.emailsty} />
            )}
          />
          <View style={localStyles.signupac}>
            <CText type={"E17"} color={colors.alreadyAc}>
              {CommonString.rememberpass}
            </CText>
            <TouchableOpacity onPress={onPressLogin}>
              <CText type={"K17"} color={colors.green}>
                {CommonString.login}
              </CText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={localStyles.lastbtnview}>
          <CButton name={CommonString.link} onPress={onPressEmailSent} />
          <View style={localStyles.signupac}>
            <CText type={"E17"} color={colors.alreadyAc}>
              {CommonString.already}
            </CText>
            <TouchableOpacity onPress={onPressSignup}>
              <CText type={"K17"} color={colors.green}>
                {CommonString.signup}
              </CText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.flex,
    ...styles.mh15,
    ...styles.justifyBetween,
    ...styles.mt15,
  },
  logo: {
    height: moderateScale(24),
    width: moderateScale(60),
    ...styles.mv40,
    ...styles.selfCenter,
  },
  emaillogosty: {
    height: moderateScale(160),
    width: moderateScale(160),
    ...styles.selfCenter,
  },
  emailsty: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
  signupac: {
    ...styles.flexRow,
    gap: moderateScale(5),
    ...styles.justifyCenter,
  },
  lastbtnview: {
    ...styles.mv40,
    gap: moderateScale(20),
  },
  inputview: {
    gap: moderateScale(20),
  },
});
