import { useContext } from 'react';
import { overlayContext, saveContext } from '../App';
import '../App.css'
import { clamp, saveOffsetContext } from './saveContainer';
import { deleteSave } from './requests';
import { useNavigate } from 'react-router-dom';
import { soundContext } from '../App';

export function progressPercentage(inXp, inLevel) {
    let currLevel = parseInt(inLevel);
    if (currLevel === 10) return 100;
    let currXp = parseInt(inXp);
    let targetLevel = clamp(currLevel + 1, 1, 10);
    let requiredXp = (Math.pow(targetLevel * 6 + 5, 2) / 12 - 25 / 12) - (Math.pow(currLevel * 6 + 5, 2) / 12 - 25 / 12);
    let actualXp = currXp - (Math.pow(currLevel * 6 + 5, 2) / 12 - 25 / 12);
    let percentage = (actualXp / requiredXp) * 100;

    return Math.floor(percentage);
}

export function SaveItem(props) {
    const overlay = useContext(overlayContext);
    const saveOffset = useContext(saveOffsetContext);
    const saves = useContext(saveContext);
    const navigate = useNavigate();
    const play = useContext(soundContext).uiClick;

    return (
            <div className="save-item-container">
                <div
                    className="save-item"
                    onClick={() => {
                        play();
                        let save = props.save;
                        save.lastBought = JSON.parse(save.lastBought)
                        saves.setActiveSaveFile(save);
                        localStorage.setItem("activeSaveFile", JSON.stringify(save));
                        localStorage.setItem("currTime", Date.now().toString());
                        localStorage.setItem("stats", JSON.stringify(saves.stats));
                        setTimeout(() => {
                            navigate("game/tableView/");
                        }, 250);
                    }}
                >
                    <div className="grid-item save-top">
                        <div id="langs">
                            <p className={props.save.cpuId >= 0 ? "" : "locked-lang"} id="html">
                            HTML
                            </p>
                            <p className={props.save.cpuId >= 1 ? "" : "locked-lang"} id="css">
                            CSS
                            </p>
                            <p className={props.save.cpuId >= 2 ? "" : "locked-lang"} id="js">
                            JS
                            </p>
                        </div>
                        <div id="config">
                            <p>CPU: <br/>{props.save.getCPU()}<span></span></p>
                            <p>GPU: <br/>{props.save.getGPU()}<span></span></p>
                            <p>RAM: <br/>{props.save.getRAM()}<span></span></p>
                            <p>STG: <br/>{props.save.getSTG()}<span></span></p>
                        </div>
                    </div>
                    <div className="grid-item save-bottom">
                        <p>{props.save.saveId}</p>
                        <p>LvL: {props.save.lvl}</p>
                        <div style={{ background: `linear-gradient(to right, var(--accent-color) ${progressPercentage(props.save.xp, props.save.lvl)}%, #00000000 ${progressPercentage(props.save.xp, props.save.lvl)}%)` }}></div>
                        <section>{progressPercentage(props.save.xp, props.save.lvl)}%</section>
                        <p>{props.save.money}$</p>
                        <p id="playtime">
                            { props.save.getParsedTime()}
                        </p>
                    </div>
                </div>
                <button
                    tabIndex="-1"
                    className="delete-button"
                    onClick={() => {
                        play();
                        deleteSave(props.user, props.save.saveId).then(() => {
                            saveOffset.setSaveOffset(0);
                            overlay.setCurrOverlay("");
                        });
                    }}
                >
                    <span>Delete</span>
                </button>
            </div>
    )
}