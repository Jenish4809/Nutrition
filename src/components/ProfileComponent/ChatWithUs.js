// Library Imports
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../common/CHeader";
import { CommonString } from "../../i18n/String";
import CText from "../common/CText";
import { moderateScale } from "../../common/constants";
import typography from "../../themes/typography";
import CButton from "../../components/common/CButton";
import { StackNav } from "../../navigation/NavigationKeys";
import { QueryBtn } from "../../api/constant";

// chat with help component
const ChatWithUs = ({ navigation }) => {
  const [select, setSelect] = useState(1);
  const [input, setInput] = useState("");
  const [loginUser, setLoginUser] = useState("");
  const [signUpUser, setSignUpUser] = useState("");

  const db = FIREBASE_DB;

  // onPress function for go to the email sent page and send query or feedback
  const onPressSent = () => {
    if (select === 1) {
      onPressSendQuery();
      setInput("");
    } else {
      onPressSendFeedback();
      setInput("");
    }
    navigation.navigate(StackNav.EmailSent);
  };

  // function for select query or feedback
  const onPressQuery = (id) => {
    setSelect(id);
  };

  // onChange text for the input field
  const onChangeInput = (text) => {
    setInput(text);
  };

  // useefect for get user details
  useEffect(() => {
    getUserDetail();
  }, []);

  // function for get userdetail for async storage
  const getUserDetail = async () => {
    const name = await AsyncStorage.getItem("users");
    const newData = JSON.parse(name);
    setSignUpUser(newData?.email);
    const login = await AsyncStorage.getItem("user");
    const newData1 = JSON.parse(login);
    setLoginUser(newData1?.email);
  };

  // onPress function for send query to the firestore database
  const onPressSendQuery = async () => {
    if (select === 1) {
      await addDoc(collection(db, "Query"), {
        Query: input,
        UserEmail: loginUser ? loginUser : signUpUser,
      });
    }
  };

  // onPress function fot send feedback to the firestore database
  const onPressSendFeedback = async () => {
    if (select === 2) {
      await addDoc(collection(db, "Feedback"), {
        Query: input,
        UserEmail: loginUser ? loginUser : signUpUser,
      });
    }
  };

  // render function for query button
  const renderBtn = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          localStyles.feedbackbtn,
          {
            backgroundColor:
              select === item.id ? colors.querybtn : colors.pwhite,
            borderColor: colors.querybtn,
          },
        ]}
        onPress={() => onPressQuery(item.id)}
      >
        <CText type={"E17"} color={colors.fontbody}>
          {item?.title}
        </CText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={localStyles.main}>
      <CHeader
        title={CommonString.chatus}
        LeftIcon={true}
        type={"E15"}
        color={colors.fonttile}
      />
      <View style={localStyles.innerview}>
        <View>
          <CText type={"C22"} color={colors.fonttile}>
            {CommonString.shootus}
          </CText>
          <CText type={"E17"} color={colors.fontbody}>
            {CommonString.writemail}
          </CText>
          <TextInput
            placeholder={CommonString.feedback}
            style={localStyles.inputsty}
            placeholderTextColor={colors.fontbody}
            value={input}
            onChangeText={onChangeInput}
            multiline={true}
            textAlignVertical="top"
          />
        </View>
        <FlatList
          data={QueryBtn}
          renderItem={renderBtn}
          horizontal
          extraData={select}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <CButton
        name={CommonString.send}
        extraSty={localStyles.sendbtn}
        onPress={onPressSent}
      />
    </View>
  );
};

export default ChatWithUs;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.mh20,
    ...styles.mt20,
    ...styles.flex,
    ...styles.itemsCenter,
  },
  inputsty: {
    height: moderateScale(316),
    backgroundColor: colors.pwhite,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(20),
    borderColor: colors.borders,
    ...styles.p20,
    ...styles.mv20,
    ...typography.fontSizes.f17,
    ...typography.fontWeights.ExtraBold,
  },
  feedbackbtn: {
    height: moderateScale(44),
    width: moderateScale(108),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(2),
    ...styles.nonFlexCenter,
    ...styles.m10,
  },
  querybtn: {
    backgroundColor: colors.textbg,
    borderColor: colors.borders,
    borderWidth: moderateScale(2),
  },
  querybtnview: {
    ...styles.flexcenterrow,
    gap: moderateScale(10),
    ...styles.selfCenter,
  },
  sendbtn: {
    ...styles.mv25,
  },
});
