#!/bin/bash

rm -rf node_modules
npm install node-uuid lodash body-parser express morgan bluebird bluemix-object-storage multer request --save
npm install babel-cli babel-preset-es2015 babel-preset-stage-0 del gulp gulp-shell run-sequence mocha chai --save-dev
