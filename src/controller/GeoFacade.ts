import {IGeoFacade, GeoResponse} from "./IGeoFacade";
import {GeoResponseController} from "./GeoResponseController";
import {isUndefined} from "util";
let http = require("http");

let fs = require('fs');

export default class GeoFacade implements IGeoFacade {

    // Object -> GeoResponse
    // Gets a response with Lat/Lon or an error
    getLatLon(room: any): Promise<GeoResponse>{
        let resp: GeoResponseController = new GeoResponseController;
        return new Promise(function(fulfill, reject){
            let addr = room["rooms_address"];
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

    /*
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
    */
}