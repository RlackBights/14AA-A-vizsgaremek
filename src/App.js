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

// Render State Logic

function getGameState(gameState) {
  switch (gameState) {
    default:
      return (<> <MainMenu /> {/*cookie.get("user").length > 0 && <SaveContainer />*/} </>)
  
    case "Room":
      return ( <> <Room/> </>)
  
    case "Desktop":
      return ( <> <Desktop/> <Taskbar/> </>)
  
    case "Taskbar":
      return ( <>  </>)
  
  }
}

// Entry point

function App() {

  const [saves, setSaves] = useState([null, null, null]);
  

  let updateData = async (saveId, newSave) => {
    let tempSaves = saves;
    tempSaves[saveId] = newSave;
    setSaves(tempSaves);
  };

  // State logic

  return (
    <div className="App">
      <saveContext.Provider value={{saves, updateData}}>
        {getGameState(cookie.get("gameState"))}
      </saveContext.Provider>
    </div>
  );
}

export default App;
