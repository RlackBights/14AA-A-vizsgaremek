import { useContext } from "react";
import { cookie } from "./cookie";
import { saveContext } from "../App";
import { Icon } from "@iconify/react";

export function Desktop()
{

    const save1 = useContext(saveContext)[0][0];
    const setSave1 = useContext(saveContext)[0][1];
    const save2 = useContext(saveContext)[1][0];
    const setSave2 = useContext(saveContext)[1][1];
    const save3 = useContext(saveContext)[2][0];
    const setSave3 = useContext(saveContext)[2][1];
    return (
        <div id="desktop">
            <button
              className="mobile"
              id="exit-game-button"
              onClick={() => {
                cookie.set("gameState", "Room")

                window.location.reload();
              }}
            >
              <Icon icon="uil:bars" />
            </button>
          </div>
    );
}