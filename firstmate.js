var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
var os = require('os');
var sensorLib = require("node-dht-sensor");
var sensorResult = sensorLib.read(22, 12);
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var Zone1 = new Gpio(4, 'out'); //use GPIO pin 4 as output
var Zone2 = new Gpio(17, 'out'); //use GPIO pin 17 as output
var Zone3 = new Gpio(27, 'out'); //use GPIO pin 27 as output
var Zone4 = new Gpio(22, 'out'); //use GPIO pin 22 as output

// Output OS Stats
pistats();
// Initialize GPIO relays to off
init_GPIO(0);

console.log("Starting Web Server");
var server = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;

    switch(path){
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('Enter "/appname.html" to Enter Function on this server');
            response.end();
            break;
        case '/firstmate.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                    response.end();
                }
                else{
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            response.end();
            break;
    }
});

server.listen(8001);
console.log("Listening on 8001");

io.listen(server);
console.log("socket.io started");

var listener = io.listen(server);

// socket.io 

listener.sockets.on('connection', function(socket){
//send data to client
  console.log('New client has connected'+socket);
  // Read the current Zone Switch Values from Hardware 
  var boxvalue = Zone1.readSync()
  socket.emit('Zone1init', {'Zone1init': boxvalue});
  console.log('Zone1 Init Status: '+ boxvalue);
  
  var boxvalue = Zone2.readSync();
  socket.emit('Zone2init', {'Zone2init': boxvalue});
  console.log('Zone2 Init Status: '+ boxvalue);
  
  var boxvalue = Zone3.readSync();
  socket.emit('Zone3init', {'Zone3init': Zone3.boxvalue});
  console.log('Zone3 Init Status: '+ boxvalue);
  
  var boxvalue = Zone4.readSync();
  socket.emit('Zone4init', {'Zone4init': boxvalue});
  console.log('Zone4 Iniit Status: '+ boxvalue);


  setInterval(function(){
    var sensorResult = sensorLib.read(22, 12);
    var ftemp = sensorResult.temperature*9/5+32;
    var humidity = sensorResult.humidity
    socket.emit('temp', {'temp': ftemp.toFixed(2)});
    socket.emit('humidity', {'humidity': humidity.toFixed(2)});
    socket.emit('date', {'date': new Date()});
    var boxvalue = Zone1.readSync()
    socket.emit('Zone1init', {'Zone1init': boxvalue});
   },5000);


  //recieve client data
  socket.on('client_data', function(stuff){
  process.stdout.write(stuff.letter);
          console.log('obj', stuff);
          console.log('.toString', stuff.toString());
          console.log('String()', String(stuff));
          console.log('JSON.stringify',JSON.stringify(stuff));
  });
  socket.on('Zone1', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone1");
    if (boxvalue != Zone1.readSync()) { //only change LED if status has changed
      Zone1.writeSync(boxvalue); //turn LED on or off
    }
  });
  socket.on('Zone2', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone2");
    if (boxvalue != Zone2.readSync()) { //only change LED if status has changed
      Zone2.writeSync(boxvalue); //turn LED on or off
    }
  });
  socket.on('Zone3', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone3");
    if (boxvalue != Zone3.readSync()) { //only change LED if status has changed
      Zone3.writeSync(boxvalue); //turn LED on or off
    }
  });
  socket.on('Zone4', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone4");
    if (boxvalue != Zone4.readSync()) { //only change LED if status has changed
      Zone4.writeSync(boxvalue); //turn LED on or off
    }
  });
});

function pistats(){
  console.log('os.tmpdir:'+os.tmpdir());
  console.log('os.endianness:'+os.endianness());
  console.log('os.hostname:'+os.hostname());
  console.log('os.type:'+os.type());
  console.log('os.platform:'+os.platform());
  console.log('os.arch:'+os.arch());
  console.log('os.uptime:'+formatSeconds(os.uptime()));
  console.log('os.loadavg:'+os.loadavg());
  console.log('os.totalmem (MB):'+os.totalmem()/1000000);
  console.log('os.freemem (MB):'+os.freemem()/1000000);
  var cpus = os.cpus();
  console.log('# of CPUs:'+cpus.length);
  for (var i=0; i< cpus.length; i++){
    console.log('   CPU #'+i+' / '+cpus[i].model);
  }
  console.log('os.networkInterfaces:');
  var ifaces = os.networkInterfaces();
  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
      console.log("  "+ifname, iface.address);
    ++alias;
    });
  });
}

function formatSeconds(sec) {
     return [(sec / 3600), ((sec % 3600) / 60), ((sec % 3600) % 60)]
            .map(v => v < 10 ? "0" + parseInt(v) : parseInt(v))
            .filter((i, j) => i !== "00" || j > 0)
            .join(":");
}


function init_GPIO(init){
  var initval = init;
  Zone1.writeSync(initval);
  initval=Zone1.readSync();
  console.log("Zone1 Init: "+initval);
  Zone2.writeSync(initval);
  initval=Zone2.readSync();
  console.log("Zone2 Init: "+initval);
  Zone3.writeSync(initval);
  initval=Zone3.readSync();
  console.log("Zone3 Init: "+initval);
  Zone4.writeSync(initval);
  initval=Zone4.readSync();
  console.log("Zone4 Init: "+initval);
  console.log("---------------------");
}
