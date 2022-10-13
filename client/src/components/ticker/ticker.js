import "./ticker.scss"
import React from "react";
import { connect } from "react-redux";
import { ADD_FAVORITE_TICKER, REMOVE_FAVORITE_TICKER } from "../../store/actions/actions";
import { Line } from "react-chartjs-2";
import { data, options } from "./chartData"
import { getCompanyName } from "./financeData";

function Ticker(props) {

  const [ticker, setTicker] = React.useState(null);

  React.useEffect(() => {
    if (props.tickers) {
      props.tickers[props.tickers.length - 1].forEach(element => {
        if (element.ticker === props.data) {
          setTicker(element);
        }
      });
    }
  }, [props.data, props.tickers, props.currentTicker]);

  const [isFavourite, setIsFavourite] = React.useState(null);

  React.useEffect(() => {
    if (props.favoriteTickers.includes(props.data)) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [props.data, props.favoriteTickers]);

  function favoriteAction() {
    if (props.favoriteTickers.includes(props.data)) {
      props.REMOVE_FAVORITE_TICKER(props.data);
    } else {
      props.ADD_FAVORITE_TICKER(props.data);
    }
  }

  const [isIncreased, setIsIncreased] = React.useState(null);
  const [changeColor, setChangeColor] = React.useState(null);

  React.useEffect(() => {
    if (ticker) {
      if (props.tickers.length >= 2) {
        props.tickers[props.tickers.length - 2].forEach(element => {
          if (element.ticker === ticker.ticker) {
            if (parseInt(ticker.price, 10) > parseInt(element.price, 10)) {
              setIsIncreased("+");
              setChangeColor("green");
            } else if (parseInt(ticker.price, 10) < parseInt(element.price, 10)) {
              setIsIncreased("-");
              setChangeColor("red");
            } else if (parseInt(ticker.price, 10) === parseInt(element.price, 10)) {
              setIsIncreased("");
              setChangeColor("gray");
            }
          }
        });
      } else {
        setIsIncreased("no");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker]);

  const [priceHistory, setPriceHistory] = React.useState([]);

  React.useEffect(() => {
    //reverse()
    props.tickers.forEach(ticker => {
      ticker.forEach(element => {
        if (element.ticker === props.data) {
          if (priceHistory.length >= 20) {
            setPriceHistory(history => [...history.slice(1, 20)])
          }
          setPriceHistory(history => [...history, element.price])
        }
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker]);


  return (
    <div>
      {ticker &&
        <div className="ticker">
          <div className="info">
            <div className="name">
              <h2>{ticker.ticker}   {getCompanyName(ticker.ticker) && (" | " + getCompanyName(ticker.ticker))}</h2>
              <div className="favorite" onClick={() => { favoriteAction() }}>
                <h3>
                  {isFavourite !== null ?
                    (isFavourite ? "★" : "☆")
                    : null}
                </h3>
              </div>
            </div>

            <div className="price">
              <h1>{ticker.price}</h1>
              <h3 className="currency">USD</h3>
            </div>

            <div className="change" style={{ color: changeColor }}>
              <h3>{isIncreased}{ticker.change} ({ticker.change_percent}%)</h3>
            </div>

            <div className="dividend">
              <h4>Dividend: {ticker.dividend}</h4>
              <h4>Yield: {ticker.yield}%</h4>
            </div>
          </div>

          <div className="chart">
            <Line data={data(priceHistory, changeColor)} options={options} />
          </div>
        </div>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tickers: state.tickers,
    favoriteTickers: state.favoriteTickers,
    currentTicker: state.currentTicker
  };
};

const mapDispatchToProps = {
  ADD_FAVORITE_TICKER,
  REMOVE_FAVORITE_TICKER,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ticker);
