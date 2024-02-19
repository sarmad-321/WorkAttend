/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, View, StatusBar, TouchableOpacity, WebView,Text, FlatList, ActivityIndicator, ListView, Alert, Card, CardItem} from "react-native";
import styles from "../../../js/themes/styles"
import {Header, Left, Right, Body, Title, Container, Content, Button, Picker} from 'native-base'
import {getSchedule} from '../../../js/services/getSchedule'
import {getLocation} from '../../../js/services/getLocation'

import DateTimePicker from "react-native-modal-datetime-picker";

import moment from 'moment';

import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import realm  from '../../../js/realm'
const menu = require("../../../img/menu.png")
const notFoundImg = require("../../../img/notFound.png")
const panel = require("../../../img/panel.png")

export default class Schedule extends Component {
  constructor(props)
  {
    var today = new Date();
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    super(props);
   this.state={
     isLoading: false,
     data:[],
     dataSource :  dataSource,
     startDate: today, 
     endDate: today,
     showLocFilter: false, 
     dataLocation:[],
     isVisibleEndDatePicker: false, 
     isVisibleStartDatePicker: false,
     selectedLoc: '-1',
   }
    }

    componentDidMount()
    {
      this.getUserSchedule();
      this.getLocation();
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
date.setHours(0,0,0,0);
endDate.setHours(0,0,0,0);

if(date<=endDate){
  if(selectedLoc=='-1')
  {
   this.setState({
     startDate: date,
    isVisibleStartDatePicker: false
 }, () => {
    // this.getdakarPunchHistory(); 
    this.getUserSchedule();
 });
  }
  else 
  {
   this.setState({
     startDate: date,
    isVisibleStartDatePicker: false
 }, () => {
    // this.getdakarLocationPunchHistory(); 
 });
  }
}
else 
{
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

    // var startDateToCompare =   moment(startDate).format("DD-MM-YYYY");
     //var dateToCompare =   moment(date).format("DD-MM-YYYY");
     date.setHours(0,0,0,0);
     startDate.setHours(0,0,0,0);

     if(startDate<=date)
     {
     if(selectedLoc=='-1')
     {
       this.setState({
         endDate: date,
         isVisibleEndDatePicker: false
     }, () => {
        // this.getdakarPunchHistory();
        this.getUserSchedule();
     });
   }
   else
   {
     this.setState({
       endDate: date,
       isVisibleEndDatePicker: false
   }, () => {
      // this.getdakarLocationPunchHistory();
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

 showLocFilter()
{
  var isShowLocFilter = this.state.showLocFilter;
  this.setState({
    showLocFilter:!isShowLocFilter,
  })
}

onLocValueChange(value)
{
  var dataNew =[];
dataNew.splice(0);
this.setState({isLoading: true, selectedLoc:value}, () => {
    this.getUserSchedule()
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
        
      getLocation(mobileAPIToken)
      .then((res) => {
       // alert(JSON.stringify(res[0].locationName))
        this.setState({
          dataLocation : res,
        })
      });
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
      var dataNew =[];
      dataNew.splice(0);

      var dataFinal =[];
      dataFinal.splice(0);

      getSchedule(dakarUserName, dakarEmployeeID, dakarToken, mobileAPIToken).then((result) => {
      result.filter((item) => {

    var fDate,lDate,cDate;
    fDate = Date.parse(this.state.startDate);
    lDate = Date.parse(this.state.endDate);
    cDate = Date.parse(item.timeIn);

    if((cDate <= lDate && cDate >= fDate)) {
      dataNew = [...dataNew, item]
    }
        });

      
if(this.state.selectedLoc!='-1')
{
        dataNew.filter((item) => {
          if(this.state.selectedLoc==item.locationName) {
            dataFinal = [...dataFinal, item]
          } 
        })

        this.setState({
          data: dataFinal,
          isLoading: false,
        });
}
else
{
                this.setState({
                  data: dataNew,
                  isLoading: false,
                });
              }
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
<View style={styles.scheduleMain} key={index}>
<View style={styles.sideLine}>
      <View key={item.index} style={{ paddingTop:10, paddingLeft:10,paddingBottom:10,flexDirection: 'row'}}>
       <Text style={{fontSize:14, flex:1,  color:'rgb(151,160,168)', fontWeight:'bold', marginRight: 10}}>{item.locationName.toUpperCase()}</Text>
      </View>

 <View style={{paddingLeft:10,paddingBottom:10,flexDirection:'row'}}>
      <View style={{flexDirection:'column'}}>
        <Text style={styles.scheduleLabel}>Start</Text>
        <Text style={styles.scheduleLabel}>End</Text>
      </View>

      <View style={{flexDirection:'column', alignContent:'center'}}>
        <Text style={{color: '#8E8D92', marginRight:10,fontSize: 12, textAlign:'center'}}>{moment(item.timeIn).format('DD MMM, YYYY hh:mm:ss')}</Text>
        <Text style={{color: '#8E8D92',marginRight:10, fontSize: 12, textAlign: 'center'}}>{moment(item.timeOut).format('DD MMM, YYYY hh:mm:ss')}</Text>
      </View>
      </View>
</View>
</View>
    );
    

    _renderItemOld = ({item, index}) => (
    <Card style={{flexWrap: 'nowrap', marginLeft:9, marginRight:9}} key={index}>
    <CardItem  key={index}>
<View key={index} style={{flex: 1, flexDirection: 'row'}}>

<View style={{flex: 1, flexDirection: 'row'}} >
<Image source={panel} style={{height: 20, width:20,}} />
<View style={{flex: 1, flexDirection: 'column'}}>
<Text style={{color: '#8E8D92', marginRight:10,fontSize: 20,}}>{item.timeIn}</Text>
<Text style={{color: '#000', fontSize: 14, marginRight: 10}}>{item.locationName.toLowerCase()}</Text>
</View>
</View>

<View key={index}>
<View flexDirection='row'> 
<Text style={{color: 'rgba(0,184,108,1)',marginRight:10, fontSize: 20, textAlign: 'center'}}>{item.locationName.toUpperCase()}</Text> 
</View> 
</View> 
</View>
   </CardItem>
    </Card>
  );
  render() {
    return (
      <Container style={styles.container} style={{backgroundColor:"rgb(233,234,241)"}}>
      <Header  iosStatusbar="light-content" androidStatusBarColor='rgba(0,184,108,1)' style={styles.header}>
      <Left  style={{ flex: 1 }}>
      <Button  transparent onPress={()=> this.props.navigation.openDrawer()}>
      <Image source={menu} style={{height: 40, width:40}} />
      </Button>
      </Left>
      <Body  style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
      </Body>
      <Right style={{flex: 4}}>
      <Title allowFontScaling={false} style={styles.Title}>My Schedule</Title>
      </Right>
    </Header>

 <TouchableOpacity  style={styles.filterBtn} onPress={() => {this.showLocFilter();}}>
  <FontAwesome name={'sliders'} size={15} style={styles.historyIcons}/>
  <Text style={styles.filterLabel}>Filter</Text>
  </TouchableOpacity>

<View style={styles.filterBackground}>
 <View style={{ flexDirection: 'row'}}>
 <View style={styles.dateLeft}>
            <TouchableOpacity style={{marginLeft:6}} onPress={() => {this.showStartDatePicker();}}>
              <Text style={styles.filterLabelDate}>From Date</Text>  
              <Text style={styles.filterDateText}>{moment(this.state.startDate, 'DD/MM/YYYY').format('DD MMM, YYYY')}</Text>
            </TouchableOpacity>

              <View style = {{flexDirection: 'column', alignItems: 'center'}}>
                  <Text style={styles.historyDivider}>|</Text>
                  <FontAwesome name={'calendar'} size={20} style={styles.historyIconsMiddle}/>
                  <Text style={styles.historyDivider}>|</Text>
                </View>
         </View>   

            <View style={styles.dateRight}>
                <TouchableOpacity  style={{justifyContent:'flex-start'}} onPress={() => {this.showEndDatePicker();}}>
                              <Text style={styles.filterLabelDate}>To Date</Text>
                              <Text style={styles.filterDateText}>{moment(this.state.endDate, 'DD/MM/YYYY').format('DD MMM, YYYY')}</Text>
                </TouchableOpacity>
           </View>
 </View>
                        
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
            
{this.state.showLocFilter && this.state.dataLocation!=null && this.state.dataLocation.length>0 && <View  style={styles.filterItem}>
<Text style={styles.filterLabel}>Location</Text>
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
    <Picker.Item label="All" value='-1' key={'-1'} />
    {this.state.dataLocation.map((item, key) => <Picker.Item key={key} label= {item.locationName} value = {item.locationName} />)}
  </Picker>
</View>
}
</View>


     {!this.state.isLoading &&  (this.state.data==null || this.state.data=='') && 
     <View style={{ justifyContent: 'center',
     alignItems: 'center', 
     paddingTop:40}}>
     <Image source={notFoundImg} style={{height: 80, width:80,}} />
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




