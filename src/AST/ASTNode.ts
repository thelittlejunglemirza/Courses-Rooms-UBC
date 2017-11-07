let legalKeys: { [key:string] : string } =
                       {"courses_dept": "string",              "courses_id": "string",              "courses_avg": "number",
                        "courses_instructor": "string",        "courses_title": "string",           "courses_pass": "number",
                        "courses_fail": "number",              "courses_audit": "number",           "courses_uuid": "string",
                        "rooms_fullname": "string",            "rooms_shortname": "string",         "rooms_number": "string",
                        "rooms_name": "string",                "rooms_address": "string",           "rooms_lat": "number",
                        "rooms_lon": "number",                 "rooms_seats": "number",             "rooms_type": "string",
                        "rooms_furniture": "string",           "rooms_href": "string",              "courses_year": "number"};

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
        if(legalKeys[this.key] !== typeof this.val){
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
        if(!(key in legalKeys)){
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