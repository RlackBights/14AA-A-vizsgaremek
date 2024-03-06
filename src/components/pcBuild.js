import { useEffect, useState } from "react";
import cpu from "../assets/cpu.png";
import gpu from "../assets/gpu.png";
import ram from "../assets/ram.png";
import stg from "../assets/hdd.png";
import inventoryIcon from "../assets/inventory.svg";
import PauseMenu from "./pauseMenu";
import { useContext } from "react";
import { saveContext } from "../App";

function inventoryItems(lastBought, page)
{
    let output = []

    console.log(lastBought);

    return output;
}


function checkMouseInside(width, height, top, left, mouseX, mouseY)
{
    if (mouseX < left || mouseX > left + width) return false;
    if (mouseY < top || mouseY > top + height) return false;
    return true;
}

export function PCBuild() {
    const save = useContext(saveContext);
    const [inventoryPage, setInventoryPage] = useState("");
    useEffect(() => {
        const mousemoveEvent = (e) => {
            const attachedImage = (document.querySelector(".hold-item") !== null) ? document.querySelector(".hold-item") : undefined;
            if (attachedImage === undefined) return;
            const hardwareTarget = document.getElementById(`${attachedImage.getAttribute("hardware")}-target`);
            if (hardwareTarget !== null) {
                if (checkMouseInside(hardwareTarget.clientWidth, hardwareTarget.clientHeight, hardwareTarget.offsetTop, hardwareTarget.offsetLeft, e.clientX, e.clientY)) {
                    hardwareTarget.style.filter = "brightness(0) invert(0.5) sepia(1) hue-rotate(80deg) saturate(2) opacity(0.25)";
                } else {
                    hardwareTarget.style.filter = "brightness(0) invert(0.5) sepia(1) hue-rotate(250deg) saturate(2) opacity(0.25)";
                }
            }
            attachedImage.style.top = `${(e.clientY / window.innerHeight) * 100}vh`;
            attachedImage.style.left = `${(e.clientX / window.innerWidth) * 100}vw`;

        }

        const mouseupEvent = (e) => {
            const attachedImage = (document.querySelector(".hold-item") !== null) ? document.querySelector(".hold-item") : undefined;
            if (attachedImage === undefined) return;
            const hardwareTarget = document.getElementById(`${attachedImage.getAttribute("hardware")}-target`);
            if (hardwareTarget !== null) {
                if (checkMouseInside(hardwareTarget.clientWidth, hardwareTarget.clientHeight, hardwareTarget.offsetTop, hardwareTarget.offsetLeft, e.clientX, e.clientY)) {
                    attachedImage.style.display = "none";
                    hardwareTarget.style.filter = "opacity(1)";
                } else {
                    hardwareTarget.style.display = "none";
                }
            }
            e.target.classList.remove("hold-item");
        }

        const mousedownEvent = (e) => {
            if (e.target.classList[0] === "draggable-item") 
            {
                e.target.classList.add("hold-item");
                e.target.style.top = `${(e.clientY / window.innerHeight) * 100}vh`;
                e.target.style.left = `${(e.clientX / window.innerWidth) * 100}vw`;
                const hardwareTarget = document.getElementById(`${e.target.classList[1].split('-')[0]}-target`);
                hardwareTarget.style.display = "block";
            }
        }

        document.body.removeEventListener('mousedown', mousedownEvent);
        document.body.removeEventListener('mousemove', mousemoveEvent);
        document.body.removeEventListener('mouseup', mouseupEvent);
        document.body.addEventListener('mousedown', mousedownEvent);
        document.body.addEventListener('mousemove', mousemoveEvent);
        document.body.addEventListener('mouseup', mouseupEvent);
    })
    return (
        <div id="pc-build">
            <PauseMenu />
            <button id="pc-back" onClick={() => {
                window.location.href = "/game/tableView?return=pc";
            }}>Back</button>
            <div id="target-container">
                <div id="cpu-target" className="hardware-target" style={{display: "none"}}></div>
                <div id="gpu-target" className="hardware-target" style={{display: "none"}}></div>
                <div id="ram-target" className="hardware-target" style={{display: "none"}}></div>
                <div id="stg-target" className="hardware-target" style={{display: "none"}}></div>
            </div>
            <img id="inventory-icon" src={inventoryIcon} onClick={() => {
                const inventory = document.getElementById("inventory-contents");
                setInventoryPage(x => (x !== "") ? "" : "cpu");
            }}/>
            <div id="inventory-contents" style={{display: (inventoryPage !== "") ? "flex" : "none"}}>
                <ul>
                    <li>Processors</li>
                    <li>Graphics Cards</li>
                    <li>Memory</li>
                    <li>Storage</li>
                </ul>
                {inventoryItems(save.activeSaveFile.lastBought, inventoryPage)}
            </div>
            
        </div>
    )
}

/*
<img className="draggable-item cpu-hardware" hardware={"cpu"} draggable={false} src={cpu} alt=""/>
<img className="draggable-item gpu-hardware" hardware={"gpu"} draggable={false} src={gpu} alt=""/>
<img className="draggable-item ram-hardware" hardware={"ram"} draggable={false} src={ram} alt=""/>
<img className="draggable-item stg-hardware" hardware={"stg"} draggable={false} src={stg} alt=""/>
*/