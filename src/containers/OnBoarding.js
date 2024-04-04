import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { styles } from "../themes";
import { colors } from "../themes/colors";
import { OnBoardingData } from "../api/constant";
import images from "../assets/images";
import { moderateScale, screenHeight, screenWidth } from "../common/constants";
import typography from "../themes/typography";
import CButton from "../components/common/CButton";
import { StackNav } from "../navigation/NavigationKeys";

export const LoginButton = ({ extratext }) => {
  return (
    <TouchableOpacity>
      <Text style={[localStyles.logintext, extratext]}>Log In</Text>
    </TouchableOpacity>
  );
};

export default function OnBoarding({ navigation }) {
  const renderOnBoardingIterm = ({ item }) => {
    return (
      <View style={localStyles.rendetItemConatiner}>
        <Image source={item.onBoardingImg} style={localStyles.imagesty} />
        <View>
          <Text style={localStyles.title}>{item.title}</Text>
          <Text style={localStyles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const OnPressStart = () => {
    return navigation.navigate(StackNav.AuthNavigation);
  };
  return (
    <View style={localStyles.main}>
      <Image source={images.logotextcolor} style={localStyles.titlesty} />
      <FlatList
        horizontal
        data={OnBoardingData}
        key={(item) => item.id.toString()}
        renderItem={renderOnBoardingIterm}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
      />

      <View style={localStyles.btnview}>
        <CButton name={"Get Started"} onPress={OnPressStart} />
        <View style={localStyles.loginview}>
          <Text style={localStyles.alreadyac}>Already Have An Account?</Text>
          <LoginButton />
        </View>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  rendetItemConatiner: {
    width: screenWidth,
    ...styles.itemsCenter,
    ...styles.justifyEvenly,
  },
  imagesty: {
    resizeMode: "contain",
    width: screenWidth - moderateScale(40),
    height: screenHeight * 0.55,
  },
  title: {
    ...typography.fontSizes.f28,
    ...typography.fontWeights.ExtraBold,
    alignSelf: "center",
    color: colors.fonttile,
  },
  description: {
    ...typography.fontSizes.f18,
    ...typography.fontWeights.SemiBold,
    color: colors.fontbody,
    textAlign: "center",
    ...styles.mh20,
  },
  titlesty: {
    height: moderateScale(24),
    width: moderateScale(59),
    ...styles.selfCenter,
    ...styles.mt20,
  },
  loginview: {
    ...styles.flexRow,
    gap: 5,
  },
  logintext: {
    color: colors.green,
    ...typography.fontSizes.f18,
    ...typography.fontWeights.SemiBold,
  },
  alreadyac: {
    color: colors.alreadyAc,
    ...typography.fontSizes.f18,
    ...typography.fontWeights.SemiBold,
  },
  btnview: {
    ...styles.itemsCenter,
    gap: 20,
    ...styles.mv40,
  },
  imageStyle: {
    width: screenWidth - moderateScale(40),
    height: screenHeight * 0.55,
  },
});
