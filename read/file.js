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
	};	
	getFileProperty(fileName){
		for(let file in fileName){
			let worksheet = xlsx.readFile(path.join(this.dir,fileName[file]));
			this.tab.push(worksheet);
		}
	};
	openDir(pathFile){
		let fileName = [],
			pathInside = "";
		if(!pathFile){
			pathInside = path.join(this.dir);
			//console.log("Za pierwszym razem "+pathInside);
			fileName = fs.readdirSync(pathInside);
		} else {
			pathInside = pathFile;
			//console.log("Za kazdym innym razem "+pathInside);
			fileName = fs.readdirSync(pathInside);
		}
		fileName.forEach((folder)=>{
			//console.log(folder);
			fs.stat(pathInside,(err,stat)=>{
				//console.log(stat);
				if(err){
					console.log(`Blad w pliku ${err}`);
					return;
				}
				if(stat.isDirectory()){
					//console.log("Znalazłem folder !!");
					let p = path.join(pathInside,folder);
					//console.log(p);
					console.log(folder);
					try {
						this.openDir(p);
					} catch(err){
						console.log(err);
					}
				} else {
					console.log("Znalazłem pliki !!");
				}
			});
		});
		//this.getFileProperty(fileName);
	};
	getTab(){
		return this.tab;
	};

}
module.exports = File;