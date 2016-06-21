var authChecker = require('../middlewares/auth_checker');
var auth = require('./auth');

module.exports = function (app) {

    app.get('/auth/decode/:token', authChecker([]), auth.decodeToken);
    app.get('/auth/obtainSampleToken', authChecker([]), auth.obtainSampleToken);

}
