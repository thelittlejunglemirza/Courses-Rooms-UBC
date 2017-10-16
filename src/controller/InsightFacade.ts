/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse} from "./IInsightFacade";

import Log from "../Util";
import {Tree} from "../AST/Tree";
import {ASTNode} from "../AST/ASTNode";

var JSZip = require("jszip");
var fs = require('fs');
var legalKeys: Array<string> =["courses_dept", "courses_id", "courses_avg",
                                "courses_instructor", "courses_title", "courses_pass",
                                "courses_fail", "courses_audit", "courses_uuid"];

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }



    addDataset(id: string, content: string): Promise<InsightResponse> {
        // Helper function;
        // String -> Boolean
        // Checks if String is parse-able with catch.
        function isJsonString(str: string) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }

        var resp: InsightResponse = {                                                       // Init a new Insight Response
            code: 0,                                                                        // With an initial code of 0
            body: {}                                                                        // and an empty body
        };
        if (!fs.existsSync("./Data_Set")) {                                          // Create directory if not found.
            fs.mkdirSync("./Data_Set")
        }
        return new Promise(function (fulfill, reject) {                                                 // Return Promise:
            JSZip.loadAsync(content, {base64: true}).then(function (zip: any) {                         // Read ZIP, check validity. If valid,
                if (fs.existsSync("Data_Set/MyDatasetInsight"+id+".json")) {                 // If file exists,
                    resp.code = 201;                                                                // operation will be successful; id exists
                    fs.unlinkSync("./Data_Set/MyDatasetInsight"+id+".json");                       // Remove file.
                }else{                                                                              // If file doesn't exist,
                    resp.code = 204;                                                                // operation will be successful; new id
                }
                var stream = fs.createWriteStream("Data_Set/MyDatasetInsight"+id+".json");   // Init a Writable Stream object.
                stream.on('error', console.error);                                             // On error, log the error.

                var pArr:Array<Promise<any>> = [];                                                      // Init Promise Array
                Object.keys(zip.files).forEach(function (relativePath:any, zipEntry:any) {  // Check each key in the Object read from ZIP
                    pArr.push(zip.files[relativePath].async("string"));                                 // Attempt to get String Promises
                });
                Promise.all(pArr).then(function (txtArr) {                                  // Check all String Promises for fulfillment.
                    let flagFoundCourse = false;
                    stream.write('[' + '\n');                                                   // Write the beginning of the array (open).
                    let sep = "";                                                                       // Init separator.
                    for (let i of txtArr) {                                                             // For each String in Promise Array
                        if (isJsonString(i)) {                                                          // If parseable,
                            let obj = JSON.parse(i);                                                    // Parse it.
                            obj = obj['result'];
                            // turning the string into a JSON object
                            // to exclude the section labled 'rank' which we dont need
                            if(flagFoundCourse == false && obj.length > 0){
                                flagFoundCourse = true;
                            }
                            for (let j of obj) {                                                        // Cycle through JSON
                                // requirement is only 9 fields of the 36 so we can selectively thake the 9 by
                                // the following mapping
                                let dict = {
                                    "courses_dept": j['Subject'],
                                    "courses_id": j['Course'],
                                    "courses_avg": j['Avg'],
                                    "courses_instructor": j['Professor'],
                                    "courses_title": j['Title'],
                                    "courses_pass": j['Pass'],
                                    "courses_fail": j['Fail'],
                                    "courses_audit": j['Audit'],
                                    "courses_uuid": j['id'].toString()
                                };
                                let dictstring = JSON.stringify(dict);          // to be able to write it back on disk we will make it
                                                                                // a string.
                                stream.write( sep + dictstring );       // Write separator + string to disk
                                if (!sep){                                      // Set separator after first write.
                                    sep = ',\n'
                                }
                            }
                        }
                    }
                    stream.write('\n]');                                // Close off the array.
                    if(flagFoundCourse == false){
                        fs.unlinkSync("./Data_Set/MyDatasetInsight"+id+".json");
                        throw "the dataset is not valid";
                    }
                    fulfill(resp);                                              // Finally, fulfill.
                }).catch(function (err) {
                    console.log(err);                                           // Log error.
                    resp.code = 400;                                            // Update with error code.
                    resp.body = {error: err};                                          // Update with error body.
                    reject(resp);                                               // Reject the Promise.
                });
            }).catch(function (err: string) {                                   // If ZIP is not valid
                console.log(err);                                               // Log error.
                resp.code = 400;                                                // Update with error code.
                resp.body = {error: err};                                              // Update with error body.
                reject(resp);                                                   // Reject.
            })
        });
    }

    removeDataset(id: string): Promise<InsightResponse> {
        var resp: InsightResponse = {                                                       // Init a new Insight Response
            code: 0,                                                                        // With an initial code of 0
            body: {}                                                                        // and an empty body
        };
        return new Promise(function (fulfill, reject) {
            if (!fs.existsSync("./Data_Set")) {
                resp.code = 404;                     // there is not sets
                reject(resp);
            }else {
                if(!fs.existsSync("Data_Set/MyDatasetInsight"+id+".json")){
                    resp.code = 404;                     // there is no dataset with this id
                    reject(resp);
                }else {
                    fs.unlinkSync("./Data_Set/MyDatasetInsight"+id+".json");
                    resp.code = 204;
                    fulfill(resp);
                }
            }
        });
    }

    performQuery(query: any): Promise <InsightResponse> {
        var resp: InsightResponse = {                                                       // Init a new Insight Response
            code: 0,                                                                        // With an initial code of 0
            body: {}                                                                        // and an empty body
        };

        // Returns the first item in an Object.
        function first(obj: Object) {
            for (var a in obj) return a;
        }

        // Forms a tree recursively.
        function recursive(data: any, tree: Tree, curr: ASTNode){
            if(Array.isArray(data)){                                                        // If it's an array..
                for(let i of data){                                                         // Cycle through it
                    let node = new ASTNode(first(i));                                       // Create new node from the first item
                    curr.pushChild(node);                                                   // Push into the list of children of the current node
                    recursive(i[first(i)], tree, node);                                     // Recursive call
                }
            }else if(curr.operand == 'NOT'){
                let node = new ASTNode(first(data));
                curr.pushChild(node);
                recursive(data[first(data)], tree, node);
            }
            else{
                curr.setValue(data);                                                        // Otherwise, just set the current node's value
            }
        }

        // Creates a copy of a root node to safely
        function cloneNode(old: ASTNode) {
            let cmpy = new ASTNode(old.operand);                                            // Create a node from the node's string
            cmpy.index = old.index;                                                         // Copy index
            if(old.noChild()){                                                              // If it has no children
                cmpy.childrenCount = old.childrenCount;                                     // Copy over directly and return.
                cmpy.key = old.key;
                cmpy.val = old.val;
                return cmpy;

            }
            for(let i of old.children){                                                     // Cycle through the children of the old node
                cmpy.children.push(cloneNode(i));                                           // Clone and push.
                cmpy.childrenCount ++;
            }
            return cmpy;                                                                    // Finally, return.
        }

        //
        function calculateVal(node: ASTNode, line: any){
            var val = node.val;
            var key:string = node.key;
            if(legalKeys.indexOf(key) == -1){
                throw "Invalid Key";
            }
            var bool:boolean = false;
            switch (node.operand){
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
                    break;
            }
            return bool;
        }

        function calculateNode(root: ASTNode): boolean{
            switch (root.operand){
                case 'AND':
                    if(root.noChild() && root.index == 0){
                        throw "Empty AND"
                    }
                    let index = 0;
                    var curr = true;
                    while(curr != false && index <= root.index){
                        curr = root.children[index];
                        index ++;
                    }
                    if(index > root.index && curr != false){
                        return true;
                    }
                    return false;
                case 'OR':
                    if(root.noChild() && root.index == 0){
                        throw "Empty OR"
                    }
                    for(let i of root.children){
                        if (i == true){
                            return true;
                        }
                    }
                    return false;
                case 'NOT':
                    if((root.noChild() && root.index == 0) || root.childrenCount > 1){
                        throw "Invalid NOT"
                    }
                    return !root.children[0];

                default:
                    return false;
            }
        }

        function traverseHelper(node: ASTNode, line: Object): boolean{
            if(node.operand == 'IS' ||  node.operand == 'EQ' || node.operand == 'GT' || node.operand == 'LT' ){
                return calculateVal(node, line);
            }
            else if(node.operand == 'AND' ||  node.operand == 'OR' || node.operand == 'NOT' ){
                return traverse(node, line);
            }
            else{
                throw "Invalid query logic"
            }
        }
        function traverse(root: ASTNode, line: Object): boolean{
            for(let i of root.children){
                root.children[root.index] = traverseHelper(i, line);
                root.childrenCount --;
                root.index ++;
            }
            if(root.noChild() && root.val == null){
                return calculateNode(root);
            }else if(root.noChild() && root.val != null){
                return calculateVal(root, line);
            }
        }
        function sort(key: any, arr: Array<any>){
            return arr.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
        return new Promise(function(fulfill, reject){
            let pCaught = [];
            try{
                let where = query["WHERE"];
                let root = new ASTNode(first(where));
                let tree = new Tree(root);
                recursive(where[first(where)], tree, root);
                try {
                    let dataset = fs.readFileSync("./Data_Set/MyDatasetInsightcourses.json");
                }catch (err){
                resp.code = 424;
                resp.body = {error: err};
                reject(resp);
                return;
                }
                let dataset = fs.readFileSync("./Data_Set/MyDatasetInsightcourses.json");
                let obj = JSON.parse(dataset);
                for(let i of obj){
                    let temp = cloneNode(tree.root);
                    if(traverse(temp, i)){
                        pCaught.push(i);

                    }
                }
            }catch (err){
                //console.log(err);
                resp.code = 400;
                resp.body = {error: err};
                reject(resp);
                return;
            }
            let colTrim = [];
            if(!("OPTIONS" in query)){
                resp.code = 400;
                resp.body = {error: "Invalid OPTIONS"};
                reject(resp);
                return;
            }
            let options = query["OPTIONS"];
            let cols = [];
            try {
                if(!("COLUMNS" in options)){
                    throw "Invalid OPTIONS";
                }
                cols = options["COLUMNS"];
                if (cols.length == 0){
                    throw "Empty columns";
                }
                for (let i of pCaught) {
                    var obj: { [key: string]: any } = {};
                    for (let k of cols) {
                        obj[k] = i[k];
                    }
                    colTrim.push(obj);
                }
            }catch (err){
                resp.code = 400;
                resp.body = {error: err};
                reject(resp);
                return;
            }
            var obj : { [key:string] : any} = {};
            if("ORDER" in options) {
                let order = options["ORDER"];
                if (cols.indexOf(order) == -1) {
                    resp.code = 400;
                    resp.body = {error: "Invalid ORDER"};
                    reject(resp);
                    return;
                } else {
                    sort(order, colTrim);
                }
            }
            obj["result"] = colTrim;
            resp.body = obj;
            resp.code = 200;
            fulfill(resp);
        });
    }
}
