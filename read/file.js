const fs = require("fs");
const path = require("path");
const xlsx = require('xlsx');
const EventEmitter = require("events");

class File extends EventEmitter {
	constructor(dirToOpen){
		super();
		this.dir = dirToOpen;
		this.tab = [];
		this.functionName = "";
		this.FileNames = [];
	};	
	getFileProperty(fileName){
		for(let file in fileName){
			let worksheet = xlsx.readFile(path.join(this.dir,fileName[file]));
			this.tab.push(worksheet);
		}
	};
	openDir(){
		let fileName = fs.readdirSync(path.join(this.dir));
		this.FileNames = fileName;
		this.getFileProperty(fileName);
	};
	getFileNames() {
		return this.FileNames;
	}
	getTab(){
		return this.tab;
	};

}
module.exports = File;