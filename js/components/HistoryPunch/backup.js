import React, {Component} from 'react';
import {Image, View, StatusBar, TouchableOpacity, WebView,Text, FlatList, ActivityIndicator, TouchableHighlight, Modal, Alert} from "react-native";
import styles from "../../../js/themes/styles"
import {Header, Left, Right, Body, Title, Container, Content, Button, DatePicker, Item, Picker, Input} from 'native-base'
import {getPunchHistory} from '../../../js/services/getPunchHistory'
import {getLocation} from '../../../js/services/getLocation'
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import realm  from '../../../js/realm'
import {throwStatement} from '@babel/types';


import DateTimePicker from "react-native-modal-datetime-picker";

const menu = require("../../../img/menu.png")

export default class History extends Component {

    constructor(props)
    {
      super(props);
      var today = new Date();
      this.state={
          isLoading: false,
          isVisibleStartDatePicker: false, 
          isVisibleEndDatePicker: false,
          startDate: today,
          endDate: today,
          data:[],
          dataLocation:[],
          selectedLoc:'-1',
      }
    }
      ///****DATE */
      showStartDatePicker = () => 
      {
        this.setState({ isVisibleStartDatePicker: true })
      };

      hideStartDatePicker = () => {
        this.setState({isVisibleStartDatePicker: false});
      };
      
      handleStartDate = date => {
     
     var endDate = this.state.endDate;
     var selectedLoc = this.state.selectedLoc;

     var endDateToCompare =   moment(endDate).format("DD-MM-YYYY");
     var dateToCompare =   moment(date).format("DD-MM-YYYY");
    // alert('value' + date.getDate() + '*'+ endDate.getDate()  + '*'+ (date.getMonth()+1)  + '*'+ (endDate.getMonth()+1)  + '*'+ date.getFullYear()  + '*'+ endDate.getFullYear())
    // if(date.getDate()<=endDate.getDate() && (date.getMonth()+1)<=(endDate.getMonth()+1) && date.getFullYear()<=endDate.getFullYear())
     if(dateToCompare<=endDateToCompare){
       if(selectedLoc=='-1')
       {
        this.setState({
          startDate: date,
         isVisibleStartDatePicker: false
      }, () => {
          this.getdakarPunchHistory(); 
      });
       }
       else 
       {
        this.setState({
          startDate: date,
         isVisibleStartDatePicker: false
      }, () => {
          this.getdakarLocationPunchHistory(); 
      });
       }
  
     }
     else 
     {
    {/*}  this.setState({
       isVisibleStartDatePicker: false
    }, () => {
      Alert.alert('Date From','Select date filter correctly. Date From should be smaller then Date To.')
       
    });*/}
    Alert.alert('Date From','Select date filter correctly. Date From should be smaller then Date To.',
    [ {text: 'OK', onPress: () =>this.setState ({ isVisibleStartDatePicker: false})} ])
     } 
      };

      showEndDatePicker = () => {
        this.setState({isVisibleEndDatePicker: true});
      };
      
      hideEndDatePicker = () => {
        this.setState({isVisibleEndDatePicker: false});
      };
      
      handleEndDate = date => {  
          var startDate = this.state.startDate;
          var selectedLoc = this.state.selectedLoc;

          var startDateToCompare =   moment(startDate).format("DD-MM-YYYY");
          var dateToCompare =   moment(date).format("DD-MM-YYYY");

          if(startDateToCompare<=dateToCompare)
          {
          if(selectedLoc=='-1')
          {
            this.setState({
              endDate: date,
              isVisibleEndDatePicker: false
          }, () => {
              this.getdakarPunchHistory();
          });
        }
        else
        {
          this.setState({
            endDate: date,
            isVisibleEndDatePicker: false
        }, () => {
            this.getdakarLocationPunchHistory();
        });
        }
          }
          else 
          {
          Alert.alert('Date To','Select date filter correctly. Date To should be greater then Date From.',
           [ {text: 'OK', onPress: () =>this.setState ({ isVisibleEndDatePicker: false})} ])
          }
     
      };

      /******* Date ********/

       /******* component bonding ********/
      onFocusFunction = () => {
        var today = new Date();
        this.setState(
          {
           isVisibleStartDatePicker: false, 
           isVisibleEndDatePicker: false,
           startDate: today,
           endDate: today,
           data:[],
           dataLocation:[],
           selectedLoc:'-1',
          }, () => {
            this.getLocation();
            this.getdakarPunchHistory();
          }
        )
       
      }
  
      componentDidMount()
      {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
          this.onFocusFunction()
        })
      }
      
      componentWillUnmount () {
        this.focusListener.remove()
      }
          /******* component bonding */


    /***HISTORY fetch from server**/  

      getdakarPunchHistory()
      {
        this.setState({
          isLoading: true,
        });
      var dakarUserName ="";
      var dakarEmployeeID="";
      var dakarToken="";
      var mobileAPIToken="";
      var realmAppUser = realm.objects('AppUser');
  
     var FORMAT= "DD/MM/YYYY 00:00:00"  
    //var currentDate= new Date();
      var dateFrom = moment(this.state.startDate).format(FORMAT);
      var dateTo = moment(this.state.endDate).format(FORMAT);
  
     // alert(dateFrom+' date to '+ dateTo)
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
        
        getPunchHistory(baseURLApp, dakarUserName, dakarEmployeeID, dakarToken, mobileAPIToken, dateFrom, dateTo).then((result) => {
       //alert(dakarEmployeeID);
        // alert(dateTo + JSON.stringify(result))
        // alert(JSON.stringify(result))
       var resultSorted=  result.sort(function(a, b){
        return  b.date.split('/').reverse().join().localeCompare(a.date.split('/').reverse().join());
      });
                  this.setState({
                    data: resultSorted,
                    isLoading: false,
                  });
               })
      }

      getdakarLocationPunchHistory()
      {
        this.setState({
          isLoading: true,
        });
      var dakarUserName ="";
      var dakarEmployeeID="";
      var dakarToken="";
      var mobileAPIToken="";
      var realmAppUser = realm.objects('AppUser');
  
      var selectedLoc = this.state.selectedLoc;
      var dataNew =[];
      dataNew.splice(0);

     var FORMAT= "DD/MM/YYYY 00:00:00"  
    //var currentDate= new Date();
      var dateFrom = moment(this.state.startDate).format(FORMAT);
      var dateTo = moment(this.state.endDate).format(FORMAT);
  
     // alert(dateFrom+' date to '+ dateTo)
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
  
        
        getPunchHistory(baseURLApp, dakarUserName, dakarEmployeeID, dakarToken, mobileAPIToken, dateFrom, dateTo).then((result) => {
       //alert(dakarEmployeeID);
        // alert(dateTo + JSON.stringify(result))
        // alert(JSON.stringify(result))
       var resultSorted=  result.sort(function(a, b){
        return  b.date.split('/').reverse().join().localeCompare(a.date.split('/').reverse().join());
      });

      
      if(selectedLoc!='-1')
{
  resultSorted.filter((item) => {
if(item.location == selectedLoc)
{
     dataNew = [...dataNew, item];
}
    });

    this.setState({
      data: dataNew,
      isLoading: false,
    });
  }
  else
  {
    this.setState({
      data: resultSorted,
      isLoading: false,
    });
  }
               })
      }


      getLocation()
      {
        var mobileAPIToken="";
        var realmAppUser = realm.objects('AppUser');
        
        if(realmAppUser.length > 0)
          {
            mobileAPIToken = realmAppUser[0].token;
          }
  //alert('mobile api token' + mobileAPIToken);
  var baseURLApp=""; 
  var realmAppSettings = realm.objects('AppSettings');
  if(realmAppSettings.length > 0)
  {
    baseURLApp = realmAppSettings[0].appBaseURL;
  }
  
        getLocation(baseURLApp, mobileAPIToken)
        .then((res) => {
         // alert(JSON.stringify(res[0].locationName))
          this.setState({
            dataLocation : res,
          })
        });
      }
        /***HISTORY fetch from server**/  

        /****location */
        onLocValueChange(value)
{
  var dataNew =[];
dataNew.splice(0);
this.setState({isLoading: true, selectedLoc:value}, () => {
  if(value=='-1')
  {
    this.getdakarPunchHistory()
    }
    else if(value!='-1')
    {
      this.getdakarLocationPunchHistory();
    }
})

}
        /****location******* */
  
      _renderItem = ({item, index}) => (
        <View style={{marginTop:8, backgroundColor:'#fff', marginLeft:3, marginRight:3}} key={index}>
        <View key={item.index} style={{ paddingTop:10, paddingLeft:10,paddingBottom:20, flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={{color: '#040404', fontSize: 19, marginRight: 10, marginBottom:2}}>{item.date}</Text>
          <Text style={{color: '#820727', fontSize: 14, marginRight: 10}}>{item.location}</Text>
          </View>
    
          <View key={item.index}>
              <View>
              <Text style={{color: '#8E8D92', marginRight:10,fontSize: 20, textAlign:'center'}}>{item.time}</Text>
              </View>
            <Text style={{color: 'rgba(0,184,108,1)',marginRight:10, fontSize: 20, textAlign: 'center'}}>{item.type}</Text>
          </View> 
        </View>
       <View key={item.index} style={styles.lineHorizontalHistory}/>
        </View>
        );

    render() {
        return (
          <Container style={styles.container} style={{backgroundColor:'#f5f5f5'}}>
          <Header  iosStatusbar="light-content" androidStatusBarColor='rgba(0,184,108,1)' style={styles.header}>
          <Left  style={{ flex: 1 }}>
          <Button  transparent onPress={()=> this.props.navigation.openDrawer()}>
          <Image source={menu} style={{height: 30, width:30}} />
          </Button>
          </Left>
          <Body  style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
          </Body>
          <Right style={{flex: 4}}>
          <Title allowFontScaling={false} style={styles.Title}>HISTORY</Title>
          </Right>
        </Header>
  
        <TouchableOpacity  onPress={() => {this.showStartDatePicker();}}>
        <Text>Date From</Text>
        <Text>{this.state.startDate.getDate()}/{this.state.startDate.getMonth()+1}/{this.state.startDate.getFullYear()}</Text>
        </TouchableOpacity>

        <DateTimePicker
        isVisible={this.state.isVisibleStartDatePicker}
        onConfirm={(date)=>this.handleStartDate(date)}
        onCancel={this.hideStartDatePicker}
        date={new Date()}
        minimumDate={new Date(1900, 1, 1)}
        maximumDate={new Date(5000, 12, 31)}
        is24Hour={true}
        placeHolderText="Start date"
        />

<TouchableOpacity  onPress={() => {this.showEndDatePicker();}}>
<Text>Date To</Text>
<Text>{this.state.endDate.getDate()}/{this.state.endDate.getMonth()+1}/{this.state.endDate.getFullYear()}</Text>
</TouchableOpacity>

           <DateTimePicker
            isVisible={this.state.isVisibleEndDatePicker}
            onConfirm={(date)=>this.handleEndDate(date)}
            onCancel={this.hideEndDatePicker}
            date={new Date()}
            minimumDate={new Date(1900, 1, 1)}
            maximumDate={new Date(5000, 12, 31)}
            is24Hour={true}
            placeHolderText="End date"
            />
<View>
    <Picker
    mode="dropdown"
    iosIcon={<Icon name="ios-arrow-down" />}
    style={{width: 300}}
    placeholder="Select your Location"
    placeholderStyle={{color: "#bfc6ea"}}
    placeholderIconColor="#007aff"
    selectedValue={this.state.selectedLoc}
    onValueChange={(value) => this.onLocValueChange(value)}
   >
    <Picker.Item label="All" value='-1' />
    {this.state.dataLocation.map((item, key) => <Picker.Item label= {item.locationName} value = {item.locationName} />)}
  </Picker>
</View>

     {!this.state.isLoading &&  (this.state.data==null || this.state.data=='') && <View>
 <Text
          allowFontScaling={false}
            style={{
            backgroundColor: 'transparent',
            color: 'rgb(0,0,0)',
            textAlign: 'center', 
            paddingTop: 20,
          }}>No Records Found.</Text>
</View>}
 
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


