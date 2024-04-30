// Library Imports
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query, where } from "firebase/firestore";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import { CommonString } from "../../i18n/String";
import CHeader from "../../components/common/CHeader";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import CText from "../../components/common/CText";

import {
  EditProfile,
  Help,
  LogOut,
  Setting,
  Subscription,
} from "../../assets/svg";
import { StackNav } from "../../navigation/NavigationKeys";
import { setAuthToken } from "../../utils/asyncstorage";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";
import { signOut } from "firebase/auth";

// Profile Tab Component
const ProfileTab = ({ navigation }) => {
  const [imageProfile, setImageProfile] = useState(null);
  const [signUpUser, setSignUpUser] = useState("");
  const [userName, setUserName] = useState("");

  const db = FIREBASE_DB;
  const auth = FIREBASE_AUTH;

  // TO get the Profile Image from Async Storage
  useEffect(() => {
    getImage();
  }, []);

  // TO get the Profile Image from Async Storage
  const getImage = async () => {
    const imageUri = await AsyncStorage.getItem("Photos");
    setImageProfile({ uri: imageUri });
    const name = await AsyncStorage.getItem("users");
    const newData = JSON.parse(name);
    setSignUpUser(newData?.name);
    const login = await AsyncStorage.getItem("user");
    const newData1 = JSON.parse(login);
    const q = query(collection(db, "users"), where("uid", "==", newData1?.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserName(doc.data()?.name);
    });
  };

  // render item of the profile category data
  const CommonUser = ({ onPress, RightIcon, text }) => {
    return (
      <View>
        <TouchableOpacity style={localStyles.profiledataview} onPress={onPress}>
          <View style={localStyles.innerview}>
            {!!RightIcon && <RightIcon />}
            <CText type={"E17"} color={colors.fontbody} align={"center"}>
              {text}
            </CText>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={moderateScale(30)}
            color={colors.nexticon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const eidtProfile = () => {
    navigation.navigate(StackNav.EditProfile);
  };
  const subscriptions = () => {
    navigation.navigate(StackNav.Subscription);
  };
  const settings = () => {
    navigation.navigate(StackNav.Settings);
  };
  const helpCenter = () => {
    navigation.navigate(StackNav.HelpCenter);
  };

  // handle the log out buttton
  const logOut = async () => {
    try {
      Alert.alert("Logout", "Are you sure you want to log out?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const response = await signOut(auth);
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("users");
            await AsyncStorage.removeItem("Photos");
            if (response === undefined) {
              await setAuthToken(false);
              navigation.reset({
                index: 0,
                routes: [{ name: StackNav.AuthNavigation }],
              });
            }
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={localStyles.main}>
      <CHeader
        LeftIcon={true}
        title={CommonString.profile}
        type={"E15"}
        color={colors.fonttile}
      />
      <ScrollView>
        <Image
          source={!!imageProfile?.uri ? imageProfile : images.profileimg}
          style={localStyles.profileimgsty}
        />
        <CText type={"C22"} color={colors.fonttile} align={"center"}>
          {userName ? userName : signUpUser}
        </CText>
        <CommonUser
          RightIcon={() => <EditProfile />}
          text={CommonString.editProf}
          onPress={() => eidtProfile()}
        />
        <CommonUser
          RightIcon={() => <Subscription />}
          text={CommonString.subscription}
          onPress={() => subscriptions()}
        />
        <CommonUser
          RightIcon={() => <Setting />}
          text={CommonString.setting}
          onPress={() => settings()}
        />
        <CommonUser
          RightIcon={() => <Help />}
          text={CommonString.HelpCenter}
          onPress={() => helpCenter()}
        />
        <CommonUser
          RightIcon={() => <LogOut />}
          text={CommonString.logout}
          onPress={() => logOut()}
        />
      </ScrollView>
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
