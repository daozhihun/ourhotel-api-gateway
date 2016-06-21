var authProvider = require('../business_logic/auth_provider');

module.exports = function (req, res, next) {
    var authHeader = req.headers.authorization;

    if (authHeader) {
        var authArray = authHeader.split(' ');
        if (authArray[0] === 'Bearer') {
            req.token = authArray[1];
        }
    }

    next();
};