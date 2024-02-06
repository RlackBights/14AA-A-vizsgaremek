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

  getCpu() {
    switch (this.cpu) {
      default:
        return "ERROR";
      case 1:
        return "Z5";
      case 2:
        return "Z7";
      case 3:
        return "Z9";
    }
  }

  getGpu() {
    switch (this.gpu) {
      default:
        return "ERROR";
      case 1:
        return "DTX 1150";
      case 2:
        return "ETX 2260";
      case 3:
        return "ETX 4490";
    }
  }

  getRam() {
    switch (this.ram) {
      default:
        return "ERROR";
      case 1:
        return "16GB";
      case 2:
        return "32GB";
      case 3:
        return "64GB";
    }
  }

  getStg() {
    switch (this.stg) {
      default:
        return "ERROR";
      case 1:
        return "500GB HDD";
      case 2:
        return "500GB SSD";
      case 3:
        return "1TB SSD";
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