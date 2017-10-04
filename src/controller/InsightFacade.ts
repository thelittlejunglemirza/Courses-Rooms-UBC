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
            JSZip.loadAsync(content).then(function (zip: any) {
                zip.ForEach(function (relativePath:any, zipEntry:any) {  // 2) print entries
                    zip.file(relativePath).async("string")
                })
            }).catch(function (err: string) {
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
