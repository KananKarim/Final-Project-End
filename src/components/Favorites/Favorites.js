import { useEffect } from "react";
import { connect } from "react-redux";
import "./Favorites.css";

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

function Favorites({ favorites }) {
  useEffect(() => {
    if (favorites.length > 8)
      document.querySelector(".favorites").style.overflowY = "scroll";
  });

  if (!favorites) return <>NO!</>;

  return (
    <div className="favorites">
      {favorites.map((data) => {
        return (
          <div key={data.data.id} className="favorites-li">
            <img
              className="favorites-star"
              src={require("../../stars/golden_star.svg").default}
              alt="cryptos"
            ></img>
            <div className="favorites-info-li">
              <img className="favorites-img" src={data.data.image.small} alt="cryptos"></img>
              <p key={data.data.id}>{data.data.name}</p>
              <p>({data.data.symbol.toUpperCase()})</p>
              <p>{data.count}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default connect(mapStateToProps)(Favorites); 