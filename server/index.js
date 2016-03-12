import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import multer from 'multer';
import uuid from 'node-uuid';
import request from 'request';
import _ from 'lodash';
import util from 'util';

const storage = multer.memoryStorage();
const uploadr = multer({storage: storage});

const app = express();
app.use(require('express-chrome-logger'));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../.pub'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT, process.env.IP, () => {
  console.log('[LISTENING] - port:', process.env.PORT, 'ip:', process.env.IP);
});

// -------------------------------------------------------------------------- //
// -------------------------------------------------------------------------- //
// -------------------------------------------------------------------------- //

app.get('/hello', function(req, res){
  res.console.log('SERVER: Logging...');
  res.console.log('SERVER: ' + parse(req.headers));
  res.send('world');
});

// -------------------------------------------------------------------------- //
// -------------------------------------------------------------------------- //
// -------------------------------------------------------------------------- //

app.all('/proxy', function(req, res){
    var o = {
      uri: req.query.url,
      method: req.method,
      json: true,
    };

    if(Object.keys(req.body).length){
      o.body = req.body;
    }

    console.log('request to NodeRED:', o);
    request(o, function(e, r, b){
      console.log('response from NodeRED:', b);
      res.send({error: e, status: r.statusCode, request: o, response: b});
    });
});

// -------------------------------------------------------------------------- //
// -------------------------------------------------------------------------- //
// -------------------------------------------------------------------------- //

function parse(obj){
  return util.inspect(obj, { showHidden: true, depth: null });
}

// -------------------------------------------------------------------------- //
// -------------------------------------------------------------------------- //
// -------------------------------------------------------------------------- //
