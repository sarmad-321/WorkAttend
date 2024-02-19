// import React, { Component } from "react";
// import { Platform, Text } from "react-native";
// import { Root } from "native-base";
// import { createStackNavigator, createDrawerNavigator, createAppContainer} from "react-navigation";
// import Login from "./components/Login";
// import SideBar from "./components/Sidebar";
// //import PunchIn from "./components/PunchIn";
// //import Schedule from "./components/Schedule";
// import Dashboard from "./components/Dashboard/";
// import History from "./components/HistoryPunch/";
// import Profile from "./components/Profile/";
// import Contact from "./components/Contact/";
// import CompanyRegister from "./components/CompanyRegister"
// import GeoFencing from "./components/GeoFencing/";
// import CompanyRegisterTxt from "./components/CompanyRegisterTxt/";
// import Welcome from "./components/Welcome/";
// import Settings from "./components/Settings/";

// const Drawer = createDrawerNavigator(
//   {
//     Dashboard: { screen: Dashboard },
//     GeoFencing: {screen: GeoFencing},
//     //PunchIn: {screen: PunchIn},
//     //Schedule: {screen: Schedule},
//     History:{screen: History},
//     Profile:{screen: Profile},
//     Contact:{screen: Contact},
//     Settings: {screen: Settings},
//   },
//   {
//     navigationOptions: {
//       gesturesEnabled: false,
//     },
//    initialRouteName: "Dashboard",
//     contentOptions: {
//       activeTintColor: "#e91e63"
//     },
//     drawerPosition: 'left',
//     contentComponent: props => <SideBar {...props} />
//   }
// );

// const AppNavigator = createStackNavigator(
//     {
//       Welcome:{ screen: Welcome },
//       CompanyRegister: {screen: CompanyRegister},
//       CompanyRegisterTxt: {screen: CompanyRegisterTxt},
//       Login:{ screen: Login },
//       Drawer: { screen: Drawer },
//     },
//     {
//          //initialRouteName: "Home",
//          headerMode: "none",
//          //headerBackTitle: Platform.OS == "android" ? "none" : "Back",
//     }
// );

// const App = createAppContainer(AppNavigator);

// export default App;

import React from 'react';
import {Platform} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './components/Welcome';
import CompanyRegister from './components/CompanyRegister';
import {NativeBaseProvider} from 'native-base';

import CompanyRegisterTxt from './components/CompanyRegisterTxt';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
// import History from "./components/HistoryPunch";
import Profile from './components/Profile';
// import Contact from "./components/Contact";
// import Settings from "./components/Settings";
import SideBar from './components/Sidebar';
// import GeoFencing from "./components/GeoFencing";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerPosition="left"
      drawerContent={props => <SideBar {...props} />}
      screenOptions={{
        activeTintColor: '#e91e63',
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {/* <Drawer.Screen name="GeoFencing" component={GeoFencing} />
      <Drawer.Screen name="History" component={History} /> */}
      <Drawer.Screen name="Profile" component={Profile} />
      {/* <Drawer.Screen name="Contact" component={Contact} />
      <Drawer.Screen name="Settings" component={Settings} /> */}
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  return (
    // <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="CompanyRegister" component={CompanyRegister} />
        <Stack.Screen
          name="CompanyRegisterTxt"
          component={CompanyRegisterTxt}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    // </NativeBaseProvider>
  );
};

export default AppNavigator;
