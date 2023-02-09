import React, { useState, useContext, useEffect } from 'react'
import { View, Text, Image, useWindowDimensions, StyleSheet, Button } from 'react-native'
import Inputs from '../../components/Inputs';
import axios from 'axios';
import { writePref, readPref } from '../../components/FileAccess';
import { useNavigation } from '@react-navigation/native';
import { WebSocketContext } from '../../components/WebSocketProvider';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [challstr, setChallstr] = useState('');

  const { socket, latest, } = useContext(WebSocketContext);
  useEffect(() => { //add listener to latest

    if (latest.includes('|formats|')){
        const string = latest
        let parts = string.split(/\|,\d+\|/);
        interface Result {
          [key: string]: { [key: string]: string };
        }
        
        let result: Result = {};
        
        for (let i = 1; i < parts.length; i++) {
          let formatArray = parts[i].split("|");
          let obj: { [key: string]: any; } = {};

          
          for (let j = 1; j < formatArray.length; j++) {
            let [key, value] = formatArray[j].split(",");
            obj[key] = value;
          }
          
          result[formatArray[0]] = obj;
        }
        
        writePref('formats.json', JSON.stringify(result));
    }
    if (latest.includes('|challstr|')) {
      const [, challenge] = latest.split('|challstr|');
      setChallstr(challenge);
    }



    if (username !== '') {
      console.log("LoginScreen: ", latest)
      if (latest.indexOf("|updateuser|") !== -1) {
        navigation.navigate('Root', { screen: 'Home' });
        const parts = latest.split('|');
        const serverString = parts[parts.length - 1];

        writePref('serverPrefs.json', serverString);
      } else if (latest.indexOf("|nametaken|") !== -1) {
        alert("signin failed");
      }
    }


  }, [latest]);
  const handleLogin = async () => {
    if (!socket) {
      return;
    }
    let response;
    if (password === '') { //if no password
      response = await axios.post(
        'https://play.pokemonshowdown.com/action.php',
        {
          act: 'getassertion',
          userid: username,
          pass: password,
          challstr,
        }
      );
      socket.send(`|/trn ${username},0,${response.data}`);
    } else { //if password
      response = await axios.post(
        'https://play.pokemonshowdown.com/action.php',
        {
          act: 'login',
          name: username,
          pass: password,
          challstr,

        }
      );
      const data = JSON.parse(response.data.slice(1));
      socket.send(`|/trn ${username},0,${data.assertion}`);
    }

  };
  return (
    <View style={styles.root}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain" />

      <Inputs
        placeholder="Username"
        value={username}
        setValue={setUsername}
        secureTextEntry={false}
      />
      <Inputs
        placeholder="Password (Optional)"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <Button title="Go to Home"
        onPress={() => { handleLogin(); }}
      />
    </View>
  )

}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    height: 100,
  }
});


export default LoginScreen