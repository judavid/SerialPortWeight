const config = require('./config.json');
serialport = require('./SerialPortConnection');
var result;

// Read data that is available but keep the stream in "paused mode"
serialport.port.on('readable', function () {
    console.log('Data:', serialport.port.read())
  })


  serialport.port.on('data', function (data) {
    console.log('Data:', data)
    waitingData();
    result = data;
  })

  function waitingData(){
    var waitTill = new Date(new Date().getTime() + config.waitingDataWeight * 1000);
    while(waitTill > new Date()){}
  }


  const express = require("express");
  const app = express();

  app.get('/weight', function (req, res) {
    res.send(result);
  });

  app.get('/init', function (req, res) {
    serialport.port.write(Buffer.from(config.serialport.messageInit))
    res.send("ready");
  });


  app.listen(config.server.port, () => {
   console.log(`El servidor está inicializado en el puerto ${config.server.port}`);
  });

