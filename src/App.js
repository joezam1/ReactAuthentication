import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './webPages/publicPages/Home.js';
import NotFound from './webPages/publicPages/NotFound.js';
import Login from './webPages/authentication/Login.js';
import Signup from './webPages/authentication/Signup.js';
import Logout from './webPages/authentication/Logout.js';
import Dashboard from './webPages/privatePages/Dashboard.js';
import UserAccount from './webPages/privatePages/UserAccount.js';



function App(){
    return(
        <div>test 
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Home} exact/>
                    <Route path='/auth/login' component={Login} />
                    <Route path='/auth/signup' component={Signup} />
                    <Route path='/auth/logout' component={Logout}/>
                    <Route path='/notfound' component={NotFound}/> 
                    <Route path='/private/dashboard' component={Dashboard}/>
                    <Route path='/private/UserAccount' component={UserAccount}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;