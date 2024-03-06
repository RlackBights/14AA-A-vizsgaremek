import React, { useContext, useEffect } from 'react'
import { updateSave } from './requests'
import { userContext } from '../App';
import { saveContext } from '../App';
import { windowContext } from './desktop';
import { inventoryContext } from './pcBuild';

export default function PauseMenu() {
  const user = useContext(userContext);
  const saves = useContext(saveContext);
  const setWindow = useContext(windowContext);
  const setInventoryPage = useContext(inventoryContext);

  useEffect(() => {
    const keydownEvent = (e) => {
      if (e.key === "Escape") {
        let isPageActive = false;
        let hasWindows = document.getElementById('windows') !== null;
        if (hasWindows) {
          document.getElementById('windows').childNodes.forEach(child => {
            if (child.className !== "pages") return;
            if (child.style.display === "none") return;
            isPageActive = true;
          });
        }

        let hasInventory = (document.getElementById('inventory-contents') !== null && document.getElementById('inventory-contents').style.display === "flex");
        if (hasInventory)
        {
          setInventoryPage("");
          isPageActive = true;
        }

        const pauseMenu = document.getElementById('pause-menu');
        if (pauseMenu.getAttribute("locked") === "true") return;
        if (hasWindows) {
          setWindow("");
        }
        if (isPageActive) return;
        pauseMenu.style.display = (pauseMenu.style.display === "flex") ? "none" : "flex";
        pauseMenu.setAttribute("locked", "true");
      }
      };

    const keyupEvent = (e) => {
      if (e.key === "Escape") {
          const pauseMenu = document.getElementById('pause-menu');
          pauseMenu.setAttribute("locked", "false");
        }
      };

    document.body.removeEventListener('keyup', keyupEvent);
    document.body.removeEventListener('keydown', keydownEvent);

    document.body.addEventListener('keydown', keydownEvent);
    document.body.addEventListener('keyup', keyupEvent);
  }, [])

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
        <button className='pause-button' onClick={() => {
          const sendSave = saves.activeSaveFile;
          sendSave.time += Math.round((Date.now() - parseInt(localStorage.getItem("currTime"))) / 1000);
          console.log(sendSave);
          updateSave(user.currUser, sendSave).then((res) => {
            window.location.href = "../../";
          });
        }}>Save and Quit</button>
    </div>
  )
}
