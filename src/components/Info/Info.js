import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Converter from "../Converter/Converter";
import InfoSchedule from "../InfoSchedule/InfoSchedule";
import Loader from "../Loader/Loader";
import "./Info.css";

const mapStateToProps = (state) => {
  return {
    value: state.value,
    favorites: state.favorites,
  };
};
function Info({ favorites }) {
  const params = useParams();
  const [data, setData] = useState(null);
  const [oldParams, setOldParams] = useState(params);

  const getData = async () => {
    let response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${[
        params.id,
      ]}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`
    );
    let data = response.json();
    return data;
  };

  useEffect(() => {
    getData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => alert(err));
  }, [params.id]);

  if (data === null) return <Loader />;

  return (
    <div className="info-page">
      <div className="main-and-link">
        <div className="main-info">
          <div className="rank">Rank #{data.coingecko_rank}</div>
          <div className="name">
            <img className="info-img" src={data.image.small}></img>
            <h2>{data.name}</h2>
            <h2>({data.symbol.toUpperCase()})</h2>
          </div>
          <div className="price">
            <h3>${data.market_data.current_price.usd}</h3>
            <h3
              className={
                data.market_data.price_change_percentage_24h > 0
                  ? "green-td"
                  : "red-td"
              }
            >
              {data.market_data.price_change_percentage_24h > 0 ? "⬆ " : "⬇ "}
              {data.market_data.price_change_percentage_24h.toFixed(1)}
            </h3>
          
          </div>
          <div
            className="info-description"
            dangerouslySetInnerHTML={{ __html: data.description.en }}
          ></div>
        </div>

        <div className="links">
          <h2>Links</h2>
          <a href={data.links.homepage[0]}>
            <button className="info-link-bat">Homepage</button>
          </a>
          <a href={`https://www.facebook.com/${data.links.facebook_username}/`}>
            <button className="info-link-bat">Facebook</button>
          </a>
          <a href={data.links.subreddit_url}>
            <button className="info-link-bat">Reddit</button>
          </a>
          <a href={`https://twitter.com/${data.links.twitter_screen_name}`}>
            <button className="info-link-bat">Twitter</button>
          </a>
          <a href={data.links.repos_url.github[0]}>
            <button className="info-link-bat">GitHub</button>
          </a>
          <Converter symbol={data.symbol.toUpperCase()} id={params.id} />
        </div>
      </div>
      <InfoSchedule
        symbol={data.symbol.toUpperCase()}
        price={data.market_data.sparkline_7d}
        date={data.market_data.last_updated}
      />
    </div>
  );
}

export default connect(mapStateToProps)(Info);