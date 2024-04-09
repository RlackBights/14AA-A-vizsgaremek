import React, { useContext } from 'react'
import { optionsContext, overlayContext, soundContext } from '../App'
import { pauseOptionsContext } from './pauseMenu';

export default function OptionsPage() {
  const overlay = useContext((window.location.href.includes("game")) ? pauseOptionsContext : overlayContext);
  const options = useContext(optionsContext);
  const play = useContext(soundContext).uiClick;

  return (
    <div id='options-container' style={{display: overlay.currOverlay === 'optionsPage' ? 'flex' : 'none'}}>
      <h1>Options</h1>
      <div id='options'>
        <ul>
          <li>
            <p>Special Effects:</p>
            <label className="switch">
              <input id='special-effects-cbx' type="checkbox" checked={JSON.parse(localStorage.getItem("gameOptions")).specialEffects} onChange={(e) => {
                options.setOptionValues(currOptions => ({...currOptions, specialEffects: e.target.checked}));
                let opt = JSON.parse(localStorage.getItem("gameOptions"));
                opt.specialEffects = e.target.checked;
                localStorage.setItem("gameOptions", JSON.stringify(opt));
              }}/>
              <span className="slider round"></span>
              
            </label>
          </li>
          <br/>
          <li>
            <p>Music volume:</p>
            <input className='volume-slider' type='range' min={0} max={100} defaultValue={options.optionValues.volume[1] * 100} onChange={(e) => {
              options.setOptionValues(currOptions => ({...currOptions, volume: [currOptions.volume[0], e.target.value / 100]}));
              const opt = JSON.parse(localStorage.getItem("gameOptions"));
              localStorage.setItem("gameOptions", JSON.stringify({...opt, volume: [opt.volume[0], e.target.value / 100]}));
            }} />
          </li>
          <li>
            <p>Sound effects:</p>
            <input className='volume-slider' type='range' min={0} max={100} defaultValue={options.optionValues.volume[0] * 100} onChange={(e) => {
              options.setOptionValues(currOptions => ({...currOptions, volume: [e.target.value / 100, currOptions.volume[1]]}));
              const opt = JSON.parse(localStorage.getItem("gameOptions"));
              localStorage.setItem("gameOptions", JSON.stringify({...opt, volume: [e.target.value / 100, opt.volume[1]]}));
            }} />
          </li>
        </ul>
        
      </div>
      <button id='options-back-btn' onClick={() => {
        play();
        overlay.setCurrOverlay("");
      }}>Back</button>
    </div>
  )
}
