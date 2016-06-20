var express = require('express');
var router = express.Router();
var redisClient = require('redis').createClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
  Attempt to use third party credentials log in system, returns a JWT object if succeed.
  Request: 
    JSON object: { "platform": the enum of the third party <1>, "union_id": the union_id provided by the third party system,
                   (Optional) "token": the token provided by the third party system, "refresh_token": refresh token, "expiresIn", the expire time of the token }
    <1> one of the following: "wx", "qq", "alipay"
  Response:
    A JWT object access token.
    In payload: { "sub": UID in our system, "name": user name, "roles": array of all roles granted to the user, "exp": token expiration date }
*/
router.get('/auth/login/thirdparty', function(req, res, next) {

});

/*
  Attempt to credentials log in system, returns a JWT object if succeed.
  Request: 
    JSON object: { "user_name": user name in the system, "password_md5": the hash value of the password }
  Response:
    A JWT object access token.
    In payload: { "sub": UID in our system, "name": user name, "roles": array of all roles granted to the user, "exp": token expiration date }
*/
router.get('/auth/login', function(req, res, next) {

});

/*
  Notify the server to revoke the JWT token issued. Usually a logout operation.
  Request: 
    JWT object.
  Response:
    Status code 200 or 403.
*/
router.get('/auth/logout', function(req, res, next) {

});



module.exports = router;
