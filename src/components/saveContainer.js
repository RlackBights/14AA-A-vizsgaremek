import { useContext } from "react";
import { overlayContext, saveContext } from "../App"
import { SaveItem } from "./saveItem";
import '../App.css'


export function SaveContainer() {
    const overlay = useContext(overlayContext);
    const saves = useContext(saveContext);
    console.log(saves.saveFiles.length);
    return (
        <div className="save-container" style={{ display: overlay.currOverlay === "savePage" ? "flex" : "none"}}>
            {saves.saveFiles.length === 0 && <h1 id="missing-save-text" style={{ display: "absolute"}}>No save files found L bozo</h1>}
            {saves.saveFiles.map((save) => <SaveItem save={save} />)}
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
    );
}