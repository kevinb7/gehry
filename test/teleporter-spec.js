/*global describe, it, beforeEach, afterEach */

describe("teleporter.js", function () {
    it("should work on hierarchical objects", function () {
        var flat = teleporter.flatten({
            x: 5,
            y: 10,
            sub: {
                p: 0,
                q: 1
            },
            flag: true,
            msg: "hello"
        });

        var obj = teleporter.unflatten(flat);

        expect(obj.x).to.be(5);
        expect(obj.y).to.be(10);
        expect(obj.sub.p).to.be(0);
        expect(obj.sub.q).to.be(1);
        expect(obj.flag).to.be(true);
        expect(obj.msg).to.be("hello");
    });

    it("should work on arrays", function () {
        var flat = teleporter.flatten({
            a: [1, 2, 3]
        });

        var obj = teleporter.unflatten(flat);

        expect(obj.a).to.be.an(Array);
        expect(obj.a).to.have.length(3);
        expect(obj.a[0]).to.be(1);
        expect(obj.a[1]).to.be(2);
        expect(obj.a[2]).to.be(3);
    });

    it("should work on objects with cycles", function () {
        var objA = {
            x: 5,
            y: 10
        };

        var objB = {
            p: 1,
            q: -1
        };

        objA.b = objB;
        objB.a = objA;

        var flatA = teleporter.flatten(objA);
        var unflatA = teleporter.unflatten(flatA);

        expect(unflatA.x).to.be(5);
        expect(unflatA.y).to.be(10);
        expect(unflatA.b.p).to.be(1);
        expect(unflatA.b.q).to.be(-1);
        expect(unflatA.b.a.x).to.be(5);
        expect(unflatA.b.a.y).to.be(10);

        expect(unflatA.b.a.b.a.b.a.b.a);
    });

    it("should work with objects that contain an 'id'", function () {
        var test = {
            test: { id: 0 }
        };

        var flatTest = teleporter.flatten(test);
        var unflatTest = teleporter.unflatten(flatTest);

        expect(unflatTest.test.id).to.be(0);
        expect(Object.keys(unflatTest)).to.have.length(1);
        expect(Object.keys(unflatTest.test)).to.have.length(1);
    });

    it("should handle being passed null/undefined", function () {
        expect(teleporter.unflatten(teleporter.flatten(undefined))).to.be(null);
        expect(teleporter.unflatten(teleporter.flatten(null))).to.be(null);
    });

    it("should handle empty objects", function () {
        var flat = teleporter.flatten({});
        var unflat = teleporter.unflatten(flat);
        expect(Object.keys(unflat)).to.have.length(0);
    });
});
