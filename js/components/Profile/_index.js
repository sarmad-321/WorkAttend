/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, View, StatusBar, TouchableOpacity, WebView,Text, ActivityIndicator} from "react-native";
import styles from "../../../js/themes/styles"
import {Header, Left, Right, Body, Title, Container, Content, Button, Row} from 'native-base'
import {getUserProfile} from '../../../js/services/getUserProfile'
import realm  from '../../../js/realm'

import Icon from 'react-native-vector-icons/Ionicons'

const menu = require("../../../img/menu.png")

export default class Profile extends Component {

      constructor(props)
      {
        var realmAppUser = realm.objects('AppUser');
        var dakarUserName='';
        var dakarEmployeeID='';
        if(realmAppUser.length > 0)
        {
          dakarUserName = realmAppUser[0].dakarUserName;
          dakarEmployeeID = realmAppUser[0].dakarEmployeeID;
        }

        super(props);
       this.state={
         isLoading: false,
         data:[],
         name:'',
         surname:'',
         dakarEmployeeID: dakarEmployeeID,
       }
      }

      componentDidMount()
      {
        this.getUserProfile();
      }

      getUserProfile()
      {
            this.setState({
                  isLoading: true,
                });
              var dakarUserName ="";
              var dakarEmployeeID="";
              var dakarToken="";
              var mobileAPIToken="";
              var realmAppUser = realm.objects('AppUser');
              
              if(realmAppUser.length > 0)
                {
                  dakarUserName = realmAppUser[0].dakarUserName;
                  dakarEmployeeID = realmAppUser[0].dakarEmployeeID;
                  dakarToken = realmAppUser[0].dakarToken;
                  mobileAPIToken = realmAppUser[0].token;
                }
                
                var baseURLApp=""; 
                var realmAppSettings = realm.objects('AppSettings');
                if(realmAppSettings.length > 0)
                {
                  baseURLApp = realmAppSettings[0].appBaseURL;
                }
                
            getUserProfile(baseURLApp, dakarUserName, dakarEmployeeID, dakarToken, mobileAPIToken).then((result) => {
                //  alert(JSON.stringify(result));
                             this.setState({
                               data: result,
                               name: result[0].name,
                               surname: result[0].surname,
                               isLoading: false,
                             });
                             //alert(this.state.name);
                          })
      }
  render() {
    return (
      <Container style={styles.container}>
      <Header  iosStatusbar="light-content" androidStatusBarColor='rgba(0,184,108,1)' style={styles.header}>
      <Left  style={{ flex: 1 }}>
      <Button  transparent onPress={()=> this.props.navigation.openDrawer()}>
      <Image source={menu} style={{height: 40, width:40}} />
      </Button>
      </Left>
      <Body  style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
      </Body>
      <Right style={{flex: 4}}>
      <Title allowFontScaling={false} style={styles.Title}>Profile</Title>
      </Right>
      </Header>

    
     <View style={{flexDirection: 'row', padding:30, }}>
      <Icon name="ios-person" style={{fontSize:40,paddingRight:20, color:'#00d8c3'}}/>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.profileTxt}>Name</Text>
               <Text>{this.state.name}</Text>
            </View>
      </View>

         <View style={{flexDirection: 'row', padding:30, }}>
      <Icon name="ios-person" style={{fontSize:40,paddingRight:20, color:'#00d8c3'}}/>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.profileTxt}>SurName</Text>
               <Text>{this.state.surname}</Text>
            </View>
      </View>

         <View style={{flexDirection: 'row', padding:30, }}>
      <Icon name="ios-person" style={{fontSize:40,paddingRight:20, color:'#00d8c3'}}/>
            <View style={{flexDirection:'column'}}>
            <Text style={styles.profileTxt}>Employee ID</Text>
               <Text>{this.state.dakarEmployeeID}</Text>
            </View>
      </View>

   
      {this.state.isLoading && <View style={styles.loading}>
          <ActivityIndicator size='large'/>
        </View>}
        </Container>
    );
  }
}


