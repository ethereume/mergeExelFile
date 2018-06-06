const fs = require("fs");
const path = require("path");

class File {
	constructor(dirToOpen){
		this.dir = dirToOpen;
	};	
	getFile(){
		this.file = path.join(__dirname,this.dir_,this.file);
	};
	openDir(){
		fs.readdir(path.join(__dirname,this.dir),(err,files)=>{
			if(err) {
				console.log(`Wystapil blad ${err.message}`);
				return;
			}
			for(file in files){
				console.log('Odczytuje');
			}
		});
	}
	this.tab = [];
}
export default File;