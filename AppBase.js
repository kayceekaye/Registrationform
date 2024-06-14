import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from './firebase/app/firebaseConfig.js';
import { setCurrentUser } from './app/slice/currentUserSlice';
import TodoScreen from './screens/TodoScreen';
import DetailScreen from './screens/DetailScreen';
import LoginScreen from './screens/auth_screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import HomeNavigator from './screens/HomeNavigator';
import AboutScreenDetails from './screens/AboutScreenDetails';
import UploadScreen from './screens/UploadScreen';

const Stack = createNativeStackNavigator();

export default function AppBase() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateReset = (name) => {
    navigation.reset({
      index: 0,
      routes: [{ name }],
    });
  };

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    let userId = await getData('CURRENT_USER_ID');
    console.log({ userId });
    if (!userId) {
      setTimeout(() => {
        navigateReset('login-screen');
      }, 1000);
      return;
    }
    const dbRef = database.ref();
    dbRef.child("users").child(userId).get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log('snapshot', snapshot.val());
          dispatch(setCurrentUser(snapshot.val()));
          setTimeout(() => {
            navigateReset('home');
          }, 1000);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
  };

  const getData = async (key) => {
    try {
      let data = await AsyncStorage.getItem(key);
      if (data !== null) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.log({ error });
      return null;
    }
  };

  return (
    <Stack.Navigator
      initialRouteName="splash-screen"
      screenOptions={{ cardStyle: { backgroundColor: '#F5F6FA' } }}
    >
      <Stack.Screen
        name="home"
        children={() => <HomeNavigator />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login-screen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="splash-screen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="about-screen-detail"
        component={AboutScreenDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TodoScreen"
        component={TodoScreen}
        options={{ title: 'Todo List' }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{ title: 'Detail Screen' }}
      />
      <Stack.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={{ title: 'Upload Screen' }}
      />
    </Stack.Navigator>
  );
}
