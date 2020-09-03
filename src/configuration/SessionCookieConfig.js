var sessionCookie = (function(){

    const accessTokenName = 'accessToken';
    const refreshTokenName = 'refreshToken';
    const sessionCookieName = 'sessionCookie';
    var sessionId = '';
    var userId = 0;
    var cookie ={
        originalMaxAge :0,
        expires :'',// "2020-08-14T13:13:35.171Z",
        secure: false,
        httpOnly: true,
        path : '',
        sameSite :true,
    }
   

    function setSessionId(inputSessionId){
        sessionId = inputSessionId;
    }
    function setUserId(inputUserId){
        userId = inputUserId;
    }
    function setOriginalMaxAge(inputMaxAge){ 
        cookie.originalMaxAge = inputMaxAge; 
    }
    function setExpires(inputExpires){ 
        cookie.expires = inputExpires; 
    }
    function setSecure(inputSecure){  
        cookie.secure = inputSecure;
    }
    function setHttpOnly(inputHttpOnly){
        cookie.httpOnly = inputHttpOnly;
    }
    function setPath(inputPath){ 
        cookie.path = inputPath;
    }
    function setSameSite(inputSameSite){ 
        cookie.sameSite = inputSameSite; 
    }

    function getSessionId(){return sessionId;}
    function getUserId(){return userId;}
    function getOriginalMaxAge(){ return cookie.originalMaxAge ;}
    function getExpires(){ return cookie.expires;}
    function getSecure(){ return cookie.secure;}
    function getHttpOnly(){return cookie.httpOnly; }
    function getPath(){ return cookie.path; }
    function getSameSite(){ return cookie.sameSite; }
    function AccessTokenName(){return accessTokenName;}
    function RefreshTokenName(){return refreshTokenName;}
    function SessionCookieName(){return sessionCookieName;}

    return{
        setSessionId:setSessionId,
        setUserId:setUserId,
        setOriginalMaxAge:setOriginalMaxAge,
        setExpires:setExpires,
        setSecure:setSecure,
        setHttpOnly:setHttpOnly,
        setPath:setPath,
        setSameSite:setSameSite,

        getSessionId:getSessionId,
        getUserId:getUserId,
        getOriginalMaxAge:getOriginalMaxAge,
        getExpires:getExpires,
        getSecure:getSecure,
        getHttpOnly:getHttpOnly,
        getPath:getPath,
        getSameSite:getSameSite,

        AccessTokenName:AccessTokenName,
        RefreshTokenName:RefreshTokenName,
        SessionCookieName:SessionCookieName,
    }
    
})();

export default sessionCookie;