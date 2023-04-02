import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/';
import { Provider } from 'react-redux';
import { store } from './store';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBjALdW73bVlvjzV6kFxNDJgWl04u80pXc",
  authDomain: "lenggiauit-portfolio.firebaseapp.com",
  projectId: "lenggiauit-portfolio",
  storageBucket: "lenggiauit-portfolio.appspot.com",
  messagingSenderId: "193179830743",
  appId: "1:193179830743:web:f19ae0dbb1b92c64486392",
  measurementId: "G-7J67T6KKVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
ReactDOM.render(
  // local key:  522351386373-vd9iv3qesca501vuv0ccbhmth4ema178.apps.googleusercontent.com
  // prod key :  193179830743-540gldadu0rhle4g25ca3sesg4gtq0op.apps.googleusercontent.com
  <GoogleOAuthProvider clientId="522351386373-vd9iv3qesca501vuv0ccbhmth4ema178.apps.googleusercontent.com">
  <Provider store={store} >
    <React.StrictMode>
      <Routes />
      <ToastContainer newestOnTop hideProgressBar position="bottom-right" autoClose={2000} />
    </React.StrictMode >
  </Provider>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
