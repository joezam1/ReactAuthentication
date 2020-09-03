var isValid = function(input) {
    var result = (input !== null && input !== undefined)
    return result;
}

var isValidJson = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var methods = {
    isValid: isValid,
    isValidJson:isValidJson
}

module.exports = methods;