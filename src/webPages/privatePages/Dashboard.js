import React from 'react';
import {Link} from 'react-router-dom';
import privateAuth from '../../mediatorLayer/PrivatePagesAuthDecorator.js';


export default function Dashboard(){
    return(<div>
        <p>This is Main Dashboard - private page</p>
        <Link to={privateAuth.PrivatePagesLinkDecorator('/private/useraccount')} >User Account</Link>
        <Link to='/auth/logout'> Logout</Link>
    </div>)
}