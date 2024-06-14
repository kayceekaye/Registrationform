import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Pressable, View } from 'react-native';
import { globalStyles } from '../styles/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import TodoScreen from './TodoScreen';
import UploadScreen from './UploadScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const LogoutScreen = () => {
  const navigation = useNavigation();

  const logout = async () => {
    await AsyncStorage.setItem("CURRENT_USER_ID", "");
    navigation.reset({
      index: 0,
      routes: [{ name: 'login-screen' }],
    });
  };

  return (
    <View style={[globalStyles.h100, globalStyles.alignCenter, globalStyles.justifyCenter]}>
      <Text style={[globalStyles.defaultFontFamily, { fontSize: 16, marginBottom: 20 }]}>Are you sure you want to log out?</Text>
      <Pressable
        onPress={logout}
        style={{
          backgroundColor: '#FF0000',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Log-out</Text>
      </Pressable>
    </View>
  );
};

export default function HomeNavigator() {
  const CustomTabButton = (props) => (
    <Pressable
      {...props}
      style={
        props.accessibilityState.selected
          ? [props.style, { borderTopColor: '#FF0000', borderTopWidth: 2 }] 
          : props.style
      }
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'home-screen') {
              iconName = "home";
            } else if (route.name === 'todo-screen') {
              iconName = "format-list-bulleted";
            } else if (route.name === 'about-screen') {
              iconName = "information";
            } else if (route.name === 'upload-screen') {
              iconName = "cloud-upload"; 
            } else if (route.name === 'logout-screen') {
              iconName = "logout"; 
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0000FF', 
          tabBarInactiveTintColor: '#808080', 
          tabBarStyle: { 
            height: 70, 
            width: '94%', 
            backgroundColor: '#000000', 
            marginHorizontal: '3%', 
            marginBottom: 10, 
            borderRadius: 100 
          },
          tabBarItemStyle: { paddingVertical: 10 },
          tabBarButton: CustomTabButton,
          tabBarLabel: ({ focused, color }) => {
            let text;
            if (route.name === 'home-screen') {
              text = 'Home';
            } else if (route.name === 'todo-screen') {
              text = 'Todo';
            } else if (route.name === 'about-screen') {
              text = 'About';
            } else if (route.name === 'upload-screen') {
              text = 'Upload';
            } else if (route.name === 'logout-screen') {
              text = 'Logout';
            }

            return <Text style={[
              globalStyles.defaultFontFamily,
              { fontSize: 12, color: color }]}>
              {text}
            </Text>
          }
        })}
      >
        <Tab.Screen
          name="home-screen"
          component={HomeScreen}
          options={{ title: 'Home', unmountOnBlur: true }}
        />
        <Tab.Screen
          name="todo-screen"
          component={TodoScreen}
          options={{ title: 'Todo', unmountOnBlur: true }} 
        />
        <Tab.Screen
          name="upload-screen"
          component={UploadScreen}
          options={{ title: 'Upload', unmountOnBlur: true }} 
        />
        <Tab.Screen
          name="about-screen"
          component={AboutScreen}
          options={{ title: 'About', unmountOnBlur: true }}
        />
        <Tab.Screen
          name="logout-screen"
          component={LogoutScreen}
          options={{ title: 'Logout', unmountOnBlur: true }} 
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
