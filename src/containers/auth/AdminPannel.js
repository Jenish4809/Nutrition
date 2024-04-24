import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CTextInput from "../../components/common/CTextInput";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import { CommonString } from "../../i18n/String";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const AdminPannel = () => {
  return (
    <View style={localStyles.main}>
      <View style={localStyles.innerview}>
        <Image source={images.logotextcolor} style={localStyles.logo} />
        <CTextInput
          placeholder={CommonString.foodname}
          label={CommonString.name}
          LeftIcon={() => (
            <Ionicons
              name="fast-food-outline"
              size={moderateScale(24)}
              color={colors.gray}
            />
          )}
        />
        <CTextInput
          placeholder={CommonString.ingredient}
          label={CommonString.ingredient}
          LeftIcon={() => (
            <MaterialCommunityIcons
              name="food-variant"
              size={moderateScale(24)}
              color={colors.gray}
            />
          )}
        />
        <CTextInput
          placeholder={CommonString.desc1}
          label={CommonString.desc1}
          LeftIcon={() => (
            <MaterialIcons
              name="description"
              size={moderateScale(24)}
              color={colors.gray}
            />
          )}
        />
        <CTextInput
          placeholder={CommonString.desc2}
          label={CommonString.desc2}
          LeftIcon={() => (
            <MaterialIcons
              name="description"
              size={moderateScale(24)}
              color={colors.gray}
            />
          )}
        />
      </View>
    </View>
  );
};

export default AdminPannel;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  logo: {
    height: moderateScale(24),
    width: moderateScale(60),
    alignSelf: "center",
    ...styles.mv20,
  },
  innerview: {
    ...styles.mh15,
  },
});
