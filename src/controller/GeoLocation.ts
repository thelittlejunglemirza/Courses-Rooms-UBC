import {GeoResponse} from "./IGeoFacade";

let request = require('request');


export default class GeoLocation{

    constructor(){

    }

    static getGeoCode(building_address: string): Promise<GeoResponse>{
        return new Promise(function(fulfill, reject){
            let geoResponse: GeoResponse = {};
            geoResponse.address = building_address;
            let encodedAddress = encodeURI(building_address).toString();
            let url = "http://skaha.cs.ubc.ca:11316/api/v1/team118/" + encodedAddress;
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

}

