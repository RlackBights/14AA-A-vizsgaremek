import { useContext,  useEffect,  useState } from "react";
import { windowContext } from "./desktop";
import { generateJobItems, parseJobs } from "./jobBase";
import { optionsContext, saveContext, userContext } from "../App";
import signSound from "../assets/finish-job.mp3";
import { soundContext } from '../App';
import useSound from "use-sound";
import { displayMessage } from "./notification";
import { useLocation } from 'react-router-dom';

let currInterval;

export function JobsPage()
{
    const save = useContext(saveContext);
    const [jobs, setJobs] = useState([]);
    const windowState = useContext(windowContext);
    const user = useContext(userContext);
    const options = useContext(optionsContext);
    const [sign] = useSound(signSound, { volume: options.optionValues.volume[0] });
    const play = useContext(soundContext).uiClick;
    const locationPath = useLocation();


    useEffect(() => {
        if (!JSON.parse(sessionStorage.getItem("ingame"))) return;

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

        const addXp = (amount) => {
            if (Math.floor((-5 + Math.sqrt(25 + 12 * (parseInt(save.activeSaveFile.xp) + parseInt(amount)))) / 6) > save.activeSaveFile.lvl) {
                displayMessage("Level Up!");
            }
            save.setActiveSaveFile(saveFile => ({...saveFile, xp: parseInt(saveFile.xp) + parseInt(amount), lvl: Math.floor((-5 + Math.sqrt(25 + 12 * (parseInt(saveFile.xp) + parseInt(amount)))) / 6)}));
        }

        const generateJobs = async (currWindow) => {
            setJobs(await generateJobItems(parseJobs(save.activeSaveFile, save.setActiveSaveFile), user.currUser.split(" ")[0], save.activeSaveFile.gpuId, addMoney, setSaveJobs, save.activeSaveFile.saveId, save.setStats, addXp, play, sign));
        }
        
        generateJobs(windowState).then(() => {
            if (!document.getElementById("jobs-sidebar").childNodes[JSON.parse(sessionStorage.getItem("lastSelectedJob"))]) {
                if (!document.getElementById("jobs-sidebar").childNodes[0]) {
                    return;
                }
                document.getElementById("jobs-sidebar").childNodes[0].click();
            }
            document.getElementById("jobs-sidebar").childNodes[JSON.parse(sessionStorage.getItem("lastSelectedJob"))].click();
        });
        
        if(currInterval) clearInterval(currInterval);
        currInterval = setInterval(() => {
            if (!JSON.parse(sessionStorage.getItem("ingame"))) return;
            generateJobs(windowState);
        }, 1000)

    }, [save.activeSaveFile, windowState, save, user.currUser]);

    useEffect(() => {
        
    }, [])

    return (
        <div id='jobs-page' className='pages' style={{display: (windowState === "jobs") ? "flex" : "none"}}>
            <ul id="jobs-sidebar">
                {jobs}
            </ul>
            <div id="jobs-content">
            </div>
        </div>

    )
}