[![Build Status](https://travis-ci.org/kevinb7/gehry.svg)](https://travis-ci.org/kevinb7/gehry)

# gehry.js #

gehry.js is a micro library that converts decomposes (deconstructs) a hierarchical object into an array
of objects containing primitive properties only.  I can also reconstruct the original object and it preserves
circular references.

## Name ##

It's named after after the deconstructivist architect Frank Gehry.

## Features ##
- works with plain old javascript objects (and arrays)
- does **not** re-instantiate objects (but it may in the future)
- does preserve objects containing cycles

## Methods ##
- teleporter.flatten(obj): returns an array of flattened objects
- teleporter.unflatten(flattenedObjectsArray): returns a copy of the original object
