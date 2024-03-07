import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MainPage } from './components/mainPage';
import { createContext, useState } from 'react';
import PasswordReset from './components/passwordReset';
import { AdminPage } from './components/adminpage';

export const backend = "https://backend-learnthebasics.koyeb.app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>
  },
  {
    path: "/admin-page",
    element: <AdminPage />
  },
  {
    path: "/password-reset",
    element: <MainPage />
  },
  {
    path: "/password-reset/*",
    element: <PasswordReset/>
  }
], {
  basename: "/learnthebasics"
})

if (localStorage.getItem("authToken") == null) localStorage.setItem("authToken", "");
export const userContext = createContext();

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div className="App">
      <userContext.Provider value={{authToken, setAuthToken, isAdmin, setIsAdmin}}>
        <RouterProvider router={router} />
      </userContext.Provider>
    </div>
  );
}

export default App;
