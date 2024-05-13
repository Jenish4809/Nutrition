// Library imports
import { Alert, Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";

// Local imports
import { StackNav } from "../NavigationKeys";
import { DrawerRoute } from "../NavigationRoutes";
import { colors } from "../../themes/colors";
import { moderateScale } from "../../common/constants";
import typography from "../../themes/typography";
import { setAuthToken } from "../../utils/asyncstorage";
import { CommonString } from "../../i18n/String";
import images from "../../assets/images";
import { styles } from "../../themes";
import CText from "../../components/common/CText";
import { CLoader } from "../../components/common/CLoader";

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
  const db = FIREBASE_DB;

  const [userName, setUserName] = useState();
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // useeffect for get the username and profile image
  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("user");
      const parseuser = JSON.parse(user);

      const q = query(
        collection(db, "users"),
        where("uid", "==", parseuser?.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserName(doc.data()?.name);
        setImage(doc.data()?.image);
        setIsLoading(false);
      });
    };
    getUser();
  }, []);

  // onPress for logout Admin
  const onPressLogout = async () => {
    try {
      Alert.alert("Logout", "Are you sure you want to log out?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await AsyncStorage.removeItem("AdminLogin");
            await AsyncStorage.removeItem("user");
            const response = await signOut(auth);
            if (response === undefined) {
              await setAuthToken(false);
              props.navigation.reset({
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

  // Loader
  if (isLoading) {
    return <CLoader />;
  }
  // onPress for go to the top tab
  const onPressTopTab = () => {
    props.navigation.navigate(StackNav.TopTabNavigation);
  };

  return (
    <DrawerContentScrollView style={styles.flex}>
      <View style={localStyle.header}>
        <Image
          source={image ? { uri: image } : images.profileimg}
          style={localStyle.profileImage}
        />
        <CText type={"E20"} color={colors.white}>
          {userName}
        </CText>
      </View>
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
  header: {
    ...styles.pv20,
    ...styles.ph15,
    ...styles.itemsCenter,
  },
  profileImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    resizeMode: "contain",
    borderRadius: moderateScale(50),
    ...styles.mb10,
  },
});
