import chai = require('chai');
import chaiHttp = require('chai-http');
import  {expect} from 'chai';
import InsightFacade from "../src/controller/InsightFacade";
import {InsightResponse} from "../src/controller/IInsightFacade";
import Server from "../src/rest/Server"

let fs   = require('fs');


describe("RestSpecs" , function () {

    let insFacade: InsightFacade = null;
    let server : Server = new Server(4321);
    chai.use(chaiHttp);

    before(function () {

        server.start();

    });

    after(function () {
        server.stop();
    });

    beforeEach(function () {
        insFacade = new InsightFacade();
    });

    afterEach(function () {
    });

    it("add Dataset rooms.zip", function () {
        this.timeout(10000);

        let file = "test/Datasets/rooms.zip";

        let fileContent = fs.readFileSync(file);
        return chai.request('http://127.0.0.1:4321').put('/dataset/rooms')
            .attach("body", fileContent,'rooms.zip')
            .then(function (res:any) {
                    console.log(res.status);
                }
            ).catch(function (res:any) {
                console.log("error");

            });

    });
    it("remove Dataset rooms.zip", function () {
        this.timeout(10000);

        return chai.request('http://127.0.0.1:4321').del('/dataset/rooms')
            .then(function (res:any) {
                    console.log(res.status);
                }
            ).catch(function (res:any) {
                console.log("error");

            });

    });


});