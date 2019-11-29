var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
var os = require('os');
var sensorLib = require("node-dht-sensor");
var sensorResult = sensorLib.read(22, 12);

// Output OS Stats
pistats();

console.log("Starting Web Server");
var server = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;

    switch(path){
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('this is the root director of the server');
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
    setInterval(function(){

        var sensorResult = sensorLib.read(22, 12);
        var ftemp = sensorResult.temperature*9/5+32;
        var humidity = sensorResult.humidity

        socket.emit('temp', {'temp': ftemp.toFixed(2)});
        socket.emit('humidity', {'humidity': humidity.toFixed(2)});
        socket.emit('date', {'date': new Date()});

//        console.log("Date: "+new Date()+" Temp:"+ftemp.toFixed(2)+" Humidity:"+humidity.toFixed(2));
    }, 5000);
    //recieve client data
    socket.on('client_data', function(stuff){
      process.stdout.write(stuff.letter);
     //debug
//      console.log('obj', stuff);
//      console.log('.toString', stuff.toString());
//      console.log('String()', String(stuff));
//      console.log('JSON.stringify',JSON.stringify(stuff));

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
