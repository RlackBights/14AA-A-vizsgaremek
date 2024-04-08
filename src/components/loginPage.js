import "../App.css";
import "../index.css";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { overlayContext, userContext } from "../App";
import { loginUser, registerUser, sendRecoveryEmail } from "./requests";
import { displayMessage } from "./notification";
import { soundContext } from '../App';

export function LoginPage() {

  const overlay = useContext(overlayContext);
  const user = useContext(userContext);
  const play = useContext(soundContext).uiClick;

  return (
    <div id="login-container" style={{ pointerEvents: (["loginPage", "registerPage"].includes(overlay.currOverlay)) ? "all" : "none"}}>
      <button
        id="user-icon"
        style={{display: overlay.currOverlay === "" ? "flex" : "none"}}
        onClick={() => {
          play();
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
          play();
          localStorage.setItem("userAuthCode", "");
          user.setCurrUser("")
        }}>
        [Log out]
      </button>}

      
      <div id="login-page" style={{ display: overlay.currOverlay === "loginPage" ? "flex" : "none" }}>
        <form className="form-container" onSubmit={(e) => {e.preventDefault()}}>
          <p
            className="close-image"
            onClick={() => {
              play();
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
              onClick={() => {
                play();
                const usernameInput = document.getElementById("name-input");
                const passwordInput = document.getElementById("password-input");

                loginUser(usernameInput.value, passwordInput.value).then((res) => {
                  if (res.success) {
                    usernameInput.value = "";
                    passwordInput.value = "";
                    localStorage.setItem("userAuthCode", res.data);
                    user.setCurrUser(res.data);
                    overlay.setCurrOverlay("")
                  } else {
                      displayMessage(res.data, "error")
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
                href="#/"
                onClick={() => {
                  play();
                  overlay.setCurrOverlay("registerPage");
                }}
              >
                <br/>Register here!
              </a>
              <br />
              <br />
              <a
                id="register-btn"
                href="#/"
                onClick={() => {
                  play();
                  overlay.setCurrOverlay("forgotPassword");
                }}
              >
                Forgot your password?
              </a>
            </p>
          </div>
        </form>
      </div>
      <div id="register-page" style={{ display: overlay.currOverlay === "registerPage" ? "flex" : "none"}}>
        <form className="form-container" onSubmit={(e) => {e.preventDefault()}}>
          <p
            className="close-image"
            onClick={() => {
              play();
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
              onClick={() => {
                play();
                const emailAddress = document.getElementById("email-input")
                const registerName = document.getElementById("name2-input");
                const registerPassword1 = document.getElementById("password2-input");
                const registerPassword2 = document.getElementById("password3-input");

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
                    displayMessage(res.data, "error");
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
                href="#/"
                onClick={() => {
                  play();
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
        <form className="form-container" onSubmit={(e) => {e.preventDefault()}}>
          <p
            className="close-image"
            onClick={() => {
              play();
              overlay.setCurrOverlay("");
            }}
          >Close</p>
          <h1>Password Reset</h1>
          <p>Enter your email address:</p>
          <input type="text" id="forgot-email-input"></input>
          <div id="button-container">
            <button
              className="form-btn"
              onClick={() => {
                play();
                const emailAddress = document.getElementById("forgot-email-input");

                sendRecoveryEmail(emailAddress.value).then((res) => {
                  if (res.success) {
                    emailAddress.value = "";
                    displayMessage("Password reset email sent!");
                    overlay.setCurrOverlay("")
                  } else {
                    displayMessage(res.data, "error");
                  }
                });
              }}>
              Send Email
            </button>
            <p>
              <br />
              <a
                id="forgot-back-btn"
                href="#/"
                onClick={() => {
                  play();
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
}
