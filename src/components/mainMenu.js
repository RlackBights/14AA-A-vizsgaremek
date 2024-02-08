import { LoginPage } from "./loginPage";
import '../App.css';
import { SaveContainer } from "./saveContainer";
import { useContext } from "react";
import { backend, overlayContext, saveContext, userContext } from "../App";
import { parseSave } from "./saveFileManager";

export function MainMenu() {

    const overlay = useContext(overlayContext);
    const user = useContext(userContext);
    const saves = useContext(saveContext);

    return (
        <div className="main-menu">
            <LoginPage />
            <SaveContainer />
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
                onClick={() => {
                  if (localStorage.getItem("userAuthCode") === "") return;
                  const newFetchParams = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      authCode: user.currUser
                    }),
                  };

                  fetch(backend + "/game/getPlayerSaves", newFetchParams).then((res) => res.json()).then((res) => {
                    if (res.status === 200 && res.data.length > 0) {
                      saves.setSaveFiles(parseSave(res.data));
                    }
                    overlay.setCurrOverlay("savePage");
                  })
                }}
              >
                Continue
              </button>
              <button
                onClick={() => {
                  if (localStorage.getItem("userAuthCode") === "") return;
                  
                }}
              >
                New Game
              </button>
              <button>Options</button>
              <button
                onClick={() => {
                  window.close();
                }}
              >
                Quit Game
              </button>
            </div>
            <div id="darken-bg" className="crt"></div>
          </div>
    )}


