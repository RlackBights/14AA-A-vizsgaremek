import { LoginPage } from "./loginPage";
import { cookie } from "./cookie";
import { useContext } from "react";
import { saveContext } from "../App";
import { refreshSaves, openSaves } from "./saveMenuManager";
import '../App.css';
import { convertSave } from "./saveFileManager";
import { getData, setData } from "./saveCommManager";


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

    

    const save1 = useContext(saveContext)[0][0];
    const setSave1 = useContext(saveContext)[0][1];
    const save2 = useContext(saveContext)[1][0];
    const setSave2 = useContext(saveContext)[1][1];
    const save3 = useContext(saveContext)[2][0];
    const setSave3 = useContext(saveContext)[2][1];

    async function updateData () {
      let myJson = await getData().then((value) => {
        return value;
      });
  
      refreshSaves(save1, save2, save3);
  }

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

                  updateData();
                  
                  switch (-1) {
                    case save1.lvl:
                      setData(save1, 1, 0)
                      setSave1((save1) => {save1.lvl = 0; return save1});
                      cookie.set("activeSaveSlot", 1);
                      changeToGame();
                      break;

                    case save2.lvl:
                      setData(save2, 2, 0);
                      setSave2((save2) => {save2.lvl = 0; return save2});
                      cookie.set("activeSaveSlot", 2);
                      changeToGame();
                      break;

                    case save3.lvl:
                      setData(save3, 3, 0);
                      setSave3((save3) => {save3.lvl = 0; return save3});
                      cookie.set("activeSaveSlot", 3);
                      changeToGame();
                      break;

                    default:
                      openSaves();
                      break;
                  }
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


