import { LoginPage } from "./loginPage";
import '../App.css';
import { SaveContainer } from "./saveContainer";
import { useContext } from "react";
import { backend, optionsContext, overlayContext, saveContext, userContext } from "../App";
import { getHardwareElements, getPlayerSaves, requestSaveFileCreation } from "./requests";
import { saveFile } from "./saveFileManager";
import OptionsPage from "./optionsPage";
import { NewSave } from "./newSave";

export function MainMenu() {

    const overlay = useContext(overlayContext);
    const user = useContext(userContext);
    const saves = useContext(saveContext);
    const options = useContext(optionsContext);

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
                  if (localStorage.getItem("userAuthCode") === "") return;
                  const hardwareElements = await getHardwareElements();
                  localStorage.setItem("availableHardware", JSON.stringify(hardwareElements));
                  getPlayerSaves(user.currUser).then((res) => {
                    saves.setSaveFiles(res);
                    overlay.setCurrOverlay("savePage");
                  })
                }}
              >
                Continue
              </button>
              <button
                onClick={() => {
                  if (localStorage.getItem("userAuthCode") === "") return;
                  overlay.setCurrOverlay("newSave");
                }}
              >
                New Game
              </button>
              <button onClick={() => {
                overlay.setCurrOverlay("optionsPage");
              }}>Options</button>
              <button
                onClick={() => {
                  window.close();
                }}
              >
                Quit Game
              </button>
            </div>
            <div id="darken-bg" className={options.optionValues.specialEffects ? "crt" : ""}></div>
          </div>
    )}


