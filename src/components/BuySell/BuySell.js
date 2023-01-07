import { useState } from "react";
import { connect } from "react-redux";
import "./BuySell.css"

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

function BuySell({ favorites }) {
  const [count, setCount] = useState(1);
  const [id, setId]= useState(favorites[0].data.id);

  const inputCount = (e) => {
    setCount(e.target.value.replace(/[^0-9]/g, '').replace(/^0+/, ''));
  }

  const selectCoin = (e) => {
    setId(e.target.value);
  }

  return (
    <div className="buy-sell">
        <h2>Buy/Sell</h2>
      <select value={id} onChange={selectCoin} className="buy-sell-select">{favorites.map(data => {
        return <option value={data.data.id} key={data.data.id}>
            {data.data.name}
            ({data.data.symbol.toUpperCase()})
        </option>
      })}</select>
      <h2>Coins count:</h2>
      <input value={count} onChange={inputCount} className="coins-count-input" placeholder=""></input>
      <h2>Total price: </h2>
      <input value={`$${(favorites.find(e => e.data.id === id).data.market_data.current_price.usd*count).toFixed(2)}`} className="coins-price" readOnly={true}></input>
    </div>
  );
}

export default connect(mapStateToProps)(BuySell); 