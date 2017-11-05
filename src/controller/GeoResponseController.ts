import {GeoResponse} from "./IGeoFacade";

export class GeoResponseController {
    private response: GeoResponse = {};

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