import inputCommon from '../library/InputCommon.js';
import SessionCookieConfig from '../configuration/SessionCookieConfig.js';
import Cookies from 'js-cookie';


var getMethod = function (url, responseCallback, selectedHeaders=null){
    var defaultHeaders = getAuthorizationHeaders();
    if(selectedHeaders !==null){
        defaultHeaders = selectedHeaders;
    }

    fetch( url, {
        method: 'GET',
        headers: defaultHeaders
      }
    ).then(function (response) {
        console.log(response)   
        return response.text();
    }).then(function (result) {
        console.log(result) 
        var resultInfo = processHttpResponse(result)
        responseCallback(resultInfo);
    }).catch(function(error){
        console.log(Error("PromiseError: "+error))    
    });
}

var postMethod = function (url, modelPayload,responseCallback, selectedHeaders=null){
    var defaultHeaders = getAuthorizationHeaders();
    if(selectedHeaders !==null){
        defaultHeaders = selectedHeaders
    }

    fetch(url, {
        method: 'POST',
        headers: defaultHeaders,
        body: modelPayload
      }
    ).then(function (response) {
      
       return response.text();
    }).then(function (result) {
        console.log(result)
        var resultInfo = processHttpResponse(result)
        responseCallback(resultInfo);
    }).catch(function(error){
        console.log(Error("PromiseError: "+error))    
    });
        
}



var httpMethods ={
    getMethod:getMethod,
    postMethod:postMethod
}
export default httpMethods;

//# region Private Methods


function getAuthorizationHeaders(){
    console.log('function SessionCookieConfig', SessionCookieConfig)
    var sessionId = SessionCookieConfig.getSessionId();
    var userTokenName = SessionCookieConfig.UserTokenName();
    var refreshTokenName = SessionCookieConfig.RefreshTokenName();
    var sessionCookieName = SessionCookieConfig.SessionCookieName();


    var userToken = Cookies.get(userTokenName);
    var refreshToken = Cookies.get(refreshTokenName);
    var sessionCookieId = Cookies.get(sessionCookieName);
    var userSessionId = (sessionId === '')? sessionCookieId : sessionId;
    var bearer = 'Bearer '+ userToken;
    var authorizationHeaders = new Headers({        
        'Accept': 'application/json',
        'Authorization': bearer,
        'Content-Type': 'application/json',
        'Refresh_token':refreshToken,
        'Session_id':userSessionId,
    });
    return authorizationHeaders;
}

function  processHttpResponse(value){
    if(inputCommon.isValidJson(value)){
        var promiseResult = JSON.parse(value);     
        return promiseResult;
    }
    return value;
 }

//#endRegion Private Methods