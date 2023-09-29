import { LoginPage } from "./loginPage";
import { cookie } from "./cookie";
import { useContext } from "react";
import { saveContext } from "../App";
import { refreshSaves, openSaves } from "./saveMenuManager";
import { getData, setData } from "./saveCommHandler";
import '../App.css';
import { convertSave } from "./savefile_management";


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

    async function updateData () {
        let myJson = await getData().then((value) => {
          return value;
        });
    
        save1data = convertSave(myJson[0]);
        setSave1((save1) => save1data);
    
        save2data = convertSave(myJson[1]);
        setSave2((save2) => save2data);
    
        save3data = convertSave(myJson[2]);
        setSave3((save3) => save3data);
    
        refreshSaves(save1, save2, save3);
    }

    const save1 = useContext(saveContext)[0][0];
    let save1data = useContext(saveContext)[0][1];
    const setSave1 = useContext(saveContext)[0][2];
    const save2 = useContext(saveContext)[1][0];
    let save2data = useContext(saveContext)[1][1];
    const setSave2 = useContext(saveContext)[1][2];
    const save3 = useContext(saveContext)[2][0];
    let save3data = useContext(saveContext)[2][1];
    const setSave3 = useContext(saveContext)[2][2];

    return (
        <div className="main-menu">
            <LoginPage />
            <h1 id="title-text" className="">
              LearnTheBasics.it
            </h1>
            <div className="button-container">
              <button
                onClick={() => {

                  if (cookie.get("user") == null) {
                    return;
                  }

                  updateData();
                  refreshSaves(save1, save2, save3);
                  openSaves();
                }}
              >
                Continue
              </button>
              <button
                onClick={() => {

                  if (cookie.get("user") == null) {
                    return;
                  }

                  updateData();

                  if (save1.lvl === -1) {
                    setData(save1, 1, 0)
                    save1data.lvl = 0;
                    setSave1((save1) => save1data);
                    cookie.set("activeSaveSlot", 1);
                    changeToGame();
                  } else if (save2.lvl === -1) {
                    setData(save2, 2, 0);
                    save2data.lvl = 0;
                    setSave2((save2) => save2data);
                    cookie.set("activeSaveSlot", 2);
                    changeToGame();
                  } else if (save3.lvl === -1) {
                    setData(save3, 3, 0);
                    save3data.lvl = 0;
                    setSave3((save3) => save3data);
                    cookie.set("activeSaveSlot", 3);
                    changeToGame();
                  } else {
                    openSaves();
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
            <div id="darken-bg"></div>
          </div>
    )}


