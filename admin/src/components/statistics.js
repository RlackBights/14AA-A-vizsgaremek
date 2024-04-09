import { useContext, useEffect, useState } from "react";
import "../App.css";
import { userContext } from "../App";

function normalizeTime(num) {
    return num > 9? num : `0${num}`;
}

function parseTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor((time % 3600) % 60);
    return `${normalizeTime(hours)}:${normalizeTime(minutes)}:${normalizeTime(seconds)}`;
}

export function Statistics() {
    const user = useContext(userContext);
    const [tipIndex, setTipIndex] = useState(0);
    let statistics = {};

    try {
        statistics = JSON.parse(user.stats);
    } catch (e) {
        statistics = user.stats;
    }

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
                <li><p>Overall Time:</p><p>{parseTime(statistics.overallTime)}</p></li>
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
                    localStorage.setItem("stats", JSON.stringify({"tips":{"HTML_tips":"","CSS_tips":"","JavaScript_tips":""}}));
                    user.setAuthToken("");
                    user.setIsAdmin(false);
                    user.setStats(JSON.stringify({"tips":{"HTML_tips":"","CSS_tips":"","JavaScript_tips":""}}));
                }
                }>Log Out</button>
        </div>
    )
}