import { useContext } from "react";
import { overlayContext, saveContext } from "../App"
import { closeSaves } from "./saveMenuManager";
import { SaveItem } from "./saveItem";
import '../App.css'


export function SaveContainer() {
    const overlay = useContext(overlayContext);
    const saves = useContext(saveContext);
    return (
    <div className="save-container" style={{ display: overlay.currOverlay === "savePage" ? "flex" : "none"}}>
        {[<SaveItem index='0'/>, <SaveItem index='1'/>, <SaveItem index='2'/>]} /* Magic? idk */
        <button
            onClick={() => {
                overlay.setCurrOverlay("")
            }}
            id="save-back-button"
            style={{ display: "block" }}
        >
            Back
        </button>
    </div>
    )};