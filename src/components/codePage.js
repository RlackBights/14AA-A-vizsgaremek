import { useContext, useEffect, useState } from "react";
import { windowContext } from "./desktop";
import Editor from '@monaco-editor/react';
import level0 from '../websites/level0';
import level1 from "../websites/level1";
import level2 from "../websites/level2";
import { parseJobs } from "./jobBase";
import { saveContext, userContext } from "../App";
import { soundContext } from '../App';
import { useLocation } from 'react-router-dom';

const levels = [level0, level1, level2];
function generateJobFiles(jobs, setActiveEditor, save, play)
{
    let output = [];
    for (let i = 0; i < jobs.length; i++) {
        let job = jobs[i];
        const isDisabled = parseInt(save.activeSaveFile.jobs.split("-")[i]).toString() === save.activeSaveFile.jobs.split("-")[i];
        output.push(
            <li key={JSON.stringify(job)} id={`job-file-${i}`} language="html" init="true" edited="false" cooldown={isDisabled ? "true" : "false"} onClick={isDisabled ? () => {} : (e) => {
                play();
                e.target.setAttribute("init", false);
                e.target.parentElement.childNodes.forEach(item =>{
                    if (item.getAttribute("language") === null || item === e.target) return;
                    item.className = "";
                })
                e.target.className = (e.target.className === "active") ? "" : "active";
                setActiveEditor(curr => curr === i? -1 : i);
            }}>{ isDisabled ? "No related jobs" : levels[job.jobId].pageTitle }</li>
        );
        
    }

    return output;
}

async function getJobContent(id, username, save) {
    let outcontent = "";
    await window.electron.getFile(id, username, save.activeSaveFile.saveId).then((fileContent) => {
        outcontent = fileContent.toString();
    });
    if (outcontent === "") {
        if (parseJobs(save.activeSaveFile, save.setActiveSaveFile)[id] !== undefined) {
            outcontent = levels[parseJobs(save.activeSaveFile, save.setActiveSaveFile)[id].jobId].getFaultyCode(parseJobs(save.activeSaveFile, save.setActiveSaveFile)[id].tasks);
        } else {
            outcontent = "";
        }
    }
    return outcontent;
}

export default function CodePage()
{

    const windowState = useContext(windowContext);
    const save = useContext(saveContext);
    const user = useContext(userContext);
    const [activeEditor, setActiveEditor] = useState(-1);
    const [jobContents, setJobContents] = useState(["", "", "", ""]);
    const [jobFiles, setJobFiles] = useState([]);
    const play = useContext(soundContext).uiClick;
    const locationPath = useLocation().pathname;

    

    useEffect(() => {
        for (let i = 0; i < 4; i++) {
            const isDisabled = parseInt(save.activeSaveFile.jobs.split("-")[i]).toString() === save.activeSaveFile.jobs.split("-")[i];
            if (isDisabled && activeEditor === i) {
                setJobContents(prev => {
                activeEditor === i? setActiveEditor(-1) : setActiveEditor(i);
                let newContents = prev;
                newContents[i] = "";
                return newContents;
                
            })
        }}
    }, [setJobContents, activeEditor, save.activeSaveFile.jobs, locationPath]);

    useEffect(() => {
        const setContents = async () => setJobContents([await getJobContent(0, user.currUser.split(' ')[0], save), await getJobContent(1, user.currUser.split(' ')[0],save), await getJobContent(2, user.currUser.split(' ')[0],save), await getJobContent(3, user.currUser.split(' ')[0],save)]);
        setContents();

        if (windowState !== "code") return;

        const saveFunction = (e) => {
            if (e.ctrlKey && e.key === "s" && sessionStorage.getItem("saved") !== "true") {
                window.electron.saveFile(document.getElementById("code-preview").getAttribute("editorid"), user.currUser.split(' ')[0], save.activeSaveFile.saveId, document.getElementById("code-preview").getAttribute("srcdoc"));
                document.getElementById(`job-file-${document.getElementById("code-preview").getAttribute("editorid")}`).setAttribute("edited", "false");
                e.preventDefault();
                sessionStorage.setItem("saved", "true");
            }
        };

        const lockSaveFunction = (e) => {
            if (e.ctrlKey && e.key === "s") {
                sessionStorage.setItem("saved", "false");
            }
        };

        document.body.removeEventListener('keydown', saveFunction);
        document.body.removeEventListener('keyup', lockSaveFunction);

        document.body.addEventListener('keydown', saveFunction);
        document.body.addEventListener('keyup', lockSaveFunction);
    }, [save, user, activeEditor, locationPath, windowState])

    useEffect(() => {
        setJobFiles(generateJobFiles(parseJobs(save.activeSaveFile, save.setActiveSaveFile), setActiveEditor, save, play));
        // eslint-disable-next-line
    }, [save.activeSaveFile, locationPath]);

    useEffect(() => {
        if (!document.getElementById("job-file-0") || document.getElementById("job-file-0").getAttribute("init") === "true") return;
        document.getElementById("job-file-0").setAttribute("edited", "true");
        // eslint-disable-next-line
    }, [jobContents[0], locationPath]);

    useEffect(() => {
        if (!document.getElementById("job-file-1") || document.getElementById("job-file-1").getAttribute("init") === "true") return;
        document.getElementById("job-file-1").setAttribute("edited", "true");
        // eslint-disable-next-line
    }, [jobContents[1], locationPath]);

    useEffect(() => {
        if (!document.getElementById("job-file-2") || document.getElementById("job-file-2").getAttribute("init") === "true") return;
        document.getElementById("job-file-2").setAttribute("edited", "true");
        // eslint-disable-next-line
    }, [jobContents[2], locationPath]);

    useEffect(() => {
        if (!document.getElementById("job-file-3") || document.getElementById("job-file-3").getAttribute("init") === "true") return;
        document.getElementById("job-file-3").setAttribute("edited", "true");
        // eslint-disable-next-line
    }, [jobContents[3], locationPath]);

    if (document.querySelector(".code-editor")) {
        document.querySelector(".code-editor").setAttribute("empty", (document.querySelectorAll("span.mtk1").length === 0).toString());
    }

    return (
        <div id='code-page' className='pages' style={{display: (windowState === "code") ? "flex" : "none"}}>
            { (activeEditor === 0) && <Editor className="code-editor" defaultLanguage="html" theme="vs-dark" defaultValue="" value={jobContents[0]} onChange={(e) => {
                setJobContents(jobs => {
                    const newJobs = [...jobs];
                    newJobs[0] = e;
                    return newJobs;
                })
                return;
            }}/>}
            { (activeEditor === 1) && <Editor className="code-editor" defaultLanguage="html" theme="vs-dark" defaultValue="" value={jobContents[1]} onChange={(e) => {
                setJobContents(jobs => {
                    const newJobs = [...jobs];
                    newJobs[1] = e;
                    return newJobs;
                })
                return;
            }}/>}
            { (activeEditor === 2) && <Editor className="code-editor" defaultLanguage="html" theme="vs-dark" defaultValue="" value={jobContents[2]} onChange={(e) => {
                setJobContents(jobs => {
                    const newJobs = [...jobs];
                    newJobs[2] = e;
                    return newJobs;
                })
                return;
            }}/>}
            { (activeEditor === 3) && <Editor className="code-editor" defaultLanguage="html" theme="vs-dark" defaultValue="" value={jobContents[3]} onChange={(e) => {
                setJobContents(jobs => {
                    const newJobs = [...jobs];
                    newJobs[3] = e;
                    return newJobs;
                })
                return;
            }}/>}
            <ul id="file-list">
                <li>⯆ jobs</li>
                {jobFiles}
                <button id="test-btn" onClick={() => {
                    play();
                    if (!document.getElementById("code-preview")) return;
                    document.getElementById("code-preview").classList.toggle("open");
                }}>Test code</button>
            </ul>
            <button id="reset-btn" onClick={() => {
                play();
                    setJobContents(jobs => {
                    const newJobs = [...jobs];
                    newJobs[activeEditor] = levels[parseJobs(save.activeSaveFile, save.setActiveSaveFile)[activeEditor].jobId].getFaultyCode(parseJobs(save.activeSaveFile, save.setActiveSaveFile)[activeEditor].tasks);
                    return newJobs;
                });
            }}>Reset code</button>
            { (activeEditor !== -1) && <iframe title="Preview" id="code-preview" editorid={activeEditor} srcDoc={jobContents[activeEditor]}></iframe>}
        </div>
    )
    
}