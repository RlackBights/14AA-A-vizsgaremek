import { LoginPage } from "./loginPage";
import '../App.css';
import { SaveContainer } from "./saveContainer";
import { useContext } from "react";
import { overlayContext } from "../App";

export function MainMenu() {

    const overlay = useContext(overlayContext);

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
                  overlay.setCurrOverlay("savePage");
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


