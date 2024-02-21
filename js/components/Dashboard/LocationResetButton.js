import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Target from '../../../img/target.png';
const LocationResetButton = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}>
      <Image source={Target} style={styles.image} />
    </TouchableOpacity>
  );
};

export default LocationResetButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 500,
    width: 55,
    height: 55,
    backgroundColor: 'white',
    right: 10,
    top: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  image: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    tintColor: 'rgba(0,184,108,1)',
  },
});
