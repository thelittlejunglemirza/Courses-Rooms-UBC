
import InsightFacade from "../src/controller/InsightFacade"
import {InsightResponse} from "../src/controller/IInsightFacade";
import {expect} from 'chai';



describe("InsightSpec", function () {

    var insightFacade: InsightFacade = null;
    beforeEach(function () {
        insightFacade = new InsightFacade;

    });

    afterEach(function () {
        insightFacade = null;
    });

    it ("Just Test to access console log stuff in addDataset" , function () {
        this.timeout(10000);
        let fs   = require('fs');
        let data = fs.readFileSync('test/courses.zip');
        return insightFacade.addDataset("20", data.toString('base64')).then(function(insightResponse: InsightResponse){

        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch... the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
        })

    });


});