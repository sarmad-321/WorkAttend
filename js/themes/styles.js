const React = require('react-native');

const {StyleSheet, Dimensions, Platform} = React;

{
  /* WIDTH & HEIGHT */
}
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

{
  /* COLORS */
}
const primarycolor = 'rgba(255, 152, 0, 1)'; //"#2196f3"
const dark = 'rgb(84,181,64)'; //'#0073b1';// "rgba(193, 33, 35, 1)"
const red = 'rgba(193, 33, 35,1 )';
const greenBright = 'rgba(0,184,108,1)';
const greenBrightLow = 'rgba(0,184,108,0.8)';
const green = 'rgba(84, 182, 66,1 )';
const secondarycolor = 'rgb(56,101,133)'; //"rgb(191, 219,215)"
const lightprimary = '#82f7ff';
const lightestprimary = 'rgb(234, 243, 242)';
const white = 'rgb(255, 255, 255)';
const grey = 'rgb(156, 178, 190)';
const black = '#000000';
const darkGrey = 'rgb(146,146,146)';
const darkBlue = 'rgb(5,51,143)';
const ashWhite = 'rgb(233,234,241)';
{
  /* CAMERA */
}

const textColor = 'rgb(64,66,79)';

const rectDimensions = WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = WIDTH * 0.005; // this is equivalent to 2 from a 393 device width

const scanBarWidth = WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22ff00';
const iconScanColor = 'blue';
const rectBorderColor = 'red';
const overlayColor = 'rgba(108, 122, 137, 0.5)'; // this gives us a black color with a 50% transparency

export default {
  /************************COMMON START***************************/
  /* LOADER */
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  },
  smallLoader: {
    position: 'absolute',
    left: 2,
    //right: 0,
    top: 7,
    //bottom: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  /* LOADER */

  /*TOP HEADER - START*/
  container: {
    backgroundColor: 'rgb(233,234,241)',
  },
  errorMsg: {
    textAlign: 'center',
    color: red,
  },
  button: {
    borderRadius: 50, // Rounded border
    borderWidth: 2, // 2 point border widht
    borderColor: red, // White colored border
    paddingHorizontal: 50, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    backgroundColor: red,
  },
  // Button text
  text: {
    color: white,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
  },
  header: {
    backgroundColor: greenBrightLow,
    borderBottomRadius: 3,
    borderColor: greenBrightLow,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    shadowColor: greenBrightLow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  Title: {
    color: white,
    // fontFamily: Platform.OS == "android" ? "sans-serif-light" : "system font",
    fontWeight: '600',
    fontSize: 18,
    backgroundColor: 'transparent',
    //justifyContent: 'center', alignItems: 'center',
    //textAlign:'center'
  },
  TitleDashCustom: {
    color: 'rgba(0,0,0,0.7)',
    // fontFamily: Platform.OS == "android" ? "sans-serif-light" : "system font",
    fontWeight: '600',
    fontSize: 18,
    backgroundColor: 'transparent',
    //justifyContent: 'center', alignItems: 'center',
    //textAlign:'center'
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
    //alignSelf: 'center'
  },
  infoIcon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  drawerMainIcon: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  infoImage: {
    width: 30,
    margin: 10,
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  logomenurow: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingRight: 8,
    paddingLeft: 8,
  },
  govlogo: {
    width: 45,
    margin: 30,
    height: 40,
  },
  menuButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainmenuImage: {
    width: 70,
    margin: 5,
    height: 80,
  },
  registerscreenTitle: {
    backgroundColor: primarycolor,
    height: 50,
    //justifyContent: 'left',
    //alignItems: 'left'
  },
  regscreenTitleText: {
    fontSize: WIDTH / 25,
    color: white,
    margin: 10,
    backgroundColor: 'transparent',
  },
  langscreenTitle: {
    backgroundColor: primarycolor,
    marginTop: 20,
    marginBottom: 20,
    height: 50,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  langscreenTitleText: {
    fontSize: WIDTH / 25,
    margin: 10,
    color: white,
    backgroundColor: 'transparent',
  },
  screenTitle: {
    backgroundColor: primarycolor,
    margin: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTopTitle: {
    backgroundColor: primarycolor,
    height: 70,
    flexDirection: 'row',
  },
  screenTitleBack: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  textRightContainer: {
    width: 0,
    flexGrow: 1,
    flex: 1,
    alignItems: 'flex-end',
  },
  textLeftContainer: {
    width: 0,
    flexGrow: 1,
    flex: 1,
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  screenTopTitleText: {
    fontSize: WIDTH <= 500 ? WIDTH / 25 : WIDTH / 35,
    fontFamily: Platform.OS == 'android' ? 'Roboto Light' : 'system font',
    color: white,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 24,
    marginRight: 10,
    textAlign: 'right',
  },
  textLongRightContainer: {
    flex: 1,
  },
  screenLongTopTitleText: {
    // width:WIDTH,
    fontSize: WIDTH / 25,
    fontFamily: Platform.OS == 'android' ? 'Roboto Light' : 'system font',
    color: white,
    backgroundColor: 'transparent',
    textAlign: 'right',
    alignSelf: 'stretch',
    marginTop: 22,
    marginRight: 10,
  },
  screenTitleText: {
    fontSize: WIDTH / 25,
    color: white,
    backgroundColor: 'transparent',
  },
  /*TOP HEADER - END*/

  iconMenuTop: {
    fontSize: 35,
    color: black,
  },
  iconMenuTopDash: {
    fontSize: 35,
    color: white,
  },
  /************************COMMON END************************** */

  /***********************  DASHBOARD  ************************* */
  punchButton: {
    borderRadius: 50, // Rounded border
    borderWidth: 2, // 2 point border widht
    borderColor: greenBright, // White colored border
    paddingHorizontal: 50, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    backgroundColor: greenBright,
  },
  lineHorizontal: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  calloutView: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
    marginBottom: 0,
    paddingBottom: 0,
    shadowColor: '#00000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.1,
  },
  calloutSearch: {
    borderColor: 'transparent',
    marginLeft: 10,
    width: '90%',
    marginRight: 10,
    height: 40,
    borderWidth: 0.0,
  },
  menuDashboard: {
    marginLeft: 6,
    marginTop: 4,
  },
  headerDashboard: {
    backgroundColor: 'transparent', //'rgba(84,181,64, 0.2)'
  },
  containerCallout: {
    width: WIDTH,
  },
  textLoc: {
    padding: 10,
    color: black,
  },
  textLocPin: {
    padding: 5,
  },
  iconLoc: {
    color: 'rgb(0,100,0)',
    fontSize: 15,
    padding: 10,
  },
  calloutButton: {
    width: 'auto',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  iconPin: {
    color: 'rgb(0,100,0)',
    fontSize: 40,
    padding: 10,
    marginTop: 0,
    paddingTop: 0,
  },
  calloutViewPin: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 10,
    marginBottom: 0,
    paddingBottom: 0,
    shadowColor: '#00000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.3,
  },
  textLatLong: {
    color: '#A9A9A9',
  },
  defaultTextClock: {
    color: grey,
  },
  sucessTextClock: {
    color: '#27acb1',
    fontWeight: 'bold',
  },
  errorTextClock: {
    color: red,
    fontWeight: 'bold',
  },
  punchBtnDash: {
    backgroundColor: white,

    // position: 'absolute',
    // zIndex: 999,
    //left:0,
    //top: HEIGHT - (HEIGHT/4),//margin:5,   // left: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    borderRadius: 10, //Rounded border
    borderWidth: 2, //2 point border widht
    borderColor: '#eee', //White colored border
    //marginLeft: "5%",
    // marginRight: "5%",
    marginBottom: '6%',
  },
  punchButtonsView: {
    width: WIDTH - WIDTH / 3,
  },
  punchMArkImageView: {
    width: WIDTH - (WIDTH - WIDTH / 3),
  },
  punchImageBkg: {
    height: '100%',
    width: '100%',
  },
  punchBtnStartDash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, //Rounded border
    borderWidth: 2, //2 point border widht
    borderColor: greenBright, //White colored border
    backgroundColor: greenBright,
    width: WIDTH - WIDTH / 2.3, //2.5
    height: 40,
    //paddingHorizontal: 50, //Horizontal padding
    // paddingVertical: 3, //Vertical padding
    marginBottom: 10,
  },
  punchBtnendDash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, //Rounded border
    borderWidth: 2, //2 point border widht
    borderColor: red, //White colored border
    backgroundColor: red,
    width: WIDTH - WIDTH / 2.3,
    height: 40,
    // paddingHorizontal: 50, //Horizontal padding
    // paddingVertical: 3, //Vertical padding
    marginBottom: 10,
  },
  modalButton: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    //color: white,
    fontWeight: 'bold',
  },
  modalText: {
    margin: 10,
  },
  modalButtonBack: {
    //padding: 10,
    borderRadius: 10, //Rounded border
    borderWidth: 2, //2 point border widht
    borderColor: greenBright, //White colored border
    //backgroundColor: greenBright,
    width: WIDTH - 150,
    height: 40,
    paddingHorizontal: 50, //Horizontal padding
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    //paddingVertical: 3, //Vertical padding
    //marginBottom:10,
  },
  centeredViewDash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalViewDash: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  alertboxDash: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 999,
    left: 15,
    top: HEIGHT - 450,
    //width: WIDTH - 30,  //height: 40,
  },

  punchBtnStart: {
    borderRadius: 4, //Rounded border
    borderWidth: 2, //2 point border widht
    borderColor: greenBright, //White colored border
    backgroundColor: greenBright,
    width: WIDTH - 30,
    height: 40,
    paddingHorizontal: 50, //Horizontal padding
    paddingVertical: 3, //Vertical padding
    marginBottom: 10,
  },
  punchBtnEnd: {
    //padding: 10,
    borderRadius: 4, //Rounded border
    borderWidth: 2, //2 point border widht
    borderColor: red, //White colored border
    backgroundColor: red,
    width: WIDTH - 30,
    height: 40,
    paddingHorizontal: 50, //Horizontal padding
    paddingVertical: 3, //Vertical padding
    marginBottom: 2,
  },
  bkgCenter: {},
  bkgOut: {
    backgroundColor: '#ff7256',
    borderBottomLeftRadius: 12, //Rounded border
    borderTopLeftRadius: 12,
    borderWidth: 2,
    borderColor: '#ff7256',
    paddingLeft: 6,
    paddingRight: 6,
    alignSelf: 'center',
    textAlign: 'center',
    shadowColor: '#ff7256',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    marginTop: 6,
    elevation: 18,
  },
  bkgIn: {
    marginTop: 6,
    backgroundColor: '#4dd5a5',
    borderBottomLeftRadius: 12, //Rounded border
    borderTopLeftRadius: 12,
    borderWidth: 2,
    borderColor: '#4dd5a5',
    paddingLeft: 10,
    paddingRight: 16,
    alignSelf: 'center',
    textAlign: 'center',
    shadowColor: '#4dd5a5',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    marginTop: 6,
    elevation: 18,
  },
  /*punchBtnDashOut:{
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 999,
    left: 15,
    height: 40,
    top: HEIGHT - 110,
    width: WIDTH - 30,
    borderRadius: 4, //Rounded border
    borderWidth: 2, //2 point border widht
    borderColor:  red, //White colored border
    paddingHorizontal: 50, //Horizontal padding
    paddingVertical: 10, //Vertical padding
    backgroundColor: red,
  },*/
  punchInBtnText: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    color: white,
    //fontWeight: 'bold',
    fontSize: 15,
  },
  /////

  // Slide
  slide: {
    backgroundColor: 'transparent',
  },
  // Pagination indicators
  pagination: {
    position: 'absolute',
    //bottom: 110,
    // left: 0,
    //right: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    paddingTop: 10,
    paddingBottom: 5,
  },
  // Pagination dot
  dot: {
    backgroundColor: 'rgba(0,0,0,.75)',
    width: WIDTH / 10,
    height: 6,
    borderRadius: 9,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  // Active dot
  activeDot: {
    backgroundColor: green,
  },
  questSubmit: {
    borderRadius: 4, //Rounded border
    borderWidth: 2, //2 point border widht
    borderColor: '#4dd5a5', //'#ee482c', //White colored border
    backgroundColor: '#4dd5a5', //'#ee482c',
    width: WIDTH - WIDTH / 3, //WIDTH - 50,
    height: 30,
    paddingHorizontal: 50, //Horizontal padding
    paddingVertical: 3, //Vertical padding
    marginBottom: 10,
  },
  questSubmitCancel: {
    borderRadius: 4, //Rounded border
    borderWidth: 2, //2 point border widht
    borderColor: '#ee482c', //White colored border
    backgroundColor: '#ee482c',
    width: WIDTH - WIDTH / 3, //WIDTH - 50,
    height: 30,
    paddingHorizontal: 50, //Horizontal padding
    paddingVertical: 3, //Vertical padding
    marginBottom: 10,
  },
  questionaireDash: {
    //  flex: 1,
    //flexDirection: 'column',
    //position: 'absolute',
    //zIndex: 999,
    //left: 15,
    //height: 40,
    //top: HEIGHT - 450,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 22,
    padding: 10,
  },
  centeredViewQuest: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modalViewQuest: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionaireTopText: {
    color: black,
    paddingBottom: 10,
  },
  declarationText: {
    paddingTop: 20,
    fontSize: 10,
    color: '#6c757d',
    paddingBottom: 10,
    textAlign: 'justify',
  },
  questionText: {
    fontWeight: '200',
  },
  questResultSubmit: {
    borderRadius: 4, //Rounded border
    borderWidth: 2, //2 point border widht
    borderColor: '#4dd5a5', //White colored border
    backgroundColor: '#4dd5a5',
    width: WIDTH - WIDTH / 3, //WIDTH - 50,
    height: 30,
    paddingHorizontal: 50, //Horizontal padding
    paddingVertical: 3, //Vertical padding
    marginBottom: 10,
    marginTop: 10,
  },
  /************************ DASHBOARD ************************** */

  /****************************Punch Request************************ */
  prBtntext: {
    color: white,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 16,
  },
  containerPunchRequest: {
    backgroundColor: ashWhite,
  },
  boxLayout: {
    backgroundColor: white,
    //marginLeft:5,
    //marginRight:5,
    marginTop: 15,
    marginBottom: 5,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },

  boxLayoutDateTime: {
    backgroundColor: white,
    //marginLeft:5,
    //marginRight:5,
    marginTop: 15,
    marginBottom: 5,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  requestLabelText: {
    color: '#000',
    fontSize: 16,
    //margin:10,
    fontWeight: 'normal',
    //marginTop: 30,
    //textAlign:'center',
  },
  formIconsPr: {
    fontSize: 16,
    color: darkGrey,
    marginRight: 2,
  },
  dateTimeLeft: {
    width: WIDTH / 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dateTimeRight: {
    width: WIDTH / 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  lineHorizontalPunchRequest: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 0,
  },
  TextPunchRequest: {
    color: 'rgb(50, 168, 82)',
    // fontWeight: '600',
    //marginTop: 30,
    marginLeft: 10,
  },
  labelPunch: {
    padding: 10,
  },
  punchBtn: {
    borderRadius: 50, // Rounded border
    borderWidth: 2, // 2 point border widht
    borderColor: greenBright, // White colored border
    paddingHorizontal: 50, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    backgroundColor: greenBright,
  },
  timeText: {
    //marginTop: 30,
    marginLeft: 10,
    color: 'rgb(173,173,173)',
  },
  timeSelectedText: {
    marginTop: 30,
    marginLeft: 10,
  },
  labelBack: {
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#eee',
    marginBottom: 2,
  },
  /****************************Punch Request************************ */

  /****************************Punch History************************ */
  dateLeft: {
    width: WIDTH / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateRight: {
    width: WIDTH / 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 3,
  },
  dateCenter: {},
  historyIcons: {
    color: 'rgb(162,162,162)', //'#5D5C61',
    marginBottom: 8,
    marginRight: 3,
    marginTop: 3,
  },
  historyFilter: {
    color: 'rgb(162,162,162)', //'#5D5C61',
    marginBottom: 7,
    marginRight: 6,
    marginTop: 3,
  },
  historyIconsMiddle: {
    color: 'rgb(205,209,213)', //'#5D5C61',
  },
  historyDivider: {
    color: 'rgb(205,209,213)',
  },
  historyBtnText: {
    color: white,
    fontWeight: 'bold',
  },
  historyBtn: {
    margin: 6,
    borderRadius: 4, //Rounded border
    borderWidth: 2, //2 point border widht
    borderColor: '#5D5C61', //White colored border
    paddingHorizontal: 30, //Horizontal padding
    paddingVertical: 8, //Vertical padding
    backgroundColor: '#5D5C61',
  },

  lineHorizontalHistory: {
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  filterBackground: {
    //marginTop:15,
    // paddingTop:2,
    margin: 10,
    backgroundColor: white,
    //paddingLeft: 10,
  },
  filterLabel: {
    fontSize: 15,
    color: black,
    fontWeight: '100',
  },
  filterLabelDate: {
    color: black,
    fontWeight: '300',
    marginTop: 3,
    marginRight: 8,
    marginBottom: 5,
  },
  filterDateText: {
    color: black,
  },
  filterItem: {
    paddingLeft: 10,
  },
  filterBtn: {
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingTop: 10,
    // backgroundColor:'#d9d9d9'
  },
  sectionHeaderHistory: {
    marginTop: 10,
    // backgroundColor: darkGrey,
  },
  sectionHeaderHistryText: {
    fontSize: 16,
    color: 'rgb(151,160,168)',
    marginLeft: 10,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5,
    /*marginLeft:10,
           marginTop:5,
           marginRight:5,
           marginBottom:5,
            color:'rgb(104,132,146)',
            backgroundColor:'transparent',*/
  },

  /****************************Punch History************************ */

  /****************************Schedule************************ */
  scheduleMain: {
    backgroundColor: '#ffff',
    borderRadius: 3,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 10,
    // marginBottom:0,
    // paddingBottom:0,
    shadowColor: '#00000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.3,
    borderColor: red,
    borderLeftWidth: 6,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: '2%',
    paddingRight: '2%',
  },
  scheduleLabel: {
    // color: greenBright,
    fontSize: 12,
    textAlign: 'left',
    marginRight: 7,
    fontWeight: 'bold',
  },

  /****************************Schedule************************ */

  /****************************LOGIN************************ */

  containerLogin: {
    backgroundColor: '#fff',
  },
  loginLogo: {
    alignContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 80,
  },
  loginBkg: {
    width: WIDTH,
    height: HEIGHT,
  },
  loginText: {
    color: white,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontWeight: 'bold',
    //fontSize: 15,
  },
  /****************************LOGIN************************ */

  /***********************************BOOK LEAVES ************************** */
  stepIndicator: {
    marginVertical: 50,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBook: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  nextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentForm: {
    padding: 10,
  },
  /*************************************BOOK LEAVES ************************** */

  /*************************************MY LEAVES ************************** */
  leaveDetailTxt: {
    fontSize: 16,
    color: 'rgb(19, 124, 124)',
    paddingTop: 5,
    paddingBottom: 5,
  },
  leaveTxt: {
    fontSize: 16,
    color: 'rgb(5, 30, 30)',
    paddingTop: 5,
    paddingBottom: 5,
  },
  /*************************************MY LEAVES ************************** */

  /************************************* PROFILE ************************** */

  profileSeprator: {
    borderBottomColor: '#b3b3b3',
    borderBottomWidth: 1,
  },
  profileTxt: {
    fontSize: 18,
    color: 'rgb(5, 30, 30)',
  },
  profileHeadTxt: {
    fontSize: 14,
    color: 'rgb(5, 30, 30)',
  },
  containerProf: {
    flex: 1,
    alignItems: 'center',
  },
  imageProf: {
    marginTop: HEIGHT / 9,
    width: 100,
    height: 100,
  },
  headingProf: {
    color: greenBright,
    marginTop: 40,
    fontSize: 25,
  },
  textProf: {
    fontSize: 17,
    marginHorizontal: 8,
    marginVertical: 10,
  },
  bottomProf: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  bottomTextProf: {
    color: grey,
  },
  /************************************* PROFILE ************************** */

  /************************************* HELP ************************** */
  // Slide styles
  slideHelp: {
    flex: 1, // Take up all screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#ffffff',
  },
  // Header styles
  headerHelpSlider: {
    color: '#000000',
    fontFamily: Platform.OS == 'android' ? 'serif' : 'Avenir',
    fontSize: 30,
    // fontWeight: "bold",
    marginVertical: 15,
  },
  // Text below header
  textHelp: {
    color: '#000000',
    fontFamily: Platform.OS == 'android' ? 'sans-serif-thin' : 'Avenir',
    fontSize: 15,
    marginHorizontal: 40,
    textAlign: 'center',
    paddingBottom: 60,
  },
  /************************************* HELP ************************** */

  /************************************* COMPANY REGISTER ************************** */
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  topOverlay: {
    flex: 1,
    height: WIDTH,
    width: WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: WIDTH,
    width: WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: WIDTH * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  leftAndRightOverlay: {
    height: WIDTH * 0.65,
    width: WIDTH,
    backgroundColor: overlayColor,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },

  /************************************* COMPANY REGISTER ************************** */

  /************************************* SETTINGS ************************** */
  labelSettings: {
    color: grey,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 7,
  },
  labelHeading: {
    color: black,
    fontSize: 16,
    marginLeft: 3,
    marginBottom: 3,
  },
  labelSubHeading: {
    color: '#92a4a5',
    fontSize: 14,
    marginLeft: 3,
    marginBottom: 6,
  },
  itemSett: {
    marginLeft: 4,
    marginRight: 4,
  },
  /************************************* SETTINGS ************************** */
};
