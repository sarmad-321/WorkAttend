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
} from 'react-native';
import {
  Container,
  Form,
  Content,
  Label,
  Input,
  Item,
  Left,
  Header,
  Right,
  Button,
  Body,
  Title,
} from 'native-base';
import styles from '../../../js/themes/styles';
import {CommonActions} from '@react-navigation/native';
import {companyURLCheck} from '../../../js/services/companyURLCheck';
import Icon from 'react-native-vector-icons/Ionicons';

import realm from '../../../js/realm';
const menu = require('../../../img/menu.png');

//Read it from a file
//const COMPANY_BASE_URL ="https://mobileapi.dakarhr.com/api/Resource";

export default class CompanyRegisterTxt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyURL: '',
      errorMsg: '',
      isError: false,
      isLoading: false,
    };
  }

  cancelCompanyRegisterTxt() {
    this.props.navigation.navigate('CompanyRegister');
  }

  registerCompany() {
    this.setState({
      isLoading: true,
      isError: false,
      errorMsg: '',
    });
    Keyboard.dismiss();
    this.setState({isError: false, errorMsg: ''});

    let companyURLoc = this.state.companyURL.toLowerCase();
    //let companyBaseURLoc = COMPANY_BASE_URL.toLowerCase();
    if (this.state.companyURL == null || this.state.companyURL == '') {
      this.setState({
        isError: true,
        errorMsg: 'Fill the company URL to continue',
        isLoading: false,
      });
    } else if (
      this.state.companyURL.toLowerCase() != null &&
      this.state.companyURL.toLowerCase() != ''
    ) {
      var str = this.state.companyURL.toLowerCase();
      str = str.replace('\n', '').trim();
      //alert(str);

      companyURLCheck(str)
        .then(res => {
          //alert(JSON.stringify(res))
          if (res != null) {
            if (res.isExist) {
              //save URL in appSettings
              //store profile to Realm
              //alert('result: ' + res);
              var ID = realm.objects('AppSettings').length + 1;
              //var pathArray = e.data.split('?');
              //var hostname = pathArray[0]+'/api/resource';
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
              this.setState({
                isError: true,
                errorMsg: 'The URL is not correct.',
                isLoading: false,
              });
            }
          } else {
            this.setState({
              isError: true,
              errorMsg: 'The URL is not correct.',
              isLoading: false,
            });
          }
        })
        .catch(error => {
          alert(error);
          this.setState({
            isError: true,
            errorMsg: 'The URL is not correct.',
            isLoading: false,
          });
        });
    } else {
      this.setState({
        isError: true,
        errorMsg: 'The URL is not correct.',
        isLoading: false,
      });
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header
          iosStatusbar="light-content"
          androidStatusBarColor="rgba(0,184,108,1)"
          style={styles.header}>
          <Left style={{flex: 1}}></Left>
          <Body
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Title allowFontScaling={false} style={styles.Title}>
              Company URL
            </Title>
          </Body>
          <Right></Right>
        </Header>

        <Form>
          {this.state.isError && (
            <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
          )}
          <Item floatingLabel>
            <Label>Company URL</Label>
            <Input
              value={this.state.companyURL}
              onChangeText={companyURL =>
                this.setState({companyURL: companyURL})
              }
            />
          </Item>

          <TouchableOpacity
            style={{
              marginTop: 50,
              marginLeft: 50,
              marginRight: 50,
              marginBottom: 20,
            }}
            onPress={() => this.registerCompany()}>
            <View style={styles.button}>
              <Text style={styles.text}>Next</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginLeft: 50, marginRight: 50}}
            onPress={() => this.cancelCompanyRegisterTxt()}>
            <View style={styles.button}>
              <Text style={styles.text}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </Form>
        {this.state.isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </Container>
    );
  }
}
