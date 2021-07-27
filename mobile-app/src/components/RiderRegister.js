import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from "react-native";
import Background from "./Background";
import { Icon, Button, Header, Input } from "react-native-elements";
import { colors } from "../common/theme";
var { height } = Dimensions.get("window");
import { language, countries, default_country_code, features } from "config";
import RNPickerSelect from "react-native-picker-select";

export default function Registration(props) {
  const [state, setState] = useState({
    usertype: "rider",    
    otp: ""
    // referralId: "",    
  });

  const [countryCode, setCountryCode] = useState(
    "+" + default_country_code.phone
  );
  const [mobileWithoutCountry, setMobileWithoutCountry] = useState("");

  const formatCountries = () => {
    let arr = [];
    for (let i = 0; i < countries.length; i++) {
      arr.push({
        label: countries[i].label + " (+" + countries[i].phone + ")",
        value: "+" + countries[i].phone,
        key: countries[i].code,
      });
    }
    return arr;
  };

  validateMobile = () => {
    let mobileValid = true;
    if (mobileWithoutCountry.length < 6) {
      mobileValid = false;
      Alert.alert(language.alert, language.mobile_no_blank_error);
    }
    return mobileValid;
  };

  requestOtp = () => {
    const { requestOtp } = props;    
    if (validateMobile()) {
      requestOtp(state.mobile);
    }
  }
  verifyOtp = () => {
    const { verifyOtp } = props;    
    if (validateMobile()) {
      verifyOtp(state.otp);
    }
  }

  return (
    <Background>      
      <Header
        backgroundColor={colors.TRANSPARENT}
        leftComponent={{
          icon: "ios-arrow-back",
          type: "ionicon",
          color: colors.WHITE,
          size: 35,
          component: TouchableWithoutFeedback,
          onPress: props.onPressBack,
        }}
        containerStyle={styles.headerContainerStyle}
        innerContainerStyles={styles.headerInnerContainer}
      />
      <ScrollView
        style={styles.scrollViewStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logo}>
          <Image source={require("../../assets/images/logo165x90white.png")} />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "padding"}
          style={styles.form}
        >
          <View style={styles.containerStyle}>
            <Text style={styles.headerStyle}>
              {language.registration_title}
            </Text>            
            <View
              style={[styles.textInputContainerStyle, { marginBottom: 10 }]}
            >
              <Icon
                name="mobile-phone"
                type="font-awesome"
                color={colors.WHITE}
                size={36}
                containerStyle={[styles.iconContainer, { marginTop: 10 }]}
              />
              <RNPickerSelect
                placeholder={{
                  label: language.select_country,
                  value: language.select_country,
                }}
                value={countryCode}
                useNativeAndroidPickerStyle={true}
                style={{
                  inputIOS: styles.pickerStyle,
                  inputAndroid: styles.pickerStyle,
                }}
                onValueChange={(text) => {
                  setCountryCode(text);
                  let formattedNum = mobileWithoutCountry.replace(/ /g, "");
                  formattedNum = text + formattedNum.replace(/-/g, "");
                  setState({ ...state, mobile: formattedNum });
                }}
                items={formatCountries()}
                disabled={features.AllowCountrySelection ? false : true}
              />
            </View>
            <View style={styles.textInputContainerStyle}>
              <Icon
                name="mobile-phone"
                type="font-awesome"
                color={colors.WHITE}
                size={36}
                containerStyle={styles.iconContainer}
              />
              <Input
                underlineColorAndroid={colors.TRANSPARENT}
                placeholder={language.mobile_no_placeholder}
                placeholderTextColor={colors.WHITE}
                value={mobileWithoutCountry}
                keyboardType={"number-pad"}
                inputStyle={styles.inputTextStyle}
                onChangeText={(text) => {
                  setMobileWithoutCountry(text);
                  let formattedNum = text.replace(/ /g, "");
                  formattedNum = countryCode + formattedNum.replace(/-/g, "");
                  setState({ ...state, mobile: formattedNum });
                }}
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={styles.textInputStyle}
              />
            </View>
            {
              props.verificationId !== null &&
              <View style={styles.textInputContainerStyle}>
                <Icon
                  name="lock"
                  type="font-awesome"
                  color={colors.WHITE}
                  size={24}
                  containerStyle={styles.iconContainer}
                />
                <Input
                  editable={true}
                  underlineColorAndroid={colors.TRANSPARENT}
                  placeholder="OTP"
                  placeholderTextColor={colors.WHITE}
                  value={state.otp}
                  inputStyle={styles.inputTextStyle}
                  onChangeText={(text) => {
                    setState({ ...state, otp: text });
                  }}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.textInputStyle}
                  keyboardType="phone-pad"
                  secureTextEntry={true}
                />
              </View>
            }                    
            <View style={styles.buttonContainer}>
              <Button
                onPress={props.verificationId ? verifyOtp : requestOtp}
                title={props.verificationId ? language.register_button : "Continue"}
                loading={props.loading}
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.registerButton}
              />
            </View>
            <View style={styles.gapView} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Background>
  );
}

const styles = {
  headerContainerStyle: {
    backgroundColor: colors.TRANSPARENT,
    borderBottomWidth: 0,
    marginTop: 0,
  },
  headerInnerContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.WHITE,
  },
  textInputStyle: {
    marginLeft: 10,
  },
  iconContainer: {
    paddingBottom: 20,
  },
  gapView: {
    height: 40,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 40,
  },
  registerButton: {
    backgroundColor: colors.SKY,
    width: 180,
    height: 50,
    borderColor: colors.TRANSPARENT,
    borderWidth: 0,
    marginTop: 30,
    borderRadius: 15,
  },
  buttonTitle: {
    fontSize: 16,
  },
  pickerStyle: {
    color: "white",
    width: 200,
    fontSize: 15,
    height: 40,
    marginLeft: Platform.OS == "ios" ? 20 : 10,
    marginTop: Platform.OS == "ios" ? 0 : 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.WHITE,
  },
  inputTextStyle: {
    color: colors.WHITE,
    fontSize: 13,
    marginLeft: 0,
    height: 32,
  },
  errorMessageStyle: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 0,
  },
  containerStyle: {
    flexDirection: "column",
    marginTop: 20,
  },
  form: {
    flex: 1,
  },
  logo: {
    width: "100%",
    justifyContent: "flex-start",
    marginTop: 10,
    alignItems: "center",
  },
  scrollViewStyle: {
    height: height,
  },
  textInputContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  headerStyle: {
    fontSize: 18,
    color: colors.WHITE,
    textAlign: "center",
    flexDirection: "row",
    marginTop: 0,
  },

  capturePhoto: {
    width: "80%",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 15,
    paddingBottom: 10,
    marginTop: 15,
  },
  capturePhotoTitle: {
    color: colors.BLACK,
    fontSize: 14,
    textAlign: "center",
    paddingBottom: 15,
  },
  errorPhotoTitle: {
    color: colors.RED.primary,
    fontSize: 13,
    textAlign: "center",
    paddingBottom: 15,
  },
  photoResult: {
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 15,
    paddingBottom: 10,
    marginTop: 15,
    width: "80%",
    height: height / 4,
  },
  imagePosition: {
    position: "relative",
  },
  photoClick: {
    paddingRight: 48,
    position: "absolute",
    zIndex: 1,
    marginTop: 18,
    alignSelf: "flex-end",
  },
  capturePicClick: {
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    position: "relative",
    zIndex: 1,
  },
  imageStyle: {
    width: 30,
    height: height / 15,
  },
  flexView1: {
    flex: 12,
  },
  imageFixStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle2: {
    width: 150,
    height: height / 15,
  },
  myView: {
    flex: 2,
    height: 50,
    width: 1,
    alignItems: "center",
  },
  myView1: {
    height: height / 18,
    width: 1.5,
    backgroundColor: colors.GREY.btnSecondary,
    alignItems: "center",
    marginTop: 10,
  },
  myView2: {
    flex: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  myView3: {
    flex: 2.2,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: colors.GREY.btnPrimary,
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
};




{/* <View style={styles.textInputContainerStyle}>
        <Icon
        name="user"
        type="font-awesome"
        color={colors.WHITE}
        size={24}
        containerStyle={styles.iconContainer}
        />
        <Input
        editable={true}
        underlineColorAndroid={colors.TRANSPARENT}
        placeholder={language.first_name_placeholder}
        placeholderTextColor={colors.WHITE}
        value={state.firstName}
        keyboardType={"email-address"}
        inputStyle={styles.inputTextStyle}
        onChangeText={(text) => {
            setState({ ...state, firstName: text });
        }}
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={styles.textInputStyle}
        />
    </View>
    <View style={styles.textInputContainerStyle}>
        <Icon
        name="user"
        type="font-awesome"
        color={colors.WHITE}
        size={24}
        containerStyle={styles.iconContainer}
        />
        <Input
        editable={true}
        underlineColorAndroid={colors.TRANSPARENT}
        placeholder={language.last_name_placeholder}
        placeholderTextColor={colors.WHITE}
        value={state.lastName}
        keyboardType={"email-address"}
        inputStyle={styles.inputTextStyle}
        onChangeText={(text) => {
            setState({ ...state, lastName: text });
        }}
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={styles.textInputStyle}
        />
    </View>
    <View style={styles.textInputContainerStyle}>
        <Icon
        name="envelope-o"
        type="font-awesome"
        color={colors.WHITE}
        size={18}
        containerStyle={styles.iconContainer}
        />
        <Input
        underlineColorAndroid={colors.TRANSPARENT}
        placeholder={language.email_placeholder}
        placeholderTextColor={colors.WHITE}
        value={state.email}
        keyboardType={"email-address"}
        inputStyle={styles.inputTextStyle}
        onChangeText={(text) => {
            setState({ ...state, email: text });
        }}
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={styles.textInputStyle}
        />
    </View>
    <View style={styles.textInputContainerStyle}>
        <Icon
        name="lock"
        type="font-awesome"
        color={colors.WHITE}
        size={24}
        containerStyle={styles.iconContainer}
        />
        <Input
        underlineColorAndroid={colors.TRANSPARENT}
        placeholder={language.password_placeholder}
        placeholderTextColor={colors.WHITE}
        value={state.password}
        inputStyle={styles.inputTextStyle}
        onChangeText={(text) => setState({ ...state, password: text })}
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={styles.textInputStyle}
        secureTextEntry={true}
        />
    </View>
    <View style={styles.textInputContainerStyle}>
        <Icon
        name="lock"
        type="font-awesome"
        color={colors.WHITE}
        size={24}
        containerStyle={styles.iconContainer}
        />
        <Input
        underlineColorAndroid={colors.TRANSPARENT}
        placeholder={language.confrim_password_placeholder}
        placeholderTextColor={colors.WHITE}
        value={confirmpassword}
        inputStyle={styles.inputTextStyle}
        onChangeText={(text) => setConfirmPassword(text)}
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={styles.textInputStyle}
        secureTextEntry={true}
        />
    </View> 
*/}
{/* <View style={styles.textInputContainerStyle}>
        <Icon
        name="lock"
        type="font-awesome"
        color={colors.WHITE}
        size={24}
        containerStyle={styles.iconContainer}
        />
        <Input
        editable={true}
        underlineColorAndroid={colors.TRANSPARENT}
        placeholder={language.referral_id_placeholder}
        placeholderTextColor={colors.WHITE}
        value={state.referralId}
        inputStyle={styles.inputTextStyle}
        onChangeText={(text) => {
            setState({ ...state, referralId: text });
        }}
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={styles.textInputStyle}
        />
    </View>
    <View style={styles.textInputContainerStyle}>
        <Icon
        name="user"
        type="font-awesome"
        color={colors.WHITE}
        size={24}
        containerStyle={[styles.iconContainer, { paddingTop: 15 }]}
        />
        <Text
        style={{ marginLeft: 20, marginTop: 0, color: colors.WHITE }}
        >
        {language.register_your_ambulance}
        </Text>
        <RadioForm
        radio_props={radio_props}
        initial={role}
        formHorizontal={true}
        labelHorizontal={true}
        buttonColor={colors.WHITE}
        labelColor={colors.WHITE}
        style={{ marginLeft: 10 }}
        labelStyle={{ marginRight: 20 }}
        selectedButtonColor={colors.WHITE}
        selectedLabelColor={colors.WHITE}
        onPress={(value) => {
            setRole(value);
            setUserType(value);
        }}
        />
    </View> 
*/}
