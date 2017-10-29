var legalKeys: Array<string> =["courses_dept", "courses_id", "courses_avg",
                                "courses_instructor", "courses_title", "courses_pass",
                                "courses_fail", "courses_audit", "courses_uuid"];

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

    //
    setValue(value: any){
        for(let k of Object.keys(value)){
            this.key = k;
        }
        this.val = value[this.key];
    }

    // Checks if the node has no children.
    noChild(){
        return(this.childrenCount == 0);
    }

    // Creates a copy of a root node to safely
    cloneNode(): ASTNode {
        let cmpy = new ASTNode(this.operand);                                            // Create a node from the node's string
        cmpy.index = this.index;                                                         // Copy index
        if(this.noChild()){                                                              // If it has no children
            cmpy.childrenCount = this.childrenCount;                                     // Copy over directly and return.
            cmpy.key = this.key;
            cmpy.val = this.val;
            return cmpy;

        }
        for(let i of this.children){                                                     // Cycle through the children of the old node
            cmpy.children.push(i.cloneNode());                                           // Clone and push.
            cmpy.childrenCount ++;
        }
        return cmpy;                                                                    // Finally, return.
    }

    // evaluate the leaf
    calculateVal(line: any){
        var val = this.val;
        var key:string = this.key;
        if(legalKeys.indexOf(key) == -1){
            throw "Invalid Key";
        }
        var bool:boolean = false;
        switch (this.operand){
            case 'IS':
                if (!(typeof (val) === "string")){
                    throw "Invalid IS";
                }
                if(val.startsWith('*') && val.endsWith('*')){
                    bool=line[key].includes(val.substring(1,val.length - 1));
                    break;
                }else if(val.startsWith('*')){
                    bool = line[key].endsWith(val.substring(1,val.length));
                    break;
                }else if(val.endsWith('*')){
                    bool = line[key].startsWith(val.substring(0,val.length - 1));
                    break;
                }else{
                    bool = (line[key] === val);
                    break;
                };
            case 'LT':
                if (!(typeof (val) === "number")){
                    throw "Invalid LT";
                }
                bool = (line[key] < val);
                break;
            case 'GT':
                if (!(typeof (val) === "number")){
                    throw "Invalid GT";
                }
                bool = (val < line[key]);
                break;
            case 'EQ':
                if (!(typeof (val) === "number")){
                    throw "Invalid EQ";
                }
                bool = (val == line[key]);
                break;
            default:
                throw "Some Error to catch Barracuda";
        }
        return bool;
    }

    // evaluate the node
    calculateNode(): boolean{
        switch (this.operand){
            case 'AND':
                if(this.noChild() && this.index == 0){
                    throw "Empty AND";
                }
                let index = 0;
                var curr = true;
                while(curr != false && index <= this.index){
                    curr = this.children[index];
                    index ++;
                }
                if(index > this.index && curr != false){
                    return true;
                }
                return false;
            case 'OR':
                if(this.noChild() && this.index == 0){
                    throw "Empty OR"
                }
                for(let i of this.children){
                    if (i == true){
                        return true;
                    }
                }
                return false;
            case 'NOT':
                if((this.noChild() && this.index == 0) || this.childrenCount > 1){
                    throw "Invalid NOT"
                }
                return !this.children[0];

            default:
                throw "Invalid Query";
        }
    }
}