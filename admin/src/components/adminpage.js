import React, { useContext, useEffect, useState } from 'react'
import { backend, userContext } from '../App';

let inputFields = [];
let tableData = [];

export function AdminPage() {
  const [activePage, setActivePage] = useState("insert");
  const user = useContext(userContext);

  function updateFilterFields() {
    const adminFilters = document.getElementById('admin-filters');
    
    if (activePage === "delete") {
      adminFilters.childNodes.forEach((node) => {
        if (node.id === "constant-filter") return;
        const nodeContent = node.firstChild.innerHTML.replace(':', '');
        const tableSelect = document.getElementById("table-select").selectedOptions[0].innerHTML.toLowerCase();
        node.lastChild.disabled = false;
        if (node.lastChild.className === "switch") node.lastChild.firstChild.disabled = false;
        if ((tableSelect === "usertbl" && nodeContent.toLowerCase() !== "uid") || (nodeContent.toLowerCase() !== "uid" && nodeContent !== "id" && nodeContent.toLowerCase() !== "hardwareid")) node.lastChild.disabled = true;
        if (node.lastChild.className === "switch") node.lastChild.firstChild.disabled = true;
      })
    } else {
      adminFilters.childNodes.forEach((node) => {
        if (node.id === "constant-filter") return;
        const nodeContent = node.firstChild.innerHTML.replace(':', '');
        const tableSelect = document.getElementById("table-select").selectedOptions[0].innerHTML.toLowerCase();
        node.lastChild.disabled = false;
        if (node.lastChild.className === "switch") node.lastChild.firstChild.disabled = false;
        if (nodeContent === "id" || nodeContent.toLowerCase() === "lastmodified" || nodeContent.toLowerCase() === "uid" || nodeContent.toLowerCase() === "passwordresettoken" || nodeContent.toLowerCase() === "hardwareid") node.lastChild.disabled = true;
      })
    }
  }
  
function insertFetch() {
  let firstIndexOfTable = tableData.findIndex(x => x.TABLE_NAME === document.getElementById("table-select").value);
  let tableName = document.getElementById("table-select").value
  const obj = new Object();
  let columnName;
  for (let i = 0; i < inputFields.length; i++) {
    columnName = tableData[firstIndexOfTable + i].COLUMN_NAME;
    if(columnName === "id" || columnName === "hardwareId" || columnName === "lastModified" || columnName === "uid"){
      obj[tableData[firstIndexOfTable + i].COLUMN_NAME] = 0;
    }else{
      obj[tableData[firstIndexOfTable + i].COLUMN_NAME] = inputFields[i].value;
    }
  }

  console.log(obj)

  let fetchParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tableName: tableName,
      data: [
        obj
      ]
  }),
  };

  fetch (backend + "/admin/insertRows", fetchParams).then(
    function (response) {
      switch (response.status) {
        case 200:
          window.location.reload()
          break;
      
        default:
          break;
      }
    }
  )
}

function updateFetch() {
  let firstIndexOfTable = tableData.findIndex(x => x.TABLE_NAME === document.getElementById("table-select").value);
  let tableName = document.getElementById("table-select").value
  const object = new Object();
  for (let i = 0; i < inputFields.length; i++) {
    if (tableData[firstIndexOfTable + i].COLUMN_NAME.toLowerCase() === "lastmodified") continue;
    object[tableData[firstIndexOfTable + i].COLUMN_NAME] = inputFields[i].value;
  }

  console.log(object)
  
  let fetchParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tableName: tableName,
      data: [
        object
      ]
  }),
  };

  fetch (backend + "/admin/updateRows", fetchParams).then(
    function (response) {
      switch (response.status) {
        case 200:
            window.location.reload()
          break;
      
        default:
          break;
      }
    }
  )
}

function deleteFetch() {
  let firstIndexOfTable = tableData.findIndex(x => x.TABLE_NAME === document.getElementById("table-select").value);
  let tableName = document.getElementById("table-select").value
  const object = new Object();
  for (let i = 0; i < inputFields.length; i++) {
    object[tableData[firstIndexOfTable + i].COLUMN_NAME] = inputFields[i].value;
  }
  let fetchParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tableName: tableName,
      fieldName: tableData[firstIndexOfTable].COLUMN_NAME,
      fieldValue: inputFields[0].value
  }),
  };

  fetch (backend + "/admin/deleteRows", fetchParams).then(
    function (response) {
      switch (response.status) {
        case 200:
            window.location.reload()
          break;
      
        default:
          break;
      }
    }
  )
}

  function fetchMode() {
    switch (activePage) {
      case "update":
        updateFetch();
        break;
      case "delete":
        deleteFetch();
        break;
      default:
        insertFetch();
        break;
    }
  }

  useEffect(() => {
    const tableSelect = document.getElementById("table-select");
    let currTable = tableSelect.selectedIndex;

    while (tableSelect.childNodes.length > 1)
    {
      tableSelect.removeChild(tableSelect.lastChild);
    }

    tableSelect.dispatchEvent(new Event("onChange"));

    let fetchParams = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };

    fetch(backend + "/admin/getTableNames", fetchParams).then((res) => res.json()).then((res) => {
      tableData = res.data;
      let tableNames = [];
      tableData.map((tableInfo) => {
        if (tableNames.includes(tableInfo.TABLE_NAME))
        {
          return null
        } else {
          tableNames.push(tableInfo.TABLE_NAME);
          const tableOption = document.createElement("option");
          tableOption.innerHTML = tableInfo.TABLE_NAME;
          tableSelect.appendChild(tableOption);
          return null;
        }
        
      });
      tableSelect.selectedIndex = currTable;
    });
    updateFilterFields();

  }, [activePage])

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
        if (res.data[0].isAdmin === false) window.location.href = "../learnthebasics";
      })

    }}>
      <div className="navbar">
        <img className="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt=''></img>
        <ul className="navbar-items">
          <li>
            <button id={activePage === "insert" ? "activated" : ""} className="navbar-links" onClick={() => {
              setActivePage("insert");
            }}>Insert</button>
          </li>
          <li>
            <button id={activePage === "update" ? "activated" : ""} className="navbar-links" onClick={() => {
              setActivePage("update");
            }}>Update</button>
          </li>
          <li>
            <button id={activePage === "delete" ? "activated" : ""} className="navbar-links" onClick={() => {
              setActivePage("delete");
            }}>Delete</button>
          </li>
          <li>
            <button className="btn" onClick={() => {
              window.location.href = "../learnthebasics";
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
              inputFields = [];

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
                      inputType = "number";
                    } else
                    {
                      inputType = "text";
                    }
                    break;
                }

                input.setAttribute("type", inputType);
                li.appendChild(additionalInfo);
                if (inputType === "checkbox") { 
                  li.appendChild(label);
                } else {
                  li.appendChild(input);
                }
                li.className = "generated-data";
                adminFilters.appendChild(li);
                inputFields.push(input);

                updateFilterFields();
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
                  Object.values(row).forEach((value) => {
                    const tableVal = document.createElement('td');
                    tableVal.innerHTML = value;
                    tableRow.appendChild(tableVal);
                  });

                  tableRow.onclick = (e) => {
                    let temp = "";
                    for (let i = 0; i < e.target.parentElement.childNodes.length; i++) {

                      temp += `\"${inputFields[i].parentElement.firstChild.innerHTML.replace(":", "\":")}${e.target.parentElement.childNodes[i].innerHTML}\n`;

                      if (inputFields[i].type === "checkbox") {
                        inputFields[i].checked = e.target.parentElement.childNodes[i].innerHTML === "true";
                      } else {
                        inputFields[i].value = e.target.parentElement.childNodes[i].innerHTML;
                      }
                      
                    }
                   // alert(temp);
                  }

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
        <button id='admin-confirm-button' onClick={fetchMode}>{activePage}</button>
      </div>
    </div>
  )
}


//TODO
// isAdmin on/off problem and set to true false