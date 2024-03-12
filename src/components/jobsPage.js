import { useContext } from "react"
import { windowContext } from "./desktop"
import { Job } from "./jobBase";

function generateJobItems(jobs)
{
    let output = [];

    for (let i = 0; i < jobs.length; i++)
    {
        output.push(
            <li key={`job-${i}`} className="job-item" onClick={() => {
                const jobsContent = document.getElementById("jobs-content");

                jobsContent.innerHTML = `<div>
                <h1>${jobs[i].jobName}</h1>
                <p>${jobs[i].timestamp}</p>
            </div>
            <h2>${jobs[i].company}</h2>
            <p>${jobs[i].description}</p>
            <ul>
                                    
                ${jobs[i].getVerboseTasks}

            </ul>
            <h1>Payment:<br/>$${jobs[i].pay}</h1>
            <button>Complete job</button>
            <h3>PlayerNameasdasdasd</h3>`;

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
                    new Job("12:32", 0, 69420, "some description", [1, 3, 2]),
                    new Job("13:45", 0, 80000, "another description", [0, 4, 2]),
                    new Job("09:15", 0, 120000, "job description here", [3, 1, 4]),
                    new Job("12:32", 0, 10000, "Description 1", [2, 0, 3]),
                    new Job("13:45", 0, 20000, "Description 2", [4, 1, 0]),
                    new Job("09:15", 0, 30000, "Description 3", [3, 2, 1]),
                    new Job("12:32", 0, 40000, "Description 4", [0, 3, 2]),
                    new Job("13:45", 0, 50000, "Description 5", [1, 4, 0]),
                    new Job("09:15", 0, 60000, "Description 6", [2, 0, 3]),
                    new Job("12:32", 0, 70000, "Description 7", [3, 1, 2]),
                    new Job("13:45", 0, 80000, "Description 8", [4, 0, 1]),
                    new Job("09:15", 0, 90000, "Description 9", [0, 2, 3]),
                    new Job("12:32", 0, 100000, "Description 10", [1, 3, 0]),
                    new Job("13:45", 0, 110000, "Description 11", [2, 4, 1]),
                    new Job("09:15", 0, 120000, "Description 12", [3, 0, 2]),
                    new Job("12:32", 0, 130000, "Description 13", [4, 1, 3]),
                    new Job("13:45", 0, 140000, "Description 14", [0, 2, 1]),
                    new Job("09:15", 0, 150000, "Description 15", [1, 3, 4]),
                    new Job("12:32", 0, 160000, "Description 16", [2, 0, 4]),
                    new Job("13:45", 0, 170000, "Description 17", [3, 1, 0]),
                    new Job("09:15", 0, 180000, "Description 18", [4, 2, 3]),
                    new Job("12:32", 0, 190000, "Description 19", [0, 3, 1]),
                    new Job("13:45", 0, 200000, "Description 20", [1, 4, 2]),
                    new Job("09:15", 0, 210000, "Description 21", [2, 0, 4]),
                    new Job("12:32", 0, 220000, "Description 22", [3, 1, 0]),
                    new Job("13:45", 0, 230000, "Description 23", [4, 2, 1]),
                    new Job("09:15", 0, 240000, "Description 24", [0, 3, 4]),
                    new Job("12:32", 0, 250000, "Description 25", [1, 0, 2]),
                    new Job("13:45", 0, 260000, "Description 26", [2, 4, 3]),
                    new Job("09:15", 0, 270000, "Description 27", [3, 1, 2]),
                    new Job("12:32", 0, 280000, "Description 28", [4, 0, 3])




                ])}
            </ul>
            <div id="jobs-content">
                
            </div>
        </div>

    )
}