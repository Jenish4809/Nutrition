import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { moderateScale } from "../../common/constants";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import { CommonString } from "../../i18n/String";
import images from "../../assets/images";
import CButton from "../../components/common/CButton";
import CTextInput from "../../components/common/CTextInput";
import CText from "../../components/common/CText";
import { AuthNav } from "../../navigation/NavigationKeys";

const Login = ({ navigation }) => {
  const onPressSignup = () => {
    navigation.navigate(AuthNav.SignUpScreen);
  };
  const onPressForgotPass = () => {
    navigation.navigate(AuthNav.ForgotPassword);
  };
  return (
    <View style={localStyles.main}>
      <View style={localStyles.innerview}>
        <View>
          <Image source={images.logotextcolor} style={localStyles.logo} />
          <View style={{ gap: 20 }}>
            <CButton
              LeftIcon={() => (
                <Image
                  source={images.facebook}
                  style={localStyles.facebooksty}
                />
              )}
              name={CommonString.facebookcontinue}
              extraSty={localStyles.btnsty}
              extratext={{ color: colors.textbg }}
            />
            <CButton
              LeftIcon={() => (
                <Image source={images.google} style={localStyles.facebooksty} />
              )}
              extratext={{ color: colors.fontbody }}
              name={CommonString.googlecontinue}
              extraSty={[localStyles.btnsty, localStyles.googlesty]}
            />
          </View>
          <Image source={images.divider} style={localStyles.dividersty} />
          <CTextInput
            inputview={localStyles.inputview}
            placeholder={CommonString.enteremail}
            label={CommonString.emial}
            LeftIcon={() => (
              <Image source={images.emailicon} style={localStyles.lefticon} />
            )}
          />
          <CTextInput
            inputview={localStyles.inputview}
            placeholder={CommonString.enterpass}
            label={CommonString.pass}
            LeftIcon={() => (
              <Image source={images.lockicon} style={localStyles.lefticon} />
            )}
            secureTextEntry={true}
            isSecure
          />
          <TouchableOpacity
            style={localStyles.forgotview}
            onPress={onPressForgotPass}
          >
            <CText type={"K17"} color={colors.green}>
              {CommonString.forgotpass}
            </CText>
          </TouchableOpacity>
        </View>
        <View style={localStyles.acbtn}>
          <CButton name={CommonString.login} />
          <View style={localStyles.signupac}>
            <CText type={"E17"} color={colors.alreadyAc}>
              {CommonString.dontac}
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

export default Login;

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
  btnsty: {
    height: moderateScale(60),
    width: moderateScale(320),
    backgroundColor: colors.facebook,
    borderRadius: moderateScale(16),
    ...styles.flexRow,
    gap: moderateScale(10),
  },
  facebooksty: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  googlesty: {
    backgroundColor: colors.textbg,
    borderWidth: moderateScale(2),
    borderColor: colors.googleborder,
  },
  dividersty: {
    height: moderateScale(20),
    width: moderateScale(248),
    ...styles.selfCenter,
    ...styles.mv30,
  },
  inputview: {
    height: moderateScale(56),
    ...styles.selfCenter,
  },
  lefticon: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
  forgotview: {
    ...styles.mv10,
    ...styles.selfEnd,
    ...styles.mh15,
  },
  acbtn: {
    marginVertical: moderateScale(70),
    gap: moderateScale(20),
  },
  signupac: {
    ...styles.flexRow,
    gap: moderateScale(5),
    ...styles.justifyCenter,
  },
});
