import level0 from "../websites/level0";
import level1 from "../websites/level1";
import level2 from "../websites/level2";
import { normalizeTime } from "./desktop";

const jobs = { level0, level1, level2 };
export class Job {
    constructor(jobId, pay, tasks, timestamp) {
        this.timestamp = timestamp;
        this.jobId = jobId;
        this.pay = pay;
        this.tasks = tasks;
    }

    get jobName() {
        return ["Blue-Lake Forest",
        "",
        ""][this.jobId];
    }

    get company() {
        return ["BLF Camping Ltd.",
        "",
        ""][this.jobId];
    }

    get description() {
        return [
            `Greetings!<br/><br/>We are looking for a developer who could help us out with the website we're building for our camping place! The Blue-Lake Forest camping site has been a staple of the summer holidays for several families since it opened in 2003. We'd like fast and precise work to be done, according to the tasks below:`,
            ``,
            ``][this.jobId];
    }

    get signoff() {
        return ["Best regards,<br/>The BLF Camping Team",
        "",
        ""][this.jobId];
    }

    get getVerboseTasks() {
        let output = "";
        for (let i = 0; i < this.tasks.length; i++) {
            output += `<li>${jobs[`level${this.jobId}`].verboseTasks[this.tasks[i]]}</li>`;
        }

        return output
    }
}

function generateJob()
{
    const jobId = Math.floor(Math.random() * 3);
    const pay = Math.floor(Math.random() * 10000);
    const tasks = [];
    const timestamp = `${normalizeTime(Math.floor(Math.random() * 24))}:${normalizeTime(Math.floor(Math.random() * 60))}`;

    return new Job(jobId, pay, tasks, timestamp);
}

export function parseJobs(save, saveSetter)
{
    let output = [];
    let indexer = 0;
    const jobs = save.jobs;
    jobs.split("-").forEach(job => {
        if (job === "#") {
            const randomJob = generateJob();
            output.push(randomJob);
            saveSetter(save => ({...save, jobs: save.jobs.replace(/#/, `${randomJob.jobId}.${randomJob.pay}.${randomJob.tasks.join(":")}.${randomJob.timestamp}`)}));
            localStorage.setItem("activeSaveFile", JSON.stringify(save));
        } else {
            const values = job.split(".");
            output.push(new Job(values[0], values[1], values[2].split(":"), values[3]));
        }
        indexer++;
    });
    return output;
}

export function generateJobItems(jobs)
{
    let output = [];

    for (let i = 0; i < jobs.length; i++)
    {
        output.push(
            <li key={`job-${i}`} className="job-item" onClick={(e) => {
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
                <p>${jobs[i].signoff}</p>
                <h1>Payment:<br/>$${jobs[i].pay}</h1>
                <button>Complete job</button>
                <h3>PlayerNameasdasdasd</h3>`;

            }}>
                <div>
                    <section>
                        <img style={{backgroundColor: "red", width: "4vmin", height: "4vmin", borderRadius: "50%"}} src="https://i.imgur.com/x850292.png" alt="job-icon"/>
                        <div>
                            <p>{jobs[i].company}</p>
                            <p>{jobs[i].jobName}</p>
                        </div>
                    </section>
                    <div>
                        <p className="job-timestamp">{jobs[i].timestamp}<br/></p>
                        <p>${jobs[i].pay}</p>
                    </div>
                </div>
            </li>
        );
    }

    return output;
}