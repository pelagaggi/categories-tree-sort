var properJsonOutput = [], IndexedNodes = [],trees=[];

class Node {
    constructor(id){
        this.id=id;
        this.children =[];
    }
}

function OrderNodes(inputs){
    inputs.forEach(input=>{
        IndexedNodes[input.id]= Object.assign(new Node(input.id),input,IndexedNodes[input.id]);                     // Initialize Current Node and assign input {id,name,parent_id}
        IndexedNodes[input.parent_id] = Object.assign(new Node(input.parent_id), IndexedNodes[input.parent_id],);   // Initialize Parent in case its not initialized
        if(typeof input.parent_id !== typeof 0){
            trees.push(IndexedNodes[input.id]);
        }else{
            IndexedNodes[input.parent_id].children.push(IndexedNodes[input.id]);
        }
    })
}

function Print(node){
    let {name,id,parent_id} = node;
    properJsonOutput.push({name,id,parent_id:parent_id||null});
    node.children.forEach(child=>Print(child));
}
module.exports = function sortCategoriesForInsert(inputJson){
    properJsonOutput = [], IndexedNodes =[], trees=[];
    OrderNodes(inputJson);
    trees.forEach(rootItem=>{
        Print(rootItem);
    })
  // Your code happens...
  ///   ... which calculates properJsonOutput
  return properJsonOutput;
}