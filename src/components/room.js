import { useContext } from "react";
import { cookie } from "./cookie";
import { setData } from "./saveCommHandler";
import { Icon } from "@iconify/react";
import { saveContext } from "../App";

export function Room() {

    const save1 = useContext(saveContext)[0][0];
    const save1data = useContext(saveContext)[0][1];
    const setSave1 = useContext(saveContext)[0][2];
    const save2 = useContext(saveContext)[1][0];
    const save2data = useContext(saveContext)[1][1];
    const setSave2 = useContext(saveContext)[1][2];
    const save3 = useContext(saveContext)[2][0];
    const save3data = useContext(saveContext)[2][1];
    const setSave3 = useContext(saveContext)[2][2];
    return (
        <div class="main-menu">
            <button
              className="mobile"
              id="exit-game-button"
              onClick={() => {
                cookie.set("gameState", "MainMenu");

                switch (cookie.get("activeSaveSlot")) {
                  case "1":
                    setSave1((save1) => save1data);
                    setData(save1, 1, undefined, undefined, save1.time);
                    break;
                  case "2":
                    setSave2((save2) => save2data);
                    setData(save2, 2, undefined, undefined, save2.time);
                    break;
                  case "3":
                    setSave3((save3) => save3data);
                    setData(save3, 3, undefined, undefined, save3.time);
                    break;

                  default:
                    break;
                }
                cookie.set("activeSaveSlot", null);
                window.location.reload();
              }}
            >
        <Icon icon="uil:bars" />
    </button>
        <div id="monitor" onClick={() => {
            cookie.set("gameState", "Desktop");
            window.location.reload();
        }}>
        </div>
    </div>
)}