var Q = require('q');
var jwt = require('jsonwebtoken');
var tokenConfig = require('../config.json').tokenConfiguration;

var jwtVerifyAsync = Q.denodeify(jwt.verify);

/*
    Checks whether the token provided is valid.
    If so, returns the decoded payload in Promise.
*/
exports.verifyTokenAsync = function (token) {
    // Checks if the client only provided the supported algorithms to enhance security,
    //    see  https://auth0.com/blog/2015/03/31/critical-vulnerabilities-in-json-web-token-libraries/
    
    return jwtVerifyAsync(token,
        tokenConfig.privateKey,
        { algorithms: tokenConfig.supportedAlgorithms })
        .then(function (payload) {
            return payload;
        }, function (error) {
            console.log(error);
            return error;
        });
};

/*
    Checks if the payload contains all 
*/
exports.checkScopes = function (scopes, payload) {

}

exports.issueToken = function () {

};