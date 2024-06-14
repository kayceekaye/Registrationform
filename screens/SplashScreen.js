import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const backgroundImg = require('../assets/2..jpg'); 

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={backgroundImg} style={styles.background}>
        <View style={styles.overlay}>
          <Text style={styles.text}>TAEKWONDO REGISTRATION FORM</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', 
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
