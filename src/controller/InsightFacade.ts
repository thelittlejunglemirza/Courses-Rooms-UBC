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
                Object.keys(zip.files).forEach(function (relativePath:any, zipEntry:any) {  // Check each key in the Object read from ZIP
                    zip.files[relativePath].async("string").then(function (txt: string) {              // Get String with Promise.
                        if(isJsonString(txt)) {
                            var obj = JSON.parse(txt);
                            obj = obj['result'];

                            // turning the string into a JSON object
                            // to exclude the section labled 'rank' which we dont need

                            for (let i of obj) {
                                // requirement is only 9 fields of the 36 so we can selectively thake the 9 by
                                // the following mapping
                                var dict = {
                                    "courses_dept": i['Subject'],
                                    "courses_id": i['Course'],
                                    "courses_avg": i['Avg'],
                                    "courses_instructor": i['Professor'],
                                    "courses_title": i['Title'],
                                    "courses_pass": i['Pass'],
                                    "courses_fail": i['Fail'],
                                    "courses_audit": i['Audit'],
                                    "courses_uuid": i['id'].toString()
                                };

                                var dictstring = JSON.stringify(dict);// to be able to write it back on disk we will make it
                                // a string.
                                //console.log(dictstring);


                                try {                                                // Try to..
                                    // Write on disk.
                                    stream.write(dictstring + '\n');
                                    //fulfill(resp);
                                } catch (err) {                                       // In case of error
                                    console.log('1');                               // Log it.
                                    resp.code = 400;                                // Update with error code.
                                    resp.body = {err};                              // Update with error body.
                                    reject(resp);                                   // Return a rejected Promise.
                                }


                                //console.log(dict);
                            }
                        }
                        fulfill();
                        //console.log(obj['result']);
                    }).catch(function (err: string) {                           // If String can't be obtained,
                        console.log('2');                                       // Log it.
                        console.log(err);                                       // Log the error.
                        resp.code = 400;                                        // Update with error code.
                        resp.body = {err};                                      // Update with error body.
                        reject(resp);                                           // Return Rejected Promise.
                    })
                });
                fulfill(resp);                                                  // Finally, fulfill.
            }).catch(function (err: string) {                                   // If ZIP is not valid
                console.log('3');
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
