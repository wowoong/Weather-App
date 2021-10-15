import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


const weatherOptions = {
  Haze: {
    iconName: "weather-hazy",
    gradient: ["#114357", "#f29492"]
  },
  thunderstorm: {
    iconName: "weather-lightning-rainy",
    gradient: ["#fc354c", "#0abfbc"]
  },
  Drizzle: {
    iconName: "weather-hail",
    gradient: ["#ffeeee", "#ddefbb"]
  },
  Rain: {
    iconName: "weather-rainy",
    gradient: ["#00467f", "#a5cc82"]
  },
  Snow: {
    iconName: "weather-snowy-heavy",
    gradient: ["#136a8a", "#267871"]
  },
  Atmosphere: {
    iconName: "weather-fog",
    gradient: ["#5d4157", "#a8caba"]
  },
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#c2e59c", "#64b3f4"]
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#485563", "#29323c"],
    title: "cloudy day",
    subtitle: "is very cloudy"
  }
}



export default function Weather({temp, condition}){
  return (
    <LinearGradient
      colors={weatherOptions[condition].gradient}
      style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons name={weatherOptions[condition].iconName} size={96} color="white" />
        <Text style={styles.temp}>{temp}°</Text>
      </View>
      <View style={{...styles.halfContainer, ...styles.textContainer}}>
        <Text style={styles.title}>{weatherOptions[condition].title}</Text>
        <Text style={styles.subtitle}>{weatherOptions[condition].subtitle}</Text>
      </View>
    </LinearGradient>
  );
}
  

Weather.PropTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf(["thunderstorm","Drizzle", "Rain", "Snow", "Atmosphere", "Clear", "Haze", "Clouds"]).isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  temp: {
    fontSize: 42,
    color: "white"
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 44,
    fontWeight: "300",
    marginBottom: 10
  },
  subtitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 24,
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: "flex-start"
  }
})