const con = require("./read/console.js");
const file = require('./read/file.js');
const XLSX = require('xlsx');
const {combine,makeEXEL,generateFileNames,generateDate} = require('./read/combineFile.js');
let f = new file("exel");
f.openDir();
combine(f.getTab());
XLSX.writeFile(makeEXEL("Merge"),`Merge-${generateDate()}-${generateFileNames()}.xlsx`);


