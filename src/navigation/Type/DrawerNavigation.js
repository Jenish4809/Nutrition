// Library imports
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Local imports
import { StackNav, TopTabNav } from "../NavigationKeys";
import { DrawerRoute } from "../NavigationRoutes";
import { colors } from "../../themes/colors";
import { moderateScale } from "../../common/constants";
import { StyleSheet } from "react-native";
import typography from "../../themes/typography";
import { setAuthToken } from "../../utils/asyncstorage";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { signOut } from "firebase/auth";
import { CommonString } from "../../i18n/String";

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerInactiveBackgroundColor: colors.white,
        drawerActiveBackgroundColor: colors.green,
        drawerActiveTintColor: colors.white,
        drawerInactiveTintColor: colors.black,
        drawerLabelStyle: {
          fontSize: 15,
        },
        drawerStyle: {
          backgroundColor: colors.black,
          width: moderateScale(200),
        },
        drawerType: "back",
        headerStyle: {
          backgroundColor: colors.green,
        },
        headerTitleStyle: {
          color: colors.white,
        },
        headerTintColor: colors.white,
        drawerContentContainerStyle: {
          width: moderateScale(200),
        },
      }}
    >
      <Drawer.Screen
        options={{
          drawerLabel: "Add Food",
          drawerLabelStyle: {
            ...typography.fontWeights.NunitoBlack,
            ...typography.fontSizes.f16,
          },
        }}
        name={CommonString.addfood}
        component={DrawerRoute.AdminPannel}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "Add Recepie",
          drawerLabelStyle: {
            ...typography.fontWeights.NunitoBlack,
            ...typography.fontSizes.f16,
          },
        }}
        name={CommonString.addrecepie}
        component={DrawerRoute.FoodData}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

// log out funtion and component in drawer
function CustomDrawerContent(props) {
  const auth = FIREBASE_AUTH;
  // onPress for logout Admin
  const onPressLogout = async () => {
    await AsyncStorage.removeItem("AdminLogin");
    const response = await signOut(auth);
    if (response === undefined) {
      await setAuthToken(false);
      props.navigation.reset({
        index: 0,
        routes: [{ name: StackNav.AuthNavigation }],
      });
    }
  };

  const onPressTopTab = () => {
    props.navigation.navigate(StackNav.TopTabNavigation);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Query/Feedback"
        labelStyle={localStyle.label1}
        style={localStyle.main1}
        onPress={onPressTopTab}
      />
      <DrawerItem
        label="LogOut"
        labelStyle={localStyle.label}
        style={localStyle.main}
        onPress={onPressLogout}
      />
    </DrawerContentScrollView>
  );
}

const localStyle = StyleSheet.create({
  main: {
    backgroundColor: colors.recepie,
  },
  label: {
    color: colors.pwhite,
    ...typography.fontSizes.f18,
    ...typography.fontWeights.CoiniRegular,
  },
  label1: {
    ...typography.fontSizes.f16,
    color: colors.black,
    ...typography.fontWeights.NunitoBlack,
  },
  main1: {
    backgroundColor: colors.white,
  },
});
