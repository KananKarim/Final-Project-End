import "./Converter.css";
import { useState, useEffect } from "react";

const removeExtraCharacters = (str) => {
  str = str.replace(',', '.').replace(/^00+/, '0');

  if (str[0] === '0' && str.length > 1 && str[1] != '.')
      str = str.slice(1);

  str = str.replace(',', '.');
  if (str.length === 1 && str[0] === '.') str = str.replace('.', '');

  str = str.replace(/[^0-9,.]/g, '');

  let arr = str.split('');
  let dots = arr.filter(x => x === '.');
  let dot = 0;

  if (dots.length == 2) {
      arr.forEach((item, index) => {
          if (dot === 1 && item === '.') {
              arr.splice(index, 1);
          }
          if (item === '.') dot++;
      })
      str = arr.join('');
  }
  return str;
}

export default function Converter({ symbol, id }) {
  const [oneTime, setOneTime] = useState(true);
  const [currency, setCurrency] = useState(null);
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [selectValue, setSelectValue] = useState("usd");
  const [go, setGo] = useState(false);

  const getData = async (vs_currency) => {
    let response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vs_currency}&days=0`
    );
    let data = response.json();
    return data;
  };

  const getCurrency = (value, price=0) => {
    setCurrency(0);
    getData(value)
      .then((res) => {
        setCurrency(res.prices[0][1]);
        if(second) {setFirst((price * res.prices[0][1]).toFixed(2));}
      })
      .catch((err) => alert(err));
    setOneTime(false);
  };

  useEffect(() => { 
    getCurrency(selectValue);
  }, [id]);

  const firstChange = (e) => {
    let value = removeExtraCharacters(e.target.value);
    setFirst(value);
    setSecond((value * currency).toFixed(2));
  };

  const secondChange = (e) => {
    let value = removeExtraCharacters(e.target.value);
    setSecond(value);
    setFirst((value / currency).toFixed(2));
  };

  const selectChange = async (e) => {
    getCurrency(e.target.value, second);
    setSelectValue(e.target.value);
  };

  return (
    <div>
      <h3>Converter</h3>
      <div className="converter">
        <div className="first">
          <div className="converter-symbol">{symbol}</div>
          <input value={first} onChange={firstChange} type="text"></input>
        </div>

        <div className="second">
          <select
            value={selectValue}
            onChange={selectChange}
            className="custom-dropdown"
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="btc">BTC</option>
            <option value="eth">ETH</option>
            <option value="bnb">BNB</option>
            <option value="bch">BCH</option>
          </select>
          <input
            value={second}
            onChange={secondChange}
            className="second-input"
            type="text"
          ></input>
        </div>
      </div>
    </div>
  );
}