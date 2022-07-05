import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, TouchableHighlight, Image, View, ImageBackground, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios';

const Display_weather_day = ({data}) => {
  console.log(data.name)
  return (
    <View>
      <Text>{data.name}</Text>
    </View>
  );
};

export default function App() {

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const api = {
    key: 'ed5eb972e49ba5f4f6f65fe0304879e8',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.dir(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [input, api.key]);

  return (
    <View style={styles.container}>

      <ImageBackground source={ require('./assets/background.jpg') } resizeMode='cover' style={styles.container}>

        <View style={styles.navbar}>
          <TextInput 
            placeholder='Enter City Name' 
            onChangeText={text=> setInput(text)}
            value={input}
            style={styles.textInput}
            onSubmitEditing={fetchDataHandler}
          />
        </View>

        <View style={styles.main}>
          {data && (<Display_weather_day data={data} />)}
        </View>

        <View style={styles.footer}>
        
        </View>

      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  navbar: {
    flex: 0.1,
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  main: {
    flex: 0.8,
    flexDirection: 'row',
  },

  footer: {
    flex:0.1,
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
  },

  weather_display: {
    flex: 1,
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    alignContent:'center',
    justifyContent: 'center',
  },

  weather_body: {
    flex: 0.3,
  },

  scroll: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textInput: {
    color: '#000',
    borderBottomWidth: 3,
    backgroundColor: '#fff',
    fontSize: 20,
    borderRadius: 16,
    paddingLeft: 10,
  },

});
