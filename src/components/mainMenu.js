import { LoginPage } from "./loginPage";
import '../App.css';
<<<<<<< HEAD
import { convertSave } from "./saveFileManager";
import { getData, setData } from "./saveCommManager";
import { useNavigate } from "react-router-dom";


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

    
  /*
    async function updateData () {
      let myJson = await getData().then((value) => {
        return value;
      });
  
      setSave1((save1) => convertSave(myJson[0]));
      setSave2((save2) => convertSave(myJson[1]));
      setSave3((save3) => convertSave(myJson[2]));
  
      refreshSaves(save1, save2, save3);
  }
  */
=======
import { SaveContainer } from "./saveContainer";
import { useContext } from "react";
import { backend, optionsContext, overlayContext, saveContext, userContext } from "../App";
import { getPlayerSaves } from "./requests";
import { saveFile } from "./saveFileManager";
import OptionsPage from "./optionsPage";

export function MainMenu() {

    const overlay = useContext(overlayContext);
    const user = useContext(userContext);
    const saves = useContext(saveContext);
    const options = useContext(optionsContext);

>>>>>>> Rework-save-management
    return (
        <div className="main-menu">
            <LoginPage />
            <SaveContainer />
            <OptionsPage />
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
              <button style={cookie.get("isAdmin") ? {display: "block"} : {display: "none"}} onClick={() => {window.location = "https://bgs.jedlik.eu/learnthebasics"}}>Admin Page</button>
              <button
                onClick={() => {
<<<<<<< HEAD

                  if (cookie.get("user") == null) {
                    return;
                  }

                  //updateData();
                  //openSaves();
=======
                  if (localStorage.getItem("userAuthCode") === "") return;
                  localStorage.setItem("activeSaveFile", JSON.stringify(new saveFile()));
                  saves.setActiveSaveFile(new saveFile());
                  getPlayerSaves(user.currUser).then((res) => {
                    saves.setSaveFiles(res);
                    overlay.setCurrOverlay("savePage");
                  })
>>>>>>> Rework-save-management
                }}
              >
                Continue
              </button>
              <button
                onClick={() => {
<<<<<<< HEAD

                  if (cookie.get("user") == null) {
                    return;
                  }

                  //updateData();
                  /*
                  if (save1.lvl === -1) {
                    //setData(save1, 1, 0)
                    //setSave1((save1) => {save1.lvl = 0; return save1});
                    cookie.set("activeSaveSlot", 1);
                    //changeToGame();
                  } else if (save2.lvl === -1) {
                    //setData(save2, 2, 0);
                    //setSave2((save2) => {save2.lvl = 0; return save2});
                    cookie.set("activeSaveSlot", 2);
                    //changeToGame();
                  } else if (save3.lvl === -1) {
                    //setData(save3, 3, 0);
                    //setSave3((save3) => {save3.lvl = 0; return save3});
                    cookie.set("activeSaveSlot", 3);
                    //changeToGame();
                  } else {
                    //openSaves();
                  }
                  */
=======
                  if (localStorage.getItem("userAuthCode") === "") return;
                  
>>>>>>> Rework-save-management
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


