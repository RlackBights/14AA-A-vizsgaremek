import { useEffect, useState } from "react";
import cpu from "../assets/cpu.png";
import gpu from "../assets/gpu.png"
import ram from "../assets/ram.png"
import stg from "../assets/hdd.png"
import PauseMenu from "./pauseMenu";

export function PCBuild() {

    const [attachedImage, setAttachedImage] = useState(undefined);

    useEffect(() => {
        const mousemoveEvent = (e) => {
            if (attachedImage === undefined) return;
            attachedImage.style.top = `${(e.screenY / window.innerHeight) * 100}vh`;
            attachedImage.style.left = `${(e.screenX / window.innerWidth) * 100}vw`;

        }

        const mouseupEvent = (e) => {
            if (attachedImage === undefined) return;
            e.target.classList.remove("hold-item");
            setAttachedImage(undefined);
        }

        const mousedownEvent = (e) => {
            if (e.target.classList[0] === "draggable-item") 
            {
                e.target.classList.add("hold-item");
                setAttachedImage(e.target);
                e.target.style.top = `${(e.screenY / window.innerHeight) * 100}vh`;
                e.target.style.left = `${(e.screenX / window.innerWidth) * 100}vw`;
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
            {(attachedImage !== undefined) && <div id="target-container">
                <div id="cpu-target" className="hardware-target" style={{display: attachedImage.classList.contains("cpu-hardware") ? "block" : "none"}}></div>
                <div id="gpu-target" className="hardware-target" style={{display: attachedImage.classList.contains("gpu-hardware") ? "block" : "none"}}></div>
                <div id="ram-target" className="hardware-target" style={{display: attachedImage.classList.contains("ram-hardware") ? "block" : "none"}}></div>
                <div id="stg-target" className="hardware-target" style={{display: attachedImage.classList.contains("stg-hardware") ? "block" : "none"}}></div>
            </div>}
            <img className="draggable-item cpu-hardware" draggable={false} src={cpu} alt=""/>
            <img className="draggable-item gpu-hardware" draggable={false} src={gpu} alt=""/>
            <img className="draggable-item ram-hardware" draggable={false} src={ram} alt=""/>
            <img className="draggable-item stg-hardware" draggable={false} src={stg} alt=""/>
            
        </div>
    )
}