import React from 'react';
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import sessionConfig from '../configuration/SessionCookieConfig.js';


var PrivatePagesAuthDecorator = (function(){
    const logoutPath = '/auth/logout';

    var PrivatePagesRedirectDecorator = function(redirectTo){

        if(sessionCookieExist()){
            return <Redirect to={redirectTo}/>
        }
        return <Redirect to={logoutPath} />
    }
    
    var PrivatePagesLinkDecorator=function(linkTo){
    
        if(sessionCookieExist()){
            return linkTo;
        }
        return logoutPath ;
    }
    
   
    //#region Private Methods
    function sessionCookieExist(){
        var sessionCookie = sessionConfig.SessionCookieName();
        var sessionCookieId =  Cookies.get(sessionCookie)
        if(sessionCookieId !== undefined){
            var serverTime = new Date(new Date().getTime() +sessionConfig.getOriginalMaxAge());
            var path = sessionConfig.getPath();
            var isSecure = sessionConfig.getSecure();
            
            Cookies.set(sessionCookie, sessionCookieId, 
            { 
                expires: serverTime, 
                path: path,
                secure: isSecure,          
            })

            return true;
        }
        return false;
    }

    //#endRegion 


    var privatePages ={
        PrivatePagesRedirectDecorator:PrivatePagesRedirectDecorator,
        PrivatePagesLinkDecorator:PrivatePagesLinkDecorator
    }
    
    return privatePages;

})();

export default PrivatePagesAuthDecorator;