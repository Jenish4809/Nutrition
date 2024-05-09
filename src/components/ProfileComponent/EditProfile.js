// Library Imports
import { View, StyleSheet, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, updatePassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";

// Local Imports
import CHeader from "../common/CHeader";
import { CommonString } from "../../i18n/String";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CTextInput from "../common/CTextInput";
import { moderateScale } from "../../common/constants";
import Feather from "react-native-vector-icons/Feather";
import CButton from "../common/CButton";
import { useNavigation } from "@react-navigation/native";

// Editprofile Component
const EditProfile = () => {
  const navigation = useNavigation();

  const [enterName, setEnterName] = useState("");
  // const [password, setPassword] = useState("");
  // const [userName, setUserName] = useState([]);

  const db = FIREBASE_DB;
  // const auth = FIREBASE_AUTH;

  // useEffect(() => {
  //   const getUserDetail = async () => {
  //     const user = await AsyncStorage.getItem("UserAuthDetail");
  //     const userParse = await JSON.parse(user);

  //     setUserName(userParse);
  //   };
  //   getUserDetail();
  // }, []);

  // change the password of the user
  // const changePassword = async () => {
  //   await updatePassword(userName, password).then(() => {
  //     try {
  //       Alert.alert("Password Update SuccessFully");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // };

  // edit the user name

  const editUserName = async () => {
    const userName = await AsyncStorage.getItem("users");
    const userNameParse = await JSON.parse(userName);
    const userName1 = await AsyncStorage.getItem("user");
    const userNameParse1 = await JSON.parse(userName1);
    const userRef = query(
      collection(db, "users"),
      where("uid", "==", userNameParse?.uid || userNameParse1?.uid)
    );
    const findUsers = await getDocs(userRef);
    findUsers.forEach(async (user) => {
      const getUser = doc(db, "users", user.id);
      await updateDoc(getUser, {
        name: enterName,
      });
    });
  };

  // onPress save go to the back navigation
  const onPressProfile = async () => {
    if (enterName) {
      await editUserName();
    } else {
      Alert.alert(CommonString.enterName);
    }
    navigation.goBack();
  };

  // onchange name function to get the enter name value
  const onCHangeName = (text) => {
    setEnterName(text);
  };

  // onchange password function to get the enter password value
  // const onCHangePassword = (text) => {
  //   setPassword(text);
  // };

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
          {/* <CTextInput
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
          /> */}
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
  },
  btnsty: {
    ...styles.mv20,
  },
});
