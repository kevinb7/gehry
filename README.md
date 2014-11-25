[![Build Status](https://travis-ci.org/kevinb7/flatten.svg)](https://travis-ci.org/kevinb7/flatten)

# flatten #

micro library that converts hierarchical structures to a flat ones (and back) preserving circular references

## Features ##
- works with plain old javascript objects (and arrays)
- does **not** re-instantiate objects (but it may in the future)
- does preserve objects containing cycles

## Functions ##
- flatten(obj): returns an array of flattened objects
- unflatten(flattenedObjectsArray): returns a copy of the original object
