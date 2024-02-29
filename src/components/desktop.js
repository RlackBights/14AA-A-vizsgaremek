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

function normalizeTime(num)
{
    return `${num > 9 ? num : `0${num}`}`
}

export function Desktop() {
    const [window, setWindow] = useState("");
    const user = useContext(userContext);
    const save = useContext(saveContext);
    const [clock, setClock] = useState({date: new Date(), playtime: ""});

    useEffect(() => {
        console.log(window);
    }, [window])

    useEffect(() => {
        const time = 2500 + Math.random(Math.random() * 1500);
        setTimeout(() => {
            document.getElementById("loading-screen").style.pointerEvents = "none";
            document.getElementById("loading-screen").className = "cube-wrapper fade-out";
        }, time);


        setInterval(() => {
            const time = save.activeSaveFile.time + Math.round((Date.now() - parseInt(localStorage.getItem("currTime"))) / 1000);
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time - hours*3600) / 60);
            const seconds = Math.floor(time - hours*3600 - minutes*60);
            setClock({
                date: new Date(),
                playtime: `${hours === 0 ? "" : `${hours}:`}${normalizeTime(minutes)}:${normalizeTime(seconds)}`
            });
        }, 1000);
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
                    <li onClick={() => {
                        setWindow("browser");
                    }}>
                        <img draggable={false} src={browser}></img>
                        <p>Browser</p>
                    </li>
                    <li onClick={() => {
                        setWindow("code");
                    }}>
                        <img draggable={false} src={editor}></img>
                        <p>Code</p>
                    </li>
                    <li onClick={() => {
                        setWindow("jobs");
                    }}>
                        <img draggable={false} src={jobs}></img>
                        <p>Jobs</p>
                    </li>
                    <li onClick={() => {
                        setWindow("market");
                    }}>
                        <img draggable={false} src={shop}></img>
                        <p>Market</p>
                    </li>
                </ul>
            </div>
            <div id='desktop-windows'>

            </div>
            <div id='start-menu' style={{opacity: 0}}>
                <ul>
                    <li onClick={() => {
                        setWindow("thispc");
                    }}>
                        <img draggable={false} src={pc}></img>
                        <p>This PC</p>
                    </li>
                    <li onClick={() => {
                        setWindow("settings");
                    }}>
                        <img draggable={false} src={settings}></img>
                        <p>Settings</p>
                    </li>
                    <li onClick={() => {
                        document.getElementById("desktop").style.filter = "brightness(0)";
                        setTimeout(() => {
                            document.location.href = "/game/tableView?return=monitor";
                        }, 250);
                    }}>
                        <img draggable={false} src={power}></img>
                        <p>Power Off</p>
                    </li>
                </ul>
                <div>
                    <div>
                        <img draggable={false} src={userIcon}></img>
                        <p>{user.currUser.split(' ', 2)[0]}</p>
                    </div>
                    <p>{save.activeSaveFile.saveId}</p>
                    <p>Level {save.activeSaveFile.lvl}</p>
                    <p>{save.activeSaveFile.money}$</p>
                </div>
            </div>
            <div id='taskbar'>
                <ul id='taskbar-icons'>
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
                            <img draggable={false} src={logo}></img>
                        </button>
                    </li>
                    <li onClick={() => {
                        setWindow("browser");
                    }}>
                        <img draggable={false} src={browser}></img>
                    </li>
                    <li onClick={() => {
                        setWindow("code");
                    }}>
                        <img draggable={false} src={editor}></img>
                    </li>
                    <li onClick={() => {
                        setWindow("jobs");
                    }}>
                        <img draggable={false}  src={jobs}></img>
                    </li>
                    <li onClick={() => {
                        setWindow("market");
                    }}>
                        <img draggable={false} src={shop}></img>
                    </li>
                </ul>
                <p>
                    {`${normalizeTime(clock.date.getHours())}:${normalizeTime(clock.date.getMinutes())}\n${normalizeTime(clock.date.getMonth())}/${normalizeTime(clock.date.getDate())}`}
                </p>
            </div>
            <div id='windows'>
                <p id='window-title'>{window}</p>
                <button style={{display : window !== "" ? "block" : "none"}} onClick={() => {
                    setWindow("");
                }}>Close</button>
                <div id='browser-page' className='pages' style={{display: window === "browser" ? "flex" : "none"}}>

                </div>
                <div id='code-page' className='pages' style={{display: (window === "code") ? "flex" : "none"}}>

                </div>
                <div id='jobs-page' className='pages' style={{display: (window === "jobs") ? "flex" : "none"}}>

                </div>
                <div id='market-page' className='pages' style={{display: (window === "market") ? "flex" : "none"}}>

                </div>
                <div id='thispc-page' className='pages' style={{display: (window === "thispc") ? "flex" : "none"}}>

                </div>
                <div id='settings-page' className='pages' style={{display: (window === "settings") ? "flex" : "none"}}>

                </div>
            </div>
            
        </div>
    )
}