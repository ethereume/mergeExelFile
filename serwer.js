const file = require('./read/file.js');
const XLSX = require('xlsx');
const {combine,makeEXEL} = require('./read/combineFile.js');
let f = new file("exel");
f.openDir();
	//let plik = JSON.stringify(file.Sheets["103103 - KFC M1 MARKI"].A1);
	//console.log(file);
combine(f.getTab(),f.getFileNames());
XLSX.writeFile(makeEXEL("Merge"),'merge.xlsx');


