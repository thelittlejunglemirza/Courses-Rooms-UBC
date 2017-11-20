import GeoFacade from "../src/controller/GeoLocation";
import GeoLocation from "../src/controller/GeoLocation";
import {GeoResponse} from "../src/controller/IGeoFacade";
import {expect} from 'chai';
import Log from "../src/Util";

describe ("GeoSpec", function(){


    let room0 = {"rooms_address": "6363 Agronomy Road", "rooms_name": "ORCH_4074"};
    let room1 = {"rooms_address": "6245 Agronomy Road V6T 1Z4", "rooms_name": "DMP_310"};
    let room3 = {"rooms_address": "6245 Agronomy Road V6T 1Z"};


    it("Getting the GeoResp of a Room with an Address key." , function () {
        this.timeout(10000);
        return GeoLocation.getGeoCode(room0["rooms_address"]).then(function(resp: GeoResponse){
            Log.test("Lat : " + resp.lat);
            Log.test("Lon : " + resp.lon);
            expect(resp.lat).to.deep.equal(49.26048);
            expect(resp.lon).to.deep.equal(-123.24944);
            expect(resp.error).to.deep.equal(undefined);
        }).catch(function(err: GeoResponse){
            Log.test("Error : " + err.error);
            expect.fail();
        });
    });

    it("Getting the GeoResp of another room with an Address key." , function () {
        this.timeout(10000);
        return GeoLocation.getGeoCode(room1["rooms_address"]).then(function (resp: GeoResponse) {
            Log.test("Lat : " + resp.lat);
            Log.test("Lon : " + resp.lon);
            expect(resp.lat).to.deep.equal(49.26125);
            expect(resp.lon).to.deep.equal(-123.24807);
            expect(resp.error).to.deep.equal(undefined);
        }).catch(function (err: GeoResponse) {
            Log.test("Error : " + err.error);
            expect.fail();
        });
    });

    it("Getting the GeoResp of another room with an Address key." , function () {
        this.timeout(10000);
        return GeoLocation.getGeoCode(room1["rooms_address"]).then(function (resp: GeoResponse) {
            Log.test("Lat : " + resp.lat);
            Log.test("Lon : " + resp.lon);
            expect(resp.lat).to.deep.equal(49.26125);
            expect(resp.lon).to.deep.equal(-123.24807);
            expect(resp.error).to.deep.equal(undefined);
        }).catch(function (err: GeoResponse) {
            Log.test("Error : " + err.error);
            expect.fail();
        });
    });

    it("Getting the GeoResp of an address-less room." , function () {
        this.timeout(10000);
        return GeoLocation.getGeoCode(null).then(function (resp: GeoResponse) {
            Log.test("Lat : " + resp.lat);
            Log.test("Lon : " + resp.lon);
            expect.fail();
        }).catch(function (err: GeoResponse) {
            Log.test("Error : " + err.error);
            expect(err.lat).to.deep.equal(undefined);
            expect(err.lon).to.deep.equal(undefined);
            expect(err.error).to.deep.equal("Address not found (null)");
        });
    });

    it("Getting the GeoResp of a room with an invalid address." , function () {
        this.timeout(10000);
        return GeoLocation.getGeoCode(room3["rooms_address"]).then(function (resp: GeoResponse) {
            Log.test("Lat : " + resp.lat);
            Log.test("Lon : " + resp.lon);
            expect.fail();
        }).catch(function (err: GeoResponse) {
            Log.test("Error : " + err.error);
            expect(err.lat).to.deep.equal(undefined);
            expect(err.lon).to.deep.equal(undefined);
            expect(err.error).to.deep.equal("Address not found (6245 Agronomy Road V6T 1Z)");
        });
    });
    //*/
});