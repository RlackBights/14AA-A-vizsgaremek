import { useContext } from "react"
import { overlayContext, userContext } from "../App"
import { finaliseNewSave, requestSaveFileCreation } from "./requests";


export function NewSave()
{
    const user = useContext(userContext);
    const overlay = useContext(overlayContext);
    return (
        <div id="new-save" style={{display: overlay.currOverlay === "newSave" ? "flex" : "none"}}>
            <form onSubmit={(e) => {e.preventDefault()}}>
                <h1>Enter file name:</h1>
                <input type="text" id="save-input"></input>
                <div>
                    <button onClick={() => {
                        overlay.setCurrOverlay("");
                    }}>
                        Back
                    </button>
                    <button onClick={async () => {
                        const saveInput = document.getElementById("save-input");
                        await requestSaveFileCreation(user.currUser, saveInput.value).then((res) => {
                            
                            if (Object.keys(res).includes("message")) {
                                overlay.setCurrOverlay("");
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
                        const saveInput = document.getElementById("save-input");
                        await finaliseNewSave(user.currUser, saveInput.value).then(() => {
                            e.target.parentNode.parentNode.style.display = "none";
                            overlay.setCurrOverlay("");
                        });
                    }}>Overwrite</button>
                </div>
            </div>
        </div>
    )
}