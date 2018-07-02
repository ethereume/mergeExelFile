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
	getFileProperty(path_,fileName){
		//for(let file in fileName){
			if(this.replaceR(fileName)){
				//let worksheet = xlsx.readFile(path.join(this.dir,fileName[file]));
				console.log(`Dodaje plik ${fileName}`);
				let worksheet = xlsx.readFile(path_);
				this.tab.push(worksheet);
			}
		//}
	};
	replaceR(string){
		return (string.match(/\.(xls|xlsx)$/) == null ? false : true);
	};
	openDir(pathFile){
		let fileName = [],
			pathInside = "";
		if(!pathFile){
			pathInside = path.join(this.dir);
			fileName = fs.readdirSync(pathInside);
		} else {
			pathInside = pathFile;
			fileName = fs.readdirSync(pathInside);
		}
		fileName.forEach((folder)=>{
			let stat = fs.statSync(path.join(pathInside,folder));
				if(!stat){
					console.log(`Blad w krytyczny w pliku ${stat} przerywam`);
					return;
				}
				let p = path.join(pathInside,folder);
				if(stat.isDirectory()){
					console.log(`Znaleziono folder ${folder}`);
					try {
						this.openDir(p);
					} catch(err){
						console.log(err);
					}
				} else {
					this.getFileProperty(p,folder);
				}
		});
	};	
	getTab(){
		return this.tab;
	};
}
module.exports = File;