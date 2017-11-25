/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse} from "./IInsightFacade";
import {InsightResponseController} from "./InsightResponseController";
import FileOperator from "./FileOperator";
import Log from "../Util";
import QueryOperator from "./QueryOperator";

let JSZip = require("jszip");
let fs = require('fs');

let navigator = new FileOperator;

// add, remove, query Success/Failure codes
let addFailure = 400;
let remSuccess = 204;
let remFailure = 404;
let queSuccess = 200;
let queGenericFail = 400;

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {
        let resp: InsightResponseController = new InsightResponseController();
        navigator.makeDirectory("./Data_Set");

        return new Promise(function (fulfill, reject) {
            JSZip.loadAsync(content, {base64: true}).then(function (zip: any) {
                resp.setCode(navigator.checkDatasetExists(id));
                //navigator.readAndWrite(zip);
                let pArr:Array<Promise<any>> = [];
                Object.keys(zip.files).forEach(function (relativePath:any, zipEntry:any) {
                    pArr.push(zip.files[relativePath].async("string"));
                });

                Promise.all(pArr).then(function (txtArr) {
                    return navigator.readAndWrite(txtArr, id, fulfill, resp.getResponse());
                    //fulfill(resp.getResponse());
                }).catch(function (err) {
                    resp.setError(addFailure, err);
                    reject(resp.getResponse());
                });

            }).catch(function (err: string) {
                resp.setError(addFailure, err);
                reject(resp.getResponse());
            })
        });
    }

    removeDataset(id: string): Promise<InsightResponse> {
        let resp: InsightResponseController = new InsightResponseController();
        return new Promise(function (fulfill, reject) {
            if (!fs.existsSync("./Data_Set")) {
                resp.setCode(remFailure);
                reject(resp.getResponse());
            }else {
                if(!fs.existsSync("Data_Set/MyInsight"+id+".json")){
                    resp.setCode(remFailure);
                    reject(resp.getResponse());
                }else {
                    fs.unlinkSync("./Data_Set/MyInsight"+id+".json");
                    resp.setCode(remSuccess);
                    fulfill(resp.getResponse());
                }
            }
        });
    }

    performQuery(query: any): Promise <InsightResponse> {
        var resp: InsightResponseController = new InsightResponseController();
        return new Promise(function(fulfill, reject){
            let eCaught = [];
            let id = QueryOperator.validateQuery(query);
            if(id != "courses" && id != "rooms"){
                resp.setError(400, "Invalid Query");
                reject(resp.getResponse());
                return;
            }
            let options = query["OPTIONS"];
            // let transformations = query["TRANSFORMATIONS"];
            let colTrim: Array<any> = [];
            let cols: Array<string> = [];
            let transformed: Array<any> = [];

            try{
                let where = query["WHERE"];

                if(Object.keys(where).length == 0) {
                    throw "Invalid Query";
                }

                let root = QueryOperator.processWhere(where);
                let dataset = navigator.getDataset(id);
                let obj = JSON.parse(dataset);
                eCaught = QueryOperator.extractData(obj, root);
                if(!("OPTIONS" in query)){
                    throw "Invalid OPTIONS";
                }


                cols = QueryOperator.getColumns(options);
                colTrim = QueryOperator.processColumns(cols, eCaught);
            }catch (err){
                resp.setError(queGenericFail, err);
                reject(resp.getResponse());
                return;
            }

            let res : { [key:string] : any} = {};

            try{
                QueryOperator.processOrder(options, cols, colTrim);
            }catch (err){
                resp.setError(queGenericFail, err);
                reject(resp.getResponse());
                return;
            }

            res["result"] = colTrim;
            resp.setFulfill(queSuccess, res);
            //navigator.writeResultToFile(res);
            fulfill(resp.getResponse());
        });
    }


}
