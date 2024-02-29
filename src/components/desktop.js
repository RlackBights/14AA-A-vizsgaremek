import React, { useEffect, useState } from 'react'
import browser from '../assets/browser-icon.svg';
import editor from '../assets/editor-icon.svg';
import jobs from '../assets/jobs-icon.svg';
import shop from '../assets/shop-icon.svg';
import logo from '../assets/logo.svg';
import power from '../assets/power-icon.svg';
import settings from '../assets/settings-icon.svg';
import pc from '../assets/thispc-icon.svg';
import userIcon from '../assets/user-icon.svg';
import { useContext } from 'react';
import { saveContext, userContext } from '../App';
import PauseMenu from './pauseMenu';
import { parseSaves } from './saveFileManager';


export function Desktop() {
    const [window, setWindow] = useState("");
    const user = useContext(userContext);
    const save = useContext(saveContext);
    const [clock, setClock] = useState({date: new Date(), playtime: ""});

    useEffect(() => {
        const time = 2500 + Math.random(Math.random() * 1500);
        setTimeout(() => {
            document.getElementById("loading-screen").style.pointerEvents = "none";
            document.getElementById("loading-screen").className = "cube-wrapper fade-out";
        }, time);

        setInterval(() => {
            setClock({
                date: new Date(),
                playtime: `${save.activeSaveFile.getParsedTime()}`
            });
        }, 1000);
        
        const playtimeSinceStart = Date.now() - localStorage.getItem("currTime");
    }, [])

    return (
        <div id='desktop'>
            <PauseMenu/>
            <div class="cube-wrapper" id='loading-screen'>
                <div class="cube-folding">
                <span class="leaf1"></span>
                <span class="leaf2"></span>
                <span class="leaf3"></span>
                <span class="leaf4"></span>
                <span class="leaf5"></span>
                </div>
                <span class="loading" data-name="Loading">Learn_OS</span>
            </div>
            <h1 id='playtime-desktop'>{clock.playtime}</h1>
            <div id='icons'>
                <ul>
                    <li>
                        <img src={browser}></img>
                        <p>Browser</p>
                    </li>
                    <li>
                        <img src={editor}></img>
                        <p>Code</p>
                    </li>
                    <li>
                        <img src={jobs}></img>
                        <p>Jobs</p>
                    </li>
                    <li>
                        <img src={shop}></img>
                        <p>Market</p>
                    </li>
                </ul>
            </div>
            <div id='desktop-windows'>

            </div>
            <div id='start-menu' style={{opacity: 0}}>
                <ul>
                    <li>
                        <img src={pc}></img>
                        <p>This PC</p>
                    </li>
                    <li>
                        <img src={settings}></img>
                        <p>Settings</p>
                    </li>
                    <li onClick={() => {
                        document.getElementById("desktop").style.filter = "brightness(0)";
                        setTimeout(() => {
                            document.location.href = "/game/tableView?return=monitor";
                        }, 250);
                    }}>
                        <img src={power}></img>
                        <p>Power Off</p>
                    </li>
                </ul>
                <div>
                    <div>
                        <img src={userIcon}></img>
                        <p>{user.currUser.split(' ', 2)[0]}</p>
                    </div>
                    <p>{save.activeSaveFile.id}</p>
                    <p>Level {save.activeSaveFile.lvl}</p>
                    <p>{save.activeSaveFile.money}$</p>
                </div>
            </div>
            <div id='taskbar'>
                <ul id='windows'>
                    <li>
                        <button onClick={() => {
                            const startMenu = document.getElementById("start-menu");
                            if (startMenu.style.display === "flex")
                            {
                                startMenu.style.opacity = 0;
                                setTimeout(() => {
                                    startMenu.style.display = "none";
                                }, 250);
                            } else {
                                startMenu.style.display = "flex";
                                // retard fix wth
                                setTimeout(() => {
                                    startMenu.style.opacity = 1;
                                }, 0);
                            }
                        }}>
                            <img src={logo}></img>
                        </button>
                    </li>
                    <li>
                        <img src={browser}></img>
                    </li>
                    <li>
                        <img src={editor}></img>
                    </li>
                    <li>
                        <img src={jobs}></img>
                    </li>
                    <li>
                        <img src={shop}></img>
                    </li>
                </ul>
                <p>
                    {`${clock.date.getHours()}:${clock.date.getMinutes()}\n${(clock.date.getMonth() + 1) > 9 ? clock.date.getMonth() + 1 : `0${clock.date.getMonth() + 1}` }/${(clock.date.getDate() > 9) ? clock.date.getDate() : `0${clock.date.getDate()}`}`}
                </p>
            </div>
            
        </div>
    )
}