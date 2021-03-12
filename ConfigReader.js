const fs = require('fs');

let rawdata = fs.readFileSync('./config.json');
let config = JSON.parse(rawdata);

exports.config = config;
