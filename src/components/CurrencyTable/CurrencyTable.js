import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TableSchedule from "../TableSchedule/TableSchedule";
import "./CurrencyTable.css";
import { connect } from "react-redux";
import { addToFavorites } from "../../redux/actions/actions";

const mapStateToProps = (state) => {
  return {
    value: state.value,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (data) => dispatch(addToFavorites(data)),
});

function CurrencyTable({ data, indexPlus, value, addToFavorites, favorites }) {
  const addToFavClick = (id) => {
    if (!value) alert("You are not signed in");
    else {
      fetch(
        `https://api.coingecko.com/api/v3/coins/${[
          id,
        ]}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`
      )
        .then((res) => res.json())
        .then((data) => {
          addToFavorites({data: data, count: 0});
        });
    }
  };

  return (
    <div className="currency-table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>1h</th>
            <th>24h</th>
            <th>7d</th>
            <th>24h Volume</th>
            <th>Mkt Cap</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>
                  <img
                    onClick={() => {
                      addToFavClick(item.id);
                    }}
                    className="star-img"
                    src={
                      favorites.find((el) => el.data.id === item.id)
                        ? require("../../stars/golden_star.svg").default
                        : require("../../stars/star.svg").default
                    }
                  ></img>
                </td>
                <td className="index">{index + 1 + indexPlus}</td>
                <td className="td-coin">
                  <Link to={`/${item.id}`}>
                    <img className="table-image" src={item.image} />
                  </Link>
                  <p>{item.name}</p>
                  <p className="table-symbol">{item.symbol.toUpperCase()}</p>
                </td>
                <td>${item.current_price}</td>
                <td>
                  <p
                    className={
                      item.price_change_percentage_1h_in_currency > 0
                        ? "green-td"
                        : "red-td"
                    }
                  >
                    {item.price_change_percentage_1h_in_currency === null
                      ? item.price_change_percentage_1h_in_currency
                      : item.price_change_percentage_1h_in_currency.toFixed(1)}
                  </p>
                </td>
                <td>
                  <p
                    className={
                      item.price_change_percentage_24h_in_currency > 0
                        ? "green-td"
                        : "red-td"
                    }
                  >
                    {item.price_change_percentage_24h_in_currency === null
                      ? item.price_change_percentage_24h_in_currency
                      : item.price_change_percentage_24h_in_currency.toFixed(1)}
                  </p>
                </td>
                <td>
                  <p
                    className={
                      item.price_change_percentage_7d_in_currency > 0
                        ? "green-td"
                        : "red-td"
                    }
                  >
                    {item.price_change_percentage_7d_in_currency === null
                      ? item.price_change_percentage_7d_in_currency
                      : item.price_change_percentage_7d_in_currency.toFixed(1)}
                  </p>
                </td>
                <td>${item.total_volume}</td>
                <td>${item.market_cap}</td>
                <td>
                  <div className="td-schedule">
                    <TableSchedule
                      price={item.sparkline_in_7d}
                      date={item.last_updated}
                      id={item.id}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyTable);
