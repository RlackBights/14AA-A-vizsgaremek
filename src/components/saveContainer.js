import React, { useContext } from "react";
import { overlayContext, saveContext, userContext } from "../App";
import { SaveItem } from "./saveItem";
import '../App.css';
import { useState } from "react";

function displaySaves(saveFiles, user){

    let test = [];

    for (let i = 0; i < saveFiles.length; i++) {
        test.push(<SaveItem key={i} user={user} save={saveFiles[i]}/>)
        
    }
    
    return (test);
}
export function SaveContainer() {
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
            <div className="save-container" style={{ transform: `translateX(calc(-${saveOffset} * 100vw))`}}>
                {saves.saveFiles.length === 0 && <h1 id="missing-save-text" style={{ display: "absolute"}}>No save files found L bozo</h1>}
                {displaySaves(saves.saveFiles, user.currUser)}
            </div>
        </div>
        
    );
}