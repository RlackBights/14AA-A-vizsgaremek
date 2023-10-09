import "./App.css";
import { useState, createContext } from "react";
import { saveFile } from "./components/savefile_management";
import { cookie } from "./components/cookie";
import { MainMenu } from "./components/mainMenu";
import { SaveContainer } from "./components/saveContainer";
import { Room } from "./components/room";
import { Desktop } from "./components/desktop";
import { Taskbar } from "./components/taskbar";

// Base variables

let save1data = new saveFile(-1, 0, 0, "", "", "", "");
let save2data = new saveFile(-1, 0, 0, "", "", "", "");
let save3data = new saveFile(-1, 0, 0, "", "", "", "");
document.cookie = (cookie.get("activeSaveSlot") == null) ? "activeSaveSlot = null;" : ("activeSaveSlot = " + cookie.get("activeSaveSlot"));
let timerAllowed = 0;

// Contexts

let updateData = async () => {};
let saves = [[], [], []];



export const updateDataContext = createContext(updateData);
export let saveContext = createContext(saves);

// Entry point

function App() {

  // States

  const [save1, setSave1] = useState(save1data);
  const [save2, setSave2] = useState(save2data);
  const [save3, setSave3] = useState(save3data);

  // Context value

  saves = [[save1, save1data, setSave1], [save2, save2data, setSave2], [save3, save3data, setSave3]];

  // Timing function

  if (timerAllowed == 0) {
    timerAllowed++;
    setInterval(() => {
      if (cookie.get("gameState") != "MainMenu") {
        switch (cookie.get("activeSaveSlot")) {
          case "1":
            save1data.addTime();
            break;
          case "2":
            save2data.addTime();
            break;
          case "3":
            save3data.addTime();
            break;
          default:
            break;
        }
      }
    }, 1000);
  }

  // State logic

  switch (cookie.get("gameState")) {
    default:
      return (
        <div className="App">
          <saveContext.Provider value={saves}>
            <updateDataContext.Provider value={updateData}>
              <MainMenu />
              <SaveContainer />
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
