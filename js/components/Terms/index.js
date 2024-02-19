/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow


import React, {Component} from 'react';
import {Image, View, StatusBar, TouchableOpacity, WebView,Text} from "react-native";
import styles from "../../../js/themes/styles"
import {Header, Left, Right, Body, Title, Container, Content, Button} from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

const menu = require("../../../img/menu.png")

export default class TermsOfUse extends Component {
  render() {
    return (
<Container style={styles.container}>
        <Header  iosStatusbar="light-content" androidStatusBarColor='rgba(0,184,108,1)' style={styles.header}>
            <Left  style={{ flex: 1 }}>
                <Button  transparent onPress={()=> this.props.navigation.openDrawer()}>
                <Image source={menu} style={{height: 30, width:30}} />
                </Button>
            </Left>
            <Body  style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
            </Body>
            <Right style={{flex: 4}}>
                <Title allowFontScaling={false} style={styles.Title}>TERMS OF USE</Title>
            </Right>
        </Header>
</Container>
    );
  }
}*/




