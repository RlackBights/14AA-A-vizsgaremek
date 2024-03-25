export class GameStats {
    constructor (completedJobs = 0, totalIncome = 0, fastestCompletion = null) {
        this.completedJobs = completedJobs;
        this.totalIncome = totalIncome;
        this.fastestCompletion = fastestCompletion;
    }
}

export function parseStats(data) {
    return new GameStats(data.completedJobs, data.totalIncome, data.fastestCompletion);
}