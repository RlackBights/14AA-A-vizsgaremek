import { backend } from "../App";
import { parseSaves } from "./saveFileManager";

export async function getPlayerSaves(authCode)
{
    const fetchParams = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            authCode: authCode
        }),
    };
    
    return await fetch(backend + "/game/getPlayerSaves", fetchParams).then((res) => res.json()).then((res) => {
        if (res.data !== undefined) {
            return parseSaves(res.data);
        }
        return [];
    })
}

export async function loginUser(username, password)
{
    const fetchParams = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    };

    return await fetch(backend + "/player/login", fetchParams).then((res) => {
        switch (res.status) {
            case 200:
                return res.json().then((json) => {
                    return {success: true, data: json.data[0] + " " + json.data[1]};
                });
            default:
                return res.json().then((errorRes) => {
                    return {success: false, data: errorRes.error};
                });
            }
        }
    );
}

export async function registerUser(email, username, password, confirmPassword)
{
    const fetchParams = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          confirmPassword: confirmPassword
        }),
      };

      return await fetch( backend + "/player/register", fetchParams).then(
        (res) => {
          switch (res.status) {
            case 200:
              return loginUser(username, password);
            default:
              return res.json().then((errorRes) => {
                return {success: false, data: errorRes.error};
              });
              
          }
        }
      );
}

export async function sendRecoveryEmail(email)
{
    const fetchParams = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email
        })
    }
    return await fetch(backend + "/player/forgotPassword", fetchParams).then((res) => {
        switch (res.status) {
            case 200:
                return { success: true, data: "Password reset email successfully sent!"};
            default:
                return res.json().then((errorRes) => {
                    console.log(errorRes);
                    return {success: false, data: errorRes.error};
                });
              
          }
    });
}

export async function deleteSave(user, saveId)
{
    const fetchParams = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authCode: user,
          saveId: saveId
        }),
      };
    fetch(backend + '/game/deleteSave', fetchParams).then((res) => res.json()).then((res) => console.log(res));
}

export async function updateSave(user, saveData)
{
    const fetchParams = {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-save-type": "update"},
        body: JSON.stringify({
            authCode: user,
            data: [saveData]
        })
    }

    return await fetch(backend + "/game/savePlayerData", fetchParams).then(res => res.json());
}

export async function requestSaveFileCreation(user, saveId)
{
    const fetchParams = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            authCode: user,
            data: [{saveId: saveId}]
        })
    }

    return await fetch(backend + "/game/savePlayerData", fetchParams).then(res => res.json());
}

export async function finaliseNewSave(user, saveId)
{
    const fetchParams = {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-save-type": "override"},
        body: JSON.stringify({
            authCode: user,
            data: [{saveId: saveId}]
        })
    }

    return await fetch(backend + "/game/savePlayerData", fetchParams).then(res => res.json());
}

export async function getHardwareElements()
{
    const fetchParams = {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }

    return await fetch(backend + "/game/getHardwareElements", fetchParams).then(res => res.json());
}