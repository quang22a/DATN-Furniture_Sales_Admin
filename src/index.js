import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import App from "./App";

import RootReducer from "./app/stores/root-reducer";
import { errorMiddleware } from "./app/core/middleware";
import reportWebVitals from "./reportWebVitals";
import "./assets/stylesheet/styles.scss";

const store = createStore(RootReducer, applyMiddleware(thunk, errorMiddleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
