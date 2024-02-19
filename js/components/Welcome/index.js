import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions, // CSS-like styles
  Text, // Renders text
  View,
  Image,
  Platform, // Container component
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {CommonActions} from '@react-navigation/native';

import Swiper from '../../../js/components/Swiper';

const welcomeQR = require('../../../img/welcomeScreen1.png');
const map = require('../../../img/welcomeScreen2.png');
const password = require('../../../img/welcomeScreen3.png');

import realm from '../../../js/realm';
//import { AsyncStorage } from "react-native"

export default class Screen extends Component {
  componentWillMount() {
    var isOldUser = false;
    var realmAppUser = realm.objects('employee');
    if (realmAppUser.length > 0) {
      isOldUser = realmAppUser[0].isOldUser;
    }
    console.log(isOldUser, 'old user?');
    if (isOldUser) {
      // const navigateAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({routeName: 'Drawer'})],
      // });
      const navigateAction = CommonActions.reset({
        index: 0,
        routes: [{name: 'Drawer'}],
      });
      this.props.navigation.dispatch(navigateAction);
    }
  }

  render() {
    return (
      <Swiper navigation={this.props.navigation}>
        {/* First screen */}
        <View style={styles.slide}>
          {/*} <Icon name="ios-calendar" {...iconStyles} />*/}
          <Image source={welcomeQR} style={styles.welcomeImage} />
          <Text style={styles.header}>Before you begin</Text>
          <Text style={styles.text}>
            Scan QR Code or enter your company URL.
          </Text>
        </View>
        {/* Second screen */}
        <View style={styles.slide}>
          <Image source={password} style={styles.welcomeImage} />
          <Text style={styles.header}>Login</Text>
          <Text style={styles.text}>View your clock In/Out history.</Text>
        </View>
        {/* Third screen */}
        <View style={styles.slide}>
          <Image source={map} style={styles.welcomeImage} />
          <Text style={styles.header}>Clock In/Out</Text>
          <Text style={styles.text}>Clock In/Out of your work locations.</Text>
        </View>
      </Swiper>
    );
  }
}
const iconStyles = {
  size: 100,
  color: '#FFFFFF',
};
const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#4dd5a5',
  },
  // Header styles
  header: {
    color: '#000000',
    fontFamily: Platform.OS == 'android' ? 'serif' : 'Avenir',
    fontSize: 30,
    textAlign: 'center',
    // fontWeight: "bold",
    marginVertical: 15,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  // Text below header
  text: {
    color: '#000000',
    fontFamily: Platform.OS == 'android' ? 'sans-serif-thin' : 'Avenir',
    fontSize: 15,
    marginHorizontal: 40,
    textAlign: 'center',
    paddingBottom: 60,
  },
  welcomeImage: {
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').height / 2.5,
  },
});
AppRegistry.registerComponent('Screen', () => Screen);
