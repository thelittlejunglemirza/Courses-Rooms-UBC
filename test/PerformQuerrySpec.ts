import InsightFacade from "../src/controller/InsightFacade"
import {InsightResponse} from "../src/controller/IInsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";



describe("PerformQuerrySpec", function () {

    let fs = require('fs');

    /*let rimraf = require('rimraf');
    rimraf('./Data_Set', function () {
        console.log('Data_Set reset.')
    });
    */

    var insightFacade: InsightFacade = null;
    beforeEach(function () {
        insightFacade = new InsightFacade;

    });

    afterEach(function () {
        insightFacade = null;
    });

    let data = fs.readFileSync('test/querry.txt');
    let obj = JSON.parse(data);
    let data2 = fs.readFileSync('test/querry2.txt');
    let obj2 = JSON.parse(data2);

    it.only ("test if perform querry gets to WHERE" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            //expect(insightResponse.code).to.deep.equal(204);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            //console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it.only ("test if perform querry gets to WHERE second time" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj2).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            //expect(insightResponse.code).to.deep.equal(204);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            //console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });
});