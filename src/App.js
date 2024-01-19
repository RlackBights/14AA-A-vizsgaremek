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
export const userContext = createContext();
export const saveContext = createContext();

// Entry point

export function App() {
  const [saveFiles, setSaveFiles] = useState(0);
  const [userAuthCode, setUserAuthCode] = useState("");

  return (
    <userContext.Provider value={{userAuthCode, setUserAuthCode}}>
      <saveContext.Provider value={{saveFiles, setSaveFiles}}>
        <RouterProvider router={router}/>
      </saveContext.Provider>
    </userContext.Provider>
  )
}
