const consoleRead = require("./read/console.js")();
const preper = require("./read/prepere.js");
const file = require('./read/file.js');
const XLSX = require('xlsx');
const {combine,makeEXEL,generateFileNames,generateDate,setStartParameter} = require('./read/combineFile.js');

consoleRead.checkDataParameter(["path","sr","er"])
	consoleRead.getError().forEach((err)=>{
		console.log(err);
	});
	let startParameter = consoleRead.getOneParameter("sr") || "A2";
	let endParameter = consoleRead.getOneParameter("er") || "G6";
	//console.log(startParameter);
	//console.log(endParameter);
	let parameter = preper.letterPreper(startParameter,endParameter);
	//console.log(parameter);
	setStartParameter(parameter);
	let f = new file("exel");
	f.openDir();
	combine(f.getTab());
	XLSX.writeFile(makeEXEL("Merge"),`Merge-${generateDate()}-${generateFileNames()}.xlsx`);
	//let path = consoleRead.getOneParameter("path") || ;
	//console.log(`Podano parametry ${startParameter} i ${endParameter}`);


