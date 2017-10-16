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

    // let data3 = fs.readFileSync('test/querry3.txt');
    // let obj3 = JSON.parse(data3);

    let data3 = fs.readFileSync('test/query3.txt');
    let obj3 = JSON.parse(data3);
    let data4 = fs.readFileSync('test/query4.txt');
    let obj4 = JSON.parse(data4);
    let data5 = fs.readFileSync('test/query5.txt');
    let obj5 = JSON.parse(data5);
    let data6 = fs.readFileSync('test/query6.txt');
    let obj6 = JSON.parse(data6);
    let data7 = fs.readFileSync('test/query7.txt');
    let obj7 = JSON.parse(data7);
    let data8 = fs.readFileSync('test/query8.txt');
    let obj8 = JSON.parse(data8);
    let data9 = fs.readFileSync('test/query9.txt');
    let obj9 = JSON.parse(data9);
    let data10 = fs.readFileSync('test/query10.txt');
    let obj10 = JSON.parse(data10);



    it("test if perform query gets to WHERE" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj).then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by PQ rejected by the error body: " + insightResponse.code);
            expect.fail();
        })

    });
    it("test if perform query gets to WHERE second time" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj2).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    /*
    it("test if perform query all courses with same department" , function () {
        this.timeout(10000);
        return insightFacade.performQuery(obj3).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });
    */


    it("Empty AND returns an error code of 400." , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj3).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Empty OR returns an error code of 400." , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj4).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });


    it("Find all sections for a department or any class taught by an instructor. (Testing Wildcards in IS)" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj5).then(function(insightResponse: InsightResponse){
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("Find all sections of a (single) wildcard course_id." , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj6).then(function(insightResponse: InsightResponse){
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });



    it("Find all sections for an instructor." , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj7).then(function(insightResponse: InsightResponse){
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("Find all sections for a department." , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj8).then(function(insightResponse: InsightResponse){
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("Erroneous Query Logic" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj9).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj10).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });
});