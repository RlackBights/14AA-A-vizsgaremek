import { LoginPage } from "./loginPage";
import { cookie } from "./cookie";
import '../App.css';
import { useContext } from "react";
import { saveContext } from "../App";

export function MainMenu() {
    const saves = useContext(saveContext);
    return (
        <div className="main-menu">
            <LoginPage />
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
                  saves.setTest(x => x + 1);
                  if (cookie.get("user") === "") return;

                }}
              >
                {saves.test}
              </button>
              <button
                onClick={() => {
                  if (cookie.get("user") === "") return;
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


