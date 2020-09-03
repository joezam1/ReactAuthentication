import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import sessionConfig from '../configuration/SessionCookieConfig.js';
import inputCommon from '../library/InputCommon.js';


var PrivatePagesAuthDecorator = (function() {
    const logoutPath = '/auth/logout';

    var PrivatePagesRedirectDecorator = function(redirectTo) {
        if (sessionCookieExist()) {
            return <Redirect to = { redirectTo }/>
        }
        return <Redirect to = { logoutPath }/>
    }

    var PrivatePagesLinkDecorator = function(linkTo) {
        if (sessionCookieExist()) {
            return linkTo;
        }
        return logoutPath;
    }

    //#region Private Methods
    function sessionCookieExist() {
        var sessionCookie = sessionConfig.SessionCookieName();
        var sessionCookieId = Cookies.get(sessionCookie)
        if (inputCommon.isValid(sessionCookieId)) {
            updateSessionCookieExpiryTime(sessionCookie, sessionCookieId);
            return true;
        }
        return false;
    }

    function updateSessionCookieExpiryTime(selectedSessionCookieName, selectedSessionCookieId) {
        var serverTime = new Date(new Date().getTime() + sessionConfig.getOriginalMaxAge());
        var path = sessionConfig.getPath();
        var isSecure = sessionConfig.getSecure();

        Cookies.set(selectedSessionCookieName, selectedSessionCookieId, {
            expires: serverTime,
            path: path,
            secure: isSecure,
        })
    }
    //#endRegion 

    var privatePages = {
        PrivatePagesRedirectDecorator: PrivatePagesRedirectDecorator,
        PrivatePagesLinkDecorator: PrivatePagesLinkDecorator
    }
    return privatePages;

})();

export default PrivatePagesAuthDecorator;