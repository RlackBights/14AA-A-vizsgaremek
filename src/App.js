import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { useState, createContext } from "react";
import { MainMenu } from "./components/mainMenu";

//router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenu />
  }
]);

// Contexts
export const saveContext = createContext();

// Entry point

export function App() {
  const [test, setTest] = useState(0);

  return (
      <saveContext.Provider value={{test, setTest}}>
        <RouterProvider router={router}/>
      </saveContext.Provider>
  )
}
