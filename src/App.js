import "./App.css";
import React, { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { CenterFocusStrong } from "@mui/icons-material";
import CoinCard from "./CoinCard";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { HiRefresh, HiViewList } from "react-icons/hi";
const requestOptions = {
  method: "GET",
  redirect: "follow",
};

function App() {
  const [coins, setCoins] = useState([]);

  function isFetching() {
    fetch(
      "https://api.coinstats.app/public/v1/coins?skip=0&limit=1000&currency=USD\n",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.coins)
        setCoins(result.coins);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => isFetching(), []);
  const [value, setValue] = useState("");

  const [activated, setActivated] = useState(false);
  const [search, setSearch] = useState(false);

  const searchResult = (item) => {
    setValue(item);
    setActivated(false);
    setSearch(true);
  };
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const getRandom = () => {};

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.id}</span>
      </>
    );
  };

  const makeRandomCoinCard = () => {
    const indexCoin = Math.floor(Math.random() * coins.length);
    const coin = coins[indexCoin];

    // use that num as index to get the coin out of the array

    return (
      <>
        <Grid
          container
          spacing={5}
          justifyContent="center"
          alignItems="flex-start"
          width="100%"
        >
          <Grid item>
            <CoinCard
              name={coin.id}
              image={coin.icon}
              price={coin.price}
              coin={coin}
            />
          </Grid>
        </Grid>
      </>
    );
  };

  let randomFlag = true;

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="App">
      <Grid
        container
        spacing={2}
        alignItems="center"
        display="flex"
        justifyContent="center"
        alignContent={"center"}
        marginLeft = "auto"
        marginRight="auto"
      >
        <Grid item>
          <div className="title">
            <img
              style={{ width: "100px", height: "100px", marginTop: "0%" }}
              src={require("/Users/amanuelreda/Desktop/sea/crypto-world/src/logoC.png")}
            />
          </div>
        </Grid>
        <Grid item>
          <div className="input">
            <ReactSearchAutocomplete
              items={coins}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={searchResult}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
            />
          </div>
        </Grid>
        <Grid item>
          <Button
            className="viewAll"
            variant="contained"
            sx={{ px: 3, mx: "auto" }}
            style={{
              color: "white",
              background: "black",
              marginRight: "5%",
              border: "2px solid white",
              borderRadius: "20px",
            }}
            onClick={() => {
              setActivated(!activated);
            }}
          >
            <HiViewList />
            View All
          </Button>
        </Grid>
      </Grid>
      <div className="bodyPart">
        {activated && (
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Icon</th>
                <th>Symbol</th>
                <th>Name</th>
                <th>Past Hour</th>
                <th>Price</th>
                <th>Market Cap.</th>
                <th>Avail. Supply</th>
                <th>Total Supply</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin, index) => {
                return (
                  <tr>
                    <td key={index}>{coin.rank}</td>
                    <td>
                      <a target="_blank" href={coin.websiteUrl}>
                        <img width="25px" src={coin.icon} key={index} />
                      </a>
                    </td>
                    <td key={index}>{coin.symbol}</td>
                    <td key={index}>
                      {coin.id.length > 20 ? coin.id.substring(0, 19) : coin.id}
                    </td>
                    {coin.priceChange1h > 0 ? (
                      <td style={{ color: "green" }} key={index}>
                        ↑{coin.priceChange1h}%
                      </td>
                    ) : (
                      <td style={{ color: "red" }} key={index}>
                        ↓{coin.priceChange1h}%
                      </td>
                    )}
                    <td key={index}>${coin.price.toFixed(6)}</td>
                    <td key={index}>{coin.marketCap.toFixed(0)}</td>
                    <td key={index}>{coin.availableSupply.toFixed(0)}</td>
                    <td key={index}>{coin.totalSupply.toFixed(0)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {search && (
          <Grid
            container
            spacing={5}
            justifyContent="center"
            alignItems="flex-start"
            width="100%"
          >
            {coins.map((coin, index) => {
              if (coin.id == value.id)
                return (
                  <Grid item>
                    <CoinCard
                      key={index}
                      name={value.id}
                      image={value.icon}
                      price={value.price}
                      coin={coin}
                    />
                  </Grid>
                );
            })}
          </Grid>
        )}
        {!activated && !search && coins.length > 0 && makeRandomCoinCard()}
      </div>
    </div>
  );
}

export default App;
