import { useContext, useState } from "react";
import { windowContext } from "./desktop";
import Editor from '@monaco-editor/react';
import { checkCorrectCode, getFaultyCode } from '../websites/level0';

async function loadCodeContent(setCodeContent, htmlContent)
{
    setCodeContent(htmlContent);
}


export default function CodePage()
{
    const window = useContext(windowContext);
    const [codeContent, setCodeContent] = useState(getFaultyCode([0, 1]));
    return (
        <div id='code-page' className='pages' style={{display: (window === "code") ? "flex" : "none"}}>
            <Editor className="code-editor" defaultLanguage="html" theme="vs-dark" defaultValue="" value={codeContent} onChange={(e) => {
                console.log(checkCorrectCode(e));
                setCodeContent(e);
            }}/>
            <ul id="file-list">
                <li>⯆ jobs</li>
                <li language="html">test_file_name.html</li>
                <button id="test-btn" onClick={() => {
                    document.getElementById("code-preview").classList.toggle("open");
                }}>Test code</button>
            </ul>
            <iframe title="Preview" id="code-preview" srcDoc={codeContent}></iframe>
        </div>
    )
    
}