var properJsonOutput = [], IndexedNodes = [],Trees=[];

class Node {
    constructor(id){
        this.id=id;
        this.children =[];
    }
}

function OrderNodes(inputs){
    //  Loop one time through the input Array Creating a indexed list of double linked Nodes
    //  The output of this Function will provide Nodes with pointers to its parents and also pointers to its children
    for (var x=0; x < inputs.length; x++ ){
        let input = inputs[x];          //  Looping Variable for better code readability
    
        if(IndexedNodes[input.id]!==undefined && IndexedNodes[input.id].name!==undefined){continue;}                //  Skip this entry as it is duplicated

        IndexedNodes[input.id]= Object.assign(new Node(input.id),input,IndexedNodes[input.id]);                     //  Initialize Current Node and assign input {id,name,parent_id}
        
        IndexedNodes[input.parent_id] = Object.assign(new Node(input.parent_id), IndexedNodes[input.parent_id],);   //  Initialize Parent in case its not initialized
        
        if(typeof input.parent_id !== typeof 0){    //  If non numerical id as parent_id (null or Undefined)
            Trees.push(IndexedNodes[input.id]);     //  Add to list of Trees as Another Root
        }else{
            IndexedNodes[input.parent_id].children.push(IndexedNodes[input.id]);    //  Not a Root So add this node to its parent List of Children
        }
    }
}

function Print(node){
    let {name,id,parent_id} = node;
    properJsonOutput.push({name,id,parent_id:parent_id||null});
    
    for (var x=0; x < node.children.length; x++ ){        // Considering non-binary Trees 0<= Children number <= n
        Print(node.children[x]);
    }
    //  For Binary Trees the loop would be unnecessary
    //  Recursion(Right_Child);
    //  Recursion(Left__Child);
}
module.exports = function sortCategoriesForInsert(inputJson){
    properJsonOutput = [], IndexedNodes =[], Trees=[];
    
    //The test Description state that the input of the Function Will be an Object But also says that will be a String
    if (typeof inputJson === typeof "String"){  //Identifying whether Parsing Input From String is necessary
        inputJson = JSON.parse(inputJson)
    }

    OrderNodes(inputJson);  // Create Tree Indexation From Parsed Input String
    Trees.forEach(rootItem=>{
        Print(rootItem);
    })
  return JSON.stringify(properJsonOutput);
}