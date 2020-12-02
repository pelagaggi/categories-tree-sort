var result = [], orderedNodes = [],roots=[];

class Node {
    constructor(id){
        this.id=id;
        this.childreen =[];
    }
}

function OrderNodes(inputs){
    inputs.forEach(input=>{
        orderedNodes[input.id]= Object.assign(new Node(input.id), input,orderedNodes[input.id]);                    // Initialize Current Node and assign input {id,name,parent_id}
        orderedNodes[input.parent_id] = Object.assign(new Node(input.parent_id), orderedNodes[input.parent_id]);    // Initialize Parent in case its not initialized
        if(input.parent_id===null){
            roots.push(orderedNodes[input.id]);
        }else{
            orderedNodes[input.parent_id].childreen.push(orderedNodes[input.id]);
        }
    })
}

function Print(node){
    let {name,id,parent_id} = node;
    result.push({name,id,parent_id});
    node.childreen.forEach(child=>Print(child));
}
module.exports = function sortCategoriesForInsert(inputJson){
    result = [], orderedNodes =[], roots=[];
    OrderNodes(inputJson);
    roots.forEach(rootItem=>{
        Print(rootItem);
    })
  // Your code happens...
  ///   ... which calculates properJsonOutput
  return result;
}