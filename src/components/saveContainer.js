import { useContext } from "react";
import { overlayContext, saveContext } from "../App"
import { closeSaves } from "./saveMenuManager";
import { SaveItem } from "./saveItem";
import '../App.css'


export function SaveContainer() {
    const saves = useContext(saveContext).saveFiles;
    const setSaves = useContext(saveContext).setSaveFiles;
    const overlay = useContext(overlayContext)
    return (
    <div style={{ display: overlay.currOverlay == "save" ? "flex" : "none"}}>
        <SaveItem />
        <button
            onClick={() => {
            closeSaves();
            }}
            id="save-back-button"
            style={{ display: "block" }}
        >
            Back
        </button>
    </div>
    
    )};