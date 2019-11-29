var sensorLib = require("node-dht-sensor");
var sensorResult = sensorLib.read(22, 12);
var ftemp = sensorResult.temperature*9/5+32;
console.log("Temperature: " + sensorResult.temperature.toFixed(2) +"°C / "+ftemp.toFixed(2)+"°F");
console.log("Humidity   : " +  sensorResult.humidity.toFixed(1) + "%");
