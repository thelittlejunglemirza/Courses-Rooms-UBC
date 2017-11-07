let legalKeys: Array<string> =["courses_dept", "courses_id", "courses_avg",
    "courses_instructor", "courses_title", "courses_pass",
    "courses_fail", "courses_audit", "courses_uuid", "rooms_fullname", "rooms_shortname", "rooms_number",
    "rooms_name", "rooms_address", "rooms_lat", "rooms_lon", "rooms_seats", "rooms_type", "rooms_furniture",
    "rooms_href", "courses_year"];

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

    // Sets keys and value of this node.
    setValue(value: any){
        for(let k of Object.keys(value)){
            this.key = k;
        }
        this.val = value[this.key];
        if(this.key === "rooms_number" && typeof this.key !== "string"){
            throw "invalid query";
        }
    }

    // Checks if the node has no children.
    noChild(){
        return(this.childrenCount == 0);
    }

    // Creates a copy of a root node for safe mutation.
    cloneNode(): ASTNode {
        let cmpy = new ASTNode(this.operand);
        cmpy.index = this.index;
        if(this.noChild()){
            cmpy.childrenCount = this.childrenCount;
            cmpy.key = this.key;
            cmpy.val = this.val;
            return cmpy;

        }
        for(let i of this.children){
            cmpy.children.push(i.cloneNode());
            cmpy.childrenCount ++;
        }
        return cmpy;
    }

    // Evaluate a leaf (dead-end) node in the query.
    // i.e. IS, LT, GT, EQ
    calculateVal(line: any){
        let val = this.val;
        let key:string = this.key;
        if(legalKeys.indexOf(key) == -1){
            throw "Invalid Key";
        }
        let bool:boolean = false;
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
                }
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

    // Evaluates a non-leaf (branching) node in the query.
    // i.e. AND, OR, NOT
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
                return(index > this.index && curr != false)
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