export class Job {
    constructor(timestamp, company, jobName, pay, description, tasks) {
        this.timestamp = timestamp;
        this.company = company;
        this.jobName = jobName;
        this.pay = pay;
        this.description = description;
        this.tasks = tasks;
    }
}