// Library Imports
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import { newDataHere } from "../common/CDataGetFirebase";
import CText from "../common/CText";
import { CommonString } from "../../i18n/String";
import { moderateScale } from "../../common/constants";
import images from "../../assets/images";
import { StackNav } from "../../navigation/NavigationKeys";
import { CLoader } from "../common/CLoader";
import CHeader from "../common/CHeader";

const TrendingRecepie = ({ navigation }) => {
  const [trendingRecepie, setTrendingRecepie] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    trendingRecepieGet();
  }, []);

  // get the trending recepie data
  const trendingRecepieGet = async () => {
    const getRecepie = await newDataHere("Trending Recepie");
    setTrendingRecepie(getRecepie);
    setIsLoading(false);
  };

  // press for the recepie data
  const handleOnPressRecepie = (item) => {
    navigation.navigate(StackNav.LikedRecepieDesc, { item });
  };

  // loader for waiting to get data
  if (isLoading) {
    return <CLoader />;
  }
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
      <View style={localStyles.innerView}>
        <CHeader
          title={CommonString.trendingRec}
          LeftIcon={true}
          align={"center"}
          type={"C30"}
          color={colors.green}
          extraSty={localStyles.headerview}
          style={localStyles.headertext}
          back={localStyles.backicon}
        />
        <FlatList
          data={trendingRecepie}
          renderItem={renderRecepie}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default TrendingRecepie;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerView: {
    ...styles.mh20,
    ...styles.mt10,
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
  headerview: {
    ...styles.flexcenterrow,
  },
  headertext: {
    ...styles.ml30,
  },
  backicon: {
    marginLeft: moderateScale(0),
  },
});
