
import InsightFacade from "../src/controller/InsightFacade"
import {InsightResponse} from "../src/controller/IInsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";



describe("InsightSpec", function () {

    let fs   = require('fs');

    /*
    let rimraf = require('rimraf');
    rimraf('./Data_Set', function(){ console.log('Data_Set reset.')});
    */

    var insightFacade: InsightFacade = null;
    beforeEach(function () {
        insightFacade = new InsightFacade;

    });

    afterEach(function () {
        insightFacade = null;
    });

    it ("removing a dataset when directory does not exist with code 404 will fail" , function () {
        this.timeout(10000);
        return insightFacade.removeDataset("11").then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            console.log("and error body: " + insightResponse.body);
            expect(insightResponse.code).to.deep.equal(404);
        })

    });

    it ("adding the dataset for the first time to make sure that it creates the json file with code 204" , function () {
        this.timeout(10000);
        let data = fs.readFileSync('test/1.zip');
        return insightFacade.addDataset("courses", data.toString('base64')).then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(204);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it ("adding a dataset that is much shorter, expecting code 204" , function () {
        this.timeout(10000);
        let data = fs.readFileSync('test/2.zip');
        return insightFacade.addDataset("2", data.toString('base64')).then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(204);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it ("Adding a valid ZIP with no data at all should return an error code of 400." , function () {
        this.timeout(10000);
        let data = fs.readFileSync('test/nocourses.zip');
        return insightFacade.addDataset("10", data.toString('base64')).then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("Rejected with error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("adding a valid zip dataset that has no courses" , function () {
        this.timeout(10000);
        let data = fs.readFileSync('test/in1.zip');
        return insightFacade.addDataset("3", data.toString('base64')).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            console.log("and error body: " + insightResponse.body);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("this is a dataset added for the next test!" , function () {
        this.timeout(10000);
        let fs   = require('fs');
        let data = fs.readFileSync('test/1.zip');
        return insightFacade.addDataset("4", data.toString('base64')).then(function(insightResponse: InsightResponse){
            expect(insightResponse.code).to.deep.equal(204);
        }).catch(function (insightResponse: InsightResponse) {
            expect.fail();
        })

    });

    it ("adding a second dataset that is much longer, expecting code 201, and correct overwrite of existing dataset" , function () {
        this.timeout(10000);
        let fs   = require('fs');
        let data = fs.readFileSync('test/2.zip');
        return insightFacade.addDataset("4", data.toString('base64')).then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(201);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });


    it ("adding an invalid zip file should fail with error code 400" , function () {
        this.timeout(10000);
        let data = fs.readFileSync('test/notzip.rtf');
        return insightFacade.addDataset("5", data.toString('base64')).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            console.log("and error body: " + insightResponse.body);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("Adding an invalid ZIP should return error code 400." , function () {
        this.timeout(10000);
        let data = fs.readFileSync('test/notazip');
        return insightFacade.addDataset("6", data.toString('base64')).then(function(insightResponse: InsightResponse){
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
        return insightFacade.addDataset("7", data.toString('base64')).then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("Rejected with error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("removing a dataset that is previously added" , function () {
        this.timeout(20000);
        return insightFacade.removeDataset("4").then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(204);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it ("removing a dataset that does not exist, error code 404" , function () {
        this.timeout(10000);
        return insightFacade.removeDataset("4").then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            console.log("and error body: " + insightResponse.body);
            expect(insightResponse.code).to.deep.equal(404);
        })

    });

    it ("removing a dataset that is previously added ID 2" , function () {
        this.timeout(20000);
        return insightFacade.removeDataset("2").then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(204);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });


});