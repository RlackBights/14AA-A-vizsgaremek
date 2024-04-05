import React, { useContext, useEffect } from 'react'
import { updateSave } from './requests'
import { userContext } from '../App';
import { saveContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { soundContext } from '../App';

sessionStorage.setItem("attachedPauseHandlers", "false");

export default function PauseMenu(params) {
  const user = useContext(userContext);
  const saves = useContext(saveContext);
  const navigate = useNavigate();
  const play = useContext(soundContext).uiClick;

  useEffect(() => {

    if (sessionStorage.getItem("attachedPauseHandlers") === "true") return;


    const keydownEvent = (e) => {
      const pauseMenu = document.getElementById('pause-menu');
      if (pauseMenu && e.key === "Escape" && sessionStorage.getItem("pauseMenuLocked") === "false")
      {
        pauseMenu.style.display = (pauseMenu.style.display === "flex") ? "none" : "flex";
        sessionStorage.setItem("pauseMenuLocked", "true");
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
          play();
          // TODO
        }}>Options</button>
        <button className='pause-button' onClick={(e) => {
          play();
          let sendSave = saves.activeSaveFile;
          sendSave.time += Math.round((Date.now() - parseInt(localStorage.getItem("currTime"))) / 1000);
          if (localStorage.getItem("activeHardwareItems") !== null)
          {
            const {cpuId, gpuId, ramId, stgId} = JSON.parse(localStorage.getItem("activeHardwareItems"));
            sendSave = {...sendSave, cpuId, gpuId, ramId, stgId};
          }
          updateSave(user.currUser, sendSave, saves.stats).then((res) => {
            e.target.parentElement.style.display = "none";
            localStorage.setItem("currTime", Date.now().toString());
          });
        }}>Quicksave</button>
        <button className='pause-button' onClick={() => {
          play();
          let sendSave = saves.activeSaveFile;
          sendSave.time += Math.round((Date.now() - parseInt(localStorage.getItem("currTime"))) / 1000);
          if (localStorage.getItem("activeHardwareItems") !== null)
          {
            const {cpuId, gpuId, ramId, stgId} = JSON.parse(localStorage.getItem("activeHardwareItems"));
            sendSave = {...sendSave, cpuId, gpuId, ramId, stgId};
          }
          updateSave(user.currUser, sendSave, saves.stats).then((res) => {
            navigate("/");
          });
        }}>Save and Quit</button>
    </div>
  )
}
