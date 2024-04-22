// Library Imports
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";

// Local Imports
import { moderateScale } from "../../common/constants";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import { CommonString } from "../../i18n/String";
import images from "../../assets/images";
import CButton from "../../components/common/CButton";
import CTextInput from "../../components/common/CTextInput";
import CText from "../../components/common/CText";
import { AuthNav, StackNav } from "../../navigation/NavigationKeys";
import { setAuthToken } from "../../utils/asyncstorage";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Login COmponent
const Login = ({ navigation }) => {
  // States for Login
  const [email, setEmail] = useState("donapaw360@agaseo.com");
  const [password, setPassword] = useState("Test@123");

  //   Login Function

  const auth = FIREBASE_AUTH;

  const userLogin = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userData = {
          email: response._tokenResponse.email,
          uid: response.user.uid,
        };
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        if (response) {
          await setAuthToken(true);
          navigation.reset({
            index: 0,
            routes: [{ name: StackNav.TabNavigation }],
          });
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert(CommonString.userexist);
    }
  };

  // onPress function for go to the SignUp Screen
  const onPressSignup = () => {
    navigation.navigate(AuthNav.SignUpScreen);
  };

  // onPress function for go to the ForgotPassword Screen
  const onPressForgotPass = () => {
    navigation.navigate(AuthNav.ForgotPassword);
  };

  //  onPress Login for set the auth token true and navifate to home
  const onPressLogin = () => {
    userLogin();
  };

  // onChange function for get value email
  const onChangeEmail = (text) => {
    setEmail(text);
  };

  // onChange function for get value password
  const onChangePassword = (text) => {
    setPassword(text);
  };
  return (
    <View style={localStyles.main}>
      <View style={localStyles.innerview}>
        <ScrollView>
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
                  <Image
                    source={images.google}
                    style={localStyles.facebooksty}
                  />
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
              value={email}
              onChangeText={onChangeEmail}
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
              value={password}
              onChangeText={onChangePassword}
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
            <CButton name={CommonString.login} onPress={onPressLogin} />
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
        </ScrollView>
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
    ...styles.mt30,
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
