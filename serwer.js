const file = require('./read/file.js');
let f = new file("exel");
f.openDir();
f.getTab().forEach((file)=>{
	console.log(file);
})

