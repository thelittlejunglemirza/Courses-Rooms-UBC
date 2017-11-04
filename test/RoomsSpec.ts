import InsightFacade from "../src/controller/InsightFacade"
import {InsightResponse} from "../src/controller/IInsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";

describe("InsightSpec", function () {

    let fs = require('fs');



    var insightFacade: InsightFacade = null;
    beforeEach(function () {
        insightFacade = new InsightFacade;

    });

    afterEach(function () {
        insightFacade = null;
    });

    /*
    it("removing a dataset when directory does not exist with code 404 will fail", function () {
        this.timeout(10000);
        return insightFacade.removeDataset("11").then(function (insightResponse: InsightResponse) {
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            console.log("and error body: " + insightResponse.body);
            expect(insightResponse.code).to.deep.equal(404);
        })

    });
    */

    it("add Rooms", function () {
        this.timeout(10000);
        let data = fs.readFileSync('test/Datasets/rooms.zip');
        return insightFacade.addDataset("rooms", data.toString('base64')).then(function (insightResponse: InsightResponse) {
            Log.test('Code: ' + insightResponse.code);
            //expect(insightResponse.code).to.deep.equal(204);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("test if perform query to check for EQ" , function () {
        this.timeout(10000);
        let data = fs.readFileSync('test/Queries/roomquery1.txt');
        let obj = JSON.parse(data);
        return insightFacade.performQuery(obj).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("test if perform query to check for EQ" , function () {
        this.timeout(10000);
        let data = fs.readFileSync('test/Queries/roomquery2.txt');
        let obj = JSON.parse(data);
        return insightFacade.performQuery(obj).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });
});