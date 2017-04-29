#!/bin/sh
watchify index-src.js --watch -o index.js -t [ babelify --presets [ es2015 react ] ]
