export class saveFile {
  constructor(id=0, lvl=-1, money=0, time=0, cpu=0, gpu=0, ram=0, stg=0) {
    this.id = id;
    this.lvl = lvl;
    this.money = money;
    this.time = time;
    this.cpu = cpu;
    this.gpu = gpu;
    this.ram = ram;
    this.stg = stg;
  }

  getCpu() {
    switch (this.cpu) {
      default:
        return 0;
      case "Z5":
        return 1;
      case "Z7":
        return 2;
      case "Z9":
        return 3;
    }
  }

  getGpu() {
    switch (this.gpu) {
      default:
        return 0;
      case "DTX 1150":
        return 1;
      case "ETX 2260":
        return 2;
      case "ETX 4490":
        return 3;
    }
  }

  getRam() {
    switch (this.ram) {
      default:
        return 0;
      case "16GB":
        return 1;
      case "32GB":
        return 2;
      case "64GB":
        return 3;
    }
  }

  getStg() {
    switch (this.stg) {
      default:
        return 0;
      case "500GB HDD":
        return 1;
      case "500GB SSD":
        return 2;
      case "1TB SSD":
        return 3;
    }
  }
}