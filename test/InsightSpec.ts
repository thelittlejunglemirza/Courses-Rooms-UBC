
import InsightFacade from "../src/controller/InsightFacade"
import {InsightResponse} from "../src/controller/IInsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";



describe("InsightSpec", function () {

    let fs   = require('fs');
    let rimraf = require('rimraf');
    rimraf('./Data_Set', function(){ console.log('Data_Set reset.')});

    var insightFacade: InsightFacade = null;
    beforeEach(function () {
        insightFacade = new InsightFacade;

    });

    afterEach(function () {
        insightFacade = null;
    });

    it ("adding the dataset for the first time to make sure that it creates the json file with code 204" , function () {
        this.timeout(10000);
        let data = fs.readFileSync('test/courses.zip');
        return insightFacade.addDataset("20", data.toString('base64')).then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(204);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch... the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it ("adding the dataset for the second time to make sure that it replaces the json file with code 201" , function () {
        this.timeout(10000);
        let data = fs.readFileSync('test/courses.zip');
        return insightFacade.addDataset("20", data.toString('base64')).then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(201);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch... the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it ("Adding a valid ZIP with no data at all should return an error code of 400." , function () {
        this.timeout(10000);
        let data = fs.readFileSync('test/nocourses.zip');
        return insightFacade.addDataset("20", data.toString('base64')).then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("Rejected with error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("Adding an invalid ZIP should return error code 400." , function () {
        this.timeout(10000);
        let data = fs.readFileSync('test/notazip');
        return insightFacade.addDataset("20", data.toString('base64')).then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("Rejected with error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("Adding a valid ZIP with invalid data should return error code 400." , function () {
        this.timeout(10000);
        let data = fs.readFileSync('test/invalid.zip');                             // 1 file, {] <- invalid JSON
        return insightFacade.addDataset("20", data.toString('base64')).then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("Rejected with error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

});