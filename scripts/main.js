var rate, amount, mainCurrency, secondaryCurrency;
const currencys = [
	//this array contains all currency objects
	{ name: 'dollar', peso: 117.43, dollar: 1, euro: 0.96, real: 5.06 }, //currency object
	{ name: 'euro', peso: 122.26, dollar: 1.04, euro: 1, real: 5.27 },
	{ name: 'real', peso: 23.2, dollar: 0.2, euro: 0.19, real: 1 },
	{ name: 'peso', peso: 1, dollar: 0.0085, euro: 0.0082, real: 0.043 },
];

//rotate animation
function refreshBtn() {
	var currencyLeft = document.getElementById('currencyLeft');
	var currencyRight = document.getElementById('currencyRight');

	var newRightCurrencyValue = currencyLeft.value;
	var newLeftCurrencyValue = currencyRight.value;
	currencyLeft.value = newLeftCurrencyValue;
	currencyRight.value = newRightCurrencyValue;
	convertionFromLeft();

	let rotacion = (360 / 100) * 2.5; // rotation time
	setTimeout(() => {
		document.getElementById('btnRefresh').classList.add('rotate');
	}, 100);

	setTimeout(() => {
		document.getElementById('btnRefresh').classList.remove('rotate');
	}, rotacion);
}

function clean() {
	floatingInputLeft = document.getElementById('floatingInputLeft');
	floatingInputLeft.value = 0;
	floatingInputRight = document.getElementById('floatingInputRight');
	floatingInputRight.value = 0;
}

function changeLabelLeft() {
	var labelLeft = document.getElementById('labelLeft');
	if (currencyLeft.value != '') {
		labelLeft.innerText = `Amount of ${currencyLeft.value}s`;
		convertionFromLeft();
	} else {
		labelLeft.innerHTML = 'Amount';
		InputLeft = document.getElementById('floatingInputLeft');
		InputLeft.setAttribute('disabled', '');
	}
}
function changeLabelRight() {
	var labelRight = document.getElementById('labelRight');
	if (currencyRight.value != '') {
		labelRight.innerText = `Amount of ${currencyRight.value}s`;
		convertionFromRight();
	} else {
		labelRight.innerHTML = 'Amount';
		floatingInputRight = document.getElementById('floatingInputRight');
		floatingInputRight.setAttribute('disabled', '');
	}
}
function getConvertion(amount, rate) {
	return amount * rate;
}
function convertionFromLeft() {
	amount = floatingInputLeft.value;
	secondaryCurrency = currencyRight.value;
	mainCurrency = currencys.find((currency) => currency.name === currencyLeft.value);
    rate = mainCurrency[secondaryCurrency];
    localStorage.setItem('mainCurrency', mainCurrency);
	localStorage.setItem('secondaryCurrency', secondaryCurrency);
	localStorage.setItem('amount', amount);
	floatingInputRight = document.getElementById('floatingInputRight');
	floatingInputRight.value = (amount * rate).toFixed(2);
}
function convertionFromRight() {
	amount = floatingInputRight.value;
	secondaryCurrency = currencyLeft.value;
	mainCurrency = currencys.find((currency) => currency.name === currencyRight.value);
    rate = mainCurrency[secondaryCurrency];
    localStorage.setItem('mainCurrency', mainCurrency);
	localStorage.setItem('secondaryCurrency', secondaryCurrency);
	localStorage.setItem('amount', amount);
	floatingInputLeft = document.getElementById('floatingInputLeft');
	floatingInputLeft.value = (amount * rate).toFixed(2);
}

function getLastConvertion() {
    var currencyLeft = document.getElementById('currencyLeft');
    var currencyRight = document.getElementById('currencyRight');
    
	var newLeftCurrencyValue = localStorage.getItem(mainCurrency);
    var newRightCurrencyValue = localStorage.getItem(secondaryCurrency);
    var amount = localStorage.getItem(amount);
	currencyLeft.value = newLeftCurrencyValue;
    currencyRight.value = newRightCurrencyValue;
    floatingInputLeft = document.getElementById('floatingInputLeft');
    floatingInputLeft.value = localStorage.getItem(amount);
	convertionFromLeft();
}

let currencyLeft = document.getElementById('currencyLeft');
currencyLeft.addEventListener('change', changeLabelLeft);
let currencyRight = document.getElementById('currencyRight');
currencyRight.addEventListener('change', changeLabelRight);

let floatingInputLeft = document.getElementById('floatingInputLeft');
floatingInputLeft.addEventListener('keyup', convertionFromLeft);

let floatingInputRight = document.getElementById('floatingInputRight');
floatingInputRight.addEventListener('keyup', convertionFromRight);

let lastConvertion = document.getElementById('lastConvertion');
lastConvertion.addEventListener('click', getLastConvertion);