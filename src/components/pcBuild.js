import { createContext, useEffect, useState } from "react";
import cpu from "../assets/cpu.png";
import gpu from "../assets/gpu.png";
import ram from "../assets/ram.png";
import stg from "../assets/hdd.png";
import inventoryIcon from "../assets/inventory.svg";
import PauseMenu from "./pauseMenu";
import { useContext } from "react";
import { saveContext } from "../App";

/*
<img className={`draggable-item ${page}-hardware`} key={`${page}${i}`} hardware={page} draggable={false} src={{cpu: cpu, gpu: gpu, ram: ram, stg: stg}[page]} alt=""/>

<img className="draggable-item gpu-hardware" hardware={"gpu"} draggable={false} src={gpu} alt=""/>
<img className="draggable-item ram-hardware" hardware={"ram"} draggable={false} src={ram} alt=""/>
<img className="draggable-item stg-hardware" hardware={"stg"} draggable={false} src={stg} alt=""/>
*/

function generateDraggableItem(page, i)
{
    const img = document.createElement('img');
    img.className = `draggable-item ${page}-hardware`;
    img.setAttribute("key", `${page}${i}`);
    img.setAttribute("hardware", page);
    img.setAttribute("tier", i);
    img.draggable = false;
    img.src = {cpu: cpu, gpu: gpu, ram: ram, stg: stg}[page];
    img.alt = "";
    document.getElementById("pc-build").appendChild(img);
    return img;
}

function inventoryItems(lastBought, page)
{
    if (page === "") return [];
    let output = []

    const availableHardware = JSON.parse(localStorage.getItem("availableHardware"));
    for (let i = 0; i < lastBought[page] + 1; i++) {
        output.push(
            <div className="inventory-item">
                <img src={{cpu: cpu, gpu: gpu, ram: ram, stg: stg}[page]}/>
                <p className="inventory-company-name">{availableHardware[page][i].company}</p>
                <p className="inventory-hardware-name">{availableHardware[page][i].name}</p>
                <p className="inventory-hardware-desc">{availableHardware[page][i].description}</p>
                <button onClick={() => {generateDraggableItem(page, i)}} className="inventory-button">Add component</button>
            </div>
        )
    }
    return output;
}


function checkMouseInside(width, height, top, left, mouseX, mouseY)
{
    if (mouseX < left || mouseX > left + width) return false;
    if (mouseY < top || mouseY > top + height) return false;
    return true;
}

export const inventoryContext = createContext();

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
                    attachedImage.parentElement.removeChild(attachedImage);
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
                setInventoryPage("");
            } else if (e.target.classList.contains("hardware-target"))
            {
                e.target.style.display = "none";
                console.log(document.getElementById("pc-build").querySelector(`.draggable-item.${e.target.id.split('-')[0]}-hardware[tier=\"${e.target.getAttribute("placedTier")}\"]`));
                if (document.getElementById("pc-build").querySelectorAll(`.draggable-item.${e.target.id.split('-')[0]}-hardware[tier=\"${e.target.getAttribute("placedTier")}\"]`).length === 0)
                {
                    const img = generateDraggableItem(e.target.id.split('-')[0], e.target.getAttribute("placedTier"));
                    img.style.top = `${(e.clientY / window.innerHeight) * 100}vh`;
                    img.style.left = `${(e.clientX / window.innerWidth) * 100}vw`;
                    img.classList.add('hold-item');
                }
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
            <inventoryContext.Provider value={setInventoryPage}>
                <PauseMenu />
            </inventoryContext.Provider>
            <button id="pc-back" onClick={() => {
                window.location.href = "/game/tableView?return=pc";
            }}>Desktop</button>
            <div id="target-container">
                <div id="cpu-target" className="hardware-target" placedTier={0} style={{display: "none"}}></div>
                <div id="gpu-target" className="hardware-target" placedTier={0} style={{display: "none"}}></div>
                <div id="ram-target" className="hardware-target" placedTier={0} style={{display: "none"}}></div>
                <div id="stg-target" className="hardware-target" placedTier={0} style={{display: "none"}}></div>
            </div>
            <img id="inventory-icon" src={inventoryIcon} onClick={() => {
                setInventoryPage(x => (x !== "") ? "" : "cpu");
            }}/>
            <div id="inventory-contents" style={{display: (inventoryPage !== "") ? "flex" : "none"}}>
                <ul>
                    <li onClick={() => {
                        setInventoryPage("cpu");
                    }}>Processors</li>
                    <li onClick={() => {
                        setInventoryPage("gpu");
                    }}>Graphics Cards</li>
                    <li onClick={() => {
                        setInventoryPage("ram");
                    }}>Memory</li>
                    <li onClick={() => {
                        setInventoryPage("stg");
                    }}>Storage</li>
                </ul>
                <div id="inventory-item-container">
                    {inventoryItems(save.activeSaveFile.lastBought, inventoryPage)}
                </div>
            </div>
            
        </div>
    )
}