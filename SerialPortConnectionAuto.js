const SerialPort = require('serialport')
const config = require('./config.json');

async function detectCOMPort(){
 SerialPort.list().then(p =>{
   runPort(p[0]);
 });
}


function runPort(portInfo){
    console.log(portInfo);

    if(portInfo == undefined)
      return;

    port = new SerialPort(portInfo.path, 
        { autoOpen: false, 
          baudRate : config.serialport.baudRate, 
          dataBits : config.serialport.dataBits }).setEncoding('utf8');
    port.open(function (err) {
      if (err) {
        return console.log('Error opening port: ', err.message)
      }
    
      // Because there's no callback to write, write errors will be emitted on the port:
      port.write(Buffer.from(config.serialport.messageInit))
    })
}

var port;
detectCOMPort();

exports.port = port;