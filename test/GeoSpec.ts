import GeoFacade from "../src/controller/GeoLocation";
import {GeoResponse} from "../src/controller/IGeoFacade";
import {expect} from 'chai';
import Log from "../src/Util";

describe ("GeoSpec", function(){

    let geoFacade: GeoFacade = null;
    beforeEach(function () {
        geoFacade = new GeoFacade;

    });

    afterEach(function () {
        geoFacade = null;
    });
    /*
    let room0 = {"rooms_address": "6363 Agronomy Road", "rooms_name": "ORCH_4074"};
    let room1 = {"rooms_address": "6245 Agronomy Road V6T 1Z4", "rooms_name": "DMP_310"};
    let room2 = {"rooms_name": "DMP_101"};
    let room3 = {"rooms_address": "6245 Agronomy Road V6T 1Z"};
    let room4 = {};
    let roomset0 = {room0};                         // Single valid
    let roomset1 = {room0, room1};                  // Valid
    let roomset2 = {room0, room1, room2};           // No address in 2
    let roomset3 = {room0, room1, room3};           // Invalid address in 3
    let roomset4 = {room0, room1, room2, room3};    // 2 and 3 erroneous
    let roomset5 = {room2, room3, room4};           // All erroneous


    it.skip ("Getting the GeoResp of a Room with an Address key." , function () {
        this.timeout(10000);
        return geoFacade.getLatLon(room0).then(function(resp: GeoResponse){
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

    it.skip("Getting the GeoResp of another room with an Address key." , function () {
        this.timeout(10000);
        return geoFacade.getLatLon(room1).then(function (resp: GeoResponse) {
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

    it.skip("Getting the GeoResp of an address-less room." , function () {
        this.timeout(10000);
        return geoFacade.getLatLon(room2).then(function (resp: GeoResponse) {
            Log.test("Lat : " + resp.lat);
            Log.test("Lon : " + resp.lon);
            expect.fail();
        }).catch(function (err: GeoResponse) {
            Log.test("Error : " + err.error);
            expect(err.lat).to.deep.equal(undefined);
            expect(err.lon).to.deep.equal(undefined);
            expect(err.error).to.deep.equal("Address not found (undefined)");
        });
    });

    it.skip("Getting the GeoResp of a room with an invalid address." , function () {
        this.timeout(10000);
        return geoFacade.getLatLon(room3).then(function (resp: GeoResponse) {
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

    it.skip("Getting the GeoResp of an empty roomset." , function () {
        this.timeout(10000);
        return geoFacade.getLatLon(room4).then(function (resp: GeoResponse) {
            Log.test("Lat : " + resp.lat);
            Log.test("Lon : " + resp.lon);
            expect.fail();
        }).catch(function (err: GeoResponse) {
            Log.test("Error : " + err.error);
            expect(err.lat).to.deep.equal(undefined);
            expect(err.lon).to.deep.equal(undefined);
            expect(err.error).to.deep.equal("Address not found (undefined)");
        });
    });
    */
});