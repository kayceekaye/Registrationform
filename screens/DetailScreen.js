import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DetailScreen = ({ route, navigation }) => {
  const { member } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name: {member.name}</Text>
      <Text style={styles.label}>Age: {member.age}</Text>
      <Text style={styles.label}>Birthday: {member.birthday}</Text>
      <Text style={styles.label}>Gender: {member.gender}</Text>
      <Text style={styles.label}>Nationality: {member.nationality}</Text>
      <Text style={styles.label}>Height: {member.height} cm</Text>
      <Text style={styles.label}>Weight: {member.weight} kg</Text>
      <Button title="Back to Register" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});
