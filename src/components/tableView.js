import React, { useContext } from 'react'
import { userContext } from '../App'
import PauseMenu from './pauseMenu';
import { useEffect } from 'react';

export function TableView() {
    const user = useContext(userContext);
    if (localStorage.getItem("userAuthCode") === "" || user.currUser === "") window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    useEffect(() => {
        if (new URLSearchParams(window.location.search).get("return") === "monitor") 
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

        if (new URLSearchParams(window.location.search).get("return") === "pc") 
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
    }, [])

    return (
        <div id='room'>
            <PauseMenu/>
            <div id='monitor' onClick={() => {
                const room = document.getElementById("room");
                const monitorClick = document.getElementById("monitor");
                const computerClick = document.getElementById("computer");
                monitorClick.style.display = "none";
                computerClick.style.display = "none";
                room.classList.add("monitor-zoom");
                setTimeout(() => {
                    window.location.href = "/game/desktop";
                }, 1100);
            }}>

            </div>
            <div id='computer' onClick={() => {
                const room = document.getElementById("room");
                const monitorClick = document.getElementById("monitor");
                const computerClick = document.getElementById("computer");
                monitorClick.style.display = "none";
                computerClick.style.display = "none";
                room.classList.add("pc-zoom");
                setTimeout(() => {
                    window.location.href = "/game/pcbuild";
                }, 700);
            }}>

            </div>
        </div>
    )
}
