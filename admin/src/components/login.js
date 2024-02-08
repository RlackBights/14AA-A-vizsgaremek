import { useContext } from "react";
import "../App.css"; 
import { userContext } from "../App";

const backend = "https://backend-learnthebasics.koyeb.app";

export function Login() {
    const user = useContext(userContext);
    
    return (
        <div id="form-container">
            <p id="error-message">asasdasd</p>
            <h3 id="login-title">Login</h3>
            <p>Username</p>
            <input type="text" id="name-input"></input>
            <p>Password</p>
            <input type="password" id="password-input"></input>
            <div id="button-container">
                <button
                className="form-btn"
                id=""
                onClick={() => {
                    const usernameInput = document.getElementById("name-input");
                    const passwordInput = document.getElementById("password-input");
                    const errorMessage = document.getElementById("error-message");

                    if (passwordInput.value === "" || usernameInput.value === "") {
                    errorMessage.innerHTML =
                        "One or more required fields are missing!";
                    errorMessage.className = "show-error";
                    setTimeout(() => {
                        errorMessage.className = "";
                    }, 5000);
                    return;
                    }

                    const fetchParams = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: usernameInput.value,
                        password: passwordInput.value,
                    }),
                    };

                    fetch( backend + "/player/login", fetchParams).then(
                    function (response) {
                        switch (response.status) {
                        case 200:
                            response
                            .json()
                            .then((json) => {
                                localStorage.setItem("authToken", json.data[0] + " " + json.data[1]);
                                user.setAuthToken(json.data[0] + " " + json.data[1]);
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
                    }
                    );
                }}
                >
                Login
                </button>
            </div>
        </div>
        );
    }
