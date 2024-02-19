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
if (localStorage.getItem("gameOptions") === null) localStorage.setItem("gameOptions", JSON.stringify({specialEffects: true}));
export const backend = 'https://backend-learnthebasics.koyeb.app';

// Contexts
<<<<<<< HEAD

//let updateData = async () => {};

//export const updateDataContext = createContext(updateData);
//export const saveContext = createContext([[],[],[]]);
=======
export const saveContext = createContext();
export const overlayContext = createContext();
export const userContext = createContext();
export const optionsContext = createContext();
>>>>>>> Rework-save-management

// Entry point
export function App() {
  const [activeSaveFile, setActiveSaveFile] = useState(JSON.parse(localStorage.getItem("activeSaveFile")));
  const [currUser, setCurrUser] = useState(localStorage.getItem("userAuthCode"));
  const [optionValues, setOptionValues] = useState(JSON.parse(localStorage.getItem("gameOptions")));
  const [saveFiles, setSaveFiles] = useState([]);
  const [currOverlay, setCurrOverlay] = useState("");

<<<<<<< HEAD
function App() {

  // States

  //const [save1, setSave1] = useState(new saveFile(1, -1, 0, 0, 0, 0, 0, 0));
  //const [save2, setSave2] = useState(new saveFile(2, -1, 0, 0, 0, 0, 0, 0));
  //const [save3, setSave3] = useState(new saveFile(3, -1, 0, 0, 0, 0, 0, 0));

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
          {/*<saveContext.Provider value={[[save1, setSave1], [save2, setSave2], [save3, setSave3]]}>*/}
            {/*<updateDataContext.Provider value={updateData}>*/}
              <MainMenu />
              {cookie.get("user").length > 0 &&
                <SaveContainer />
              }
              
            {/*</updateDataContext.Provider>*/}
          {/*</saveContext.Provider>*/}
        </div>
      );
    case "Room":
      return (
        <div className="App">
        {/*<saveContext.Provider value={[[save1, setSave1], [save2, setSave2], [save3, setSave3]]}>*/}
            <Room />
          {/*</saveContext.Provider>*/}
        </div>
      );
    case "Desktop":
      return (
        <div className="App">
        {/*<saveContext.Provider value={[[save1, setSave1], [save2, setSave2], [save3, setSave3]]}>*/}
            <Desktop />
            <Taskbar />
          {/*</saveContext.Provider>*/}
        </div>
      );
    case "Taskbar":
      return (
        <div className="App">
        </div>
      )
  }
=======
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
>>>>>>> Rework-save-management
}
