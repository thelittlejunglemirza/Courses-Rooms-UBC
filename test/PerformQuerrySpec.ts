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

    let data = fs.readFileSync('test/Queries/querry.txt');
    let obj = JSON.parse(data);
    let data2 = fs.readFileSync('test/Queries/querry2.txt');
    let obj2 = JSON.parse(data2);

    let data3_1 = fs.readFileSync('test/Queries/querry3.txt');
    let obj3_1 = JSON.parse(data3_1);

    let data3 = fs.readFileSync('test/Queries/query3.txt');
    let obj3 = JSON.parse(data3);
    let data4 = fs.readFileSync('test/Queries/query4.txt');
    let obj4 = JSON.parse(data4);
    let data5 = fs.readFileSync('test/Queries/query5.txt');
    let obj5 = JSON.parse(data5);
    let data6 = fs.readFileSync('test/Queries/query6.txt');
    let obj6 = JSON.parse(data6);
    let data7 = fs.readFileSync('test/Queries/query7.txt');
    let obj7 = JSON.parse(data7);
    let data8 = fs.readFileSync('test/Queries/query8.txt');
    let obj8 = JSON.parse(data8);
    let data9 = fs.readFileSync('test/Queries/query9.txt');
    let obj9 = JSON.parse(data9);
    let data10 = fs.readFileSync('test/Queries/query10.txt');
    let obj10 = JSON.parse(data10);
    let data11 = fs.readFileSync('test/Queries/query11.txt');
    let obj11 = JSON.parse(data11);
    let data12 = fs.readFileSync('test/Queries/query12.txt');
    let obj12 = JSON.parse(data12);
    let data13 = fs.readFileSync('test/Queries/query13.txt');
    let obj13 = JSON.parse(data13);
    let data14 = fs.readFileSync('test/Queries/query14.txt');
    let obj14 = JSON.parse(data14);
    let data15 = fs.readFileSync('test/Queries/query15.txt');
    let obj15 = JSON.parse(data15);
    let data16 = fs.readFileSync('test/Queries/query16.txt');
    let obj16 = JSON.parse(data16);







    it("test if perform query gets to WHERE" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj).then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
            expect(insightResponse.body).to.deep.equal({"result":[{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"110","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"121","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"210","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"213","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"221","courses_dept":"cpsc"},{"courses_id":"259","courses_dept":"cpsc"},{"courses_id":"259","courses_dept":"cpsc"},{"courses_id":"259","courses_dept":"cpsc"},{"courses_id":"259","courses_dept":"cpsc"},{"courses_id":"259","courses_dept":"cpsc"},{"courses_id":"259","courses_dept":"cpsc"},{"courses_id":"259","courses_dept":"cpsc"},{"courses_id":"259","courses_dept":"cpsc"},{"courses_id":"259","courses_dept":"cpsc"},{"courses_id":"259","courses_dept":"cpsc"},{"courses_id":"261","courses_dept":"cpsc"},{"courses_id":"261","courses_dept":"cpsc"},{"courses_id":"261","courses_dept":"cpsc"},{"courses_id":"261","courses_dept":"cpsc"},{"courses_id":"261","courses_dept":"cpsc"},{"courses_id":"261","courses_dept":"cpsc"},{"courses_id":"261","courses_dept":"cpsc"},{"courses_id":"261","courses_dept":"cpsc"},{"courses_id":"301","courses_dept":"cpsc"},{"courses_id":"301","courses_dept":"cpsc"},{"courses_id":"301","courses_dept":"cpsc"},{"courses_id":"301","courses_dept":"cpsc"},{"courses_id":"301","courses_dept":"cpsc"},{"courses_id":"301","courses_dept":"cpsc"},{"courses_id":"301","courses_dept":"cpsc"},{"courses_id":"301","courses_dept":"cpsc"},{"courses_id":"301","courses_dept":"cpsc"},{"courses_id":"301","courses_dept":"cpsc"},{"courses_id":"301","courses_dept":"cpsc"},{"courses_id":"301","courses_dept":"cpsc"},{"courses_id":"301","courses_dept":"cpsc"},{"courses_id":"301","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"302","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"303","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"304","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"310","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"311","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"312","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"313","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"314","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"317","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"319","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"320","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"322","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"340","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"344","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"404","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"410","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"411","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"415","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"416","courses_dept":"cpsc"},{"courses_id":"418","courses_dept":"cpsc"},{"courses_id":"418","courses_dept":"cpsc"},{"courses_id":"418","courses_dept":"cpsc"},{"courses_id":"418","courses_dept":"cpsc"},{"courses_id":"418","courses_dept":"cpsc"},{"courses_id":"418","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"420","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"421","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"422","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"425","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"430","courses_dept":"cpsc"},{"courses_id":"444","courses_dept":"cpsc"},{"courses_id":"444","courses_dept":"cpsc"},{"courses_id":"444","courses_dept":"cpsc"},{"courses_id":"444","courses_dept":"cpsc"},{"courses_id":"444","courses_dept":"cpsc"},{"courses_id":"444","courses_dept":"cpsc"},{"courses_id":"444","courses_dept":"cpsc"},{"courses_id":"444","courses_dept":"cpsc"},{"courses_id":"444","courses_dept":"cpsc"},{"courses_id":"444","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"445","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"449","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"490","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"500","courses_dept":"cpsc"},{"courses_id":"501","courses_dept":"cpsc"},{"courses_id":"501","courses_dept":"cpsc"},{"courses_id":"501","courses_dept":"cpsc"},{"courses_id":"501","courses_dept":"cpsc"},{"courses_id":"501","courses_dept":"cpsc"},{"courses_id":"501","courses_dept":"cpsc"},{"courses_id":"501","courses_dept":"cpsc"},{"courses_id":"501","courses_dept":"cpsc"},{"courses_id":"501","courses_dept":"cpsc"},{"courses_id":"501","courses_dept":"cpsc"},{"courses_id":"501","courses_dept":"cpsc"},{"courses_id":"501","courses_dept":"cpsc"},{"courses_id":"502","courses_dept":"cpsc"},{"courses_id":"502","courses_dept":"cpsc"},{"courses_id":"502","courses_dept":"cpsc"},{"courses_id":"502","courses_dept":"cpsc"},{"courses_id":"502","courses_dept":"cpsc"},{"courses_id":"502","courses_dept":"cpsc"},{"courses_id":"502","courses_dept":"cpsc"},{"courses_id":"502","courses_dept":"cpsc"},{"courses_id":"502","courses_dept":"cpsc"},{"courses_id":"502","courses_dept":"cpsc"},{"courses_id":"502","courses_dept":"cpsc"},{"courses_id":"502","courses_dept":"cpsc"},{"courses_id":"502","courses_dept":"cpsc"},{"courses_id":"502","courses_dept":"cpsc"},{"courses_id":"503","courses_dept":"cpsc"},{"courses_id":"503","courses_dept":"cpsc"},{"courses_id":"503","courses_dept":"cpsc"},{"courses_id":"503","courses_dept":"cpsc"},{"courses_id":"503","courses_dept":"cpsc"},{"courses_id":"503","courses_dept":"cpsc"},{"courses_id":"503","courses_dept":"cpsc"},{"courses_id":"503","courses_dept":"cpsc"},{"courses_id":"503","courses_dept":"cpsc"},{"courses_id":"503","courses_dept":"cpsc"},{"courses_id":"503","courses_dept":"cpsc"},{"courses_id":"503","courses_dept":"cpsc"},{"courses_id":"507","courses_dept":"cpsc"},{"courses_id":"507","courses_dept":"cpsc"},{"courses_id":"507","courses_dept":"cpsc"},{"courses_id":"507","courses_dept":"cpsc"},{"courses_id":"507","courses_dept":"cpsc"},{"courses_id":"507","courses_dept":"cpsc"},{"courses_id":"507","courses_dept":"cpsc"},{"courses_id":"507","courses_dept":"cpsc"},{"courses_id":"507","courses_dept":"cpsc"},{"courses_id":"507","courses_dept":"cpsc"},{"courses_id":"509","courses_dept":"cpsc"},{"courses_id":"509","courses_dept":"cpsc"},{"courses_id":"509","courses_dept":"cpsc"},{"courses_id":"509","courses_dept":"cpsc"},{"courses_id":"509","courses_dept":"cpsc"},{"courses_id":"509","courses_dept":"cpsc"},{"courses_id":"509","courses_dept":"cpsc"},{"courses_id":"509","courses_dept":"cpsc"},{"courses_id":"509","courses_dept":"cpsc"},{"courses_id":"509","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"513","courses_dept":"cpsc"},{"courses_id":"515","courses_dept":"cpsc"},{"courses_id":"515","courses_dept":"cpsc"},{"courses_id":"515","courses_dept":"cpsc"},{"courses_id":"515","courses_dept":"cpsc"},{"courses_id":"515","courses_dept":"cpsc"},{"courses_id":"515","courses_dept":"cpsc"},{"courses_id":"521","courses_dept":"cpsc"},{"courses_id":"521","courses_dept":"cpsc"},{"courses_id":"521","courses_dept":"cpsc"},{"courses_id":"521","courses_dept":"cpsc"},{"courses_id":"521","courses_dept":"cpsc"},{"courses_id":"521","courses_dept":"cpsc"},{"courses_id":"521","courses_dept":"cpsc"},{"courses_id":"521","courses_dept":"cpsc"},{"courses_id":"521","courses_dept":"cpsc"},{"courses_id":"521","courses_dept":"cpsc"},{"courses_id":"521","courses_dept":"cpsc"},{"courses_id":"521","courses_dept":"cpsc"},{"courses_id":"521","courses_dept":"cpsc"},{"courses_id":"521","courses_dept":"cpsc"},{"courses_id":"522","courses_dept":"cpsc"},{"courses_id":"522","courses_dept":"cpsc"},{"courses_id":"522","courses_dept":"cpsc"},{"courses_id":"522","courses_dept":"cpsc"},{"courses_id":"522","courses_dept":"cpsc"},{"courses_id":"522","courses_dept":"cpsc"},{"courses_id":"522","courses_dept":"cpsc"},{"courses_id":"522","courses_dept":"cpsc"},{"courses_id":"527","courses_dept":"cpsc"},{"courses_id":"527","courses_dept":"cpsc"},{"courses_id":"527","courses_dept":"cpsc"},{"courses_id":"527","courses_dept":"cpsc"},{"courses_id":"527","courses_dept":"cpsc"},{"courses_id":"527","courses_dept":"cpsc"},{"courses_id":"527","courses_dept":"cpsc"},{"courses_id":"527","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"540","courses_dept":"cpsc"},{"courses_id":"543","courses_dept":"cpsc"},{"courses_id":"543","courses_dept":"cpsc"},{"courses_id":"543","courses_dept":"cpsc"},{"courses_id":"543","courses_dept":"cpsc"},{"courses_id":"543","courses_dept":"cpsc"},{"courses_id":"543","courses_dept":"cpsc"},{"courses_id":"543","courses_dept":"cpsc"},{"courses_id":"543","courses_dept":"cpsc"},{"courses_id":"543","courses_dept":"cpsc"},{"courses_id":"543","courses_dept":"cpsc"},{"courses_id":"543","courses_dept":"cpsc"},{"courses_id":"543","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"544","courses_dept":"cpsc"},{"courses_id":"547","courses_dept":"cpsc"},{"courses_id":"547","courses_dept":"cpsc"},{"courses_id":"547","courses_dept":"cpsc"},{"courses_id":"547","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"},{"courses_id":"589","courses_dept":"cpsc"}]})
            //expect(insightResponse.body)
            }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            //console.log("the promise returned by PQ rejected by the error body: " + insightResponse.code);
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
            //console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });


    it("test if perform query all courses with same department" , function () {
        this.timeout(10000);
        return insightFacade.performQuery(obj3_1).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            //console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });


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
            //console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("Find all sections of a (single) wildcard course_id." , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj6).then(function(insightResponse: InsightResponse){
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });



    it("Find all sections for an instructor." , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj7).then(function(insightResponse: InsightResponse){
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("Find all sections for a department." , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj8).then(function(insightResponse: InsightResponse){
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
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

    it("test if perform query to check for a set of specific instructor" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj11).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            //console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("test if perform query to check for a set of specific instructor" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj12).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            //console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("test if perform query to check for a set of specific instructor" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj13).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            //console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("Erroneous Query Key, Invalid Order" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj14).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key, Empty Columns" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj15).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key, Invalid Options" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj16).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("test if perform query to check for EQ" , function () {
        this.timeout(10000);
        let data17 = fs.readFileSync('test/Queries/query17.txt');
        let obj17 = JSON.parse(data17);
        return insightFacade.performQuery(obj17).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            //console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("Erroneous Query Key, bad EQ" , function () {
        this.timeout(10000);
        let data18 = fs.readFileSync('test/Queries/query18.txt');
        let obj18 = JSON.parse(data18);
        return insightFacade.performQuery(obj18).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key, Invalid Options" , function () {
        this.timeout(10000);
        let data19 = fs.readFileSync('test/Queries/query19.txt');
        let obj19 = JSON.parse(data19);
        return insightFacade.performQuery(obj19).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key, bad AND" , function () {
        this.timeout(10000);
        let data20 = fs.readFileSync('test/Queries/query20.txt');
        let obj20 = JSON.parse(data20);
        return insightFacade.performQuery(obj20).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key, no WHERE" , function () {
        this.timeout(10000);
        let data21 = fs.readFileSync('test/Queries/query21.txt');
        let obj21 = JSON.parse(data21);
        return insightFacade.performQuery(obj21).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key, empty NOT" , function () {
        this.timeout(10000);
        let data22 = fs.readFileSync('test/Queries/query22.txt');
        let obj22 = JSON.parse(data22);
        return insightFacade.performQuery(obj22).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key, empty NOT" , function () {
        this.timeout(10000);
        let data22 = fs.readFileSync('test/Queries/query22.txt');
        let obj22 = JSON.parse(data22);
        return insightFacade.performQuery(obj22).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key, Invalid IS" , function () {
        this.timeout(10000);
        let data23 = fs.readFileSync('test/Queries/query23.txt');
        let obj23 = JSON.parse(data23);
        return insightFacade.performQuery(obj23).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key, Invalid LT" , function () {
        this.timeout(10000);
        let data24 = fs.readFileSync('test/Queries/query24.txt');
        let obj24 = JSON.parse(data24);
        return insightFacade.performQuery(obj24).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key, Invalid GT" , function () {
        this.timeout(10000);
        let data25 = fs.readFileSync('test/Queries/query25.txt');
        let obj25 = JSON.parse(data25);
        return insightFacade.performQuery(obj25).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("Erroneous Query Key, Invalid COLUMNS" , function () {
        this.timeout(10000);
        let data26 = fs.readFileSync('test/Queries/queryForInvalidColumn.txt');
        let obj26 = JSON.parse(data26);
        return insightFacade.performQuery(obj26).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("Erroneous Query Key, Empty WHERE" , function () {
        this.timeout(10000);
        let data26 = fs.readFileSync('test/Queries/query26.txt');
        let obj26 = JSON.parse(data26);
        return insightFacade.performQuery(obj26).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("Erroneous Query Key, Empty IS" , function () {
        this.timeout(10000);
        let data27 = fs.readFileSync('test/Queries/query27.txt');
        let obj27 = JSON.parse(data27);
        return insightFacade.performQuery(obj27).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("Invalidated Query", function () {
        this.timeout(10000);
        let data28 = fs.readFileSync('test/Queries/query28.txt');
        let obj28 = JSON.parse(data28);
        return insightFacade.performQuery(obj28).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("Invalid IS type", function () {
        this.timeout(10000);
        let data29 = fs.readFileSync('test/Queries/query29.txt');
        let obj29 = JSON.parse(data29);
        return insightFacade.performQuery(obj29).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("Invalid GT type", function () {
        this.timeout(10000);
        let data30 = fs.readFileSync('test/Queries/query30.txt');
        let obj30 = JSON.parse(data30);
        return insightFacade.performQuery(obj30).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("Invalid LT type", function () {
        this.timeout(10000);
        let data31 = fs.readFileSync('test/Queries/query31.txt');
        let obj31 = JSON.parse(data31);
        return insightFacade.performQuery(obj31).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("Invalid EQ type", function () {
        this.timeout(10000);
        let data32 = fs.readFileSync('test/Queries/query32.txt');
        let obj32 = JSON.parse(data32);
        return insightFacade.performQuery(obj32).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("Invalid key", function () {
        this.timeout(10000);
        let data33 = fs.readFileSync('test/Queries/query33.txt');
        let obj33 = JSON.parse(data33);
        return insightFacade.performQuery(obj33).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it ("removing a dataset" , function () {
        this.timeout(20000);
        return insightFacade.removeDataset("courses").then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(204);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("Erroneous PQ, no dataset" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj15).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(424);
        })

    });


});