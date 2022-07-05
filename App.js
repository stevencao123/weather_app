import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableHighlight, Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const Display_weather_day = (props) => {
  return (
    <View>
      <TouchableHighlight onPress={() => console.log('Pressed')}>
        <Icon name='sunny' size={30} color='#fff' />
      </TouchableHighlight>
      <Text>The weather is {props.weather}</Text>
    </View>
  );
}

const SearchBar = (props) => {

}

export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.navbar}>
        <Text>This is the navbar</Text>
      </View>

      <View style={styles.main}>
        <View style={styles.weather_display}>
          <Text>This is the weather body</Text>
        </View>
        <View style={styles.weather_display}>
          <Text>This is the weather body</Text>
        </View>
        <View style={styles.weather_display}>
          <Text>This is the weather body</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>This is the footer</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },

  navbar: {
    flex: 0.1,
    backgroundColor: 'green',
  },

  main: {
    flex: 0.8,
    flexDirection: 'row',
    backgroundColor: 'yellow',
  },

  footer: {
    flex:0.1,
    backgroundColor: 'blue',
  },

  weather_display: {
    flex: 1,
    backgroundColor: 'red',
  }

});
