

export class  ASTNode{
    public children: Array<any>;
    public childrenCount: number;
    public index: number;
    public operand: string;
    public key: string;
    public val: any;
    constructor (operand:string){
        this.operand = operand;
        this.children = [];
        this.key = null;
        this.val = null;
        this.childrenCount = 0;
        this.index = 0;
    }

    // Pushes a child node into the list of children; Increments childrenCount.
    pushChild(child: ASTNode){
        this.children.push(child);
        this.childrenCount ++;
    }

    setValue(value: any){
        for(let k of Object.keys(value)){
            this.key = k;
        }
        this.val = value[this.key];
    }

    // Checks if the node has no children.
    noChild(){
        if(this.childrenCount == 0){
            return true;
        }
        return false;
    }
}