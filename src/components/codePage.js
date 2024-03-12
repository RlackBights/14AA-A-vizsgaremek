import { useContext, useState } from "react";
import { windowContext } from "./desktop";
import Editor from '@monaco-editor/react';
import level0 from '../websites/level0';

export default function CodePage()
{
    const window = useContext(windowContext);
    const [codeContent, setCodeContent] = useState(level0.getFaultyCode([0, 3, 4]));
    return (
        <div id='code-page' className='pages' style={{display: (window === "code") ? "flex" : "none"}}>
            <Editor className="code-editor" defaultLanguage="html" theme="vs-dark" defaultValue="" value={codeContent} onChange={(e) => {
                console.log(level0.checkCorrectCode(e));
                setCodeContent(e);
            }}/>
            <ul id="file-list">
                <li>⯆ jobs</li>
                <li language="html">{ level0.pageTitle }</li>
                <button id="test-btn" onClick={() => {
                    document.getElementById("code-preview").classList.toggle("open");
                }}>Test code</button>
            </ul>
            <iframe title="Preview" id="code-preview" srcDoc={codeContent}></iframe>
        </div>
    )
    
}