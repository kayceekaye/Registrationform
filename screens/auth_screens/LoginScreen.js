import { Alert, Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/global.js';
import { TextInput, Card, Button } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from "../../firebase/app/firebaseConfig.js";
import { setCurrentUser } from '../../app/slice/currentUserSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigation = useNavigation();

  const navigateReset = (name) => {
    navigation.reset({
      index: 0,
      routes: [{ name }],
    });
  };

  const login = () => {
    setLoading(true);
    auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        const dbRef = database.ref();
        dbRef.child("users").child(res.user.uid).get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              storeData('CURRENT_USER_ID', res.user.uid);
              dispatch(setCurrentUser(snapshot.val()));
              navigateReset('home');
            } else {
              console.log("No data available");
            }
            setLoading(false);
          }).catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }).catch(err => {
        console.log({ errFirebase: err.message, code: err.code });
        Alert.alert('Login Error', err.message);
        setLoading(false);
      });
  };

  const register = () => {
    setLoading(true);
    auth.createUserWithEmailAndPassword(emailReg, passwordReg)
      .then(res => {
        const userId = res.user.uid;
        database.ref('users/' + userId).set({ id: userId, email: emailReg, displayName })
          .then(() => {
            setDisplayName("");
            setEmailReg("");
            setPasswordReg("");
            Alert.alert('Register', "You have been successfully registered.");
            setLoading(false);
          }).catch((err) => {
            console.log({ err });
            setLoading(false);
          });
      }).catch(err => {
        console.log({ errFirebase: err.message, code: err.code });
        Alert.alert('Registration Error', err.message);
        setLoading(false);
      });
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error('Saving error', e);
    }
  };

  const renderTextInput = (label, value, onChangeText, secureTextEntry = false) => (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode='outlined'
      dense={true}
      secureTextEntry={secureTextEntry && !showPassword}
      style={[globalStyles.mb10, globalStyles.mt10]}
    />
  );

  const renderPasswordInput = (label, value, onChangeText) => (
    <View>
      {renderTextInput(label, value, onChangeText, true)}
      <Pressable style={{ position: 'absolute', right: 4, top: 12 }} onPress={() => setShowPassword(!showPassword)}>
        <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={30} color={'#000'} />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[
        globalStyles.pa20,
        globalStyles.alignCenter,
        globalStyles.justifyCenter,
        globalStyles.primaryColor,
        { flexGrow: 1 }]
      }>
        <Card mode='elevated' elevation={3} style={[globalStyles.w100, { backgroundColor: '#fff' }]}>
          <Card.Content>
            <Text style={[globalStyles.textCenter, globalStyles.fontWeightBold, { fontSize: 40 }]}>LOGIN PAGE</Text>
            {renderTextInput("Email", email, setEmail)}
            {renderPasswordInput("Password", password, setPassword)}
            <View style={[globalStyles.mt10]}>
              <Button icon="login" mode="contained" onPress={() => login()} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : "Login"}
              </Button>
            </View>
          </Card.Content>
        </Card>
        <View style={[globalStyles.mt10]}>
          <Button icon="account-plus" mode="contained" onPress={() => setShowRegister(!showRegister)}>
            {showRegister ? "Close Registration" : "Register here"}
          </Button>
        </View>
        {showRegister && (
          <Card mode='elevated' elevation={3} style={[globalStyles.w100, { backgroundColor: '#fff', marginTop: 20 }]}>
            <Card.Content>
              <Text style={[globalStyles.textCenter, globalStyles.fontWeightBold, { fontSize: 40 }]}>REGISTER</Text>
              {renderTextInput("Email", emailReg, setEmailReg)}
              {renderTextInput("Display Name", displayName, setDisplayName)}
              {renderPasswordInput("Password", passwordReg, setPasswordReg)}
              <View style={[globalStyles.mt10]}>
                <Button icon="account-plus" mode="contained" onPress={() => register()} disabled={loading}>
                  {loading ? <ActivityIndicator color="#fff" /> : "Register"}
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({});
