const h1 = document.getElementById("title");
const container = document.getElementsByClassName("container")[0];
const closeBtn = document.getElementsByClassName("closeBtn")[0];
const taskbar = document.getElementsByClassName("taskbar")[0];
const desktop = document.getElementsByClassName("desktop")[0];
const login = document.getElementsByClassName("login-container")[0];
const adminPage = document.getElementsByClassName("admin-container")[0];
const addData = document.getElementsByClassName("add-data")[0];
const editData = document.getElementsByClassName("edit-data")[0];
const listData = document.getElementsByClassName("list-data")[0];
const deleteData = document.getElementsByClassName("delete-data")[0];
const adminNav1 = document.getElementsByClassName("admin-nav")[0];
const adminNav2 = document.getElementsByClassName("admin-nav")[1];
const adminNav3 = document.getElementsByClassName("admin-nav")[2];
const adminNav4 = document.getElementsByClassName("admin-nav")[3];
const tableTitles = document.getElementById("tableTitles");
var on = 1;
var off = 0;


function regex(text) {
  /* /^[a-zA-Z0-9áéóőúűöüßäÁÉÓŐÖÜÚŰÄ_.!]*$/g */

  var acceptableChars = new RegExp('^[a-zA-Z0-9áéóőúűöüßäÁÉÓŐÖÜÚŰÄ_.!]*$', 'g');

  return acceptableChars.test(text)

}

function checkBox(cb) {
  if (cb == true) {
    return 1;
  } else {
    return 0;
  }
}

function isDecimal(number) {
  return (number % 1);
}

function zoom() {
  container.style.display = "block";
  closeBtn.style.display = "block";
  taskbar.style.display = "flex";
  desktop.style.display = "flex";
  h1.style.display = "none";
}

function closeAdmin() {
  container.style.display = "none";
  closeBtn.style.display = "none";
  taskbar.style.display = "none";
  desktop.style.display = "none";
  h1.style.display = "block";
}

function loginPressed() {
  /*let usernameLogin = document.getElementById('username').value;
    let passwordLogin = document.getElementById('password').value;
    fetch(
        root + "checkData"
    ,{
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({username: usernameLogin}),
}).then(function (response) {
    return response.json();
}).then(function (pwd) {
    if(pwd[0].password == passwordLogin){
        console.log("SIKERES BEJELENTKEZÉS")
    }

})*/

  login.style.display = "none";
  adminPage.style.display = "block";
}

function loadOptions() {
  var loadSelect = document.getElementsByClassName("tableSelect");
  fetch("http://127.0.0.1:8000/admin/getTableNames", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    }).then(function (tables) {
      for (let index = 0; index < tables.length; index++) {
        for (let i = 0; i < loadSelect.length; i++) {
          loadSelect[i].add(new Option(tables[index].table_name));
        }
      }
    });
}

function logOut() {
  login.style.display = "block";
  adminPage.style.display = "none";
}

function openPage(pageName) {
  addData.style.display = "none";
  editData.style.display = "none";
  listData.style.display = "none";
  deleteData.style.display = "none";

  switch (pageName) {
    case "add":
      addData.style.display = "block";
      adminNav1.classList.add('adminActive');
      adminNav2.classList.remove('adminActive');
      adminNav3.classList.remove('adminActive');
      adminNav4.classList.remove('adminActive');
      break;
    case "edit":
      editData.style.display = "block";
      adminNav1.classList.remove('adminActive');
      adminNav2.classList.add('adminActive');
      adminNav3.classList.remove('adminActive');
      adminNav4.classList.remove('adminActive');
      break;
    case "delete":
      deleteData.style.display = "block";
      adminNav1.classList.remove('adminActive');
      adminNav2.classList.remove('adminActive');
      adminNav3.classList.add('adminActive');
      adminNav4.classList.remove('adminActive');
      break;
    case "list":
      listData.style.display = "block";
      adminNav1.classList.remove('adminActive');
      adminNav2.classList.remove('adminActive');
      adminNav3.classList.remove('adminActive');
      adminNav4.classList.add('adminActive');
      break;
  }
}

function addDataOption(selectedTable) {

  if (selectedTable.includes("save")) {
    alert("You can't add data to this table");
    document.getElementsByClassName("tableSelect")[0].value = 'base';
    tableTitles.innerHTML = '';
  } else {

    const columnNames = [];

    tableTitles.innerHTML = '';

    fetch(
      "http://127.0.0.1:8000/admin/getFields"
      , {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ table: selectedTable }),
      }).then(function (response) {
        return response.json();
      }).then(function (table) {
        for (let i = 1; i < table.length; i++) {
          let li = document.createElement('li');
          let input = document.createElement('input');
          li.className = "insertDatas-list";
          input.className = "insertDatas-input";
          columnNames[i] = table[i].column_name;
          li.innerText = columnNames[i];
          tableTitles.appendChild(li);
          li.appendChild(input);
          if (table[i].COLUMN_TYPE.includes("int")) {
            input.type = 'number';
            if (table[i].COLUMN_TYPE.includes("(1)")) {
              input.type = 'checkbox'
            }
          } else if (table[i].COLUMN_TYPE.includes("varchar")) {
            input.type = 'text';
          }
        }
      });
  }
}

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('clock').innerHTML = h + ":" + m;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
  return i;

}

function insertDataFetch(allInputs) {
  fetch(
    "http://127.0.0.1:8000/admin/insertIntoTables"
    , {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ list: allInputs }),
    }).then(function (response) {
      return response.json();
    })
}

function insertData() {
  var allInputs = new Map();
  var tableName = document.getElementsByClassName('tableSelect')[0].value;

  allInputs.set("title", tableName);

  var insertList = document.getElementsByClassName('insertDatas-list');
  var insertInput = document.getElementsByClassName("insertDatas-input");
  let arrayLength = tableTitles.childElementCount;

  for (let x = 0; x < arrayLength; x++) {
    if (!regex(insertInput[x].value)) {
      alert('Only letters, numbers and "_ . !" symbols!!!');
      allInputs = '';
      break;
    } else {
      allInputs.set(insertList[x].innerText, insertInput[x].value);

      if (insertInput[x].type === 'checkbox') {
        if (insertInput[x].checked == true) {
          allInputs.set(insertList[x].innerText, checkBox(insertInput[x].value))
        } else {
          allInputs.set(insertList[x].innerText, checkBox(insertInput[x].value))
        }
      }
    }
  }
  console.log(allInputs);
}

