import { useContext } from "react";
import { overlayContext } from "../App"
import { closeSaves } from "./saveMenuManager";
import { SaveItem } from "./saveItem";
import '../App.css'


export function SaveContainer() {
    const overlay = useContext(overlayContext)
    return (
    <div style={{ display: overlay.currOverlay === "save" ? "flex" : "none"}}>
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