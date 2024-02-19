import DateTimePicker from "react-native-modal-datetime-picker";
import realm  from '../realm'

export const getQuestionnaire = (baseURLApp, mobileAPIToken, companyID, navigation) => {
const URL = baseURLApp + `/GetQuestionnaire?companyID=`+companyID;
var bearer = 'Bearer ' + mobileAPIToken;
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    .then((response) =>  
    {
    const statusCode = response.status;
  const data = response.json();
  
  if(statusCode==401) //unauthorized logout the user since the token is expired
  {
    //keep QR Cpde
    realm.write(() => {
      realm.deleteAll();
   });
   navigation.navigate('Login');
  }
  //return data;
  return Promise.all([statusCode, data]).then(res => ({
    statusCode: res[0],
    data: res[1],
  }))
     })
  //  .then((response) =>  response.json())
  /*  .then((responsenew) =>  
{
  alert(tokenParam +" *" + deviceIDParam +"* " + manufacturerParam +" *"+ JSON.stringify(responsenew) + responsenew.errorMessage)
}) */   
}