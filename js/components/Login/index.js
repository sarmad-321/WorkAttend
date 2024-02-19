/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {
  Container,
  Form,
  Content,
  Label,
  Input,
  Item,
  Header,
} from 'native-base';
import styles from '../../../js/themes/styles';
import {loginUser} from '../../../js/services/loginUser';
import {getToken} from '../../../js/services/getToken';
import DeviceInfo from 'react-native-device-info';
import realm from '../../../js/realm';

const dakarLogo = require('../../../img/workattendlogo.png');
const backgroundLogin = require('../../../img/backgroundLogin.jpg');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: '',
      password: '',
      isError: false,
      errorMsg: '',
      token: '',
      isLoginBtnDisabled: false,
    };
  }

  async signIn() {
    Keyboard.dismiss();
    //this.props.navigation.navigate('Dashboard');
    this.setState({isLoginBtnDisabled: true, isLoading: true});
    this.setState({isError: false, errorMsg: ''});

    var that = this;
    if (
      this.state.username.trim() != '' &&
      this.state.username.trim() != null &&
      this.state.password.trim() != '' &&
      this.state.password.trim() != null
    ) {
      const uniqueId = await DeviceInfo.getUniqueId();
      const manufacturer = await DeviceInfo.getManufacturer();
      var baseURLApp = '';
      var realmAppSettings = realm.objects('AppSettings');
      if (realmAppSettings.length > 0) {
        baseURLApp = realmAppSettings[0].appBaseURL;
      }
      // alert(baseURLApp);

      getToken(baseURLApp, this.state.username, this.state.password)
        .then(res => {
          //alert(baseURLApp+JSON.stringify(res));
          //check is authenticated and save mobile & dakar userID
          if (
            res.error == 'invalid_grant' &&
            res.error_description == 'Error'
          ) {
            this.setState({
              isLoading: false,
              isError: true,
              errorMsg: 'You have entered an invalid username or password',
              isLoginBtnDisabled: false,
            });
          } else if (res.access_token != null) {
            //alert(JSON.stringify(res));
            this.setState({
              token: res.access_token,
            });

            /* var baseURLApp=""; 
            var realmAppSettings = realm.objects('AppSettings');
            if(realmAppSettings.length > 0)
            {
              baseURLApp = realmAppSettings[0].appBaseURL;
            }*/
            //alert(baseURLApp);
            /*var pathArray =baseURLApp.split('?');
        var hostname = pathArray[0]+'/api/resource';
            realm.write(() => {
              realm.create('AppSettings', {
                settingID:1,
                appBaseURL: hostname,
              }, true);
          });*/
            var pathArray = baseURLApp.split('?');
            var hostname = pathArray[0] + '/api/resource';

            loginUser(hostname, res.access_token, uniqueId, manufacturer).then(
              result => {
                //alert('here' + JSON.stringify(result));
                if (
                  result.Message != null &&
                  result.Message ==
                    'Authorization has been denied for this request'
                ) {
                  this.setState({
                    isLoading: false,
                    isError: true,
                    errorMsg: 'Something went wrong. Login again',
                    isLoginBtnDisabled: false,
                  });
                } else if (
                  result.errorMessage != null &&
                  result.errorMessage != ''
                ) {
                  this.setState({
                    isLoading: false,
                    isError: true,
                    errorMsg: result.errorMessage,
                    isLoginBtnDisabled: false,
                  });
                } else {
                  // alert(JSON.stringify(result));
                  //store profile to Realm
                  var ID = realm.objects('employee').length + 1;
                  var token = this.state.token;
                  // alert(JSON.stringify(result));
                  realm.write(() => {
                    realm.create(
                      'employee',
                      {
                        empID: ID,
                        employeeID: result.employeeId,
                        companyID: result.companyId,
                        employeeEmail: result.employeeEmail,
                        token: token,
                        isOldUser: true,
                      },
                      true,
                    );
                  });
                  var pathArray2 = baseURLApp.split('?');
                  var hostname2 = pathArray2[0] + '/api/resource';
                  realm.write(() => {
                    realm.create(
                      'AppSettings',
                      {
                        settingID: 1,
                        appBaseURL: hostname2,
                      },
                      true,
                    );
                  });
                  this.setState({
                    isLoading: false,
                    isLoginBtnDisabled: false,
                  });

                  this.props.navigation.navigate('Drawer');
                }
              },
            );
          }
        })
        .catch(function (error) {
          alert(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
          console.log('Api call error');
          // alert(error.message);
        });

      {
        /*realm.write(() => {
        realm.create(
            'AppUser',
            {
              userID: 1,
              userName: this.state.username.trim().toLowerCase(),
              password: this.state.password.trim().toLowerCase(),
              isOldUser: true,
            }, true)
  })

      //if user is admin store in realm
      if(this.state.username.trim().toLowerCase()=='admin' && this.state.password.trim().toLowerCase()=='admin')
      {
        var realmAppUser = realm.objects('AppUser');
        realm.write(() => {
          realm.create(
              'AppUser',
              {
                userID: 1,
                isAdmin: true,
              }, true
          )
    })}
  */
      }

      //Additional internet check as connected to wifi but no internet leads to unusal behaviour just placed here to show no internet message

      {
        /* var details = {
            'X-CLIENT': 'test.dakar',
            'X-STAMP': '1550158645',
            'X-TOKEN': 'jXpi03QjLcqqUk/J/SdvJUT1RkHNLNWpyeEzCUs9FLw=', 
            'X-FUNCTION':'Login' ,
            username: this.state.username, 
            password: this.state.password,
            manufacturerId: 'dddd', 
            deviceId: '12345442'
      };

      var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

        return fetch('http://testapi.dakarhr.com/dakarhr.php/DAKINET_MAIN_API', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        })
        .then((response) =>  response.json())
        .then((responseJson) => {
             alert(JSON.stringify(responseJson))
        })
        .catch((error) => {
          if(error == 'TypeError: Network request failed'){
            Alert.alert('Something went wrong', 'Kindly check if you are connected to stable cellular data plan or WiFi.'); 
          }
        });*/
      }
    } else if (
      this.state.username.trim() == '' ||
      this.state.username.trim() == null ||
      this.state.password.trim() == '' ||
      this.state.password.trim() == null
    ) {
      this.setState({
        isError: true,
        errorMsg: 'Please fill all required fields.',
        isLoginBtnDisabled: false,
        isLoading: false,
      });
    }
  }

  render() {
    return (
      <Container style={styles.containerLogin}>
        <Content>
          <ImageBackground source={backgroundLogin} style={styles.loginBkg}>
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 70,
                marginBottom: 50,
                marginLeft: 40,
                marginRight: 40,
              }}>
              <Image style={styles.loginLogo} source={dakarLogo} />
              <Text style={{fontSize: 30}}>
                <Text style={{color: '#27acb1'}}>Work</Text>
                <Text style={{fontWeight: 'bold', color: '#ee482c'}}>
                  Attend
                </Text>
              </Text>
            </View>
            <Form>
              {this.state.isError && (
                <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
              )}
              <Item floatingLabel>
                <Label>Username</Label>
                <Input
                  value={this.state.username}
                  onChangeText={username => this.setState({username: username})}
                />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  value={this.state.password}
                  secureTextEntry={true}
                  onChangeText={password => this.setState({password: password})}
                />
              </Item>

              <TouchableOpacity
                style={{margin: 50}}
                onPress={() => this.signIn()}
                disabled={this.state.isLoginBtnDisabled}>
                <View style={styles.button}>
                  <Text style={styles.loginText}>LOGIN</Text>
                </View>
              </TouchableOpacity>
            </Form>
          </ImageBackground>
        </Content>

        {this.state.isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </Container>
    );
  }
}
