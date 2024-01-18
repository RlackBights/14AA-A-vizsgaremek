import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { saveContext, currentSave, updateSave, App } from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MainMenu } from './components/mainMenu';
import { Room } from './components/room';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenu />
  },
  {
    path: "/game",
    element: <Room />
  }
]);

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <App />
    <saveContext.Provider value={{save: currentSave, update: updateSave}}>
      <RouterProvider router={router}/>
    </saveContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
