import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Text, View } from '../components/Themed';
import { writePref, readPref } from '../components/FileAccess';
import {
  Platform, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import { WebSocketContext, WebSocketProvider } from '../components/WebSocketProvider';
import { useNavigation } from '@react-navigation/native';


export default function OptionsScreen() {
  const [serverPref, setServerPref] = useState('');
  const [serverView, setServerView] = useState<ReactNode>('')
  const { messages } = useContext(WebSocketContext);
  messages.forEach((message) => { });

  const height =
    Platform.OS === 'android' && typeof StatusBar.currentHeight !== 'undefined'
      ? StatusBar.currentHeight
      : 0;

      useEffect(() => {
        console.log("loaded in server prefs!! :D")
        console.log(serverPref)
        if (serverPref) {
          const parsedServerPref = JSON.parse(serverPref);
          let serverViewElements = [];
          for (const [key, value] of Object.entries(parsedServerPref)) {
            serverViewElements.push(
              <View style={{ width: '100%', height: 50, padding: 10, justifyContent: 'space-between' }} key={key}>
                <Text style={{ fontSize: 15, width: '100%', textAlign: 'left' }}>{key}</Text>
                <Text style={{ fontSize: 15, width: '100%', textAlign: 'right' }}>{value as string+" "}</Text>
              </View>
            );
          }
          setServerView(serverViewElements);
        }
      }, [serverPref]);


if(serverPref === ''){
  async function get(){
    const exist = await readPref('serverPrefs.json')
    if(exist) setServerPref(exist)
  }
  get();
}
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={[styles.scrollView, { paddingTop: height + 10 }]} overScrollMode="never">
      <Text style={{ fontSize: 30, paddingTop: 20,fontWeight: 'bold'}}>Options</Text>
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/icon.png')}
          />
          <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 10 }}>
            <Text style={{ fontSize: 30 }}>KaraWSR</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold', paddingTop: 30 }}>Rating: 1430</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: 'white' }}>Register</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 20, paddingTop: 20 }}>Local Settings</Text>
        <View style={styles.innerContainer}>

        </View>
        <Text style={{ fontSize: 20, paddingTop: 20 }}>Sound Settings</Text>
        <View style={styles.innerContainer}>
          
        </View>
        <Text style={{ fontSize: 20, paddingTop: 20 }}>Chat Settings</Text>
        <View style={styles.innerContainer}>
          
        </View>
        <Text style={{ fontSize: 20, paddingTop: 20 }}>Server Settings</Text>
        {serverView}
        <View style={styles.innerContainer}>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 10,
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    padding: 10,
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    paddingHorizontal:20,
    borderRadius: 20,
    alignItems: 'center',
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
});


