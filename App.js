import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, } from 'react';
import { Fontisto } from '@expo/vector-icons'
import { Text, View, StyleSheet, ScrollView, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';

const { width:SCREEN_WIDTH } = Dimensions.get('window');
const W_API_KEY = "c667ccf0d48773ed49c892b3c4bd690c";
const A_API_KEY = "lohb4Yoxd0KuUMkH9vabdV2qW%2F2%2BQGKIm4MvfWcs7Vl%2BuObDQmsOLkK324sC%2By6LejU93nTySylLJjZBSi5eRQ%3D%3D"
const w_Icons = {
  "Clouds": "cloudy",
  "Rain": "rains",
  "Clear": "day-sunny",
  "Fog": "fog",
  "Thenderstorm": "lightnings",
  "Rainbow": "rainbow",
  "Drizzle": "wind",
  "Snow": "snowflake-8"
}
const a_Icons = {
  "1": "heart-eyes",
  "2": "smiling",
  "3": "dizzy",
  "4": "mad",
}

export default function App() {
   useEffect(() => {
    getWeather();
   }, [])
  
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [air, setAir] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setCity(location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&lang=kr&appid=${W_API_KEY}&units=metric`);
    const json = await response.json();
    setDays(json.daily);  
    console.log();  
    

    const A_response = await fetch(`http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=서울&pageNo=1&numOfRows=7&returnType=json&serviceKey=${A_API_KEY}&ver=1.0`)
    const a_json = await A_response.json();
    setAir(a_json.response.body.items);
  }

  const grade = () => {
      if (air[0].pm10Grade === "1") {
        return <Text>좋음</Text>;
      } else if (air[0].pm10Grade ==="2") {
        return <Text>보통</Text>;
      } else if (air[0].pm10Grade === "3") {
        return <Text>나쁨</Text>;
      } else if (air[0].pm10Grade === "4") {
        return <Text>매우 나쁨</Text>;
      }
      <Text>측정소 기기 점검</Text>
    }

  const toDayData = (d) => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = d.getMonth() + 1;
    
    return `${month}/${date} ${day}`
  }


  return (
    <View style={styles.container} >
      <ImageBackground style={styles.bgImage} source={parseInt(new Date().getHours()) >= 5 && parseInt(new Date().getHours()) <= 20 ? require('./assets/day.jpg') : require('./assets/night.jpg')} imageStyle={{resizeMode: 'cover' }} > 
      <StatusBar style="dark" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      
      {
        ok === false
          ? <Text>😢🤦‍♂️🤦‍♀️🤷‍♀️🤷‍♂️😭</Text>
          : (
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.weather}>
              {
                days.length === 0
                ? (<View style={{...styles.day, alignItems: "center"}}><ActivityIndicator color="white" size="large" /></View>)
                : (days.map((d, i) =>
                  <View key={i} style={styles.day}>
                    <Fontisto style={ styles.icon } name={w_Icons[d.weather[0].main]}/>
                    <View style={{paddingLeft: 10}}>      
                      <Text style={styles.temp}>{parseFloat(d.temp.day).toFixed(1)}°</Text>
                    </View>
                    <Text style={styles.des}>{d.weather[0].main}</Text>
                    <Text style={styles.newDay}>{ toDayData(new Date(d.dt * 1000)) }</Text>
                  </View>))
              }
            </ScrollView>
          )
      }

      {
        ok === false
          ? <Text>😢🤦‍♂️🤦‍♀️🤷‍♀️🤷‍♂️😭</Text>
          : (
            <View style={styles.weather}>
              {
                air.length === 0
                  ? (<View style={{ ...styles.day, alignItems: "center" }}><ActivityIndicator color="white" size="large" /></View>)
                  : ( 
                    <View  style={styles.day}>
                      <Fontisto style={styles.face} name={a_Icons[air[0].pm10Grade]}  />
                      <View>
                        <Text style={styles.airDes}>미세먼지: { grade() }</Text>
                      </View>
                      <Text style={styles.newDay}>{toDayData(new Date())}</Text>
                    </View>)
              }
            </View>
          )
      }
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "teal",
  },
  city: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    color: "#FFF",
    fontSize: 40,
    fontWeight: "700",
  },
  weather: {
    paddingBottom: 30,
    // backgroundColor: "tomato",
    justifyContent: "center",
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    color: "#FFF",
    marginTop: -10,
    fontSize: 70,
  },
  des: {
    color: "#FFF",
    marginTop: -10,
    fontSize: 40,
    paddingLeft: 10,
  },
  icon: {
    color: "#FFF",
    fontSize: 120,
  },
  face: {
    color: "#FFF",
    fontSize: 120,
    
  },
  airDes: {
    color: "#FFF",
    marginTop: 13,
    fontSize: 35,
    fontWeight: "700",
  },
  newDay: {
    fontSize: 20,
    color: "#FFF",
  },
  bgImage: {
    justifyContent: "center",
    width: '100%',
    height: '100%',
    opacity: 0.8,
  }
})