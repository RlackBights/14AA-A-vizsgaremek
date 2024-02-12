import React from 'react'
import logoText from '../LearnTheBasics.svg'

export function AdminPage() {
  return (
    <div id='admin-container'>
      <div className="navbar">
            <img className="logo" src={logoText}></img>
            <ul className="navbar-items">
                 <li>
                    <button className="btn">Download</button>
                </li>
            </ul>
        </div>

    </div>
  )
}
