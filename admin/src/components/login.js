import { useContext } from "react";
import "../App.css";
import { backend, userContext } from "../App";
import { pagecontext } from "./mainpage";


export function Login() {
    const user = useContext(userContext);
    const formSwitch = useContext(pagecontext);

    return (
        <form id="form-container" onSubmit={(e) => { e.preventDefault() }}>
            <p id="error-message"></p>
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

                                                let fetchParams = {
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
                            }
                        );
                    }}
                >
                    Login
                </button>
                <br/><br/>
                <p class="form-switch">Don't have an account yet?<br/><a onClick={() => formSwitch.setIsLogin(false)}>Register one here!</a></p>
            </div>
        </form>
    );
}
