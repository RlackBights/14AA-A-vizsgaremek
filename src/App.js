// Imports
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { useState, createContext } from "react";
import { MainMenu } from "./components/mainMenu";
import { TableView } from "./components/tableView";
import { saveFile } from "./components/saveFileManager";

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
    path: "*",
    element: <div>ERROR</div>
  }
]);

// Backend location
if (localStorage.getItem("userAuthCode") === null) localStorage.setItem("userAuthCode", "")
if (localStorage.getItem("activeSaveFile") === null) localStorage.setItem("activeSaveFile", JSON.stringify(new saveFile()));
export const backend = 'https://backend-learnthebasics.koyeb.app';

// Contexts
export const saveContext = createContext();
export const overlayContext = createContext();
export const userContext = createContext();

// Entry point
export function App() {
  const [activeSaveFile, setActiveSaveFile] = useState(JSON.parse(localStorage.getItem("activeSaveFile")));
  const [saveFiles, setSaveFiles] = useState([]);
  const [currOverlay, setCurrOverlay] = useState("");
  const [currUser, setCurrUser] = useState(window.localStorage.getItem("userAuthCode"));
  
  console.log(window.location.href);

  /*
  window.onbeforeunload = async () =>
  {
    switch (window.location.href) {
      case (a) => (a.includes("/game/tableView")):
        break;
    
      default:
        break;
    }
    setActiveSaveFile(null);
  }
  */

  return (
    <saveContext.Provider value={{saveFiles, setSaveFiles, activeSaveFile, setActiveSaveFile}}>
      <overlayContext.Provider value={{currOverlay, setCurrOverlay}}>
        <userContext.Provider value={{currUser, setCurrUser}}>
          <RouterProvider router={router}/>
        </userContext.Provider>
      </overlayContext.Provider>
    </saveContext.Provider>
  )
}
