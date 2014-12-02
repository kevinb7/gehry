function deconstruct(root) {
    if (root === null || root === undefined) {
        return null;
    }
    var originalObjects = [];
    var descontructedObjects = [];
    var index = 0;
    var traverse = function (obj) {
        var result = Object.create(null);
        if (originalObjects.indexOf(obj) === -1) {
            originalObjects[index] = obj;
            descontructedObjects[index] = result;
            index++;
        }
        return Object.keys(obj).reduce(function (acc, key) {
            var val = obj[key];
            if (typeof (val) === "object") {
                if (originalObjects.indexOf(val) === -1) {
                    traverse(val);
                }
                acc[key] = {
                    id: originalObjects.indexOf(val),
                    isArray: val instanceof Array
                };
            }
            else if (typeof (val) === "function") {
                acc[key] = "[function]";
            }
            else {
                acc[key] = val;
            }
            return acc;
        }, result);
    };
    traverse(root);
    return descontructedObjects;
}
exports.deconstruct = deconstruct;
function reconstruct(descontructedObjects) {
    if (descontructedObjects === null || descontructedObjects === undefined) {
        return null;
    }
    var originalObjects = [];
    var recurse = function (obj, id, isArray) {
        var result = isArray ? [] : Object.create(null);
        originalObjects[id] = result;
        return Object.keys(obj).reduce(function (acc, key) {
            var val = obj[key];
            if (typeof (val) === "object") {
                var id = val.id;
                var isArray = val.isArray;
                acc[key] = originalObjects[id] || recurse(descontructedObjects[id], id, isArray);
            }
            else {
                acc[key] = val;
            }
            return acc;
        }, result);
    };
    return recurse(descontructedObjects[0], 0);
}
exports.reconstruct = reconstruct;
