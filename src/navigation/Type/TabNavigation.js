import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackNav, TabNav } from "../NavigationKeys";
import { TabRoute } from "../NavigationRoutes";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import { styles } from "../../themes";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function TabNavigation({ navigation }) {
  const Tab = createBottomTabNavigator();

  // const onPressUploadImg = async () => {
  //   try {
  //     await ImagePicker.requestCameraPermissionsAsync();
  //     let result = await ImagePicker.launchCameraAsync({
  //       cameraType: ImagePicker.CameraType.front,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 1,
  //     });
  //     if (!result.canceled) {
  //       navigation.navigate(StackNav.CameraScan);
  //     }
  //   } catch (err) {
  //     alert(CommonString.erruploadimg + err);
  //   }
  // };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: localStyle.tabBarStyle,
      }}
    >
      <Tab.Screen
        name={TabNav.HomeTab}
        component={TabRoute.HomeTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={!!focused ? images.tab1light : images.tab1dark}
              style={localStyle.imagesty}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.SearchTab}
        component={TabRoute.SearchTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={!!focused ? images.tab2light : images.tab2dark}
              style={localStyle.imagesty}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name={TabNav.CameraTab}
        component={TabRoute.CameraTab}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity
              style={localStyle.imageview}
              onPress={onPressUploadImg}
            >
              <Image source={images.tab3circle} style={localStyle.circle} />
              <Image source={images.tab3} style={localStyle.imagesty1} />
            </TouchableOpacity>
          ),
        }}
      /> */}
      <Tab.Screen
        name={TabNav.LikeTab}
        component={TabRoute.LikeTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={!!focused ? images.tab4light : images.tab4dark}
              style={localStyle.imagesty}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.ProfileTab}
        component={TabRoute.ProfileTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={!!focused ? images.tab5light : images.tab5dark}
              style={localStyle.imagesty}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const localStyle = StyleSheet.create({
  tabBarStyle: {
    height: moderateScale(96),
  },
  imagesty: {
    height: moderateScale(32),
    width: moderateScale(32),
    resizeMode: "contain",
  },
  imagesty1: {
    height: moderateScale(32),
    width: moderateScale(32),
    resizeMode: "contain",
    position: "absolute",
  },
  circle: {
    height: moderateScale(48),
    width: moderateScale(48),
    resizeMode: "contain",
  },
  imageview: {
    ...styles.flexRow,
    ...styles.center,
  },
});
