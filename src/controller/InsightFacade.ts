/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse} from "./IInsightFacade";
import {InsightResponseController} from "./InsightResponseController";
import FileOperator from "./FileOperator"
import Log from "../Util";
import QueryOperator from "./QueryOperator";

var JSZip = require("jszip");
var fs = require('fs');

var navigator = new FileOperator;

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {
        var resp: InsightResponseController = new InsightResponseController();
        navigator.makeDirectory("./Data_Set");

        return new Promise(function (fulfill, reject) {
            JSZip.loadAsync(content, {base64: true}).then(function (zip: any) {
                resp.setCode(navigator.checkDatasetExists(id));
                var pArr:Array<Promise<any>> = [];
                Object.keys(zip.files).forEach(function (relativePath:any, zipEntry:any) {
                    pArr.push(zip.files[relativePath].async("string"));
                });

                Promise.all(pArr).then(function (txtArr) {
                    navigator.readAndWrite(txtArr, id);
                    fulfill(resp.getResponse());
                }).catch(function (err) {
                    resp.setError(400, err);
                    reject(resp.getResponse());
                });

            }).catch(function (err: string) {
                resp.setError(400, err);
                reject(resp.getResponse());
            })
        });
    }

    removeDataset(id: string): Promise<InsightResponse> {
        var resp: InsightResponseController = new InsightResponseController();
        return new Promise(function (fulfill, reject) {
            if (!fs.existsSync("./Data_Set")) {
                resp.setCode(404);
                reject(resp.getResponse());
            }else {
                if(!fs.existsSync("Data_Set/MyDatasetInsight"+id+".json")){
                    resp.setCode(404);
                    reject(resp.getResponse());
                }else {
                    fs.unlinkSync("./Data_Set/MyDatasetInsight"+id+".json");
                    resp.setCode(204);
                    fulfill(resp.getResponse());
                }
            }
        });
    }

    performQuery(query: any): Promise <InsightResponse> {
        var resp: InsightResponseController = new InsightResponseController();
        return new Promise(function(fulfill, reject){
            let eCaught = [];
            let options = query["OPTIONS"];
            let colTrim: Array<any> = [];
            let cols: Array<string> = [];

            try{
                let where = query["WHERE"];

                if(Object.keys(where).length == 0) {
                    throw "Invalid Query";
                }

                let root = QueryOperator.processWhere(where);
                let dataset = navigator.getDataset();
                let obj = JSON.parse(dataset);
                eCaught = QueryOperator.extractData(obj, root)

                if(!("OPTIONS" in query)){
                    throw "Invalid OPTIONS";
                }

                cols = QueryOperator.getColumns(options);
                colTrim = QueryOperator.processColumns(cols, eCaught);
            }catch (err){
                resp.setError(400, err)
                reject(resp.getResponse());
                return;
            }

            var res : { [key:string] : any} = {};

            try{
                QueryOperator.processOrder(options, cols, colTrim);
            }catch (err){
                resp.setError(400, err);
                reject(resp.getResponse());
                return;
            }

            res["result"] = colTrim
            resp.setFulfill(200, res);
            navigator.writeResultToFile(res);
            fulfill(resp.getResponse());
        });
    }
}
