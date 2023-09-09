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

  let save1data = new saveFile(-1, 0, 0, 0, 0, "", "", "", "");
  let save2data = new saveFile(-1, 0, 0, 0, 0, "", "", "", "");
  let save3data = new saveFile(-1, 0, 0, 0, 0, "", "", "", "");

function App() {

  let currentState = "MainMenu";
  
  const [key, setKey] = useState(0);
  const [save1, setSave1] = useState(save1data);
  const [save2, setSave2] = useState(save2data);
  const [save3, setSave3] = useState(save3data);

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
                  setKey((key) => (key + 1));

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

          <div class="save-container" style={{top: "100vh"}}>
            <div style={{display: "none"}} key={key}></div>
            <div class="save-item" id="save-item1">
              <div class="empty-save-base">
                <p>Empty save</p>
                <p><i>-- slot 1 --</i></p>
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
                <p>LvL: { save1.lvl }</p>
                <p>{ save1.money }$</p>
                <p id="playtime">
                  {save1.hours}:{save1.minutes}:{save1.seconds}
                </p>
              </div>
              <button class="delete-button" onClick={() => {
                save1data = new saveFile(-1, 0, 0, 0, 0, "", "", "", "");
                setSave1((save1) => save1data);
                document.getElementById("save-item1").classList.add("empty-save");
              }}>Delete</button>
            </div>
            <div class="save-item" id="save-item2">
              <div class="empty-save-base">
                <p>Empty save</p>
                <p><i>-- slot 1 --</i></p>
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
              <button class="delete-button" onClick={() => {
                save2data = new saveFile(-1, 0, 0, 0, 0, "", "", "", "");
                setSave2((save2) => save2data);
                document.getElementById("save-item2").classList.add("empty-save");
              }}>Delete</button>
            </div>
            <div class="save-item" id="save-item3">
            <div class="empty-save-base">
                <p>Empty save</p>
                <p><i>-- slot 1 --</i></p>
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
              <button class="delete-button" onClick={() => {
                save3data = new saveFile(-1, 0, 0, 0, 0, "", "", "", "");
                setSave3((save3) => save3data);
                document.getElementById("save-item3").classList.add("empty-save");
              }}>Delete</button>
            </div>
          </div>
          <button
            onClick={() => {
              document.getElementsByClassName(
                "save-container"
              )[0].style.top = "100vh";
              document.getElementById("save-back-button").style.display =
                "none";
              }}
              id="save-back-button"
              style={{ display: "none" }}>
            Back
          </button>
        </div>
      );
  }
}

export default App;
