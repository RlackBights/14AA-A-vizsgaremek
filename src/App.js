// Imports
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { useState, createContext } from "react";
import { MainMenu } from "./components/mainMenu";
import { TableView } from "./components/tableView";
import { parseSaves, saveFile } from "./components/saveFileManager";
import { Desktop } from "./components/desktop";
import { PCBuild } from "./components/pcBuild";

// Block refresh


// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenu />
  },
  {
    path: "/game/tableView",
    element: <TableView />
  },
  {
    path: "/game/desktop",
    element: <Desktop />
  },
  {
    path: "/game/pcbuild",
    element: <PCBuild />
  },
  {
    path: "*",
    element: <div>ERROR</div>
  }
]);

// Backend location
if (localStorage.getItem("userAuthCode") === null) localStorage.setItem("userAuthCode", "")
if (localStorage.getItem("activeSaveFile") === null) localStorage.setItem("activeSaveFile", JSON.stringify(new saveFile(-1)));
if (localStorage.getItem("gameOptions") === null) localStorage.setItem("gameOptions", JSON.stringify({specialEffects: true}));
//export const backend = 'https://backend-learnthebasics.koyeb.app';
export const backend = 'http://localhost:8000';

// Contexts
export const saveContext = createContext();
export const overlayContext = createContext();
export const userContext = createContext();
export const optionsContext = createContext();

// Entry point
export function App() {
  const [activeSaveFile, setActiveSaveFile] = useState(parseSaves(JSON.parse(localStorage.getItem("activeSaveFile")), false));
  const [currUser, setCurrUser] = useState(localStorage.getItem("userAuthCode"));
  const [optionValues, setOptionValues] = useState(JSON.parse(localStorage.getItem("gameOptions")));
  const [saveFiles, setSaveFiles] = useState([]);
  const [currOverlay, setCurrOverlay] = useState("");

  return (
    <saveContext.Provider value={{saveFiles, setSaveFiles, activeSaveFile, setActiveSaveFile}}>
      <overlayContext.Provider value={{currOverlay, setCurrOverlay}}>
        <userContext.Provider value={{currUser, setCurrUser}}>
          <optionsContext.Provider value={{optionValues, setOptionValues}}>
            <RouterProvider router={router}/>
          </optionsContext.Provider>
        </userContext.Provider>
      </overlayContext.Provider>
    </saveContext.Provider>
  )
}
