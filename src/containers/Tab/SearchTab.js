import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Text,
} from "react-native";
import React, { useState } from "react";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../../components/common/CHeader";
import CText from "../../components/common/CText";
import CTextInput from "../../components/common/CTextInput";
import { CommonString } from "../../i18n/String";
import AntDesign from "react-native-vector-icons/AntDesign";
import typography from "../../themes/typography";
import {
  FavouriteFood,
  FavouriteRecepie,
  SearchData,
} from "../../api/constant";
import { moderateScale } from "../../common/constants";
import { LoginButton } from "../../components/common/CLoginButton";
import CDivider from "../../components/common/CDivider";
import images from "../../assets/images";
import { StackNav, TabNav } from "../../navigation/NavigationKeys";

const SearchTab = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(FavouriteRecepie);

  const handleRecepiePress = (item) => {
    navigation.navigate(StackNav.LikedRecepieDesc, { item });
  };

  const renderSearch = ({ item }) => {
    return (
      <View style={localStyles.renderhotview}>
        <Image source={item.image} style={localStyles.hotimage} />
        <View style={localStyles.hotview}>
          <CText type={"E17"} color={colors.fontbody}>
            {item.name}
          </CText>
          <CText type={"E13"} color={colors.fontbody}>
            {item.desc}
          </CText>
        </View>
      </View>
    );
  };

  const CommonButton = ({ name, Divider }) => {
    return (
      <View style={localStyles.trendingview}>
        <LoginButton
          extratext={name}
          color={colors.red}
          type={"E17"}
          RightIcon={() => (
            <AntDesign name="linechart" style={localStyles.chart} />
          )}
          extrasty={localStyles.chartview}
        />
        {!!Divider && <CDivider />}
      </View>
    );
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = FavouriteRecepie.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setData(filtered);
  };

  const renderRecepie = ({ item }) => {
    return (
      <TouchableOpacity
        style={localStyles.posterview}
        onPress={() => handleRecepiePress(item)}
      >
        <View>
          <ImageBackground source={item.image} style={localStyles.posterimage}>
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
          {item.description}
        </CText>
      </TouchableOpacity>
    );
  };

  const onPressBack = () => {
    navigation.navigate(TabNav.HomeTab);
    setSearch("");
  };

  const onPressViewAll = () => {
    navigation.navigate(StackNav.Searchfood, { FavouriteFood: FavouriteFood });
  };
  const renderFavFood = ({ item }) => {
    return (
      <TouchableOpacity style={localStyles.allrenderview}>
        <Image source={item.image} style={localStyles.burgerimage} />
        <CText type={"C20"} color={colors.fontbody}>
          {item.name}
        </CText>
      </TouchableOpacity>
    );
  };

  const ListEmpty = () => {
    return (
      <View style={localStyles.innerview1}>
        <Image source={images.empty} style={localStyles.dietimg} />
        <CText type={"C22"} color={colors.fonttile} align={"center"}>
          {CommonString.nosearch}
        </CText>
        <CText
          type={"E17"}
          color={colors.fontbody}
          align={"center"}
          style={localStyles.foodtext}
        >
          {CommonString.nosearchdesc}
        </CText>
      </View>
    );
  };

  const onPressViewAll1 = () => {
    navigation.navigate(StackNav.SearchAllRecepie, { data: data });
  };
  return (
    <View style={localStyles.main}>
      <CHeader
        onPressBack={onPressBack}
        LeftIcon={true}
        title={CommonString.search1}
      />
      <ScrollView>
        <View style={localStyles.innerview}>
          <CTextInput
            placeholder={CommonString.search}
            LeftIcon={() => (
              <AntDesign name="search1" style={localStyles.searchicon} />
            )}
            value={search}
            onChangeText={handleSearch}
          />
          <View style={localStyles.viewall1}>
            <CText
              type={"C22"}
              color={colors.fonttile}
              style={localStyles.title}
            >
              {CommonString.hot}
            </CText>
            {search ? (
              <LoginButton
                extratext={CommonString.viewall}
                extrasty={localStyles.vieall2}
                onPress={onPressViewAll1}
              />
            ) : null}
          </View>
          <FlatList
            data={!!search ? data.slice(0, 1) : SearchData}
            renderItem={search ? renderRecepie : renderSearch}
            horizontal={search ? false : true}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={ListEmpty}
          />
        </View>
        {search ? (
          <View>
            <View style={localStyles.foods}>
              <CText type={"C28"} color={colors.fonttile}>
                {CommonString.foods}
              </CText>
              <TouchableOpacity onPress={onPressViewAll}>
                <CText type={"K17"} color={colors.green}>
                  {CommonString.viewall}
                </CText>
              </TouchableOpacity>
            </View>
            <FlatList
              data={FavouriteFood.slice(0, 4)}
              renderItem={renderFavFood}
              numColumns={2}
              bounces={false}
              key={"_"}
              scrollEnabled={false}
              keyExtractor={(item) => "_" + item.id.toString()}
              contentContainerStyle={localStyles.renderdatasty}
              columnWrapperStyle={localStyles.rendercolumndata}
            />
          </View>
        ) : (
          <View style={styles.mh20}>
            <CText
              type={"C22"}
              color={colors.fonttile}
              style={localStyles.title}
            >
              {CommonString.trending}
            </CText>
            <CommonButton name={CommonString.bestvegetable} Divider={true} />
            <CommonButton name={CommonString.coldvegetable} Divider={true} />
            <CommonButton name={CommonString.chicken} Divider={true} />
            <CommonButton name={CommonString.maggi} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchTab;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.mh20,
  },
  searchicon: {
    ...typography.fontSizes.f20,
    color: colors.gray,
  },
  title: {
    ...styles.mh10,
    ...styles.mt15,
  },
  hotview: {
    backgroundColor: colors.recepiecard,
    ...styles.p20,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
  },
  hotimage: {
    height: moderateScale(160),
    width: moderateScale(200),
    resizeMode: "contain",
  },
  renderhotview: {
    ...styles.m10,
  },
  chart: {
    ...typography.fontSizes.f16,
    color: colors.red,
  },
  chartview: {
    ...styles.flexcenterrow,
    gap: moderateScale(5),
    ...styles.mh15,
    ...styles.mv10,
  },
  trendingview: {
    ...styles.mt10,
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
  allrenderview: {
    ...styles.mt25,
    ...styles.flexcenterrow,
    height: moderateScale(72),
    width: moderateScale(160),
    backgroundColor: colors.recepiecard,
    borderRadius: moderateScale(16),
    ...styles.justifyEvenly,
    ...styles.mt20,
    borderWidth: moderateScale(1),
    borderColor: colors.posterborder,
  },
  burgerimage: {
    height: moderateScale(36),
    width: moderateScale(36),
    resizeMode: "contain",
  },
  renderdatasty: {
    ...styles.ph30,
  },
  rendercolumndata: {
    ...styles.justifyBetween,
  },
  foods: {
    ...styles.rowSpaceBetween,
    ...styles.mh30,
    ...styles.mv15,
  },
  innerview1: {
    ...styles.mh15,
    gap: moderateScale(10),
    ...styles.justifyCenter,
    height: moderateScale(520),
  },
  dietimg: {
    height: moderateScale(160),
    width: moderateScale(160),
    resizeMode: "contain",
    ...styles.selfCenter,
    ...styles.mt30,
  },
  foodtext: {
    ...styles.mh25,
  },
  viewall1: {
    ...styles.flexcenterrow,
    ...styles.justifyBetween,
  },
  vieall2: {
    ...styles.mt20,
  },
});
