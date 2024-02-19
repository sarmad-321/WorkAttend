/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, View, StatusBar, TouchableOpacity, WebView,Text, Alert, ActivityIndicator} from "react-native";
import styles from "../../../js/themes/styles"
import {Header, Left, Right, Body, Title, Container, Content, Button, Form, Item, Picker, DatePicker, Label, ListItem, Radio} from 'native-base'

import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons'
import {savePunch} from '../../../js/services/savePunch'

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import moment from 'moment';

import realm  from '../../../js/realm'

const menu = require("../../../img/menu.png")


import {getLocation} from '../../../js/services/getLocation'
import { throwStatement } from '@babel/types';

export default class PunchIn extends Component {

    constructor(props)
    {
      super(props);

      var today = new Date();

     this.state={
      selectedType: 1,
        dataLocation:[],
        selectedLoc:'key1',
        selectedDate:today,
        isTimePickerVisible: false,
        isTimeSet: false, 
        selectedTime: '',
        isTimeOutSet: false, 
        selectedTimeOut: '',
        isTimeOutPickerVisible: false,
        isError: false, 
        errorMsg:'All fields required',
        isVisibleDatePicker: false, 
        //dateSelectedVal:today,
     }
    }

    componentDidMount()
    {
      this.getLocation();
    }
    
    onLocValueChange(value)
    {
    this.setState({selectedLoc: value})
    }
    
    _showDateTimePicker = () => this.setState({ isTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isTimePickerVisible: false });
  
     //   _hideDateTimePicker = () => this.setState({ isTimePickerVisible: false });
    _handleDatePicked = (time) => {
      this.setState({
          isTimeSet: true, 
          selectedTime: time.toLocaleTimeString()
      })
      this._hideDateTimePicker();
    };

    /*_showTimeOutPicker = () => this.setState({ isTimeOutPickerVisible: true });

    _hideTimeOutPicker = () => this.setState({ isTimeOutPickerVisible: false });
  

    _handleTimeOutPicked = (time) => {
        this.setState({
            isTimeOutSet: true, 
            selectedTimeOut: time.toLocaleTimeString()
        })
        this._hideTimeOutPicker();
    };*/

      setDateTo = (date) => {
        
        this.setState({
           selectedDate: date
        })
    }

    getLocation()
    {
      var mobileAPIToken="";
      var companyID=0;
      var realmAppUser = realm.objects('employee');
      
      if(realmAppUser.length > 0)
        {
          mobileAPIToken = realmAppUser[0].token;
          companyID = realmAppUser[0].companyID;
        }
//alert('mobile api token' + mobileAPIToken);
        
var baseURLApp=""; 
  var realmAppSettings = realm.objects('AppSettings');
  if(realmAppSettings.length > 0)
  {
    baseURLApp = realmAppSettings[0].appBaseURL;
  }
  
      getLocation(baseURLApp, mobileAPIToken, companyID)
      .then((res) => {
      //  alert(JSON.stringify(res[0].locationName))
        this.setState({
          dataLocation : res,
        })
      });
    }

 
savePunch()
{
  this.setState({
    isLoading: true,
    isError: false, 
    errorMsg:'',
  });

  if(this.state.selectedTime!='' && this.state.selectedDate!='' && this.state.selectedType!='' && this.state.selectedLoc!='')
  {
var time = this.state.selectedTime;
//var time= cdt.format('YYYY-MM-DDTHH:mm:ss');
//type 1 is in and 2 is out

var punchType = this.state.selectedType; 
var dateSelected= this.state.selectedDate;
let date=dateSelected.getFullYear() +"-"+ parseInt(dateSelected.getMonth()+1) +"-"+ dateSelected.getDate();
var locationID = this.state.selectedLoc;
var currentDate = new Date();
//alert('time  ' + time + '   punchtype' + punchType + '  date' + date +'location ' +locationID +'cD' + currentDate);

var dakarUserName ="";
//var dakarEmployeeID="";
//var dakarToken="";
var mobileAPIToken="";
var empEmail="";
var realmAppUser = realm.objects('employee');

if(realmAppUser.length > 0)
  {
    dakarUserName = realmAppUser[0].employeeID;
    mobileAPIToken = realmAppUser[0].token;
    empEmail = realmAppUser[0].employeeEmail;
  }
  /*alert(dakarUserName +  'date ' + date
  +  'time ' + time
  +  'punchType ' +punchType
  +  'locationID ' +locationID
  +  'currentDate ' + currentDate
  +  'empEmail ' +empEmail)*/
//tokenParam, dakarToken, dakarUserName, date, time, punchType
//tokenParam,employeeID, date, time, punchType, locationID, createdOn, email

var baseURLApp=""; 
var realmAppSettings = realm.objects('AppSettings');
if(realmAppSettings.length > 0)
{
  baseURLApp = realmAppSettings[0].appBaseURL;
}

  savePunch(baseURLApp, mobileAPIToken, dakarUserName, date, time, punchType, locationID, currentDate, empEmail).then((result) => {
  // alert(mobileAPIToken + JSON.stringify(result))
  var authStr = "Authorization has been denied for this request."
   if(result.Message!=null && result.Message.includes(authStr))
   {
     realm.write(() => {
        realm.deleteAll();
     });
     //token expire
     this.props.navigation.navigate('Login');
   }

   else if(result.errorMessage=="")
   {
            this.setState({
              data: result,
              //originalData: result,
              isLoading: false,
            });
            alert('record saved!')
            this.props.navigation.navigate('Dashboard')
    }
          else{
            this.setState({
              isLoading: false,
              isError: true,
              errorMsg:'Something went wrong'
            });
          }
         })
}
else
{
  this.setState({
    isLoading: false,
   // selectedDate:'',
    //isTimePickerVisible: false,
    //isTimeSet: false, 
    isError: true,
    errorMsg:'Fill all fields correctly'
  });
}
}
onTypeValueChange(value)
{
this.setState(
  {
    selectedType: value,
  }
)
}
      punchIn()
      {
          if(this.state.selectedTime!='' && this.state.selectedTimeOut!='' && this.state.selectedDate!='')
          {
            var cdt = moment(this.state.selectedTime, 'HH:mm:ss');
            var timeIn= cdt.format('YYYY-MM-DDTHH:mm:ss');

            var cdt1 = moment(this.state.selectedTimeOut, 'HH:mm:ss');
            var timeOut= cdt1.format('YYYY-MM-DDTHH:mm:ss');
            
            var date= moment(this.state.selectedDate, 'YYYY-MM-DDTHH:mm:ss');
           //   alert(this.state.selectedTime)
            var punchLength = realm.objects('Punch').length; 
            var punchInc = punchLength + 1;
            
      realm.write(() => {
                realm.create(
                    'Punch',
                    {
                      PunchID: punchInc,
                      Date: new Date(date),
                      TimeIn:timeIn, 
                      TimeOut: timeOut,
                      Status:'Pending'
                    }, true
                )
            })

            
            this.setState({
               selectedDate:'',
               isTimePickerVisible: false,
               isTimeSet: false, 
               selectedTime: '',
               isTimeOutSet: false, 
               selectedTimeOut: '',
               isTimeOutPickerVisible: false,
               isError: false,
            });

          Alert.alert('Punch','recorded sucessfully!')
          this.props.navigation.navigate('Dashboard')
          }
          else{
              this.setState(
                  {
                      isError: true,
                  }
              )
          }
      }

      showDatePicker = () => 
      {
        this.setState({ isVisibleDatePicker: true })
      };

      hideDatePicker = () => {
        this.setState({isVisibleDatePicker: false});
      };
      
      handleDate = date => {
        this.setState({ selectedDate: date, 
        isVisibleDatePicker:false,})  
      }
    
  render() {
    return (
      <Container style={styles.containerPunchRequest}>
      <Header  iosStatusbar="light-content" androidStatusBarColor='rgba(0,184,108,1)' style={styles.header}>
      <Left  style={{ flex: 1 }}>
      <Button  transparent onPress={()=> this.props.navigation.openDrawer()}>
      <Icon name='ios-menu' style={styles.iconMenuTopDash}/>
      </Button>
      </Left>
      <Body  style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
      </Body>
      <Right style={{flex: 4}}>
      <Title allowFontScaling={false} style={styles.Title}>Punch Request</Title>
      </Right>
    </Header>
 <Form style={{margin:15}}>
      {this.state.isError && <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>}

{/*<View style={styles.boxLayoutDateTime}>
      <View style={{flexDirection:'row',}}>
        <View style={styles.dateTimeLeft}>
        <SimpleLineIcons name='calendar' style={styles.formIconsPr}/>
        <Text style={styles.requestLabelText}>DATE</Text>
        <TouchableOpacity  onPress={() => {this.showDatePicker();}}>
        <Text style={styles.TextPunchRequest}>{moment(this.state.selectedDate, 'DD/MM/YYYY').format('DD MMM, YYYY')}</Text>
                </TouchableOpacity>
             <DateTimePicker
            isVisible={this.state.isVisibleDatePicker}
            onConfirm={(date)=>this.handleDate(date)}
            onCancel={this.hideDatePicker}
            date={new Date()}
            minimumDate={new Date(1900, 1, 1)}
            maximumDate={new Date()}
            is24Hour={true}
            placeHolderText="date"
            />
        </View>

        <View style={styles.dateTimeLeft}>

        <SimpleLineIcons name='clock' style={styles.formIconsPr}/>
        <Text style={styles.requestLabelText}>TIME</Text>

        <TouchableOpacity onPress={this._showDateTimePicker}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
       {!this.state.isTimeSet  && <Text style={styles.timeText}>Select Time</Text>}
       {this.state.isTimeSet &&  <Text style={styles.TextPunchRequest}>{this.state.selectedTime}</Text>}
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="time"
          placeHolderText="pick a time"
          titleIOS="pick a time"
        />
      </TouchableOpacity>
        </View>
      </View>

 </View>     */}   

 <View style={styles.boxLayout}>
 <View style={{flexDirection:'row'}}>
       <SimpleLineIcons name='calendar' style={styles.formIconsPr}/>
        <Text style={styles.requestLabelText}>DATE</Text>
        </View>
        <TouchableOpacity  onPress={() => {this.showDatePicker();}}>
        <Text style={styles.TextPunchRequest}>{moment(this.state.selectedDate, 'DD/MM/YYYY').format('DD MMM, YYYY')}</Text>
                </TouchableOpacity>
             <DateTimePicker
            isVisible={this.state.isVisibleDatePicker}
            onConfirm={(date)=>this.handleDate(date)}
            onCancel={this.hideDatePicker}
            date={new Date()}
            minimumDate={new Date(1900, 1, 1)}
            maximumDate={new Date()}
            is24Hour={true}
            placeHolderText="date"/>
</View>

<View style={styles.boxLayout}>
<View style={{flexDirection:'row'}}>
<SimpleLineIcons name='clock' style={styles.formIconsPr}/>
        <Text style={styles.requestLabelText}>TIME</Text>
        </View>

        <TouchableOpacity onPress={this._showDateTimePicker}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
       {!this.state.isTimeSet  && <Text style={styles.timeText}>Select Time</Text>}
       {this.state.isTimeSet &&  <Text style={styles.TextPunchRequest}>{this.state.selectedTime}</Text>}
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="time"
          placeHolderText="pick a time"
          titleIOS="pick a time"
        />
      </TouchableOpacity>
</View>

          {/*    <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(1900, 1, 1)}
            maximumDate={new Date()}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Punch date"
            textStyle={{ color: "#0000" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDateTo}
          />*/}

<View style={styles.boxLayout}>
<View style={{flexDirection:'row'}}>
<SimpleLineIcons name='location-pin' style={styles.formIconsPr}/>
<Text style={styles.requestLabelText}>LOCATION</Text>
</View>
<Item picker>
<Picker
mode="dropdown"
//iosIcon={<Icon name="ios-arrow-down" />}

placeholder="Select Location"
textStyle={{color: 'rgb(50, 168, 82)'}}
placeholderStyle={{color: "rgb(173,173,173)"}}
//placeholderIconColor="#007aff"
selectedValue={this.state.selectedLoc}
onValueChange={(value) => this.onLocValueChange(value)}
>
{this.state.dataLocation.map((item, key) => <Picker.Item  label= {item.locationName} value = {item.locationID} />)}
</Picker>
</Item>
</View>

<View style={styles.boxLayout}>
<View style={{flexDirection:'row'}}>
<SimpleLineIcons name='directions' style={styles.formIconsPr}/>
<Text style={styles.requestLabelText}>TYPE</Text>
</View>
<Item picker>
<Picker
mode="dropdown"
//iosIcon={<Icon name="ios-arrow-down" />}
//style={{width: 100}}
placeholder="Select Type"

textStyle={{color: 'rgb(50, 168, 82)'}}
placeholderStyle={{color: "rgb(173,173,173)"}}
//placeholderIconColor="#007aff"
selectedValue={this.state.selectedType}
onValueChange={(value) => this.onTypeValueChange(value)}
>
<Picker.Item label= 'In' value = '1' />
<Picker.Item label='Out' value = '2' />
</Picker>
</Item>
</View>

<TouchableOpacity style={{margin:50}}  onPress={() => this.savePunch()}>
<View style={styles.punchBtn}>
<Text style={styles.prBtntext}>PUNCH</Text>
</View>
</TouchableOpacity>

          </Form>

              {this.state.isLoading && <View style={styles.loading}>
          <ActivityIndicator size='large'/>
        </View>}
        </Container>
    );
  }
}




