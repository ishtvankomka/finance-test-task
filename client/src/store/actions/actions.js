export const SWITCH_CURRENT_TICKER = (ticker) => (dispatch) => {
    dispatch({ type: "SWITCH_CURRENT_TICKER", payload: ticker });
};

export const PUSH_NEW_TICKERS = (tickers) => (dispatch) => {
    dispatch({ type: "PUSH_NEW_TICKERS", payload: tickers });
};

export const ADD_FAVORITE_TICKER = (ticker) => (dispatch) => {
    dispatch({ type: "ADD_FAVORITE_TICKER", payload: ticker });
};

export const REMOVE_FAVORITE_TICKER = (ticker) => (dispatch) => {
    dispatch({ type: "REMOVE_FAVORITE_TICKER", payload: ticker });
};
