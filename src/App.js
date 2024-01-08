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

document.cookie = (cookie.get("activeSaveSlot") == null) ? "activeSaveSlot = null;" : ("activeSaveSlot = " + cookie.get("activeSaveSlot"));
let timerAllowed = false;

// Contexts

let updateData = async () => {};

export const updateDataContext = createContext(updateData);
export const saveContext = createContext();

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

function App() {

  const [saves, setSaves] = useState([null, null, null]);
  // Timing function
  /*
  if (!timerAllowed) {
    timerAllowed = true;
    setInterval(() => {
      if (cookie.get("gameState") !== "MainMenu") {
        switch (cookie.get("activeSaveSlot")) {
          case "1":
            setData(save1, 1, undefined, undefined, save1.getSaveTime() + 1);
            break;
          case "2":
            setData(save2, 2, undefined, undefined, save2.getSaveTime() + 1);
            break;
          case "3":
            setData(save3, 3, undefined, undefined, save3.getSaveTime() + 1);
            break;
          default:
            break;
        }
      }
    }, 1000);
  }
  */

  // State logic
  

  switch (cookie.get("gameState")) {
    default:
      return (
        <div className="App">
          <saveContext.Provider value={saves}>
            <updateDataContext.Provider value={updateData}>
              <MainMenu />
              {cookie.get("user").length > 0 &&
                <SaveContainer />
              }
              
            </updateDataContext.Provider>
          </saveContext.Provider>
        </div>
      );
    case "Room":
      return (
        <div className="App">
          <saveContext.Provider value={saves}>
            <Room />
          </saveContext.Provider>
        </div>
      );
    case "Desktop":
      return (
        <div className="App">
          <saveContext.Provider value={saves}>
            <Desktop />
            <Taskbar />
          </saveContext.Provider>
        </div>
      );
    case "Taskbar":
      return (
        <div className="App">
        </div>
      )
  }
}

export default App;
