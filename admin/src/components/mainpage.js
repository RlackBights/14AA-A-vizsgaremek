import "../App.css";
import { Login } from "./login";
import { Statistics } from "./statistics";
import { createContext, useContext, useEffect, useState } from "react";
import { backend, userContext } from "../App";
import installer from '../LearnTheBasics_Installer.exe';
import { Register } from "./register";

export const pagecontext = createContext();

export function MainPage() {

  if (window.location.href.includes("password-reset")) window.location.href = "/learnthebasics";
  const user = useContext(userContext);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (user.authToken === "") return;

    console.log("asd");

    let fetchParams = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authCode: user.authToken
      }),
    };

    fetch(backend + "/player/getStatistics", fetchParams).then((res) => res.json()).then((res) => {
      user.setStats(res.data);
    });

    fetch(backend + "/admin/isAdmin", fetchParams).then((res) => res.json()).then((res) => {
      user.setIsAdmin(res.data[0].isAdmin);
    });
  }, [])

  return (
    <div id="mainpage">
      <div className="navbar">
        <img className="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt=""></img>
        <ul className="navbar-items">
          <li id="navbar-admin" style={{ display: user.authToken === "" ? "none" : "flex" }}>
            <button className="navbar-links" style={{ display: user.isAdmin ? "block" : "none" }} onClick={() => {
              window.location.href = "/learnthebasics/admin-page";
            }}>Admin page</button>
          </li>
          <li>
            <a target="_blank" className="block-mobile" href={installer} download={"LearnTheBasics_Installer.exe"}><button className="btn">Download</button></a>
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
          <a target="_blank" className="block-mobile" href={installer} download={"LearnTheBasics_Installer.exe"}><button className="btn">Download our game now!</button></a>
        </div>
        <div id="user-container">
          <pagecontext.Provider value={{setIsLogin}}>
            {(user.authToken === "") ? ((isLogin) ? <Login /> : <Register />) : <Statistics />}
          </pagecontext.Provider>
        </div>
      </div>
    </div>
  );
}
