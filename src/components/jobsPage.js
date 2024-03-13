import { useContext, useEffect, useState } from "react"
import { windowContext } from "./desktop"
import { generateJobItems, parseJobs } from "./jobBase";
import { saveContext, userContext } from "../App";

export function JobsPage()
{
    const save = useContext(saveContext);
    const [jobs, setJobs] = useState([]);
    const window = useContext(windowContext);
    const user = useContext(userContext);

    useEffect(()=> {
        setJobs(generateJobItems(parseJobs(save.activeSaveFile, save.setActiveSaveFile), user.currUser.split(" ")[0]));
    //eslint-disable-next-line
    }, [save.activeSaveFile])

    return (
        <div id='jobs-page' className='pages' style={{display: (window === "jobs") ? "flex" : "none"}}>
            <ul id="jobs-sidebar">
                {jobs}
            </ul>
            <div id="jobs-content"></div>
        </div>

    )
}