import "./App.css";
import { useState, createContext } from "react";
import { cookie } from "./components/cookie";
import { MainMenu } from "./components/mainMenu";
import { SaveContainer } from "./components/saveContainer";
import { Room } from "./components/room";
import { Desktop } from "./components/desktop";
import { Taskbar } from "./components/taskbar";
import { getData, setData } from "./components/saveCommHandler";
import { convertSave, saveFile } from "./components/saveFileManagement";

// Base variables

document.cookie = (cookie.get("activeSaveSlot") == null) ? "activeSaveSlot = null;" : ("activeSaveSlot = " + cookie.get("activeSaveSlot"));
let timerAllowed = false;
let counter;

// Contexts

let updateData = async () => {};
let saves = [[], [], []];

export const updateDataContext = createContext(updateData);
export let saveContext = createContext<Array>(saves);



// Entry point

function App() {

  // States

  const [save1, setSave1] = useState();
  const [save2, setSave2] = useState();
  const [save3, setSave3] = useState();

  // Context value
  saves = [[save1, setSave1], [save2, setSave2], [save3, setSave3]];

  // Timing function

  if (!timerAllowed) {
    timerAllowed = true;
    setInterval(() => {
      if (cookie.get("gameState") != "MainMenu") {
        switch (cookie.get("activeSaveSlot")) {
          case "1":
            setData(save1, 1, undefined, undefined, save1.time + 1);
            break;
          case "2":
            setData(save2, 2, undefined, undefined, save2.time + 1);
            break;
          case "3":
            setData(save3, 3, undefined, undefined, save3.time + 1);
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
