const fs = require("fs");
const path = require("path");
const xlsx = require('xlsx');

class File {
	constructor(dirToOpen){
		this.dir = dirToOpen;
		this.tab = [];
		this.tabPath = [];
		this.functionName = "";
		this.iloscODS = 0;
		this.IloscPlikow = 0;
	};	
	getFileProperty(path_,fileName){
		//for(let file in fileName){
			if(this.replaceR(fileName)){
				//let worksheet = xlsx.readFile(path.join(this.dir,fileName[file]));
				console.log(`----------Dodaje plik ${fileName}`);
				let worksheet = xlsx.readFile(path_);
				this.tab.push(worksheet);
				this.tabPath.push(path_);
				this.IloscPlikow++;
			} else if(this.replaceODS(fileName)){
				console.log(`-----UWAGA------ znalazlem plik ODS w ${path_} -----PLIK----- ${fileName}`);
				this.iloscODS++;
			}
		//}
	};
	replaceR(string){
		return (string.match(/\.(xls|xlsx)$/) == null ? false : true);
	};
	replaceODS(string){
		return (string.match(/\.(ods)$/) == null ? false : true);
	}
	openDir(pathFile) {
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
					console.log(`Blad w krytyczny w pliku ${stat}`);
					return;
				}
				let p = path.join(pathInside,folder);
				if(stat.isDirectory()){
					console.log(`-----Znaleziono folder ${folder}`);
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
	getPath(){
		return this.tabPath;
	};
	getIloscPlikow(){
		return this.IloscPlikow;
	};
	iloscOD(){
		return this.iloscODS;
	};
}
module.exports = File;