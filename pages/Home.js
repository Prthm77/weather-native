import React from "react";
import { useState, useCallback } from "react/cjs/react.development";

import { StatusBar } from "expo-status-bar";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import {debounce} from 'lodash'
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
function Home() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather ,setWeather] = useState({});

  const handlelocation = (loc) => {
    console.log("location : ", loc);
    setLocations([]);
    toggleSearch(false);
    fetchWeatherForecast({
        cityName: loc.name,
        days :'7'
    }).then(data=> {
        setWeather(data)
        console.log('get data: ' , data)
    })
  };

  const handleSearch = (value) => {
    if(value.length>2) {
        fetchLocations({cityName : value}).then(data => {
            setLocations(data)
        })
    }
  
 
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200) , []);

  const {current ,location} = weather;

  return (
    <View className="flex-1 relative">
      <StatusBar style="auto" />

      <SafeAreaView className="flex flex-1">
        <View style={{ height: "7%" }} className="mx-4 relative z-50">
          <View className="flex-row justify-end items-center bg-slate-400  rounded-full">
            {showSearch ? (
              <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Search City"
                placeholderTextColor="white"
                className="pl-6 h-10 flex-1 text-base text-white"
              />
            ) : null}

            <TouchableOpacity
              style={{ backgroundColor: "white" }}
              onPress={() => toggleSearch(!showSearch)}
              className="rounded-full p-3 m-1"
            >
              <MagnifyingGlassIcon size="25" color="grey" />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <View className="absolute w-full bg-slate-400 top-16 rounded-3xl">
              {locations.map((loc, index) => {
                let showBorder = index + 1 != locations.length;
                let borderClass = showBorder ? "border-b-2 border-b-white" : "";
                return (
                  <TouchableOpacity
                    onPress={() => handlelocation(loc)}
                    key={index}
                    className={
                      "flex-row items-center border-0 p-3 px-4 mb-1 " +
                      borderClass
                    }
                  >
                    <MapPinIcon size="20" color="white" />
                    <Text className="text-white text-lg ml-2">
                      {loc?.name} , {loc?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        <View className="mx-4 flex justify-around flex-1 mb-2">
          <Text className="text-slate-400 text-center text-2xl font-bold">
            {location?.name},
            <Text className="text-lg font-semibold text-slate-350">{" "+location?.country}</Text>
          </Text>
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/wind.png")}
              className="w-52 h-52"
            />
          </View>
          <View className="space-y-2">
            <Text className="text-center font-bold text-slate-400 text-6xl ml-5">
              17&#176;
            </Text>
            <Text className="text-center  text-slate-400 text-xl ml-5">
              Partly Cloudy
            </Text>
          </View>
          <View className="flex-row justify-between mx-4 ">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icon1.png")}
                className="w-10 h-10"
              />
              <Text className="text-slate-400 font-semibold text-base">
                40KM
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icon2.png")}
                className="w-10 h-10"
              />
              <Text className="text-slate-400 font-semibold text-base">
                25%
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icon5.png")}
                className="w-10 h-10"
              />
              <Text className="text-slate-400 font-semibold text-base">
                6:45 AM
              </Text>
            </View>
          </View>
        </View>
        <View className="mb-2 space-y-3">
          <View className="flex-row items-center mx-5 space-x-2">
            <CalendarDaysIcon size="22" color="grey" />
            <Text className="text-slate-400 text-base">Daily Forecast</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ padding: 15 }}
            showHorizontalScrollIndicator={false}
          >
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 border-1 border-black shadow-md">
              <Image
                source={require("../assets/wind.png")}
                className="w-11 h-11"
              />
              <Text className="text-slate-400">Monday</Text>
              <Text className="text-slate-400 text-xl font-semibold">
                {" "}
                19&#176;
              </Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 border-1 border-black shadow-md">
              <Image
                source={require("../assets/wind.png")}
                className="w-11 h-11"
              />
              <Text className="text-slate-400">Tuesday</Text>
              <Text className="text-slate-400 text-xl font-semibold">
                {" "}
                19&#176;
              </Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 border-1 border-black shadow-md">
              <Image
                source={require("../assets/wind.png")}
                className="w-11 h-11"
              />
              <Text className="text-slate-400">Wednesday</Text>
              <Text className="text-slate-400 text-xl font-semibold">
                {" "}
                19&#176;
              </Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 border-1 border-black shadow-md">
              <Image
                source={require("../assets/wind.png")}
                className="w-11 h-11"
              />
              <Text className="text-slate-400">Thrusday</Text>
              <Text className="text-slate-400 text-xl font-semibold">
                {" "}
                19&#176;
              </Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 border-1 border-black shadow-md">
              <Image
                source={require("../assets/wind.png")}
                className="w-11 h-11"
              />
              <Text className="text-slate-400">Friday</Text>
              <Text className="text-slate-400 text-xl font-semibold">
                {" "}
                19&#176;
              </Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 border-1 border-black shadow-md">
              <Image
                source={require("../assets/wind.png")}
                className="w-11 h-11"
              />
              <Text className="text-slate-400">Saturday</Text>
              <Text className="text-slate-400 text-xl font-semibold">
                {" "}
                19&#176;
              </Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 border-1 border-black shadow-md">
              <Image
                source={require("../assets/wind.png")}
                className="w-11 h-11"
              />
              <Text className="text-slate-400">Sunday</Text>
              <Text className="text-slate-400 text-xl font-semibold">
                {" "}
                19&#176;
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Home;
