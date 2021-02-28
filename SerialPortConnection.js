const config = require('./config.json');
const SerialPort = require('serialport')

const port = new SerialPort(config.serialport.port, 
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

exports.port = port;