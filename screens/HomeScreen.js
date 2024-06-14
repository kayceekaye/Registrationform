import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImg = require('../assets/background.png'); 

const HomeScreen = () => {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.currentUser.value);

  const navigateReset = (name) => {
    navigation.reset({
      index: 0,
      routes: [{ name }],
    });
  };

  const logout = async () => {
    await storeData('CURRENT_USER_ID', '');
    navigateReset('login-screen');
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={backgroundImg} style={styles.background}>
        <View style={[globalStyles.h100, globalStyles.alignCenter, globalStyles.justifyCenter, styles.overlay]}>
          <Text style={styles.title}>Taekwondo Student Registration Form</Text>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('todo-screen')} 
            buttonColor="#0000FF" 
            textColor="#FFFFFF" 
          >
            Register
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FFFFFF', 
    textAlign: 'center',
  },
});
