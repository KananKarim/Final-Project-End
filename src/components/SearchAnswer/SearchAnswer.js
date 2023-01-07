import { Link } from "react-router-dom";
import "./SearchAnswer.css";

export default function SearchAnswer({ search, data }) {
  if (data === null) return true;
  return (
    <div className={search ? "search-answer" : "search-none"}>
      {data.coins.map((item) => {
        return (
          <div className="result">
            <Link
            //  onClick={reloadPage}
             to={`/${item.id}`}>
                <img className="result-img" src={item.thumb}></img>
            </Link>
            <div>{item.name}</div>
            <div>{item.symbol}</div>
          </div>
        );
      })}
    </div>
  );
}
