import {GeoResponse} from "./IGeoFacade";
import {stringify} from "querystring";

export class GeoResponseController {
    private response: GeoResponse = {};

    setAddress(address: string){
        this.response.address = address;
    }

    setLatitude(lat: number){
        this.response.lat = lat;
    }

    setLongitude(lon: number){
        this.response.lon = lon;
    }

    setError(err: string){
        this.response.error = err;
    }

    getResponse(): GeoResponse{
        return this.response;
    }

}