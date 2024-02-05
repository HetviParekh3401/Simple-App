import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button, Alert} from 'react-native';

const Login = ({navigation}) => {
  const [userNameInput, setUserNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleLoginSubmit = () => {
    let credentialsList = [
      { userName: 'user1', password: 'password123' },
      { userName: 'user2', password: 'password123' },
      { userName: 'user3', password: 'password123' },
    ];
      
      if (userNameInput === "" || passwordInput === "") {
        Alert.alert("Please enter username and password");
      } else {
        let loginSuccess = false;
    
        credentialsList.forEach(credentials => {
          if (userNameInput == credentials.userName && passwordInput == credentials.password) {
            loginSuccess = true;
          }
        });
    
        if (loginSuccess) {
          navigation.navigate("Home")
          Alert.alert("Login Successful!");
        } else {
          Alert.alert("Login Failed");
        }
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          placeholder="Enter Email"
          onChangeText={e => setUserNameInput(e)}
        />
        <TextInput
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={e => setPasswordInput(e)}
        />
        <Button title="Login" onPress={() => handleLoginSubmit()} />
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Don't have an account? Registration</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
});

export default Login;
