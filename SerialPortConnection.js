const config = require('./ConfigReader');
const SerialPort = require('serialport')

const port = new SerialPort(config.config.serialport.port, 
                                    { autoOpen: false, 
                                      baudRate : config.config.serialport.baudRate, 
                                      dataBits : config.config.serialport.dataBits }).setEncoding('utf8');
port.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }

  port.write(Buffer.from(config.config.serialport.messageInit))
})

exports.port = port;