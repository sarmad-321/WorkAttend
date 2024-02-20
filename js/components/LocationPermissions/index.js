import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';

const LocationPermissions = ({initLocation}) => {
  useEffect(() => {
    checkLocation();
  }, []);

  const checkLocation = async () => {
    if (Platform.OS === 'android') {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        console.log('enableResult', enableResult);
        setTimeout(() => {
          initLocation();
        }, 2000);
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
      } catch (error) {
        if (error) {
          checkLocation();
        }
      }
    }
  };
  return <View></View>;
};

export default LocationPermissions;

const styles = StyleSheet.create({});
