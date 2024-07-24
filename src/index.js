import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import './Styles/bootstrap-grid.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="637559961080-n0epmve6c5t79rbcfner1vs48sr6gkq9.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);