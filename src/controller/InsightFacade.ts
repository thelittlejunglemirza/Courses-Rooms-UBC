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

        if (fs.existsSync("Data_Set/MyDatasetInsight"+id+".json")) {                 // If file exists,
            resp.code = 201;                                                                // operation will be successful; id exists
        }else{                                                                              // If file doesn't exist,
            resp.code = 204;                                                                // operation will be successful; new id
        }



        let stream = fs.createWriteStream("Data_Set/MyDatasetInsight"+id+".json");               // Init a Writable Stream object.
        stream.on('error', console.error);                                                      // On error, log the error.

        return new Promise(function (fulfill, reject) {                                                 // Return Promise:
            JSZip.loadAsync(content, {base64: true}).then(function (zip: any) {                         // Read ZIP, check validity. If valid,
                let pArr:Array<Promise<any>> = [];                                                      // Init Promise Array

                if(zip.files === null) {
                    console.log('0');                                                                   // Log-tracking(0).
                    resp.code = 400;                                                                    // Update with error code.
                    reject(resp);                                                                       // Reject the Promise.
                }

                Object.keys(zip.files).forEach(function (relativePath:any, zipEntry:any) {  // Check each key in the Object read from ZIP
                    pArr.push(zip.files[relativePath].async("string"));                                 // Attempt to get String Promises
                });
                Promise.all(pArr).then(function (txtArr) {                                  // Check all String Promises for fulfillment.
                    let flagEndOfTexts = false;                                                         // Init flags.
                    let flagEnd = false;
                    stream.write('[' + '\n');                                                   // Write the beginning of the array (open).
                    let sep = "";                                                                       // Init separator.
                    for (let i of txtArr) {                                                             // For each String in Promise Array
                        if(i == txtArr[txtArr.length-1]){                                               // If the end has been reached,
                            flagEndOfTexts = true;                                                      // Set flag to true.
                        }
                        if (isJsonString(i)) {                                                          // If parseable,
                            let obj = JSON.parse(i);                                                    // Parse it.
                            obj = obj['result'];
                            // turning the string into a JSON object
                            // to exclude the section labled 'rank' which we dont need
                            for (let j of obj) {                                                        // Cycle through JSON
                                if(j == obj[obj.length-1] && flagEndOfTexts == true){                   // Check for end of JSON
                                    flagEnd = true;                                                     // Flag end of JSON
                                }
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
                    fulfill(resp);                                              // Finally, fulfill.
                }).catch(function (err) {
                    console.log('1');                                           // Log-tracking(1).
                    console.log(err);                                           // Log error.
                    resp.code = 400;                                            // Update with error code.
                    resp.body = {err};                                          // Update with error body.
                    reject(resp);                                               // Reject the Promise.
                });
            }).catch(function (err: string) {                                   // If ZIP is not valid
                console.log('2');                                               // Log-tracking(2).
                console.log(err);                                               // Log error.
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
