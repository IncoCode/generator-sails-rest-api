var assert = require('assert');
var plainText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...';
var encodedText = 'eyJhbGciOiJIUzUxMiJ9.TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwg' +
  'c2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlLi4u.BI4zHStPx2aK9dGCvRKH-Gsb0cbVgp1uRPo1GCYwXgEdEZcN7OTd' +
  '77XBDZeVbBysBTuOWUPv4iKguEh0Mopi1g';
var jwt = require('../../../api/services/CipherService.js');

describe("services:CipherService", function () {
  describe("JWT", function () {
    it("should encode text in async mode", function (done) {
      jwt
        .encode(plainText)
        .then(function (eText) {
          assert.equal(eText, encodedText);
        })
        .then(done)
        .catch(done)
    });

    it("should encode text in sync mode", function (done) {
      assert(jwt.encodeSync(plainText) === encodedText);

      done();
    });

    it("should decode text in async mode", function (done) {
      jwt
        .decode(encodedText)
        .then(function (pText) {
          assert.equal(pText, plainText);
        })
        .then(done)
        .catch(done)
    });

    it("should decode text in sync mode", function (done) {
      assert(jwt.decodeSync(encodedText) === plainText);

      done();
    });

  });
});
