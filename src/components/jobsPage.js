import { useContext, useEffect, useState } from "react"
import { windowContext } from "./desktop"
import { generateJobItems, parseJobs } from "./jobBase";
import { saveContext } from "../App";

export function JobsPage()
{
    const save = useContext(saveContext);
    console.log(save.activeSaveFile);
    const [jobs, setJobs] = useState([]);
    const window = useContext(windowContext);

    useEffect(()=> {
        setJobs(generateJobItems(parseJobs(save.activeSaveFile, save.setActiveSaveFile)));
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