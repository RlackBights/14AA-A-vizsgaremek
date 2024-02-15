import React, { useContext, useState } from 'react'
import logoText from '../LearnTheBasics.svg'
import { backend, userContext } from '../App';

export function AdminPage() {
  let tableData = [];
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
        console.log(res);
        tableData = res.data;
        let tableNames = [];
        res.data.map((tableInfo) => {
          if (tableNames.includes(tableInfo.TABLE_NAME)) return null;
          tableNames.push(tableInfo.TABLE_NAME);
          const tableOption = document.createElement("option");
          tableOption.innerHTML = tableInfo.TABLE_NAME;
          tableSelect.appendChild(tableOption);
          return null;
        });
      })
    }}>
      <div className="navbar">
        <img className="logo" src={logoText} alt=''></img>
        <ul className="navbar-items">
          <li>
            <button id={activePage === "insert" ? "activated" : ""} className="navbar-links" onClick={() => {
              setActivePage("insert")
            }}>Insert</button>
          </li>
          <li>
            <button id={activePage === "update" ? "activated" : ""} className="navbar-links" onClick={() => {
              setActivePage("update")
            }}>Update</button>
          </li>
          <li>
            <button id={activePage === "delete" ? "activated" : ""} className="navbar-links" onClick={() => {
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
          <li id='constant-filter'>
            <p>Table:</p>
            <select id='table-select' onChange={async (e) => {

              const adminFilters = document.getElementById('admin-filters');
              const adminTable = document.getElementById("admin-table");

              while (adminFilters.childNodes.length > 1) {
                adminFilters.removeChild(adminFilters.lastChild);
              }

              while (adminTable.firstChild.firstChild.childNodes.length > 0) {
                adminTable.firstChild.firstChild.removeChild(adminTable.firstChild.firstChild.lastChild);
              }

              while (adminTable.lastChild.childNodes.length > 0) {
                adminTable.lastChild.removeChild(adminTable.lastChild.lastChild);
              }

              if (e.target.value === "Select a table") return;

              tableData.filter((tableInfo) => tableInfo.TABLE_NAME === e.target.value).map((tableInfo) => {
                const input = document.createElement('input');
                const additionalInfo = document.createElement('p');
                const label = document.createElement('label');
                additionalInfo.innerHTML = tableInfo.COLUMN_NAME + ":";
                const li = document.createElement('li');
                let inputType;
                switch (tableInfo.COLUMN_TYPE) {
                  case "tinyint(1)":
                    label.className="switch";
                    const span = document.createElement('span');
                    span.className = "slider round";
                    label.appendChild(input);
                    label.appendChild(span);
                    inputType = "checkbox";
                    break;
                  default:
                    if (tableInfo.COLUMN_TYPE.includes("int")) {
                      console.log("number");
                      inputType = "number";
                    } else
                    {
                      console.log("text");
                      inputType = "text";
                    }
                    break;
                }
                input.setAttribute("type", inputType);
                if (tableInfo.COLUMN_NAME === "id" || tableInfo.COLUMN_NAME.toLowerCase() === "lastmodified" || (tableInfo.TABLE_NAME === "userTbl" && tableInfo.COLUMN_NAME.toLowerCase() === "uid") || tableInfo.COLUMN_NAME.toLowerCase() === "passwordresettoken") input.disabled = true;
                li.appendChild(additionalInfo);
                if (inputType === "checkbox") {
                  li.appendChild(label);
                } else {
                  li.appendChild(input);
                }
                li.className = "generated-data";
                adminFilters.appendChild(li);

                return null;
              });

              

              let fetchParams = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  tableName: e.target.value
                }),
              };
              
              fetch(backend + "/admin/getTableRows", fetchParams).then((res) => res.json()).then((res) => res.data).then((tableContent) => {

                const tableKeys = Object.keys(tableContent[0])

                tableKeys.forEach(colName => {
                  const headTitle = document.createElement('td');
                  headTitle.innerHTML = colName;
                  adminTable.firstChild.firstChild.appendChild(headTitle);
                })

                tableContent.forEach(row => {
                  const tableRow = document.createElement('tr');
                  let rowValue = "";
                  let indexer = 0;
                  Object.values(row).forEach((value) => {
                    const tableVal = document.createElement('td');
                    tableVal.innerHTML = value;
                    rowValue += `${tableKeys[indexer]} - ${value}\n`;
                    indexer++;
                    tableRow.appendChild(tableVal);
                  });
                  tableRow.onclick = () => alert(rowValue);
                  adminTable.lastChild.appendChild(tableRow);
                });
              });

            }}>
              <option>Select a table</option>
            </select>
          </li>
        </ul>
        <table id='admin-table'>
          <thead>
            <tr>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <button id='admin-confirm-button'>{activePage}</button>
      </div>
    </div>
  )
}
