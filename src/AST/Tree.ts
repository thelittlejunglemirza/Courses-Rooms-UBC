

import {ASTNode} from "./ASTNode";

export class Tree{
    public root: ASTNode;
    constructor (root: ASTNode){
        this.root = root;
    }

    // make consequent calls to evaluate leaf and evaluate node
    static traverseHelper(node: ASTNode, line: Object): boolean{
        if(node.operand == 'IS' ||  node.operand == 'EQ' || node.operand == 'GT' || node.operand == 'LT' ){
            return node.calculateVal(line);
        }
        else if(node.operand == 'AND' ||  node.operand == 'OR' || node.operand == 'NOT' ){
            return this.traverse(node, line);
        }
        else{
            throw "Invalid query logic";
        }
    }
    // Traverse the tree in order
    static traverse(root: ASTNode, line: Object): boolean{
        for(let i of root.children){
            root.children[root.index] = this.traverseHelper(i, line);
            root.childrenCount --;
            root.index ++;
        }
        if(root.noChild() && root.val == null){
            return root.calculateNode();
        }else if(root.noChild() && root.val != null){
            return root.calculateVal(line);
        }else{
            throw "Some Error to pass Barracuda";
        }
    }

}