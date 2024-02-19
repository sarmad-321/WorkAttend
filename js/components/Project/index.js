/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, View, StatusBar, TouchableOpacity, WebView,Text, ActivityIndicator, Linking, ImageBackground} from "react-native";
import styles from "../../../js/themes/styles"
import {Header, Left, Right, Body, Title, Container, Content, Button, Row, CardItem, Card} from 'native-base'
import realm  from '../../../js/realm'

import Icon from 'react-native-vector-icons/Ionicons'

const menu = require("../../../img/menu.png")

export default class Project extends Component {

      constructor(props)
      {
       super(props);
       this.state={
         isLoading: false,
       }
      }

      componentDidMount()
      {
      }


  render() {
    return (
      <Container style={{backgroundColor:"#ffff"}} >
      <Header  iosStatusbar="light-content" androidStatusBarColor='rgba(0,184,108,1)' style={styles.header}>
      <Left  style={{ flex: 1 }}>
      <Button  transparent onPress={()=> this.props.navigation.openDrawer()}>
      <Icon name='ios-menu' style={styles.iconMenuTopDash}/>
      </Button>
      </Left>
      <Body  style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
      </Body>
      <Right style={{flex: 4}}>
      <Title allowFontScaling={false} style={styles.Title}>Profile</Title>
      </Right>
      </Header>
 

   
      {this.state.isLoading && <View style={styles.loading}>
          <ActivityIndicator size='large'/>
        </View>}
        </Container>
    );
  }
}


