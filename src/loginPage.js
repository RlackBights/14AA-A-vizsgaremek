import React, { useEffect, useState } from "react";
import "./App.css";
import { Icon } from "@iconify/react";
import { CookiesProvider, useCookies } from "react-cookie";

export function LoginPage ()
{
    const [key, setKey] = useState(0);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    return(
            <div id="login-container" style={{ pointerEvents: 'none' }}>
                <button id="user-icon" onClick={() => {
                        const page = document.getElementById('login-page');
                        const container = document.getElementById('login-container');
                        if (page.style.display == 'none') {
                            page.style.display = 'flex';
                            container.style.pointerEvents = 'all';
                        } else {
                            page.style.display = 'none';
                            container.style.pointerEvents = 'none';
                        }
                    }}>
                    <Icon icon="uil:user" />
                    <p>{cookies.user.split('&')[0]}</p>
                </button>


                <div id="login-page" style={{display: 'none'}}>
                    <p id="error-message">ERASDEASD</p>
                    <div id="form-container">
                        <h1>Login</h1>
                        <p>Username</p>
                        <input type="text" id="name-input" ></input>
                        <p>Password</p>
                        <input type="password" id="password-input" ></input>
                        <div id="button-container">

                            <button className="form-btn" id="login-btn" onClick={() => {
                                
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
                                        response.json().then((json) => {setCookie("user", json.loginAuthCode)});
                                        
                                    } else {
                                        errorMessage.innerHTML = "Wrong username/password!";
                                        errorMessage.className = "show-error"
                                        setTimeout(() => {
                                            errorMessage.className = "";
                                        }, 4000)
                                    }

                                })}}>Login</button>


                            <p><br/>Don't have an account? <a id="register-btn" onClick={() => {
                                const loginPage = document.getElementById('login-page');
                                const registerPage = document.getElementById('register-page');

                                loginPage.style.display = 'none';
                                registerPage.style.display = 'flex';

                            }}>
                            Register here!</a></p>
                            
                        </div>
                    </div>
                </div>
                <div id="register-page" style={{display: 'none'}}>
                    <div id="form-container">
                        <h1>Register</h1>
                        <p>Username</p>
                        <input type="text" id="name2-input" ></input>
                        <p>Password</p>
                        <input type="password" id="password2-input" ></input>
                        <p>Confirm password</p>
                        <input type="password" id="password3-input" ></input>
                        <div id="button-container">
                            <button className="form-btn" id="register-btn">Register</button>
                            <p><br/>Already have an account?
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

        