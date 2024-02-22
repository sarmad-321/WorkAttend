import React, {Component} from 'react';
import {Image, NetInfo, Linking, ImageBackground, Alert} from 'react-native';
import {
  Content,
  Text,
  List,
  ListItem,
  Container,
  Left,
  Right,
  Badge,
  Button,
  View,
  StyleProvider,
  getTheme,
  variables,
  Body,
  Header,
} from 'native-base';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CommonActions} from '@react-navigation/native';

import realm from '../../../js/realm';
import {getAppDetail} from '../../services/getAppDetail';

const dakarLogo = require('../../../img/dakarSoftware.png');
const circleBackground = require('../../../img/circleBackground.png');
const map = require('../../../img/mapIcon.png');

class SideBar extends Component {
  constructor(props) {
    super(props);
    var isRealmAdmin = false;
    /*  var realmAppUser = realm.objects('AppUser');
    if(realmAppUser.length > 0)
    {
     isRealmAdmin = realmAppUser[0].isAdmin;
    }*/
    this.state = {
      isAdmin: isRealmAdmin,
      DashboardLabel: 'Dashboard',
      PunchLabel: 'Punch Request',
      //ScheduleLabel:'My Schedule',
      HistoryLabel: 'History',
      ProfileLabel: 'Profile',
      LogoutLabel: 'Log Out',
      changePassLabel: 'Settings',
    };
  }

  navigateScreen(route) {
    NetInfo.isConnected
      .fetch()
      .then(isConnected => {
        if (isConnected) {
          this.props.navigation.navigate(route);
        } else {
          Alert.alert(
            'Internet Connection Required',
            'Kindly connect to the internet via your cellular data plan or WiFi',
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  logOut() {
    //cxall app detail api here
    var baseURLApp = '';
    var token = '';
    //alert(baseURLApp);
    var realmAppSettings = realm.objects('AppSettings');
    if (realmAppSettings.length > 0) {
      baseURLApp = realmAppSettings[0].appBaseURL;
    }
    var realmAppUser = realm.objects('employee');
    if (realmAppUser.length > 0) {
      token = realmAppUser[0].token;
    }

    getAppDetail(baseURLApp, token).then(res => {
      if (
        res != null &&
        res.databaseName != null &&
        res.userCompanyID != null
      ) {
        var pathArray = baseURLApp.split('/api/resource');

        var hostname =
          pathArray[0] +
          '?databasename=' +
          res.databaseName +
          '&usercompanyid=' +
          res.userCompanyID;
        //alert(hostname);
        realm.write(() => {
          realm.create(
            'AppSettings',
            {
              settingID: 1,
              appBaseURL: hostname,
            },
            true,
          );
        });

        //	this.props.navigation.navigate('Login')
        //delete all realm objects
        realm.write(() => {
          let user = realm.objects('employee');
          realm.delete(user); // Deletes user
        });

        const navigateAction = CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
        this.props.navigation.dispatch(navigateAction);
      } else {
        alert('Something went wrong. Unable to log out.');
      }
    });
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{
            flex: 1,
            top: -1,
            backgroundColor: 'rgba{255, 255, 255, 0.6}',
          }}>
          {/*<Text style={{textAlign:'center',padding:15}}> MENU </Text>*/}
          {/*<ImageBackground source={circleBackground} style={styles.headerBackgroundImage} >	</ImageBackground>*/}
          <View style={styles.headerDrawer}>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 10,
                paddingLeft: 20,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  paddingBottom: 10,
                  justifyContent: 'center',
                }}>
                <Image source={map} style={{height: 40, width: 38}} />
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  paddingBottom: 10,
                  justifyContent: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.headerTextColorOne}>WORK</Text>
                  <Text style={styles.headerTextSecondColor}>ATTEND</Text>
                </View>
              </View>
            </View>
          </View>

          <List>
            <Text allowFontScaling={false} style={{padding: 3}}></Text>
            <ListItem
              style={styles.listItem}
              icon
              onPress={() => this.props.navigation.navigate('Dashboard')}>
              <Left>
                <MaterialCommunityIcons name="drag" style={styles.menuIcons} />
              </Left>
              <Body style={styles.listItemNoBorder}>
                <Text allowFontScaling={false} style={styles.textDrawer}>
                  {this.state.DashboardLabel}
                </Text>
              </Body>
              <Right style={styles.listItemNoBorder}></Right>
            </ListItem>

            {/*<ListItem style={styles.listItem} icon onPress={() => this.props.navigation.navigate('PunchIn')}>
				<Left>
				<EvilIcons name='location' style={styles.menuIcons}/>
				</Left>
				<Body style={styles.listItemNoBorder}>
				<Text allowFontScaling={false} style={styles.textDrawer}>{this.state.PunchLabel}</Text>
				</Body>
				<Right style={styles.listItemNoBorder}></Right>
				</ListItem>*/}

            <ListItem
              style={styles.listItem}
              icon
              onPress={() => this.props.navigation.navigate('History')}>
              <Left>
                <EvilIcons name="clock" style={styles.menuIcons} />
              </Left>
              <Body style={styles.listItemNoBorder}>
                <Text allowFontScaling={false} style={styles.textDrawer}>
                  {this.state.HistoryLabel}
                </Text>
              </Body>
              <Right style={styles.listItemNoBorder}></Right>
            </ListItem>

            {/*<ListItem style={styles.listItem} icon onPress={() => this.props.navigation.navigate('Schedule')}>
				<Left>
				<EvilIcons name='calendar' style={styles.menuIcons}/>
				</Left>
				<Body style={styles.listItemNoBorder}>
				<Text allowFontScaling={false} style={styles.textDrawer}>{this.state.ScheduleLabel}</Text>
				</Body>
				<Right style={styles.listItemNoBorder}></Right>
		</ListItem> */}

            <ListItem
              style={styles.listItem}
              icon
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Left>
                <EvilIcons name="user" style={styles.menuIcons} />
              </Left>
              <Body style={styles.listItemNoBorder}>
                <Text allowFontScaling={false} style={styles.textDrawer}>
                  {this.state.ProfileLabel}
                </Text>
              </Body>
              <Right style={styles.listItemNoBorder}></Right>
            </ListItem>

            <ListItem
              style={styles.listItem}
              icon
              onPress={() => this.props.navigation.navigate('Settings')}>
              <Left>
                <EvilIcons name="gear" style={styles.menuIcons} />
              </Left>
              <Body style={styles.listItemNoBorder}>
                <Text allowFontScaling={false} style={styles.textDrawer}>
                  {this.state.changePassLabel}
                </Text>
              </Body>
              <Right style={styles.listItemNoBorder}></Right>
            </ListItem>

            <ListItem
              style={styles.listItem}
              icon
              onPress={() => this.logOut()}>
              <Left>
                <EvilIcons name="arrow-left" style={styles.menuIcons} />
              </Left>
              <Body style={styles.listItemNoBorder}>
                <Text allowFontScaling={false} style={styles.textDrawer}>
                  {this.state.LogoutLabel}
                </Text>
              </Body>
              <Right style={styles.listItemNoBorder}></Right>
            </ListItem>
          </List>
        </Content>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            margin: 20,
          }}>
          <Image source={dakarLogo} style={{height: 60, width: 150}} />
        </View>
      </Container>
    );
  }
}

export default SideBar;
