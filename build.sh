#!/bin/bash
./node_modules/.bin/tsc src/gehry.ts --target ES5 --module commonjs --outDir lib --declaration --outDir lib --removeComments &&
mkdir -p dist &&
./node_modules/.bin/browserify lib/gehry.js --standalone gehry --outfile dist/gehry.js
