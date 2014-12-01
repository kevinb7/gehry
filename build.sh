#!/bin/bash
./node_modules/.bin/tsc src/teleporter.ts --target ES5 --module commonjs --outDir lib --declaration --outDir lib --removeComments &&
mkdir -p dist &&
./node_modules/.bin/browserify lib/teleporter.js --standalone teleporter --outfile dist/teleporter.js
