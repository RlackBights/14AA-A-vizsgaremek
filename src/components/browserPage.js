import { useContext, useEffect, useState } from "react"
import { windowContext } from "./desktop"
import { BrowserItem, HTMLDocs, CSSDocs, JSDocs } from "./browserItem";
import { Editor } from "@monaco-editor/react";
import { soundContext } from '../App';

function generateDocPage(browserItem) {
    const docContent = document.getElementById("doc-content");
    if (!docContent) return;

    let out = []

    out.push(<h1>{browserItem.title}</h1>);
    out.push(<h2>{browserItem.short}</h2>);
    out.push(browserItem.example);
    let p = (<p>{browserItem.detailed}</p>);
    //p.innerHTML = p.innerHTML.replace(/\n/g, "<br/>");
    out.push(p);

    return out;
}

export function BrowserPage() {
    const window = useContext(windowContext);
    const [page, setPage] = useState("docs");
    const [filter, setFilter] = useState([true, true, true]);
    const [selectedElement, setSelectedElement] = useState([]);
    const play = useContext(soundContext).uiClick;

    useEffect(() => {
        document.getElementsByClassName("doc-example")[0].parentElement.style.cssText = "";
    }, [])

    return (
        <div id='browser-page' className='pages' style={{display: window === "browser" ? "flex" : "none"}}>
            <ul id='browser-tabs'>
                <li onClick={() => {play(); setPage("docs");}}>Documentation 📖</li>
                <li onClick={() => {play(); setPage("pc");}}>PC Part Rankings 👑</li>
            </ul>
            {page === "docs" && 
            <div id='browser-content'>
                <ul id="doc-sidebar">
                    <li>
                        <p className={filter[0] ? "active" : ""} onClick={() => {play(); setFilter(curr => [!curr[0], curr[1], curr[2]])}}>HTML</p>
                        <p className={filter[1] ? "active" : ""} onClick={() => {play(); setFilter(curr => [curr[0], !curr[1], curr[2]])}}>CSS</p>
                        <p className={filter[2] ? "active" : ""} onClick={() => {play(); setFilter(curr => [curr[0], curr[1], !curr[2]])}}>JS</p>
                    </li>
                    {filter[0] && 
                        <div>
                            <h1 style={{margin: 0}}>HTML</h1>
                            {HTMLDocs.map(e => <li key={e.title} onClick={() => {
                                play();
                                setSelectedElement(generateDocPage(new BrowserItem(e.title, e.short, e.example, e.detailed)));
                                document.getElementsByClassName("doc-example")[0].parentElement.style.height = `${e.example.split('\n').length * 19 + 6}px`;
                                document.getElementsByClassName("doc-example")[0].parentElement.style.display = "flex";
                            }}>{e.title}</li>)}
                        </div>
                    }
                    {filter[1] && 
                        <div>
                            <h1 style={{margin: 0}}>CSS</h1>
                            {CSSDocs.map(e => <li key={e.title} onClick={() => {
                                play();
                                setSelectedElement(generateDocPage(new BrowserItem(e.title, e.short, e.example, e.detailed)));
                                document.getElementsByClassName("doc-example")[0].parentElement.style.height = `${e.example.split('\n').length * 19 + 6}px`;
                                document.getElementsByClassName("doc-example")[0].parentElement.style.display = "flex";
                            }}>{e.title}</li>)}
                        </div>
                    }
                    {filter[2] && 
                        <div>
                            <h1 style={{margin: 0}}>JS</h1>
                            {JSDocs.map(e => <li key={e.title} onClick={() => {
                                play();
                                setSelectedElement(generateDocPage(new BrowserItem(e.title, e.short, e.example, e.detailed)));
                                document.getElementsByClassName("doc-example")[0].parentElement.style.height = `${e.example.split('\n').length * 19 + 6}px`;
                                document.getElementsByClassName("doc-example")[0].parentElement.style.display = "flex";
                            }}>{e.title}</li>)}
                        </div>
                    }
                    {!filter.includes(true) &&
                        <li>No languages selected for filter</li>
                    }
                </ul>
                <div id="doc-content">
                    {selectedElement[0]}
                    {selectedElement[1]}
                    <Editor className="doc-example" defaultLanguage="html" theme="vs-dark" value={selectedElement[2]} options={{ readOnly: true, scrollbar: false, scrollBeyondLastLine: false, lineNumbers: false, minimap: {enabled: false}, renderLineHighlight: false}} />
                    {selectedElement[3]}
                </div>
            </div>
            }
            {page === "pc" && 
            <div id="browser-rankings">
                <p className='blocked-feature'>Feature not included in demo version</p>
            </div>
            }
        </div>
    )
}