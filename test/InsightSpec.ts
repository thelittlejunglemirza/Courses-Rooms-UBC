

import {expect} from 'chai';
describe("InsightSpec", function () {


    it("just a test to make ", function () {
        return math.getJSON([]).then(function (value: Array<any>) {
            Log.test('Value: ' + value);
            expect(value).to.deep.equal([]);
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

});