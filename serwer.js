const file = require('./read/file.js');
const EventEmitter = require("events");

let f = new file("exel");

f.setCallback("message",(dane)=>{
	console.log(dane);
});
f.openDir();

