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
import {getUserProfile} from '../../../js/services/getUserProfile'
import realm  from '../../../js/realm'

import Icon from 'react-native-vector-icons/Ionicons'

const menu = require("../../../img/menu.png")
const fingerprint = require("../../../img/profile.png")
const backgroundLogin =  require("../../../img/backgroundLogin.jpg")

export default class Profile extends Component {

      constructor(props)
      {
      /*  var realmAppUser = realm.objects('AppUser');
        var dakarUserName='';
        var dakarEmployeeID='';
        if(realmAppUser.length > 0)
        {
          dakarUserName = realmAppUser[0].dakarUserName;
          dakarEmployeeID = realmAppUser[0].dakarEmployeeID;
        }*/

       super(props);
       this.state={
         isLoading: false,
         data:[],
         name:'',
         surname:'',
         email: '',
         //dakarEmployeeID: dakarEmployeeID,
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
            //  var dakarUserName ="";
             // var dakarEmployeeID="";
              var employeeID="";
              var mobileAPIToken="";
              var employeeEmail ="";
              var realmAppUser = realm.objects('employee');
              
              if(realmAppUser.length > 0)
                {
                  employeeID = realmAppUser[0].employeeID;
                  mobileAPIToken = realmAppUser[0].token;
                  employeeEmail = realmAppUser[0].employeeEmail;
                }
                //getUserProfile = (employeeID, mobileAPIToken)

                var baseURLApp=""; 
                var realmAppSettings = realm.objects('AppSettings');
                if(realmAppSettings.length > 0)
                {
                  baseURLApp = realmAppSettings[0].appBaseURL;
                }

            getUserProfile(baseURLApp, employeeID, mobileAPIToken).then((result) => {
               //alert(JSON.stringify(result));
               var authStr = "Authorization has been denied for this request."
               if(result.Message!=null && result.Message.includes(authStr))
               {
                 realm.write(() => {
                    realm.deleteAll();
                 });
                 //token expire
                 this.props.navigation.navigate('Login');
               }
                             this.setState({
                               data: result,
                               name: result.FirstName,
                               surname: result.SurName,
                               email: employeeEmail,
                               isLoading: false,
                             });
                             //alert(this.state.name);
                          })
      }

      openWeb()
{
  Linking.openURL("http://www.dakarsoftware.com/"); 
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
 
      <ImageBackground source={backgroundLogin} style={styles.loginBkg} >
  <View style={styles.containerProf}>
        <Image style={styles.imageProf} source={fingerprint} />
        <Text style={styles.headingProf}>{this.state.name} {this.state.surname}</Text>
        <Text style={styles.textProf}>{this.state.email}</Text>

        <View style={styles.bottomProf}>
        {/*<TouchableOpacity onPress={()=> this.openWeb()}  style={{flexDirection: 'row', padding:20, }}>
            <Text style={styles.bottomTextProf}>For any related queries contact, Dakar Software Systems.</Text>
    </TouchableOpacity>*/}
        </View>
      </View>
</ImageBackground>
   
      {this.state.isLoading && <View style={styles.loading}>
          <ActivityIndicator size='large'/>
        </View>}
        </Container>
    );
  }
}


