const consoleRead = require("./read/console.js")();
const preper = require("./read/prepere.js");
const file = require('./read/file.js');
const XLSX = require('xlsx');
const {combine,makeEXEL,generateFileNames,generateDate,setStartParameter} = require('./read/combineFile.js');

consoleRead.checkDataParameter(["p","s","e"])
	consoleRead.getError().forEach((err)=>{
		console.log(err);
	});
	console.log();
	let startParameter = consoleRead.getOneParameter("s") || "A2";
	let endParameter = consoleRead.getOneParameter("e") || "G7";
	let path = consoleRead.getOneParameter("p") || null;
	//console.log(path);
	//console.log(endParameter);
	let parameter = preper.letterPreper(startParameter,endParameter);
	//console.log(parameter);
	setStartParameter(parameter);
	let f = new file("exel");
	f.openDir(path);
	combine(f.getTab());
	XLSX.writeFile(makeEXEL("Merge")(f.getPath()),`Merge-${generateDate()}-${generateFileNames()}.xlsx`);
	console.log();
	console.log(`Skonczone !`);
	console.log(`Poloczono ${f.getIloscPlikow()} plikow exel i  znaleziono ${f.iloscOD()} plikow ODS`);
	//console.log(`Podano parametry ${startParameter} i ${endParameter}`);


