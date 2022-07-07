import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, ActivityIndicator, Image, View, ImageBackground, TextInput } from 'react-native';
import axios from 'axios';

export default function App() {

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(false);
  const [bgImage, setBg] = useState('clouds');

  const api = {
    key: 'ed5eb972e49ba5f4f6f65fe0304879e8',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setDisplay(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then(res => {
        console.log(res.data);
        setData(res.data);
        console.log(res.data?.weather?.[0].main)
        switch(res.data?.weather?.[0].main){
          case 'Clear':
            setBg('sunny');
            console.log('sunny')
            break;
          case 'Snow':
            setBg('snow');
            break;
          case 'Rain':
            setBg('rain');
            break;
          case 'Drizzle':
            setBg('drizzle');
            break;
          case 'Thunderstorm':
            setBg('thunder');
            break;
          default:
            setBg('clouds');
        }
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

      <ImageBackground source={ require(`./assets/${bgImage}.jpg`) } resizeMode='cover' style={styles.container}>

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
          {!display && (
            <View style={styles.weather_display}>
              <Text style={styles.title}>Welcome</Text>
            </View>
          )}
          {loading && (
            <View style={styles.weather_display}>
              <ActivityIndicator size={'large'} color={'#fff'} />
            </View>
          )}
          {!loading && display && (
            <View style={styles.weather_display}>
              <Text style={styles.title}>{`${data?.name}, ${data?.sys?.country}`}</Text>
              <Image style={styles.image} source={{uri: `http://openweathermap.org/img/wn/${data?.weather?.[0].icon}@2x.png`}} />
              <Text style={styles.text}>{new Date().toLocaleString(data?.main?.temp)}</Text>
              <Text style={styles.text}>{`${Math.round(data?.main?.temp,)} °C`}</Text>
              <Text style={styles.text}>{`Min ${Math.round(data?.main?.temp_min,)} °C / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
            </View>
          )}
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
    //backgroundColor: 'rgba(0, 255, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  main: {
    flex: 0.8,
    flexDirection: 'row',
  },

  footer: {
    flex:0.1,
    //backgroundColor: 'rgba(0, 0, 255, 0.2)',
  },

  weather_display: {
    flex: 1,
    //backgroundColor: 'rgba(255, 0, 0, 0.2)',
    alignContent:'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
  },

  weather_body: {
    flex: 0.3,
  },

  textInput: {
    color: '#000',
    borderBottomWidth: 3,
    backgroundColor: '#fff',
    fontSize: 20,
    borderRadius: 16,
    paddingLeft: 10,
  },

  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    textShadowColor:'#000',
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10,
  },

  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor:'#000',
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10,
  },

  image: {
    alignSelf:'center',
    justifyContent: 'center',
    textAlign: 'center',
    height:50,
    width: 50,
  },

});
