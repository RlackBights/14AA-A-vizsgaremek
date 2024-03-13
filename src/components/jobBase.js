import level0 from "../websites/level0";
import level1 from "../websites/level1";
import level2 from "../websites/level2";
import { normalizeTime } from "./desktop";
import { clamp } from "./saveContainer";

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

function generateJob(stgId, cpuId, gpuId)
{
    const jobId = clamp(Math.floor(Math.random() * (cpuId)), 0, 2);
    let tasks = [];
    let pay = 0;
    for (let i = 0; i < [Math.round(Math.random()) + 2, Math.round(Math.random() * 3) + 3, Math.round(Math.random() * 4) + 4, Math.round(Math.random() * 4) + 6][stgId]; i++) {
        let randomTask;
        pay += Math.floor((Math.floor(Math.random() * 5) + 5) * [1, 1.25, 1.5, 2][gpuId]);
        switch (cpuId) {
            case 1:
                randomTask = Math.round(Math.random() * 4) + 5;
                while (tasks.includes(randomTask)) randomTask = ((randomTask + 1) % 5) + 5;
                tasks.push(randomTask);
                break;
            case 2:
                randomTask = Math.round(Math.random() * 4) + 10;
                while (tasks.includes(randomTask)) randomTask = ((randomTask + 1) % 5) + 10;
                tasks.push(randomTask);
                break;
            case 3:
                randomTask = Math.round(Math.random() * 14);
                while (tasks.includes(randomTask)) randomTask = (randomTask + 1) % 15;
                tasks.push(randomTask);
                break;
            default:
                randomTask = Math.round(Math.random() * 4);
                while (tasks.includes(randomTask)) randomTask = (randomTask + 1) % 5;
                tasks.push(randomTask);
                break;
        }
    }

    const timestamp = `${normalizeTime(Math.floor(Math.random() * 24))}:${normalizeTime(Math.floor(Math.random() * 60))}`;

    return new Job(jobId, pay, tasks, timestamp);
}

export function parseJobs(saveFile, saveSetter)
{
    let output = [];
    let indexer = 0;
    const jobs = saveFile.jobs;
    jobs.split("-").forEach(job => {
        if (indexer > saveFile.ramId) return;
        if (job === "#") {
            const randomJob = generateJob(saveFile.stgId, saveFile.cpuId, saveFile.gpuId);
            output.push(randomJob);
            localStorage.setItem("activeSaveFile", JSON.stringify({...saveFile, jobs: saveFile.jobs.replace(/#/, `${randomJob.jobId}.${randomJob.pay}.${randomJob.tasks.join(":")}.${randomJob.timestamp}`)}));
            saveSetter(save => ({...save, jobs: save.jobs.replace(/#/, `${randomJob.jobId}.${randomJob.pay}.${randomJob.tasks.join(":")}.${randomJob.timestamp}`)}));
        } else {
            const values = job.split(".");
            output.push(new Job(values[0], values[1], values[2].split(":").map(str => parseInt(str)), values[3]));
        }
        indexer++;
    });
    return output;
}

export function generateJobItems(jobs, username)
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
                <h3>${username}</h3>`;

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