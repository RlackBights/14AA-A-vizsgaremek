import { useContext, useState } from 'react';
import { backend, overlayContext, saveContext } from '../App';
import '../App.css'
import { saveOffsetContext } from './saveContainer';

export function SaveItem(props)
{
    const overlay = useContext(overlayContext);
    const saveOffset = useContext(saveOffsetContext);
    return (
            <div className="save-item-container">
                <div
                    className="save-item"
                    id="save-item1"
                    onClick={() => {
                    }}
                >
                    <div className="empty-save-base">
                        <p>Empty save</p>
                        <p>
                            <i>-- slot 1 --</i>
                        </p>
                    </div>
                    <div className="grid-item save-top">
                        <div id="langs">
                            <p className={props.save.cpu >= 0 ? "" : "locked-lang"} id="html">
                            HTML
                            </p>
                            <p className={props.save.cpu >= 1 ? "" : "locked-lang"} id="css">
                            CSS
                            </p>
                            <p className={props.save.cpu >= 2 ? "" : "locked-lang"} id="js">
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
                        <p>{props.save.id}</p>
                        <p>LvL: {props.save.lvl}</p>
                        <p>{props.save.money}$</p>
                        <p id="playtime">
                            {props.save.getParsedTime()}
                        </p>
                    </div>
                </div>
                <button
                    tabindex="-1"
                    className="delete-button"
                    onClick={() => {
                        const fetchParams = {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              authCode: props.user,
                              saveId: props.save.id
                            }),
                          };
                        fetch("http://localhost:8000" + '/game/deleteSave', fetchParams).then((res) => res.json()).then((res) => console.log(res));
                        saveOffset.setSaveOffset(0);
                        overlay.setCurrOverlay("");
                        //console.log(`SEND FETCH REQUEST => ${props.user} - ${props.save.id}`)
                    }}
                >
                    <span>Delete</span>
                </button>
            </div>
    )
}