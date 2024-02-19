export const getToken = (baseURLApp, usernameParam, passwordParam) => {
    //  let username = username.toLowerCase().trim();
     // let password = password.trim();
  //alert(usernameParam + passwordParam)
      var details = {
         grant_type: "password",
          username: usernameParam, 
          password: passwordParam
    };
  
  var formBody = [];
  for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  var pathArray = baseURLApp.split('?');
  var hostname = pathArray[0]+'/token?'+pathArray[1];

  //alert('i am hostname' +baseURLApp); 
  
let URL = hostname.trim().toLowerCase();

 // URL = URL.replace('/api/resource','/token');
//alert(URL);
  //const URL = baseURLApp+`/token`;
  
      return fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      })
      .then((response) =>  response.json())
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
        });
  }