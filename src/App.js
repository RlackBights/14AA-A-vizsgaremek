import "./App.css";
import { useState, createContext } from "react";
import { cookie } from "./components/cookie";
import { MainMenu } from "./components/mainMenu";
import { Room } from "./components/room";
import { Desktop } from "./components/desktop";
import { Taskbar } from "./components/taskbar";
import { getData, setData } from "./components/saveCommManager";
import { SaveContainer } from "./components/saveContainer";
import { saveFile } from "./components/saveFileManager";

// Base variables

cookie.set("activeSaveSlot", (cookie.get("activeSaveSlot") == "") ? ";" : (cookie.get("activeSaveSlot")));
let timerAllowed = false;

// Contexts

export const saveContext = createContext();
export let currentSave = 0;
export function updateSave()
{
  currentSave++;
  console.log(currentSave);
}  

function getSaveFiles(userAuthCode)
{
  var options = {
    method: "POST",
    mode: "no-cors", 
    cache: "no-cache", 
    headers: {
      "Content-Type": "application/json",
    }
  }
  fetch()
}

// Entry point

export function App() {
  console.log("RERENDER")
}
