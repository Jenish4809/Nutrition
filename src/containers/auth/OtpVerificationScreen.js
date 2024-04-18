// Library Imports
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import React from "react";

// Local Imports
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CText from "../../components/common/CText";
import { CommonString } from "../../i18n/String";
import typography from "../../themes/typography";
import CButton from "../../components/common/CButton";
import { AuthNav } from "../../navigation/NavigationKeys";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { sendEmailVerification } from "firebase/auth";

// Otp Verification Screen Component
const OtpVerificationScreen = ({ navigation }) => {
  const auth = FIREBASE_AUTH;
  // onPress back for go to the sign up screen
  const onPressBack = () => {
    navigation.navigate(AuthNav.SignUpScreen);
    // console.warn(otp);
  };

  // on Press value for go the Upload photo Screen
  const onPressContinue = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      Alert.alert("We send the verification Email on your registered Email");
      navigation.navigate(AuthNav.UploadPhoto);
    } catch (error) {
      console.log(error);
    }
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
          <Image source={images.emaillogo} style={localStyles.emaillogo} />
        </View>
        <View style={localStyles.buttonview}>
          <CButton
            name={"Verify your Email"}
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
