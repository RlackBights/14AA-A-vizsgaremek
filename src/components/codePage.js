import { useContext } from "react"
import { windowContext } from "./desktop"
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

export default function CodePage()
{
    const window = useContext(windowContext);
    return (
        <div id='code-page' className='pages' style={{display: (window === "code") ? "flex" : "none"}}>
            <Editor className="code-editor" defaultLanguage="html" theme="vs-dark" defaultValue="<!-- test -->" onChange={(e) => {
                document.getElementById("job-preview").setAttribute("srcDoc", e);
            }}/>
            <iframe id="job-preview" srcDoc=""></iframe>
        </div>
    )
}