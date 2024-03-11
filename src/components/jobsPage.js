import { useContext } from "react"
import { windowContext } from "./desktop"

export function JobsPage()
{
    const window = useContext(windowContext)
    return (
        <div id='jobs-page' className='pages' style={{display: (window === "jobs") ? "flex" : "none"}}>
            <ul id="jobs-sidebar">
                <li>
                    <p></p>
                    <div>
                        <img />
                        <div>
                            <p></p>
                            <p></p>
                        </div>
                        <p></p>
                    </div>
                </li>
            </ul>
            <div id="jobs-content">

            </div>
        </div>
    )
}