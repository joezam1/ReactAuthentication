import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import pagesAuth from '../../mediatorLayer/PrivatePagesAuthDecorator.js';
import SessionCookieConfig from '../../configuration/SessionCookieConfig.js';
import ServerConfig from '../../configuration/ServerConfig.js';
import HttpMethods from '../../httpRequests/Methods.js';


export default function UserAccount(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [messageInfo, setResponse] = useState('');
    const url = ServerConfig.url;

    useEffect(function(){
        httpGetSingleUser();
    },[]);

    function setServerResponseCallback(response){
        console.log('response',response);
        if(response.status === 'OK'){
            var objArray = response.result;
            if(objArray.length > 0 ){
                for(var a=0; a<objArray.length; a++){
                    for(var key in objArray[a]){
                        if(objArray[a].hasOwnProperty(key)){
                            if(key ==='username'){
                                setUsername(objArray[a][key])
                            }
                            if(key ==='email'){
                                setEmail(objArray[a][key])
                            }
                        }
                    }
                }
            }
        }
        else{
            setResponse(response.message);
        }
    }

    function httpGetSingleUser(){
        var userId = SessionCookieConfig.getUserId();
        var usersPath = '/api/user';
        var idPath = '?userId='+userId;
        var singleUserUrl = url+usersPath+idPath; //'http://localhost:5000/api/user?userId=3''
        HttpMethods.getMethod(singleUserUrl,setServerResponseCallback);            
        
    }

    return(
        <div>Hello:
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>This is the user account section</p>
            <div><p>{messageInfo}</p></div>
            <Link to={pagesAuth.PrivatePagesLinkDecorator('/private/dashboard')}>Dashboard</Link>
        </div>
    )
}