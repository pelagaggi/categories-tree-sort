var assert = require('assert');
const { stringify } = require('querystring');
const sortCategoriesForInsert = require('./index');

describe('Sort Categories For Insert', function () {
  describe('#Example From bitbucket', function () {
    let Test_Input = [{ "name": "Men", "id": 20, "parent_id": null }, { "name": "Accessories", "id": 1, "parent_id": 20 }, { "name": "Watches", "id": 57, "parent_id": 1 }];
    let Expected_Result = [{ "name": "Men", "id": 20, "parent_id": null }, { "name": "Accessories", "id": 1, "parent_id": 20 }, { "name": "Watches", "id": 57, "parent_id": 1 }];
    it('should return the same result as the example', function () {
      let result = sortCategoriesForInsert(Test_Input);
      assert.deepEqual(Expected_Result, result);
    });
    it('Should work on a stringified comparison', function () {
      let result_Stringified = JSON.stringify(sortCategoriesForInsert(Test_Input));
      let Expected_Stringified = JSON.stringify(Expected_Result);
      assert.equal(Expected_Stringified, result_Stringified);
    });
  });
});