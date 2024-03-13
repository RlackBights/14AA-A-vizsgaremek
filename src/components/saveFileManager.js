export class saveFile {
  constructor(saveId="", lvl=0, time=0, money=0, cpuId=0, gpuId=0, ramId=0, stgId=0, lastBought={cpu:0,gpu:0,ram:0,stg:0}, jobs="#") {
    this.saveId = saveId;
    this.lvl = lvl;
    this.time = time;
    this.money = money;
    this.cpuId = cpuId;
    this.gpuId = gpuId;
    this.ramId = ramId;
    this.stgId = stgId;
    this.lastBought = lastBought;
    this.jobs = jobs;
  }

  getCPU() {
    switch (this.cpuId) {
      case 0:
        return "Z3";
      case 1:
        return "Z5";
      case 2:
        return "Z7";
      case 3:
        return "Z9";
      default:
        return "ERROR";
    }
  }

  getGPU() {
    switch (this.gpuId) {
      case 0:
        return "DT 620";
      case 1:
        return "DTX 1150";
      case 2:
        return "ETX 2260";
      case 3:
        return "ETX 4490";
      default:
        return "ERROR";
    }
  }

  getRAM() {
    switch (this.ramId) {
      case 0:
        return "8GB";
      case 1:
        return "16GB";
      case 2:
        return "32GB";
      case 3:
        return "64GB";
      default:
        return "ERROR";
    }
  }

  getSTG() {
    switch (this.stgId) {
      case 0:
        return "250GB HDD";
      case 1:
        return "500GB HDD";
      case 2:
        return "500GB SSD";
      case 3:
        return "1TB SSD";
      default:
        return "ERROR";
    }
  }

  getParsedTime() {
    const hours = Math.floor(this.time / 3600);
    const minutes = Math.floor((this.time - hours*3600) / 60);
    const seconds = Math.floor(this.time - hours*3600 - minutes*60);
    return `${hours === 0 ? "" : hours + ":"}${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
  }
}

export function parseSaves(input, isArray = true)
{
  let output;
  if (isArray) {
    output = [];
    input.forEach(save => {
      output.push(new saveFile(save.saveId, save.lvl, save.time, save.money, save.cpuId, save.gpuId, save.ramId, save.stgId, save.lastBought, save.encryptedJobs));
    });
  } else {
    return new saveFile(input.saveId, input.lvl, input.time, input.money, input.cpuId, input.gpuId, input.ramId, input.stgId, input.lastBought, input.jobs);
  }

  return output;
}