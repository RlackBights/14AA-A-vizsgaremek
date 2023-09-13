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
  
  function setCpu(cpu) {
    switch (cpu) {
      default:
        return "Z3";
      case 1:
        return "Z5";
      case 2:
        return "Z7";
      case 3:
        return "Z9";
    }
  }
  
  function setGpu(gpu) {
    switch (gpu) {
      default:
        return "DT 620";
      case 1:
        return "DTX 1150";
      case 2:
        return "ETX 2260";
      case 3:
        return "ETX 4490";
    }
  }
  
  function setRam(ram) {
    switch (ram) {
      default:
        return "8GB";
      case 1:
        return "16GB";
      case 2:
        return "32GB";
      case 3:
        return "64GB";
    }
  }
  
  function setStg(stg) {
    switch (stg) {
      default:
        return "250GB HDD";
      case 1:
        return "500GB HDD";
      case 2:
        return "500GB SSD";
      case 3:
        return "1TB SSD";
    }
  }
  
  export function convertSave(savedata) {
    return new saveFile(
      savedata.lvl,
      savedata.money,
      savedata.time,
      setCpu(savedata.cpu),
      setGpu(savedata.gpu),
      setRam(savedata.ram),
      setStg(savedata.stg)
    );
  }