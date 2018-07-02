const EventEmitter = require("events");
const args = process.argv.slice(2);
class consoleRead  {
	constructor(){
		this.tab = [];
		this.error = [];
	}
	getParameter(param){
		let isParamter = args.indexOf(`--${param}`);
		if(isParamter !== -1 && args[isParamter+1] !== "undefined"){
			this.tab.push(args[isParamter+1]);
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
		this.tab.forEach((param)=>{
			if(param == name){
				return getParameter(name);
			} else {
				return null;
			}
		})
	}
}
module.exports = () => new consoleRead();