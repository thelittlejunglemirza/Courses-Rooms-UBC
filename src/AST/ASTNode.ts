

export class  ASTNode{
    private kids: Array<ASTNode>;
    private key: string;
    private val: Object;
    constructor (key:string){
        this.key = key;
        this.kids = [];
        this.val = null;
    }

    pushChild(child: ASTNode){
        this.kids.push(child);
    }

    setValue(value: Object){
        this.val = value;
    }

}