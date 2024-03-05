import React, { useState, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { debounce } from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import * as Progress from "react-native-progress";

function Home() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    fetchWeatherForecast({
      cityName: "Mumbai",
      days: "7",
    })
      .then((data) => {
        setWeather(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  };

  const handlelocation = (loc) => {
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;

  return (
    // <View className="flex-1 relative bg-slate-200">
    //   <StatusBar style="auto" />

    //   {loading ? (
    //     <View className="flex-1 flex-row justify-center items-center">
    //       <Progress.CircleSnail color={["red", "green", "blue"]} />
    //     </View>
    //   ) : (
    //     <SafeAreaView className="flex flex-1">
    //       {/* Seach-Bar */}
    //       <View style={{ height: "7%" }} className="mx-4 relative z-50">
    //         <View
    //           className="flex-row justify-end items-center rounded-full"
    //           style={{
    //             backgroundColor: showSearch ? "#f1f5f9" : "transparent",
    //           }}
    //         >
    //           {showSearch ? (
    //             <TextInput
    //               onChangeText={handleTextDebounce}
    //               placeholder="Search City"
    //               placeholderTextColor="grey"
    //               className="pl-6 h-10 flex-1 text-base text-slate-400 sm:w-48 md:w-64 lg:w-96"
    //             />
    //           ) : null}

    //           <TouchableOpacity
    //             style={{ backgroundColor: "white" }}
    //             onPress={() => toggleSearch(!showSearch)}
    //             className="rounded-full p-3 m-1 border-2 border-slate-400 "
    //           >
    //             <MagnifyingGlassIcon size="25" color="grey" />
    //           </TouchableOpacity>
    //         </View>
    //         {locations.length > 0 && showSearch ? (
    //           <View className="absolute w-full bg-slate-400 top-16 mt-2 rounded-3xl shadow-md sm:p-2 md:p-3 lg:p-4 sm:max-h-32 md:max-h-48 lg:max-h-64 overflow-y-auto">
    //             {locations.map((loc, index) => {
    //               let showBorder = index + 1 !== locations.length;
    //               let borderClass = showBorder
    //                 ? "border-b-2 border-b-white"
    //                 : "";
    //               return (
    //                 <TouchableOpacity
    //                   onPress={() => handlelocation(loc)}
    //                   key={index}
    //                   className={`flex-row items-center border-0 p-3 px-4 mb-1 ${borderClass}`}
    //                 >
    //                   <MapPinIcon size="20" color="white" />
    //                   <Text className="text-white text-lg ml-2">
    //                     {loc?.name}, {loc?.country}
    //                   </Text>
    //                 </TouchableOpacity>
    //               );
    //             })}
    //           </View>
    //         ) : null}
    //       </View>

    //       {/* Weather-Info-Section */}
    //       <View className="mx-4 flex justify-around flex-1 mt-4 mb-2 shadow-sm rounded-md border-2 border-slate-300 bg-slate-100">
    //         <Text className="text-slate-400 text-center text-2xl font-bold">
    //           {location?.name}
    //           <Text className="text-lg font-semibold text-slate-350">
    //             {"," + location?.country}
    //           </Text>
    //         </Text>
    //         <View className="flex-row justify-center">
    //           <Image
    //             source={{ uri: "https:" + current?.condition?.icon }}
    //             className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
    //           />
    //         </View>
    //         <View className="space-y-2">
    //           <Text className="text-center font-bold text-slate-400 text-4xl sm:text-6xl ml-5">
    //             {current?.temp_c}&#176;
    //           </Text>
    //           <Text className="text-center  text-slate-400 text-xl ml-5">
    //             {current?.condition?.text}
    //           </Text>
    //         </View>
    //         <View className="flex-row justify-between mx-4">
    //           <View className="flex-row space-x-2 items-center">
    //             <Image
    //               source={require("../assets/icon1.png")}
    //               className="w-8 h-8 sm:w-10 sm:h-10"
    //             />
    //             <Text className="text-slate-400 font-semibold text-base">
    //               {current?.wind_kph}KM
    //             </Text>
    //           </View>
    //           <View className="flex-row space-x-2 items-center">
    //             <Image
    //               source={require("../assets/icon2.png")}
    //               className="w-8 h-8 sm:w-10 sm:h-10"
    //             />
    //             <Text className="text-slate-400 font-semibold text-base">
    //               {current?.humidity}%
    //             </Text>
    //           </View>
    //           <View className="flex-row space-x-2 items-center">
    //             <Image
    //               source={require("../assets/icon5.png")}
    //               className="w-8 h-8 sm:w-10 sm:h-10"
    //             />
    //             <Text className="text-slate-400 font-semibold text-base">
    //               6:45 AM
    //             </Text>
    //           </View>
    //         </View>
    //       </View>

    //       {/* Daily-Forecast-Detail */}
    //       <View className="mb-1 space-y-3 mt-2">
    //         <View className="flex-row items-center mx-5 space-x-2">
    //           <CalendarDaysIcon size="22" color="grey" />
    //           <Text className="text-slate-400 text-lg">Daily Forecast</Text>
    //         </View>
    //         <ScrollView
    //           horizontal
    //           contentContainerStyle={{ padding: 15 }}
    //           showHorizontalScrollIndicator={false}
    //         >
    //           {weather?.forecast?.forecastday?.map((item, index) => {
    //             return (
    //               <View
    //                 key={index}
    //                 className="flex justify-center items-center w-24 sm:w-32 md:w-40 rounded-lg py-3 space-y-1 mr-4  bg-slate-100 shadow-sm"
    //                 // Adjust width based on screen size: 24 for small, 32 for medium, 40 for large
    //               >
    //                 <Image
    //                   source={{ uri: "https:" + item?.day?.condition?.icon }}
    //                   className="w-11 h-11"
    //                   // Adjust image width and height
    //                 />
    //                 <Text className="text-slate-400">{item.date}</Text>
    //                 <Text className="text-slate-400 text-xl font-semibold">
    //                   {item?.day?.avgtemp_c}&#176;
    //                 </Text>
    //               </View>
    //             );
    //           })}
    //         </ScrollView>
    //       </View>
    //     </SafeAreaView>
    //   )}
    // </View>
    <View className="flex-1 relative bg-slate-200">
  <StatusBar style="auto" />

  {loading ? (
    <View className="flex-1 flex-row justify-center items-center">
      <Progress.CircleSnail color={["red", "green", "blue"]} />
    </View>
  ) : (
    <SafeAreaView className="flex flex-1">
      {/* Seach-Bar */}
      <View style={{ height: "7%" }} className="mx-4 relative z-50">
        <View
          className="flex-row justify-end items-center rounded-full"
          style={{
            backgroundColor: showSearch ? "#f1f5f9" : "transparent",
          }}
        >
          {showSearch ? (
            <TextInput
              onChangeText={handleTextDebounce}
              placeholder="Search City"
              placeholderTextColor="grey"
              className="pl-6 h-10 flex-1 text-base text-slate-400 sm:w-48 md:w-64 lg:w-96 xl:w-128"
              // Adjust width based on screen size: 48 for small, 64 for medium, 96 for large, 128 for extra large (PC)
            />
          ) : null}

          <TouchableOpacity
            style={{ backgroundColor: "white" }}
            onPress={() => toggleSearch(!showSearch)}
            className="rounded-full p-3 m-1 border-2 border-slate-400"
          >
            <MagnifyingGlassIcon size="25" color="grey" />
          </TouchableOpacity>
        </View>
        {locations.length > 0 && showSearch ? (
          <View className="absolute w-full bg-slate-400 top-16 mt-2 rounded-3xl shadow-md sm:p-2 md:p-3 lg:p-4 sm:max-h-32 md:max-h-48 lg:max-h-64 overflow-y-auto">
            {locations.map((loc, index) => {
              let showBorder = index + 1 !== locations.length;
              let borderClass = showBorder
                ? "border-b-2 border-b-white"
                : "";
              return (
                <TouchableOpacity
                  onPress={() => handlelocation(loc)}
                  key={index}
                  className={`flex-row items-center border-0 p-3 px-4 mb-1 ${borderClass}`}
                >
                  <MapPinIcon size="20" color="white" />
                  <Text className="text-white text-lg ml-2">
                    {loc?.name}, {loc?.country}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </View>

      {/* Weather-Info-Section */}
      <View className="mx-4 flex justify-around flex-1 mt-4 mb-2 shadow-sm rounded-md border-2 border-slate-300 bg-slate-100">
        <Text className="text-slate-400 text-center text-2xl font-bold">
          {location?.name}
          <Text className="text-lg font-semibold text-slate-350">
            {"," + location?.country}
          </Text>
        </Text>
        <View className="flex-row justify-center">
          <Image
            source={{ uri: "https:" + current?.condition?.icon }}
            className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
          />
        </View>
        <View className="space-y-2">
          <Text className="text-center font-bold text-slate-400 text-4xl sm:text-6xl ml-5">
            {current?.temp_c}&#176;
          </Text>
          <Text className="text-center  text-slate-400 text-xl ml-5">
            {current?.condition?.text}
          </Text>
        </View>
        <View className="flex-row justify-between mx-4">
          <View className="flex-row space-x-2 items-center">
            <Image
              source={require("../assets/icon1.png")}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <Text className="text-slate-400 font-semibold text-base">
              {current?.wind_kph}KM
            </Text>
          </View>
          <View className="flex-row space-x-2 items-center">
            <Image
              source={require("../assets/icon2.png")}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <Text className="text-slate-400 font-semibold text-base">
              {current?.humidity}%
            </Text>
          </View>
          <View className="flex-row space-x-2 items-center">
            <Image
              source={require("../assets/icon5.png")}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <Text className="text-slate-400 font-semibold text-base">
              6:45 AM
            </Text>
          </View>
        </View>
      </View>

      {/* Daily-Forecast-Detail */}
      <View className="mb-1 space-y-3 mt-2">
        <View className="flex-row items-center mx-5 space-x-2">
          <CalendarDaysIcon size="22" color="grey" />
          <Text className="text-slate-400 text-lg">Daily Forecast</Text>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{ padding: 15 }}
          showHorizontalScrollIndicator={false}
        >
          {weather?.forecast?.forecastday?.map((item, index) => {
            return (
              <View
                key={index}
                className="flex justify-center items-center w-24 sm:w-32 md:w-40 rounded-lg py-3 space-y-1 mr-4 bg-slate-100 shadow-sm"
                // Adjust width based on screen size: 24 for small, 32 for medium, 40 for large
              >
                <Image
                  source={{ uri: "https:" + item?.day?.condition?.icon }}
                  className="w-11 h-11"
                  // Adjust image width and height
                />
                <Text className="text-slate-400">{item.date}</Text>
                <Text className="text-slate-400 text-xl font-semibold">
                  {item?.day?.avgtemp_c}&#176;
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  )}
</View>

  );
}

export default Home;
