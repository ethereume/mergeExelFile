let ArrayOfTables = [];
let combine = (file) => {
	if(file != undefined){
		//console.log(file);
		ArrayOfTables.push(file);
		//console.log("--------------------------------------------------------------------------------");
	}
}
function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
}
let makeEXEL = (fileName,cb) => {
	//console.log("--------------------------------------------------------------------------------");
	console.log(ArrayOfTables);
	
	function Workbook() {
		if(!(this instanceof Workbook)) return new Workbook();
		this.SheetNames = [];
		this.Sheets = {};
	}
	let work = new Workbook();
	work.SheetNames.push(fileName);
	work[fileName] = cb(toObject(ArrayOfTables));
	//console.log(work[fileName]);
	return work;
}
module.exports = {
	combine,
	makeEXEL
}