import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import { moderateScale } from "../../common/constants";
import images from "../../assets/images";
import CText from "../../components/common/CText";
import { CommonString } from "../../i18n/String";
import CButton from "../../components/common/CButton";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import typography from "../../themes/typography";
import { AuthNav } from "../../navigation/NavigationKeys";
import * as ImagePicker from "expo-image-picker";

const UploadPhoto = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const imageOpen = () => {
    !image ? setOpen(true) : navigation.navigate(AuthNav.AllowNotification);
  };

  const onSkip = () => {
    navigation.navigate(AuthNav.AllowNotification);
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      alert(CommonString.erruploadimg + err);
    }
    setOpen(false);
  };

  const uploadImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      alert(CommonString.erruploadimg + err);
    }
    setOpen(false);
  };

  return (
    <View style={localStyles.main}>
      <View style={localStyles.innerview}>
        <Image source={images.logotextcolor} style={localStyles.logo} />
        <CText type={"C22"} color={colors.fonttile}>
          {!image ? CommonString.photoupload : CommonString.uploaded}
        </CText>
        <CText type={"E17"} color={colors.fontbody}>
          {!image ? CommonString.uploaddesc : CommonString.uploadeddesc}
        </CText>
        <View style={localStyles.pageview}>
          <Image
            source={!image ? images.uploadphoto : { uri: image }}
            style={localStyles.uploadphoto}
          />
        </View>
        <Modal visible={open} transparent={true} animationType="fade">
          <View style={localStyles.centerview}>
            <View style={localStyles.innerview1}>
              <Text style={localStyles.choose}>Choose Photo</Text>
              <View style={localStyles.photos}>
                <Entypo
                  name="camera"
                  style={localStyles.galleryicon}
                  onPress={uploadImage}
                />
                <MaterialIcons
                  name="add-to-photos"
                  style={localStyles.galleryicon}
                  onPress={pickImage}
                />
              </View>
              <CButton
                name={"Close"}
                extraSty={localStyles.closebtn}
                onPress={() => setOpen(false)}
              />
            </View>
          </View>
        </Modal>
        <View style={localStyles.btnview}>
          <CButton
            name={!image ? CommonString.photoupload : CommonString.continue}
            onPress={imageOpen}
          />
          <TouchableOpacity onPress={onSkip}>
            {!image ? (
              <CText type={"K17"} color={colors.green} align={"center"}>
                {CommonString.skip}
              </CText>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

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
  uploadphoto: {
    height: moderateScale(280),
    width: moderateScale(280),
    resizeMode: "contain",
    ...styles.selfCenter,
  },

  pageview: {
    ...styles.flexCenter,
  },
  btnview: {
    gap: moderateScale(20),
    ...styles.mv30,
  },
  centerview: {
    ...styles.flexCenter,
    ...styles.mt15,
  },
  innerview1: {
    backgroundColor: colors.btncolor,
    ...styles.p30,
    borderRadius: moderateScale(20),
    elevation: moderateScale(10),
  },
  photos: {
    ...styles.flexRow,
  },
  galleryicon: {
    ...typography.fontSizes.f35,
    margin: moderateScale(35),
  },
  choose: {
    ...typography.fontSizes.f20,
    ...styles.selfCenter,
    ...typography.fontWeights.CoiniRegular,
  },
  closebtn: {
    width: moderateScale(200),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
});
