import React, { useState } from 'react'
import logoText from '../LearnTheBasics.svg'

export function AdminPage() {
  const [activePage, setActivePage] = useState("insert");

  return (
    <div id='admin-container'>
      <div className="navbar">
        <img className="logo" src={logoText}></img>
        <ul className="navbar-items">
          <li>
            <button id={activePage == "insert" ? "activated" : ""} className="navbar-links" onClick={() => {
              setActivePage("insert")
            }}>Insert</button>
          </li>
          <li>
            <button id={activePage == "update" ? "activated" : ""} className="navbar-links" onClick={() => {
              setActivePage("update")
            }}>Update</button>
          </li>
          <li>
            <button id={activePage == "delete" ? "activated" : ""} className="navbar-links" onClick={() => {
              setActivePage("delete")
            }}>Delete</button>
          </li>
          <li>
            <button className="btn" onClick={() => {
              window.location.href = "../";
            }}>Back</button>
          </li>
        </ul>
      </div>
      <div id='admin-content'>
        <ul id='admin-filters'>
          <li>
            <p>Table:</p>
            <select id='table-select'>
              <option>Select a table</option>
            </select>
          </li>
        </ul>
        <div id='admin-table'>

        </div>
        <button id='admin-confirm-button'>{activePage}</button>
      </div>
    </div>
  )
}
