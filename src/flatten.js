function flatten(root) {
    var originalObjects = [];
    var flattenedObjects = [];
    var index = 0;
    var traverse = function(obj) {
        var result = Object.create(null);

        if (originalObjects.indexOf(obj) === -1) {
            originalObjects[index] = obj;
            flattenedObjects[index] = result;

            index++;
        }

        return Object.keys(obj).reduce(function (acc, key) {
            var val = obj[key];

            if (typeof(val) === "object") {
                if (originalObjects.indexOf(val) === -1) {
                    traverse(val);
                }
                acc[key] = {
                    id: originalObjects.indexOf(val),
                    isArray: val instanceof Array
                };
            } else {
                acc[key] = val;
            }

            return acc;
        }, result);
    };

    traverse(root);
    return flattenedObjects;
}

function unflatten(flattenedObjects) {
    var originalObjects = [];

    var recurse = function (obj, id, isArray) {
        var result = isArray ? [] : Object.create(null);
        originalObjects[id] = result;

        return Object.keys(obj).reduce(function (acc, key) {
            var val = obj[key];

            if (typeof(val) === "object") {
                var id = val.id;
                var isArray = val.isArray;
                acc[key] = originalObjects[id] || recurse(flattenedObjects[id], id, isArray);
            } else {
                acc[key] = val;
            }

            return acc;
        }, result);
    };

    return recurse(flattenedObjects[0], 0);    // root object's id is always 0
}
