import {
  View,
  Image,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import images from "../../assets/images";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import { CommonString } from "../../i18n/String";
import { moderateScale } from "../../common/constants";
import CText from "../../components/common/CText";
import CButton from "../../components/common/CButton";
import typography from "../../themes/typography";
import { AuthNav } from "../../navigation/NavigationKeys";

const AllowNotification = ({ navigation }) => {
  const [open, setOpen] = useState(false);

  const TouchButton = ({ name, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <CText type={"K17"} color={colors.green}>
          {name}
        </CText>
      </TouchableOpacity>
    );
  };
  const allowHandle = () => {
    setOpen(false);
    navigation.navigate(AuthNav.TermsCondition);
  };
  return (
    <View style={localStyles.main}>
      <View style={localStyles.innerview}>
        <View style={localStyles.title}>
          <Image source={images.logotextcolor} style={localStyles.logo} />
          <CText type={"C22"} color={colors.fonttile}>
            {CommonString.allownotification}
          </CText>
          <CText type={"E17"} color={colors.fontbody}>
            {CommonString.notificationdesc}
          </CText>
        </View>
        <Modal visible={open} transparent={true} animationType="fade">
          <View style={localStyles.centerview}>
            <View style={localStyles.innerview1}>
              <CText type={"C20"} align={"center"} style={localStyles.text}>
                {CommonString.sendnotification}
              </CText>
              <CText type={"E17"} align={"center"}>
                {CommonString.sendnotidesc}
              </CText>
              <View style={localStyles.allow}>
                <TouchButton name={"Don't Allow"} onPress={allowHandle} />
                <TouchButton name={"Allow"} onPress={allowHandle} />
              </View>
            </View>
          </View>
        </Modal>
        <CButton
          name={CommonString.allownotification}
          extraSty={localStyles.btnsty}
          onPress={() => setOpen(true)}
        />
      </View>
    </View>
  );
};

export default AllowNotification;
const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.flex,
    ...styles.mh15,
    ...styles.justifyBetween,
  },
  logo: {
    height: moderateScale(24),
    width: moderateScale(60),
    ...styles.mv40,
  },
  title: {
    gap: moderateScale(10),
  },
  btnsty: {
    ...styles.mv40,
  },
  centerview: {
    ...styles.flexCenter,
    ...styles.mt15,
  },
  innerview1: {
    backgroundColor: colors.btncolor,
    ...styles.p30,
    borderRadius: moderateScale(24),
    elevation: moderateScale(2),
    width: moderateScale(300),
    gap: moderateScale(10),
  },
  photos: {
    ...styles.flexRow,
  },
  galleryicon: {
    ...typography.fontSizes.f35,
    margin: moderateScale(35),
  },
  choose: {
    ...typography.fontSizes.f20,
    ...styles.selfCenter,
    ...typography.fontWeights.CoiniRegular,
  },
  text: {
    lineHeight: 30,
  },
  allow: {
    ...styles.flexRow,
    justifyContent: "space-between",
    ...styles.mt20,
  },
});
