import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/global';
import PageHeader from '../components/header/PageHeader';
const backgroundImg = require('../assets/4.jpg'); 

const AboutScreenDetails = ({ route }) => {
  const [params, setParams] = useState(route.params || {});

  useEffect(() => {
    if (route.params) {
      setParams(route.params);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageHeader title="About Screen Detail" />
      <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={[globalStyles.h100, globalStyles.alignCenter, globalStyles.justifyCenter, styles.content]}>
          <Text style={styles.title}>About Taekwondo</Text>
          <Text style={styles.subtitle}>Meaning of Taekwondo</Text>
          <Text style={styles.text}>
            Taekwondo is a Korean martial art that combines combat and self-defense techniques with sport and exercise. 
            The word "Taekwondo" is derived from the Korean words "Tae" (foot), "Kwon" (fist), and "Do" (way of life), 
            which translates to "the way of the foot and fist".
          </Text>
          <Text style={styles.subtitle}>The 5 Tenets of Taekwondo</Text>
          <View style={styles.tenetContainer}>
            <Text style={styles.tenetTitle}>1. Courtesy (예의, Ye-ui)</Text>
            <Text style={styles.tenetText}>
              Showing respect to others, behaving appropriately according to the situation, and having good manners.
            </Text>
          </View>
          <View style={styles.tenetContainer}>
            <Text style={styles.tenetTitle}>2. Integrity (염치, Yeom-chi)</Text>
            <Text style={styles.tenetText}>
              Being honest and having strong moral principles, standing up for what is right.
            </Text>
          </View>
          <View style={styles.tenetContainer}>
            <Text style={styles.tenetTitle}>3. Perseverance (인내, In-nae)</Text>
            <Text style={styles.tenetText}>
              Showing determination and persistence in achieving one's goals despite difficulties and challenges.
            </Text>
          </View>
          <View style={styles.tenetContainer}>
            <Text style={styles.tenetTitle}>4. Self-Control (극기, Geuk-gi)</Text>
            <Text style={styles.tenetText}>
              Having control over one's emotions, desires, and actions, especially in difficult situations.
            </Text>
          </View>
          <View style={styles.tenetContainer}>
            <Text style={styles.tenetTitle}>5. Indomitable Spirit (백절불굴, Baekjeol-bul-gul)</Text>
            <Text style={styles.tenetText}>
              Displaying courage and resilience, never giving up regardless of the obstacles.
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default AboutScreenDetails;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  tenetContainer: {
    marginBottom: 20,
  },
  tenetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  tenetText: {
    fontSize: 15,
    textAlign: 'center',
  },
});
