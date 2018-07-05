const generateletter = (c1 = 'a', c2 = 'g') =>{
    a = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return (a.slice(a.indexOf(c1), a.indexOf(c2) + 1)); 
}

const prepereAlfaber = (let1,let2) =>{
	if(let1.length > 2 || let1.length == 0){
		console.log("Nieprawidlowy pierwszy paramert, podaj np A2");
		return;
	} else if(let2.length > 2 || let2.length == 0) {
		console.log("Nieprawidlowy drugi paramert, podaj np A2");
		return;
	}
	let param1 = let1.charAt(1);
	let param2 = let2.charAt(1);
	//console.log(param1);
	//console.log(param2);
	let horizontal = parseInt(param2) - parseInt(param1) + 1;
	let firstRange = parseInt(param1);
	if(horizontal <= 0){
		//console.log(horizontal);
		console.log("Nieprawidlowa wartosc podaj najpierw komorke mniejsza a pozniej wieksza");
		return;
	}
	if(firstRange <= 1){
		//console.log(firstRange);
		console.log("Nieprawidlowa wartosc parametr musi zaczynac sie od 2");
		return;
	}
	param1 = let1.charAt(0).toLowerCase();
	param2 = let2.charAt(0).toLowerCase();
	//console.log(param1,param2);
	let vertical = generateletter(param1,param2);
	vertical = vertical.map((letter)=>{
		 return letter.toUpperCase();
	});
	//console.log(vertical);
	return [horizontal,firstRange,vertical];
};

module.exports = {
	letterPreper:prepereAlfaber,
}