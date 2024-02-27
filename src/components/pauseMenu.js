import React from 'react'

export default function PauseMenu() {
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
        <button className='pause-button'>Options</button>
        <button className='pause-button'>Save and Quit</button>
    </div>
  )
}
