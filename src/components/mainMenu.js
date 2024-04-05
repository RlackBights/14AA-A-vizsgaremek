import { LoginPage } from "./loginPage";
import '../App.css';
import { SaveContainer } from "./saveContainer";
import { useContext } from "react";
import { optionsContext, overlayContext, saveContext, userContext } from "../App";
import { getHardwareElements, getPlayerSaves } from "./requests";
import OptionsPage from "./optionsPage";
import { NewSave } from "./newSave";
import { displayMessage } from "./notification";
import { soundContext } from '../App';

export function MainMenu() {

    const overlay = useContext(overlayContext);
    const user = useContext(userContext);
    const saves = useContext(saveContext);
    const options = useContext(optionsContext);
    const play = useContext(soundContext).uiClick;

    document.body.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
          overlay.setCurrOverlay("")
      }
    });

    return (
        <div className="main-menu">
            <LoginPage />
            <SaveContainer />
            <OptionsPage />
            <NewSave />
            <h1 id="title-text1" data-text="Learn" className="glitch">
              Learn
            </h1>
            <h1 id="title-text2" data-text="The" className="glitch">
              The
            </h1>
            <h1 id="title-text3" data-text="Basics" className="glitch">
              Basics
            </h1>
            <div className="button-container">
              <button
                onClick={async () => {
                  play();
                  if (localStorage.getItem("userAuthCode") === "") 
                  {
                    displayMessage("You must log in to play!", "error")
                    return;
                  }
                  const hardwareElements = await getHardwareElements();
                  localStorage.setItem("availableHardware", JSON.stringify(hardwareElements));
                  getPlayerSaves(user.currUser).then((res) => {
                    saves.setSaveFiles(res[0]);
                    saves.setStats(res[1]);
                    overlay.setCurrOverlay("savePage");
                  })
                }}
              >
                Continue
              </button>
              <button
                onClick={() => {
                  play();
                  if (localStorage.getItem("userAuthCode") === "")
                  {
                    displayMessage("You must log in to play!", "error")
                    return;
                  }
                  overlay.setCurrOverlay("newSave");
                }}
              >
                New Game
              </button>
              <button onClick={() => {
                play();
                overlay.setCurrOverlay("optionsPage");
              }}>Options</button>
              <button
                onClick={() => {
                  play();
                  window.close();
                }}
              >
                Quit Game
              </button>
            </div>
            <div id="darken-bg" className={options.optionValues.specialEffects ? "crt" : ""}></div>
          </div>
    )}


