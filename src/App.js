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
export const overlayContext = createContext();

// Entry point

export function App() {
  const [saveFiles, setSaveFiles] = useState(0);
  const [userAuthCode, setUserAuthCode] = useState("");
  const [currOverlay, setCurrOverlay] = useState("");

  return (
    <userContext.Provider value={{userAuthCode, setUserAuthCode}}>
      <saveContext.Provider value={{saveFiles, setSaveFiles}}>
        <overlayContext.Provider value={{currOverlay, setCurrOverlay}}>
          <RouterProvider router={router}/>
        </overlayContext.Provider>
      </saveContext.Provider>
    </userContext.Provider>
  )
}
