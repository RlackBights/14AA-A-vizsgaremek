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

// Backend location

if (localStorage.getItem("userAuthCode") == null) localStorage.setItem("userAuthCode", "")
export const backend = 'https://backend-learnthebasics.koyeb.app';

// Contexts
export const saveContext = createContext();
export const overlayContext = createContext();
export const userContext = createContext();

// Entry point

export function App() {
  const [saveFiles, setSaveFiles] = useState([]);
  const [currOverlay, setCurrOverlay] = useState("");
  const [currUser, setCurrUser] = useState(window.localStorage.getItem("userAuthCode"));

  console.log(saveFiles);

  return (
    <saveContext.Provider value={{saveFiles, setSaveFiles}}>
      <overlayContext.Provider value={{currOverlay, setCurrOverlay}}>
        <userContext.Provider value={{currUser, setCurrUser}}>
          <RouterProvider router={router}/>
        </userContext.Provider>
      </overlayContext.Provider>
    </saveContext.Provider>
  )
}
