import React from "react";
import "./App.css";
import { Icon } from "@iconify/react";


export class LoginPage extends React.Component
{
    render()
    {
        return(
            <div id="login-container">
                <button id="user-icon" onClick={() => {
                    const page = document.getElementById('login-page');
                    const container = document.getElementById('login-container');
                    if (page.style.display == 'none') {
                        console.log('Display');
                        page.style.display = 'flex';
                        container.style.pointerEvents = 'all';
                    } else {
                        console.log('Hide');
                        page.style.display = 'none';
                        container.style.pointerEvents = 'none';
                    }
                }}>
                <Icon icon="uil:user" />
                <p>ASD</p>
              </button>

                <div id="login-page" style={{display: 'none'}}>
                    <div id="form-container">
                        <h1>Login</h1>
                        <p>Username</p>
                        <input type="text" id="name-input" ></input>
                        <p>Password</p>
                        <input type="password" id="name-input" ></input>
                        <div id="button-container">
                            <button className="form-btn" id="login-btn">Login</button>
                            <button className="form-btn" id="register-btn" onClick={() => {
                                const loginPage = document.getElementById('login-page');
                                const registerPage = document.getElementById('register-page');

                                loginPage.style.display = 'none';
                                registerPage.style.display = 'flex';

                            }}>Register</button>
                        </div>
                    </div>
                </div>
                <div id="register-page" style={{display: 'none'}}>
                    <div id="form-container">
                        <h1>Register</h1>
                        <p>Username</p>
                        <input type="text" id="name-input" ></input>
                        <p>Password</p>
                        <input type="password" id="name-input" ></input>
                        <p>Confirm password</p>
                        <input type="password" id="name-input" ></input>
                        <div id="button-container">
                            <button className="form-btn" id="login-btn" onClick={() => {
                                const loginPage = document.getElementById('login-page');
                                const registerPage = document.getElementById('register-page');

                                loginPage.style.display = 'flex';
                                registerPage.style.display = 'none';

                            }}>Login</button>
                            <button className="form-btn" id="register-btn">Register</button>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}