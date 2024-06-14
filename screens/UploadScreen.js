import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Button, Avatar } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { database, storage } from '../firebase/app/firebaseConfig';
import { setCurrentUser } from '../app/slice/currentUserSlice';
import PageHeader from '../components/header/PageHeader';
import { globalStyles } from '../styles/global';
import TodoListItem from '../components/TodoListItem'; 

const UploadScreen = ({ route }) => {
  const { list = [] } = route.params || {};

  const [image, setImage] = useState(null);
  const [imageCurrentUser, setImageCurrentUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const currentUser = useSelector((state) => state.currentUser.value);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getCurrentUserPhoto();
  }, []);

  useEffect(() => {
    getCurrentUserPhoto();
  }, [currentUser]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.4,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadMedia = async () => {
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });
      const filename = image.substring(image.lastIndexOf('/') + 1);
      const ref = storage.ref().child(`images/${filename}`);

      await ref.put(blob).then((snapshot) => {
        console.log('Uploaded a blob or file!', filename);
        let userData = {
          ...currentUser,
          ...{
            avatar: filename,
          },
        };
        let updates = {};
        updates['users/' + currentUser.id] = userData;

        database.ref().update(updates, (completed) => {
          dispatch(setCurrentUser(userData));
        });
      });
      setUploading(false);
      Alert.alert('Photo Uploaded!!!');
      setImage(null);
    } catch (error) {
      console.log({ error });
      setUploading(false);
    }
  };

  const getCurrentUserPhoto = () => {
    storage.ref(`images/${currentUser.avatar}`).getDownloadURL().then((url) => {
      console.log({ url });
      setImageCurrentUser(url);
    }).catch((err) => {
      console.log({ err });
    });
  };

  const onDeleteFunction = (itemToDelete) => {
   
    const updatedList = list.filter(item => item.id !== itemToDelete.id);
   
  };

  const renderItem = ({ item }) => (
    <TodoListItem item={item} navigation={navigation} onDelete={onDeleteFunction} />
  );

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title={"Upload"} noBack />
      <View style={[globalStyles.alignCenter]}>
        <View style={[globalStyles.mt10, globalStyles.mb10, globalStyles.alignCenter]}>
          {imageCurrentUser &&
            <View>
              <Avatar.Image size={120} source={{ uri: imageCurrentUser }} />
            </View>
          }
          <Text style={[globalStyles.textCenter, globalStyles.fontWeightBold, { fontSize: 25 }]}>{currentUser.displayName}</Text>
          <Text style={[globalStyles.textCenter, { fontSize: 14 }]}>{currentUser.email}</Text>
        </View>
        <Button mode="contained" onPress={() => pickImage()}>
          Edit Avatar
        </Button>
        <View style={[globalStyles.mt10]}>
          {image &&
            <View>
              <Avatar.Image size={120} source={{ uri: image }} />
              <View style={[globalStyles.alignCenter, globalStyles.justifyCenter]}>
                <Button mode="contained" onPress={() => uploadMedia()}>Upload</Button>
              </View>
            </View>
          }
        </View>
        <View style={styles.todoListContainer}>
          <Text>Registered Members:</Text>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  todoListContainer: {
    marginTop: 20,
  },
});
