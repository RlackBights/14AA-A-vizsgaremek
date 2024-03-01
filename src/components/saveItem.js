import { useContext, useEffect, useState } from 'react';
import { overlayContext, saveContext } from '../App';
import '../App.css'
import { saveOffsetContext } from './saveContainer';
import { deleteSave } from './requests';
import { useNavigate } from 'react-router-dom';

function startGame()
{

}

export function SaveItem(props)
{
    const overlay = useContext(overlayContext);
    const saveOffset = useContext(saveOffsetContext);
    const saves = useContext(saveContext);

    return (
            <div className="save-item-container">
                <div
                    className="save-item"
                    onClick={() => {
                        saves.setActiveSaveFile(props.save);
                        localStorage.setItem("activeSaveFile", JSON.stringify(props.save));
                        localStorage.setItem("currTime", Date.now().toString());
                        setTimeout(() => {
                            window.location.href = "/game/tableView";
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
                        <p>{props.save.money}$</p>
                        <p id="playtime">
                            {props.save.getParsedTime()}
                        </p>
                    </div>
                </div>
                <button
                    tabIndex="-1"
                    className="delete-button"
                    onClick={() => {
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