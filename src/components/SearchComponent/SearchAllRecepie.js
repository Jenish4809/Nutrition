// Library Imports
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import React, { useRef, useState } from "react";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../common/CHeader";
import { CommonString } from "../../i18n/String";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import CText from "../common/CText";
import { StackNav } from "../../navigation/NavigationKeys";
import { Filter } from "../../assets/svg";
import { TimerData } from "../../api/constant";

// Search Recepies and Food component
const SearchAllRecepie = ({ route, navigation }) => {
  // Get the Search from previous page
  const { data } = route.params;
  const [select, setSelect] = useState();
  const [filtered, setFiltered] = useState("");
  let ref = useRef(null);

  // open function for open actionsheet filter
  const onPress = () => {
    ref.current.show();
  };

  // close function for open actionsheet filter
  const onPressclose = () => {
    ref.current.hide();
  };

  // timer change for the different cooking time and filter new data
  const onPressTimer = async (id, time) => {
    setSelect(id);
    const minutes = parseInt(time);
    const filteredData = await data.filter((item) => {
      const minutes1 = parseInt(item.minutes);
      if (minutes1 < minutes) {
        return item;
      }
    });
    setFiltered(filteredData);
  };

  // render the recepie
  const renderFoodReccepie = ({ item }) => {
    return (
      <TouchableOpacity
        style={localStyles.posterview}
        onPress={() => handleRecepiePress(item)}
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
                  {item.serve}
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

  // Render component for Timer
  const renderTimer = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          localStyles.timerview,
          {
            backgroundColor:
              select === item.id ? colors.querybtn : colors.pwhite,
          },
        ]}
        onPress={() => onPressTimer(item.id, item.time)}
      >
        <CText type={"E17"} color={colors.fonttile}>
          {item.time}
        </CText>
      </TouchableOpacity>
    );
  };

  // onPress for recepie Description
  const handleRecepiePress = (item) => {
    navigation.navigate(StackNav.LikedRecepieDesc, { item });
  };

  return (
    <View style={localStyles.main}>
      <CHeader
        LeftIcon={true}
        title={CommonString.recepie}
        type={"E15"}
        color={colors.fonttile}
        RighIcon={() => (
          <TouchableOpacity onPress={onPress}>
            <Filter />
          </TouchableOpacity>
        )}
      />
      <FlatList
        data={!!select ? filtered : data}
        renderItem={renderFoodReccepie}
      />

      <ActionSheet ref={ref} containerStyle={localStyles.action}>
        <View style={localStyles.actionview}>
          <View style={localStyles.actiontitle}>
            <CText type={"C22"} color={colors.fonttile}>
              {CommonString.filter}
            </CText>
            <TouchableOpacity onPress={onPressclose}>
              <Image source={images.close} style={localStyles.closeicon} />
            </TouchableOpacity>
          </View>
          <CText
            type={"C20"}
            color={colors.fonttile}
            style={localStyles.termstext}
          >
            {CommonString.cookingtime}
          </CText>
          <FlatList
            data={TimerData}
            renderItem={renderTimer}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            extraData={select}
          />
        </View>
      </ActionSheet>
    </View>
  );
};

export default SearchAllRecepie;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  posterview: {
    height: moderateScale(237),
    width: moderateScale(327),
    backgroundColor: colors.recepiecard,
    borderRadius: moderateScale(20),
    ...styles.selfCenter,
    ...styles.m10,
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
  action: {
    borderTopLeftRadius: moderateScale(40),
    borderTopRightRadius: moderateScale(40),
    ...styles.p30,
  },
  actionview: {
    gap: moderateScale(20),
  },
  actiontitle: {
    ...styles.flexRow,
    ...styles.justifyBetween,
  },
  closeicon: {
    height: moderateScale(32),
    width: moderateScale(32),
  },
  termstext: {
    lineHeight: 22,
  },
  timerview: {
    ...styles.m10,
    height: moderateScale(44),
    width: moderateScale(68),
    ...styles.nonFlexCenter,
    borderRadius: moderateScale(12),
    borderColor: colors.borders,
    borderWidth: moderateScale(2),
  },
});
