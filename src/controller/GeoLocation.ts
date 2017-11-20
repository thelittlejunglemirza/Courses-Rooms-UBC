import {GeoResponse} from "./IGeoFacade";

// let request = require('request');
let http = require('http');
let urlHeader = "http://skaha.cs.ubc.ca:11316/api/v1/team118/";

export default class GeoLocation{

    constructor(){

    }

    // Makes a valid URL using our team's provided API and a building address.
    static getURL (building_address: string): string {
        let encodedAddress = encodeURI(building_address).toString();
        return urlHeader + encodedAddress;
    }

    // HTTP Request (using GET); Returns a GeoResponse with
    // an error (on reject) or Lat/Lon (on fulfill).
    static getGeoCode(building_address: string): Promise<GeoResponse> {
        let that = this;
        return new Promise(function(fulfill, reject){
            let geoResponse: GeoResponse = {};
            geoResponse.address = building_address;
            let url = that.getURL(building_address);
            http.get(url, function(resp: any) {
                const { statusCode } = resp;
                let error;
                if (statusCode !== 200) {
                    error = new Error('Address not found (' + building_address + ')');
                }
                if (error) {
                    geoResponse.error = error.message;
                    resp.resume();
                    reject(geoResponse);
                    return;
                }
                resp.setEncoding('utf8');
                let rawData = '';
                resp.on('data', (chunk: any) => { rawData += chunk; });
                resp.on('end', () => {
                    try {
                        let parsedData = JSON.parse(rawData);
                        geoResponse.lat = parsedData["lat"];
                        geoResponse.lon = parsedData["lon"];
                        fulfill(geoResponse);
                        return;
                    } catch (e) {
                        console.error(e.message);
                        geoResponse.error = e.message;
                        reject(geoResponse);
                        return;
                    }
                });
            })
        })
    }
    /*
    static getGeoCodeAlt(building_address: string): Promise<GeoResponse>{
        let that = this;
        return new Promise(function(fulfill, reject){
            let geoResponse: GeoResponse = {};
            geoResponse.address = building_address;
            let url = that.getURL(building_address);
            request.get({
                url: url,
                headers: {
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
                }
            }, function (error: any, response: any, body: any) {
                let parsed = JSON.parse(body);
                if (parsed.error) {
                    geoResponse.error = parsed.error;
                    fulfill(geoResponse);
                    return;
                }
                else {
                    let parsed = JSON.parse(body);
                    geoResponse.lat = parsed["lat"];
                    geoResponse.lon = parsed["lon"];
                    fulfill(geoResponse);
                    return;
                }
            });
        });
    }
    */
}

