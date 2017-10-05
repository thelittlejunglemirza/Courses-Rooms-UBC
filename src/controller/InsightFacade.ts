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
        var resp: InsightResponse = {
            code: 0,
            body: {}
        }
        if (fs.existsSync("Data_Set/MyDatasetInsight"+id+".json")) {
            resp.code = 201;
            fs.unlink("Data_Set/MyDatasetInsight"+id+".json");
        }else{
            resp.code = 204;
        }

        var stream = fs.createWriteStream("Data_Set/MyDatasetInsight"+id+".json");
        stream.on('error', console.error);

        return new Promise(function (fulfill, reject) {
            JSZip.loadAsync(content, {base64: true}).then(function (zip: any) {
                Object.keys(zip.files).forEach(function (relativePath:any, zipEntry:any) {
                    zip.files[relativePath].async("string").then(function (txt: string) {

                        let obj = JSON.parse(txt);      // turning the string into a JSON object
                        obj = obj['result'];            // to exclude the section labled 'rank' which we dont need

                        for(let i of obj){
                            // requirement is only 9 fields of the 36 so we can selectively thake the 9 by
                            // the following mapping
                            var dict = {
                                "courses_dept" : i['Subject'],
                                "courses_id" : i['Course'],
                                "courses_avg" : i['Avg'],
                                "courses_instructor" : i['Professor'],
                                "courses_title" : i['Title'],
                                "courses_pass" : i['Pass'],
                                "courses_fail" : i['Fail'],
                                "courses_audit" : i['Audit'],
                                "courses_uuid" : i['id'].toString()
                            };

                            var dictstring = JSON.stringify(dict); // to be able to write it back on disk we will make it
                                                                    // a string.
                            try{
                                stream.write(dictstring + ';' +'\n');
                                //fulfill(resp);
                            }catch (err){
                                console.log('1');
                                resp.code = 400;
                                resp.body = {err};
                                reject(resp);
                            }

                            //console.log(dict);
                        }

                        //console.log(obj['result']);
                    }).catch(function (err: string) {
                        console.log('2');
                        console.log(err);
                        resp.code = 400;
                        resp.body = {err};
                        reject(resp);
                    })
                })
                fulfill(resp);
            }).catch(function (err: string) {
                console.log('3');
                resp.code = 400;
                resp.body = {err};
                reject(resp);
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
