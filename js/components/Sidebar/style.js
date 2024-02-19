const React = require("react-native");

const { StyleSheet, Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const primarycolor = "#526585"
const dark = "rgb(7,53,144)"

export default {
  headerBackgroundImage:{
    height:deviceHeight,
     width:deviceWidth,
  },
  headerText:{
    paddingLeft:10,
    color:'rgba(84,181,64, 0.6)',
    fontWeight:'600',
    fontSize:18,
  },
  headerTextColorOne:{
   paddingLeft:10,
   color:'#27acb1',//'rgba(137,164,166, 0.6)',
    fontWeight:'600',
    fontSize:18,
    //paddingTop:deviceHeight/39,
  },
  headerTextSecondColor:{
  //  paddingLeft:10,
    color:'#ee482c',//'rgb(0,184,108)',
    fontWeight:'bold',
    fontSize:18,
   // paddingTop:deviceHeight/39,
  },
  headerSubText:{
    paddingLeft:10,
    color:'rgb(64,66,79)',
    fontWeight:'400',
    fontSize: 14,
    marginTop:2, 
    fontStyle: 'italic'
  },
  headerDrawer:{
    backgroundColor: '#ffff',
   // paddingBottom:deviceHeight/60,
    paddingTop:deviceHeight/30,
   // marginTop:20,
    marginBottom:5,
    //borderWidth: 1,
  borderRadius: 3,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
  },
  textDrawer: {
    fontWeight: "500",
    fontSize:(deviceWidth<=350) ? 16 : 18,
    color:'rgb(64,66,79)',//"#546e7a",
    fontFamily: Platform.OS == "android" ? "sans-serif-light" : "system font",
  },
  textDrawerHeader: {
    fontSize:(deviceWidth<=350) ? 18 : 19,
    fontWeight:"normal",
     color:"#fff", 
     backgroundColor: 'transparent',
     margin:10,
  },
  lineHorizontalSide:
{
borderBottomWidth: 1,
borderBottomColor: '#ddd',
alignContent:'center',
alignItems:'center'
},
listItemNoBorder:
{
 backgroundColor:'transparent',  
   borderWidth: 0,
   margin: 0, 
   borderBottomWidth: 0
}, 
menuIcons:{
  color:'rgba(4, 144, 148, 0.6)',//'rgb(191,192,203)',//"rgba(243,29,84,1)", 
  fontSize:30
}, 
menuIconsEvil:{
  color:'#0073b1',//"rgba(243,29,84,1)", 
  fontSize:30, 
  fontWeight:'1600',
},
menuIconsAntDesign:{
  color:'#0073b1',
  fontSize: 20,
},
footer: {
  position: 'absolute', //Here is the trick
  bottom: 0, //Here is the trick
  //height: 10,
//  left: 0, 
  top: deviceHeight - 100, 
 // width: deviceWidth-50,
 justifyContent:'center',
},
listItem:{
  marginBottom:5,
  marginTop:5,
},
};
