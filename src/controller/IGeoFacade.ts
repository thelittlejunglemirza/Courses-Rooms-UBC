export interface GeoResponse {
    address?: string;
    lat? : number;
    lon? : number;
    error? : string
}

export interface IGeoFacade {
    getLatLon(room: any): Promise<GeoResponse>;
    // queryLatLon(rooms: any): Promise<GeoResponse>;
}