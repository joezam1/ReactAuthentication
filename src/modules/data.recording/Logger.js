import Enumerations from '../../library/Enumerators.js'
import ServerConfig from '../../configuration/ServerConfig.js';


const resolveLog = function (input){
    if(ServerConfig.ACTIVE_ENV === Enumerations.Environments.DEVELOPMENT){
        console.log(input);
    }
}

var service = {
    resolveLog: resolveLog,
}

export default service

