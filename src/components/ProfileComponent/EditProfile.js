// Library Imports
import { View, StyleSheet, Image } from "react-native";
import React, { useState } from "react";

// Local Imports
import CHeader from "../common/CHeader";
import { CommonString } from "../../i18n/String";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CTextInput from "../common/CTextInput";
import { moderateScale } from "../../common/constants";
import Feather from "react-native-vector-icons/Feather";
import images from "../../assets/images";
import CButton from "../common/CButton";
import { useNavigation } from "@react-navigation/native";

// Editprofile Component
const EditProfile = () => {
  const navigation = useNavigation();

  const [enterName, setEnterName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // onPress save go to the back navigation
  const onPressProfile = () => {
    navigation.goBack();
  };

  // onchange name function to get the enter name value
  const onCHangeName = (text) => {
    setEnterName(text);
  };

  // onchange email function to get the enter email value
  const onCHangeEmail = (text) => {
    setEmail(text);
  };

  // onchange password function to get the enter password value
  const onCHangePassword = (text) => {
    setPassword(text);
  };
  return (
    <View style={localStyles.main}>
      <CHeader
        title={CommonString.editProf}
        LeftIcon={true}
        type={"E15"}
        color={colors.fonttile}
      />
      <View style={localStyles.inputview1}>
        <View>
          <CTextInput
            label={CommonString.fullname}
            placeholder={CommonString.username}
            LeftIcon={() => (
              <Feather
                name="user"
                size={moderateScale(24)}
                color={colors.gray}
              />
            )}
            value={enterName}
            onChangeText={onCHangeName}
            inputview={localStyles.inputview}
          />
          <CTextInput
            value={email}
            onChangeText={onCHangeEmail}
            label={CommonString.enteremail}
            placeholder={CommonString.khanemail}
            LeftIcon={() => (
              <Image source={images.emailicon} style={localStyles.email} />
            )}
            inputview={localStyles.inputview}
          />
          <CTextInput
            onChangeText={onCHangePassword}
            value={password}
            label={CommonString.enterpass}
            placeholder={CommonString.passhash}
            LeftIcon={() => (
              <Image source={images.emailicon} style={localStyles.email} />
            )}
            inputview={localStyles.inputview}
            isSecure={true}
            maxLength={16}
            secureTextEntry={true}
          />
        </View>
        <CButton
          name={CommonString.save}
          extraSty={localStyles.btnsty}
          onPress={onPressProfile}
        />
      </View>
    </View>
  );
};

export default EditProfile;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
    ...styles.itemsCenter,
  },
  inputview: {
    width: moderateScale(350),
    height: moderateScale(56),
  },
  email: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  inputview1: {
    ...styles.flex,
    ...styles.justifyBetween,
    ...styles.mt30,
  },
  btnsty: {
    ...styles.mv50,
  },
});
