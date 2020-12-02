var assert = require('assert');
const { stringify } = require('querystring');
const sortCategoriesForInsert = require('./index');

describe('# Sort Categories For Insert', function () {
  describe('#Example From bitbucket', function () {
    let Test_Input = [{ "name": "Accessories", "id": 1, "parent_id": 20 }, { "name": "Watches", "id": 57, "parent_id": 1 }, { "name": "Men", "id": 20, "parent_id": null }];
    let Expected_Result = [{ "name": "Men", "id": 20, "parent_id": null }, { "name": "Accessories", "id": 1, "parent_id": 20 }, { "name": "Watches", "id": 57, "parent_id": 1 }];
    let result = sortCategoriesForInsert(Test_Input);
    it('Should return the same result as the example', function () {
      assert.deepEqual(result, Expected_Result);
    });
    it('Should match properties Order to work on a stringified comparison', function () {
      let Expected_Stringified = JSON.stringify(Expected_Result);
      let result_Stringified = JSON.stringify(result);
      assert.equal(result_Stringified, Expected_Stringified);
    });
    it('Should have the parent node inserted before current node', function () {
      let Inserted_IDs = [];
      result.forEach(input => {
        //Loop Result Array
        assert.equal((Inserted_IDs.indexOf(input.parent_id) >= 0) || input.parent_id === null, true); //Check if current is root or has parent inserted
        Inserted_IDs.push(input.id);
      })
    });
  });

  describe('#Undefined -> parent_id For Root Objects in Input', function () {
    let Test_Input = [{ "name": "Accessories", "id": 1, "parent_id": 20 }, { "name": "Watches", "id": 57, "parent_id": 1 }, { "name": "Men", "id": 20 }];
    let Expected_Result = [{ "name": "Men", "id": 20, "parent_id": null }, { "name": "Accessories", "id": 1, "parent_id": 20 }, { "name": "Watches", "id": 57, "parent_id": 1 }];
    let result = sortCategoriesForInsert(Test_Input);
    it('Should Create Null parent_id for undefined Cases', function () {
      assert.deepEqual(result, Expected_Result);
    });
    it('Should match properties Order to work on a stringified comparison', function () {
      let Expected_Stringified = JSON.stringify(Expected_Result);
      let result_Stringified = JSON.stringify(result);
      assert.equal(result_Stringified, Expected_Stringified);
    });
    it('Should have the parent node inserted before current node', function () {
      let result = sortCategoriesForInsert(Test_Input);
      let Inserted_IDs = [];
      result.forEach(input => {
        //Loop Result Array
        assert.equal((Inserted_IDs.indexOf(input.parent_id) >= 0) || input.parent_id === null, true); //Check if current is root or has parent inserted
        Inserted_IDs.push(input.id);
      })
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
    let result = sortCategoriesForInsert(Test_Input);
    it('Should have the parent node inserted before current node', function () {
      let Inserted_IDs = [];
      result.forEach(input => {   //Loop Result Array
        assert.equal((Inserted_IDs.indexOf(input.parent_id) >= 0) || input.parent_id === null, true); //Check if current is root or has parent inserted
        Inserted_IDs.push(input.id);
      })
    });
    it('Should not output duplicate nodes', function () {
      let Inserted_IDs = [];
      result.forEach(input => {   //Loop Result Array
        assert.equal((Inserted_IDs.indexOf(input.id) < 0), true); //Check if current is node has been inserted
        Inserted_IDs.push(input.id);
      })
    });
  });

  describe('# Non-Binary Tree Example [Binary Tree]()', function () {
    let Test_Input = shuffle([
      { name: "A", id: 27, parent_id: null },
      { name: "B", id: 14, parent_id: 27 },
      { name: "C", id: 10, parent_id: 14 },
      { name: "D", id: 11, parent_id: 14 },
      { name: "E", id: 35, parent_id: 27 },
      { name: "F", id: 31, parent_id: 35 },
      { name: "G", id: 42, parent_id: 35 },
      { name: "H", id: 101, parent_id: 14 },
      { name: "I", id: 111, parent_id: 42 },
      { name: "J", id: 120, parent_id: 111 },
      { name: "K", id: 130, parent_id: 111 },
      { name: "K", id: 130, parent_id: 111 },
      { name: "L", id: 140, parent_id: 111 }]);
    it('Should Shuffle the Tree Input', function () {
      let non_shuffled_data = [
        { name: "A", id: 27, parent_id: null },
        { name: "B", id: 14, parent_id: 27 },
        { name: "C", id: 10, parent_id: 14 },
        { name: "D", id: 11, parent_id: 14 },
        { name: "E", id: 35, parent_id: 27 },
        { name: "F", id: 31, parent_id: 35 },
        { name: "G", id: 42, parent_id: 35 },
        { name: "H", id: 101, parent_id: 14 },
        { name: "I", id: 111, parent_id: 42 },
        { name: "J", id: 120, parent_id: 111 },
        { name: "K", id: 130, parent_id: 111 },
        { name: "L", id: 140, parent_id: 111 }];
      assert.equal((JSON.stringify(non_shuffled_data) !== JSON.stringify(Test_Input)), true);
    })
    console.log(`Input:\t${JSON.stringify(Test_Input)}`);
    let result = sortCategoriesForInsert(Test_Input);
    it('Should have the parent node inserted before current node', function () {
      let Inserted_IDs = [];
      result.forEach(input => {   //Loop Result Array
        assert.equal((Inserted_IDs.indexOf(input.parent_id) >= 0) || input.parent_id === null, true); //Check if current is root or has parent inserted
        Inserted_IDs.push(input.id);
      })
    });
    it('Should ignore duplicate nodes on Input', function () {
      let Inserted_IDs = [];
      result.forEach(input => {   //Loop Result Array
        assert.equal((Inserted_IDs.indexOf(input.id) < 0), true); //Check if current is node has been inserted
        Inserted_IDs.push(input.id);
      })
    });
  });
  describe('# Multiple Trees BitBucket + non Binary Tree Example [Binary Tree]()', function () {
    let Test_Input = shuffle([
      { "name": "Accessories", "id": 1, "parent_id": 20 },
      { "name": "Watches", "id": 57, "parent_id": 1 },
      { "name": "Men", "id": 20, "parent_id": null },
      { name: "A", id: 27, parent_id: null },
      { name: "B", id: 14, parent_id: 27 },
      { name: "C", id: 10, parent_id: 14 },
      { name: "D", id: 11, parent_id: 14 },
      { name: "E", id: 35, parent_id: 27 },
      { name: "F", id: 31, parent_id: 35 },
      { name: "G", id: 42, parent_id: 35 },
      { name: "H", id: 101, parent_id: 14 },
      { name: "I", id: 111, parent_id: 42 },
      { name: "J", id: 120, parent_id: 111 },
      { name: "K", id: 130, parent_id: 111 },
      { name: "K", id: 130, parent_id: 111 },
      { name: "L", id: 140, parent_id: 111 }]);
    it('Should Shuffle the Tree Input', function () {
      let non_shuffled_data = [
        { name: "A", id: 27, parent_id: null },
        { name: "B", id: 14, parent_id: 27 },
        { name: "C", id: 10, parent_id: 14 },
        { name: "D", id: 11, parent_id: 14 },
        { name: "E", id: 35, parent_id: 27 },
        { name: "F", id: 31, parent_id: 35 },
        { name: "G", id: 42, parent_id: 35 },
        { name: "H", id: 101, parent_id: 14 },
        { name: "I", id: 111, parent_id: 42 },
        { name: "J", id: 120, parent_id: 111 },
        { name: "K", id: 130, parent_id: 111 },
        { name: "L", id: 140, parent_id: 111 }];
      assert.equal((JSON.stringify(non_shuffled_data) !== JSON.stringify(Test_Input)), true);
    })
    console.log(`Input:\t${JSON.stringify(Test_Input)}`);
    let result = sortCategoriesForInsert(Test_Input);
    it('Should have the parent node inserted before current node', function () {
      let Inserted_IDs = [];
      result.forEach(input => {   //Loop Result Array
        assert.equal((Inserted_IDs.indexOf(input.parent_id) >= 0) || input.parent_id === null, true); //Check if current is root or has parent inserted
        Inserted_IDs.push(input.id);
      })
    });
    it('Should ignore duplicate nodes on Input', function () {
      let Inserted_IDs = [];
      result.forEach(input => {   //Loop Result Array
        assert.equal((Inserted_IDs.indexOf(input.id) < 0), true); //Check if current is node has been inserted
        Inserted_IDs.push(input.id);
      })
    });
  });


});


function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}