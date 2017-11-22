import {ASTNode} from "../AST/ASTNode";
import {Tree} from "../AST/Tree";

let legalKeys: Array<string> =["courses_dept", "courses_id", "courses_avg",
    "courses_instructor", "courses_title", "courses_pass",
    "courses_fail", "courses_audit", "courses_uuid", "rooms_fullname", "rooms_shortname", "rooms_number",
    "rooms_name", "rooms_address", "rooms_lat", "rooms_lon", "rooms_seats", "rooms_type", "rooms_furniture",
    "rooms_href", "courses_year"];

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
        if(Array.isArray(data)){
            for(let i of data){
                let node = new ASTNode(first(i));
                curr.pushChild(node);
                this.recursive(i[first(i)], tree, node);
            }
        }else if(curr.operand == 'NOT'){
            let node = new ASTNode(first(data));
            if(Object.keys(data).length != 0) {
                curr.pushChild(node);
                this.recursive(data[first(data)], tree, node);
            }
        }
        else{
            curr.setValue(data);
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
            let obj: { [key: string]: any } = {};
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

    // Get the unique set keys from TRANSFORMATIONS
    static getGroup(trans: {[key:string]: any}): Array<string>{
        if(!("GROUP" in trans)){
            throw "Invalid GROUP";
        }
        let grp = trans["GROUP"];
        if (grp.length == 0){
            throw "Empty GROUP";
        }
        return grp;
    }

    // Given an ordered, trimmed column, return grouped results with applied calculations
    // 1. Get a list of unique sets after scouring colTrim.
    // 2. For each unique set, look through colTrim. Filter out each from the unique sets.
    // 3. Apply the calculation to the value selected on each unique set. (Function call)
    // 4. Write unique sets down with calculated results.
    static processGroup(grp: Array<string>, colTrim: Array<any>): Array<any>{
        let grpTrim: Array<any> = [];
        let uniqueSets: Array<Array<any>> = [];
                                                                // Where grp = courses_dept
        for (let i of colTrim) {                                // i = { courses_dept: 'epse', courses_avg: 97.09 }
            let obj: { [key: string]: any } = {};               // { courses_dept: 'epse', 'AVG': etc. }
            let uniqueSet: Array<any> = [];                     // List of unique sets
            for (let k of grp) {                                // k = courses_dept
                if(legalKeys.indexOf(k) == -1){
                    throw "Invalid GROUP";
                }
                if(i[k] === undefined) throw "Invalid GROUP";   // Group key doesn't match the filtered colTrim's keys
                uniqueSet.push(i[k]);                           // uniqueSet = ['epse']
            }
            uniqueSets.push(uniqueSet);
        }
        return grpTrim;
    }


    static validateQuery(query: any): string{
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