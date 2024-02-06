import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { useState, createContext } from "react";
import { MainMenu } from "./components/mainMenu";
import { parseSave } from "./components/saveFileManager";

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

console.log(parseSave([{"saveId": "masodikteszt","lvl": 5,"time": 6969,"money": 10000,"cpuId": 2,"gpuId": 1,"ramId": 2,"stgId": 0,"lastBought": "{\"cpu\": 3, \"gpu\":1, \"ram\":2, \"stg\":1}"},
  {"saveId": "elsoteszt","lvl": 10,"time": 4004014,"money": 1000,"cpuId": 2,"gpuId": 1,"ramId": 3,"stgId": 2,"lastBought": "{\"cpu\": 2, \"gpu\":2, \"ram\": 3, \"stg\": 2}"}
]))


// Entry point

export function App() {
  const [saveFiles, setSaveFiles] = useState([]);
  const [currOverlay, setCurrOverlay] = useState("");
  const [currUser, setCurrUser] = useState(window.localStorage.getItem("userAuthCode"));

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
