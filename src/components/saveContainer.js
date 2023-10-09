import { useContext } from "react";
import { saveContext } from "../App";
import { cookie } from "./cookie";
import { changeToGame } from "./mainMenu";
import { saveFile } from "./savefile_management";
import { setData } from "./saveCommHandler";
import deleteSave from "../assets/delete-button.png";
import { closeSaves } from "./saveMenuManager";
import '../App.css'


export function SaveContainer() {

    const save1 = useContext(saveContext)[0][0];
    const save1data = useContext(saveContext)[0][1];
    const setSave1 = useContext(saveContext)[0][2];
    const save2 = useContext(saveContext)[1][0];
    const save2data = useContext(saveContext)[1][1];
    const setSave2 = useContext(saveContext)[1][2];
    const save3 = useContext(saveContext)[2][0];
    const save3data = useContext(saveContext)[2][1];
    const setSave3 = useContext(saveContext)[2][2];

    return (
    <>
        <div class="save-container" style={{ display: "none" }}>
        <div style={{ display: "block" }}></div>
        <div class="save-item-container">
        <div
            className="save-item"
            id="save-item1"
            onClick={() => {
            if (save1.lvl !== -1) {
                cookie.set("activeSaveSlot", 1);
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
                <p>CPU: <span>{save1.cpu}</span></p>
                <p>GPU: <span>{save1.gpu}</span></p>
                <p>RAM: <span>{save1.ram}</span></p>
                <p>STG: <span>{save1.stg}</span></p>
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
            setData(save1, 1, -1, 0, 0, 0, 0, 0, 0);
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
        <div class="save-item-container">
        <div
            class="save-item"
            id="save-item2"
            onClick={() => {
            if (save2.lvl !== -1) {
                cookie.set("activeSaveSlot", 2);
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
                <p>CPU: <span>{save2.cpu}</span></p>
                <p>GPU: <span>{save2.gpu}</span></p>
                <p>RAM: <span>{save2.ram}</span></p>
                <p>STG: <span>{save2.stg}</span></p>
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
            setData(save2, 2, -1, 0, 0, 0, 0, 0, 0);
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
        <div class="save-item-container">
        <div
            class="save-item"
            id="save-item3"
            onClick={() => {
            if (save3.lvl !== -1) {
                cookie.set("activeSaveSlot", 3);
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
                <p>CPU: <span>{save3.cpu}</span></p>
                <p>GPU: <span>{save3.gpu}</span></p>
                <p>RAM: <span>{save3.ram}</span></p>
                <p>STG: <span>{save3.stg}</span></p>
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
            setData(save3, 3, -1, 0, 0, 0, 0, 0, 0);
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
        closeSaves();
        }}
        id="save-back-button"
        style={{ display: "none" }}
    >
        Back
    </button>
    </>
    
    )};