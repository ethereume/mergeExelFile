const XLSX = require('xlsx');
const random = require('randomstring');
let vertical = null;
let horizontal = null;
let firstRange = null;
let tabsArray = [];
let sheet = null;

const setStartParameter = (arr) =>{
	//console.log(arr);
	horizontal = arr[0] || 7;
	firstRange = arr[1] || 2;
	vertical = arr[2]|| ["A","B","C","D","E","F","G"];
}

const combine = (sheets) => {
	readRange(sheets);
}
const checkTypeOfFile = (plik) =>{
	if(plik["A1"].v === "SPRZĘT"){
		return true;
	} else {
		return false;
	}
}
const readRange = (sheets) =>{
	let firstR = firstRange;
	let obj = {}
	let arrayTmp = [];
	for (let i = 0;i<sheets.length;i++) {
		obj.sheet = null;
			for(var key in sheets[i].Sheets){
					obj.sheet = key;
				}
			//console.log(obj.sheet);
			sheet = sheets[i].Sheets[obj.sheet];
			if(!checkTypeOfFile(sheet) && firstR == 2){
				firstR = 1;
			}
			//console.log("Licznik "+firstR);
			let beginRange = horizontal+firstR;
			//console.log(beginRange);
			for(let c = firstR;c<beginRange;c++){
				//console.log(c);
				arrayTmp.push(getDataFromSheet(c));
			}
			//console.log("-------------------");
		firstR = firstRange;
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
		//console.log(combineString);
		tmpTab.push(sheet[combineString]);	
	});
	return tmpTab;
}
const sheet_from_array_of_arrays = (data) => {
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
const makeHorizontalArrays = (array) =>{
	let dlugosc = vertical.length,k = dlugosc,tabTMP = [],tabInArray = [];
	for(var j = 0;j<array.length;j++){
		tabTMP.push([array[j][0]]);
		tabTMP.push([array[j][1]]);
		for(var i = 2;i<array[j].length;i++){
				if(i <= k){
					tabInArray.push(array[j][i]);

				} else {
					tabInArray.push(array[j][i]);
					tabTMP.push(tabInArray);
					tabInArray = [];
					k +=dlugosc;
				}	
		}
		//console.log(tabInArray);
		k = dlugosc;
		tabInArray = [];
	}
	return tabTMP;
};
const makeFile = (data,paths) => {
		const getNames = (obj) => {
			if(obj === undefined) {
				return "brak";
			} else {
				return obj.v;
			}
		};	
		let tab = [],t = [],p = paths,i = 0;
		data.forEach((obj)=>{
				tab.push({v:obj.sheet});
				tab.push({v:p[i]});
				obj.parameter.forEach((pojedyncza)=>{
					tab = [...tab,...pojedyncza];
				});	
			t.push(tab.map((obj)=>{
				return getNames(obj);
			}));
			tab = [];
			i++;
		});
	return sheet_from_array_of_arrays(makeHorizontalArrays(t));
};
const generateFileNames = () =>{
	return random.generate({
		length:5,
		charset:'alphabetic',
		capitalization:'lowercase'  
	});
}
const generateDate = () =>{
	let  d = new Date();
	let day = d.getDay() < 10 ? "0"+d.getDay():d.getDay();
	let month =  d.getMonth() < 10 ? "0"+(d.getMonth()+1):d.getMonth() + 1; 
	return `${day}.${month}.${d.getFullYear()}`;
};
const makeEXEL = (fileName) =>{
	return (paths) => {

		function Workbook() {
			if(!(this instanceof Workbook)) return new Workbook();
			this.SheetNames = [];
			this.Sheets = {};
		}
		let work = new Workbook();
		work.SheetNames.push(fileName);
		work.Sheets[fileName] = makeFile(tabsArray,paths);
		//console.log(work[fileName]);
		return work;
	}
}
module.exports = {
	combine,
	makeEXEL,
	generateFileNames,
	generateDate,
	setStartParameter
}