const config = require('./ConfigReader');
serialport = require('./SerialPortConnection');
var result;
let regexp = /\d+(.\d+)?/g;

// Read data that is available but keep the stream in "paused mode"
serialport.port.on('readable', function () {
    console.log('Data:', serialport.port.read())
  })


  serialport.port.on('data', function (data) {
    //console.log('Data:', data)
    waitingData();
    result = data;
  })

  function waitingData(){
    var waitTill = new Date(new Date().getTime() + config.config.waitingDataWeight * 1000);
    while(waitTill > new Date()){}
  }


  const express = require("express");
  const app = express();

  // Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


  app.get('/weight', function (req, res) {
      res.send((result+"").match(regexp)[0]);
  });

  app.get('/init', function (req, res) {
    serialport.port.write(Buffer.from(config.config.serialport.messageInit))
    res.send("ready");
  });


  app.listen(config.config.server.port, () => {
   console.log(`El servidor está inicializado en el puerto ${config.config.server.port}`);
  });

