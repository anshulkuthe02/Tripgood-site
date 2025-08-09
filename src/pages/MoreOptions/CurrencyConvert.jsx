import React, { useEffect, useState } from "react";
import "./CurrencyConvert.css";
import { CgArrowsExchangeV } from "react-icons/cg";

import currencyNames from "../../data/currencies.json";

const CurrencyConverterPage = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates);
        setCurrencies(Object.keys(data.rates));
      });
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const baseAmount = amount / rates[fromCurrency];
      const result = baseAmount * rates[toCurrency];
      setConvertedAmount(result.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="converter-container">
      <h2 className="converter-title">💱 Currency Converter</h2>
      <div className="converter-box">
        <div className="input-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </div>

        <div className="currency-selectors">
          <div className="input-group">
            <label>From</label>
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              {currencies.map((cur, idx) => (
                <option key={idx} value={cur}>
                  {currencyNames[cur] ? `${currencyNames[cur]} (${cur})` : cur}
                </option>
              ))}
            </select>
          </div>

          <button className="swap-button" onClick={handleSwap} >
            <CgArrowsExchangeV size={50} />
          </button>

          <div className="input-group">
            <label>To</label>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              {currencies.map((cur, idx) => (
                <option key={idx} value={cur}>
                  {currencyNames[cur] ? `${currencyNames[cur]} (${cur})` : cur}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="result-box">
          <p>
            {amount} {fromCurrency} = <span>{convertedAmount || "..."}</span> {toCurrency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterPage;
