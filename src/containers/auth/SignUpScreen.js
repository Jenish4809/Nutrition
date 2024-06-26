// Library Imports
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import { CommonString } from "../../i18n/String";
import CText from "../../components/common/CText";
import CTextInput from "../../components/common/CTextInput";
import typography from "../../themes/typography";
import CButton from "../../components/common/CButton";
import { AuthNav } from "../../navigation/NavigationKeys";
import { LoginButton } from "../../components/common/CLoginButton";

// SignUp Screen Component
const SignUpScreen = ({ navigation }) => {
  // All the States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  // user sign up with firebase
  const signUpUser = async () => {
    try {
      if (email.length > 0 && password.length > 0 && name.length > 0) {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const profileData = {
          name: name,
          email: response._tokenResponse.email,
          uid: response.user.uid,
          isUser: true,
          isAdmin: false,
        };
        await AsyncStorage.setItem("users", JSON.stringify(profileData));
        await addDoc(collection(db, "users"), {
          name: name,
          email: email,
          createAt: new Date(),
          uid: response.user.uid,
          isUser: true,
          isAdmin: false,
          image: "",
        });
        if (response) {
          navigation.navigate(AuthNav.OtpVerificationScreen);
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert(CommonString.userexist);
      navigation.navigate(AuthNav.Login);
    }
  };
  // onPress Login For go to the Login Screen
  const onPressLogin = () => {
    navigation.navigate(AuthNav.Login);
  };
  // onChangeName for the get the name Value
  const onChangeName = (text) => {
    setName(text);
  };

  // onChangeEMail for the get the email Value
  const onCHangeEMail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text || emailRegex.test(text)) {
      setEmailErr("");
    } else {
      setEmailErr(CommonString.erremail);
    }
    setEmail(text);
  };

  // onChangePassword for the get the Password Value
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

  // Button Handle for the empty data
  const handleButton = () => {
    if (!name) {
      Alert.alert(CommonString.alertname);
    } else if (!email) {
      Alert.alert(CommonString.alertemail);
    } else if (!password) {
      Alert.alert(CommonString.alertpass);
    } else {
      signUpUser();
    }
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
                  <Image
                    source={images.usericon}
                    style={localStyles.lefticon}
                  />
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
                  <Image
                    source={images.emailicon}
                    style={localStyles.lefticon}
                  />
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
                  <Image
                    source={images.lockicon}
                    style={localStyles.lefticon}
                  />
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
          onPress={handleButton}
        />
        <View style={localStyles.logintextview}>
          <CText type={"E17"} color={colors.alreadyAc}>
            {CommonString.already}
          </CText>
          <LoginButton onPress={onPressLogin} />
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
    height: moderateScale(24),
    width: moderateScale(24),
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
    ...typography.fontSizes.f17,
    ...typography.fontWeights.NunitoBlack,
  },
  eye: {
    ...typography.fontSizes.f26,
    color: colors.gray,
  },
});
