import React, { useContext } from 'react'
import { saveContext, userContext } from '../App'
import PauseMenu from './pauseMenu';

export function TableView() {
    const user = useContext(userContext);
    const saves = useContext(saveContext);
    if (localStorage.getItem("userAuthCode") === "" || user.currUser === "" || saves.activeSaveFile.lvl === -1) window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

    document.body.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            const pauseMenu = document.getElementById('pause-menu');
            console.log(pauseMenu.style.display);
            pauseMenu.style.display = (pauseMenu.style.display === "flex") ? "none" : "flex";
        }
    })

    return (
        <div id='room'>
            <PauseMenu/>
            <div id='monitor'>

            </div>
            <div id='computer'>

            </div>
        </div>
    )
}
