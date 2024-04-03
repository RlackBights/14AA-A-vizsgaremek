import { useContext, useState } from "react"
import { windowContext } from "./desktop"
import { BrowserItem } from "./browserItem";

const HTMLDocs = [
    new BrowserItem("ASDASD HTML TEXT", "SHORT DESC", "EXAMPLEEEEEEEEEEEE", "DETAILED DESC")
];

const CSSDocs = [
    new BrowserItem("ASDASD CSS TEXT", "SHORT DESC", "EXAMPLEEEEEEEEEEEE", "DETAILED DESC")
];

const JSDocs = [
    new BrowserItem("Unavailable in demo", "JS is not supported in the demo", "", "")
]

export function BrowserPage() {
    const window = useContext(windowContext);
    const [page, setPage] = useState("docs");
    const [filter, setFilter] = useState([true, true, true]);
    return (
        <div id='browser-page' className='pages' style={{display: window === "browser" ? "flex" : "none"}}>
            <ul id='browser-tabs'>
                <li onClick={() => setPage("docs")}>Documentation 📖</li>
                <li onClick={() => setPage("pc")}>PC Part Rankings 👑</li>
            </ul>
            {page === "docs" && 
            <div id='browser-content'>
                <ul id="doc-sidebar">
                    <li>
                        <p className={filter[0] ? "active" : ""} onClick={() => setFilter(curr => [!curr[0], curr[1], curr[2]])}>HTML</p>
                        <p className={filter[1] ? "active" : ""} onClick={() => setFilter(curr => [curr[0], !curr[1], curr[2]])}>CSS</p>
                        <p className={filter[2] ? "active" : ""} onClick={() => setFilter(curr => [curr[0], curr[1], !curr[2]])}>JS</p>
                    </li>
                    {filter[0] && 
                        <div>
                            <h1 style={{margin: 0}}>HTML</h1>
                            {HTMLDocs.map(e => <li onClick={() => {}}>{e.title}</li>)}
                        </div>
                    }
                    {filter[1] && 
                        <div>
                            <h1 style={{margin: 0}}>CSS</h1>
                            {CSSDocs.map(e => <li>{e.title}</li>)}
                        </div>
                    }
                    {filter[2] && 
                        <div>
                            <h1 style={{margin: 0}}>JS</h1>
                            {JSDocs.map(e => <li>{e.title}</li>)}
                        </div>
                    }
                    {!filter.includes(true) &&
                        <li>No languages selected for filter</li>
                    }
                </ul>
                <div id="doc-content">
                    <h1>TITLE OF DOCUMENT</h1>
                    <h2>SHORT DESCRIPTION</h2>
                    <div>
                        EXAMPLE
                    </div>
                    <p>DETAILED DESCRIPTION</p>
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