var Q = require('q');
var jwt = require('jsonwebtoken');
var uuid = require('node-uuid');
var tokenConfig = require('../config.json').tokenConfiguration;

var jwtVerifyAsync = Q.denodeify(jwt.verify);
var jwtIssueAsync = Q.denodeify(jwt.sign);

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
        .then((payload) => { return payload; }, (error) => { return error; });
};

/*
    Checks if the payload contains all scopes required.
*/
exports.checkScopes = function (scopes, payload) {
    if (!scopes) return true;
    if (!payload) return false;

    var scopesGranted = payload.scopes;

    var i;
    for (i = 0; i < scopes.length; i++) {
        if (scopesGranted.indexOf(scopes[i]) < 0) {
            return false;
        }
    }

    return true;
}

/*
    Sign a new token with payload provided.
    Parameter: payload: contains at least {"sub": user id, "scopes": [] permissions to be issued }
               jwtid: the unique identifier of this token, will be generated automatically if not provided
               expiresIn: the expire time of this token, default value will be used if not provided
    Returns: A Promise that contains a string of the encoded token as parameter.
*/
exports.issueTokenAsync = function (payload, jwtid, expiresIn) {
    jwtid = jwtid || uuid.v1(); 
    expiresIn = expiresIn || tokenConfig.defaultAliveTime;

    return jwtIssueAsync(payload,
                        tokenConfig.privateKey,
                        { algorithm: tokenConfig.supportedAlgorithms[0], jwtid: jwtid, expiresIn: expiresIn })
                        .then((token) => {return token; }, (error) => { return error; });
};