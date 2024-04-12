// Library Imports
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import { CommonString } from "../../i18n/String";
import CHeader from "../../components/common/CHeader";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import CText from "../../components/common/CText";
import { FlatList } from "react-native";
import { ProfileData } from "../../api/constant";

// Profile Tab Component
const ProfileTab = ({ navigation }) => {
  const [imageProfile, setImageProfile] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newName, setNewName] = useState("");

  // TO get the Profile Image from Async Storage
  useEffect(() => {
    const getImage = async () => {
      const imageUri = await AsyncStorage.getItem("Photos");
      const name = await AsyncStorage.getItem("UserName");
      setImageProfile({ uri: imageUri });
      setNewName(name);
    };
    getImage();
  }, []);

  // onPress item for route the page of their content
  const onPressItem = (item) => {
    navigation.navigate(item.route);
    setSelectedItem(item.id);
  };

  // render item of the profile category data
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
      <Image
        source={imageProfile ? imageProfile : images.profileimg}
        style={localStyles.profileimgsty}
      />
      <CText type={"C28"} color={colors.fonttile} align={"center"}>
        {newName ? newName : CommonString.username}
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
    borderRadius: moderateScale(70),
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
