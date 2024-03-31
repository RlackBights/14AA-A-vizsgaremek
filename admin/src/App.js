import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MainPage } from './components/mainpage';
import { createContext, useState } from 'react';
import PasswordReset from './components/PasswordReset';
import { AdminPage } from './components/adminpage';

export const backend = "https://backend-learnthebasics.koyeb.app";
//export const backend = "http://localhost:8000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />
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
    element: <PasswordReset />
  }
], {
  basename: "/learnthebasics"
})

if (localStorage.getItem("authToken") == null) localStorage.setItem("authToken", "");
if (localStorage.getItem("stats") == null) localStorage.setItem("stats", JSON.stringify({"tips":{"HTML_tips":"","CSS_tips":"","JavaScript_tips":""}}))
export const userContext = createContext();

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState(localStorage.getItem("stats"));

  return (
    <div className="App">
      <userContext.Provider value={{ authToken, setAuthToken, isAdmin, setIsAdmin, stats, setStats }}>
        <RouterProvider router={router} />
      </userContext.Provider>
    </div>
  );
}

export default App;
