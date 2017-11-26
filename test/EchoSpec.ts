/**
 * Created by rtholmes on 2016-10-31.
 */

import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import chai = require('chai');
import chaiHttp = require('chai-http');
import Response = ChaiHttp.Response;
import restify = require('restify');
let fs = require('fs');
describe("EchoSpec", function () {


    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }

    before(function () {
        Log.test('Before: ' + (<any>this).test.parent.title);
    });

    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);

    });

    after(function () {
        Log.test('After: ' + (<any>this).test.parent.title);
    });

    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });

    it("Should be able to echo", function () {
        let out = Server.performEcho('echo');
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(200);
        expect(out.body).to.deep.equal({message: 'echo...echo'});
    });

    it("Should be able to echo silence", function () {
        let out = Server.performEcho('');
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(200);
        expect(out.body).to.deep.equal({message: '...'});
    });

    it("Should be able to handle a missing echo message sensibly", function () {
        let out = Server.performEcho(undefined);
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(400);
        expect(out.body).to.deep.equal({error: 'Message not provided'});
    });

    it("Should be able to handle a null echo message sensibly", function () {
        let out = Server.performEcho(null);
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(400);
        expect(out.body).to.have.property('error');
        expect(out.body).to.deep.equal({error: 'Message not provided'});
    });


    it("Start server and stop it", function () {

        this.timeout(8000);
        chai.use(chaiHttp);
        let server = new Server(4321);
        let URL = "http://localhost:4321";

        return server.start().then(()=>{
            server.stop();
        });

    });


    it("addDataset Test", function () {

        this.timeout(8000);

        // Init
        chai.use(chaiHttp);
        let server = new Server(4321);
        let URL = "http://localhost:4321";
        // Test
        expect(server).to.not.equal(undefined);
        try {
            Server.echo((<restify.Request>{}), null, null);
            expect.fail()
        } catch (err) {
            expect(err.message).to.equal("Cannot read property 'json' of null");
        }

        return server.start().then(function (success: boolean) {
            return chai.request(URL)
                .put('/dataset/courses')
                .attach("body", fs.readFileSync("test/Datasets/courses.zip"), "courses.zip")
                .then(function (res: Response) {
                    Log.trace('rooms added successfully');
                })
                .catch(function (err) {
                    console.log(err);
                    expect.fail();
                });

        }).catch(function (err) {
            console.log(err);
            expect.fail()
        });

    });

    it("performQuery: send post request", function () {

        this.timeout(10000);

        // Init
        chai.use(chaiHttp);
        let server = new Server(4321);
        let URL = "http://localhost:4321";
        // Test
        expect(server).to.not.equal(undefined);
        try {
            Server.echo((<restify.Request>{}), null, null);
            expect.fail()
        } catch (err) {
            expect(err.message).to.equal("Cannot read property 'json' of null");
        }

        let query = fs.readFileSync("./test/Queries/aggQ1.txt");
        let queryJsonObject = JSON.parse(query);
        return chai.request(URL)
            .post('/query')
            .send(queryJsonObject)
            .then(function (res: Response) {
                Log.trace('performQuery happened correctly');
            })
            .catch(function (err) {
                console.log(err);
                //Log.trace('catch:');
                // some assertions
                expect.fail();
            });

    });


    it("removeDataset: send DELETE request", function () {


        // Init
        chai.use(chaiHttp);
        let server = new Server(4321);
        let URL = "http://localhost:4321";
        // Test
        expect(server).to.not.equal(undefined);
        try {
            Server.echo((<restify.Request>{}), null, null);
            expect.fail()
        } catch (err) {
            expect(err.message).to.equal("Cannot read property 'json' of null");
        }
        return chai.request(URL)
            .del('/dataset/courses')
            .then(function (res: Response) {
                Log.trace('removeDataset happened correctly');

            })
            .catch(function (err) {
                console.log(err);
                //Log.trace('catch:');
                // some assertions
                expect.fail();
            });


    });

});