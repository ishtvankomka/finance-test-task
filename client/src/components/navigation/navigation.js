import "./navigation.scss"
import React from "react";
import { connect } from "react-redux";
import { SWITCH_CURRENT_TICKER } from "../../store/actions/actions";
import { useNavigate } from "react-router-dom";

function Navigation(props) {

    const [ticker, setTicker] = React.useState(null);

    React.useEffect(() => {
        setTicker(props.tickers[0]);
    }, [props.tickers])

    const navigate = useNavigate();
    const redirect = React.useCallback(() => navigate('/' + props.currentTicker, { replace: true }), [navigate, props.currentTicker]);

    React.useEffect(() => {
        if (/[^/]*$/.exec(`${window.location}`)[0] === "") {
            props.SWITCH_CURRENT_TICKER(props.tickers[0][0].ticker);
            redirect();
        } else if (/[^/]*$/.exec(`${window.location}`)[0] !== props.currentTicker) {
            props.SWITCH_CURRENT_TICKER(/[^/]*$/.exec(`${window.location}`)[0]);
            redirect();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function switchPage(ticker) {
        props.SWITCH_CURRENT_TICKER(ticker);
    };

    React.useEffect(() => {
        redirect();
    }, [redirect])


    return (
        <nav>
            <form>
                <div className="tickets_list">
                    {ticker && ticker.map((ticker, i) => {
                        return (
                            <React.Fragment key={"fragment" + ticker.ticker + i}>
                                <input key={"input" + ticker.ticker + i} id={ticker.ticker} type="radio" name="rad" value={ticker.ticker} checked={(ticker.ticker === props.currentTicker)} onChange={() => { }} />
                                <label key={"label" + ticker.ticker + i} htmlFor={ticker.ticker} onClick={() => { switchPage(ticker.ticker) }}>
                                    {ticker.ticker}
                                </label>
                            </React.Fragment>
                        );
                    })}
                </div>

                <input id="favorites" type="radio" name="rad" value="favorites" checked={("favorites" === props.currentTicker)} onChange={() => { }} />
                <label className="favorites" htmlFor="favorites" onClick={() => { switchPage("favorites") }}>
                    {props.favoriteTickers.length ? "★" : "☆"}
                </label>
            </form>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        currentTicker: state.currentTicker,
        tickers: state.tickers,
        favoriteTickers: state.favoriteTickers
    };
};

const mapDispatchToProps = {
    SWITCH_CURRENT_TICKER
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
