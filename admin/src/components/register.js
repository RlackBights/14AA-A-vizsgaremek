import React, { useContext } from 'react';
import { pagecontext } from './mainpage';
import { backend, userContext } from '../App';

export function Register() {
    const formSwitch = useContext(pagecontext);
    const user = useContext(userContext);

    return (
        <>
        <form id="form-container" className='register-container' onSubmit={(e) => { e.preventDefault() }}>
            <p id="error-message"></p>
            <h3 id="login-title">Register</h3>
            <p>Username</p>
            <input type="text" id="name-input"></input>
            <p>Email</p>
            <input type="text" id="email-input"></input>
            <p>Password</p>
            <input type="password" id="password-input"></input>
            <p>Confirm Password</p>
            <input type="password" id="password2-input"></input>
            <div id="button-container">
                <button
                    className="form-btn"
                    id=""
                    onClick={() => {
                        const usernameInput = document.getElementById("name-input");
                        const emailInput = document.getElementById("email-input");
                        const passwordInput = document.getElementById("password-input");
                        const confirmPasswordInput = document.getElementById("password2-input");
                        const errorMessage = document.getElementById("error-message");

                        if (passwordInput.value === "" || usernameInput.value === "") {
                            errorMessage.innerHTML =
                                "One or more required fields are missing!";
                            errorMessage.className = "show-error";
                            setTimeout(() => {
                                errorMessage.className = "";
                            }, 5000);
                            return;
                        } else if (passwordInput.value !== confirmPasswordInput.value) {
                            errorMessage.innerHTML =
                                "The passwords do not match!";
                            errorMessage.className = "show-error";
                            setTimeout(() => {
                                errorMessage.className = "";
                            }, 5000);
                            return;
                        }

                        let fetchParams = {
                            method: "POST",
                            headers: { "Content-Type": "application/json", "x-app-type": "web" },
                            body: JSON.stringify({
                                email: emailInput.value,
                                username: usernameInput.value,
                                password: passwordInput.value,
                                confirmPassword: confirmPasswordInput.value
                            }),
                        };

                        fetch(backend + "/player/register", fetchParams).then(
                            (res) => {
                                switch (res.status) {
                                    case 200:
                                        fetchParams = {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json", "x-app-type": "web" },
                                            body: JSON.stringify({
                                                username: usernameInput.value,
                                                password: passwordInput.value,
                                            }),
                                        };
                
                                        fetch(backend + "/player/login", fetchParams).then(
                                            function (response) {
                                        switch (response.status) {
                                            case 200:
                                                response
                                                    .json()
                                                    .then((json) => {
                                                        console.log(json);
        
                                                        fetchParams = {
                                                            method: "POST",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({
                                                                authCode: (json.data[0] + " " + json.data[1])
                                                            }),
                                                        };
        
                                                        fetch(backend + "/admin/isAdmin", fetchParams).then((res) => res.json()).then((res) => {
                                                            user.setIsAdmin(res.data[0].isAdmin);
                                                        });
        
                                                        localStorage.setItem("authToken", json.data[0] + " " + json.data[1]);
                                                        user.setAuthToken(json.data[0] + " " + json.data[1]);
                                                        localStorage.setItem("stats", JSON.stringify(json.stats))
                                                        user.setStats(JSON.stringify(json.stats))
                                                    })
                                                    .then(
                                                        usernameInput.value = "",
                                                        passwordInput.value = ""
                                                    );
                                                break;
                                            default:
                                                response.json().then((errorResponse) => {
                                                    errorMessage.innerHTML = errorResponse.error;
                                                });
                                                errorMessage.className = "show-error";
                                                setTimeout(() => {
                                                    errorMessage.className = "";
                                                }, 4000);
                                                break;
                                        }
                                    })
                                    default:
                                        res.json().then((errorResponse) => {
                                            errorMessage.innerHTML = errorResponse.error;
                                        });
                                        errorMessage.className = "show-error";
                                        setTimeout(() => {
                                            errorMessage.className = "";
                                        }, 4000);
                                        break;
                            }}
                        )
                    }}
                >
                    Register
                </button>
                <br/><br/>
                <p class="form-switch">Already have an account?<br/><a onClick={() => formSwitch.setIsLogin(true)}>Log in!</a></p>
            </div>
        </form>
        </>
        
    );
};
