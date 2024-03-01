import { useContext, useEffect } from "react"
import { overlayContext, saveContext, userContext } from "../App"
import { finaliseNewSave, getHardwareElements, requestSaveFileCreation } from "./requests";
import { saveFile } from "./saveFileManager";

function loadIntoNewSave(saveFile)
{
    localStorage.setItem("activeSaveFile", JSON.stringify(saveFile));
    localStorage.setItem("currTime", Date.now().toString());

    setTimeout(() => {
        window.location.href = "/game/tableView";
    }, 250);
}

export function NewSave()
{
    const user = useContext(userContext);
    const overlay = useContext(overlayContext);
    const saves = useContext(saveContext);

    return (
        <div id="new-save" style={{display: overlay.currOverlay === "newSave" ? "flex" : "none"}}>
            <form onSubmit={async (e) => {
                e.preventDefault();
                }}>
                <h1>Enter file name:</h1>
                <input type="text" id="save-input"></input>
                <div>
                    <button type="button" onClick={() => {
                        overlay.setCurrOverlay("");
                    }}>
                        Back
                    </button>
                    <button onClick={async () => {
                        console.log("new save");
                        const saveInput = document.getElementById("save-input");
                        if (saveInput.value === "") return;
                        const hardwareElements = await getHardwareElements();
                        localStorage.setItem("availableHardware", JSON.stringify(hardwareElements));
                        await requestSaveFileCreation(user.currUser, saveInput.value).then((res) => {
                            
                            if (Object.keys(res).includes("message")) {

                                const emptySave = new saveFile(saveInput.value);
                                saves.setActiveSaveFile(emptySave);
                                loadIntoNewSave(emptySave);

                            } else {
                                const saveExists = document.getElementById("save-exists");
                                saveExists.style.display = "flex";
                            }
                        });
                    }}>
                        Create Save
                    </button>

                </div>

            </form>
            <div id="save-exists" style={{display: "none"}}>
                <h1>This save already exists, would you like to overwrite it?</h1>
                <div>
                    <button onClick={(e) => {
                        e.target.parentNode.parentNode.style.display = "none";
                    }}>Cancel</button>
                    <button onClick={async (e) => {
                        console.log("overwrite yes");
                        const saveInput = document.getElementById("save-input");
                        const hardwareElements = await getHardwareElements();
                        localStorage.setItem("availableHardware", JSON.stringify(hardwareElements));
                        await finaliseNewSave(user.currUser, saveInput.value).then(() => {

                            const emptySave = new saveFile(saveInput.value);
                            saves.setActiveSaveFile(emptySave);
                            loadIntoNewSave(emptySave);

                        });
                    }}>Overwrite</button>
                </div>
            </div>
        </div>
    )
}