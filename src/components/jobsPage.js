import { useContext, useEffect, useState } from "react";
import { windowContext } from "./desktop";
import { generateJobItems, parseJobs } from "./jobBase";
import { saveContext, userContext } from "../App";
import mailIcon from "../assets/mail-icon.svg";

export function JobsPage()
{
    const save = useContext(saveContext);
    const [jobs, setJobs] = useState([]);
    const window = useContext(windowContext);
    const user = useContext(userContext);
    
    const generateJobs = async () => {
        setJobs(await generateJobItems(parseJobs(save.activeSaveFile, save.setActiveSaveFile), user.currUser.split(" ")[0]));
    }

    generateJobs();

    return (
        <div id='jobs-page' className='pages' style={{display: (window === "jobs") ? "flex" : "none"}}>
            <ul id="jobs-sidebar">
                {jobs}
            </ul>
            <div id="jobs-content">
            </div>
        </div>

    )
}