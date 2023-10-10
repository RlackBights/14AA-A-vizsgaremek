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
let runtimes = 0;

// Contexts

let updateData = async () => {};

export const updateDataContext = createContext(updateData);
export const saveContext = createContext([[],[],[]]);

// Entry point

function App() {

  // States

  const [save1, setSave1] = useState(new saveFile(1, -1, 0, 0, 0, 0, 0, 0));
  const [save2, setSave2] = useState(new saveFile(2, -1, 0, 0, 0, 0, 0, 0));
  const [save3, setSave3] = useState(new saveFile(2, -1, 0, 0, 0, 0, 0, 0));

  // Timing function

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


  // State logic
  
  switch (cookie.get("gameState")) {
    default:
      return (
        <div className="App">
          <saveContext.Provider value={[[save1, setSave1], [save2, setSave2], [save3, setSave3]]}>
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
          <saveContext.Provider value={[[save1, setSave1], [save2, setSave2], [save3, setSave3]]}>
            <Room />
          </saveContext.Provider>
        </div>
      );
    case "Desktop":
      return (
        <div className="App">
          <saveContext.Provider value={[[save1, setSave1], [save2, setSave2], [save3, setSave3]]}>
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
