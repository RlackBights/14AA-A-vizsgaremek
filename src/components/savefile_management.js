import React from "react";

export class saveFile {
    constructor(lvl, money, time, cpu, gpu, ram, stg) {
      this.lvl = lvl;
      this.money = money;
      this.hours = Math.floor(time / 3600);
      this.minutes = Math.floor((time % 3600) / 60);
      this.seconds = Math.floor((time % 3600) % 60);
      this.cpu = cpu;
      this.gpu = gpu;
      this.ram = ram;
      this.stg = stg;
    }
  
    addTime() {
      this.seconds++;
      if (this.seconds >= 60) {
        this.seconds -= 60;
        this.minutes++;
      }
      if (this.minutes >= 60) {
        this.minutes -= 60;
        this.hours++;
      }
    }
  
    getSaveTime() {
      return this.hours * 3600 + this.minutes * 60 + this.seconds;
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
  
  export function convertSave(savedata) {
    return new saveFile(
      savedata.lvl,
      savedata.money,
      savedata.time,
      savedata.cpu,
      savedata.gpu,
      savedata.ram,
      savedata.stg
    );
  }