'use strict'

import Logger from '../modules/data.recording/Logger.js';
import inputCommon from '../library/InputCommon.js';
import SessionCookieConfig from '../configuration/SessionCookieConfig.js';
import Cookies from 'js-cookie';


var getMethod = function(url, responseCallback, selectedHeaders = null) {
    var defaultHeaders = getAuthorizationHeaders();
    if (selectedHeaders !== null) {
        defaultHeaders = selectedHeaders;
    }

    fetch(url, {
        method: 'GET',
        headers: defaultHeaders
    }).then(function(response) {
        Logger.resolveLog(response);
        return response.text();
    }).then(function(result) {
        Logger.resolveLog(result);
        var resultInfo = parseHttpResponse(result)
        resolveParsedHttpResponse(resultInfo, responseCallback);
       
    }).catch(function(error) {
        console.log(Error("PromiseError: " + error))
    });
}

var postMethod = function(url, modelPayload, responseCallback, selectedHeaders = null) {
    var defaultHeaders = getAuthorizationHeaders();
    if (selectedHeaders !== null) {
        defaultHeaders = selectedHeaders
    }

    fetch(url, {
        method: 'POST',
        headers: defaultHeaders,
        body: modelPayload
    }).then(function(response) {
        return response.text();
    }).then(function(result) {
        Logger.resolveLog(result);
        var resultInfo = parseHttpResponse(result)
        resolveParsedHttpResponse(resultInfo, responseCallback);
    }).catch(function(error) {
        console.log(Error("PromiseError: " + error))
    });

}



var httpMethods = {
    getMethod: getMethod,
    postMethod: postMethod
}
export default httpMethods;

//# region Private Methods
function setAccessTokenReplacement(accessTokenReplacement) {
    var accessTokenName = SessionCookieConfig.AccessTokenName();
    Cookies.set(accessTokenName, accessTokenReplacement);
}

function getAuthorizationHeaders() {
    Logger.resolveLog('function SessionCookieConfig', SessionCookieConfig)
    var sessionId = SessionCookieConfig.getSessionId();
    var accessTokenName = SessionCookieConfig.AccessTokenName();
    var refreshTokenName = SessionCookieConfig.RefreshTokenName();
    var sessionCookieName = SessionCookieConfig.SessionCookieName();


    var accessToken = Cookies.get(accessTokenName);
    var refreshToken = Cookies.get(refreshTokenName);
    var sessionCookieId = Cookies.get(sessionCookieName);
    var userSessionId = (sessionId === '') ? sessionCookieId : sessionId;
    var bearer = 'Bearer ' + accessToken;
    var authorizationHeaders = new Headers({
        'Accept': 'application/json',
        'Authorization': bearer,
        'Content-Type': 'application/json',
        'Refresh_token': refreshToken,
        'Session_id': userSessionId,
    });
    return authorizationHeaders;
}

function parseHttpResponse(value) {
    if (inputCommon.isValidJson(value)) {
        var promiseResult = JSON.parse(value);
        return promiseResult;
    }
    return value;
}

function resolveParsedHttpResponse(parsedResponse, responseInfoCallback) {
    if (inputCommon.isValid(parsedResponse.redirectTo)) {
        var protocol = window.location.protocol;
        var host = window.location.host
        var pathName = window.location.pathname;
        var search = window.location.search
        var referrerUrl = protocol  + "//" + host + "/" + pathName + search
        var urlRedirect = protocol  + "//" + host + parsedResponse.redirectTo;
        window.location.href =urlRedirect;
        return;
    }
    if (parsedResponse.accessTokenReplaced) {
        setAccessTokenReplacement(parsedResponse.replacementToken);
    }

    responseInfoCallback(parsedResponse);
}

//#endRegion Private Methods