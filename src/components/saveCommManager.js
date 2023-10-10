import { cookie } from "./cookie";

export function setData(id, lvl, money, time, cpu, gpu, ram, stg)
{
    fetch("http://127.0.0.1:8000/changedata", {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userAuthCode: cookie.get("user"),
            saveId: id,
            lvl: lvl,
            money: money,
            time: time,
            cpu: cpu,
            gpu: gpu,
            ram: ram,
            stg: stg,
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