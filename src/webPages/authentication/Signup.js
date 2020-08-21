import React, {useState} from 'react';
import {Link, Redirect } from 'react-router-dom';
import ServerConfig from '../../configuration/ServerConfig.js';
import HttpMethods from '../../httpRequests/Methods.js';


export default function Signup(){
    const [isRegistered, setRegistered] = useState(false);
    const [messageInfo, setResponse] = useState('');
    var url = ServerConfig.url;
    
    function setServerResponseCallback(response){
        if(response.status === 'OK'){
            var notificationSuccess = response.message + ' You can now Login '
            setResponse(notificationSuccess);
            setTimeout(function(){ setRegistered(true); }, 5000);
        }
        else if(response.status === 'UNAUTHORIZED'){
            setResponse(response.message);
        }
        else if(response.status ==='BAD REQUEST')
        {
            setResponse("Error: Registration failed "+ response.result);
        }
    }

    function httpRegisterUser(){
        var form = document.getElementById('signupForm');
        var username = form[0].value;
        var email = form[1].value;
        var password = form[2].value;
        var repeatPassword = form[3].value;
        var roles = ['user'];

        var model ={
            username:username,
            email:email,
            password:password,
            repeatPassword:repeatPassword,
            roles:roles,
        }
        var modelStringifyJson = JSON.stringify( model) 
        var registerPath = '/api/register';
        var registerUrl = url+registerPath; //'http://localhost:5000/api/register'
        if(form !=null){
            HttpMethods.postMethod(registerUrl,modelStringifyJson,setServerResponseCallback);            
        }
    }

    if (isRegistered) {
        return <Redirect to='/auth/login' />
     }
 

    return( <div>
        <h3>Signup</h3>
        <p>{messageInfo}</p>  
        <fieldset>
            <form action="/api/register" method="post" id='signupForm' className="formSignup">
                <legend>Insert here:</legend>
                <input type='text' name='name' placeholder='type your username'/>
                <input type='email' name='email' placeholder='type your email'/>
                <input type='password' name='password' placeholder='type your password'/>
                <input type='password' name='password' placeholder='type again your password'/>
                <button type='button' name='button' value='Submit' onClick={()=>{httpRegisterUser()}}>Submit</button>
            </form>
        </fieldset>
        
        <p>Already have an account? Go to  </p>
        <Link to='/auth/login'> Login</Link>
    </div>)
}
