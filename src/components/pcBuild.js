import cpu from "../assets/cpu.png";
import PauseMenu from "./pauseMenu";

export function PCBuild() {
    return (
        <div id="pc-build">
            <PauseMenu />
            <img className="draggable-item" src={cpu} alt=""/>
        </div>
    )
}