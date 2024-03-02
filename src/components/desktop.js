import React, { createContext, useEffect, useState } from 'react'
import browser from '../assets/browser-icon.svg';
import editor from '../assets/editor-icon.svg';
import jobs from '../assets/jobs-icon.svg';
import shop from '../assets/shop-icon.svg';
import logo from '../assets/logo.svg';
import power from '../assets/power-icon.svg';
import settings from '../assets/settings-icon.svg';
import pc from '../assets/thispc-icon.svg';
import userIcon from '../assets/user-icon.svg';
import cpu from '../assets/cpu.png';
import gpu from '../assets/gpu.png';
import ram from '../assets/ram.png';
import stg from '../assets/hdd.png';
import { useContext } from 'react';
import { saveContext, userContext } from '../App';
import PauseMenu from './pauseMenu';

const images = {cpu, gpu, ram, stg};

function normalizeTime(num) {
    return num > 9 ? num : `0${num}`
}

function selectIcon(window)
{
    switch (window) {
        case "browser":
            return browser;
        case "code":
            return editor;
        case "jobs":
            return jobs;
        case "market":
            return shop;
        case "thispc":
            return pc;
        case "settings":
            return settings;
        default:
            return "";
    }
}

function displayMarketItems(tab)
{
    const hardwareItems = JSON.parse(localStorage.getItem("availableHardware"));
    let output = [];
    hardwareItems[tab].forEach((element) => {
        output.push(
            <div key={`${element.hardwareId}`} className='market-item'>
                <img alt='' src={images[tab]}></img>
                <p className='market-item-company'>{element.company}</p>
                <p className='market-item-name'>{element.name}</p>
                <p className='market-item-description'>{element.description}</p>
                <p className='market-item-price'>{element.price}$</p>
                <button>Buy</button>
            </div>
        )
    });

    return output;
}

export const windowContext = createContext();

export function Desktop() {
    const [window, setWindow] = useState("");
    const user = useContext(userContext);
    const save = useContext(saveContext);
    const [clock, setClock] = useState({date: new Date(), playtime: ""});
    const [marketTab, setMarketTab] = useState("cpu");

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
    })

    return (
        <div id='desktop'>
            <windowContext.Provider value={setWindow}>
                <PauseMenu/>
            </windowContext.Provider>
            <div className="cube-wrapper" id='loading-screen'>
                <div className="cube-folding">
                <span className="leaf1"></span>
                <span className="leaf2"></span>
                <span className="leaf3"></span>
                <span className="leaf4"></span>
                <span className="leaf5"></span>
                </div>
                <span className="loading" data-name="Loading">Learn_OS</span>
            </div>
            <h1 id='playtime-desktop'>{clock.playtime}</h1>
            <div id='icons'>
                <ul>
                    <li onClick={() => {
                        const startMenu = document.getElementById("start-menu");
                        startMenu.style.opacity = 0;
                        setTimeout(() => {
                            startMenu.style.display = "none";
                        }, 250);
                        setWindow("browser");
                    }}>
                        <img alt="" draggable={false} src={browser}></img>
                        <p>Browser</p>
                    </li>
                    <li onClick={() => {
                        const startMenu = document.getElementById("start-menu");
                        startMenu.style.opacity = 0;
                        setTimeout(() => {
                            startMenu.style.display = "none";
                        }, 250);
                        setWindow("code");
                    }}>
                        <img alt="" draggable={false} src={editor}></img>
                        <p>Code</p>
                    </li>
                    <li onClick={() => {
                        const startMenu = document.getElementById("start-menu");
                        startMenu.style.opacity = 0;
                        setTimeout(() => {
                            startMenu.style.display = "none";
                        }, 250);
                        setWindow("jobs");
                    }}>
                        <img alt="" draggable={false} src={jobs}></img>
                        <p>Jobs</p>
                    </li>
                    <li onClick={() => {
                        const startMenu = document.getElementById("start-menu");
                        startMenu.style.opacity = 0;
                        setTimeout(() => {
                            startMenu.style.display = "none";
                        }, 250);
                        setWindow("market");
                    }}>
                        <img alt="" draggable={false} src={shop}></img>
                        <p>Market</p>
                    </li>
                </ul>
            </div>
            <div id='desktop-windows'>

            </div>
            <div id='start-menu' style={{opacity: 0}}>
                <ul>
                    <li onClick={() => {
                        const startMenu = document.getElementById("start-menu");
                        startMenu.style.opacity = 0;
                        setTimeout(() => {
                            startMenu.style.display = "none";
                        }, 250);
                        setWindow(window === "thispc" ? "" : "thispc");
                    }}>
                        <img alt="" draggable={false} src={pc}></img>
                        <p>This PC</p>
                    </li>
                    <li onClick={() => {
                        const startMenu = document.getElementById("start-menu");
                        startMenu.style.opacity = 0;
                        setTimeout(() => {
                            startMenu.style.display = "none";
                        }, 250);
                        setWindow(window === "settings" ? "" : "settings");
                    }}>
                        <img alt="" draggable={false} src={settings}></img>
                        <p>Settings</p>
                    </li>
                    <li onClick={() => {
                        document.getElementById("desktop").style.filter = "brightness(0)";
                        setTimeout(() => {
                            document.location.href = "/game/tableView?return=monitor";
                        }, 250);
                    }}>
                        <img alt="" draggable={false} src={power}></img>
                        <p>Power Off</p>
                    </li>
                </ul>
                <div>
                    <div>
                        <img alt="" draggable={false} src={userIcon}></img>
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
                            <img alt="" draggable={false} src={logo}></img>
                        </button>
                    </li>
                    <li className={window === "browser" ? "focused" : ""}
                        onClick={() => {
                        const startMenu = document.getElementById("start-menu");
                        startMenu.style.opacity = 0;
                        setTimeout(() => {
                            startMenu.style.display = "none";
                        }, 250);

                        setWindow(window === "browser" ? "" : "browser");
                    }}>
                        <img alt="" draggable={false} src={browser}></img>
                    </li>
                    <li className={window === "code" ? "focused" : ""}
                        onClick={() => {
                        const startMenu = document.getElementById("start-menu");
                        startMenu.style.opacity = 0;
                        setTimeout(() => {
                            startMenu.style.display = "none";
                        }, 250);

                        setWindow(window === "code" ? "" : "code");
                    }}>
                        <img alt="" draggable={false} src={editor}></img>
                    </li>
                    <li className={window === "jobs" ? "focused" : ""}
                        onClick={() => {
                        const startMenu = document.getElementById("start-menu");
                        startMenu.style.opacity = 0;
                        setTimeout(() => {
                            startMenu.style.display = "none";
                        }, 250);

                        setWindow(window === "jobs" ? "" : "jobs");
                    }}>
                        <img alt="" draggable={false}  src={jobs}></img>
                    </li>
                    <li className={window === "market" ? "focused" : ""}
                        onClick={() => {
                        const startMenu = document.getElementById("start-menu");
                        startMenu.style.opacity = 0;
                        setTimeout(() => {
                            startMenu.style.display = "none";
                        }, 250);

                        setWindow(window === "market" ? "" : "market");
                    }}>
                        <img alt="" draggable={false} src={shop}></img>
                    </li>
                </ul>
                <p>
                    {`${normalizeTime(clock.date.getHours())}:${normalizeTime(clock.date.getMinutes())}\n${normalizeTime(clock.date.getMonth())}/${normalizeTime(clock.date.getDate())}`}
                </p>
            </div>
            <div id='windows'>
                <img alt="" draggable={false} src={selectIcon(window)}></img>
                <p id='window-title'>{window}</p>
                <button style={{display : window !== "" ? "block" : "none"}} onClick={() => {
                    setWindow("");
                }}>Close</button>
                <div id='browser-page' className='pages' style={{display: window === "browser" ? "flex" : "none"}}>
                    <p className='blocked-feature'>Feature not included in demo version</p>
                </div>
                <div id='code-page' className='pages' style={{display: (window === "code") ? "flex" : "none"}}>

                </div>
                <div id='jobs-page' className='pages' style={{display: (window === "jobs") ? "flex" : "none"}}>

                </div>
                <div id='market-page' className='pages' style={{display: (window === "market") ? "flex" : "none"}}>
                    <div id='market-tabs'>
                        <p onClick={() => {
                            setMarketTab("cpu");
                        }}>Processors</p>
                        <p onClick={() => {
                            setMarketTab("gpu");
                        }}>Graphics Cards</p>
                        <p onClick={() => {
                            setMarketTab("ram");
                        }}>Memory</p>
                        <p onClick={() => {
                            setMarketTab("stg");
                        }}>Storage</p>
                        <p>{save.activeSaveFile.money}$</p>
                    </div>
                    <div id='market-items'>
                        {displayMarketItems(marketTab)}
                    </div>
                </div>
                <div id='thispc-page' className='pages' style={{display: (window === "thispc") ? "flex" : "none"}}>
                    <p className='blocked-feature'>Feature not included in demo version</p>
                </div>
                <div id='settings-page' className='pages' style={{display: (window === "settings") ? "flex" : "none"}}>
                    <p className='blocked-feature'>Feature not included in demo version</p>
                </div>
            </div>
            
        </div>
    )
}