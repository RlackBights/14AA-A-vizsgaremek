const h1 = document.getElementById('title');
const container = document.getElementsByClassName('container')[0];
const closeBtn = document.getElementsByClassName('closeBtn')[0];
const taskbar = document.getElementsByClassName('taskbar')[0];
const desktop = document.getElementsByClassName('desktop')[0];

function zoom() {
    container.style.display = 'block';
    closeBtn.style.display = 'block';
    taskbar.style.display = 'block';
    desktop.style.display = 'flex';
    h1.style.display = 'none';
}

function closeAdmin() {
    container.style.display = 'none';
    closeBtn.style.display = 'none';
    taskbar.style.display = 'none';
    desktop.style.display = 'none';
    h1.style.display = 'block';
}

function loginPressed() {
    let usernameLogin = document.getElementById('username').value;
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

})
}


