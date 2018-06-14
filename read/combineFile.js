const xlsx = require('xlsx');
const vertical = ["A","B","C","D","E","F","G"];
const horizontal = 6;
let sheet = null;
let tabsArray = [];
const combine = (sheets,fileNames) => {
	fileNames = replaceAll(fileNames);
	readRange(sheets,fileNames);
}
const replaceR = (string) =>{
	return string.replace(/\.(xls|xlsx)$/,"");
}
const replaceAll = (tabStrings) => {
	return tabStrings.map((tab)=>{
		return replaceR(tab);
	})
}
const readRange = (sheets,fileNames) =>{
	let firstRange = 2;
	let obj = {}
	let arrayTmp = [];
	for (let i = 0;i<sheets.length;i++) {
		obj.sheet = fileNames[i];
			sheet = sheets[i].Sheets[fileNames[i]];
			//console.log(sheet);
			let beginRange = horizontal + firstRange;
			for(let c = firstRange;c<beginRange;c++){
				arrayTmp.push(getDataFromSheet(c));
			}
		firstRange = 2;
		obj.parameter = arrayTmp;
		tabsArray.push(obj);
		obj = {};
		arrayTmp = [];	
	}
}

const getDataFromSheet = (number) =>{
	let tmpTab = [];
	//console.log(vertical);
	vertical.forEach((letter)=>{
		//console.log(letter);
		//console.log(number);
		let combineString = letter+number;
		//console.log(sheet[combineString]);
		tmpTab.push(sheet[combineString]);
	});
	return tmpTab;
}
const makeFile = (data) => {
		let tab = [];
		data.forEach((obj)=>{
				tab.push({v:obj.sheet});
				obj.parameter.forEach((pojedyncza)=>{
					//console.log(pojedyncza);
					tab = [...tab,...pojedyncza];
				});
		});
		
	};

function sheet_from_array_of_arrays(data) {
	var ws = {};
	var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
	for(var R = 0; R != data.length; ++R) {
		for(var C = 0; C != data[R].length; ++C) {
			if(range.s.r > R) range.s.r = R;
			if(range.s.c > C) range.s.c = C;
			if(range.e.r < R) range.e.r = R;
			if(range.e.c < C) range.e.c = C;
			var cell = {v: data[R][C] };
			if(cell.v == null) continue;
			var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
			
			if(typeof cell.v === 'number') cell.t = 'n';
			else if(typeof cell.v === 'boolean') cell.t = 'b';
			else cell.t = 's';
			
			ws[cell_ref] = cell;
		}
	}
	if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
	return ws;
}
const makeEXEL = (fileName) => {

	function Workbook() {
		if(!(this instanceof Workbook)) return new Workbook();
		this.SheetNames = [];
		this.Sheets = {};
	}
	let work = new Workbook();
	work.SheetNames.push(fileName);
	work[fileName] = makeFile(tabsArray);
	//console.log(work[fileName]);
	return work;
}
module.exports = {
	combine,
	makeEXEL
}