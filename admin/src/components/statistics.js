import { useContext } from "react";
import "../App.css"; 
import { backend, userContext } from "../App";

export function Statistics() {
    
    const user = useContext(userContext);

    return (
        <div id="stats-container">
            <h1>{user.authToken.split(" ")[0]}</h1>
            <ul>
                <li><p>Overall Time:</p><p>123123123</p></li>
                <li><p>Missions Completed:</p><p>123123123</p></li>
                <li><p>Fastest Mission Completion:</p><p>123123123</p></li>
                <li><p>Save File Count:</p><p>123123123</p></li>
                <li><p>Computer Parts Bought:</p><p>123123123</p></li>
            </ul>
            <button className="btn"
            onClick={() =>
                {
                    localStorage.setItem("authToken", "");
                    user.setAuthToken("");
                    user.setIsAdmin(false);
                }
            }>Log Out</button>
        </div>
    )
}