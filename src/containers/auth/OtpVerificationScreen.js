import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CText from "../../components/common/CText";
import { CommonString } from "../../i18n/String";
import OtpTextInput from "react-native-text-input-otp";
import typography from "../../themes/typography";
import CButton from "../../components/common/CButton";
import { AuthNav } from "../../navigation/NavigationKeys";

const OtpVerificationScreen = ({ navigation }) => {
  const [otp, setOtp] = useState("");

  const onPressBack = () => {
    navigation.navigate(AuthNav.SignUpScreen);
  };
  const onPressContinue = () => {
    navigation.navigate(AuthNav.UploadPhoto);
  };
  return (
    <View style={localStyles.main}>
      <View style={localStyles.innerview}>
        <View>
          <Image source={images.logotextcolor} style={localStyles.logo} />
          <CText type={"C22"} style={localStyles.title} color={colors.fonttile}>
            {CommonString.confirm}
          </CText>
          <CText type={"S17"} color={colors.fontbody}>
            {CommonString.confirmdesc}
          </CText>
          <View style={{ gap: moderateScale(40) }}>
            <Image source={images.emaillogo} style={localStyles.emaillogo} />
            <OtpTextInput
              otp={otp}
              setOtp={setOtp}
              digits={4}
              style={localStyles.otpview}
              fontStyle={localStyles.otpfont}
              focusedStyle={localStyles.otpfocus}
            />
          </View>
          <View style={localStyles.resendview}>
            <CText type={"E22"} color={colors.fontbody}>
              {CommonString.notreceive}
            </CText>
            <CText type={"B22"} color={colors.green}>
              {CommonString.resend}
            </CText>
          </View>
        </View>
        <View style={localStyles.buttonview}>
          <CButton
            name={"Continue"}
            extraSty={localStyles.btnsty}
            onPress={onPressContinue}
          />
          <TouchableOpacity style={localStyles.backsty} onPress={onPressBack}>
            <Text style={localStyles.backtext}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OtpVerificationScreen;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.flex,
    justifyContent: "space-around",
    ...styles.mh15,
  },
  logo: {
    height: moderateScale(24),
    width: moderateScale(60),
    ...styles.mv40,
  },
  title: {
    ...styles.mb10,
  },
  emaillogo: {
    height: moderateScale(160),
    width: moderateScale(160),
    resizeMode: "contain",
    ...styles.selfCenter,
    ...styles.mt40,
  },
  otpview: {
    height: moderateScale(64),
    width: moderateScale(64),
    ...styles.mh10,
    borderRadius: moderateScale(15),
    ...styles.justifyCenter,
    borderWidth: moderateScale(3),
    borderColor: colors.borders,
    backgroundColor: colors.textbg,
  },
  otpfont: {
    ...typography.fontSizes.f30,
    ...typography.fontWeights.ExtraBold,
    color: colors.otptext,
  },
  otpfocus: {
    backgroundColor: colors.btncolor,
    borderWidth: moderateScale(2),
    borderColor: colors.otpfocus,
  },
  resendview: {
    ...styles.rowCenter,
    ...styles.mt20,
  },
  btnsty: {
    ...styles.selfCenter,
  },
  backtext: {
    ...typography.fontSizes.f17,
    ...typography.fontWeights.NunitoBlack,
    ...styles.selfCenter,
    color: colors.green,
  },
  buttonview: {
    gap: moderateScale(20),
  },
});
