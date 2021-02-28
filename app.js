const config = require('./config.json');
clientSocket = require('./SocketConnection');
serialport = require('./SerialPortConnection');

// Read data that is available but keep the stream in "paused mode"
serialport.port.on('readable', function () {
    console.log('Data:', serialport.port.read())
  })
  
  // Switches the port into "flowing mode"
  serialport.port.on('data', function (data) {
    console.log('Data:', data)
    clientSocket.client.write(data);
  })

  function intervalFunc() {
    serialport.port.write(Buffer.from(config.serialport.messageInit))
  }
  
  setInterval(intervalFunc, config.schedule);

