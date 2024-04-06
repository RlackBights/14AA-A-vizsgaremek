import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

document.body.addEventListener('keydown', (e) => {
  if ((e.altKey && e.key !== "F4") || e.key === "F11") e.preventDefault();
})

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <App />
);
reportWebVitals();
