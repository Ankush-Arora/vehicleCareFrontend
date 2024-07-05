import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './Store';
import {positions,transitions,Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// import { createHashHistory } from 'history';
// import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';


const options={
  timeout:5000,
  positions:positions.BOTTOM_CENTER,
  transitions:transitions.SCALE,
}

const root = ReactDOM.createRoot(document.getElementById('root'));
// const history=createHashHistory();
root.render(
  <Provider store={store}>
    {/* <AlertProvider template={AlertTemplate} {...options}>  */}
    <AlertProvider template={AlertTemplate} timeout={5000} positions={positions.MIDDLE}
     transitions={transitions.SCALE}>
    <App />
    </AlertProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
