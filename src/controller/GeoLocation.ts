import {GeoResponse} from "./IGeoFacade";

let request = require('request');
var chai = require('chai')
    , chaiHttp = require('chai-http');

chai.use(chaiHttp);


export default class GeoLocation{
    public lat: number;
    public lon: number;

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
                if (error) {
                    //console.log(error);
                    geoResponse.error = response.statusCode;
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



/*
import {IGeoFacade, GeoResponse} from "./IGeoFacade";
import {GeoResponseController} from "./GeoResponseController";
import {isUndefined} from "util";
import {Building} from "../AST/Building";
let http = require("http");

let fs = require('fs');

export default class GeoFacade implements IGeoFacade {


    // Object -> GeoResponse
    // Gets a response with Lat/Lon or an error
    getLatLon(building: Building): Promise<GeoResponse>{
        let resp: GeoResponseController = new GeoResponseController;
        return new Promise(function(fulfill, reject){
            let addr = building.address;
            let encodedAddress = encodeURI(addr).toString();
            let urlHead = "http://skaha.cs.ubc.ca:11316/api/v1/team118/";
            let url = urlHead + encodedAddress;
            console.log("The URL returned is:" + url);
            http.get(url, (res: any) => {
                let data = '';

                res.on('data', (chunk: any) => {
                    data += chunk;
                });

                res.on('end', () => {
                    //console.log(JSON.parse(data).explanation);
                    let json = JSON.parse(data);
                    if(isUndefined(json["error"])) {
                    resp.setAddress(addr);
                    resp.setLatitude(json["lat"]);
                    resp.setLongitude(json["lon"]);
                    fulfill(resp.getResponse());
                    return;
                    }

                    else {
                        console.log("error is in geoFacade")
                        resp.setError(json["error"]);
                        reject(resp.getResponse());
                        return;
                    }

                });
            }).on("error", (err:any) => {
                console.log("error is in geoFacade2")
                console.log("Error: " + err.message);
                resp.setError(err.message);
                reject(resp.getResponse());
                return;
            });
        })
    }

    // Room Object -> Number
    getLat (room: any){
        this.getLatLon(room).then(function (resp: any) {
            return resp.lat;
        }).catch(function (err:any){
            return 0;
        })
    }

    // Room Object -> Number
    getLon (room: any){
        this.getLatLon(room).then(function (resp: any) {
            return resp.lon;
        }).catch(function (err:any){
            return 0;
        })
    }

    // The String version of getLatLon; Assumes room_address is already grabbed.
    // String -> GeoResponse
    getLatLonAddr(roomaddr: string): Promise<GeoResponse>{
        let resp: GeoResponseController = new GeoResponseController;
        return new Promise(function(fulfill, reject){
            let encodedAddress = encodeURI(roomaddr).toString();
            let urlHead = "http://skaha.cs.ubc.ca:11316/api/v1/team118/"
            let url = urlHead + encodedAddress;
            console.log("The URL returned is:" + url);
            http.get(url, (res: any) => {
                let data = '';

                res.on('data', (chunk: any) => {
                    data += chunk;
                });

                res.on('end', () => {
                    console.log(JSON.parse(data).explanation);
                    let json = JSON.parse(data);
                    if(isUndefined(json["error"])) {
                        resp.setLatitude(json["lat"]);
                        resp.setLongitude(json["lon"]);
                        fulfill(resp.getResponse());
                    }
                    else {
                        resp.setError(json["error"]);
                        reject(resp.getResponse());
                    }
                });
            }).on("error", (err:any) => {
                console.log("Error: " + err.message);
                resp.setError(err.message);
                reject(resp.getResponse());
            });
        })
    }


    // Object -> Array<GeoResponse>
    queryLatLon(rooms: any): Promise<GeoResponse>{
        let respArr: any = [];
        return new Promise (function(fulfill, reject){
            let roomArr = rooms["result"];
            if(isUndefined(roomArr)) throw "Invalid Room Set";
            for (let room of roomArr){
                respArr.push(this.getLatLon(room));
            }
            Promise.all(respArr).then(function (geoArr){
                // TODO: <Insert Write method here>
            }).catch(function(err){
                reject(err);
            })
        })
    }

}
*/