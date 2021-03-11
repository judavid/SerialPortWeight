var config = require('./config.json');
var net = require('net');
// creating a custom socket client and connecting it....
var client  = new net.Socket();
client.connect({
    host : "config.socket.host",
    port : "config.socket.port"
});

client.on('connect',function(){

  var address = client.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Client is listening at port' + port);
  console.log('Client ip :' + ipaddr);
  console.log('Client is IP4/IP6 : ' + family);
  // writing data to server
  client.write('');

});

client.setEncoding('utf8');

exports.client = client;