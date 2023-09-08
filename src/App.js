/* eslint-disable default-case */
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

class saveFile {
  constructor(lvl, money, hours, minutes, seconds, cpu, gpu, ram, stg) {
    this.lvl = lvl;
    this.money = money;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.cpu = cpu;
    this.gpu = gpu;
    this.ram = ram;
    this.stg = stg;
  }

  getlvl() {
    return this.lvl;
  }

}

function App() {
  const [key, setKey] = useState(0);

  let cleanSave = new saveFile(-1, 0, 0, 0, 0, "", "", "", "");

  let save1data = new saveFile(
    3,
    12500,
    1,
    22,
    36,
    "Z3",
    "GHD 720",
    "8GB",
    "250GB HDD"
  );

  let save2data = new saveFile(-1, 0, 0, 0, 0, "", "", "", "");
  let save3data = new saveFile(-1, 0, 0, 0, 0, "", "", "", "");

  let currentState = "MainMenu";

  const [save1, setSave1] = useState(0);
  const [save2, setSave2] = useState(1);
  const [save3, setSave3] = useState(2);

  

  switch (currentState) {
    case "MainMenu":
      return (
        <div className="App">
          {/* Main Menu */}
          <div class="main-menu">
            <h1>LearnTheBasics.it</h1>
            <div class="button-container">
              <button
                onClick={() => {
                  document.getElementsByClassName(
                    "save-container"
                  )[0].style.display = "flex";
                  document.getElementById("save-back-button").style.display =
                    "unset";
                  
                  setSave1((save1) => save1data);
                  setSave2((save2) => save2data);
                  setSave3((save3) => save3data);
                }}
              >
                Continue
              </button>
              <button
                onClick={() => {
                  if (save1.lvl == -1 || save2.lvl == -1 || save3.lvl == -1) {
                    console.log("start game");
                  } else {
                    document.getElementsByClassName(
                      "save-container"
                    )[0].style.display = "flex";
                    document.getElementById("save-back-button").style.display =
                      "unset";
                  }
                }}
              >
                New Game
              </button>
              <button>Options</button>
              <button onClick={() => {
                window.close();
              }}>Quit Game</button>
            </div>
            <div id="darken-bg"></div>
          </div>

          {/* Save Menu */}

          <div class="save-container" style={{ display: "none" }}>
            <div class="save-item" id="save-item1">
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
                <p>LvL: { save1.lvl }</p>
                <p>{ save1.money }$</p>
                <p id="playtime">
                  {save1.hours}:{save1.minutes}:{save1.seconds}
                </p>
              </div>
              <button onClick={() => {
                save1data = new saveFile(0, 0, 0, 0, 0, "", "", "", "");
                setSave1((save1) => save1data)
              }}>Delete</button>
            </div>
            <div class="save-item" id="save-item2">
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
            </div>
            <div class="save-item" id="save-item3">
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
            </div>
          </div>
          <button
            onClick={() => {
              document.getElementsByClassName(
                "save-container"
              )[0].style.display = "none";
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
