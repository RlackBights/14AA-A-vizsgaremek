import { useContext, useEffect, useState } from "react";
import "../App.css";
import { userContext } from "../App";

export function Statistics() {
    const user = useContext(userContext);
    const [tipIndex, setTipIndex] = useState(0);

    const statistics = JSON.parse(user.stats);
    const tips = Object.values(statistics.tips);
    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex(prevIndex => (prevIndex + 1) % tips.length);
        }, 20000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <div id="stats-container">
            <h1>{user.authToken.split(" ")[0]}</h1>
            <p>{tips[tipIndex]}</p>
            <ul>
                <li><p>Overall Time:</p><p>{statistics.overallTime}</p></li>
                <li><p>Completed Jobs:</p><p>{statistics.completedJobs}</p></li>
                <li><p>Total Income:</p><p>{statistics.totalIncome}</p></li>
                <li><p>Total Money Spent:</p><p>{statistics.totalSpent}</p></li>
                <li><p>Total Computer Parts Bought:</p><p>{statistics.totalBoughtParts}</p></li>
                <li><p>Most Played Save:</p><p>{statistics.mostPlayedSave}</p></li>
                <li><p>Last Played Save:</p><p>{statistics.lastPlayedSave}</p></li>
                <li><p>Save File Count:</p><p>{statistics.saveFileCount}</p></li>
            </ul>
            <button className="btn"
                onClick={() => {
                    localStorage.setItem("authToken", "");
                    user.setAuthToken("");
                    user.setIsAdmin(false);
                }
                }>Log Out</button>
        </div>
    )
}