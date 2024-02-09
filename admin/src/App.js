import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MainPage } from './components/mainpage';
import { createContext, useState } from 'react';
import { AdminPage } from './components/adminpage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>
  },
  {
    path: "/admin-page",
    element: <AdminPage/>
  }
])

if (localStorage.getItem("authToken") == null) localStorage.setItem("authToken", "");
export const userContext = createContext();

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  return (
    <div className="App">
      <userContext.Provider value={{authToken, setAuthToken}}>
        <RouterProvider router={router} />
      </userContext.Provider>
    </div>
  );
}

export default App;
