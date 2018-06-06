const boostrap = require('bootstrap');
const jquery = require("jquery");
(function($) {  
	$.get("dane",(dane)=>{
		console.log(dane);
	});
})(jquery);