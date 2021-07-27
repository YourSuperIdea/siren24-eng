import React, { useState, useEffect, useContext, useRef } from 'react';
import { RiderRegister } from '../components';
import { StyleSheet, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseContext } from 'common/src';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { language, FirebaseConfig } from "config";

export default function RegistrationPage(props) {
  const dispatch = useDispatch();  
  const { api } = useContext(FirebaseContext);
  const {    
    requestPhoneOtpDevice,
    mobileSignIn,
    clearLoginError
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
    if (auth.error && auth.error.msg && auth.error.msg.message !== language.not_logged_in) {
        Alert.alert(language.alert, auth.error.msg.message);
        dispatch(clearLoginError());
        setLoading(false);
    }
    if(auth.verificationId){
        // pageActive.current = false;
        setVerificationId(auth.verificationId)        
        setLoading(false);
    }
}, [auth.info,auth.error,auth.error.msg,auth.verificationId]);

  useEffect(() => {
    if (cars) {
      let arr = [];
      for (let i = 0; i < cars.length; i++) {
        arr.push({ label: cars[i].name, value: cars[i].name });
      }
      setCarTypes(arr);
    }
  }, [cars]);

  const requestOtp = async (mobile) => {
    setLoading(true);
    dispatch(requestPhoneOtpDevice(mobile, recaptchaVerifier.current));
  }

  const verifyOtp = async (otp) => {
    setLoading(true);
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
      <RiderRegister
        cars={carTypes}        
        onPressBack={() => { props.navigation.goBack() }}
        loading={loading}        
        requestOtp={requestOtp}
        verifyOtp={verifyOtp}
        verificationId={verificationId}
      />      
      :null}
    </View>
  );

}
const styles = StyleSheet.create({
  containerView: { flex: 1 },
  textContainer: { textAlign: "center" },
});
