import React, { useContext } from 'react';
import { saveContext, userContext } from '../App';
import { useNavigate, useLocation } from 'react-router-dom';
import PauseMenu from './pauseMenu';
import { useEffect } from 'react';
import { displayMessage } from './notification';
import { soundContext } from '../App';

export function TableView() {
    const user = useContext(userContext);
    const save = useContext(saveContext);
    const navigate = useNavigate();
    const location = useLocation();
    const play = useContext(soundContext).uiClick;

    useEffect(() =>{
        //window.electron.createSaveFiles(user.currUser.split(' ')[0], save.activeSaveFile.saveId);
    });
    
    if (localStorage.getItem("userAuthCode") === "" || user.currUser === "") navigate("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    useEffect(() => {
        if (location.search.includes("return") && location.search.includes("monitor")) 
        {
            const room = document.getElementById("room");
            const monitorClick = document.getElementById("monitor");
            const computerClick = document.getElementById("computer");
            monitorClick.style.display = "none";
            computerClick.style.display = "none";
            room.classList.add("monitor-leave");
            setTimeout(() => {
                monitorClick.style.display = "block";
                computerClick.style.display = "block";
                room.classList.remove("monitor-leave");
            }, 1000);
        }

        if (location.search.includes("return") && location.search.includes("pc")) 
        {
            const room = document.getElementById("room");
            const monitorClick = document.getElementById("monitor");
            const computerClick = document.getElementById("computer");
            monitorClick.style.display = "none";
            computerClick.style.display = "none";
            room.classList.add("pc-leave");
            setTimeout(() => {
                monitorClick.style.display = "block";
                computerClick.style.display = "block";
                room.classList.remove("pc-leave");
            }, 1000);
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div id='room'>
            <button id='esc-btn' onClick={() => {
                const pauseMenu = document.getElementById('pause-menu');
                if (pauseMenu && sessionStorage.getItem("pauseMenuLocked") === "false") {
                    pauseMenu.style.display = (pauseMenu.style.display === "flex") ? "none" : "flex";
                }
            }}>ESC</button>
            <PauseMenu/>
            <div id='monitor' onClick={() => {
                play();
                if ([save.activeSaveFile.cpuId, save.activeSaveFile.gpuId, save.activeSaveFile.ramId, save.activeSaveFile.stgId].includes(-1)) {
                    displayMessage("Missing hardware element/elements", "error");
                    return;
                } else if(save.activeSaveFile.gpuId > save.activeSaveFile.cpuId || save.activeSaveFile.ramId > save.activeSaveFile.cpuId || save.activeSaveFile.stgId > save.activeSaveFile.cpuId) {
                    displayMessage("The CPU's level is too low for other elements", "error");
                    return;
                }
                const room = document.getElementById("room");
                const monitorClick = document.getElementById("monitor");
                const computerClick = document.getElementById("computer");
                monitorClick.style.display = "none";
                computerClick.style.display = "none";
                room.classList.add("monitor-zoom");
                setTimeout(() => {
                    sessionStorage.setItem("ingame", "true");
                    navigate("/game/desktop");
                }, 1100);
            }}>

            </div>
            <div id='computer' onClick={() => {
                play();
                const room = document.getElementById("room");
                const monitorClick = document.getElementById("monitor");
                const computerClick = document.getElementById("computer");
                monitorClick.style.display = "none";
                computerClick.style.display = "none";
                room.classList.add("pc-zoom");
                setTimeout(() => {
                    navigate("/game/pcbuild");
                }, 700);
            }}>

            </div>
        </div>
    )
}
