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
	
	};
const makeEXEL = (fileName) => {

	function Workbook() {
		if(!(this instanceof Workbook)) return new Workbook();
		this.SheetNames = [];
		this.Sheets = {};
	}
	let work = new Workbook();
	work.SheetNames.push(fileName);
	console.log(tabsArray);
	//work[fileName] = makeFile(tabsArray);
	//console.log(work[fileName]);
	return work;
}
module.exports = {
	combine,
	makeEXEL
}