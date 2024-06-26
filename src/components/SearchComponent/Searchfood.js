// Library Imports
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../common/CHeader";
import { CommonString } from "../../i18n/String";
import CText from "../common/CText";
import { moderateScale } from "../../common/constants";
import { StackNav } from "../../navigation/NavigationKeys";

// Search food  component
const Searchfood = ({ navigation, route }) => {
  const { data } = route.params;

  // render component for food category
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={localStyles.allrenderview}
        onPress={() => handleOnpress(item)}
      >
        <Image
          source={{ uri: item.profileImage }}
          style={localStyles.burgerimage}
        />
        <CText type={"C20"} color={colors.fontbody}>
          {item.foodName}
        </CText>
      </TouchableOpacity>
    );
  };

  // onPress for go to the description page for fooditem
  const handleOnpress = (item) => {
    navigation.navigate(StackNav.LikedFoodDesc, { item });
  };
  return (
    <View style={localStyles.main}>
      <CHeader
        title={CommonString.foods}
        LeftIcon={true}
        type={"E15"}
        color={colors.fonttile}
      />
      {/* Flatlist for show the category of food */}
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        bounces={false}
        key={"_"}
        scrollEnabled={false}
        keyExtractor={(item) => "_" + item.id.toString()}
        contentContainerStyle={localStyles.renderdatasty}
        columnWrapperStyle={localStyles.rendercolumndata}
      />
    </View>
  );
};

export default Searchfood;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
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
});
