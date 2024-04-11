import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../common/CHeader";
import { CommonString } from "../../i18n/String";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import CText from "../common/CText";
import { StackNav } from "../../navigation/NavigationKeys";
import { Filter } from "../../assets/svg";
import ActionSheet, { FlatList } from "react-native-actions-sheet";
import { FoodCategory, TimerData } from "../../api/constant";
import CDivider from "../common/CDivider";
import CCheckbox from "../common/CCheckBox";
import CButton from "../common/CButton";

const SearchAllRecepie = ({ route, navigation }) => {
  const { data } = route.params;

  const [selectedItems, setSelectedItems] = useState([]);
  const [select, setSelect] = useState("");
  let ref = useRef(null);

  const onPress = () => {
    ref.current.show();
  };

  const onPressclose = () => {
    ref.current.hide();
  };

  const onPressTimer = (id) => {
    setSelect(id);
  };

  const toggleItemSelection = (id) => {
    const isSelected = selectedItems.includes(id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  const renderCategory = ({ item }) => {
    const isSelected = selectedItems.includes(item.id);
    return (
      <View>
        <View style={localStyles.category}>
          <CText type={"E17"} color={colors.fontbody}>
            {item.food}
          </CText>
          <CCheckbox
            checked={isSelected}
            onChange={() => toggleItemSelection(item.id)}
          />
        </View>
        <CDivider />
      </View>
    );
  };
  const renderTimer = ({ item }) => {
    const isSelected = select === item.id;
    return (
      <TouchableOpacity
        style={[
          localStyles.timerview,
          { backgroundColor: isSelected ? colors.querybtn : colors.pwhite },
        ]}
        onPress={() => onPressTimer(item.id)}
      >
        <CText type={"E17"} color={colors.fonttile}>
          {item.time}
        </CText>
      </TouchableOpacity>
    );
  };

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
      {data?.map((item) => {
        return (
          <TouchableOpacity
            style={localStyles.posterview}
            onPress={() => handleRecepiePress(item)}
          >
            <View>
              <ImageBackground
                source={item.image}
                style={localStyles.posterimage}
              >
                <View style={localStyles.bgimagerow}>
                  <View style={localStyles.servetext}>
                    <Image
                      source={images.timeicon}
                      style={localStyles.timeicon}
                    />
                    <CText type={"E15"} color={colors.textbg}>
                      {item.minutes}
                    </CText>
                    <Image
                      source={images.usericon}
                      style={localStyles.timeicon}
                    />
                    <CText type={"E15"} color={colors.textbg}>
                      {item.serve}
                    </CText>
                  </View>
                  <View>
                    <Image
                      source={images.stars}
                      style={localStyles.starsicon}
                    />
                  </View>
                </View>
              </ImageBackground>
            </View>
            <CText type={"C20"} color={colors.fonttile} align={"center"}>
              {item.name}
            </CText>
            <CText type={"K13"} color={colors.fontbody} align={"center"}>
              {item.description}
            </CText>
          </TouchableOpacity>
        );
      })}
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
            keyExtractor={(item) => item.id.toString()}
            extraData={select}
          />
          <CText
            type={"C20"}
            color={colors.fonttile}
            style={localStyles.termstext}
          >
            {CommonString.cuisine}
          </CText>
          <FlatList
            data={FoodCategory}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id.toString()}
          />
          <CButton name={CommonString.apply} />
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
    ...styles.mt20,
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
  category: {
    ...styles.m20,
    ...styles.flexcenterrow,
    ...styles.justifyBetween,
  },
});
