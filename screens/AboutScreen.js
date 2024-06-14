import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import { Button } from "react-native-paper";
import PageHeader from '../components/header/PageHeader';
const backgroundImg = require('../assets/3.jpg'); // Background image

const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title={"About"} noBack />
      <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
        <View style={[globalStyles.h100, globalStyles.alignCenter, globalStyles.justifyCenter, styles.content]}>
          <Text style={styles.title}>Taekwondo Registration Form</Text>
          <Text style={styles.text}>
            Join our Taekwondo program by filling out the registration form. Our program is designed for all age groups and skill levels.
            We provide professional training with experienced instructors to help you achieve your martial arts goals.
          </Text>
          <Text style={styles.text}>
            Developed by: KKYV
          </Text>
          <Text style={styles.text}>
            Contact: taekwondo@gmail.com
          </Text>
          <Text style={styles.text}>
            Just click more to know more about TAEKWONDO
          </Text>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('about-screen-detail', { sampleData: "hello" })}
          >
            More
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

export default AboutScreen;

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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});
