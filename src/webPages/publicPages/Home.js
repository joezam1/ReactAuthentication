import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import httpMethods from '../../httpRequests/Methods.js';
import serverConfig from '../../configuration/ServerConfig.js';
import inputCommon from '../../library/InputCommon.js';
const url = serverConfig.url;




export default function Home(){

    const [serverResponse, setServerResponse] = useState();

    function setServerResponseCallback(response){
        var message = 'not Connected'
        if(inputCommon.isValid(response)){ 
            message = response.message;
        }
        setServerResponse(message);
    }


    useEffect(() => {
        console.log(`Component mounted`)
        httpMethods.getMethod(url,setServerResponseCallback)
      }, []);
    

    return(
        <div>

            <p>Home - public page</p>
             <p>Connection Established: {serverResponse}</p>
            <ul>
                <li><Link to='/auth/login'>Login</Link></li>
                <li><Link to='/auth/signup'>Signup</Link></li>
            </ul>
        </div>
    )
}