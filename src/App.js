/* eslint-disable default-case */
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import deleteSave from "./assets/delete-button.png";

class saveFile {
  constructor(lvl, money, time, cpu, gpu, ram, stg) {
    this.lvl = lvl;
    this.money = money;
    this.hours = Math.floor(time / 3600);
    this.minutes = Math.floor((time % 3600) / 60);
    this.seconds = Math.floor((time % 3600) % 60);
    this.cpu = cpu;
    this.gpu = gpu;
    this.ram = ram;
    this.stg = stg;
  }
}

function convertSave(savedata) {
  return new saveFile(savedata.lvl, savedata.money, savedata.time, savedata.cpu, savedata.gpu, savedata.ram, savedata.stg);
}

let save1data = new saveFile(-1, 0, 0, "", "", "", "");
let save2data = new saveFile(-1, 0, 0, "", "", "", "");
let save3data = new saveFile(-1, 0, 0, "", "", "", "");


function App() {
  const [key, setKey] = useState(0);
  const [save1, setSave1] = useState(save1data);
  const [save2, setSave2] = useState(save2data);
  const [save3, setSave3] = useState(save3data);
  let x = 0;

  const getData = () => {
    fetch('http://127.0.0.1:8000/savedata'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson.data);

        save1data = convertSave(myJson.data[0]);
        setSave1((save1) => save1data);

        save2data = convertSave(myJson.data[1]);
        setSave2((save2) => save2data);

        save3data = convertSave(myJson.data[2]);
        setSave3((save3) => save3data);
      });
    setKey((key) => key + 1);
  }

  useEffect(() => {
    getData();
  }, [x])

  if (x === 0) {
    x++;
  }

  let currentState = "MainMenu";


  switch (currentState) {
    case "MainMenu":
      return (
        <div className="App">
          {/* Main Menu */}
          <div className="main-menu">
            <h1>LearnTheBasics.it</h1>
            <div className="button-container">
              <button
                onClick={() => {
                  getData();

                  document.getElementsByClassName(
                    "save-container"
                  )[0].style.top = "0vh";
                  document.getElementById("save-back-button").style.display =
                    "unset";

                  let saveSlot1 = document.getElementById("save-item1");
                  let saveSlot2 = document.getElementById("save-item2");
                  let saveSlot3 = document.getElementById("save-item3");

                  if (save1.lvl === -1) {
                    if (!saveSlot1.classList.contains("empty-save")) {
                      console.log("added empty-save");
                      saveSlot1.classList.add("empty-save");
                    }
                  } else {
                    if (saveSlot1.classList.contains("empty-save")) {
                      saveSlot1.classList.remove("empty-save");
                    }
                  }

                  if (save2.lvl === -1) {
                    if (!saveSlot2.classList.contains("empty-save")) {
                      saveSlot2.classList.add("empty-save");
                    }
                  } else {
                    if (saveSlot2.classList.contains("empty-save")) {
                      saveSlot2.classList.remove("empty-save");
                    }
                  }

                  if (save3.lvl === -1) {
                    saveSlot3.classList.add("empty-save");
                  } else {
                    saveSlot3.classList.remove("empty-save");
                  }
                }}
              >
                Continue
              </button>
              <button
                onClick={() => {
                  getData();
                  setKey((key) => key + 1);
                  if (save1.lvl === -1) {
                    console.log("Save 1 empty, setting level");
                    save1data.lvl = 0;
                    setSave1((save1) => save1data);
                  } else if (save2.lvl === -1) {
                    console.log("Save 2 empty, setting level");
                    save2data.lvl = 0;
                    setSave2((save2) => save2data);
                  } else if (save3.lvl === -1) {
                    console.log("Save 3 empty, setting level");
                    save3data.lvl = 0;
                    setSave3((save3) => save3data);
                  } else {
                    console.log("No empty save found, open menu");
                    document.getElementsByClassName(
                      "save-container"
                    )[0].style.top = "0vh";
                    document.getElementById("save-back-button").style.display =
                      "unset";
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

          {/* Save Menu */}

          <div class="save-container" style={{ top: "100vh" }}>
            <div style={{ display: "none" }} key={key}></div>
            <div class="save-item" id="save-item1">
              <div class="empty-save-base">
                <p>Empty save</p>
                <p>
                  <i>-- slot 1 --</i>
                </p>
              </div>
              <div class="grid-item save-top">
                <div id="langs">
                  <p id="html">HTML</p>
                  <p id="css">CSS</p>
                  <p id="js">JS</p>
                </div>
                <div id="config">
                  <p>CPU: {save1.cpu}</p>
                  <p>GPU: {save1.gpu}</p>
                  <p>RAM: {save1.ram}</p>
                  <p>STG: {save1.stg}</p>
                </div>
              </div>
              <div class="grid-item save-bottom">
                <p>LvL: {save1.lvl}</p>
                <p>{save1.money}$</p>
                <p id="playtime">
                  {save1.hours}:{save1.minutes}:{save1.seconds}
                </p>
              </div>
              <button
                class="delete-button"
                onClick={() => {
                  save1data = new saveFile(-1, 0, 0, "", "", "", "");
                  setSave1((save1) => save1data);
                  document
                    .getElementById("save-item1")
                    .classList.add("empty-save");
                }}
              >
                <img src={deleteSave} alt=""></img>
              </button>
            </div>
            <div class="save-item" id="save-item2">
              <div class="empty-save-base">
                <p>Empty save</p>
                <p>
                  <i>-- slot 2 --</i>
                </p>
              </div>
              <div class="grid-item save-top">
                <div id="langs">
                  <p id="html">HTML</p>
                  <p id="css">CSS</p>
                  <p id="js">JS</p>
                </div>
                <div id="config">
                  <p>CPU: {save2.cpu}</p>
                  <p>GPU: {save2.gpu}</p>
                  <p>RAM: {save2.ram}</p>
                  <p>STG: {save2.stg}</p>
                </div>
              </div>
              <div class="grid-item save-bottom">
                <p>LvL: {save2.lvl}</p>
                <p>{save2.money}$</p>
                <p id="playtime">
                  {save2.hours}:{save2.minutes}:{save2.seconds}
                </p>
              </div>
              <button
                class="delete-button"
                onClick={() => {
                  save2data = new saveFile(-1, 0, 0, 0, 0, "", "", "", "");
                  setSave2((save2) => save2data);
                  document
                    .getElementById("save-item2")
                    .classList.add("empty-save");
                }}
              >
                <img src={deleteSave} alt=""></img>
              </button>
            </div>
            <div class="save-item" id="save-item3">
              <div class="empty-save-base">
                <p>Empty save</p>
                <p>
                  <i>-- slot 3 --</i>
                </p>
              </div>
              <div class="grid-item save-top">
                <div id="langs">
                  <p id="html">HTML</p>
                  <p id="css">CSS</p>
                  <p id="js">JS</p>
                </div>
                <div id="config">
                  <p>CPU: {save3.cpu}</p>
                  <p>GPU: {save3.gpu}</p>
                  <p>RAM: {save3.ram}</p>
                  <p>STG: {save3.stg}</p>
                </div>
              </div>
              <div class="grid-item save-bottom">
                <p>LvL: {save3.lvl}</p>
                <p>{save3.money}$</p>
                <p id="playtime">
                  {save3.hours}:{save3.minutes}:{save3.seconds}
                </p>
              </div>
              <button
                class="delete-button"
                onClick={() => {
                  save3data = new saveFile(-1, 0, 0, 0, 0, "", "", "", "");
                  setSave3((save3) => save3data);
                  document
                    .getElementById("save-item3")
                    .classList.add("empty-save");
                }}
              >
                <img src={deleteSave} alt=""></img>
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              document.getElementsByClassName("save-container")[0].style.top =
                "100vh";
              document.getElementById("save-back-button").style.display =
                "none";
            }}
            id="save-back-button"
            style={{ display: "none" }}
          >
            Back
          </button>
        </div>
      );
  }
}

export default App;
