// Library Imports
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ActionSheet from "react-native-actions-sheet";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../../components/common/CHeader";
import { CommonString } from "../../i18n/String";
import { FavouriteCategory, FoodCategory, TimerData } from "../../api/constant";
import CText from "../../components/common/CText";
import { moderateScale } from "../../common/constants";
import images from "../../assets/images";
import CButton from "../../components/common/CButton";
import { StackNav, TabNav } from "../../navigation/NavigationKeys";
import { CLoader } from "../../components/common/CLoader";
import { newDataHere } from "../../components/common/CDataGetFirebase";
import { Filter } from "../../assets/svg";
import CCheckbox from "../../components/common/CCheckBox";
import CDivider from "../../components/common/CDivider";

// LikeTab component
const LikeTab = ({ navigation }) => {
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(true);
  const [food, setFood] = useState();
  const [recepie, setRecepie] = useState();
  const [select, setSelect] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [filtered, setFiltered] = useState("");

  let ref = useRef(null);

  useEffect(() => {
    const newData = async () => {
      const foodData = await newDataHere("fooddata");
      setFood(foodData);
      const recepieData = await newDataHere("RecepieData");
      setRecepie(recepieData);
      setLoading(false);
    };
    newData();
  }, []);

  if (loading) {
    return <CLoader />;
  }

  // open function for open actionsheet filter
  const onPress = () => {
    ref.current.show();
  };

  // close function for open actionsheet filter
  const onPressclose = () => {
    ref.current.hide();
  };

  // onPress function for go between food and recepie
  const onPressCategory = (item) => {
    setSelected(item.id);
  };

  // render food and recepie title date
  const renderCategory = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onPressCategory(item)}>
        <View
          style={[
            localStyles.categoryview,
            {
              backgroundColor:
                selected === item.id ? colors.green : colors.btncolor,
            },
          ]}
        >
          <CText
            type={"C22"}
            color={selected === item.id ? colors.textbg : colors.fontbody}
          >
            {item.title}
          </CText>
        </View>
      </TouchableOpacity>
    );
  };

  // render favourite food category
  const renderFavFood = ({ item }) => {
    return (
      <TouchableOpacity
        style={localStyles.allrenderview}
        onPress={() => handleOnpress(item)}
      >
        <Image
          source={{ uri: item.profileImage }}
          style={localStyles.burgerimage}
        />
        <CText type={"C20"} color={colors.fontbody} align={"center"}>
          {item.foodName}
        </CText>
      </TouchableOpacity>
    );
  };

  // render favourite recepie category
  const renderFavRecepie = ({ item }) => {
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
  // timer change for the different cooking time and filter new data
  const onPressTimer = async (id, time) => {
    setSelect(id);
    const minutes = parseInt(time);
    const filteredData = await recepie.filter((item) => {
      const minutes1 = parseInt(item.minutes);
      if (minutes1 < minutes) {
        return item;
      }
    });
    setFiltered(filteredData);
  };

  // Toggle funtion for select checkbox
  const toggleItemSelection = (id) => {
    const isSelected = selectedItems.includes(id);

    if (isSelected) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Render component for Category
  const renderCategorycousine = ({ item }) => {
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
  // onPress for go to the fav food description
  const handleOnpress = (item) => {
    navigation.navigate(StackNav.LikedFoodDesc, { item });
  };

  // onPress for go to the fav recepie description
  const handleRecepiePress = (item) => {
    navigation.navigate(StackNav.LikedRecepieDesc, { item });
  };

  // Empty food and recepie on press search
  const onPressSearch = () => {
    navigation.navigate(TabNav.SearchTab);
  };
  // Empty food list component
  const EmptyFavFood = () => {
    return (
      <View>
        <View style={localStyles.innerview}>
          <Image source={images.diet1} style={localStyles.dietimg} />
          <CText type={"C22"} color={colors.fonttile} align={"center"}>
            {CommonString.nofood}
          </CText>
          <CText
            type={"E17"}
            color={colors.fontbody}
            align={"center"}
            style={localStyles.foodtext}
          >
            {CommonString.nofooddesc}
          </CText>
        </View>
        <CButton name={CommonString.search} onPress={onPressSearch} />
      </View>
    );
  };

  // Empty recepie list component
  const EmptyFaVRecepie = () => {
    return (
      <View>
        <View style={localStyles.innerview}>
          <Image source={images.diet2} style={localStyles.dietimg} />
          <CText type={"C22"} color={colors.fonttile} align={"center"}>
            {CommonString.norecepie}
          </CText>
          <CText
            type={"E17"}
            color={colors.fontbody}
            align={"center"}
            style={localStyles.foodtext}
          >
            {CommonString.norecepiedesc}
          </CText>
        </View>
        <CButton name={CommonString.search} onPress={onPressSearch} />
      </View>
    );
  };
  return (
    <View style={localStyles.main}>
      <View>
        <CHeader
          title={selected === 1 ? CommonString.favourite : CommonString.recepie}
          type={"E15"}
          color={colors.fonttile}
          RighIcon={() => (
            <TouchableOpacity onPress={onPress}>
              {selected === 2 ? <Filter /> : null}
            </TouchableOpacity>
          )}
        />
        {/* FLalist for the 2 category data */}
        <FlatList
          data={FavouriteCategory}
          renderItem={renderCategory}
          horizontal
          style={localStyles.flatlist}
        />
      </View>
      {/* Swithch two category of food and recepie data FlatList */}
      {selected === 1 ? (
        <FlatList
          data={food}
          renderItem={renderFavFood}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          bounces={false}
          key={"_"}
          scrollEnabled={false}
          keyExtractor={(item) => "_" + item.id.toString()}
          contentContainerStyle={localStyles.renderdatasty}
          columnWrapperStyle={localStyles.rendercolumndata}
          ListEmptyComponent={EmptyFavFood}
        />
      ) : (
        <FlatList
          key={"#"}
          data={!!select ? filtered : recepie}
          renderItem={renderFavRecepie}
          keyExtractor={(item) => "#" + item.id.toString()}
          ListEmptyComponent={EmptyFaVRecepie}
        />
      )}
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
          <CText
            type={"C20"}
            color={colors.fonttile}
            style={localStyles.termstext}
          >
            {CommonString.cuisine}
          </CText>
          <FlatList
            data={FoodCategory}
            renderItem={renderCategorycousine}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ActionSheet>
    </View>
  );
};

export default LikeTab;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
    ...styles.justifyBetween,
  },
  innerview: {
    ...styles.mh15,
    gap: moderateScale(10),
    ...styles.justifyCenter,
    height: moderateScale(520),
  },
  flatlist: {
    ...styles.selfCenter,
  },
  categoryview: {
    height: moderateScale(64),
    width: moderateScale(156),
    ...styles.nonFlexCenter,
    borderRadius: moderateScale(16),
  },
  dietimg: {
    height: moderateScale(96),
    width: moderateScale(96),
    resizeMode: "contain",
    ...styles.selfCenter,
    ...styles.mt30,
  },
  foodtext: {
    ...styles.mh25,
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
    ...styles.ph20,
  },
  rendercolumndata: {
    ...styles.justifyBetween,
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
