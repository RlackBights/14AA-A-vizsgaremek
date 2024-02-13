import "../App.css";
import { Login } from "./login";
import logoText from "../LearnTheBasics.svg"
import { Statistics } from "./statistics";
import { useContext } from "react";
import { backend, userContext } from "../App";
export function MainPage() {
  const user = useContext(userContext);


  return (
    <div id="mainpage">
      <div className="navbar">
        <img className="logo" src={logoText}></img>
        <ul className="navbar-items">
          <li id="navbar-admin" style={{display: user.authToken === "" ? "none" : "flex"}}>
            <button className="navbar-links" onClick={() => {
              let fetchParams = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  authCode: user.authToken
                }),
              };
            
              fetch(backend + "/admin/isAdmin", fetchParams).then((res) => res.json()).then((res) => {
                console.log(res);
                if (res.data[0].isAdmin === true) window.location.href = "/admin-page";
              })
              
            }}>Admin page</button>
          </li>
          <li>
            <button className="btn">Download</button>
          </li>
        </ul>
      </div>
      <div id="main-content">
        <div id="about-us">
            <p id="about-us-title">About the project</p>
            <div className="about-us-text">
            <p>Our game's main purpose is to teach beginners the basics of building a PC, and Web Development</p>
            <p>The application was made using the React.js framework, with a Node.js backend server</p>
            </div>
            <button className="btn">Download Our Game Now!</button>
        </div>
        <div id="user-container">

            {(user.authToken === "") ? <Login/> : <Statistics/>}
        </div>
      </div>
    </div>
  );
}
