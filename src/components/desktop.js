import React, { useEffect } from 'react'
import browser from '../assets/browser-icon.svg';
import editor from '../assets/editor-icon.svg';
import jobs from '../assets/jobs-icon.svg';
import shop from '../assets/shop-icon.svg';
import logo from '../assets/logo.svg';

export function Desktop() {

    useEffect(() => {
        const time = 2500 + Math.random(Math.random() * 1500);
        setTimeout(() => {
            document.getElementById("loading-screen").style.pointerEvents = "none";
            document.getElementById("loading-screen").className = "cube-wrapper fade-out";
        }, time);
    }, [])

    return (
        <div id='desktop'>
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
            <div id='icons'>
                <ul>
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
            </div>
            <div id='taskbar'>
                <ul id='windows'>
                    <li>
                        <img src={logo}></img>
                    </li>
                    <li>
                        <img src={browser}></img>
                        <p>Browser</p>
                    </li>
                    <li>
                        <img src={editor}></img>
                        <p>Browser</p>
                    </li>
                    <li>
                        <img src={jobs}></img>
                        <p>Browser</p>
                    </li>
                    <li>
                        <img src={shop}></img>
                        <p>Browser</p>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}