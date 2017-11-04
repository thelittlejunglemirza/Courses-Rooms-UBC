import {ASTNode} from "../AST/ASTNode";
import {Tree} from "../AST/Tree";

 var legalKeys: Array<string> =["courses_dept", "courses_id", "courses_avg",
     "courses_instructor", "courses_title", "courses_pass",
     "courses_fail", "courses_audit", "courses_uuid", "rooms_fullname", "rooms_shortname", "rooms_number",
     "rooms_name", "rooms_address", "rooms_lat", "rooms_lon", "rooms_seats", "rooms_type", "rooms_furniture",
     "rooms_href"];

// Returns the first item in an Object.
function first(obj: Object) {
    for (var a in obj) return a;
}

// given an array of objects and a key, sort the array base on that key value
function sort(key: any, arr: Array<any>){
    return arr.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

export default class QueryOperator{

    // Forms a tree recursively.
    static recursive(data: any, tree: Tree, curr: ASTNode){
        if(Array.isArray(data)){                                                        // If it's an array..
            for(let i of data){                                                         // Cycle through it
                let node = new ASTNode(first(i));                                       // Create new node from the first item
                curr.pushChild(node);                                                   // Push into the list of children of the current node
                this.recursive(i[first(i)], tree, node);                                     // Recursive call
            }
        }else if(curr.operand == 'NOT'){
            let node = new ASTNode(first(data));
            if(Object.keys(data).length != 0) {
                curr.pushChild(node);
                this.recursive(data[first(data)], tree, node);
            }
        }
        else{
            curr.setValue(data);                                                        // Otherwise, just set the current node's value
        }
    }

    // parse the part of query associated with the key WHERE and return a root to the AST associated with query
    static processWhere(whr: { [key: string]: any }): ASTNode{
        let root = new ASTNode(first(whr));
        let tree = new Tree(root);
        this.recursive(whr[first(whr)], tree, root);
        return root;
    }

    // given a valid AST extract the lines of code that meet the AST requirement
    static extractData(obj: Array<any>, tree: ASTNode): Array<any>{
        let pCaught = [];
        for(let i of obj){
            let temp = tree.cloneNode();
            if(Tree.traverse(temp, i)){
                pCaught.push(i);

            }
        }
        return pCaught;
    }

    // given an object extract array of columns if exists
    static getColumns(options: {[key:string]: any}): Array<string>{
        if(!("COLUMNS" in options)){
            throw "Invalid OPTIONS";
        }
        let cols = options["COLUMNS"];
        if (cols.length == 0){
            throw "Empty columns";
        }
        return cols;
    }

    // parse the part of query associated and return a modifed data structure accordingly
    static processColumns(cols: Array<string>, extracted: Array<any>): Array<any>{
        let colTrim = [];
        for (let i of extracted) {
            var obj: { [key: string]: any } = {};
            for (let k of cols) {
                if(legalKeys.indexOf(k) == -1){
                    throw "Invalid COLUMN";
                }
                obj[k] = i[k];
            }
            colTrim.push(obj);
        }
        return colTrim;
    }

    // given the options part of query make the changes depending on the instructions in order
    static processOrder(options: {[key:string]: any}, cols: Array<string>, colTrim: Array<any>){
        if("ORDER" in options) {
            let order = options["ORDER"];
            if (cols.indexOf(order) == -1) {
                throw "Invalid ORDER";
            } else {
                sort(order, colTrim);
            }
        }
    }

    static validateQuerry(query: any): string{
        let txt = JSON.stringify(query);
        if(txt.indexOf("courses_") !== -1 && txt.indexOf("rooms_") !== -1){
            return null;
        }else if(txt.indexOf("courses_") !== -1){
            return "courses"
        }else if(txt.indexOf("rooms_") !== -1){
            return "rooms"
        }else{
            return null;
        }
    }
}