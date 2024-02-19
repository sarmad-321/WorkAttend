/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, View, StatusBar, TouchableOpacity, WebView,Text, FlatList, ActivityIndicator} from "react-native";
import styles from "../../../js/themes/styles"
import {Header, Left, Right, Body, Title, Container, Content, Button} from 'native-base'
import {getSchedule} from '../../../js/services/getSchedule'

import moment from 'moment';

import Icon from 'react-native-vector-icons/Ionicons'
import realm  from '../../../js/realm'
const menu = require("../../../img/menu.png")

export default class Schedule extends Component {
  constructor(props)
  {
    super(props);
   this.state={
     isLoading: false,
     data:[],
   }
    }

    componentDidMount()
    {
      this.getUserSchedule();
    }

    getUserSchedule()
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

      getSchedule(dakarUserName, dakarEmployeeID, dakarToken, mobileAPIToken).then((result) => {
      //  alert(JSON.stringify(result))
                this.setState({
                  data: result,
                  isLoading: false,
                });
             })
    }

    _keyExtractor = (item, index) => index.toString();
  
    _listEmptyComponent = () => {
      return (
          <View>
          </View>
      )
  }
  

  _renderItem = ({item, index}) => (
    <View style={{marginTop:10}} key={index}>
    <View key={item.index} style={{ paddingLeft:10,paddingBottom:10, flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        {/*<Text style={{color: '#076182', fontSize: 19, marginRight: 10, marginBottom:20}}>{item.date}</Text>*/}
      <Text style={{color: '#820727', fontSize: 14, marginRight: 10}}>{item.locationName.toLowerCase()}</Text>
         </View>

      <View key={item.index}>
          <View>
          <Text style={{color: '#f89d00', marginRight:10,fontSize: 20, textAlign:'center'}}>{moment(item.timeIn).format('DD MMM, YYYY hh:mm:ss')}</Text>
          <Text style={{color: '#008ba7', fontSize: 14, marginRight: 10, textAlign:'center'}}>Time In</Text>
          </View>
        <Text style={{color: '#f89d00',marginRight:10, fontSize: 20, textAlign: 'center'}}>{moment(item.timeOut).format('DD MMM, YYYY hh:mm:ss')}</Text>
      <Text style={{color: '#008ba7', fontSize: 14, marginRight: 10, textAlign:'center'}}>Time Out</Text>
      </View> 
    </View>
    <View key={item.index} style={styles.lineHorizontal}/>
    </View>
    );

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
      <Title allowFontScaling={false} style={styles.Title}>My Schedule</Title>
      </Right>
    </Header>

<FlatList
  data={this.state.data}
  renderItem={this._renderItem.bind(this)}
  extraData={this.state}
keyExtractor={this._keyExtractor}/>

      {this.state.isLoading && <View style={styles.loading}>
          <ActivityIndicator size='large'/>
        </View>}
        </Container>
    );
  }
}




