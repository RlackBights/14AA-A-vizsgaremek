import React, { useContext } from 'react'
import { saveContext, userContext } from '../App'

export function TableView() {
    const user = useContext(userContext);
    const saves = useContext(saveContext);
    console.log(saves.activeSaveFile);
    console.log(localStorage.getItem("userAuthCode"), user.currUser, saves.activeSaveFile);
    if (localStorage.getItem("userAuthCode") === "" || user.currUser === "" || saves.activeSaveFile.lvl === -1) window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

    return (
        <div>TEST</div>
    )
}
