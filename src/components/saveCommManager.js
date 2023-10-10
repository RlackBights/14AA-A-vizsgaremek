import { cookie } from "./cookie";

export async function setData(id, lvl, money, time, cpu, gpu, ram, stg)
{

  let tempSave;

  switch (id) {
    default:
      tempSave = await getData()[0];
      break;
    case 2:
      tempSave = await getData()[1];
      break;
    case 3:
      tempSave = await getData()[2];
      break;
  }

    fetch("http://127.0.0.1:8000/changedata", {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userAuthCode: cookie.get("user"),
            saveId: id,
            lvl: (lvl == undefined) ? tempSave.lvl : lvl,
            money: (money == undefined) ? tempSave.money : money,
            time: (time == undefined) ? tempSave.time : time,
            cpu: (cpu == undefined) ? tempSave.cpu : cpu,
            gpu: (gpu == undefined) ? tempSave.gpu : gpu,
            ram: (ram == undefined) ? tempSave.ram : ram,
            stg: (stg == undefined) ? tempSave.stg : stg,
        }),
    });
}


export async function getData() {

    if (cookie.get("user") === "") {
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
    
    console.log(data);
    return data;
    
};