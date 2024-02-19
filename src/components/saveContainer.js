import React, { createContext, useContext } from "react";
import { overlayContext, saveContext, userContext } from "../App";
import { SaveItem } from "./saveItem";
import '../App.css';
import { useState } from "react";

function displaySaves(saveFiles, user){

    let output = [];

    for (let i = 0; i < saveFiles.length; i++) {
        output.push(<SaveItem key={i} user={user} save={saveFiles[i]}/>)
    }
    
    return (output);
}

export const saveOffsetContext = createContext();

export function SaveContainer() {
<<<<<<< HEAD

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
=======
    const overlay = useContext(overlayContext);
    const saves = useContext(saveContext);
    const user = useContext(userContext);
    const [saveOffset, setSaveOffset] = useState(0);
    const clamp = (input, min, max) => {return Math.min(max, Math.max(input, min))}

    return (
        <div style={{ display: overlay.currOverlay === "savePage" ? "flex" : "none"}}>
            <button className="save-nav-button" style={{left: "1vw"}} onClick={() => {
                setSaveOffset((save) => clamp(save - 1, 0, Math.ceil(saves.saveFiles.length / 3) - 1));
                console.log(saveOffset);
            }}><i className="arrow left"></i></button>
            <button className="save-nav-button" style={{right: "1vw"}} onClick={() => {
                setSaveOffset((save) => clamp(save + 1, 0, Math.ceil(saves.saveFiles.length / 3) - 1));
            }}><i className="arrow right"></i></button>
            <button
                onClick={() => {
                    overlay.setCurrOverlay("")
                    setSaveOffset(0);
                }}
                id="save-back-button"
                style={{ display: "block" }}
            >
                Back
            </button>
            <div className="save-container" style={{ transform: `translateX(calc(-${saveOffset} * 100vw))`, width: `${Math.ceil(clamp(saves.saveFiles.length, 1, 99) / 3)*100}vw`}}>
                {saves.saveFiles.length === 0 && <h1 id="missing-save-text" style={{ display: "absolute"}}>No save files found L bozo</h1>}
                <saveOffsetContext.Provider value={{setSaveOffset}}>
                    {displaySaves(saves.saveFiles, user.currUser)}
                </saveOffsetContext.Provider>
            </div>
        </div>
        
    );
}
>>>>>>> Rework-save-management
