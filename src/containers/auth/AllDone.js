//  Library Imports
import { View, Image, StyleSheet } from "react-native";

// Local Imports
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CText from "../../components/common/CText";
import { CommonString } from "../../i18n/String";
import CButton from "../../components/common/CButton";
import Entypo from "react-native-vector-icons/Entypo";
import { setAuthToken } from "../../utils/asyncstorage";
import { StackNav } from "../../navigation/NavigationKeys";

// All done last signup screen component
const AllDone = ({ navigation }) => {
  // onPress button for the login compeleted
  const onPressLogin = async () => {
    await setAuthToken(true);
    navigation.reset({
      index: 0,
      routes: [{ name: StackNav.TabNavigation }],
    });
  };
  return (
    <View style={localStyles.main}>
      <View style={localStyles.innerview}>
        <Image source={images.logotextcolor} style={localStyles.logo} />
        <View style={localStyles.check}>
          <CText type={"C22"} color={colors.fonttile}>
            {CommonString.alldone}
          </CText>
          <Entypo
            name="check"
            style={styles.mr20}
            size={28}
            color={colors.primary}
          />
        </View>
        <CText type={"E17"} color={colors.fontbody}>
          {CommonString.alldonedesc}
        </CText>
        <View style={localStyles.pageview}>
          <Image source={images.icecream} style={localStyles.icecreamlogo} />
        </View>
        <CButton
          name={CommonString.letsgo}
          extraSty={localStyles.btn}
          onPress={onPressLogin}
        />
      </View>
    </View>
  );
};

export default AllDone;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.flex,
    ...styles.mh15,
  },
  logo: {
    height: moderateScale(24),
    width: moderateScale(60),
    ...styles.mv40,
  },
  icecreamlogo: {
    height: moderateScale(282),
    width: moderateScale(282),
    ...styles.selfCenter,
  },
  pageview: {
    ...styles.flexCenter,
  },
  btn: {
    ...styles.mv50,
  },
  check: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.justifyBetween,
  },
});
