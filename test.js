var assert = require('assert');
const { stringify } = require('querystring');
const sortCategoriesForInsert = require('./index');

describe('# Sort Categories For Insert', function () {
  describe('#Example From bitbucket', function () {
    let Test_Input = [{ "name": "Accessories", "id": 1, "parent_id": 20 }, { "name": "Watches", "id": 57, "parent_id": 1 }, { "name": "Men", "id": 20, "parent_id": null }];
    let Expected_Result = [{ "name": "Men", "id": 20, "parent_id": null }, { "name": "Accessories", "id": 1, "parent_id": 20 }, { "name": "Watches", "id": 57, "parent_id": 1 }];
    it('Should return the same result as the example', function () {
      let result = sortCategoriesForInsert(Test_Input);
      assert.deepEqual(result,Expected_Result);
    });
    it('Should match properties Order to work on a stringified comparison', function () {
      let result_Stringified = JSON.stringify(sortCategoriesForInsert(Test_Input));
      let Expected_Stringified = JSON.stringify(Expected_Result);
      assert.equal(result_Stringified,Expected_Stringified);
    });
  });

  describe('#Undefined -> parent_id For Root Objects in Input', function () {
    let Test_Input = [{ "name": "Accessories", "id": 1, "parent_id": 20 }, { "name": "Watches", "id": 57, "parent_id": 1 }, { "name": "Men", "id": 20 }];
    let Expected_Result = [{ "name": "Men", "id": 20, "parent_id": null }, { "name": "Accessories", "id": 1, "parent_id": 20 }, { "name": "Watches", "id": 57, "parent_id": 1 }];
    it('Should Create Null parent_id for undefined Cases', function () {
      let result = sortCategoriesForInsert(Test_Input);
      assert.deepEqual(result,Expected_Result);
    });
    it('Should match properties Order to work on a stringified comparison', function () {
      let result_Stringified = JSON.stringify(sortCategoriesForInsert(Test_Input));
      let Expected_Stringified = JSON.stringify(Expected_Result);
      assert.equal(result_Stringified,Expected_Stringified);
    });
  });
  describe('# BinaryTree Example [Binary Tree](https://www.tutorialspoint.com/data_structures_algorithms/images/binary_search_tree.jpg)', function () {
    let Test_Input = [
      { name: "D", id: 11, parent_id: 14 },
      { name: "B", id: 14, parent_id: 27 },
      { name: "F", id: 31, parent_id: 35 },
      { name: "C", id: 10, parent_id: 14 },
      { name: "G", id: 42, parent_id: 35 },
      { name: "E", id: 35, parent_id: 27 },
      { name: "A", id: 27, parent_id: null }
    ];
    let Expected_Result = [
      { name: "A",id: 27, parent_id: null },
      { name: "B",id: 14, parent_id: 27 },
      { name: "C",id: 10, parent_id: 14 },
      { name: "D",id: 11, parent_id: 14 },
      { name: "E",id: 35, parent_id: 27 },
      { name: "F",id: 31, parent_id: 35 },
      { name: "G",id: 42, parent_id: 35 }];
    it('Should return the Expected_Result', function () {
      let result = sortCategoriesForInsert(Test_Input);
      assert.deepEqual(result,Expected_Result);
    });
    it('Should match properties Order to work on a stringified comparison', function () {
      let result_Stringified = JSON.stringify(sortCategoriesForInsert(Test_Input));
      let Expected_Stringified = JSON.stringify(Expected_Result);
      assert.equal(result_Stringified,Expected_Stringified);
    });
  });
});