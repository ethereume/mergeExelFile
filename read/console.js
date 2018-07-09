const EventEmitter = require("events");
const args = process.argv.slice(2);
class consoleRead  {
	constructor(){
		this.tab = [];
		this.error = [];
	}
	getParameter(param){
		let isParamter = args.indexOf(`-${param}`);
		if(isParamter !== -1 && args[isParamter+1] !== "undefined"){
			this.tab.push([param,args[isParamter+1]]);
		} else {
			this.error.push(`Nie podano parametru dla ${param}`);
		}
	}
	checkDataParameter(data){
		data.forEach((parameter) =>{
			this.getParameter(parameter);
		});
	}
	getError(){
		return this.error;
	}
	getOneParameter(name){
		 let p = null;
		 this.tab.forEach((param)=>{
			if(name == param[0]){
				p = param[1];
			}
		});
	return p;
	}
}
module.exports = () => new consoleRead();