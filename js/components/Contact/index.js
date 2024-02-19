/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, View, StatusBar, TouchableOpacity, WebView, Text, Platform, Linking} from "react-native";
import styles from "../../../js/themes/styles"
import {Header, Left, Right, Body, Title, Container, Content, Button} from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

const menu = require("../../../img/menu.png")

export default class App extends Component {

openMap()
{ 
const scheme = Platform.select({ ios: 'maps:35.9113140,14.4856780?q=', android: 'geo:35.911641,14.485567?q=' });
const latLng = `${35.9113140},${14.4856780}`;
const label = 'Dakar Software Systems';
const url = Platform.select({
  ios: `${scheme}${label}@${latLng}`,
  android: `${scheme}${latLng}(${label})`
});
Linking.openURL(url); 
}

openWeb()
{
  Linking.openURL("http://www.dakarsoftware.com/"); 
}

openDialpad()
{
  
}

sendEmail()
{

}

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
      <Title allowFontScaling={false} style={styles.Title}>CONTACT</Title>
      </Right>
    </Header>
 {/*<View style={{flexDirection:'column', alignContent:'center', alignItems:'center'}}>
    <View style={{flexDirection:'column', alignContent:'center', alignItems:'center', padding:20}}>
       <TouchableOpacity style={{flexDirection:'column', alignContent:'center', alignItems:'center', paddingLeft:20, paddingRight:20, paddingBottom:5, paddingTop:5}}  onPress={()=> this.openMap()}>
       <Icon name="ios-send" style={{fontSize:30}}/>
       <Text>Get Directions - Find us on map</Text>
       </TouchableOpacity>
    </View>
    </View>*/}


   <View style={{flexDirection: 'row', padding:20, }}>
   <TouchableOpacity onPress={()=> this.openDialpad()}  style={{flexDirection: 'row',  paddingLeft:20, paddingRight:20 }}>
      <Icon name="ios-call" style={{fontSize:30,paddingRight:20, color:'#00d8c3'}}/>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.profileTxt}>TELEPHONE</Text>
               <Text>(+356) 2137 4078</Text>
            </View>
            </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', padding:20, }}>
      <View  style={{flexDirection: 'row',  paddingLeft:20, paddingRight:20 }}>
      <Icon name="ios-print" style={{fontSize:30,paddingRight:20, color:'#00d8c3'}}/>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.profileTxt}>FAX</Text>
               <Text>(+356) 2137 4090</Text>
            </View>
       </View>
      </View>

         <View style={{flexDirection: 'row', padding:20, }}>
         <TouchableOpacity onPress={()=> this.sendEmail()}  style={{flexDirection: 'row', paddingLeft:20, paddingRight:20 }}>
         <Icon name="ios-mail" style={{fontSize:30,paddingRight:20, color:'#00d8c3'}}/>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.profileTxt}>Email</Text>
            <Text>administration@dakarsoftware.com</Text>
            </View>
        </TouchableOpacity>
      </View>
 
         <View style={{flexDirection: 'row', padding:20, }}>
         <TouchableOpacity onPress={()=> this.openWeb()}  style={{flexDirection: 'row', paddingLeft:20, paddingRight:20 }}>
         <Icon name="ios-globe" style={{fontSize:30,paddingRight:20, color:'#00d8c3'}}/>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.profileTxt}>Website</Text>
            <Text>http://www.dakarsoftware.com/</Text>
            </View>
            </TouchableOpacity>
      </View>


  <View style={{flexDirection: 'row', padding:20, }}>
  <TouchableOpacity onPress={()=> this.openMap()}  style={{flexDirection: 'row', padding:20, }}>
      <Icon name="ios-pin" style={{fontSize:30,paddingRight:20, color:'#00d8c3'}}/>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.profileTxt}>ADDRESS</Text>
            <Text>Dakar Software Systems, 4th Floor, Dakar Buildings, Birkirkara Road, St Julians, STJ 1300, Malta</Text>
            </View>
  </TouchableOpacity>
 </View>
</Container>
    );
  }
}


