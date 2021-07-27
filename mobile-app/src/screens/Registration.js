import React, { useState, useEffect, useContext, useRef } from 'react';
import { Registration } from '../components';
import { StyleSheet, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseContext } from 'common/src';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { FirebaseConfig } from "config";

export default function RegistrationPage(props) {
  const dispatch = useDispatch();  
  const { api, authRef } = useContext(FirebaseContext);
  const {
    emailSignUp, 
    validateReferer,
    checkUserExists,
    requestPhoneOtpDevice,
    mobileSignIn
  } = api;
  const [loading, setLoading] = useState(false);
  const cars = useSelector(state => state.cartypes.cars);
  const [carTypes, setCarTypes] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const auth = useSelector(state => state.auth);

  useEffect(() => {    
    if(auth.info){
      props.navigation.navigate('AuthLoading');
      setLoading(false);
    }
    if(auth.verificationId){
        // pageActive.current = false;
        setVerificationId(auth.verificationId)        
        setLoading(false);
    }
  }, [auth.info, auth.verificationId]);

  useEffect(() => {
    if (cars) {
      let arr = [];
      for (let i = 0; i < cars.length; i++) {
        arr.push({ label: cars[i].name, value: cars[i].name });
      }
      setCarTypes(arr);
    }
  }, [cars]);

  const clickRegister = async (regData) => {
    

    // checkUserExists(regData).then((res)=>{
    //   if(res.users && res.users.length>0){
    //     setLoading(false);
    //     Alert.alert(language.alert,language.user_exists);
    //   }
    //   else if(res.error){
    //     setLoading(false);
    //     Alert.alert(language.alert,language.email_or_mobile_issue);
    //   }
    //   else{
    //     if (regData.referralId && regData.referralId.length > 0) {
    //       validateReferer(regData.referralId).then((referralInfo)=>{
    //         if (referralInfo.uid) {
    //           emailSignUp({...regData, signupViaReferral: referralInfo.uid}).then((res)=>{
    //             setLoading(false);
    //             if(res.uid){
    //               Alert.alert(language.alert,language.account_create_successfully);
    //               props.navigation.navigate('Login');
    //             }else{
    //               setCommonAlert({ open: true, msg: language.reg_error });
    //               Alert.alert(language.alert,language.reg_error);
    //             }
    //           })
    //         }else{
    //           setLoading(false);
    //           Alert.alert(language.alert,language.referer_not_found)
    //         }
    //       }).catch((error)=>{
    //         setLoading(false);
    //         Alert.alert(language.alert,language.referer_not_found)
    //       });
    //     } else {
    //       emailSignUp(regData).then((res)=>{
    //         setLoading(false);
    //         if(res.uid){
    //           Alert.alert(language.alert,language.account_create_successfully);
    //           props.navigation.navigate('Login');
    //         }else{
    //           setCommonAlert({ open: true, msg: language.reg_error });
    //           Alert.alert(language.alert,language.reg_error);
    //         }
    //       })
    //     }
    //   }
    // });
  }

  const requestOtp = async (mobile) => {
    setLoading(true);
    dispatch(requestPhoneOtpDevice(mobile, recaptchaVerifier.current));
  }

  const verifyOtp = async (otp) => {
    dispatch(mobileSignIn(                
      verificationId,
      otp
    ));
  }

  return (
    <View style={styles.containerView}>
      <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={FirebaseConfig}
          attemptInvisibleVerification={true}
      />
      {carTypes?
      <Registration
        cars={carTypes}
        onPressRegister={(regData) => clickRegister(regData)}
        onPressBack={() => { props.navigation.goBack() }}
        loading={loading}        
        requestOtp={requestOtp}
        verifyOtp={verifyOtp}
        verificationId={verificationId}
      >
      </Registration>
      :null}
    </View>
  );

}
const styles = StyleSheet.create({
  containerView: { flex: 1 },
  textContainer: { textAlign: "center" },
});
