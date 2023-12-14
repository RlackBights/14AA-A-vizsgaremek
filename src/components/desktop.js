import { cookie } from "./cookie";
import { Icon } from "@iconify/react";

export function Desktop()
{
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