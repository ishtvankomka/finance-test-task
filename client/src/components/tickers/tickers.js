import "./tickers.scss"
import React from "react";
import { connect } from "react-redux";
import Ticker from "../ticker/ticker";

function Tickers(props) {

  const [ticker, setTicker] = React.useState(null);

  React.useEffect(() => {
    if (props.currentTicker !== "favorites") {
      setTicker(props.currentTicker);
    }
  }, [props.currentTicker])

  return (
    <div className="tickers">
      {ticker && <Ticker data={ticker} />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentTicker: state.currentTicker,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tickers);
