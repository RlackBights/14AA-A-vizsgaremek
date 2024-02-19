import "../App.css";
import "../index.css";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { backend, overlayContext, saveContext, userContext } from "../App";
import { loginUser, registerUser, sendRecoveryEmail } from "./requests";

export function LoginPage() {

  const overlay = useContext(overlayContext);
  const user = useContext(userContext);
  const saves = useContext(saveContext);

  return (
    <div id="login-container" style={{ pointerEvents: (["loginPage", "registerPage"].includes(overlay.currOverlay)) ? "all" : "none"}}>
      <button
        id="user-icon"
        style={{display: overlay.currOverlay === "" ? "flex" : "none"}}
        onClick={() => {
          overlay.setCurrOverlay("loginPage");
        }}
      >
        <Icon icon="uil:user" />
        <p>
          {user.currUser !== ""
            ? user.currUser.split(" ")[0]
            : "[Log in to play]"}
        </p>
      </button>

      {user.currUser !== "" &&
      <button
        id="logoutBtn"
        style={{display: overlay.currOverlay === "" ? "flex" : "none"}}
        onClick={ () => {
          localStorage.setItem("userAuthCode", "");
          user.setCurrUser("")
        }}>
        [Log out]
      </button>}

      <p id="error-message">ERROR PLACEHOLDER</p>
      <div id="login-page" style={{ display: overlay.currOverlay === "loginPage" ? "flex" : "none" }}>
        <form id="form-container" onSubmit={(e) => {e.preventDefault()}}>
          <p
            className="close-image"
            onClick={() => {
              overlay.setCurrOverlay("");
            }}
          >Close</p>
          <h1>Login</h1>
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

                loginUser(usernameInput.value, passwordInput.value).then((res) => {
                  if (res.success) {
                    usernameInput.value = "";
                    passwordInput.value = "";
                    localStorage.setItem("userAuthCode", res.data);
                    user.setCurrUser(res.data);
                    overlay.setCurrOverlay("")
                  } else {
                    errorMessage.innerHTML = res.data;
                    errorMessage.className = "show-error";
                    setTimeout(() => {
                      errorMessage.className = "";
                    }, 4000);
                  }
                });
              }}
            >
              Login
            </button>

            <p>
              <br />
              Don't have an account?{" "}
              <a
                id="register-btn"
                onClick={() => {
                  overlay.setCurrOverlay("registerPage");
                }}
              >
                <br/>Register here!
              </a>
              <br />
              <br />
              <a
                id="register-btn"
                onClick={() => {
                  overlay.setCurrOverlay("forgotPassword");
                }}
              >
                Forgot your password?
              </a>
            </p>
          </div>
        </form>
      </div>
      <div id="register-page" style={{ display: overlay.currOverlay == "registerPage" ? "flex" : "none"}}>
        <form id="form-container" onSubmit={(e) => {e.preventDefault()}}>
          <p
            className="close-image"
            onClick={() => {
              overlay.setCurrOverlay("");
            }}
          >Close</p>
          <h1>Register</h1>
          <p>Username</p>
          <input type="text" id="name2-input"></input>
          <p>Email</p>
          <input type="text" id="email-input"></input>
          <p>Password</p>
          <input type="password" id="password2-input"></input>
          <p>Confirm password</p>
          <input type="password" id="password3-input"></input>
          <div id="button-container">
            <button
              className="form-btn"
              id=""
              onClick={() => {
                const emailAddress = document.getElementById("email-input")
                const registerName = document.getElementById("name2-input");
                const registerPassword1 = document.getElementById("password2-input");
                const registerPassword2 = document.getElementById("password3-input");
                const errorMessage = document.getElementById("error-message");

<<<<<<< HEAD
            <p id="error-message">ERROR PLACEHOLDER</p>
            <div id="login-page" style={{ display: 'none' }}>
                <div id="form-container">
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

                            if (passwordInput.value === '' || usernameInput.value === '') {
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

                            fetch('http://127.0.0.1:8000/user/login', fetchParams).then(function (response) {
                                if (response.status === 200) {
                                    response.json().then((json) => { cookie.set("user", json.loginAuthCode); cookie.set("isAdmin", json.isAdmin) });
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

                        }}>
                            Register here!</a></p>

                        <h3 className="close-image" onClick={() => {
                            const loginPage = document.getElementById('login-page');
                            const registerPage = document.getElementById('register-page');
                            const container = document.getElementById('login-container');
                            loginPage.style.display = 'none';
                            registerPage.style.display = 'none';
                            container.style.pointerEvents = 'none';
                        }}>Close</h3>

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

                            if (registerName.value === '' || registerPassword1.value === '' || registerPassword2.value === '') {
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

                            if (registerPassword1.value !== registerPassword2.value) {
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
                            fetch('http://127.0.0.1:8000/user/register', fetchParams)
                                .then(function (response) {

                                    if (response.status === 200) {

                                        const fetchParams = {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                username: registerName.value,
                                                password: registerPassword1.value
                                            }),
                                        }
                                        fetch('http://127.0.0.1:8000/user/login', fetchParams).then(function (response) {

                                            if (response.status === 200) {
                                                response.json().then((json) => { cookie.set("user", json.loginAuthCode) });

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
                                    } else if (response.status === 401) {
                                        errorMessage.innerHTML = "This user already exists!";
                                        errorMessage.className = "show-error"
                                        setTimeout(() => {
                                            errorMessage.className = "";
                                        }, 4000)
                                    }
                                });



                        }}>Register</button>
                        <p><br />Already have an account? <a id="login-btn" onClick={() => {
                            const loginPage = document.getElementById('login-page');
                            const registerPage = document.getElementById('register-page');
                            loginPage.style.display = 'flex';
                            registerPage.style.display = 'none';
                        }}>Log in!</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
=======
                registerUser(emailAddress.value, registerName.value, registerPassword1.value, registerPassword2.value).then((res) => {
                  if (res.success) {
                    emailAddress.value = "";
                    registerName.value = "";
                    registerPassword1.value = "";
                    registerPassword2.value = "";
                    localStorage.setItem("userAuthCode", res.data);
                    user.setCurrUser(res.data);
                    overlay.setCurrOverlay("")
                  } else {
                    errorMessage.innerHTML = res.data;
                    errorMessage.className = "show-error";
                    setTimeout(() => {
                      errorMessage.className = "";
                    }, 4000);
                  }
                })
                
              }}
            >
              Register
            </button>
            <p>
              <br />
              Already have an account?{" "}
              <a
                id="login-btn"
                onClick={() => {
                  overlay.setCurrOverlay("loginPage");
                }}
              >
                Log in!
              </a>
            </p>
          </div>
        </form>
      </div>
      <div id="forgot-page" style={{ display: overlay.currOverlay === "forgotPassword" ? "flex" : "none" }}>
        <form id="form-container" onSubmit={(e) => {e.preventDefault()}}>
          <p
            className="close-image"
            onClick={() => {
              overlay.setCurrOverlay("");
            }}
          >Close</p>
          <h1>Password Reset</h1>
          <p>Enter your email address:</p>
          <input type="text" id="forgot-email-input"></input>
          <div id="button-container">
            <button
              className="form-btn"
              id=""
              onClick={() => {
                const emailAddress = document.getElementById("forgot-email-input");
                const errorMessage = document.getElementById("error-message");

                sendRecoveryEmail(emailAddress.value).then((res) => {
                  if (res.success) {
                    emailAddress.value = "";
                    errorMessage.innerHTML = "Password reset email sent!";
                    errorMessage.className = "show-error";
                    setTimeout(() => {
                      errorMessage.className = "";
                    }, 4000);
                    overlay.setCurrOverlay("")
                  } else {
                    errorMessage.innerHTML = res.data;
                    errorMessage.className = "show-error";
                    setTimeout(() => {
                      errorMessage.className = "";
                    }, 4000);
                  }
                });
              }}>
              Send Email
            </button>
            <p>
              <br />
              <a
                id="forgot-back-btn"
                onClick={() => {
                  overlay.setCurrOverlay("loginPage");
                }}
              >
                Back
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
>>>>>>> Rework-save-management
}
