let ArrayOfTables = [];
let combine = (file) => {
	if(file != undefined){
		//console.log(file);
		ArrayOfTables.push(file);
		//console.log("--------------------------------------------------------------------------------");
	}
}
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
			var cell_ref = xlsx.utils.encode_cell({c:C,r:R});
			
			if(typeof cell.v === 'number') cell.t = 'n';
			else if(typeof cell.v === 'boolean') cell.t = 'b';
			else if(cell.v instanceof Date) {
				cell.t = 'n'; cell.z = xlsx.SSF._table[14];
				cell.v = datenum(cell.v);
			}
			else cell.t = 's';
			
			ws[cell_ref] = cell;
		}
	}
	if(range.s.c < 10000000) ws['!ref'] = xlsx.utils.encode_range(range);
	return ws;
	};
let makeEXEL = (fileName,cb) => {
	//console.log("--------------------------------------------------------------------------------");
	//console.log(ArrayOfTables);
	
	function Workbook() {
		if(!(this instanceof Workbook)) return new Workbook();
		this.SheetNames = [];
		this.Sheets = {};
	}
	let work = new Workbook();
	work.SheetNames.push(fileName);
	work[fileName] = sheet_from_array_of_arrays(ArrayOfTables);
	//console.log(work[fileName]);
	return work;
}
module.exports = {
	combine,
	makeEXEL
}