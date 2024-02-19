import React, { useContext } from 'react'
import { optionsContext, overlayContext } from '../App'

export default function OptionsPage() {
  const overlay = useContext(overlayContext);
  const options = useContext(optionsContext);

  return (
    <div id='options-container' style={{display: overlay.currOverlay === 'optionsPage' ? 'flex' : 'none'}}>
      <h1>Options</h1>
      <div id='options'>
        <ul>
          <li>
            <p>Special Effects:</p>
            <label className="switch">
              <input id='special-effects-cbx' type="checkbox" checked={JSON.parse(localStorage.getItem("gameOptions")).specialEffects} onChange={(e) => {
                options.setOptionValues({specialEffects: e.target.checked});
                const opt = JSON.parse(localStorage.getItem("gameOptions"));
                console.log(opt);
                opt.specialEffects = e.target.checked;
                localStorage.setItem("gameOptions", JSON.stringify(opt));
              }}/>
              <span className="slider round"></span>
              
            </label>
          </li>
          <li></li>
          <li></li>
        </ul>
        
      </div>
      <button id='options-back-btn' onClick={() => {
        overlay.setCurrOverlay("");
      }}>Back</button>
    </div>
  )
}
