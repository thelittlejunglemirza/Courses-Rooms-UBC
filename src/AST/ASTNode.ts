import {AST} from "parse5";

export class ASTNode{
    private right: ASTNode;
    private left: ASTNode;
    private key: string;
    private val: any;
public ASTNode(right: ASTNode, left:ASTNode, key:string, val:any){
    this.right = right;
    this.left = left;
    this.key = key;
    this.val = val;
}

}