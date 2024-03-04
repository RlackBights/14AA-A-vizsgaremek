import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MainPage } from './components/mainpage';
import { createContext, useState } from 'react';
import { AdminPage } from './components/adminpage';
import PasswordReset from './components/PasswordReset';

export const backend = "https://backend-learnthebasics.koyeb.app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>
  },
  {
    path: "/admin-page",
    element: <AdminPage/>
  },
  {
    path: "/password-reset/:resetToken",
    element: <PasswordReset/>
  },
  {
    path: "/password-reset",
    element: <MainPage />
  }
])

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
