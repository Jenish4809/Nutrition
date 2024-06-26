// Library imports
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

// Local Imports
import React, { useEffect, useState } from "react";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CText from "../common/CText";
import { CommonString } from "../../i18n/String";
import { moderateScale } from "../../common/constants";
import { StackNav } from "../../navigation/NavigationKeys";
import images from "../../assets/images";
import { CLoader } from "../../components/common/CLoader";
import { newDataHere } from "../common/CDataGetFirebase";
import CHeader from "../common/CHeader";

const ViewAllFood = ({ navigation }) => {
  const [allRecepie, setAllRecepie] = useState();
  const [loading, setLoading] = useState(true);

  //  useeffect for get recepie all data from firebase
  useEffect(() => {
    const getAllRecepieData = async () => {
      const allRecepieGet = await newDataHere("RecepieData");
      setAllRecepie(allRecepieGet);
      setLoading(false);
    };
    getAllRecepieData();
  }, []);

  if (!!loading) {
    return <CLoader />;
  }
  // press for the recepie data
  const handleOnPressRecepie = (item) => {
    navigation.navigate(StackNav.LikedRecepieDesc, { item });
  };

  // render the recepie
  const renderRecepie = ({ item }) => {
    return (
      <TouchableOpacity
        style={localStyles.posterview}
        onPress={() => handleOnPressRecepie(item)}
      >
        <View>
          <ImageBackground
            source={{ uri: item.url }}
            style={localStyles.posterimage}
          >
            <View style={localStyles.bgimagerow}>
              <View style={localStyles.servetext}>
                <Image source={images.timeicon} style={localStyles.timeicon} />
                <CText type={"E15"} color={colors.textbg}>
                  {item.minutes}
                </CText>
                <Image source={images.usericon} style={localStyles.timeicon} />
                <CText type={"E15"} color={colors.textbg}>
                  {item.serve + " " + "Serve"}
                </CText>
              </View>
              <View>
                <Image source={images.stars} style={localStyles.starsicon} />
              </View>
            </View>
          </ImageBackground>
        </View>
        <CText type={"C20"} color={colors.fonttile} align={"center"}>
          {item.name}
        </CText>
        <CText type={"K13"} color={colors.fontbody} align={"center"}>
          {item.subtitle}
        </CText>
      </TouchableOpacity>
    );
  };
  return (
    <View style={localStyles.main}>
      <View style={localStyles.innerview}>
        <CHeader
          align={"center"}
          type={"C30"}
          color={colors.green}
          title={CommonString.allRecepie}
          LeftIcon={true}
        />
        <FlatList
          data={allRecepie}
          renderItem={renderRecepie}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ViewAllFood;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    flex: 1,
    ...styles.mh15,
    ...styles.mt20,
  },
  posterview: {
    height: moderateScale(237),
    width: moderateScale(327),
    backgroundColor: colors.recepiecard,
    borderRadius: moderateScale(20),
    ...styles.selfCenter,
    ...styles.mv10,
    borderWidth: moderateScale(1),
    borderColor: colors.posterborder,
  },
  posterimage: {
    height: moderateScale(132),
    width: moderateScale(327),
    resizeMode: "contain",
    ...styles.justifyEnd,
  },
  timeicon: {
    height: moderateScale(16),
    width: moderateScale(16),
  },
  bgimagerow: {
    ...styles.rowCenter,
    ...styles.justifyEvenly,
  },
  starsicon: {
    height: moderateScale(12),
    width: moderateScale(68),
    resizeMode: "contain",
  },
  servetext: {
    ...styles.flexRow,
    gap: moderateScale(6),
  },
});
