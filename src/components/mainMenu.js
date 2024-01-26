import { LoginPage } from "./loginPage";
import '../App.css';
import { SaveContainer } from "./saveContainer";

export function MainMenu() {

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
            <div className="button-container" style={{zIndex: 1000}}>
              <button
                onClick={() => {
                  if (localStorage.getItem("userAuthCode") === "") return;
                  
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


