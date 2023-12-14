import { useContext } from "react";
import { saveContext } from "../App";
import { cookie } from "./cookie";
import { changeToGame } from "./mainMenu";
import { saveFile } from "./saveFileManager";
import { closeSaves } from "./saveMenuManager";
import { setData } from "./saveCommManager";
import '../App.css'


export function SaveContainer() {

    return (
    <>
        <div className="save-container" style={{ display: "none" }}>
        <div style={{ display: "block" }}></div>
        <div className="save-item-container">
        <div
            className="save-item"
            id="save-item1"
            onClick={() => {
                /*
                if (save1.lvl !== -1) {
                    cookie.set("activeSaveSlot", 1);
                    changeToGame();
                }*/
            }}
        >
            <div className="empty-save-base">
            <p>Empty save</p>
            <p>
                <i>-- slot 1 --</i>
            </p>
            </div>
            <div className="grid-item save-top">
            <div id="langs">
                <p className={"locked-lang"} id="html">
                HTML
                </p>
                <p className={"locked-lang"} id="css">
                CSS
                </p>
                <p className={"locked-lang"} id="js">
                JS
                </p>
            </div>
            <div id="config">
                <p>CPU: <span>{}</span></p>
                <p>GPU: <span>{}</span></p>
                <p>RAM: <span>{}</span></p>
                <p>STG: <span>{}</span></p>
            </div>
            </div>
            <div className="grid-item save-bottom">
            <p>LvL: {}</p>
            <p>{}$</p>
            <p id="playtime">
                {}:{}:{}
            </p>
            </div>
        </div>
        <button
            className="delete-button"
            id="delete-button1"
            onClick={() => {
                //setData(save1, 1, -1, 0, 0, 0, 0, 0, 0);
                //setSave1((save1) => new saveFile(-1, 0, 0, "", "", "", ""));
                document
                    .getElementById("save-item1")
                    .classList.add("empty-save");
            }}
        >
            <span>Delete</span>
        </button>
        </div>
        <div className="save-item-container">
        <div
            className="save-item"
            id="save-item2"
            onClick={() => {
                /*
                if (save2.lvl !== -1) {
                    cookie.set("activeSaveSlot", 2);
                    changeToGame();
                }*/
            }}
        >
            <div className="empty-save-base">
            <p>Empty save</p>
            <p>
                <i>-- slot 2 --</i>
            </p>
            </div>
            <div className="grid-item save-top">
            <div id="langs">
                <p className={"locked-lang"} id="html">
                HTML
                </p>
                <p className={"locked-lang"} id="css">
                CSS
                </p>
                <p className={"locked-lang"} id="js">
                JS
                </p>
            </div>
            <div id="config">
                <p>CPU: <span>{}</span></p>
                <p>GPU: <span>{}</span></p>
                <p>RAM: <span>{}</span></p>
                <p>STG: <span>{}</span></p>
            </div>
            </div>
            <div className="grid-item save-bottom">
            <p>LvL: {}</p>
            <p>{}$</p>
            <p id="playtime">
                {}:{}:{}
            </p>
            </div>
        </div>
        <button
            className="delete-button"
            id="delete-button2"
            onClick={() => {
            //setData(save2, 2, -1, 0, 0, 0, 0, 0, 0);
            //setSave2((save2) => new saveFile(-1, 0, 0, 0, 0, "", "", "", ""));
            document
                .getElementById("save-item2")
                .classList.add("empty-save");
            }}
        >
            <span>Delete</span>
        </button>
        </div>
        <div className="save-item-container">
        <div
            className="save-item"
            id="save-item3"
            onClick={() => {
                /*
                if (save3.lvl !== -1) {
                    cookie.set("activeSaveSlot", 3);
                    changeToGame();
                }*/
            }}
        >
            <div className="empty-save-base">
            <p>Empty save</p>
            <p>
                <i>-- slot 3 --</i>
            </p>
            </div>
            <div className="grid-item save-top">
            <div id="langs">
                <p className={"locked-lang"} id="html">
                HTML
                </p>
                <p className={"locked-lang"} id="css">
                CSS
                </p>
                <p className={"locked-lang"} id="js">
                JS
                </p>
            </div>
            <div id="config">
                <p>CPU: <span>{}</span></p>
                <p>GPU: <span>{}</span></p>
                <p>RAM: <span>{}</span></p>
                <p>STG: <span>{}</span></p>
            </div>
            </div>
            <div className="grid-item save-bottom">
            <p>LvL: {}</p>
            <p>{}$</p>
            <p id="playtime">
                {}:{}:{}
            </p>
            </div>
        </div>
        <button
            className="delete-button"
            id="delete-button3"
            onClick={() => {
            //setData(save3, 3, -1, 0, 0, 0, 0, 0, 0);
            //setSave3((save3) => new saveFile(-1, 0, 0, 0, 0, "", "", "", ""));
            document
                .getElementById("save-item3")
                .classList.add("empty-save");
            }}
        >
            <span>Delete</span>
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