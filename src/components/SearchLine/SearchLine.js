import { useState } from "react";
import SearchAnswer from "../SearchAnswer/SearchAnswer";
import "./SearchLine.css"

export default function SearchLine() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null)

  const getData = async (q) => {
    let response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${q}`
    );
    
    let data = response.json();
    return data;
  };

  const onChange = (event) => {
    setSearch(event.target.value);
    getData(event.target.value)
        .then((res) => {
          setData(null);
          setData(res);
        })
        .catch((err) => alert(err));
  }

  return (
    <div className="search-line">
        <input value={search} onChange={onChange} type="search" placeholder="Search" className="search-line-input" />
        <SearchAnswer search={search} data={data}/>
    </div>
  );
} 