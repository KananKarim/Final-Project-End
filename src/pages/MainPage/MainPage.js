import React, { useState, useEffect } from "react";
import CurrencyTable from "../../components/CurrencyTable/CurrencyTable";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import "./MainPage.css";

export default function MainPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [oneTime, setOneTime] = useState(true);
  const [indexPlus, setIndex] = useState(0);


  const getData = async (page) => {
    let response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );
    let data = response.json();
    return data;
  };

  useEffect(() => {
    if (oneTime) {
      getData(page)
        .then((res) => {
          setData(null);
          setData(res);
        })
        .catch((err) => alert(err));
      setOneTime(false);
    }
  }, []);

  const selectPage = (event) => {
    let pageNum = event.target.innerHTML;
    switch (pageNum) {
      case "1":
        setIndex(0);
        break;
      case "2":
        setIndex(100);
        break;
      case "3":
        setIndex(200);
        break;
      case "4":
        setIndex(300);
        break;
      case "5":
        setIndex(400);
        break;
    }

    setPage(event.target.innerHTML);
    setData(null);
    getData(pageNum)
      .then((res) => {
        setData(res);
      })
      .catch((err) => alert(err));
  };

  if (data === null) return <Loader />;

  return (
    <div className="main-page">
      <Header />
      <div className="pages top">
        <div className="pages-buttons">
          <div onClick={selectPage}>
            <button className={indexPlus === 0 ? "selected-page" : ""}>
              1
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 100 ? "selected-page" : ""}>
              2
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 200 ? "selected-page" : ""}>
              3
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 300 ? "selected-page" : ""}>
              4
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 400 ? "selected-page" : ""}>
              5
            </button>
          </div>
        </div>
      </div>
      <CurrencyTable page={page} data={data} indexPlus={indexPlus}/>
      <div className="pages bottom">
        <div className="pages-buttons">
          <div onClick={selectPage}>
            <button className={indexPlus === 0 ? "selected-page" : ""}>
              1
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 100 ? "selected-page" : ""}>
              2
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 200 ? "selected-page" : ""}>
              3
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 300 ? "selected-page" : ""}>
              4
            </button>
          </div>
          <div onClick={selectPage}>
            <button className={indexPlus === 400 ? "selected-page" : ""}>
              5
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}