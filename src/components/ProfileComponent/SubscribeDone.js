// Library Imports
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../common/CHeader";
import CText from "../common/CText";
import { CommonString } from "../../i18n/String";
import images from "../../assets/images/index";
import { moderateScale } from "../../common/constants";
import CButton from "../common/CButton";
import { TabNav } from "../../navigation/NavigationKeys";
import { CommonFeature } from "./Subscription";
import { CLoader } from "../common/CLoader";

// Subscription done component
const SubscribeDone = ({ navigation }) => {
  const db = FIREBASE_DB;

  const [userName, setUserName] = useState("");
  const [imageProfile, setImageProfile] = useState(null);
  const [signUpUser, setSignUpUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // TO get the Profile Image from Async Storage
  useEffect(() => {
    getImage();
  }, []);

  // TO get the Profile Image from Async Storage
  const getImage = async () => {
    const name = await AsyncStorage.getItem("users");
    const newData = JSON.parse(name);
    setSignUpUser(newData?.name);
    const login = await AsyncStorage.getItem("user");
    const newData1 = JSON.parse(login);
    const q = query(
      collection(db, "users"),
      where("uid", "==", newData1?.uid || newData?.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserName(doc.data()?.name);
      setImageProfile(doc.data()?.image);
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return <CLoader />;
  }
  // onpress function for cancel button
  const onPressCancel = () => {
    navigation.navigate(TabNav.ProfileTab);
  };

  return (
    <View style={localStyles.main}>
      <CHeader
        title={CommonString.subscription}
        LeftIcon={true}
        type={"E15"}
        color={colors.fonttile}
      />
      <View style={localStyles.innerview}>
        <View>
          <Image
            source={imageProfile ? { uri: imageProfile } : images.profileimg}
            style={localStyles.imagesty}
          />
          <CText type={"C28"} color={colors.fonttile} align={"center"}>
            {userName ? userName : signUpUser}
          </CText>
          <CText type={"E17"} color={colors.fonttile} align={"center"}>
            {CommonString.subscribed}
          </CText>
        </View>
        <View style={localStyles.btnview}>
          <CommonFeature extraview1={localStyles.extraview1} />
          <CText type={"K17"} color={colors.shareoff} align={"center"}>
            {CommonString.shareoffer}
          </CText>
        </View>
        <View style={localStyles.btnview}>
          <CButton name={CommonString.share} />
          <TouchableOpacity onPress={onPressCancel}>
            <CText type={"K17"} color={colors.green} align={"center"}>
              {CommonString.cancelsub}
            </CText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SubscribeDone;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.mh15,
    ...styles.justifyEvenly,
    ...styles.flex,
  },
  imagesty: {
    height: moderateScale(144),
    width: moderateScale(144),
    borderRadius: moderateScale(80),
    resizeMode: "contain",
    ...styles.selfCenter,
  },
  featureview: {
    backgroundColor: colors.btncolor,
    gap: moderateScale(10),
    padding: moderateScale(50),
    borderRadius: moderateScale(20),
  },
  features: {
    ...styles.flexcenterrow,
    gap: moderateScale(7),
  },
  mainfeatureview: {
    ...styles.selfCenter,
  },
  btnview: {
    gap: moderateScale(20),
  },
  extraview1: {
    width: "90%",
  },
});
