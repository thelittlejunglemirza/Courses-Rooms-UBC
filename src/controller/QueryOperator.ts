import {ASTNode} from "../AST/ASTNode";
import {Tree} from "../AST/Tree";
import {isArray} from "util";
import {authorizationParser} from "restify";
let Decimal = require('decimal.js');

let legalKeys: Array<string> =["courses_dept", "courses_id", "courses_avg",
    "courses_instructor", "courses_title", "courses_pass",
    "courses_fail", "courses_audit", "courses_uuid", "rooms_fullname", "rooms_shortname", "rooms_number",
    "rooms_name", "rooms_address", "rooms_lat", "rooms_lon", "rooms_seats", "rooms_type", "rooms_furniture",
    "rooms_href", "courses_year"];

let legalKeysWithTypes: { [key:string] : string } =
    {"courses_dept": "string",              "courses_id": "string",              "courses_avg": "number",
        "courses_instructor": "string",        "courses_title": "string",           "courses_pass": "number",
        "courses_fail": "number",              "courses_audit": "number",           "courses_uuid": "string",
        "rooms_fullname": "string",            "rooms_shortname": "string",         "rooms_number": "string",
        "rooms_name": "string",                "rooms_address": "string",           "rooms_lat": "number",
        "rooms_lon": "number",                 "rooms_seats": "number",             "rooms_type": "string",
        "rooms_furniture": "string",           "rooms_href": "string",              "courses_year": "number"};




// Returns the first item in an Object.
function first(obj: Object) {
    for (var a in obj) return a;
}

function firstKey(obj :Object){
    for(let k of Object.keys(obj)) return k;
}

// given an array of objects and a key, sort the array base on that key value
function sort(key: any, arr: Array<any>){
    return arr.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function settleUp(a:any, b:any, keys: Array<string>): number{
    for(let k of keys){
        if(a[k] < b[k]) return -1;
        if(a[k] > b[k]) return 1;
    }
    return 0;
}

function settleDown(a:any, b:any, keys: Array<string>): number{
    for(let k of keys){
        if(a[k] > b[k]) return -1;
        if(a[k] < b[k]) return 1;
    }
    return 0;
}

function sortUp(keys: Array<string>, arr: Array<any>){
    return arr.sort(function(a, b) {
        var x = a[keys[0]]; var y = b[keys[0]];
        return ((x < y) ? -1 : ((x > y) ? 1 : settleUp(a,b, keys)));
    });
}

function sortDown(key: any, arr: Array<any>){
    return arr.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
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

    static getColumnsStrings(cols: Array<string>): Array<string>{
        let colStrings : Array<string> = [];
        for (let k of cols) {
            if(legalKeys.indexOf(k) === -1){
                colStrings.push(k);
            }
        }
        return colStrings;
    }

    // parse the part of query associated and return a modifed data structure accordingly
    static processColumns(cols: Array<string>, extracted: Array<any>): Array<any>{
        let colTrim = [];
        for (let i of extracted) {
            let obj: { [key: string]: any } = {};
            for (let k of cols) {
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
            if(typeof(order) === "object"){
                if(order["dir"] === "UP"){
                    let keys = order["keys"];
                    sortUp(keys, colTrim);

                }else if(order["dir"] === "DOWN"){
                    let keys = order["keys"];
                    sortDown(keys, colTrim);
                }else {
                    throw "invalid order direction"
                }
            }else {
                if (cols.indexOf(order) == -1) {
                    throw "Invalid ORDER";
                } else {
                    sort(order, colTrim);
                }
            }
        }
    }

    static processTransformations(query: any, data: Array<any>, colStrings: Array<string>): Array<string>{
        let trans = query["TRANSFORMATIONS"]
        let grp = QueryOperator.getGroup(trans);
        let grpTrim = QueryOperator.processGroup(grp, data);
        let alyTrim = QueryOperator.processApply(trans, grpTrim, grp, colStrings);
        return alyTrim;
    }

    // Get the unique set keys from TRANSFORMATIONS
    static getGroup(trans: any): Array<string>{
        if(!("GROUP" in trans)){
            throw "Invalid GROUP";
        }
        let grpObject = trans["GROUP"];
        if (grpObject.length == 0){
            throw "Empty GROUP";
        }
        let grp : Array<string> = [];
        for(let k of grpObject){
            if(legalKeys.indexOf(k) == -1){
                throw "Invalid Key in Grp"
            }
            grp.push(k);
        }
        return grp;
    }


    // return grouped results with applied calculations
    static processGroup(grpStrArr: Array<string>, data: Array<any>): Array<any>{

        let grpTrim: Array<Array<any>> = [];
        let uniqueSets: Array<string> = [];

        for (let i of data) {
            let uniqueSet: string = "";
            for (let k of grpStrArr) {
                //let obj: { [key: string]: any } = {k: i[k]};
                if(typeof i[k] === "string"){
                    uniqueSet += i[k];
                }else{
                    let str = i[k].toString();
                    uniqueSet += str;
                }

            }
            if(uniqueSets.indexOf(uniqueSet) === -1) {
                uniqueSets.push(uniqueSet);
                let grp: Array<any> = [];
                grp.push(i);
                for(let j of data){
                    if(j !== i){
                        let flag = true;
                        for(let k of grpStrArr){
                            if(i[k] !== j[k]){
                                flag = false
                            }
                        }
                        if(flag === true){
                            grp.push(j);
                        }
                    }
                }
                grpTrim.push(grp);
            }
        }
        return grpTrim;
    }

    static processApply(trans: any, grpTrim: Array<Array<any>>, grpStrArr: Array<string>, colStrings: Array<string>): Array<any>{
        if(!("APPLY" in trans)){
            throw "APPLY not Found!";
        }
        let apply = trans["APPLY"];
        let applyKeys = []
        if (apply.length != 0){
            for(let alyObject of apply){
                let key = firstKey(alyObject);
                applyKeys.push(key);
                if(colStrings.indexOf(key) === -1){
                    throw "Invalid Apply String";
                }
                let tokenObject = alyObject[key];
                let token = firstKey(tokenObject);
                let field = tokenObject[token];
                if(legalKeys.indexOf(field) === -1){
                    throw "Invalid Token Field"
                }
                for(let grp of grpTrim){
                    QueryOperator.processToken(token, field, grp, key);
                }

            }
        }
        for(let i of colStrings){
            if(applyKeys.indexOf(i) === -1){
                throw "Invalid Column Key That Was Not Used in Apply"
            }
        }
        let alyTrim: Array<any> = [];
        for(let grp of grpTrim){
            let first: { [key: string]: any } = grp[0];
            let newGrpObj: { [key: string]: any } = {};
            for(let k of Object.keys(first)){
                if(grpStrArr.indexOf(k) !== -1){
                    newGrpObj[k] = first[k];
                }
            }
            for(let l of grp){
                let key = firstKey(l);
                if(colStrings.indexOf(key) !== -1){
                    newGrpObj[key] = l[key];
                }
            }
            alyTrim.push(newGrpObj);
        }
        return alyTrim;
    }

    static processToken(token: string, field: string, grp: Array<any>, key:string){
        var obj: { [key: string]: any } = {};

        switch (token){
            case 'MAX':
                try {
                    if(legalKeysWithTypes[field] !== "number"){
                        throw "Not a number field in Max";
                    }
                    let max = -1;
                    for (let g of grp) {
                        if (g[field] > max) {
                            max = g[field];
                        }
                    }
                    obj[key] = max;
                    grp.push(obj);
                }catch (err){
                    throw "Invalid Max";
                }
                break;
            case 'MIN':
                try {
                    if(legalKeysWithTypes[field] !== "number"){
                        throw "Not a number field in Min";
                    }
                    let min = 99999;
                    for (let g of grp) {
                        if (g[field] < min) {
                            min = g[field];
                        }
                    }
                    obj[key] = min;
                    grp.push(obj);
                }catch (err){
                    throw "Invalid Min";
                }
                break;
            case 'AVG':
                try {
                    if(legalKeysWithTypes[field] !== "number"){
                        throw "Not a number field in Avg";
                    }
                    let inputArrAvg: Array<number> = [];
                    for (let g of grp) {
                        inputArrAvg.push(g[field]);
                    }
                    let avg = Number((inputArrAvg.map(val => <any>new Decimal(val)).reduce((a, b) => a.plus(b)).toNumber() / inputArrAvg.length).toFixed(2));
                    obj[key] = avg;
                    grp.push(obj);
                }catch (err){
                    throw "Invalid Avg";
                }
                break;
            case 'SUM':
                try {
                    if(legalKeysWithTypes[field] !== "number"){
                        throw "Not a number field in Sum";
                    }
                    let inputArr: Array<number> = [];
                    for (let g of grp) {
                        if(typeof(g[field]) === "number"){
                            inputArr.push(g[field]);
                        }

                    }
                    let sum = Number(inputArr.map(val => new Decimal(val)).reduce((a, b) => a.plus(b)).toNumber().toFixed(2));
                    obj[key] = sum;
                    grp.push(obj);
                }catch (err){
                    throw "Invalid Sum";
                }
                break;
            case 'COUNT':
                try {
                    let count = 0;
                    let fieldArr: Array<any> = [];
                    for (let g of grp) {
                        if (fieldArr.indexOf(g[field]) === -1) {
                            count++;
                            fieldArr.push(g[field]);
                        }
                    }
                    obj[key] = count;
                    grp.push(obj);
                }catch (err){
                    throw "Invalid Count";
                }
                break;
            default:
                throw "Invalid Token";
        }

    }

    static checkColumnsForLegalKey(cols: Array<string>){
        for(let c of cols){
            if(legalKeys.indexOf(c) === -1){
                throw "Invalid Column Key When There is no Transformation"
            }
        }
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