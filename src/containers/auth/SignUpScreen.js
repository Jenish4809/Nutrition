import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import { CommonString } from "../../i18n/String";
import CText from "../../components/common/CText";
import CTextInput from "../../components/common/CTextInput";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import typography from "../../themes/typography";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import CButton from "../../components/common/CButton";
import { LoginButton } from "../OnBoarding";
import { AuthNav } from "../../navigation/NavigationKeys";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");

  const onChangeName = (text) => {
    setName(text);
  };
  const onCHangeEMail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text || emailRegex.test(text)) {
      setEmailErr("");
    } else {
      setEmailErr(CommonString.erremail);
    }
    setEmail(text);
  };

  const onChangePassword = (text) => {
    let passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    if (!text || passRegex.test(text)) {
      setPassErr("");
    } else {
      setPassErr(CommonString.errpass);
    }
    setPassword(text);
  };

  // const handleButton = () => {
  //   if (!name) {
  //     Alert.alert(CommonString.alertname);
  //   } else if (!email) {
  //     Alert.alert(CommonString.alertemail);
  //   } else if (!password) {
  //     Alert.alert(CommonString.alertpass);
  //   } else {
  //     onPressContinue();
  //   }
  // };

  const onPressContinue = () => {
    return navigation.navigate(AuthNav.OtpVerificationScreen);
  };
  return (
    <View style={localStyles.main}>
      <Image source={images.logotextcolor} style={localStyles.logo} />
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={localStyles.innerview}>
            <CText
              color={colors.fonttile}
              type={"C22"}
              style={localStyles.headertext}
            >
              {CommonString.theBasic}
            </CText>
            <CText color={colors.fontbody} type={"S17"}>
              {CommonString.start}
            </CText>
            <View style={localStyles.inputview}>
              <CTextInput
                LeftIcon={() => (
                  <FontAwesome name="user-o" style={localStyles.lefticon} />
                )}
                placeholder={CommonString.enterName}
                label={CommonString.fullname}
                value={name}
                onChangeText={onChangeName}
              />
              <CTextInput
                keyboardType={"email-address"}
                placeholder={CommonString.enteremail}
                label={CommonString.emial}
                LeftIcon={() => (
                  <Fontisto name="email" style={localStyles.lefticon} />
                )}
                value={email}
                onChangeText={onCHangeEMail}
                errorText={emailErr}
              />
              <CTextInput
                maxLength={30}
                secureTextEntry={true}
                placeholder={CommonString.enterpass}
                label={CommonString.pass}
                LeftIcon={() => (
                  <EvilIcons name="lock" style={localStyles.lock} />
                )}
                isSecure
                value={password}
                onChangeText={onChangePassword}
                errorText={passErr}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <CButton
          name={CommonString.continue}
          extraSty={localStyles.btn}
          onPress={onPressContinue}
        />
        <View style={localStyles.logintextview}>
          <CText type={"B17"} color={colors.alreadyAc}>
            {CommonString.already}
          </CText>
          <LoginButton extratext={localStyles.logintext} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.mh20,
    ...styles.mv40,
  },
  logo: {
    height: moderateScale(24),
    width: moderateScale(60),
    ...styles.m25,
  },
  headertext: {
    ...styles.mb15,
  },
  lefticon: {
    ...typography.fontSizes.f24,
    color: colors.gray,
  },
  lock: {
    ...typography.fontSizes.f35,
    ...styles.mb10,
    color: colors.gray,
  },
  btn: {
    ...styles.selfCenter,
    ...styles.mt40,
    width: moderateScale(310),
    borderRadius: moderateScale(20),
  },
  inputview: {
    ...styles.mt30,
    gap: moderateScale(9),
  },
  logintextview: {
    ...styles.flexRow,
    gap: moderateScale(5),
    ...styles.justifyCenter,
    ...styles.mt20,
  },
  logintext: {
    ...typography.fontSizes.f14,
    ...typography.fontWeights.Bold,
  },
  eye: {
    ...typography.fontSizes.f26,
    color: colors.gray,
  },
});
