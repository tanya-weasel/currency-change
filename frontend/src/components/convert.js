import React, { useState } from 'react'; // useEffect

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleConvert = async () => {
    
    const apiUrl = `https://06mem1fweg.execute-api.ap-southeast-1.amazonaws.com/fx/rate?from=${fromCurrency}&to=${toCurrency}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("got data phew");
      const rate = data.rate;
      const result = amount * rate;
      setConvertedAmount(result.toFixed(2));
      console.log("omg did it set");
    } catch (error) {
      console.error('Error fetching conversion rate:', error);
    }
  };

//   useEffect(() => {
//     handleConvert();
//   }, [fromCurrency, toCurrency, amount]);

  return (
    <div>
      <label>
        Amount:
        <input type="number" value={amount} onChange={handleAmountChange} />
      </label>
      <label>
        From Currency:
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          {/* Add more currencies as needed */}
        </select>
      </label>
      <label>
        To Currency:
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          {/* Add more currencies as needed */}
        </select>
      </label>
      <button onClick={handleConvert}>Convert</button>
      {convertedAmount && (
        <p>
          Converted Amount: {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;
