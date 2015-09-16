/**
 * AuthController
 * @description :: Server-side logic for manage user's authorization
 */

var _ = require('lodash');
var passport = require('passport');

module.exports = {
  /**
   * Sign in by email\password
   */
  signin: function (req, res) {
    passport.authenticate('local', _.partial(sails.config.passport.onPassportAuth, req, res))(req, res);
  },

  /**
   * Sign up by email\password
   */
  signup: function (req, res) {
    var values = _.omit(req.allParams(), 'id');

    User
      .create(values)
      .then(function (user) {
        return {
          token: CipherService.jwt.encodeSync({id: user.id}),
          user: user
        };
      })
      .then(res.created)
      .catch(res.negotiate);
  },

  /**
   * Authorization via social networks
   */
  social: function (req, res) {
    var type = req.param('type') ? req.param('type').toLowerCase() : '-';
    var strategyName = [type, 'token'].join('-');

    if (Object.keys(passport._strategies).indexOf(strategyName) === -1) {
      return res.badRequest(null, {message: [type, ' is not supported'].join('')});
    }

    passport.authenticate('jwt', function (error, user, info) {
      req.user = user;
      passport.authenticate(strategyName, _.partial(sails.config.passport.onPassportAuth, req, res))(req, res);
    })(req, res);
  },

  /**
   * Accept JSON Web Token and updates with new one
   */
  refresh_token: function (req, res) {
    if (!req.param('token')) return res.badRequest(null, {message: 'You must provide token parameter'});

    var oldDecoded = CipherService.jwt.decodeSync(req.param('token'));

    res.ok({
      token: CipherService.jwt.encodeSync({id: oldDecoded.id})
    });
  }
};