import React, {Component} from 'react';

import {View, Dimensions, Text, Image, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import {
  Header,
  Left,
  Right,
  Body,
  Title,
  Container,
  Content,
  Button,
  Row,
} from 'native-base';
import styles from '../../../js/themes/styles';
import {CommonActions} from '@react-navigation/native';
import realm from '../../../js/realm';
import {companyURLCheck} from '../../../js/services/companyURLCheck';

const qrCodeImg = require('../../../img/qr-code.png');

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const scanBarColor = '#22ff00';
const iconScanColor = 'blue';
const rectBorderColor = 'red';
const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency

console.disableYellowBox = true;

//Read it from a file
//const COMPANY_BASE_URL ="https://mobileapi.dakarhr.com/api/Resource";

export default class CompanyRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      torchEnabled: false,
      modalVisible: false,
      isLoading: false,
    };
  }

  componentWillMount() {
    var isScannedQRCode = false;
    var id = 0;
    var realmAppUser = realm.objects('AppSettings');
    if (realmAppUser.length > 0) {
      // id = realmAppUser[0].settingID;
      // if(id!=0)
      //{
      // isScannedQRCode = true;
      //this.props.navigation.navigate('Login');
      const navigateAction = CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });

      this.props.navigation.dispatch(navigateAction);
      // }
      // isScannedQRCode = realmAppUser[0].appBaseURL;
    }

    //if(isScannedQRCode)
    //{
    //this.props.navigation.navigate('Login')
    //}
  }

  onSuccess(e) {
    // alert(e.data);
    this.setState({
      isLoading: true,
    });

    companyURLCheck(e.data)
      .then(res => {
        //alert('res'+JSON.stringify(res));
        if (res != null) {
          //get the URL from key if its correct

          if (res.isExist) {
            //save URL in appSettings
            //store profile to Realm
            var ID = realm.objects('AppSettings').length + 1;
            //  var pathArray = e.data.split('?');
            // var hostname = pathArray[0]+'/api/resource';
            // alert('i am the url'+res.url);
            realm.write(() => {
              realm.create(
                'AppSettings',
                {
                  settingID: ID,
                  appBaseURL: res.url,
                },
                true,
              );
            });

            const navigateAction = CommonActions.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
            this.props.navigation.dispatch(navigateAction);
          } else {
            alert('Incorrect QR Code');
          }
        }
      })
      .catch(function (error) {
        alert('err' + error);
      });

    {
      /*   if (e.data==COMPANY_BASE_URL)
    {
      //save URL in appSettings 
        //store profile to Realm 
        var ID = realm.objects('AppSettings').length + 1;
            
        realm.write(() => {
          realm.create('AppSettings', {
            settingID:ID,
            appBaseURL: COMPANY_BASE_URL,
          }, true);
      });
     
      
      const navigateAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Login" })],
      });
    
      this.props.navigation.dispatch(navigateAction);
    }
    else 
    {
      alert('Incorrect QR Code')
    }*/
    }
  }

  makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  }

  torchSwitch() {
    this.setState({
      torchEnabled: !this.state.torchEnabled,
    });
  }

  companyRegisterText() {
    this.props.navigation.navigate('CompanyRegisterTxt');
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header
          iosStatusbar="light-content"
          androidStatusBarColor="rgba(0,184,108,1)"
          style={styles.header}>
          <Body
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Title allowFontScaling={false} style={styles.Title}>
              Scan company QR Code
            </Title>
          </Body>
        </Header>

        <QRCodeScanner
          showMarker
          onRead={this.onSuccess.bind(this)}
          cameraStyle={{height: SCREEN_HEIGHT}}
          cameraProps={{
            flashMode:
              RNCamera.Constants.FlashMode[
                this.state.torchEnabled ? 'torch' : 'off'
              ],
          }}
          customMarker={
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay}>
                <Image
                  style={{alignContent: 'center', alignItems: 'center'}}
                  source={qrCodeImg}
                />
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={styles.leftAndRightOverlay} />

                <View style={styles.rectangle}>
                  <Icon
                    name="scan-outline"
                    size={SCREEN_WIDTH * 0.6}
                    color={iconScanColor}
                  />
                  <Animatable.View
                    style={styles.scanBar}
                    direction="alternate-reverse"
                    iterationCount="infinite"
                    duration={1700}
                    easing="linear"
                    animation={this.makeSlideOutTranslation(
                      'translateY',
                      SCREEN_WIDTH * -0.54,
                    )}
                  />
                </View>

                <View style={styles.leftAndRightOverlay} />
              </View>

              <View style={styles.bottomOverlay}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{margin: 10}}>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: '#fff',
                        borderRadius: 50,
                      }}
                      onPress={() => this.companyRegisterText()}>
                      <MaterialCommunityIcons
                        name={'border-color'}
                        size={30}
                        color="#01a699"
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{margin: 10}}>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: '#fff',
                        borderRadius: 50,
                      }}
                      onPress={() => this.torchSwitch()}>
                      <MaterialCommunityIcons
                        name={
                          this.state.torchEnabled
                            ? 'flashlight-off'
                            : 'flashlight'
                        }
                        size={30}
                        color="#01a699"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          }
        />
      </Container>
    );
  }
}
