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
                    console.log('1');                                           // Log-tracking(1).
                    console.log(err);                                           // Log error.
                    resp.code = 400;                                            // Update with error code.
                    resp.body = {error: err};                                          // Update with error body.
                    reject(resp);                                               // Reject the Promise.
                });
            }).catch(function (err: string) {                                   // If ZIP is not valid
                console.log('2');                                               // Log-tracking(2).
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
                    fs.unlink("./Data_Set/MyDatasetInsight"+id+".json");
                    resp.code = 204;
                    fulfill(resp);
                }
            }
        });
    }

    performQuery(query: any): Promise <InsightResponse> {
        return null;
    }
}
