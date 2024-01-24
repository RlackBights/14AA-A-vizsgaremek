import { useContext } from "react";
import { saveContext } from "../App"
import { closeSaves } from "./saveMenuManager";
import { SaveItem } from "./saveItem";
import '../App.css'


export function SaveContainer() {
    const saves = useContext(saveContext).saveFiles;
    const setSaves = useContext(saveContext).setSaveFiles;
    return (
    <>
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
    </>
    
    )};