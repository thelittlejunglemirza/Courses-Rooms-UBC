/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse} from "./IInsightFacade";

import Log from "../Util";
var JSZip = require("jszip");

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }


    addDataset(id: string, content: string): Promise<InsightResponse> {
        return new Promise(function (fulfill, reject) {
            JSZip.loadAsync(content, {base64: true}).then(function (zip: any) {
                Object.keys(zip.files).forEach(function (relativePath:any, zipEntry:any) {  // 2) print entries
                    zip.files[relativePath].async("string")
                .then(function (txt: string) {
                    console.log(txt);
                    fulfill();
                }).catch(function (err: string) {
                    reject(err);
                })
            })
            }).catch(function (err: string) {
                console.log(err);
                reject(err);
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
