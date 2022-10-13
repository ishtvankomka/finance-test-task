import "./favorites.scss"
import React from "react";
import { connect } from "react-redux";
import Ticker from "../ticker/ticker";

function Favorites(props) {

  return (
    <div className="tickers">
      {props.currentTicker === "favorites" &&
        <div>
          {props.favoriteTickers.length > 0 ?
            props.favoriteTickers.map((ticker) => {
              return (
                <div key={ticker}>
                  <Ticker data={ticker} />
                </div>
              )
            })
            :
            <div className="no_favorites">
              <h1>It looks like you don't have any favorited 🤷</h1>
            </div>
          }
        </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentTicker: state.currentTicker,
    favoriteTickers: state.favoriteTickers
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

