import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import { CommonString } from "../../i18n/String";
import CHeader from "../../components/common/CHeader";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import CText from "../../components/common/CText";
import { FlatList } from "react-native";
import { ProfileData } from "../../api/constant";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ProfileTab = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const onPressItem = (item) => {
    navigation.navigate(item.route);
    setSelectedItem(item.id);
  };

  const CommonUser = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={localStyles.profiledataview}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <View style={localStyles.innerview}>
          {item.svg}
          <CText
            type={"E17"}
            color={selectedItem === item.id ? colors.red : colors.fontbody}
            align={"center"}
          >
            {item.title}
          </CText>
        </View>
        <MaterialIcons
          name="navigate-next"
          size={moderateScale(30)}
          color={selectedItem === item.id ? colors.red : colors.nexticon}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={localStyles.main}>
      <CHeader
        LeftIcon={true}
        title={CommonString.profile}
        type={"E15"}
        color={colors.fonttile}
      />
      <Image source={images.profileimg} style={localStyles.profileimgsty} />
      <CText type={"C28"} color={colors.fonttile} align={"center"}>
        {CommonString.username}
      </CText>
      <FlatList
        data={ProfileData}
        renderItem={CommonUser}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ProfileTab;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  profileimgsty: {
    height: moderateScale(144),
    width: moderateScale(144),
    ...styles.selfCenter,
    ...styles.mv20,
  },
  profiledataview: {
    height: moderateScale(48),
    width: moderateScale(350),
    ...styles.flexcenterrow,
    ...styles.justifyBetween,
    ...styles.selfCenter,
    ...styles.mt30,
  },
  nexticon: {
    color: colors.nexticon,
  },
  innerview: {
    gap: moderateScale(10),
    ...styles.flexcenterrow,
  },
  divider: {
    borderBottomWidth: moderateScale(2),
    width: moderateScale(327),
    ...styles.selfCenter,
    borderBottomColor: colors.borders,
    ...styles.mt20,
  },
});
