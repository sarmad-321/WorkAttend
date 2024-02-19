/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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
  //  var FORMAT= "DD/MM/YYYY 00:00:00"  
   // var currentDate= new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
   // var dateFrom = moment(currentDate).format(FORMAT);
   // var dateTo = moment(currentDate).format(FORMAT);

   var today = new Date();
   currentDate= today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();

   this.state={
    selectedLoc:'-1',
    isVisibleDateFromPickr: false, 
    isVisibleDateToPickr: false, 
     isLoading: false,
     data:[],
     dataLocation:[],
     modalVisible: false,
     startDateSelected: '',
     endDateSelected:'',
    // originalData:[],
     searchIconName: 'ios-search',
     isFilterVisible: false,
     dateFrom: currentDate.toString(),
     dateTo: currentDate.toString(),
   }
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
    
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
    /**** */
    filterData()
    {
      var dataNew =[];
      dataNew.splice(0);
      this.setState({
        isLoading: true,
      });
      var FORMAT = "DD/MM/YYYY 00:00:00"  
      startDateFilter = moment(this.state.dateTo).format(FORMAT);
      endDateFilter =   moment(this.state.dateFrom).format(FORMAT);
      var dateFrom =    moment(startDateFilter,"DD/MM/YYYY");
      var dateTo =      moment(endDateFilter,"DD/MM/YYYY");
if(this.state.selectedLoc=='')
{
  if(dateFrom<=dateTo)
{
  this.getdakarPunchHistory();
}
else{
  Alert.alert("Date Filter", "Select dates correctly start should be smaller than end")
}
}
    else if(selectedLoc!='')
    {
      var selectedLoc ='';
      selectedLoc = this.state.selectedLoc;
    //alert(selectedLoc);

    var dakarUserName ="";
    var dakarEmployeeID="";
    var dakarToken="";
    var mobileAPIToken="";
    var realmAppUser = realm.objects('AppUser');

   var FORMAT= "DD/MM/YYYY 00:00:00"  
  //  var currentDate= new Date();
    var dateFrom = moment(this.state.dateFrom).format(FORMAT);
    var dateTo = moment(this.state.dateTo).format(FORMAT);

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
      //  alert(dakarEmployeeID);
  // alert(dateTo + JSON.stringify(result))
      // alert(JSON.stringify(result))
     var resultSorted=  result.sort(function(a, b){
      return  b.date.split('/').reverse().join().localeCompare(a.date.split('/').reverse().join());
    });

    /** */
  var selectedLoc ='';
  selectedLoc = this.state.selectedLoc;
//alert(selectedLoc);
if(selectedLoc!=-1)
{
  resultSorted.filter((item) => {
if(item.location == selectedLoc)
{
     dataNew = [...dataNew, item];
}
    });
  this.setState(
      {
        isLoading: false,
        data: dataNew, 
      }
    )
  }
  else
  {
    this.setState({
      data: resultSorted,
      isLoading: false,
    });
  }
    /*** */
            
             })
             }
    else 
{
  this.setState({
    isLoading : false,
  })
  alert('select filters')
}
  }
  /**** */
    filterDataOld()
    {
      this.setState({
        isLoading : true,
      })
      
      this.setState({
        data: this.state.originalData
    }, () => {
        this.filterDataResult();
    });
    }

    filterDataResult()
    { 
var FORMAT= "DD/MM/YYYY";      
var dataNew =[];
dataNew.splice(0);
var startDateFilter = moment("01/01/1900").format(FORMAT);
var endDateFilter = moment("12/12/5000").format(FORMAT);
//alert(this.state.startDateSelected+' end date' + this.state.endDateSelected + 'location' +this.state.selectedLoc)
/*var filter = {
  startDate: '',
  endDate: '', 
  location: '',
};
users= users.filter(function(item) {
  for (var key in filter) {
    if (item[key] === undefined || item[key] != filter[key])
      return false;
  }
  return true;
});
 */
if(this.state.startDateSelected!='' && this.state.endDateSelected!='' && this.state.selectedLoc!='')
{
  //alert('1')
  var finalData =[];
  finalData.splice(0);
    //check if startdate is less than enddate 
startDateFilter = moment(this.state.startDateSelected).format(FORMAT);
endDateFilter = moment(this.state.endDateSelected).format(FORMAT);
var startDate = moment(startDateFilter,"DD/MM/YYYY");
var enddate =   moment(endDateFilter,"DD/MM/YYYY");
if(startDate<=enddate)
{
  this.state.data.filter((item) => {
    var compareDate =  moment(item.date,"DD/MM/YYYY");
var isExist = compareDate.isBetween(startDate, enddate);
        //     console.log("sd : " + startDate + "ed :" + enddate + item.date + " isExist " + isExist);
       if(isExist)
     {dataNew = [...dataNew, item];}
    });
 
    //location filter
    var selectedLoc ='';
    selectedLoc = this.state.selectedLoc;
  //alert(selectedLoc);
  if(selectedLoc!=-1)
  {
    dataNew.filter((item) => {
  if(item.location == selectedLoc)
  {
    finalData = [...finalData, item];
  }
      });
    this.setState(
        {
          isLoading: false,
          data: finalData, 
        }
      )
    }
    else 
    {
      this.setState(
        {
          isLoading: false,
          data:  dataNew, 
        }
      )
    } 
    //location
}
else 
{
  this.setState({
    isLoading : false,
  })
  alert('select dates correctly start should be smaller than end')
}
}
else if(this.state.startDateSelected!='' && this.state.endDateSelected!='') //&& this.state.selectedLoc=='')
{
 // alert('2')
  //check if startdate is less than enddate 
startDateFilter = moment(this.state.startDateSelected).format(FORMAT);
endDateFilter = moment(this.state.endDateSelected).format(FORMAT);
var startDate =    moment(startDateFilter,"DD/MM/YYYY");
var enddate =      moment(endDateFilter,"DD/MM/YYYY");
if(startDate<=enddate)
{
  this.state.data.filter((item) => {
    var compareDate =  moment(item.date,"DD/MM/YYYY");
var isExist = compareDate.isBetween(startDate, enddate);
        //     console.log("sd : " + startDate + "ed :" + enddate + item.date + " isExist " + isExist);
       if(isExist)
     {dataNew = [...dataNew, item];}
    });
    this.setState(
      {isLoading:false, 
        data: dataNew}
    )
}
else 
{
  this.setState({
    isLoading : false,
  })
  alert('select dates correctly start should be smaller than end')
}
}
else if(this.state.startDateSelected=='' && this.state.endDateSelected=='' && this.state.selectedLoc!='')
{
  //alert('3')
  var selectedLoc ='';
  selectedLoc = this.state.selectedLoc;
//alert(selectedLoc);
if(selectedLoc!=-1)
{
  this.state.data.filter((item) => {
if(item.location == selectedLoc)
{
     dataNew = [...dataNew, item];
}
    });
  this.setState(
      {
        isLoading: false,
        data: dataNew, 
      }
    )
  }
  else 
  {
    this.setState(
      {
        isLoading: false,
        data:  this.state.originalData, 
      }
    )
  }
}
/*else if(this.state.startDateSelected!='' && this.state.endDateSelected!='' && this.state.selectedLoc!='')
{

}*/
else 
{
  this.setState({
    isLoading : false,
  })
  alert('select filters')
}
//var testDate= moment(this.state.startDateSelected).format(FORMAT);

//var datetest = moment("02/09/2019").format("YYYY-MM-DD")
//alert(JSON.stringify(dataNew))
   // this.setState({modalVisible: visible});
    }

    onFocusFunction = () => {
      this.getLocation();
      this.getdakarPunchHistory();
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
    var dateFrom = moment(this.state.dateFrom).format(FORMAT);
    var dateTo = moment(this.state.dateTo).format(FORMAT);

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
                  originalData: result,
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

    setStartDate = (date) => {
     var FORMAT = "DD/MM/YYYY 00:00:00"  
      startDate = moment(this.state.dateFrom).format(FORMAT);
    alert(startDate)
  //    var dateFrom =    moment(this.state.dateFrom,"DD/MM/YYYY");
      this.setState({
         dateFrom: startDate
      })
  }

  setEndDate = (date) => {
    this.setState({
       dateTo: date
    })
}




onLocValueChange(value)
{
this.setState({selectedLoc: value})
}

/*showSearch()
{
  var isSearch = this.state.isSearchVisible;
  this.setState({isSearchVisible: !isSearch})
}*/

showFilter()
{
  var isShowFilter = this.state.isFilterVisible;
  this.setState({isFilterVisible: !isShowFilter})
}

cancelFilter()
{ 
  var isShowFilter = this.state.isFilterVisible;
  this.setState({
    data: this.state.originalData,
    startDateSelected: '',
    endDateSelected:'',
    selectedLoc:-1,
    isFilterVisible: !isShowFilter})
}

showDateFromPicker = () => {
  alert(this.state.isVisibleDateFromPickr);
  this.setState({isVisibleDateFromPickr: true});
};

hideDateFromPicker = () => {
  this.setState({isVisibleDateFromPickr: false});
};

handleDateFromPicked = date => {
  this.setState({ dateFrom: date.toString() });
  this.hideDateFromPicker();
};

showDateToPicker = () => {
  //alert(this.state.isVisibleDateFromPickr);
  this.setState({isVisibleDateToPickr: true});
};

hideDateToPicker = () => {
  this.setState({isVisibleDateToPickr: false});
};

handleDateToPicked = date => {
  var dateFrom = this.state.dateFrom;
  var FORMAT= "DD/MM/YYYY";      
var startDate= moment(dateFrom).format(FORMAT);
var endDate = moment(date).format(FORMAT);

  alert(startDate+''+endDate);
  if(startDate<=endDate)
  {
  this.setState({ dateTo: date.toString() });
  }
  else{
    Alert.alert('Date','select dates correctly date From should be smaller than end')
  }
  this.hideDateToPicker();
};


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

 
{!this.state.isFilterVisible && <TouchableOpacity onPress={() => {this.showFilter();}} style={{flexDirection: 'row', justifyContent: 'flex-start', paddingTop: 5, paddingRight:5, paddingLeft:5, paddingBottom:2}}>
{/*<TouchableOpacity  onPress={() => {  this.showSearch(); }}>
  <Icon name={this.state.searchIconName} size={25} style={styles.historyIcons}/>
      </TouchableOpacity>*/}
 <FontAwesome name={'sliders'} size={20} style={styles.historyIcons}/>
 <Text>Filters</Text>
 </TouchableOpacity>}
      {/*Search
      {this.state.isSearchVisible &&
      <View style={{margin: 10,}}>
          <Item style={{marginLeft: 5, marginRight: 5, marginBottom: 3, marginTop: 3,backgroundColor:'#eee', height:35}}> 
            <Input style={{paddingLeft: 12}} placeholder={'Search'} 
            // onChangeText={(searchText) => this.onSearchChangeText(searchText)}
            returnKeyType="search"
            value={this.state.searchText}
            //onSubmitEditing={(event) => this.navigateCustom("search")}
             //onSubmitEditing={(event) => alert('onSubmitEditing text: ' + event.nativeEvent.text)}
              />
            <Button  transparent 
            //onPress= {() => this.navigateCustom("search")}
            >
            <Icon name={this.state.searchIconName} style={styles.historyIcons}/>
            </Button>
          </Item>
        </View>}
       Search*/}
       <TouchableOpacity  onPress={() => {this.showDateFromPicker();}}>
<Text>Date From</Text>
<Text>{this.state.dateFrom}</Text>
</TouchableOpacity>

           <DateTimePicker
            isVisible={this.state.isVisibleDateFromPickr}
            onConfirm={this.handleDateFromPicked}
            onCancel={this.hideDateFromPicker}
            date={new Date()}
            minimumDate={new Date(1900, 1, 1)}
            maximumDate={new Date(5000, 12, 31)}
            is24Hour={true}
            placeHolderText="Start date"
            />

  <TouchableOpacity  onPress={() => {this.showDateToPicker();}}>
<Text>Date To</Text>
<Text>{this.state.dateTo}</Text>
</TouchableOpacity>

           <DateTimePicker
            isVisible={this.state.isVisibleDateToPickr}
            onConfirm={this.handleDateToPicked}
            onCancel={this.hideDateToPicker}
            date={new Date()}
            minimumDate={new Date(1900, 1, 1)}
            maximumDate={new Date(5000, 12, 31)}
            is24Hour={true}
            placeHolderText="Start date"
            />


 <DatePicker
defaultDate={new Date()}
minimumDate={new Date(1900, 1, 1)}
maximumDate={new Date(5000, 12, 31)}
locale={"en"}
timeZoneOffsetInMinutes={undefined}
modalTransparent={false}
animationType={"fade"}
androidMode={"default"}
placeHolderText="End date"
textStyle={{ color: "green" }}
placeHolderTextStyle={{ color: "#d3d3d3" }}
onDateChange={this.setEndDate}
/>

  {this.state.isFilterVisible &&  <View>

  <Picker
    mode="dropdown"
    iosIcon={<Icon name="ios-arrow-down" />}
    style={{width: 200}}
    placeholder="Select your Location"
    placeholderStyle={{color: "#bfc6ea"}}
    placeholderIconColor="#007aff"
    selectedValue={this.state.selectedLoc}
    onValueChange={(value) => this.onLocValueChange(value)}
   >
    <Picker.Item label="All" value="-1" />
    {this.state.dataLocation.map((item, key) => <Picker.Item label= {item.locationName} value = {item.locationName} />)}
  </Picker>


<View style={{flexDirection:'row', justifyContent:'center', }}>
<TouchableOpacity style={styles.historyBtn} onPress={() => {this.filterData();}}>
     <Text style={styles.historyBtnText}>Filter</Text> 
     </TouchableOpacity>

      <TouchableOpacity style={styles.historyBtn} onPress={() => {this.cancelFilter();}}>
     <Text style={styles.historyBtnText}>Cancel</Text> 
     </TouchableOpacity>
  </View>
</View>}


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




