import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import httpMethods from '../../httpRequests/Methods.js';
import serverConfig from '../../configuration/ServerConfig.js';
import privatePagesAuth from '../../mediatorLayer/PrivatePagesAuthDecorator.js';
import sessionConfig from '../../configuration/SessionCookieConfig.js';

const url = serverConfig.url;

export default function Login(){
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [messageInfo, setResponse] = useState('');
    

    function setServerResponseCallback(response){
        if(response.status === 'OK'){
           
            setCookies(response);
            setSessionConfiguration(response);
            setLoggedIn(true);
        }
        else if(response.status === 'UNAUTHORIZED'){
            setResponse(response.message);
        }
        else{
            setResponse("Error: login invalid");
        }
    }

    function setCookies(response){
        var userToken = sessionConfig.UserTokenName();
        var refreshToken = sessionConfig.RefreshTokenName();
        var homePath = { path: '/' };
        Cookies.set(userToken, response.accessToken,homePath);
        Cookies.set(refreshToken, response.refreshToken,homePath);
        var sessionCookie = sessionConfig.SessionCookieName();
        var serverTime = new Date(new Date().getTime() + response.sessionInfo.cookie.originalMaxAge);
        Cookies.set(sessionCookie, response.sessionID, { 
            expires: serverTime, 
            path: response.sessionInfo.cookie.path,
            secure: response.sessionInfo.cookie.secure,          
        });
    }

    function setSessionConfiguration(response){
        sessionConfig.setSessionId(response.sessionID);
        sessionConfig.setUserId(response.sessionInfo.userId)
        sessionConfig.setOriginalMaxAge(response.sessionInfo.cookie.originalMaxAge);
        sessionConfig.setPath(response.sessionInfo.cookie.path);
        sessionConfig.setSecure(response.sessionInfo.cookie.secure);
    }

    function httpLoginUser(){
        var form = document.getElementById('loginForm');
        var email = form[0].value;
        var password = form[1].value;

        var model ={
            email:email,
            password:password
        }
        var modelStringifyJson = JSON.stringify( model) 
        var loginPath = '/api/login';
        var loginUrl = url+loginPath; //'http://localhost:5000/api/login'
        if(form !=null){
            httpMethods.postMethod(loginUrl,modelStringifyJson,setServerResponseCallback);            
        }
    }

    if (isLoggedIn) {
       var redirect = privatePagesAuth.PrivatePagesRedirectDecorator("/private/dashboard" )
        return redirect;
    }

    return(
        <div><h3>Login</h3>
           <p>{messageInfo}</p>
           <fieldset>
                <form action="/api/login" method="post" id='loginForm' className="formLogin">                
                    <legend>Insert here:</legend>
                    <input type='email' name='email' placeholder='type your email'/>
                    <input type='password' name='password' placeholder='type your password'/>
                    <button type='button' name='button' value='Submit' onClick={()=>{httpLoginUser()}}>Submit</button>
            
                </form>
            </fieldset>
                <p>Don't have an account? Go to</p>
            <Link to='/auth/signup'>Signup </Link>
        </div>
    )
}