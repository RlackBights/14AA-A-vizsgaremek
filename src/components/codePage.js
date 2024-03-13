import { useContext, useEffect, useState } from "react";
import { windowContext } from "./desktop";
import Editor from '@monaco-editor/react';
import level0 from '../websites/level0';
import level1 from "../websites/level1";
import level2 from "../websites/level2";
import { parseJobs } from "./jobBase";
import { saveContext } from "../App";

const levels = [level0, level1, level2];
function generateJobFiles(jobs, setCodeContent)
{
    let output = [];

    jobs.forEach(job => {
        output.push(
            <li key={JSON.stringify(job)} language="html" onClick={(e) => {
                e.target.parentElement.childNodes.forEach(item =>{
                    if (item.getAttribute("language") === null) return;
                    item.className = "";
                })
                e.target.className = "active";
                
                setCodeContent(levels[job.jobId].getFaultyCode(job.tasks));
            }}>{ levels[job.jobId].pageTitle }</li>
        );
    });

    return output;
}

export default function CodePage()
{
    const window = useContext(windowContext);
    const save = useContext(saveContext);
    const [codeContent, setCodeContent] = useState("");
    const [jobFiles, setJobFiles] = useState([]);

    useEffect(() => {
        setJobFiles(generateJobFiles(parseJobs(save.activeSaveFile, save.setActiveSaveFile), setCodeContent));
    }, [save.activeSaveFile])

    if (document.querySelector(".code-editor")) {
        document.querySelector(".code-editor").setAttribute("empty", (document.querySelectorAll("span.mtk1").length === 0).toString());
    }
    return (
        <div id='code-page' className='pages' style={{display: (window === "code") ? "flex" : "none"}}>
            <Editor className="code-editor" defaultLanguage="html" theme="vs-dark" defaultValue="" value={codeContent} onChange={(e) => {
                //console.log(level0.checkCorrectCode(e));
                setCodeContent(e);
            }}/>
            <ul id="file-list">
                <li>⯆ jobs</li>
                {jobFiles}
                <button id="test-btn" onClick={() => {
                    document.getElementById("code-preview").classList.toggle("open");
                }}>Test code</button>
            </ul>
            <iframe title="Preview" id="code-preview" srcDoc={codeContent}></iframe>
        </div>
    )
    
}