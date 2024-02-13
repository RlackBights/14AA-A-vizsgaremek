import React, { useContext, useState } from 'react'
import logoText from '../LearnTheBasics.svg'
import { backend, userContext } from '../App';

export function AdminPage() {
  const [activePage, setActivePage] = useState("insert");
  const user = useContext(userContext);

  return (
    <div id='admin-container' onLoad={() => {

      let fetchParams = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authCode: user.authToken
        }),
      };
    
      fetch(backend + "/admin/isAdmin", fetchParams).then((res) => res.json()).then((res) => {
        console.log(res);
        if (res.data[0].isAdmin === false) window.location.href = "../";
      })

      const tableSelect = document.getElementById("table-select");

      fetchParams = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      };
    
      fetch(backend + "/admin/getTableNames", fetchParams).then((res) => res.json()).then((res) => {
        res.data.map((obj) => {
          const x = document.createElement("option")
          x.innerHTML = obj.TABLE_NAME;
          tableSelect.appendChild(x);
        });
      })
    }}>
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
            <select id='table-select' onChange={(e) => {
              console.log(e.target.value);
            }}>
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
