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

function zoom() {
  container.style.display = "block";
  closeBtn.style.display = "block";
  taskbar.style.display = "block";
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
        "http://127.0.0.1:8000/admin/checkData"
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

function logOut() {
  login.style.display = "block";
  adminPage.style.display = "none";
}

function openPage(pageName) {
  addData.style.display = "none";
  editData.style.display = "none";
  listData.style.display = "none";

  switch (pageName) {
    case "add":
      addData.style.display = "block";
      break;
    case "edit":
      editData.style.display = "block";
      break;
    case "list":
      listData.style.display = "block";
      break;
  }
}

function selectOptionChanged() {
  fetch("http://127.0.0.1:8000/admin/getFields", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        for (let index = 0; index < data.length; index++) {
            console.log(data[index].COLUMN_NAME)
        }
      });
}

function loadSelect(){
    var select = document.getElementById("add-dataSelect");
    var option = document.createElement("option");
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }
}
