const api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const errorText = document.getElementById("error");

let rates = {};

async function fetchExchangeRate() {
  try {
    errorText.textContent = "";
    const response = await fetch(api);
    const data = await response.json();

    rates = data.conversion_rates;
  } catch (error) {
    errorText.textContent = "Failed to fetch exchange rates";
  }
}

fetchExchangeRate();

currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency.code;
  option.text = `${currency.name} (${currency.country})`;
  fromDropDown.add(option);
});

currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency.code;
  option.text = `${currency.name} (${currency.country})`;
  toDropDown.add(option);
});

function convertCurrency() {
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  const amount = document.getElementById("amount").value;

  const rate = rates[toCurrency] / rates[fromCurrency];
  const result = amount * rate;

  document.getElementById("result").textContent = result.toFixed(2);
}

document.getElementById("convert").addEventListener("click", convertCurrency);

alert("Note that all exchange rates are based on USD");