import React, {Component} from 'react';
import {Image, View, StatusBar, TouchableOpacity, WebView,Text, FlatList, ActivityIndicator, TouchableHighlight, Modal, Alert, ListView} from "react-native";
import styles from "../../../js/themes/styles"
import {Header, Left, Right, Body, Title, Container, Content, Button, DatePicker, Item, Picker, Input, Card, CardItem} from 'native-base'
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
const notFoundImg = require("../../../img/notFound.png")
const location = require("../../../img/location.png")
const panel = require("../../../img/run.png")
const clockIn = require("../../../img/clockIn.png")
const clockOut = require("../../../img/clockOut.png")
const enter= require("../../../img/enter.png")
const exit= require("../../../img/exit.png")
const hope= require("../../../img/workattendlogo.png")

export default class History extends Component {

    constructor(props)
    {
      super(props);
      var today = new Date();

      var dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      this.state={
          isLoading: false,
          isVisibleStartDatePicker: false, 
          isVisibleEndDatePicker: false,
          startDate: today,
          endDate: today,
          data:[],
          dataLocation:[],
          selectedLoc:'-1',
          dataSource :  dataSource,
          showLocFilter: false,
          totalCount: 0, 
          InCount:0, 
          OutCount: 0,
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
     date.setHours(0,0,0,0);
     endDate.setHours(0,0,0,0);
     //var endDateToCompare =   moment(endDate).format("DD-MM-YYYY");
     //var dateToCompare =   moment(date).format("DD-MM-YYYY");
   // alert('startdate' + date + 'endDate' + endDate);
    // alert('value' + date.getDate() + '*'+ endDate.getDate()  + '*'+ (date.getMonth()+1)  + '*'+ (endDate.getMonth()+1)  + '*'+ date.getFullYear()  + '*'+ endDate.getFullYear())
    // if(date.getDate()<=endDate.getDate() && (date.getMonth()+1)<=(endDate.getMonth()+1) && date.getFullYear()<=endDate.getFullYear())
     if(date<=endDate){
       //if(selectedLoc=='-1')
      // {
        this.setState({
          startDate: date,
         isVisibleStartDatePicker: false
      }, () => {
          this.getdakarPunchHistory(); 
      });
      /* }
       else 
       {
        this.setState({
          startDate: date,
         isVisibleStartDatePicker: false
      }, () => {
          this.getdakarLocationPunchHistory(); 
      });
       }*/
     }
     else 
     {
    {/*}  this.setState({
       isVisibleStartDatePicker: false
    }, () => {
      Alert.alert('Date From','Select date filter correctly. Date From should be smaller then Date To.')
       
    });*/}
    Alert.alert('Date From','Select date filter correctly. Date From should be smaller then Date To.',
    [{text: 'OK', onPress: () =>this.setState ({ isVisibleStartDatePicker: false})}])
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
          //if(selectedLoc=='-1')
         // {
            this.setState({
              endDate: date,
              isVisibleEndDatePicker: false
          }, () => {
              this.getdakarPunchHistory();
          });
       /* }
        else
        {
          this.setState({
            endDate: date,
            isVisibleEndDatePicker: false
        }, () => {
            this.getdakarLocationPunchHistory();
        });
        }*/
          }
          else 
          {
          Alert.alert('Date To','Select date filter correctly. Date To should be greater then Date From.',
           [{text: 'OK', onPress: () =>this.setState ({ isVisibleEndDatePicker: false})} ])
          }
      };

      /******* Date ********/

       /******* component bonding ********/
      onFocusFunction = () => {
        var today = new Date();
        var dataSource = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        
        this.setState(
          {
           isVisibleStartDatePicker: false, 
           isVisibleEndDatePicker: false,
           startDate: today,
           endDate: today,
           data:[],
           dataLocation:[],
           selectedLoc:'-1',
           dataSource :  dataSource,
           showLocFilter: false,
           totalCount: 0, 
           InCount:0, 
           OutCount: 0,
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

    convertArrayToMap() {
      moment.locale('en');
      
      var CategoryMap = {}; // Create the blank map
     // alert();
      
      this.state.data.forEach(function(foodItem) {
        let date = foodItem.punchDate; //food for the map! enjoy
        if (!CategoryMap[date]) {
          // Create an entry in the map for the createdOn if it hasn't yet been created
          CategoryMap[date] = [];
        }
        CategoryMap[date].push(foodItem);
      });
      
      return CategoryMap;
    }
    
      getdakarPunchHistory()
      {
        this.setState({
          isLoading: true,
        });
      var mobileAPIToken="";
      var companyID = "";
      var employeeID = "";
      var locationID =0;
      var realmAppUser = realm.objects('employee');
  
     var FORMAT= "YYYY-MM-DD 00:00:00"  
     var FORMATEND= "YYYY-MM-DD 23:59:59"  

      var dateFrom = moment(this.state.startDate).format(FORMAT);
      var dateTo = moment(this.state.endDate).format(FORMATEND);
       
      var selectedLoc = this.state.selectedLoc;
     // alert('location'+selectedLoc);
      if(selectedLoc>0)
      {
       // alert('location'+selectedLoc);
        locationID = selectedLoc;
      }
     //alert(dateFrom+' date to '+ dateTo)
      if(realmAppUser.length > 0)
        {
         employeeID = realmAppUser[0].employeeID;
         companyID = realmAppUser[0].companyID;
         mobileAPIToken = realmAppUser[0].token;
        }

        var baseURLApp=""; 
        var realmAppSettings = realm.objects('AppSettings');
        if(realmAppSettings.length > 0)
        {
          baseURLApp = realmAppSettings[0].appBaseURL;
        }
        
        getPunchHistory(baseURLApp, employeeID, companyID, mobileAPIToken, locationID, dateFrom, dateTo).then((result) => {
       //alert(dakarEmployeeID);
      // alert(dateTo + JSON.stringify(result))
       // alert(JSON.stringify(result))
      /* var resultSorted=  result.sort(function(a, b){
        return  b.date.split('-').reverse().join().localeCompare(a.date.split('-').reverse().join());
      });*/
      //alert(res)
      var dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      if(result!=null && result.length>0)
      {
                  this.setState({
                    data: result,
                    //isLoading: false,
                  }, () => {
                    this.setState({
                      dataSource: dataSource.cloneWithRowsAndSections(this.convertArrayToMap()),
                      isLoading: false,
                    });
                  }
                )
                }
                else{
                  //no data found reset data source
                  var dataSource = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2,
                    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
                  });
                  this.setState({
                    data:[],
                    dataSource: dataSource,
                    isLoading: false,
                  });
                }
               })
      }

     /* getdakarLocationPunchHistory()
      {
        this.setState({
          isLoading: true,
        });
        var mobileAPIToken="";
        var companyID = "";
        var employeeID = "";
    
        var realmAppUser = realm.objects('employee');
  
      var selectedLoc = this.state.selectedLoc;
      var dataNew =[];
      dataNew.splice(0);

     var FORMAT= "DD/MM/YYYY 00:00:00"  
    //var currentDate= new Date();
      var dateFrom = moment(this.state.startDate).format(FORMAT);
      var dateTo = moment(this.state.endDate).format(FORMAT);
      if(realmAppUser.length > 0)
      {
       // dakarUserName = realmAppUser[0].dakarUserName;
       employeeID = realmAppUser[0].employeeID;
       companyID = realmAppUser[0].companyID;
       //dakarToken = realmAppUser[0].dakarToken;
       mobileAPIToken = realmAppUser[0].token;
      }
    //  mployeeID, companyID, mobileAPIToken,locationID, dateFrom, dateTo)
      getPunchHistory(employeeID, companyID, mobileAPIToken, selectedLoc, dateFrom, dateTo).then((result) => {
       //alert(dakarEmployeeID);
        // alert(dateTo + JSON.stringify(result))
        // alert(JSON.stringify(result))
      /* var resultSorted=  result.sort(function(a, b){
        return  b.date.split('/').reverse().join().localeCompare(a.date.split('/').reverse().join());
      });/////
      var dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      if(resultSorted!=null && resultSorted.length>0)
      {
      if(selectedLoc!='-1')
{
  resultSorted.filter((item) => {
if(item.location == selectedLoc)
{
     dataNew = [...dataNew, item];
}
    });

   /* this.setState({
      data: dataNew,
      isLoading: false,
    });////

    this.setState({
      data: dataNew,
      //isLoading: false,
    }, () => {
      this.setState({
        dataSource: dataSource.cloneWithRowsAndSections(this.convertArrayToMap()),
        isLoading: false,
      });
    }
  )
  }
  else
  {
    this.setState({
      data: resultSorted,
      //isLoading: false,
    }, () => {
      this.setState({
        dataSource: dataSource.cloneWithRowsAndSections(this.convertArrayToMap()),
        isLoading: false,
      });
    }
  )
  }
        }
        else
        {
                //no data found reset data source
                var dataSource = new ListView.DataSource({
                  rowHasChanged: (r1, r2) => r1 !== r2,
                  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
                });
                this.setState({
                  data:[],
                  dataSource: dataSource,
                  isLoading: false,
                });
        }

               })
      }*/


      getLocation()
      {
        var mobileAPIToken="";
        var companyID =0;
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
         // alert(JSON.stringify(res[0].locationName))
         var authStr = "Authorization has been denied for this request."
    if(res.Message!=null && res.Message.includes(authStr))
    {
      realm.write(() => {
         realm.deleteAll();
      });
      //token expire
      this.props.navigation.navigate('Login');
    }
          this.setState({
            dataLocation : res,
          })
        });
      }
        /***HISTORY fetch from server**/  

        /****location */
        onLocValueChange(value)
{
//  alert(value);
  var dataNew =[];
dataNew.splice(0);
this.setState({isLoading: true, selectedLoc:value}, () => {
  //if(value=='-1')
  //{
    this.getdakarPunchHistory();
    //}
    //else if(value!='-1')
   // {
    //  this.getdakarLocationPunchHistory();
   // }
})
}


showLocFilter()
{
  var isShowLocFilter = this.state.showLocFilter;
  this.setState({
    showLocFilter:!isShowLocFilter,
  })
}
        /****location******* */

        renderSectionHeader(sectionData, category) {
          var dateMomentParse = moment(category, 'DD/MM/YYYY')
          var FORMAT= "MMMM DD, YYYY"  
          var dateFormatted= dateMomentParse.format(FORMAT);
          
     //     alert(dateMomentParse.format(FORMAT));
          return (
            <View style={styles.sectionHeaderHistory}>
            <Text style={styles.sectionHeaderHistryText}>{category}</Text>
         {/* <View style={styles.lineHorizontal}/>*/}
        </View>
          )
        }
  
      _renderItem = ({item, index}) => (
        <View style={{marginTop:8, backgroundColor:'#fff', marginLeft:3, marginRight:3}} key={index}>
        <View key={item.index} style={{ paddingTop:10, paddingLeft:10,paddingBottom:20, flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={{color: '#040404', fontSize: 19, marginRight: 10, marginBottom:2}}>{item.punchDate}</Text>
          <Text style={{color: '#820727', fontSize: 14, marginRight: 10}}>{item.location}</Text>
          </View>
    
          <View key={index}>
              <View>
              <Text style={{color: '#8E8D92', marginRight:10,fontSize: 20, textAlign:'center'}}>{item.punchTime}</Text>
              </View>
            <Text style={{color: 'rgba(0,184,108,1)',marginRight:10, fontSize: 20, textAlign: 'center'}}>{item.punchType}</Text>
          </View> 
        </View>
       <View key={index} style={styles.lineHorizontalHistory}/>
        </View>
        );

    render() {
        return (
          <Container style={styles.container} style={{backgroundColor:"rgb(233,234,241)"}}> 
          <Header  iosStatusbar="light-content" androidStatusBarColor='rgba(0,184,108,1)' style={styles.header}>
          <Left  style={{ flex: 1 }}>
          <Button  transparent onPress={()=> this.props.navigation.openDrawer()}>
          <Icon name='ios-menu' style={styles.iconMenuTopDash}/>
          </Button>
          </Left>
          <Body  style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
          </Body>
          <Right style={{flex: 4}}>
          <Title allowFontScaling={false} style={styles.Title}>History</Title>
          </Right>
        </Header>

  <TouchableOpacity  style={styles.filterBtn} onPress={() => {this.showLocFilter();}}>
  <FontAwesome name={'sliders'} size={17} style={styles.historyFilter}/>
  <Text style={styles.filterLabel}>Filter</Text>
  </TouchableOpacity>

  <View style={styles.filterBackground}>
 <View style={{ flexDirection: 'row'}}>
 <View style={styles.dateLeft}>
            <TouchableOpacity style={{marginLeft:6}} onPress={() => {this.showStartDatePicker();}}>
              <Text style={styles.filterLabelDate}>From Date</Text>  
                <Text style={styles.filterDateText}>{moment(this.state.startDate, 'DD/MM/YYYY').format('DD MMM, YYYY')}</Text>
            </TouchableOpacity>

              <View style = { {flexDirection: 'column', alignItems: 'center'}}>
              <Text style={styles.historyDivider}>|</Text>
                  <FontAwesome name={'calendar'} size={20} style={styles.historyIconsMiddle}/>
                  <Text style={styles.historyDivider}>|</Text>
                </View>
         </View>   
     
              
            <View style={styles.dateRight}>
                <TouchableOpacity  style={{justifyContent:'flex-start'}} onPress={() => {this.showEndDatePicker();}}>
                              <Text style={[styles.filterLabelDate, {marginLeft:4}]}>To Date</Text>
                              <Text style={[styles.filterDateText, {marginLeft:4}]}>{moment(this.state.endDate, 'DD/MM/YYYY').format('DD MMM, YYYY')}</Text>
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
    {this.state.dataLocation.map((item, key) => <Picker.Item key={key} label= {item.locationName} value = {item.locationID} />)}
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
 
{/*<FlatList
  data={this.state.data}
  renderItem={this._renderItem.bind(this)}
  extraData={this.state}
keyExtractor={this._keyExtractor}/>*/}
 {this.state.dataSource!=null &&  this.state.data!=null && this.state.data.length>0 && <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData, index) => 
      <Card transparent style={{flexWrap: 'nowrap', marginLeft:9, marginRight:9,borderRadius:12, }} key={rowData.punchDate}>
          <CardItem  key={rowData.employeePunchTime} style={{ paddingRight: 0,  borderTopLeftRadius: 12, borderTopRightRadius: 12, borderBottomLeftRadius: 12, borderBottomRightRadius: 12,  }}>
          <View key={index} style={{flex: 1, flexDirection: 'row'}}> 
      {/*  {rowData.punchType==1 &&  <Image source={enter} style={{height: 20, width:20,marginRight:2}} /> } {rowData.punchType==2 &&  <Image source={exit} style={{height: 20, width:20,marginRight:2}} /> }*/}

      
         
          <View style={{flex: 1, flexDirection: 'row'}}>
           {/*   <Image source={panel} style={{height: 30, width:20,}} />*/}
              <Image source={hope} style={{height: 40, width:30, marginTop:5,marginRight:10}} />
          <View style={{flex: 1, flexDirection: 'column'}}>
          {rowData.punchType==1 && <Text style={{color: 'rgb(0,0,0)', marginRight:10,fontSize: 20,}}>{rowData.employeePunchTime}</Text> }
          {rowData.punchType==2 && <Text style={{color: 'rgb(0,0,0)', marginRight:10,fontSize: 20,}}>{rowData.employeePunchTime}</Text> }
          <Text style={{color: 'rgba(0,0,0,0.5)', fontSize: 14, marginRight: 10, textTransform: 'capitalize'}}>{rowData.locationName}</Text>
          </View>


                    <View   key={index}>
        {/*  <Image source={panel} style={{height: 30, width:20,}} />*/}
            {rowData.punchType==2 &&
            <View  style={styles.bkgOut}> 
          {/*<Image source={clockOut} style={{height: 50, width:40,}} />*/}
              <Text style={{color: "rgb(255,255,255)", fontSize: 20, textAlign: 'center',}}>OUT</Text>
              </View>}
         
              {rowData.punchType==1 &&
               <View  style={styles.bkgIn}> 
                {/* <Image source={clockIn} style={{height: 50, width:40,}} />*/}
                <Text style={{color: "rgb(255,255,255)", fontSize: 20, textAlign: 'center'}}>IN</Text> 
                </View>}
          </View> 
          </View>
         
     {/*  <View key={index}>
            {rowData.punchType==2 &&
            <View> 
          <Image source={clockOut} style={{height: 50, width:40,}} />
              </View>}
         
              {rowData.punchType==1 &&
               <View> 
                 <Image source={clockIn} style={{height: 50, width:40,}} />
                </View>}
          </View> */}


 
        </View>
       </CardItem>
                  {/*    <CardItem  style={{ backgroundColor: rowData.isRead== 0 ? "rgb(234, 243, 242)" : "rgb(255,255,255)"}} content  key={rowData.type}>
                      <Text style={{backgroundColor:"transparent"}}  allowFontScaling={false}> {rowData.type}</Text>
                      </CardItem> */}
                      </Card>
          }
            renderSectionHeader={this.renderSectionHeader}
          />}



        {this.state.isLoading && <View style={styles.loading}>
          <ActivityIndicator size='large'/>
        </View>}
        </Container>
    );
  }
}


