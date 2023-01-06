import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


window.Pusher = Pusher;

window.Echo = new Echo({
    // broadcaster: 'pusher',
    // key: import.meta.env.VITE_PUSHER_APP_KEY,
    // cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    // wsHost: window.location.hostname,
    // wsPort: 6001,
    // wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
    // forceTLS: true,
    // enabledTransports: ['ws', 'wss'],
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
});


