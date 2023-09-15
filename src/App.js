import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import deleteSave from "./assets/delete-button.png";
import { convertSave, saveFile } from "./components/savefile_management";
import { Icon, disableCache } from "@iconify/react";

// Base variables

let save1data = new saveFile(-1, 0, 0, "", "", "", "");
let save2data = new saveFile(-1, 0, 0, "", "", "", "");
let save3data = new saveFile(-1, 0, 0, "", "", "", "");
let currentState = "MainMenu";
let activeSaveSlot = null;
let x = 0;

// Save Menu

function openSaves() {
  document.getElementsByClassName("save-container")[0].style.display = "flex";
  document.getElementById("save-back-button").style.display = "unset";
}

function closeSaves() {
  document.getElementsByClassName("save-container")[0].style.display = "none";
  document.getElementById("save-back-button").style.display = "none";
}

// Time increment

setInterval(() => {
  if (currentState !== "MainMenu") {
    console.log("Tick");
    switch (activeSaveSlot) {
      case 1:
        save1data.addTime();
        break;
      case 2:
        save2data.addTime();
        break;
      case 3:
        save3data.addTime();
        break;
      default:
        break;
    }
  }
}, 1000);

function App() {
  const [key, setKey] = useState(0);
  const [save1, setSave1] = useState(save1data);
  const [save2, setSave2] = useState(save2data);
  const [save3, setSave3] = useState(save3data);

  const setData = (
    saveId,
    lvl = undefined,
    money = undefined,
    time = undefined,
    cpu = undefined,
    gpu = undefined,
    ram = undefined,
    stg = undefined
  ) => {
    if (saveId !== 1 && saveId !== 2 && saveId !== 3) {
      console.error(
        "TE IDIÓTA NINCS RENDES SAVE ID TE HÜLYE BUTA HASZONTALAN SZEMÉT :3"
      );
    } else {
      switch (saveId) {
        case 1:
          lvl = lvl !== undefined ? lvl : save1.lvl;
          money = money !== undefined ? money : save1.money;
          time = time !== undefined ? time : save1.getSaveTime();
          cpu = cpu !== undefined ? cpu : save1.getCpu();
          gpu = gpu !== undefined ? gpu : save1.getGpu();
          ram = ram !== undefined ? ram : save1.getRam();
          stg = stg !== undefined ? stg : save1.getStg();
          break;
        case 2:
          lvl = lvl !== undefined ? lvl : save2.lvl;
          money = money !== undefined ? money : save2.money;
          time = time !== undefined ? time : save2.getSaveTime();
          cpu = cpu !== undefined ? cpu : save2.getCpu();
          gpu = gpu !== undefined ? gpu : save2.getGpu();
          ram = ram !== undefined ? ram : save2.getRam();
          stg = stg !== undefined ? stg : save2.getStg();
          break;
        case 3:
          lvl = lvl !== undefined ? lvl : save3.lvl;
          money = money !== undefined ? money : save3.money;
          time = time !== undefined ? time : save3.getSaveTime();
          cpu = cpu !== undefined ? cpu : save3.getCpu();
          gpu = gpu !== undefined ? gpu : save3.getGpu();
          ram = ram !== undefined ? ram : save3.getRam();
          stg = stg !== undefined ? stg : save3.getStg();
          break;
        default:
          break;
      }

      setKey((key) => key + 1);

      /*
      fetch(
        "http://127.0.0.1:8000/changedata?saveId=" +
          saveId +
          "&lvl=" +
          lvl +
          "&money=" +
          money +
          "&time=" +
          time +
          "&cpu=" +
          cpu +
          "&gpu=" +
          gpu +
          "&ram=" +
          ram +
          "&stg=" +
          stg
      );
      */

      // await db.query('UPDATE savedata SET lvl = ' + req.query.lvl + ', money = ' + req.query.money + ', time = ' + req.query.time + ', cpuId = ' + req.query.cpu + ', gpuId = ' + req.query.gpu + ', ramId = ' + req.query.ram + ', stgId = ' + req.query.stg + ' WHERE saveId = ' + req.query.saveId);

      const pushSaveData = {
        method: 'PUT',
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({saveId: saveId, lvl: lvl, money: money, time: time, cpu: cpu, gpu: gpu, ram: ram, stg: stg})
      }
      fetch(
        "http://127.0.0.1:8000/changedata", pushSaveData
      );
    }
  };

  const getData = () => {
    fetch("http://127.0.0.1:8000/savedata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        save1data = convertSave(myJson[0]);
        setSave1((save1) => save1data);

        save2data = convertSave(myJson[1]);
        setSave2((save2) => save2data);

        save3data = convertSave(myJson[2]);
        setSave3((save3) => save3data);
      });
    setKey((key) => key + 1);
  };

  function changeToGame() {
    currentState = "Game";
    console.log(currentState);
    document.getElementsByClassName("save-container")[0].style.top = "100vh";
    document.getElementById("save-back-button").style.display = "none";
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
            setKey((key) => key + 1);
          }, 2000);
        }, 1000);
      }, 500);
    }, 500);
  }

  useEffect(() => {
    getData();
    x++;
  }, [x === 0]);

  switch (currentState) {
    case "MainMenu":
      return (
        <div className="App">
          {/*Main Menu*/}

          <div className="main-menu">
            <h1 id="title-text" className="">
              LearnTheBasics.it
            </h1>
            <div className="button-container">
              <button
                onClick={() => {
                  x = 0;
                  getData();

                  openSaves();

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

                  setKey((key) => key + 1);
                }}
              >
                Continue
              </button>
              <button
                onClick={() => {
                  x = 0;
                  getData();
                  setKey((key) => key + 1);

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

                  setKey((key) => key + 1);

                  if (save1.lvl === -1) {
                    console.log("Added save to slot 1");
                    setData(1, 0);
                    save1data.lvl = 0;
                    setSave1((save1) => save1data);
                    activeSaveSlot = 1;
                    currentState = "Game";
                    setKey((key) => key + 1);
                  } else if (save2.lvl === -1) {
                    setData(2, 0);
                    save2data.lvl = 0;
                    setSave2((save2) => save2data);
                    activeSaveSlot = 2;
                    currentState = "Game";
                    setKey((key) => key + 1);
                  } else if (save3.lvl === -1) {
                    setData(3, 0);
                    save3data.lvl = 0;
                    setSave3((save3) => save3data);
                    activeSaveSlot = 3;
                    currentState = "Game";
                    setKey((key) => key + 1);
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

          {/*Save Container*/}

          <div class="save-container" style={{ display: "none" }}>
            <div style={{ display: "none" }} key={key}></div>
            <div
              class="save-item"
              id="save-item1"
              onClick={() => {
                if (save1.lvl !== -1) {
                  activeSaveSlot = 1;
                  changeToGame();
                }
              }}
            >
              <div class="empty-save-base">
                <p>Empty save</p>
                <p>
                  <i>-- slot 1 --</i>
                </p>
              </div>
              <div class="grid-item save-top">
                <div id="langs">
                  <p class={save1.getCpu() >= 0 ? "" : "locked-lang"} id="html">
                    HTML
                  </p>
                  <p class={save1.getCpu() >= 1 ? "" : "locked-lang"} id="css">
                    CSS
                  </p>
                  <p class={save1.getCpu() >= 2 ? "" : "locked-lang"} id="js">
                    JS
                  </p>
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
            </div>
            <button
              class="delete-button"
              id="delete-button1"
              onClick={() => {
                setData(1, -1, 0, 0, 0, 0, 0, 0);
                save1data = new saveFile(-1, 0, 0, "", "", "", "");
                setSave1((save1) => save1data);
                document
                  .getElementById("save-item1")
                  .classList.add("empty-save");
              }}
            >
              <img src={deleteSave} alt=""></img>
            </button>
            <div
              class="save-item"
              id="save-item2"
              onClick={() => {
                if (save2.lvl !== -1) {
                  activeSaveSlot = 2;
                  changeToGame();
                }
              }}
            >
              <div class="empty-save-base">
                <p>Empty save</p>
                <p>
                  <i>-- slot 2 --</i>
                </p>
              </div>
              <div class="grid-item save-top">
                <div id="langs">
                  <p class={save2.getCpu() >= 0 ? "" : "locked-lang"} id="html">
                    HTML
                  </p>
                  <p class={save2.getCpu() >= 1 ? "" : "locked-lang"} id="css">
                    CSS
                  </p>
                  <p class={save2.getCpu() >= 2 ? "" : "locked-lang"} id="js">
                    JS
                  </p>
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
            <button
              class="delete-button"
              id="delete-button2"
              onClick={() => {
                setData(2, -1, 0, 0, 0, 0, 0, 0);
                save2data = new saveFile(-1, 0, 0, 0, 0, "", "", "", "");
                setSave2((save2) => save2data);
                document
                  .getElementById("save-item2")
                  .classList.add("empty-save");
              }}
            >
              <img src={deleteSave} alt=""></img>
            </button>
            <div
              class="save-item"
              id="save-item3"
              onClick={() => {
                if (save3.lvl !== -1) {
                  activeSaveSlot = 3;
                  changeToGame();
                }
              }}
            >
              <div class="empty-save-base">
                <p>Empty save</p>
                <p>
                  <i>-- slot 3 --</i>
                </p>
              </div>
              <div class="grid-item save-top">
                <div id="langs">
                  <p class={save3.getCpu() >= 0 ? "" : "locked-lang"} id="html">
                    HTML
                  </p>
                  <p class={save3.getCpu() >= 1 ? "" : "locked-lang"} id="css">
                    CSS
                  </p>
                  <p class={save3.getCpu() >= 2 ? "" : "locked-lang"} id="js">
                    JS
                  </p>
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
            <button
              class="delete-button"
              id="delete-button3"
              onClick={() => {
                setData(3, -1, 0, 0, 0, 0, 0, 0);
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
          <button
            onClick={() => {
              closeSaves();
            }}
            id="save-back-button"
            style={{ display: "none" }}
          >
            Back
          </button>
        </div>
      );
    case "Game":
      return (
        <div className="App" key={key}>
          <div class="main-menu">
            <button
              className="mobile"
              id="exit-game-button"
              onClick={() => {
                currentState = "MainMenu";

                switch (activeSaveSlot) {
                  case 1:
                    activeSaveSlot = null;
                    setSave1((save1) => save1data);
                    setData(1, undefined, undefined, save1.time);
                    break;
                  case 2:
                    activeSaveSlot = null;
                    setSave2((save2) => save2data);
                    setData(2, undefined, undefined, save1.time);
                    break;
                  case 3:
                    activeSaveSlot = null;
                    setSave3((save3) => save3data);
                    setData(3, undefined, undefined, save1.time);
                    break;

                  default:
                    break;
                }
              }}
            >
              <Icon icon="uil:bars" />
            </button>
            <div
              id="monitor"
              onClick={() => {
                currentState = "Computer";
                setKey((key) => key + 1);
              }}
            ></div>
          </div>
        </div>
      );
    case "Computer":
      return (
        <div className="App" key={key}>
          <div id="desktop">
            <button
              className="mobile"
              id="exit-game-button"
              onClick={() => {
                currentState = "Computer";

                switch (activeSaveSlot) {
                  case 1:
                    setSave1((save1) => save1data);
                    setData(1, undefined, undefined, save1.time);
                    break;
                  case 2:
                    setSave2((save2) => save2data);
                    setData(2, undefined, undefined, save1.time);
                    break;
                  case 3:
                    setSave3((save3) => save3data);
                    setData(3, undefined, undefined, save1.time);
                    break;

                  default:
                    break;
                }

                setKey((key) => key + 1);
              }}
            >
              <Icon icon="uil:bars" />
            </button>
          </div>
        </div>
      );
  }
}

export default App;
