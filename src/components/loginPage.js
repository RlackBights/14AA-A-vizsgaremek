import React, { useEffect, useState } from "react";
import "../App.css";
import { Icon } from "@iconify/react";
import { CookiesProvider, useCookies } from "react-cookie";
import exitImage from '../assets/delete-button.png'

export function LoginPage() {
    const [key, setKey] = useState(0);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    return (
        <div id="login-container" style={{ pointerEvents: 'none' }}>
            <button id="user-icon" onClick={() => {
                const loginPage = document.getElementById('login-page');
                const registerPage = document.getElementById('register-page');
                const container = document.getElementById('login-container');
                if (loginPage.style.display == 'none' && registerPage.style.display == 'none') {
                    loginPage.style.display = 'flex';
                    container.style.pointerEvents = 'all';
                } else {
                    loginPage.style.display = 'none';
                    registerPage.style.display = 'none';
                    container.style.pointerEvents = 'none';
                }
                setKey((key) => key + 1);
            }}>
                <Icon icon="uil:user" />
                <p>{(cookies.user != null) ? cookies.user.split('$')[0] : "[Log in to play]"}</p>
            </button>


            <p id="error-message">ERROR PLACEHOLDER</p>
            <div id="login-page" style={{ display: 'none' }}>
                <div id="form-container">
                    <img className="close-image" onClick={() => {
                        const loginPage = document.getElementById('login-page');
                        const registerPage = document.getElementById('register-page');
                        const container = document.getElementById('login-container');
                        loginPage.style.display = 'none';
                        registerPage.style.display = 'none';
                        container.style.pointerEvents = 'none';
                        setKey((key) => key + 1);
                    }} src={exitImage}></img>
                    <h1>Login</h1>
                    <p>Username</p>
                    <input type="text" id="name-input" ></input>
                    <p>Password</p>
                    <input type="password" id="password-input" ></input>
                    <div id="button-container">

                        <button className="form-btn" id="" onClick={() => {

                            const usernameInput = document.getElementById('name-input');
                            const passwordInput = document.getElementById('password-input');
                            const errorMessage = document.getElementById('error-message');
                            const regex = /\W/;

                            if (passwordInput.value == '' || usernameInput.value == '') {
                                errorMessage.innerHTML = "One or more required fields are missing!";
                                errorMessage.className = "show-error"
                                setTimeout(() => {
                                    errorMessage.className = "";
                                }, 4000)
                                return;
                            }

                            if (regex.test(usernameInput.value) || regex.test(passwordInput.value)) {
                                errorMessage.innerHTML = "One or more fields contain unallowed characters!";
                                errorMessage.className = "show-error"
                                setTimeout(() => {
                                    errorMessage.className = "";
                                }, 4000)
                                return;
                            }

                            const fetchParams = {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    username: usernameInput.value,
                                    password: passwordInput.value
                                }),
                            }
                            fetch('http://127.0.0.1:8000/login', fetchParams).then(function (response) {

                                if (response.status == 200) {
                                    response.json().then((json) => { setCookie("user", json.loginAuthCode) });
                                    const page = document.getElementById('login-page');
                                    const container = document.getElementById('login-container');
                                    page.style.display = 'none';
                                    container.style.pointerEvents = 'none';
                                    usernameInput.value = "";
                                    passwordInput.value = "";
                                    window.location.reload();
                                } else {
                                    errorMessage.innerHTML = "Wrong username/password!";
                                    errorMessage.className = "show-error"
                                    setTimeout(() => {
                                        errorMessage.className = "";
                                    }, 4000)
                                }

                            })
                        }}>Login</button>


                        <p><br />Don't have an account? <a id="register-btn" onClick={() => {
                            const loginPage = document.getElementById('login-page');
                            const registerPage = document.getElementById('register-page');

                            loginPage.style.display = 'none';
                            registerPage.style.display = 'flex';
                            setKey((key) => key + 1);

                        }}>
                            Register here!</a></p>

                    </div>
                </div>
            </div>
            <div id="register-page" style={{ display: 'none' }}>
                <div id="form-container">
                    <img className="close-image" onClick={() => {
                        const loginPage = document.getElementById('login-page');
                        const registerPage = document.getElementById('register-page');
                        const container = document.getElementById('login-container');
                        loginPage.style.display = 'none';
                        registerPage.style.display = 'none';
                        container.style.pointerEvents = 'none';
                    }} src={exitImage}></img>
                    <h1>Register</h1>
                    <p>Username</p>
                    <input type="text" id="name2-input" ></input>
                    <p>Password</p>
                    <input type="password" id="password2-input" ></input>
                    <p>Confirm password</p>
                    <input type="password" id="password3-input" ></input>
                    <div id="button-container">
                        <button className="form-btn" id="" onClick={() => {
                            const registerName = document.getElementById('name2-input');
                            const registerPassword1 = document.getElementById('password2-input');
                            const registerPassword2 = document.getElementById('password3-input');
                            const errorMessage = document.getElementById('error-message');
                            const regex = /\W/;
                            errorMessage.className = ""

                            if (registerName.value == '' || registerPassword1.value == '' || registerPassword2.value == '' ) {
                                errorMessage.innerHTML = "One or more required fields are missing!";
                                errorMessage.className = "show-error"
                                setTimeout(() => {
                                    errorMessage.className = "";
                                }, 4000)
                                return;
                            }

                            if (regex.test(registerName.value) || regex.test(registerPassword1.value) || regex.test(registerPassword2.value)) {
                                errorMessage.innerHTML = "One or more fields contain unallowed characters!";
                                errorMessage.className = "show-error"
                                setTimeout(() => {
                                    errorMessage.className = "";
                                }, 4000)
                                return;
                            }

                            if (registerPassword1.value != registerPassword2.value) {
                                errorMessage.innerHTML = "The passwords don't match!";
                                errorMessage.className = "show-error"
                                setTimeout(() => {
                                    errorMessage.className = "";
                                }, 4000)
                                return;
                            }


                            const fetchParams = {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    username: registerName.value,
                                    password: registerPassword1.value
                                }),
                            }
                            fetch('http://127.0.0.1:8000/register', fetchParams)
                            .then(function (response) {

                                if (response.status == 200) {

                                    const fetchParams = {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            username: registerName.value,
                                            password: registerPassword1.value
                                        }),
                                    }
                                    fetch('http://127.0.0.1:8000/login', fetchParams).then(function (response) {
        
                                        if (response.status == 200) {
                                            response.json().then((json) => { setCookie("user", json.loginAuthCode) });

                                            const page = document.getElementById('register-page');
                                            const container = document.getElementById('login-container');
                                            page.style.display = 'none';
                                            container.style.pointerEvents = 'none';
                                            registerName.value = "";
                                            registerPassword1.value = "";
                                            registerPassword2.value = "";
                                            window.location.reload();
                                        } else {
                                            errorMessage.innerHTML = "Wrong username/password!";
                                            errorMessage.className = "show-error"
                                            setTimeout(() => {
                                                errorMessage.className = "";
                                            }, 4000)
                                        }
        
                                    })
                                } else if (response.status == 401) {
                                    errorMessage.innerHTML = "This user already exists!";
                                    errorMessage.className = "show-error"
                                    setTimeout(() => {
                                        errorMessage.className = "";
                                    }, 4000)
                                }
                            });



                        }}>Register</button>
                        <p><br />Already have an account?
                            <a id="login-btn" onClick={() => {
                                const loginPage = document.getElementById('login-page');
                                const registerPage = document.getElementById('register-page');
                                loginPage.style.display = 'flex';
                                registerPage.style.display = 'none';
                                setKey((key) => key + 1);
                            }}> Log in!</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

