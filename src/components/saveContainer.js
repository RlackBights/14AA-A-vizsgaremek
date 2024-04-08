import React, { createContext, useContext } from "react";
import { overlayContext, saveContext, userContext } from "../App";
import { SaveItem } from "./saveItem";
import '../App.css';
import { useState } from "react";
import { soundContext } from '../App';

function displaySaves(saveFiles, user, stats){

    let output = [];

    for (let i = 0; i < saveFiles.length; i++) {
        output.push(<SaveItem key={i} user={user} save={saveFiles[i]} stats={stats}/>)
    }
    
    return (output);
}

export const saveOffsetContext = createContext();
export const clamp = (input, min, max) => {return Math.min(max, Math.max(input, min))}

export function SaveContainer() {
    const overlay = useContext(overlayContext);
    const saves = useContext(saveContext);
    const user = useContext(userContext);
    const [saveOffset, setSaveOffset] = useState(0);
    const play = useContext(soundContext).uiClick;

    return (
        <div id="save-page" style={{ display: overlay.currOverlay === "savePage" ? "flex" : "none"}}>
            { saves.saveFiles.length !== 0 && <button className="save-nav-button" style={{left: "1vw"}} onClick={() => {
                play();
                setSaveOffset((save) => clamp(save - 1, 0, Math.ceil(saves.saveFiles.length / 3) - 1));
            }}><i className="arrow arrow-left"></i></button>}
            { saves.saveFiles.length !== 0 && <button className="save-nav-button" style={{right: "1vw"}} onClick={() => {
                play();
                setSaveOffset((save) => clamp(save + 1, 0, Math.ceil(saves.saveFiles.length / 3) - 1));
            }}><i className="arrow arrow-right"></i></button>}
            <button
                onClick={() => {
                    play();
                    overlay.setCurrOverlay("")
                    setSaveOffset(0);
                }}
                id="save-back-button"
                style={{ display: "block" }}
            >
                Back
            </button>
            <div className="save-container" style={{ transform: `translateX(calc(-${saveOffset} * 100vw))`, width: `${Math.ceil(clamp(saves.saveFiles.length, 1, 99) / 3)*100}vw`}}>
                {saves.saveFiles.length === 0 && <h1 id="missing-save-text">No save files found</h1>}
                <saveOffsetContext.Provider value={{setSaveOffset}}>
                    {displaySaves(saves.saveFiles, user.currUser, saves.stats)}
                </saveOffsetContext.Provider>
            </div>
        </div>
        
    );
}
