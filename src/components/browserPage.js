import { useContext, useState } from "react"
import { windowContext } from "./desktop"

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
                    <li>
                        ASDASD HTML TEXT
                    </li>
                    }
                    {filter[1] && 
                    <li>
                        ASDASD CSS TEXT
                    </li>
                    }
                    {filter[2] && 
                    <li>
                        ASDASD JS TEXT
                    </li>
                    }
                    {!filter.includes(true) &&
                        <li>No languages selected for filter</li>
                    }
                </ul>
                <div id="doc-content"></div>
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