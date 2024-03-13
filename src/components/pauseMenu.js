import React, { useContext, useEffect } from 'react'
import { updateSave } from './requests'
import { userContext } from '../App';
import { saveContext } from '../App';
import { windowContext } from './desktop';
import { useNavigate } from 'react-router-dom';

sessionStorage.setItem("attachedPauseHandlers", "false");

export default function PauseMenu(params) {
  const user = useContext(userContext);
  const saves = useContext(saveContext);
  const setWindow = useContext(windowContext);
  const navigate = useNavigate();

  useEffect(() => {

    if (sessionStorage.getItem("attachedPauseHandlers") === "true") return;


    const keydownEvent = (e) => {
      const pauseMenu = document.getElementById('pause-menu');
      if (e.key === "Escape" && sessionStorage.getItem("pauseMenuLocked") === "false")
      {
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
          params.setters.setInventoryPage("");
          isPageActive = true;
        }

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
            console.log(saves.activeSaveFile);
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
            navigate("/");
          });
        }}>Save and Quit</button>
    </div>
  )
}
