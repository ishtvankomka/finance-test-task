import "./main.scss"
import React from "react";
import Navigation from "../navigation/navigation";
import Tickers from "../tickers/tickers";
import Favorites from "../favorites/favorites";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { io } from 'socket.io-client';
import { connect } from "react-redux";
import { PUSH_NEW_TICKERS } from "../../store/actions/actions";

const URL = "http://localhost:4000";
const socket = io(URL, { autoConnect: true });

function Main(props) {

  function getTickers() {
    socket.emit('start');
    socket.on('ticker', function (response) {
      const res = Array.isArray(response) ? response : [response];
      props.PUSH_NEW_TICKERS(res);
    });
    console.clear();
  };

  React.useEffect(() => {
    getTickers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="main">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Tickers />} />
          <Route path="/:ticker" element={<Tickers />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tickers: state.tickers
  };
};

const mapDispatchToProps = {
  PUSH_NEW_TICKERS
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
