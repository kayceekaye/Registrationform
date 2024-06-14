import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const TodoListItem = ({ item, navigation, onDelete }) => {
  return (
    <View style={styles.listItem}>
      <Pressable onPress={() => navigation.navigate('DetailScreen', { member: item })} style={styles.itemContent}>
        <Text style={styles.todoText}>{item.name}</Text>
        <AntDesign name="right" size={16} color="#000" />
      </Pressable>
      <Pressable onPress={() => onDelete(item)} style={styles.deleteButton}>
        <MaterialIcons name="delete" size={24} color="red" />
      </Pressable>
    </View>
  );
};

export default TodoListItem;

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 2,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#54C7EC",
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    marginRight: 10,
  },
  deleteButton: {
    marginLeft: 10,
  }
});
