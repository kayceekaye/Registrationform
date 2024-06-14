import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput, RadioButton } from 'react-native-paper';
import { database } from '../firebase/app/firebaseConfig';
import { globalStyles } from '../styles/global';

const TodoScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('Male');
  const [nationality, setNationality] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    database.ref('todo').on('value', (snapshot) => {
      var dataArray = [];
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        dataArray.push(childData);
      });
      dataArray.reverse();
      setList(dataArray);
    }, err => {
      console.log({ err });
    });
  };

  const onAdd = () => {
    const id = new Date().getTime();
    database.ref('todo/' + id).set({
      id: id,
      name,
      age,
      birthday,
      gender,
      nationality,
      height,
      weight
    }).then(
      res => {
        setName('');
        setAge('');
        setBirthday('');
        setGender('Male');
        setNationality('');
        setHeight('');
        setWeight('');
      },
      err => {
        console.log({ err });
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={globalStyles.screenPadding}>
        <TextInput
          mode={'outlined'}
          label={'Name'}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          mode={'outlined'}
          label={'Age'}
          value={age}
          onChangeText={setAge}
          style={styles.input}
        />
        <TextInput
          mode={'outlined'}
          label={'Birthday'}
          value={birthday}
          onChangeText={setBirthday}
          style={styles.input}
        />
        <View style={styles.radioGroup}>
          <Text>Gender:</Text>
          <RadioButton.Group onValueChange={setGender} value={gender}>
            <RadioButton.Item label="Male" value="Male" />
            <RadioButton.Item label="Female" value="Female" />
          </RadioButton.Group>
        </View>
        <TextInput
          mode={'outlined'}
          label={'Nationality'}
          value={nationality}
          onChangeText={setNationality}
          style={styles.input}
        />
        <TextInput
          mode={'outlined'}
          label={'Height (cm)'}
          value={height}
          onChangeText={setHeight}
          style={styles.input}
        />
        <TextInput
          mode={'outlined'}
          label={'Weight (kg)'}
          value={weight}
          onChangeText={setWeight}
          style={styles.input}
        />
        <Button mode="contained" onPress={onAdd} style={styles.button}>
          Register
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate('UploadScreen', { list })} style={styles.button}>
          Go to Upload
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default TodoScreen;
