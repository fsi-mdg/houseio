// declair global variables
  var http = require("http");
  var url = require('url');
  var fs = require('fs');
  var io = require('socket.io');
  var os = require('os');
  const { getSunrise, getSunset } = require('sunrise-sunset-js')
  var sensorLib = require("node-dht-sensor");
//  var sensorResult = sensorLib.read(11, 3);
  var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
  var Zone1 = new Gpio(4, 'out'); //use GPIO pin 4 as output
  var Zone2 = new Gpio(17, 'out'); //use GPIO pin 17 as output
  var Zone3 = new Gpio(27, 'out'); //use GPIO pin 27 as output
  var Zone4 = new Gpio(22, 'out'); //use GPIO pin 22 as output
  var Zone5 = new Gpio(5, 'out'); //use GPIO pin 5 as output
  var Zone6 = new Gpio(6, 'out'); //use GPIO pin 6 as output
  var Zone7 = new Gpio(13, 'out'); //use GPIO pin 13 as output
  var Zone8 = new Gpio(26, 'out'); //use GPIO pin 26 as output
  var Zone9 = new Gpio(16, 'out'); //use GPIO pin 16 as output
  var Zone10 = new Gpio(12, 'out'); //use GPIO pin 12 as output
  var Zone11 = new Gpio(25, 'out'); //use GPIO pin 25 as output
  var Zone12 = new Gpio(24, 'out'); //use GPIO pin 24 as output
  var Zone13 = new Gpio(23, 'out'); //use GPIO pin 23 as output
  var Zone14 = new Gpio(18, 'out'); //use GPIO pin 18 as output
  var Zone15 = new Gpio(15, 'out'); //use GPIO pin 15 as output
  var Zone16 = new Gpio(14, 'out'); //use GPIO pin 14 as output

// Output OS Stats
  pistats();

// Initialize GPIO relays to off
  init_GPIO(0);

// Initialize Web Server
  console.log("Starting Web Server");
  var server = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;

    switch(path){
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('Enter "/appname.html" to Enter Function on this server');
            response.end();
            break;
        case '/houseio.html':
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


// Initialize Socket.io Listener
  io.listen(server);
  console.log("socket.io started");
  var listener = io.listen(server);

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
  socket.emit('Zone3init', {'Zone3init': boxvalue});
  console.log('Zone3 Init Status: '+ boxvalue);
  var boxvalue = Zone4.readSync();
  socket.emit('Zone4init', {'Zone4init': boxvalue});
  console.log('Zone4 Iniit Status: '+ boxvalue);
  var boxvalue = Zone5.readSync();
  socket.emit('Zone5init', {'Zone5init': boxvalue});
  console.log('Zone5 Iniit Status: '+ boxvalue);
  var boxvalue = Zone6.readSync();
  socket.emit('Zone6init', {'Zone6init': boxvalue});
  console.log('Zone6 Iniit Status: '+ boxvalue);
  var boxvalue = Zone7.readSync();
  socket.emit('Zone7init', {'Zone7init': boxvalue});
  console.log('Zone7 Iniit Status: '+ boxvalue);
  var boxvalue = Zone8.readSync();
  socket.emit('Zone8init', {'Zone8init': boxvalue});
  console.log('Zone8 Iniit Status: '+ boxvalue);
  var boxvalue = Zone9.readSync();
  socket.emit('Zone9init', {'Zone9init': boxvalue});
  console.log('Zone9 Iniit Status: '+ boxvalue);
  var boxvalue = Zone10.readSync();
  socket.emit('Zone10init', {'Zone10init': boxvalue});
  console.log('Zone10 Iniit Status: '+ boxvalue);
  var boxvalue = Zone11.readSync();
  socket.emit('Zone11init', {'Zone11init': boxvalue});
  console.log('Zone11 Iniit Status: '+ boxvalue);
  var boxvalue = Zone12.readSync();
  socket.emit('Zone12init', {'Zone12init': boxvalue});
  console.log('Zone12 Iniit Status: '+ boxvalue);
  var boxvalue = Zone13.readSync();
  socket.emit('Zone13init', {'Zone13init': boxvalue});
  console.log('Zone13 Iniit Status: '+ boxvalue);
  var boxvalue = Zone14.readSync();
  socket.emit('Zone14init', {'Zone14init': boxvalue});
  console.log('Zone14 Iniit Status: '+ boxvalue);
  var boxvalue = Zone15.readSync();
  socket.emit('Zone15init', {'Zone15init': boxvalue});
  console.log('Zone15 Iniit Status: '+ boxvalue);
  var boxvalue = Zone16.readSync();
  socket.emit('Zone16init', {'Zone16init': boxvalue});
  console.log('Zone16 Iniit Status: '+ boxvalue);

// Drive Periodic Updates to Client
setInterval(function(){
//    var sensorResult = sensorLib.read(11, 3);
//    var ftemp = sensorResult.temperature*9/5+32;
//    var humidity = sensorResult.humidity;
//    socket.emit('temp', {'temp': ftemp.toFixed(2)});
//    socket.emit('humidity', {'humidity': humidity.toFixed(2)});
    var  sunset = getSunset(44.6987899,-93.4762658);
    socket.emit('sunset', {'sunset': sunset.toLocaleString()});
    var  sunrise = getSunrise(44.6987899,-93.4762658);
    socket.emit('sunrise', {'sunrise': sunrise.toLocaleString()});
    var d = new Date();
    socket.emit('date', {'date': d.toLocaleString()});
    var boxvalue = Zone1.readSync()
    socket.emit('Zone1init', {'Zone1init': boxvalue});
    var boxvalue = Zone2.readSync()
    socket.emit('Zone2init', {'Zone2init': boxvalue});
    var boxvalue = Zone3.readSync()
    socket.emit('Zone3init', {'Zone3init': boxvalue});
    var boxvalue = Zone4.readSync()
    socket.emit('Zone4init', {'Zone4init': boxvalue});
    var boxvalue = Zone5.readSync()
    socket.emit('Zone5init', {'Zone4init': boxvalue});
    var boxvalue = Zone6.readSync()
    socket.emit('Zone6init', {'Zone4init': boxvalue});
    var boxvalue = Zone7.readSync()
    socket.emit('Zone7init', {'Zone4init': boxvalue});
    var boxvalue = Zone8.readSync()
    socket.emit('Zone8init', {'Zone4init': boxvalue});
    var boxvalue = Zone9.readSync()
    socket.emit('Zone9init', {'Zone4init': boxvalue});
    var boxvalue = Zone10.readSync()
    socket.emit('Zone10init', {'Zone4init': boxvalue});
    var boxvalue = Zone11.readSync()
    socket.emit('Zone11init', {'Zone4init': boxvalue});
    var boxvalue = Zone12.readSync()
    socket.emit('Zone12init', {'Zone4init': boxvalue});
    var boxvalue = Zone13.readSync()
    socket.emit('Zone13init', {'Zone4init': boxvalue});
    var boxvalue = Zone14.readSync()
    socket.emit('Zone14init', {'Zone4init': boxvalue});
    var boxvalue = Zone15.readSync()
    socket.emit('Zone15init', {'Zone4init': boxvalue});
    var boxvalue = Zone16.readSync()
    socket.emit('Zone16init', {'Zone4init': boxvalue});
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
  socket.on('Zone5', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone5");
    if (boxvalue != Zone5.readSync()) { //only change LED if status has changed
      Zone5.writeSync(boxvalue); //turn LED on or off
    }
  });
  socket.on('Zone6', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone6");
    if (boxvalue != Zone6.readSync()) { //only change LED if status has changed
      Zone6.writeSync(boxvalue); //turn LED on or off
    }
  });
  socket.on('Zone7', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone7");
    if (boxvalue != Zone7.readSync()) { //only change LED if status has changed
      Zone7.writeSync(boxvalue); //turn LED on or off
    }
  });
  socket.on('Zone8', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone8");
    if (boxvalue != Zone8.readSync()) { //only change LED if status has changed
      Zone8.writeSync(boxvalue); //turn LED on or off
    }
  });
  socket.on('Zone9', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone9");
    if (boxvalue != Zone9.readSync()) { //only change LED if status has changed
      Zone9.writeSync(boxvalue); //turn LED on or off
    }
  });
  socket.on('Zone10', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone10");
    if (boxvalue != Zone10.readSync()) { //only change LED if status has changed
      Zone10.writeSync(boxvalue); //turn LED on or off
    }
  });
  socket.on('Zone11', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone11");
    if (boxvalue != Zone11.readSync()) { //only change LED if status has changed
      Zone11.writeSync(boxvalue); //turn LED on or off
    }
  });
  socket.on('Zone12', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone12");
    if (boxvalue != Zone12.readSync()) { //only change LED if status has changed
      Zone12.writeSync(boxvalue); //turn LED on or off
    }
  });
  socket.on('Zone13', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone13");
    if (boxvalue != Zone13.readSync()) { //only change LED if status has changed
      Zone13.writeSync(boxvalue); //turn LED on or off
    }
  });
  socket.on('Zone14', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone14");
    if (boxvalue != Zone14.readSync()) { //only change LED if status has changed
      Zone14.writeSync(boxvalue); //turn LED on or off
    }
  });
  socket.on('Zone15', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone15");
    if (boxvalue != Zone15.readSync()) { //only change LED if status has changed
      Zone15.writeSync(boxvalue); //turn LED on or off
    }
  });
  socket.on('Zone16', function(data) { //get light switch status from client
    boxvalue = data;
    console.log(new Date()+": " + boxvalue + "-Zone16");
    if (boxvalue != Zone16.readSync()) { //only change LED if status has changed
      Zone16.writeSync(boxvalue); //turn LED on or off
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
  Zone5.writeSync(initval);
  initval=Zone4.readSync();
  console.log("Zone5 Init: "+initval);
  Zone6.writeSync(initval);
  initval=Zone5.readSync();
  console.log("Zone6 Init: "+initval);
  Zone7.writeSync(initval);
  initval=Zone6.readSync();
  console.log("Zone7 Init: "+initval);
  Zone8.writeSync(initval);
  initval=Zone7.readSync();
  console.log("Zone8 Init: "+initval);
  Zone9.writeSync(initval);
  initval=Zone8.readSync();
  console.log("Zone9 Init: "+initval);
  Zone10.writeSync(initval);
  initval=Zone9.readSync();
  console.log("Zone10 Init: "+initval);
  Zone11.writeSync(initval);
  initval=Zone10.readSync();
  console.log("Zone11 Init: "+initval);
  Zone12.writeSync(initval);
  initval=Zone11.readSync();
  console.log("Zone12 Init: "+initval);
  Zone13.writeSync(initval);
  initval=Zone12.readSync();
  console.log("Zone13 Init: "+initval);
  Zone14.writeSync(initval);
  initval=Zone14.readSync();
  console.log("Zone14 Init: "+initval);
  Zone15.writeSync(initval);
  initval=Zone15.readSync();
  console.log("Zone15 Init: "+initval);
  Zone16.writeSync(initval);
  initval=Zone16.readSync();
  console.log("Zone16 Init: "+initval);
  console.log("---------------------");
}
