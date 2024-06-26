import { useState } from "react";
import { optionsContext, saveContext } from "../App";
import { useContext } from "react";
import cpu from '../assets/cpu.png';
import gpu from '../assets/gpu.png';
import ram from '../assets/ram.png';
import stg from '../assets/hdd.png';
import { windowContext } from "./desktop";
import { displayMessage } from "./notification";
import purchaseSound from "../assets/purchase-sound.mp3";
import { soundContext } from '../App';
import useSound from "use-sound";

const images = {cpu, gpu, ram, stg};
function displayMarketItems(tab, saveFile, setSaveFile, buySound)
{
    const hardwareItems = JSON.parse(localStorage.getItem("availableHardware"));
    let output = [];
    hardwareItems[tab].forEach((element) => {
        let finalPrice = element.price;
        for (let i = hardwareItems[tab].length - 1; i >= 0; i--) {
            if (saveFile.lastBought[tab] >= i || element.hardwareId <= i) continue;
            finalPrice += hardwareItems[tab][i].price;
        }
        output.push(
            <div key={`${element.hardwareId}`} className='market-item'>
                <img alt='' src={images[tab]}></img>
                <p className='market-item-company'>{element.company}</p>
                <p className='market-item-name'>{element.name}</p>
                <p className='market-item-description'>{element.description}</p>
                <p className='market-item-price'>{finalPrice}$</p>
                <button
                    onClick={() => {
                        buySound();
                        const newSave = {...saveFile, money: saveFile.money - finalPrice, lastBought: {...saveFile.lastBought, [tab]: element.hardwareId} };
                        setSaveFile(newSave);
                        localStorage.setItem("activeSaveFile", JSON.stringify(newSave));
                        displayMessage("Item added to storage!")
                }} disabled={((tab === "cpu" && (element.hardwareId * 3 > saveFile.lvl || element.hardwareId <= saveFile.lastBought.cpu)) || (tab !== "cpu" && (element.hardwareId <= saveFile.lastBought[tab] || saveFile.lastBought.cpu < element.hardwareId)) || finalPrice > saveFile.money) ? true : false}>{(saveFile.lastBought.cpu >= element.hardwareId || (tab === "cpu" && element.hardwareId * 3 <= saveFile.lvl)) ? (saveFile.lastBought[tab] >= element.hardwareId ? "Owned" : "Buy") : "Unavailable"}
                </button>
            </div>
        )
    });

    return output;
}

export default function MarketPage()
{
    const [marketTab, setMarketTab] = useState("cpu");
    const save = useContext(saveContext);
    const window = useContext(windowContext);
    const options = useContext(optionsContext);
    const [buySound] = useSound(purchaseSound, { volume: options.optionValues.volume[0] });
    const play = useContext(soundContext).uiClick;

    return (
        <div id='market-page' className='pages' style={{display: (window === "market") ? "flex" : "none"}}>
            <div id='market-tabs'>
                <p onClick={() => {
                    play();
                    setMarketTab("cpu");
                }}>Processors</p>
                <p onClick={() => {
                    play();
                    setMarketTab("gpu");
                }}>Graphics Cards</p>
                <p onClick={() => {
                    play();
                    setMarketTab("ram");
                }}>Memory</p>
                <p onClick={() => {
                    play();
                    setMarketTab("stg");
                }}>Storage</p>
                <p>{save.activeSaveFile.money}$</p>
            </div>
            <div id='market-items'>
                {displayMarketItems(marketTab, save.activeSaveFile, save.setActiveSaveFile, buySound)}
            </div>
        </div>
    )
}