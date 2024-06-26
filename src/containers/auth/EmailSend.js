// Library Imports
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

// Local Imports
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import { CommonString } from "../../i18n/String";
import CText from "../../components/common/CText";
import CButton from "../../components/common/CButton";
import { AuthNav } from "../../navigation/NavigationKeys";

// EMailSend Component
const EmailSend = ({ navigation, route }) => {
  let email = route?.params?.email;

  // Navigation onPress for the Login Screen
  const onPressLogin = () => {
    navigation.navigate(AuthNav.Login);
  };
  return (
    <View style={localStyles.main}>
      <Image source={images.logotextcolor} style={localStyles.logo} />
      <View style={localStyles.descsty}>
        <CText type={"C22"} align={"center"}>
          {CommonString.emailsend}
        </CText>
        <CText type={"E17"} align={"center"} style={styles.mh25}>
          {`We’ve sent a password reset link to ${email}`}
        </CText>
      </View>
      <View style={localStyles.innerview}>
        <View style={localStyles.imageview}>
          <Image source={images.emaillogo} style={localStyles.emaillogosty} />
          <View style={localStyles.signupac}>
            <CText type={"E17"} color={colors.alreadyAc}>
              {CommonString.notreceive}
            </CText>
            <TouchableOpacity>
              <CText type={"K17"} color={colors.green}>
                {CommonString.resend}
              </CText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={localStyles.lastbtnview}>
          <CButton name={CommonString.backto} onPress={onPressLogin} />
          <TouchableOpacity style={localStyles.contactview}>
            <CText type={"K17"} color={colors.green}>
              {CommonString.contact}
            </CText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EmailSend;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.flex,
    ...styles.mh15,
    ...styles.justifyEvenly,
  },
  logo: {
    height: moderateScale(24),
    width: moderateScale(60),
    ...styles.mv40,
    ...styles.selfCenter,
  },
  emaillogosty: {
    height: moderateScale(256),
    width: moderateScale(256),
    ...styles.selfCenter,
  },
  signupac: {
    ...styles.flexRow,
    gap: moderateScale(5),
    ...styles.justifyCenter,
  },
  contactview: {
    ...styles.selfCenter,
  },
  lastbtnview: {
    ...styles.mv40,
    gap: moderateScale(20),
  },
  imageview: {
    gap: moderateScale(20),
  },
  descsty: {
    ...styles.mh25,
    gap: moderateScale(10),
  },
});
