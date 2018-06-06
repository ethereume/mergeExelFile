const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

class File extends EventEmitter {
	constructor(dirToOpen){
		super();
		this.dir = dirToOpen;
		this.tab = [];
		this.functionName = "";
	};	
	getFileProperty(fileName){
			let fN = this.functionName;
				for(let file in fileName){
					fs.readFile(path.join(this.dir,fileName[file]),"utf-8",(err,data)=>{
						if(err) {throw new err;}
					this.emit(fN,data);
					});
				}
	};
	openDir(){
		fs.readdir(path.join(this.dir),(err,files)=>{
			if(err) {throw new err;}
				this.getFileProperty(files);
		});
	};
	setCallback(name,cb){
		this.functionName = name;
		this.on(name,cb);
	}
}
module.exports = File;