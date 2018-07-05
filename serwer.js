const consoleRead = require("./read/console.js")();
const preper = require("./read/prepere.js");
const file = require('./read/file.js');
const XLSX = require('xlsx');
const {combine,makeEXEL,generateFileNames,generateDate,setStartParameter} = require('./read/combineFile.js');

consoleRead.checkDataParameter(["path","start","end"])
	consoleRead.getError().forEach((err)=>{
		console.log(err);
	});
	console.log();
	let startParameter = consoleRead.getOneParameter("start") || "A2";
	let endParameter = consoleRead.getOneParameter("end") || "G7";
	let path = consoleRead.getOneParameter("path") || __filename;
	//console.log(startParameter);
	//console.log(endParameter);
	let parameter = preper.letterPreper(startParameter,endParameter);
	//console.log(parameter);
	//setStartParameter(parameter);
	//let f = new file("exel");
	//f.openDir();
	//combine(f.getTab());
	//XLSX.writeFile(makeEXEL("Merge"),`Merge-${generateDate()}-${generateFileNames()}.xlsx`);
	//console.log(`Podano parametry ${startParameter} i ${endParameter}`);


