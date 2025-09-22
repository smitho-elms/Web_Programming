
// USD <-> Rubles Currency Converter
function convert() {
	var rate = 93.5; // Example rate: 1 USD = 93.5 RUB (update as needed)
	var usdInput = document.getElementById('usdInput');
	var rubInput = document.getElementById('rubInput');

	var usdVal = usdInput.value;
	var rubVal = rubInput.value;

	if (usdVal !== "" && (rubVal === "" || parseFloat(usdVal) !== 0)) {
		// Convert USD to Rubles
		var usd = parseFloat(usdVal);
		if (isNaN(usd) || usd < 0) {
			rubInput.value = "";
			alert('Please enter a valid dollar amount.');
			return;
		}
		var rubles = usd * rate;
		rubInput.value = rubles.toFixed(2);
	} else if (rubVal !== "" && (usdVal === "" || parseFloat(rubVal) !== 0)) {
		// Convert Rubles to USD
		var rub = parseFloat(rubVal);
		if (isNaN(rub) || rub < 0) {
			usdInput.value = "";
			alert('Please enter a valid ruble amount.');
			return;
		}
		var usd = rub / rate;
		usdInput.value = usd.toFixed(2);
	} else {
		alert('Please enter a value in one field only.');
	}
}
