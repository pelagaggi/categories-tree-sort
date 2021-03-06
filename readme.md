# Sort Categories For Insert

This repository is a solution for [This Coding Challenge](https://bitbucket.org/snippets/dbuy/rnB4an)

## Problem Analysis

The assignment specify an unsorted input array of Nodes which must be resorted in order to assure that a parent Node will be processed before its children.

For Example: Given the following Input
```JavaScript
[
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
]
```

The Following Tree Will be processed to generate the sorted output
![Example_Tree](/images/Original_Example_tree.png)

* The solution Assumed either the input of Stringified JSON object or a JSON object itself.
* The Output is a JSON String as per Request 

## Big O Analysis
The Solution consists of two non nested loops Sorting + Printing
The Printing consists of a Pre-order tree Traversal
```
O(n)+O(n) = O(n)
```

Using the measured time of execution for different input arrays size it was possible to confirm the analysis.
![GitHub Logo](/images/BIG_O_Analysis.png)

## Test Cases (MOCHA)
### By Running yarn test we visit the following test cases.
![GitHub Logo](/images/Mocha.png)

### Beside the Original Provided example The following cases have been tested:
* ### Missing parent_id property case
* ### Binary Tree
![Binary Tree](images/binary_tree.png)
* ### Non-Binary Tree
![Non-Binary Tree](images/non_binary_tree.png)
* ### Multiple Trees BitBucket + non Binary Tree
* ### Tens of thousands Random Trees input

## Notes

* The solutions used TDD approach
* Git Branches do not make sense for the scope of the exercise

* Please note that no effort has been made to optimize the following Validation:
```JavaScript
it('Should have the parent node inserted before current node ( a child category cannot be inserted before its parent category)', function () {
      let Inserted_IDs = [];
      result.forEach(input => {   //Loop Result Array
        assert.equal((Inserted_IDs.indexOf(input.parent_id) >= 0) || input.parent_id === null, true); //Check if current is root or has parent inserted
        Inserted_IDs.push(input.id);
      })
    });
```
* Fo more details about the executed tests please visit the [Tests File](https://github.com/pelagaggi/categories-tree-sort/blob/master/test.js)

## References Used

### YouTube refreshment for Tree Structures  ¯\\\__(ツ)\__/¯

* [Data Structures: Trees](https://www.youtube.com/watch?v=oSWTXtMglKE&ab_channel=HackerRank)
* [Pre-order tree Traversal](https://www.youtube.com/watch?v=1WxLM2hwL-U&ab_channel=MichaelSambol)

### Other References
* [data_structures_algorithms](https://www.tutorialspoint.com/data_structures_algorithms/tree_data_structure.htm)
![data_structures_algorithms](https://www.tutorialspoint.com/data_structures_algorithms/images/binary_tree.jpg)


[Pre-order,Post-order and In-order Traversal](https://www.youtube.com/watch?v=WLvU5EQVZqY&ab_channel=TECHDOSE)
