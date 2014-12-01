var teleporter;
(function (teleporter) {
    function flatten(root) {
        if (root === null || root === undefined) {
            return null;
        }
        var originalObjects = [];
        var flattenedObjects = [];
        var index = 0;
        var traverse = function (obj) {
            var result = Object.create(null);
            if (originalObjects.indexOf(obj) === -1) {
                originalObjects[index] = obj;
                flattenedObjects[index] = result;
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
        return flattenedObjects;
    }
    teleporter.flatten = flatten;
    function unflatten(flattenedObjects) {
        if (flattenedObjects === null || flattenedObjects === undefined) {
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
                    acc[key] = originalObjects[id] || recurse(flattenedObjects[id], id, isArray);
                }
                else {
                    acc[key] = val;
                }
                return acc;
            }, result);
        };
        return recurse(flattenedObjects[0], 0);
    }
    teleporter.unflatten = unflatten;
})(teleporter || (teleporter = {}));
module.exports = teleporter;
