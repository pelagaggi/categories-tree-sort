var assert = require('assert');
const sortCategoriesForInsert = require('./index');

describe('Sort Categories For Insert', function() {
  describe('#Example From bitbucket', function() {
    it('should return the same result as the example', function() {
        let test = [
            {
              "name": "Accessories",
              "id": 1,
              "parent_id": 20,
            },
            {
              "name": "Watches",
              "id": 57,
              "parent_id": 1
            },
            {
              "name": "Men",
              "id": 20,
              "parent_id": null,
            }
          ];
          let result = sortCategoriesForInsert(test);
          let expected = JSON.stringify([
            {
              "name": "Men",
              "id": 20,
              "parent_id": null
            },
            {
              "name": "Accessories",
              "id": 1,
              "parent_id": 20
            },
            {
              "name": "Watches",
              "id": 57,
              "parent_id": 1
            }
          ])

      assert.equal(expected,result);
    });
  });
});