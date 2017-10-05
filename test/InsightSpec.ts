
import InsightFacade from "../src/controller/InsightFacade"
import {InsightResponse} from "../src/controller/IInsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";



describe("InsightSpec", function () {

    var insightFacade: InsightFacade = null;
    beforeEach(function () {
        insightFacade = new InsightFacade;

    });

    afterEach(function () {
        insightFacade = null;
    });

    it ("adding the dataset for the first time to make sure that it creates the json file with code 204" , function () {
        this.timeout(10000);
        let fs   = require('fs');
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
        let fs   = require('fs');
        let data = fs.readFileSync('test/courses.zip');
        return insightFacade.addDataset("20", data.toString('base64')).then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(201);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch... the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });


});