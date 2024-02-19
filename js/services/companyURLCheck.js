export const companyURLCheck = (applicationKey) => {

//URL = URL.toLowerCase();

//var pathArray = URL.split('?');
//var hostname = pathArray[0];
//alert('hh'+hostname);

//var URLToCall = URL.toLowerCase();
var URLToCall = 'https://mobileapi.workattend.com/api/values/checkURL?mobileAppKey='+ applicationKey;
//URLToCall = URLToCall.replace('/resource','/values/checkURL');

    return fetch(URLToCall, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
     /* body: JSON.stringify({
        mobileAppKey: applicationKey
      })*/
    })
    .then((response) =>  response.json())
  /*  .then((responsenew) =>  
{
  alert(tokenParam +" *" + deviceIDParam +"* " + manufacturerParam +" *"+ JSON.stringify(responsenew) + responsenew.errorMessage)
}) */   
}