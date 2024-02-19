export const getAppDetail = (baseURLApp, mobileAPIToken) => {
    const URL = baseURLApp + `/GetAppDetails`;
    var bearer = 'Bearer ' + mobileAPIToken;
        return fetch(URL, {
          method: 'POST',
          headers: {
            'Authorization': bearer,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        })
        .then((response) =>  response.json())
    }