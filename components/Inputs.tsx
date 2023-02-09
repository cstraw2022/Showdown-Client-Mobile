import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'


interface InputProps {
    value: string;
    setValue: (text: string) => void;
    placeholder: string;
    secureTextEntry:boolean;
  }
  
  const Inputs = ({value, setValue, placeholder,secureTextEntry}: InputProps) => {
      return(
        <View style={styles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder} 
            style={styles.input}
            secureTextEntry={secureTextEntry}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width: '100%',

        borderColor:'#e7e7e7',
        borderWidth:1,
        borderRadius:5,

        paddingHorizontal:10,
        marginVertical:5,
    },
    input: {
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
    },
})
export default Inputs