import { useContext,  useEffect,  useState } from "react";
import { windowContext } from "./desktop";
import { generateJobItems, parseJobs } from "./jobBase";
import { saveContext, userContext } from "../App";

let currInterval;

export function JobsPage()
{
    const save = useContext(saveContext);
    const [jobs, setJobs] = useState([]);
    const window = useContext(windowContext);
    const user = useContext(userContext);

    useEffect(() => {

        const addMoney = (amount) => {
            save.setActiveSaveFile(saveFile => ({...saveFile, money: parseInt(saveFile.money) + parseInt(amount)}));
        }
    
        const setSaveJobs = (newJob, jobIndex) => {
            save.setActiveSaveFile(saveFile => {
                let saveJobs = saveFile.jobs.split("-");
                saveJobs[jobIndex] = newJob;
                return {...saveFile, jobs: saveJobs.join('-')};
            })
        }

        const generateJobs = async (currWindow) => {
            if (currWindow !== "jobs") return;
            setJobs(await generateJobItems(parseJobs(save.activeSaveFile, save.setActiveSaveFile), user.currUser.split(" ")[0], save.activeSaveFile.gpuId, addMoney, setSaveJobs, save.activeSaveFile.saveId));
        }
        
        generateJobs(window);
        
        if(currInterval) clearInterval(currInterval);
        currInterval = setInterval(() => {
            generateJobs(window);
        }, 1000)

    }, [save.activeSaveFile, window, save, user.currUser]);

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