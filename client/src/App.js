import './App.scss';
import React from "react";
import Main from './components/main/main';
import { Provider } from "react-redux";
import { store } from './store/store';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
let persistor = persistStore(store)


function App() {

  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}

export default App;