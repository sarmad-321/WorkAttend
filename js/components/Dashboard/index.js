/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  WebView,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  ImageBackground,
  TextInput,
  Dimensions,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Modal,
  Linking,
} from 'react-native';
import styles from '../../../js/themes/styles';
import {
  Header,
  Left,
  Right,
  Body,
  Title,
  Container,
  Content,
  Button,
  CheckBox,
  ListItem,
  Radio,
} from 'native-base';
import MapView, {
  Polygon,
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import moment, {isMoment} from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {getGeoFence} from '../../../js/services/getGeoFence';
import {existGeoFence} from '../../../js/services/existGeoFence';
import {getQuestionnaire} from '../../../js/services/getQuestionnaire';
import {saveQuestionnaire} from '../../../js/services/saveQuestionnaire';
import {storeAppVersion} from '../../../js/services/storeAppVersion';
import {validateDevice} from '../../../js/services/validateDevice';
import {BackHandler} from 'react-navigation';
import GeoFence from './GeoFence';
import realm from '../../../js/realm';
import style from '../Sidebar/style';
import DeviceInfo from 'react-native-device-info';
import {getAttributes} from '../../services/getAttributes';
import LocationPermissions from '../LocationPermissions';
import LocationResetButton from './LocationResetButton';
const done = require('../../../img/done.gif');
const error = require('../../../img/error.gif');
const menu = require('../../../img/menu.png');
const menuBlack = require('../../../img/menuBlack.png');
const marker = require('../../../img/lock.png');
const username = require('../../../img/username.png');
const questionaireBack = require('../../../img/questionaireBack.jpg');
const backgroundLogin = require('../../../img/backgroundLogin.jpg');
const punchMark = require('../../../img/punchMark.png');
const slider = require('../../../img/bckgPunch.jpg');
const panel = require('../../../img/run.png');

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    //var isOnSite = false;
    var mobileUserID = 0;
    var companyID = 0;
    var token = '';
    var employeeEmail = '';
    //var dakarToken="";
    var realmAppUser = realm.objects('employee');
    if (realmAppUser.length > 0) {
      //isOnSite = realmAppUser[0].isOnSite;
      mobileUserID = realmAppUser[0].employeeID;
      token = realmAppUser[0].token;
      employeeEmail = realmAppUser[0].employeeEmail;
      companyID = realmAppUser[0].companyID;
      //dakarToken = realmAppUser[0].dakarToken;
    }
    const {width, height} = Dimensions.get('window');

    this.state = {
      companyID: companyID,
      employeeEmail: employeeEmail,
      token: token,
      mobileUserID: mobileUserID,
      geoFenceCoords: [],
      latitude: null,
      longitude: null,
      error: null,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      height: height,
      ready: true,
      _isMounted: true,
      isLoading: false,
      isSucessPunch: false,
      isErrorPunch: true,
      alertText: '',
      isQuestionnaire: false,
      questions: [],
      declarationQuest: '',
      titleQuest: '',
      currentPunchType: 0,
      errorQuestionsText: '',
      pageTotal: 0,
      pageIndex: [],
      currentHour: '',
      isSubmitPressed: false,
      headerText: '',
      isSubmitQuestRes: false,
      riskScale: '',
      punchInPressed: false,
      intelligentButtons: false,
      isAttributes: false,
      attributeName: '',
      attributeDescription: '',
      punchAttributes: [],
      selectedAttributeID: 0,
      selectedPunchAttValue: '',
      currentPunchType: 0,
      isCollectDaily: false,
      isLocationFetched: false,
    };

    //isOnSite: isOnSite,
    //modalVisible:false,
    //showModel: false,
    //dakarToken: dakarToken,
    //this.getLocation.bind(this),
  }

  renderPagination = () => {
    if (this.state.pageTotal <= 1) {
      return null;
    }

    const ActiveDot = <View style={[styles.dot, styles.activeDot]} />,
      Dot = <View style={styles.dot} />;

    let dots = [];

    for (let key = 0; key < this.state.pageTotal; key++) {
      dots.push(
        this.state.pageIndex[key] == true
          ? //Active dot
            React.cloneElement(ActiveDot, {key})
          : //Other dots
            React.cloneElement(Dot, {key}),
      );
    }

    return (
      <View pointerEvents="none" style={[styles.pagination]}>
        {dots}
      </View>
    );
  };
  /*savePunchQuestionnaireTest(punchType)
  {
    this.setState({isLoading: false,
      isQuestionnaire: false, 
      errorQuestionsText:'',})

      this.setState({
       modalVisible:true, 
       showModel:true,
       isSucessPunch: true,
       isErrorPunch: false,
       alertText: 'alertBoxTextIn',
        })
  }*/
  savePunchQuestionnaire(punchType) {
    this.setState({
      isLoading: true,
      isSubmitPressed: true,
    });

    if (punchType == 0) {
      punchType = 1;
    }

    var baseURLApp = '';
    var realmAppSettings = realm.objects('AppSettings');
    if (realmAppSettings.length > 0) {
      baseURLApp = realmAppSettings[0].appBaseURL;
    }
    var punchInPress = false;
    saveQuestionnaire(
      baseURLApp,
      this.state.token,
      this.state.mobileUserID,
      this.state.lastLat,
      this.state.lastLong,
      punchType,
      this.state.employeeEmail,
      this.state.companyID,
      this.state.questions,
      this.state.selectedAttributeID,
      this.state.selectedPunchAttValue,
    ) //this.state.dakarToken,
      .then(res => {
        var authStr = 'Authorization has been denied for this request.';
        if (res.Message != null && res.Message.includes(authStr)) {
          realm.write(() => {
            realm.deleteAll();
          });
          //token expire
          this.props.navigation.navigate('Login');
        }

        var realmAppUser = realm.objects('employee');
        var userIDMob;

        if (realmAppUser.length > 0) {
          userIDMob = realmAppUser[0].employeeID;
        }
        var jobj = JSON.parse(res);
        var riskScale = '';
        if (res != null) {
          if (jobj.isSaved && jobj.isInsideGeoFence && !jobj.isError) {
            if (punchType == 1) {
              punchInPress = true;
              var realmPunchTypeCurrent = realm.objects('punchInRecord');
              realm.write(() => {
                realm.create(
                  'punchInRecord',
                  {
                    punchInRecordID: 1,
                    punchDateTime: new Date(),
                    punchInPressed: true,
                  },
                  true,
                );
              });

              //questionnaire filled for the day
              var realmPunchTypeCurrent = realm.objects('punchInOfDay');
              realm.write(() => {
                realm.create(
                  'punchInOfDay',
                  {
                    punchInOfDayID: 1,
                    punchInDateTime: new Date(),
                    punchInType: 1,
                  },
                  true,
                );
              });

              if (jobj.usermessage != null && jobj.usermessage != '') {
                alertBoxTextIn = jobj.usermessage;
                riskScale = jobj.resultScale;
              } else {
                alertBoxTextIn = 'You Clocked In. Have a nice day.';
                //update realm punchstate
              }
            } else {
              var realmPunchTypeCurrent = realm.objects('punchInRecord');
              realm.write(() => {
                realm.create(
                  'punchInRecord',
                  {
                    punchInRecordID: 1,
                    punchDateTime: new Date(),
                    punchInPressed: false,
                  },
                  true,
                );
              });
              alertBoxTextIn =
                "You Clocked Out. We'll see you back here later.";
            }

            this.setState({
              //modalVisible:true,
              //showModel:true,
              isLoading: false,
              /*isQuestionnaire: false, 
           errorQuestionsText:'',
           isSucessPunch: true,
           isErrorPunch: false,
           alertText: alertBoxTextIn, 
           isSubmitPressed: false,*/
              errorQuestionsText: '',
              isSucessPunch: true,
              isErrorPunch: false,
              alertText: alertBoxTextIn,
              isSubmitPressed: false,
              isSubmitQuestRes: true,
              riskScale: riskScale,
              punchInPressed: punchInPress,
            });
            /* Alert.alert("Thank You", alertBoxTextIn, [
              { text: "OK", onPress: () => { this.setState({ 
                isQuestionnaire: false, 
                errorQuestionsText:'',
                isSucessPunch: true,
                isErrorPunch: false,
                alertText: alertBoxTextIn, 
                isSubmitPressed: false,
                isSubmitQuestRes: true, }) }}    
            ], { cancelable: false}) */
            //Alert.alert('Success',alertBoxTextIn)
          } else {
            this.setState({
              isLoading: false,
              /* isQuestionnaire: false, 
          errorQuestionsText:'',
          isSucessPunch: false,
          isErrorPunch: true,
          isLoading: false,
          alertText:'Unable to Punch. User must be present at the assigned location.', 
          isSubmitPressed: false,*/
            });
            //Alert.alert('Error','Unable to Punch. User must be present at the assigned location.')
            Alert.alert(
              'Error',
              'Unable to Punch. User must be present at the assigned location.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    this.setState({
                      isQuestionnaire: false,
                      errorQuestionsText: '',
                      isSucessPunch: false,
                      isErrorPunch: true,
                      isLoading: false,
                      alertText:
                        'Unable to Punch. User must be present at the assigned location.',
                      isSubmitPressed: false,
                    });
                  },
                },
              ],
              {cancelable: false},
            );
          }
        } else {
          this.setState({
            isLoading: false,
            isQuestionnaire: false,
            errorQuestionsText: '',
            isSucessPunch: false,
            isErrorPunch: true,
            isLoading: false,
            alertText: 'Something went wrong.',
            isSubmitPressed: false,
          });
        }
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  markPunch(punchType) {
    this.setState({
      isLoading: true,
    });
    var baseURLApp = '';
    var realmAppSettings = realm.objects('AppSettings');
    if (realmAppSettings.length > 0) {
      baseURLApp = realmAppSettings[0].appBaseURL;
    }

    //  selectedAttributeID: 0,
    // selectedPunchAttValue: '',
    existGeoFence(
      baseURLApp,
      this.state.token,
      this.state.mobileUserID,
      this.state.lastLat,
      this.state.lastLong,
      punchType,
      this.state.employeeEmail,
      this.state.selectedAttributeID,
      this.state.selectedPunchAttValue,
    ) //this.state.dakarToken,
      .then(res => {
        // alert(JSON.stringify('latitude: ' + this.state.lastLat+ 'longitude: ' + this.state.lastLong));
        var authStr = 'Authorization has been denied for this request.';
        if (res.Message != null && res.Message.includes(authStr)) {
          realm.write(() => {
            realm.deleteAll();
          });
          //token expire
          this.props.navigation.navigate('Login');
        }

        var realmAppUser = realm.objects('employee');
        var userIDMob;
        if (realmAppUser.length > 0) {
          userIDMob = realmAppUser[0].employeeID;
        }

        if (res) {
          var alertBoxTextIn = '';
          var punchInPressed = false;
          if (punchType == 1) {
            alertBoxTextIn = 'You Clocked in. Have a nice day.';
            punchInPressed = true;
            var realmPunchTypeCurrent = realm.objects('punchInRecord');
            realm.write(() => {
              realm.create(
                'punchInRecord',
                {
                  punchInRecordID: 1,
                  punchDateTime: new Date(),
                  punchInPressed: true,
                },
                true,
              );
            });
          } else {
            var realmPunchTypeCurrent = realm.objects('punchInRecord');
            realm.write(() => {
              realm.create(
                'punchInRecord',
                {
                  punchInRecordID: 1,
                  punchDateTime: new Date(),
                  punchInPressed: false,
                },
                true,
              );
            });
            alertBoxTextIn = "You Clocked out. We'll see you back here later.";
          }

          this.setState({
            isLoading: false,
            modalVisible: true,
            showModel: true,
            isSucessPunch: true,
            isErrorPunch: false,
            alertText: alertBoxTextIn,
            punchInPressed: punchInPressed,
          });
          Alert.alert('Thank You', alertBoxTextIn);
        } else {
          this.setState({
            modalVisible: true,
            showModel: true,
            isSucessPunch: false,
            isErrorPunch: true,
            isLoading: false,
            alertText:
              'Unable to Punch User must be present at the assigned location.',
          });
          Alert.alert(
            'Error',
            'Unable to Punch User must be present at the assigned location',
          );
        }
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  punch(punchType) {
    this.setState({
      isLoading: true,
      isSubmitPressed: false,
    });

    var baseURLApp = '';
    var realmAppSettings = realm.objects('AppSettings');
    if (realmAppSettings.length > 0) {
      baseURLApp = realmAppSettings[0].appBaseURL;
    }
    //check if this is first punch of the day for this user
    ///if user have punch in pressed that checks the punch in for last 24 hours so this means user have already marked in
    //pop-up questionnaire already shown - do not show it again
    //activity if isCollectDaily - means show it only once in a day

    var isPopUpShown = false;
    var realmPunchInOfDay = realm.objects('punchInOfDay');
    if (realmPunchInOfDay.length > 0) {
      const realmPunchInDate = realmPunchInOfDay[0].punchInDateTime;
      const todayDate = new Date();
      //alert('realm realmPunchInDate' + realmPunchInDate +'todayDate' + todayDate);
      if (
        realmPunchInDate.getFullYear() === todayDate.getFullYear() &&
        realmPunchInDate.getDate() === todayDate.getDate() &&
        realmPunchInDate.getMonth() === todayDate.getMonth()
      ) {
        isPopUpShown = true;
      }
    }
    //alert(isPopUpShown);

    if (isPopUpShown) {
      //check attribute is supposed to shown or not
      //check if user has any activity
      getAttributes(
        baseURLApp,
        this.state.token,
        this.state.companyID,
        this.props.navigation,
      ).then(responseAtt => {
        //alert('attribute'+this.state.companyID+JSON.stringify(responseAtt));
        if (responseAtt != null) {
          if (!responseAtt.isCollectDaily) {
            this.setState({
              isAttributes: true,
              attributeName: responseAtt.attributeDisplayName,
              attributeDescription: responseAtt.attributeDescription,
              punchAttributes: responseAtt.punchattributeValues,
              currentPunchType: punchType,
              isCollectDaily: responseAtt.isCollectDaily,
            });
          } else {
            this.markPunch(punchType);
          }
        } else {
          this.markPunch(punchType);
        }
      });
    } else {
      //check if user has any activity
      getAttributes(
        baseURLApp,
        this.state.token,
        this.state.companyID,
        this.props.navigation,
      ).then(responseAtt => {
        //alert('attribute'+this.state.companyID+JSON.stringify(responseAtt));
        if (responseAtt != null) {
          this.setState({
            isAttributes: true,
            attributeName: responseAtt.attributeDisplayName,
            attributeDescription: responseAtt.attributeDescription,
            punchAttributes: responseAtt.punchattributeValues,
            currentPunchType: punchType,
            isCollectDaily: responseAtt.isCollectDaily,
          });
        } else {
          //contiue with the questionnaire normal logic
          ///first check if we have questionnaire
          getQuestionnaire(
            baseURLApp,
            this.state.token,
            this.state.companyID,
            this.props.navigation,
          )
            .then(result => {
              var res = result.data;
              // alert('here'+JSON.stringify(res));
              var authStr = 'Authorization has been denied for this request.';
              /*if(res!=null && res.Message!=null && res.Message.includes(authStr))
{
realm.write(() => {
   realm.deleteAll();
});
//token expire
this.props.navigation.navigate('Login');
}
else 
{*/
              if (res != null && res.questions[0] != null) {
                var questionArray = [];
                questionArray = res.questions;

                questionArray = questionArray.map(data => {
                  var o = Object.assign({}, data);
                  o.options = [
                    {
                      id: 1,
                      title: 'YES',
                      isChecked: false,
                    },
                    {
                      id: 2,
                      title: 'NO',
                      isChecked: false,
                    },
                  ];
                  return o;
                });

                var currentIndex = [];
                for (var i = 0; i < questionArray.length; i++) {
                  currentIndex[i] = false;
                }
                this.setState({
                  isLoading: false,
                  pageTotal: questionArray.length,
                  pageIndex: currentIndex,
                  questions: questionArray,
                  isQuestionnaire: true,
                  declarationQuest: res.declaration,
                  titleQuest: res.title,
                  currentPunchType: punchType,
                  headerText: res.headerText,
                });
              } else {
                this.markPunch(punchType);
              }

              //}
            })
            .catch(function (error) {
              alert('error' + error.message);
            });
        }
      });
    }
  }

  getLocation() {
    if (this.state._isMounted) {
      let realmUser = realm.objects('employee');
      let token = '';
      let mobileUserID = 0;
      if (realmUser.length > 0) {
        token = realmUser[0].token;
        mobileUserID = realmUser[0].employeeID;
      }

      if (mobileUserID > 0 && token != '') {
        var baseURLApp = '';
        var realmAppSettings = realm.objects('AppSettings');
        if (realmAppSettings.length > 0) {
          baseURLApp = realmAppSettings[0].appBaseURL;
        }

        getGeoFence(baseURLApp, token, mobileUserID)
          .then(res => {
            var authStr = 'Authorization has been denied for this request.';
            if (res.Message != null && res.Message.includes(authStr)) {
              realm.write(() => {
                realm.deleteAll();
              });
              //token expire
              //  this.props.navigation.navigate('Login');

              //TODO: Remove after V2 release
              this.props.navigation.navigate('CompanyRegister');
            }

            //create region array
            if (res.length > 0) {
              this.setState({geoFenceCoords: res});
            }
          })
          .catch(function (error) {
            alert(error.message);
          });
      }
    }
  }

  setRegion(region) {
    // alert(JSON.stringify(region))
    if (this.state.ready) {
      // console.log(JSON.stringify(region))
      var counter = 0;
      this.setState({isLoading: true});
      while (this.map == null && counter < 4) {
        setTimeout(() => counter++, 500);
      }

      if (this.map != null) {
        setTimeout(() => this.map.animateToRegion(region), 500);
      }

      this.setState({isLoading: false});
    }
    //this.setState({ region });
  }

  onMapReady = e => {
    if (!this.state.ready) {
      // alert('hii')
      this.setState({ready: true});
    }
    // alert('map'+  e.ACCESS_FINE_LOCATION);
  };

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
        setTimeout(() => {
          Alert.alert(
            'Location Services Disabled',
            'Please enable location services to use this app.',
            [{text: 'OK', onPress: () => Linking.openSettings()}],
          );
        }, 2000);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  /*componentWillUnmount()
{
  this.state._isMounted = false;
 // navigator.geolocation.clearWatch(this.watchID);
 // alert('componentWillUnmount')
}*/
  getHour = () => {
    const date = new Date();
    const hr = date.getHours();
    var hourText = '';
    /*if(hour>4 && hour<13)
  {hourText='Good Morning!'}
  else if(hour>12 && hour<18)
  {hourText='Good Afternoon!'}
  else if(hour>17 && hour<=23)
  {hourText='Good Evening!'}
  else if(hour>24 && hour<=4)
  {hourText='Good Evening!'}*/

    if (hr >= 0 && hr < 12) {
      hourText = 'Good Morning!';
    } else if (hr >= 12 && hr <= 17) {
      hourText = 'Good Afternoon!';
    } else {
      hourText = 'Good Evening!';
    }

    this.setState({
      currentHour: hourText,
    });
  };

  async validateActiveDevice() {
    var currentVersion = await DeviceInfo.getVersion();
    const uniqueId = await DeviceInfo.getUniqueId();
    const manufacturer = await DeviceInfo.getManufacturer();

    var baseURLApp = '';
    var realmAppSettings = realm.objects('AppSettings');
    if (realmAppSettings.length > 0) {
      baseURLApp = realmAppSettings[0].appBaseURL;
    }
    //alert(currentVersion)
    validateDevice(
      baseURLApp,
      this.state.token,
      this.state.mobileUserID,
      currentVersion,
      manufacturer,
      uniqueId,
    )
      .then(res => {
        //alert(JSON.stringify(res));
        // var intelligentButton = false;

        if (res != null && res.isInCorrectDevice) {
          //redirect user to scan QR Code

          realm.write(() => {
            realm.deleteAll();
          });
          Alert.alert('Error', res.message);
        } else {
        }
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  async saveAppVersion() {
    var currentVersion = await DeviceInfo.getVersion();
    var manufacturer = await DeviceInfo.getManufacturer();

    var baseURLApp = '';
    var realmAppSettings = realm.objects('AppSettings');
    if (realmAppSettings.length > 0) {
      baseURLApp = realmAppSettings[0].appBaseURL;
    }
    //alert(currentVersion)
    storeAppVersion(
      baseURLApp,
      this.state.token,
      this.state.mobileUserID,
      currentVersion,
      manufacturer,
    )
      .then(res => {
        //alert('here')
        // var intelligentButton = false;

        if (res != null && res) {
          this.setState({
            intelligentButtons: true,
          });
        }
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  componentDidMount() {
    //alert( realm.objects('employee').length);
    var realmPunchTypeCurrent = realm.objects('punchInRecord');
    //automatic reset in if nnot clock out in last 24 hours
    //if(realmPunchTypeCurrent.length>0)

    this.locationFetchInterval = setInterval(() => {
      // Check if location is fetched
      this.initStateMap();
      if (this.state.isLocationFetched) {
        // If location is fetched, clear interval and return
        clearInterval(this.locationFetchInterval);
        return;
      }

      // Code to fetch location...
    }, 5000); // Interval time in milliseconds

    if (realmPunchTypeCurrent.length > 0) {
      const yourDateMilliseconds =
        realmPunchTypeCurrent[0].punchDateTime.getTime();
      const actualTimeMilliseconds = new Date().getTime();
      if (
        realmPunchTypeCurrent.length > 0 &&
        realmPunchTypeCurrent[0].punchInPressed &&
        actualTimeMilliseconds - yourDateMilliseconds > 86400000
      ) {
        //24 Hour = 86400000 milliseconds
        var realmPunchTypeCurrent = realm.objects('punchInRecord');
        realm.write(() => {
          realm.create(
            'punchInRecord',
            {
              punchInRecordID: 1,
              punchDateTime: new Date(),
              punchInPressed: false,
            },
            true,
          );
        });

        this.setState({
          punchInPressed: false,
        });
      } else {
        this.setState({
          punchInPressed: realmPunchTypeCurrent[0].punchInPressed,
        });
      }
    }
    //alert( '  intelligent btn val:'+ this.state.intelligentButtons +'  punchInPressed val:'+ this.state.punchInPressed)
    this.getHour();
    this.saveAppVersion();
    this.validateActiveDevice();
    if (Platform.OS == 'android') {
      this.requestLocationPermission();
    }
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.onFocusFunction();
    });
  }

  getUserLocation() {
    console.log('get user location called ?');
    if (this.watchID) {
      navigator.geolocation.clearWatch(this.watchID);
    }
    this.initStateMap();
  }

  onFocusFunction() {
    this.setState(
      {
        geoFenceCoords: [],
      },
      () => {
        this.getLocation();
        this.initStateMap();
      },
    );

    /* var isOnSite = false;
  var mobileUserID =0;
  var token="";
  var dakarToken="";
  var realmAppUser = realm.objects('AppUser');
  if(realmAppUser.length > 0)
  {
    isOnSite = realmAppUser[0].isOnSite;
    mobileUserID = realmAppUser[0].mobileUserID;
    token = realmAppUser[0].token;
    dakarToken = realmAppUser[0].dakarToken;
  }
  const { width, height } = Dimensions.get('window');
  this.setState({dakarToken: dakarToken,
token: token,
mobileUserID: mobileUserID,
geoFenceCoords: [],
latitude: null,
longitude: null,
error: null,
isOnSite: isOnSite,
mapRegion: null,
lastLat: null,
lastLong: null,
height: height,
ready: true,
_isMounted: true,
isLoading: false,}, () => {
  this.initStateMap();
});*/

    //this.initStateMap();
  }

  componentWillUnmount() {
    //alert('unmounntr');
    console.log('unmount called?');
    if (this.locationFetchInterval) {
      clearInterval(this.locationFetchInterval);
    }

    if (this.focusListener) {
      this.focusListener();
      this.state._isMounted = false;
    }
    if (this.watchID) {
      navigator.geolocation.clearWatch(this.watchID);
    }
  }

  async initStateMap() {
    console.log('Init function called');
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location',
      },
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      return;
    }
    this.setState({_isMounted: true});

    // alert('componentDidMount' + this.state._isMounted)
    if (this.state._isMounted) {
      var LATITUDE_DELTA = 0.00333266201122472694;
      var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
      // console.log(':)');
      navigator.geolocation.getCurrentPosition(
        position => {
          // alert('lat'+position.coords.latitude+'long'+position.coords.longitude);
          this.setState({
            isLocationFetched: true,
          });
          console.log(JSON.stringify(position), 'Current Position');
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            lastLat: position.coords.latitude,
            lastLong: position.coords.longitude,
            error: null,
          });

          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          this.setRegion(region);
          this.onRegionChange(region, region.latitude, region.longitude);
        },
        error => console.log(error.message),
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 10000},
      );

      //alert('before');
      this.watchID = navigator.geolocation.watchPosition(
        position => {
          // Create the object to update this.state.mapRegion through the onRegionChange function

          // alert('inside');

          this.setState({
            isLocationFetched: true,
          });
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };

          // alert('here2')
          this.onRegionChange(region, region.latitude, region.longitude);
        },
        error => this.setState({error: error.message}),
        //  {enableHighAccuracy: true, timeout: 20000, maximumAge: 0}//1000}
        {
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 1000,
          distanceFilter: 5,
        },
      );
    }
  }

  onRegionChange(region, lastLat, lastLong) {
    // alert('i m valled' +JSON.stringify(region));
    if (this.state._isMounted) {
      //  alert('lang' + lastLat + lastLong)
      this.setState({
        mapRegion: region,
        // If there are no new values set use the the current ones
        lastLat: lastLat || this.state.lastLat,
        lastLong: lastLong || this.state.lastLong,
      });
    }
    //alert('latlong' + this.state.lastLat+ this.state.lastLong);
  }

  onPress() {
    console.log('here');
  }
  calloutPress() {
    console.log('callout press');
  }

  checkAttribute(punchAttributeValueID, punchAttributeValue) {
    var punchAttributesArr = this.state.punchAttributes;
    punchAttributesArr.map(item => {
      item.isChecked = false;
      if (item.punchAttributeValueID === punchAttributeValueID) {
        item.isChecked = true;
      }
    });
    //punchAttributesArr.find(data => data.punchAttributeValueID === punchAttributeValueID).isChecked= true;
    //var currentAttr = punchAttributesArr.find(data => data.punchAttributeValueID === punchAttributeValueID);
    //alert(JSON.stringify(currentAttr));

    this.setState({
      selectedAttributeID: punchAttributeValueID,
      selectedPunchAttValue: punchAttributeValue,
      punchAttributes: punchAttributesArr,
    });
  }

  checkQuestion(index, opt, optIndex) {
    var questionsCopy = this.state.questions;
    var currentCond = !opt.isChecked;
    //questionsCopy[index].options[optIndex].checked = !opt.checked;
    questionsCopy[index].options.map(item => {
      item.isChecked = opt.isChecked;
    });
    questionsCopy[index].options[optIndex].isChecked = currentCond;
    // alert(JSON.stringify(questionsCopy));

    var newPageIndex = this.state.pageIndex;
    questionsCopy.map((item, index) => {
      var exist = false;
      item.options.map((optionItem, optionIndex) => {
        if (optionItem.isChecked) {
          exist = true;
        }
      });
      if (exist) newPageIndex[index] = true;
      else newPageIndex[index] = false;
    });

    this.setState({
      questions: questionsCopy,
      pageIndex: newPageIndex,
    });

    //alert(this.state.questions[index].isChecked);
  }
  cancelEmployeeAttribute() {
    this.setState({
      isLoading: false,
      isAttributes: false,
      errorQuestionsText: '',
      alertBoxTextIn: '',
    });
  }
  saveEmployeeAttribute() {
    var punchType = this.state.currentPunchType;
    this.setState({
      isLoading: true,
      isSubmitPressed: false,
      isAttributes: false,
    });
    var baseURLApp = '';
    var realmAppSettings = realm.objects('AppSettings');
    if (realmAppSettings.length > 0) {
      baseURLApp = realmAppSettings[0].appBaseURL;
    }
    //check if questionnaire is shown already so do not show it
    var isPopUpShownQuest = false;
    var realmPunchInOfDay = realm.objects('punchInOfDay');
    if (realmPunchInOfDay.length > 0) {
      const realmPunchInDate = realmPunchInOfDay[0].punchInDateTime;
      const todayDate = new Date();
      //alert('realm realmPunchInDate' + realmPunchInDate +'todayDate' + todayDate);
      if (
        realmPunchInDate.getFullYear() === todayDate.getFullYear() &&
        realmPunchInDate.getDate() === todayDate.getDate() &&
        realmPunchInDate.getMonth() === todayDate.getMonth()
      ) {
        isPopUpShownQuest = true;
      }
    }

    if (!isPopUpShownQuest) {
      //contiue with the questionnaire normal logic
      ///first check if we have questionnaire
      getQuestionnaire(
        baseURLApp,
        this.state.token,
        this.state.companyID,
        this.props.navigation,
      )
        .then(result => {
          var res = result.data;
          if (res != null && res.questions[0] != null) {
            var questionArray = [];
            questionArray = res.questions;

            questionArray = questionArray.map(data => {
              var o = Object.assign({}, data);
              o.options = [
                {
                  id: 1,
                  title: 'YES',
                  isChecked: false,
                },
                {
                  id: 2,
                  title: 'NO',
                  isChecked: false,
                },
              ];
              return o;
            });

            var currentIndex = [];
            for (var i = 0; i < questionArray.length; i++) {
              currentIndex[i] = false;
            }

            this.setState({
              isLoading: false,
              pageTotal: questionArray.length,
              pageIndex: currentIndex,
              questions: questionArray,
              isQuestionnaire: true,
              declarationQuest: res.declaration,
              titleQuest: res.title,
              currentPunchType: punchType,
              headerText: res.headerText,
            });
          } else {
            //if no questionnaire
            //if(this.state.isCollectDaily)
            //  {
            //attribute filled for the day dont display pop up for the day
            var realmPunchTypeCurrent = realm.objects('punchInOfDay');
            realm.write(() => {
              realm.create(
                'punchInOfDay',
                {
                  punchInOfDayID: 1,
                  punchInDateTime: new Date(),
                  punchInType: 1,
                },
                true,
              );
            });
            //}

            this.markPunch(punchType);
          }

          //}
        })
        .catch(function (error) {
          alert('error' + error.message);
        });
    } else {
      //questionnaire filled already
      var realmPunchTypeCurrent = realm.objects('punchInOfDay');
      realm.write(() => {
        realm.create(
          'punchInOfDay',
          {
            punchInOfDayID: 1,
            punchInDateTime: new Date(),
            punchInType: 1,
          },
          true,
        );
      });
      //}

      this.markPunch(punchType);
    }
  }

  cancelEmployeeQuestionnnaire() {
    this.setState({
      isLoading: false,
      isQuestionnaire: false,
      errorQuestionsText: '',
      alertBoxTextIn: '',
    });
  }
  saveEmployeeQuestionnaire() {
    // alert(JSON.stringify(this.state.questions));
    var validationItem = [];
    var count = 0;
    var validationError = true;
    this.state.questions.map((item, index) => {
      item.options.map((optionItem, index) => {
        // validationError = true;
        if (optionItem.isChecked) {
          //validationError = false;
          count++;
        }
      });
    });

    if (count == this.state.questions.length) {
      /* this.setState({
      isQuestionnaire: false, 
      errorQuestionsText:'',
    })*/
      this.savePunchQuestionnaire(this.state.currentPunchType);
    } else {
      this.setState({
        errorQuestionsText: 'Please answer all the questions.',
      });
    }
  }

  submitQuestRes() {
    this.setState({
      isSubmitQuestRes: false,
      isQuestionnaire: false,
    });
  }

  checkNotNull(value1, value2) {
    if (value1 && value2) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    var that = this;
    return (
      <Container style={styles.container}>
        <LocationResetButton onPress={() => this.getUserLocation()} />
        <View>
          <LocationPermissions initLocation={() => this.getUserLocation()} />
          <MapView
            provider={Platform.OS == 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
            ref={map => {
              this.map = map;
            }}
            region={this.state.mapRegion}
            //onRegionChangeComplete={region => this.setState({ region })}
            style={{
              height: this.state.height,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={false}
            onMapReady={this.onMapReady}
            zoomEnabled={true}>
            {this.state.geoFenceCoords != undefined &&
              this.state.geoFenceCoords.map((coords, i) => (
                <Polygon
                  key={i}
                  coordinates={coords}
                  strokeColor="rgb(84,181,64)"
                  strokeWidth={2}
                  fillColor="rgba(84,181,64,0.2)"
                  onPress={() => this.onPress()}
                />
              ))}
            {this.checkNotNull(this.state.lastLat, this.state.lastLong) ? (
              <Marker
                coordinate={{
                  latitude: this.state.lastLat,
                  longitude: this.state.lastLong,
                }}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.calloutViewPin}>
                    {this.state.lastLat ? (
                      <Text style={styles.textLocPin}>
                        Your current location
                      </Text>
                    ) : null}
                  </View>
                  <Image
                    source={marker}
                    style={{width: 20, height: 30, paddingTop: 0, marginTop: 0}}
                  />
                </View>
              </Marker>
            ) : null}
            {/* {this.state.lastLat != null && this.state.lastLong != null && (
              <Marker
                coordinate={{
                  latitude: this.state.lastLat,
                  longitude: this.state.lastLong,
                }}
                pinColor="red"
                title="You are here!"
              />
            )} */}
          </MapView>
          <Callout>
            <View style={styles.containerCallout}>
              <Header
                iosStatusbar="light-content"
                androidStatusBarColor="rgba(0,184,108,1)"
                style={styles.headerDashboard}>
                <Left style={{flex: 1}}>
                  <Button
                    transparent
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Icon name="menu-outline" style={styles.iconMenuTop} />
                  </Button>
                </Left>
                <Body
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></Body>
                <Right style={{flex: 4}}>
                  {/*  <Title allowFontScaling={false} style={styles.TitleDashCustom}>Work Attend</Title>*/}
                </Right>
              </Header>

              <View style={styles.calloutView}>
                {/*   <Icon name='ios-radio-button-off' style={styles.iconLoc}/>*/}
                <Image
                  source={panel}
                  style={{width: 30, height: 30, marginTop: 13}}
                />
                {this.state.lastLat != null && this.state.lastLong != null && (
                  <Text style={styles.textLoc}>
                    <Text>My Pin Location</Text>
                    <Text style={styles.textLatLong}>
                      {' '}
                      {'\n'}[{String(this.state.lastLat).substring(0, 10)},
                      {String(this.state.lastLong).substring(0, 10)}]
                    </Text>
                  </Text>
                )}
              </View>
            </View>
          </Callout>

          {/*PUNCH BUTTONS*/}
          {/*
    <View style={styles.punchBtnDash}>
    {this.state.alertText!='' && this.state.isSucessPunch && <Text>{this.state.alertText}</Text>}
    {this.state.alertText!='' && this.state.isErrorPunch && <Text>{this.state.alertText}</Text>}
    <View style={{flex:1, flexDirection: 'row',  }}>
    <TouchableOpacity  style={styles.punchBtnStartDash} onPress={()=> this.punch(1)}>
    <Text style={styles.punchInBtnText}>CLOCK IN</Text>
    </TouchableOpacity>
    </View>

    <View style={{flex: 1, flexDirection: 'row',}}>
    <TouchableOpacity  style={styles.punchBtnStartDash} onPress={()=> this.markPunch(2)}>
    <Text style={styles.punchInBtnText}>CLOCK OUT</Text>
    </TouchableOpacity>
    </View>
    </View>*/}

          <View style={styles.punchBtnDash}>
            <ImageBackground source={slider} style={styles.punchImageBkg}>
              <View style={{paddingLeft: 10, paddingRight: 10}}>
                <View style={{paddingTop: 10, paddingBottom: 10}}>
                  {this.state.currentHour != '' && (
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'rgba(0,0,0, 0.7)',
                      }}>
                      {this.state.currentHour}
                    </Text>
                  )}
                  {this.state.alertText == '' && (
                    <Text style={{color: 'rgba(0,0,0, 0.7)'}}>
                      Nice to see you.
                    </Text>
                  )}
                  {this.state.alertText != '' && this.state.isSucessPunch && (
                    <Text style={styles.sucessTextClock}>
                      {this.state.alertText}
                    </Text>
                  )}
                  {this.state.alertText != '' && this.state.isErrorPunch && (
                    <Text style={styles.errorTextClock}>
                      {this.state.alertText}
                    </Text>
                  )}
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  {this.state.intelligentButtons && (
                    <View style={styles.punchButtonsView}>
                      {!this.state.punchInPressed && (
                        <TouchableOpacity
                          style={styles.punchBtnStartDash}
                          onPress={() => this.punch(1)}>
                          <Text style={styles.punchInBtnText}>CLOCK IN</Text>
                        </TouchableOpacity>
                      )}

                      {this.state.punchInPressed && (
                        <TouchableOpacity
                          style={styles.punchBtnendDash}
                          onPress={() => this.markPunch(2)}>
                          <Text style={styles.punchInBtnText}>CLOCK OUT</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}

                  {!this.state.intelligentButtons && (
                    <View style={styles.punchButtonsView}>
                      <TouchableOpacity
                        style={styles.punchBtnStartDash}
                        onPress={() => this.punch(1)}>
                        <Text style={styles.punchInBtnText}>CLOCK IN</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.punchBtnendDash}
                        onPress={() => this.markPunch(2)}>
                        <Text style={styles.punchInBtnText}>CLOCK OUT</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              {/* <View style={styles.punchMArkImageView}>
      <Image source={punchMark} style={{height:100, width:100, opacity:0.4}}/>
      </View>*/}
            </ImageBackground>
          </View>

          {/*<View style={styles.punchBtnDash}>
     {this.state.alertText!='' && this.state.isSucessPunch && <Text>{this.state.alertText}</Text>}
    {this.state.alertText!='' && this.state.isErrorPunch && <Text>{this.state.alertText}</Text>}

 <View style={{ flex:1, alignItems:'flex-end', justifyContent: 'flex-end'}}>
   <Image source={username} style={{height:70, width:70}}/>
   </View>
<View style={{flex:1, flexDirection: 'row',  marginLeft:30, marginRight:30}}>
  <TouchableOpacity  style={styles.punchBtnStartDash} onPress={()=> this.punch(1)}>
    <Text style={styles.punchInBtnText}>CLOCK IN</Text>
    </TouchableOpacity>
    </View>

    <View style={{flex: 1, flexDirection: 'row', marginLeft:30, marginRight:30}}>
    <TouchableOpacity  style={styles.punchBtnStartDash} onPress={()=> this.markPunch(2)}>
    <Text style={styles.punchInBtnText}>CLOCK OUT</Text>

    </TouchableOpacity>
      </View>
   </View>*/}

          {/*PUNCH BUTTONS*/}

          {/*PUNCH ALERT BOX SUCCESS OR FAIL
{this.state.alertText!='' && <View style={styles.alertboxDash}>
 <View style={{ flex: 1,
 flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22, 
    padding:10}}>
   <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
         // Alert.alert("Modal has been closed.");
        }}>
        <View style={styles.centeredViewDash}>
          <View style={styles.modalViewDash}>
           {this.state.isSucessPunch && <Image style={{ alignContent:"center", alignItems:"center"}} source={done} />}
           {this.state.isErrorPunch && <Image style={{ alignContent:"center", alignItems:"center"}} source={error} />}
            <Text style={styles.modalText}>{this.state.alertText}</Text>
            <TouchableOpacity  style={styles.modalButtonBack} onPress={()=> this.setState({
              showModel: false,
              modalVisible: false,
              isSucessPunch:false, 
              isErrorPunch: false, 
              alertText: '',
            })}>
    <Text style={styles.modalButton}>OK</Text>
    </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>

          </View>}*/}

          {this.state.isAttributes && (
            <View style={styles.questionaireDash}>
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.isAttributes}
                  //swipeToClose={true}
                  swipeArea={20} // The height in pixels of the swipeable area, window height by default
                  swipeThreshold={50} // The threshold to reach in pixels to close the modal
                  onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                  }}>
                  <View style={styles.centeredViewQuest}>
                    <View style={styles.modalViewQuest}>
                      <Text style={styles.errorMsg}>
                        {this.state.errorAttributeText}
                      </Text>
                      <Text
                        style={[
                          styles.questionaireTopText,
                          {textTransform: 'capitalize'},
                        ]}>
                        {this.state.attributeName}
                      </Text>
                      <Text
                        style={[
                          styles.questionaireTopText,
                          {textTransform: 'capitalize'},
                        ]}>
                        {this.state.attributeDescription}
                      </Text>
                      <ScrollView persistentScrollbar={true}>
                        <View>
                          {this.state.punchAttributes.map((item, itemIndex) => (
                            <ListItem
                              noBorder
                              onPress={() =>
                                this.checkAttribute(
                                  item.punchAttributeValueID,
                                  item.punchAttributeValue,
                                )
                              }>
                              <CheckBox
                                onPress={() =>
                                  this.checkAttribute(
                                    item.punchAttributeValueID,
                                    item.punchAttributeValue,
                                  )
                                }
                                color="green"
                                checked={item.isChecked}
                              />
                              <Text>{item.punchAttributeValue}</Text>
                            </ListItem>
                          ))}
                        </View>
                      </ScrollView>

                      <TouchableOpacity
                        disabled={this.state.isSubmitPressed}
                        onPress={() => this.saveEmployeeAttribute()}
                        style={styles.questSubmit}>
                        <Text style={styles.punchInBtnText}>Submit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.cancelEmployeeAttribute()}
                        style={styles.questSubmitCancel}>
                        <Text style={styles.punchInBtnText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          )}

          {this.state.isQuestionnaire && (
            <View style={styles.questionaireDash}>
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.isQuestionnaire}
                  //swipeToClose={true}
                  swipeArea={20} // The height in pixels of the swipeable area, window height by default
                  swipeThreshold={50} // The threshold to reach in pixels to close the modal
                  onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                  }}>
                  <View style={styles.centeredViewQuest}>
                    {this.state.isSubmitQuestRes && (
                      <View style={styles.modalViewQuest}>
                        {this.state.riskScale == 'high' && (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Icon
                              name="ios-alert"
                              style={{
                                fontSize: 40,
                                color: '#d99e16',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            />
                            <Text>{this.state.alertText}</Text>
                          </View>
                        )}
                        {this.state.riskScale != 'high' && (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Icon
                              name="ios-checkmark-circle-outline"
                              style={{
                                fontSize: 40,
                                color: 'rgba(0,184,108,1)',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            />
                            <Text>{this.state.alertText}</Text>
                          </View>
                        )}
                        <TouchableOpacity
                          onPress={() => this.submitQuestRes()}
                          style={styles.questResultSubmit}>
                          <Text style={styles.punchInBtnText}>ok</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    {!this.state.isSubmitQuestRes && (
                      <View style={styles.modalViewQuest}>
                        {this.renderPagination()}
                        <Text style={styles.errorMsg}>
                          {this.state.errorQuestionsText}
                        </Text>
                        {/*Hi there, a quick questions for you, Over the last 3 days, have beenhad done any of the following: */}
                        <Text style={styles.questionaireTopText}>
                          {this.state.headerText}
                        </Text>
                        <ScrollView persistentScrollbar={true}>
                          {this.state.questions.map((item, index) => (
                            <View>
                              <Text style={styles.questionText} key={index}>
                                {item.text}
                              </Text>
                              {item.questionTypeID == 1 && (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                  }}>
                                  {item.options.map((opt, optIndex) => (
                                    <ListItem
                                      noBorder
                                      onPress={() =>
                                        this.checkQuestion(index, opt, optIndex)
                                      }>
                                      <CheckBox
                                        color="green"
                                        onPress={() =>
                                          this.checkQuestion(
                                            index,
                                            opt,
                                            optIndex,
                                          )
                                        }
                                        checked={opt.isChecked}
                                      />
                                      <Text> {opt.title}</Text>
                                    </ListItem>
                                  ))}
                                </View>
                              )}
                            </View>
                          ))}
                        </ScrollView>

                        <Text style={styles.declarationText}>
                          {' '}
                          <Icon
                            name="ios-checkmark-circle"
                            style={{width: 10, height: 10}}
                          />{' '}
                          {this.state.declarationQuest}
                        </Text>

                        <TouchableOpacity
                          disabled={this.state.isSubmitPressed}
                          onPress={() => this.saveEmployeeQuestionnaire()}
                          style={styles.questSubmit}>
                          <Text style={styles.punchInBtnText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.cancelEmployeeQuestionnnaire()}
                          style={styles.questSubmitCancel}>
                          <Text style={styles.punchInBtnText}>Cancel</Text>
                        </TouchableOpacity>
                        {/*<Image source={questionaireBack} style={{height: 100, width:320, opacity:0.5}} />*/}
                      </View>
                    )}
                  </View>
                </Modal>
              </View>
            </View>
          )}
        </View>

        {this.state.isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </Container>
    );
  }
}
