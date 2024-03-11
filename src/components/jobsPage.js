import { useContext } from "react"
import { windowContext } from "./desktop"
import { Job } from "./jobBase";

function generateJobItems(jobs)
{
    let output = [];

    for (let i = 0; i < jobs.length; i++)
    {
        output.push(
            <li className="job-item" onClick={() => {

            }}>
                <div>
                    <section>
                        <img style={{backgroundColor: "red", width: "4vmin", height: "4vmin"}} src="https://i.imgur.com/x850292.png" alt="job-icon"/>
                        <div>
                            <p>{jobs[i].company}</p>
                            <p>{jobs[i].jobName}</p>
                        </div>
                    </section>
                    <div>
                        <p className="job-timestamp">11:34<br/></p>
                        <p>${jobs[i].pay}</p>
                    </div>
                </div>
            </li>
        );
    }

    return output;
}

export function JobsPage()
{
    const window = useContext(windowContext)
    return (
        <div id='jobs-page' className='pages' style={{display: (window === "jobs") ? "flex" : "none"}}>
            <ul id="jobs-sidebar">
                {generateJobItems([
                    new Job("12:32", "Gugul", "Blue-Lake Forest", 69420, "some description", [0, 1]),
                    new Job("13:45", "Foobar Inc.", "Redwood City", 80000, "another description", [2, 3]),
                    new Job("09:15", "Acme Corp", "Palo Alto", 120000, "job description here", [4, 5]),
                    new Job("12:32", "Company 1", "Location 1", 10000, "Description 1", [0, 1]),
                    new Job("13:45", "Company 2", "Location 2", 20000, "Description 2", [2, 3]),
                    new Job("09:15", "Company 3", "Location 3", 30000, "Description 3", [4, 5]),
                    new Job("12:32", "Company 4", "Location 4", 40000, "Description 4", [0, 1]),
                    new Job("13:45", "Company 5", "Location 5", 50000, "Description 5", [2, 3]),
                    new Job("09:15", "Company 6", "Location 6", 60000, "Description 6", [4, 5]),
                    new Job("12:32", "Company 7", "Location 7", 70000, "Description 7", [0, 1]),
                    new Job("13:45", "Company 8", "Location 8", 80000, "Description 8", [2, 3]),
                    new Job("09:15", "Company 9", "Location 9", 90000, "Description 9", [4, 5]),
                    new Job("12:32", "Company 10", "Location 10", 100000, "Description 10", [0, 1]),
                    new Job("13:45", "Company 11", "Location 11", 110000, "Description 11", [2, 3]),
                    new Job("09:15", "Company 12", "Location 12", 120000, "Description 12", [4, 5]),
                    new Job("12:32", "Company 13", "Location 13", 130000, "Description 13", [0, 1]),
                    new Job("13:45", "Company 14", "Location 14", 140000, "Description 14", [2, 3]),
                    new Job("09:15", "Company 15", "Location 15", 150000, "Description 15", [4, 5]),
                    new Job("12:32", "Company 16", "Location 16", 160000, "Description 16", [0, 1]),
                    new Job("13:45", "Company 17", "Location 17", 170000, "Description 17", [2, 3]),
                    new Job("09:15", "Company 18", "Location 18", 180000, "Description 18", [4, 5]),
                    new Job("12:32", "Company 19", "Location 19", 190000, "Description 19", [0, 1]),
                    new Job("13:45", "Company 20", "Location 20", 200000, "Description 20", [2, 3]),
                    new Job("09:15", "Company 21", "Location 21", 210000, "Description 21", [4, 5]),
                    new Job("12:32", "Company 22", "Location 22", 220000, "Description 22", [0, 1]),
                    new Job("13:45", "Company 23", "Location 23", 230000, "Description 23", [2, 3]),
                    new Job("09:15", "Company 24", "Location 24", 240000, "Description 24", [4, 5]),
                    new Job("12:32", "Company 25", "Location 25", 250000, "Description 25", [0, 1]),
                    new Job("13:45", "Company 26", "Location 26", 260000, "Description 26", [2, 3]),
                    new Job("09:15", "Company 27", "Location 27", 270000, "Description 27", [4, 5]),
                    new Job("12:32", "Company 28", "Location 28", 280000, "Description 28", [0, 1]),
                    new Job("13:45", "Company 29", "Location 29", 290000, "Description 29", [2, 3]),
                    new Job("09:15", "Company 30", "Location 30", 300000, "Description 30", [4, 5]),
                    new Job("12:32", "Company 31", "Location 31", 310000, "Description 31", [0, 1]),
                    new Job("13:45", "Company 32", "Location 32", 320000, "Description 32", [2, 3])
                ])}
            </ul>
            <div id="jobs-content">
                <ul>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                </ul>
            </div>
        </div>

    )
}