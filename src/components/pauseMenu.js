import React, { useContext, useEffect } from 'react'
import { updateSave } from './requests'
import { userContext } from '../App';
import { saveContext } from '../App';
import { windowContext } from './desktop';
import { inventoryContext } from './pcBuild';

sessionStorage.setItem("attachedPauseHandlers", "false");

export default function PauseMenu() {
  const user = useContext(userContext);
  const saves = useContext(saveContext);
  const setWindow = useContext(windowContext);
  const setInventoryPage = useContext(inventoryContext);

  useEffect(() => {

    if (sessionStorage.getItem("attachedPauseHandlers") === "true") return;

    const pauseMenu = document.getElementById('pause-menu');

    const keydownEvent = (e) => {
      if (e.key === "Escape" && sessionStorage.getItem("pauseMenuLocked") === "false")
      {
        console.log('!')
        let isPageActive = false;
        let hasWindows = document.getElementById('windows') !== null;
        if (hasWindows) {
          document.getElementById('windows').childNodes.forEach(child => {
            if (child.className !== "pages") return;
            if (child.style.display === "none") return;
            setWindow("");
            isPageActive = true;
          });
        }

        let hasInventory = (document.getElementById('inventory-contents') !== null && document.getElementById('inventory-contents').style.display === "flex");
        if (hasInventory)
        {
          setInventoryPage("");
          isPageActive = true;
        }

        console.log(isPageActive);
        if (!isPageActive) {
          pauseMenu.style.display = (pauseMenu.style.display === "flex") ? "none" : "flex";
          sessionStorage.setItem("pauseMenuLocked", "true");
        }
      }
    }

    const keyupEvent = (e) => {
      if (e.key === "Escape")
      {
          sessionStorage.setItem("pauseMenuLocked", "false");
      }
    }


    document.body.removeEventListener('keyup', keyupEvent);
    document.body.removeEventListener('keydown', keydownEvent);

    sessionStorage.setItem("attachedPauseHandlers", "false");

    document.body.addEventListener('keydown', keydownEvent);
    document.body.addEventListener('keyup', keyupEvent);

    sessionStorage.setItem("attachedPauseHandlers", "true");
  });

  return (
    <div id='pause-menu' style={{display: 'none'}}>
        <h1 id="title-text1" data-text="Learn" className="glitch">
            Learn
        </h1>
        <h1 id="title-text2" data-text="The" className="glitch">
            The
        </h1>
        <h1 id="title-text3" data-text="Basics" className="glitch">
            Basics
        </h1>
        <button className='pause-button' onClick={() => {

        }}>Options</button>
        <button className='pause-button' onClick={(e) => {
          let sendSave = saves.activeSaveFile;
          sendSave.time += Math.round((Date.now() - parseInt(localStorage.getItem("currTime"))) / 1000);
          if (localStorage.getItem("activeHardwareItems") !== null)
          {
            const {cpuId, gpuId, ramId, stgId} = JSON.parse(localStorage.getItem("activeHardwareItems"));
            sendSave = {...sendSave, cpuId, gpuId, ramId, stgId};
          }
          updateSave(user.currUser, sendSave).then((res) => {
            e.target.parentElement.style.display = "none";
            localStorage.setItem("currTime", Date.now().toString());
          });
        }}>Quicksave</button>
        <button className='pause-button' onClick={() => {
          let sendSave = saves.activeSaveFile;
          sendSave.time += Math.round((Date.now() - parseInt(localStorage.getItem("currTime"))) / 1000);
          if (localStorage.getItem("activeHardwareItems") !== null)
          {
            const {cpuId, gpuId, ramId, stgId} = JSON.parse(localStorage.getItem("activeHardwareItems"));
            sendSave = {...sendSave, cpuId, gpuId, ramId, stgId};
          }
          updateSave(user.currUser, sendSave).then((res) => {
            window.location.href = "../../";
          });
        }}>Save and Quit</button>
    </div>
  )
}
