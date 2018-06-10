const file = require('./read/file.js');
const XLSX = require('xlsx');
const {combine,makeEXEL} = require('./read/combineFile.js');
let f = new file("exel");
f.openDir();
f.getTab().forEach((file)=>{
	//console.log(file);
	combine(file);
});
XLSX.writeFile(makeEXEL("Merge",file.sheet_from_array_of_arrays),'merge.xlsx');
//console.log(tab);

/* original data 

var data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]]
var ws_name = "SheetJS";

function Workbook() {
	if(!(this instanceof Workbook)) return new Workbook();
	this.SheetNames = [];
	this.Sheets = {};
}

var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);

 add worksheet to workbook 

wb.SheetNames.push(ws_name);
wb.Sheets[ws_name] = ws;

 write file 
XLSX.writeFile(wb, 'test.xlsx'); */

