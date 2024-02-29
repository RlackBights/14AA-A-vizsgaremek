import React, { useContext } from 'react'
import { updateSave } from './requests'
import { userContext } from '../App';
import { saveContext } from '../App';

export default function PauseMenu() {
  const user = useContext(userContext);
  const saves = useContext(saveContext);

  document.body.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        const pauseMenu = document.getElementById('pause-menu');
        pauseMenu.style.display = (pauseMenu.style.display === "flex") ? "none" : "flex";
      }
    })

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
          sendSave.lb = JSON.stringify(sendSave.lb);
          sendSave.time += Math.round((Date.now() - parseInt(localStorage.getItem("currTime"))) / 1000);
          updateSave(user.currUser, sendSave).then((res) => {
            window.location.href = "../../";
          });
        }}>Save and Quit</button>
    </div>
  )
}
