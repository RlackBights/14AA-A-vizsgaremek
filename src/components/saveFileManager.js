export class saveFile {
  constructor(id="", lvl=-1, time=0, money=0, cpu=0, gpu=0, ram=0, stg=0, lb={cpu:0,gpu:0,ram:0,stg:0}) {
    this.id = id;
    this.lvl = lvl;
    this.time = time;
    this.money = money;
    this.cpu = cpu;
    this.gpu = gpu;
    this.ram = ram;
    this.stg = stg;
    this.lb = lb;
  }

  getCPU() {
    switch (this.cpu) {
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
    switch (this.gpu) {
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
    switch (this.ram) {
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
    switch (this.stg) {
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
    if (this.time < 3600) {
      return new Date(this.time * 1000).toISOString().substring(14, 19)
    } else {
      return new Date(this.time * 1000).toISOString().substring(11, 16)
    }
  }
}

export function parseSave(inputArray)
{
  let outputArray = [];
  inputArray.forEach(save => {
    outputArray.push(new saveFile(save.saveId, save.lvl, save.time, save.money, save.cpuId, save.gpuId, save.ramId, save.stgId, JSON.parse(save.lastBought)))
  });

  return outputArray;
}