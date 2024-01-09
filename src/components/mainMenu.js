import { LoginPage } from "./loginPage";
import { cookie } from "./cookie";
import '../App.css';


export function changeToGame() {
    document.getElementsByClassName("save-container")[0].style.top = "100vh";
    document.getElementById("save-back-button").style.display = "none";
    document.getElementById("user-icon").style.display = "none";
    setTimeout(() => {
      document.getElementById("title-text").classList.add("slide-up");
      setTimeout(() => {
        document
          .getElementsByClassName("button-container")[0]
          .childNodes.forEach((btn) => {
            btn.classList.add("slide-left");
          });
        setTimeout(() => {
          document.getElementById("darken-bg").style.transition = "opacity 1s";
          document.getElementById("darken-bg").style.opacity = 0;
          setTimeout(() => {
            cookie.set("gameState", "Room");
            window.location.reload();
          }, 2000);
        }, 1000);
      }, 500);
    }, 500);
  }

export function MainMenu() {

    return (
        <div className="main-menu">
            <LoginPage />
            <h1 id="title-text1" data-text="Learn" className="glitch">
              {/*}
              <p className="glitch">
                <span aria-hidden="true">
              Learn<br/>The<br/>Basics</span>
                <span aria-hidden="true">
              Learn<br/>The<br/>Basics</span>
    </p>*/}
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
                  if (cookie.get("user") === "") return;

                }}
              >
                Continue
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


