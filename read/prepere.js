const generateletter = (c1 = 'a', c2 = 'g') =>{
    a = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return (a.slice(a.indexOf(c1), a.indexOf(c2) + 1)); 
}

const prepereAlfaber = (let1,let2) =>{
	if(let1.length > 2 || let1.length == 0){
		console.log("Nieprawidlowy pierwszy paramert, podaj literę i zakres od 1 - 9");
		throw new Error();
	} else if(let2.length > 3 || let2.length == 0) {
		console.log("Nieprawidlowy drugi paramert, podaj literę i zakres więszy od poprzedniego od 1- 99");
		throw new Error();
	}
	let param2 = null;
	let param1 = let1.charAt(1);
	if(let2.length == 2){
		param2 = let2.charAt(1);
	} else if(let2.length == 3){
		param2 = let2.charAt(1)+let2.charAt(2);
	}
	//console.log(param1);
	//console.log(param2);
	let horizontal = parseInt(param2) - parseInt(param1) + 1;
	let firstRange = parseInt(param1);
	if(horizontal <= 0){
		//console.log(horizontal);
		console.log("Nieprawidlowa wartosc podaj najpierw komorke mniejsza a pozniej wieksza");
		throw new Error();
	}
	if(firstRange <= 1){
		//console.log(firstRange);
		console.log("Nieprawidlowa wartosc parametr musi zaczynac sie od 2");
		throw new Error();
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