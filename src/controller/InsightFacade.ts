/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse} from "./IInsightFacade";

import Log from "../Util";

var JSZip = require("jszip");
var fs = require('fs');

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }



    addDataset(id: string, content: string): Promise<InsightResponse> {
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
        }

        if (!fs.existsSync("./Data_Set")) {
            // create the directory for the dataset if it does not exits already
            fs.mkdirSync("./Data_Set")                       // create directory
        }

        if (fs.existsSync("Data_Set/MyDatasetInsight"+id+".json")) {                 // If file exists,
            resp.code = 201;                                                                // operation will be successful; id exists
            //fs.unlinkSync("./Data_Set/MyDatasetInsight"+id+".json");                       // Remove file.
        }else{                                                                              // If file doesn't exist,
            resp.code = 204;                                                                // operation will be successful; new id
        }



        var stream = fs.createWriteStream("Data_Set/MyDatasetInsight"+id+".json");   // Init a Writable Stream object.
        stream.on('error', console.error);                                          // On error, log the error.

        return new Promise(function (fulfill, reject) {                                                 // Return Promise:
            JSZip.loadAsync(content, {base64: true}).then(function (zip: any) {                         // Read ZIP, check validity. If valid,
                var pArr:Array<Promise<any>> = [];
                Object.keys(zip.files).forEach(function (relativePath:any, zipEntry:any) {  // Check each key in the Object read from ZIP
                    pArr.push(zip.files[relativePath].async("string"));
                });
                Promise.all(pArr).then(function (txtArr) {
                    var flagEndOfTexts = false;
                    var flagEnd = false;
                    stream.write('[' + '\n');
                    var sep = "";
                    for (let i of txtArr) {
                        if(i == txtArr[txtArr.length-1]){
                            flagEndOfTexts = true;
                        }
                        if (isJsonString(i)) {
                            var obj = JSON.parse(i);
                            obj = obj['result'];
                            // turning the string into a JSON object
                            // to exclude the section labled 'rank' which we dont need
                            for (let j of obj) {
                                if(j == obj[obj.length-1] && flagEndOfTexts == true){
                                    flagEnd = true;
                                }
                                // requirement is only 9 fields of the 36 so we can selectively thake the 9 by
                                // the following mapping
                                var dict = {
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

                                var dictstring = JSON.stringify(dict);  // to be able to write it back on disk we will make it
                                                                        // a string.
                                stream.write( sep + dictstring );
                                if (!sep){
                                    sep = ',\n'
                                }
                            }
                        }
                    }
                    stream.write('\n]');
                    fulfill(resp);
                }).catch(function (err) {
                    console.log('1');
                    console.log(err);// Log it.
                    resp.code = 400;                                                // Update with error code.
                    resp.body = {err};                                              // Update with error body.
                    reject(resp);
                });
            }).catch(function (err: string) {                                   // If ZIP is not valid
                console.log('2');
                console.log(err);// Log it.
                resp.code = 400;                                                // Update with error code.
                resp.body = {err};                                              // Update with error body.
                reject(resp);                                                   // Reject.
            })
        });
    }

    removeDataset(id: string): Promise<InsightResponse> {
        return null;
    }

    performQuery(query: any): Promise <InsightResponse> {
        return null;
    }
}
