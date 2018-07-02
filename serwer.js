const consoleRead = require("./read/console.js")();
//const file = require('./read/file.js');
//const XLSX = require('xlsx');
//const {combine,makeEXEL,generateFileNames,generateDate} = require('./read/combineFile.js');
//let f = new file("exel");
//f.openDir();
//combine(f.getTab());
//XLSX.writeFile(makeEXEL("Merge"),`Merge-${generateDate()}-${generateFileNames()}.xlsx`);

consoleRead.checkDataParameter(["path","file","startrange","endrange"])
	consoleRead.getError().forEach((err)=>{
		console.log(err);
	});
	let startParameter = consoleRead.getOneParameter("startrange") || "A2";
	let endParameter = consoleRead.getOneParameter("endrange") || "G6";
	console.log(`Podano parametry ${startParameter} i ${endParameter}`);


