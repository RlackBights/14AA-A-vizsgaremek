import "../App.css";
import { Login } from "./login";
import logoText from "../LearnTheBasics.svg"
export function MainPage() {
  return (
    <div id="mainpage">
      <div className="navbar">
        <img className="logo" src={logoText}></img>
        <ul className="navbar-items">
          <li id="navbar-admin" style={{display:"none"}}>
            <p>Admin page</p>
          </li>
          <li>
            <button id="download">Download</button>
          </li>
        </ul>
      </div>
      <div id="main-content">
        <div id="about-us">
            <p id="about-us-title">About LearnTheBasics</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <button id="download">Download Our Game Now!</button>
        </div>
        <div id="login">
            <Login/>
        </div>
      </div>
    </div>
  );
}
