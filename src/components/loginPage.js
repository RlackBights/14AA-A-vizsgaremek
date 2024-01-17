import "../App.css";
import { Icon } from "@iconify/react";
import exitImage from "../assets/delete-button.png";
import { cookie } from "./cookie";

export function LoginPage() {
  return (
    <div id="login-container" style={{ pointerEvents: "none" }}>
      <button
        id="user-icon"
        onClick={() => {
          const loginPage = document.getElementById("login-page");
          const registerPage = document.getElementById("register-page");
          const container = document.getElementById("login-container");
          if (
            loginPage.style.display === "none" &&
            registerPage.style.display === "none"
          ) {
            loginPage.style.display = "flex";
            container.style.pointerEvents = "all";
          } else {
            loginPage.style.display = "none";
            registerPage.style.display = "none";
            container.style.pointerEvents = "none";
          }
        }}
      >
        <Icon icon="uil:user" />
        <p>
          {cookie.get("user") !== ""
            ? cookie.get("user").split("$$", 2)[0]
            : "[Log in to play]"}
        </p>
      </button>

      {cookie.get("user").length != 0 &&
      <button id="logoutBtn" onClick={ () => {
            cookie.set("user", "");
            window.location.reload();
      }}>
        [Log out]
      </button>}

      <p id="error-message">ERROR PLACEHOLDER</p>
      <div id="login-page" style={{ display: "none" }}>
        <div id="form-container">
          <img
            className="close-image"
            onClick={() => {
              const loginPage = document.getElementById("login-page");
              const registerPage = document.getElementById("register-page");
              const container = document.getElementById("login-container");
              loginPage.style.display = "none";
              registerPage.style.display = "none";
              container.style.pointerEvents = "none";
            }}
            src={exitImage}
          ></img>
          <h1>Login</h1>
          <p>Username or Email</p>
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
                  }, 4000);
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

                fetch("http://127.0.0.1:8000/player/login", fetchParams).then(
                  function (response) {
                    switch (response.status) {
                      case 200:
                        response
                          .json()
                          .then((json) => {
                            cookie.set(
                              "user",
                              json.data[0] + "$" + json.data[1]
                            );
                          })
                          .then(() => {
                            const page = document.getElementById("login-page");
                            const container =
                              document.getElementById("login-container");
                            page.style.display = "none";
                            container.style.pointerEvents = "none";
                            usernameInput.value = "";
                            passwordInput.value = "";
                            window.location.reload();
                          });
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

            <p>
              <br />
              Don't have an account?{" "}
              <a
                id="register-btn"
                onClick={() => {
                  const loginPage = document.getElementById("login-page");
                  const registerPage = document.getElementById("register-page");

                  loginPage.style.display = "none";
                  registerPage.style.display = "flex";
                }}
              >
                Register here!
              </a>
              <br />
              <br />
              <a
                id="register-btn"
                onClick={() => {
                  const loginPage = document.getElementById("login-page");
                  const forgotPage = document.getElementById("forgot-page");

                  loginPage.style.display = "none";
                  forgotPage.style.display = "flex";
                }}
              >
                Forgot your password?
              </a>
            </p>
          </div>
        </div>
      </div>
      <div id="register-page" style={{ display: "none" }}>
        <div id="form-container">
          <img
            className="close-image"
            onClick={() => {
              const loginPage = document.getElementById("login-page");
              const registerPage = document.getElementById("register-page");
              const container = document.getElementById("login-container");
              loginPage.style.display = "none";
              registerPage.style.display = "none";
              container.style.pointerEvents = "none";
            }}
            src={exitImage}
          ></img>
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
                const registerPassword1 =
                  document.getElementById("password2-input");
                const registerPassword2 =
                  document.getElementById("password3-input");
                const errorMessage = document.getElementById("error-message");
                errorMessage.className = "";

                if (registerPassword1.value !== registerPassword2.value) {
                  errorMessage.innerHTML = "The passwords don't match!";
                  errorMessage.className = "show-error";
                  setTimeout(() => {
                    errorMessage.className = "";
                  }, 4000);
                  return;
                }

                const fetchParams = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: emailAddress.value,
                    username: registerName.value,
                    password: registerPassword1.value,
                  }),
                };
                fetch("http://127.0.0.1:8000/player/register", fetchParams).then(
                  (response) => {
                    switch (response.status) {
                      case 200:
                        fetch("http://127.0.0.1:8000/player/login", fetchParams).then(
                          (response) => {
                            switch (response.status) {
                              case 200:
                                response
                                  .json()
                                  .then((json) => {
                                    cookie.set(
                                      "user",
                                      json.data[0] + "$" + json.data[1]
                                    );
                                  })
                                  .then(() => {
                                    const page = document.getElementById("login-page");
                                    const container =
                                      document.getElementById("login-container");
                                    page.style.display = "none";
                                    container.style.pointerEvents = "none";
                                    registerName.value = "";
                                    registerPassword1.value = "";
                                    registerPassword2.value = "";
                                    window.location.reload();
                                  });
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
              Register
            </button>
            <p>
              <br />
              Already have an account?{" "}
              <a
                id="login-btn"
                onClick={() => {
                  const loginPage = document.getElementById("login-page");
                  const registerPage = document.getElementById("register-page");
                  loginPage.style.display = "flex";
                  registerPage.style.display = "none";
                }}
              >
                Log in!
              </a>
            </p>
          </div>
        </div>
      </div>
      <div id="forgot-page" style={{ display: "none" }}>
        <div id="form-container">
          <img
            className="close-image"
            onClick={() => {
              const loginPage = document.getElementById("login-page");
              const registerPage = document.getElementById("register-page");
              const container = document.getElementById("login-container");
              const forgotPage = document.getElementById("forgot-page")
              loginPage.style.display = "none";
              registerPage.style.display = "none";
              container.style.pointerEvents = "none";
              forgotPage.style.display = "none";
            }}
            src={exitImage}
          ></img>
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
                const options = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({email:emailAddress.value})
                }
                fetch ("http://localhost:8000/player/forgotPassword", options).then((res) => {res.json()}).then((res) => {console.log(res)}) 
              }}>
              Send Email
            </button>
            <p>
              <br />
              <a
                id="forgot-back-btn"
                onClick={() => {
                  const loginPage = document.getElementById("login-page");
                  const forgotPage = document.getElementById("forgot-page");
                  loginPage.style.display = "flex";
                  forgotPage.style.display = "none";
                }}
              >
                Back
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
