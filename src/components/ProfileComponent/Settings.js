// Library Imports
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../common/CHeader";
import { CommonString } from "../../i18n/String";
import CText from "../common/CText";
import { moderateScale } from "../../common/constants";
import {
  DarkMode,
  Help,
  Language,
  Location,
  LogOut,
  Notification,
} from "../../assets/svg";
import { StackNav } from "../../navigation/NavigationKeys";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { signOut } from "firebase/auth";
import { setAuthToken } from "../../utils/asyncstorage";

// setting component
const Settings = ({ navigation }) => {
  // states for toggle switch
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const auth = FIREBASE_AUTH;

  // turn on off toggle switch functions
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

  // onPress log out function for logging out
  const onPressLogOut = async () => {
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

  // onPress help function to to redirect the help page
  const onPressHelp = () => {
    navigation.navigate(StackNav.HelpCenter);
  };

  return (
    <View style={localStyles.main}>
      <CHeader
        title={CommonString.setting}
        LeftIcon={true}
        type={"E15"}
        color={colors.fonttile}
      />
      <CommonSettings
        Svg={() => <Language />}
        Icon={true}
        title={CommonString.language}
      />
      <CommonSettings
        Svg={() => <DarkMode />}
        title={CommonString.darkmode}
        RightIcon={() => (
          <Switch
            trackColor={{ false: colors.btncolor, true: colors.green }}
            thumbColor={isEnabled ? colors.btncolor : colors.primary}
            onValueChange={toggleSwitch}
            value={!isEnabled}
            style={localStyles.switch}
          />
        )}
      />
      <CommonSettings
        Svg={() => <Location />}
        title={CommonString.location}
        RightIcon={() => (
          <Switch
            trackColor={{ false: colors.btncolor, true: colors.green }}
            thumbColor={isEnabled1 ? colors.primary : colors.btncolor}
            onValueChange={toggleSwitch1}
            value={isEnabled1}
            style={localStyles.switch}
          />
        )}
      />
      <CommonSettings
        Svg={() => <Notification />}
        title={CommonString.notification}
        RightIcon={() => (
          <Switch
            trackColor={{ false: colors.btncolor, true: colors.green }}
            thumbColor={isEnabled2 ? colors.primary : colors.btncolor}
            onValueChange={toggleSwitch2}
            value={isEnabled2}
            style={localStyles.switch}
          />
        )}
      />
      <View style={localStyles.divider}></View>
      <CommonSettings
        Svg={() => <Help />}
        Icon={true}
        title={CommonString.HelpCenter}
        onPress={onPressHelp}
      />
      <CommonSettings
        Svg={() => <LogOut />}
        Icon={true}
        title={CommonString.logout}
        onPress={onPressLogOut}
      />
    </View>
  );
};

export default Settings;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  settingview: {
    height: moderateScale(48),
    width: moderateScale(350),
    ...styles.flexcenterrow,
    ...styles.selfCenter,
    ...styles.justifyBetween,
    ...styles.ph15,
    ...styles.mt20,
    ...styles.mb5,
  },
  settingview1: {
    ...styles.flexcenterrow,
    gap: moderateScale(10),
  },
  divider: {
    borderBottomWidth: moderateScale(2),
    borderBottomColor: colors.borders,
    width: moderateScale(350),
    ...styles.selfCenter,
    ...styles.mv20,
  },
  switch: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
});

// Common function for all setting category
export const CommonSettings = ({ Svg, title, Icon, onPress, RightIcon }) => {
  return (
    <TouchableOpacity style={localStyles.settingview} onPress={onPress}>
      <View style={localStyles.settingview1}>
        {!!Svg && <Svg />}
        <CText type={"E17"} color={colors.fontbody}>
          {title}
        </CText>
      </View>
      {!!Icon && (
        <MaterialIcons
          name="navigate-next"
          size={moderateScale(30)}
          color={colors.nexticon}
        />
      )}
      {!!RightIcon && <RightIcon />}
    </TouchableOpacity>
  );
};
