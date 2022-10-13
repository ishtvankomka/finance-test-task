const initialState = {
    currentTicker: null,
    favoriteTickers: [],
    tickers: [],
};

export const storeReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SWITCH_CURRENT_TICKER":
            {
                return {
                    ...state,
                    currentTicker: action.payload
                };
            }

        case "PUSH_NEW_TICKERS":
            {
                let cp = [...state.tickers];

                if (cp.length >= 20) {
                    cp = cp.slice(1, 20);
                }

                cp.push(action.payload);

                return {
                    ...state,
                    tickers: [...cp]
                };
            }

        case "ADD_FAVORITE_TICKER":
            {
                let cp = [...state.favoriteTickers];

                if (!cp.includes(action.payload)) {
                    cp.push(action.payload);
                }

                return {
                    ...state,
                    favoriteTickers: cp
                };
            }

        case "REMOVE_FAVORITE_TICKER":
            {
                let cp = [...state.favoriteTickers];

                if (cp.includes(action.payload)) {
                    const index = cp.indexOf(action.payload);
                    cp.splice(index, 1);
                }

                return {
                    ...state,
                    favoriteTickers: cp
                };
            }

        default:
            {
                return state;
            }
    }
};
