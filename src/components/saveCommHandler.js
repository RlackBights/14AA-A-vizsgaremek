import { cookie } from "./cookie";

export const setData = (
    currSave,
    saveId = undefined,
    lvl = undefined,
    money = undefined,
    time = undefined,
    cpu = undefined,
    gpu = undefined,
    ram = undefined,
    stg = undefined
  ) => {

    console.log(currSave.getSaveTime());

    lvl = lvl !== undefined ? lvl : currSave.lvl;
    money = money !== undefined ? money : currSave.money;
    time = time !== undefined ? time : currSave.getSaveTime();
    cpu = cpu !== undefined ? cpu : currSave.getCpu();
    gpu = gpu !== undefined ? gpu : currSave.getGpu();
    ram = ram !== undefined ? ram : currSave.getRam();
    stg = stg !== undefined ? stg : currSave.getStg();

    if (cookie.get("user") == null) {
        return;
    }

    const pushSaveData = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userAuthCode: cookie.get("user"),
            saveId: saveId,
            lvl: lvl,
            money: money,
            time: time,
            cpu: cpu,
            gpu: gpu,
            ram: ram,
            stg: stg,
        }),
    };
    fetch("http://127.0.0.1:8000/changedata", pushSaveData);
};

export async function getData() {

    if (cookie.get("gameState") == null) {
      cookie.set("gameState", "MainMenu");
      cookie.set("activeSaveSlot", null);
      window.location.reload();
    }
    if (cookie.get("user") == null) {
      return;
    }

    let data = await fetch(`http://127.0.0.1:8000/getdata?userAuthCode=${cookie.get("user")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      });
    
    return data
    
};