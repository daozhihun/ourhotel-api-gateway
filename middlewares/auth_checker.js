var authProvider = require('../business_logic/auth_provider');

/*
    This middleware is used to check whether user has permissions to locate specify scopes.
    Parameter: scope: the scopes required. If no scopes provided, the authorization header is not required.
                      Otherwise we will check if the token presents all the scopes required.
*/

module.exports = function (scopes) {
    return function (req, res, next) {
        if (!scopes || scopes.length == 0) {
            return next();
        }
        
        var token;
        if (req.headers.authorization) {
            var authArray = req.headers.authorization.split(' ');
            if (authArray[0] === 'Bearer') {
                token = authArray[1];
            }
        }

        if (!token) {
            return res.status(401)
                      .send('未授权：您必须登录后才能访问此页面。');
        } else {
            authProvider.verifyTokenAsync(token)
                .then((payload) => {
                    if (authProvider.checkScopes(scopes, payload)) {
                        return next();
                    } else {
                        return res.status(403)
                                  .send('您没有执行此操作的权限。');
                    }
                })
                .fail((error) => {
                    return res.status(400)
                              .send('提交的认证信息无效。');
                });
        }
    };
};