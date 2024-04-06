// Imports
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import { useState, createContext, useEffect } from "react";
import { MainMenu } from "./components/mainMenu";
import { TableView } from "./components/tableView";
import { parseSaves, saveFile } from "./components/saveFileManager";
import { Desktop } from "./components/desktop";
import { PCBuild } from "./components/pcBuild";
import { GameStats, parseStats } from "./components/statsManager";
import { Notification } from "./components/notification";
import musicSource from './assets/game-music.mp3';
import click from './assets/ui-click.mp3';
import useSound from "use-sound";

// Router
const router = createHashRouter([
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
if (localStorage.getItem("activeSaveFile") === null || localStorage.getItem("activeSaveFile") === "undefined") localStorage.setItem("activeSaveFile", JSON.stringify(new saveFile(-1)));
if (localStorage.getItem("gameOptions") === null) localStorage.setItem("gameOptions", JSON.stringify({specialEffects: true, volume: [1.0, 0.5]}));
if (localStorage.getItem("stats") === null) localStorage.setItem("stats", JSON.stringify(new GameStats()));
if (localStorage.getItem("volume") === null) localStorage.setItem("volume", JSON.stringify([1.0, 0.5]));
if (sessionStorage.getItem("ingame") === null) sessionStorage.setItem("ingame", "false");
if (sessionStorage.getItem("pauseMenuLocked") === null) sessionStorage.setItem("pauseMenuLocked", "false");
export const backend = 'https://backend-learnthebasics.koyeb.app';
//export const backend = 'http://localhost:8000';

// Contexts
export const saveContext = createContext();
export const overlayContext = createContext();
export const userContext = createContext();
export const optionsContext = createContext();
export const soundContext = createContext();

let musicInterval = null;

// Entry point
export function App() {
  const [activeSaveFile, setActiveSaveFile] = useState(parseSaves(JSON.parse(localStorage.getItem("activeSaveFile")), false));
  const [currUser, setCurrUser] = useState(localStorage.getItem("userAuthCode"));
  const [optionValues, setOptionValues] = useState(JSON.parse(localStorage.getItem("gameOptions")));
  const [stats, setStats] = useState(parseStats(JSON.parse(localStorage.getItem("stats"))));
  const [saveFiles, setSaveFiles] = useState([]);
  const [currOverlay, setCurrOverlay] = useState("");
  const [music, musicData] = useSound(musicSource, { volume: optionValues.volume[1] });
  const [uiClick, uiClickData] = useSound(click, { volume: optionValues.volume[0] });

  useEffect(() => {
    if (musicInterval !== null) clearInterval(musicInterval);
    music();
    musicInterval = setInterval(() => {
      music();
    }, musicData.duration)
  }, [music]);

  return (
    <saveContext.Provider value={{saveFiles, setSaveFiles, activeSaveFile, setActiveSaveFile, stats, setStats}}>
      <overlayContext.Provider value={{currOverlay, setCurrOverlay}}>
        <userContext.Provider value={{currUser, setCurrUser}}>
          <optionsContext.Provider value={{optionValues, setOptionValues}}>
            <soundContext.Provider value={{uiClick}}>
              <Notification />
              <RouterProvider router={router}/>
            </soundContext.Provider>
          </optionsContext.Provider>
        </userContext.Provider>
      </overlayContext.Provider>
    </saveContext.Provider>
  )
}
