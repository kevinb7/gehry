"use strict";

/**
 *  The purpose of flatten/unflatten is serialize objects containing
 *  cyclic references so that they can be ferried between execution
 *  contexts, e.g. iframes, web workers, other windows
 */

/**
 * Converts the root object to an array of smaller objects where
 * each object in the array contains properties that are either
 * basic data types or objects of the form { id: number } to
 * reference other objects/arrays in the original tree.
 *
 * @param {Object} root
 * @returns {Array}
 */
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

            if (typeof val === "object") {
                if (originalObjects.indexOf(val) === -1) {
                    traverse(val);
                }
                acc[key] = {
                    id: originalObjects.indexOf(val),
                    isArray: val instanceof Array
                };
            } else if (typeof val === "function") {
                acc[key] = "[function]";
            } else {
                acc[key] = val;
            }

            return acc;
        }, result);
    };

    traverse(root);
    return descontructedObjects;
}

/**
 * Converts an array produced by flatten back to an object with the
 * same structure and data as the original root object passed into
 * flatten.
 *
 * @param {Array} descontructedObjects
 */
function reconstruct(descontructedObjects) {
    if (descontructedObjects === null || descontructedObjects === undefined) {
        return null;
    }
    var originalObjects = [];

    var recurse = function (obj, id) {
        var isArray = arguments[2] === undefined ? false : arguments[2];
        var result = isArray ? [] : Object.create(null);
        originalObjects[id] = result;

        return Object.keys(obj).reduce(function (acc, key) {
            var val = obj[key];

            if (typeof val === "object") {
                var id = val.id;
                var isArray = val.isArray;
                acc[key] = originalObjects[id] || recurse(descontructedObjects[id], id, isArray);
            } else {
                acc[key] = val;
            }

            return acc;
        }, result);
    };

    return recurse(descontructedObjects[0], 0); // root object's id is always 0
}

exports.deconstruct = deconstruct;
exports.reconstruct = reconstruct;