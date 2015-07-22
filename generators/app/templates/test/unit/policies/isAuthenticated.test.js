var assert = require('assert');
var isUser = require('../../../api/policies/isAuthenticated');

var token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiaWF0IjoxNDM3NTUwMzUzLCJleHAiOjE0Mzc2MzY3NT" +
  "N9.KOfavilhu40_jDH786hcoUfonXin74pZwh2Qh9YvPErp-w7G11rddFxL0v1s3FwTZWnG_ZRmD0HKUHgoKTQ2CA";
var tokenFail = token + '3';

var req = {
  headers: {
    authorization: token
  }
};

var _fn = function (res, cb) {
  return function () {
    assert(res);
    if (cb) cb();
  }
};
var _resFn = function (res, cb) {
  return {
    serverError: _fn(res, cb),
    unauthorized: _fn(res, cb)
  }
};

describe("policies:isUser", function () {
  it("should call next() callback", function (done) {
    isUser(req, _resFn.call(this, false), _fn(true, done));
  });

  it("shouldn't call next() callback", function (done) {
    req.headers.authorization = tokenFail;

    isUser(req, _resFn.call(this, true, done), _fn(false));
  });
});
