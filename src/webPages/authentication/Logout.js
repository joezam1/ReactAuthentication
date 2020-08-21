import React ,{useEffect }from 'react';
import {Link} from 'react-router-dom';
import sessionConfig from '../../configuration/SessionCookieConfig.js'; 
import Cookies from 'js-cookie';
import ServerConfig from '../../configuration/ServerConfig.js';
import httpMethods from '../../httpRequests/Methods.js';
import inputCommon from '../../library/InputCommon.js';

export default function Logout(){

    //useEffect()==logout
    //destroy all front end session and tokens stored in cookies.
    //remove all the values in she sessionCookieConfiguration and notify
    //the Back end to delete and remove all tokens and user sessions.

    function setServerResponseCallback(response){
        console.log(response);

        if(inputCommon.isValid(response) && response.status !== 'ERROR'){
            //Always destroy the sessions. 
            destroyAllSessionCookies();
            setSessionCookieConfig();
        }
       
    }

    useEffect(function(){
        var url = ServerConfig.url;
        var logoutPath = '/api/logout';
        var logoutUrl = url+logoutPath;
        httpMethods.getMethod(logoutUrl, setServerResponseCallback);

    },[]);




    function destroyAllSessionCookies(){
        var sessionCookie = sessionConfig.SessionCookieName();
        var userToken = sessionConfig.UserTokenName();
        var refreshToken = sessionConfig.RefreshTokenName();
        var sessionArray = [sessionCookie,userToken,refreshToken]
        for(var a=0; a<sessionArray.length;a++){
            Cookies.remove(sessionArray[a]);
            validateCookieIsDeleted(sessionArray[a]);
        }
    }

    function validateCookieIsDeleted(cookieName){
        var cookieValue =  Cookies.get(cookieName)
        if(inputCommon.isValid( cookieValue) ){
            var message = `The session cookie ${cookieName} has not been deleted`;
            const error = new Error(message);
            throw error;
        }
    }

    function setSessionCookieConfig(){
        sessionConfig.setSessionId('');
        sessionConfig.setUserId('');
        sessionConfig.setOriginalMaxAge(0);
        sessionConfig.setExpires('');
        sessionConfig.setSecure(false);
        sessionConfig.setHttpOnly(true);
        sessionConfig.setPath('');
        sessionConfig.setSameSite(false);
        
    }

    return(<div>
        <div><p>You are logged out </p></div>
        <Link to='/'>Home</Link>
    </div>)
}

