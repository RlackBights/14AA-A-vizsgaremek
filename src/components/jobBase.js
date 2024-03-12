import level0 from "../websites/level0";

const jobs = { level0 };
export class Job {
    constructor(timestamp, jobId, pay, tasks) {
        this.timestamp = timestamp;
        this.jobId = jobId;
        this.pay = pay;
        this.tasks = tasks;
    }

    get jobName() {
        return ["Blue-Lake Forest", "", ""][this.jobId];
    }

    get company() {
        return ["BLF Camping Ltd.", "", ""][this.jobId];
    }

    get description() {
        let output = ""; 
        
        output += [
            `Greetings!
            
            We are looking for a developer who could help us out with the website we're building for our camping place! The Blue-Lake Forest camping site has been a staple of the summer holidays for several families since it opened in 2003. We'd like fast and precise work to be done, according to the tasks below:`,
            ``,
            ``][this.jobId];

        return output;
    }

    get getVerboseTasks() {
        let output = "";
        for (let i = 0; i < this.tasks.length; i++) {
            output += `<li>${jobs[`level${this.jobId}`].verboseTasks[this.tasks[i]]}</li>`;
        }

        return output
    }

    asd (params) {
        
    }
}

export function parseJobs(jobs)
{
    let output = [];
    jobs.split("-").forEach(job => {
        const values = job.split(".");
        output.push(new Job(values[0], values[1], values[2], values[3].split(":")));
    });
    return output;
}