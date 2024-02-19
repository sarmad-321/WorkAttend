/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, View, StatusBar, TouchableOpacity, WebView,Text, ActivityIndicator, Linking, ScrollView, Alert} from "react-native";
import styles from "../../../js/themes/styles"
import {Header, Left, Right, Body, Title, Container, Content, Button, Row, CardItem, Card, Item, Input, Form} from 'native-base'
import realm  from '../../../js/realm'
import {changePassword} from '../../../js/services/changePassword'
import { NavigationActions, StackActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { getAppDetail } from "../../../js/services/getAppDetail";
const menu = require("../../../img/menu.png")
const fingerprint = require("../../../img/fingerprint.png")

export default class Settings extends Component {

      constructor(props)
      {
        super(props);
       this.state={
         isLoading: false,
         data:[],
         oldPass:'',
         newPass:'',
         newPassConfirm:'',
         isError: false, 
         errorMsg: '', 
         isPasschanged: false,
       }
      }

      componentDidMount()
      {
      //  this.getUserProfile();
      }

      logoutUser()
      {
        var baseURLApp=""; 
        var realmAppSettings = realm.objects('AppSettings');
        if(realmAppSettings.length > 0)
        {
          baseURLApp = realmAppSettings[0].appBaseURL;
        }

        var token = "";

var realmAppUser = realm.objects('employee');
if(realmAppUser.length > 0)
{
  token = realmAppUser[0].token;
}

getAppDetail(baseURLApp, token)
.then((res) => {
alert(JSON.stringify(res));
if(res!=null && res.databaseName!=null && res.userCompanyID!=null)
{
	var pathArray =baseURLApp.split('/api/resource');
	
			var hostname = pathArray[0] + '?databasename=' + res.databaseName + '&usercompanyid=' + res.userCompanyID;
			alert(hostname);
				realm.write(() => {
				  realm.create('AppSettings', {
					settingID:1,
					appBaseURL: hostname,
				  }, true);
			  });

				  //	this.props.navigation.navigate('Login')	
				  //delete all realm objects 
				  realm.write(() => {
					let user = realm.objects('employee');
					realm.delete(user); // Deletes user
        });
        this.setState({
          isPasschanged: result,
         isLoading: false,
         isError: false, 
         errorMsg:'',
         oldPass:'',
         newPass:'',
         newPassConfirm:''
         });
        Alert.alert('Password Change','your password is changed sucessfully!');
	const navigateAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Login" })],
      });
    
      this.props.navigation.dispatch(navigateAction);
}
else 
{
 alert('Something went wrong. Unable to log out.')
}
 });
      }

      changeUserPassword()
      {
        this.setState({ errorMsg: '',  isError: false, isLoading: true});

      //  var newPassword = this.state.newPass;
      // var newPasswordConfirm = this.state.newPassConfirm;
       // var oldPassword = this.state.oldPassword;
        if(this.state.newPass=='' || this.state.newPassConfirm=='' || this.state.oldPassword=='')
        {
          this.setState({ errorMsg: 'Fill all fields correctly.',  isError: true, isLoading: false});
        }
        else if(this.state.newPass.trim()!=this.state.newPassConfirm.trim())
        {
        //  alert(this.state.newPass +'pass:'+ this.state.newPassConfirm);
          this.setState({ errorMsg: 'Password does not match. Try again.',  isError: true, isLoading: false});
        }
        else if(this.state.newPass.trim().length<6 && this.state.newPassConfirm.trim().length<6)
        {
          this.setState({ errorMsg: 'Password should be atleast 6 characters. Try again.',  isError: true, isLoading: false});
        }
        else if(this.state.newPass.trim()==this.state.oldPass.trim())
        {
          this.setState({ errorMsg: 'New and old password should not match.',  isError: true, isLoading: false});
        }
       else if (/\s/.test(this.state.newPass) || /\s/.test(this.state.newPassConfirm) || /\s/.test(this.state.oldPass)) {
          // It has any kind of whitespace
          this.setState({ errorMsg: 'Password cannot contain blank spaces.',  isError: true, isLoading: false});
      }
        else{
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

          var baseURLApp=""; 
          var realmAppSettings = realm.objects('AppSettings');
          if(realmAppSettings.length > 0)
          {
            baseURLApp = realmAppSettings[0].appBaseURL;
          }

 
          changePassword(baseURLApp, mobileAPIToken,employeeEmail, this.state.oldPass.trim(), this.state.newPass.trim()).then((result) => {

            var authStr = "Authorization has been denied for this request."
            if(result.Message!=null && result.Message.includes(authStr))
            {
              realm.write(() => {
                 realm.deleteAll();
              });
              //token expire
            	const navigateAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Login" })],
              });
            
              this.props.navigation.dispatch(navigateAction);
            }

           // alert(JSON.stringify(result));
            if(!result)
            {
              this.setState({ errorMsg: 'Current Password is not correct. Something went wrong.',  isError: true, isLoading: false});
            }
            if(result)
            {
              getAppDetail(baseURLApp, mobileAPIToken)
.then((res) => {
  //alert(JSON.stringify(res));
  if(res!=null)
  {
    var pathArray =baseURLApp.split('/api/resource');
    
        var hostname = pathArray[0] + '?databasename=' + res.databaseName + '&usercompanyid=' + res.userCompanyID;
       // alert(hostname);
          realm.write(() => {
            realm.create('AppSettings', {
            settingID:1,
            appBaseURL: hostname,
            }, true);
          });
  
            //	this.props.navigation.navigate('Login')	
            //delete all realm objects 
            realm.write(() => {
            let user = realm.objects('employee');
            realm.delete(user); // Deletes user
          });
         /* this.setState({
            isPasschanged: result,
           isLoading: false,
           isError: false, 
           errorMsg:'',
           oldPass:'',
           newPass:'',
           newPassConfirm:''
           });*/
          Alert.alert('Password Change','your password is changed sucessfully!');
    const navigateAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Login" })],
        });
      
        this.props.navigation.dispatch(navigateAction);
  }
  else 
  {
   alert('Something went wrong. Unable to log out.')
  }
});
                       
                    /*   realm.write(() => {
                            let user = realm.objects('employee');
                            realm.delete(user); // Deletes user
                          });
		
                        Alert.alert('Password Change','your password is changed sucessfully!');
                        	const navigateAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: "Login" })],
                          });
                        
                          this.props.navigation.dispatch(navigateAction);*/
           }
                          //alert(this.state.name);
                       })
        }
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
      <Title allowFontScaling={false} style={styles.Title}>Settings</Title>
      </Right>
      </Header>


 <ScrollView style={{margin:15}}>
     
          <Text style={styles.labelHeading}>Create a new password</Text>

          <Text style={styles.labelSubHeading}>Passwords are case-sensitive and must be at least 6 characters.</Text>

 {this.state.isError && <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>}
          <Text style={styles.labelSettings}>Current Password</Text>
          <Item style={styles.itemSett}>
          <Input placeholder="current password"  secureTextEntry={true} 
           onChangeText={(text) => this.setState({oldPass: text})}
           value={this.state.oldPass}
           maxLength={25} />
          </Item>

          <Text style={styles.labelSettings}>Type Your new password</Text>
          <Item style={styles.itemSett}>
          <Input placeholder="Password" secureTextEntry={true} 
           onChangeText={(text) => this.setState({newPass: text})}
           value={this.state.newPass}
           maxLength={25}  />
          </Item>

          <Text style={styles.labelSettings}>Retype Your new password</Text>
          <Item style={styles.itemSett}>
          <Input placeholder="Password" secureTextEntry={true} 
           onChangeText={(text) => this.setState({newPassConfirm: text})}
           value={this.state.newPassConfirm}
           maxLength={25} 
            />
          </Item>
      
   
        <TouchableOpacity style={{margin:50}}  onPress={() => this.changeUserPassword()}>
<View style={styles.punchBtn}>
<Text style={styles.prBtntext}>Save</Text>
</View>
</TouchableOpacity>

</ScrollView>
      {this.state.isLoading && <View style={styles.loading}>
          <ActivityIndicator size='large'/>
        </View>}
        </Container>
    );
  }
}


